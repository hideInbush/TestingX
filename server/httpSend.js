// var http = require('http');  
// var url=require('url'); 
var request = require('request');
// var querystring = require('querystring');
// var util = require('util');

var params = {
    SERVICE_ID:[13,11,1000],
    query:{
        type:"b1",
        condition:{
            ANY:"java"
        },
        pagination:{
            page:1,
            pageSize:20,
            pageCount:10
        },
        sort:{
            DEFAULT:"DESC"
        }
    },
    offset:0,
    rows:20
};

request({
    host: '101.37.168.106',
    url: 'http://pre.lib.stu.flyread.com.cn/libinterview',
    method: 'POST',
    json: true,
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify(params)
}, function (error, response, body) {
    if (error) {
        console.log(err);
    } else {
        console.log(body);
        // response.writeHead(200, {'Content-Type': 'text/html'});  
        // response.write(body);  
        // response.end();  
    }
})


// http.createServer(function (request, response) {
//     response.setHeader("Access-Control-Allow-Origin", "*");  
    
//     var post = '';     
//     request.on('data', function(chunk){    
//         post += chunk;
//     });
//     request.on('end', function(){    
//         post = querystring.parse(post);

//         for(x in post){
//             console.log(x);

//             var params = JSON.parse(x);
//             var options = {
//             　　 method: params.type,
//                 url: params.url,
//                 json: true,
//                 headers: {
//                     "content-type": "application/json",
//                 },
//                 body: JSON.stringify(params.param)
//             };
            
//             req(options, function (err, res, body) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(body);
//                     response.writeHead(200, {'Content-Type': 'text/html'});  
//                     response.write(body);  
//                     response.end();  
//                 }
//             })
//         }
//     });
    
     
// }).listen(8989);

