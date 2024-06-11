import { api } from "../../../app/api/pimcore/index";
export const addTagTypes = ["User Management"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
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
export type PostStudioApiUserResetPasswordApiResponse = /** status 200 Success */ void;
export type PostStudioApiUserResetPasswordApiArg = {
    resetPassword: ResetPassword;
};
export type UserTreeNode = {
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
    message?: string;
};
export type DevError = {
    /** Message */
    message?: string;
    /** Details */
    details?: string;
};
export type UserInformations = {
    /** Username */
    username: string;
    /** Roles */
    roles: string[];
};
export type ResetPassword = {
    /** Username */
    username?: string;
};
export const {
    useGetUsersQuery,
    useGetStudioApiUserCurrentUserInformationQuery,
    usePostStudioApiUserResetPasswordMutation,
} = injectedRtkApi;
