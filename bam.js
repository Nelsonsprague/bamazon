var mysql = require("mysql");
// var inquirer 
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
        console.log(res);
    });
}

connection.connect(function(err){
    if(err)throw err;
    console.log("got itwoo! " + connection.threadId + "\n")
})