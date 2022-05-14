import React, { useState } from 'react'
import style from '../components/AddTodoForm.module.css'
import InputWithLabel from '../components/InputWithLabel'
import PropTypes from 'prop-types'

const AddTodoForm = ({ onAddTodo }) => {
  /* the initial state of todoTitle and the function that sets its' value */
  const [todoTitle, setTodoTitle] = useState('')
  
  /*
  a handler function takes in event and event value is new value of input field
  */
  const handleTitleChange = (event) => {
    let newTodoTitle = event.target.value
    setTodoTitle(newTodoTitle)
  };
 
  /* 
  a handler function that calls onAddTodo and creates a new object with properties
  */
  const handleAddTodo = (event) => {
    event.preventDefault();
    // onAddTodo({
    // title: todoTitle,
    // })
    onAddTodo(todoTitle)
   setTodoTitle('')
  };
 
  /* returns a form with a label element, component and button */
  return (
  <div className={style.todoFormContainer}>
     <form onSubmit={handleAddTodo} className={style.todoForm}>
        <label htmlFor="todoTitle" />
        <InputWithLabel handleTitleChange={handleTitleChange} todoTitle={todoTitle}>
        {/* Title */}
        </InputWithLabel>
        <button className={style.addBtn}>Add</button>
     </form>
   </div>
  )
}
 
export default AddTodoForm

AddTodoForm.protoTypes = {
  onAddTodo: PropTypes.func
}