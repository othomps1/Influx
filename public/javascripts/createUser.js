let passMatch = false
let passLength = false

const check = function() {
  const pass = document.querySelector('#exampleInputPassword1').value
  const confirm = document.querySelector('#exampleInputPassword2').value
  if (pass == confirm) {
    document.getElementById('message2').style.color = 'white';
    letSubmit = true
  } else {
    document.getElementById('message2').style.color = 'red';
    letSubmit = false
  }
  if (pass.length >= 8) {
    document.getElementById('message1').style.color = 'white';
  } else {
    document.getElementById('message1').style.color = 'red';
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  const submitUser = document.querySelector('#submitButton')
  submitUser.addEventListener('submit', (event) => {
    event.preventDefault()
    if(letSubmit){
      let user = {}
      user.username = form.exampleUserName1.value
      user.email = form.exampleInputEmail1.value
      user.password = form.exampleInputPassword1.value
      axios.post('/users', user)
      .then( results => {
        console.log(results.data);
      })
    }
  })
});
