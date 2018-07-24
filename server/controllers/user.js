import db from '../models';

const { user, bookHistory, book } = db;


export default {

  // POST - /users/signup
  createUser(req, res, next) {
    user.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      membership: req.body.membership,
    })
      .then(createUser => res.status(201).send(createUser))
      .catch(error => res.status(400).send(error));
    next();
  },


  // signin user
  signInUser(req, res) {
    user.findOne({ where: { username: req.body.username, password: req.body.password } })
      .then((eachUser) => {
        if (eachUser) { // Checking if user has already registered......
          return res.status(200).send(eachUser);
        }
        return res.status(402).send('Wrong password or Username;');
      })
      .catch(error => res.status(400).send(error));
  },


  getBorrowedBooks(req, res) {
    bookHistory.findAll({
      where: {
        userId: req.params.userId,
        bookReturned: req.query.bookReturned
      }
    })
      .then(bookHistoryInstance => res.status(200).send(bookHistoryInstance))
      .catch(error => res.send(error));
  },


  //  An API route that allow user to borrow a book
  //  POST: /api/users/<userId>/books
  borrowABook(req, res) {
    const userId = req.params.userId;
    const bookId = req.body.bookId;

    book.findOne({ where: { id: req.body.id } })
      .then((bookIns) => {
        if (bookIns.Quantity < 1) { // if Quantity is Less than 1
          return res.status(201).send('This books is no longer Available');
        }
        bookHistory.findOne({
          where: { userId: req.params.userId, bookId: req.body.bookId }
        })
          .then((result) => {
            if (result && !result.bookReturned) { // if this book exists in history and not returned
              return res.status(201).send('You\'ve already borrowed this book');
            }
            bookHistory.create({ userId, bookId })
              .then(bookHistoryIstance => res.status(201).send(bookHistoryIstance))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(500).send(error));
      })
      .catch(error => res.status(500).send(error));
  }
};
