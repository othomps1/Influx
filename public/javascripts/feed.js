document.addEventListener('DOMContentLoaded', () => {

const list = document.querySelector('.list')

const updateFeed = (userInfo) =>{
  axios({
    method: 'post',
    url: '/news',
    data: userInfo
  })
  .then((response) => {
    // console.log("updateFeed response.data", response.data)
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
    console.log(err)
  })
}

updateFeed({
  filter: 'usa'
})


const addFilter = (userInfo) =>{
  return  axios({
      method: 'post',
      url: '/filters',
      data: userInfo
    })
}

const getUserInfo = (userInfo) =>{
  return  axios({
      method: 'get',
      url: `/users/${userInfo.user_id}`
    })
}

const checkLoggedIn = () =>{
    return axios({
        method: 'get',
        url: '/login'
    })
}

  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    const userSearch = document.querySelector('.searchBar')
    if (userSearch.value === '') {
      userSearch.placeholder = 'Please enter a Filter'
    } else {
      list.innerHTML = ''
      let userInfo = {}
      userInfo.filter = userSearch.value
      checkLoggedIn()
      .then(result=>{
        if(result) {
          addFilter(userInfo)
          .then((response) => {
            userInfo['user_id'] = response.data.user_id
            getUserInfo(userInfo)
            .then(filterInfo=>{
              console.log('getUsersInfo',filterInfo.data)
            })
            updateFeed(userInfo)
          })
        } else {
          alert("please login first")
        }
      })
    }
  })
})
