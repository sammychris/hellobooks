const user = require('../models').user;
const bookHistory = require('../models').BookHistoryBorrowed;
const books = require('../models').books;

module.exports = {

 // POST - /users/signup
  createUser(req, res) {
      user.create({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          membership: req.body.membership,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },



  // signin user
  signInUser(req, res) {
      user.findOne({  
          where: {
              username: req.body.username
          }
      })
      .then((user) => {
      if (!user){
        return res.status(201).send('user does not exist')
      };
      return res.status(201).send('me i am samuel')})
      .catch(error => res.status(400).send(error));
  },



  getBorrowedBooks(req, res){
      bookHistory.findAll( {
        where: {
            userId: req.params.userId,
            bookReturned: req.query.bookReturned
        }
    }) 
    .then( bookHistory => res.status(200).send(bookHistory))
    .catch(error => res.send(error))
  },



  //An API route that allow user to borrow a book
  //POST: /api/users/<userId>/books
  borrowABook(req, res){
      const userId = req.params.userId;
      const bookId = req.body.bookId;

      /*  books.findOne({  // checking for the book Quantity
          where:{ id: req.body.id }
      })
      .then(book => {
          if(book.Quantity < 1){ // if Quantity is Less than 1
              return res.status(201).send('This books is no longer Available')
          }})
          .catch(error => res.status(500).send(error));*/

      // working with the bookHistory Tables
      bookHistory.findOne( { 
          where: {  userId: req.params.userId,   bookId: req.body.bookId  }
      })
      .then(result => {
          if(result && !result.bookReturned){// if this book exists in history and not returned
              return res.status(201).send('You\'ve already borrowed this book')     
          }else{
              bookHistory.create({ userId, bookId })
              .then(bookHistory => res.status(201).send(bookHistory))
              .catch(error => res.status(400).send(error));
          }
      })
      .catch(error => res.status(500).send(error));
  }
};