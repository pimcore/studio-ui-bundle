import { api } from "../../../../../../app/api/pimcore/index";
export const addTagTypes = ["Metadata"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            assetCustomMetadataGetById: build.query<
                AssetCustomMetadataGetByIdApiResponse,
                AssetCustomMetadataGetByIdApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/${queryArg.id}/custom-metadata` }),
                providesTags: ["Metadata"],
            }),
            metadataGetCollection: build.mutation<MetadataGetCollectionApiResponse, MetadataGetCollectionApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/metadata`, method: "POST", body: queryArg.body }),
                invalidatesTags: ["Metadata"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type AssetCustomMetadataGetByIdApiResponse = /** status 200 Successfully retrieved custom metadata as JSON */ {
    items?: CustomMetadata[];
};
export type AssetCustomMetadataGetByIdApiArg = {
    /** Id of the asset */
    id: number;
};
export type MetadataGetCollectionApiResponse = /** status 200 Predefined metadata collection */ {
    items?: PredefinedMetadata[];
};
export type MetadataGetCollectionApiArg = {
    body: {
        filter?: any;
    };
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
    description?: any;
    /** Type */
    type: string;
    /** Target sub type */
    targetSubType?: any;
    /** Data */
    data?: any;
    /** Config */
    config?: any;
    /** Language */
    language?: any;
    /** Group */
    group?: any;
    /** Creation Date */
    creationDate: number;
    /** Modfication Date */
    modificationDate: number;
    /** Writable */
    isWriteable: boolean;
};
export const { useAssetCustomMetadataGetByIdQuery, useMetadataGetCollectionMutation } = injectedRtkApi;
