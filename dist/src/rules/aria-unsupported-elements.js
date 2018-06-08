"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
var ariaAttributes = [
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
function ariaUnsupportedElements($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: [
            'meta',
            'html',
            'script',
            'style'
        ],
        assocAttrs: ariaAttributes,
        isInvalid: function ($elem, attrs) {
            var attributes = $elem.attr();
            return attrs.some(function (attr) { return attr in attributes; });
        },
        warningMessage: 'Hidden elements shouldn\'t contains aria- attributes.'
    });
}
exports.default = ariaUnsupportedElements;
//# sourceMappingURL=aria-unsupported-elements.js.map