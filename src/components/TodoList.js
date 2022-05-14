import React, { useState, useEffect } from 'react'
import TodoListItem from './TodoListItem'
import PropTypes from 'prop-types'
import { FaSort, FaClock } from 'react-icons/fa'
import style from '../components/TodoList.module.css'

/* once add button clicked sort by name ascending, rerender then get data again? or leave it 
unsorted the sort when either sort time or alpha button is clicked.
*/
/* create new state is sorted when add button is clicked from app toggle isSorted to true then sort
else is sorted is false on render
*/
// const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default?view=Grid%20view&sort[0][field]=Name&sort[0][direction]=asc`

/*
 a functional component that takes in props and maps through that data
 it will then return a div with key and a TodoListItem component that
 passes down props
*/
const TodoList = ({ todoList, onRemoveTodo, formattedTodos, isAscending, setFormattedTodos,
  timeSort, titleSort, handleSort
}) => {
  // const [isAscending, setIsAscending] = useState(true)
  // const [formattedTodos, setFormattedTodos] = useState([])

  // /* a compare function */
  // function titleSort(a, b) {
  //   /* sort in ascending order */
  //   if(!isAscending) {
  //     setIsAscending(!isAscending)
  //     if(a.title < b.title) {
  //       return -1
  //     }
  //     if(a.title > b.title) {
  //       return 1
  //     }
  //     return 0
  //   }
  //   /* sort in descending order */
  //   if (isAscending) {
  //     setIsAscending(!isAscending)
  //     if(a.title < b.title) {
  //       return 1
  //     }
  //     if(a.title > b.title) {
  //       return -1
  //     }
  //     return 0
  //   }
  // }
  
  // function timeSort(a, b) {
  //   /* sort in ascending order */
  //   if(!isAscending) {
  //     setIsAscending(!isAscending)
  //     if(a.time < b.time) {
  //       return -1
  //     }
  //     if(a.time > b.time) {
  //       return 1
  //     }
  //     return 0
  //   }
  //   /* sort in descending order */
  //   if (isAscending) {
  //     setIsAscending(!isAscending)
  //     if(a.time < b.time) {
  //       return 1
  //     }
  //     if(a.time > b.time) {
  //       return -1
  //     }
  //     return 0
  //   }
  // }

  /* runs onclick sorts time */
  // const handleSort = (order) => {
  //   const updatedTodos = formattedTodoList.sort(timeSort)
  //   setFormattedTodos(updatedTodos)
  // }

  // /* maps array and splits at the 'T', returns a new array and object */
  //  const formattedTodoList = 
  //     todoList.map((item) => {
  //       if(item.createdTime === undefined) {
  //         return
  //       } else {
  //         const currentDate = item.createdTime.split('T')
  //         const date = currentDate[0]
  //         const time = currentDate[1]
  //         const title = item.fields.Name
  //         const id = item.id
  //         const todo = {
  //           title: title,
  //           id: id,
  //           date: date,
  //           time: time
  //         }
  //         return todo
  //       }
  //     })

  return(
    <>
      <ul>
        <p>
          <FaSort onClick={() => handleSort(titleSort)} className={style.sortBtn} />
          <FaClock onClick={() => handleSort(timeSort)} className={style.timeBtn} />
        </p>
      {formattedTodos.length === 0 ?
        todoList.map((item) => {
          return( 
        // mapping default list 
        <div key={item.id}>
        <TodoListItem  
        todo={item} 
        onRemoveTodo={onRemoveTodo}
        />
        </div>
      )
      }) : formattedTodos.map((item) => {
      return( 
        //mapping sorted list 
        <div key={item.id}>
        <TodoListItem 
        todo={item} 
        onRemoveTodo={onRemoveTodo}
        />
        </div>
      )
      })}
      {/* {todoList.map((item) => {
          return( 
        // mapping default list 
        <div key={item.id}>
        <TodoListItem  
        todo={item} 
        onRemoveTodo={onRemoveTodo}
        />
        </div>
      )
      })} */}
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
TodoListItem.protoTypes = {
  todoList: PropTypes.arr,
  onRemoveTodo: PropTypes.func
}