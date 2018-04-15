import axios from 'axios'

const service = axios.create({
  timeout: 5000,
  baseURL: '/api'
})

service.interceptors.response.use(res => {
  if (res.status === 200) {
    return res.data
  }
})

export default service
