/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);   //zy+++++模板为html扩展名
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'upload')));
//zy+++++
app.use(express.bodyParser({keepExtensions: true, uploadDir: __dirname + '/tmp'}));
//app.use('/app', mySession.filterLogin);
app.use('/', require('./my/check').filter);
app.use('/app', require('./my/check').filter2);
app.use('/admin', require('./my/check').filter3);

routes(app);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});


//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
var https = require('https')
  , fs = require("fs");

var options = {
  key: fs.readFileSync('./ssl/wztjkey.pem'),
  cert: fs.readFileSync('./ssl/wztjcert.pem')
};

var server1 = https.createServer(options, app);

server1.listen(3001, function () {
  console.log('Https server listening on port ' + 3001);
});


/*
var server2 = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('okay2');
});

server2.listen(3002, function () {
  console.log('server2 running')
});*/
