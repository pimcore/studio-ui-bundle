import { api } from "../../../../../../app/api/pimcore/index";
export const addTagTypes = ["Assets"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getAssetCustomMetadataById: build.query<
                GetAssetCustomMetadataByIdApiResponse,
                GetAssetCustomMetadataByIdApiArg
            >({
                query: (queryArg) => ({ url: `/studio/api/assets/${queryArg.id}/custom-metadata` }),
                providesTags: ["Assets"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type GetAssetCustomMetadataByIdApiResponse = /** status 200 Array of custom metadata */ {
    items?: CustomMetadata[];
};
export type GetAssetCustomMetadataByIdApiArg = {
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
export const { useGetAssetCustomMetadataByIdQuery } = injectedRtkApi;
