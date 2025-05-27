import { api } from "../../../app/api/pimcore/index";
export const addTagTypes = ["Role Management"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            roleCloneById: build.mutation<RoleCloneByIdApiResponse, RoleCloneByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/role/clone/${queryArg.id}`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Role Management"],
            }),
            roleFolderCreate: build.mutation<RoleFolderCreateApiResponse, RoleFolderCreateApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/role/folder`, method: "POST", body: queryArg.body }),
                invalidatesTags: ["Role Management"],
            }),
            roleCreate: build.mutation<RoleCreateApiResponse, RoleCreateApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/role`, method: "POST", body: queryArg.body }),
                invalidatesTags: ["Role Management"],
            }),
            roleFolderDeleteById: build.mutation<RoleFolderDeleteByIdApiResponse, RoleFolderDeleteByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/role/folder/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Role Management"],
            }),
            roleGetById: build.query<RoleGetByIdApiResponse, RoleGetByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/role/${queryArg.id}` }),
                providesTags: ["Role Management"],
            }),
            roleUpdateById: build.mutation<RoleUpdateByIdApiResponse, RoleUpdateByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/role/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.updateRole,
                }),
                invalidatesTags: ["Role Management"],
            }),
            roleDeleteById: build.mutation<RoleDeleteByIdApiResponse, RoleDeleteByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/role/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Role Management"],
            }),
            roleGetCollection: build.query<RoleGetCollectionApiResponse, RoleGetCollectionApiArg>({
                query: () => ({ url: `/pimcore-studio/api/roles` }),
                providesTags: ["Role Management"],
            }),
            roleGetTree: build.query<RoleGetTreeApiResponse, RoleGetTreeApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/roles/tree`,
                    params: { parentId: queryArg.parentId },
                }),
                providesTags: ["Role Management"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type RoleCloneByIdApiResponse = /** status 200 Node of the cloned Role. */ TreeNode;
export type RoleCloneByIdApiArg = {
    /** Id of the role */
    id: number;
    body: {
        name?: string;
    };
};
export type RoleFolderCreateApiResponse = /** status 200 Node of the new created Folder */ TreeNode;
export type RoleFolderCreateApiArg = {
    body: {
        parentId: any;
        name: string;
    };
};
export type RoleCreateApiResponse = /** status 200 Node of the new created Role. */ TreeNode;
export type RoleCreateApiArg = {
    body: {
        parentId: any;
        name: string;
    };
};
export type RoleFolderDeleteByIdApiResponse = /** status 200 Success */ void;
export type RoleFolderDeleteByIdApiArg = {
    /** Id of the folder */
    id: number;
};
export type RoleGetByIdApiResponse = /** status 200 List of available user roles. */ DetailedUserRole;
export type RoleGetByIdApiArg = {
    /** Id of the role */
    id: number;
};
export type RoleUpdateByIdApiResponse = /** status 200 Updated data. */ DetailedUserRole;
export type RoleUpdateByIdApiArg = {
    /** Id of the Role */
    id: number;
    updateRole: UpdateUserRole;
};
export type RoleDeleteByIdApiResponse = /** status 200 Success */ void;
export type RoleDeleteByIdApiArg = {
    /** Id of the role */
    id: number;
};
export type RoleGetCollectionApiResponse = /** status 200 List of available roles. */ {
    totalItems: number;
    items: SimpleUserRole[];
};
export type RoleGetCollectionApiArg = void;
export type RoleGetTreeApiResponse = /** status 200 Collection of roles including folders for the given parent id. */ {
    totalItems: number;
    items: TreeNode[];
};
export type RoleGetTreeApiArg = {
    /** Filter roles by parent id. */
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
export type DetailedUserRole = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of the User */
    id: number;
    /** Name of Folder or Role */
    name: any;
    /** Classes the user is allows to see */
    classes: object;
    parentId: any;
    /** List of permissions for the user */
    permissions: object;
    /** List of document types for the role */
    docTypes: object;
    websiteTranslationLanguagesEdit: object;
    websiteTranslationLanguagesView: object;
    /** Asset Workspace */
    assetWorkspaces: UserWorkspace[];
    /** Data Object Workspace */
    dataObjectWorkspaces: UserWorkspace[];
    /** Document Workspace */
    documentWorkspaces: UserWorkspace[];
    /** Allowed studio perspectives */
    perspectives: PerspectiveConfig[];
};
export type UpdateUserRole = {
    /** Name of Folder or Role */
    name: any;
    /** Classes the user is allows to see */
    classes: object;
    parentId: any;
    /** List of permissions for the user */
    permissions: object;
    /** List of document types for the role */
    docTypes: object;
    websiteTranslationLanguagesEdit: object;
    websiteTranslationLanguagesView: object;
    /** Asset Workspace */
    assetWorkspaces: UserWorkspace[];
    /** Data Object Workspace */
    dataObjectWorkspaces: UserWorkspace[];
    /** Document Workspace */
    documentWorkspaces: UserWorkspace[];
    /** Allowed studio perspectives */
    perspectives: object;
};
export type SimpleUserRole = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of the Role */
    id: number;
    /** Name of the Role */
    name?: string;
};
export const {
    useRoleCloneByIdMutation,
    useRoleFolderCreateMutation,
    useRoleCreateMutation,
    useRoleFolderDeleteByIdMutation,
    useRoleGetByIdQuery,
    useRoleUpdateByIdMutation,
    useRoleDeleteByIdMutation,
    useRoleGetCollectionQuery,
    useRoleGetTreeQuery,
} = injectedRtkApi;
