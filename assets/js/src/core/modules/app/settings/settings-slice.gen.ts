import { api } from "../../../app/api/pimcore/index";
export const addTagTypes = ["Assets", "Settings"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            assetCustomSettingsGetById: build.query<
                AssetCustomSettingsGetByIdApiResponse,
                AssetCustomSettingsGetByIdApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/assets/${queryArg.id}/custom-settings` }),
                providesTags: ["Assets"],
            }),
            systemSettingsGet: build.query<SystemSettingsGetApiResponse, SystemSettingsGetApiArg>({
                query: () => ({ url: `/pimcore-studio/api/settings` }),
                providesTags: ["Settings"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type AssetCustomSettingsGetByIdApiResponse = /** status 200 Successfully retrieved custom settings as JSON */ {
    items?: CustomSettings;
};
export type AssetCustomSettingsGetByIdApiArg = {
    /** Id of the asset */
    id: number;
};
export type SystemSettingsGetApiResponse = /** status 200 System settings data */ {
    [key: string]: any;
};
export type SystemSettingsGetApiArg = void;
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
export const { useAssetCustomSettingsGetByIdQuery, useSystemSettingsGetQuery } = injectedRtkApi;
