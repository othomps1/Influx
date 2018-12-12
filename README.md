
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

CSS -
font-family: 'Playfair Display', serif;
font-family: 'Roboto Condensed', sans-serif;
```

### Planning

[https://trello.com/b/ZQWEmDqa/q2-project]


### Schema/ERD for Database
https://www.lucidchart.com/invitations/accept/9a331a84-0ff9-4d8b-9a5b-870fa65efa09

### Server Routes Plan

- Users
  - GET /api/users/:id - Return user filter preferences
  - POST /api/filter/:id - Update user account with filter preferences
  - DELETE /api/filter/:id - Delete filter preferences
  - DELETE /api/users/:id - Delete a user account

- Auth
  - POST /api/users - Create new user
  - POST /api/users/:id - User login
