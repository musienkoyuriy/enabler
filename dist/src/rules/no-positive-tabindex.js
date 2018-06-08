"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
var utils_1 = require("../utils");
function noPositiveTabindex($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: '*',
        assocAttrs: ['tabindex'],
        isInvalid: function ($elem, attrs) {
            var tabIndex = utils_1.getAttrValue($elem, attrs);
            tabIndex = tabIndex ? Number(tabIndex) : 0;
            return tabIndex > 0;
        },
        warningMessage: 'Avoid positive tabindex.'
    });
}
exports.default = noPositiveTabindex;
//# sourceMappingURL=no-positive-tabindex.js.map