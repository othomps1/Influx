document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('button')
  button.addEventListener('submit', (event) => {
    event.preventDefault()
    let user = {}
    user.email = button.email.value
    user.password = button.password.value
    axios.delete('/users/:id')
  })
})
