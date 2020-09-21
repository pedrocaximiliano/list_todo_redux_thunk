const api = {
  getAll: () =>
    fetch("http://demo4883427.mockable.io/").then((resp) => resp.json()),
};

export { api };
