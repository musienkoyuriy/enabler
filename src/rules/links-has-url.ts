import { getAttrValue } from '../utils';
import Validator from '../validator';

export default function linksHasUrl($: any,content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: 'a',
    assocAttrs: ['href'],
    isInvalid: ($elem: Cheerio, attrs?: string[], events?: string[]) => {
      const href = attrs ? getAttrValue($elem, attrs) : '';
      const hasUrl = href !== '' && href !== '#';

      return !hasUrl;
    },
    warningMessage: 'Specify URL for link.'
  });
}
