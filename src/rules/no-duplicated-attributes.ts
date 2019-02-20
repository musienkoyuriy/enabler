import { getDuplicateAttributes } from '../utils';
import Validator from '../validator';

export default function noDuplicatedAttributes($: any,content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    isInvalid: ($elem: any) => {
      const duplicatedAttrs = getDuplicateAttributes($elem, content);

      return Boolean(duplicatedAttrs.length);
    },
    warningMessage: 'Element should not have duplicated attributes.'
  });
}
