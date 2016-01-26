'use strict';
const express = require('express');
const app = express();


app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
  res.sendFile('index');
});

app.listen(9000);
