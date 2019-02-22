import { ValidatorOptions } from './models/validator';
import { Warning } from './models/warnings';
import { getLineNumberByHTMLSegment, isAngular, isVue } from './utils';

function completeAttrsWithFrameworkSpecific(attrs: string[]): string[] {
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

function completeEventsWithFrameworkSpecific(events: string[]): string[] {
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
  isInvalid: (template: any, attrs?: string[], events?: string[]) => boolean;
  selectors: string[] | string;
  $template: any;
  warnings: Warning[];
  warningMessage: string | ((el: any) => string);
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

    let attrs: string[];
    let events: string[];

    if (elements.length) {
      elements.each((i: number, element: any) => {
        if (this.assocAttrs.length) {
          attrs = completeAttrsWithFrameworkSpecific(this.assocAttrs);
        }

        if (this.assocEvents.length) {
          events = completeEventsWithFrameworkSpecific(this.assocEvents);
        }

        if (this.isInvalid(this.$template(element), attrs, events)) {
          this._addWarning(element);
        }
      });
    }
  }

  getWarnings(): {warnings: Warning[]} {
    return {
      warnings: this.warnings
    };
  }

  private _normalizeSelectors(selectors: string | string[]): string {
    // @ts-ignore
    return Array.isArray(this.selectors) ? selectors.join(', ') : selectors;
  }

  private _addWarning(el: any): void {
    const message =
      typeof this.warningMessage === 'function'
        ? this.warningMessage(el)
        : this.warningMessage;

    this.warnings.push({
      message,
      line: getLineNumberByHTMLSegment(el, this.content)
    });
  }
}
