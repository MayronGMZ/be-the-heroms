import axios from 'axios'

// Client HTTP
const api = axios.create({
  baseURL: 'http://localhost:3334'
})

export default api