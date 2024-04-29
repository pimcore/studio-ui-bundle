import { readonlyContainer } from '../depency-injection';
import { pluginSystem } from '../plugin-system/plugin-system';
import { serviceIds } from '../config/services';
export interface sdk {
    container: typeof readonlyContainer;
    serviceIds: typeof serviceIds;
    pluginSystem: typeof pluginSystem;
}
export declare const Pimcore: sdk;
//# sourceMappingURL=index.d.ts.map