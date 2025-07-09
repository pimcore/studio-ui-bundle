import { api } from "@sdk/api";
export const addTagTypes = ["Search"] as const;
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
                    url: `/pimcore-studio/api/search/configuration/data-objects`,
                    params: {
                        classId: queryArg.classId,
                    },
                }),
                providesTags: ["Search"],
            }),
            dataObjectGetSearch: build.query<DataObjectGetSearchApiResponse, DataObjectGetSearchApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/search/data-objects`,
                    method: "POST",
                    body: queryArg.body,
                    params: {
                        classId: queryArg.classId,
                    },
                }),
                providesTags: ["Search"],
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
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        searchTerm: queryArg.searchTerm,
                    },
                }),
                providesTags: ["Search"],
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
export type Column = {
    /** Key of the Column */
    key: string;
    /** Locale of the Column */
    locale: string | null;
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
    description?: string | null;
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
    modificationDate?: number | null;
    /** Creation Date */
    creationDate?: number | null;
    /** ID of the owner */
    ownerId?: number | null;
    /** ID of the configuration */
    id?: number | null;
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
    locale?: string | null;
    /** Value */
    value?: any | null;
    /** inheritance */
    inheritance?: object | null;
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
export type StaticTextConfig = {
    /** Static Text */
    text: string;
};
export type Transformer = {
    /** Key of the Transformer */
    key: string;
    /** Configuration for the transformer */
    config?: object;
};
export type AdvancedColumnConfig = {
    /** advancedColumns */
    advancedColumns: (RelationFieldConfig | SimpleFieldConfig | StaticTextConfig)[];
    /** List if Transformers that should be applied */
    transformers?: Transformer[];
};
export type GridColumnRequest = {
    /** Key */
    key?: string;
    /** Locale */
    locale?: string | null;
    /** Type */
    type: string;
    /** Group */
    group?: string | null;
    /** Config */
    config?: (string | AdvancedColumnConfig)[];
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
    userOwner: number | null;
    /** Name of owner */
    userOwnerName: string | null;
    /** Id of the user that modified the element */
    userModification: number | null;
    /** Name of the user that modified the element */
    userModificationName: number | null;
    /** Creation date */
    creationDate: number | null;
    /** Modification date */
    modificationDate: number | null;
};
export type SimpleSearchAssetDetail = SimpleSearchDetail & {
    /** Mimetype */
    mimeType: string | null;
    /** Thumbnail path */
    thumbnail: string | null;
};
export type SimpleSearchDataObjectDetail = SimpleSearchDetail & {
    /** Class name and Id */
    class: string | null;
    /** Detail object data */
    objectData: object;
};
export type SimpleSearchPageDetail = {
    /** Title */
    title: string | null;
    /** Description */
    description: string | null;
    /** Navigation name */
    name: string | null;
    /** Has Preview image */
    hasPreviewImage: boolean;
};
export type SimpleSearchDocumentDetail = SimpleSearchDetail & {
    /** Document Language */
    language: string | null;
    /** Page document data */
    documentData: SimpleSearchPageDetail | null;
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
    tooltip: string | null;
    /** AdditionalIcons */
    additionalIcons: string[];
    /** Custom Key/Filename */
    key: string | null;
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
export const {
    useAssetGetSearchConfigurationQuery,
    useAssetGetSearchQuery,
    useDataObjectGetSearchConfigurationQuery,
    useDataObjectGetSearchQuery,
    useSimpleSearchPreviewGetQuery,
    useSimpleSearchGetQuery,
} = injectedRtkApi;
