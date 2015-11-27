#!/usr/bin/env node

var debug = require('debug')('passport-mongo'),
    app = require('./app');

app.listen(3000, function() {
  debug('Express server listening on port ' + app.address().port);
});