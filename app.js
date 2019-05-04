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
  inquirer
    .prompt({
      name: "purchase",
      type: "input",
      message: "What would you like to purchase? (Press 'q' to quit)",
      validate: function(answer) {
        if (
          (parseInt(answer) <= 10 && parseInt(answer) > 0) ||
          answer.toLowerCase() === "q"
        ) {
          return true;
        }
        return "HEY THIS DONT WORK";
      }
    })
    .then(function(res) {
      if (res.purchase.toLowerCase() === "q") {
        console.log("Goodbye!");
        process.exit(0);
      }
      userQuantity();
    });
}

function userQuantity() {
  inquirer
    .prompt({
      name: "quantity",
      type: "input",
      message: "How many would you like to purchase? (Press 'q' to quit)",
      validate: function(answer) {
        if (
          (parseInt(answer) <= 10 && parseInt(answer) > 0) ||
          answer.toLowerCase() === "q"
        ) {
          return true;
        }
        return "HEY THIS DONT WORK";
      }
    })
    .then(function(res) {
      if (res.quantity.toLowerCase() === "q") {
        console.log("Goodbye!");
        process.exit(0);
      }
      userOrder();
      
    });
  
}

function userOrder(answer) {
  console.log("Updating store inventory...\n");

  var quantityLeft = res[0].quantity - answer.quantity;
  var query = connection.query(
    // UPDATE [table] SET [column] = '[updated-value]' WHERE [column] = [value];
    "UPDATE products SET ? WHERE ?",
    [
      { quantity: quantityLeft },
      {
        item_id: answer.purchase
      }
    ],
    function(err, res) {
        console.table(res);
        // Call deleteProduct AFTER the UPDATE completes
        // deleteProduct();
      }
    //   loadTable(answer)
    // var price = userPurchase * userQuantity;
    // console.log(price);
  );
  console.log(query.sql);
//   loadTable();
}


//

//   function deleteProduct() {
//     console.log("Deleting all strawberry icecream...\n");
//     connection.query(
//       "DELETE FROM products WHERE ?",
//       {
//         flavor: "strawberry"
//       },
//       function(err, res) {
//         console.log(res.affectedRows + " products deleted!\n");
//         // Call readProducts AFTER the DELETE completes
//         readProducts();
//       }
//     );
//   }
