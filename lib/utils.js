'use strict';

var regexpByLine;

function getLineNumberByHTMLSegment($, content, querySegment) {
  var querySegment = $.html(querySegment);
  regexpByLine = new RegExp('\^' + querySegment + '\$');
  var linesList = content.split('\n');
  var lineNumber;

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
