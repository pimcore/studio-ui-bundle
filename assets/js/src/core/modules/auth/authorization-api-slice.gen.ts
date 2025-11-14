import { api } from "@sdk/api";
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
            loginToken: build.mutation<LoginTokenApiResponse, LoginTokenApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/login/token`,
                    method: "POST",
                    body: queryArg.authenticationToken,
                }),
                invalidatesTags: ["Authorization"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type LoginApiResponse = unknown;
export type LoginApiArg = {
    credentials: Credentials;
};
export type LogoutApiResponse = unknown;
export type LogoutApiArg = void;
export type LoginTokenApiResponse = unknown;
export type LoginTokenApiArg = {
    authenticationToken: AuthenticationToken;
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
export type AuthenticationToken = {
    /** Token */
    token: string;
};
export const { useLoginMutation, useLogoutMutation, useLoginTokenMutation } = injectedRtkApi;
