"use strict";

const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        username: "marcel123",
        password: bcrypt.hashSync("1234567890", saltRounds),
        sessionID: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "John12",
        password: bcrypt.hashSync("123qweasd", saltRounds),
        sessionID: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "admin",
        password: bcrypt.hashSync("admin", saltRounds),
        sessionID: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "TomHanks56",
        password: bcrypt.hashSync("xxx", saltRounds),
        sessionID: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
