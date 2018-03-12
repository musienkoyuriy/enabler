const Validator = require('../validator');

function linksHasUrl($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: 'a',
    isInvalid: (selector) => {
      const href = selector.attr('href');
      const hasUrl = href !== '' && href !== '#';

      return !hasUrl;
    },
    warningMessage: 'Specify URL for link.',
  });
}

module.exports = linksHasUrl;
