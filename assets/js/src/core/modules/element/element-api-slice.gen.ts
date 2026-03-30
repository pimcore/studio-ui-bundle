import { api } from "@sdk/api";
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
                    params: {
                        elementPath: queryArg.elementPath,
                    },
                }),
                providesTags: ["Elements"],
            }),
            elementGetSubtype: build.query<ElementGetSubtypeApiResponse, ElementGetSubtypeApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/elements/${queryArg.elementType}/subtype/${queryArg.id}`,
                }),
                providesTags: ["Elements"],
            }),
            elementGetUsage: build.query<ElementGetUsageApiResponse, ElementGetUsageApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/elements/usage/${queryArg.elementType}/${queryArg.id}`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        sortOrder: queryArg.sortOrder,
                        sortBy: queryArg.sortBy,
                    },
                }),
                providesTags: ["Elements"],
            }),
            elementUsageReplace: build.mutation<ElementUsageReplaceApiResponse, ElementUsageReplaceApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/elements/usage/replace/${queryArg.elementType}/${queryArg.id}`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Elements"],
            }),
            elementResolveBySearchTerm: build.query<
                ElementResolveBySearchTermApiResponse,
                ElementResolveBySearchTermApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/elements/${queryArg.elementType}/resolve`,
                    params: {
                        searchTerm: queryArg.searchTerm,
                    },
                }),
                providesTags: ["Elements"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type ElementDeleteApiResponse =
    /** status 201 Successfully created jobRun for deleting element and its children */ {
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
export type ElementFolderCreateApiResponse = unknown;
export type ElementFolderCreateApiArg = {
    /** ParentId of the element */
    parentId: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    folderData: FolderData;
};
export type ElementGetContextPermissionsApiResponse = /** status 200 Context permission list */ {
    [key: string]: boolean;
};
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
export type ElementGetIdByPathApiResponse = /** status 200 ID of the element */ {
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
export type ElementGetUsageApiResponse = /** status 200 Where the element is referenced */ ElementUsage;
export type ElementGetUsageApiArg = {
    /** Id of the element */
    id: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Sort order (asc or desc). */
    sortOrder?: "ASC" | "DESC";
    /** Sort by field. */
    sortBy?: "id" | "path" | "type";
};
export type ElementUsageReplaceApiResponse = /** status 200 Id of the created job run */ {
    /** ID of created jobRun */
    jobRunId: number;
};
export type ElementUsageReplaceApiArg = {
    /** Id of the element */
    id: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    body: {
        targetType?: "data-object" | "object" | "asset" | "document";
        targetId?: number;
        elements?: ElementUsageBaseItem[];
    };
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
export type ElementUsageBaseItem = {
    /** ID */
    id: number;
    /** type */
    type: "data-object" | "object" | "asset" | "document";
};
export type ElementUsageItem = ElementUsageBaseItem & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number;
    /** type */
    type: string;
    /** path */
    path: string;
};
export type ElementUsage = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Data */
    data: ElementUsageItem[];
    /** hasHidden */
    hasHidden: boolean;
    /** totalCount */
    totalCount?: number;
};
export const {
    useElementDeleteMutation,
    useElementGetDeleteInfoQuery,
    useElementFolderCreateMutation,
    useElementGetContextPermissionsQuery,
    useElementGetTreeLocationQuery,
    useElementGetIdByPathQuery,
    useElementGetSubtypeQuery,
    useElementGetUsageQuery,
    useElementUsageReplaceMutation,
    useElementResolveBySearchTermQuery,
} = injectedRtkApi;
