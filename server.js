'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const state = {
  uid: 4,
  todos: [
    {id: 0, title: 'Demo 1', desc: 'ABC easy as 123', time: Date.now(), completed: false},
    {id: 1, title: 'Demo 2', desc: 'ABC easy as 123', time: Date.now(), completed: false},
    {id: 2, title: 'Demo 3', desc: 'ABC easy as 123', time: Date.now(), completed: false},
    {id: 3, title: 'Demo 4', desc: 'ABC easy as 123', time: Date.now(), completed: false}
  ]
};


app.use(express.static(__dirname + '/dist'));
app.use(bodyParser);

app.get('/', (req, res) => {
  res.sendFile('index');
});

app.get('/todos', (req, res) => {
  res.json(state);
});

app.post('/todos', (req, res) => {
  state.uid = req.body.uid;
  state.todos = req.body.todos;
  res.json(state);
});

app.listen(9090);
