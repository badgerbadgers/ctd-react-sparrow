import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid';

/* global variable for airtable url with API key included as a variable */
const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`

/* a stateful functional component that takes in prop has three states for isLoading, todoList and todoTitle */
function TodoContainer({ tableName }) {
  const [isLoading, setIsLoading] = useState(true)
  const [todoList, setTodoList] = useState(tableName)
  const [todoTitle, setTodoTitle] = useState('')

  /* a handler function that is equal to an anonymous function that takes in an event and creates a new variable 
  that is equal to the event.target.value, the set function is then invoked (setTodoTitle) to set the current 
  todoTitle to the newTodoTitle variable */
  const handleInputChange = (event) => {
    let newTodoTitle = event.target.value
    setTodoTitle(newTodoTitle)
  };
  
  /*
   a variable that is equal to an asychronous anonymous function that creates a new variable
  that is equal to a fetch call that include the url which uses a global variable 'url' as the first
  argument and for the second argument uses an object with method key and POST value, body key that
  uses JSON.stringify to stringify an object that will contact an airtable API endpoint the object is 
  structured as: {records: [{fields: { Name: TodoTitle }}]}  with todoTitle take from the handleInputChange function
  there is also the headers property with some API authentication the fetch call is chained with a .then promise
  this promise takes the response data from the fetch API call and turns it into a JSON object
  there is another .then promise chain onto the previous .then() and that response data that is now a
  JSON object is set as the todoList. The setTodoList function is called and using dot notation
  the nested object data is destructured
  */
  const addTodo = async () => {
    let response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      "records": 
      [{
        "fields": {
          "Name": todoTitle
          }
      }]
    }),
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          }
    })
    .then(r => r.json())
    .then(r => setTodoList(r.records))
    
   };
  
  /* a useEffect hook that runs an anonymous function that creates a variable equal to an asynchronous
  anonymous function that creates a new variable that is equal to a fetch call with await used when it is invoked.
  the fetch call has two arguments the first is the url which uses a global variable that contains a url and API key.
  the second argument is an object that has authentication information. 
  
  a variable 'json' is created and using the await keyword
  because it is waiting for a promise the data will get turned into a JSON object using JSON() and is chain with the 
  .then method the result or res (using an arrow function) is destructured with dot notation to get to the array of objects. 
  that data is mapped and for each object in that array the Name is return using object dot notation. 
  
  another then method is invoked
  and the res data is sorted using the sort method. another then is chained and that res data is then set as the todoList using
  the setTodoList function. 
  
  the getData function is called, the isLoading boolean is then set to false and the second argument in the 
  useEffect is an array dependency with the todoList */
  useEffect(() => {
    const getData = async () => {
      const data = await fetch(url, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
            }
          }
      );
      const json = await data.json()
      .then(res => res.records.map((obj) => obj.fields.Name))
      .then(res => res.sort())
      .then(res => setTodoList(res))
    }
    getData()
    setIsLoading(false)
  }, [todoList])

  /* returns a header, a form with an input field with an onChange attribute that runs the
  handleInputChange function and a button that runs addTodo function onClick. there is an 
  unordered list that maps through the todoList array. it has a key that uses the UUID library
  and renders the mapped todo which is data that was fetched from the Airtable API or added by
  the user when the click the add button */
  return (
    <>
      <h2>Todo Container!</h2>
        <form>
          <label htmlFor="todoTitle" />
        <input
          placeholder='enter a todo'
          id="todoTitle"
          type="text"
          value={todoTitle}
          name="title"
          onChange={handleInputChange}
          required
        >
        </input>
        <button type="button" onClick={addTodo}>Add</button>
        </form>
        <ul>
          {todoList.map(todo => {
            return (
              <div key={uuidv4()}>{todo}</div>
            )
          })}
        </ul>
    </>
  )
}

// TodoContainer.propTypes = {
//   tableName: PropTypes.array
// }

export default TodoContainer