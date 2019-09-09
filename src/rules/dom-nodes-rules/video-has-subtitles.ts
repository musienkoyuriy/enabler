import DOMNodesValidator from '../../dom-nodes-validator';

export default function videoHasSubtitles($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'video',
    isInvalid: (elem: CheerioElement) => $(elem).find('track').length === 0,
    warningMessage: 'Specify a <track> element for your video. '
  });
}
