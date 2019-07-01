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
            var stockQuantity = res.map(function (res){
                return res.stock_quantity
            });
}

userBuy(productIds, stockQuantity);
});
}

connection.connect(function(err){
    if(err)throw err;
    console.log("got itwoo! " + connection.threadId + "\n")
})
queryAll();

function userBuy(productIds, stockQuantity){
    inquirer.prompt({
        type: "list",
        name: "productList",
        message: "What product ID would you like to buy?",
        choices: productIds
    })
    .then(function(answer){
        switch (answer.productList){
           case answer.productList:
            buyItem(stockQuantity);
            break;
        }
    })
}

function buyItem(stockQuantity){
    inquirer.prompt({
        type: "input",
        name: "purchaseQuantity",
        message: "How many would you like to buy?"
    })
    .then(function(answer){
        var query = "SELECT stock_quantity FROM products WHERE id = userAnswer"
        if(parseInt(answer.purchaseQuantity)===4){
            completeTransaction();
        }else{
            console.log("Insufficient quantity! You can't buy what we don't have!");
            buyItem();
        }
    })
}

function completeTransaction(){
    console.log("here")
            var remainingQuantity = parseInt(stockQuantity)-=parseInt(answer.purchaseQuantity);
            console.log(remainingQuantity)
            var query = "UPDATE products SET stock_quantity = remainingQuantity WHERE stockQuantity = productQuantity"
           connection.query(query, {remainingQuantity: answer.stock_quantity}, function(err, res){
               if (err) throw err;
               queryAll(res);
           })
}