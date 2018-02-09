'use strict';

var selectors = ['input[type="submit"]', 'button', 'a']
var query;
var tagName;
var warnings = [];

function emptyLinksAndButtonsValidate($) {
  for (var i=0; i < selectors.length; i++) {
    query = $(selectors[i]);

    if (!query.length) continue;
    else {
      tagName = query[0].name;

      if (isInvalid(query)) {
        warnings.push({
          message: getWarningMessage(query)
        });
      }
    }
  }

  return warnings;
}

function isInvalid(query) {
  return [
    tagName === 'input' && !query[0].attr('value'),
    tagName === 'button' && !query[0].text(),
    tagName === 'a' && !query[0].text()
  ].some(Boolean);
}

function getWarningMessage(query) {
  var tagName = query.name;
  var message = '';

  if (tagName === 'input') {
    message = '"Value" attribute should not be empty in input tag';
  } else {
    message = 'Text should contains in ' + tagName + ' tag.';
  }

  return message;
}

module.exports = emptyLinksAndButtonsValidate;