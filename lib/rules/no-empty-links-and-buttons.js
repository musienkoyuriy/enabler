const Validator = require('../validator');

function emptyLinksAndButtons($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: ['input[type="submit"]', 'button', 'a'],
    isInvalid: (selector) => {
      const tagName = selector[0].name;

      return [
        tagName === 'input' && !selector.attr('value'),
        tagName === 'button' && !selector.text(),
        tagName === 'a' && !selector.html(),
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
