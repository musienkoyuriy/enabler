import { ANGULAR, VUE } from './constants';
import { FrameworkName } from './models/common'

export class UIFrameworkManager {
    private static _instance: UIFrameworkManager;
    private framework: FrameworkName;

    private constructor() { }

    public static get Instance() {
        if (!this._instance) {
            return new this();
        }

        return this._instance;
    }

    public getFrameworkName() {
        return this.framework;
    }

    public setFrameworkName(frameworkName: FrameworkName) {
        this.framework = frameworkName;
    }

    public isAngular(): boolean {
        return this.framework === ANGULAR;
    }

    public isVue(): boolean {
        return this.framework === VUE;
    }
}
