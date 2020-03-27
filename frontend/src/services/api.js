import axios from 'axios'

// Client HTTP
const api = axios.create({
  baseURL: 'http://localhost:3333'
})

export default api