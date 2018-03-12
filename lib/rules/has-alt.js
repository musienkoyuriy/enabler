const Validator = require('../validator');

function hasAlt($, content, options) {
  return new Validator({
    $template: $,
    content,
    selectors: ['img', 'area'],
    isInvalid: selector => !selector.attr('alt'),
    warningMessage: (el) => {
      const tagName = el[0].name;
      const purpose = tagName === 'img' ? 'image map' : 'link';
      const message = `The alt attribute of the <${tagName} /> tag must state the purpose of the ${purpose}.`;

      return message;
    },
  });
}

module.exports = hasAlt;
