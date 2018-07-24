import jwt from 'jsonwebtoken';
import db from '../models';

const { user, BookHistoryBorrowed, book } = db;
const bookHistory = BookHistoryBorrowed;


export default {

  // POST - /users/signup
  createUser(req, res) {
    return user.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      membership: req.body.membership,
    })
      .then((createUser) => {
        jwt.sign({ createUser }, 'userSecretKey', { expiresIn: '1h' }, (err, token) => {
          if (err) return console.log(err);
          res.status(201).json({ user: 'successfully registered', token });
        });
      })
      .catch(error => res.status(400).send(error));

  },


  // signin user
  signInUser(req, res) {
    process.env.SECRET_KEY = (req.body.admin) ? 'adminSecretKey' : 'userSecretKey';  // creating a token for either the user or admin
    return user.findOne({ where: { username: req.body.username, password: req.body.password } })
      .then((eachUser) => {
        if (eachUser) return res.status(401).send('Wrong password or Username;');
        jwt.sign({ eachUser }, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
          if (err) return console.log(err);
          res.status(201).json({ user: 'loggedin successfully', token });
        });
      })
      .catch(() => res.status(401).send({ message: 'user not registered!' }));
  },


  getBorrowedBooks(req, res) {
    return bookHistory.findAll({
      where: {
        userId: req.params.userId,
        bookReturned: req.query.return
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

    return book.findOne({ where: { id: req.body.id } })
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
