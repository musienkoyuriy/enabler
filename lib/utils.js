'use strict';

function getLineNumberByHTMLSegment($elem, content) {
  const start = $elem.get(0).startIndex;
  const lineNumber = content.substr(0, start).split('\n').length;

  return lineNumber;
}

function getDuplicateAttributes ($elem, content) {
  var dom = $elem.get(0);
  var start = dom.startIndex;
  var end = dom.children.length ? dom.children[0].startIndex : dom.endIndex + 1;

  var html = content.slice(start, end);

  return Object.keys(dom.attribs)
    .map(function (attr) {
      const regexp = new RegExp(`\\s${attr}="(.*?)"`, 'gi');
      const matched = html.match(regexp);

      return matched !== null && matched.length > 1 ? attr : null;
    })
    .filter(Boolean);
}

module.exports = {
  getLineNumberByHTMLSegment: getLineNumberByHTMLSegment,
  getDuplicateAttributes: getDuplicateAttributes
}
