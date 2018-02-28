'use strict';

function getLineNumberByHTMLSegment(content, querySegment) {
  const start = querySegment.get(0).startIndex;
  const lineNumber = content.substr(0, start).split('\n').length;

  return lineNumber;
}

module.exports = {
  getLineNumberByHTMLSegment: getLineNumberByHTMLSegment
}
