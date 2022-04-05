import React, { useState } from 'react'
import style from './AddTodoForm.module.css'
 
/* a functional component that takes in props */
const AddTodoForm = ({ onAddTodo }) => {
  /* the initial state of todoTitle and the function that sets its' value */
  const [todoTitle, setTodoTitle] = useState('')
  
  /*
  a handler function that takes in an onChange event gets event target value
  as a variable and then calls setTodoTitle function with event target value
  variable as an argument
  */
  const handleTitleChange = (event) => {
    let newTodoTitle = event.target.value
    setTodoTitle(newTodoTitle)
  };
 
  /* a handler function that takes in an event onSubmit and fires when form is
   submitted it then calls onAddTodo and passes a object as an argument that
   includes a title attribute which is the value of todoTitle and and id
   which is a function that gives the current date, the form will then
   clear the input text field by setting the input field value to an empty string
  */
  const handleAddTodo = (event) => {
  event.preventDefault();
  onAddTodo({
    title: todoTitle,
    id: Date.now()
    })
   setTodoTitle('')
  };
 
  /* returns a form with a label element, input field and button */
  return (
  <div className={style.todoFormContainer}>
     <form onSubmit={handleAddTodo} className={style.todoForm}>
        <label htmlFor="todoTitle" />
        <input
          className={style.todoInput}
          placeholder='enter a todo'
          id="todoTitle"
          type="text"
          value={todoTitle}
          name="title"
          onChange={handleTitleChange}
          required
        >
        </input>
        <button 
        className={style.addBtn}>Add</button>
     </form>
   </div>
  )
}
 
export default AddTodoForm