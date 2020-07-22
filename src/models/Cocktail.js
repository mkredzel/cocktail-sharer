const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const Cocktail = sequelize.define(
  "Cocktail",
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
  },
  {
    classMethods: {
      associate: function(models) {
        User.hasOne(Cocktail, { foreignKey: "username" });
      }
    }
  }
);
module.exports = Cocktail;
