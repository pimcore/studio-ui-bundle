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
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type SystemSettingsGetApiResponse = /** status 200 System settings data */ {
    [key: string]: any;
};
export type SystemSettingsGetApiArg = void;
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
export const { useSystemSettingsGetQuery } = injectedRtkApi;