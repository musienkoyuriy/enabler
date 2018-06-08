"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
function isDiffersByMoreThanLevel(headingLevel, nextHeader) {
    var nextHeadingLevel = Number(nextHeader[0].name[1]);
    return Math.abs(headingLevel - nextHeadingLevel) > 1;
}
function noJumpingHeaders($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        isInvalid: function ($elem) {
            var headName = $elem[0].name;
            var headingLevel = Number(headName[1]);
            var nextHeader = $elem.next(':header');
            return nextHeader.length && isDiffersByMoreThanLevel(headingLevel, nextHeader);
        },
        warningMessage: 'There must be no “jumps” or inconsistencies in the heading structure — no sudden change from an <h1> to an <h3> without an intervening <h2>, for example.'
    });
}
exports.default = noJumpingHeaders;
//# sourceMappingURL=no-jumping-headers.js.map