import React, { useState, useEffect } from 'react'
import { FaTrash } from "react-icons/fa"
import API_Manager from './API_Manager'

function Todo(props) {
    // Retrieve data from props
    const { id, text, status } = props.object

    // Set state variables
    const [textForm, setText] = useState('')
    const [statusForm, setStatus] = useState(false)

    // Set default value
    useEffect(() => {
        setText(text)
        setStatus(status)
        console.log(status)
    }, [])

    // Update function triggered by checkbox
    const statusChange = (event) => {
        setStatus(event.target.checked)

        API_Manager.updateTodo({
            id: id,
            text: textForm,
            status: event.target.checked ? 1 : 0
        })
            .catch((error) => {
                console.log(error)
            })
    }

    // Update function triggered by text input
    const textChange = (event) => {
        setText(event.target.value)
    }

    // Post update to API
    const sendUpdate = (todo) => {
        API_Manager.updateTodo({
            id: id,
            text: textForm,
            status: statusForm ? 1 : 0
        })
            .catch((error) => {
                console.log(error)
            })
    }

    // Delete function triggered by button
    const deleteTodo = () => {
        API_Manager.deleteTodo(id)
            .then(() => {
                document.getElementById(id).remove()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <li id={id} className="px-2 py-2 rounded transition-all flex text-md mb-1 cursor-pointer" >
            <div className="flex-none w-10 leading-none mt-1">
                <input type="checkbox" checked={statusForm} onChange={statusChange} />
            </div>
            <div className="flex-grow max-w-full">
                <div className="w-full leading-none">
                    <input value={textForm} onChange={textChange} onBlur={sendUpdate} type="text" className="text-md w-full bg-transparent text-gray-300 leading-none focus:outline-none mb-2" />
                </div>
            </div>
            <div className="flex-none w-10 leading-none mt-1">
            <button onClick={deleteTodo} >
                  <FaTrash />
                </button>
            </div>
        </li>
    )
}

export default Todo