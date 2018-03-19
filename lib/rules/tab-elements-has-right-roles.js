const Validator = require('../validator');

function tabElementsHasRightRoles($, content) {
  return new Validator({
    $template: $,
    content,
    selectors: [
      '[role="tabpanel"]',
      '[role="tablist"]',
      '[role="tab"]',
    ],
    isInvalid: (selector) => {
      const role = selector.attr('role');
      const isChildrenTabElement = role === 'tab' || role === 'tabpanel';
      const hasParentTablist = selector.closest('[role=tablist]').length;
      const hasChildrenTabElements = selector.find('[role="tab"], [role="tabpanel"]').length;

      return (isChildrenTabElement && !hasParentTablist) ||
              (!isChildrenTabElement && !hasChildrenTabElements);
    },
    warningMessage: (el) => {
      const role = el.attr('role');

      return role === 'tablist' ?
        'Elements with role="tablist" should should have elements with role="tabpanel" and role="tab"' :
        'Elements with role="tabpanel" or role="tab" should be wrapped in role="tablist"';
    },
  });
}

module.exports = tabElementsHasRightRoles;
