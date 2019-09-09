const cheerio = require('cheerio');
const esprima = require('esprima');
// const escodegen = require('escodegen-jsx');
// const isReactComponent = require('is-react');

import { DOMNodesValidatorFactory, WholeValidatorFactory } from './models/validator';
import { Warning } from './models/warnings';
import * as htmlDOMNodeRules from './rules/dom-nodes-rules';
import * as htmlWholeTemplateRules from './rules/whole-template-rules';

function flatWarnings(warnings: Warning[][]): Warning[] {
  let messages: Warning[] = [];

  warnings.forEach((ruleWarnings: Warning[]) => {
    ruleWarnings.forEach((warn: Warning) => {
      if (warn.message) {
        messages = [
          ...messages,
          warn
        ];
      }
    });
  });

  return messages;
}

export function getContentFromVueFile(fileContent: string): string {
  const templateLines = fileContent.split('\n');

  const templateOpenTag = templateLines.indexOf('<template>');
  const templateCloseTag = templateLines.indexOf('</template>');
  const vueTemplate = templateLines
    .slice(templateOpenTag - 1, templateCloseTag)
    .join('\n');

  return vueTemplate;
}

export function getContentFromVueXTemplate(fileContent: string): string {
  const $ = cheerio.load(fileContent, {
    xmlMode: true,
    withStartIndices: true,
    withEndIndices: true
  });

  const xTemplates = $('script[type="text/x-template"]');

  if (!xTemplates.length) {
    return '';
  }

  const resultTemplate = xTemplates
    .toArray()
    .reduce((acc: string, xTemplate: Cheerio) => {
      acc += $(xTemplate).html();

      return acc;
    }, '');

  return resultTemplate;
}

export function getTemplateFromVueObject(fileContent: string): string {
  return getTemplateFromFrameworkWrapper(
    'Vue.component',
    fileContent
  );
}

export function getTemplateFromAngularDecorator(fileContent: string): string {
  return getTemplateFromFrameworkWrapper(
    '@Component',
    fileContent
  );
}

export function getTemplateFromFrameworkWrapper(specificLine: string, fileContent: string): string {
  const fileAsArray = fileContent.split('\n');

  const frameworkSpecificLine = fileAsArray.find((line: string) => line.includes(specificLine));

  if (!frameworkSpecificLine) {
    return '';
  }

  const decoratorLineNumber = fileAsArray.indexOf(frameworkSpecificLine) + 1;
  const templatePropPattern = /template\s{0,}:\s{0,}`/;

  const stringExceptFrameworkSpecificLine = fileAsArray.slice(decoratorLineNumber);
  const templateStartLine = stringExceptFrameworkSpecificLine.find(line =>
    templatePropPattern.test(line)
  );

  if (!templateStartLine) {
    return '';
  }

  const templateStartLineNumber = stringExceptFrameworkSpecificLine.indexOf(
    templateStartLine
  );

  const joinedTemplateString = stringExceptFrameworkSpecificLine
    .slice(templateStartLineNumber)
    .join('\n');

  const templateMatches = templatePropPattern.exec(joinedTemplateString);
  const matchedString = templateMatches ? templateMatches[0] : '';
  const stringExceptTemplateLiteral = joinedTemplateString.replace(
    matchedString,
    ''
  );

  const template = stringExceptTemplateLiteral.slice(
    0,
    stringExceptTemplateLiteral.indexOf('`')
  );

  return template;
}

export function getASTTreeFromJSXFile(fileContent: string): {[key: string]: any} {
  return esprima.parseScript(fileContent, { jsx: true });
}

export function getA11yWarningsFromStringTemplate(template: string): Warning[] {
  const parsed: CheerioOptionsInterface = cheerio.load(template, {
    xmlMode: true,
    withStartIndices: true,
    withEndIndices: true
  });

  const domNodeRulesFunctions: DOMNodesValidatorFactory[] = Object.values(htmlDOMNodeRules);
  const wholeTemplateRulesFunctions = Object.values(htmlWholeTemplateRules);

  return [
    ...getWarnsFromTemplatesByNodeRules(domNodeRulesFunctions, template, parsed),
    ...getWarnsFromWholeTemplates(wholeTemplateRulesFunctions, parsed)
  ];
}

function getWarnsFromTemplatesByNodeRules(
  rules: DOMNodesValidatorFactory[],
  templateString: string,
  loadedTemplate: CheerioOptionsInterface
): Warning[] {
  let warnings: Warning[][] = [];
  rules.forEach((r: DOMNodesValidatorFactory) => {
    const ruleWarns = r(loadedTemplate).validateAsHTML(
      loadedTemplate, templateString
    );

    if (ruleWarns.length) {
      warnings = [
        ...warnings,
        ruleWarns
      ];
    }
  });

  return flatWarnings(warnings);
}

function getWarnsFromWholeTemplates(rules: WholeValidatorFactory[], $: CheerioOptionsInterface): Warning[] {
  let warnings: Warning[][] = [];

  rules.forEach((r: WholeValidatorFactory) => {
    const rule = r($);

    if (rule.warnings.length) {
      warnings = [
        ...warnings,
        rule.warnings
      ];
    }
  });

  return flatWarnings(warnings);
}

export function getA11yWarningsFromJSXTemplate(templateAsAST: {[key: string]: any}) {
  console.log(templateAsAST);
}
