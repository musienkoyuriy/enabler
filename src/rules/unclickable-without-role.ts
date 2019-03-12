import { hasNonEmptyAttribute } from '../utils';
import Validator from '../validator';

export default function unclickableWithoutRole($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    assocEvents: ['click'],
    // @ts-ignore
    isInvalid: ($elem: Cheerio, attrs?: string[], events?: string[]) => {
      const clickableElements = [
        'a[href]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'button'
      ];
      const isClickable = clickableElements.some(sel => $elem.is(sel));
      const hasClick = events ? hasNonEmptyAttribute($elem, events) : false;
      const hasRoleButton = $elem.is('[role=button]');

      return !isClickable && hasClick && !hasRoleButton;
    },
    warningMessage: 'Unclickable elements with click listener should have a role attribute.'
  });
}
