import { hasAttribute } from '../utils';
import Validator from '../validator';

export default function iFrameHasTitle($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: 'iframe',
    assocAttrs: ['title'],
    isInvalid: ($elem: Cheerio, attrs?: string[]) => attrs ? !hasAttribute($elem, attrs) : false,
    warningMessage: '<iframe> element should have a unique non-empty title attribute'
  });
}
