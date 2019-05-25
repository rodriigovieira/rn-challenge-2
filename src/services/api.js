import axios from "axios"

const api = axios.create({
  baseURL: "https://expenses-app-mastermind.firebaseio.com"
})

export default api
