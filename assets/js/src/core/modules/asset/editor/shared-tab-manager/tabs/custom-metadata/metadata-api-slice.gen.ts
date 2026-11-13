import { api } from "@sdk/api";
export const addTagTypes = ["Metadata"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            metadataAssetGetCollection: build.query<
                MetadataAssetGetCollectionApiResponse,
                MetadataAssetGetCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/metadata/asset`,
                    params: {
                        subType: queryArg.subType,
                        group: queryArg.group,
                    },
                }),
                providesTags: ["Metadata"],
            }),
            assetCustomMetadataGetById: build.query<
                AssetCustomMetadataGetByIdApiResponse,
                AssetCustomMetadataGetByIdApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/${queryArg.id}/custom-metadata` }),
                providesTags: ["Metadata"],
            }),
            metadataGetCollection: build.query<MetadataGetCollectionApiResponse, MetadataGetCollectionApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/metadata`, method: "POST", body: queryArg.body }),
                providesTags: ["Metadata"],
            }),
            metadataPredefinedCreate: build.mutation<
                MetadataPredefinedCreateApiResponse,
                MetadataPredefinedCreateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/metadata/predefined`,
                    method: "POST",
                    body: queryArg.createPredefinedMetadata,
                }),
                invalidatesTags: ["Metadata"],
            }),
            metadataPredefinedUpdate: build.mutation<
                MetadataPredefinedUpdateApiResponse,
                MetadataPredefinedUpdateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/metadata/predefined/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.updatePredefinedMetadata,
                }),
                invalidatesTags: ["Metadata"],
            }),
            metadataPredefinedDelete: build.mutation<
                MetadataPredefinedDeleteApiResponse,
                MetadataPredefinedDeleteApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/metadata/predefined/${queryArg.id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Metadata"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type MetadataAssetGetCollectionApiResponse =
    /** status 200 Filtered predefined metadata entries for the specified asset type */ {
        items?: PredefinedMetadata[];
    };
export type MetadataAssetGetCollectionApiArg = {
    /** Filter by asset sub-type (e.g. image, video). */
    subType?: string;
    /** Filter by metadata group. Use 'default' to match entries with no group assigned. */
    group?: string;
};
export type AssetCustomMetadataGetByIdApiResponse = /** status 200 Successfully retrieved custom metadata as JSON */ {
    items?: CustomMetadata[];
};
export type AssetCustomMetadataGetByIdApiArg = {
    /** Id of the asset */
    id: number;
};
export type MetadataGetCollectionApiResponse = /** status 200 Predefined metadata collection with total item count */ {
    totalItems: number;
    items: PredefinedMetadata[];
};
export type MetadataGetCollectionApiArg = {
    body: {
        /** Global search term applied across all fields */
        searchTerm?: string | null;
        /** Per-column filters */
        columnFilters?:
            | {
                  key?: string;
                  type?: string;
                  filterValue?: string;
              }[]
            | null;
        /** Sort configuration */
        sortFilter?: {
            key?: string;
            direction?: string;
        } | null;
    };
};
export type MetadataPredefinedCreateApiResponse =
    /** status 200 Newly created predefined metadata entry */ PredefinedMetadata;
export type MetadataPredefinedCreateApiArg = {
    createPredefinedMetadata: CreatePredefinedMetadata;
};
export type MetadataPredefinedUpdateApiResponse =
    /** status 200 Updated predefined metadata entry */ PredefinedMetadata;
export type MetadataPredefinedUpdateApiArg = {
    /** Id of the metadata */
    id: string;
    updatePredefinedMetadata: UpdatePredefinedMetadata;
};
export type MetadataPredefinedDeleteApiResponse = unknown;
export type MetadataPredefinedDeleteApiArg = {
    /** Id of the metadata */
    id: string;
};
export type PredefinedMetadata = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Id */
    id: string;
    /** Name */
    name: string;
    /** Description */
    description?: string | null;
    /** Type */
    type: string;
    /** Target sub type */
    targetSubType?: string | null;
    /** Data */
    data?: any | null;
    /** Config */
    config?: string | null;
    /** Language */
    language?: string | null;
    /** Group */
    group?: string | null;
    /** Creation Date */
    creationDate: number;
    /** Modfication Date */
    modificationDate: number;
    /** Writable */
    isWriteable: boolean;
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
export type CreatePredefinedMetadata = {
    /** Name */
    name: string;
    /** Type */
    type: string;
    /** Description */
    description: string | null;
    /** Target sub type */
    targetSubType: string | null;
    /** Data */
    data: any | null;
    /** Config */
    config: string | null;
    /** Language */
    language: string | null;
    /** Group */
    group: string | null;
};
export type UpdatePredefinedMetadata = {
    /** Name */
    name: string;
    /** Description */
    description: string | null;
    /** Type */
    type: string;
    /** Target sub type */
    targetSubType: string | null;
    /** Data */
    data: any | null;
    /** Config */
    config: string | null;
    /** Language */
    language: string | null;
    /** Group */
    group: string | null;
};
export const {
    useMetadataAssetGetCollectionQuery,
    useAssetCustomMetadataGetByIdQuery,
    useMetadataGetCollectionQuery,
    useMetadataPredefinedCreateMutation,
    useMetadataPredefinedUpdateMutation,
    useMetadataPredefinedDeleteMutation,
} = injectedRtkApi;
