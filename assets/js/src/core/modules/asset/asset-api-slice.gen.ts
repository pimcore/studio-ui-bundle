import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Assets", "Asset Grid", "Asset Search", "Metadata", "Versions"] as const;
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
            assetExportCsvAsset: build.mutation<AssetExportCsvAssetApiResponse, AssetExportCsvAssetApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/export/csv/asset`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Assets"],
            }),
            assetExportCsvFolder: build.mutation<AssetExportCsvFolderApiResponse, AssetExportCsvFolderApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/export/csv/folder`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Assets"],
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
                    url: `/pimcore-studio/api/assets/grid/configuration/${queryArg.folderId}/${queryArg.configurationId}`,
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
                    params: { configurationId: queryArg.configurationId },
                }),
                providesTags: ["Asset Grid"],
            }),
            assetGetSavedGridConfigurations: build.query<
                AssetGetSavedGridConfigurationsApiResponse,
                AssetGetSavedGridConfigurationsApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/grid/configurations/${queryArg.folderId}` }),
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
            assetGetSearchConfiguration: build.query<
                AssetGetSearchConfigurationApiResponse,
                AssetGetSearchConfigurationApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/assets/search/configuration/` }),
                providesTags: ["Asset Search"],
            }),
            assetGetSearch: build.mutation<AssetGetSearchApiResponse, AssetGetSearchApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/search`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Asset Search"],
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
                    params: { fileName: queryArg.fileName },
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
            versionAssetDownloadById: build.query<VersionAssetDownloadByIdApiResponse, VersionAssetDownloadByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/versions/${queryArg.id}/asset/download` }),
                providesTags: ["Versions"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type AssetCloneApiResponse =
    /** status 200 Successfully copied asset */ void | /** status 201 Successfully copied parent asset and created <strong>jobRun</strong> for copying child assets */ {
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
export type AssetDeleteZipApiResponse = /** status 200 Success */ void;
export type AssetDeleteZipApiArg = {
    /** JobRunId of the JobRun */
    jobRunId: number;
};
export type AssetDownloadByIdApiResponse = /** status 200 Original asset binary file */ Blob;
export type AssetDownloadByIdApiArg = {
    /** Id of the asset */
    id: number;
};
export type AssetExportCsvAssetApiResponse =
    /** status 201 Successfully created <strong>jobRun</strong> for csv export */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type AssetExportCsvAssetApiArg = {
    body: {
        assets?: number[];
        columns?: GridColumnRequest[];
        config?: {
            delimiter?: string;
            header?:
                | "id"
                | "custom_report_config"
                | "custom_report_to_export"
                | "asset_to_export"
                | "folder_to_export"
                | "csv_export_data"
                | "config"
                | "columns"
                | "filters"
                | "delimiter"
                | "header"
                | "no_header"
                | "title"
                | "name"
                | "\r\n"
                | "array"
                | "int"
                | "string"
                | "bool";
        };
    };
};
export type AssetExportCsvFolderApiResponse =
    /** status 201 Successfully created <strong>jobRun</strong> for csv export */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type AssetExportCsvFolderApiArg = {
    body: {
        folders?: number[];
        columns?: GridColumnRequest[];
        filters?: GridFilter;
        config?: {
            delimiter?: string;
            header?:
                | "id"
                | "custom_report_config"
                | "custom_report_to_export"
                | "asset_to_export"
                | "folder_to_export"
                | "csv_export_data"
                | "config"
                | "columns"
                | "filters"
                | "delimiter"
                | "header"
                | "no_header"
                | "title"
                | "name"
                | "\r\n"
                | "array"
                | "int"
                | "string"
                | "bool";
        };
    };
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
            parentId?: any;
            key?: any;
            locked?: any;
            data?: any;
            dataUri?: any;
            metadata?: UpdateCustomMetadata[];
            customSettings?: UpdateCustomSettings[];
            properties?: UpdateDataProperty[];
            image?: ImageData | null;
        };
    };
};
export type AssetDeleteGridConfigurationByConfigurationIdApiResponse =
    /** status 200 Success */ GridDetailedConfiguration;
export type AssetDeleteGridConfigurationByConfigurationIdApiArg = {
    /** FolderId of the element */
    folderId: number;
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
export type AssetGetSavedGridConfigurationsApiArg = {
    /** FolderId of the folderId */
    folderId: number;
};
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
export type AssetSetGridConfigurationAsFavoriteApiResponse =
    /** status 200 asset_set_grid_configuration_as_favorite_response */ void;
export type AssetSetGridConfigurationAsFavoriteApiArg = {
    /** ConfigurationId of the configurationId */
    configurationId: number;
    /** FolderId of the folderId */
    folderId: number;
};
export type AssetUpdateGridConfigurationApiResponse =
    /** status 200 Asset grid configuration updated successfully */ void;
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
export type AssetPatchByIdApiResponse =
    /** status 200 Successfully patched asset */ void | /** status 201 Successfully created jobRun for patching multiple assets */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type AssetPatchByIdApiArg = {
    body: {
        data: {
            /** Asset ID */
            id: number;
            parentId?: any;
            key?: any;
            locked?: any;
            metadata?: PatchCustomMetadata[];
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
            parentId?: any;
            key?: any;
            locked?: any;
            metadata?: PatchCustomMetadata[];
        }[];
        filters?: GridFilter;
    };
};
export type AssetGetSearchConfigurationApiResponse =
    /** status 200 Asset search configuration */ GridDetailedConfiguration;
export type AssetGetSearchConfigurationApiArg = void;
export type AssetGetSearchApiResponse = /** status 200 Assets for search grid */ {
    totalItems: number;
    items: {
        id?: number;
        columns?: GridColumnData[];
        isLocked?: boolean;
        permissions?: Permissions;
    }[];
};
export type AssetGetSearchApiArg = {
    body: {
        columns: GridColumnRequest[];
        filters?: GridFilter;
    };
};
export type AssetClearThumbnailApiResponse = /** status 200 Success */ void;
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
export type VersionAssetDownloadByIdApiResponse = /** status 200 Asset version binary file */ Blob;
export type VersionAssetDownloadByIdApiArg = {
    /** Id of the version */
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
export type AdvancedColumnConfig = {
    /** advancedColumns */
    advancedColumn?: (RelationFieldConfig | SimpleFieldConfig)[];
};
export type GridColumnRequest = {
    /** Key */
    key: string;
    /** Locale */
    locale?: any;
    /** Type */
    type: string;
    /** Group */
    group?: any;
    /** Config */
    config: (string | AdvancedColumnConfig)[];
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
    userModification: number;
    /** Locked */
    locked: any;
    /** Is locked */
    isLocked: boolean;
    /** Creation date */
    creationDate: any;
    /** Modification date */
    modificationDate: any;
};
export type CustomAttributes = {
    /** Custom Icon */
    icon: ElementIcon | null;
    /** Custom Tooltip */
    tooltip: any;
    /** AdditionalIcons */
    additionalIcons: string[];
    /** Custom Key/Filename */
    key: any;
    /** Additional Css Classes */
    additionalCssClasses: string[];
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
export type AssetPermissions = Permissions;
export type Asset = Element & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Custom attributes for the tree */
    customAttributes?: CustomAttributes;
    /** Has workflow available */
    hasWorkflowAvailable?: boolean;
    /** Has children */
    hasChildren?: boolean;
    /** Type */
    type?: string;
    /** Filename */
    filename?: string;
    /** Mimetype */
    mimeType?: any;
    /** Has metadata */
    hasMetadata?: boolean;
    /** Workflow permissions */
    hasWorkflowWithPermissions?: boolean;
    /** Full path */
    fullPath?: string;
    permissions?: AssetPermissions;
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
export type AssetDocument = Asset & {
    /** Page count */
    pageCount?: any;
    /** Path to image thumbnail */
    imageThumbnailPath?: any;
};
export type Audio = Asset;
export type Video = Asset & {
    /** Duration */
    duration?: any;
    /** Width */
    width?: any;
    /** Height */
    height?: any;
    /** Path to Image Thumbnail */
    imageThumbnailPath?: any;
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
    data: any;
};
export type UpdateCustomSettings = {
    /** Key */
    key: string;
    /** Value */
    value: any;
};
export type UpdateDataProperty = {
    /** key */
    key: string;
    /** data */
    data: any;
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
    locale: any;
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
    description: string;
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
    modificationDate?: any;
    /** Creation Date */
    creationDate?: any;
    /** ID of the owner */
    ownerId?: any;
    /** ID of the configuration */
    id?: any;
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
    /** Localizable */
    localizable: boolean;
    /** Locale */
    locale?: any;
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
    description: string;
};
export type GridColumnData = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key */
    key?: string;
    /** Locale */
    locale?: any;
    /** Value */
    value?: any;
    /** inheritance */
    inheritance?: any;
};
export type PatchCustomMetadata = {
    /** Name */
    name: string;
    /** Language */
    language?: any;
    /** Data */
    data?: any;
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
    data: any;
};
export const {
    useAssetCloneMutation,
    useAssetCustomSettingsGetByIdQuery,
    useAssetGetTextDataByIdQuery,
    useAssetDocumentStreamPreviewQuery,
    useAssetDownloadZipQuery,
    useAssetDeleteZipMutation,
    useAssetDownloadByIdQuery,
    useAssetExportCsvAssetMutation,
    useAssetExportCsvFolderMutation,
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
    useAssetGetSearchConfigurationQuery,
    useAssetGetSearchMutation,
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
    useVersionAssetDownloadByIdQuery,
} = injectedRtkApi;
