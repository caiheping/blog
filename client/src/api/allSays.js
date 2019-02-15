import apiAxios from '../utils/request'

function say (query = {}) {
  return apiAxios('/api/allSays', 'GET', query)
}

export {
  say
}
