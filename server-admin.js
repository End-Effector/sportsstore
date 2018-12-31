
var http = require('http');
var url  = require('url');
var fs   = require('fs');
var express = require('express');
var mysql   = require('mysql');

//Connects to database.
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'angular_js'
});

//Starts the connection.
connection.connect(function(error){

    if(!!error){
        console.log('Error on connection to the database');
    }else{
        console.log('Connected to the database');
    }
});

http.createServer((request, response) => {

    request.on('error', (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end();
    });

    if(request.method === 'GET' && request.url === '/'){

        console.log('-->1' + request.url);

        var app_html_location = "/\angularjs/\admin.html";

        //Here gets the main html. This is the first call.
        fs.readFile(__dirname + app_html_location, function (err, data) {
            if (err) {
                response.writeHead(404, { 'Content-type': 'text/plan' });
                response.write('Page Was Not Found');
                response.end();
            } else
                response.writeHead(200, { 'Content-type': 'text/html' });
            response.write(data);
            response.end();
        });

    } else if (request.method === 'GET') {

        console.log('-->2' + request.url);

        var pathName = url.parse(request.url).pathname;

        //Here gets all the stuff, like controller, filters etc..
        fs.readFile(__dirname + pathName, function (err, data) {
            if (err) {
                response.writeHead(404, { 'Content-type': 'text/plan' });
                response.write('Page Was Not Found');
                response.end();
            } else
                response.writeHead(200, { 'Content-type': 'text/html' });
            response.write(data);
            response.end();
        });
    } else if(request.method === 'POST' && request.url === '/users/login'){

        console.log('Aqui?');

        request.on('data', function (body) {
            
            var bodyParsed = JSON.parse(body);

            var username = bodyParsed.username;
            var password = bodyParsed.password;

            console.log(username);
            console.log(password);

            /* fazer chamada á base de dados que é um select! e depois retornas a resposta para a página.*/ 


        });


        /*
        request.on('data', function (body) {

            var bodyParsed = JSON.parse(body);

            if(bodyParsed.products.length > 0){

                //If this is unChecked the property does not exist. It needs to be added.
                if(bodyParsed.giftwrap === undefined){
                    bodyParsed.giftwrap = false;
                };

                var values  = [];
                var aux     = [];

                for (var item in bodyParsed) {

                    //not needed on the client database table.
                    if(item !== 'products'){
                        aux.push(bodyParsed[item]);
                    }
                }

                //Unfortunatly this is necessary.
                values.push(aux);

                connection.query("INSERT INTO CLIENTS (name, street, state, city, zip, country, giftwrap) VALUES ?"
                , [values], function(err, result, fields){
    
                    if (err){ 
                        throw err;
                        console.log('Error on the database Clients query.');
                    }
                
                    //I do not like this, but it needs to show the id to the user.
                    response.writeHead(200, {'Content-type':'text/plain'});
                    response.write(JSON.stringify(result.insertId));
                    response.end( );

                    bodyParsed.products.forEach(function(product){

                        connection.query("INSERT INTO ORDERS (idClient, idProduct) "+
                        "VALUES (?, ?)", [result.insertId , product.id], function(err, result, fields){
    
                            if (err){ 
                                throw err;
                                console.log('Error on the database ORDERS query.');
                            }
    
                        });
                    });
                    
                });
            }
        });*/

    } else {

        response.statusCode = 404;
        response.end();
    }
    
}).listen(8080);

console.log("Server Started");
