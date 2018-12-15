function createUser (user) {
  return axios.post('/users', user)
}

function getFeed (id) {
  return axios.get(`feed/${ id }`)
}
