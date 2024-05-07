/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/
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