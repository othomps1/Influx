document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('button')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    let user = {}
    user.email = form.exampleInputEmail1.value
    user.password = form.exampleInputPassword1.value
    axios.delete('/users/:id')
