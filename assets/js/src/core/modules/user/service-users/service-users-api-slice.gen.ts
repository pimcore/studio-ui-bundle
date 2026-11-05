import { api } from "@sdk/api";
export const addTagTypes = ["Service User Management"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            serviceUserCreate: build.mutation<ServiceUserCreateApiResponse, ServiceUserCreateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/service-user`,
                    method: "POST",
                    body: queryArg.serviceUserCreate,
                }),
                invalidatesTags: ["Service User Management"],
            }),
            serviceUserCreateFromUser: build.mutation<
                ServiceUserCreateFromUserApiResponse,
                ServiceUserCreateFromUserApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/service-user/from-user/${queryArg.id}`,
                    method: "POST",
                    body: queryArg.serviceUserCreateFromUser,
                }),
                invalidatesTags: ["Service User Management"],
            }),
            serviceUserDeactivateById: build.mutation<
                ServiceUserDeactivateByIdApiResponse,
                ServiceUserDeactivateByIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/service-user/${queryArg.id}/deactivate`,
                    method: "POST",
                }),
                invalidatesTags: ["Service User Management"],
            }),
            serviceUserGetById: build.query<ServiceUserGetByIdApiResponse, ServiceUserGetByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/service-user/${queryArg.id}` }),
                providesTags: ["Service User Management"],
            }),
            serviceUserUpdateById: build.mutation<ServiceUserUpdateByIdApiResponse, ServiceUserUpdateByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/service-user/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.serviceUserUpdate,
                }),
                invalidatesTags: ["Service User Management"],
            }),
            serviceUserDeleteById: build.mutation<ServiceUserDeleteByIdApiResponse, ServiceUserDeleteByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/service-user/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Service User Management"],
            }),
            serviceUserGetCollection: build.query<ServiceUserGetCollectionApiResponse, ServiceUserGetCollectionApiArg>({
                query: () => ({ url: `/pimcore-studio/api/service-users` }),
                providesTags: ["Service User Management"],
            }),
            serviceUserMcpTokenIssue: build.mutation<
                ServiceUserMcpTokenIssueApiResponse,
                ServiceUserMcpTokenIssueApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/service-user/${queryArg.id}/mcp-token`,
                    method: "POST",
                    body: queryArg.serviceUserMcpTokenRequest,
                }),
                invalidatesTags: ["Service User Management"],
            }),
            serviceUserMcpTokenRevoke: build.mutation<
                ServiceUserMcpTokenRevokeApiResponse,
                ServiceUserMcpTokenRevokeApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/service-user/${queryArg.id}/mcp-token`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Service User Management"],
            }),
            serviceUserRotateSecret: build.mutation<ServiceUserRotateSecretApiResponse, ServiceUserRotateSecretApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/service-user/${queryArg.id}/rotate-secret`,
                    method: "POST",
                }),
                invalidatesTags: ["Service User Management"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type ServiceUserCreateApiResponse =
    /** status 200 service_user_create_success_response */ ServiceUserCredentials;
export type ServiceUserCreateApiArg = {
    serviceUserCreate: CreateServiceUser;
};
export type ServiceUserCreateFromUserApiResponse =
    /** status 200 service_user_create_from_user_success_response */ ServiceUserCredentials;
export type ServiceUserCreateFromUserApiArg = {
    /** Id of the user */
    id: number;
    serviceUserCreateFromUser: CreateServiceUserFromUser;
};
export type ServiceUserDeactivateByIdApiResponse =
    /** status 200 service_user_deactivate_by_id_success_response */ ServiceUser;
export type ServiceUserDeactivateByIdApiArg = {
    /** Id of the service user */
    id: number;
};
export type ServiceUserGetByIdApiResponse = /** status 200 service_user_get_by_id_success_response */ ServiceUser;
export type ServiceUserGetByIdApiArg = {
    /** Id of the service user */
    id: number;
};
export type ServiceUserUpdateByIdApiResponse = /** status 200 service_user_update_by_id_success_response */ ServiceUser;
export type ServiceUserUpdateByIdApiArg = {
    /** Id of the service user */
    id: number;
    serviceUserUpdate: UpdateServiceUser;
};
export type ServiceUserDeleteByIdApiResponse = unknown;
export type ServiceUserDeleteByIdApiArg = {
    /** Id of the service user */
    id: number;
};
export type ServiceUserGetCollectionApiResponse = /** status 200 service_user_get_collection_success_response */ {
    totalItems: number;
    items: ServiceUser[];
};
export type ServiceUserGetCollectionApiArg = void;
export type ServiceUserMcpTokenIssueApiResponse =
    /** status 200 service_user_mcp_token_issue_success_response */ ServiceUserMcpAccessToken;
export type ServiceUserMcpTokenIssueApiArg = {
    /** Id of the service user */
    id: number;
    serviceUserMcpTokenRequest: IssueMcpAccessToken;
};
export type ServiceUserMcpTokenRevokeApiResponse = unknown;
export type ServiceUserMcpTokenRevokeApiArg = {
    /** Id of the service user */
    id: number;
};
export type ServiceUserRotateSecretApiResponse =
    /** status 200 service_user_rotate_secret_success_response */ ServiceUserCredentials;
export type ServiceUserRotateSecretApiArg = {
    /** Id of the service user */
    id: number;
};
export type ServiceUserCredentials = {
    /** ID of the service user */
    serviceUserId: number;
    /** OAuth client id */
    clientId: string;
    /** OAuth client secret, shown once */
    clientSecret: string;
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
export type UserDocumentWorkspace = UserWorkspace & {
    /** Save */
    save: boolean;
    /** Unpublish */
    unpublish: boolean;
    /** Localized Edit */
    localizedEdit?: string | null;
    /** Localized View */
    localizedView?: string | null;
    /** Layouts */
    layouts?: string | null;
};
export type UserDocumentWorkspace2 = UserWorkspace & {
    /** Save */
    save: boolean;
    /** Unpublish */
    unpublish: boolean;
};
export type CreateServiceUser = {
    /** Unique name across users and service users */
    name: string;
    /** Contact email of the team responsible */
    email?: string | null;
    /** Permissions */
    permissions?: string[];
    /** IDs of the roles */
    roles?: number[];
    /** Allowed classes */
    classes?: string[];
    /** Allowed document types */
    docTypes?: string[];
    /** Asset workspaces */
    assetWorkspaces?: UserWorkspace[];
    /** Data object workspaces */
    dataObjectWorkspaces?: UserDocumentWorkspace[];
    /** Document workspaces */
    documentWorkspaces?: UserDocumentWorkspace2[];
    /** OAuth scopes the bound client may request; all known scopes when omitted */
    scopes?: string[] | null;
};
export type CreateServiceUserFromUser = {
    /** Unique name across users and service users */
    name: string;
    /** Contact email of the team responsible */
    email?: string | null;
    /** OAuth scopes the bound client may request; all known scopes when omitted */
    scopes?: string[] | null;
};
export type ServiceUser = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of the service user */
    id: number;
    /** Unique name, shared with human users */
    name: string;
    /** Contact email of the team responsible */
    email: string | null;
    /** Whether the service user may authenticate */
    active: boolean;
    /** Permissions */
    permissions: string[];
    /** IDs of the assigned roles */
    roles: number[];
    /** Allowed classes */
    classes: string[];
    /** Allowed document types */
    docTypes: string[];
    /** Asset workspaces */
    assetWorkspaces: UserWorkspace[];
    /** Data object workspaces */
    dataObjectWorkspaces: UserDocumentWorkspace[];
    /** Document workspaces */
    documentWorkspaces: UserDocumentWorkspace2[];
    /** ID of the bound OAuth client (client_credentials) */
    clientId: string | null;
    /** Timestamp of the last login */
    lastLogin: number | null;
};
export type UpdateServiceUser = {
    /** Contact email of the team responsible */
    email?: string | null;
    /** Permissions */
    permissions?: string[];
    /** IDs of the roles */
    roles?: number[];
    /** Allowed classes */
    classes?: string[];
    /** Allowed document types */
    docTypes?: string[];
    /** Asset workspaces */
    assetWorkspaces?: UserWorkspace[];
    /** Data object workspaces */
    dataObjectWorkspaces?: UserDocumentWorkspace[];
    /** Document workspaces */
    documentWorkspaces?: UserDocumentWorkspace2[];
};
export type ServiceUserMcpAccessToken = {
    /** The bearer token, shown once */
    token: string;
    /** Expiry as a Unix timestamp */
    expiresAt: number;
};
export type IssueMcpAccessToken = {
    /** Lifetime in days, 1 to 90 */
    ttlDays?: number;
};
export const {
    useServiceUserCreateMutation,
    useServiceUserCreateFromUserMutation,
    useServiceUserDeactivateByIdMutation,
    useServiceUserGetByIdQuery,
    useServiceUserUpdateByIdMutation,
    useServiceUserDeleteByIdMutation,
    useServiceUserGetCollectionQuery,
    useServiceUserMcpTokenIssueMutation,
    useServiceUserMcpTokenRevokeMutation,
    useServiceUserRotateSecretMutation,
} = injectedRtkApi;
