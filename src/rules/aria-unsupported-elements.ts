import Validator from '../validator';

const ariaAttributes = [
  'aria-autocomplete',
  'aria-checked',
  'aria-current',
  'aria-disabled',
  'aria-expanded',
  'aria-haspopup',
  'aria-hidden',
  'aria-invalid',
  'aria-label',
  'aria-level',
  'aria-multiline',
  'aria-multiselectable',
  'aria-orientation',
  'aria-pressed',
  'aria-readonly',
  'aria-required',
  'aria-selected',
  'aria-sort',
  'aria-live',
  'aria-relevant',
  'aria-atomic',
  'aria-busy',
  'aria-dropeffect',
  'aria-dragged',
  'aria-activedescendant',
  'aria-controls',
  'aria-describedby',
  'aria-flowto',
  'aria-labelledby',
  'aria-owns',
  'aria-posinset',
  'aria-setsize'
];

export default function ariaUnsupportedElements($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: [
      'meta',
      'html',
      'script',
      'style'
    ],
    assocAttrs: ariaAttributes,
    isInvalid: ($elem: any, attrs?: string[]) => {
      const attributes = $elem.attr();

      return attrs ? attrs.some(attr => attr in attributes) : false;
    },
    warningMessage: 'Hidden elements shouldn\'t contains aria- attributes.'
  });
}
