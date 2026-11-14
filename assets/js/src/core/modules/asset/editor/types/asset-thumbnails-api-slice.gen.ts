import { api } from "@sdk/api";
export const addTagTypes = ["Asset Thumbnails"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            thumbnailImageGetCollection: build.query<
                ThumbnailImageGetCollectionApiResponse,
                ThumbnailImageGetCollectionApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/thumbnails/image` }),
                providesTags: ["Asset Thumbnails"],
            }),
            thumbnailImageCreate: build.mutation<ThumbnailImageCreateApiResponse, ThumbnailImageCreateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/thumbnails/image/config`,
                    method: "POST",
                    body: queryArg.createThumbnailConfig,
                }),
                invalidatesTags: ["Asset Thumbnails"],
            }),
            thumbnailImageGetByName: build.query<ThumbnailImageGetByNameApiResponse, ThumbnailImageGetByNameApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/thumbnails/image/config/${queryArg.name}` }),
                providesTags: ["Asset Thumbnails"],
            }),
            thumbnailImageUpdate: build.mutation<ThumbnailImageUpdateApiResponse, ThumbnailImageUpdateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/thumbnails/image/config/${queryArg.name}`,
                    method: "PUT",
                    body: queryArg.updateThumbnailConfig,
                }),
                invalidatesTags: ["Asset Thumbnails"],
            }),
            thumbnailImageDelete: build.mutation<ThumbnailImageDeleteApiResponse, ThumbnailImageDeleteApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/thumbnails/image/config/${queryArg.name}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Asset Thumbnails"],
            }),
            thumbnailImageGetTree: build.query<ThumbnailImageGetTreeApiResponse, ThumbnailImageGetTreeApiArg>({
                query: () => ({ url: `/pimcore-studio/api/thumbnails/image/tree` }),
                providesTags: ["Asset Thumbnails"],
            }),
            thumbnailVideoGetCollection: build.query<
                ThumbnailVideoGetCollectionApiResponse,
                ThumbnailVideoGetCollectionApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/thumbnails/video` }),
                providesTags: ["Asset Thumbnails"],
            }),
            thumbnailVideoCreate: build.mutation<ThumbnailVideoCreateApiResponse, ThumbnailVideoCreateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/thumbnails/video/config`,
                    method: "POST",
                    body: queryArg.createThumbnailConfig,
                }),
                invalidatesTags: ["Asset Thumbnails"],
            }),
            thumbnailVideoGetByName: build.query<ThumbnailVideoGetByNameApiResponse, ThumbnailVideoGetByNameApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/thumbnails/video/config/${queryArg.name}` }),
                providesTags: ["Asset Thumbnails"],
            }),
            thumbnailVideoUpdate: build.mutation<ThumbnailVideoUpdateApiResponse, ThumbnailVideoUpdateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/thumbnails/video/config/${queryArg.name}`,
                    method: "PUT",
                    body: queryArg.updateThumbnailConfig,
                }),
                invalidatesTags: ["Asset Thumbnails"],
            }),
            thumbnailVideoDelete: build.mutation<ThumbnailVideoDeleteApiResponse, ThumbnailVideoDeleteApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/thumbnails/video/config/${queryArg.name}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Asset Thumbnails"],
            }),
            thumbnailVideoGetTree: build.query<ThumbnailVideoGetTreeApiResponse, ThumbnailVideoGetTreeApiArg>({
                query: () => ({ url: `/pimcore-studio/api/thumbnails/video/tree` }),
                providesTags: ["Asset Thumbnails"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type ThumbnailImageGetCollectionApiResponse = /** status 200 All downloadable image thumbnails */ {
    items: Thumbnail[];
};
export type ThumbnailImageGetCollectionApiArg = void;
export type ThumbnailImageCreateApiResponse =
    /** status 200 Created image thumbnail configuration as JSON */ ImageThumbnailConfigDetail;
export type ThumbnailImageCreateApiArg = {
    createThumbnailConfig: CreateThumbnailConfig;
};
export type ThumbnailImageGetByNameApiResponse =
    /** status 200 Image thumbnail configuration as JSON */ ImageThumbnailConfigDetail;
export type ThumbnailImageGetByNameApiArg = {
    /** Image thumbnail configuration name */
    name: string;
};
export type ThumbnailImageUpdateApiResponse =
    /** status 200 Updated image thumbnail configuration as JSON */ ImageThumbnailConfigDetail;
export type ThumbnailImageUpdateApiArg = {
    /** Image thumbnail configuration name */
    name: string;
    updateThumbnailConfig: UpdateThumbnailConfig;
};
export type ThumbnailImageDeleteApiResponse = unknown;
export type ThumbnailImageDeleteApiArg = {
    /** Image thumbnail configuration name */
    name: string;
};
export type ThumbnailImageGetTreeApiResponse = /** status 200 Image thumbnail configuration tree as JSON */ {
    totalItems: number;
    items: (ThumbnailConfigurationData | ThumbnailConfigurationFolderData)[];
};
export type ThumbnailImageGetTreeApiArg = void;
export type ThumbnailVideoGetCollectionApiResponse = /** status 200 All video thumbnails */ {
    items: Thumbnail[];
};
export type ThumbnailVideoGetCollectionApiArg = void;
export type ThumbnailVideoCreateApiResponse =
    /** status 200 Successfully created video thumbnail configuration */ VideoThumbnailConfigDetail;
export type ThumbnailVideoCreateApiArg = {
    createThumbnailConfig: CreateThumbnailConfig;
};
export type ThumbnailVideoGetByNameApiResponse =
    /** status 200 Successfully retrieved video thumbnail configuration details */ VideoThumbnailConfigDetail;
export type ThumbnailVideoGetByNameApiArg = {
    /** Video thumbnail configuration name */
    name: string;
};
export type ThumbnailVideoUpdateApiResponse =
    /** status 200 Successfully updated video thumbnail configuration */ VideoThumbnailConfigDetail;
export type ThumbnailVideoUpdateApiArg = {
    /** Video thumbnail configuration name */
    name: string;
    updateThumbnailConfig: UpdateThumbnailConfig;
};
export type ThumbnailVideoDeleteApiResponse = unknown;
export type ThumbnailVideoDeleteApiArg = {
    /** Video thumbnail configuration name */
    name: string;
};
export type ThumbnailVideoGetTreeApiResponse =
    /** status 200 Successfully retrieved video thumbnail configuration tree */ {
        totalItems: number;
        items: (ThumbnailConfigurationData | ThumbnailConfigurationFolderData)[];
    };
export type ThumbnailVideoGetTreeApiArg = void;
export type Thumbnail = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** id */
    id: string;
    /** text */
    text: string;
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
export type ImageThumbnailSettings = {
    /** Thumbnail name */
    name: string;
    /** Thumbnail description */
    description: string | null;
    /** Thumbnail group */
    group: string | null;
    /** Output format */
    format: string;
    /** Quality setting */
    quality: number;
    /** High resolution factor */
    highResolution: number | null;
    /** Preserve color profile */
    preserveColor: boolean;
    /** Force process ICC profiles */
    forceProcessICCProfiles: boolean;
    /** Preserve meta data */
    preserveMetaData: boolean;
    /** Rasterize SVG */
    rasterizeSVG: boolean;
    /** Use crop box */
    useCropBox: boolean;
    /** Is downloadable */
    downloadable: boolean;
    /** Modification date timestamp */
    modificationDate: number | null;
    /** Creation date timestamp */
    creationDate: number | null;
    /** Filename suffix */
    filenameSuffix: string | null;
    /** Preserve animation */
    preserveAnimation: boolean;
};
export type ImageThumbnailConfigDetail = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Thumbnail settings */
    settings: ImageThumbnailSettings;
    /** Is configuration writeable */
    writeable: boolean;
    /** Media query configurations with transformation items */
    medias: object;
};
export type CreateThumbnailConfig = {
    /** Thumbnail configuration name */
    name: string;
};
export type UpdateThumbnailConfig = {
    /** Thumbnail settings configuration */
    settings: object;
    /** Media configurations with transformation items */
    medias: object;
    /** Media configurations order */
    mediaOrder: object;
};
export type ElementIcon = {
    /** Icon type */
    type: "name" | "path";
    /** Icon value */
    value: string;
};
export type SettingsConfigurationData = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Configuration ID */
    id: string;
    /** Configuration name */
    name: string;
    /** Configuration icon */
    icon: ElementIcon;
};
export type ThumbnailConfigurationData = SettingsConfigurationData & {
    /** Is configuration writeable */
    writeable: boolean;
};
export type ThumbnailConfigurationFolderData = SettingsConfigurationData & {
    /** Child nodes */
    children: ThumbnailConfigurationData[];
};
export type VideoThumbnailSettings = {
    /** Thumbnail name */
    name: string;
    /** Thumbnail description */
    description: string | null;
    /** Thumbnail group */
    group: string | null;
    /** Video bitrate in kbps */
    videoBitrate: number | null;
    /** Audio bitrate in kbps */
    audioBitrate: number | null;
    /** Modification date timestamp */
    modificationDate: number | null;
    /** Creation date timestamp */
    creationDate: number | null;
    /** Filename suffix */
    filenameSuffix: string | null;
};
export type VideoThumbnailConfigDetail = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Thumbnail settings */
    settings: VideoThumbnailSettings;
    /** Is configuration writeable */
    writeable: boolean;
    /** Media query configurations with transformation items */
    medias: object;
};
export const {
    useThumbnailImageGetCollectionQuery,
    useThumbnailImageCreateMutation,
    useThumbnailImageGetByNameQuery,
    useThumbnailImageUpdateMutation,
    useThumbnailImageDeleteMutation,
    useThumbnailImageGetTreeQuery,
    useThumbnailVideoGetCollectionQuery,
    useThumbnailVideoCreateMutation,
    useThumbnailVideoGetByNameQuery,
    useThumbnailVideoUpdateMutation,
    useThumbnailVideoDeleteMutation,
    useThumbnailVideoGetTreeQuery,
} = injectedRtkApi;
