const Validator = require('../validator');
const { hasAttribute } = require('../utils');

function noAudioAutoplay($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: 'audio',
    assocAttrs: ['autoplay'],
    isInvalid: (selector, attrs) => {
      console.log(342445345, attrs);
      return hasAttribute(selector, attrs)
    },
    warningMessage: 'Audio should not play automatically. Some of your users will have problems focusing and unexpected sounds can distract them further.',
  });
}

module.exports = noAudioAutoplay;
