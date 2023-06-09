// Import the Express module
const express = require('express');
const app = express();

// Importing a body-parser module as a dependency
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up Express to use EJS as an view engine
app.set("view engine", "ejs");

// Import custom module that performs client authentication
const auth = require('./auth.js');

// Processing post request for login
app.post("/login", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const userId = req.body.userId;

  // Checking the success of user authentication, based on the lecture material
  const authenticated = auth.authenticateUser(username, password, userId);
  if(authenticated) {
    console.log("Authentication was successful!");

    let items = cart.items;

    // Render different templates depending on cart state
    if (Object.keys(items).length === 0) {
      res.render('greetings', { username: username });
    } else {
      items = items[userId];
      res.render('cart&greetings.ejs', { items: items, username: username });
    }
  } else {
    console.log("Authentication was NOT successful!");
    res.render("login_failed");
  }
});

// Processing post request for user registration
app.post("/register", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const regResult = auth.createUser(username, password, email);

  // The output of the appropriate answer depending on the results of checking the entered credentials
  if (regResult === "user name") {
    res.render("registration_failed", { credential: regResult });
  } else if (regResult === "email") {
    res.render("registration_failed", { credential: regResult });
  } else {
    res.render("registration_success");
  }
});

// Importing custom module that adds items to cart
const cart = require('./cart.js');

// Processing get request to add items to cart
app.get("/addItem", function(req, res) {
  let itemQuantity = req.query.quantity;
  let itemName = req.query.itemName;
  let itemPrice = req.query.itemPrice;
  let userName = req.query.userId;

  const addItem = cart.addItem(userName, itemName, itemQuantity, itemPrice);
});

// Route to process the request to go to cart
app.get("/cart", function(req, res) {
  let userId = req.query.userId;
  let userName = req.query.userName;
  let items = cart.items[userId];

  // Check if the current user is authorized
  if (!(userName in auth.authorizedUsers)) {
    res.render("login_required");
  } else {
    res.render('cart', { items: items });
  }
});

// Connect to database g00425727
// To fix error with connection use in mySQL: ALTER USER 'root'@'localhost' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'root';
// https://dev.mysql.com/doc/refman/5.7/en/resetting-permissions.html
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'g00425727'
});

// Handling a connection error or confirming a successful connection, based on the lecture material
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
  } else {
    console.log('Database \"g00425727\" connected successfully');
  }
});

// Processing a get request to go to the product details page, based on the lecture material
app.get("/get_more_details", function(req, res) {
  let item = req.query.id;

  connection.query(
    "SELECT * FROM items WHERE id = ?", [item], function (err, rows, fields) {
      if (err) {
        console.error("Error retrieving data from database: ", err);
        res.status(500).send('Error retrieving data from database');
      } else if (rows.length === 0) {
        console.error(`No rows found for ID ${ID}`);
        res.status(404).send(`No product found for ID ${ID}`);
      } else {
        const itemName = rows[0].Name;
        const itemDescription = rows[0].Description;
        const itemAllergens = rows[0].Allergens;
        const itemImage = rows[0].Image;
        const itemPrice = rows[0].Price;
        // Product detail page rendering
        res.render("product_details.ejs", {itemName: itemName, itemDescription: itemDescription, itemAllergens: itemAllergens,
          itemImage: itemImage, itemPrice: itemPrice});
      }
    }
  );
});

// Serve static files from a directory named "home"
app.use(express.static('home'));

// Starting the server on port 4000
app.listen(4000, () => {
    console.log('Server started on port 4000');
  });