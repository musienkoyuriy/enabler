import Validator from '../validator';

export default function tabElementsHasRightRoles($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: [
      '[role="tabpanel"]',
      '[role="tablist"]',
      '[role="tab"]'
    ],
    isInvalid: ($elem: any) => {
      const role = $elem.attr('role');
      const isChildrenTabElement = role === 'tab' || role === 'tabpanel';
      const hasParentTablist = $elem.closest('[role=tablist]').length;
      const hasChildrenTabElements = $elem.find('[role="tab"], [role="tabpanel"]').length;

      return (isChildrenTabElement && !hasParentTablist) ||
              (!isChildrenTabElement && !hasChildrenTabElements);
    },
    warningMessage: (el: any) => {
      const role = el.attribs.role;

      return role === 'tablist' ?
        'Elements with role="tablist" should should have elements with role="tabpanel" and role="tab".' :
        'Elements with role="tabpanel" or role="tab" should be wrapped in role="tablist".';
    }
  });
}
