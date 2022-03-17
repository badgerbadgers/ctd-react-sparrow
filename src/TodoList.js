import React from 'react';
import TodoListItem from './TodoListItem';

/* an array with 3 objects that have 2 properties: id and title */
const todoList = [
    {
      id:1, 
      title: "first"
    },
    {
      id:2, 
      title: "second"},
    {
      id:3,
      title:"third"
    }
  ];

/* 
  a functional component that maps through an array of data
  and renders specific values to back to the DOM
*/
function TodoList() {

  return(
    <>
      <ul>
      {/* maps over the array, the key attribute uses the object id
        react does not let you use key prop that is passed down
        you must use another prop attribute
      */}
      {todoList.map((item) => {
        return(
            <TodoListItem id={item.id} key={item.id} todo={item} />
        )
      })}
    </ul>
    </>
  )
}

export default TodoList;