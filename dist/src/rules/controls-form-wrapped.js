"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
function controlsFormWrapped($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: ['input', 'select', 'textarea'],
        isInvalid: function ($elem) {
            var parentForm = $elem.closest('form, div[role=form]');
            return !parentForm.length;
        },
        warningMessage: function (el) {
            var tagName = el.name;
            return "<" + tagName + "> element should be wrapped in <form> or <div role=\"form\">.";
        }
    });
}
exports.default = controlsFormWrapped;
//# sourceMappingURL=controls-form-wrapped.js.map