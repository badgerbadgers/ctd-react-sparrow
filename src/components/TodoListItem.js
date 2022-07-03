import React, { useState } from 'react'
import style from '../components/TodoListItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

/*
a component that returns a div with the list name, an icon and a remove button
*/
const TodoListItem = ({ todo, onRemoveTodo, editTodo, todoList }) => {
  const [onEdit, setOnEdit] = useState(false)
  /* the initial state of todoTitle and the function that sets its' value */
  const [inputTitle, setInputTitle] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)

  // const tableName = `Todo-List`

  // const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}?view=Grid%20view&sort[0][field]=Name&sort[0][direction]=asc`

  // useEffect(() => {
  //   async (editedText, id) => {
  //     await fetch(url+id, {
  //       method: 'PATCH',
  //       headers: {
  //         Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         "records": 
  //         [{
  //           "id": id,
  //           "fields": {
  //             "Done": 'true'
  //           }
  //         }]
  //       })
  //     })
  //     // setTodoList(todoList)
  //     // setFormattedTodos([])
  //   }
  // }, [])

  const handleRemoveItem = () => {
    onRemoveTodo(todo.id);
  };
  
  const handleEditItem = (e) => {
    getInitialValue()
    setOnEdit(!onEdit)
  }
  const getInitialValue = () => {
    const initialInputText = todoList.filter((item) => item.id === todo.id)
    // if(initialInputText[0]) {
    //   setInputTitle(initialInputText[0].fields.Name)
    // } else {
    //   setInputTitle(todo.fields.Name)
    // }
    initialInputText[0] ? setInputTitle(initialInputText[0].fields.Name) : setInputTitle(todo.fields.Name)
  }

  const handleInputChange = (event) => {
    // let newInputTitle = event.target.value
    setInputTitle(event.target.value)
  };

  const handleKeyDown = (event) => {
    if(event.key === 'Enter' || event.key === 13) {
      let id = todo.id
      let text = event.target.value
      editTodo(text, id)
      setOnEdit(!onEdit)
    }
  }

  const handleCompleteItem = () => {
    setIsCompleted(!isCompleted)
  }

  return (
  <div key={todo.id} className={style.listContainer}>
    <li className={style.listItem}>
      <input type="checkbox" 
        className={style.listItemCheckbox}
        onClick={handleCompleteItem} 
      />
      {onEdit ?
      <input type="text" 
        className={style.editInputField}
        onChange={handleInputChange}
        onKeyPress={handleKeyDown}
        // onKeyDown={handleKeyDown}
        value={inputTitle}
      />
       : <p className={style.listText}
           style={{ textDecoration: isCompleted ? 'line-through' : 'none'}}
         > {todo.title || todo.fields.Name}
      </p>
      }
      <FontAwesomeIcon
        icon={faTrash}
        className={style.todoItemBtn}
        type='button' 
        onClick={handleRemoveItem}>
      </FontAwesomeIcon>
      <FontAwesomeIcon 
        icon={faPen}
        className={style.todoEditBtn}
        type='button' 
        onClick={handleEditItem}
        >
      </FontAwesomeIcon>
    </li>
  </div>
  )
}
 
export default TodoListItem

/* 
imported PropTypes and created an object that has properties that have a key equal
to the prop or function being test and the value that uses PropTypes to test if output 
is type that is written (object, string, etc)
*/
TodoListItem.protoTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func,
  handleRemoveItem: PropTypes.func,
  editTodo: PropTypes.func,
  handleKeyDown: PropTypes.func
}