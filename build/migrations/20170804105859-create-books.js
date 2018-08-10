'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Tittle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Author: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Category: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('books');
  }
};