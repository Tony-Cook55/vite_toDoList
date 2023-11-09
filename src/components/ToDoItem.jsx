import React from 'react';
// This disables the stupid linter so we don't need props
/* eslint-disable */

export default function ToDoItem({task, updateTask, setUpdateTask, onCheckBoxChange, onDeleteTask, onEditTask, onSaveTask, onCancelClick}){

  return(
    <>



    <h1>To Do Item</h1>

      <li className="list-group-item   mt-2">

        {/* If users edit mode is true show the first set of things */}
        { task.editMode ?
        <> {/* IF EDIT MODE IS TRUE DO THESE*/}
          <input type="text" className="form-check" value={updateTask}  onChange={(userUpdates) => setUpdateTask(userUpdates.target.value)} />
          <button className="btn btn-primary ms-5" onClick={() => onSaveTask(task)}>Save Task</button>
          <button className="btn btn-info ms-1" onClick={() => onCancelClick(task)}>Cancel</button>
        </>

        : // If the editMode is false show original items and the delete and edit buttons

        // task.editMode ? <p>You Are Now In Edit Mode</p> : 
          <label className="form-check-label" >
            <div>
              {/* This calls in if the check box should be true or false based on array*/}
              <input type="checkbox" className="form-check-input" checked={task.isCompleted}    onChange={(userChecked) => onCheckBoxChange(userChecked,task)} />

              {task.task} 

              <button className="btn btn-danger ms-5" onClick={() => onDeleteTask(task)}>Delete Task</button>
              <button className="btn btn-info ms-1" onClick={() => onEditTask(task)}>Edit Task</button>
            </div>
          </label>
        }
      </li>
    
    </>
  )









}