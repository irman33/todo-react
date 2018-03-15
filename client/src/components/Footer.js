import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p className="count">{this.props.activeCount} items left.</p>
        <div className="filter">
          <button onClick={() => this.props.handleFilter("all")}>All</button>
          <button onClick={() => this.props.handleFilter("active")}>
            Active
          </button>
          <button onClick={() => this.props.handleFilter("completed")}>
            Completed
          </button>
        </div>
        <button onClick={this.props.clearCompleted} className="flex-1">
          Clear completed
        </button>
      </div>
    );
  }
}

export default Footer;
