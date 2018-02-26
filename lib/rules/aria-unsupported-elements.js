'use strict';

const Validator = require('../validator');

function ariaUnsupportedElements($, content) {
  return new Validator({
    $template: $,
    content: content,
    selectors: [
      'meta',
      'html',
      'script',
      'style'
    ],
    isInvalid: function(selector) {
      const attrs = Object.keys(selector.attr());

      return attrs.some(attr => attr.startsWith('aria-'));
    },
    warningMessage: 'Hidden elements such as meta, html, script, style should not has an aria-* attributes'
  });
}

module.exports = ariaUnsupportedElements;
