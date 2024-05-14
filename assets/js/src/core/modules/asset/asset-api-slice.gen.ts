import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Assets"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getAssets: build.query<GetAssetsApiResponse, GetAssetsApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/assets`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        parentId: queryArg.parentId,
                        idSearchTerm: queryArg.idSearchTerm,
                        excludeFolders: queryArg.excludeFolders,
                        path: queryArg.path,
                        pathIncludeParent: queryArg.pathIncludeParent,
                        pathIncludeDescendants: queryArg.pathIncludeDescendants,
                    },
                }),
                providesTags: ["Assets"],
            }),
            getAssetById: build.query<GetAssetByIdApiResponse, GetAssetByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/assets/${queryArg.id}` }),
                providesTags: ["Assets"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type GetAssetsApiResponse = /** status 200 Paginated assets with total count as header param */ {
    totalItems?: number;
    items?: (Image | Document | Audio | Video | Archive | Text | Folder | Unknown)[];
};
export type GetAssetsApiArg = {
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Filter assets by parent id. */
    parentId?: number;
    /** Filter assets by matching ids. As a wildcard * can be used */
    idSearchTerm?: string;
    /** Filter folders from result. */
    excludeFolders?: boolean;
    /** Filter by path. */
    path?: string;
    /** Include the parent item in the result. */
    pathIncludeParent?: boolean;
    /** Include all descendants in the result. */
    pathIncludeDescendants?: boolean;
};
export type GetAssetByIdApiResponse = /** status 200 Paginated assets with total count as header param */ Asset;
export type GetAssetByIdApiArg = {
    /** Id of the asset */
    id: number;
};
export type Permissions = {
    /** List */
    list?: boolean;
    /** View */
    view?: boolean;
    /** Publish */
    publish?: boolean;
    /** Delete */
    delete?: boolean;
    /** Rename */
    rename?: boolean;
    /** Create */
    create?: boolean;
    /** Settings */
    settings?: boolean;
    /** Versions */
    versions?: boolean;
    /** Properties */
    properties?: boolean;
};
export type Element = {
    /** ID */
    id?: number;
    /** ID of parent */
    parentId?: number;
    /** path */
    path?: string;
    /** ID of owner */
    userOwner?: number;
    /** User that modified the element */
    userModification?: number;
    /** Locked */
    locked?: string | null;
    /** Is locked */
    isLocked?: boolean;
    /** Creation date */
    creationDate?: number | null;
    /** Modification date */
    modificationDate?: number | null;
    permissions?: Permissions;
};
export type Asset = Element & {
    /** IconName */
    iconName?: string;
    /** Has children */
    hasChildren?: boolean;
    /** Type */
    type?: string;
    /** Filename */
    filename?: string;
    /** Mimetype */
    mimeType?: string | null;
    /** Metadata */
    metaData?: string[];
    /** Workflow permissions */
    hasWorkflowWithPermissions?: boolean;
    /** Full path */
    fullPath?: string;
};
export type Image = Asset & {
    /** Format */
    format?: string;
    /** width */
    width?: number;
    /** height */
    height?: number;
    /** is vector graphic */
    isVectorGraphic?: boolean;
    /** is animated */
    isAnimated?: boolean;
    /** path to thumbnail */
    thumbnailPath?: string;
};
export type Document = Asset & {
    /** Page count */
    pageCount?: number | null;
    /** Path to image thumbnail */
    imageThumbnailPath?: number | null;
};
export type Audio = Asset;
export type Video = Asset & {
    /** Duration */
    duration?: number | null;
    /** Width */
    width?: number | null;
    /** Height */
    height?: number | null;
    /** Path to Image Thumbnail */
    imageThumbnailPath?: string | null;
};
export type Archive = Asset;
export type Text = Asset;
export type Folder = Asset;
export type Unknown = Asset;
export type Unauthorized = {
    /** Message */
    message?: string;
};
export const { useGetAssetsQuery, useGetAssetByIdQuery } = injectedRtkApi;
