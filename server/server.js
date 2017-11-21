var koa = require('koa');
var fs = require('fs');
var mysql = require('easy-mysql');
var koaBody = require('koa-body');
var router = require('koa-router')();
var app = new koa();

const cors = require('koa2-cors');
app.use(koaBody());

/**设置跨域*/
app.use(cors({
  origin: function (ctx) {
      if (ctx.url === '/test') {
          return "*"; 
      }
      return 'http://localhost:7070';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))


/**database */
var settings = {
  user: 'root',
  password: 'root',
  database: 'azkaban',
}
var easy_mysql = mysql.connect_with_easy_pool(settings);


/** 增删改*/
var operate = function(sql, response){
  return new Promise(function(resolve, reject){
    client.query(sql,  function selectCb(err, result) {  
      if (err) {  
        response.success = false;
        response.data = err;
      }  
        
      if(result)
      {
        response.success = true;
        response.data = true;
        resolve('ok');
      }    
    })
  })
}

/**查 */
var search = function(sql, response){
  return new Promise(function(resolve, reject){
    easy_mysql.execute(sql, [123], function selectCb(err, result) {  
      if (err) {  
        response.success = false;
        response.data = err;
      }  
        
      if(result)
      {
        response.success = true;
        response.data = [];
        response.data = result.slice();
        resolve('ok');
      }    
    })
  })
}

router.post('/potter', function(ctx, next){
        var response = {};
        response.success = true;
        response.data = "测试请求成功了!";
        ctx.body = JSON.stringify(response);
      })
      .post('/phoenix/addRequest', async function(ctx, next){
        /**
         * create file 
         * @param {string} requestName NOT NULL
         * @param {string} categoryId NOT NULL
         * @param {string} description
         * @param {string} type
         * @param {string} requestUrl
         * @param {string} requestJson
         * @param {string} requestHeader
         * 
         * @param {string} createTime
         * @param {string} updateTime
         * 
         * */
        var request = JSON.parse(ctx.request.body);
        var response = {};
        var requestName = request.requestName;
        var categoryId = request.categoryId;
        var description = request.description || '';
        var type = request.type || '';
        var requestUrl = request.requestUrl || '';
        var requestJson = request.requestJson || '';
        var requestHeader = request.requestHeader || '';

        var now = new Date();
        var create_Time = now.toJSON().split('T')[0] + ' ' + now.toJSON().split('T')[1].split('.')[0];
        var update_Time = now.toJSON().split('T')[0] + ' ' + now.toJSON().split('T')[1].split('.')[0];

        if(!categoryId || !requestName){
          response.success = false;
          response.data = '参数缺失!';
          ctx.body = JSON.stringify(response);
          return;
        }

        client.connect();
        client.query('use ' + database);

        var sql = 'INSERT INTO Request('+
                      'requestName,'+
                      'categoryId,'+
                      'description,'+
                      'type,'+
                      'requestUrl,'+
                      'requestJson,'+
                      'requestHeader,'+
                      'createTime,'+
                      'updateTime) values('+
                      '"' + requestName + '",' + 
                      categoryId + ',' +
                      '"' + description + '",' + 
                      '"' + type + '",' + 
                      '"' + requestUrl + '",' + 
                      '"' + requestJson + '",' + 
                      '"' + requestHeader + '",' + 
                      '"' + create_Time + '",' +
                      '"' + update_Time + '"' + 
                      ');';

        await operate(sql, response);

        ctx.body = JSON.stringify(response);
        client.end(); 
        
      })
      .post('/phoenix/addCategory', async function(ctx, next){
        /**
         * create Category 
         * @param {string} categoryName
         * */
        var response = {};
        var categoryName = JSON.parse(ctx.request.body).categoryName;
        if(!categoryName){
          response.success = false;
          response.data = '参数缺失!';
          ctx.body = JSON.stringify(response);
          return;
        }

        client.connect();
        client.query('use ' + database);

        var sql = 'INSERT INTO Category(categoryName) values("'+categoryName+'");';
        await operate(sql, response);

        ctx.body = JSON.stringify(response);
        client.end(); 

      })
      .post('/phoenix/getRequest', async function(ctx, next){
        /**
         * overview all requests
         * */
        var response = {};
        var requestId = parseInt(JSON.parse(ctx.request.body).requestId);
        var sql = '';
        if(!requestId){
          sql = 'select r.id as requestId,r.requestName,r.categoryId,r.description,r.type,r.requestUrl,r.requestJson,r.requestHeader,r.createTime,r.updateTime,c.categoryName from Request r left join category c on r.categoryId = c.Id;';
        }else{
          sql = 'select r.id as requestId,r.requestName,r.categoryId,r.description,r.type,r.requestUrl,r.requestJson,r.requestHeader,r.createTime,r.updateTime from Request r where r.Id = '+ requestId +' ;'
        }

        // console.log(sql);
        await search(sql, response);

        function replacer(key, value) {
          if (value === null) {
            return undefined;
          }
          return value;
        }
        ctx.response.set('Content-Type', 'text/json; charset=utf-8');
        ctx.body = JSON.stringify(response, replacer);
        // client.end(); 
      })
      


      
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);