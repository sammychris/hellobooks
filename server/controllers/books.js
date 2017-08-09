const book = require('../models').books;

module.exports = {
  addBook(req, res) {
    return book
      .create({
        Tittle: req.body.Tittle,
        Author: req.body.Author,
        Category: req.body.Category,
        Quantity: req.body.Quantity,
        Description: req.body.Description,
      })
      .then(result => res.status(201).send(result))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return book
      .findAll()
      .then(result => res.status(200).send(result))
      .catch(error => res.status(400).send(error));
  },

  modify(req, res) {
    book.findById(req.params.id)
      .then(book => book.update(req.body).then(processingresult => res.status(201).send(processingresult)))
      .catch(error => res.send(error));
  },
};
