// Example from https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
// Using Express instead of Node 
// This example shows "Hello World" from the root

const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req, res) {
  res.send('Hello World!')
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});
