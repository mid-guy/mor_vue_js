import baseAPI from "@/api";
import { API_AUTH_PAGE } from "@/helper/constants"

export const signInRequest = (body) => { 
  return baseAPI.post(`${API_AUTH_PAGE.SIGN_IN}`, body)
} 

export const signUpRequest = (body) => {
  return baseAPI.post(`${API_AUTH_PAGE.SIGN_UP}`, body)
}