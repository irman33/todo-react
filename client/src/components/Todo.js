import React, { Component } from "react";
import "./Todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.handleStatus = this.handleStatus.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
  }

  handleStatus() {
    const updatedTodo = {
      ...this.props.todo,
      completed: !this.props.todo.completed
    };

    this.props.updateTodo(updatedTodo);
  }

  handleEditing(e) {
    console.log(e);
    console.log(this);

    const updatedTodo = {
      ...this.props.todo,
      editing: !this.props.todo.editing
    };

    this.props.updateTodo(updatedTodo);
  }

  handleEdit(e) {
    const updatedTodo = {
      ...this.props.todo,
      title: this.editInput.value
    };

    this.props.updateTodo(updatedTodo);
  }

  render() {
    const liClassName = `${this.props.todo.completed ? "completed" : ""} 
      ${this.props.todo.editing ? "editing" : ""} 
      `;
    return (
      <li className={liClassName}>
        <div className="view">
          <input
            className="toggle flex-1"
            onChange={this.handleStatus}
            type="checkbox"
            checked={this.props.todo.completed}
          />
          <span className="flex-9" onDoubleClick={this.handleEditing}>
            {this.props.todo.title}{" "}
          </span>
          <a
            className="delete flex-1"
            onClick={() => this.props.removeTodo(this.props.todo)}
          />
        </div>
        <input
          autofocus
          type="text"
          className="edit"
          value={this.props.todo.title}
          onChange={this.handleEdit}
          ref={input => {
            this.editInput = input;
          }}
          onBlur={this.handleEditing}
        />
      </li>
    );
  }
}

export default Todo;
