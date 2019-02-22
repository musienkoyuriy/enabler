import { ProgramOptions } from '../models/common';
import Validator from '../validator';

export default function clickWithKeyboardEvent($: any, content: string, options: ProgramOptions): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    isInvalid: ($elem: Cheerio) => {
      let eventsPairs = [
        {
          targetEvent: 'onclick',
          assocEvents: ['onkeyup', 'onkeydown', 'onkeypress']
        }
      ];

      if (options.ng) {
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
          const hasAssociatedListener = assocEvents.some(eventName => Boolean($elem.attr(eventName)));

          return $elem.attr(targetEvent) && !hasAssociatedListener;
        })
        .length
      );
    },
    warningMessage: 'Visible, non-interactive elements with click handlers must have at least one keyboard listener.'
  });
}
