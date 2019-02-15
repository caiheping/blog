import apiAxios from '../utils/request'

function test (query = {}) {
  return apiAxios('/api/test', 'GET', query)
}
export {
  test
}
