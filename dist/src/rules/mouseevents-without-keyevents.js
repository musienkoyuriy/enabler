"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
function mouseEventsWithoutKeyEvents($, content) {
    return new validator_1.default({
        $template: $,
        content: content,
        selectors: '*',
        assocEvents: ['mouseover', 'mouseout', 'focus', 'blur'],
        isInvalid: function ($elem, attrs, events) {
            var mouseEvents = events.filter(function (attr) { return /mouse/gi.test(attr); });
            var blurAndFocusEvents = events.filter(function (attr) { return /blur|focus/gi.test(attr); });
            var eventPairs = mouseEvents.map(function (mouseEvent) {
                return {
                    mouse: mouseEvent
                };
            });
            blurAndFocusEvents.forEach(function (event, i) {
                eventPairs[i].keyboard = event;
            });
            return eventPairs
                .filter(function (eventPair) {
                return $elem.attr(eventPair.mouse) && !$elem.attr(eventPair.keyboard);
            }).length;
        },
        warningMessage: 'Elements with mouse events should have an appropriate keyboard events (mouseover -> focus).'
    });
}
exports.default = mouseEventsWithoutKeyEvents;
//# sourceMappingURL=mouseevents-without-keyevents.js.map