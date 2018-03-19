const Validator = require('../validator');
const { getDuplicateAttributes } = require('../utils');

function noDuplicatedAttributes($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    isInvalid: ($elem) => {
      const duplicatedAttrs = getDuplicateAttributes($elem, content);

      return duplicatedAttrs.length;
    },
    warningMessage: 'Element should not have duplicated attributes',
  });
}

module.exports = noDuplicatedAttributes;
