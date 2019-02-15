import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { Message } from 'element-ui'
import router from '../router/router'
// import { baseURL } from './config'

// 在config.js文件中统一存放一些公共常量，方便之后维护
// import { baseURL } from './config.js'

// 添加请求拦截器，在发送请求之前做些什么(**具体查看axios文档**)--------------------------------------------
axios.interceptors.request.use(function (config) {
  // 显示loading
  store.state.fullscreen = true
  store.state.requestTime = new Date().getTime()
  const token = localStorage.getItem('token')
  config.headers.common['Authorization'] = 'Bearer ' + token
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器(**具体查看axios文档**)----------------------------------------------------------------
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
  // 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可
  return response.data
}, function (error) {
  console.log(error.response.data)
  if (error.response.data.code === -1) {
    Message({
      type: 'warning',
      message: error.response.data.msg
    })
    router.replace('/login')
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 封装数据返回失败提示函数---------------------------------------------------------------------------
function errorState (response) {
  // 隐藏loading
  let timeInterval = new Date().getTime() - store.state.requestTime
  if (timeInterval < store.state.minLoading) {
    setTimeout(() => {
      store.state.fullscreen = false
      return response
    }, store.state.minLoading)
  } else {
    store.state.fullscreen = false
    return response
  }
}

// 封装数据返回成功提示函数---------------------------------------------------------------------------
function successState (response) {
  // 隐藏loading
  let timeInterval = new Date().getTime() - store.state.requestTime
  if (timeInterval < store.state.minLoading) {
    setTimeout(() => {
      store.state.fullscreen = false
      if (response.code !== 0) {
        Message({
          type: 'warning',
          message: response.data
        })
      }
      return response
    }, store.state.minLoading)
  } else {
    store.state.fullscreen = false
    if (response.code !== 0) {
      Message({
        type: 'warning',
        message: response.data
      })
    }
    return response
  }
}

// 封装axios--------------------------------------------------------------------------------------
function apiAxios (url, method = 'GET', params = {}) {
  method = method.toUpperCase()
  let httpDefault = {
    method: method,
    // baseURL: baseURL,
    url: url,
    // `params` 是即将与请求一起发送的 URL 参数
    // `data` 是作为请求主体被发送的数据
    params: method === 'GET' || method === 'DELETE' ? params : null,
    data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
    timeout: 10000
  }

  return new Promise((resolve, reject) => {
    axios(httpDefault).then((response) => {
      successState(response)
      resolve(response)
    }).catch((response) => {
      errorState(response)
      reject(response)
    })
  })
}

export default apiAxios
