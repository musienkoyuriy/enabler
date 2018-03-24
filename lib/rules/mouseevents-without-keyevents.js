const Validator = require('../validator');

function mouseEventsWithoutKeyEvents($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    assocEvents: ['mouseover', 'mouseout', 'focus', 'blur'],
    isInvalid: ($elem, attrs, events) => {
      const mouseEvents = events.filter(attr => /mouse/gi.test(attr));
      const blurAndFocusEvents = events.filter(attr => /blur|focus/gi.test(attr));
      const eventPairs = mouseEvents.map((mouseEvent) => {
        return {
          mouse: mouseEvent,
        };
      });

      blurAndFocusEvents.forEach((event, i) => {
        eventPairs[i].keyboard = event;
      });

      return eventPairs
        .filter((eventPair) => {
          return $elem.attr(eventPair.mouse) && !$elem.attr(eventPair.keyboard);
        }).length;
    },
    warningMessage: 'Elements with mouse events should have an appropriate keyboard events (mouseover -> focus).',
  });
}

module.exports = mouseEventsWithoutKeyEvents;
