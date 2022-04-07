import React from 'react'
import TodoListItem from './TodoListItem'
 
/*
 a functional component that takes in props and maps through that data
 it will then return a div with key and a TodoListItem component that
 passes down props
*/
const TodoList = ({ todoList, onRemoveTodo }) => {
  return(
    <>
      <ul>
        {todoList.map((item) => {
        return(
          <div key={item.id}>
           <TodoListItem 
            id={item.id} 
            key={item.id} 
            todo={item} 
            onRemoveTodo={onRemoveTodo}
          />
          </div>
        )
        })}
      </ul>
    </>
  )
}
 
export default TodoList