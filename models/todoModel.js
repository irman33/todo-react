let todos = [];

module.exports.getTodos = () => {
  return todos;
};

exports.addTodo = todo => {
  todos.push(todo);
  return todo;
};

module.exports.deleteTodo = todoToDelete => {
  console.log("Model Delete:", todoToDelete);
  todos = todos.filter(todo => todo.id !== todoToDelete.id);
};

module.exports.updateTodo = updatedTodo => {
  let index = todos.findIndex(todo => todo.id === updatedTodo.id);
  todos[index] = updatedTodo;
};
