import user from '../controllers/user';
import books from '../controllers/books';
import auth from '../middleware/authorize';

const { createUser, signInUser, getBorrowedBooks, borrowABook, returnAbook, allUsers } = user;
const { addBook, list, modify, findAbook } = books;
const { verifyUser, verifyAdmin } = auth;


export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/users/signup', createUser);
  app.post('/api/users/signin', signInUser);
  app.get('/api/books', verifyUser, list);                 // list all book
  app.get('/api/books/:bookId', verifyUser, findAbook);   //find a book
  app.post('/api/books', verifyAdmin, addBook);
  app.put('/api/books/:bookId', verifyAdmin, modify);
  app.post('/api/users/:userId/books', verifyUser, borrowABook);        // user to borrow a book
  app.put('/api/users/:userId/books', verifyUser, returnAbook);        // user to return a book
  app.get('/api/users/:userId/books?', verifyUser, getBorrowedBooks); // user to view all borrowedbooks
  app.get('/api/users/all', verifyAdmin, allUsers)
};
