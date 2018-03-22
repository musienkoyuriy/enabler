const Validator = require('../validator');
const { getAttrValue } = require('../utils');

function emptyLinksAndButtons($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: ['input[type="submit"]', 'button', 'a'],
    assocAttrs: ['value'],
    isInvalid: ($elem, attrs) => {
      const tagName = $elem[0].name;


      return [
        tagName === 'input' && !getAttrValue($elem, attrs),
        tagName === 'button' && !$elem.text(),
        tagName === 'a' && !$elem.html(),
      ].some(Boolean);
    },
    warningMessage: (el) => {
      const tagName = el[0].name;
      const message = tagName === 'input' ?
        '"Value" attribute should not be empty in "input" tag' :
        `Text should contains in "${tagName}" tag.`;

      return message;
    },
  });
}

module.exports = emptyLinksAndButtons;
