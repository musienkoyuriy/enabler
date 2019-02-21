import { EventPair } from '../models';
import Validator from '../validator';

export default function mouseEventsWithoutKeyEvents($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    assocEvents: ['mouseover', 'mouseout', 'focus', 'blur'],
    isInvalid: ($elem: Cheerio, attrs?: string[], events?: string[]) => {
      const mouseEvents = events ? events.filter((attr: string) => /mouse/gi.test(attr)) : [];
      const blurAndFocusEvents = events ? events.filter((attr: string) => /blur|focus/gi.test(attr)) : [];
      const eventPairs: EventPair[] = mouseEvents.map((mouseEvent: string) => {
        return {
          mouse: mouseEvent
        };
      });

      blurAndFocusEvents.forEach((event, i) => {
        eventPairs[i].keyboard = event;
      });

      return Boolean(
        eventPairs
        .filter((eventPair: EventPair) => {
          return $elem.attr(eventPair.mouse as string) && !$elem.attr(eventPair.keyboard as string);
        }).length
      );
    },
    warningMessage: 'Elements with mouse events should have an appropriate keyboard events (mouseover -> focus).'
  });
}
