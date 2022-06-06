import React from 'react'
import TodoListItem from './TodoListItem'
import PropTypes from 'prop-types'
import { FaSort, FaClock } from 'react-icons/fa'
import style from '../components/TodoList.module.css'

/*
 a functional component that takes in props and maps through that data
 it will then return a div with key and a TodoListItem component that
 passes down props
*/
const TodoList = ({ todoList, onRemoveTodo, formattedTodos, timeSort, titleSort, handleSort }) => {
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
                <TodoListItem todo={item} onRemoveTodo={onRemoveTodo} />
              </div>
            )
          }) : formattedTodos.map((item) => {
            return( 
              //mapping sorted list 
              <div key={item.id}>
                <TodoListItem todo={item} onRemoveTodo={onRemoveTodo} />
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
TodoListItem.protoTypes = {
  todoList: PropTypes.arr,
  onRemoveTodo: PropTypes.func,
  formattedTodos: PropTypes.arr, 
  timeSort: PropTypes.func, 
  titleSort: PropTypes.func, 
  handleSort: PropTypes.func
}