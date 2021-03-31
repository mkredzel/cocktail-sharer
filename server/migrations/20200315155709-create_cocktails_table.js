"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("cocktails", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.STRING(32),
      imageURL: Sequelize.TEXT,
      ingredients: Sequelize.TEXT,
      method: Sequelize.TEXT,
      garnish: Sequelize.TEXT,
      author: Sequelize.STRING(32),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("cocktails");
  }
};
