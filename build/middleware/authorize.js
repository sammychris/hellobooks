'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const secret = process.env.TOKEN_SECRET;

exports.default = {

  // middleware to verification token for users
  verifyUser: function verifyUser(req, res, next) {
    var headers = req.headers;

    var token = headers.authorization || headers['x-access-token'] || req.body.token;
    if (token) {
      _jsonwebtoken2.default.verify(token, 'userSecretKey', function (err) {
        if (err) return res.status(403).json('Token Is Not Valid');
        next();
      });
    } else {
      res.status(401).json('Token not provided');
    }
  },


  // middleware to verification token for Admin
  verifyAdmin: function verifyAdmin(req, res, next) {
    var headers = req.headers;

    var token = headers.authorization || headers['x-access-token'] || req.body.token;
    if (token) {
      _jsonwebtoken2.default.verify(token, 'adminSecretKey', function (err) {
        if (err) return res.status(403).json({ message: 'Token Is Not Valid' });
        next();
      });
    } else {
      res.status(401).json('Token not provided');
    }
  }
}; // const dotenv = require('dotenv').config;