//initiate express server
const express = require('express');
const app = express();

app.use(express.json());
// pull in helpers
const helpers = require('./helper');
//pull in memory db
const Todo = require('./persist/todo');

app.post('/todo', (req, res) => {
  // validate data
  const vTodo = helpers.setupTodo(req.body);
  Todo.create(vTodo)
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      res.status(500).json(err);
    });

  // console.log(req.body);
  // persist.addTodo(req.body);
  // res.send('Post Todo');
});
app.get('/todo/:id', (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .then((todo) => {
      if (todo == null) {
        res.status(404).json({ message: 'not found' });
      }
      res.json(todo);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.delete('/todo/:id', (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id, req.body)
    .then((todo) => {
      if (todo == null) {
        res.status(404).json({ message: 'not found' });
      }
      res.json(todo);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.put('/todo/:id', (req, res) => {
  const id = req.params.id;
  // const vTodo = helpers.setupTodo(req.body);
  const vTodo = req.body;
  Todo.findByIdAndUpdate(id, vTodo)
    .then((todo) => {
      if (todo == null) {
        res.status(404).json({ message: 'not found' });
      }
      res.json(todo);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.patch('/todo/:id', (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndUpdate(id, req.body)
    .then((todo) => {
      if (todo == null) {
        res.status(404).json({ message: 'not found' });
      }
      res.json(todo);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = app;
