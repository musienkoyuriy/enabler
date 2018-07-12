"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var validator_1 = require("../validator");
function emptyLinksAndButtons($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: ['input[type="submit"]', 'button', 'a'],
        assocAttrs: ['value'],
        isInvalid: function ($elem, attrs) {
            var tagName = $elem[0].name;
            console.log();
            return [
                tagName === 'input' && !utils_1.getAttrValue($elem, attrs),
                tagName === 'button' && !$elem.text(),
                tagName === 'a' && !$elem.html()
            ].some(Boolean);
        },
        warningMessage: function (el) {
            var tagName = el.name;
            var message = tagName === 'input' ?
                '"Value" attribute should not be empty in "input" tag' :
                "Text should contains in \"" + tagName + "\" tag.";
            return message;
        }
    });
}
exports.default = emptyLinksAndButtons;
//# sourceMappingURL=no-empty-links-and-buttons.js.map