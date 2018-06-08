"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
var utils_1 = require("../utils");
function linksHasUrl($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: 'a',
        assocAttrs: ['href'],
        isInvalid: function ($elem, attrs) {
            var href = utils_1.getAttrValue($elem, attrs);
            var hasUrl = href !== '' && href !== '#';
            return !hasUrl;
        },
        warningMessage: 'Specify URL for link.'
    });
}
exports.default = linksHasUrl;
//# sourceMappingURL=links-has-url.js.map