const { getLineNumberByHTMLSegment } = require('./utils');

class Validator {
  constructor(options) {
    this.warnings = [];

    this.$template = options.$template;
    this.selectors = options.selectors;
    this.isInvalid = options.isInvalid;
    this.warningMessage = options.warningMessage;
    this.content = options.content;

    const selectors = this._normalizeSelectors(this.selectors);
    const elements = this.$template(selectors);
    const that = this;
    let element;

    if (elements.length) {
      elements.each(function() {
        element = that.$template(this);

        if (that.isInvalid(element)) {
          that._addWarning(element);
        }
      });
    }

    return {
      warnings: this.warnings
    };
  }

  _normalizeSelectors(selectors) {
    return Array.isArray(this.selectors) ? selectors.join(',') : selectors;
  }

  _addWarning(el) {
    let warningMessage;

    if (typeof this.warningMessage === 'function') {
      warningMessage = this.warningMessage(el);
    } else {
      warningMessage = this.warningMessage;
    }

    this.warnings.push({
      message: warningMessage,
      line: getLineNumberByHTMLSegment(el, this.content)
    });
  }
}

module.exports = Validator;