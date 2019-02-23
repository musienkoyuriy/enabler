export interface TemplatesWithWarnings {
    [key: string]: Warning[];
}
export interface Warning {
    message: string;
    line: number;
}
