

// ***************** IMPORTS ***************** //

// BOOTSTRAP //
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// BOOTSTRAP //

import { nanoid } from "nanoid";


// ICONS //   Call them in like this    <FaBeer/>
import { FaPlus, FaReact, FaBootstrap, FaHouseUser } from "react-icons/fa";
// ICONS //

// COMPONENTS //
import ToDoItem from "./ToDoItem";
// COMPONENTS //

import { useState, useEffect } from "react";


//import './App.css'
// ***************** IMPORTS ***************** //







export default function ToDoList(){


  // Our Array of items that hold our tasks
  const [tasksList, setTasks] = useState( () => {

    const localValue = localStorage.getItem("TASKS");

    // IF there is no local storage return our default array of tasks
    if(localValue == null) 
    return [
      {id: nanoid(), task: "Learn React" , icon: FaReact, isCompleted: true, editMode: false },
      {id: nanoid(), task: "Remember Bootstrap", isCompleted: false, editMode: false, icon: FaBootstrap},
      {id: nanoid(), task: "Go Home", isCompleted: true, editMode: false, icon: FaHouseUser},
    ];

    // Otherwise return whats in the local data if it exists
    return JSON.parse(localValue);

  });


  // This allows us to save our items into our local storage thus they wont refresh every time
  useEffect(() => {
    // Saves item into local storage
    localStorage.setItem("TASKS", JSON.stringify(tasksList));
  }) , [tasksList];  // Any time you use set task or the tasks change your re run this item




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



    // This is for adding and deleting
    const [newTask, setNewTask] = useState("");

  function onAddTask(evt){
    evt.preventDefault(); // this gets rid of the form tag trying to submit the form when adding new task
    const addTask = [...tasksList];
    addTask.push({id:nanoid(),task: newTask, isCompleted: false,  editMode: false});
    setTasks(addTask);
    setNewTask("");
  }


  function onDeleteTask(task){
    const deleteTask = [...tasksList];
    const index = deleteTask.indexOf(task);
    deleteTask.splice(index,1);
    setTasks(deleteTask);
  }


  // eee USER IS IN EDIT MODE eee //

    // Used for updating
    const [updateTask, setUpdateTask] = useState("");

  // Turns on edit mode
  function onEditTask(task){
    const editTask = [...tasksList];
    const index = editTask.indexOf(task);
    editTask[index].editMode = true;
    //editTask[index].task = prompt("Edit Task", task.task);
    setUpdateTask(task.task); // shows the name in the textbox before change
    setTasks(editTask);
  }


  function onSaveTask(task){
    const saveTask = [...tasksList];
    const index = saveTask.indexOf(task);
    saveTask[index].task = updateTask;
    saveTask[index].editMode = false;
    setTasks(saveTask);
  }


  const onCancelClick = (task) => {
    const cancelTask = [...tasksList];
    const index = cancelTask.indexOf(task);
    cancelTask[index].editMode = false;
    setTasks(cancelTask);
  }

  // eee USER IS IN EDIT MODE eee //



  // dddd DROP DOWN MENU dddd //

  const [filteredTasks, setFilteredTasks] = useState(tasksList); // array of our filtered tasks

  const [filter, setFilter] = useState("allTasks"); // allTasks, completed, incomplete

  const onSelectChange = (evt) => {
    // Set the filter to the value of what the user chose
    setFilter(evt.target.value);
    setFilteredTasks(tasksList.filter((task) => {

      if(evt.target.value === "allTasks") return true;
      if(evt.target.value === "completed") return task.isCompleted;
      if(evt.target.value === "incomplete") return !task.isCompleted;

    }));
  }
  // dddd DROP DOWN MENU dddd //



  return(
    <>

    <header className="d-flex">
        <h1 >Todo List {filter}</h1>

        <select defaultValue="allTasks" className="form-select" aria-label="Default select example" onChange={(evt) => onSelectChange(evt)}>
          <option  value="allTasks">Show All Tasks</option>
          <option value="completed">Show Completed Tasks</option>
          <option value="incomplete">Show Incomplete Tasks</option>
        </select>
      </header> 


      <form>

        <ul className="">
          {/* For every Task we have in the array do these */}
          {filteredTasks.map((task)=>(
            <ToDoItem  
              // THESE ITEMS ARE BEING PASSED INTO THE ToDoItem.jsx file
              task={task}  
              key={task.id}  
              updateTask={updateTask}
              setUpdateTask={(updateTask) => setUpdateTask(updateTask)}
              onCheckBoxChange = {(userChecked) => onCheckBoxChange(userChecked, task)}
              onDeleteTask = {() => onDeleteTask(task)}
              onEditTask = {() => onEditTask(task)}
              onSaveTask = {() => onSaveTask(task)}
              onCancelClick = {() => onCancelClick(task)}
            />
          ))}
        </ul>



        {/* Adding a New Task */}
        <div className="d-flex">
          <input className="form-control  mb-5" placeholder="Add a New Task" type="text" value={newTask} onChange={(taskNameAdded) => setNewTask(taskNameAdded.target.value)}/>
          <button className="btn btn-primary  mb-5"  onClick={(evt) => onAddTask(evt)}><FaPlus/></button>
        </div>


      </form>
    </>

  )


}