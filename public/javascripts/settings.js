const checkLoggedIn = () =>{
  return axios({
    method: 'get',
    url: '/login'
  })
}

function confirmDelete (user) {
  console.log(user)
  return axios.delete(`users/${user}`)
}

document.addEventListener('DOMContentLoaded', function () {
  const userDelete = document.getElementById('deleteUser')
  const confirmDeleteButton = document.querySelector('#deleteConfirmButton')

  confirmDeleteButton.addEventListener('click', () => {
    checkLoggedIn()
      .then(result => {
        if (result) {
          console.log('test')
          confirmDelete(result.data.user_id)
          window.location.href = 'login.html'
          axios.delete('/login')
        } else {
          window.location.href = 'login.html'
        }
      })
  })

  userDelete.addEventListener('', event => {
    let password = document.getElementById('password').value
    let email = document.getElementById('email').value

    let user = {}
    user.email = email
    user.password = password
    confirmDelete(user)
      .then(data => {
        let id = data.id
        userDelete(id)
      })
  })
})// End of DOM Content
