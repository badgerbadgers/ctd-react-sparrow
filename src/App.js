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

/* url used for getting data has been appended with view and sort parameters */
  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default?view=Grid%20view&sort[0][field]=Name&sort[0][direction]=asc`
/*
  functional component contains state for API data, 
*/
const App = () => {
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  /*
  initial useEffect hook that gets API data from airtable and sets data as todoList
  */
  useEffect(() => {
    fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
    }
  })
  .then(result => result.json())
  .then(result => setTodoList(result.records))
  setIsLoading(true)
  }, [])

  /*
  addTodo function adds newTodo to current todoList and sets that new array as current todoList
  */
  const addTodo = (newTodo) => {
   let newTodos = [newTodo, ...todoList]
   setTodoList(newTodos)
  };

  /*
  remove todo functions takes id and filters out items that are not equal to item id
  */
  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => id !== todo.id)
    setTodoList(newTodoList)
  };
  
  return (
    <BrowserRouter>
      <div className={style.container}>
        <div className={style.wrapper}>
          <h2 className={style.appHeader}> Todo List <Check height="30px" width="30px" fill="#40414a" stroke="#40414a" /></h2>
          <AddTodoForm onAddTodo={addTodo} />
          {!isLoading ? <p>is loading...</p> :
          <Routes>
            <Route exact path='/' element={<TodoList todoList={todoList} onRemoveTodo={removeTodo} />} /> 
          </Routes> }
      </div>
    </div>
    </BrowserRouter>
  );
}
 
export default App