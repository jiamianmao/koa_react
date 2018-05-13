import axios from 'axios'
import { Toast } from 'antd-mobile'
import Storage from 'good-storage'

const service = axios.create({
  timeout: 5000,
  baseURL: '/api'
})

service.interceptors.request.use(config => {
  let token = Storage.get('token')
  if (token) {
    config.headers.Authorization = `token ${token}`
  }
  Toast.loading('加载中', 0)
  return config
})

service.interceptors.response.use(res => {
  Toast.hide()
  if (res.status === 200) {
    return res.data
  }
})

export default service
