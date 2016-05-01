var fs = require('fs');
var path = require('path');
var theText = "Counting:";
var count = 0;

module.exports = setInterval(() => {
  theText += " " + count;
  count++
  fs.writeFile(path.join(__dirname, '/test.txt'), theText, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });   
}, 1000);
