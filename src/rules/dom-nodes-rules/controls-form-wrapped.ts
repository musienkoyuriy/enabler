import DOMNodesValidator from '../../dom-nodes-validator';

export default function controlsFormWrapped($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: ['input', 'select', 'textarea'],
    isInvalid: (elem: CheerioElement) => {
      const parentForm = $(elem).closest('form, div[role=form]');

      return !parentForm.length;
    },
    warningMessage: (el: any) => {
      const tagName = el.tagName;

      return `<${tagName}> element should be wrapped in <form> or <div role="form">.`;
    }
  });
}
