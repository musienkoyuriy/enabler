import DOMNodesValidator from '../../dom-nodes-validator';
import { RuleData } from './../../models/rule';

export default function controlsFormWrapped($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: ['input', 'select', 'textarea'],
    isInvalid: (rule: RuleData) => {
      const { elem } = rule;
      const parentForm = $(elem).closest('form, div[role=form]');

      return !parentForm.length;
    },
    warningMessage: (el: CheerioElement) => {
      const tagName = el.tagName;

      return `<${tagName}> element should be wrapped in <form> or <div role="form">.`;
    }
  });
}
