import jwt from 'jsonwebtoken';
import db from '../models';

const { user, BookHistoryBorrowed, book } = db;
const bookHistory = BookHistoryBorrowed;


export default {

  // POST - /users/signup
  createUser(req, res) {
    user.findOne({
       where: { 
          $or: [
                  { email: req.body.email }, { username: req.body.username }
              ]}
        }).then(result => {
          if(result) return res.status(400).send({ message: 'Username or email already registered!'});
          return user.create({
              email: req.body.email,
              username: req.body.username,
              password: req.body.password,
              membership: req.body.membership,
          }).then((createUser) => {
               jwt.sign({ createUser }, 'userSecretKey', { expiresIn: '1h' }, (err, token) => {
                  if (err) return console.log(err);
                  res.status(201).json({ user: 'successfully registered!', token });
                });
              })
              .catch(error => res.status(400).json(error));
          })
        .catch( error => res.status(400).json(error));

  },


  // signin user
  signInUser(req, res) {
    process.env.SECRET_KEY = (req.body.admin) ? 'adminSecretKey' : 'userSecretKey';  // creating a token for either the user or admin
    const userC = (req.body.admin)? 'admin': 'user';
    return user.findOne({ where: { username: req.body.username, password: req.body.password } })
      .then((eachUser) => {
        if (!eachUser) return res.status(400).send({message:'Wrong password or Username!'});
        jwt.sign({ eachUser }, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
          if (err) return console.log(err);
          res.status(202).send({ message: `${userC} loggedin successfully`, token });
        });
      })
      .catch((err) => res.status(401).send({ message: 'user not registered!' }));
  },

  // admin to list all users
  allUsers(req, res){
    return user.findAll()
      .then(output => res.status(200).send(output))
      .catch(error => res.status(400).send(error));
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

    return book.findOne({ where: { id: req.body.bookId } })
      .then((bookIns) => {
        if (bookIns.Quantity < 1) { // if Quantity is Less than 1
          return res.status(201).send('This books is no longer Available');
        }
        bookHistory.findOne({ where: { userId, bookId } })
          .then((result) => {
            if (result && !result.bookReturned) { // if this book exists in history and not returned
              return res.status(201).send('You\'ve already borrowed this book');
            }
            bookIns.update({ Quantity : bookIns.Quantity-1 }); // UPDATE Quantity by decrement
            bookHistory.create({ userId, bookId })
              .then(bookHisT => res.status(201).send({message:'book borrowed successfully!'}))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(500).send(error));
      })
      .catch(error => res.status(500).send(error));
  },



  returnAbook(req, res) {
    const userId = req.params.userId;
    const bookId = req.body.bookId;

    return bookHistory.findOne({ where: {userId, bookId}})
      .then((bookhis) => {
          if ( bookhis.bookReturned ) return res.status(401).send('book already returned');
          book.findById(bookId)
            .then((result) => {
              result.update({ Quantity: result.Quantity + 1 });
              bookhis.update({ bookReturned: true });
              return res.status(202).send({ result, message:'book successfully returned'});
            })
            .catch(err => res.status(404).send('invalid book id!'));
      }).catch((err) => res.status(404).send('book was never borrowed by this user!'));
  }
};
