#! /usr/bin/env node
//this was taken from https://github.com/jaschaephraim/static-generator/blob/master/bin/stat-gen.js

// Get command, defaulting to 'create'
var cmd = process.argv[ 2 ] || 'create';
// promise library
var promise = require('bluebird');

// Execute command, passing any other arguments
//require( '../commands/' + cmd )( process.argv.slice( 3 ) );

var _create = require('../lib/create'),
    _walk = require('../lib/walk'),
    feature_name = process.argv.slice(3);

/**
 * Error handler
 */
function stderr (err) {
    console.log('Error: '.red + err.red);
    process.exit(1);
}


if(cmd === 'create'){
  _create(feature_name)
    .then(function(result){
      console.log(result)
      //need to walk through the new files and replace [NAME]
      return _walk(result, feature_name);
    })
    .then(function(result) {
      console.log(`${feature_name} has been created`.green);
    })
    .catch(function(err){
      console.log(err)
      return stderr(err);
    })
}
