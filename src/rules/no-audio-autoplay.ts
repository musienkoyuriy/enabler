import Validator from '../validator';
import { hasAttribute } from '../utils';

export default function noAudioAutoplay($: any, content: string) {
  return new Validator({
    $template: $,
    content,
    selectors: 'audio',
    assocAttrs: ['autoplay'],
    isInvalid: ($elem: any, attrs: string[]) => hasAttribute($elem, attrs),
    warningMessage: 'Audio should not play automatically. Some of your users will have problems focusing and unexpected sounds can distract them further.'
  });
}
