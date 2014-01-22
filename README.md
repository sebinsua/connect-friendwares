connect-friendwares
===================

[![Build Status](https://travis-ci.org/sebinsua/connect-friendwares.png)](https://travis-ci.org/sebinsua/connect-friendwares)

A connect helper so that middlewares can see their friends.

Usage
-----

```javascript
var connect     = require('connect'),
    http        = require('http'),
    friendwares = require('connnect-friendwares');

var app = connect(),
  .use(require('compression')())
  .use(function (req, res) {
    if (friendwares(app.stack).has('compression')) {
      console.log("Compression middleware exists in the stack.");
    }
    res.end('Hello from Connect!\n');
  });

http.createServer(app).listen(3000);
```
