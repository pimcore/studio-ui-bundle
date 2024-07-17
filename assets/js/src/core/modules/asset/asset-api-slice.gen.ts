import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Assets"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            cloneElement: build.mutation<CloneElementApiResponse, CloneElementApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/assets/${queryArg.id}/clone/${queryArg.parentId}`,
                    method: "POST",
                }),
                invalidatesTags: ["Assets"],
            }),
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
            createZipAssets: build.mutation<CreateZipAssetsApiResponse, CreateZipAssetsApiArg>({
                query: (queryArg) => ({ url: `/studio/api/assets/zip/create`, method: "POST", body: queryArg.body }),
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
            deleteAsset: build.mutation<DeleteAssetApiResponse, DeleteAssetApiArg>({
                query: (queryArg) => ({ url: `/studio/api/assets/${queryArg.id}/delete`, method: "DELETE" }),
                invalidatesTags: ["Assets"],
            }),
            streamDocumentPreview: build.query<StreamDocumentPreviewApiResponse, StreamDocumentPreviewApiArg>({
                query: (queryArg) => ({ url: `/studio/api/assets/${queryArg.id}/document/stream/pdf-preview` }),
                providesTags: ["Assets"],
            }),
            downloadAssetById: build.query<DownloadAssetByIdApiResponse, DownloadAssetByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/assets/${queryArg.id}/download` }),
                providesTags: ["Assets"],
            }),
            downloadZippedAssets: build.query<DownloadZippedAssetsApiResponse, DownloadZippedAssetsApiArg>({
                query: (queryArg) => ({ url: `/studio/api/assets/download/zip`, params: { path: queryArg.path } }),
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
            downloadCustomImage: build.query<DownloadCustomImageApiResponse, DownloadCustomImageApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/assets/${queryArg.id}/image/download/custom`,
                    params: {
                        mimeType: queryArg.mimeType,
                        resizeMode: queryArg.resizeMode,
                        width: queryArg.width,
                        height: queryArg.height,
                        quality: queryArg.quality,
                        dpi: queryArg.dpi,
                    },
                }),
                providesTags: ["Assets"],
            }),
            downloadImageByFormat: build.query<DownloadImageByFormatApiResponse, DownloadImageByFormatApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/assets/${queryArg.id}/image/download/format/${queryArg.format}`,
                }),
                providesTags: ["Assets"],
            }),
            downloadImageByThumbnail: build.query<DownloadImageByThumbnailApiResponse, DownloadImageByThumbnailApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/assets/${queryArg.id}/image/download/thumbnail/${queryArg.thumbnailName}`,
                }),
                providesTags: ["Assets"],
            }),
            getVideoImageThumbnail: build.query<GetVideoImageThumbnailApiResponse, GetVideoImageThumbnailApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/assets/${queryArg.id}/video/stream/image-thumbnail`,
                    params: {
                        width: queryArg.width,
                        height: queryArg.height,
                        aspectRatio: queryArg.aspectRatio,
                        frame: queryArg.frame,
                        async: queryArg["async"],
                    },
                }),
                providesTags: ["Assets"],
            }),
            downloadVideoByThumbnail: build.query<DownloadVideoByThumbnailApiResponse, DownloadVideoByThumbnailApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/assets/${queryArg.id}/video/download/${queryArg.thumbnailName}`,
                }),
                providesTags: ["Assets"],
            }),
            streamVideoByThumbnail: build.query<StreamVideoByThumbnailApiResponse, StreamVideoByThumbnailApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/assets/${queryArg.id}/video/stream/${queryArg.thumbnailName}`,
                }),
                providesTags: ["Assets"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type CloneElementApiResponse =
    /** status 200 Successfully copied asset */ void | /** status 201 Successfully copied parent asset and created jobRun for copying child assets */ {
        /** ID of created jobRun */
        id: number;
    };
export type CloneElementApiArg = {
    /** Id of the asset */
    id: number;
    /** ParentId of the asset */
    parentId: number;
};
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
export type CreateZipAssetsApiResponse = /** status 200 Success */ {
    /** Path to the zip file */
    path?: string;
};
export type CreateZipAssetsApiArg = {
    body: {
        items?: number[];
    };
};
export type GetAssetCustomMetadataByIdApiResponse = /** status 200 Array of custom metadata */ {
    items?: CustomMetadata[];
};
export type GetAssetCustomMetadataByIdApiArg = {
    /** Id of the asset */
    id: number;
};
export type GetAssetCustomSettingsByIdApiResponse = /** status 200 Array of custom settings */ {
    items?: CustomSettings;
};
export type GetAssetCustomSettingsByIdApiArg = {
    /** Id of the asset */
    id: number;
};
export type GetAssetDataTextByIdApiResponse = /** status 200 UTF8 encoded text data */ {
    /** UTF 8 encoded text data */
    data: string;
};
export type GetAssetDataTextByIdApiArg = {
    /** Id of the asset */
    id: number;
};
export type DeleteAssetApiResponse =
    /** status 200 Successfully deleted asset */ void | /** status 201 Successfully created jobRun for deleting assets */ {
        /** ID of created jobRun */
        id: number;
    };
export type DeleteAssetApiArg = {
    /** Id of the asset */
    id: number;
};
export type StreamDocumentPreviewApiResponse = /** status 200 Asset PDF preview stream */ Blob;
export type StreamDocumentPreviewApiArg = {
    /** Id of the document */
    id: number;
};
export type DownloadAssetByIdApiResponse = /** status 200 Original asset */ Blob;
export type DownloadAssetByIdApiArg = {
    /** Id of the asset */
    id: number;
};
export type DownloadZippedAssetsApiResponse = /** status 200 Zip archive */ Blob;
export type DownloadZippedAssetsApiArg = {
    /** Filter by path. */
    path?: string;
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
    /** Id of the asset */
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
    /** Id of the asset */
    id: number;
    body: {
        data: {
            parentId?: number | null;
            key?: string | null;
            locked?: string | null;
            data?: string | null;
            metadata?: UpdateCustomMetadata[] | null;
            customSettings?: UpdateCustomSettings[] | null;
            properties?: UpdateDataProperty[] | null;
            image?: ImageData | null;
        };
    };
};
export type DownloadCustomImageApiResponse = /** status 200 Custom image */ Blob;
export type DownloadCustomImageApiArg = {
    /** Id of the image */
    id: number;
    /** Mime type of downloaded image. */
    mimeType: "JPEG" | "PNG";
    /** Resize mode of downloaded image. */
    resizeMode: "resize" | "scaleByWidth" | "scaleByHeight";
    /** Width of downloaded image */
    width?: number;
    /** Height of downloaded image */
    height?: number;
    /** Quality of downloaded image */
    quality?: number;
    /** Dpi of downloaded image */
    dpi?: number;
};
export type DownloadImageByFormatApiResponse = /** status 200 Image based on format */ Blob;
export type DownloadImageByFormatApiArg = {
    /** Id of the image */
    id: number;
    /** Find asset by matching format type. */
    format: "office" | "print" | "web";
};
export type DownloadImageByThumbnailApiResponse = /** status 200 Image based on thumbnail name */ Blob;
export type DownloadImageByThumbnailApiArg = {
    /** Id of the image */
    id: number;
    /** Find asset by matching thumbnail name. */
    thumbnailName: string;
};
export type GetVideoImageThumbnailApiResponse = /** status 200 Streamed video image thumbnail */ Blob;
export type GetVideoImageThumbnailApiArg = {
    /** Id of the video */
    id: number;
    /** Width of the video image thumbnail */
    width?: number;
    /** Height of the video image thumbnail */
    height?: number;
    /** Aspect ratio */
    aspectRatio?: boolean;
    /** Frame */
    frame?: boolean;
    /** Generate the asset asynchronously */
    async?: boolean;
};
export type DownloadVideoByThumbnailApiResponse = /** status 200 Video based on thumbnail name */ Blob;
export type DownloadVideoByThumbnailApiArg = {
    /** Id of the video */
    id: number;
    /** Find asset by matching thumbnail name. */
    thumbnailName: string;
};
export type StreamVideoByThumbnailApiResponse = /** status 200 Video stream based on thumbnail name */ Blob;
export type StreamVideoByThumbnailApiArg = {
    /** Id of the video */
    id: number;
    /** Find asset by matching thumbnail name. */
    thumbnailName: string;
};
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
    data: any | null;
};
export type UpdateCustomSettings = {
    /** Key */
    key: string;
    /** Value */
    value: any | null;
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
    useCloneElementMutation,
    useGetAssetsQuery,
    usePatchAssetByIdMutation,
    useCreateZipAssetsMutation,
    useGetAssetCustomMetadataByIdQuery,
    useGetAssetCustomSettingsByIdQuery,
    useGetAssetDataTextByIdQuery,
    useDeleteAssetMutation,
    useStreamDocumentPreviewQuery,
    useDownloadAssetByIdQuery,
    useDownloadZippedAssetsQuery,
    useGetAssetByIdQuery,
    useUpdateAssetByIdMutation,
    useDownloadCustomImageQuery,
    useDownloadImageByFormatQuery,
    useDownloadImageByThumbnailQuery,
    useGetVideoImageThumbnailQuery,
    useDownloadVideoByThumbnailQuery,
    useStreamVideoByThumbnailQuery,
} = injectedRtkApi;
