document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('button')
  button.addEventListener('submit', (event) => {
    event.preventDefault()
    let user = {}
    user.email = button.exampleInputEmail1.value
    user.password = button.exampleInputPassword1.value
    axios.delete('/users/:id')
  })
})
