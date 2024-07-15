import { api } from "../../../app/api/pimcore/index";
export const addTagTypes = ["Role Management", "User Management"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getUserRoles: build.query<GetUserRolesApiResponse, GetUserRolesApiArg>({
                query: () => ({ url: `/studio/api/roles` }),
                providesTags: ["Role Management"],
            }),
            cloneUser: build.mutation<CloneUserApiResponse, CloneUserApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/user/clone/${queryArg.id}`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["User Management"],
            }),
            createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
                query: (queryArg) => ({ url: `/studio/api/user/`, method: "POST", body: queryArg.body }),
                invalidatesTags: ["User Management"],
            }),
            createUserFolder: build.mutation<CreateUserFolderApiResponse, CreateUserFolderApiArg>({
                query: (queryArg) => ({ url: `/studio/api/user/folder`, method: "POST", body: queryArg.body }),
                invalidatesTags: ["User Management"],
            }),
            getStudioApiUserCurrentUserInformation: build.query<
                GetStudioApiUserCurrentUserInformationApiResponse,
                GetStudioApiUserCurrentUserInformationApiArg
            >({
                query: () => ({ url: `/studio/api/user/current-user-information` }),
                providesTags: ["User Management"],
            }),
            getUserById: build.query<GetUserByIdApiResponse, GetUserByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/user/${queryArg.id}` }),
                providesTags: ["User Management"],
            }),
            updateUserById: build.mutation<UpdateUserByIdApiResponse, UpdateUserByIdApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/user/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.updateUser,
                }),
                invalidatesTags: ["User Management"],
            }),
            deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
                query: (queryArg) => ({ url: `/studio/api/user/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["User Management"],
            }),
            deleteUserFolder: build.mutation<DeleteUserFolderApiResponse, DeleteUserFolderApiArg>({
                query: (queryArg) => ({ url: `/studio/api/user/folder/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["User Management"],
            }),
            getAvailableUserPermissions: build.query<
                GetAvailableUserPermissionsApiResponse,
                GetAvailableUserPermissionsApiArg
            >({
                query: () => ({ url: `/studio/api/user/available-permissions` }),
                providesTags: ["User Management"],
            }),
            postStudioApiUserResetPassword: build.mutation<
                PostStudioApiUserResetPasswordApiResponse,
                PostStudioApiUserResetPasswordApiArg
            >({
                query: (queryArg) => ({
                    url: `/studio/api/user/reset-password`,
                    method: "POST",
                    body: queryArg.resetPassword,
                }),
                invalidatesTags: ["User Management"],
            }),
            updateUserPasswordById: build.mutation<UpdateUserPasswordByIdApiResponse, UpdateUserPasswordByIdApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/user/${queryArg.id}/password`,
                    method: "PUT",
                    body: queryArg.body,
                }),
                invalidatesTags: ["User Management"],
            }),
            getUserTree: build.query<GetUserTreeApiResponse, GetUserTreeApiArg>({
                query: (queryArg) => ({ url: `/studio/api/users/tree`, params: { parentId: queryArg.parentId } }),
                providesTags: ["User Management"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type GetUserRolesApiResponse = /** status 200 List of available user roles. */ {
    totalItems: number;
    items: SimpleUserRole[];
};
export type GetUserRolesApiArg = void;
export type CloneUserApiResponse = /** status 200 Node of the cloned user. */ TreeNode;
export type CloneUserApiArg = {
    /** Id of the user */
    id: number;
    body: {
        name?: string;
    };
};
export type CreateUserApiResponse = /** status 200 Node of the new created User */ TreeNode;
export type CreateUserApiArg = {
    body: {
        parentId: number | null;
        name: string;
    };
};
export type CreateUserFolderApiResponse = /** status 200 Node of the new created Folder */ TreeNode;
export type CreateUserFolderApiArg = {
    body: {
        parentId: number | null;
        name: string;
    };
};
export type GetStudioApiUserCurrentUserInformationApiResponse =
    /** status 200 Current user informations. */ UserInformation;
export type GetStudioApiUserCurrentUserInformationApiArg = void;
export type GetUserByIdApiResponse = /** status 200 User data. */ User;
export type GetUserByIdApiArg = {
    /** Id of the user */
    id: number;
};
export type UpdateUserByIdApiResponse = /** status 200 Updated data. */ User;
export type UpdateUserByIdApiArg = {
    /** Id of the User */
    id: number;
    updateUser: User2;
};
export type DeleteUserApiResponse = /** status 200 Success */ void;
export type DeleteUserApiArg = {
    /** Id of the user */
    id: number;
};
export type DeleteUserFolderApiResponse = /** status 200 Success */ void;
export type DeleteUserFolderApiArg = {
    /** Id of the user-folder */
    id: number;
};
export type GetAvailableUserPermissionsApiResponse = /** status 200 List of available user permissions. */ {
    totalItems: number;
    items: UserPermission[];
};
export type GetAvailableUserPermissionsApiArg = void;
export type PostStudioApiUserResetPasswordApiResponse = /** status 200 Success */ void;
export type PostStudioApiUserResetPasswordApiArg = {
    resetPassword: ResetPassword;
};
export type UpdateUserPasswordByIdApiResponse = /** status 200 Success */ void;
export type UpdateUserPasswordByIdApiArg = {
    /** Id of the User */
    id: number;
    body: {
        password: string;
        passwordConfirmation: string;
    };
};
export type GetUserTreeApiResponse = /** status 200 Collection of users including folders for the given parent id. */ {
    totalItems: number;
    items: TreeNode[];
};
export type GetUserTreeApiArg = {
    /** Filter users by parent id. */
    parentId: number;
};
export type SimpleUserRole = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** ID of the Role */
    id: number;
    /** Name of the Role */
    name?: string;
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
export type ResetPassword = {
    /** Username */
    username: string;
};
export const {
    useGetUserRolesQuery,
    useCloneUserMutation,
    useCreateUserMutation,
    useCreateUserFolderMutation,
    useGetStudioApiUserCurrentUserInformationQuery,
    useGetUserByIdQuery,
    useUpdateUserByIdMutation,
    useDeleteUserMutation,
    useDeleteUserFolderMutation,
    useGetAvailableUserPermissionsQuery,
    usePostStudioApiUserResetPasswordMutation,
    useUpdateUserPasswordByIdMutation,
    useGetUserTreeQuery,
} = injectedRtkApi;
