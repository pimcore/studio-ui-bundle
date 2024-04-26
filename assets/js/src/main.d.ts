import '@Pimcore/bootstrap';
import { store } from './app/store';
import { container } from './app/depency-injection';
declare const Pimcore: {
    log: () => void;
    store: import("@reduxjs/toolkit").EnhancedStore<{
        [x: string]: any;
    }, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
        dispatch: import("redux-thunk").ThunkDispatch<{
            [x: string]: any;
        }, undefined, import("redux").UnknownAction>;
    }>, import("redux").StoreEnhancer]>>;
    container: any;
    serviceIds: {
        widgetManagerService: symbol;
    };
};
declare global {
    interface Window {
        Pimcore: typeof Pimcore;
    }
}
declare const log: () => void, serviceIds: {
    widgetManagerService: symbol;
};
export { log, store, container, serviceIds };
