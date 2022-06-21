const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  name: { type: String },
  description: { type: String },
  done: { type: Boolean },
  deadline: { type: Date, default: new Date() },
  tags: { type: [String], default: [] },
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
