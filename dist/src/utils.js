"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getLineNumberByHTMLSegment($elem, template) {
    var start = $elem.startIndex;
    var lineNumber = template.substr(0, start).split('\n').length;
    return lineNumber;
}
exports.getLineNumberByHTMLSegment = getLineNumberByHTMLSegment;
function _ecranizeForRegexp(strToEcranize) {
    return strToEcranize.replace(/-/g, '\\-');
}
exports._ecranizeForRegexp = _ecranizeForRegexp;
function getDuplicateAttributes($elem, content) {
    var dom = $elem.get(0);
    var start = dom.startIndex;
    var end = dom.children.length
        ? dom.children[0].startIndex
        : dom.endIndex + 1;
    var html = content.slice(start, end);
    return Object.keys(dom.attribs)
        .map(function (attr) {
        var regexp;
        var attrForRegexp = _ecranizeForRegexp(attr);
        try {
            regexp = new RegExp("\\s" + attrForRegexp + "=\"(.*?)\"", 'gi');
        }
        catch (ex) {
            console.log(ex);
            console.log(html);
        }
        var matched = html.match(regexp);
        return matched !== null && matched.length > 1 ? attr : null;
    })
        .filter(Boolean);
}
exports.getDuplicateAttributes = getDuplicateAttributes;
function hasAttribute($elem, attrs) {
    var attributes = $elem.attr();
    return attrs.some(function (attr) { return attr in attributes; });
}
exports.hasAttribute = hasAttribute;
function getAttrValue($elem, attrs) {
    var filledAttrs = attrs.filter(function (attr) { return $elem.attr(attr); });
    return filledAttrs.length ? $elem.attr(filledAttrs[0]) : '';
}
exports.getAttrValue = getAttrValue;
function isAngular() {
    return global.framework === 'angular';
}
exports.isAngular = isAngular;
function isVue() {
    return global.framework === 'vue';
}
exports.isVue = isVue;
function getFrameworkName() {
    return global.framework;
}
exports.getFrameworkName = getFrameworkName;
//# sourceMappingURL=utils.js.map