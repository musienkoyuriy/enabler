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

      if (tagName === 'input' && !query[0].attr('value')) {
        return {
          isValid: false,
          message: getWarningMessage(tagName)
        }
      } else if (tagName && !query[0].text()) {
        
      }
    }
  }

  return {
    isValid: true
  }
}

getWarningMessage(tagName) {
  var message = 'Text should contains in ' + tagName + ' tag.';

  return message;
}

module.exports = emptyLinksAndButtonsValidate;