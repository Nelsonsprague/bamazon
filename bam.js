var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3307,
    database: "bamazon"
})

function queryAll() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res)

        var productIds = res.map(function (res) {
            return res.item_id
        });
        var productCost = res.map(function(res){
            return res.price
        })
        var stockQuantity = res.map(function (res) {
            return res.stock_quantity
        });


        userBuy(productIds);
    });
}

connection.connect(function (err) {
    if (err) throw err;
    console.log("got itwoo! " + connection.threadId + "\n")
})
queryAll();

function userBuy(productIds) {


    inquirer.prompt({
            type: "list",
            name: "productList",
            message: "What product ID would you like to buy?",
            choices: productIds
        })
        .then(function (answer) {
            connection.query("SELECT * FROM products Where ?", {
                item_id: answer.productList
            }, function(err, response){
                buyItem(response)
                
            })
           
        })
}

function buyItem(response) {
    inquirer.prompt({
            type: "input",
            name: "purchaseQuantity",
            message: "How many would you like to buy?"
        })
        .then(function (answer2) {  
            console.log(response[0].stock_quantity)
            if(parseInt(answer2.purchaseQuantity)<= parseInt(response[0].stock_quantity)){
                completeTransaction(response, answer2);
                queryAll();
            }else{
                console.log(`Insufficient quantity! We don't have that many ${response[0].product_name}(s)! You can't buy what we don't have!`);
                buyItem(response);
            }
        })
}

function completeTransaction(response, answer2) {
    
    var remainingQuantity = parseInt(response[0].stock_quantity) - parseInt(answer2.purchaseQuantity);
    console.log(remainingQuantity)
    var totalCost = parseFloat(response[0].price) * parseFloat(answer2.purchaseQuantity)
    console.log(`Your purchase of ${answer2.purchaseQuantity} ${response[0].product_name}(s) comes out to $ ${totalCost}. We appreciate your business!`)
    connection.query(
        "UPDATE products SET ? WHERE ?",[{
            stock_quantity: remainingQuantity
        },{
            item_id: response[0].item_id
        }],
        function(error){
            if(error) throw error;
        }
        );
        console.log(`Products updated. We have ${remainingQuantity} left! Better buy before we run out!`);
        queryAll();
}