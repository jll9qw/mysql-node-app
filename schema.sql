DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45)  NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Merch tee-shirt", "Apparel", 60.99, 1000);
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Merch hat", "Apparel", 30.99, 1000);
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Keychain", "Accessories", 24.99, 500);
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Commemorate socks", "Accessories", 19.99, 2000);
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Bottle opener", "Home", 9.99, 3000);
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Festival tee-shirt", "Apparel", 20.99, 1000);
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Shot glass", "Home", 60.99, 1000);
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Stress ball", "Accessories", 9.99, 1000);
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Poster", "Accessories", 19.99, 1000);
INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Hooded-crew neck", "Apparel", 80.99, 2000);