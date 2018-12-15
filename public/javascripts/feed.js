document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.button').addEventListener('click', (event) => {
    event.preventDefault()
    let list = document.querySelector('.list')
    list.innerHTML = ''
    let userSearch = document.querySelector('.searchBar')
    if (userSearch.value === '') {
      userSearch.placeholder = 'Please enter a Filter'
    } else {
      let userInfo = {}
      userInfo.currentfilter = userSearch.value
      console.log(userInfo)
      axios({
        method: 'post',
        url: '/news',
        data: userInfo
      })
      .then((response) => {
        for (var i = 0; i < response.data.articles.length; i++) {
          let newThread = document.createElement('li')
          let newImage = document.createElement('img')
          let newDiv = document.createElement('div')
          let newHead = document.createElement('h5')
          let newText = document.createElement('p')
          let newLink = document.createElement('a')
          if (response.data.articles[i].title) {
            newHead.innerHTML = response.data.articles[i].title
          } else {
            newHead.innerHTML = 'No Headline provided'
          }
          if (response.data.articles[i].author) {
            newHead.innerHTML += `, Created by: ${response.data.articles[i].author}`
          }
          if (response.data.articles[i].content) {
            newText.innerHTML = response.data.articles[i].content
          } else {
            newText.innerHTML = 'No Summary provided'
          }
          if (!response.data.articles[i].urlToImage) {
            newImage.src = 'http://i2.wp.com/www.4motiondarlington.org/wp-content/uploads/2013/06/No-image-found.jpg'
          } else {
            newImage.src = response.data.articles[i].urlToImage
          }
          if (response.data.articles[i].url) {
            newLink.href = response.data.articles[i].url
            newLink.innerHTML = 'Link to Article'
          }
          newThread.className = 'media my-4'
          newHead.className = 'mt-0 mb-1'
          newDiv.className = 'media-body'
          newImage.className = 'mr-3 rounded'
          newImage.style = 'max-height: 30%; max-width: 30%;'
          newDiv.style = 'color: white;'
          newHead.style = 'font-family: Roboto Condensed, sans-serif;'
          newText.style = 'font-family: Playfair Display, serif;'
          newDiv.appendChild(newHead)
          newDiv.appendChild(newText)
          newDiv.appendChild(newLink)
          newThread.appendChild(newImage)
          newThread.appendChild(newDiv)
          list.appendChild(newThread)
          list.appendChild(document.createElement('br'))
        }
      })
      .catch((err) => {
        console.log('BROKEN')
      })
    }
  })
})
