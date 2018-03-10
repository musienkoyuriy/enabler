const Validator = require('../validator');

function clickWithKeyboardEvent($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    isInvalid: (selector) => {
      const keyboardEvents = [
        'onkeyup',
        'onkeydown',
        'onkeypress',
      ];
      const hasKeyboardListener = keyboardEvents.some(eventName => selector.attr(eventName));

      return selector.attr('onclick') && !hasKeyboardListener;
    },
    warningMessage: 'Visible, non-interactive elements with click handlers must have at least one keyboard listener.',
  });
}

module.exports = clickWithKeyboardEvent;
