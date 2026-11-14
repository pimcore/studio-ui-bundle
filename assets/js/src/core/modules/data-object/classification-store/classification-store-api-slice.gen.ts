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
        query: () => ({
          url: `/pimcore-studio/api/classification-store/configuration/stores/tree`,
        }),
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
        query: () => ({
          url: `/pimcore-studio/api/classification-store/config/collection`,
        }),
        providesTags: ["Classification Store"],
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
      classificationStoreConfigurationStoreApply: build.mutation<
        ClassificationStoreConfigurationStoreApplyApiResponse,
        ClassificationStoreConfigurationStoreApplyApiArg
      >({
        query: (queryArg) => ({
          url: `/pimcore-studio/api/classification-store/configuration/stores/apply`,
          method: "POST",
          body: queryArg.body,
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
export type ClassificationStoreConfigurationCollectionDeleteApiResponse =
  unknown;
export type ClassificationStoreConfigurationCollectionDeleteApiArg = {
  /** Id of the collection configuration */
  id: number;
};
export type ClassificationStoreConfigurationCollectionRelationCollectionApiResponse =
  /** status 200 Paginated list of collection-group relations */ {
    totalItems: number;
    items: ClassificationStoreConfigurationCollectionRelationDetail[];
  };
export type ClassificationStoreConfigurationCollectionRelationCollectionApiArg =
  {
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
export type ClassificationStoreConfigurationCollectionRelationDeleteApiResponse =
  unknown;
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
      additionalSortFilters?: object;
    };
  };
};
export type ClassificationStoreConfigurationKeyGroupRelationCreateApiResponse =
  /** status 200 Created or updated key-group relation */ ClassificationStoreConfigurationKeyGroupRelationDetail;
export type ClassificationStoreConfigurationKeyGroupRelationCreateApiArg = {
  classificationStoreConfigurationKeyGroupRelationCreate: ClassificationStoreConfigurationKeyGroupRelationCreate;
};
export type ClassificationStoreConfigurationKeyGroupRelationDeleteApiResponse =
  unknown;
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
  /** Locate a key in the list of disabled keys instead of the enabled ones (keys only) */
  disabledOnly?: boolean;
};
export type ClassificationStoreGetCollectionsApiResponse =
  /** status 200 List of classification store collections */ {
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
export type ClassificationStoreGetGroupsApiResponse =
  /** status 200 List of classification store groups */ {
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
export type ClassificationStoreConfigurationKeyRestoreApiResponse =
  /** status 200 The re-enabled key configuration */ ClassificationStoreConfigurationKeyDetail;
export type ClassificationStoreConfigurationKeyRestoreApiArg = {
  /** Id of the key configuration */
  id: number;
};
export type ClassificationStoreConfigurationStoreApplyApiResponse =
  /** status 200 Report of what the apply created, updated, adopted, skipped and left in place */ ClassificationStoreConfigurationImportReport;
export type ClassificationStoreConfigurationStoreApplyApiArg = {
  body: {
    /** Store configuration artifact as written by the export endpoint */
    file: Blob;
    /** Report what would be decided and write nothing */
    dryRun?: boolean;
  };
};
export type ClassificationStoreConfigurationStoreExportApiResponse =
  /** status 200 The store configuration as a JSON download */ Blob;
export type ClassificationStoreConfigurationStoreExportApiArg = {
  /** Id of the store configuration */
  id: number;
};
export type ClassificationStoreConfigurationStoreImportApiResponse =
  /** status 200 Report of what the import created, updated, adopted, skipped and left in place */ ClassificationStoreConfigurationImportReport;
export type ClassificationStoreConfigurationStoreImportApiArg = {
  /** Id of the store configuration */
  id: number;
  body: {
    /** Store configuration artifact as written by the export endpoint */
    file: Blob;
  };
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
  /** Free-form pairs the collection carries, reported as stored. Pimcore reads no member of it, and null where the collection holds none. */
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
  /** Free-form pairs of the collection. Pimcore reads no member of it and no member is reserved. Omitting it keeps a stored object alone, a supplied object replaces it whole rather than merging into it - so one rebuilt from a form without a member drops that member - and an explicit null clears it altogether. A JSON array is refused, the member being an object, and so is the one object an array cannot be told apart from once decoded - whose member names are the consecutive integers from zero, such as {"0": "a"} - because the stored form cannot carry that distinction either. */
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
  /** Free-form pairs the group carries, reported as stored. Pimcore reads no member of it, and null where the group holds none. */
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
  /** Free-form pairs of the group. Pimcore reads no member of it and no member is reserved. Omitting it keeps a stored object alone, a supplied object replaces it whole rather than merging into it - so one rebuilt from a form without a member drops that member - and an explicit null clears it altogether. A JSON array is refused, the member being an object, and so is the one object an array cannot be told apart from once decoded - whose member names are the consecutive integers from zero, such as {"0": "a"} - because the stored form cannot carry that distinction either. */
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
  /** IDs of the units the key permits, as stored and in the order the key declares them, or null where the key restricts nothing and every unit is permitted */
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
  /** Definition of the key, reported as it is stored. The member "indexed" is reserved: it is this key's own search index flag, where false asks for the key to be left out of the search index wherever it is used and anything else leaves it indexed. Studio stores the flag and queues a remap when it changes; honouring it is the search index's own. The members "variants" and "multiValue" declare something only in the definition of a key of type "multiValue": there, "variants" is the ordered list of variants the key permits, each a name and an optional label, "multiValue" is whether the key holds more than one value per variant, and the key carries its values in the object data payload as a list of entries rather than as a single value, whatever its variants list holds. In the definition of a key of any other type they are stored and published as written and declare nothing: such a key carries one value, unchanged. */
  definition: object | null;
  /** Creation date as Unix timestamp */
  creationDate: number | null;
  /** Modification date as Unix timestamp */
  modificationDate: number | null;
  /** Title of the key */
  title?: string | null;
  /** Opaque identifier of the key, assigned by the system and never writable */
  identifier?: string | null;
  /** Whether the key holds a value per language, reported as the key stores it: true, false, or null where the key states nothing and the `localized` flag of the class definition field the key is rendered in decides. It is not resolved against that field here. The flag is not yet honoured by the object data endpoints, which still read and write a classification store field under the language set of that field alone. */
  localized?: boolean | null;
  /** Free-form pairs the key carries, reported as stored. Pimcore reads no member of it, and null where the key holds none. */
  customMetadata?: object | null;
  /** The resolved view of this key's option vocabulary for this request, whatever its source: its own stored options, or the options of an options provider that reports static options, in the order they are resolved. Null where the key is not a select or multiselect, and where optionsUnavailableReason says why not. The stored definition remains authoritative for storage. */
  options?: SelectOption[] | null;
  /** Why options is null for a select or multiselect key: "providerNotStatic" where its options provider reports options that depend on a data object, "resolutionFailed" where the provider could not be resolved or raised, for instance for a deleted select options configuration. Null means nothing failed. */
  optionsUnavailableReason?: string | null;
  /** The unit vocabulary of the key's own definition, never of an assignment override, and null where its type holds no units. Where validUnits is null the definition restricts nothing; the type tells that apart from a type with no units at all. */
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
  /** Values for object brick definition metadata. The member "indexed" is reserved: it is this key's own search index flag, where false asks for the key to be left out of the search index wherever it is used and anything else leaves it indexed. Changing it queues a remap of every search index the key's store reaches, which converges in the background; honouring the flag is the search index's own. The members "variants" and "multiValue" declare something only in the definition of a key of type "multiValue": there, "variants" is the ordered list of variants the key permits, each a name and an optional label, "multiValue" is whether the key holds more than one value per variant, and the key carries its values in the object data payload as a list of entries rather than as a single value. In the definition of a key of any other type they are stored as written and declare nothing. Declaring them is accepted whatever the engine of the key's store reports. The whole object replaces the stored one, so a client that rebuilds it from a form has to send the member back to keep it. It is unrelated to the "index" member below, which is about the object query tables. */
  definition: object | null;
  /** Whether the key holds a value per language: true, false, or null to state nothing and let the `localized` flag of the class definition field the key is rendered in decide. Leaving the member out of the request keeps the stored value, sending it as null stores null. The flag is not yet honoured by the object data endpoints, which still read and write a classification store field under the language set of the class definition field alone. */
  localized?: boolean | null;
  /** Free-form pairs of the key. Pimcore reads no member of it and no member is reserved. Omitting it keeps a stored object alone, a supplied object replaces it whole rather than merging into it - so one rebuilt from a form without a member drops that member - and an explicit null clears it altogether. A JSON array is refused, the member being an object, and so is the one object an array cannot be told apart from once decoded - whose member names are the consecutive integers from zero, such as {"0": "a"} - because the stored form cannot carry that distinction either. */
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
  /** Whether the key holds a value per language, as the key stores it: true, false, or null where the key states nothing and the `localized` flag of the class definition field the key is rendered in decides. It belongs to the key, not to this assignment, and is not resolved against that field here. The flag is not yet honoured by the object data endpoints, which still read and write a classification store field under the language set of the class definition field alone. */
  localized?: boolean | null;
  /** Data type of the key, as the key configuration stores it, or null where the key configuration is gone */
  keyType?: string | null;
  /** The resolved view of this assignment's option vocabulary for this request, whatever its source: the stored options, or the options of an options provider that reports static options, in the order they are resolved, narrowed to the option subset of the assignment's definitionOverride. Null where the key is not a select or multiselect, and where optionsUnavailableReason says why not. The stored definition remains authoritative for storage. */
  options?: SelectOption[] | null;
  /** Why options is null for a select or multiselect key: "providerNotStatic" where its options provider reports options that depend on a data object, "resolutionFailed" where the provider could not be resolved or raised, for instance for a deleted select options configuration. Null means nothing failed. */
  optionsUnavailableReason?: string | null;
  /** The unit vocabulary of this assignment: the key's own definition with the assignment's definitionOverride applied, and null where its type holds no units. Where validUnits is null the definition restricts nothing; the type tells that apart from a type with no units at all. */
  units?: ClassificationStoreConfigurationKeyUnits | null;
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
  /** Partial field definition overriding the one of the key for this assignment. Omitting it leaves a stored one alone, a supplied object replaces it whole rather than merging into it, and an explicit null clears it. A JSON array is refused, the member being an object, and so is the one object an array cannot be told apart from once decoded - whose member names are the consecutive integers from zero, such as {"0": "a"} - because the stored form cannot carry that distinction either. */
  definitionOverride?: object | null;
  /** Sub group of the store this assignment belongs to. Omitting it leaves a stored one alone, a supplied value replaces it, and an explicit null clears it. */
  subGroup?: string | null;
  /** Free-form metadata carried by this assignment. No member is reserved. Omitting it keeps a stored object alone, a supplied object replaces it whole rather than merging into it - so one rebuilt from a form without a member drops that member - and an explicit null clears it altogether. A JSON array is refused, the member being an object, and so is the one object an array cannot be told apart from once decoded - whose member names are the consecutive integers from zero, such as {"0": "a"} - because the stored form cannot carry that distinction either. */
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
  /** The engine the store stores its values with, as the store stores it; null where it stores none, which is the default engine, and null as well on a core that does not report an engine at all. */
  engine?: string | null;
  /** The capabilities the store's engine reports, naming exactly those it supports. An empty array is an engine that reports none, which is a different answer. Null is every case where the question could not be put: a core that does not report an engine, no engine resolver on this installation, or an engine that failed to resolve. A client cannot tell those apart and must not infer core support from it. */
  engineCapabilities?: string[] | null;
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
  /** Opaque identifier of the store, assigned by the system and never writable */
  identifier?: string | null;
  /** The engine the store stores its values with, as the store stores it; null where it stores none, which is the default engine, and null as well on a core that does not report an engine at all. */
  engine?: string | null;
  /** The capabilities the store's engine reports, naming exactly those it supports. An empty array is an engine that reports none, which is a different answer. Null is every case where the question could not be put: a core that does not report an engine, no engine resolver on this installation, or an engine that failed to resolve. A client cannot tell those apart and must not infer core support from it. */
  engineCapabilities?: string[] | null;
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
  /** Whether the key holds a value per language, as the key stores it: true, false, or null where the key states nothing and the `localized` flag of the class definition field the key is rendered in decides. It is not resolved against that field here. */
  localized?: boolean | null;
  /** The variants a key of type `multiValue` permits, in the order it declares them, each a name and an optional label; null for a key of any other type. A value carrying no variant addresses the default variant, which is never one of these names. */
  variants?: ClassificationStoreVariantLayout[] | null;
  /** Whether a key of type `multiValue` holds more than one value per variant; null for a key of any other type. */
  multiValue?: boolean | null;
  /** How many values one slot of a key of type `multiValue` may hold; null where it declares no limit and for a key of any other type. It is published, not enforced by this endpoint. */
  maximum?: number | null;
  /** Whether a key of type `multiValue` permits a value carrying no variant; null for a key of any other type. It is published, not enforced by this endpoint. */
  defaultVariant?: boolean | null;
  /** Label of the default variant of a key of type `multiValue`; null where it declares none and for a key of any other type. */
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
  /** Empty on a successful import; a refused one answers with 409 and names them in the error message instead */
  conflicts: string[];
  /** Number of entries the import skipped because the store holds their name under another identifier than the file gives them; the stored rows are left as they are */
  skipped?: number | null;
  /** The skipped entries by name and reason, the last element naming how many more there are */
  skippedEntries?: string[] | null;
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
  /** Free-form pairs the sub group carries, reported as stored. Pimcore reads no member of it, and null where the sub group holds none. */
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
  /** Free-form pairs of the sub group. Pimcore reads no member of it and no member is reserved. Omitting it keeps a stored object alone, a supplied object replaces it whole rather than merging into it - so one rebuilt from a form without a member drops that member - and an explicit null clears it altogether. A JSON array is refused, the member being an object, and so is the one object an array cannot be told apart from once decoded - whose member names are the consecutive integers from zero, such as {"0": "a"} - because the stored form cannot carry that distinction either. */
  customMetadata?: object | null;
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
  useClassificationStoreConfigurationKeyRestoreMutation,
  useClassificationStoreConfigurationStoreApplyMutation,
  useClassificationStoreConfigurationStoreExportQuery,
  useClassificationStoreConfigurationStoreImportMutation,
  useClassificationStoreConfigurationSubGroupCollectionQuery,
  useClassificationStoreConfigurationSubGroupCreateMutation,
  useClassificationStoreConfigurationSubGroupUpdateMutation,
  useClassificationStoreConfigurationSubGroupDeleteMutation,
} = injectedRtkApi;
