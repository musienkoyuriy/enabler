import DOMNodesValidator from '../../dom-nodes-validator';
import { EventPair } from '../../models/common';
import { RuleData } from './../../models/rule';

export default function mouseEventsWithoutKeyEvents($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: '*',
    assocEvents: ['mouseover', 'mouseout', 'focus', 'blur'],
    // @ts-ignore
    isInvalid: (rule: RuleData) => {
      const { elem, events } = rule;
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
        });
    },
    warningMessage: 'Elements with mouse events should have an appropriate keyboard events (mouseover -> focus).'
  });
}
