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
export type ElementIcon = {
    /** Icon type */
    type: "name" | "path";
    /** Icon value */
    value: string;
};
export type PerspectiveConfig = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Perspective ID */
    id: string;
    /** Name */
    name: string;
    /** Icon */
    icon: ElementIcon;
    /** Is Writeable */
    isWriteable: boolean;
};
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
    /** Allowed classes to create */
    classes: string[];
    /** Allowed doc types to create */
    docTypes: string[];
    /** User Language */
    language: string;
    /** Active studio perspective ID */
    activePerspective: any;
    /** Allowed studio perspectives */
    perspectives: PerspectiveConfig[];
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
