import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

/*
 refer to lesson-checklist.txt for milestones, located in src folder.
 do a jig when you're done! :)
*/

/* 
  functional component that renders a header and 2 components and some text
  that displays the newTodo value
  AddTodoForm with a callback function passed as a prop and TodoList 
 */
function App() {
  /* 
    constant for newTodo and the function that will set its' state
    by default an empty string */
  const [newTodo, setNewTodo] = useState("");

  return (
    <>
      <h2> Todo List </h2>
        <AddTodoForm onAddTodo={setNewTodo}/>
        <p>{newTodo}</p>
        <TodoList />
    </>
  );
}

export default App;
