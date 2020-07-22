const sequelize = require("./database/connection");
const bodyParser = require("body-parser");
const { Op } = require("sequelize");
const express = require("express");
const bcrypt = require("bcryptjs");
const uuidv4 = require("uuid/v4");
const saltRounds = 10;
const app = express();

// Access User and Cocktail models
const User = require("./models/User");
const Cocktail = require("./models/Cocktail");

// Body-parser for forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB Connection
require("./database/connection");

// DB Test
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("Error: " + err));

// Set static folder
app.use(express.static("public"));
app.use("/../public", express.static("public"));

// Data structure that will be accessed using the web service
let cocktailArray;

Cocktail.findAll().then(cocktails => {
  cocktailArray = JSON.stringify(cocktails);
});

// Set up application to handle GET requests sent to the user path
app.get("/*", handleGetRequest);

// Set up application to handle POST requests sent to the user path
app.post("/*", handlePostRequest);

// PORT setup
const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

// Handles GET requests to our web service
function handleGetRequest(req, res) {
  // Split the path of the request into its components
  let pathArray = req.url.split("/");

  //Get the last part of the path
  let pathEnd = pathArray[pathArray.length - 1];

  if (pathEnd === "cocktails") {
    // return all cocktails
    Cocktail.findAll().then(cocktails => {
      cocktailArray = JSON.stringify(cocktails);
    });
    res.send(cocktailArray);
  } else if (pathEnd === "gin") {
    // return gin cocktails
    Cocktail.findAll({
      where: {
        ingredients: {
          [Op.like]: "%gin%"
        }
      }
    }).then(cocktails => {
      cocktailArray = JSON.stringify(cocktails);
    });
    res.send(cocktailArray);
  } else if (pathEnd === "vodka") {
    // return vodka cocktails
    Cocktail.findAll({
      where: {
        ingredients: {
          [Op.like]: "%vodka%"
        }
      }
    }).then(cocktails => {
      cocktailArray = JSON.stringify(cocktails);
    });
    res.send(cocktailArray);
  } else if (pathEnd === "rum") {
    // return rum cocktails
    Cocktail.findAll({
      where: {
        ingredients: {
          [Op.like]: "%rum%"
        }
      }
    }).then(cocktails => {
      cocktailArray = JSON.stringify(cocktails);
    });
    res.send(cocktailArray);
  } else if (pathEnd === "tequila") {
    // return tequila cocktails
    Cocktail.findAll({
      where: {
        ingredients: {
          [Op.like]: "%tequila%"
        }
      }
    }).then(cocktails => {
      cocktailArray = JSON.stringify(cocktails);
    });
    res.send(cocktailArray);
  } else if (pathEnd === "whisky") {
    // return whisky/bourbon cocktails
    Cocktail.findAll({
      where: {
        [Op.or]: [
          {
            ingredients: {
              [Op.like]: "%bourbon%"
            }
          },
          {
            ingredients: { [Op.like]: "%whisky%" }
          }
        ]
      }
    }).then(cocktails => {
      cocktailArray = JSON.stringify(cocktails);
    });
    res.send(cocktailArray);
  } else if (pathEnd.includes("search")) {
    // return searched cocktails
    const { searchInput } = req.query;
    Cocktail.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + searchInput + "%"
            }
          },
          {
            ingredients: {
              [Op.like]: "%" + searchInput + "%"
            }
          },
          {
            method: {
              [Op.like]: "%" + searchInput + "%"
            }
          },
          {
            garnish: {
              [Op.like]: "%" + searchInput + "%"
            }
          },
          {
            author: {
              [Op.like]: "%" + searchInput + "%"
            }
          }
        ]
      }
    }).then(cocktails => {
      cocktailArray = JSON.stringify(cocktails);
    });
    res.redirect("/");
    res.send(cocktailArray);
  } else res.send("error: Path not recognized");
}

// Handles POST requests to our web service
async function handlePostRequest(req, res) {
  // Split the path of the request into its components
  let pathArray = req.url.split("/");

  //Get the last part of the path
  let pathEnd = pathArray[pathArray.length - 1];

  if (pathEnd === "register") {
    //Output the data sent to the server
    username = req.body.userName;
    password = req.body.password;
    //Add user to our data structure
    User.findOne({ where: { username: username } }).then(user => {
      if (!user) {
        // Hash password
        password = bcrypt.hashSync(password, saltRounds);
        createdAt = new Date();
        updatedAt = new Date();
        // Insert into table
        User.create({
          username,
          password,
          createdAt,
          updatedAt
        });
        res.send("Registered!");
      } else {
        res.send("Username in use. Please try again!");
      }
    });
  } else if (pathEnd === "login") {
    // return logged in user
    username = req.body.userName;
    password = req.body.password;

    const user = await User.findOne({ where: { username } });
    if (user === null) {
      res.send("Username does not exist");
    } else {
      let userPassword = user.password;

      if (bcrypt.compareSync(password, userPassword)) {
        const uniqueId = uuidv4();
        res.send("ok" + uniqueId + username);
      } else {
        res.send("Username and password combination is incorrect");
      }
    }
  } else if (pathEnd === "create_session") {
    // return created session
    username = req.body.userName;
    sessionID = req.body.sessionID;

    User.update({ sessionID: sessionID }, { where: { username: username } });
  } else if (pathEnd === "logout") {
    sessionID = req.body.sessionID;

    User.update({ sessionID: null }, { where: { sessionID: sessionID } });
    res.send("ok");
  } else if (pathEnd === "authentication") {
    sessionID = req.body.sessionID;

    const user = await User.findOne({ where: { sessionID: sessionID } });

    res.send(user.username);
  } else if (pathEnd === "add") {
    // return added cocktail
    name = req.body.name;
    imageURL = req.body.imageURL;
    ingredients = req.body.ingredients;
    method = req.body.method;
    garnish = req.body.garnish;
    cocktailAuthorSessionID = req.body.author;

    const user = await User.findOne({
      where: { sessionID: cocktailAuthorSessionID }
    });

    author = user.username;

    Cocktail.create({
      name,
      imageURL,
      ingredients,
      method,
      garnish,
      author
    });
    res.send("Cocktail has been added");
  } else if (pathEnd === "remove") {
    name = req.body.name;

    console.log(name);
    Cocktail.destroy({
      where: {
        name: name
      }
    });
  } else if (pathEnd === "edit") {
    console.log(pathEnd);
    name = req.body.name;

    console.log(name);

    Cocktail.findOne({
      where: { name: name }
    }).then(cocktails => {
      cocktailArray = cocktails;

      res.send(JSON.stringify(cocktailArray));
    });
  } else if (pathEnd === "editData") {
    // return edited cocktail
    console.log(pathEnd);
    imageURL = req.body.imageURL;
    ingredients = req.body.ingredients;
    method = req.body.method;
    garnish = req.body.garnish;

    Cocktail.update(
      {
        imageURL: imageURL,
        ingredients: ingredients,
        method: method,
        garnish: garnish
      },
      { where: { name: name } }
    );
    res.redirect("/");
    res.send("ok");
  }
}
