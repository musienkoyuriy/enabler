'use strict';

const Validator = require('./validator');

function getWarningMessage(el) {
  const tagName = el[0].name;
  const purpose = tagName === 'img' ? 'image map' : 'link';
  const message = `The alt attribute of the <${tagName} /> tag must state the purpose of the ${purpose}.`;

  return message;
}

function altAttributeValidate($) {
  return new Validator({
    $template: $,
    selectors: ['img', 'area'],
    isInvalid: function(selector) {
      return !selector.attr('alt');
    },
    warningMessage: getWarningMessage
  })
}

module.exports = altAttributeValidate;