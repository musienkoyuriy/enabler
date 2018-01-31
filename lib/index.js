

var fs = require('fs');
var glob = require('glob');
var cherrio = require('cheerio');

var parser = require('./parser');

function run() {
  glob('./components/**/*.html', function(err, files) {
    if (err) {
      throw new Error('Files search error ' + err);
      return;
    }
    checkTemplates(files);
  });
}

function checkTemplates(templates) {
  for(var i=0; i < templates.length; i++) {
    parseTemplate(templates[i]);
  }
}

function parseTemplate(templateUrl) {
  var parsed;

  fs.readFile(templateUrl, {encoding: 'utf8'}, function(err, file) {
    if (err) {
      throw new Error('Error whilie read the file: ' + err);
      return;
    }
    parsed = cherrio.load(file);
    parser.parse(parsed);
  });

}

module.exports = run;