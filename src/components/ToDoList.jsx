

// ***************** IMPORTS ***************** //

// BOOTSTRAP //
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// BOOTSTRAP //

import { nanoid } from "nanoid";


// ICONS //   Call them in like this    <FaBeer/>
import { FaReact,FaBootstrap,FaHouseUser, FaPlus} from "react-icons/fa";
// ICONS //


import { useState } from "react";


//import './App.css'
// ***************** IMPORTS ***************** //







export default function ToDoList(){


  // Our Array of items that hold our tasks
  const [tasksList, setTasks] = useState([
    {id: nanoid(), task: "Learn React", isCompleted: false, icon: <FaReact/>},
    {id: nanoid(), task: "Remember Bootstrap", isCompleted: false, icon: <FaBootstrap/>},
    {id: nanoid(), task: "Go Home", isCompleted: false, icon: <FaHouseUser/>},
  ]);


  // This is for adding and deleting
  const [newTask, setNewTask] = useState("");






  function onCheckBoxChange(userChecked, task){
    // Spread each task into a new array
    const checkedTask = [...tasksList];
    // get current tasks
    const index = checkedTask.indexOf(task);
    // change the attribute to either true or false
    checkedTask[index].isCompleted = userChecked.target.checked;
    // set the tasks into the new array
    setTasks(checkedTask);
  }


  function onAddTask(){
    const addTask = [...tasksList];
    addTask.push({id:nanoid(),task: newTask, isCompleted: false});
    setTasks(addTask);
    setNewTask("");
  }


  function onDeleteTask(task){
    const deleteTask = [...tasksList];
    const index = deleteTask.indexOf(task);
    deleteTask.splice(index,1);
    setNewTask(deleteTask);
  }


  function onEditTask(task){
    const editTask = [...tasksList];
    const index = editTask.indexOf(task);
    editTask[index].task = prompt("Edit Task", task.task)
  }






  return(
    <>
      <h1 >Todo List</h1>

      <form>

        <ul className="">
          {/* For every Task we have in the array do these */}
          {tasksList.map((task)=>(
            <li key={task.id} className="list-group-item   mt-2">       
                                                    {/* This calls in if the check box should be true or false based on array*/}
              <input type="checkbox" className="form-check-input" checked={task.isCompleted}          onChange={(userChecked) => onCheckBoxChange(userChecked,task)} />
              
              {/* calls in the name of the task Below */}
              <label className="form-check-label">{task.task} {task.icon}</label>

              <button className="btn btn-danger ms-5" onClick={() => onDeleteTask(task)}>Delete Task</button>

              <button className="btn btn-info ms-1" onClick={() => onEditTask(task)}>Edit Task</button>
            </li>
          ))}
        </ul>



        {/* Adding a New Task */}
        <div className="d-flex">
          <input className="form-control  mb-5" placeholder="Add a New Task" type="text" value={newTask} onChange={(taskNameAdded) => setNewTask(taskNameAdded.target.value)}/>
          <button className="btn btn-primary  mb-5"  onClick={{onAddTask}}><FaPlus/></button>
        </div>


      </form>
    </>

  )


}