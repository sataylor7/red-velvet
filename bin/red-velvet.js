#! /usr/bin/env node

// promise library
var promise = require('bluebird'),
    colors      = require('colors'),
    program = require('commander');

program
  .version('1.0.0')
  .option('-c, --create [type]', 'Create the a new feature named [INSERT_NAME]', 'INSERT_NAME')
  .parse(process.argv);


var _create = require('../lib/create'),
    _walk = require('../lib/walk'),
    feature_name = program.create;


console.log(program.create)
/**
 * Error handler
 */
function stderr (err) {
    console.log('Error: '.red + err.red);
    process.exit(1);
}
//if create was passed then create a new feature
if(program.create){
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
