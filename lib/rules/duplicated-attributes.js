const Validator = require('../validator');
const { getDuplicateAttributes } = require('../utils');

function duplicatedAttributes($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    isInvalid: (selector) => {
      const duplicatedAttrs = getDuplicateAttributes(selector, content);

      return duplicatedAttrs.length;
    },
    warningMessage: 'Element should not have duplicated attributes',
  });
}

module.exports = duplicatedAttributes;
