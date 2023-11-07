
/* STEPS TAKEN TO INSTALL AND START
1. npm create vite@latest .
2. npm i
3. npm i bootstrap 
4. npm i react-icons -- can call in icons
5. npm i nanoid

TO START: npm run dev

*/


// ***************** IMPORTS ***************** //

// BOOTSTRAP //
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// BOOTSTRAP //


// COMPONENTS //
import ToDoList from "./components/ToDoList";
// COMPONENTS //



//import './App.css'
// ***************** IMPORTS ***************** //



function App() {


  return (
    <>
      <div className="container text-light bg-dark">
        <ToDoList />
      </div>
    </>
  )
}

export default App
