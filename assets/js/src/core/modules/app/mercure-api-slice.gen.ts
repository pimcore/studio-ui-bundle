import { api } from "@sdk/api";
export const addTagTypes = ["Mercure"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            mercureCreateCookie: build.mutation<MercureCreateCookieApiResponse, MercureCreateCookieApiArg>({
                query: () => ({ url: `/pimcore-studio/api/mercure/auth`, method: "POST" }),
                invalidatesTags: ["Mercure"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type MercureCreateCookieApiResponse = unknown;
export type MercureCreateCookieApiArg = void;
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
export const { useMercureCreateCookieMutation } = injectedRtkApi;
