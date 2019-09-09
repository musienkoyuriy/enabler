import DOMNodesValidator from '../../dom-nodes-validator';
import { hasNonEmptyAttribute } from '../../utils';

export default function unclickableWithoutRole($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: '*',
    assocEvents: ['click'],
    // @ts-ignore
    isInvalid: (elem: CheerioElement, attrs?: string[], events?: string[]) => {
      const clickableElements = [
        'a[href]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'button'
      ];
      const isClickable = clickableElements.some(sel => $(elem).is(sel));
      const hasClick = events ? hasNonEmptyAttribute($(elem), events) : false;
      const hasRoleButton = $(elem).is('[role=button]');

      return !isClickable && hasClick && !hasRoleButton;
    },
    warningMessage: 'Unclickable elements with click listener should have a role attribute.'
  });
}
