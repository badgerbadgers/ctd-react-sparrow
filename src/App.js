import React, { useState, useEffect } from 'react'
import style from './App.module.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AddTodoForm from './AddTodoForm'
import TodoList from './TodoList'
import { ReactComponent as Check } from './img/edit-list.svg'
import logo from './img/edit-list.svg'

/*
  functional component sets state with two variables contains two useEffect hooks, functions and returns JSX
*/
const App = () => {
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  /*
  initial useEffect hook call the built in fetch method it has 2 arguments. the first argument is
  the url with a variable for AIRTABLE_BASE_ID used with backticks (`) and template literal syntax(${}). The second is the
  option object that provides an object with Authorization property, this property contains the API key
  also written similar to the AIRTABLE_BASE_ID with template literal and backticks. There is a .then
  chained after the fetch and takes the result data and turns it into a JSON object. Another .then and calls
  the setTodoList function to set result. records as the new todoList.
  
  The second argument for useEffect is an empty array as second argument
  */
  useEffect(() => {
  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`
    fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      }
    })
    .then(result => result.json())
    .then(result => setTodoList(result.records))
  }, [])

  /*
  addTodo function that takes in a variable newTodo 
  then creates a new variable newTodos equal to the newTodo added to the
  todoList state variable the setTodoList then runs and sets the todoList
  to equal the newTodos variable
  */
  const addTodo = (newTodo) => {
   let newTodos = [newTodo, ...todoList]
   setTodoList(newTodos)
  };

  /*
  a function that takes in an id as paramater and creates a variable that is
  equal to a filter method applied to todoList state, filter checks if the current
  id is not equal to the current todo.id if not equal return todo, then the set function
  setTodoList will return the newTodoList
  */
  const removeTodo = (id) => {
    const newTodoList = todoList.filter(
      (todo) => id !== todo.id
    )
    setTodoList(newTodoList)
  };
  
  /*
  a 2nd useEffect hook, this will run if isLoading state is false, it will add todos to your local storage
  saving them with a key and the value as a string, this useEffect will run anytime the todoList variable changes
  */
  useEffect(() => {
    if(!isLoading) {
      return localStorage.setItem('savedTodoList', JSON.stringify(todoList))
    }
  },[todoList])

  return (
    <BrowserRouter>
      <div className={style.container}>
        <div className={style.wrapper}>
          <h2 className={style.appHeader}> Todo List <Check height="30px" width="30px" /></h2>
          <AddTodoForm onAddTodo={addTodo} />
          <Routes>
          <Route exact path='/' element={<TodoList todoList={todoList} onRemoveTodo={removeTodo}  />} />
          <Route path='/new' element={<h1>"New Todo List"</h1>} />
      </Routes>

      {/* will render when isLoading state is changed {isLoading ? (
        <p>Loading ...</p> 
        ):(
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )} */}
      </div>
    </div>
    </BrowserRouter>
  );
}
 
export default App