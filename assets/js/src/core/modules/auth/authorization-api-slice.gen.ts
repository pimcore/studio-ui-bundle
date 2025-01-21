import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Authorization"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            login: build.mutation<LoginApiResponse, LoginApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/login`, method: "POST", body: queryArg.credentials }),
                invalidatesTags: ["Authorization"],
            }),
            logout: build.mutation<LogoutApiResponse, LogoutApiArg>({
                query: () => ({ url: `/pimcore-studio/api/logout`, method: "POST" }),
                invalidatesTags: ["Authorization"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type LoginApiResponse = /** status 200 Login successful. */ UserInformation;
export type LoginApiArg = {
    credentials: Credentials;
};
export type LogoutApiResponse = unknown;
export type LogoutApiArg = void;
export type UserInformation = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** User ID */
    id: number;
    /** Username */
    username: string;
    /** Permissions */
    permissions: string[];
    /** If user is an admin user */
    isAdmin: boolean;
};
export type InvalidCredentials = {
    /** Error */
    error: string;
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
export type Credentials = {
    /** Username */
    username: string;
    /** Password */
    password: string;
};
export const { useLoginMutation, useLogoutMutation } = injectedRtkApi;
