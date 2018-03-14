const TodoModel = require("../models/todoModel");

module.exports.getTodos = (req, res) => {
  res.json(TodoModel.getTodos());
};

module.exports.addTodo = (req, res) => {
  const todo = req.body;
  const addedTodo = TodoModel.addTodo(todo);
  console.log(addedTodo);
  res.json(addedTodo);
};

module.exports.deleteTodo = (req, res, next) => {
  console.log("What's this:", req.body);
  const todo = req.body;
  console.log(todo);
  TodoModel.deleteTodo(todo);
  res.sendStatus(200);
};

module.exports.updateTodo = (req, res, next) => {
  console.log("What's this:", req.body);
  const updatedTodo = req.body.updatedTodo;
  TodoModel.updateTodo(updatedTodo);
  res.sendStatus(200);
};
