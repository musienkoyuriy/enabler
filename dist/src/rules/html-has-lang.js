"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
var utils_1 = require("../utils");
function htmlHasLang($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: 'html',
        assocAttrs: ['lang'],
        isInvalid: function ($elem, attrs) {
            return !utils_1.hasAttribute($elem, attrs);
        },
        warningMessage: '<html> tag should have "lang" attribute.'
    });
}
exports.default = htmlHasLang;
//# sourceMappingURL=html-has-lang.js.map