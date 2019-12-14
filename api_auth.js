// api_auth.js
// author : John Webster
// license : MIT
// https://github.com/jlwebster/node_api_auth_client
var crypto = require('crypto');
var moment = require('moment');

var exports = module.exports;

exports.auth = function(access_id, secret) {
  this.access_id = access_id;
  this.secret = secret;

  this.sign_options = function(options, content_body) {
    var content_type = options.headers['Content-Type'];
    if (isEmpty(content_type))
    {
      // Default to json
      content_type = options.headers['Content-Type'] = 'application/json';
    }

    var path = options.path;
    if (isEmpty(path))
    {
      // Default to the host's root
      path = options.path = '/'
    }

    var content_md5 = crypto.createHash('md5').update(content_body).digest('base64');
    var date = moment().utc().format('ddd, DD MMM YYYY HH:mm:ss') + ' GMT';

    var canonical_string = [options.method, content_type, content_md5, path, date].join();

    var auth_header_value = 'APIAuth ' + this.access_id + ':' + crypto.createHmac('sha1', this.secret).update(canonical_string).digest('base64');

    options.headers['Content-MD5'] = content_md5;
    options.headers['DATE'] = date;
    options.headers['Authorization'] = auth_header_value;

    return options;
  };

  return this;
};

function isEmpty(value)
{
  return value === null || value === '' || typeof value === 'undefined';
}
