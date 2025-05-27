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
export type KeyBindingForAUser = {
    /** ASCII Code for a key on the Keyboard */
    key: number;
    /** The action the key binding should execute */
    action: string;
    /** If CTRL key should be pressed */
    ctrl: boolean;
    /** If ALT key should be pressed */
    alt: boolean;
    /** If SHIFT key should be pressed */
    shift: boolean;
};
export type TwoFactorAuthenticationData = {
    /** Required */
    required: boolean;
    /** Enabled */
    enabled: boolean;
    /** Type */
    type: string;
    /** Active */
    active: boolean;
};
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
    /** Email */
    email: any;
    /** Firstname */
    firstname: any;
    /** Lastname */
    lastname: any;
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
    /** Locale for dateTime */
    dateTimeLocale: any;
    /** Welcome Screen */
    welcomeScreen: boolean;
    /** Memorize Tabs */
    memorizeTabs: boolean;
    /** Has Image */
    hasImage: boolean;
    /** List of available content Language already sorted. */
    contentLanguages: object;
    /** Key Bindings */
    keyBindings: KeyBindingForAUser[];
    /** Two Factor Authentication */
    twoFactorAuthentication?: TwoFactorAuthenticationData[];
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
