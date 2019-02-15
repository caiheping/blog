import apiAxios from '../utils/request'

function loginApi (query = {}) {
  return apiAxios('/api/login', 'POST', query)
}

export {
  loginApi
}
