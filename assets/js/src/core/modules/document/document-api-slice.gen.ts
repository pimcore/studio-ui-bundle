import { api } from "@sdk/api";
export const addTagTypes = ["Documents"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            documentAdd: build.mutation<DocumentAddApiResponse, DocumentAddApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/add/${queryArg.parentId}`,
                    method: "POST",
                    body: queryArg.documentAddParameters,
                }),
                invalidatesTags: ["Documents"],
            }),
            documentClone: build.mutation<DocumentCloneApiResponse, DocumentCloneApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/${queryArg.id}/clone/${queryArg.parentId}`,
                    method: "POST",
                    body: queryArg.documentCloneParameters,
                }),
                invalidatesTags: ["Documents"],
            }),
            documentConvert: build.mutation<DocumentConvertApiResponse, DocumentConvertApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/${queryArg.id}/convert/${queryArg["type"]}`,
                    method: "POST",
                }),
                invalidatesTags: ["Documents"],
            }),
            documentDocTypeList: build.query<DocumentDocTypeListApiResponse, DocumentDocTypeListApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/doc-types`,
                    params: {
                        type: queryArg["type"],
                    },
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
            documentAvailableControllersList: build.query<
                DocumentAvailableControllersListApiResponse,
                DocumentAvailableControllersListApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/documents/get-available-controllers` }),
                providesTags: ["Documents"],
            }),
            documentAvailableTemplatesList: build.query<
                DocumentAvailableTemplatesListApiResponse,
                DocumentAvailableTemplatesListApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/documents/get-available-templates` }),
                providesTags: ["Documents"],
            }),
            documentReplaceContent: build.mutation<DocumentReplaceContentApiResponse, DocumentReplaceContentApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/${queryArg.sourceId}/replace/${queryArg.targetId}`,
                    method: "POST",
                }),
                invalidatesTags: ["Documents"],
            }),
            documentsListAvailableSites: build.query<
                DocumentsListAvailableSitesApiResponse,
                DocumentsListAvailableSitesApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/sites/list-available`,
                    params: {
                        excludeMainSite: queryArg.excludeMainSite,
                    },
                }),
                providesTags: ["Documents"],
            }),
            documentUpdateSite: build.mutation<DocumentUpdateSiteApiResponse, DocumentUpdateSiteApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/site/${queryArg.id}`,
                    method: "POST",
                    body: queryArg.update20Site,
                }),
                invalidatesTags: ["Documents"],
            }),
            documentDeleteSite: build.mutation<DocumentDeleteSiteApiResponse, DocumentDeleteSiteApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/documents/site/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Documents"],
            }),
            documentAddTranslation: build.mutation<DocumentAddTranslationApiResponse, DocumentAddTranslationApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/translations/${queryArg.id}/add/${queryArg.translationId}`,
                    method: "POST",
                }),
                invalidatesTags: ["Documents"],
            }),
            documentDeleteTranslation: build.mutation<
                DocumentDeleteTranslationApiResponse,
                DocumentDeleteTranslationApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/translations/${queryArg.id}/delete/${queryArg.translationId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Documents"],
            }),
            documentGetTranslations: build.query<DocumentGetTranslationsApiResponse, DocumentGetTranslationsApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/documents/translations/${queryArg.id}` }),
                providesTags: ["Documents"],
            }),
            documentGetTranslationParentByLanguage: build.query<
                DocumentGetTranslationParentByLanguageApiResponse,
                DocumentGetTranslationParentByLanguageApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/translations/${queryArg.id}/get-parent/${queryArg.language}`,
                }),
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
export type DocumentAddApiResponse = /** status 200 ID of added document */ {
    /** ID of created document element */
    id: number;
};
export type DocumentAddApiArg = {
    /** ParentId of the document */
    parentId: number;
    documentAddParameters: DocumentAdd;
};
export type DocumentCloneApiResponse =
    /** status 201 Successfully copied parent document and created <strong>jobRun</strong> for copying children */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type DocumentCloneApiArg = {
    /** Id of the document */
    id: number;
    /** ParentId of the document */
    parentId: number;
    documentCloneParameters: DocumentCloneParameters;
};
export type DocumentConvertApiResponse = unknown;
export type DocumentConvertApiArg = {
    /** Id of the document */
    id: number;
    /** Document type to convert to */
    type: string;
};
export type DocumentDocTypeListApiResponse = /** status 200 List of all DocTypes */ {
    items: DocType[];
};
export type DocumentDocTypeListApiArg = {
    /** Filter results by docType type */
    type?: string;
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
export type DocumentAvailableControllersListApiResponse =
    /** status 200 document_available_controllers_list_success_response */ {
        items: DocumentController[];
    };
export type DocumentAvailableControllersListApiArg = void;
export type DocumentAvailableTemplatesListApiResponse =
    /** status 200 document_available_templates_list_success_response */ {
        items: DocumentTemplate[];
    };
export type DocumentAvailableTemplatesListApiArg = void;
export type DocumentReplaceContentApiResponse = unknown;
export type DocumentReplaceContentApiArg = {
    /** SourceId of the document */
    sourceId: number;
    /** TargetId of the document */
    targetId: number;
};
export type DocumentsListAvailableSitesApiResponse = /** status 200 List of available sites */ {
    items: Site[];
};
export type DocumentsListAvailableSitesApiArg = {
    /** Exclude main site from the list */
    excludeMainSite?: boolean;
};
export type DocumentUpdateSiteApiResponse = unknown;
export type DocumentUpdateSiteApiArg = {
    /** Id of the document */
    id: number;
    update20Site: Update20Site;
};
export type DocumentDeleteSiteApiResponse = unknown;
export type DocumentDeleteSiteApiArg = {
    /** Id of the document */
    id: number;
};
export type DocumentAddTranslationApiResponse = unknown;
export type DocumentAddTranslationApiArg = {
    /** Id of the document */
    id: number;
    /** TranslationId of the document */
    translationId: number;
};
export type DocumentDeleteTranslationApiResponse = unknown;
export type DocumentDeleteTranslationApiArg = {
    /** Id of the document */
    id: number;
    /** TranslationId of the document */
    translationId: number;
};
export type DocumentGetTranslationsApiResponse =
    /** status 200 Get all existing translations */ Document20Translation20Links;
export type DocumentGetTranslationsApiArg = {
    /** Id of the document */
    id: number;
};
export type DocumentGetTranslationParentByLanguageApiResponse =
    /** status 200 Parent translation document data */ Document20Translation20Parent;
export type DocumentGetTranslationParentByLanguageApiArg = {
    /** Id of the document */
    id: number;
    /** Language code for the translation parent */
    language: string;
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
export type DocumentAdd = {
    /** Key */
    key: string;
    /** Type */
    type: string;
    /** Title */
    title: string | null;
    /** Navigation name */
    navigationName: string | null;
    /** Document type ID */
    docTypeId: string | null;
    /** Id of the base document for new translation */
    translationsSourceId: number | null;
    /** Document language when adding a translation */
    language: string | null;
    /** Id of the base document for content */
    inheritanceSourceId: number | null;
};
export type DocumentCloneParameters = {
    /** Language for the new translation */
    language: string | null;
    /** Enable Inheritance */
    enableInheritance: boolean;
    /** Recursive */
    recursive: boolean;
    /** Update References */
    updateReferences: boolean;
};
export type DocType = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: string;
    /** Name */
    name: string;
    /** Type */
    type: string;
    /** Group */
    group: string | null;
    /** Controller */
    controller: string | null;
    /** Template */
    template: string | null;
    /** Priority */
    priority: number;
    /** Creation date */
    creationDate: number | null;
    /** Modification date */
    modificationDate: number | null;
    /** Static generator enabled */
    staticGeneratorEnabled: boolean;
    /** Is writeable */
    writeable: boolean;
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
    userModification: number | null;
    /** Locked */
    locked: string | null;
    /** Is locked */
    isLocked: boolean;
    /** Creation date */
    creationDate: number | null;
    /** Modification date */
    modificationDate: number | null;
};
export type CustomAttributes = {
    /** Custom Icon */
    icon: ElementIcon | null;
    /** Custom Tooltip */
    tooltip: string | null;
    /** AdditionalIcons */
    additionalIcons: string[];
    /** Custom Key/Filename */
    key: string | null;
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
    save: boolean;
    /** Unpublish */
    unpublish: boolean;
};
export type Document = Element & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Custom attributes for the tree */
    customAttributes?: CustomAttributes;
    /** Has workflow available */
    hasWorkflowAvailable: boolean;
    /** Full path */
    fullPath: string;
    /** Published */
    published: boolean;
    /** Type */
    type: string;
    /** Key */
    key: string;
    /** Has children */
    hasChildren: boolean;
    /** Workflow permissions */
    hasWorkflowWithPermissions: boolean;
    permissions: DocumentPermissions;
};
export type DocumentFolder = Document;
export type Email = Document & {
    /** Controller */
    controller: string;
    /** Template */
    template: string;
    /** Main document ID */
    contentMainDocumentId: number;
    /** Supports main content */
    supportsContentMain: boolean;
    /** Is missing required editable */
    missingRequiredEditable: boolean;
    /** Is static generator enabled */
    staticGeneratorEnabled: boolean;
    /** Lifetime of static generator */
    staticGeneratorLifetime: number;
    /** Subject */
    subject: string;
    /** From */
    from: string;
    /** Reply to */
    replyTo: string;
    /** To */
    to: string;
    /** CC */
    cc: string;
    /** BCC */
    bcc: string;
};
export type Hardlink = Document & {
    /** Source ID */
    sourceId: number | null;
    /** Properties from source */
    propertiesFromSource: boolean;
    /** Children from source */
    childrenFromSource: boolean;
};
export type Link = Document & {
    /** Internal ID */
    internal: number | null;
    /** Internal type */
    internalType: string | null;
    /** Direct */
    direct: string;
    /** Link type */
    linkType: string;
    /** Href */
    href: string;
};
export type Page = Document & {
    /** Controller */
    controller: string;
    /** Template */
    template: string;
    /** Main document ID */
    contentMainDocumentId: number;
    /** Supports main content */
    supportsContentMain: boolean;
    /** Is missing required editable */
    missingRequiredEditable: boolean;
    /** Is static generator enabled */
    staticGeneratorEnabled: boolean;
    /** Lifetime of static generator */
    staticGeneratorLifetime: number;
    /** Title */
    title: string | null;
    /** Description */
    description: string | null;
    /** Pretty Url */
    prettyUrl: string | null;
};
export type Snippet = Document & {
    /** Controller */
    controller: string;
    /** Template */
    template: string;
    /** Main document ID */
    contentMainDocumentId: number;
    /** Supports main content */
    supportsContentMain: boolean;
    /** Is missing required editable */
    missingRequiredEditable: boolean;
    /** Is static generator enabled */
    staticGeneratorEnabled: boolean;
    /** Lifetime of static generator */
    staticGeneratorLifetime: number;
};
export type DocumentController = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Name */
    name: string;
};
export type DocumentTemplate = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Path */
    path: string;
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
    rootId: number | null;
    /** Root path */
    rootPath: string | null;
};
export type Update20Site = {
    /** Main domain */
    mainDomain: string;
    /** Domains */
    domains: string[];
    /** Error document */
    errorDocument: string;
    /** Localized error documents */
    localizedErrorDocuments: object;
    /** Redirect to main domain */
    redirectToMainDomain: boolean;
};
export type Document20Translation20Link = {
    /** Language */
    language: string;
    /** Document Id */
    documentId: number;
};
export type Document20Translation20Links = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Language */
    language: string;
    /** Translation links */
    translationLinks?: Document20Translation20Link[];
};
export type Document20Translation20Parent = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Document Id */
    id: number;
    /** Document full path */
    fullPath: string;
};
export const {
    useDocumentAddMutation,
    useDocumentCloneMutation,
    useDocumentConvertMutation,
    useDocumentDocTypeListQuery,
    useDocumentGetByIdQuery,
    useDocumentPageStreamPreviewQuery,
    useDocumentAvailableControllersListQuery,
    useDocumentAvailableTemplatesListQuery,
    useDocumentReplaceContentMutation,
    useDocumentsListAvailableSitesQuery,
    useDocumentUpdateSiteMutation,
    useDocumentDeleteSiteMutation,
    useDocumentAddTranslationMutation,
    useDocumentDeleteTranslationMutation,
    useDocumentGetTranslationsQuery,
    useDocumentGetTranslationParentByLanguageQuery,
    useDocumentGetTreeQuery,
} = injectedRtkApi;
