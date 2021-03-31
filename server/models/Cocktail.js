const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const Cocktail = sequelize.define(
  "cocktails",
  {
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
  }
);
module.exports = Cocktail;
