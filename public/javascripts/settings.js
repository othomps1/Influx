<<<<<<< HEAD
let passMatch = false
let passLength = false

const checkLoggedIn = () => {
  return axios({
    method: 'get',
    url: '/login'
  })
}

const changePassword = (user_id, userInfo) => {
  return axios({
    method: 'patch',
    url: `/users/${user_id}`,
    data: userInfo
  })
}


const check = function() {
  const pass = document.querySelector('.passwordMustMatch').value
  const confirm = document.querySelector('.passwordLength8').value
  if (pass == confirm) {
    document.getElementById('message2').style.color = 'white';
    passMatch = true
  } else {
    document.getElementById('message2').style.color = 'red';
    passMatch = false
  }
  if (pass.length >= 8) {
    document.getElementById('message1').style.color = 'white';
    passLength = true
  } else {
    document.getElementById('message1').style.color = 'red';
    passLength = false
  }
}

function confirmDelete (user) {
  console.log(user)
  return axios.delete(`users/${user}`)
}

document.addEventListener('DOMContentLoaded', function () {
  const userDelete = document.getElementById('deleteUser')
  const confirmDeleteButton = document.querySelector('#deleteConfirmButton')
  const changePasswordForm =document.querySelector('#changePasswordForm')
  changePasswordForm.addEventListener('submit', () => {
    event.preventDefault()
    if (passMatch && passLength) {
      let user ={}
      user.password = document.querySelector('#exampleInputPassword2').value
      user.newPass2 = document.querySelector('#exampleInputPassword3').value
      checkLoggedIn()
      .then(result => {
        changePassword(result.data.user_id, user)
      })
      window.location.href = 'login.html'
    } else {
      console.log('Password requirements not met')
    }
  })
}


document.addEventListener('DOMContentLoaded', function () {
  const oldPassword = document.getElementById('exampleInputPassword1').value
  const newPassword = document.getElementById('exampleInputPassword2').value
  const confirmNewPassword = document.querySelector('form')

  confirmDeleteButton.addEventListener('submit', () => {
    checkLoggedIn()
      .then(result => {
        if (result) {
          confirmDelete(result.data.user_id)
          window.location.href = 'login.html'
          axios.delete('/login')
        } else {
          window.location.href = 'login.html'
        }
      })
    })
    document.querySelector('.logout').addEventListener('click', () => {
      axios.delete('/login')
      window.location.href = '/login.html'
    })
})
