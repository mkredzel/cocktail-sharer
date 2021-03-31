// Import the sequelize module
const Sequelize = require("sequelize");

const sequelize = new Sequelize("DB_NAME", "USER", "PASS", {
  host: "ENDPOINT",
  port: "3306",
  dialect: "mysql",
  dialectOptions: {
    ssl: "Amazon RDS",
  },

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(function (err) {
    console.log("Connection has been established successfully.");
  })
  .catch(function (err) {
    console.log("Unable to connect to the database:", err);
  });

module.exports = sequelize;
