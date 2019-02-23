"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
function noFormattingTags($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: [
            'align', 'alink', 'background',
            'basefont', 'bgcolor', 'border',
            'color', 'text', 'vlink',
            'height', 'basefont',
            'blink', 'center', 'font',
            'marquee', 's', 'strike',
            'tt', 'u'
        ],
        isInvalid: function ($elem) { return $elem.length > 0; },
        warningMessage: function (el) {
            var tagName = el.name;
            return "HTML tags and attributes designed exclusively for formatting should not be used. Use CSS rules instead of <" + tagName + "> tag.";
        }
    });
}
exports.default = noFormattingTags;
//# sourceMappingURL=no-formatting-tags.js.map