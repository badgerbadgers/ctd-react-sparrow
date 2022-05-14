import React, { useState, useEffect } from 'react'
import style from './App.module.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AddTodoForm from './components/AddTodoForm'
import TodoList from './components/TodoList'
import { ReactComponent as Check } from './img/edit-list.svg'
import { times } from 'lodash';

/* url used for getting data has been appended with view and sort parameters */
const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default?view=Grid%20view&sort[0][field]=Name&sort[0][direction]=asc`
/* url used for posting data */
const urlPost = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`
/* url used for deleting data */
const urlDelete = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/`

/*
  functional component contains state for API data, 
*/
const App = () => {
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAscending, setIsAscending] = useState(true)
  const [formattedTodos, setFormattedTodos] = useState([])

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
  }, [])

  /* a compare function */
  function titleSort(a, b) {
    /* sort in ascending order */
    if(!isAscending) {
      setIsAscending(!isAscending)
      if(a.title < b.title) {
        return -1
      }
      if(a.title > b.title) {
        return 1
      }
      return 0
    }
    /* sort in descending order */
    if (isAscending) {
      setIsAscending(!isAscending)
      if(a.title < b.title) {
        return 1
      }
      if(a.title > b.title) {
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
  const handleSort = (order) => {
    const updatedTodos = formattedTodoList.sort(timeSort)
    setFormattedTodos(updatedTodos)
  }

   // /* maps array and splits at the 'T', returns a new array and object */
   const formattedTodoList = 
      todoList.map((item) => {
        if(item.createdTime === undefined) {
          return
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
  const addTodo = async (title) => {
    let newTodos = [
      {
      id: Date.now(),
      "fields": {
        "Name": title
        }
      }, ...todoList]
   setTodoList(newTodos)
    let data = await fetch(urlPost, {
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
    getData()
  };

  /*
  remove todo functions takes id and filters out items that are not equal to item id, sends
  delete request using fetch to airtable and deletes that record on airtable
  */
  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => id !== todo.id)
    setTodoList(newTodoList)
    fetch(urlDelete+id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(res => console.log("DELETE: ", res));
  };

  return (
    <BrowserRouter>
      <div className={style.container}>
        <div className={style.wrapper}>
          <h2 className={style.appHeader}> 
          Todo List 
          <Check height="30px" width="30px" fill="#40414a" stroke="#40414a" /></h2>
          <AddTodoForm onAddTodo={addTodo} />
          {!isLoading ? <p>is loading...</p> :
          <Routes>
            <Route exact path='/' element={<TodoList todoList={todoList} onRemoveTodo={removeTodo} 
            timeSort={timeSort} handleSort={handleSort} titleSort={titleSort} 
            formattedTodoList={formattedTodoList} setFormattedTodos={setFormattedTodos}
            formattedTodos={formattedTodos} isAscending={isAscending} />} /> 
          </Routes> }
      </div>
    </div>
    </BrowserRouter>
  );
}
 
export default App