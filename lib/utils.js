'use strict';

let regexpByLine;

function getLineNumberByHTMLSegment($, content, querySegment) {
  const linesList = content.split('\n');
  let line;
  let lineNumber;

  querySegment = $.html(querySegment);
  
  regexpByLine = new RegExp('\^' + querySegment + '\$');

  try {
    line = linesList
      .map(_mapLineWithLineNumber)
      .find(_isLineMatches);

    // TODO: Fix getting line number
    if (line) {
      lineNumber = line.lineNumber;
    }

    
  } catch(err) {
    lineNumber = null;
    console.error(err);
  }

  return lineNumber;
}

function _mapLineWithLineNumber(line, index) {
  return {
    line: line,
    lineNumber: index + 1
  };
}

function _isLineMatches(mappedLinewWithNumber) {
  return regexpByLine.test(mappedLinewWithNumber.line);
}

module.exports = {
  getLineNumberByHTMLSegment: getLineNumberByHTMLSegment
}
