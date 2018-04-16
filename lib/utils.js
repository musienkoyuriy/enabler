function getLineNumberByHTMLSegment($elem, content) {
  const start = $elem.get(0).startIndex;
  const lineNumber = content.substr(0, start).split('\n').length;

  return lineNumber;
}

function _ecranizeForRegexp(string) {
  return string.replace(/-/g, '\\-');
}

function getDuplicateAttributes($elem, content) {
  const dom = $elem.get(0);
  const start = dom.startIndex;
  const end = dom.children.length ? dom.children[0].startIndex : dom.endIndex + 1;

  const html = content.slice(start, end);

  return Object.keys(dom.attribs)
    .map((attr) => {
      let regexp;
      const attrForRegexp = _ecranizeForRegexp(attr);
      try {
        regexp = new RegExp(`\\s${attrForRegexp}="(.*?)"`, 'gi');
      } catch (ex) {
        console.log(ex);
        console.log(html);
      }
      const matched = html.match(regexp);

      return matched !== null && matched.length > 1 ? attr : null;
    })
    .filter(Boolean);
}

function getTemplateFromComponentDecorator(fileContent) {
  const fileAsArray = fileContent.split('\n');

  const decoratorLine = fileAsArray.find((line, index) => {
    return line.includes('@Component');
  });
  const decoratorLineNumber = fileAsArray.indexOf(decoratorLine) + 1;
  const templatePropPattern = /template\s{0,}:\s{0,}`/;

  const stringExceptComponentDecorator = fileAsArray.slice(decoratorLineNumber);
  const templateStartLine = stringExceptComponentDecorator.find(line => templatePropPattern.test(line));
  const templateStartLineNumber = stringExceptComponentDecorator.indexOf(templateStartLine) ;

  const joinedTemplateString = stringExceptComponentDecorator
    .slice(templateStartLineNumber)
    .join('');

  const matchedString = templatePropPattern.exec(joinedTemplateString)[0];
  const stringExceptTemplateLiteral = joinedTemplateString.replace(matchedString, '');

  const template = stringExceptTemplateLiteral.slice(0, stringExceptTemplateLiteral.indexOf('`'));

  return template;
}


function hasAttribute($elem, attrs) {
  const attributes = $elem.attr();

  return attrs.some(attr => attr in attributes);
}

function getAttrValue($elem, attrs) {
  const filledAttrs = attrs.filter(attr => $elem.attr(attr));

  return filledAttrs.length ? $elem.attr(filledAttrs[0]) : '';
}

function isAngular() {
  return global.framework === 'angular';
}

function isVue() {
  return global.framework === 'vue';
}

module.exports = {
  getLineNumberByHTMLSegment,
  getDuplicateAttributes,
  hasAttribute,
  getAttrValue,
  isAngular,
  isVue,
  getTemplateFromComponentDecorator
};
