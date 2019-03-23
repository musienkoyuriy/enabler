const cheerio = require('cheerio');

import { DOMNodesValidatorFactory, WholeValidatorFactory } from './models/validator';
import { Warning } from './models/warnings';
import * as domNodeRules from './rules/dom-nodes';
import * as wholeTemplateRules from './rules/whole-template';

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

export function getContentFromVueFile(templateContent: string): string {
  const templateLines = templateContent.split('\n');

  const templateOpenTag = templateLines.indexOf('<template>');
  const templateCloseTag = templateLines.indexOf('</template>');
  const vueTemplate = templateLines
    .slice(templateOpenTag + 1, templateCloseTag)
    .join('\n');

  return vueTemplate;
}

export function getTemplateFromComponentDecorator(fileContent: string): string {
  const fileAsArray = fileContent.split('\n');

  const decoratorLine = fileAsArray.find((line: string) => line.includes('@Component'));

  if (!decoratorLine) {
    return '';
  }

  const decoratorLineNumber = fileAsArray.indexOf(decoratorLine) + 1;
  const templatePropPattern = /template\s{0,}:\s{0,}`/;

  const stringExceptComponentDecorator = fileAsArray.slice(decoratorLineNumber);
  const templateStartLine = stringExceptComponentDecorator.find(line =>
    templatePropPattern.test(line)
  );

  if (!templateStartLine) {
    return '';
  }

  const templateStartLineNumber = stringExceptComponentDecorator.indexOf(
    templateStartLine
  );

  const joinedTemplateString = stringExceptComponentDecorator
    .slice(templateStartLineNumber)
    .join('\n');

  const templateMatches = templatePropPattern.exec(joinedTemplateString);
  const matchedString = templateMatches ? templateMatches[0] : '';
  const stringExceptTemplateLiteral = joinedTemplateString.replace(
    matchedString,
    ''
  );

  const angularTemplate = stringExceptTemplateLiteral.slice(
    0,
    stringExceptTemplateLiteral.indexOf('`')
  );

  return angularTemplate;
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
