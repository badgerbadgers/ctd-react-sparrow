import React, { useState, useEffect } from 'react'
import AddTodoForm from './AddTodoForm'
import TodoList from './TodoList'

/* custom react hook sets the state by first checking for data in browser's
  localStorage named 'value' it then turns that data into an array
  return an empty array if there is no data in local storage, then run the
  useEffect hook by saving a variable to localStorage with key of 'value'
  and value of value that will then turn that into a string and rerun
  anytime the value variable changes then finally return the state of
  value and setter function setValue
*/
const useSemiPersistentState = () => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem('value')) || []
  )

 useEffect(() => {
    localStorage.setItem('value', JSON.stringify(value))
 }, [value])
 return [value, setValue]
}

/* functional component that sets state using a custom react hook, contains
  a addTodo function that takes in a variable newTodo 
  then creates a new variable newTodos equal to the newTodo added to the
  todoList state variable the setTodoList then runs and sets the todoList
  to equal the newTodos variable, the App component then returns a header 
  and 2 components AddTodoForm and TodoList with props passed down to them
*/
function App() {
  const [todoList, setTodoList] = useSemiPersistentState()

  function addTodo (newTodo) {
   let newTodos = [newTodo, ...todoList]
   setTodoList(newTodos)
  };

 return (
   <>
     <h2> Todo List </h2>
     <AddTodoForm onAddTodo={addTodo} />
     <TodoList todoList={todoList} />
   </>
 );
}
 
export default App