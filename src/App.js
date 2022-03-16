 import React from 'react';
 import AddTodoForm from './AddTodoForm';
 import TodoList from './TodoList';

 /*
   Instructions for Lesson 1.2
   
 //Move List into New "Todo List" Component
 [x] Inside /src directory, create a new file called TodoList.js
 [x] Open /src/TodoList.js
 [x] Create a new functional React component (see below)
   [x] Import React from "react" npm package
   [x]  Declare a function named TodoList
   [x]  Export TodoList function as default module
 [x]  Add a multi-line return statement to your TodoList function (this is where we will insert JSX)
     hint: use parenthesis for multi-line return
 [x] Move list JSX from App.js to TodoList.js (see below)
   [x] Open /src/App.js
   [x] Cut (copy and remove) the entire list element (<ul>) code
   [x] Open /src/TodoList.js
   [x] Inside the multi-line return, paste the list element (<ul>) code
 [] Move todoList array from App.js to TodoList.js (see below)
   [x] Open /src/App.js
   [x] Cut (copy and remove) the entire todoList variable declaration
   [x] Open /src/TodoList.js
   [x] Below the import, paste the todoList variable
 [x] Refactor App.js to use new TodoList component (see below)
   [x] Open /src/App.js
   [x] Below React, import TodoList
   [x] Below the level-one heading, use the TodoList component
 [x] Run your application and view in browser
   [x] Verify that your Todo List still appears correctly
 
 //Create "Add Todo Form" Component
 [x] Inside /src directory, create a new file called AddTodoForm.js
 [x] Open /src/AddTodoForm.js
 [x] Create a new functional React component (see below)
   [x] Import React from "react" npm package
   [x] Declare a function named AddTodoForm
   [x] Export AddTodoForm function as default module
 [x] Add a multi-line return statement to your AddTodoForm function (this is where we will insert JSX)
   hint: use parenthesis for multi-line return
 [x] Write JSX for "Add Todo" form (see below)
   [x] Create a <form> element
   [x] Inside the <form> element, create a <label> element with text "Title"
   [x] Next, create a text <input> element with id "todoTitle"
   [x] Add htmlFor attribute to <label> element with same value as id above
   [x] Next, create a submit <button> element with text "Add"
 [x] Use AddTodoForm component in App.js (see below)
   [x] Open /src/App.js
   [x] Below React, import AddTodoForm
   [x] Below the level-one heading, use the AddTodoForm component
 [x] Run your application and view in browser
   [x] Verify that "Add Todo" form appears below heading
 */

/* 
  functional component that renders a header and unordered list within that list
  there is an expression that maps over an array called todoList. 
  This mapped data returns a list item with a key of that object id
  and text of that object's title that is rendered back to the page.
 */
 function App() {
   return (
     <>
       <h2> Todo List </h2>
       <AddTodoForm />
       <TodoList />
     </>
   );
 }

 export default App;
