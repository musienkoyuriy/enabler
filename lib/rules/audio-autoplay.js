const Validator = require('../validator');

function audioAutoplay($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: 'audio',
    isInvalid: (selector) => {
      return selector.attr('autoplay') !== undefined;
    },
    warningMessage: 'Audio should not play automatically. Some of your users will have problems focusing and unexpected sounds can distract them further.',
  });
}

module.exports = audioAutoplay;
