import { api } from "../../app/api/pimcore/index";
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
                    params: {
                        page: queryArg.page,
                        itemsPerPage: queryArg.itemsPerPage,
                        parentId: queryArg.parentId,
                        idSearchTerm: queryArg.idSearchTerm,
                    },
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
    "hydra:member": AssetJsonldAssetReadDependencyReadPropertyReadElementReadRead[];
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
    parentId?: number;
    /** Filters assets by matching ids. As a wildcard, you can use *. */
    idSearchTerm?: string;
};
export type ApiAssetsPostApiResponse =
    /** status 201 Asset resource created */ AssetJsonldAssetReadDependencyReadPropertyReadElementReadRead;
export type ApiAssetsPostApiArg = {
    /** The new Asset resource */
    assetJsonldAssetWrite: AssetJsonldAssetWrite;
};
export type ApiAssetsIdGetApiResponse =
    /** status 200 Asset resource */ AssetJsonldAssetReadAssetItemGetDependencyReadPropertyReadElementReadElementItemGetRead;
export type ApiAssetsIdGetApiArg = {
    /** Asset identifier */
    id: string;
};
export type ApiAssetsIdPutApiResponse =
    /** status 200 Asset resource updated */ AssetJsonldAssetReadDependencyReadPropertyReadElementReadRead;
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
    /** status 200 Asset resource updated */ AssetJsonldAssetReadDependencyReadPropertyReadElementReadRead;
export type ApiAssetsIdPatchApiArg = {
    /** Asset identifier */
    id: string;
    /** The updated Asset resource */
    assetAssetWrite: AssetAssetWrite;
};
export type PermissionsJsonldAssetReadDependencyReadPropertyReadElementRead = {
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
export type PermissionsJsonldAssetReadDependencyReadPropertyReadElementReadRead = {
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
export type AssetJsonldAssetReadDependencyReadPropertyReadElementRead = {
    type?: string;
    filename?: any;
    fullPath?: string;
    id?: number;
    parentId?: number;
    path?: string;
    userOwner?: number;
    userModification?: any;
    locked?: boolean;
    creationDate?: any;
    modificationDate?: any;
    permissions?: PermissionsJsonldAssetReadDependencyReadPropertyReadElementRead;
};
export type AssetJsonldAssetReadDependencyReadPropertyReadElementReadRead = {
    "@context"?:
        | string
        | {
              "@vocab": string;
              hydra: "http://www.w3.org/ns/hydra/core#";
              [key: string]: any;
          };
    "@id"?: string;
    "@type"?: string;
    type?: string;
    filename?: any;
    fullPath?: string;
    children?: boolean;
    metadata?: string[];
    hasMetaData?: boolean;
    mimetype?: any;
    id?: number;
    parentId?: number;
    path?: string;
    userOwner?: number;
    userModification?: any;
    locked?: boolean;
    creationDate?: any;
    modificationDate?: any;
    permissions?: PermissionsJsonldAssetReadDependencyReadPropertyReadElementReadRead;
    /** enum('self','propagate') nullable */
    lock?: any;
};
export type AssetJsonldAssetWrite = object;
export type PermissionsJsonldAssetReadAssetItemGetDependencyReadPropertyReadElementReadElementItemGet = {
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
export type PermissionsJsonldAssetReadAssetItemGetDependencyReadPropertyReadElementReadElementItemGetRead = {
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
export type AssetJsonldAssetReadAssetItemGetDependencyReadPropertyReadElementReadElementItemGet = {
    type?: string;
    filename?: any;
    fullPath?: string;
    id?: number;
    parentId?: number;
    path?: string;
    userOwner?: number;
    userModification?: any;
    locked?: boolean;
    creationDate?: any;
    modificationDate?: any;
    permissions?: PermissionsJsonldAssetReadAssetItemGetDependencyReadPropertyReadElementReadElementItemGet;
};
export type AssetJsonldAssetReadAssetItemGetDependencyReadPropertyReadElementReadElementItemGetRead = {
    "@context"?:
        | string
        | {
              "@vocab": string;
              hydra: "http://www.w3.org/ns/hydra/core#";
              [key: string]: any;
          };
    "@id"?: string;
    "@type"?: string;
    type?: string;
    filename?: any;
    fullPath?: string;
    children?: boolean;
    metadata?: string[];
    hasMetaData?: boolean;
    mimetype?: any;
    id?: number;
    parentId?: number;
    path?: string;
    userOwner?: number;
    userModification?: any;
    locked?: boolean;
    creationDate?: any;
    modificationDate?: any;
    permissions?: PermissionsJsonldAssetReadAssetItemGetDependencyReadPropertyReadElementReadElementItemGetRead;
    /** enum('self','propagate') nullable */
    lock?: any;
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
