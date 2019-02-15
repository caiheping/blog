import apiAxios from '../utils/request'

function getSayDetailApi (query = {}) {
  return apiAxios('/api/sayDetail', 'GET', query)
}

function addCommentApi (query = {}) {
  return apiAxios('/api/addComment', 'POST', query)
}

export {
  getSayDetailApi,
  addCommentApi
}
