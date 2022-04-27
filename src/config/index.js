import axios from 'axios';
import Cookies from 'js-cookie';
export const AUTH_TOKEN = 'auth_token';
export const baseAPI = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

baseAPI.interceptors.request.use((request) => {
  const accessToken = Cookies.get('auth_token')
  const accessHeader = `Bearer ${accessToken}`
  request.headers["Authorization"] = accessHeader
  return request
})

export default baseAPI