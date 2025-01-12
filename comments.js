// Create web server

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var path = url.parse(request.url).pathname;
  var query = url.parse(request.url).query;
  var data = qs.parse(query);
  console.log(path);
  console.log(query);
  console.log(data);
  switch(path){
    case '/':
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("Hello World");
      response.end();
      break;
    case '/comments':
      if(request.method === 'POST'){
        var body = '';
        request.on('data', function (data) {
          body += data;
          console.log("Partial body: " + body);
        });
        request.on('end', function () {
          console.log("Body: " + body);
          response.writeHead(200, {"Content-Type": "text/html"});
          response.end('post received');
        });
      }else{
        response.writeHead(200, {"Content-Type": "text/html"});
        response.end('get received');
      }
      break;
    case '/form':
      fs.readFile('form.html', function (err, data) {
        if(err){
          response.writeHead(404, {'Content-Type': 'text/html'});
          response.end("404 Not Found");
        }else{
          response.writeHead(200, {'Content-Type': 'text/html'});
          response.write(data);
          response.end();
        }
      });
      break;
    default:
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.end("404 Not Found");
      break;
  }
});

// Listen on port 8000, IP defaults to
server.listen(8000);
