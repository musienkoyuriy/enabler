class Validator {
  constructor(options) {
    this.query = options.query;
    this.selectors = options.selectors;
    this.validateFn = options.validateFn;
    this.warningMessage = options.query;
  }

}

module.exports = Validator;