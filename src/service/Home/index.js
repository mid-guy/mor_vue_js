import baseAPI from "@/api";
import { API_HOME_PAGE } from "@/helper/constants"

export const createTodoRequest = (body) => {
  return baseAPI.post(`${API_HOME_PAGE}`, body)
}

export const getAllTodoRequest = () => {
  return baseAPI.get(`${API_HOME_PAGE}`)
}

export const editTodoRequest = (body, _id) => {
  return baseAPI.put(`${API_HOME_PAGE}/${_id}`, body)
}

export const deleteTodoRequest = (_id) => {
  return baseAPI.delete(`${API_HOME_PAGE}/${_id}`)
}