import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Search", "User Management"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            assetGetSearchConfiguration: build.query<
                AssetGetSearchConfigurationApiResponse,
                AssetGetSearchConfigurationApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/search/configuration/assets` }),
                providesTags: ["Search"],
            }),
            assetGetSearch: build.query<AssetGetSearchApiResponse, AssetGetSearchApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/search/assets`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Search"],
            }),
            dataObjectGetSearchConfiguration: build.query<
                DataObjectGetSearchConfigurationApiResponse,
                DataObjectGetSearchConfigurationApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/search/configuration/data-objects/${queryArg.classId}`,
                }),
                providesTags: ["Search"],
            }),
            dataObjectGetSearch: build.mutation<DataObjectGetSearchApiResponse, DataObjectGetSearchApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/search/data-objects/${queryArg.classId}`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Search"],
            }),
            simpleSearchPreviewGet: build.query<SimpleSearchPreviewGetApiResponse, SimpleSearchPreviewGetApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/search/preview/${queryArg.elementType}/${queryArg.id}`,
                }),
                providesTags: ["Search"],
            }),
            simpleSearchGet: build.query<SimpleSearchGetApiResponse, SimpleSearchGetApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/search`,
                    params: { page: queryArg.page, pageSize: queryArg.pageSize, searchTerm: queryArg.searchTerm },
                }),
                providesTags: ["Search"],
            }),
            pimcoreStudioApiUserSearch: build.query<
                PimcoreStudioApiUserSearchApiResponse,
                PimcoreStudioApiUserSearchApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/user/search`,
                    params: { searchQuery: queryArg.searchQuery },
                }),
                providesTags: ["User Management"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type AssetGetSearchConfigurationApiResponse =
    /** status 200 Asset search configuration */ GridDetailedConfiguration;
export type AssetGetSearchConfigurationApiArg = void;
export type AssetGetSearchApiResponse = /** status 200 Assets for search grid */ {
    totalItems: number;
    items: {
        id?: number;
        columns?: GridColumnData[];
        isLocked?: boolean;
        permissions?: Permissions;
    }[];
};
export type AssetGetSearchApiArg = {
    body: {
        columns: GridColumnRequest[];
        filters?: GridFilter;
    };
};
export type DataObjectGetSearchConfigurationApiResponse =
    /** status 200 Data object search configuration */ GridDetailedConfiguration;
export type DataObjectGetSearchConfigurationApiArg = {
    /** Class Id of the data object */
    classId?: string;
};
export type DataObjectGetSearchApiResponse = /** status 200 Data object search results */ {
    totalItems: number;
    items: {
        id?: number;
        columns?: GridColumnData[];
        isLocked?: boolean;
        permissions?: Permissions;
    }[];
};
export type DataObjectGetSearchApiArg = {
    /** Class Id of the data object */
    classId?: string;
    body: {
        columns: GridColumnRequest[];
        filters?: GridFilter;
    };
};
export type SimpleSearchPreviewGetApiResponse = /** status 200 Simple search results preview for elements */
    | SimpleSearchAssetDetail
    | SimpleSearchDataObjectDetail
    | SimpleSearchDocumentDetail;
export type SimpleSearchPreviewGetApiArg = {
    /** Id of the element */
    id: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
};
export type SimpleSearchGetApiResponse = /** status 200 Search results for elements */ {
    totalItems: number;
    items: SimpleSearchResult[];
};
export type SimpleSearchGetApiArg = {
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Search term */
    searchTerm?: string;
};
export type PimcoreStudioApiUserSearchApiResponse = /** status 200 user_search_summary_response */ {
    totalItems: number;
    items: SimpleUser[];
};
export type PimcoreStudioApiUserSearchApiArg = {
    /** Query to search for an user. This can be a part of username, firstname, lastname, email or id. */
    searchQuery?: string;
};
export type Column = {
    /** Key of the Column */
    key: string;
    /** Locale of the Column */
    locale: any;
    /** Group of the Column */
    group: string;
};
export type GridFilter = {
    /** Page */
    page: number;
    /** Page Size */
    pageSize: number;
    /** Include Descendant Items */
    includeDescendants: boolean;
    /** Column Filter */
    columnFilters?: object;
    /** Sort Filter */
    sortFilter?: object;
};
export type GridDetailedConfiguration = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Name */
    name: string;
    /** Description */
    description: string;
    /** shareGlobal */
    shareGlobal: boolean;
    /** saveFilter */
    saveFilter: boolean;
    /** setAsFavorite */
    setAsFavorite: boolean;
    /** sharedUsers */
    sharedUsers: object;
    /** sharedRoles */
    sharedRoles: object;
    /** columns */
    columns: Column[];
    /** filter */
    filter: GridFilter[];
    /** Page Size */
    pageSize: number;
    /** Modification Date */
    modificationDate?: any;
    /** Creation Date */
    creationDate?: any;
    /** ID of the owner */
    ownerId?: any;
    /** ID of the configuration */
    id?: any;
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
export type GridColumnData = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key */
    key?: string;
    /** Locale */
    locale?: any;
    /** Value */
    value?: any;
    /** inheritance */
    inheritance?: any;
};
export type Permissions = {
    /** List */
    list?: boolean;
    /** View */
    view?: boolean;
    /** Publish */
    publish?: boolean;
    /** Delete */
    delete?: boolean;
    /** Rename */
    rename?: boolean;
    /** Create */
    create?: boolean;
    /** Settings */
    settings?: boolean;
    /** Versions */
    versions?: boolean;
    /** Properties */
    properties?: boolean;
};
export type RelationFieldConfig = {
    /** Relation Getter */
    relation: string;
    /** Field getter */
    field: string;
};
export type SimpleFieldConfig = {
    /** Field getter */
    field: string;
};
export type AdvancedColumnConfig = {
    /** advancedColumns */
    advancedColumn?: (RelationFieldConfig | SimpleFieldConfig)[];
};
export type GridColumnRequest = {
    /** Key */
    key: string;
    /** Locale */
    locale?: any;
    /** Type */
    type: string;
    /** Group */
    group?: any;
    /** Config */
    config: (string | AdvancedColumnConfig)[];
};
export type SimpleSearchDetail = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Id */
    id: number;
    /** elementType */
    elementType: string;
    /** Type */
    type: string;
    /** Id of owner */
    userOwner: any;
    /** Name of owner */
    userOwnerName: any;
    /** Id of the user that modified the element */
    userModification: any;
    /** Name of the user that modified the element */
    userModificationName: any;
    /** Creation date */
    creationDate: any;
    /** Modification date */
    modificationDate: any;
};
export type SimpleSearchAssetDetail = SimpleSearchDetail & {
    /** Mimetype */
    mimeType?: any;
    /** Thumbnail path */
    thumbnail?: any;
};
export type SimpleSearchDataObjectDetail = SimpleSearchDetail & {
    /** Class name and Id */
    class?: any;
    /** Detail object data */
    objectData?: object;
};
export type SimpleSearchPageDetail = {
    /** Title */
    title: any;
    /** Description */
    description: any;
    /** Navigation name */
    name: any;
    /** Has Preview image */
    hasPreviewImage?: boolean;
};
export type SimpleSearchDocumentDetail = SimpleSearchDetail & {
    /** Document Language */
    language?: any;
    /** Page document data */
    documentData?: SimpleSearchPageDetail | null;
};
export type ElementIcon = {
    /** Icon type */
    type: "name" | "path";
    /** Icon value */
    value: string;
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
export type SimpleSearchResult = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Custom attributes for the tree */
    customAttributes?: CustomAttributes;
    /** id */
    id: number;
    /** elementType */
    elementType: string;
    /** type */
    type: string;
    /** path */
    path: string;
    /** icon */
    icon: ElementIcon;
};
export type SimpleUser = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of the User */
    id: number;
    /** Name of the User */
    username?: string;
};
export const {
    useAssetGetSearchConfigurationQuery,
    useAssetGetSearchQuery,
    useDataObjectGetSearchConfigurationQuery,
    useDataObjectGetSearchMutation,
    useSimpleSearchPreviewGetQuery,
    useSimpleSearchGetQuery,
    usePimcoreStudioApiUserSearchQuery,
} = injectedRtkApi;
