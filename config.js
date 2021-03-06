var express = require('express')
  , connect = require('connect');


try {
  var keys = require('./keys');
} catch(e) {
  var keys = {};
}

module.exports = function(app){
  app.configure(function(){
    this
      .use(express.bodyParser())
      .set('public', __dirname + '/public')
      .enable('jsonp callback')
      .enable('error templates')
      .use(express.static(__dirname + '/public'));
  });

  // Dev
  app.configure('development', function(){
    this
      .use(express.cookieParser())
      .use(express.session({ secret: "pwn noobs"}))
      .use(express.logger('\x1b[90m:remote-addr -\x1b[0m \x1b[33m:method\x1b[0m' +
         '\x1b[32m:url\x1b[0m :status \x1b[90m:response-time ms\x1b[0m'))
      .use(express.errorHandler({dumpExceptions: true, showStack: true}))
      .enable('dev')
      .set('domain', 'app.local');
  });
  
  // Prod
  app.configure('production', function(){
    this
      .use(express.logger({buffer: 10000}))
      .use(connect.cookieParser('tiutiuti454545utiutiut'))
      .use(express.errorHandler({dumpExceptions: true, showStack: true}))
      .enable('prod')
      .set('domain', 'transit.bn.ee');
  });

  app.configure(function() {
    var wundergroundToken = process.env.WUNDERGROUND_TOKEN || keys.wundergroundToken;
    app.set('wundergroundToken', wundergroundToken);
  })
}
