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
            classificationStoreConfigurationKeyRestore: build.mutation<
                ClassificationStoreConfigurationKeyRestoreApiResponse,
                ClassificationStoreConfigurationKeyRestoreApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/keys/${queryArg.id}/restore`,
                    method: "POST",
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
            classificationStoreConfigurationStoreExport: build.query<
                ClassificationStoreConfigurationStoreExportApiResponse,
                ClassificationStoreConfigurationStoreExportApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/stores/${queryArg.id}/export`,
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationStoreImport: build.mutation<
                ClassificationStoreConfigurationStoreImportApiResponse,
                ClassificationStoreConfigurationStoreImportApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/stores/${queryArg.id}/import`,
                    method: "POST",
                    body: queryArg.body,
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
            classificationStoreConfigurationSubGroupCollection: build.query<
                ClassificationStoreConfigurationSubGroupCollectionApiResponse,
                ClassificationStoreConfigurationSubGroupCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/stores/${queryArg.storeId}/sub-groups`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationSubGroupCreate: build.mutation<
                ClassificationStoreConfigurationSubGroupCreateApiResponse,
                ClassificationStoreConfigurationSubGroupCreateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/sub-groups/add`,
                    method: "POST",
                    body: queryArg.classificationStoreConfigurationSubGroupCreate,
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationSubGroupUpdate: build.mutation<
                ClassificationStoreConfigurationSubGroupUpdateApiResponse,
                ClassificationStoreConfigurationSubGroupUpdateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/sub-groups/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.classificationStoreConfigurationSubGroupUpdate,
                }),
                invalidatesTags: ["Classification Store"],
            }),
            classificationStoreConfigurationSubGroupDelete: build.mutation<
                ClassificationStoreConfigurationSubGroupDeleteApiResponse,
                ClassificationStoreConfigurationSubGroupDeleteApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/configuration/sub-groups/${queryArg.id}`,
                    method: "DELETE",
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
                        disabledOnly: queryArg.disabledOnly,
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
            additionalSortFilters?: object;
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
            additionalSortFilters?: object;
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
            additionalSortFilters?: object;
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
            additionalSortFilters?: object;
        };
        /** Return the disabled keys instead of the enabled ones */
        disabledOnly?: boolean;
        /** Leave out the keys already assigned to this group, from the list and from the total count.
        Omit it to leave the enabled or disabled selection untouched.
         */
        excludeKeysOfGroupId?: number | null;
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
export type ClassificationStoreConfigurationKeyRestoreApiResponse =
    /** status 200 The re-enabled key configuration */ ClassificationStoreConfigurationKeyDetail;
export type ClassificationStoreConfigurationKeyRestoreApiArg = {
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
            additionalSortFilters?: object;
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
export type ClassificationStoreConfigurationStoreExportApiResponse =
    /** status 200 The store configuration as a JSON download */ Blob;
export type ClassificationStoreConfigurationStoreExportApiArg = {
    /** Id of the store configuration */
    id: number;
};
export type ClassificationStoreConfigurationStoreImportApiResponse =
    /** status 200 Report of what the import created, updated, adopted, skipped, removed and left in place */ ClassificationStoreConfigurationImportReport;
export type ClassificationStoreConfigurationStoreImportApiArg = {
    /** Id of the store configuration */
    id: number;
    body: {
        /** Store configuration artifact as written by the export endpoint */
        file: Blob;
        /** Report what would be decided - what a replace would remove included - and write nothing */
        dryRun?: boolean;
    };
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
export type ClassificationStoreConfigurationSubGroupCollectionApiResponse =
    /** status 200 Paginated list of sub group configurations */ {
        totalItems: number;
        items: ClassificationStoreConfigurationSubGroupDetail[];
    };
export type ClassificationStoreConfigurationSubGroupCollectionApiArg = {
    /** ID of the store to list sub groups for */
    storeId: number;
    body: {
        filters?: {
            page?: number;
            pageSize?: number;
            columnFilters?: object;
            sortFilter?: object;
            additionalSortFilters?: object;
        };
    };
};
export type ClassificationStoreConfigurationSubGroupCreateApiResponse =
    /** status 200 Created sub group configuration */ ClassificationStoreConfigurationSubGroupDetail;
export type ClassificationStoreConfigurationSubGroupCreateApiArg = {
    classificationStoreConfigurationSubGroupCreate: ClassificationStoreConfigurationSubGroupCreate;
};
export type ClassificationStoreConfigurationSubGroupUpdateApiResponse =
    /** status 200 Updated sub group configuration */ ClassificationStoreConfigurationSubGroupDetail;
export type ClassificationStoreConfigurationSubGroupUpdateApiArg = {
    /** Id of the sub group configuration */
    id: number;
    classificationStoreConfigurationSubGroupUpdate: ClassificationStoreConfigurationSubGroupUpdate;
};
export type ClassificationStoreConfigurationSubGroupDeleteApiResponse = unknown;
export type ClassificationStoreConfigurationSubGroupDeleteApiArg = {
    /** Id of the sub group configuration */
    id: number;
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
    /** Locate a key in the list of disabled keys instead of the enabled ones (keys only) */
    disabledOnly?: boolean;
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
    objectId?: number;
    /** CollectionId of the Collection ID */
    collectionId: number;
    /** Field Name */
    fieldName: string;
};
export type ClassificationStoreGetLayoutByGroupApiResponse =
    /** status 200 Layout definition */ ClassificationStoreGroupLayout2;
export type ClassificationStoreGetLayoutByGroupApiArg = {
    /** object ID */
    objectId?: number;
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
    /** Opaque identifier of the collection, assigned by the system and never writable */
    identifier?: string | null;
    /** Free-form pairs the collection carries, as stored; null where it holds none */
    customMetadata?: object | null;
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
    /** Free-form pairs; omit to keep them, an object replaces them whole, null clears them */
    customMetadata?: object | null;
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
    /** Opaque identifier of the group, assigned by the system and never writable */
    identifier?: string | null;
    /** Free-form pairs the group carries, as stored; null where it holds none */
    customMetadata?: object | null;
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
    /** Free-form pairs; omit to keep them, an object replaces them whole, null clears them */
    customMetadata?: object | null;
};
export type SelectOption = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key */
    key: string;
    /** Value */
    value: string;
};
export type ClassificationStoreConfigurationKeyUnits = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of the unit the key preselects, as stored, or null where it names none */
    defaultUnit: string | null;
    /** IDs of the units the key permits, or null where it restricts nothing and every unit is permitted */
    validUnits: string[] | null;
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
    /** Stored key definition; "indexed" is its search index flag, "variants" applies to "multiValue" keys */
    definition: object | null;
    /** Creation date as Unix timestamp */
    creationDate: number | null;
    /** Modification date as Unix timestamp */
    modificationDate: number | null;
    /** Title of the key */
    title?: string | null;
    /** Opaque identifier of the key, assigned by the system and never writable */
    identifier?: string | null;
    /** Per-language flag as the key stores it; null defers to the class definition field */
    localized?: boolean | null;
    /** Free-form pairs the key carries, as stored; null where it holds none */
    customMetadata?: object | null;
    /** Resolved options of a select or multiselect key for this request; null otherwise */
    options?: SelectOption[] | null;
    /** Why options is null for a select key: providerNotStatic or resolutionFailed; null if nothing failed */
    optionsUnavailableReason?: string | null;
    /** Unit vocabulary of the key's own definition; null where its type holds no units */
    units?: ClassificationStoreConfigurationKeyUnits | null;
};
export type ClassificationStoreConfigurationKeyCreate = {
    /** Name of the key */
    name: string;
    /** ID of the store this key belongs to */
    storeId: number;
    /** Title of the key */
    title?: string | null;
};
export type ClassificationStoreConfigurationKeyUpdate = {
    /** Name of the key */
    name: string;
    /** Title of the key */
    title?: string | null;
    /** Description of the key */
    description?: string | null;
    /** Data type of the key (e.g. input, textarea, select) */
    type: string | null;
    /** Replaces the stored definition; "indexed" flags search indexing, "variants" is for "multiValue" keys */
    definition: object | null;
    /** Per-language flag; omit to keep the stored value, null defers to the class definition field */
    localized?: boolean | null;
    /** Free-form pairs; omit to keep them, an object replaces them whole, null clears them */
    customMetadata?: object | null;
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
    /** Identifier of the sub group this assignment carries */
    subGroup?: string | null;
    /** Partial field definition overriding the one of the key for this assignment */
    definitionOverride?: object | null;
    /** Free-form metadata carried by this assignment, reported as it is stored. No member is reserved. */
    metadata?: object | null;
    /** Whether the key holds a value per language; null lets the class definition field decide */
    localized?: boolean | null;
    /** Data type of the key as stored, or null where the key configuration is gone */
    keyType?: string | null;
    /** This assignment's resolved option vocabulary, narrowed by its definitionOverride */
    options?: SelectOption[] | null;
    /** Why options is null for a select or multiselect key; null means nothing failed */
    optionsUnavailableReason?: string | null;
    /** This assignment's unit vocabulary, or null where the key's type holds no units */
    units?: ClassificationStoreConfigurationKeyUnits | null;
    /** The key's own option vocabulary, not narrowed by this assignment */
    keyOptions?: SelectOption[] | null;
    /** Why keyOptions is null for a select or multiselect key; null means nothing failed */
    keyOptionsUnavailableReason?: string | null;
    /** The key's own unit vocabulary, or null where its type holds no units */
    keyUnits?: ClassificationStoreConfigurationKeyUnits | null;
};
export type ClassificationStoreConfigurationKeyGroupRelationCreate = {
    /** ID of the key */
    keyId: number;
    /** ID of the group */
    groupId: number;
    /** Sort order of the relation. Omitting it keeps the stored one, 0 on a new relation */
    sorter?: number | null;
    /** Whether the key is mandatory here. Omitting it keeps the stored flag, false if new */
    mandatory?: boolean | null;
    /** Partial field definition overriding the key's own for this assignment */
    definitionOverride?: object | null;
    /** Sub group of the store this assignment belongs to */
    subGroup?: string | null;
    /** Free-form metadata carried by this assignment */
    metadata?: object | null;
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
    /** Opaque identifier of the store, assigned by the system and never writable */
    identifier?: string | null;
    /** Resolved engine the store stores its values with; null where it cannot be determined */
    engine?: string | null;
    /** Capabilities the store's engine supports; empty if it reports none, null if unknown */
    engineCapabilities?: string[] | null;
};
export type ClassificationStoreConfigurationStoreCreate = {
    /** Name of the store */
    name: string;
};
export type ClassificationStoreConfigurationImportReport = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Number of entries the import created */
    created: number;
    /** Number of entries the import updated */
    updated: number;
    /** Number of entries that carried no identifier and adopted the one of the file */
    adopted: number;
    /** Number of entries the store already carried exactly as the file describes them */
    matchedUnchanged: number;
    /** Number of entries the store carries and the file does not; they are left in place */
    targetOnly: number;
    /** The created entries by name, the last element naming how many more there are */
    createdEntries: string[];
    /** The updated entries by name, the last element naming how many more there are */
    updatedEntries: string[];
    /** The adopted entries by name, the last element naming how many more there are */
    adoptedEntries: string[];
    /** The entries the store carries and the file does not, the last element naming how many more there are */
    targetOnlyEntries: string[];
    /** Conflicts of the import; always empty on a successful one */
    conflicts: string[];
    /** Number of entries skipped for a name the store holds under another identifier */
    skipped?: number | null;
    /** The skipped entries by name and reason, the last element naming how many more there are */
    skippedEntries?: string[] | null;
    /** Whether the file describes another store and replaced this store's configuration */
    replaced?: boolean | null;
    /** Number of entries removed before writing the file; a removed group loses its stored values */
    removed?: number | null;
    /** The removed entries by name, the last element naming how many more there are */
    removedEntries?: string[] | null;
    /** Whether the import removed, or a dry run would remove, a group and with it stored values */
    storedValuesRemoved?: boolean | null;
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
    /** Opaque identifier of the store, assigned by the system and never writable */
    identifier?: string | null;
    /** Resolved engine the store stores its values with; null where it cannot be determined */
    engine?: string | null;
    /** Capabilities the store's engine supports; empty if it reports none, null if unknown */
    engineCapabilities?: string[] | null;
};
export type ClassificationStoreConfigurationStoreUpdate = {
    /** Name of the store */
    name: string;
    /** Description of the store */
    description: string | null;
};
export type ClassificationStoreConfigurationSubGroupDetail = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of the sub group */
    id: number;
    /** Name of the sub group */
    name: string;
    /** ID of the store this sub group belongs to */
    storeId: number;
    /** Description of the sub group */
    description: string | null;
    /** Creation date as Unix timestamp */
    creationDate: number | null;
    /** Modification date as Unix timestamp */
    modificationDate: number | null;
    /** Generated identifier a key assignment names this sub group by, read-only */
    identifier?: string | null;
    /** Free-form pairs the sub group carries, as stored; null where it holds none */
    customMetadata?: object | null;
};
export type ClassificationStoreConfigurationSubGroupCreate = {
    /** Name of the sub group */
    name: string;
    /** ID of the store this sub group belongs to */
    storeId: number;
};
export type ClassificationStoreConfigurationSubGroupUpdate = {
    /** Name of the sub group */
    name: string;
    /** Description of the sub group */
    description: string | null;
    /** Free-form pairs; omit to keep them, an object replaces them whole, null clears them */
    customMetadata?: object | null;
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
    /** Per-language flag as the key stores it; null defers to the class definition field */
    localized?: boolean | null;
    /** Data type of the key, as the relation stores it; null where the relation states none */
    keyType?: string | null;
    /** Whether a grid filter can be applied to this key */
    filterable?: boolean | null;
    /** Why the key cannot be filtered: indexExcluded, typeUnsupported or resolutionFailed; null otherwise */
    filterUnavailableReason?: string | null;
};
export type ClassificationStoreVariantLayout = {
    /** Name a value addresses the variant by */
    name: string;
    /** Label of the variant */
    label?: string | null;
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
    /** Resolved label of the key */
    title?: string | null;
    /** Identifier of the sub group this key is assigned to within the group */
    subGroup?: string | null;
    /** Per language; null defers to the class definition field. It is not resolved against that field here. */
    localized?: boolean | null;
    /** Variants a `multiValue` key permits; null for a key of any other type */
    variants?: ClassificationStoreVariantLayout[] | null;
    /** Whether a `multiValue` key permits a value with no variant; null for any other type */
    defaultVariant?: boolean | null;
    /** Default variant label of a `multiValue` key; null where it declares none or for other types */
    defaultVariantLabel?: string | null;
};
export type ClassificationStoreSubGroupLayout = {
    /** Identifier the key assignments name this sub group by */
    identifier: string;
    /** Name */
    name: string;
    /** Description */
    description: string | null;
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
    /** Title of the group */
    title?: string | null;
    /** Sub groups the keys of this group are assigned to, ordered by their first key */
    subGroups?: ClassificationStoreSubGroupLayout[];
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
    useClassificationStoreConfigurationKeyRestoreMutation,
    useClassificationStoreConfigurationKeyGroupRelationCollectionQuery,
    useClassificationStoreConfigurationKeyGroupRelationCreateMutation,
    useClassificationStoreConfigurationKeyGroupRelationDeleteMutation,
    useClassificationStoreConfigurationStoreCreateMutation,
    useClassificationStoreConfigurationStoreExportQuery,
    useClassificationStoreConfigurationStoreImportMutation,
    useClassificationStoreConfigurationStoreTreeQuery,
    useClassificationStoreConfigurationStoreUpdateMutation,
    useClassificationStoreConfigurationSubGroupCollectionQuery,
    useClassificationStoreConfigurationSubGroupCreateMutation,
    useClassificationStoreConfigurationSubGroupUpdateMutation,
    useClassificationStoreConfigurationSubGroupDeleteMutation,
    useClassificationStoreConfigurationGetPageQuery,
    useClassificationStoreGetCollectionsQuery,
    useClassificationStoreGetGroupsQuery,
    useClassificationStoreGetKeyGroupRelationsQuery,
    useClassificationStoreGetLayoutByCollectionQuery,
    useClassificationStoreGetLayoutByGroupQuery,
    useClassificationStoreGetLayoutByKeyQuery,
    useClassificationStoreGetConfigCollectionQuery,
} = injectedRtkApi;
