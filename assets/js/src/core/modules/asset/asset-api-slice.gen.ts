import { api } from "@sdk/api";
export const addTagTypes = ["Assets", "Asset Grid", "Metadata"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            assetClone: build.mutation<AssetCloneApiResponse, AssetCloneApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/${queryArg.id}/clone/${queryArg.parentId}`,
                    method: "POST",
                }),
                invalidatesTags: ["Assets"],
            }),
            assetCustomSettingsGetById: build.query<
                AssetCustomSettingsGetByIdApiResponse,
                AssetCustomSettingsGetByIdApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/${queryArg.id}/custom-settings` }),
                providesTags: ["Assets"],
            }),
            assetGetTextDataById: build.query<AssetGetTextDataByIdApiResponse, AssetGetTextDataByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/${queryArg.id}/text` }),
                providesTags: ["Assets"],
            }),
            assetDocumentStreamPreview: build.query<
                AssetDocumentStreamPreviewApiResponse,
                AssetDocumentStreamPreviewApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/${queryArg.id}/document/stream/pdf-preview` }),
                providesTags: ["Assets"],
            }),
            assetDownloadZip: build.query<AssetDownloadZipApiResponse, AssetDownloadZipApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/download/zip/${queryArg.jobRunId}` }),
                providesTags: ["Assets"],
            }),
            assetDeleteZip: build.mutation<AssetDeleteZipApiResponse, AssetDeleteZipApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/download/zip/${queryArg.jobRunId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Assets"],
            }),
            assetDownloadById: build.query<AssetDownloadByIdApiResponse, AssetDownloadByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/${queryArg.id}/download` }),
                providesTags: ["Assets"],
            }),
            assetExportZipAsset: build.mutation<AssetExportZipAssetApiResponse, AssetExportZipAssetApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/export/zip/asset`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Assets"],
            }),
            assetExportZipFolder: build.mutation<AssetExportZipFolderApiResponse, AssetExportZipFolderApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/export/zip/folder`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Assets"],
            }),
            assetGetById: build.query<AssetGetByIdApiResponse, AssetGetByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/${queryArg.id}` }),
                providesTags: ["Assets"],
            }),
            assetUpdateById: build.mutation<AssetUpdateByIdApiResponse, AssetUpdateByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Assets"],
            }),
            assetDeleteGridConfigurationByConfigurationId: build.mutation<
                AssetDeleteGridConfigurationByConfigurationIdApiResponse,
                AssetDeleteGridConfigurationByConfigurationIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/grid/configuration/${queryArg.configurationId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Asset Grid"],
            }),
            assetGetAvailableGridColumns: build.query<
                AssetGetAvailableGridColumnsApiResponse,
                AssetGetAvailableGridColumnsApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/assets/grid/available-columns` }),
                providesTags: ["Asset Grid"],
            }),
            assetGetGridConfigurationByFolderId: build.query<
                AssetGetGridConfigurationByFolderIdApiResponse,
                AssetGetGridConfigurationByFolderIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/grid/configuration/${queryArg.folderId}`,
                    params: {
                        configurationId: queryArg.configurationId,
                    },
                }),
                providesTags: ["Asset Grid"],
            }),
            assetGetSavedGridConfigurations: build.query<
                AssetGetSavedGridConfigurationsApiResponse,
                AssetGetSavedGridConfigurationsApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/assets/grid/configurations` }),
                providesTags: ["Asset Grid"],
            }),
            assetSaveGridConfiguration: build.mutation<
                AssetSaveGridConfigurationApiResponse,
                AssetSaveGridConfigurationApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/grid/configuration/save`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Asset Grid"],
            }),
            assetSetGridConfigurationAsFavorite: build.mutation<
                AssetSetGridConfigurationAsFavoriteApiResponse,
                AssetSetGridConfigurationAsFavoriteApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/grid/configuration/set-as-favorite/${queryArg.configurationId}/${queryArg.folderId}`,
                    method: "POST",
                }),
                invalidatesTags: ["Asset Grid"],
            }),
            assetUpdateGridConfiguration: build.mutation<
                AssetUpdateGridConfigurationApiResponse,
                AssetUpdateGridConfigurationApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/grid/configuration/update/${queryArg.configurationId}`,
                    method: "PUT",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Asset Grid"],
            }),
            assetGetGrid: build.query<AssetGetGridApiResponse, AssetGetGridApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/grid`, method: "POST", body: queryArg.body }),
                providesTags: ["Asset Grid"],
            }),
            assetImageDownloadCustom: build.query<AssetImageDownloadCustomApiResponse, AssetImageDownloadCustomApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/${queryArg.id}/image/download/custom`,
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
            assetImageStreamCustom: build.query<AssetImageStreamCustomApiResponse, AssetImageStreamCustomApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/${queryArg.id}/image/stream/custom`,
                    params: {
                        mimeType: queryArg.mimeType,
                        resizeMode: queryArg.resizeMode,
                        width: queryArg.width,
                        height: queryArg.height,
                        quality: queryArg.quality,
                        dpi: queryArg.dpi,
                        contain: queryArg.contain,
                        frame: queryArg.frame,
                        cover: queryArg.cover,
                        forceResize: queryArg.forceResize,
                        cropPercent: queryArg.cropPercent,
                        cropWidth: queryArg.cropWidth,
                        cropHeight: queryArg.cropHeight,
                        cropTop: queryArg.cropTop,
                        cropLeft: queryArg.cropLeft,
                    },
                }),
                providesTags: ["Assets"],
            }),
            assetImageDownloadByFormat: build.query<
                AssetImageDownloadByFormatApiResponse,
                AssetImageDownloadByFormatApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/${queryArg.id}/image/download/format/${queryArg.format}`,
                }),
                providesTags: ["Assets"],
            }),
            assetImageStreamPreview: build.query<AssetImageStreamPreviewApiResponse, AssetImageStreamPreviewApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/${queryArg.id}/image/stream/preview` }),
                providesTags: ["Assets"],
            }),
            assetImageStream: build.query<AssetImageStreamApiResponse, AssetImageStreamApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/${queryArg.id}/image/stream` }),
                providesTags: ["Assets"],
            }),
            assetImageDownloadByThumbnail: build.query<
                AssetImageDownloadByThumbnailApiResponse,
                AssetImageDownloadByThumbnailApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/${queryArg.id}/image/download/thumbnail/${queryArg.thumbnailName}`,
                }),
                providesTags: ["Assets"],
            }),
            assetPatchById: build.mutation<AssetPatchByIdApiResponse, AssetPatchByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets`, method: "PATCH", body: queryArg.body }),
                invalidatesTags: ["Assets"],
            }),
            assetPatchFolderById: build.mutation<AssetPatchFolderByIdApiResponse, AssetPatchFolderByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/folder`,
                    method: "PATCH",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Assets"],
            }),
            assetClearThumbnail: build.mutation<AssetClearThumbnailApiResponse, AssetClearThumbnailApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/${queryArg.id}/thumbnail/clear`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Assets"],
            }),
            assetGetTree: build.query<AssetGetTreeApiResponse, AssetGetTreeApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/tree`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        parentId: queryArg.parentId,
                        idSearchTerm: queryArg.idSearchTerm,
                        pqlQuery: queryArg.pqlQuery,
                        excludeFolders: queryArg.excludeFolders,
                        path: queryArg.path,
                        pathIncludeParent: queryArg.pathIncludeParent,
                        pathIncludeDescendants: queryArg.pathIncludeDescendants,
                    },
                }),
                providesTags: ["Assets"],
            }),
            assetAdd: build.mutation<AssetAddApiResponse, AssetAddApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/add/${queryArg.parentId}`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Assets"],
            }),
            assetUploadInfo: build.query<AssetUploadInfoApiResponse, AssetUploadInfoApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/exists/${queryArg.parentId}`,
                    params: {
                        fileName: queryArg.fileName,
                    },
                }),
                providesTags: ["Assets"],
            }),
            assetReplace: build.mutation<AssetReplaceApiResponse, AssetReplaceApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/${queryArg.id}/replace`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Assets"],
            }),
            assetUploadZip: build.mutation<AssetUploadZipApiResponse, AssetUploadZipApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/add-zip/${queryArg.parentId}`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Assets"],
            }),
            assetVideoImageThumbnailStream: build.query<
                AssetVideoImageThumbnailStreamApiResponse,
                AssetVideoImageThumbnailStreamApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/${queryArg.id}/video/stream/image-thumbnail`,
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
            assetVideoDownloadByThumbnail: build.query<
                AssetVideoDownloadByThumbnailApiResponse,
                AssetVideoDownloadByThumbnailApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/${queryArg.id}/video/download/${queryArg.thumbnailName}`,
                }),
                providesTags: ["Assets"],
            }),
            assetVideoStreamByThumbnail: build.query<
                AssetVideoStreamByThumbnailApiResponse,
                AssetVideoStreamByThumbnailApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/${queryArg.id}/video/stream/${queryArg.thumbnailName}`,
                }),
                providesTags: ["Assets"],
            }),
            assetCustomMetadataGetById: build.query<
                AssetCustomMetadataGetByIdApiResponse,
                AssetCustomMetadataGetByIdApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/${queryArg.id}/custom-metadata` }),
                providesTags: ["Metadata"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type AssetCloneApiResponse =
    /** status 201 Successfully copied parent asset and created <strong>jobRun</strong> for copying child assets */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type AssetCloneApiArg = {
    /** Id of the asset */
    id: number;
    /** ParentId of the asset */
    parentId: number;
};
export type AssetCustomSettingsGetByIdApiResponse = /** status 200 Successfully retrieved custom settings as JSON */ {
    items?: CustomSettings;
};
export type AssetCustomSettingsGetByIdApiArg = {
    /** Id of the asset */
    id: number;
};
export type AssetGetTextDataByIdApiResponse = /** status 200 Successfully retrieved UTF8 encoded text data of asset */ {
    /** UTF 8 encoded text data */
    data: string;
};
export type AssetGetTextDataByIdApiArg = {
    /** Id of the asset */
    id: number;
};
export type AssetDocumentStreamPreviewApiResponse = /** status 200 Asset PDF preview stream */ Blob;
export type AssetDocumentStreamPreviewApiArg = {
    /** Id of the document */
    id: number;
};
export type AssetDownloadZipApiResponse = /** status 200 ZIP archive as attachment */ Blob;
export type AssetDownloadZipApiArg = {
    /** JobRunId of the JobRun */
    jobRunId: number;
};
export type AssetDeleteZipApiResponse = unknown;
export type AssetDeleteZipApiArg = {
    /** JobRunId of the JobRun */
    jobRunId: number;
};
export type AssetDownloadByIdApiResponse = /** status 200 Original asset binary file */ Blob;
export type AssetDownloadByIdApiArg = {
    /** Id of the asset */
    id: number;
};
export type AssetExportZipAssetApiResponse =
    /** status 201 Successfully created <strong>jobRun</strong> for zip export */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type AssetExportZipAssetApiArg = {
    body: {
        assets?: number[];
    };
};
export type AssetExportZipFolderApiResponse =
    /** status 201 Successfully created <strong>jobRun</strong> for zip export */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type AssetExportZipFolderApiArg = {
    body: {
        folders?: number[];
        filters?: GridFilter;
    };
};
export type AssetGetByIdApiResponse = /** status 200 Successfully retrieved one of asset type data as JSON */
    | Image
    | AssetDocument
    | Audio
    | Video
    | Archive
    | Text
    | AssetFolder
    | Unknown;
export type AssetGetByIdApiArg = {
    /** Id of the asset */
    id: number;
};
export type AssetUpdateByIdApiResponse = /** status 200 One of asset types */
    | Image
    | AssetDocument
    | Audio
    | Video
    | Archive
    | Text
    | AssetFolder
    | Unknown;
export type AssetUpdateByIdApiArg = {
    /** Id of the asset */
    id: number;
    body: {
        data: {
            parentId?: number | null;
            key?: string | null;
            locked?: string | null;
            data?: string | null;
            dataUri?: string | null;
            metadata?: UpdateCustomMetadata[] | null;
            customSettings?: UpdateCustomSettings[] | null;
            properties?: UpdateDataProperty[] | null;
            image?: ImageData | null;
        };
    };
};
export type AssetDeleteGridConfigurationByConfigurationIdApiResponse =
    /** status 200 Success */ GridDetailedConfiguration;
export type AssetDeleteGridConfigurationByConfigurationIdApiArg = {
    /** ConfigurationId of the element */
    configurationId: number;
};
export type AssetGetAvailableGridColumnsApiResponse =
    /** status 200 All available grid column configurations for assets */ {
        columns?: GridColumnConfiguration[];
    };
export type AssetGetAvailableGridColumnsApiArg = void;
export type AssetGetGridConfigurationByFolderIdApiResponse =
    /** status 200 Asset grid configuration */ GridDetailedConfiguration;
export type AssetGetGridConfigurationByFolderIdApiArg = {
    /** FolderId of the element */
    folderId: number;
    /** Configuration ID */
    configurationId?: number;
};
export type AssetGetSavedGridConfigurationsApiResponse =
    /** status 200 List of saved grid configurations for the given folder */ {
        totalItems: number;
        items: GridConfiguration[];
    };
export type AssetGetSavedGridConfigurationsApiArg = void;
export type AssetSaveGridConfigurationApiResponse =
    /** status 200 Asset grid configuration saved successfully */ GridConfiguration;
export type AssetSaveGridConfigurationApiArg = {
    /** FolderId of the folder */
    folderId: number;
    body: {
        folderId: number;
        pageSize: number;
        name: string;
        description: string;
        shareGlobal?: boolean;
        setAsFavorite?: boolean;
        saveFilter?: boolean;
        sharedUsers?: object;
        sharedRoles?: object;
        columns: Column[];
        filter?: GridFilter | null;
    };
};
export type AssetSetGridConfigurationAsFavoriteApiResponse = unknown;
export type AssetSetGridConfigurationAsFavoriteApiArg = {
    /** ConfigurationId of the configurationId */
    configurationId: number;
    /** FolderId of the folderId */
    folderId: number;
};
export type AssetUpdateGridConfigurationApiResponse = unknown;
export type AssetUpdateGridConfigurationApiArg = {
    /** ConfigurationId of the configurationId */
    configurationId: number;
    body: {
        folderId: number;
        pageSize: number;
        name: string;
        description: string;
        shareGlobal?: boolean;
        setAsFavorite?: boolean;
        saveFilter?: boolean;
        sharedUsers?: object;
        sharedRoles?: object;
        columns: Column[];
        filter?: GridFilter | null;
    };
};
export type AssetGetGridApiResponse = /** status 200 Asset grid data */ {
    totalItems: number;
    items: {
        id?: number;
        columns?: GridColumnData[];
        isLocked?: boolean;
        permissions?: Permissions;
    }[];
};
export type AssetGetGridApiArg = {
    body: {
        folderId: number;
        columns: GridColumnRequest[];
        filters?: GridFilter;
    };
};
export type AssetImageDownloadCustomApiResponse = /** status 200 Custom image binary file */ Blob;
export type AssetImageDownloadCustomApiArg = {
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
export type AssetImageStreamCustomApiResponse =
    /** status 200 Image asset stream based on custom thumbnail configuration */ Blob;
export type AssetImageStreamCustomApiArg = {
    /** Id of the image */
    id: number;
    /** Mime type of downloaded image. */
    mimeType: "JPEG" | "PNG";
    /** Resize mode of downloaded image. */
    resizeMode: "scaleByHeight" | "scaleByWidth" | "resize" | "none";
    /** Width of downloaded image */
    width?: number;
    /** Height of downloaded image */
    height?: number;
    /** Quality of downloaded image */
    quality?: number;
    /** Dpi of downloaded image */
    dpi?: number;
    /** Contain */
    contain?: boolean;
    /** Frame */
    frame?: boolean;
    /** Cover */
    cover?: boolean;
    /** ForceResize */
    forceResize?: boolean;
    cropPercent?: boolean;
    /** CropWidth of downloaded image */
    cropWidth?: number;
    /** CropHeight of downloaded image */
    cropHeight?: number;
    /** CropTop of downloaded image */
    cropTop?: number;
    /** CropLeft of downloaded image */
    cropLeft?: number;
};
export type AssetImageDownloadByFormatApiResponse = /** status 200 Image asset binary file based on format */ Blob;
export type AssetImageDownloadByFormatApiArg = {
    /** Id of the image */
    id: number;
    /** Find asset by matching format type. */
    format: "office" | "print" | "web";
};
export type AssetImageStreamPreviewApiResponse = /** status 200 Image preview stream */ Blob;
export type AssetImageStreamPreviewApiArg = {
    /** Id of the image */
    id: number;
};
export type AssetImageStreamApiResponse = /** status 200 Stream of an original image asset */ Blob;
export type AssetImageStreamApiArg = {
    /** Id of the image */
    id: number;
};
export type AssetImageDownloadByThumbnailApiResponse =
    /** status 200 Image asset binary file based on thumbnail name */ Blob;
export type AssetImageDownloadByThumbnailApiArg = {
    /** Id of the image */
    id: number;
    /** Find asset by matching thumbnail name. */
    thumbnailName: string;
};
export type AssetPatchByIdApiResponse = /** status 201 Successfully created jobRun for patching multiple assets */ {
    /** ID of created jobRun */
    jobRunId: number;
};
export type AssetPatchByIdApiArg = {
    body: {
        data: {
            /** Asset ID */
            id: number;
            parentId?: number | null;
            key?: string | null;
            locked?: string | null;
            metadata?: PatchCustomMetadata[] | null;
        }[];
    };
};
export type AssetPatchFolderByIdApiResponse =
    /** status 201 Successfully created jobRun for patching multiple assets */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type AssetPatchFolderByIdApiArg = {
    body: {
        data: {
            /** Folder ID */
            folderId: number;
            parentId?: number | null;
            key?: string | null;
            locked?: string | null;
            metadata?: PatchCustomMetadata[] | null;
        }[];
        filters?: GridFilter;
    };
};
export type AssetClearThumbnailApiResponse = unknown;
export type AssetClearThumbnailApiArg = {
    /** Id of the asset */
    id: number;
};
export type AssetGetTreeApiResponse = /** status 200 asset_get_tree_success_description */ {
    totalItems: number;
    items: (Image | AssetDocument | Audio | Video | Archive | Text | AssetFolder | Unknown)[];
};
export type AssetGetTreeApiArg = {
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Filter assets by parent id. */
    parentId?: number;
    /** Filter assets/data-objects by matching ids. As a wildcard * can be used */
    idSearchTerm?: string;
    /** Pql query filter */
    pqlQuery?: string;
    /** Filter folders from result. */
    excludeFolders?: boolean;
    /** Filter by path. */
    path?: string;
    /** Include the parent item in the result. */
    pathIncludeParent?: boolean;
    /** Include all descendants in the result. */
    pathIncludeDescendants?: boolean;
};
export type AssetAddApiResponse = /** status 200 ID of successfully uploaded new asset */ {
    /** ID of created asset */
    id: number;
};
export type AssetAddApiArg = {
    /** ParentId of the asset */
    parentId: number;
    body: {
        /** File to upload */
        file: Blob;
    };
};
export type AssetUploadInfoApiResponse =
    /** status 200 Returns true if asset with the same name and in the same path already exists, false otherwise */ {
        /** True if asset exists, false otherwise */
        exists: boolean;
    };
export type AssetUploadInfoApiArg = {
    /** ParentId of the asset */
    parentId: number;
    /** Name of the file to upload */
    fileName: string;
};
export type AssetReplaceApiResponse = /** status 200 File name of the successfully replaced asset */ {
    /** new file name of the asset */
    data: string;
};
export type AssetReplaceApiArg = {
    /** Id of the asset */
    id: number;
    body: {
        /** File to upload */
        file: Blob;
    };
};
export type AssetUploadZipApiResponse = /** status 201 Successfully created jobRun ID to upload multiple assets */ {
    /** ID of created jobRun */
    jobRunId: number;
};
export type AssetUploadZipApiArg = {
    /** ParentId of the asset */
    parentId: number;
    body: {
        /** Zip file to upload */
        zipFile: Blob;
    };
};
export type AssetVideoImageThumbnailStreamApiResponse = /** status 200 Video image thumbnail stream */ Blob;
export type AssetVideoImageThumbnailStreamApiArg = {
    /** Id of the video */
    id: number;
    /** Width of the video image thumbnail */
    width?: number;
    /** Height of the video image thumbnail */
    height?: number;
    /** Aspect ratio of the video image thumbnail */
    aspectRatio?: boolean;
    /** Frame of the video image thumbnail */
    frame?: boolean;
    /** Generate the asset asynchronously */
    async?: boolean;
};
export type AssetVideoDownloadByThumbnailApiResponse = /** status 200 Video binary file based on thumbnail name */ Blob;
export type AssetVideoDownloadByThumbnailApiArg = {
    /** Id of the video */
    id: number;
    /** Find asset by matching thumbnail name. */
    thumbnailName: string;
};
export type AssetVideoStreamByThumbnailApiResponse = /** status 200 Video stream based on thumbnail name */ Blob;
export type AssetVideoStreamByThumbnailApiArg = {
    /** Id of the video */
    id: number;
    /** Find asset by matching thumbnail name. */
    thumbnailName: string;
};
export type AssetCustomMetadataGetByIdApiResponse = /** status 200 Successfully retrieved custom metadata as JSON */ {
    items?: CustomMetadata[];
};
export type AssetCustomMetadataGetByIdApiArg = {
    /** Id of the asset */
    id: number;
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
export type FixedCustomSettings = {
    /** embedded meta data of the asset - array of any key-value pairs */
    embeddedMetadata: object[];
    /** flag to indicate if the embedded meta data has been extracted from the asset */
    embeddedMetadataExtracted: boolean;
};
export type CustomSettings = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** fixed custom settings */
    fixedCustomSettings?: FixedCustomSettings | null;
    /** dynamic custom settings - can be any key-value pair */
    dynamicCustomSettings?: object[];
};
export type GridFilter = {
    /** Page */
    page: number;
    /** Page Size */
    pageSize: number;
    /** Include Descendant Items */
    includeDescendants: boolean;
    /** Column Filter */
    columnFilters?: object;
    /** Sort Filter */
    sortFilter?: object;
};
export type ElementIcon = {
    /** Icon type */
    type: "name" | "path";
    /** Icon value */
    value: string;
};
export type Element = {
    /** ID */
    id: number;
    /** ID of parent */
    parentId: number;
    /** path */
    path: string;
    /** icon */
    icon?: ElementIcon;
    /** ID of owner */
    userOwner: number;
    /** User that modified the element */
    userModification: number | null;
    /** Locked */
    locked: string | null;
    /** Is locked */
    isLocked: boolean;
    /** Creation date */
    creationDate: number | null;
    /** Modification date */
    modificationDate: number | null;
};
export type CustomAttributes = {
    /** Custom Icon */
    icon: ElementIcon | null;
    /** Custom Tooltip */
    tooltip: string | null;
    /** AdditionalIcons */
    additionalIcons: string[];
    /** Custom Key/Filename */
    key: string | null;
    /** Additional Css Classes */
    additionalCssClasses: string[];
};
export type Permissions = {
    /** List */
    list: boolean;
    /** View */
    view: boolean;
    /** Publish */
    publish: boolean;
    /** Delete */
    delete: boolean;
    /** Rename */
    rename: boolean;
    /** Create */
    create: boolean;
    /** Settings */
    settings: boolean;
    /** Versions */
    versions: boolean;
    /** Properties */
    properties: boolean;
};
export type AssetPermissions = Permissions;
export type Asset = Element & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Custom attributes for the tree */
    customAttributes: CustomAttributes;
    /** Has workflow available */
    hasWorkflowAvailable: boolean;
    /** Has children */
    hasChildren: boolean;
    /** Type */
    type: string;
    /** Filename */
    filename: string;
    /** Mimetype */
    mimeType: string | null;
    /** Has metadata */
    hasMetadata: boolean;
    /** Workflow permissions */
    hasWorkflowWithPermissions: boolean;
    /** Full path */
    fullPath: string;
    permissions: AssetPermissions;
};
export type Image = Asset & {
    /** Format */
    format: string;
    /** width */
    width: number;
    /** height */
    height: number;
    /** is vector graphic */
    isVectorGraphic: boolean;
    /** is animated */
    isAnimated: boolean;
    /** path to thumbnail */
    imageThumbnailPath: string;
};
export type AssetDocument = Asset & {
    /** Page count */
    pageCount: number | null;
    /** Path to image thumbnail */
    imageThumbnailPath: string | null;
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
export type AssetFolder = Asset;
export type Unknown = Asset;
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
    /** focalPoint */
    focalPoint?: FocalPoint;
};
export type Column = {
    /** Key of the Column */
    key: string;
    /** Locale of the Column */
    locale: string | null;
    /** Group of the Column */
    group: string;
};
export type GridDetailedConfiguration = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Name */
    name: string;
    /** Description */
    description?: string | null;
    /** shareGlobal */
    shareGlobal: boolean;
    /** saveFilter */
    saveFilter: boolean;
    /** setAsFavorite */
    setAsFavorite: boolean;
    /** sharedUsers */
    sharedUsers: object;
    /** sharedRoles */
    sharedRoles: object;
    /** columns */
    columns: Column[];
    /** filter */
    filter: GridFilter[];
    /** Page Size */
    pageSize: number;
    /** Modification Date */
    modificationDate?: number | null;
    /** Creation Date */
    creationDate?: number | null;
    /** ID of the owner */
    ownerId?: number | null;
    /** ID of the configuration */
    id?: number | null;
};
export type GridColumnConfiguration = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key */
    key: string;
    /** Group */
    group: string;
    /** Sortable */
    sortable: boolean;
    /** Editable */
    editable: boolean;
    /** Exportable */
    exportable?: boolean;
    /** Filterable */
    filterable?: boolean;
    /** Localizable */
    localizable: boolean;
    /** Locale */
    locale?: string | null;
    /** Type */
    type: string;
    /** Frontend Type */
    frontendType?: string;
    /** Config */
    config: object;
};
export type GridConfiguration = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number;
    /** Name */
    name: string;
    /** Description */
    description?: string | null;
};
export type GridColumnData = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key */
    key?: string;
    /** Locale */
    locale?: string | null;
    /** Value */
    value?: any | null;
    /** inheritance */
    inheritance?: object | null;
};
export type RelationFieldConfig = {
    /** Relation Getter */
    relation: string;
    /** Field getter */
    field: string;
};
export type SimpleFieldConfig = {
    /** Field getter */
    field: string;
};
export type StaticTextConfig = {
    /** Static Text */
    text: string;
};
export type ExistingColumnConfig = {
    /** Name of the existing Column */
    existingColumnName?: string;
};
export type Transformer = {
    /** Key of the Transformer */
    key: string;
};
export type AdvancedColumnConfig = {
    /** advancedColumns */
    advancedColumn?: (RelationFieldConfig | SimpleFieldConfig | StaticTextConfig | ExistingColumnConfig)[];
    /** Concatenation symbol to combine multiple columns */
    concatenationSymbol?: string;
    /** List if Transformers that should be applied */
    transformers?: Transformer[];
};
export type GridColumnRequest = {
    /** Key */
    key: string;
    /** Locale */
    locale?: string | null;
    /** Type */
    type: string;
    /** Group */
    group?: string | null;
    /** Config */
    config: (string | AdvancedColumnConfig)[];
};
export type PatchCustomMetadata = {
    /** Name */
    name: string;
    /** Language */
    language: string | null;
    /** Type */
    type: string;
    /** Data */
    data: string | null;
};
export type CustomMetadata = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Name */
    name: string;
    /** Language */
    language: string;
    /** Type */
    type: string;
    /** Data */
    data: any | null;
};
export const {
    useAssetCloneMutation,
    useAssetCustomSettingsGetByIdQuery,
    useAssetGetTextDataByIdQuery,
    useAssetDocumentStreamPreviewQuery,
    useAssetDownloadZipQuery,
    useAssetDeleteZipMutation,
    useAssetDownloadByIdQuery,
    useAssetExportZipAssetMutation,
    useAssetExportZipFolderMutation,
    useAssetGetByIdQuery,
    useAssetUpdateByIdMutation,
    useAssetDeleteGridConfigurationByConfigurationIdMutation,
    useAssetGetAvailableGridColumnsQuery,
    useAssetGetGridConfigurationByFolderIdQuery,
    useAssetGetSavedGridConfigurationsQuery,
    useAssetSaveGridConfigurationMutation,
    useAssetSetGridConfigurationAsFavoriteMutation,
    useAssetUpdateGridConfigurationMutation,
    useAssetGetGridQuery,
    useAssetImageDownloadCustomQuery,
    useAssetImageStreamCustomQuery,
    useAssetImageDownloadByFormatQuery,
    useAssetImageStreamPreviewQuery,
    useAssetImageStreamQuery,
    useAssetImageDownloadByThumbnailQuery,
    useAssetPatchByIdMutation,
    useAssetPatchFolderByIdMutation,
    useAssetClearThumbnailMutation,
    useAssetGetTreeQuery,
    useAssetAddMutation,
    useAssetUploadInfoQuery,
    useAssetReplaceMutation,
    useAssetUploadZipMutation,
    useAssetVideoImageThumbnailStreamQuery,
    useAssetVideoDownloadByThumbnailQuery,
    useAssetVideoStreamByThumbnailQuery,
    useAssetCustomMetadataGetByIdQuery,
} = injectedRtkApi;
