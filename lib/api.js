import axios from 'axios'
import { API_ROOT } from '~/lib/config'

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1'
})

export default api
