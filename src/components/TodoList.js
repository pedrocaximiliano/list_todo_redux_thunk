import React, { Component } from "react";

import { connect } from "react-redux";

import { actions } from "../redux";

import { thunksTodo } from "../thunks/todo";

import "./TodoList.css";

class TodoList extends Component {
  state = {
    task: "",
    data: "",
  };

  async getAllApi() {
    const { getAll } = this.props;
    const response = await getAll();
    console.log("response", response);
    return;
  }

  componentDidMount() {
    this.getAllApi();
  }

  render() {
    const { tasks } = this.props;
    const { task } = this.state;
    return (
      <div className="todo">
        <form className="todo-form" onSubmit={this.handleSubmit}>
          <input
            className="todo-field"
            onChange={this.handleChange}
            type="text"
            value={task}
          />
          <button className="todo-btn" type="submit">
            Add
          </button>
        </form>
        <table className="todo-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {console.log("dddd", tasks)}

            {tasks.map((task) => (
              <tr key={task}>
                <td>{task}</td>
                <td>
                  <button
                    className="todo-table-btn"
                    onClick={() => this.handleRemove(task)}
                    type="button"
                  >
                    Done
                  </button>
                </td>
              </tr>
            ))}

            {/* {dataFromApi.map((data) => (
              <tr key={data}>
                <td>{data}</td>
                <td>
                  <button
                    className="todo-table-btn"
                    type="button"
                  >
                    Done
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    );
  }

  handleChange = (event) => this.setState({ task: event.target.value });

  handleRemove = (task) => {
    const { remove } = this.props;
    remove(task);
  };

  handleSubmit = (event) => {
    const { add } = this.props;
    const { task } = this.state;
    event.preventDefault();
    add(task);
    this.setState({ task: "" });
  };
}

const mapStateToProps = (state) => ({
  tasks: state.todoReducer.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  add: (task) => dispatch(actions.add(task)),
  remove: (task) => dispatch(actions.remove(task)),
  getAll: () => dispatch(thunksTodo.getAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
