import React, { useState } from 'react'
import TodoListItem from './TodoListItem'
// import PropTypes from 'prop-types'
import { FaSort, FaClock } from 'react-icons/fa'
import style from './TodoListItem.module.css'

/*
 a functional component that takes in props and maps through that data
 it will then return a div with key and a TodoListItem component that
 passes down props
*/
const TodoList = ({ todoList, onRemoveTodo }) => {
  const [isAscending, setIsAscending] = useState(true)
  // const [updatedTodoList, setUpdatedTodoList] = useState([])
  const [formattedTodos, setFormattedTodos] = useState([])


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

  const handleSort = (order) => {
    console.log('formatted',formattedTodoList)
    const updatedTodos = formattedTodoList.sort(timeSort)
    setFormattedTodos(updatedTodos)
  }

   const formattedTodoList = 
      todoList.map((item) => {
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
      })
  
    // setFormattedTodos(formattedTodoList)
    // console.log('formatted list', formattedTodoList)
    // const sortedDate = date.sort((a,b) => b - a)
    // console.log(sortedDate)

  return(
    <>
      <ul>
        <p>
          <FaSort onClick={() => handleSort(titleSort)} className={style.sortBtn} />
          <FaClock onClick={() => handleSort(timeSort)} className={style.timeBtn} />
        </p>
      {formattedTodos.length === 0 ?
    todoList.map((item) => {
    return( // mapping default list 
      <div key={item.id}>
        <TodoListItem  
        todo={item} 
        onRemoveTodo={onRemoveTodo}
        />
      </div>
    )
    }) : formattedTodos.map((item) => {
    return( //mapping sorted list 
      <div key={item.id}>
        <TodoListItem 
        todo={item} 
        onRemoveTodo={onRemoveTodo}
        />
      </div>
    )
    })}
      </ul>
    </>
  )
}
 
export default TodoList

/* 
imported PropTypes and created an object that has properties that have a key equal
to the prop or function being test and the value that uses PropTypes to test if output 
is type that is written (object, string, etc)
*/
