import { hasNonEmptyAttribute } from '../utils';
import Validator from '../validator';

export default function noMediaAutoplay($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: 'audio, video',
    assocAttrs: ['autoplay'],
    isInvalid: ($elem: Cheerio, attrs?: string[]) => attrs ? hasNonEmptyAttribute($elem, attrs) : false,
    warningMessage: (elem: any) => {
      const tagName = elem.tagName;

      return `<${tagName}> should not play automatically. Some of your users will have problems focusing and unexpected sounds can distract them further.`
    }
  });
}
