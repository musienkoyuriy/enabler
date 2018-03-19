const Validator = require('../validator');
const { getAttrValue } = require('../utils');

function noPositiveTabindex($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    assocAttrs: ['tabindex'],
    isInvalid: ($elem, attrs) => {
      let tabIndex = getAttrValue($elem, attrs);
      tabIndex = tabIndex ? Number(tabIndex) : 0;

      return tabIndex > 0;
    },
    warningMessage: 'Avoid positive tabindex.',
  });
}

module.exports = noPositiveTabindex;
