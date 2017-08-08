const book = require('../models').books;

module.exports = {
  create(req, res) {
    return book
      .create({
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
  },
  modify(req, res){
    book.findById(req.params.id)
    .then(book => {
        return  book.update( req.body ).then(book => res.status(201).send(book))})
    .catch(error => res.send(error))
  }
};