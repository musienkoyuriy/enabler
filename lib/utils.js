'use strict';

function getLineNumberByHTMLSegment($elem, content) {
  const start = $elem.get(0).startIndex;
  const lineNumber = content.substr(0, start).split('\n').length;

  return lineNumber;
}

function getDuplicateAttributes($elem, content) {
  const dom = $elem.get(0);
  const start = dom.startIndex;
  const end = dom.children.length ? dom.children[0].startIndex : dom.endIndex + 1;

  const html = content.slice(start, end);

  return Object.keys(dom.attribs)
    .map(attr => {
      const attrForRegexp = _ecranizeForRegexp(attr);
      const regexp = new RegExp(`\\s${attrForRegexp}="(.*?)"`, 'gi');
      const matched = html.match(regexp);

      return matched !== null && matched.length > 1 ? attr : null;
    })
    .filter(Boolean);
}

function _ecranizeForRegexp(string) {
  return string.replace(/-/g, '\\-');
} 

module.exports = {
  getLineNumberByHTMLSegment: getLineNumberByHTMLSegment,
  getDuplicateAttributes: getDuplicateAttributes
}
