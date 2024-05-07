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
import { type GetAssetByIdApiResponse } from './asset-api-slice.gen';
export interface AssetDraft extends GetAssetByIdApiResponse {
    id: number;
}
export declare const assetsAdapter: import("@reduxjs/toolkit").EntityAdapter<AssetDraft, number>;
export declare const slice: import("@reduxjs/toolkit").Slice<import("@reduxjs/toolkit").EntityState<AssetDraft, number>, {
    assetReceived: {
        <S extends import("@reduxjs/toolkit/dist/entities/models").DraftableEntityState<AssetDraft, number>>(state: import("@reduxjs/toolkit/dist/tsHelpers").IsAny<S, import("@reduxjs/toolkit").EntityState<AssetDraft, number>, S>, entity: AssetDraft): S;
        <S_1 extends import("@reduxjs/toolkit/dist/entities/models").DraftableEntityState<AssetDraft, number>>(state: import("@reduxjs/toolkit/dist/tsHelpers").IsAny<S_1, import("@reduxjs/toolkit").EntityState<AssetDraft, number>, S_1>, entity: {
            payload: AssetDraft;
            type: string;
        }): S_1;
    };
}, "asset-draft", "asset-draft", import("@reduxjs/toolkit").SliceSelectors<import("@reduxjs/toolkit").EntityState<AssetDraft, number>>>;
export declare const assetReceived: import("@reduxjs/toolkit").ActionCreatorWithPayload<AssetDraft, "asset-draft/assetReceived">;
export declare const selectAssetById: (state: {
    [x: string]: any;
}, id: number) => {
    id: number;
    parentId?: number | undefined;
    path?: string | undefined;
    userOwner?: number | undefined;
    userModification?: number | undefined;
    locked?: string | null | undefined;
    isLocked?: boolean | undefined;
    creationDate?: number | null | undefined;
    modificationDate?: number | null | undefined;
    permissions?: import("./asset-api-slice.gen").Permissions | undefined;
    iconName?: string | undefined;
    hasChildren?: boolean | undefined;
    type?: string | undefined;
    filename?: string | undefined;
    mimeType?: string | null | undefined;
    metaData?: string[] | undefined;
    hasWorkflowWithPermissions?: boolean | undefined;
    fullPath?: string | undefined;
};
//# sourceMappingURL=asset-draft-slice.d.ts.map