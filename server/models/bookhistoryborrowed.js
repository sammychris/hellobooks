'use strict';
module.exports = function(sequelize, DataTypes) {
  var BookHistoryBorrowed = sequelize.define('BookHistoryBorrowed', {
    bookId:{type: DataTypes.INTEGER, allowNull: false},
    userId:{type: DataTypes.INTEGER, allowNull: false},
    bookReturned:{type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BookHistoryBorrowed;
};