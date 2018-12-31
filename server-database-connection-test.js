var mysql   = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'angular_js'
});

console.log("test");

connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('Connected');

        connection.query("Select * From products", function(err, result, fields){

            if (err){ 
                throw err;
            }
            
            console.log(result);
        })

    }
});
