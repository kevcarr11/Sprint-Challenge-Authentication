const usersModel = require('../database/model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = require('express').Router();

router.post('/register', async (req, res) => {
  try {
    const saved = await usersModel.add(req.body)
    const token = signToken(saved)
    res.status(201).json({
      token,
      saved,
    })
  } catch (err) {
    next(err)
  }
});

router.post('/login', async (req, res) => {
  try {
    let {username, password} = req.body
    let user = await usersModel.findBy({ username })

    if (!user || !password) {
      return res.status(401).json({
        message: "Invalid Credentials - Please try again"
      })
    }

    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid Credentials - Please try again"
      })
    }

    if(user && passwordValid) {
      const token = signToken(user)
      res.status(200).json({
        message: `Welcome ${user.username}`,
        token,
      })
    }
  } catch (err) {
    next(err)
  }
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
