import { api } from "../../../../../../app/api/pimcore/index";
export const addTagTypes = ["Assets"] as const;
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
                providesTags: ["Assets"],
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
export const { useAssetCustomMetadataGetByIdQuery } = injectedRtkApi;
