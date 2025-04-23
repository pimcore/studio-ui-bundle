import { api } from "../../../../../../app/api/pimcore/index";
export const addTagTypes = ["Versions"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            versionAssetDownloadById: build.query<VersionAssetDownloadByIdApiResponse, VersionAssetDownloadByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/versions/${queryArg.id}/asset/download` }),
                providesTags: ["Versions"],
            }),
            versionImageStreamById: build.query<VersionImageStreamByIdApiResponse, VersionImageStreamByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/versions/${queryArg.id}/image/stream` }),
                providesTags: ["Versions"],
            }),
            versionPdfStreamById: build.query<VersionPdfStreamByIdApiResponse, VersionPdfStreamByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/versions/${queryArg.id}/pdf/stream` }),
                providesTags: ["Versions"],
            }),
            versionGetById: build.query<VersionGetByIdApiResponse, VersionGetByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/versions/${queryArg.id}` }),
                providesTags: ["Versions"],
            }),
            versionUpdateById: build.mutation<VersionUpdateByIdApiResponse, VersionUpdateByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/versions/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.updateVersion,
                }),
                invalidatesTags: ["Versions"],
            }),
            versionPublishById: build.mutation<VersionPublishByIdApiResponse, VersionPublishByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/versions/${queryArg.id}`, method: "POST" }),
                invalidatesTags: ["Versions"],
            }),
            versionDeleteById: build.mutation<VersionDeleteByIdApiResponse, VersionDeleteByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/versions/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Versions"],
            }),
            versionGetCollectionForElementByTypeAndId: build.query<
                VersionGetCollectionForElementByTypeAndIdApiResponse,
                VersionGetCollectionForElementByTypeAndIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/versions/${queryArg.elementType}/${queryArg.id}`,
                    params: { page: queryArg.page, pageSize: queryArg.pageSize },
                }),
                providesTags: ["Versions"],
            }),
            versionCleanupForElementByTypeAndId: build.mutation<
                VersionCleanupForElementByTypeAndIdApiResponse,
                VersionCleanupForElementByTypeAndIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/versions/${queryArg.elementType}/${queryArg.id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Versions"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type VersionAssetDownloadByIdApiResponse = /** status 200 Asset version binary file */ Blob;
export type VersionAssetDownloadByIdApiArg = {
    /** Id of the version */
    id: number;
};
export type VersionImageStreamByIdApiResponse = /** status 200 Image thumbnail version stream */ Blob;
export type VersionImageStreamByIdApiArg = {
    /** Id of the version */
    id: number;
};
export type VersionPdfStreamByIdApiResponse = /** status 200 PDF version stream */ Blob;
export type VersionPdfStreamByIdApiArg = {
    /** Id of the version */
    id: number;
};
export type VersionGetByIdApiResponse = /** status 200 Successfully retrieved version data as JSON */
    | AssetVersion
    | DataObjectVersion
    | DocumentVersion;
export type VersionGetByIdApiArg = {
    /** Id of the version */
    id: number;
};
export type VersionUpdateByIdApiResponse = /** status 200 Successfully updated version */ void;
export type VersionUpdateByIdApiArg = {
    /** Id of the version */
    id: number;
    updateVersion: UpdateVersion;
};
export type VersionPublishByIdApiResponse = /** status 200 ID of the published version */ {
    /** ID of published version */
    id: number;
};
export type VersionPublishByIdApiArg = {
    /** Id of the version */
    id: number;
};
export type VersionDeleteByIdApiResponse = /** status 200 Successfully deleted version */ void;
export type VersionDeleteByIdApiArg = {
    /** Id of the version */
    id: number;
};
export type VersionGetCollectionForElementByTypeAndIdApiResponse =
    /** status 200 Paginated element Versions data as JSON with total count as header param */ {
        totalItems: number;
        items: Version[];
    };
export type VersionGetCollectionForElementByTypeAndIdApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Id of the element */
    id: number;
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
};
export type VersionCleanupForElementByTypeAndIdApiResponse = /** status 200 IDs of the removed versions */ {
    /** IDs of deleted versions */
    ids: number[];
};
export type VersionCleanupForElementByTypeAndIdApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Id of the ID of the element */
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
export type CustomMetadataVersion = {
    /** Name */
    name: string;
    /** Language */
    language?: any;
    /** Type */
    type: string;
    /** Data */
    data: any;
};
export type VersionDimensions = {
    /** width */
    width?: any;
    /** height */
    height?: any;
};
export type AssetVersion = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** asset type */
    type: string;
    /** file name */
    fileName: string;
    /** creation date */
    creationDate: number;
    /** modification date */
    modificationDate?: any;
    /** file size */
    fileSize: number;
    /** mime type */
    mimeType: string;
    /** Metadata */
    metadata: CustomMetadataVersion[];
    /** dimensions */
    dimensions: VersionDimensions;
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
export type DataObjectVersion = Element & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Inheritance allowed */
    allowInheritance?: boolean;
    /** Variants allowed */
    allowVariants?: boolean;
    /** Show variants */
    showVariants?: boolean;
    /** Has preview */
    hasPreview?: boolean;
    /** Has workflow available */
    hasWorkflowAvailable?: boolean;
    /** Key */
    key?: string;
    /** Type */
    type?: string;
    /** Has children */
    hasChildren?: boolean;
    /** Full path */
    fullPath?: string;
    /** Custom index */
    index?: number;
    /** Class name */
    className?: any;
    /** Published */
    published?: any;
    /** Detail object data */
    objectData?: object;
};
export type DocumentVersion = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** modification date */
    modificationDate: number;
    /** path */
    path: string;
    /** published */
    published: boolean;
};
export type UpdateVersion = {
    /** Public */
    public?: any;
    /** Note */
    note?: any;
};
export type VersionUser = {
    /** ID */
    id?: any;
    /** name */
    name?: any;
};
export type Version = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** version ID */
    id: number;
    /** element ID */
    cid: number;
    /** element type */
    ctype: string;
    /** note */
    note: string;
    /** date */
    date: number;
    /** public */
    public: boolean;
    /** published */
    published: boolean;
    /** version count */
    versionCount: number;
    /** autosave */
    autosave: boolean;
    /** user */
    user: VersionUser;
    /** scheduled */
    scheduled?: any;
};
export const {
    useVersionAssetDownloadByIdQuery,
    useVersionImageStreamByIdQuery,
    useVersionPdfStreamByIdQuery,
    useVersionGetByIdQuery,
    useVersionUpdateByIdMutation,
    useVersionPublishByIdMutation,
    useVersionDeleteByIdMutation,
    useVersionGetCollectionForElementByTypeAndIdQuery,
    useVersionCleanupForElementByTypeAndIdMutation,
} = injectedRtkApi;
