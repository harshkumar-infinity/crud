const express = require("express");
const app = express();

const { get, post, delcontroll, putcontroll } = require("../controller/controller");

app.get("/", get);
app.post("/", post);
app.delete("/:id", delcontroll);
app.put("/:id", putcontroll);

module.exports = app;