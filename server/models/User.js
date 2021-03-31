const Sequelize = require("sequelize");
const sequelize = require("../database/connection");
require("./Cocktail");

const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING(35),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(96),
      allowNull: false
    },
    sessionID: {
      type: Sequelize.STRING(40),
      allowNull: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }
);
module.exports = User;
