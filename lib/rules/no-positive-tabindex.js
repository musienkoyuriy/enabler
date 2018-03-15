const Validator = require('../validator');

function noPositiveTabindex($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    isInvalid: (selector) => {
      let tabIndex = selector.attr('tabindex');
      tabIndex = tabIndex ? Number(tabIndex) : 0;

      return tabIndex > 0;
    },
    warningMessage: 'Avoid positive tabindex.',
  });
}

module.exports = noPositiveTabindex;
