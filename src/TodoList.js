import React from 'react';
// import TodoListItem from './TodoListItem';

/* 
  a functional component that maps through an array of data
  and renders specific values to back to the DOM
*/
function TodoList(props) {

  return(
    <>
      <ul>
      {/* maps over the array, the key attribute uses the object id
        react does not let you use key prop that is passed down
        you must use another prop attribute
      */}
      {props.todoList.map((item) => {
        return(
            <div key={item.id}></div>
            // <TodoListItem id={props.item.id} key={props.item.id} todo={item} />
        )
      })}
    </ul>
    </>
  )
}

export default TodoList;