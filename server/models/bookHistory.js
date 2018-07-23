
export default (sequelize, DataTypes) => {
  const BookHisBor = sequelize.define('BookHistoryBorrowed', {
    bookId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    bookReturned: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {
      classMethods: {
        associate: (models) => { // eslint-disable-line
          // associations can be defined here
        }
      }
    });
  return BookHisBor;
};
