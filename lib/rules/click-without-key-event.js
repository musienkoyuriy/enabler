'use strict';

const Validator = require('../validator');

function clickWithoutKeyboardEvent($, content) {
  return new Validator({
    $template: $,
    content: content,
    selectors: '*',
    isInvalid: function(selector) {
      const keyboardEvents = [
        'onkeyup',
        'onkeydown',
        'onkeypress'
      ];
      
      const hasKeyboardListener = keyboardEvents.some(eventName => {
        return selector.attr(eventName);
      });
      
      return selector.attr('onclick') && !hasKeyboardListener;
    },
    warningMessage: 'Visible, non-interactive elements with click handlers must have at least one keyboard listener.'
  });
}

module.exports = clickWithoutKeyboardEvent;
