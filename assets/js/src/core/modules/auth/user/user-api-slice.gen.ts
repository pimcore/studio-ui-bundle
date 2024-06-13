import { api } from "../../../app/api/pimcore/index";
export const addTagTypes = ["User Management"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            cloneUser: build.mutation<CloneUserApiResponse, CloneUserApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/user/clone/${queryArg.id}`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["User Management"],
            }),
            getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
                query: (queryArg) => ({ url: `/studio/api/users`, params: { parentId: queryArg.parentId } }),
                providesTags: ["User Management"],
            }),
            getStudioApiUserCurrentUserInformation: build.query<
                GetStudioApiUserCurrentUserInformationApiResponse,
                GetStudioApiUserCurrentUserInformationApiArg
            >({
                query: () => ({ url: `/studio/api/user/current-user-information` }),
                providesTags: ["User Management"],
            }),
            deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
                query: (queryArg) => ({ url: `/studio/api/user/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["User Management"],
            }),
            deleteUserFolder: build.mutation<DeleteUserFolderApiResponse, DeleteUserFolderApiArg>({
                query: (queryArg) => ({ url: `/studio/api/user/folder/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["User Management"],
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
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type CloneUserApiResponse = /** status 200 Node of the cloned user. */ UserTreeNode;
export type CloneUserApiArg = {
    /** ID of the user */
    id: number;
    body: {
        name?: string;
    };
};
export type GetUsersApiResponse = /** status 200 Collection of users including folders for the given parent id. */ {
    totalItems: number;
    items: UserTreeNode[];
};
export type GetUsersApiArg = {
    /** Filter users by parent id. */
    parentId: number;
};
export type GetStudioApiUserCurrentUserInformationApiResponse =
    /** status 200 Current user informations. */ UserInformations;
export type GetStudioApiUserCurrentUserInformationApiArg = void;
export type DeleteUserApiResponse = /** status 200 Success */ void;
export type DeleteUserApiArg = {
    /** ID of the user */
    id: number;
};
export type DeleteUserFolderApiResponse = /** status 200 Success */ void;
export type DeleteUserFolderApiArg = {
    /** ID of the user-folder */
    id: number;
};
export type PostStudioApiUserResetPasswordApiResponse = /** status 200 Success */ void;
export type PostStudioApiUserResetPasswordApiArg = {
    resetPassword: ResetPassword;
};
export type UserTreeNode = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** Unique Identifier */
    id?: number;
    /** Name of Folder or User */
    name?: string;
    /** Is ether user or folder */
    type?: string;
    /** If a folder has sub items */
    hasChildren?: boolean;
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
export type UserInformations = {
    /** Username */
    username: string;
    /** Roles */
    roles: string[];
};
export type ResetPassword = {
    /** Username */
    username: string;
};
export const {
    useCloneUserMutation,
    useGetUsersQuery,
    useGetStudioApiUserCurrentUserInformationQuery,
    useDeleteUserMutation,
    useDeleteUserFolderMutation,
    usePostStudioApiUserResetPasswordMutation,
} = injectedRtkApi;
