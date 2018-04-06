const Validator = require('../validator');

function pageHasTitle($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: 'html head',
    isInvalid: ($elem) => {
      const hasHead = $elem.length;
      const title = $elem.children('title');
      const hasNoTitle = (hasHead && !title.length) || (hasHead && !title.text());

      return hasNoTitle;
    },
    warningMessage: 'Page should have a title.',
  });
}

module.exports = pageHasTitle;
