import axios from 'axios'
import { API_ROOT } from '~/lib/config'

const api = axios.create({
  baseURL: API_ROOT
})

export default api
