import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const getTodos = () => {
  return axiosInstance.get("/todos")
}

const addTodo = (todo) => {
  return axiosInstance.post("/todos", todo)
}

const updateTodo = (todo) => {
  return axiosInstance.put(`/todos/${todo.id}`, todo)
}

const deleteTodo = (id) => {
  return axiosInstance.delete(`/todos/${id}`)
}

const API_Manager = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
}

export default API_Manager