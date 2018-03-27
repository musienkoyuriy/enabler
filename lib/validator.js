const { getLineNumberByHTMLSegment, isAngular, isVue } = require('./utils');

function completeAttrsWithFrameworkSpecific(attrs) {
  if (isAngular()) {
    const additionalAttrs = attrs.map(attr => `[${attr}]`);

    return [
      ...attrs,
      ...additionalAttrs,
    ];
  }

  if (isVue()) {
    const additionalAttrs = attrs.map(attr => `:${attr}`);
    const additionalAttrsWithBind = attrs.map(attr => `v-bind:${attr}`);

    return [
      ...attrs,
      ...additionalAttrs,
      ...additionalAttrsWithBind,
    ];
  }

  return attrs;
}

function completeEventsWithFrameworkSpecific(events) {
  const nativeEventBindings = events.map(event => `on${event}`);


  if (isAngular()) {
    const additionalEvents = events.map(event => `(${event})`);

    return [
      ...nativeEventBindings,
      ...additionalEvents,
    ];
  }

  if (isVue()) {
    const additionalEventsViaAt = events.map(event => `@${event}`);
    const additionalEventsViaBind = events.map(event => `v-on:${event}`);

    return [
      ...nativeEventBindings,
      ...additionalEventsViaAt,
      ...additionalEventsViaBind,
    ];
  }

  return nativeEventBindings;
}

class Validator {
  constructor(options) {
    this.warnings = [];

    this.$template = options.$template;
    this.selectors = options.selectors || [];
    this.isInvalid = options.isInvalid || function isInvalid() { return true; };
    this.warningMessage = options.warningMessage || '';
    this.content = options.content || '';
    this.assocAttrs = options.assocAttrs || [];
    this.assocEvents = options.assocEvents || [];

    const selectors = this._normalizeSelectors(this.selectors);
    const elements = this.$template(selectors);
    const that = this;

    let element;
    let attrs;
    let events;

    if (elements.length) {
      elements.each(function addWarn() {
        element = that.$template(this);

        if (that.assocAttrs.length) {
          attrs = completeAttrsWithFrameworkSpecific(that.assocAttrs);
        }

        if (that.assocEvents.length) {
          events = completeEventsWithFrameworkSpecific(that.assocEvents);
        }

        if (that.isInvalid(element, attrs, events)) {
          that._addWarning(element);
        }
      });
    }

    return {
      warnings: this.warnings,
    };
  }

  _normalizeSelectors(selectors) {
    return Array.isArray(this.selectors) ? selectors.join(',') : selectors;
  }

  _addWarning(el) {
    const message = typeof this.warningMessage === 'function' ?
      this.warningMessage(el) :
      this.warningMessage;

    this.warnings.push({
      message,
      line: getLineNumberByHTMLSegment(el, this.content),
    });
  }
}

module.exports = Validator;
