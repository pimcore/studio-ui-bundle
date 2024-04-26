import { selectAssetById } from '../asset-draft-slice';
interface UseAssetDraftReturn {
    isLoading: boolean;
    isError: boolean;
    asset: undefined | ReturnType<typeof selectAssetById>;
}
export declare const useAssetDraft: (id: number) => UseAssetDraftReturn;
export {};
//# sourceMappingURL=use-asset-draft.d.ts.map