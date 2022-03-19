import React, { useState } from 'react';

/* a functional component that takes in props */
function AddTodoForm(props) {
  const [todoTitle, setTodoTitle] = useState('');
  
  function handleTitleChange(event) {
    let newTodoTitle = event.target.value
    setTodoTitle(newTodoTitle)
    console.log('onchange:',todoTitle)
  }

  /* 
   a handle todo function that takes an event as a parameter, runs event
   preventDefault, console.logs(todoTitle) and sets the value todoTitle 
   to an empty string
  */
  function handleTodo (event) {
    console.log('submitted',todoTitle)
      props.onAddTodo(todoTitle)
      event.preventDefault();
    //   setTodoTitle('');
  }

  /* 
    returns a form that contains a label element, a text input with 3 attributes
    value that takes the value of the todoTitle variable, name and onChange
    onChange runs an anonymous function that takes in an event and invokes the
    setTodoTitle and set a new value for todoTitle 
    */
  return (
    <div>
      {/* onSubmit form will run handleTitleChange */}
      <form onSubmit={handleTodo}>
          <label htmlFor="todoTitle">Title</label>
          <input
          id="todoTitle" 
          type="text" 
          value={todoTitle} 
          name="title" 
          onChange={handleTitleChange
          }>
          </input>
          <button>Add</button>
      </form>
    </div>
  )
}

export default AddTodoForm;