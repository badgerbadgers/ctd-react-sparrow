import React, { useEffect, useRef } from 'react'
import style from './AddTodoForm.module.css'
import PropTypes from 'prop-types'

/*
a functional reusable component that takes in props, creates some imperative logic with
the focus attribute in the input field  with useRef and useEffect and returns
an input field with attributes and a button labeled add
*/
const InputWithLabel = ({ handleTitleChange, todoTitle, children }) => {
   const inputRef = useRef();

   useEffect(() => {
    inputRef.current.focus();
   });

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
        <input
          className={style.todoInput}
          placeholder='enter a todo'
          required
          ref={inputRef}
          id="todoTitle"
          type="text"
          value={todoTitle}
          name="title"
          onChange={handleTitleChange}>
        </input>
    </>
  )
}

export default InputWithLabel

InputWithLabel.protoTypes = {
  handleTitleChange: PropTypes.func, 
  todoTitle: PropTypes.string,
  children: PropTypes.string
}