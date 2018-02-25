'use strict';

const jumpingHeaders = require('./jumping-headers');
const formattingTags = require('./formatting-tags');
const alt = require('./alt');
const empty = require('./empty-links-and-buttons');
const placeholderWithoutLabel = require('./placeholder-without-label');
const htmlLangAttribute = require('./html-lang');
const mouseEventsWithoutKeyEvents = require('./mouseevents-without-keyevents');

module.exports = {
  jumpingHeaders: jumpingHeaders,
  formattingTags: formattingTags,
  alt: alt,
  empty: empty,
  placeholderWithoutLabel: placeholderWithoutLabel,
  htmlLangAttribute: htmlLangAttribute,
  mouseEventsWithoutKeyEvents: mouseEventsWithoutKeyEvents
}
