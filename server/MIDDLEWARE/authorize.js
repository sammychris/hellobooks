// const dotenv = require('dotenv').config;
import jwt from 'jsonwebtoken';
// const secret = process.env.TOKEN_SECRET;

export default {

  // middleware to verification token for users
  verifyUser(req, res, next) {
    const { headers } = req;
    const token = headers.authorization || headers['x-access-token'] || req.body.token;
    if (token) {
      jwt.verify(token, 'userSecretKey', (err) => {
        if (err) return res.status(403).json('Invalid Token');
        next();
      });
    } else {
      res.status(401).json('Token not provided');
    }
  },

  // middleware to verification token for Admin
  verifyAdmin(req, res, next) {
    const { headers } = req;
    const token = headers.authorization || headers['x-access-token'] || req.body.token;
    if (token) {
      jwt.verify(token, 'adminSecretKey', (err) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        next();
      });
    } else {
      res.status(401).json('Token not provided');
    }
  },

};
