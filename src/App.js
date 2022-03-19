import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

/* */
function App() {
  /* 
    initial state for todoList and function that sets todoList value
    setTodoList
  */
  const [todoList, setTodoList] = useState([]);
  return (
    <>
      <h2>Todo List </h2>
      <AddTodoForm />
      <TodoList todoList={todoList} />
    </>
  );
}

export default App;
