
const express = require('express')
const knex = require('../knex.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = express.Router()

let userInfo = {}

const jwtPayload = (user)=>{
  const payload = {
  id: user.id,
  username: user.username,
  email: user.email
  }
  return payload
}

router.get('/', (req, res) => {
  if (!req.cookies.token) {
    res.json(false)
  }
  else if (req.cookies.token) {
    const secretkey = process.env.JWT_KEY
    jwt.verify(req.cookies.token, secretkey, (err, decode) => {
<<<<<<< HEAD

    res.json({
      user_id: decode.id,
      username: decode.username,
      email: decode.email
=======
    res.json({
       user_id: decode.id,
        username: decode.username,
        email: decode.email
>>>>>>> b30f06fee32ef78b17d3a90f6b88c3fa046df661
    })
    })
  }
})

router.post('/', (req, res, next) => {
  knex('users')
    .where({
      email: req.body.email,
      username: req.body.username.toLowerCase()
    })
    .select('*')
    .first()
    .then((user) => {
      if (user) {
        const payload = jwtPayload(user)
        const isRightPW = bcrypt.compareSync(req.body.password, user.hashed_password)

        if (isRightPW) {
          const secretkey = process.env.JWT_KEY
          const token = jwt.sign(payload, secretkey)
          res.cookie('token', token, {
            httpOnly: true
          }).json({
            id: user.id,
            username: user.username,
            email: user.email
          })
        }
        else {
          res.json({
            status: 400,
            message: 'Invalid email or password.'
          })
        }
      }
      else {
        res.json({
          status: 400,
          message: 'Invalid email or password.'
        })
      }
    })
})

router.delete('/', (req, res) => {
  res.clearCookie('token')
  res.end()
})

module.exports = router
