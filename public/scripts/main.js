var n=1;
var x=0;

var n_string=["fname","sname","date","Vaxadmin","pvax"];
var storageOb=[];

function condensed_formsub(){
	var AddRown=document.getElementById('tbl');
	var NewRow=AddRown.insertRow(1);
	var temp=[];
	for (let i=0;i<n_string.length;i++){
		temp[i]=document.getElementById(n_string[i]).value;
		NewRow.insertCell(i).innerHTML=temp[i];
	}
	storageOb[x]=temp;
	n++;
	x++;
	return false;
}
/*
function addData() {
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('./data.db');
    db.run('INSERT INTO info (result) VALUES (10)', function(err, row) {
        if(err) {
            console.log(err.message);
        }
        console.log("entry added to table");
    });
}
addData();
*/