import DOMNodesValidator from '../../dom-nodes-validator';
import { RuleData } from '../../models/rule';
import { getAttrValue, hasAttribute, isPathAFile } from '../../utils';

export default function downloadLinks($: any): DOMNodesValidator {
    return new DOMNodesValidator({
        selector: 'a',
        assocAttrs: ['href'],
        isInvalid: (rule: RuleData) => {
            const { elem, attrs } = rule;
            const href = attrs ? getAttrValue($(elem), attrs) : '';
            const hrefContainsFilePath = isPathAFile(href.toLowerCase());

            return hrefContainsFilePath && !hasAttribute($(elem), ['download']);
        },
        warningMessage:
            '<a> element should have a "download" attribute if it has a file path in "href"'
    });
}
