import { type GlobalContext } from '@Pimcore/modules/app/global-context/global-context-slice';
export interface GlobalAssetContext extends GlobalContext {
    type: 'asset';
    config: {
        id: number;
    };
}
interface UseGlobalAssetContext {
    context: GlobalAssetContext | undefined;
    setContext: (config: GlobalAssetContext['config']) => void;
    removeContext: () => void;
}
export declare const useGlobalAssetContext: () => UseGlobalAssetContext;
export {};
//# sourceMappingURL=use-global-asset-context.d.ts.map