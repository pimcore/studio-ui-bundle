import { api } from "../../../app/api/pimcore/index";
export const addTagTypes = ["Asset"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            apiAssetsGetCollection: build.query<ApiAssetsGetCollectionApiResponse, ApiAssetsGetCollectionApiArg>({
                query: (queryArg) => ({
                    url: `/api/assets`,
                    params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage, parentId: queryArg.parentId },
                }),
                providesTags: ["Asset"],
            }),
            apiAssetsPost: build.mutation<ApiAssetsPostApiResponse, ApiAssetsPostApiArg>({
                query: (queryArg) => ({ url: `/api/assets`, method: "POST", body: queryArg.assetJsonldAssetWrite }),
                invalidatesTags: ["Asset"],
            }),
            apiAssetsIdGet: build.query<ApiAssetsIdGetApiResponse, ApiAssetsIdGetApiArg>({
                query: (queryArg) => ({ url: `/api/assets/${queryArg.id}` }),
                providesTags: ["Asset"],
            }),
            apiAssetsIdPut: build.mutation<ApiAssetsIdPutApiResponse, ApiAssetsIdPutApiArg>({
                query: (queryArg) => ({
                    url: `/api/assets/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.assetJsonldAssetWrite,
                }),
                invalidatesTags: ["Asset"],
            }),
            apiAssetsIdDelete: build.mutation<ApiAssetsIdDeleteApiResponse, ApiAssetsIdDeleteApiArg>({
                query: (queryArg) => ({ url: `/api/assets/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Asset"],
            }),
            apiAssetsIdPatch: build.mutation<ApiAssetsIdPatchApiResponse, ApiAssetsIdPatchApiArg>({
                query: (queryArg) => ({
                    url: `/api/assets/${queryArg.id}`,
                    method: "PATCH",
                    body: queryArg.assetAssetWrite,
                }),
                invalidatesTags: ["Asset"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type ApiAssetsGetCollectionApiResponse = /** status 200 Asset collection */ {
    "hydra:member": AssetJsonldAssetReadDependencyReadPropertyReadRead[];
    "hydra:totalItems"?: number;
    "hydra:view"?: {
        "@id"?: string;
        "@type"?: string;
        "hydra:first"?: string;
        "hydra:last"?: string;
        "hydra:previous"?: string;
        "hydra:next"?: string;
    };
    "hydra:search"?: {
        "@type"?: string;
        "hydra:template"?: string;
        "hydra:variableRepresentation"?: string;
        "hydra:mapping"?: {
            "@type"?: string;
            variable?: string;
            property?: any;
            required?: boolean;
        }[];
    };
};
export type ApiAssetsGetCollectionApiArg = {
    /** The collection page number */
    page?: number;
    /** The number of items per page */
    itemsPerPage?: number;
    /** Filters assets by parent id. */
    parentId: number;
};
export type ApiAssetsPostApiResponse =
    /** status 201 Asset resource created */ AssetJsonldAssetReadDependencyReadPropertyReadRead;
export type ApiAssetsPostApiArg = {
    /** The new Asset resource */
    assetJsonldAssetWrite: AssetJsonldAssetWrite;
};
export type ApiAssetsIdGetApiResponse =
    /** status 200 Asset resource */ AssetJsonldAssetReadAssetItemGetDependencyReadPropertyReadRead;
export type ApiAssetsIdGetApiArg = {
    /** Asset identifier */
    id: string;
};
export type ApiAssetsIdPutApiResponse =
    /** status 200 Asset resource updated */ AssetJsonldAssetReadDependencyReadPropertyReadRead;
export type ApiAssetsIdPutApiArg = {
    /** Asset identifier */
    id: string;
    /** The updated Asset resource */
    assetJsonldAssetWrite: AssetJsonldAssetWrite;
};
export type ApiAssetsIdDeleteApiResponse = unknown;
export type ApiAssetsIdDeleteApiArg = {
    /** Asset identifier */
    id: string;
};
export type ApiAssetsIdPatchApiResponse =
    /** status 200 Asset resource updated */ AssetJsonldAssetReadDependencyReadPropertyReadRead;
export type ApiAssetsIdPatchApiArg = {
    /** Asset identifier */
    id: string;
    /** The updated Asset resource */
    assetAssetWrite: AssetAssetWrite;
};
export type PermissionsJsonldAssetReadDependencyReadPropertyRead = {
    list?: boolean;
    view?: boolean;
    publish?: boolean;
    delete?: boolean;
    rename?: boolean;
    create?: boolean;
    settings?: boolean;
    versions?: boolean;
    properties?: boolean;
};
export type PermissionsJsonldAssetReadDependencyReadPropertyReadRead = {
    "@context"?:
        | string
        | {
              "@vocab": string;
              hydra: "http://www.w3.org/ns/hydra/core#";
              [key: string]: any;
          };
    "@id"?: string;
    "@type"?: string;
    list?: boolean;
    view?: boolean;
    publish?: boolean;
    delete?: boolean;
    rename?: boolean;
    create?: boolean;
    settings?: boolean;
    versions?: boolean;
    properties?: boolean;
};
export type AssetJsonldAssetReadDependencyReadPropertyRead = {
    permissions?: PermissionsJsonldAssetReadDependencyReadPropertyRead;
};
export type AssetJsonldAssetReadDependencyReadPropertyReadRead = {
    "@context"?:
        | string
        | {
              "@vocab": string;
              hydra: "http://www.w3.org/ns/hydra/core#";
              [key: string]: any;
          };
    "@id"?: string;
    "@type"?: string;
    permissions?: PermissionsJsonldAssetReadDependencyReadPropertyReadRead;
    id?: any;
    parentId?: any;
    children?: boolean;
    userModification?: any;
    creationDate?: any;
    modificationDate?: any;
    userOwner?: any;
    /** enum('self','propagate') nullable */
    lock?: any;
    locked?: boolean;
    filename?: any;
    type?: string;
    versions?: string[];
    path?: any;
    metadata?: string[];
    hasMetaData?: boolean;
    fullPath?: string;
    mimetype?: any;
};
export type AssetJsonldAssetWrite = object;
export type PermissionsJsonldAssetReadAssetItemGetDependencyReadPropertyRead = {
    list?: boolean;
    view?: boolean;
    publish?: boolean;
    delete?: boolean;
    rename?: boolean;
    create?: boolean;
    settings?: boolean;
    versions?: boolean;
    properties?: boolean;
};
export type PermissionsJsonldAssetReadAssetItemGetDependencyReadPropertyReadRead = {
    "@context"?:
        | string
        | {
              "@vocab": string;
              hydra: "http://www.w3.org/ns/hydra/core#";
              [key: string]: any;
          };
    "@id"?: string;
    "@type"?: string;
    list?: boolean;
    view?: boolean;
    publish?: boolean;
    delete?: boolean;
    rename?: boolean;
    create?: boolean;
    settings?: boolean;
    versions?: boolean;
    properties?: boolean;
};
export type DependencyJsonldAssetReadAssetItemGetDependencyReadPropertyRead = {
    /** The ID of the object to get dependencies for */
    sourceId?: number;
    /** The type of the object to get dependencies for */
    sourceType?: string;
    /** Contains the ID/type of objects which are required for the given source object (sourceId/sourceType) */
    requires?: string[];
};
export type DependencyJsonldAssetReadAssetItemGetDependencyReadPropertyReadRead = {
    "@context"?:
        | string
        | {
              "@vocab": string;
              hydra: "http://www.w3.org/ns/hydra/core#";
              [key: string]: any;
          };
    "@id"?: string;
    "@type"?: string;
    /** The ID of the object to get dependencies for */
    sourceId?: number;
    /** The type of the object to get dependencies for */
    sourceType?: string;
    /** Contains the ID/type of objects which are required for the given source object (sourceId/sourceType) */
    requires?: string[];
    requiredBy?: string[];
    requiresTotalCount?: number;
    requiredByTotalCount?: number;
    /** Check if the source object is required by an other object (an other object depends on this object) */
    required?: boolean;
};
export type AssetJsonldAssetReadAssetItemGetDependencyReadPropertyRead = {
    permissions?: PermissionsJsonldAssetReadAssetItemGetDependencyReadPropertyRead;
    dependencies?: DependencyJsonldAssetReadAssetItemGetDependencyReadPropertyRead;
};
export type PropertyJsonldAssetReadAssetItemGetDependencyReadPropertyRead = {};
export type PropertyJsonldAssetReadAssetItemGetDependencyReadPropertyReadRead = {
    "@context"?:
        | string
        | {
              "@vocab": string;
              hydra: "http://www.w3.org/ns/hydra/core#";
              [key: string]: any;
          };
    "@id"?: string;
    "@type"?: string;
    cid?: any;
    /** enum('document','asset','object') */
    ctype?: any;
    data?: any;
    name?: any;
    /** enum('text','document','asset','object','bool','select') */
    type?: any;
    cpath?: any;
    inherited?: boolean;
    inheritable?: boolean;
};
export type VersionJsonldAssetReadAssetItemGetDependencyReadPropertyRead = {};
export type VersionJsonldAssetReadAssetItemGetDependencyReadPropertyReadRead = {
    "@context"?:
        | string
        | {
              "@vocab": string;
              hydra: "http://www.w3.org/ns/hydra/core#";
              [key: string]: any;
          };
    "@id"?: string;
    "@type"?: string;
    id?: any;
    cid?: number;
    ctype?: string;
    date?: number;
    note?: string;
    userId?: number;
    serialized?: boolean;
    user?: any;
    public?: boolean;
    versionCount?: number;
    binaryFileHash?: any;
    binaryFileId?: any;
    storageType?: any;
    autosave?: boolean;
};
export type AssetJsonldAssetReadAssetItemGetDependencyReadPropertyReadRead = {
    "@context"?:
        | string
        | {
              "@vocab": string;
              hydra: "http://www.w3.org/ns/hydra/core#";
              [key: string]: any;
          };
    "@id"?: string;
    "@type"?: string;
    permissions?: PermissionsJsonldAssetReadAssetItemGetDependencyReadPropertyReadRead;
    id?: any;
    parentId?: any;
    children?: boolean;
    userModification?: any;
    creationDate?: any;
    modificationDate?: any;
    userOwner?: any;
    /** enum('self','propagate') nullable */
    lock?: any;
    locked?: boolean;
    properties?: PropertyJsonldAssetReadAssetItemGetDependencyReadPropertyReadRead[];
    versionCount?: number;
    filename?: any;
    type?: string;
    versions?: VersionJsonldAssetReadAssetItemGetDependencyReadPropertyReadRead[];
    customSettings?: string[];
    scheduledTasks?: string[];
    path?: any;
    metadata?: string[];
    dependencies?: DependencyJsonldAssetReadAssetItemGetDependencyReadPropertyReadRead;
    hasMetaData?: boolean;
    fullPath?: string;
    mimetype?: any;
};
export type AssetAssetWrite = object;
export const {
    useApiAssetsGetCollectionQuery,
    useApiAssetsPostMutation,
    useApiAssetsIdGetQuery,
    useApiAssetsIdPutMutation,
    useApiAssetsIdDeleteMutation,
    useApiAssetsIdPatchMutation,
} = injectedRtkApi;
