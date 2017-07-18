#! /usr/bin/env node --harmony
/**
 * Command line interface for red-velvet.
 *
 * @package red-velvet
 * @author S.A.Taylor <sataylordesigns@gmail.com>
 */

/**
* Dependencies
*/
var promise = require('bluebird'),
    colors      = require('colors'),
    program = require('commander');


var _create = require('../lib/create'),
    _walk = require('../lib/walk');

//setting up the CLI for red-velvet
program
  .version('1.0.0')
  .description('Simple generator to create mini red velvet cupcakes aka react/redux files');

program
  .command('create <feature>')
  .description('creating a new cupcake - generating the feature scaffolding')
  .action(function(feature){
    var feature = feature || 'fluffy';
    _create(feature)
      .then(function(result){
        console.log(result)
        //need to walk through the new files and replace [NAME]
        return _walk(result, feature);
      })
      .then(function(result) {
        console.log(`${feature} cupcake is now ready`.green);
      })
      .catch(function(err){
        console.log(err)
        return stderr(err);
      })
  });

program.parse(process.argv);

/**
 * Error handler
 */
function stderr (err) {
    console.log('Error: '.red + err.red);
    process.exit(1);
}
