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
            loginTwoFactor: build.mutation<LoginTwoFactorApiResponse, LoginTwoFactorApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/login/2fa`,
                    method: "POST",
                    body: queryArg.twoFactorCode,
                }),
                invalidatesTags: ["Authorization"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type LoginApiResponse = /** status 200 Login successful, with an empty body.
When the user needs a two-factor code, the password was correct but the login is not finished:
the body says so and names the next step: `verify` (send the code to `/login/2fa`), or `setup` when the user
must use two-factor authentication but has not set it up (create a secret with `/user/two-factor/setup`,
then send the first code from it to `/login/2fa`).
Until then, other endpoints answer 401. To go back, log out.
 */ TwoFactorLoginStep;
export type LoginApiArg = {
    credentials: Credentials;
};
export type LogoutApiResponse = unknown;
export type LogoutApiArg = void;
export type LoginTokenApiResponse = unknown;
export type LoginTokenApiArg = {
    authenticationToken: AuthenticationToken;
};
export type LoginTwoFactorApiResponse = unknown;
export type LoginTwoFactorApiArg = {
    twoFactorCode: TwoFactorCode;
};
export type TwoFactorLoginStep = {
    /** A code is needed */
    twoFactorRequired: boolean;
    /** What to do next */
    twoFactorStep: "verify" | "setup";
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
export type TwoFactorCode = {
    /** Code */
    code: string;
};
export const { useLoginMutation, useLogoutMutation, useLoginTokenMutation, useLoginTwoFactorMutation } = injectedRtkApi;
