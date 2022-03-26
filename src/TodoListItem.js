import React from 'react'
 
/*
a functional component that takes in props and returns a div
with the todo item's key and p text containing the title of the todo item,
there is a delete button that onClick will run a callback function that will
then remove that clicked todo item
*/
function TodoListItem({ todo, onRemoveTodo }) {
  const handleRemoveItem = () => {
    onRemoveTodo(todo.id);
  };

  return (
  <div key={todo.id}>
    <li>
      <p>{todo.title}</p>
      <button type='button' onClick={handleRemoveItem}>Remove</button>
    </li>
  </div>
  )
}
 
export default TodoListItem