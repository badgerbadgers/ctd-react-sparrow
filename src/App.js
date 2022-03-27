import React, { useState, useEffect } from 'react'
import AddTodoForm from './AddTodoForm'
import TodoList from './TodoList'

/*
  functional component sets state with two variables contains two useEffect hooks, functions and returns JSX
*/
function App() {
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  /*
  initial useEffect hook creates a new Promise that takes in two parameters, calls setTimeout then inside setTimeout
  calls resolve argument to return a data object with property of todoList that has an annonymous function
  run and return parsed data in localStorage or return an empty array. after that a then will call the setTodoList
  equal to the result object's todoList property and setLoading to false, there is an empty array as second argument
  */
  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { todoList: () =>  JSON.parse(localStorage.getItem('savedTodoList')) || []
          // const localData = localStorage.getItem('savedTodoList')
          // return localData ? JSON.parse(localData) : []
          }}
        ) 
      }, 2000)
    })
    .then((result) => {
      setTodoList(result.data.todoList)
      setIsLoading(false)
    })
  }, [])

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
  
  /*
  a 2nd useEffect hook, this will run if isLoading state is false, it will add todos to your local storage
  saving them with a key and the value as a string, this useEffect will run anytime the todoList variable changes
  */
  useEffect(() => {
    if(!isLoading) {
      return localStorage.setItem('savedTodoList', JSON.stringify(todoList))
    }
  },[todoList])

  return (
    <>
      <h2> Todo List </h2>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading ...</p> 
        ):(
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}
 
export default App