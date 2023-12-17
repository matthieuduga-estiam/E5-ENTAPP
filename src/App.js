import { v4 as uuidv4 } from 'uuid'
import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa"
import Todo from "./Todo"
import API_Manager from './API_Manager'


function App() {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    API_Manager.getTodos()
      .then((response) => {
        setTodos(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  function addTodo() {
    let text = prompt("Enter a new todo")
    let todo = {
      id: uuidv4(),
      text,
      status: 0
    }

    API_Manager.addTodo(todo)
      .then((response) => {
        API_Manager.getTodos()
          .then((response) => {
            setTodos(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-800">
        <div className="flex-grow">
          <div className="flex flex-col h-full items-center justify-center">
            <div className="w-full mx-auto rounded-lg border border-gray-700 p-8 lg:py-12 lg:px-14 text-gray-300 max-w-2xl">
              <div className="mb-10">
                <h1 className="text-2xl font-bold">Todos</h1>
              </div>
              <div className="mb-10">
                {todos && todos.map((todo) => (
                  <Todo key={todo.id} object={todo} />
                ))}
              </div>
              <div className="flex justify-center">
                <button onClick={addTodo} className="py-3 px-10 border border-gray-800 hover:border-gray-700 rounded leading-none focus:outline-none text-xl">
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-center text-xs text-gray-500">Version {process.env.REACT_APP_VERSION}</p>
        </div>
      </div>
    </>
  )
}

export default App
