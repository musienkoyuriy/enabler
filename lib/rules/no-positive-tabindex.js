"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var validator_1 = require("../validator");
function noPositiveTabindex($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: '*',
        assocAttrs: ['tabindex'],
        isInvalid: function ($elem, attrs) {
            var tabIndex = attrs ? utils_1.getAttrValue($elem, attrs) : '';
            return Number(tabIndex) > 0;
        },
        warningMessage: 'Avoid positive tabindex.'
    });
}
exports.default = noPositiveTabindex;
//# sourceMappingURL=no-positive-tabindex.js.map