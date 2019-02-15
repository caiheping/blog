import apiAxios from '../utils/request'

function registerApi (query = {}) {
  return apiAxios('/api/register', 'POST', query)
}

export {
  registerApi
}
