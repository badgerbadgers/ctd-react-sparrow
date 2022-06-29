import React, { useState } from 'react'
import style from '../components/TodoListItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

/*
a component that returns a div with the list name, an icon and a remove button
*/
const TodoListItem = ({ todo, onRemoveTodo, editTodo, todoList, setFormattedTodos, formattedTodos }) => {
  const [onEdit, setOnEdit] = useState(false)
    /* the initial state of todoTitle and the function that sets its' value */
  const [inputTitle, setInputTitle] = useState('')
  // const [isCompleted, setIsCompleted] = useState(false)

  const handleRemoveItem = () => {
    onRemoveTodo(todo.id);
  };
  
  const handleEditItem = (e) => {
    getInitialValue()
    setOnEdit(!onEdit)
  }
  const getInitialValue = () => {
    const initialInputText = todoList.filter((item) => item.id === todo.id)
    // if(initialInputText[0]) {
    //   setInputTitle(initialInputText[0].fields.Name)
    // } else {
    //   setInputTitle(todo.fields.Name)
    // }
    initialInputText[0] ? setInputTitle(initialInputText[0].fields.Name) : setInputTitle(todo.fields.Name)
  }

  const handleInputChange = (event) => {
    // let newInputTitle = event.target.value
    setInputTitle(event.target.value)
  };

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      let id = todo.id
      let text = event.target.value
      editTodo(text, id)
      setOnEdit(!onEdit)
    }
  }

  // const handleCompleteItem = () => {
  //   setIsCompleted(!isCompleted)
  // }

  return (
  <div key={todo.id} className={style.listContainer}>
    <li className={style.listItem}>
      {onEdit ?
      <input type="text" 
        className={style.editInputField}
        onChange={handleInputChange}
        onKeyPress={handleKeyDown}
        // onKeyDown={handleKeyDown}
        value={inputTitle}
      />
       : <p className={style.listText}> {todo.title || todo.fields.Name}
      </p>
      }
      <FontAwesomeIcon
        icon={faTrash}
        className={style.todoItemBtn}
        type='button' 
        onClick={handleRemoveItem}>
      </FontAwesomeIcon>
      <FontAwesomeIcon 
        icon={faPen}
        className={style.todoEditBtn}
        type='button' 
        onClick={handleEditItem}
        >
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
  onRemoveTodo: PropTypes.func,
  handleRemoveItem: PropTypes.func,
  editTodo: PropTypes.func,
  handleKeyDown: PropTypes.func
}