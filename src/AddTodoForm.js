import React, { useState } from 'react';

/* a functional component that takes in props */
function AddTodoForm(props) {
    /*  */
    const [todoTitle, setTodoTitle] = useState('');
  /* 
   a handle todo function that takes an event as a parameter, runs event
   preventDefault, console.logs(todoTitle) and sets the value todoTitle 
   to an empty string
  */
  function handleTodo(event) {
      {/* 
       -- I was confused by the line below so I passed in todoTitle instead.
       As I understand it I am invoking the callback function passed down
       as a prop and passing in the todoTitle which as the current value
       from the input field, this will then become the newTodo value. --
      [] Inside the handleAddTodo function, invoke the onAddTodo callback
       prop and pass newTodo as an argument 
    */}
      props.onAddTodo(todoTitle)
      event.preventDefault();
      console.log(todoTitle)
      setTodoTitle('');
  }

  /* 
    returns a form that contains a label element, a text input with 3 attributes
    value that takes the value of the todoTitle variable, name and onChange
    onChange runs an anonymous function that takes in an event and invokes the
    setTodoTitle and set a new value for todoTitle 
    */
  return (
    <div>
      {/* onSubmit form will run handleTodo */}
      <form onSubmit={handleTodo}>
          <label htmlFor="todoTitle">Title</label>
          <input id="todoTitle" type="text" value={todoTitle} name="title" onChange={(e) => setTodoTitle(e.target.value)}></input>
          <button>Add</button>
      </form>
    </div>
  )
}

export default AddTodoForm;