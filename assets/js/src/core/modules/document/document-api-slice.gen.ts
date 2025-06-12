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
            documentDocTypeAdd: build.mutation<DocumentDocTypeAddApiResponse, DocumentDocTypeAddApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/doc-types/add`,
                    method: "POST",
                    body: queryArg.docTypeAddParameters,
                }),
                invalidatesTags: ["Documents"],
            }),
            documentDocTypeUpdateById: build.mutation<
                DocumentDocTypeUpdateByIdApiResponse,
                DocumentDocTypeUpdateByIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/doc-types/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.docTypeUpdateParameters,
                }),
                invalidatesTags: ["Documents"],
            }),
            documentDocTypeDelete: build.mutation<DocumentDocTypeDeleteApiResponse, DocumentDocTypeDeleteApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/doc-types/${queryArg.id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Documents"],
            }),
            documentDocTypeTypeList: build.query<DocumentDocTypeTypeListApiResponse, DocumentDocTypeTypeListApiArg>({
                query: () => ({ url: `/pimcore-studio/api/documents/doc-types/types` }),
                providesTags: ["Documents"],
            }),
            documentDocTypeList: build.query<DocumentDocTypeListApiResponse, DocumentDocTypeListApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/doc-types`,
                    params: { type: queryArg["type"] },
                }),
                providesTags: ["Documents"],
            }),
            documentGetById: build.query<DocumentGetByIdApiResponse, DocumentGetByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/documents/${queryArg.id}` }),
                providesTags: ["Documents"],
            }),
            documentUpdateById: build.mutation<DocumentUpdateByIdApiResponse, DocumentUpdateByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Documents"],
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
                    params: { excludeMainSite: queryArg.excludeMainSite },
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
    /** status 200 Successfully copied documents */ void | /** status 201 Successfully copied parent document and created <strong>jobRun</strong> for copying children */ {
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
export type DocumentConvertApiResponse = /** status 200 Successfully changed document type */ void;
export type DocumentConvertApiArg = {
    /** Id of the document */
    id: number;
    /** Document type to convert to */
    type: string;
};
export type DocumentDocTypeAddApiResponse = /** status 200 New DocType data as JSON */ DocType;
export type DocumentDocTypeAddApiArg = {
    docTypeAddParameters: DocTypeAdd;
};
export type DocumentDocTypeUpdateByIdApiResponse = /** status 200 Successfully updated DocType */ DocType;
export type DocumentDocTypeUpdateByIdApiArg = {
    /** The Id of the DocType to update */
    id: string;
    docTypeUpdateParameters: DocTypeUpdate;
};
export type DocumentDocTypeDeleteApiResponse = /** status 200 Successfully deleted document DocType */ void;
export type DocumentDocTypeDeleteApiArg = {
    /** The Id of the DocType to delete */
    id: string;
};
export type DocumentDocTypeTypeListApiResponse = /** status 200 List of available DocType types */ {
    items: DocTypeType[];
};
export type DocumentDocTypeTypeListApiArg = void;
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
export type DocumentUpdateByIdApiResponse = /** status 200 Successfully updated document */
    | Document
    | DocumentFolder
    | Email
    | Hardlink
    | Link
    | Page
    | Snippet;
export type DocumentUpdateByIdApiArg = {
    /** Id of the document */
    id: number;
    body: {
        data: {
            parentId?: any;
            index?: any;
            key?: any;
            task?: "autoSave" | "publish" | "save" | "unpublish" | "version";
            locked?: any;
            published?: any;
            editableData?: any;
            settingsData?: any;
            missingRequiredEditable?: any;
            properties?: UpdateDataProperty[];
        };
    };
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
export type DocumentReplaceContentApiResponse = /** status 200 Successfully replaced contents of the document */ void;
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
export type DocumentUpdateSiteApiResponse = /** status 200 Successfully created/updated site */ void;
export type DocumentUpdateSiteApiArg = {
    /** Id of the document */
    id: number;
    update20Site: Update20Site;
};
export type DocumentDeleteSiteApiResponse = /** status 200 Successfully deleted site */ void;
export type DocumentDeleteSiteApiArg = {
    /** Id of the document */
    id: number;
};
export type DocumentAddTranslationApiResponse = /** status 200 Successfully linked translation document */ void;
export type DocumentAddTranslationApiArg = {
    /** Id of the document */
    id: number;
    /** TranslationId of the document */
    translationId: number;
};
export type DocumentDeleteTranslationApiResponse = /** status 200 Successfully deleted translation document */ void;
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
export type DocumentGetTreeApiResponse =
    /** status 200 Paginated documents with total count as header param as JSON */ {
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
    title: any;
    /** Navigation name */
    navigationName: any;
    /** Document type ID */
    docTypeId: any;
    /** Id of the base document for new translation */
    translationsSourceId: any;
    /** Document language when adding a translation */
    language: any;
    /** Id of the base document for content */
    inheritanceSourceId: any;
};
export type DocumentCloneParameters = {
    /** Language for the new translation */
    language: any;
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
    group: any;
    /** Controller */
    controller: any;
    /** Template */
    template: any;
    /** Priority */
    priority: number;
    /** Creation date */
    creationDate: any;
    /** Modification date */
    modificationDate: any;
    /** Static generator enabled */
    staticGeneratorEnabled: boolean;
    /** Is writeable */
    writeable: boolean;
};
export type DocTypeAdd = {
    /** Name */
    name: string;
    /** Type */
    type: string;
};
export type DocTypeUpdate = {
    /** Name */
    name: string;
    /** Type */
    type: string;
    /** Group */
    group: any;
    /** Controller */
    controller: any;
    /** Template */
    template: any;
    /** Priority */
    priority: number;
    /** Static generator enabled */
    staticGeneratorEnabled: boolean;
};
export type DocTypeType = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Name */
    name: string;
    /** Valid table */
    validTable?: string;
    /** Children supported */
    childrenSupported?: boolean;
    /** Direct route */
    directRoute?: boolean;
    /** Predefined document types */
    predefinedDocumentTypes?: boolean;
    /** Translatable */
    translatable?: boolean;
    /** Translatable Inheritance */
    translatableInheritance?: boolean;
    /** Only printable children */
    onlyPrintableChildren?: boolean;
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
    /** Custom index */
    index?: number;
    /** Has children */
    hasChildren?: boolean;
    /** Workflow permissions */
    hasWorkflowWithPermissions?: boolean;
    permissions?: DocumentPermissions;
    /** Detail document data */
    documentDetailData?: object;
};
export type DocumentFolder = Document;
export type PageSnippetDraftData = {
    /** ID */
    id: number;
    /** Modification date */
    modificationDate: number;
    /** Is auto save */
    isAutoSave: boolean;
};
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
    draftData?: PageSnippetDraftData;
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
    draftData?: PageSnippetDraftData;
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
    draftData?: PageSnippetDraftData;
};
export type UpdateDataProperty = {
    /** key */
    key: string;
    /** data */
    data: any;
    /** type */
    type: string;
    /** inheritable */
    inheritable: boolean;
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
    rootId: any;
    /** Root path */
    rootPath: any;
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
    useDocumentDocTypeAddMutation,
    useDocumentDocTypeUpdateByIdMutation,
    useDocumentDocTypeDeleteMutation,
    useDocumentDocTypeTypeListQuery,
    useDocumentDocTypeListQuery,
    useDocumentGetByIdQuery,
    useDocumentUpdateByIdMutation,
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
