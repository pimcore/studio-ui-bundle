import { api } from "../../../app/api/pimcore/index";
export const addTagTypes = ["User Management"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            userCloneById: build.mutation<UserCloneByIdApiResponse, UserCloneByIdApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/user/clone/${queryArg.id}`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["User Management"],
            }),
            userCreate: build.mutation<UserCreateApiResponse, UserCreateApiArg>({
                query: (queryArg) => ({ url: `/studio/api/user/`, method: "POST", body: queryArg.body }),
                invalidatesTags: ["User Management"],
            }),
            userFolderCreate: build.mutation<UserFolderCreateApiResponse, UserFolderCreateApiArg>({
                query: (queryArg) => ({ url: `/studio/api/user/folder`, method: "POST", body: queryArg.body }),
                invalidatesTags: ["User Management"],
            }),
            userGetCurrentInformation: build.query<
                UserGetCurrentInformationApiResponse,
                UserGetCurrentInformationApiArg
            >({
                query: () => ({ url: `/studio/api/user/current-user-information` }),
                providesTags: ["User Management"],
            }),
            userGetById: build.query<UserGetByIdApiResponse, UserGetByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/user/${queryArg.id}` }),
                providesTags: ["User Management"],
            }),
            userUpdateById: build.mutation<UserUpdateByIdApiResponse, UserUpdateByIdApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/user/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.updateUser,
                }),
                invalidatesTags: ["User Management"],
            }),
            userDeleteById: build.mutation<UserDeleteByIdApiResponse, UserDeleteByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/user/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["User Management"],
            }),
            userFolderDeleteById: build.mutation<UserFolderDeleteByIdApiResponse, UserFolderDeleteByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/user/folder/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["User Management"],
            }),
            userGetAvailablePermissions: build.query<
                UserGetAvailablePermissionsApiResponse,
                UserGetAvailablePermissionsApiArg
            >({
                query: () => ({ url: `/studio/api/user/available-permissions` }),
                providesTags: ["User Management"],
            }),
            userGetCollection: build.query<UserGetCollectionApiResponse, UserGetCollectionApiArg>({
                query: () => ({ url: `/studio/api/users` }),
                providesTags: ["User Management"],
            }),
            userResetPassword: build.mutation<UserResetPasswordApiResponse, UserResetPasswordApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/user/reset-password`,
                    method: "POST",
                    body: queryArg.resetPassword,
                }),
                invalidatesTags: ["User Management"],
            }),
            userUpdatePasswordById: build.mutation<UserUpdatePasswordByIdApiResponse, UserUpdatePasswordByIdApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/user/${queryArg.id}/password`,
                    method: "PUT",
                    body: queryArg.body,
                }),
                invalidatesTags: ["User Management"],
            }),
            userGetTree: build.query<UserGetTreeApiResponse, UserGetTreeApiArg>({
                query: (queryArg) => ({ url: `/studio/api/users/tree`, params: { parentId: queryArg.parentId } }),
                providesTags: ["User Management"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type UserCloneByIdApiResponse = /** status 200 Node of the cloned user. */ TreeNode;
export type UserCloneByIdApiArg = {
    /** Id of the user */
    id: number;
    body: {
        name?: string;
    };
};
export type UserCreateApiResponse = /** status 200 Node of the new created User. */ TreeNode;
export type UserCreateApiArg = {
    body: {
        parentId: number | null;
        name: string;
    };
};
export type UserFolderCreateApiResponse = /** status 200 Node of the new created Folder. */ TreeNode;
export type UserFolderCreateApiArg = {
    body: {
        parentId: number | null;
        name: string;
    };
};
export type UserGetCurrentInformationApiResponse = /** status 200 Current user information's. */ UserInformation;
export type UserGetCurrentInformationApiArg = void;
export type UserGetByIdApiResponse = /** status 200 Node of the requested user. */ User;
export type UserGetByIdApiArg = {
    /** Id of the user */
    id: number;
};
export type UserUpdateByIdApiResponse = /** status 200 Updated data. */ User;
export type UserUpdateByIdApiArg = {
    /** Id of the User */
    id: number;
    updateUser: User2;
};
export type UserDeleteByIdApiResponse = /** status 200 Success */ void;
export type UserDeleteByIdApiArg = {
    /** Id of the user */
    id: number;
};
export type UserFolderDeleteByIdApiResponse = /** status 200 Success */ void;
export type UserFolderDeleteByIdApiArg = {
    /** Id of the user-folder */
    id: number;
};
export type UserGetAvailablePermissionsApiResponse = /** status 200 List of available user permissions. */ {
    totalItems: number;
    items: UserPermission[];
};
export type UserGetAvailablePermissionsApiArg = void;
export type UserGetCollectionApiResponse = /** status 200 List of users */ {
    totalItems: number;
    items: SimpleUser[];
};
export type UserGetCollectionApiArg = void;
export type UserResetPasswordApiResponse = /** status 200 Success */ void;
export type UserResetPasswordApiArg = {
    resetPassword: ResetPassword;
};
export type UserUpdatePasswordByIdApiResponse = /** status 200 Success */ void;
export type UserUpdatePasswordByIdApiArg = {
    /** Id of the User */
    id: number;
    body: {
        password: string;
        passwordConfirmation: string;
    };
};
export type UserGetTreeApiResponse = /** status 200 Collection of users including folders for the given parent id. */ {
    totalItems: number;
    items: TreeNode[];
};
export type UserGetTreeApiArg = {
    /** Filter users by parent id. */
    parentId: number;
};
export type TreeNode = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** Unique Identifier */
    id: number;
    /** Name of the tree node */
    name: string;
    /** Is ether folder or a specific item in the folder */
    type: string;
    /** If a folder has sub items */
    hasChildren: boolean;
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
export type UserInformation = {
    /** Username */
    username: string;
    /** Roles */
    roles: string[];
};
export type KeyBindingForAUser = {
    /** ASCII Code for a key on the Keyboard */
    key: number;
    /** The action the key binding shoudl execute */
    action: string;
    /** If CTRL key should be pressed */
    ctrl: boolean;
    /** If ALT key should be pressed */
    alt: boolean;
    /** If SHIFT key should be pressed */
    shift: boolean;
};
export type UserWorkspace = {
    /** ID of the element */
    cid: number;
    /** Path of the element */
    cpath: string;
    /** List Permission */
    list: boolean;
    /** View Permission */
    view: boolean;
    /** Publish Permission */
    publish: boolean;
    /** Delete Permission */
    delete: boolean;
    /** Rename Permission */
    rename: boolean;
    /** Create Permission */
    create: boolean;
    /** Settings Permission */
    settings: boolean;
    /** Versions Permission */
    versions: boolean;
    /** Properties Permission */
    properties: boolean;
};
export type User = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** ID of the User */
    id: number;
    /** Name of Folder or User */
    name?: string | null;
    /** Email of the User */
    email?: string | null;
    /** Firstname of the User */
    firstname?: string | null;
    /** Lastname of the User */
    lastname?: string | null;
    /** If a User is active */
    active: boolean;
    /** Classes the user is allows to see */
    classes: object;
    closeWarning: boolean;
    allowDirtyClose: boolean;
    /** List of available content Language already sorted. */
    contentLanguages: object;
    hasImage: boolean;
    /** Key Bindings */
    keyBindings: KeyBindingForAUser[];
    /** Language of the User */
    language: string;
    /** Timestamp of the last login */
    lastLogin?: number | null;
    memorizeTabs: boolean;
    parentId: number | null;
    /** List of permissions for the user */
    permissions: object;
    /** ID List of roles the user is assigned */
    roles: object;
    twoFactorAuthenticationEnabled: boolean;
    websiteTranslationLanguagesEdit: object;
    websiteTranslationLanguagesView: object;
    welcomeScreen: boolean;
    /** Asset Workspace */
    assetWorkspaces: UserWorkspace[];
    /** Data Object Workspace */
    dataObjectWorkspaces: UserWorkspace[];
    /** Document Workspace */
    documentWorkspaces: UserWorkspace[];
};
export type User2 = {
    /** Email of the User */
    email?: string | null;
    /** Firstname of the User */
    firstname?: string | null;
    /** Lastname of the User */
    lastname?: string | null;
    /** If User is admin */
    admin?: boolean;
    /** If User is active */
    active: boolean;
    /** Classes the user is allows to see */
    classes: object;
    closeWarning: boolean;
    allowDirtyClose: boolean;
    /** List of available content Language already sorted. */
    contentLanguages: object;
    /** Key Bindings */
    keyBindings: KeyBindingForAUser[];
    /** Language of the User */
    language: string;
    memorizeTabs: boolean;
    parentId: number;
    /** List of permissions for the user */
    permissions: object;
    /** ID List of roles the user is assigned */
    roles: object;
    twoFactorAuthenticationEnabled: boolean;
    websiteTranslationLanguagesEdit: object;
    websiteTranslationLanguagesView: object;
    welcomeScreen: boolean;
    /** Asset Workspace */
    assetWorkspaces: UserWorkspace[];
    /** Data Object Workspace */
    dataObjectWorkspaces: UserWorkspace[];
    /** Document Workspace */
    documentWorkspaces: UserWorkspace[];
};
export type UserPermission = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** Key of the Permission */
    key: string;
    /** Category og the Permission */
    category: string;
};
export type SimpleUser = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** ID of the User */
    id: number;
    /** Name of the User */
    username?: string;
};
export type ResetPassword = {
    /** Username */
    username: string;
};
export const {
    useUserCloneByIdMutation,
    useUserCreateMutation,
    useUserFolderCreateMutation,
    useUserGetCurrentInformationQuery,
    useUserGetByIdQuery,
    useUserUpdateByIdMutation,
    useUserDeleteByIdMutation,
    useUserFolderDeleteByIdMutation,
    useUserGetAvailablePermissionsQuery,
    useUserGetCollectionQuery,
    useUserResetPasswordMutation,
    useUserUpdatePasswordByIdMutation,
    useUserGetTreeQuery,
} = injectedRtkApi;
