//initiate express server
const express = require('express');
const app = express();

app.use(express.json());

const mongodb = require('./persist/mongo');

const persist = require('./persist');

//put in command line flags
const flags = require('flags');
flags.defineNumber('port', 3000, 'Ports for the http server');
flags.parse();

//put in env var
const dotenv = require('dotenv');

//set up port number
const port = flags.get('port') || process.env.PORT || 4000;

app.get('/todo/:id', (req, res) => {
  const id = req.params.id;
  const todo = persist.getTodo(id);
  res.json(todo);
});

app.get('/todos', (req, res) => {
  res.json(persist.getTodos());
});

app.post('/todo', (req, res) => {
  console.log(req.body);
  persist.addTodo(req.body);
  res.send('Post Todo');
});

app.delete('/todo', (req, res) => {
  res.send('delete todo');
});

app.put('/todo', (req, res) => {
  res.send('put todo');
});

app.patch('/todo', (req, res) => {
  res.send('patch todo');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
