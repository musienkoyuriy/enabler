const Validator = require('../validator');
const { hasAttribute } = require('../utils');

function unclickableWithoutRole($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    assocEvents: ['click'],
    isInvalid: (selector, attrs, events) => {
      const clickableElements = [
        'a[href]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'button',
      ];
      const isClickable = clickableElements.some(sel => selector.is(sel));
      const hasClick = hasAttribute(selector, events);
      const hasRoleButton = selector.is('[role=button]');

      return !isClickable && hasClick && !hasRoleButton;
    },
    warningMessage: 'Unclickable elements with click listener should have a role attribute.',
  });
}

module.exports = unclickableWithoutRole;
