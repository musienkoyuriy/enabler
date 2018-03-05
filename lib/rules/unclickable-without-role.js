'use strict';

const Validator = require('../validator');

function unclickableWithoutRole($, content) {
  return new Validator({
    $template: $,
    content: content,
    selectors: '*',
    isInvalid: function(selector) {
      const clickableElements = [
        'a[href]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'button'
      ];
      const isClickable = clickableElements.some(sel => selector.is(sel));
      const hasClick = selector.attr('onclick');
      const hasRoleButton = selector.is('[role=button]');
      
      return !isClickable && hasClick && !hasRoleButton;
    },
    warningMessage: 'Unclickable elements with click listener should have a role attribute.'
  });
}

module.exports = unclickableWithoutRole;
