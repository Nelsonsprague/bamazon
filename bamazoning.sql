DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon; 

USE bamazon;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(60) NOT NULL,
department_name VARCHAR(60) NULL,
price DEC(10,2) NULL DEFAULT 0,
stock_quantity INT NOT NULL DEFAULT 0,
PRIMARY KEY (item_id)
);

SELECT * FROM products;