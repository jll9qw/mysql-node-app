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

  userPurchase();
});


function userPurchase() {
  connection.query("SELECT * from products", function(err, res) {
    if (err) throw err;
    console.table(res);

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
              (parseInt(answer) <= res[0].quantity
               && parseInt(answer) > 0) ||
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
        } else {
          var chosenItem = parseInt(answer.purchase);
          var orderItem = parseInt(answer.quantity);

          console.log(answer.quantity);
          // var price = orderItem * chosenItem;
          // console.log("Your total price is... $" + price);
          var merchInventory = res[0].quantity - answer.quantity ;
          // console.log(orderItem);
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                quantity: merchInventory
              },
              {
                item_id: chosenItem
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Thank you for your purchase! \n");
              console.log("Updating store inventory...")
              
             userPurchase();
            },
         
          );
        }
      });
   
  });

}
