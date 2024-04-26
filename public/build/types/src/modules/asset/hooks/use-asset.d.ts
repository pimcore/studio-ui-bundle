import { type EditorContainerProps } from '../editor/editor-container';
interface OpenAssetWidgetProps {
    name: string;
    icon: string;
    config: EditorContainerProps;
}
interface UseAssetReturn {
    openAsset: (props: OpenAssetWidgetProps) => void;
}
export declare const useAsset: () => UseAssetReturn;
export {};
//# sourceMappingURL=use-asset.d.ts.map