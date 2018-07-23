const book = require('../models').books;


module.exports = {
  // POST - /users/signup
  addBook(req, res) {
    book.create({
      Tittle: req.body.Tittle,
      Author: req.body.Author,
      Category: req.body.Category,
      Quantity: req.body.Quantity,
      Description: req.body.Description,
    })
      .then(bookTnstance => res.status(201).send(bookTnstance))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return book
      .findAll()
      .then(output => res.status(200).send(output))
      .catch(error => res.status(400).send(error));
  },


  modify(req, res) {
    book.findById(req.params.id)
      .then(result => result.update(req.body).then(output => res.status(201).send(output)))
      .catch(error => res.send(error));
  },
};
