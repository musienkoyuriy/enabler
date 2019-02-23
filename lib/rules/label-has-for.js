"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var validator_1 = require("../validator");
function labelHasFor($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: 'label',
        assocAttrs: ['for'],
        isInvalid: function ($elem, attrs) { return attrs ? !utils_1.hasAttribute($elem, attrs) : false; },
        warningMessage: '"for" attribute is missing in "label".'
    });
}
exports.default = labelHasFor;
//# sourceMappingURL=label-has-for.js.map