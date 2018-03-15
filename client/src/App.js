import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NewTodo from "./components/NewTodo";
import Todo from "./components/Todo";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      display: "all",
      activeCount: 0
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
  }

  componentDidMount() {
    fetch("/api/getTodos")
      .then(res => res.json())
      .then(todos => {
        let activeCount = todos.filter(todo => todo.completed === false).length;
        this.setState({ todos, activeCount });
      })
      .catch(error => console.error("Error:", error));
  }

  addTodo(e) {
    if (e.charCode !== 13) return;
    const title = e.currentTarget.value;

    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
      editing: false
    };
    let todos = this.state.todos;
    todos.push(newTodo);
    let activeCount = todos.filter(todo => todo.completed === false).length;
    this.setState({ todos, activeCount });

    fetch("/api/addTodo", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => console.log("Success:", response))
      .catch(error => console.error("Error:", error));

    e.currentTarget.value = "";
  }

  removeTodo(todoToRemove) {
    console.log(todoToRemove);
    let todos = this.state.todos.filter(todo => {
      return todo.id !== todoToRemove.id;
    });
    let activeCount = todos.filter(todo => todo.completed === false).length;
    this.setState({ todos, activeCount });

    fetch("/api/deleteTodo", {
      method: "DELETE",
      body: JSON.stringify(todoToRemove),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => console.log(res))
      .catch(error => console.error("Error:", error));
  }

  updateTodo(updatedTodo) {
    const todos = this.state.todos;
    let index = todos.findIndex(todo => todo.id === updatedTodo.id);
    todos[index] = updatedTodo;

    let activeCount = todos.filter(todo => todo.completed === false).length;
    this.setState({ todos, activeCount });

    fetch("/api/updateTodo", {
      method: "PUT",
      body: JSON.stringify({ updatedTodo }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => console.log(res))
      .catch(error => console.error("Error:", error));
  }

  clearCompleted() {
    let todos = this.state.todos.filter(todo => !todo.completed);
    let todosToDelete = this.state.todos.filter(todo => todo.completed);

    let activeCount = todos.filter(todo => todo.completed === false).length;
    this.setState({ todos, activeCount });

    todosToDelete.forEach(todoToRemove => {
      fetch("/api/deleteTodo", {
        method: "DELETE",
        body: JSON.stringify(todoToRemove),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
        .then(res => console.log(res))
        .catch(error => console.error("Error:", error));
    });
  }

  handleFilter(filter) {
    let display = filter;
    this.setState({ display });
  }

  render() {
    let todosToDisplay = [];
    if (this.state.display === "active") {
      todosToDisplay = this.state.todos.filter(item => !item.completed);
    } else if (this.state.display === "completed") {
      todosToDisplay = this.state.todos.filter(item => item.completed);
    } else if (this.state.display === "all") {
      todosToDisplay = this.state.todos;
    }

    return (
      <div className="app">
        <Header />
        <NewTodo addTodo={this.addTodo} />
        <ul>
          {todosToDisplay.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={this.removeTodo}
              updateTodo={this.updateTodo}
            />
          ))}
        </ul>
        <Footer
          activeCount={this.state.activeCount}
          handleFilter={this.handleFilter}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}

export default App;
