const axios = require('axios')

function confirmDelete (user) {
  return axios.delete(`users/${user.id}`)
}

document.addEventListener('DOMContentLoaded', function () {
  const userDelete = document.getElementById('delete-form')

  userDelete.addEventListener('submit', event => {
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
