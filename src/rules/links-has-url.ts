import Validator from '../validator';
import { getAttrValue } from '../utils';

export default function linksHasUrl($: any,content: string) {
  return new Validator({
    $template: $,
    content,
    selectors: 'a',
    assocAttrs: ['href'],
    isInvalid: ($elem: any, attrs: string[]) => {
      const href = getAttrValue($elem, attrs);
      const hasUrl = href !== '' && href !== '#';

      return !hasUrl;
    },
    warningMessage: 'Specify URL for link.'
  });
}
