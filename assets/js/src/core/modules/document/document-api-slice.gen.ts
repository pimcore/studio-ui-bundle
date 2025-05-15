import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Documents"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            documentsListAvailableSites: build.query<
                DocumentsListAvailableSitesApiResponse,
                DocumentsListAvailableSitesApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/sites/list-available`,
                    params: { excludeMainSite: queryArg.excludeMainSite },
                }),
                providesTags: ["Documents"],
            }),
            documentGetById: build.query<DocumentGetByIdApiResponse, DocumentGetByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/documents/${queryArg.id}` }),
                providesTags: ["Documents"],
            }),
            documentPageStreamPreview: build.query<
                DocumentPageStreamPreviewApiResponse,
                DocumentPageStreamPreviewApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/documents/${queryArg.id}/page/stream/preview` }),
                providesTags: ["Documents"],
            }),
            documentGetTree: build.query<DocumentGetTreeApiResponse, DocumentGetTreeApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/tree`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        parentId: queryArg.parentId,
                        idSearchTerm: queryArg.idSearchTerm,
                        pqlQuery: queryArg.pqlQuery,
                        excludeFolders: queryArg.excludeFolders,
                        path: queryArg.path,
                        pathIncludeParent: queryArg.pathIncludeParent,
                        pathIncludeDescendants: queryArg.pathIncludeDescendants,
                    },
                }),
                providesTags: ["Documents"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type DocumentsListAvailableSitesApiResponse = /** status 200 List of available sites */ {
    items: Site[];
};
export type DocumentsListAvailableSitesApiArg = {
    /** Exclude main site from the list */
    excludeMainSite?: boolean;
};
export type DocumentGetByIdApiResponse = /** status 200 Successfully retrieved document data as JSON */
    | Document
    | DocumentFolder
    | Email
    | Hardlink
    | Link
    | Page
    | Snippet;
export type DocumentGetByIdApiArg = {
    /** Id of the document */
    id: number;
};
export type DocumentPageStreamPreviewApiResponse = /** status 200 Page preview stream */ Blob;
export type DocumentPageStreamPreviewApiArg = {
    /** Id of the page */
    id: number;
};
export type DocumentGetTreeApiResponse = /** status 200 document_get_tree_success_description */ {
    totalItems: number;
    items: (Document | DocumentFolder | Email | Hardlink | Link | Page | Snippet)[];
};
export type DocumentGetTreeApiArg = {
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Filter documents by parent id. */
    parentId?: number;
    /** Filter assets/data-objects by matching ids. As a wildcard * can be used */
    idSearchTerm?: string;
    /** Pql query filter */
    pqlQuery?: string;
    /** Filter folders from result. */
    excludeFolders?: boolean;
    /** Filter by path. */
    path?: string;
    /** Include the parent item in the result. */
    pathIncludeParent?: boolean;
    /** Include all descendants in the result. */
    pathIncludeDescendants?: boolean;
};
export type Site = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number;
    /** Domains */
    domains: string[];
    /** Domain */
    domain: string;
    /** ID of the root */
    rootId?: any;
    /** Root path */
    rootPath?: any;
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
export type ElementIcon = {
    /** Icon type */
    type: "name" | "path";
    /** Icon value */
    value: string;
};
export type Element = {
    /** ID */
    id: number;
    /** ID of parent */
    parentId: number;
    /** path */
    path: string;
    /** icon */
    icon?: ElementIcon;
    /** ID of owner */
    userOwner: number;
    /** User that modified the element */
    userModification: any;
    /** Locked */
    locked: any;
    /** Is locked */
    isLocked: boolean;
    /** Creation date */
    creationDate: any;
    /** Modification date */
    modificationDate: any;
};
export type CustomAttributes = {
    /** Custom Icon */
    icon: ElementIcon | null;
    /** Custom Tooltip */
    tooltip: any;
    /** AdditionalIcons */
    additionalIcons: string[];
    /** Custom Key/Filename */
    key: any;
    /** Additional Css Classes */
    additionalCssClasses: string[];
};
export type Permissions = {
    /** List */
    list: boolean;
    /** View */
    view: boolean;
    /** Publish */
    publish: boolean;
    /** Delete */
    delete: boolean;
    /** Rename */
    rename: boolean;
    /** Create */
    create: boolean;
    /** Settings */
    settings: boolean;
    /** Versions */
    versions: boolean;
    /** Properties */
    properties: boolean;
};
export type DocumentPermissions = Permissions & {
    /** Save */
    save?: boolean;
    /** Unpublish */
    unpublish?: boolean;
};
export type Document = Element & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Custom attributes for the tree */
    customAttributes?: CustomAttributes;
    /** Has workflow available */
    hasWorkflowAvailable?: boolean;
    /** Full path */
    fullPath?: string;
    /** Published */
    published?: boolean;
    /** Type */
    type?: string;
    /** Key */
    key?: string;
    /** Has children */
    hasChildren?: boolean;
    /** Workflow permissions */
    hasWorkflowWithPermissions?: boolean;
    permissions?: DocumentPermissions;
};
export type DocumentFolder = Document;
export type Email = Document & {
    /** Controller */
    controller?: string;
    /** Template */
    template?: string;
    /** Main document ID */
    contentMainDocumentId?: number;
    /** Supports main content */
    supportsContentMain?: boolean;
    /** Is missing required editable */
    missingRequiredEditable?: boolean;
    /** Is static generator enabled */
    staticGeneratorEnabled?: boolean;
    /** Lifetime of static generator */
    staticGeneratorLifetime?: number;
    /** Subject */
    subject?: string;
    /** From */
    from?: string;
    /** Reply to */
    replyTo?: string;
    /** To */
    to?: string;
    /** CC */
    cc?: string;
    /** BCC */
    bcc?: string;
};
export type Hardlink = Document & {
    /** Source ID */
    sourceId?: any;
    /** Properties from source */
    propertiesFromSource?: boolean;
    /** Children from source */
    childrenFromSource?: boolean;
};
export type Link = Document & {
    /** Internal ID */
    internal?: any;
    /** Internal type */
    internalType?: any;
    /** Direct */
    direct?: string;
    /** Link type */
    linkType?: string;
    /** Href */
    href?: string;
};
export type Page = Document & {
    /** Controller */
    controller?: string;
    /** Template */
    template?: string;
    /** Main document ID */
    contentMainDocumentId?: number;
    /** Supports main content */
    supportsContentMain?: boolean;
    /** Is missing required editable */
    missingRequiredEditable?: boolean;
    /** Is static generator enabled */
    staticGeneratorEnabled?: boolean;
    /** Lifetime of static generator */
    staticGeneratorLifetime?: number;
    /** Title */
    title?: any;
    /** Description */
    description?: any;
    /** Pretty Url */
    prettyUrl?: any;
};
export type Snippet = Document & {
    /** Controller */
    controller?: string;
    /** Template */
    template?: string;
    /** Main document ID */
    contentMainDocumentId?: number;
    /** Supports main content */
    supportsContentMain?: boolean;
    /** Is missing required editable */
    missingRequiredEditable?: boolean;
    /** Is static generator enabled */
    staticGeneratorEnabled?: boolean;
    /** Lifetime of static generator */
    staticGeneratorLifetime?: number;
};
export const {
    useDocumentsListAvailableSitesQuery,
    useDocumentGetByIdQuery,
    useDocumentPageStreamPreviewQuery,
    useDocumentGetTreeQuery,
} = injectedRtkApi;
