'use strict';

const Validator = require('../validator');

function jumpingHeaders($, content) {
  return new Validator({
    $template: $,
    content: content,
    selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    isInvalid: function(selector) {
      const headName = selector[0].name;
      const headingLevel = Number(headName[1]);
      const nextHeader = selector.next(':header');
      

      return nextHeader.length && isDiffersByMoreThanLevel(headingLevel, nextHeader);
    },
    warningMessage: 'There must be no “jumps” or inconsistencies in the heading structure — no sudden change from an <h1> to an <h3> without an intervening <h2>, for example.'
  });
}

function isDiffersByMoreThanLevel(headingLevel, nextHeader) {
  const nextHeadingLevel = Number(nextHeader[0].name[1]);

  return Math.abs(headingLevel - nextHeadingLevel) > 1;
}

module.exports = jumpingHeaders;
