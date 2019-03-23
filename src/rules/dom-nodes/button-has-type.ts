import { hasNonEmptyAttribute } from '../../utils';
import DOMNodesValidator from '../../validator';

export default function buttonHasType($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selectors: 'button',
    assocAttrs: ['type'],
    isInvalid: ($elem: Cheerio, attrs?: string[]) => {
      const buttonTypes = ['button', 'reset', 'submit'];
      if (attrs) {
        return !hasNonEmptyAttribute($elem, attrs) || !buttonTypes.includes($elem.attr('type'));
      }
      return false;
    },
    warningMessage: '<button> element should have "type" to prevent unexpected behavior. For example if you need button just as an interface element use <button type="button"> instead'
  });
}