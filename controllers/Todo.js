const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./db");

module.exports = {
  get(request, response) {
    if (localStorage.getItem("todos")) {
      if (!request.params.id) {
        // Return all todos
        response.json({
          todos: JSON.parse(localStorage.getItem("todos"))
        });
      } else {
        // Return single todo
        const todo = JSON.parse(localStorage.getItem("todos")).filter(
          todo => todo.id === parseInt(request.params.id, 10)
        );

        response.json({
          todo
        });
      }
    } else {
      // No todos set on localStorage, fall back to empty response
      response.json({
        todos: []
      });
    }
  },

  create(request, response) {
    if (request.body.name && request.body.completed) {
      // Add new todo
      const todos = JSON.parse(localStorage.getItem("todos")) || [];

      todos.push({
        id: todos.length,
        name: request.body.name,
        completed: request.body.completed === "true"
      });

      localStorage.setItem("todos", JSON.stringify(todos));

      response.json({
        message: "Todo has been successfully created. 🎉"
      });
    } else {
      response.json({
        error: "⚠️ You must provide a name and a completed state."
      });
    }
  },

  update(request, response) {
    if (request.params.id && (request.body.name || request.body.completed)) {
      // Update todo
      const todos = JSON.parse(localStorage.getItem("todos"));

      todos.forEach(todo => {
        if (parseInt(request.params.id, 10) === todo.id) {
          todo.name = request.body.name || todo.name;

          if (request.body.completed) {
            todo.completed = request.body.completed === "true";
          }
        }
      });

      localStorage.setItem("todos", JSON.stringify(todos));

      response.json({
        message: "Todo has been successfully updated. 🎉"
      });
    } else {
      response.json({
        error: "⚠️ You must provide an id and a property to update."
      });
    }
  },

  delete(request, response) {
    if (request.params.id) {
      const todos = JSON.parse(localStorage.getItem("todos")).filter(
        todo => todo.id !== parseInt(request.params.id, 10)
      );

      localStorage.setItem("todos", JSON.stringify(todos));

      response.json({
        message: "Todo has been successfully removed. 🗑️"
      });
    } else {
      response.json({
        error: "⚠️ You must provide an id."
      });
    }
  }
};
