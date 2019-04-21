const cheerio = require('cheerio');

import { DOMNodesValidatorFactory, WholeValidatorFactory } from './models/validator';
import { Warning } from './models/warnings';
import * as domNodeRules from './rules/dom-nodes-rules';
import * as wholeTemplateRules from './rules/whole-template-rules';

function flatWarnings(warnings: Warning[][]): Warning[] {
  const messages: Warning[] = [];

  warnings.forEach((ruleWarnings: Warning[]) => {
    ruleWarnings.forEach((warn: Warning) => {
      if (warn.message) {
        messages.push(warn);
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

export function getContentFromVueXTemplate(fileContent: string): any {
  const $ = cheerio.load(fileContent, {
    xmlMode: true,
    withStartIndices: true,
    withEndIndices: true
  });

  const template = $('script[type="text/x-template"]').html();

  return typeof template === 'string'
    ? template
    : '';
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

export function getA11yWarnings(template: string): Warning[] {
  const parsed: CheerioOptionsInterface = cheerio.load(template, {
    xmlMode: true,
    withStartIndices: true,
    withEndIndices: true
  });

  const domNodeRulesFunctions: DOMNodesValidatorFactory[] = Object.values(domNodeRules);
  const wholeTemplateRulesFunctions: any[] = Object.values(wholeTemplateRules);

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
  const warnings: Warning[][] = [];
  rules.forEach((r: DOMNodesValidatorFactory) => {
    const rule = r(loadedTemplate, templateString);

    if (rule.warnings.length) {
      warnings.push(rule.warnings);
    }
  });

  return flatWarnings(warnings);
}

function getWarnsFromWholeTemplates(rules: any, $: any): any[] {
  const warnings: Warning[][] = [];

  rules.forEach((r: WholeValidatorFactory) => {
    const rule = r($);

    if (rule.warnings.length) {
      warnings.push(rule.warnings);
    }
  });

  return flatWarnings(warnings);
}
