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
                    url: `/pimcore-studio/api/user/clone/${queryArg.id}`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["User Management"],
            }),
            userCreate: build.mutation<UserCreateApiResponse, UserCreateApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/user/`, method: "POST", body: queryArg.body }),
                invalidatesTags: ["User Management"],
            }),
            userFolderCreate: build.mutation<UserFolderCreateApiResponse, UserFolderCreateApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/user/folder`, method: "POST", body: queryArg.body }),
                invalidatesTags: ["User Management"],
            }),
            userGetCurrentInformation: build.query<
                UserGetCurrentInformationApiResponse,
                UserGetCurrentInformationApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/user/current-user-information` }),
                providesTags: ["User Management"],
            }),
            userGetById: build.query<UserGetByIdApiResponse, UserGetByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/user/${queryArg.id}` }),
                providesTags: ["User Management"],
            }),
            userUpdateById: build.mutation<UserUpdateByIdApiResponse, UserUpdateByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/user/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.updateUser,
                }),
                invalidatesTags: ["User Management"],
            }),
            userDeleteById: build.mutation<UserDeleteByIdApiResponse, UserDeleteByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/user/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["User Management"],
            }),
            userFolderDeleteById: build.mutation<UserFolderDeleteByIdApiResponse, UserFolderDeleteByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/user/folder/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["User Management"],
            }),
            userDefaultKeyBindings: build.query<UserDefaultKeyBindingsApiResponse, UserDefaultKeyBindingsApiArg>({
                query: () => ({ url: `/pimcore-studio/api/users/default-key-bindings` }),
                providesTags: ["User Management"],
            }),
            userGetAvailablePermissions: build.query<
                UserGetAvailablePermissionsApiResponse,
                UserGetAvailablePermissionsApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/user/available-permissions` }),
                providesTags: ["User Management"],
            }),
            userGetCollection: build.query<UserGetCollectionApiResponse, UserGetCollectionApiArg>({
                query: () => ({ url: `/pimcore-studio/api/users` }),
                providesTags: ["User Management"],
            }),
            userResetPassword: build.mutation<UserResetPasswordApiResponse, UserResetPasswordApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/user/reset-password`,
                    method: "POST",
                    body: queryArg.resetPassword,
                }),
                invalidatesTags: ["User Management"],
            }),
            pimcoreStudioApiUserSearch: build.query<
                PimcoreStudioApiUserSearchApiResponse,
                PimcoreStudioApiUserSearchApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/user/search`,
                    params: { searchQuery: queryArg.searchQuery },
                }),
                providesTags: ["User Management"],
            }),
            userUpdatePasswordById: build.mutation<UserUpdatePasswordByIdApiResponse, UserUpdatePasswordByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/user/${queryArg.id}/password`,
                    method: "PUT",
                    body: queryArg.body,
                }),
                invalidatesTags: ["User Management"],
            }),
            userUploadImage: build.mutation<UserUploadImageApiResponse, UserUploadImageApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/user/upload-image/${queryArg.id}`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["User Management"],
            }),
            userGetImage: build.query<UserGetImageApiResponse, UserGetImageApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/user/image/${queryArg.id}` }),
                providesTags: ["User Management"],
            }),
            userGetTree: build.query<UserGetTreeApiResponse, UserGetTreeApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/users/tree`,
                    params: { parentId: queryArg.parentId },
                }),
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
        parentId: any;
        name: string;
    };
};
export type UserFolderCreateApiResponse = /** status 200 Node of the new created Folder. */ TreeNode;
export type UserFolderCreateApiArg = {
    body: {
        parentId: any;
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
export type UserDefaultKeyBindingsApiResponse = /** status 200 List of default key bindings */ {
    totalItems: number;
    items: KeyBindingForAUser[];
};
export type UserDefaultKeyBindingsApiArg = void;
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
export type PimcoreStudioApiUserSearchApiResponse = /** status 200 user_search_summary_response */ {
    totalItems: number;
    items: SimpleUser[];
};
export type PimcoreStudioApiUserSearchApiArg = {
    /** Query to search for an user. This can be a part of username, firstname, lastname, email or id. */
    searchQuery?: string;
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
export type UserUploadImageApiResponse = /** status 200 Success */ void;
export type UserUploadImageApiArg = {
    /** Id of the User */
    id: number;
    body: {
        /** User image to upload */
        userImage: Blob;
    };
};
export type UserGetImageApiResponse = /** status 200 User profile image */ Blob;
export type UserGetImageApiArg = {
    /** Id of the User */
    id: number;
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
        [key: string]: string | number | boolean | object;
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
export type DependencyToAnObject = {
    /** ID of the object */
    id: number;
    /** Path to the object */
    path: string;
    /** Subtype of the object */
    subtype: string;
};
export type UserObjectDependencies = {
    /** Dependencies to objects */
    dependencies: DependencyToAnObject[];
    /** If is has hidden dependencies */
    hasHidden: boolean;
};
export type User = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of the User */
    id: number;
    /** Name of Folder or User */
    name?: any;
    /** Email of the User */
    email?: any;
    /** Firstname of the User */
    firstname?: any;
    /** Lastname of the User */
    lastname?: any;
    /** If a User is active */
    active: boolean;
    /** If User is admin */
    admin: boolean;
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
    lastLogin?: any;
    memorizeTabs: boolean;
    parentId: any;
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
    /** Object Dependencies */
    objectDependencies: UserObjectDependencies;
};
export type User2 = {
    /** Email of the User */
    email?: any;
    /** Firstname of the User */
    firstname?: any;
    /** Lastname of the User */
    lastname?: any;
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
        [key: string]: string | number | boolean | object;
    };
    /** Key of the Permission */
    key: string;
    /** Category og the Permission */
    category: string;
};
export type SimpleUser = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
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
    useUserDefaultKeyBindingsQuery,
    useUserGetAvailablePermissionsQuery,
    useUserGetCollectionQuery,
    useUserResetPasswordMutation,
    usePimcoreStudioApiUserSearchQuery,
    useUserUpdatePasswordByIdMutation,
    useUserUploadImageMutation,
    useUserGetImageQuery,
    useUserGetTreeQuery,
} = injectedRtkApi;
