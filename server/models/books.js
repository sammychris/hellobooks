
module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define('books', {
    Tittle: { type: DataTypes.STRING, allowNull: false, },
    Author: { type: DataTypes.STRING, allowNull: false, },
    Category: { type: DataTypes.STRING, allowNull: false, },
    Quantity: { type: DataTypes.INTEGER, allowNull: false, },
    Description: { type: DataTypes.STRING, allowNull: false, },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return books;
};
