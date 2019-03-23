import { EventPair } from '../../models/common';
import DOMNodesValidator from '../../validator';

export default function mouseEventsWithoutKeyEvents($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selectors: '*',
    assocEvents: ['mouseover', 'mouseout', 'focus', 'blur'],
    // @ts-ignore
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
