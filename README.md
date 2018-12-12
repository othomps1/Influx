
# News-Filtering-App
# Digital Dose

[Deployed link](http://google.com/)

### Wireframes
[Wireframes]()

### A style guide

[Color Scheme](http://coolors.co/220901-621708-941b0c-bc3908-f6aa1c)
```
/* RGB */
$color1: rgba(34, 9, 1, 1);
$color2: rgba(98, 23, 8, 1);
$color3: rgba(148, 27, 12, 1); //main
$color4: rgba(188, 57, 8, 1);
$color5: rgba(246, 170, 28, 1);
```

Fonts: Oswald & Quattrocento (example below)
```
<link href="https://fonts.googleapis.com/css?family=Oswald|Quattrocento" rel="stylesheet">
```
or
```
<style>
@import url('https://fonts.googleapis.com/css?family=Oswald|Quattrocento');
</style>
```

CSS -
font-family: 'blank', sans-serif;


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


