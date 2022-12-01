
const Tasks = require("../models/Tasks");
const asyncWrapper = require("../middleware/asyncwrapper")

//getalltask -- "/tasks"

//using async and await instend of .then()

const getTasks = asyncWrapper( async (req, res) => {
 
    const tasks = await Tasks.find();
    res.status(200).json({ noOfTasks: tasks.length, data: tasks });
  
});
//get a single ---  /tasks req.body
const createTask = asyncWrapper( async (req, res) => {
 

  
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(401).json({ msg: "please Provide necessary value" });
    }

    const task = await Tasks.create(req.body);
    //const task = await Tasks.create({title, description})
    res.status(201).json({ data: task });
 
});

//get a single? task/taskId req-params
const getSingleTask = asyncWrapper( async (req, res) => {
 

  
    const { taskId } = req.params;
    const task = await Tasks.findById({ _id: taskId });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `The Task with Id ${taskId} can not be found` });
    }
    res.status(200).json({ data: task });
  
});

// updating a task /tasks/:taskId req.body

const updateTask = asyncWrapper( async (req, res) => {
  
 
    const { taskId } = req.params;
    const { title, description, complated } = req.body;
    const userBody = req.body;

    //if (!title || !description || !completed){}
    const updatedTask = await Tasks.findByIdAndUpdate(
      { _id: taskId },
      userBody,
      {new: true, runValidators: true}
    );
    if (!updateTask) {
      return res.status(404).json({ msg: `Task with Id: ${taskId} not found` });
    }
    res.status(200).json({ msg: `Task Updated`, data: updatedTask });
 
});

const deleteTask =asyncWrapper( async (req, res) => {
  
 
    const { taskId } = req.params;
    const deleteTask = await Tasks.findByIdAndDelete({ _id: taskId });
    if (!deleteTask) {
      return res.status(404).json({ msg: "that task does not exist" });
    }
    res.status(200).json({ msg: "That task has been deleted" });
  
});

module.exports = {
  getTasks,
  createTask,
  getSingleTask,
  deleteTask,
  updateTask,
};
