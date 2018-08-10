'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var bookHistory = sequelize.define('BookHistoryBorrowed', {
    bookId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    bookReturned: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {
    classMethods: {
      associate: function associate(models) {// eslint-disable-line
        // associations can be defined here
      }
    }
  });
  return bookHistory;
};