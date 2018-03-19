const Validator = require('../validator');

function controlsFormWrapped($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: ['input', 'select', 'textarea'],
    isInvalid: ($elem) => {
      const parentForm = $elem.closest('form, div[role=form]');

      return !parentForm.length;
    },
    warningMessage: (el) => {
      const tagName = el[0].name;

      return `<${tagName}> element should be wrapped in <form> or <div role="form">.`;
    },
  });
}

module.exports = controlsFormWrapped;
