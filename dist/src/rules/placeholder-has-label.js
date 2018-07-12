"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var validator_1 = require("../validator");
function placeholderHasLabel($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: ['input[type=text]', 'textarea'],
        assocAttrs: ['id', 'placeholder'],
        isInvalid: function ($elem, attrs) {
            var placeholderAttrs = attrs.filter(function (attr) { return /placeholder/gi.test(attr); });
            var idAttrs = attrs.filter(function (attr) { return /id/gi.test(attr); });
            var inputsId = utils_1.getAttrValue($elem, idAttrs);
            var placeholder = utils_1.getAttrValue($elem, placeholderAttrs);
            var relatedLabel = $("label[for=\"" + inputsId + "\"]");
            return !relatedLabel.length && placeholder;
        },
        warningMessage: 'Placeholders in inputs and textareas should be used in addition to a label, not as a replacement.'
    });
}
exports.default = placeholderHasLabel;
//# sourceMappingURL=placeholder-has-label.js.map