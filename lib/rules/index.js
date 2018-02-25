'use strict';

const jumpingHeaders = require('./jumping-headers');
const formattingTags = require('./formatting-tags');
const alt = require('./alt');
const empty = require('./empty-links-and-buttons');
const placeholderWithoutLabel = require('./placeholder-without-label');

module.exports = {
  jumpingHeaders: jumpingHeaders,
  formattingTags: formattingTags,
  alt: alt,
  empty: empty,
  placeholderWithoutLabel: placeholderWithoutLabel
}
