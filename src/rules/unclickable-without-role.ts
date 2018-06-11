import { hasAttribute } from '../utils';
import Validator from '../validator';

export default function unclickableWithoutRole($: any,content: string) {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    assocEvents: ['click'],
    isInvalid: ($elem: any, attrs: string[], events: string[]) => {
      const clickableElements = [
        'a[href]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'button'
      ];
      const isClickable = clickableElements.some(sel => $elem.is(sel));
      const hasClick = hasAttribute($elem, events);
      const hasRoleButton = $elem.is('[role=button]');

      return !isClickable && hasClick && !hasRoleButton;
    },
    warningMessage: 'Unclickable elements with click listener should have a role attribute.'
  });
}
