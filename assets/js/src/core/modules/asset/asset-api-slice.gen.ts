import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Assets", "Versions"] as const;
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
            patchAssetById: build.mutation<PatchAssetByIdApiResponse, PatchAssetByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/assets`, method: "PATCH", body: queryArg.body }),
                invalidatesTags: ["Assets"],
            }),
            getAssetCustomMetadataById: build.query<
                GetAssetCustomMetadataByIdApiResponse,
                GetAssetCustomMetadataByIdApiArg
            >({
                query: (queryArg) => ({ url: `/studio/api/assets/${queryArg.id}/custom-metadata` }),
                providesTags: ["Assets"],
            }),
            getAssetCustomSettingsById: build.query<
                GetAssetCustomSettingsByIdApiResponse,
                GetAssetCustomSettingsByIdApiArg
            >({
                query: (queryArg) => ({ url: `/studio/api/assets/${queryArg.id}/custom-settings` }),
                providesTags: ["Assets"],
            }),
            getAssetDataTextById: build.query<GetAssetDataTextByIdApiResponse, GetAssetDataTextByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/assets/${queryArg.id}/text` }),
                providesTags: ["Assets"],
            }),
            getAssetById: build.query<GetAssetByIdApiResponse, GetAssetByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/assets/${queryArg.id}` }),
                providesTags: ["Assets"],
            }),
            updateAssetById: build.mutation<UpdateAssetByIdApiResponse, UpdateAssetByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/assets/${queryArg.id}`, method: "PUT", body: queryArg.body }),
                invalidatesTags: ["Assets"],
            }),
            downloadAssetVersionById: build.query<DownloadAssetVersionByIdApiResponse, DownloadAssetVersionByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/versions/${queryArg.id}/asset/download` }),
                providesTags: ["Versions"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type GetAssetsApiResponse = /** status 200 Paginated assets with total count as header param */ {
    totalItems: number;
    items: (Image | Document | Audio | Video | Archive | Text | Folder | Unknown)[];
};
export type GetAssetsApiArg = {
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Filter assets by parent id. */
    parentId?: number;
    /** Filter assets/data-objects by matching ids. As a wildcard * can be used */
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
export type PatchAssetByIdApiResponse = /** status 200 Success */
    | void
    | /** status 207 Partial success with errors */ PatchError[];
export type PatchAssetByIdApiArg = {
    body: {
        data: {
            /** Asset ID */
            id: number;
            parentId?: number | null;
            metadata?: PatchCustomMetadata[] | null;
        }[];
    };
};
export type GetAssetCustomMetadataByIdApiResponse = /** status 200 Array of custom metadata */ {
    items?: CustomMetadata[];
};
export type GetAssetCustomMetadataByIdApiArg = {
    /** ID of the asset */
    id: number;
};
export type GetAssetCustomSettingsByIdApiResponse = /** status 200 Array of custom settings */ {
    items?: CustomSettings;
};
export type GetAssetCustomSettingsByIdApiArg = {
    /** ID of the asset */
    id: number;
};
export type GetAssetDataTextByIdApiResponse = /** status 200 UTF8 encoded text data */ {
    /** UTF 8 encoded text data */
    data: string;
};
export type GetAssetDataTextByIdApiArg = {
    /** ID of the asset */
    id: number;
};
export type GetAssetByIdApiResponse = /** status 200 One of asset types */
    | Image
    | Document
    | Audio
    | Video
    | Archive
    | Text
    | Folder
    | Unknown;
export type GetAssetByIdApiArg = {
    /** ID of the asset */
    id: number;
};
export type UpdateAssetByIdApiResponse = /** status 200 One of asset types */
    | Image
    | Document
    | Audio
    | Video
    | Archive
    | Text
    | Folder
    | Unknown;
export type UpdateAssetByIdApiArg = {
    /** ID of the asset */
    id: number;
    body: {
        data: {
            parentId?: number | null;
            metadata?: UpdateCustomMetadata[] | null;
            properties?: UpdateDataProperty[] | null;
            image?: ImageData | null;
        };
    };
};
export type DownloadAssetVersionByIdApiResponse = /** status 200 Asset version binary file */ Blob;
export type DownloadAssetVersionByIdApiArg = {
    /** ID of the version */
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
    id: number;
    /** ID of parent */
    parentId: number;
    /** path */
    path: string;
    /** ID of owner */
    userOwner: number;
    /** User that modified the element */
    userModification: number;
    /** Locked */
    locked: string | null;
    /** Is locked */
    isLocked: boolean;
    /** Creation date */
    creationDate: number | null;
    /** Modification date */
    modificationDate: number | null;
    permissions: Permissions;
};
export type Asset = Element & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
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
    /** Has metadata */
    hasMetaData?: boolean;
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
    imageThumbnailPath?: string;
};
export type Document = Asset & {
    /** Page count */
    pageCount?: number | null;
    /** Path to image thumbnail */
    imageThumbnailPath?: string | null;
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
export type Error = {
    /** Message */
    message: string;
};
export type DevError = {
    /** Message */
    message: string;
    /** Details */
    details: string;
};
export type PatchError = {
    /** ID */
    id?: number;
    /** Message */
    message?: string;
};
export type PatchCustomMetadata = {
    /** Name */
    name: string;
    /** Language */
    language?: string | null;
    /** Data */
    data?: string | null;
};
export type CustomMetadata = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** Name */
    name: string;
    /** Language */
    language: string;
    /** Type */
    type: string;
    /** Data */
    data: string | null;
};
export type FixedCustomSettings = {
    /** embedded meta data of the asset - array of any key-value pairs */
    embeddedMetaData: any[];
    /** flag to indicate if the embedded meta data has been extracted from the asset */
    embeddedMetaDataExtracted: boolean;
};
export type CustomSettings = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** fixed custom settings */
    fixedCustomSettings?: FixedCustomSettings | null;
    /** dynamic custom settings - can be any key-value pair */
    dynamicCustomSettings?: any[];
};
export type UpdateCustomMetadata = {
    /** Name */
    name: string;
    /** Language */
    language: string;
    /** Type */
    type: string;
    /** Data */
    data: string | null;
};
export type UpdateDataProperty = {
    /** key */
    key: string;
    /** data */
    data: any | null;
    /** type */
    type: string;
    /** inheritable */
    inheritable: boolean;
};
export type FocalPoint = {
    /** x */
    x: number;
    /** y */
    y: number;
};
export type ImageData = {
    focalPoint?: FocalPoint;
};
export const {
    useGetAssetsQuery,
    usePatchAssetByIdMutation,
    useGetAssetCustomMetadataByIdQuery,
    useGetAssetCustomSettingsByIdQuery,
    useGetAssetDataTextByIdQuery,
    useGetAssetByIdQuery,
    useUpdateAssetByIdMutation,
    useDownloadAssetVersionByIdQuery,
} = injectedRtkApi;
