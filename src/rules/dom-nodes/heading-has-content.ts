import DOMNodesValidator from '../../dom-nodes-validator';

export default function headingHasContent($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selectors: [':header'],
    isInvalid: (elem: CheerioElement) => !$(elem).text(),
    warningMessage: 'Heading tags should contains a text.'
  });
}
