import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

/*
a functional reusable component that takes in props, creates some imperative logic with
the focus attribute in the input field  with useRef and useEffect and returns
an input field with attributes and a button labeled add
*/
const InputWithLabel = ({ handleTitleChange, todoTitle, children, isFocused }) => {

  const inputRef = useRef();

   useEffect(() => {
     if (isFocused && inputRef.current) {
       inputRef.current.focus();
     }
   }, [isFocused]);

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
        <input
         id="todoTitle"
         type="text"
         value={todoTitle}
         name="title"
         autoFocus={isFocused}
         onChange={handleTitleChange}>
        </input>
      <button>Add</button>
    </>
  )
}

export default InputWithLabel

/* 
imported PropTypes and created an object that has properties that have a key equal
to the prop or function being test and the value that uses PropTypes to test if output 
is type that is written (object, string, etc)
*/
InputWithLabel.propTypes = {
  handleTitleChange: PropTypes.func, 
  todoTitle: PropTypes.string,
  children: PropTypes.string,
  isFocused: PropTypes.bool,
}