const Validator = require('../validator');
const { hasAttribute } = require('../utils');

function noAudioAutoplay($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: 'audio',
    assocAttrs: ['autoplay'],
    isInvalid: ($elem, attrs) => hasAttribute($elem, attrs),
    warningMessage: 'Audio should not play automatically. Some of your users will have problems focusing and unexpected sounds can distract them further.',
  });
}

module.exports = noAudioAutoplay;
