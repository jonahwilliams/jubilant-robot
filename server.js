'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('index');
});

app.listen(9090);
