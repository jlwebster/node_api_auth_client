(typeof define !== "function" ? function($){ $(require, exports, module); } : define)(function(require, exports, module, undefined) {
  var crypto = require('crypto');
  var moment = require('moment');

  exports.auth = function(access_id, secret) {
    this.access_id = access_id;
    this.secret = secret;

    this.sign_options = function(options, content_body) {
      var content_type = options.headers['Content-Type'];
      if (isEmpty(content_type))
      {
        // Default to json
        content_type = 'application/json';
      }

      var content_md5 = crypto.createHash('md5').update(content_body).digest('base64');
      var path = options.path;
      if (isEmpty(path))
      {
        // Default to the host's root
        path = '/'
      }

      var date = moment().utc().format('ddd, DD MMM YYYY hh:mm:ss') + ' GMT';

      var canonical_string = [content_type, content_md5, path, date].join();

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
});

