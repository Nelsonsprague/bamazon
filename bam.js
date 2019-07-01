var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3307,
    database: "bamazon"
})
function queryAll(){
    connection.query("SELECT *FROM products", function(err, res){
        if(err) throw err;
        for(i=0;i<res.length;i++)
        {
            console.log("Item Id: ", res[i].item_id, "| Product Name: ", res[i].product_name, "| Department: ", res[i].department_name, "| Price: ", res[i].price, "| In Stock: ", res[i].stock_quantity);
            var id = res[i].item_id;
            
            var productIds = res.map(function (res){
                return res.item_id
            });
            var productQuantity = res.map(function (res){
                return res.stock_quantity
            });
}

userBuy(productIds);
});
}

connection.connect(function(err){
    if(err)throw err;
    console.log("got itwoo! " + connection.threadId + "\n")
})
queryAll();

function userBuy(productIds){
    inquirer.prompt({
        type: "list",
        name: "productList",
        message: "What product ID would you like to buy?",
        choices: productIds
    })
    .then(function(answer){
        switch (answer.productList){
           case answer.productList:
            buyItem(productQuantity);
            break;
        }
    })
}

function buyItem(productQuantity){
    inquirer.prompt({
        type: "input",
        name: "productQuantity",
        message: "How many would you like to buy?"
    })
    .then(function(answer){
        if(answer<=productQuantity){
            //update sqlThis means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.
        }else{
            return "Insufficient quantity! You can't buy what we don't have!"
        }
    })
}