import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Assets", "Asset Grid", "Versions"] as const;
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
            assetCustomMetadataGetById: build.query<
                AssetCustomMetadataGetByIdApiResponse,
                AssetCustomMetadataGetByIdApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/${queryArg.id}/custom-metadata` }),
                providesTags: ["Assets"],
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
            assetCreateZip: build.mutation<AssetCreateZipApiResponse, AssetCreateZipApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/zip/create`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Assets"],
            }),
            assetDownloadCsv: build.query<AssetDownloadCsvApiResponse, AssetDownloadCsvApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/download/csv/${queryArg.jobRunId}` }),
                providesTags: ["Assets"],
            }),
            assetDeleteCsv: build.mutation<AssetDeleteCsvApiResponse, AssetDeleteCsvApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/download/csv/${queryArg.jobRunId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Assets"],
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
            assetGetGrid: build.mutation<AssetGetGridApiResponse, AssetGetGridApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/grid`, method: "POST", body: queryArg.body }),
                invalidatesTags: ["Asset Grid"],
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
            assetImageDownloadByFormat: build.query<
                AssetImageDownloadByFormatApiResponse,
                AssetImageDownloadByFormatApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/${queryArg.id}/image/download/format/${queryArg.format}`,
                }),
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
            assetGetTree: build.query<AssetGetTreeApiResponse, AssetGetTreeApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/assets/tree`,
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
export type AssetCustomMetadataGetByIdApiResponse = /** status 200 Successfully retrieved custom metadata as JSON */ {
    items?: CustomMetadata[];
};
export type AssetCustomMetadataGetByIdApiArg = {
    /** Id of the asset */
    id: number;
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
export type AssetCreateZipApiResponse = /** status 201 Successfully created <strong>jobRun</strong> for zip export */ {
    /** ID of created jobRun */
    jobRunId: number;
};
export type AssetCreateZipApiArg = {
    body: {
        items?: number[];
    };
};
export type AssetDownloadCsvApiResponse = /** status 200 CSV File as attachment */ Blob;
export type AssetDownloadCsvApiArg = {
    /** JobRunId of the JobRun */
    jobRunId: number;
};
export type AssetDeleteCsvApiResponse = /** status 200 Success */ void;
export type AssetDeleteCsvApiArg = {
    /** JobRunId of the JobRun */
    jobRunId: number;
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
                | "asset_to_export"
                | "folder_to_export"
                | "asset_export_data"
                | "config"
                | "columns"
                | "filters"
                | "delimiter"
                | "header"
                | "no_header"
                | "title"
                | "name"
                | "\r\n";
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
                | "asset_to_export"
                | "folder_to_export"
                | "asset_export_data"
                | "config"
                | "columns"
                | "filters"
                | "delimiter"
                | "header"
                | "no_header"
                | "title"
                | "name"
                | "\r\n";
        };
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
            metadata?: UpdateCustomMetadata[] | null;
            customSettings?: UpdateCustomSettings[] | null;
            properties?: UpdateDataProperty[] | null;
            image?: ImageData | null;
        };
    };
};
export type AssetGetAvailableGridColumnsApiResponse =
    /** status 200 All available grid column configurations for assets */ {
        columns?: GridColumnConfiguration[];
    };
export type AssetGetAvailableGridColumnsApiArg = void;
export type AssetGetGridConfigurationByFolderIdApiResponse =
    /** status 200 Asset grid configuration */ GridConfiguration;
export type AssetGetGridConfigurationByFolderIdApiArg = {
    /** FolderId of the element */
    folderId: number;
    /** Configuration ID */
    configurationId?: number;
};
export type AssetGetSavedGridConfigurationsApiResponse =
    /** status 200 List of saved grid configurations for the given folder */ {
        totalItems: number;
        items: GridConfiguration2[];
    };
export type AssetGetSavedGridConfigurationsApiArg = {
    /** FolderId of the folderId */
    folderId: number;
};
export type AssetSaveGridConfigurationApiResponse = /** status 200 Asset grid configuration saved successfully */ void;
export type AssetSaveGridConfigurationApiArg = {
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
        columns?: GridColumnData[];
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
export type AssetImageDownloadByFormatApiResponse = /** status 200 Image asset binary file based on format */ Blob;
export type AssetImageDownloadByFormatApiArg = {
    /** Id of the image */
    id: number;
    /** Find asset by matching format type. */
    format: "office" | "print" | "web";
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
            parentId?: number | null;
            key?: string | null;
            locked?: string | null;
            metadata?: PatchCustomMetadata[] | null;
        }[];
    };
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
export type AssetReplaceApiResponse = /** status 200 Successfully replaced asset binary */ void;
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
    /** Aspect ratio */
    aspectRatio?: boolean;
    /** Frame */
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
    embeddedMetadata: any[];
    /** flag to indicate if the embedded meta data has been extracted from the asset */
    embeddedMetadataExtracted: boolean;
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
    config: string[];
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
    icon?: ElementIcon;
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
        [key: string]: string | number | boolean | object | any[];
    };
    customAttributes?: CustomAttributes;
    /** Has children */
    hasChildren?: boolean;
    /** Type */
    type?: string;
    /** Filename */
    filename?: string;
    /** Mimetype */
    mimeType?: string | null;
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
    focalPoint?: FocalPoint;
};
export type GridColumnConfiguration = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** Key */
    key: string;
    /** Group */
    group: string;
    /** Sortable */
    sortable: boolean;
    /** Editable */
    editable: boolean;
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
export type Column = {
    /** Key of the Column */
    key: string;
    /** Locale of the Column */
    locale: string | null;
    /** Group of the Column */
    group: string;
};
export type GridConfiguration = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** Name */
    name: string;
    /** Description */
    description: string;
    /** shareGlobal */
    shareGlobal?: boolean;
    /** saveFilter */
    saveFilter?: boolean;
    /** setAsFavorite */
    setAsFavorite?: boolean;
    /** sharedUsers */
    sharedUsers?: object;
    /** sharedRoles */
    sharedRoles?: object;
    /** columns */
    columns?: Column[];
    /** filter */
    filter?: GridFilter[];
    /** Page Size */
    pageSize?: number;
};
export type GridConfiguration2 = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
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
        [key: string]: string | number | boolean | object | any[];
    };
    /** Key */
    key?: string;
    /** Locale */
    locale?: string | null;
    /** Value */
    value?: any | null;
};
export type PatchCustomMetadata = {
    /** Name */
    name: string;
    /** Language */
    language?: string | null;
    /** Data */
    data?: string | null;
};
export const {
    useAssetCloneMutation,
    useAssetCustomMetadataGetByIdQuery,
    useAssetCustomSettingsGetByIdQuery,
    useAssetGetTextDataByIdQuery,
    useAssetDocumentStreamPreviewQuery,
    useAssetCreateZipMutation,
    useAssetDownloadCsvQuery,
    useAssetDeleteCsvMutation,
    useAssetDownloadZipQuery,
    useAssetDeleteZipMutation,
    useAssetDownloadByIdQuery,
    useAssetExportCsvAssetMutation,
    useAssetExportCsvFolderMutation,
    useAssetGetByIdQuery,
    useAssetUpdateByIdMutation,
    useAssetGetAvailableGridColumnsQuery,
    useAssetGetGridConfigurationByFolderIdQuery,
    useAssetGetSavedGridConfigurationsQuery,
    useAssetSaveGridConfigurationMutation,
    useAssetSetGridConfigurationAsFavoriteMutation,
    useAssetUpdateGridConfigurationMutation,
    useAssetGetGridMutation,
    useAssetImageDownloadCustomQuery,
    useAssetImageDownloadByFormatQuery,
    useAssetImageDownloadByThumbnailQuery,
    useAssetPatchByIdMutation,
    useAssetGetTreeQuery,
    useAssetAddMutation,
    useAssetUploadInfoQuery,
    useAssetReplaceMutation,
    useAssetUploadZipMutation,
    useAssetVideoImageThumbnailStreamQuery,
    useAssetVideoDownloadByThumbnailQuery,
    useAssetVideoStreamByThumbnailQuery,
    useVersionAssetDownloadByIdQuery,
} = injectedRtkApi;
