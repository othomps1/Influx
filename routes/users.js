
const express = require('express')
const knex = require('../knex.js')
const bcrypt = require('bcryptjs')

const router = express.Router()

router.post('/', (req, res, next) => {
  if(!req.body.username||!req.body.username.trim()){
    res.json({
      status: 404,
      message: 'must have a username!'
    })
  } else if (!req.body.email||!req.body.email.trim()) {
    res.json({
      status: 404,
      message: 'must have an email!'
    })
  } else if (!req.body.password||!req.body.password.trim()) {
    res.json({
      status: 404,
      message: 'must have an password!'
  })}

  return knex('users')
    .where({
      username: req.body.username,
      email: req.body.email
    })
    .first()
    .then((user) => {
      if (user) {res.status(404).send('User already exists')}
      else {
        return knex('users')
        .insert({
          username: req.body.username.toLowerCase(),
          email: req.body.email.toLowerCase(),
          hashed_password: bcrypt.hashSync(req.body.password, 1)
        }, '*')
        .then((user) => {
          res.status(200).json({
            id: user[0].id,
            username: user[0].username,
            email: user[0].email
          })
        })
        .catch((err) => {
          next(err)
        })}
    })


})

router.get('/', (req, res, next) => {
  return knex('users')
    .select('id','username','email')
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:id', (req, res, next) => {
  knex('users')
    .join('user_filters', 'users.id', 'user_filters.user_id')
    .rightJoin('filters', 'user_filters.filter_id','filters.id')
    .where({'users.id':req.params.id})
    .select('users.id','users.username','users.email','filters.filter')
    .then((usersFilters) => {
      if(usersFilters[0]){
        let filters = usersFilters.reduce((allFilters, entry)=>{
          allFilters.push(entry['filter'])
          return allFilters
        },[])
        const userInfo = {
          user_id: req.params.id,
          username: usersFilters[0].username,
          email: usersFilters[0].email,
          filters: filters
        }
        res.status(200).json(userInfo)
      } else {
        knex('users')
          .select('users.id','users.username','users.email')
          .where({'users.id':req.params.id})
          .then((usersInformation) => {
              const userInfo = {
                user_id: req.params.id,
                username: usersInformation[0].username,
                email: usersInformation[0].email
              }
              res.status(200).json(userInfo)
            })
      }
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/:id', (req, res, next) => {
  return knex('users')
    .where({
      id: req.params.id
    })
    .del()
    .returning(['id','username','email'])
    .then((users) => {
      res.status(200).json(users[0])
    })
    .catch((err) => {
      next(err)
    })
})


module.exports = router
