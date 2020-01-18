const express = require("express"),
  app = express(),
  routes = require("./routes/index"),
  port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));

routes(app);

app.get("/", (req, res) =>
  res.send("Welcome To REST API using Express and node-localstorage")
);

app.listen(port, () => console.log(`Server is running on ${port}`));

console.log();
