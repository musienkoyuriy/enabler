const Validator = require('../validator');
const { hasAttribute } = require('../utils');

function hasAlt($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: ['img', 'area'],
    assocAttrs: ['alt'],
    isInvalid: (selector, attrs) => !hasAttribute(selector, attrs),
    warningMessage: (el) => {
      const tagName = el[0].name;
      const purpose = tagName === 'img' ? 'image map' : 'link';
      const message = `The alt attribute of the <${tagName} /> tag must state the purpose of the ${purpose}.`;

      return message;
    },
  });
}

module.exports = hasAlt;
