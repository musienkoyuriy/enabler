"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var validator_1 = require("../validator");
function noAudioAutoplay($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: 'audio',
        assocAttrs: ['autoplay'],
        isInvalid: function ($elem, attrs) { return utils_1.hasAttribute($elem, attrs); },
        warningMessage: 'Audio should not play automatically. Some of your users will have problems focusing and unexpected sounds can distract them further.'
    });
}
exports.default = noAudioAutoplay;
//# sourceMappingURL=no-audio-autoplay.js.map