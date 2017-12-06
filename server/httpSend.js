var http = require('http');  
var url=require('url');  
http.createServer(function (request, response) {
    console.log(request);  
    var req = require('request');
    var options = {
    　　 method: 'get',
        url: 'https://api.douban.com/v2/book/:2',
    };
    
    req(options, function (err, res, body) {
        if (err) {
            console.log(err)
        } else {
            console.log(body);
            response.writeHead(200, {'Content-Type': 'text/html'});  
            response.write(body);  
            response.end();  
        }
    }) 
}).listen(8989);
console.log("Server runing at port: " + 8989 + ".");  