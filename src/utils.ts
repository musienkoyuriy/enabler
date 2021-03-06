import { FILE_EXTENSIONS_LIST } from './constants';

const ecranizeForRegexp = (strToEcranize: string): string =>
  strToEcranize.replace(/-/g, '\\-');

export const maybePluralize = (count: number, noun: string): string =>
  `${count} ${noun}${count !== 1 ? 's' : ''}`;

export function getLineNumberByHTMLSegment(
  $elem: any,
  template: string
): number {
  const start = $elem.startIndex;
  const lineNumber = template.substr(0, start).split('\n').length;

  return lineNumber;
}

export const getDuplicates = (list: any[]): string[] => {
  return list.reduce((acc, el, i, arr) => {
    if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) {
      acc.push(el);
    }
    return acc;
  }, []);
};

export const getExtension = (fileName: string): string => {
  return fileName.slice(
    (Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1
  );
};

export const isPathAFile = (path: string): boolean => {
  return Object.keys(FILE_EXTENSIONS_LIST).includes(getExtension(path.toLowerCase()));
};

export function getDuplicateAttributes($elem: any, content: string) {
  const dom = $elem.get(0);
  const start = dom.startIndex;
  const end = dom.children.length
    ? dom.children[0].startIndex
    : dom.endIndex + 1;
  const html = content.slice(start, end);

  return Object.keys(dom.attribs)
    .map(attr => {
      let regexp;
      const attrForRegexp = ecranizeForRegexp(attr);

      try {
        regexp = new RegExp(`\\s${attrForRegexp}="(.*?)"`, 'gi');
      } catch (ex) {
        console.log(ex);
        console.log(html);
      }
      const matched = html.match(regexp as any);

      return matched !== null && matched.length > 1 ? attr : null;
    })
    .filter(Boolean);
}

export function hasAttribute($elem: any, attrs: string[]): boolean {
  console.log($elem.attr());
  return attrs.some((attr: string) => attr in $elem.attr());
}

export function hasNonEmptyAttribute($elem: any, attrs: string[]): boolean {
  return attrs.some((attr: string) => {
    const attrValue = $elem.attr(attr) || '';
    return attr in $elem.attr() && attrValue.trim() !== '';
  });
}

export function getAttrValue($elem: any, attrs: string[]): string {
  const filledAttrs = attrs.filter(attr => $elem.attr(attr));
  const attrValue = $elem.attr(filledAttrs[0]) || '';

  return filledAttrs.length ? attrValue : '';
}
