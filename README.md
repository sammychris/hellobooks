# hellobooks
Books is a simple application that helps manage a library and its processes like stocking, tracking and renting books and it was built on Postgres, Express, and Node).

# Development And Technology
The application leverages Node; Express for routing and sequelize for ORM.

Technologies: Nodejs, Javascript ecs6, html, css, Twitter Bootstrap, Git, Express, Sequelize, morgan, bodyparser, babel, posgres for database.

Front-end is designed using Twitter Bootstrap and filled out with sample data (mostly lorem ipsum). A few animations/effects are programmed using jQuery.

# Installation
Install node and postgres
Clone the repository git clone https://github.com/sammychris/hellobooks/
Switch to project directory cd ../path/to/HelloBooks
Install dependencies npm i
Test npm test
Start app npm start
Consume via postman

# Route
user:
User Signup - api/users/signup - Registers a user
User Signin - api/users/signin - Logs a user in
Get Book - api/userid/books - allows a user to view all books
Get Book - api/userid/books?returnd=false - allows a user to view all books that are not yet returned
Get Book - api/userid/books?returnd=true - allows a user to view all books that have been returned
Borrow Book - api/userid/books - allows a user to borrow books
Return Book - api/userid/books - allows a user to return borrowed books

Admin:
User Signin - api/users/signin - Logs an admin in
Add Book - api/books - allows an admin to add a book
Modify Book - api/books - allows an admin to modify a book
Delete Book - api/books - allows an admin to delete book

# Verbs
GET
POST
PUT
DELETE

# state
still on development

