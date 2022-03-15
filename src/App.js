import React from 'react';

/* 
Lesson 1.1 Instructions:

React Components and JSX
[x] Open the src/App.js file
[x] Remove the existing JSX from the component
[x] Create a level-one heading that says "Todo List"
[x] Create an unordered list (<ul>)

Lists in React
[x] Above the App() function, create an empty Array and store it in a variable named todoList
[x] Inside the Array, create at least 3 Objects with the following properties:
    id: unique identifier (ex. 1, 2, 3)
    title: summary of the todo item (ex. "Complete assignment")
[x] Inside your unordered list, insert a JavaScript expression
    hint: {}
[x] Inside the JavaScript expression, map over your todoList array
[x] For each Object in the Array, return a list item (<li>) with the following:
    key attribute with value of id property
    inner text content with value of title property
*/

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
]

/* 
  functional component that renders a header and unordered list within that list
  there is an expression that maps over an array called todoList. 
  This mapped data returns a list item with a key of that object id
  and text of that object's title that is rendered back to the page.
 */
function App() {
  return (
    <>
    <h2>Todo List</h2>
    <ul>
      {/* maps over the array, the key attribute uses the object id */}
      {todoList.map((item) => {
        return(
          <li key={item.id}>
            <p>{item.title}</p>
          </li>
        )
      })}
    </ul>
    </>
  );
}

export default App;
