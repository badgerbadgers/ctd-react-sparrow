import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  /*
  Create new state variable named todoList with setter setTodoList and default value of an empty Array
  */
  const [todoList, setTodoList] = useState([]);

  function addTodo(newTodo) {
    let newTodos = [newTodo, ...todoList]
    setTodoList(newTodos);
  }

  /* returns a header, AddTodoForm component and TodoList component with props */
  return (
    <>
      <h2>Todo List </h2>
      <AddTodoForm onAddTodo={addTodo} />
      {/* Pass todoList state as a prop named todoList to the TodoList component */}
      <TodoList todoList={todoList} />
    </>
  );
}

export default App;
