import Validator from '../validator';

export default function controlsFormWrapped($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: ['input', 'select', 'textarea'],
    isInvalid: ($elem: Cheerio) => {
      const parentForm = $elem.closest('form, div[role=form]');

      console.log($elem);

      return !parentForm.length;
    },
    warningMessage: (el: any) => {
      const tagName = el.tagName;

      console.log(el.name);

      return `<${tagName}> element should be wrapped in <form> or <div role="form">.`;
    }
  });
}
