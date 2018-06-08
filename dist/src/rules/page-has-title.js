"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
function pageHasTitle($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: 'html head',
        isInvalid: function ($elem) {
            var hasHead = $elem.length;
            var title = $elem.children('title');
            var hasNoTitle = (hasHead && !title.length) || (hasHead && !title.text());
            return hasNoTitle;
        },
        warningMessage: 'Page should have a title.'
    });
}
exports.default = pageHasTitle;
//# sourceMappingURL=page-has-title.js.map