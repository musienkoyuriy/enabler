import { isAngular } from '../../utils';
import DOMNodesValidator from '../../dom-nodes-validator';

export default function clickWithKeyboardEvent($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selectors: '*',
    isInvalid: (elem: CheerioElement) => {
      let eventsPairs = [
        {
          targetEvent: 'onclick',
          assocEvents: ['onkeyup', 'onkeydown', 'onkeypress']
        }
      ];

      if (isAngular()) {
        eventsPairs = [
          ...eventsPairs,
          {
            targetEvent: '(click)',
            assocEvents: ['(keyup)', '(keydown)', '(keypress)']
          }
        ];
      }

      return Boolean(
        eventsPairs
        .filter((eventPair) => {
          const { targetEvent, assocEvents } = eventPair;
          const hasAssociatedListener = assocEvents.some(eventName => Boolean($(elem).attr(eventName)));

          return $(elem).attr(targetEvent) && !hasAssociatedListener;
        })
        .length
      );
    },
    warningMessage: 'Visible, non-interactive elements with click handlers must have at least one keyboard listener.'
  });
}
