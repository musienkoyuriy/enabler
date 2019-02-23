"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var validator_1 = require("../validator");
function hasAlt($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: ['img', 'area'],
        assocAttrs: ['alt'],
        isInvalid: function ($elem, attrs) {
            return attrs ? !utils_1.hasAttribute($elem, attrs) : false;
        },
        warningMessage: function (el) {
            var tagName = el.name;
            var purpose = tagName === 'img' ? 'image map' : 'link';
            var message = "The alt attribute of the <" + tagName + " /> tag must state the purpose of the " + purpose + ".";
            return message;
        }
    });
}
exports.default = hasAlt;
//# sourceMappingURL=has-alt.js.map