import { hasNonEmptyAttribute } from '../utils';
import Validator from '../validator';

export default function noAudioAutoplay($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: 'audio',
    assocAttrs: ['autoplay'],
    isInvalid: ($elem: Cheerio, attrs?: string[]) => attrs ? hasNonEmptyAttribute($elem, attrs) : false,
    warningMessage: 'Audio should not play automatically. Some of your users will have problems focusing and unexpected sounds can distract them further.'
  });
}
