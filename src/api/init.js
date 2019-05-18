import axios from 'axios'

const api = axios.create({
  baseURL: 'http://api.staging.work180.co/api/v1/todo-list/'
})

export default api