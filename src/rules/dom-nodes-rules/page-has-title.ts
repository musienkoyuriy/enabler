import DOMNodesValidator from '../../dom-nodes-validator';

export default function pageHasTitle($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selector: 'html head',
    isInvalid: (elem: CheerioElement) => {
      const hasHead = $(elem).length > 0;
      const title = $(elem).children('title');
      const hasNoTitle = (hasHead && !title.length) || (hasHead && !title.text());

      return hasNoTitle;
    },
    warningMessage: 'Page should have a title.'
  });
}
