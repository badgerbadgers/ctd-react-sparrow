import React, { useState } from 'react'
import style from '../components/TodoListItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

/*
a component that returns a div with the list name, an icon and a remove button
*/
const TodoListItem = ({ todo, onRemoveTodo, editTodo, todoList }) => {
  const [onEdit, setOnEdit] = useState(false)
  const [inputTitle, setInputTitle] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)

  /* removes todo */
  const handleRemoveItem = () => {
    onRemoveTodo(todo.id);
  };
  
  /* edit a todo */
  const handleEditItem = (e) => {
    getInitialValue()
    setOnEdit(!onEdit)
  }

  /* sets value of currently edited todo's input field */
  const getInitialValue = () => {
    const initialInputText = todoList.filter((item) => item.id === todo.id)
    initialInputText[0] ? setInputTitle(initialInputText[0].fields.Name) : setInputTitle(todo.fields.Name)
  }

  /* gets value of edited todo's input field */
  const handleInputChange = (event) => {
    setInputTitle(event.target.value)
  };

  /* when user presses enter button and key 13 on mobile function runs */
  const handleKeyDown = (event) => {
    if(event.key === 'Enter' || event.key === 13) {
      event.preventDefault();
      let id = todo.id
      let text = event.target.value
      editTodo(text, id)
      setOnEdit(!onEdit)
    }
  }

  /* toggles checkmark boolean */
  const handleCompleteItem = () => {
    setIsCompleted(!isCompleted)
  }

  /* jsx returns div with checkbox, todo name and two buttons */
  return (
  <div key={todo.id} className={style.listContainer}>
    <li className={style.listItem}>
      <input type="checkbox" 
        className={style.listItemCheckbox}
        onClick={handleCompleteItem} 
      />
      {onEdit ?
      <input type="text" 
        className={style.editInputField}
        onChange={handleInputChange}
        onKeyPress={handleKeyDown}
        value={inputTitle}
      />
       : <p className={style.listText}
           style={{ textDecoration: isCompleted ? 'line-through' : 'none'}}
         > {todo.title || todo.fields.Name}
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
  handleKeyDown: PropTypes.func,
  handleCompleteItem: PropTypes.func,
  getInitialValue: PropTypes.func,
  handleEditItem: PropTypes.func,
  onEdit: PropTypes.bool,
  inputTitle: PropTypes.string,
  isCompleted: PropTypes.bool
}