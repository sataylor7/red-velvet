/**
 * Dependencies
 */
var path = require('path'),
  fs = require('fs'),
  promise = require('bluebird');
/**
 * Walk the directory and read through the files to change the [NAME] to the feature name passed in
 * @param  {string} directory name of the directory to walk through
 * @param  {string} name      name of the feature
 * @return {[type]}           [description]
 */
function walk(directory, name) {
  // Method defaults
  var regex = /\[(\[*]|.)*\]/g,
      name_array = (name.indexOf('/') !== -1)
        ? name.split('/')
        : [name],
      file_name = (name_array.length > 1)
        ? name_array.slice(-1)[0]
        : [name][0];

  return new promise(function(resolve, reject) {
    //walk through the directory
    fs.readdir(directory, function(err, files) {
      if (err)
        reject(err);

      //for each file read and replace the [NAME]
      files.forEach(function(file) {

        // read each file and replace the [NAME] with the name of the feature passed
        fs.readFile(path.resolve(directory, file), 'utf8', function(err, data) {
          if (err)
            reject(err);
          var uppercase = '',
            body = '',
            container_file = '',
            target_path = '';
          //if the file is actionTypes then uppercase the file name
          if (file === 'actionTypes.js') {
            uppercase = file_name.toString().toUpperCase();
            body = data.toString().replace(regex, uppercase);
          } else {
            body = data.toString().replace(regex, file_name);
          }

          if (file === '[NAME]Container.js') {
            container_file = file.toString().replace(regex, file_name);
          }

          target_path = (container_file)
            ? path.resolve(directory, container_file)
            : path.resolve(directory, file);

          if (container_file) {
            fs.rename(path.resolve(directory, file), path.resolve(directory, container_file), function(err) {
              if (err)
                reject('ERROR: ' + err);
              }
            );
          }

          fs.writeFile(target_path, body, function(err) {

            if (err) {
              console.log(`There was an error updating ${file}: ` + err);
              reject(err)
            } else {
              resolve('Updated!')
            }

          });

        });

      });
    });
  })

}

module.exports = walk;
