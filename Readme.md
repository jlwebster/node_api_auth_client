# node_api_auth_client #

A simple Node.js client that authenticates to a ruby api that uses api_auth: https://github.com/mgomes/api_auth

## Install ##
```
  $ npm install api_auth
```

## Usage ##
```js
  // Set up api request options
  var options = {
    host: '<HOST>',
    path: '/resource.json',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...
    }
  }
  
  // Sign options hash using api_auth
  var access_id = '<ACCESS_ID>';
  var secret = '<SECRET>';
  options = require('api_auth').auth(<ACCESS_ID>, <SECRET>).sign_options(options, content_body);
  
  //Make request
  var req = http.request(options, function(res){
      ...
  });
```
