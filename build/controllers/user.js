'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = _models2.default.user,
    BookHistoryBorrowed = _models2.default.BookHistoryBorrowed,
    book = _models2.default.book;

var bookHistory = BookHistoryBorrowed;

exports.default = {

  // POST - /users/signup
  createUser: function createUser(req, res) {
    user.findOne({
      where: {
        $or: [{ email: req.body.email }, { username: req.body.username }] }
    }).then(function (result) {
      if (result) return res.status(400).send({ message: 'Username or email already registered!' });
      return user.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        membership: req.body.membership
      }).then(function (createUser) {
        _jsonwebtoken2.default.sign({ createUser: createUser }, 'userSecretKey', { expiresIn: '1h' }, function (err, token) {
          if (err) return console.log(err);
          res.status(201).json({ user: 'successfully registered!', token: token });
        });
      }).catch(function (error) {
        return res.status(400).json(error);
      });
    }).catch(function (error) {
      return res.status(500).json(error);
    });
  },


  // signin user
  signInUser: function signInUser(req, res) {
    process.env.SECRET_KEY = req.body.admin ? 'adminSecretKey' : 'userSecretKey'; // creating a token for either the user or admin
    var userC = req.body.admin ? 'admin' : 'user';
    return user.findOne({ where: { username: req.body.username, password: req.body.password } }).then(function (eachUser) {
      if (!eachUser) return res.status(400).send({ message: 'Wrong password or Username!' });
      _jsonwebtoken2.default.sign({ eachUser: eachUser }, process.env.SECRET_KEY, { expiresIn: '1h' }, function (err, token) {
        if (err) return console.log(err);
        res.status(202).send({ message: userC + ' loggedin successfully', token: token });
      });
    }).catch(function (err) {
      return res.status(401).send({ message: 'user not registered!' });
    });
  },


  // admin to list all users
  allUsers: function allUsers(req, res) {
    return user.findAll().then(function (output) {
      return res.status(200).send(output);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  getBorrowedBooks: function getBorrowedBooks(req, res) {
    return bookHistory.findAll({
      where: {
        userId: req.params.userId,
        bookReturned: req.query.return
      }
    }).then(function (bookHistoryInstance) {
      return res.status(200).send(bookHistoryInstance);
    }).catch(function (error) {
      return res.send(error);
    });
  },


  //  An API route that allow user to borrow a book
  //  POST: /api/users/<userId>/books
  borrowABook: function borrowABook(req, res) {
    var userId = req.params.userId;
    var bookId = req.body.bookId;

    return book.findById(req.body.bookId).then(function (bookIns) {
      if (bookIns.Quantity < 1) {
        // if Quantity is Less than 1
        return res.status(404).send('This books is no longer Available');
      }
      bookHistory.findOne({ where: { userId: userId, bookId: bookId } }).then(function (result) {
        if (result && !result.bookReturned) {
          // if this book exists in history and not returned
          return res.status(403).send('You\'ve already borrowed this book');
        }
        bookIns.update({ Quantity: bookIns.Quantity - 1 }); // UPDATE Quantity by decrement
        bookHistory.create({ userId: userId, bookId: bookId }).then(function (bookHisT) {
          return res.status(201).send({ message: 'book borrowed successfully!' });
        }).catch(function (error) {
          return res.status(400).send(error);
        });
      }).catch(function (error) {
        return res.status(500).send(error);
      });
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  returnAbook: function returnAbook(req, res) {
    var userId = req.params.userId;
    var bookId = req.body.bookId;

    return bookHistory.findOne({ where: { userId: userId, bookId: bookId } }).then(function (bookhis) {
      if (bookhis.bookReturned) return res.status(401).send('book already returned');
      book.findById(bookId).then(function (result) {
        result.update({ Quantity: result.Quantity + 1 });
        bookhis.update({ bookReturned: true });
        return res.status(202).send({ result: result, message: 'book successfully returned' });
      }).catch(function (err) {
        return res.status(404).send('invalid book id!');
      });
    }).catch(function (err) {
      return res.status(404).send('book was never borrowed by this user!');
    });
  }
};