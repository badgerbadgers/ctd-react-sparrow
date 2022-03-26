import React, { useState, useEffect } from 'react'
import AddTodoForm from './AddTodoForm'
import TodoList from './TodoList'

/* functional component that sets state using a custom react hook,
  the App component then returns a header 
  and 2 components AddTodoForm and TodoList with props passed down to them
*/
function App() {
 const [todoList, setTodoList] = useState( () => {
   const localData = localStorage.getItem('savedTodoList')
   return localData ? JSON.parse(localData) : []
   }
 );

  /*
  addTodo function that takes in a variable newTodo 
  then creates a new variable newTodos equal to the newTodo added to the
  todoList state variable the setTodoList then runs and sets the todoList
  to equal the newTodos variable
  */
  function addTodo (newTodo) {
   let newTodos = [newTodo, ...todoList]
   setTodoList(newTodos)
  };

  /*
  a function that takes in an id as paramater and creates a variable that is
  equal to a filter method applied to todoList state, filter checks if the current
  id is not equal to the current todo.id if not equal return todo, then the set function
  setTodoList will return the newTodoList
  */
  function removeTodo(id) {
    const newTodoList = todoList.filter(
      (todo) => id !== todo.id
    )

    setTodoList(newTodoList)
  };

 useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList))
 }, [todoList])


 return (
   <>
     <h2> Todo List </h2>
     <AddTodoForm onAddTodo={addTodo} />
     <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
   </>
 );
}
 
export default App