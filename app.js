const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

// Connection to the SQlite database
const db_name = path.join(__dirname, "data", "apptest.db");
const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'apptest.db'");
});

// Creating user table (userID, Name, Surname)
const sql_create = `CREATE TABLE IF NOT EXISTS User (
  User_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Name VARCHAR(100) NOT NULL,
  Surname VARCHAR(100) NOT NULL
);`;
db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'User' table");

  // Database seeding
  const sql_insert = `INSERT INTO User (Name, Surname) VALUES
  ('John', 'Doe'),
  ('Bill', 'Gates');`;
  db.run(sql_insert, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation of 2 users");
  });
});

app.use(express.urlencoded({ extended: false })); // use the middleware “express.urlencoded()” so that request.body retrieves the posted values


router.post("/", function (req, res) {
  const user = [req.body.fname, req.body.lname];
  console.log("Submitted name: " + req.body.fname);
  console.log("Submitted surname: " + req.body.lname);
  const sql = "INSERT INTO User (Name, Surname) VALUES (?,?)";
  db.run(sql, user, (err) => {
    // if (err) ...
    res.render(__dirname + "/views/index.ejs", { status: "Saved to DB" });
    //res.redirect("/");
  });
});

//Set view engine to ejs
app.set("view engine", "ejs");

//serve static files in express
app.use(express.static(path.join(__dirname, "public"))); //then e.g. this will work http://localhost:3000/images/firefox-icon.png

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/index.html"));
  //__dirname : It will resolve to your project folder.
});

router.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/about.html"));
});

//add the router
app.use("/", router);
app.listen(process.env.port || 3000);

console.log("Running at Port 3000");