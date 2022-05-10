import React, { useState } from 'react'
import TodoListItem from './TodoListItem'
import PropTypes from 'prop-types'
import { FaSort } from 'react-icons/fa'
import style from './TodoListItem.module.css'


/*
 a functional component that takes in props and maps through that data
 it will then return a div with key and a TodoListItem component that
 passes down props
*/
const TodoList = ({ todoList, onRemoveTodo }) => {
  const [isAscending, setIsAscending] = useState(true)
  const [updatedTodoList, setUpdatedTodoList] = useState([])
  
  function sort(a, b) {
    /* sort in ascending order */
    if(!isAscending) {
      setIsAscending(!isAscending)
      if(a.fields.Name < b.fields.Name) {
        return -1
      }
      if(a.fields.Name > b.fields.Name) {
        return 1
      }
      return 0
    }
    /* sort in descending order */
    if (isAscending) {
      setIsAscending(!isAscending)
      if(a.fields.Name < b.fields.Name) {
        return 1
      }
      if(a.fields.Name > b.fields.Name) {
        return -1
      }
      return 0
    }
  }

  const handleSort = (order) => {
    let sorted = todoList.sort(order)
    setUpdatedTodoList(sorted)
  };

  return(
    <>
      <ul>
      <FaSort onClick={() => handleSort(sort)} className={style.sortBtn} />
        {updatedTodoList.length === 0 ?
        todoList.map((item) => {
        return(
          <div key={item.id}>
            <TodoListItem 
            id={item.id} 
            key={item.id} 
            todo={item} 
            onRemoveTodo={onRemoveTodo}
            />
          </div>
        )
        }) : updatedTodoList.map((item) => {
        return(
          <div key={item.id}>
            <TodoListItem 
            id={item.id} 
            key={item.id} 
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
TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
}