// const dotenv = require('dotenv').config;
import jwt from 'jsonwebtoken';
// const secret = process.env.TOKEN_SECRET;

export default {

  crToken(req, res) {
    const code = (req.body.firstname) ? 201 : 202;
    jwt.sign(req.payload, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
      if (err) return console.log(err);
      res.status(code).json({ signup: 'user successfully signedup', token });
    });
  },

  // middleware to verification token for users
  verifyUser(req, res, next) {
    const { headers } = req;
    const token = headers.authorization || headers['x-access-token'] || req.body.token;
    if (token) {
      jwt.verify(token, 'userSecretKey', (err) => {
        if (err) return res.status(403).send('Token Is Not Valid');
        next();
      });
    } else {
      res.status(401).send('Token not provided');
    }
  },

  // middleware to verification token for Admin
  verifyAdmin(req, res, next) {
    const { headers } = req;
    const token = headers.authorization || headers['x-access-token'] || req.body.token;
    if (token) {
      jwt.verify(token, 'adminSecretKey', (err) => {
        if (err) return res.status(403).send({ message: 'Token Is Not Valid' });
        next();
      });
    } else {
      res.status(401).send('Token not provided');
    }
  },

};
