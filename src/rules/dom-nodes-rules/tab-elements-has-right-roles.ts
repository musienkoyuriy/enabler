import DOMNodesValidator from '../../dom-nodes-validator';
import { RuleData } from './../../models/rule';

export default function tabElementsHasRightRoles($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: [
      '[role="tabpanel"]',
      '[role="tablist"]',
      '[role="tab"]'
    ],
    isInvalid: (rule: RuleData) => {
      const { elem } = rule;
      const role = $(elem).attr('role');
      const isChildrenTabElement = role === 'tab' || role === 'tabpanel';
      const hasParentTablist = $(elem).closest('[role=tablist]').length;
      const hasChildrenTabElements = $(elem).find('[role="tab"], [role="tabpanel"]').length;

      return (
        (isChildrenTabElement && !hasParentTablist) ||
        (!isChildrenTabElement && !hasChildrenTabElements)
      );
    },
    warningMessage: (el: CheerioElement) => {
      const role = el.attribs.role;

      return role === 'tablist' ?
        'Elements with role="tablist" should have elements with role="tabpanel" and role="tab".' :
        'Elements with role="tabpanel" or role="tab" should be wrapped in role="tablist".';
    }
  });
}
