import user from '../controllers/user';
import books from '../controllers/books';
import auth from '../middleware/authorize';

const { createUser, signInUser, getBorrowedBooks, borrowABook } = user;
const { addBook, list, modify, returnAbook } = books;
const { verifyUser, verifyAdmin } = auth;


export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/users/signup', createUser);
  app.post('/api/users/signin', signInUser);
  app.get('/api/books', verifyUser, list);
  app.post('/api/books', verifyAdmin, addBook);
  app.put('/api/books/:id', verifyAdmin, modify);
  app.post('/api/users/:userId/books', verifyUser, borrowABook);
  //app.put('/api/users/:userId/books', verifyUser, returnAbook);
  app.get('/api/users/:userId/books?', verifyUser, getBorrowedBooks);


  // app.get('/api/books/:id', bookCrl.list); //not working yet;
};
