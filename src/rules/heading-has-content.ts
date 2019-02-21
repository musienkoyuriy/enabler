import Validator from '../validator';

export default function headingHasContent($: any, content: string): Validator {
  return new Validator({
    $template: $,
    content,
    selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    isInvalid: ($elem: Cheerio) => !$elem.text(),
    warningMessage: 'Heading tags should contains a text.'
  });
}
