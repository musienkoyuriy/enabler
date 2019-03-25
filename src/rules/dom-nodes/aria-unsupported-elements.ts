import DOMNodesValidator from '../../dom-nodes-validator';

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

export default function ariaUnsupportedElements($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selector: [
      'meta',
      'html',
      'script',
      'style'
    ],
    assocAttrs: ariaAttributes,
    isInvalid: (elem: CheerioElement, attrs?: string[]) => {
      const attributes = $(elem).attr();

      return attrs ? attrs.some(attr => attr in attributes) : false;
    },
    warningMessage: 'Hidden elements shouldn\'t contains aria- attributes.'
  });
}
