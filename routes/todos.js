var express = require("express");
var router = express.Router();
const todoController = require("../controllers/todoController");

/* GET users listing. */
router.get("/getTodos", todoController.getTodos);
router.post("/addTodo", todoController.addTodo);
router.delete("/deleteTodo", todoController.deleteTodo);
router.put("/updateTodo", todoController.updateTodo);

module.exports = router;
