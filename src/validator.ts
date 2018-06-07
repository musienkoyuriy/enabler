import { ValidatorOptions, Warning } from './models';
import { getLineNumberByHTMLSegment, isAngular, isVue } from './utils';

function completeAttrsWithFrameworkSpecific(attrs: string[]) {
  if (isAngular()) {
    const additionalAttrs = attrs.map(attr => `[${attr}]`);
    const additionalAttrsFullSign = attrs.map(attr => `bind-${attr}`);

    return [
      ...attrs,
      ...additionalAttrs,
      ...additionalAttrsFullSign
    ];
  }

  if (isVue()) {
    const additionalAttrs = attrs.map(attr => `:${attr}`);
    const additionalAttrsWithBind = attrs.map(attr => `v-bind:${attr}`);

    return [
      ...attrs,
      ...additionalAttrs,
      ...additionalAttrsWithBind
    ];
  }

  return attrs;
}

function completeEventsWithFrameworkSpecific(events: string[]) {
  const nativeEventBindings = events.map(event => `on${event}`);

  if (isAngular()) {
    const additionalEvents = events.map(event => `(${event})`);
    const additionalEventsFullSign = events.map(event => `on-${event}`);

    return [
      ...nativeEventBindings,
      ...additionalEvents,
      ...additionalEventsFullSign
    ];
  }

  if (isVue()) {
    const additionalEventsViaAt = events.map(event => `@${event}`);
    const additionalEventsViaBind = events.map(event => `v-on:${event}`);

    return [
      ...nativeEventBindings,
      ...additionalEventsViaAt,
      ...additionalEventsViaBind
    ];
  }

  return nativeEventBindings;
}

export default class Validator implements ValidatorOptions {
  isInvalid: Function;
  selectors: string[] | string;
  $template: any;
  warnings: Warning[];
  warningMessage: string | Function;
  content: string;
  assocAttrs: string[];
  assocEvents: string[];

  constructor(options: ValidatorOptions) {
    this.warnings = [];

    this.$template = options.$template;
    this.selectors = options.selectors;
    this.isInvalid = options.isInvalid;
    this.warningMessage = options.warningMessage;
    this.content = options.content || '';
    this.assocAttrs = options.assocAttrs || [];
    this.assocEvents = options.assocEvents || [];

    const selectors = this._normalizeSelectors(this.selectors);
    const elements = this.$template(selectors);
    const that = this;

    let element: any;
    let attrs: string[];
    let events: string[];

    if (elements.length) {
      elements.each(() => {
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
  }

  _normalizeSelectors(selectors: string | string[]): string {
    // @ts-ignore
    return Array.isArray(this.selectors) ? selectors.join(',') : selectors;
  }

  _addWarning(el: any): void {
    const message =
      typeof this.warningMessage === 'function'
        ? this.warningMessage(el)
        : this.warningMessage;

    this.warnings.push({
      message,
      line: getLineNumberByHTMLSegment(el, this.content)
    });
  }

  getWarnings(): {warnings: Warning[]} {
    return {
      warnings: this.warnings
    };
  }
}
