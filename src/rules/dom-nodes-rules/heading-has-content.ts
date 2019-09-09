import DOMNodesValidator from '../../dom-nodes-validator';

export default function headingHasContent($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: [':header'],
    isInvalid: (elem: CheerioElement) => !$(elem).text(),
    warningMessage: 'Heading tags should contains a text.'
  });
}
