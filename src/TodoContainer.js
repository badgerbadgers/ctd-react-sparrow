import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid';

/* airtable url with API key included */
const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`

/* a that makes an API call and renders that data on the webpage */
function TodoContainer({ tableName }) {
  const [isLoading, setIsLoading] = useState(true)
  const [todoList, setTodoList] = useState(tableName)
  const [todoTitle, setTodoTitle] = useState('')

  /* a handler function on input field that runs in the input field and takes the input field value 
  as the new todo title */
  const handleInputChange = (event) => {
    let newTodoTitle = event.target.value
    setTodoTitle(newTodoTitle)
  };
  
  /*
   a function that runs a fetch call to post data to airtable, includes authentications and is 
   followed by a .then() that turns data to JSON and another .then() that sets that data as the
   todoList
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
  
  /*
  a useEffect hook that has two arguments the first gets data with fetch and sets that data 
  as the todoList, the second argument will cause useEffect to rerender if todoList value changes
  */
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

  /*
  returns jsx with header, input field and button, todoList will be mapped and rendered on page
   */
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