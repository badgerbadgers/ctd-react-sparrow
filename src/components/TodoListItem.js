import React from 'react'
import style from '../components/TodoListItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

/*
a component that returns a div with the list name, an icon and a remove button
*/
const TodoListItem = ({ todo, onRemoveTodo }) => {
  const handleRemoveItem = () => {
    onRemoveTodo(todo.id);
  };

  return (
  <div key={todo.id} className={style.listContainer}>
    <li className={style.listItem}>
      <p className={style.listText}>{todo.title || todo.fields.Name}
      </p>
      <FontAwesomeIcon
      icon={faTrash}
      className={style.todoItemBtn}
      type='button' 
      onClick={handleRemoveItem}>Remove
    </FontAwesomeIcon>
    </li>
  </div>
  )
}
 
export default TodoListItem

/* 
imported PropTypes and created an object that has properties that have a key equal
to the prop or function being test and the value that uses PropTypes to test if output 
is type that is written (object, string, etc)
*/
TodoListItem.protoTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func
}