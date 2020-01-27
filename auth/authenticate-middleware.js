const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const { authorization } = req.headers

  if (authorization) {
    const secret = process.env.JWT_SECRET || "Sssshhhhh its a secret, keep it safe"

    jwt.verify(authorization, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: "Invalid Token"
        })
      } else {
        req.token = decodedToken
        next()
      }
    })

  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
