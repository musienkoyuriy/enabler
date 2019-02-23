"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function completeAttrsWithFrameworkSpecific(attrs) {
    if (utils_1.isAngular()) {
        var additionalAttrs = attrs.map(function (attr) { return "[" + attr + "]"; });
        var additionalAttrsFullSign = attrs.map(function (attr) { return "bind-" + attr; });
        return attrs.concat(additionalAttrs, additionalAttrsFullSign);
    }
    if (utils_1.isVue()) {
        var additionalAttrs = attrs.map(function (attr) { return ":" + attr; });
        var additionalAttrsWithBind = attrs.map(function (attr) { return "v-bind:" + attr; });
        return attrs.concat(additionalAttrs, additionalAttrsWithBind);
    }
    return attrs;
}
function completeEventsWithFrameworkSpecific(events) {
    var nativeEventBindings = events.map(function (event) { return "on" + event; });
    if (utils_1.isAngular()) {
        var additionalEvents = events.map(function (event) { return "(" + event + ")"; });
        var additionalEventsFullSign = events.map(function (event) { return "on-" + event; });
        return nativeEventBindings.concat(additionalEvents, additionalEventsFullSign);
    }
    if (utils_1.isVue()) {
        var additionalEventsViaAt = events.map(function (event) { return "@" + event; });
        var additionalEventsViaBind = events.map(function (event) { return "v-on:" + event; });
        return nativeEventBindings.concat(additionalEventsViaAt, additionalEventsViaBind);
    }
    return nativeEventBindings;
}
var Validator = /** @class */ (function () {
    function Validator(options) {
        var _this = this;
        this.warnings = [];
        this.$template = options.$template;
        this.selectors = options.selectors;
        this.isInvalid = options.isInvalid;
        this.warningMessage = options.warningMessage;
        this.content = options.content || '';
        this.assocAttrs = options.assocAttrs || [];
        this.assocEvents = options.assocEvents || [];
        var selectors = this._normalizeSelectors(this.selectors);
        var elements = this.$template(selectors);
        var attrs;
        var events;
        if (elements.length) {
            // @ts-ignore
            elements.each(function (i, element) {
                if (_this.assocAttrs.length) {
                    attrs = completeAttrsWithFrameworkSpecific(_this.assocAttrs);
                }
                if (_this.assocEvents.length) {
                    events = completeEventsWithFrameworkSpecific(_this.assocEvents);
                }
                if (_this.isInvalid(_this.$template(element), attrs, events)) {
                    _this._addWarning(element);
                }
            });
        }
    }
    Validator.prototype.getWarnings = function () {
        return {
            warnings: this.warnings
        };
    };
    Validator.prototype._normalizeSelectors = function (selectors) {
        // @ts-ignore
        return Array.isArray(this.selectors) ? selectors.join(', ') : selectors;
    };
    Validator.prototype._addWarning = function (el) {
        var message = typeof this.warningMessage === 'function'
            ? this.warningMessage(el)
            : this.warningMessage;
        this.warnings.push({
            message: message,
            line: utils_1.getLineNumberByHTMLSegment(el, this.content)
        });
    };
    return Validator;
}());
exports.default = Validator;
//# sourceMappingURL=validator.js.map