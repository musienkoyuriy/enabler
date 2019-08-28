import DOMNodesValidator from '../../dom-nodes-validator';

export default function videoHasSubtitles($: any, content: string): DOMNodesValidator {
  return new DOMNodesValidator({
    $template: $,
    content,
    selector: 'video',
    isInvalid: (elem: CheerioElement) => $(elem).find('track').length === 0,
    warningMessage: 'Specify a <track> element for your video. '
  });
}
