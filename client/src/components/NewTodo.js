import React, { Component } from "react";
import "./NewTodo.css";

class NewTodo extends Component {
  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyPress={this.props.addTodo}
      />
    );
  }
}

export default NewTodo;
