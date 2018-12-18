const checkLoggedIn = () =>{
  return axios({
    method: 'get',
    url: '/login'
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const newPassword = document.getElementById('exampleInputEmail1')
})
