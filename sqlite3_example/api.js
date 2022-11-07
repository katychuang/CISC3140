// Example modified from https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
// This example uses express and sqlite libraries.

// Import Express
const express = require('express');
const app = express();
const port = 3000;

// Import SQLite3
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('grades.db'); // use local file grades.db


// GET REQUEST example
// variables are truncated acronyms. r = row; f = field
app.get('/', function(req, res) {
  const r_id = req.query.id || '' ;
  const f1 = req.query.f1 || '' ;
  const f2 = req.query.f2 || '';

  var results = [];
  console.log("r_id " + r_id);

  var whereConditions = ((r_id === '' && f1 === '' && f2 === '') ? '' : 'WHERE ');
  if (r_id !== '') { whereConditions += `id = ${r_id} ` }
  if (f1 !== '') { whereConditions += `OR ITEM = ${f1} ` }
  if (f2 !== '') { whereConditions += `OR AID = ${f2} ` }
  console.log(whereConditions);
  db.serialize(function() {
    db.each(`SELECT rowid AS id, ITEM, AID, DUE_DATE FROM COURSE_REQ ${whereConditions}`, function(err, row) {
        results.push({ id: row.id, name: row.ITEM, assessment_type: row.AID, due_date: row.DUE_DATE});
    },function() {
        res.send({"results": results});
    });
    
  });
});

// GET REQUEST for a single row
app.get('/:id', function(req, res) {
  var results = [];
  db.serialize(function() {
    db.each("SELECT rowid AS id, f1, f2 FROM tbl WHERE rowid =" + req.params.id, function(err, row) {
        results.push({ id: row.id, name: row.f1, classes: row.f2});
    },function() {
        res.send({"results": results});
    });
    
  });
});

// POST REQUEST example for a single row
app.post('/update/:id', function(req,res) {
  const r_id = req.params.id || '' ;
  const f1 = req.query.f1 || '' ;
  const f2 = req.query.f2 || '';

  var results = [];
  console.log("r_id " + r_id);

  var insertValues = '';
  if (f1 !== '') { insertValues += `f1 = '${f1}' ` }
  if (f2 !== '') { insertValues += `, f2 = '${f2}' ` }

  console.log(insertValues);
  var str = ["UPDATE tbl SET", insertValues, "WHERE ID = ", r_id].join(" ");
   console.log("str", str);
   db.run(str);  

    db.each("SELECT rowid AS id, f1, f2 FROM tbl", function(err, row) {
        console.log(row.id + ": " + row.f1 + " " + row.f2);
    });

    db.close();
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});


