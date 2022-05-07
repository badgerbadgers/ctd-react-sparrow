import React, { useState } from 'react'
import TodoListItem from './TodoListItem'
import PropTypes from 'prop-types'


/*
 a functional component that takes in props and maps through that data
 it will then return a div with key and a TodoListItem component that
 passes down props
*/
const TodoList = ({ todoList, onRemoveTodo }) => {
  const [sorted, setSorted] = useState([]) 
  const [isClicked, setIsClicked] = useState(false) 

    /* compare function that is passed into sort method returns items ascending order */
    function ascendingOrder (a, b) {
      if(a.fields.Name < b.fields.Name) {
        return - 1
      }
      if(a.fields.Name > b.fields.Name) {
        return 1
      }
      return 0
    }
  
    /* compare function that is passed into sort method returns items descending order */
    function descendingOrder (a, b) {
      if(a.fields.Name < b.fields.Name) {
        return 1
      }
      if(a.fields.Name > b.fields.Name) {
        return -1
      }
      return 0
    }

  const handleSort = (order) => {
    let sorted = todoList.sort(order)
    setSorted(sorted);
    setIsClicked(!isClicked)
  };

  const sortedList = todoList

  return(
    <>
      <ul>
      <button type="button" onClick={() => handleSort(ascendingOrder)}>
        Ascending
      </button>
      <button type="button" onClick={() => handleSort(descendingOrder)}>
        Descending
      </button>
        {sortedList.map((item) => {
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