import apiAxios from '../utils/request'

function addSayApi (query = {}) {
  return apiAxios('/api/addSay', 'POST', query)
}

function getMySaysApi (query = {}) {
  return apiAxios('/api/mySays', 'GET', query)
}

function delSayApi (query = {}) {
  return apiAxios('/api/delSay', 'POST', query)
}

export {
  addSayApi,
  getMySaysApi,
  delSayApi
}
