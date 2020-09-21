import { combineReducers, createStore } from "redux";

import { ACTIONS_TYPES } from "./types";
import { applyMiddleware } from "redux";

import thunk from "redux-thunk";

const INITIAL_STATE = {
  tasks: [],
};

const todoReducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  const { tasks } = state;
  switch (type) {
    case ACTIONS_TYPES.TODO_ADD:
      return { ...state, tasks: [...tasks, payload] };
    case ACTIONS_TYPES.TODO_REMOVE:
      return { ...state, tasks: tasks.filter((task) => task !== payload) };
    case ACTIONS_TYPES.TODO_GET_ALL:
      return { ...state, tasks: payload };
    default:
      return state;
  }
};

const reducers = combineReducers({
  todoReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

const actions = {
  add: (task) => ({
    payload: task,
    type: ACTIONS_TYPES.TODO_ADD,
  }),
  remove: (task) => ({
    payload: task,
    type: ACTIONS_TYPES.TODO_REMOVE,
  }),
  getAll: (task) => ({
    payload: task,
    type: ACTIONS_TYPES.TODO_GET_ALL,
  }),
};

export { actions, store };
