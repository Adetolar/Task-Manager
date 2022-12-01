const express = require("express")
const router = express.Router()
const{ getTasks, createTask, getSingleTask, deleteTask, updateTask }= require("../controllers/taskController")


//getalltasks "/tasks"
router.get("/tasks", getTasks );

// create a task /tasks req.body
router.post("/tasks", createTask );


//get a single /tasks/taskid req.params
router.get("/tasks/:taskId", getSingleTask);
//tasks/tasks/:taskId
// updating  task  /tasks/:taskId req.body
router.patch("/tasks/:taskId", updateTask);


//delete a task /tasks/:taskId
router.delete("/tasks/:taskId", deleteTask);

//router.route("/").get(getTask).post(createTask);
//router.route("/:taskId").get(getTask).delete(deleteTask).patch(updateTask);


module.exports = router

