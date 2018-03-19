const Validator = require('../validator');
const { getAttrValue } = require('../utils');

function linksHasUrl($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: 'a',
    assocAttrs: ['href'],
    isInvalid: ($elem, attrs) => {
      const href = getAttrValue($elem, attrs);
      const hasUrl = href !== '' && href !== '#';

      return !hasUrl;
    },
    warningMessage: 'Specify URL for link.',
  });
}

module.exports = linksHasUrl;
