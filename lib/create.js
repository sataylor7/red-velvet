/**
 * Dependencies
 */
var colors  = require('colors'),
    extra   = require('fs-extra'),
    fs      = require('fs'),
    path    = require('path'),
    promise = require('bluebird');
/**
 * Create the new feature folder and copy in the template files
 * @param  {string} name the name of the feature
 * @return {[type]}      returns a promise
 */
function create (name) {
  console.log(`the cupcake baking is named: ${name}`.yellow)
  //gather the correct paths
  var template_path = path.resolve( __dirname, '../templates' ),
      target_path = process.cwd() + '/' + name;

  return new promise(function(resolve, reject) {
    //check to see if the folder exist
    fs.exists(target_path, function (exists) {
          if (exists) {
            console.log(`Sorry but ${name} has already been made`.red);
            reject(new Error('Sorry but ' + name + ' has already been made'));
          }
          extra.copy(template_path, target_path, function(err, result) {
            if(err) {
              console.log('There was an error coping the files over: ', err)
              reject(new Error(err));
            }

            resolve(target_path);
          });
      });
  });
  //console.log(process.env.HOME.blue)
}

module.exports = create;
