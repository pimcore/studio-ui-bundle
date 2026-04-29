import { api } from "@sdk/api";
export const addTagTypes = ["Classification Store"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            classificationStoreConfigurationCollectionCollection: build.query<
                ClassificationStoreConfigurationCollectionCollectionApiResponse,
                ClassificationStoreConfigurationCollectionCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/stores/${queryArg.storeId}/collections`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationCollectionCreate: build.mutation<
                ClassificationStoreConfigurationCollectionCreateApiResponse,
                ClassificationStoreConfigurationCollectionCreateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/collections/add`,
                    method: "POST",
                    body: queryArg.classificationStoreConfigurationCollectionCreate,
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationCollectionUpdate: build.mutation<
                ClassificationStoreConfigurationCollectionUpdateApiResponse,
                ClassificationStoreConfigurationCollectionUpdateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/collections/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.classificationStoreConfigurationCollectionUpdate,
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationCollectionDelete: build.mutation<
                ClassificationStoreConfigurationCollectionDeleteApiResponse,
                ClassificationStoreConfigurationCollectionDeleteApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/collections/${queryArg.id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationCollectionRelationCollection: build.query<
                ClassificationStoreConfigurationCollectionRelationCollectionApiResponse,
                ClassificationStoreConfigurationCollectionRelationCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/collections/${queryArg.colId}/relations`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationCollectionRelationCreate: build.mutation<
                ClassificationStoreConfigurationCollectionRelationCreateApiResponse,
                ClassificationStoreConfigurationCollectionRelationCreateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/collection-relations/add`,
                    method: "POST",
                    body: queryArg.classificationStoreConfigurationCollectionRelationCreate,
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationCollectionRelationDelete: build.mutation<
                ClassificationStoreConfigurationCollectionRelationDeleteApiResponse,
                ClassificationStoreConfigurationCollectionRelationDeleteApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/collection-relations`,
                    method: "DELETE",
                    body: queryArg.classificationStoreConfigurationCollectionRelationDelete,
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationGroupCollection: build.query<
                ClassificationStoreConfigurationGroupCollectionApiResponse,
                ClassificationStoreConfigurationGroupCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/stores/${queryArg.storeId}/groups`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationGroupCreate: build.mutation<
                ClassificationStoreConfigurationGroupCreateApiResponse,
                ClassificationStoreConfigurationGroupCreateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/groups/add`,
                    method: "POST",
                    body: queryArg.classificationStoreConfigurationGroupCreate,
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationGroupUpdate: build.mutation<
                ClassificationStoreConfigurationGroupUpdateApiResponse,
                ClassificationStoreConfigurationGroupUpdateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/groups/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.classificationStoreConfigurationGroupUpdate,
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationGroupDelete: build.mutation<
                ClassificationStoreConfigurationGroupDeleteApiResponse,
                ClassificationStoreConfigurationGroupDeleteApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/groups/${queryArg.id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationKeyCollection: build.query<
                ClassificationStoreConfigurationKeyCollectionApiResponse,
                ClassificationStoreConfigurationKeyCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/stores/${queryArg.storeId}/keys`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationKeyCreate: build.mutation<
                ClassificationStoreConfigurationKeyCreateApiResponse,
                ClassificationStoreConfigurationKeyCreateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/keys/add`,
                    method: "POST",
                    body: queryArg.classificationStoreConfigurationKeyCreate,
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationKeyUpdate: build.mutation<
                ClassificationStoreConfigurationKeyUpdateApiResponse,
                ClassificationStoreConfigurationKeyUpdateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/keys/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.classificationStoreConfigurationKeyUpdate,
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationKeyDelete: build.mutation<
                ClassificationStoreConfigurationKeyDeleteApiResponse,
                ClassificationStoreConfigurationKeyDeleteApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/keys/${queryArg.id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationKeyGroupRelationCollection: build.query<
                ClassificationStoreConfigurationKeyGroupRelationCollectionApiResponse,
                ClassificationStoreConfigurationKeyGroupRelationCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/groups/${queryArg.groupId}/key-relations`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationKeyGroupRelationCreate: build.mutation<
                ClassificationStoreConfigurationKeyGroupRelationCreateApiResponse,
                ClassificationStoreConfigurationKeyGroupRelationCreateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/key-group-relations/add`,
                    method: "POST",
                    body: queryArg.classificationStoreConfigurationKeyGroupRelationCreate,
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationKeyGroupRelationDelete: build.mutation<
                ClassificationStoreConfigurationKeyGroupRelationDeleteApiResponse,
                ClassificationStoreConfigurationKeyGroupRelationDeleteApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/key-group-relations`,
                    method: "DELETE",
                    body: queryArg.classificationStoreConfigurationKeyGroupRelationDelete,
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationStoreCreate: build.mutation<
                ClassificationStoreConfigurationStoreCreateApiResponse,
                ClassificationStoreConfigurationStoreCreateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/stores`,
                    method: "POST",
                    body: queryArg.classificationStoreConfigurationStoreCreate,
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationStoreTree: build.query<
                ClassificationStoreConfigurationStoreTreeApiResponse,
                ClassificationStoreConfigurationStoreTreeApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/classification-store/configuration/stores/tree` }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationStoreUpdate: build.mutation<
                ClassificationStoreConfigurationStoreUpdateApiResponse,
                ClassificationStoreConfigurationStoreUpdateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/stores/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.classificationStoreConfigurationStoreUpdate,
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationGetPage: build.query<
                ClassificationStoreConfigurationGetPageApiResponse,
                ClassificationStoreConfigurationGetPageApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/get-page`,
                    params: {
                        table: queryArg.table,
                        id: queryArg.id,
                        storeId: queryArg.storeId,
                        pageSize: queryArg.pageSize,
                        sortKey: queryArg.sortKey,
                        sortDir: queryArg.sortDir,
                    },
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreGetCollections: build.query<
                ClassificationStoreGetCollectionsApiResponse,
                ClassificationStoreGetCollectionsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/collections`,
                    params: {
                        storeId: queryArg.storeId,
                        classId: queryArg.classId,
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        fieldName: queryArg.fieldName,
                        searchTerm: queryArg.searchTerm,
                    },
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreGetGroups: build.query<
                ClassificationStoreGetGroupsApiResponse,
                ClassificationStoreGetGroupsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/groups`,
                    params: {
                        storeId: queryArg.storeId,
                        classId: queryArg.classId,
                        searchTerm: queryArg.searchTerm,
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        fieldName: queryArg.fieldName,
                    },
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreGetKeyGroupRelations: build.query<
                ClassificationStoreGetKeyGroupRelationsApiResponse,
                ClassificationStoreGetKeyGroupRelationsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/key-group-relations`,
                    params: {
                        storeId: queryArg.storeId,
                        classId: queryArg.classId,
                        searchTerm: queryArg.searchTerm,
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        fieldName: queryArg.fieldName,
                    },
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreGetLayoutByCollection: build.query<
                ClassificationStoreGetLayoutByCollectionApiResponse,
                ClassificationStoreGetLayoutByCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/layout-by-collection/${queryArg.collectionId}`,
                    params: {
                        objectId: queryArg.objectId,
                        fieldName: queryArg.fieldName,
                    },
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreGetLayoutByGroup: build.query<
                ClassificationStoreGetLayoutByGroupApiResponse,
                ClassificationStoreGetLayoutByGroupApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/layout-by-group/${queryArg.groupId}`,
                    params: {
                        objectId: queryArg.objectId,
                        fieldName: queryArg.fieldName,
                    },
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreGetLayoutByKey: build.query<
                ClassificationStoreGetLayoutByKeyApiResponse,
                ClassificationStoreGetLayoutByKeyApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/layout-by-key/${queryArg.keyId}/${queryArg.groupId}`,
                    params: {
                        objectId: queryArg.objectId,
                        fieldName: queryArg.fieldName,
                    },
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreGetConfigCollection: build.query<
                ClassificationStoreGetConfigCollectionApiResponse,
                ClassificationStoreGetConfigCollectionApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/classification-store/config/collection` }),
                providesTags: ["Classification Store"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type ClassificationStoreConfigurationCollectionCollectionApiResponse =
    /** status 200 Paginated list of collection configurations */ {
        totalItems: number;
        items: ClassificationStoreConfigurationCollectionDetail[];
    };
export type ClassificationStoreConfigurationCollectionCollectionApiArg = {
    /** ID of the store to list collections for */
    storeId: number;
    body: {
        filters?: {
            page?: number;
            pageSize?: number;
            columnFilters?: object;
            sortFilter?: object;
        };
    };
};
export type ClassificationStoreConfigurationCollectionCreateApiResponse =
    /** status 200 Created collection configuration */ ClassificationStoreConfigurationCollectionDetail;
export type ClassificationStoreConfigurationCollectionCreateApiArg = {
    classificationStoreConfigurationCollectionCreate: ClassificationStoreConfigurationCollectionCreate;
};
export type ClassificationStoreConfigurationCollectionUpdateApiResponse =
    /** status 200 Updated collection configuration */ ClassificationStoreConfigurationCollectionDetail;
export type ClassificationStoreConfigurationCollectionUpdateApiArg = {
    /** Id of the collection configuration */
    id: number;
    classificationStoreConfigurationCollectionUpdate: ClassificationStoreConfigurationCollectionUpdate;
};
export type ClassificationStoreConfigurationCollectionDeleteApiResponse = unknown;
export type ClassificationStoreConfigurationCollectionDeleteApiArg = {
    /** Id of the collection configuration */
    id: number;
};
export type ClassificationStoreConfigurationCollectionRelationCollectionApiResponse =
    /** status 200 Paginated list of collection-group relations */ {
        totalItems: number;
        items: ClassificationStoreConfigurationCollectionRelationDetail[];
    };
export type ClassificationStoreConfigurationCollectionRelationCollectionApiArg = {
    /** ID of the collection to list relations for */
    colId: number;
    body: {
        filters?: {
            page?: number;
            pageSize?: number;
            columnFilters?: object;
            sortFilter?: object;
        };
    };
};
export type ClassificationStoreConfigurationCollectionRelationCreateApiResponse =
    /** status 200 Created or updated collection-group relation */ ClassificationStoreConfigurationCollectionRelationDetail;
export type ClassificationStoreConfigurationCollectionRelationCreateApiArg = {
    classificationStoreConfigurationCollectionRelationCreate: ClassificationStoreConfigurationCollectionRelationCreate;
};
export type ClassificationStoreConfigurationCollectionRelationDeleteApiResponse = unknown;
export type ClassificationStoreConfigurationCollectionRelationDeleteApiArg = {
    classificationStoreConfigurationCollectionRelationDelete: ClassificationStoreConfigurationCollectionRelationDelete;
};
export type ClassificationStoreConfigurationGroupCollectionApiResponse =
    /** status 200 Paginated list of group configurations */ {
        totalItems: number;
        items: ClassificationStoreConfigurationGroupDetail[];
    };
export type ClassificationStoreConfigurationGroupCollectionApiArg = {
    /** ID of the store to list groups for */
    storeId: number;
    body: {
        filters?: {
            page?: number;
            pageSize?: number;
            columnFilters?: object;
            sortFilter?: object;
        };
    };
};
export type ClassificationStoreConfigurationGroupCreateApiResponse =
    /** status 200 Created group configuration */ ClassificationStoreConfigurationGroupDetail;
export type ClassificationStoreConfigurationGroupCreateApiArg = {
    classificationStoreConfigurationGroupCreate: ClassificationStoreConfigurationGroupCreate;
};
export type ClassificationStoreConfigurationGroupUpdateApiResponse =
    /** status 200 Updated group configuration */ ClassificationStoreConfigurationGroupDetail;
export type ClassificationStoreConfigurationGroupUpdateApiArg = {
    /** Id of the group configuration */
    id: number;
    classificationStoreConfigurationGroupUpdate: ClassificationStoreConfigurationGroupUpdate;
};
export type ClassificationStoreConfigurationGroupDeleteApiResponse = unknown;
export type ClassificationStoreConfigurationGroupDeleteApiArg = {
    /** Id of the group configuration */
    id: number;
};
export type ClassificationStoreConfigurationKeyCollectionApiResponse =
    /** status 200 Paginated list of key configurations */ {
        totalItems: number;
        items: ClassificationStoreConfigurationKeyDetail[];
    };
export type ClassificationStoreConfigurationKeyCollectionApiArg = {
    /** ID of the store to list keys for */
    storeId: number;
    body: {
        filters?: {
            page?: number;
            pageSize?: number;
            columnFilters?: object;
            sortFilter?: object;
        };
    };
};
export type ClassificationStoreConfigurationKeyCreateApiResponse =
    /** status 200 Created key configuration */ ClassificationStoreConfigurationKeyDetail;
export type ClassificationStoreConfigurationKeyCreateApiArg = {
    classificationStoreConfigurationKeyCreate: ClassificationStoreConfigurationKeyCreate;
};
export type ClassificationStoreConfigurationKeyUpdateApiResponse =
    /** status 200 Updated key configuration */ ClassificationStoreConfigurationKeyDetail;
export type ClassificationStoreConfigurationKeyUpdateApiArg = {
    /** Id of the key configuration */
    id: number;
    classificationStoreConfigurationKeyUpdate: ClassificationStoreConfigurationKeyUpdate;
};
export type ClassificationStoreConfigurationKeyDeleteApiResponse = unknown;
export type ClassificationStoreConfigurationKeyDeleteApiArg = {
    /** Id of the key configuration */
    id: number;
};
export type ClassificationStoreConfigurationKeyGroupRelationCollectionApiResponse =
    /** status 200 Paginated list of key-group relations */ {
        totalItems: number;
        items: ClassificationStoreConfigurationKeyGroupRelationDetail[];
    };
export type ClassificationStoreConfigurationKeyGroupRelationCollectionApiArg = {
    /** ID of the group to list key relations for */
    groupId: number;
    body: {
        filters?: {
            page?: number;
            pageSize?: number;
            columnFilters?: object;
            sortFilter?: object;
        };
    };
};
export type ClassificationStoreConfigurationKeyGroupRelationCreateApiResponse =
    /** status 200 Created or updated key-group relation */ ClassificationStoreConfigurationKeyGroupRelationDetail;
export type ClassificationStoreConfigurationKeyGroupRelationCreateApiArg = {
    classificationStoreConfigurationKeyGroupRelationCreate: ClassificationStoreConfigurationKeyGroupRelationCreate;
};
export type ClassificationStoreConfigurationKeyGroupRelationDeleteApiResponse = unknown;
export type ClassificationStoreConfigurationKeyGroupRelationDeleteApiArg = {
    classificationStoreConfigurationKeyGroupRelationDelete: ClassificationStoreConfigurationKeyGroupRelationDelete;
};
export type ClassificationStoreConfigurationStoreCreateApiResponse =
    /** status 200 Created store configuration */ ClassificationStoreConfigurationStoreDetail;
export type ClassificationStoreConfigurationStoreCreateApiArg = {
    classificationStoreConfigurationStoreCreate: ClassificationStoreConfigurationStoreCreate;
};
export type ClassificationStoreConfigurationStoreTreeApiResponse =
    /** status 200 List of store tree nodes */ ClassificationStoreConfigurationStoreTreeNode[];
export type ClassificationStoreConfigurationStoreTreeApiArg = void;
export type ClassificationStoreConfigurationStoreUpdateApiResponse =
    /** status 200 Updated store configuration */ ClassificationStoreConfigurationStoreDetail;
export type ClassificationStoreConfigurationStoreUpdateApiArg = {
    /** Id of the store configuration */
    id: number;
    classificationStoreConfigurationStoreUpdate: ClassificationStoreConfigurationStoreUpdate;
};
export type ClassificationStoreConfigurationGetPageApiResponse =
    /** status 200 Page number where the item is located */ ClassificationStoreConfigurationGetPageResponse;
export type ClassificationStoreConfigurationGetPageApiArg = {
    /** Table to search in (keys or groups) */
    table: string;
    /** ID of the item to find */
    id: number;
    /** ID of the store */
    storeId: number;
    /** Number of items per page */
    pageSize: number;
    /** Column to sort by */
    sortKey?: string;
    /** Sort direction (ASC or DESC) */
    sortDir?: string;
};
export type ClassificationStoreGetCollectionsApiResponse = /** status 200 List of classification store collections */ {
    totalItems: number;
    items: ClassificationStoreCollection[];
};
export type ClassificationStoreGetCollectionsApiArg = {
    /** Classification Store ID */
    storeId: number;
    /** Class ID */
    classId?: string;
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Field Name */
    fieldName: string;
    /** Search Term */
    searchTerm?: string;
};
export type ClassificationStoreGetGroupsApiResponse = /** status 200 List of classification store groups */ {
    totalItems: number;
    items: ClassificationStoreGroup[];
};
export type ClassificationStoreGetGroupsApiArg = {
    /** Classification Store ID */
    storeId: number;
    /** Class ID */
    classId?: string;
    /** Search Term */
    searchTerm?: string;
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Field Name */
    fieldName: string;
};
export type ClassificationStoreGetKeyGroupRelationsApiResponse =
    /** status 200 List of classification store key group relations */ {
        totalItems: number;
        items: ClassificationStoreKeyGroupRelation[];
    };
export type ClassificationStoreGetKeyGroupRelationsApiArg = {
    /** Classification Store ID */
    storeId: number;
    /** Class ID */
    classId?: string;
    /** Search Term */
    searchTerm?: string;
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Field Name */
    fieldName: string;
};
export type ClassificationStoreGetLayoutByCollectionApiResponse =
    /** status 200 Layout definition */ ClassificationStoreGroupLayout;
export type ClassificationStoreGetLayoutByCollectionApiArg = {
    /** object ID */
    objectId: number;
    /** CollectionId of the Collection ID */
    collectionId: number;
    /** Field Name */
    fieldName: string;
};
export type ClassificationStoreGetLayoutByGroupApiResponse =
    /** status 200 Layout definition */ ClassificationStoreGroupLayout2;
export type ClassificationStoreGetLayoutByGroupApiArg = {
    /** object ID */
    objectId: number;
    /** GroupId of the Group ID */
    groupId: number;
    /** Field Name */
    fieldName: string;
};
export type ClassificationStoreGetLayoutByKeyApiResponse =
    /** status 200 Layout definition */ ClassificationStoreCollection2;
export type ClassificationStoreGetLayoutByKeyApiArg = {
    /** object ID */
    objectId?: number;
    /** KeyId of the Key ID */
    keyId: number;
    /** GroupId of the Group ID */
    groupId: number;
    /** Field Name */
    fieldName: string;
};
export type ClassificationStoreGetConfigCollectionApiResponse =
    /** status 200 List of classification store configurations */ {
        totalItems: number;
        items: ClassificationStoreConfiguration[];
    };
export type ClassificationStoreGetConfigCollectionApiArg = void;
export type ClassificationStoreConfigurationCollectionDetail = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of the collection */
    id: number;
    /** Name of the collection */
    name: string;
    /** ID of the store this collection belongs to */
    storeId: number;
    /** Description of the collection */
    description: string | null;
    /** Creation date as Unix timestamp */
    creationDate: number | null;
    /** Modification date as Unix timestamp */
    modificationDate: number | null;
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
export type ClassificationStoreConfigurationCollectionCreate = {
    /** Name of the collection */
    name: string;
    /** ID of the store this collection belongs to */
    storeId: number;
};
export type ClassificationStoreConfigurationCollectionUpdate = {
    /** Name of the collection */
    name: string;
    /** Description of the collection */
    description: string | null;
};
export type ClassificationStoreConfigurationCollectionRelationDetail = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of the relation */
    id: string;
    /** ID of the collection */
    colId: number;
    /** ID of the group */
    groupId: number;
    /** Sort order of the relation */
    sorter: number;
    /** Name of the group */
    groupName: string | null;
    /** Description of the group */
    groupDescription: string | null;
};
export type ClassificationStoreConfigurationCollectionRelationCreate = {
    /** ID of the collection */
    colId: number;
    /** ID of the group */
    groupId: number;
    /** Sort order of the relation */
    sorter: number;
};
export type ClassificationStoreConfigurationCollectionRelationDelete = {
    /** ID of the collection */
    colId: number;
    /** ID of the group */
    groupId: number;
};
export type ClassificationStoreConfigurationGroupDetail = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of the group */
    id: number;
    /** Name of the group */
    name: string;
    /** ID of the store this group belongs to */
    storeId: number;
    /** Description of the group */
    description: string | null;
    /** Creation date as Unix timestamp */
    creationDate: number | null;
    /** Modification date as Unix timestamp */
    modificationDate: number | null;
};
export type ClassificationStoreConfigurationGroupCreate = {
    /** Name of the group */
    name: string;
    /** ID of the store this group belongs to */
    storeId: number;
};
export type ClassificationStoreConfigurationGroupUpdate = {
    /** Name of the group */
    name: string;
    /** Description of the group */
    description: string | null;
};
export type ClassificationStoreConfigurationKeyDetail = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of the key */
    id: number;
    /** Name of the key */
    name: string;
    /** ID of the store this key belongs to */
    storeId: number;
    /** Data type of the key */
    type: string;
    /** Whether the key is enabled */
    enabled: boolean;
    /** Description of the key */
    description: string | null;
    /** Definition of the key */
    definition: object | null;
    /** Creation date as Unix timestamp */
    creationDate: number | null;
    /** Modification date as Unix timestamp */
    modificationDate: number | null;
};
export type ClassificationStoreConfigurationKeyCreate = {
    /** Name of the key */
    name: string;
    /** ID of the store this key belongs to */
    storeId: number;
};
export type ClassificationStoreConfigurationKeyUpdate = {
    /** Name of the key */
    name: string;
    /** Title of the key */
    title: string | null;
    /** Description of the key */
    description: string | null;
    /** Data type of the key (e.g. input, textarea, select) */
    type: string | null;
    /** Values for object brick definition metadata */
    definition: object | null;
};
export type ClassificationStoreConfigurationKeyGroupRelationDetail = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of the key */
    keyId: number;
    /** ID of the group */
    groupId: number;
    /** Sort order of the relation */
    sorter: number;
    /** Whether the key is mandatory in this group */
    mandatory: boolean;
    /** Name of the key */
    keyName: string | null;
    /** Description of the key */
    keyDescription: string | null;
    /** Name of the group */
    groupName: string | null;
};
export type ClassificationStoreConfigurationKeyGroupRelationCreate = {
    /** ID of the key */
    keyId: number;
    /** ID of the group */
    groupId: number;
    /** Sort order of the relation */
    sorter: number;
    /** Whether the key is mandatory in this group */
    mandatory: boolean;
};
export type ClassificationStoreConfigurationKeyGroupRelationDelete = {
    /** ID of the key */
    keyId: number;
    /** ID of the group */
    groupId: number;
};
export type ClassificationStoreConfigurationStoreDetail = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of the store */
    id: number;
    /** Name of the store */
    name: string;
    /** Description of the store */
    description: string | null;
};
export type ClassificationStoreConfigurationStoreCreate = {
    /** Name of the store */
    name: string;
};
export type ClassificationStoreConfigurationStoreTreeNode = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of the store */
    id: number;
    /** Name of the store */
    name: string;
    /** Description of the store */
    description: string | null;
};
export type ClassificationStoreConfigurationStoreUpdate = {
    /** Name of the store */
    name: string;
    /** Description of the store */
    description: string | null;
};
export type ClassificationStoreConfigurationGetPageResponse = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Page number where the item is located */
    page: number;
};
export type ClassificationStoreCollection = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number;
    /** Name */
    name: string;
    /** Description */
    description: string;
    /** List of Group IDs in collection */
    groups: object;
};
export type ClassificationStoreGroup = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number;
    /** Name */
    name: string;
    /** Description */
    description: string | null;
};
export type ClassificationStoreKeyGroupRelation = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key ID */
    keyId: number;
    /** Group ID */
    groupId: number;
    /** Key Name */
    keyName: string;
    /** Group Name */
    groupName: string;
    /** Key Description */
    keyDescription: string | null;
    /** Key Description */
    groupDescription: string | null;
};
export type ClassificationStoreCollection2 = {
    /** ID */
    id: number;
    /** Name */
    name: string;
    /** Description */
    description: string;
    /** Layout Definition */
    definition: object;
};
export type ClassificationStoreGroupLayout2 = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number;
    /** Name */
    name: string;
    /** Description */
    description: string | null;
    /** Description */
    keys: ClassificationStoreCollection2[];
};
export type ClassificationStoreGroupLayout = {
    /** Groups */
    groups: ClassificationStoreGroupLayout2[];
};
export type ClassificationStoreConfiguration = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number;
    /** Name */
    name: string;
};
export const {
    useClassificationStoreConfigurationCollectionCollectionQuery,
    useClassificationStoreConfigurationCollectionCreateMutation,
    useClassificationStoreConfigurationCollectionUpdateMutation,
    useClassificationStoreConfigurationCollectionDeleteMutation,
    useClassificationStoreConfigurationCollectionRelationCollectionQuery,
    useClassificationStoreConfigurationCollectionRelationCreateMutation,
    useClassificationStoreConfigurationCollectionRelationDeleteMutation,
    useClassificationStoreConfigurationGroupCollectionQuery,
    useClassificationStoreConfigurationGroupCreateMutation,
    useClassificationStoreConfigurationGroupUpdateMutation,
    useClassificationStoreConfigurationGroupDeleteMutation,
    useClassificationStoreConfigurationKeyCollectionQuery,
    useClassificationStoreConfigurationKeyCreateMutation,
    useClassificationStoreConfigurationKeyUpdateMutation,
    useClassificationStoreConfigurationKeyDeleteMutation,
    useClassificationStoreConfigurationKeyGroupRelationCollectionQuery,
    useClassificationStoreConfigurationKeyGroupRelationCreateMutation,
    useClassificationStoreConfigurationKeyGroupRelationDeleteMutation,
    useClassificationStoreConfigurationStoreCreateMutation,
    useClassificationStoreConfigurationStoreTreeQuery,
    useClassificationStoreConfigurationStoreUpdateMutation,
    useClassificationStoreConfigurationGetPageQuery,
    useClassificationStoreGetCollectionsQuery,
    useClassificationStoreGetGroupsQuery,
    useClassificationStoreGetKeyGroupRelationsQuery,
    useClassificationStoreGetLayoutByCollectionQuery,
    useClassificationStoreGetLayoutByGroupQuery,
    useClassificationStoreGetLayoutByKeyQuery,
    useClassificationStoreGetConfigCollectionQuery,
} = injectedRtkApi;
