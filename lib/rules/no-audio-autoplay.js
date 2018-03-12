const Validator = require('../validator');

function noAudioAutoplay($, content, options) {
  return new Validator({
    $template: $,
    content,
    selectors: 'audio',
    isInvalid: selector => selector.attr('autoplay') !== undefined,
    warningMessage: 'Audio should not play automatically. Some of your users will have problems focusing and unexpected sounds can distract them further.',
  });
}

module.exports = noAudioAutoplay;
