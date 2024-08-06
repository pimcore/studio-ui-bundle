import { api } from "../../../app/api/pimcore/index";
export const addTagTypes = ["Assets", "Settings"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getAssetCustomSettingsById: build.query<
                GetAssetCustomSettingsByIdApiResponse,
                GetAssetCustomSettingsByIdApiArg
            >({
                query: (queryArg) => ({ url: `/studio/api/assets/${queryArg.id}/custom-settings` }),
                providesTags: ["Assets"],
            }),
            getSystemSettings: build.query<GetSystemSettingsApiResponse, GetSystemSettingsApiArg>({
                query: () => ({ url: `/studio/api/settings` }),
                providesTags: ["Settings"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type GetAssetCustomSettingsByIdApiResponse = /** status 200 Array of custom settings */ {
    items?: CustomSettings;
};
export type GetAssetCustomSettingsByIdApiArg = {
    /** Id of the asset */
    id: number;
};
export type GetSystemSettingsApiResponse = /** status 200 System settings */ {
    [key: string]: any;
};
export type GetSystemSettingsApiArg = void;
export type FixedCustomSettings = {
    /** embedded meta data of the asset - array of any key-value pairs */
    embeddedMetaData: any[];
    /** flag to indicate if the embedded meta data has been extracted from the asset */
    embeddedMetaDataExtracted: boolean;
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
export const { useGetAssetCustomSettingsByIdQuery, useGetSystemSettingsQuery } = injectedRtkApi;
