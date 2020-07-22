const Sequelize = require("sequelize");
const sequelize = require("../database/connection");
require("./Cocktail");

const User = sequelize.define(
  "User",
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
  },
  {
    classMethods: {
      associate: function(models) {
        Cocktail.belongsTo(User, { foreignKey: "author" });
      }
    }
  }
);
module.exports = User;
