import { ProgramOptions } from './models/common';
import { Warning } from './models/warnings';
export declare function getContentFromVueFile(templateContent: string): string;
export declare function getTemplateFromComponentDecorator(fileContent: string): string;
export declare function getA11yWarnings(template: string, options: ProgramOptions): Warning[];
