import { api } from "@sdk/api";
export const addTagTypes = ["Settings"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            systemSettingsGet: build.query<SystemSettingsGetApiResponse, SystemSettingsGetApiArg>({
                query: () => ({ url: `/pimcore-studio/api/settings` }),
                providesTags: ["Settings"],
            }),
            activeBundlesGet: build.query<ActiveBundlesGetApiResponse, ActiveBundlesGetApiArg>({
                query: () => ({ url: `/pimcore-studio/api/settings/active-bundles` }),
                providesTags: ["Settings"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type SystemSettingsGetApiResponse = /** status 200 System settings data */ {
    [key: string]: any;
};
export type SystemSettingsGetApiArg = void;
export type ActiveBundlesGetApiResponse = /** status 200 List of active bundles */ {
    /** List of active and installed bundles in the system. */
    bundles: ActiveBundle[];
};
export type ActiveBundlesGetApiArg = void;
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
export const { useSystemSettingsGetQuery, useActiveBundlesGetQuery } = injectedRtkApi;
