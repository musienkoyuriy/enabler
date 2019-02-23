"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var validator_1 = require("../validator");
function unclickableWithoutRole($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: '*',
        assocEvents: ['click'],
        // @ts-ignore
        isInvalid: function ($elem, attrs, events) {
            var clickableElements = [
                'a[href]',
                'input[type="submit"]',
                'input[type="image"]',
                'label[for]',
                'select',
                'button'
            ];
            var isClickable = clickableElements.some(function (sel) { return $elem.is(sel); });
            var hasClick = events ? utils_1.hasAttribute($elem, events) : false;
            var hasRoleButton = $elem.is('[role=button]');
            return !isClickable && hasClick && !hasRoleButton;
        },
        warningMessage: 'Unclickable elements with click listener should have a role attribute.'
    });
}
exports.default = unclickableWithoutRole;
//# sourceMappingURL=unclickable-without-role.js.map