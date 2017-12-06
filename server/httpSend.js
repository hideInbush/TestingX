var http = require('http');  
var url=require('url'); 
var req = require('request');
var querystring = require('querystring');
var util = require('util');

http.createServer(function (request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");  
    
    var post = '';     
    request.on('data', function(chunk){    
        post += chunk;
    });
    request.on('end', function(){    
        post = querystring.parse(post);

        for(x in post){
            console.log(x);

            var params = JSON.parse(x);
            var options = {
            　　 method: params.type,
                url: params.url,
            };
            
            req(options, function (err, res, body) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(body);
                    response.writeHead(200, {'Content-Type': 'text/html'});  
                    response.write(body);  
                    response.end();  
                }
            })
        }
    });
    
     
}).listen(8989);
console.log("Server runing at port: " + 8989 + ".");  

