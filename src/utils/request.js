import axios from 'axios'
import { Message } from 'element-ui'
import getLang from '@/lib/getBrowserLang'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  withCredentials: true,
  timeout: 120000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  let langList = navigator.languages && navigator.languages.length > 0 ? navigator.languages : []
  langList = Array.from(new Set([getLang(), ...langList]))
  config.headers['Accept-Language'] = langList.join(',')
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    Promise.resolve(response.data)
    return response.data
  },
  error => {
    // if (error.response.status === 401) {
    //   return window.location.reload()
    // }
    // Message.error(error.response.result_desc || 'error', 5)
    return Promise.reject(error)
  }
)

const request = (arg) => {
  return new Promise((resolve, reject) => {
    service(arg).then(response => {
      // console.log("response", response)
      if (response.code === 200 ||response.status === 200 || response.result_code === 0 || response.code === 0) {
        resolve(response)
      } else {
        Message({
          message: response.result_desc || 'error',
          type: 'error',
          duration: 10 * 1000
        })
        reject(response)
      }
      // resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export default request
