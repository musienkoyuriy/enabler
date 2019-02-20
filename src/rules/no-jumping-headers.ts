import Validator from '../validator';

function isDiffersByMoreThanLevel(headingLevel: number, nextHeader: any): boolean {
  const nextHeadingLevel = Number(nextHeader[0].name[1]);

  return Math.abs(headingLevel - nextHeadingLevel) > 1;
}

export default function noJumpingHeaders($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    isInvalid: ($elem: any) => {
      const headName = $elem[0].name;
      const headingLevel = Number(headName[1]);
      const nextHeader = $elem.next(':header');

      return nextHeader.length && isDiffersByMoreThanLevel(headingLevel, nextHeader);
    },
    warningMessage: 'There must be no “jumps” or inconsistencies in the heading structure — no sudden change from an <h1> to an <h3> without an intervening <h2>, for example.'
  });
}
