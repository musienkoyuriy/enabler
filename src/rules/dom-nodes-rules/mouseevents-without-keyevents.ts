import DOMNodesValidator from '../../dom-nodes-validator';
import { EventPair } from '../../models/common';

export default function mouseEventsWithoutKeyEvents($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: '*',
    assocEvents: ['mouseover', 'mouseout', 'focus', 'blur'],
    // @ts-ignore
    isInvalid: (elem: CheerioElement, attrs?: string[], events?: string[]) => {
      // TODO: need to wrap input parameters in object such as
      // {
      //   elem: Element,
      //   attrs: ["id"],
      //   events: ["mouseovet"]
      // }
      if (attrs !== undefined) console.log(attrs)
      const mouseEvents = events ? events.filter((attr: string) => /mouse/gi.test(attr)) : [];
      const blurAndFocusEvents = events ? events.filter((attr: string) => /blur|focus/gi.test(attr)) : [];
      const eventPairs: EventPair[] = mouseEvents.map((mouseEvent: string) => {
        return {
          mouse: mouseEvent
        };
      });

      blurAndFocusEvents.forEach((event, i) => eventPairs[i].keyboard = event);

      return eventPairs
        .some((eventPair: EventPair) => {
          return $(elem).attr(eventPair.mouse as string) && !$(elem).attr(eventPair.keyboard as string);
        })
    },
    warningMessage: 'Elements with mouse events should have an appropriate keyboard events (mouseover -> focus).'
  });
}
