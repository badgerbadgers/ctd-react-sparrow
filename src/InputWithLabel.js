import React from 'react'

function InputWithLabel({ handleTitleChange, todoTitle }) {
  return (
    <>
      <label htmlFor="todoTitle">Title</label>
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