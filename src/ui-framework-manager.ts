import { ANGULAR, VUE } from './constants';
import { FrameworkName } from './models/common';

export class UIFrameworkManager {
    private static _instance: UIFrameworkManager;
    private framework: FrameworkName;

    private constructor() { } // eslint-disable-line

    static get Instance() { // eslint-disable-line
        if (!this._instance) {
            return new this();
        }

        return this._instance;
    }

    getFrameworkName() {
        return this.framework;
    }

    setFrameworkName(frameworkName: FrameworkName) {
        this.framework = frameworkName;
    }

    isAngular(): boolean {
        return this.framework === ANGULAR;
    }

    isVue(): boolean {
        return this.framework === VUE;
    }
}
