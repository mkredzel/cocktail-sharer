//=====================================
// CREATE SESSION STORAGE FOR SESSION
//=====================================

if (sessionStorage["sessionID"] == undefined) {
  sessionStorage["sessionID"] = "";
}

//==================================
// SCROLL UP - SHOW TOP OF THE PAGE
//==================================
function scrollToNavBar() {
  $("html,body").animate(
    {
      scrollTop: $("nav").offset().top
    },
    "slow"
  );
}

//============================
// AXIOS - GET ALL COCKTAILS
//============================
new Vue({
  el: "#cocktails",
  data: {
    cocktails: null
  },
  mounted() {
    axios.get("http://localhost:8080/cocktails").then(res => (this.cocktails = res.data));
  }
});

//============================
// AXIOS - GET GIN COCKTAILS
//============================
new Vue({
  el: "#gin",
  data: {
    cocktails: null
  },
  methods: {
    displayCocktails() {
      axios.get("/cocktails/gin").then(res => (this.cocktails = res.data));
      location.reload();
    }
  }
});

//============================
// AXIOS - GET VODKA COCKTAILS
//============================
new Vue({
  el: "#vodka",
  data: {
    cocktails: null
  },
  methods: {
    displayCocktails() {
      axios.get("/cocktails/vodka").then(res => (this.cocktails = res.data));
      location.reload();
    }
  }
});

//============================
// AXIOS - GET RUM COCKTAILS
//============================
new Vue({
  el: "#rum",
  data: {
    cocktails: null
  },
  methods: {
    displayCocktails() {
      axios.get("/cocktails/rum").then(res => (this.cocktails = res.data));
      location.reload();
    }
  }
});

//============================
// AXIOS - GET TEQUILA COCKTAILS
//============================
new Vue({
  el: "#tequila",
  data: {
    cocktails: null
  },
  methods: {
    displayCocktails() {
      axios.get("/cocktails/tequila").then(res => (this.cocktails = res.data));
      location.reload();
    }
  }
});

//======================================
// AXIOS - GET WHISKY/BOURBON COCKTAILS
//======================================
new Vue({
  el: "#whisky",
  data: {
    cocktails: null
  },
  methods: {
    displayCocktails() {
      axios.get("/cocktails/whisky").then(res => (this.cocktails = res.data));
      location.reload();
    }
  }
});

//================================
// AXIOS - GET SEARCHED COCKTAILS
//================================
new Vue({
  el: "#searchBtn",
  data: {
    cocktails: null
  },
  methods: {
    displayCocktails() {
      axios.get("/cocktails/search").then(res => (this.cocktails = res.data));
      location.reload();
    }
  }
});

//===============
// AJAX REGISTER
//===============

document.getElementById("registerBtn").addEventListener("click", register);

function register(e) {
  e.preventDefault();

  // Set up XMLHttpRequest
  let xhttp = new XMLHttpRequest();

  // Extract user data
  let userName = document.getElementById("usernameReg").value;
  let userPassword = document.getElementById("passwordReg").value;

  // Create object with user data
  let userObject = {
    userName: userName,
    password: userPassword
  };

  // Set up function that is called when reply received from server
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert(xhttp.responseText);
    }
  };

  // Send new user data to server
  xhttp.open("POST", "/users/register", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(userObject));
}

//============
// AJAX LOGIN
//============

// Posts a new user to the server
document.getElementById("loginBtn").addEventListener("click", login);

function login(e) {
  e.preventDefault();

  // Set up XMLHttpRequest
  let xhttp = new XMLHttpRequest();

  // Extract user data
  let userName = document.getElementById("usernameLog").value;
  let userPassword = document.getElementById("passwordLog").value;

  // Create object with user data
  let userObject = {
    userName: userName,
    password: userPassword
  };

  // Set up function that is called when reply received from server
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let sessionID = xhttp.responseText.slice(2, 38);

      if (xhttp.responseText.includes("ok")) {
        createSession(userObject.userName, sessionID);
        document.getElementById("loginForm").innerHTML =
          '<h1 id="loginMsg">' +
          xhttp.responseText.slice(38) +
          ' is logged in</h1><button class="btn btn-primary" id="addBtn" data-toggle="modal" data-target="#addCocktailModal">Add Cocktail</button><br><br><button class="btn btn-primary" id="logoutBtn" onclick="logout()">Logout</button>';
        if (xhttp.responseText.slice(38) === "admin") {
          $(".social").each(function() {
            var elems = document.getElementsByClassName("social");
            for (var i = 0; i < elems.length; i++) {
              elems[
                i
              ].innerHTML = `<a class="btn btn-default" data-toggle="modal" data-target="#editCocktailModal" role="button" onclick='editCocktail(${i})'>Edit Cocktail</a>`;
            }
          });

          $(".deleteBtn").each(function() {
            var elems = document.getElementsByClassName("deleteBtn");
            for (var i = 0; i < elems.length; i++) {
              elems[
                i
              ].innerHTML = `<a class="remove-image" onclick='removeCocktail(${i})' style="display: inline;">&#215;</a>`;
            }
          });
        }
      } else {
        alert(xhttp.responseText);
      }
    }
  };

  // Send new user data to server
  xhttp.open("POST", "/users/login", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(userObject));
}

//===================================
// ADD SESSION ID TO LOGGED IN USER
//===================================

function createSession(username, sessionID) {
  // Set up XMLHttpRequest
  let xhttp = new XMLHttpRequest();

  // Create object with user data
  let userObject = {
    userName: username,
    sessionID: sessionID
  };

  sessionStorage["sessionID"] = sessionID;

  // Set up function that is called when reply received from server
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert(xhttp.responseText);
    }
  };

  // Send new user data to server
  xhttp.open("POST", "/users/login/create_session", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(userObject));
}

//=============
// AJAX LOGOUT
//=============

function logout() {
  // Set up XMLHttpRequest
  let xhttp = new XMLHttpRequest();

  // Create object with user data
  let sessionID = {
    sessionID: sessionStorage.sessionID
  };

  sessionStorage.clear();

  // Set up function that is called when reply received from server
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      location.reload();
    }
  };

  // Send new user data to server
  xhttp.open("POST", "/users/logout", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(sessionID));
}

//===========================
// VERIFY LOGGED IN USER MSG
//===========================

if (sessionStorage["sessionID"] !== "") {
  window.onload = event => {
    // Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    // Create object with user data
    let sessionID = {
      sessionID: sessionStorage.sessionID
    };

    // Set up function that is called when reply received from server
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("loginForm").innerHTML =
          '<h1 id="loginMsg">' +
          xhttp.responseText +
          ' is logged in</h1><button class="btn btn-primary" id="addBtn" data-toggle="modal" data-target="#addCocktailModal">Add Cocktail</button><br><br><button class="btn btn-primary" id="logoutBtn" onclick="logout()">Logout</button>';
        if (xhttp.responseText === "admin") {
          $(".social").each(function() {
            var elems = document.getElementsByClassName("social");
            for (var i = 0; i < elems.length; i++) {
              elems[
                i
              ].innerHTML = `<a class="btn btn-default" data-toggle="modal" data-target="#editCocktailModal" role="button" onclick='editCocktail(${i})'>Edit Cocktail</a>`;
            }
          });

          $(".deleteBtn").each(function() {
            var elems = document.getElementsByClassName("deleteBtn");
            for (var i = 0; i < elems.length; i++) {
              elems[
                i
              ].innerHTML = `<a class="remove-image" onclick='removeCocktail(${i})' style="display: inline;">&#215;</a>`;
            }
          });
        }
      }
    };

    // Send new user data to server
    xhttp.open("POST", "/users/authentication", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(sessionID));
  };
}

//==================
// ADD NEW COCKTAIL
//==================

document
  .getElementById("addCocktailBtn")
  .addEventListener("click", addCocktail);

function addCocktail() {
  // Set up XMLHttpRequest
  let xhttp = new XMLHttpRequest();

  let name = document.getElementById("cocktailName").value;
  let imageURL = document.getElementById("cocktailImage").value;
  let ingredients = document.getElementById("cocktailIngredients").value;
  let method = document.getElementById("cocktailMethod").value;
  let garnish = document.getElementById("cocktailGarnish").value;

  // Create object with user data
  let newCocktail = {
    name: name,
    imageURL: imageURL,
    ingredients: ingredients,
    method: method,
    garnish: garnish,
    author: sessionStorage.sessionID
  };

  // Set up function that is called when reply received from server
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      location.reload();
      alert("Cocktail has been added!");
    }
  };

  // Send new user data to server
  xhttp.open("POST", "/cocktails/add", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(newCocktail));
}

//==================
// REMOVE COCKTAIL
//==================

function removeCocktail(index) {
  // Set up XMLHttpRequest
  let xhttp = new XMLHttpRequest();

  // let name = $(".deleteBtn", this.id);
  let name = document.getElementsByClassName("deleteBtn")[index].id;

  console.log(name);

  // Create object with user data
  let cocktail = {
    name: name
  };

  // Set up function that is called when reply received from server
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      location.reload();
      alert("Cocktail has been removed!");
    }
  };

  // Send new user data to server
  xhttp.open("POST", "/cocktails/remove", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(cocktail));
}

//==========================
// EDIT COCKTAIL - GET DATA
//==========================

function editCocktail(index) {
  // Set up XMLHttpRequest
  let xhttp = new XMLHttpRequest();

  // let name = $(".deleteBtn", this.id);
  let name = document.getElementsByClassName("deleteBtn")[index].id;

  // Create object with user data
  let cocktail = {
    name: name
  };

  // Set up function that is called when reply received from server
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cocktail = JSON.parse(xhttp.response);
      document.getElementById("editCocktailImage").value = cocktail.imageURL;
      document.getElementById("editCocktailIngredients").value =
        cocktail.ingredients;
      document.getElementById("editCocktailMethod").value = cocktail.method;
      document.getElementById("editCocktailGarnish").value = cocktail.garnish;
    }
  };

  // Send new user data to server
  xhttp.open("POST", "/cocktails/edit", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(cocktail));
}

//==============================
// EDIT COCKTAIL - SUBMIT DATA
//==============================

function editCocktailData() {
  // Set up XMLHttpRequest
  let xhttp = new XMLHttpRequest();

  let imageURL = document.getElementById("editCocktailImage").value;
  let ingredients = document.getElementById("editCocktailIngredients").value;
  let method = document.getElementById("editCocktailMethod").value;
  let garnish = document.getElementById("editCocktailGarnish").value;

  // Create object with user data
  let newCocktail = {
    name: name,
    imageURL: imageURL,
    ingredients: ingredients,
    method: method,
    garnish: garnish
  };

  // Set up function that is called when reply received from server
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      location.reload();
      alert("Cocktail has been edited!");
    }
  };

  // Send new user data to server
  xhttp.open("POST", "/cocktails/editData", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(newCocktail));
}
