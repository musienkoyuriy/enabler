const Validator = require('../validator');

function noFormattingTags($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: [
      'align', 'alink', 'background',
      'basefont', 'bgcolor', 'border',
      'color', 'text', 'vlink',
      'height', 'basefont',
      'blink', 'center', 'font',
      'marquee', 's', 'strike',
      'tt', 'u',
    ],
    isInvalid: selector => selector,
    warningMessage: (el) => {
      const tagName = el[0].name;

      return `HTML tags and attributes designed exclusively for formatting should not be used. Use CSS rules instead of <${tagName}> tag.`;
    },
  });
}

module.exports = noFormattingTags;
