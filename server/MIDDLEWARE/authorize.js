// const dotenv = require('dotenv').config;
import jwt from 'jsonwebtoken';
// const secret = process.env.TOKEN_SECRET;

module.exports = {
  authorize(req, res, next) {
    const auth = req.headers.authorization;
    const token = req.body.token || req.headers['x-access-token'] || auth;
    if (token) {
      jwt.verify(token, 'bootcamp', (err, decoded) => {
        console.log(err);
        if (err) {
          const reply = 'You are not signed in';
          res.status(403).send({ message: reply });
        } else {
          userRole = decoded.role;
        }
      });
    } else {
      res.status(412).send({ message: 'Token not provided' });
    }
  },
};
