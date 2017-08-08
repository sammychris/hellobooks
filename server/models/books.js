'use strict';
module.exports = function(sequelize, DataTypes) {
  var books = sequelize.define('books', {
    Tittle: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    Author: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    Category: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    Description: {
     type: DataTypes.STRING,
      allowNull:false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return books;
};