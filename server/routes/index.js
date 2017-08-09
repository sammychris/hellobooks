const signUpController = require('../controllers/user');
const signInController = require('../controllers/user');
const userController = require('../controllers/user');
const bookController = require('../controllers/books');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/user/signup', signUpController.createUser);
  app.post('/api/user/signin', signInController.signInUser);
  app.post('/api/addbook', bookController.addBook);
  app.get('/api/books', bookController.list);
  app.put('/api/books/:id', bookController.modify);
  app.get('/api/users/:userId/books', userController.getBorrowedBooks);
  app.post('/api/users/:userId/books', userController.borrowABook);
  
  //app.get('/api/books/:id', bookController.list); //not working yet;

};
