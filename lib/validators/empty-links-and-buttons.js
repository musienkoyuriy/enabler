'use strict';

var utils = require('../utils');
var selectors = ['input[type="submit"]', 'button', 'a']
var query;
var tagName;
var warnings = [];

function emptyLinksAndButtonsValidate($, content) {
  var query;

  $(selectors.join(',')).each(function() {
    query = $(this);

    if (isInvalid(query)) {
      warnings.push({
        message: getWarningMessage(query),
        line: utils.getLineNumberByHTMLSegment($, content, query)
      });
    }
  });

  return {
    warnings: warnings
  };
}

function isInvalid(query) {
  var tag = query[0];
  var tagName = tag.name;

  return [
    tagName === 'input' && !query.attr('value'),
    tagName === 'button' && !query.text(),
    tagName === 'a' && !query.text()
  ].some(Boolean);
}

function getWarningMessage(query) {
  var tagName = query[0].name;
  var message = '';

  if (tagName === 'input') {
    message = '"Value" attribute should not be empty in "input" tag';
  } else {
    message = 'Text should contains in "' + tagName + '" tag.';
  }

  return message;
}

module.exports = emptyLinksAndButtonsValidate;