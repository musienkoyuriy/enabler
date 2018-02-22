'use strict';

let regexpByLine;

function getLineNumberByHTMLSegment($, content, querySegment) {
  const querySegment = $.html(querySegment);
  const linesList = content.split('\n');
  let lineNumber;

  regexpByLine = new RegExp(`\^${querySegment}\$`);

  try {
    lineNumber = linesList
      .map(_mapLineWithLineNumber)
      .find(_isLineMatches)
      .lineNumber;
  } catch(err) {
    lineNumber = null;
    console.error(err);
  }

  return lineNumber;
}

function _mapLineWithLineNumber(line, index) {
  return {
    line: line,
    lineNumber: index
  };
}

function _isLineMatches(mappedLinewWithNumber) {
  return regexpByLine.test(mappedLinewWithNumber.line);
}

module.exports = {
  getLineNumberByHTMLSegment: getLineNumberByHTMLSegment
}
