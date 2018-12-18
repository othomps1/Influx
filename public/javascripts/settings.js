const checkLoggedIn = () => {
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
  }) //End of DOM Content

  function changePassword (id, newPassword) {
    console.log(id)
    return axios({
      method: 'patch',
      url: `/users/${id}`,
      data: {
        password: newPassword
      }
    })
  }

  document.addEventListener('DOMContentLoaded', function () {
    const oldPassword = document.getElementById('exampleInputPassword1')
    const newPassword = document.getElementById('exampleInputPassword2')
    const confirmNewPassword = document.getElementById('exampleInputPassword3')

    confirmNewPassword.addEventListener('click', () => {
      checkLoggedIn()
        .then(result => {
          if (result) {
            console.log('test')
            changePassword(result.data.user_id, newPassword)
            window.location.href = 'settings.html'
            axios.patch('/settings')
          } else {
            window.location.href = 'login.html'
          }
        })
      })
    })
