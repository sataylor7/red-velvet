/**
 * Dependencies
 */
var path = require('path'),
    fs      = require('fs'),
    promise = require('bluebird');
/**
 * Walk the directory and read through the files to change the [NAME] to the feature name passed in
 * @param  {[type]} directory name of the directory to walk through
 * @param  {[type]} name      name of the feature
 * @return {[type]}           [description]
 */
function walk(directory, name) {
  // Method defaults
    var regex           = /\[(\[*]|.)*\]/g;
        name_array = (name.indexOf('/') !== -1 )? name.split('/') : name,
        file_name = (name_array.length > 1) ? name_array.slice(-1)[0] : name;

    return new promise(function(resolve, reject) {
      //walk through the directory
      fs.readdir(directory, function(err, files) {
    		if (err) reject(err);
        //for each file read and replace the [NAME]
    		files.forEach(function(file) {
          // read each file and replace the [NAME] with the name of the feature passed
          fs.readFile(path.resolve(directory, file),'utf8', function (err, data) {
            if (err) reject(err);
            var uppercase = '',
                body = '';
            //if the file is actionTypes then uppercase the file name
            if(file === 'actionTypes.js'){
              console.log('file is actionTypes')
              uppercase = file_name.toString().toUpperCase();
              body = data.toString().replace(regex, uppercase);
            }else {
              body = data.toString().replace(regex, file_name);
            }

            //write the file with the name replaced
            fs.writeFile(path.resolve(directory, file), body, function(err) {
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
