const Validator = require('../validator');

function emptyLinksAndButtons($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: ['input[type="submit"]', 'button', 'a'],
    isInvalid: ($elem) => {
      const tagName = $elem[0].name;

      return [
        tagName === 'input' && !$elem.attr('value'),
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
