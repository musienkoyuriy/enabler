/// <reference types="cheerio" />
export declare function getLineNumberByHTMLSegment($elem: any, template: string): number;
export declare function getDuplicateAttributes($elem: Cheerio, content: string): (string | null)[];
export declare function hasAttribute($elem: Cheerio, attrs: string[]): boolean;
export declare function getAttrValue($elem: Cheerio, attrs: string[]): string;
export declare function isAngular(): boolean;
export declare function isVue(): boolean;
export declare function getFrameworkName(): string;
