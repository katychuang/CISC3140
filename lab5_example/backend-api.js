const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const sql = require('sqlite3');
var db = new sql.Database('database.db');

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// endpoint that connects with the sqlite database
app.get('/api/fruit', (req, res) => {
 var results = [];
 db.serialize(function() {
    db.each(`SELECT rowid AS id, name, color FROM fruit`, function(err, row) {
      results.push({ id: row.id, name: row.name, color: row.color });
     },function() {
         res.send({"results": results});
     });

   });


});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
