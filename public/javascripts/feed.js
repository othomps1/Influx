let userInfo = {}
let filterArray = []
let filterList = document.querySelector('.filterList')

document.addEventListener('DOMContentLoaded', () => {
  const updateFeed = (userInfomation3) =>{
    axios({
      method: 'post',
      url: '/news',
      data: userInfomation3
    })
    .then((response) => {
      list.innerHTML = ''
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

  const addFilter = (userInfomation2) =>{
    return  axios({
      method: 'post',
      url: '/filters',
      data: userInfomation2
    })
  }

  const getUserInfo = (userInfomation) => {
    // console.log(userInfomation)
    return  axios({
      method: 'get',
      url: `/users/${userInfomation.user_id}`
    })
  }

  const checkLoggedIn = () =>{
    return axios({
      method: 'get',
      url: '/login'
    })
  }

  const getUsername = () => {
    return checkLoggedIn()
    .then(response => {
      getUserInfo(response.data)
      .then(results => {
        userInfo.user_id = results.data.user_id
        userInfo.username = results.data.username
        userInfo.email = results.data.email
        userInfo.filters = results.data.filters
        filterArray = userInfo.filters
        if (!checkLoggedIn()) {
          document.querySelector('.username1').innerHTML = 'Login'
        } else {
          document.querySelector('.username1').innerHTML = `${userInfo.username}`
        }
        if (filterArray) {
          for (var i = 0; i < filterArray.length; i++) {
            let filter = document.createElement('span')
            let filterList2 = document.querySelector('.filterList')
            filter.innerHTML = filterArray[i]
            filter.className = `badge filter badge-secondary mr-2 mt-2`
            filter.style = 'font-size: 16px;'
            filter.addEventListener('click', (event) => {
              userInfo.filter = event.target.innerHTML
              updateFeed(userInfo)
            })
            filterList2.appendChild(filter)
          }
        }
      })
    })
  }
getUsername()

const list = document.querySelector('.list')


updateFeed({
  filter: 'news'
})


  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    const userSearch = document.querySelector('.searchBar')
    if (userSearch.value === '') {
      userSearch.placeholder = 'Please enter a Filter'
    } else {
      let filterlist3 = document.querySelector('.filterList')
      list.innerHTML = ''
      filterlist3.innerHTML = ''
      userInfo.filter = userSearch.value
      checkLoggedIn()
      .then(result=>{
        if(result.data) {
          addFilter(userInfo)
          .then((response) => {
            // userInfo['user_id'] = response.data.user_id
            getUsername(userInfo)
            .then(filterInfo=>{
              // userInfo = filterInfo.data
            })
            updateFeed(userInfo)
          })
        } else {
          alert("please login first")
        }
      })
    }
  })

  document.querySelector('#sortByDropdown').addEventListener('click', (event) => {
    switch(event.target.innerText) {
      case 'Relevancy':
        userInfo.sortBy = "relevancy"
        break;
      case 'Popularity':
          userInfo.sortBy = "popularity"
        break;
      case 'Date Published':
        userInfo.sortBy = "publishedAt"
    }
    document.querySelector('#sortByButton').innerText = event.target.innerText
  })

  document.querySelector('#languageDropdown').addEventListener('click', (event) => {
    let currentLang = event.target.innerText.split(" ")[0]
    switch(currentLang) {
      case 'All':
        delete userInfo.language
        break;
      case 'Arabic':
        userInfo.language = "ar"
        break;
      case 'German':
        userInfo.language = "de"
        break;
      case 'English':
        userInfo.language = "en"
      case 'Spanish':
        userInfo.language = "es"
      case 'French':
        userInfo.language = "fr"
        break;
      case 'Hebrew':
        userInfo.language = "he"
        break;
      case 'Italian':
        userInfo.language = "it"
      case 'Dutch':
        userInfo.language = "nl"
        break;
      case 'Norweigan':
        userInfo.language = "no"
        break;
      case 'Portuguese':
        userInfo.language = "pt"
      case 'Russian':
        userInfo.language = "ru"
        break;
      case 'Chinese':
        userInfo.language = "zh"
        break;
    }
    document.querySelector('#languageButton').innerText = currentLang
  })

  document.querySelector('#sourceDropdown').addEventListener('click', (event) => {
    let currentSource = event.target.innerText
    switch(currentSource) {
      case 'All Sources':
        delete userInfo.source
        break;
      case 'ABC':
        userInfo.source = "abc-news"
        break;
      case 'Al Jazeera':
        userInfo.source = "al-jazeera-english"
        break;
      case 'Associated Press':
        userInfo.source = "associated-press"
        break;
      case 'BBC':
        userInfo.source = "bbc-news"
      case 'Bloomberg':
        userInfo.source = "bloomberg"
      case 'CNN':
        userInfo.source = "cnn"
        break;
      case 'The Economist':
        userInfo.source = "the-economist"
        break;
      case 'Fox News':
        userInfo.source = "fox-news"
        break;
      case 'The Gaurdian':
        userInfo.source = "the-gaurdian-uk"
        break;
      case 'Huffington Post':
        userInfo.source = "the-huffington-post"
        break;
      case 'New York Times':
        userInfo.source = "the-new-york-times"
        break;
      case 'Reuters':
        userInfo.source = "reuters"
      case 'Wallstreet Journal':
        userInfo.source = "the-wall-street-journal"
        break;
    }
    document.querySelector('#sourceButton').innerText = currentSource
  })

  document.querySelector('.logout').addEventListener('click', () => {
    axios.delete('/login')
    window.location.href = '/login.html'
  })
})
