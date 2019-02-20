import Validator from '../validator';

export default function controlsFormWrapped($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: ['input', 'select', 'textarea'],
    isInvalid: ($elem: any) => {
      const parentForm = $elem.closest('form, div[role=form]');

      return !parentForm.length;
    },
    warningMessage: (el: any) => {
      const tagName = el.name;

      return `<${tagName}> element should be wrapped in <form> or <div role="form">.`;
    }
  });
}
