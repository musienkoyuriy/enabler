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
  var warnings = [];
  var tagsQuery = $(formattingTags.join(', '));
  var tagName;

  if (tagsQuery.length) {
    tagsQuery.each(function() {
      tagName = $(this)[0].name;
      warnings.push({
        message: WARNING_MESSAGE + 'Use CSS rules instead of <' + tagName + '> tag.'
      });
    });
  }

  return {
    warnings: warnings
  };
}

module.exports = formattingTagsValidate;
