var check = function() {
  console.log('test')
  let pass = document.querySelector('#exampleInputPassword1').value
  let confirm = document.querySelector('#exampleInputPassword2').value
  if (pass == confirm) {
    document.getElementById('message').style.color = 'white';
  } else {
    document.getElementById('message').style.color = 'red';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  let submit = document.querySelector('.submit')
  submit.addEventListener('click', (event) => {
    console.log('submit')
  })
})