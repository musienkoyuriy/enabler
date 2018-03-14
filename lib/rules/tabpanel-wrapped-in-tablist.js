const Validator = require('../validator');

function tabpanelWrappedInTablist($, content, options) {
  return new Validator({
    $template: $,
    content,
    selectors: '[role="tabpanel"]',
    isInvalid: (selector) => {
      const parentTablist = selector.closest('[role=tablist]');

      return !parentTablist.length;
    },
    warningMessage: 'Elements with role="tabpanel" should be wrapped in role="tablist"',
  });
}

module.exports = tabpanelWrappedInTablist;
