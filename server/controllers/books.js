const book = require('../models').books;

module.exports = {
  create(req, res) {
    return book
      .create({
         id : req.body.id,
        Tittle: req.body.Tittle,
        Author: req.body.Author,
        Category: req.body.Category,
        Quantity: req.body.Quantity,
        Description: req.body.Description,
      })
      .then(book => res.status(201).send(book))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
  return book
    .findAll()
    .then(book => res.status(200).send(book))
    .catch(error => res.status(400).send(error));
  }
};