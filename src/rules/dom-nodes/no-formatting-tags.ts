import DOMNodesValidator from '../../validator';

export default function noFormattingTags($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
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
    isInvalid: (elem: CheerioElement) => $(elem).length > 0,
    warningMessage: (el: any) => {
      const tagName = el.name;

      return `HTML tags and attributes designed exclusively for formatting should not be used. Use CSS rules instead of <${tagName}> tag.`;
    }
  });
}
