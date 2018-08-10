'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var book = _models2.default.book;
exports.default = {
  // POST - /users/signup
  addBook: function addBook(req, res) {
    return book.create({
      Tittle: req.body.Tittle,
      Author: req.body.Author,
      Category: req.body.Category,
      Quantity: req.body.Quantity,
      Description: req.body.Description
    }).then(function (bookTnstance) {
      return res.status(201).send(bookTnstance);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  list: function list(req, res) {
    return book.findAll().then(function (output) {
      return res.status(200).send(output);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  modify: function modify(req, res) {
    return book.findById(req.params.bookId).then(function (result) {
      if (!result) return res.status(404).json('Invalid bookID');
      return result.update(req.body).then(function (output) {
        return res.status(201).send(output);
      });
    }).catch(function (error) {
      return res.status(500).send(error);
    });
  },
  findAbook: function findAbook(req, res) {
    return book.findById(req.params.bookId).then(function (result) {
      if (!result) return res.status(404).json('Invalid bookID');
      res.status(200).send(result);
    }).catch(function (error) {
      return res.status(500).send(error);
    });
  }
};