"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aria_unsupported_elements_1 = require("./aria-unsupported-elements");
var click_with_key_event_1 = require("./click-with-key-event");
var controls_form_wrapped_1 = require("./controls-form-wrapped");
var has_alt_1 = require("./has-alt");
var heading_has_content_1 = require("./heading-has-content");
var html_has_lang_1 = require("./html-has-lang");
var label_has_for_1 = require("./label-has-for");
var links_has_url_1 = require("./links-has-url");
var mouseevents_without_keyevents_1 = require("./mouseevents-without-keyevents");
var no_audio_autoplay_1 = require("./no-audio-autoplay");
var no_duplicated_attributes_1 = require("./no-duplicated-attributes");
var no_empty_links_and_buttons_1 = require("./no-empty-links-and-buttons");
var no_formatting_tags_1 = require("./no-formatting-tags");
var no_jumping_headers_1 = require("./no-jumping-headers");
var no_positive_tabindex_1 = require("./no-positive-tabindex");
var page_has_title_1 = require("./page-has-title");
var placeholder_has_label_1 = require("./placeholder-has-label");
var tab_elements_has_right_roles_1 = require("./tab-elements-has-right-roles");
var text_input_has_label_1 = require("./text-input-has-label");
var unclickable_without_role_1 = require("./unclickable-without-role");
exports.default = {
    noJumpingHeaders: no_jumping_headers_1.default,
    noFormattingTags: no_formatting_tags_1.default,
    hasAlt: has_alt_1.default,
    empty: no_empty_links_and_buttons_1.default,
    placeholderHasLabel: placeholder_has_label_1.default,
    htmlHasLang: html_has_lang_1.default,
    mouseEventsWithoutKeyEvents: mouseevents_without_keyevents_1.default,
    headingHasContent: heading_has_content_1.default,
    clickWithKeyboardEvent: click_with_key_event_1.default,
    ariaUnsupportedElements: aria_unsupported_elements_1.default,
    noAudioAutoplay: no_audio_autoplay_1.default,
    pageHasTitle: page_has_title_1.default,
    noDuplicatedAttributes: no_duplicated_attributes_1.default,
    unclickableWithoutRole: unclickable_without_role_1.default,
    noPositiveTabindex: no_positive_tabindex_1.default,
    labelHasFor: label_has_for_1.default,
    linksHasUrl: links_has_url_1.default,
    controlsFormWrapped: controls_form_wrapped_1.default,
    tabElementsHasRightRoles: tab_elements_has_right_roles_1.default,
    textInputHasLabel: text_input_has_label_1.default,
};
//# sourceMappingURL=index.js.map