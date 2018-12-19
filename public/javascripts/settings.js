const checkLoggedIn = () =>{
  return axios({
    method: 'get',
    url: '/login'
  })
}

const confirmDelete  = (user) => {
  console.log(user)
  return axios.delete(`users/${user}`)
}

const getUserInfo = (userInfomation) => {
  // console.log(userInfomation)
  return  axios({
    method: 'get',
    url: `/users/${userInfomation.user_id}`
  })
}

let userInfo = {}


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

  checkLoggedIn()
  .then(response => {
    getUserInfo(response.data)
    .then(results => {
      userInfo.user_id = results.data.user_id
      userInfo.username = results.data.username
      userInfo.email = results.data.email
      if (!checkLoggedIn()) {
        document.querySelector('.username1').innerHTML = 'Login'
      } else {
        document.querySelector('.username1').innerText = `${userInfo.username.charAt(0).toUpperCase()+userInfo.username.slice(1)}`
      }
    })
  })
}) //End of DOM Content

function changePassword (id, newPassword) {
  return axios({
    method: 'patch',
    url: `/users/${id}`,
    data: {
      password: newPassword
    }
  })
}


document.addEventListener('DOMContentLoaded', function () {
  const oldPassword = document.getElementById('exampleInputPassword1').value
  const newPassword = document.getElementById('exampleInputPassword2').value
  const confirmNewPassword = document.querySelector('form')

  confirmNewPassword.addEventListener('submit', () => {
    checkLoggedIn()
      .then(result => {
        console.log("result",result)
        if (result.data) {
          console.log(result.data)
          changePassword(result.data.user_id, newPassword)
          .then(()=>{window.location.href = 'settings.html'})
        } else {
          window.location.href = 'login.html'
        }
      })
  })
})
