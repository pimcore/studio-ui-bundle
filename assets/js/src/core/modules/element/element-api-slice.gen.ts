import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Elements"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            elementDelete: build.mutation<ElementDeleteApiResponse, ElementDeleteApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/elements/${queryArg.elementType}/delete/${queryArg.id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Elements"],
            }),
            elementGetDeleteInfo: build.query<ElementGetDeleteInfoApiResponse, ElementGetDeleteInfoApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/elements/${queryArg.elementType}/delete-info/${queryArg.id}`,
                }),
                providesTags: ["Elements"],
            }),
            elementFolderCreate: build.mutation<ElementFolderCreateApiResponse, ElementFolderCreateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/elements/${queryArg.elementType}/folder/${queryArg.parentId}`,
                    method: "POST",
                    body: queryArg.folderData,
                }),
                invalidatesTags: ["Elements"],
            }),
            elementGetContextPermissions: build.query<
                ElementGetContextPermissionsApiResponse,
                ElementGetContextPermissionsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/elements/${queryArg.elementType}/context-permissions/`,
                }),
                providesTags: ["Elements"],
            }),
            elementGetTreeLocation: build.query<ElementGetTreeLocationApiResponse, ElementGetTreeLocationApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/elements/${queryArg.elementType}/location/${queryArg.id}/${queryArg.perspectiveId}`,
                }),
                providesTags: ["Elements"],
            }),
            elementGetIdByPath: build.query<ElementGetIdByPathApiResponse, ElementGetIdByPathApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/elements/${queryArg.elementType}/path`,
                    params: { elementPath: queryArg.elementPath },
                }),
                providesTags: ["Elements"],
            }),
            elementGetSubtype: build.query<ElementGetSubtypeApiResponse, ElementGetSubtypeApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/elements/${queryArg.elementType}/subtype/${queryArg.id}`,
                }),
                providesTags: ["Elements"],
            }),
            elementResolveBySearchTerm: build.query<
                ElementResolveBySearchTermApiResponse,
                ElementResolveBySearchTermApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/elements/${queryArg.elementType}/resolve`,
                    params: { searchTerm: queryArg.searchTerm },
                }),
                providesTags: ["Elements"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type ElementDeleteApiResponse =
    /** status 200 Successfully deleted element */ void | /** status 201 Successfully created jobRun for deleting element and its children */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type ElementDeleteApiArg = {
    /** Id of the element */
    id: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
};
export type ElementGetDeleteInfoApiResponse = /** status 200 Get delete info for an element */ DeleteInfo;
export type ElementGetDeleteInfoApiArg = {
    /** Id of the element */
    id: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
};
export type ElementFolderCreateApiResponse = /** status 200 Successfully created folder */ void;
export type ElementFolderCreateApiArg = {
    /** ParentId of the element */
    parentId: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    folderData: FolderData;
};
export type ElementGetContextPermissionsApiResponse = /** status 200 Context permission list */
    | AssetContextPermissions
    | DataObjectContextPermissions
    | DocumentContextPermissions;
export type ElementGetContextPermissionsApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
};
export type ElementGetTreeLocationApiResponse = /** status 200 Location data of the element */ ElementLocationData;
export type ElementGetTreeLocationApiArg = {
    /** Id of the element */
    id: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Get perspective by matching Id */
    perspectiveId: string;
};
export type ElementGetIdByPathApiResponse = /** status 200 element_get_id_by_path_response_description */ {
    /** ID of the element */
    id: number;
};
export type ElementGetIdByPathApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Filter elements by matching element path. */
    elementPath: string;
};
export type ElementGetSubtypeApiResponse = /** status 200 Subtype of the element */ Subtype;
export type ElementGetSubtypeApiArg = {
    /** Id of the element */
    id: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
};
export type ElementResolveBySearchTermApiResponse = /** status 200 ID of the element with given search term */ {
    /** ID of the element */
    id: number;
};
export type ElementResolveBySearchTermApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Search term to filter elements by. */
    searchTerm: string;
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
export type DeleteInfo = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** hasDependencies */
    hasDependencies: boolean;
    /** canUseRecycleBin */
    canUseRecycleBin: boolean;
};
export type FolderData = {
    /** Folder Name */
    folderName: string;
};
export type SaveAssetContextPermissions = {
    /** Hide Add Menu */
    hideAdd: boolean;
    /** Add Upload */
    addUpload: boolean;
    /** Upload New Version */
    uploadNewVersion: boolean;
    /** Add Upload Zip */
    addUploadZip: boolean;
    /** Download */
    download: boolean;
    /** Download Zip */
    downloadZip: boolean;
    /** Add Folder */
    addFolder: boolean;
    /** Copy */
    copy: boolean;
    /** Cut */
    cut: boolean;
    /** Delete */
    delete: boolean;
    /** Lock */
    lock: boolean;
    /** Lock And Propagate */
    lockAndPropagate: boolean;
    /** Paste */
    paste: boolean;
    /** Paste Cut */
    pasteCut: boolean;
    /** Refresh */
    refresh: boolean;
    /** Rename */
    rename: boolean;
    /** SearchAndMove */
    searchAndMove: boolean;
    /** Unlock */
    unlock: boolean;
    /** Unlock And Propagate */
    unlockAndPropagate: boolean;
};
export type AssetContextPermissions = SaveAssetContextPermissions & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
};
export type SaveDataObjectContextPermissions = {
    /** Add */
    add: boolean;
    /** Add Folder */
    addFolder: boolean;
    /** Change Children SortBy */
    changeChildrenSortBy: boolean;
    /** Copy */
    copy: boolean;
    /** Cut */
    cut: boolean;
    /** Delete */
    delete: boolean;
    /** Lock */
    lock: boolean;
    /** Lock and Propagate */
    lockAndPropagate: boolean;
    /** Paste */
    paste: boolean;
    /** Publish */
    publish: boolean;
    /** Refresh */
    refresh: boolean;
    /** Rename */
    rename: boolean;
    /** Search and Move */
    searchAndMove: boolean;
    /** Unlock */
    unlock: boolean;
    /** Unlock and Propagate */
    unlockAndPropagate: boolean;
    /** Unpublish */
    unpublish: boolean;
};
export type DataObjectContextPermissions = SaveDataObjectContextPermissions & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
};
export type SaveDocumentContextPermissions = {
    /** Add */
    add: boolean;
    /** Add E-Mail */
    addEmail: boolean;
    /** Add Folder */
    addFolder: boolean;
    /** Add Hardlink */
    addHardlink: boolean;
    /** Add Headless Document */
    addHeadlessDocument: boolean;
    /** Add Link */
    addLink: boolean;
    /** Add Newsletter */
    addNewsletter: boolean;
    /** Add Print Page */
    addPrintPage: boolean;
    /** Add Snippet */
    addSnippet: boolean;
    /** Convert */
    convert: boolean;
    /** Copy */
    copy: boolean;
    /** Cut */
    cut: boolean;
    /** Delete */
    delete: boolean;
    /** Edit Site */
    editSite: boolean;
    /** Lock */
    lock: boolean;
    /** Lock and Propagate */
    lockAndPropagate: boolean;
    /** Open */
    open: boolean;
    /** Paste */
    paste: boolean;
    /** Paste Cut */
    pasteCut: boolean;
    /** Publish */
    publish: boolean;
    /** Refresh */
    refresh: boolean;
    /** Remove Site */
    removeSite: boolean;
    /** Rename */
    rename: boolean;
    /** Search and Move */
    searchAndMove: boolean;
    /** Unlock */
    unlock: boolean;
    /** Unlock and Propagate */
    unlockAndPropagate: boolean;
    /** Unpublish */
    unpublish: boolean;
    /** Use As Site */
    useAsSite: boolean;
};
export type DocumentContextPermissions = SaveDocumentContextPermissions & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
};
export type TreeLevelData = {
    /** Parent ID */
    parentId?: number;
    /** Element ID */
    elementId: number;
    /** Page Number */
    pageNumber: number;
};
export type ElementLocationData = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Widget Id */
    widgetId: string;
    /** Tree level data */
    treeLevelData: TreeLevelData[];
};
export type Subtype = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Element Id */
    elementId: number;
    /** Element Type */
    elementType: string;
    /** Element Subtype */
    elementSubtype: string;
};
export const {
    useElementDeleteMutation,
    useElementGetDeleteInfoQuery,
    useElementFolderCreateMutation,
    useElementGetContextPermissionsQuery,
    useElementGetTreeLocationQuery,
    useElementGetIdByPathQuery,
    useElementGetSubtypeQuery,
    useElementResolveBySearchTermQuery,
} = injectedRtkApi;
