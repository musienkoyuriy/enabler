import Validator from '../validator';

export default function mouseEventsWithoutKeyEvents($: any, content: string) {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    assocEvents: ['mouseover', 'mouseout', 'focus', 'blur'],
    isInvalid: ($elem: any, attrs: string[], events: string[]) => {
      const mouseEvents = events.filter((attr: string) => /mouse/gi.test(attr));
      const blurAndFocusEvents = events.filter((attr: string) => /blur|focus/gi.test(attr));
      const eventPairs: {
        mouse?: string;
        keyboard?: string;
      }[] = mouseEvents.map((mouseEvent: string) => {
        return {
          mouse: mouseEvent
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
    warningMessage: 'Elements with mouse events should have an appropriate keyboard events (mouseover -> focus).'
  });
}
