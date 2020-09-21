import { api } from "../service/api";

import { actions } from "../redux";

const thunksTodo = {
  getAll: () => (dispatch) =>
    api.getAll().then((tasks) => dispatch(actions.getAll(tasks))),
};

export { thunksTodo };
