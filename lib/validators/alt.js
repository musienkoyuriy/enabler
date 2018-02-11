'use sctrict';

var tags = ['img', 'area'];

function altAttributeValidate($) {
  var query;
  var warnings = [];

  for(var i=0; i < tags.length; i++) {
    query = $(tags[i]);

    if (!query.length) continue;
    else {
      if (!query.attr('alt')) {
        warnings.push({
          message: getWarningMessage(query[0].name)
        });
      }
    }
  }

  return {
    warnings: warnings
  }
}

function getWarningMessage(tagName) {
  var purpose = tagName === 'img' ? 'image map' : 'link';
  var message = 'The alt attribute of the <' + tagName + '/> tag must state the purpose of the ' + purpose + '.';

  return message;
}

module.exports = altAttributeValidate;