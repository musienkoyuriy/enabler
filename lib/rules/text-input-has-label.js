"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var validator_1 = require("../validator");
function textInputHasLabel($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: 'input[type="text"]',
        assocAttrs: ['id'],
        isInvalid: function ($elem, attrs) {
            var inputId = attrs ? utils_1.getAttrValue($elem, attrs) : '';
            if (!inputId) {
                return false;
            }
            var associatedLabel = $("label[for=\"" + inputId + "\"]");
            return !associatedLabel.length;
        },
        warningMessage: 'Inputs with "text" type should have a label.'
    });
}
exports.default = textInputHasLabel;
//# sourceMappingURL=text-input-has-label.js.map