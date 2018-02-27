'use strict';

const Validator = require('../validator');

const ariaAttributes = [
  'aria-autocomplete',
  'aria-checked',
  'aria-current',
  'aria-disabled',
  'aria-expanded',
  'aria-haspopup',
  'aria-hidden',
  'aria-invalid',
  'aria-label',
  'aria-level',
  'aria-multiline',
  'aria-multiselectable',
  'aria-orientation',
  'aria-pressed',
  'aria-readonly',
  'aria-required',
  'aria-selected',
  'aria-sort',
  'aria-live',
  'aria-relevant',
  'aria-atomic',
  'aria-busy',
  'aria-dropeffect',
  'aria-dragged',
  'aria-activedescendant',
  'aria-controls',
  'aria-describedby',
  'aria-flowto',
  'aria-labelledby',
  'aria-owns',
  'aria-posinset',
  'aria-setsize'
];

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
      const attributes = selector.attr();

      return ariaAttributes.some(attr => attr in attributes);
    },
    warningMessage: 'Hidden elements shouldn\'t contains aria- attributes/'
  });
}

module.exports = ariaUnsupportedElements;
