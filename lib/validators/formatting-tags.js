'use strict';

var formattingTags = [
  'align', 'alink', 'background', 
  'basefont', 'bgcolor', 'border',
  'color', 'link', 'text',
  'vlink', 'height', 'basefont',
  'blink', 'center', 'font', 
  'marquee', 's', 'strike',
  'tt', 'u'
];
var WARNING_MESSAGE = 'HTML tags and attributes designed exclusively for formatting should not be used. ';

function formattingTagsValidate($) {
  var tagQuery;

  for(var i = 0; i < formattingTags.length; i++) {
    tagQuery = $(formattingTags[i]);

    if (!tagQuery.length) continue;
    else {
      return {
        isValid: false,
        message: WARNING_MESSAGE + 'Use CSS rules instead of <' + tagQuery[0].name + '> tag.'
      }
    }
  }

  return {
    isValid: true
  }
}

module.exports = formattingTagsValidate;