
# News-Filtering-App
# Digital Dose

[Deployed link](http://google.com/)

### Wireframes
[https://xd.adobe.com/view/a83a0405-7fda-4f3e-4ebf-754d4cd6f5da-de0b/]

### A style guide

[Color Scheme](https://coolors.co/28262c-809bce-f9f5ff-9fbbcc-7a9cc6)
```
/* RGB */
$color1: #28262c; //font
$color2: #809bce; //main background
$color3: f9f5ff; //story backgrounds
```

Fonts: Playfair Display & Roboto Condensed (example below)
```
<link href="https://fonts.googleapis.com/css?family=Playfair+Display|Roboto+Condensed" rel="stylesheet">
```
or
```
<style>
@import url('https://fonts.googleapis.com/css?family=Oswald|Quattrocento');
</style>
```

CSS -
font-family: 'Playfair Display', serif;
font-family: 'Roboto Condensed', sans-serif;


### Planning

[https://trello.com/b/ZQWEmDqa/q2-project]


### Schema/ERD for Database
[https://www.lucidchart.com/documents/edit/37236b26-8ef3-4dbc-906b-642f7ed653b7/0?shared=true&]

### Server Routes Plan

- Users
  - GET /api/users/:id - Return user info
  - GET /api/users/id:/user_filters - Retrieve data linked to user preferences
  - GET /api/users/id:/saved - Retrieve users saved stories
  - PATCH /api/users/id - Update user account
  - DELETE /api/users/:id - Delete a user account

- Auth
  - POST /api/signup - Create new user
  - POST /api/login - User login
