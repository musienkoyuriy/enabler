import DOMNodesValidator from '../../dom-nodes-validator';
import { RuleData } from './../../models/rule';

export default function videoHasSubtitles($: any): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: 'video',
    isInvalid: (rule: RuleData) => $(rule.elem).find('track').length === 0,
    warningMessage: 'Specify a <track> element for your video. '
  });
}
