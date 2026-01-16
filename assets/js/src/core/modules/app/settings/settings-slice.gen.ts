import { api } from "@sdk/api";
export const addTagTypes = ["Settings"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            settingsCountryCollection: build.query<
                SettingsCountryCollectionApiResponse,
                SettingsCountryCollectionApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/settings/available-countries` }),
                providesTags: ["Settings"],
            }),
            systemSettingsGet: build.query<SystemSettingsGetApiResponse, SystemSettingsGetApiArg>({
                query: () => ({ url: `/pimcore-studio/api/settings` }),
                providesTags: ["Settings"],
            }),
            activeBundlesGet: build.query<ActiveBundlesGetApiResponse, ActiveBundlesGetApiArg>({
                query: () => ({ url: `/pimcore-studio/api/settings/active-bundles` }),
                providesTags: ["Settings"],
            }),
            pingAction: build.query<PingActionApiResponse, PingActionApiArg>({
                query: () => ({ url: `/pimcore-studio/api/settings/ping` }),
                providesTags: ["Settings"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type SettingsCountryCollectionApiResponse = /** status 200 List of available countries */ {
    totalItems: number;
    items: AvailableCountry[];
};
export type SettingsCountryCollectionApiArg = void;
export type SystemSettingsGetApiResponse = /** status 200 System settings data */ {
    [key: string]: any;
};
export type SystemSettingsGetApiArg = void;
export type ActiveBundlesGetApiResponse = /** status 200 List of active bundles */ {
    /** List of active and installed bundles in the system. */
    bundles: ActiveBundle[];
};
export type ActiveBundlesGetApiArg = void;
export type PingActionApiResponse = unknown;
export type PingActionApiArg = void;
export type AvailableCountry = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Country name */
    name: string;
    /** Country ISO 3166-1 code */
    code: string;
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
export type ActiveBundle = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Bundle name */
    name: string;
};
export const {
    useSettingsCountryCollectionQuery,
    useSystemSettingsGetQuery,
    useActiveBundlesGetQuery,
    usePingActionQuery,
} = injectedRtkApi;
