var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password202",
  database: "bamazon_db"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

  loadTable();
});

function loadTable() {
  connection.query("SELECT * from products", function(err, res) {
    if (err) throw err;
    console.table(res);
    userPurchase();
  });
}

function userPurchase() {
  connection.query("SELECT * from products", function(err, res) {
    if (err) throw err;
    // console.table(res);

    inquirer
      .prompt([
        {
          name: "purchase",
          type: "input",
          message:
            "Key the item id # of the product you would like to buy (Press 'q' to quit)",
          validate: function(answer) {
            if (
              (parseInt(answer) <= 10 && parseInt(answer) > 0) ||
              answer.toLowerCase() === "q"
            ) {
              return true;
            }
            return "ITEM ID NOT FOUND!!";
          }
        },
        { 
          name: "quantity",
          type: "input",
          message: "Please enter an order quantity (Press 'q' to quit)",
          validate: function(answer) {
            if (
              (parseInt(answer) <= 3001 && parseInt(answer) > 0) ||
              answer.toLowerCase() === "q"
            ) {
              return true;
            }
            return "NOT ENOUGH IN STOCK!!!";
          }
        }
      ])
      .then(function(answer) {
        if (answer.purchase.toLowerCase() === "q") {
          console.log("Goodbye!");
          process.exit(0);
        }
        else{
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].item_name === answer.choice) {
              chosenItem = results[i];
            }
          }
          console.log("Updating store inventory...\n")
        }
        // userOrder();
      });
  });
}
// function userOrder(purchase, quantity) {
//   console.log(purchase);
//   console.log("Updating store inventory...\n");

  
//     }