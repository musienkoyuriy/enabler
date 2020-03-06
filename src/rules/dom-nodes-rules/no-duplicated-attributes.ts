import DOMNodesValidator from '../../dom-nodes-validator';
// import { getDuplicateAttributes } from '../../utils';

// @ts-ignore
export default function noDuplicatedAttributes(): DOMNodesValidator {
  return new DOMNodesValidator({
    selector: '*',
    // @ts-ignore
    isInvalid: () => {
      // isInvalid: (elem: CheerioElement) => {
      // TODO: revert functionality below. Need refactoring

      // const duplicatedAttrs = getDuplicateAttributes($(elem), content);
      return false;
      // return Boolean(duplicatedAttrs.length);
    },
    warningMessage: 'Element should not have duplicated attributes.'
  });
}
