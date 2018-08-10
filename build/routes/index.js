'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _books = require('../controllers/books');

var _books2 = _interopRequireDefault(_books);

var _authorize = require('../middleware/authorize');

var _authorize2 = _interopRequireDefault(_authorize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUser = _user2.default.createUser,
    signInUser = _user2.default.signInUser,
    getBorrowedBooks = _user2.default.getBorrowedBooks,
    borrowABook = _user2.default.borrowABook,
    returnAbook = _user2.default.returnAbook,
    allUsers = _user2.default.allUsers;
var addBook = _books2.default.addBook,
    list = _books2.default.list,
    modify = _books2.default.modify,
    findAbook = _books2.default.findAbook;
var verifyUser = _authorize2.default.verifyUser,
    verifyAdmin = _authorize2.default.verifyAdmin;

exports.default = function (app) {
  app.post('/api/users/signup', createUser);
  app.post('/api/users/signin', signInUser);
  app.get('/api/books', verifyUser, list); // list all book
  app.get('/api/books/:bookId', verifyUser, findAbook); //find a book
  app.post('/api/books', verifyAdmin, addBook);
  app.put('/api/books/:bookId', verifyAdmin, modify);
  app.post('/api/users/:userId/books', verifyUser, borrowABook); // user to borrow a book
  app.put('/api/users/:userId/books', verifyUser, returnAbook); // user to return a book
  app.get('/api/users/:userId/books?', verifyUser, getBorrowedBooks); // user to view all borrowedbooks
  app.get('/api/users/all', verifyAdmin, allUsers); // admin to view all users
};