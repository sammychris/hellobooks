import user from '../controllers/user';
import books from '../controllers/books';
import auth from '../MIDDLEWARE/authorize';

const { createUser, signInUser, getBorrowedBooks, borrowABook } = user;
const { addBook, list, modify } = books;


export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/users/signup', createUser);
  app.post('/api/users/signin', signInUser);
  app.post('/api/book', addBook);
  app.get('/api/books', list);
  app.put('/api/books/:id', modify);
  app.get('/api/users/:userId/books', getBorrowedBooks);
  app.post('/api/users/:userId/books', borrowABook);

  // app.get('/api/books/:id', bookCrl.list); //not working yet;
};
