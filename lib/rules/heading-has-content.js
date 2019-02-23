"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
function headingHasContent($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        isInvalid: function ($elem) { return !$elem.text(); },
        warningMessage: 'Heading tags should contains a text.'
    });
}
exports.default = headingHasContent;
//# sourceMappingURL=heading-has-content.js.map