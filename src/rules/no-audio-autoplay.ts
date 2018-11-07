import { hasAttribute } from '../utils';
import Validator from '../validator';

export default function noAudioAutoplay($: any, content: string) {
  return new Validator({
    $template: $,
    content,
    selectors: 'audio',
    assocAttrs: ['autoplay'],
    isInvalid: ($elem: any, attrs?: string[]) => attrs ? hasAttribute($elem, attrs) : false,
    warningMessage: 'Audio should not play automatically. Some of your users will have problems focusing and unexpected sounds can distract them further.'
  });
}
