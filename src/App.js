import React, { useState, useEffect } from 'react'
import style from './App.module.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PropTypes from 'prop-types'
import AddTodoForm from './components/AddTodoForm'
import TodoList from './components/TodoList'
import { ReactComponent as Check } from './img/edit-list.svg'

/* dynamic airtable table name */
const tableName = `Todo-List`

/* url used for getting data has been appended with view and sort parameters */
// const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default?view=Grid%20view&sort[0][field]=Name&sort[0][direction]=asc`
const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}?view=Grid%20view&sort[0][field]=Name&sort[0][direction]=asc`

/* url used for posting or deleting data */
const urlPostDelete = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}/`

/*
  functional component contains state for API data, routes for components and jsx
*/
const App = () => {
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAscending, setIsAscending] = useState(true)
  const [formattedTodos, setFormattedTodos] = useState([])
  const [todoCount, setTodoCount] = useState(0)

  /* function for getting data */
  function getData() {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      }
    })
    .then(result => result.json())
    .then(result => setTodoList(result.records))
    setIsLoading(true)
  }
  /*
  initial useEffect hook that gets API data from airtable and sets data as todoList
  */
  useEffect(() => {
    getData()
    setTodoCount(todoList.length)
  }, [todoList])

  /* a compare function */
  function titleSort(a, b) {
    /* sort in ascending order */
    if(!isAscending) {
      setIsAscending(!isAscending)
      if(a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1
      }
      if(a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      }
      return 0
    }
    /* sort in descending order */
    if (isAscending) {
      setIsAscending(!isAscending)
      if(a.title.toLowerCase() < b.title.toLowerCase()) {
        return 1
      }
      if(a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1
      }
      return 0
    }
  }
  
  function timeSort(a, b) {
    /* sort in ascending order */
    if(!isAscending) {
      setIsAscending(!isAscending)
      if(a.time < b.time) {
        return -1
      }
      if(a.time > b.time) {
        return 1
      }
      return 0
    }
    /* sort in descending order */
    if (isAscending) {
      setIsAscending(!isAscending)
      if(a.time < b.time) {
        return 1
      }
      if(a.time > b.time) {
        return -1
      }
      return 0
    }
  }

  /* runs onclick sorts time */
  const handleSort = (sortMethod) => {
    let updatedTodos = formattedTodoList.sort(sortMethod)
    // setTodoList(updatedTodos)
    // console.log('updated with set todo func',todoList)
    setFormattedTodos(updatedTodos)
  }

  /* maps array and splits at the 'T', returns a new array and object */
   const formattedTodoList = 
      todoList.map((item) => {
        if(item.createdTime === undefined) {
          return null
        } else {
          const currentDate = item.createdTime.split('T')
          const date = currentDate[0]
          const time = currentDate[1]
          const title = item.fields.Name
          const id = item.id
          const todo = {
            title: title,
            id: id,
            date: date,
            time: time
          }
          return todo
        }
      })
  /*
  addTodo function adds newTodo to current todoList and sets that new array as current todoList
  adding a new todo will call new API call
  */
  const addTodo = (title) => {
    if(title === ''){
      alert('enter a todo')
    } else {
      let newTodo = [
        {
        id: Date.now(),
        "fields": {
          "Name": title
          }
        }, ...todoList]
        setTodoList(newTodo)
      fetch(urlPostDelete, {
        method: 'POST',
        body: JSON.stringify({
          "records": 
          [{
            "fields": {
              "Name": title
            }
          }]
        }),
          headers: {
              Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
              'Content-Type': 'application/json',
            }
      })
      .then(res => res.json())
        setFormattedTodos([])
        setTodoCount(todoCount + 1)
    }
  };

  /*
  remove todo functions takes id and filters out items that are not equal to item id, sends
  delete request using fetch to airtable and deletes that record on airtable
  */
  const removeTodo = async (id) => {
    await fetch(urlPostDelete+id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    // let newTodoList = todoList.filter((todo) => id !== todo.id)
    // setTodoList(newTodoList)
    // getData()
    let newTodos = todoList.filter((todo) => id !== todo.id)
    setTodoList(newTodos)
    setFormattedTodos([])
    setTodoCount(todoCount - 1)
  };

  const editTodo = async (editedText, id) => {
    await fetch(url+id, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "records": 
        [{
          "id": id,
          "fields": {
            "Name": editedText
          }
        }]
      })
    })
    setTodoList(todoList)
    setFormattedTodos([])
  }
  
  /* the return statement uses BrowserRouter to route the AddTodoForm and TodoList with the default '/' url
    navigating to the url 'form' points the user to the AddTodoForm component and the 'todolist' points the user to the
    TodoList component
  */
  return (
    <BrowserRouter>
      <div className={style.container}>
        <div className={style.wrapper}>
          <h2 className={style.appHeader}> 
            {tableName}
          <Check height="30px" width="30px" fill="#40414a" stroke="#40414a" 
          style={{paddingLeft: '10px'}}
          /></h2>
          {!isLoading ? <p>is loading...</p> :
          <Routes>
            <Route path='/' element={
              <> 
                <AddTodoForm onAddTodo={addTodo} />
                <TodoList 
                  todoList={todoList} onRemoveTodo={removeTodo} timeSort={timeSort} 
                  handleSort={handleSort} titleSort={titleSort} formattedTodoList={formattedTodoList} 
                  setFormattedTodos={setFormattedTodos} formattedTodos={formattedTodos} editTodo={editTodo}
                  isAscending={isAscending} addTodo={addTodo} setTodoList={setTodoList} todoCount={todoCount}
                />
              </> 
            } />
            <Route path='/form' element={ <AddTodoForm onAddTodo={addTodo} /> } />
            <Route path='/todolist' element={
              <TodoList 
                todoList={todoList} onRemoveTodo={removeTodo} timeSort={timeSort} 
                handleSort={handleSort} titleSort={titleSort} formattedTodoList={formattedTodoList} 
                setFormattedTodos={setFormattedTodos} formattedTodos={formattedTodos} 
                isAscending={isAscending} editTodo={editTodo} addTodo={addTodo} setTodoList={setTodoList} todoCount={todoCount} 
              />
            } />
          </Routes> 
          }
      </div>
    </div>
    </BrowserRouter>
  );
}
 
export default App

App.protoTypes = {
  tableName: PropTypes.string,
  url: PropTypes.string,
  urlPostDelete: PropTypes.string,
  getData: PropTypes.func,
  todoList: PropTypes.array,
  isLoading: PropTypes.bool,
  isAscending: PropTypes.bool,
  formattedTodos: PropTypes.array,
  titleSort: PropTypes.func,
  timeSort: PropTypes.func,
  handleSort: PropTypes.func,
  formattedTodoList: PropTypes.func,
  addTodo: PropTypes.func,
  removeTodo: PropTypes.func,
  editTodo: PropTypes.func
}