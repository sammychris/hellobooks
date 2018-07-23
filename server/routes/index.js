import signUpCrl from '../controllers/user';
import signInCrl from '../controllers/user';
import userCrl from '../controllers/user';
import bookCrl from '../controllers/books';
import auth from '../MIDDLEWARE/authorize';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/user/signup', signUpCrl.createUser);
  app.post('/api/user/signin', signInCrl.signInUser);
  app.post('/api/book', bookCrl.addBook);
  app.get('/api/books', bookCrl.list);
  app.put('/api/books/:id', bookCrl.modify);
  app.get('/api/users/:userId/books', userCrl.getBorrowedBooks);
  app.post('/api/users/:userId/books', userCrl.borrowABook);

  // app.get('/api/books/:id', bookCrl.list); //not working yet;
};
