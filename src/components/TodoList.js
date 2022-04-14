import React from 'react'
import TodoListItem from './TodoListItem'
import PropTypes from 'prop-types'
 
/*
 a functional component that takes in props and maps through that data
 it will then return a div with key and a TodoListItem component that
 passes down props
*/
const TodoList = ({ todoList, onRemoveTodo }) => {
  return(
    <>
      <ul>
        {todoList.map((item) => {
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