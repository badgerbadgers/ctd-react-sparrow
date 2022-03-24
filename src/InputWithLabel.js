import React from 'react'

function InputWithLabel({ handleTitleChange, todoTitle, children }) {
  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
        <input
         id="todoTitle"
         type="text"
         value={todoTitle}
         name="title"
         onChange={handleTitleChange}>
        </input>
      <button>Add</button>
    </>
  )
}

export default InputWithLabel