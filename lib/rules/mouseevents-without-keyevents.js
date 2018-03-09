const Validator = require('../validator');

function mouseEventsWithoutKeyEvents($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    isInvalid: (selector) => {
      const eventPairs = [
        {
          mouse: 'onmouseover',
          keyboard: 'onfocus',
        },
        {
          mouse: 'onmouseout',
          keyboard: 'onblur',
        },
      ];

      return eventPairs
        .filter(eventPair => selector.attr(eventPair.mouse) && !selector.attr(eventPair.keyboard))
        .length;
    },
    warningMessage: 'Elements with mouse events should have an appropriate keyboard events (mouseover -> focus).',
  });
}

module.exports = mouseEventsWithoutKeyEvents;
