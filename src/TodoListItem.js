import React from 'react'
 
/*
a functional component that takes in props and returns a div
with the todo item's key and p text containing the title of the todo item
*/
function TodoListItem({ todo }) {
 
   return (
   <div key={todo.id}>
     <li>
       <p>{todo.title}</p>
     </li>
   </div>
 )
}
 
export default TodoListItem
