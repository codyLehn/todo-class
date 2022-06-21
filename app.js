//initiate express server
const express = require('express');
const app = express();

app.use(express.json());

const mongodb = require('./persist/mongo');

const Todo = require('./persist/todo');

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
  // const todo = persist.getTodo(id);
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

app.post('/todo', (req, res) => {
  const vTodo = req.body;
  // setUpTodo(req.body)
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

app.delete('/todo/:id', (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete()
    .then()
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.put('/todo/:id', (req, res) => {
  const id = req.params.id;
  const vTodo = helpers.setUpTodo(req.body);
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

mongodb.setUpConnectionHandlers(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
mongodb.connect();
