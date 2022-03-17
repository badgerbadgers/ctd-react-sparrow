import React from 'react';

/*
 a functional component that takes in props and returns a list item
 with a key and title from data that was passed down as a prop
*/
function TodoListItem(props) {
  {/* returns a div with a key and a list element with the todoList object title  */}
  return (
    <div key={props.id}>
      <li>
        <p>{props.todo.title}</p>
      </li>
    </div>
  )
}

export default TodoListItem;