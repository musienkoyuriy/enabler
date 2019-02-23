"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
function clickWithKeyboardEvent($, content, options) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: '*',
        isInvalid: function ($elem) {
            var eventsPairs = [
                {
                    targetEvent: 'onclick',
                    assocEvents: ['onkeyup', 'onkeydown', 'onkeypress']
                }
            ];
            if (options.ng) {
                eventsPairs = eventsPairs.concat([
                    {
                        targetEvent: '(click)',
                        assocEvents: ['(keyup)', '(keydown)', '(keypress)']
                    }
                ]);
            }
            return Boolean(eventsPairs
                .filter(function (eventPair) {
                var targetEvent = eventPair.targetEvent, assocEvents = eventPair.assocEvents;
                var hasAssociatedListener = assocEvents.some(function (eventName) { return Boolean($elem.attr(eventName)); });
                return $elem.attr(targetEvent) && !hasAssociatedListener;
            })
                .length);
        },
        warningMessage: 'Visible, non-interactive elements with click handlers must have at least one keyboard listener.'
    });
}
exports.default = clickWithKeyboardEvent;
//# sourceMappingURL=click-with-key-event.js.map