import Validator from '../validator';

export default function noFormattingTags($: any,content: string) {
  return new Validator({
    $template: $,
    content,
    selectors: [
      'align', 'alink', 'background',
      'basefont', 'bgcolor', 'border',
      'color', 'text', 'vlink',
      'height', 'basefont',
      'blink', 'center', 'font',
      'marquee', 's', 'strike',
      'tt', 'u'
    ],
    isInvalid: (selector: string) => selector,
    warningMessage: (el: any) => {
      const tagName = el.name;

      return `HTML tags and attributes designed exclusively for formatting should not be used. Use CSS rules instead of <${tagName}> tag.`;
    }
  });
}
