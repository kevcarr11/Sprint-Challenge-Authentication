const usersModel = require('../database/model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = require('express').Router();

router.post('/register', async (req, res) => {
  try {
    const saved = await usersModel.add(req.body)
    
  } catch (err) {
    next(err)
  }
});

router.post('/login', (req, res) => {
  // implement login
});

function signToken(user) {
  const payload = {
    userId: user.id,
  }

  const secret = process.env.JWT_SECRET || "Sssshhhhh its a secret, keep it safe"

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secret, options)
}




module.exports = router;
