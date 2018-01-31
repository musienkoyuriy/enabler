'use strict';

var headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
var WARNING_MESSAGE = 'There must be no “jumps” or inconsistencies in the heading structure — no sudden change from an <h1> to an <h3> without an intervening <h2>, for example.';

function headingValidate($) {
  var headSelector;
  var headQuery;
  var headingLevel;
  var nextHeader;

  for(var i=0; i < headingTags.length; i++) {
    headSelector = headingTags[i];
    headQuery = $(headSelector);
    
    if (!headQuery.length) continue;
    else {
      headingLevel = Number(headSelector[1]);
      nextHeader = headQuery.next(':header');

      if (nextHeader.length) {
        if (isDiffersByMoreThanLevel(headingLevel, nextHeader)) {
          return {
            isValid: false,
            message: WARNING_MESSAGE
          };
        } else continue;
      }
    }
  }

  return {
    isValid: true
  }
}

function isDiffersByMoreThanLevel(headingLevel, nextHeader) {
  var nextHeadingLevel = Number(nextHeader[0].name[1]);

  return Math.abs(headingLevel - nextHeadingLevel) > 1;
}

module.exports = headingValidate;
