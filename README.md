<p align="center">
<a href="https://influx-news.herokuapp.com/"><img src="public/images/logo.png" target="_blank" title="Influx" alt="Influx" width="35%"></a>
</p>

# Influx - News-Filtering-App

[Deployed link](https://influx-news.herokuapp.com/)
<<<<<<< HEAD

## Table of Contents

- [Installation](#installation)
- [Wireframe](#wireframe)
- [Style](#style)
- [Planning](#planning)
- [Schema](#schema)
- [Routes](#routes)
- [API](#api)
- [Technologies](#technologies)

### Installation

Step One: Clone this repo to your local machine  
Step Two: npm install

### Wireframe
=======
>>>>>>> 819bee72351ed9889563cc782003cb652668bf82

[https://xd.adobe.com/view/a83a0405-7fda-4f3e-4ebf-754d4cd6f5da-de0b/]

### Style

[Color Scheme](https://coolors.co/28262c-809bce-f9f5ff-9fbbcc-7a9cc6)
```
/* RGB */
$color1: #28262c; // font
$color2: #809bce; // main background
$color3: f9f5ff; // story backgrounds
```
[Font Scheme](https://fonts.googleapis.com/css?family=Playfair+Display|Roboto+Condensed)
```
/* CSS */
font-family: 'Playfair Display', serif;
font-family: 'Roboto Condensed', sans-serif;
```

### Planning

[https://trello.com/b/ZQWEmDqa/q2-project]


### Schema

https://www.lucidchart.com/invitations/accept/9a331a84-0ff9-4d8b-9a5b-870fa65efa09

### Routes

- Users
  - GET /api/users/:id - Return user info and filter preferences
  - POST /api/filter - Update user account with filter preferences
  - DELETE /api/filter/:id - Delete filter preferences
  - DELETE /api/users/:id - Delete a user account
  _ POST /api/news - Get news from NewsAPI.org api
  
- Admin
  - GET /api/users Get all users information
  - GET /api/users Get all filter information

- Auth
  - POST /api/users - Create new user
  - POST /api/login - User login
  - GET /api/login - Check if user is logged in
  - DELETE /api/login - User Logout


### API

https://newsapi.org

### Technologies

<a href="https://www.postgresql.org/"><img src="public/images/javascript-original.svg" target="_blank" title="PSQL" alt="PSQL" width="15%"></a>
<a href="https://www.javascript.com/"><img src="public/images/postgresql-original.svg" target="_blank" title="JS" alt="JS" width="15%"></a>
<a href="https://html.com/"><img src="public/images/html5-original.svg" target="_blank" title="HTML" alt="HTML" width="15%"></a>
<a href="https://css-tricks.com/"><img src="public/images/css3-original.svg" target="_blank" title="CSS" alt="CSS" width="15%"></a>
<a href="https://getbootstrap.com/"><img src="public/images/bootstrap-plain.svg" target="_blank" title="Bootstrap" alt="Bootstrap" width="15%"></a>
