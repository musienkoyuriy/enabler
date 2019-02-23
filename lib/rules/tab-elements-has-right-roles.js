"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
function tabElementsHasRightRoles($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: [
            '[role="tabpanel"]',
            '[role="tablist"]',
            '[role="tab"]'
        ],
        isInvalid: function ($elem) {
            var role = $elem.attr('role');
            var isChildrenTabElement = role === 'tab' || role === 'tabpanel';
            var hasParentTablist = $elem.closest('[role=tablist]').length;
            var hasChildrenTabElements = $elem.find('[role="tab"], [role="tabpanel"]').length;
            return (isChildrenTabElement && !hasParentTablist) ||
                (!isChildrenTabElement && !hasChildrenTabElements);
        },
        warningMessage: function (el) {
            var role = el.attribs.role;
            return role === 'tablist' ?
                'Elements with role="tablist" should should have elements with role="tabpanel" and role="tab".' :
                'Elements with role="tabpanel" or role="tab" should be wrapped in role="tablist".';
        }
    });
}
exports.default = tabElementsHasRightRoles;
//# sourceMappingURL=tab-elements-has-right-roles.js.map