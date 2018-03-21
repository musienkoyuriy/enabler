const Validator = require('../validator');

function headingHasContent($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    isInvalid: selector => !selector.text(),
    warningMessage: 'Heading tags should contains a text.',
  });
}

module.exports = headingHasContent;
