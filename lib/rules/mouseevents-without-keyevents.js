const Validator = require('../validator');

function mouseEventsWithoutKeyEvents($, content, options) {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    isInvalid: (selector) => {
      let eventPairs = [
        {
          mouse: 'onmouseover',
          keyboard: 'onfocus',
        },
        {
          mouse: 'onmouseout',
          keyboard: 'onblur',
        },
      ];

      if (options.ng) {
        eventPairs = [
          ...eventPairs,
          {
            mouse: '(mouseover)',
            keyboard: '(focus)',
          },
          {
            mouse: '(mouseout)',
            keyboard: '(blur)',
          },
        ];
      }

      return eventPairs
        .filter(eventPair => selector.attr(eventPair.mouse) && !selector.attr(eventPair.keyboard))
        .length;
    },
    warningMessage: 'Elements with mouse events should have an appropriate keyboard events (mouseover -> focus).',
  });
}

module.exports = mouseEventsWithoutKeyEvents;
