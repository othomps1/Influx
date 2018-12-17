document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    let user = {}
    user.username = form.exampleUserName1.value
    user.email = form.exampleInputEmail1.value
    user.password = form.exampleInputPassword1.value
    axios.delete('/login')
    axios.post('/login', user)
    .then(result => {
      if (result.data.message) {
        let errText = document.createElement('p')
        const div = document.querySelector('.errTextDiv')
        div.innerHTML = ''
        errText.innerHTML = `Error: ${result.data.message}`
        errText.style = 'color: red;'
        div.appendChild(errText)
      } else {
        axios.get('/login')
        .then(result => {
          if (result.data) {
            window.location.href = 'feed.html'
          } else {
            let errText = document.createElement('p')
            const div = document.querySelector('.errTextDiv')
            div.innerHTML = ''
            errText.innerHTML = 'Error: Account doesn\'t exist'
            errText.style = 'color: red;'
            div.appendChild(errText)
          }
        })
      }
    })
  })
})
