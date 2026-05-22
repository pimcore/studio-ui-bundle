import { api } from "@sdk/api";
export const addTagTypes = ["Class Definition"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            classGetAvailableVisibleFields: build.query<
                ClassGetAvailableVisibleFieldsApiResponse,
                ClassGetAvailableVisibleFieldsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/definition/available-visible-fields`,
                    params: {
                        classNames: queryArg.classNames,
                    },
                }),
                providesTags: ["Class Definition"],
            }),
            classBulkExportAvailable: build.query<ClassBulkExportAvailableApiResponse, ClassBulkExportAvailableApiArg>({
                query: () => ({ url: `/pimcore-studio/api/class/bulk-export/available` }),
                providesTags: ["Class Definition"],
            }),
            classBulkExport: build.mutation<ClassBulkExportApiResponse, ClassBulkExportApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/bulk-export`,
                    method: "POST",
                    body: queryArg.bulkExportParameters,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classBulkImport: build.mutation<ClassBulkImportApiResponse, ClassBulkImportApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/bulk-import/${queryArg.fileId}`,
                    method: "POST",
                    body: queryArg.bulkImportParameters,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classBulkImportDeleteFile: build.mutation<
                ClassBulkImportDeleteFileApiResponse,
                ClassBulkImportDeleteFileApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/bulk-import/${queryArg.fileId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classBulkImportPrepare: build.mutation<ClassBulkImportPrepareApiResponse, ClassBulkImportPrepareApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/bulk-import/prepare`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classDefinitionCollection: build.query<
                ClassDefinitionCollectionApiResponse,
                ClassDefinitionCollectionApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/class/collection` }),
                providesTags: ["Class Definition"],
            }),
            classDefinitionCollectionCreatable: build.query<
                ClassDefinitionCollectionCreatableApiResponse,
                ClassDefinitionCollectionCreatableApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/class/collection/creatable` }),
                providesTags: ["Class Definition"],
            }),
            classCustomLayoutCollection: build.query<
                ClassCustomLayoutCollectionApiResponse,
                ClassCustomLayoutCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/custom-layout/collection`,
                    params: {
                        classIds: queryArg.classIds,
                    },
                }),
                providesTags: ["Class Definition"],
            }),
            classAllLayoutCollection: build.query<ClassAllLayoutCollectionApiResponse, ClassAllLayoutCollectionApiArg>({
                query: () => ({ url: `/pimcore-studio/api/class/all-layouts` }),
                providesTags: ["Class Definition"],
            }),
            classCustomLayoutGet: build.query<ClassCustomLayoutGetApiResponse, ClassCustomLayoutGetApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}` }),
                providesTags: ["Class Definition"],
            }),
            classCustomLayoutUpdate: build.mutation<ClassCustomLayoutUpdateApiResponse, ClassCustomLayoutUpdateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`,
                    method: "PUT",
                    body: queryArg.customLayoutUpdate,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classCustomLayoutCreate: build.mutation<ClassCustomLayoutCreateApiResponse, ClassCustomLayoutCreateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`,
                    method: "POST",
                    body: queryArg.customLayoutNew,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classCustomLayoutDelete: build.mutation<ClassCustomLayoutDeleteApiResponse, ClassCustomLayoutDeleteApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classCustomLayoutEditorCollection: build.query<
                ClassCustomLayoutEditorCollectionApiResponse,
                ClassCustomLayoutEditorCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/custom-layout/editor/collection/${queryArg.objectId}`,
                }),
                providesTags: ["Class Definition"],
            }),
            classCustomLayoutExport: build.query<ClassCustomLayoutExportApiResponse, ClassCustomLayoutExportApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/custom-layout/export/${queryArg.customLayoutId}`,
                }),
                providesTags: ["Class Definition"],
            }),
            classCustomLayoutGetIdentifierData: build.query<
                ClassCustomLayoutGetIdentifierDataApiResponse,
                ClassCustomLayoutGetIdentifierDataApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/custom-layout/identifier-data/${queryArg.classDefinitionId}`,
                }),
                providesTags: ["Class Definition"],
            }),
            classCustomLayoutImport: build.mutation<ClassCustomLayoutImportApiResponse, ClassCustomLayoutImportApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/custom-layout/import/${queryArg.customLayoutId}`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classDefinitionGetBrickFields: build.query<
                ClassDefinitionGetBrickFieldsApiResponse,
                ClassDefinitionGetBrickFieldsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}/brick-fields`,
                }),
                providesTags: ["Class Definition"],
            }),
            classDefinitionGetBricksUsages: build.query<
                ClassDefinitionGetBricksUsagesApiResponse,
                ClassDefinitionGetBricksUsagesApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}/bricks`,
                }),
                providesTags: ["Class Definition"],
            }),
            classDefinitionCreate: build.mutation<ClassDefinitionCreateApiResponse, ClassDefinitionCreateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/definition/configuration-view/detail/create`,
                    method: "POST",
                    body: queryArg.createClassDefinition,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classDefinitionGetById: build.query<ClassDefinitionGetByIdApiResponse, ClassDefinitionGetByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}`,
                }),
                providesTags: ["Class Definition"],
            }),
            classDefinitionUpdate: build.mutation<ClassDefinitionUpdateApiResponse, ClassDefinitionUpdateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.classDefinitionUpdate,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classDefinitionDelete: build.mutation<ClassDefinitionDeleteApiResponse, ClassDefinitionDeleteApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classDefinitionExport: build.query<ClassDefinitionExportApiResponse, ClassDefinitionExportApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}/export`,
                }),
                providesTags: ["Class Definition"],
            }),
            classDefinitionGetIdentifierData: build.query<
                ClassDefinitionGetIdentifierDataApiResponse,
                ClassDefinitionGetIdentifierDataApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/class/definition/configuration-view/identifier-data` }),
                providesTags: ["Class Definition"],
            }),
            classDefinitionImport: build.mutation<ClassDefinitionImportApiResponse, ClassDefinitionImportApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}/import`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classDefinitionGetLayoutById: build.query<
                ClassDefinitionGetLayoutByIdApiResponse,
                ClassDefinitionGetLayoutByIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}/layout`,
                }),
                providesTags: ["Class Definition"],
            }),
            classGetSelectedVisibleFields: build.query<
                ClassGetSelectedVisibleFieldsApiResponse,
                ClassGetSelectedVisibleFieldsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/definition/configuration-view/detail/${queryArg.id}/selected-visible-fields`,
                    params: {
                        relationField: queryArg.relationField,
                    },
                }),
                providesTags: ["Class Definition"],
            }),
            classDefinitionGetTextLayoutPreview: build.query<
                ClassDefinitionGetTextLayoutPreviewApiResponse,
                ClassDefinitionGetTextLayoutPreviewApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/definition/configuration-view/text-layout/preview`,
                    params: {
                        className: queryArg.className,
                        path: queryArg.path,
                        renderingData: queryArg.renderingData,
                        renderingClass: queryArg.renderingClass,
                        html: queryArg.html,
                    },
                }),
                providesTags: ["Class Definition"],
            }),
            classDefinitionGetTree: build.query<ClassDefinitionGetTreeApiResponse, ClassDefinitionGetTreeApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/definition/configuration-view/tree`,
                    params: {
                        withGroup: queryArg.withGroup,
                    },
                }),
                providesTags: ["Class Definition"],
            }),
            classFieldCollectionCollection: build.query<
                ClassFieldCollectionCollectionApiResponse,
                ClassFieldCollectionCollectionApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/class/field-collection/collection` }),
                providesTags: ["Class Definition"],
            }),
            classFieldCollectionCreate: build.mutation<
                ClassFieldCollectionCreateApiResponse,
                ClassFieldCollectionCreateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/field-collection`,
                    method: "POST",
                    body: queryArg.createFieldCollection,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classFieldCollectionGetByKey: build.query<
                ClassFieldCollectionGetByKeyApiResponse,
                ClassFieldCollectionGetByKeyApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/class/field-collection/${queryArg.key}` }),
                providesTags: ["Class Definition"],
            }),
            classFieldCollectionUpdate: build.mutation<
                ClassFieldCollectionUpdateApiResponse,
                ClassFieldCollectionUpdateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/field-collection/${queryArg.key}`,
                    method: "PUT",
                    body: queryArg.fieldCollectionUpdate,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classFieldCollectionDelete: build.mutation<
                ClassFieldCollectionDeleteApiResponse,
                ClassFieldCollectionDeleteApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/field-collection/${queryArg.key}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classFieldCollectionExport: build.query<
                ClassFieldCollectionExportApiResponse,
                ClassFieldCollectionExportApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/class/field-collection/${queryArg.key}/export` }),
                providesTags: ["Class Definition"],
            }),
            classFieldCollectionImport: build.mutation<
                ClassFieldCollectionImportApiResponse,
                ClassFieldCollectionImportApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/field-collection/${queryArg.key}/import`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classFieldCollectionObjectLayout: build.query<
                ClassFieldCollectionObjectLayoutApiResponse,
                ClassFieldCollectionObjectLayoutApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/field-collection/${queryArg.objectId}/object/layout`,
                }),
                providesTags: ["Class Definition"],
            }),
            classFieldCollectionGetLayoutByKey: build.query<
                ClassFieldCollectionGetLayoutByKeyApiResponse,
                ClassFieldCollectionGetLayoutByKeyApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/class/field-collection/${queryArg.key}/layout` }),
                providesTags: ["Class Definition"],
            }),
            classFieldCollectionGetTree: build.query<
                ClassFieldCollectionGetTreeApiResponse,
                ClassFieldCollectionGetTreeApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/field-collection/tree`,
                    params: {
                        allowedTypes: queryArg.allowedTypes,
                    },
                }),
                providesTags: ["Class Definition"],
            }),
            classFieldCollectionGetUsages: build.query<
                ClassFieldCollectionGetUsagesApiResponse,
                ClassFieldCollectionGetUsagesApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/class/field-collection/${queryArg.key}/usages` }),
                providesTags: ["Class Definition"],
            }),
            classGetFieldsByType: build.query<ClassGetFieldsByTypeApiResponse, ClassGetFieldsByTypeApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/definition/fields-by-type`,
                    params: {
                        classId: queryArg.classId,
                        type: queryArg["type"],
                    },
                }),
                providesTags: ["Class Definition"],
            }),
            classDefinitionFolderCollection: build.query<
                ClassDefinitionFolderCollectionApiResponse,
                ClassDefinitionFolderCollectionApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/class/folder/${queryArg.folderId}` }),
                providesTags: ["Class Definition"],
            }),
            classDefinitionGet: build.query<ClassDefinitionGetApiResponse, ClassDefinitionGetApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/class/definition/${queryArg.dataObjectClass}` }),
                providesTags: ["Class Definition"],
            }),
            classObjectBrickClasses: build.query<ClassObjectBrickClassesApiResponse, ClassObjectBrickClassesApiArg>({
                query: () => ({ url: `/pimcore-studio/api/class/object-brick/classes` }),
                providesTags: ["Class Definition"],
            }),
            classObjectBrickCollection: build.query<
                ClassObjectBrickCollectionApiResponse,
                ClassObjectBrickCollectionApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/class/object-brick/collection` }),
                providesTags: ["Class Definition"],
            }),
            classObjectBrickCreate: build.mutation<ClassObjectBrickCreateApiResponse, ClassObjectBrickCreateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/object-brick`,
                    method: "POST",
                    body: queryArg.createObjectBrick,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classObjectBrickCustomLayoutGet: build.query<
                ClassObjectBrickCustomLayoutGetApiResponse,
                ClassObjectBrickCustomLayoutGetApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/custom-layout/${queryArg.customLayoutId}`,
                }),
                providesTags: ["Class Definition"],
            }),
            classObjectBrickCustomLayoutUpdate: build.mutation<
                ClassObjectBrickCustomLayoutUpdateApiResponse,
                ClassObjectBrickCustomLayoutUpdateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/custom-layout/${queryArg.customLayoutId}`,
                    method: "PUT",
                    body: queryArg.customLayoutUpdate,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classObjectBrickCustomLayoutDelete: build.mutation<
                ClassObjectBrickCustomLayoutDeleteApiResponse,
                ClassObjectBrickCustomLayoutDeleteApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/custom-layout/${queryArg.customLayoutId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classObjectBrickCustomLayoutExport: build.query<
                ClassObjectBrickCustomLayoutExportApiResponse,
                ClassObjectBrickCustomLayoutExportApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/custom-layout/${queryArg.customLayoutId}/export`,
                }),
                providesTags: ["Class Definition"],
            }),
            classObjectBrickCustomLayoutImport: build.mutation<
                ClassObjectBrickCustomLayoutImportApiResponse,
                ClassObjectBrickCustomLayoutImportApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/custom-layout/${queryArg.customLayoutId}/import`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classObjectBrickGetByKey: build.query<ClassObjectBrickGetByKeyApiResponse, ClassObjectBrickGetByKeyApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/class/object-brick/${queryArg.key}` }),
                providesTags: ["Class Definition"],
            }),
            classObjectBrickUpdate: build.mutation<ClassObjectBrickUpdateApiResponse, ClassObjectBrickUpdateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/object-brick/${queryArg.key}`,
                    method: "PUT",
                    body: queryArg.objectBrickUpdate,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classObjectBrickDelete: build.mutation<ClassObjectBrickDeleteApiResponse, ClassObjectBrickDeleteApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/object-brick/${queryArg.key}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classObjectBrickExport: build.query<ClassObjectBrickExportApiResponse, ClassObjectBrickExportApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/export` }),
                providesTags: ["Class Definition"],
            }),
            classObjectBrickImport: build.mutation<ClassObjectBrickImportApiResponse, ClassObjectBrickImportApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/import`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classObjectBrickObjectLayout: build.query<
                ClassObjectBrickObjectLayoutApiResponse,
                ClassObjectBrickObjectLayoutApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/object-brick/${queryArg.objectId}/object/layout`,
                }),
                providesTags: ["Class Definition"],
            }),
            classObjectBrickGetLayoutByKey: build.query<
                ClassObjectBrickGetLayoutByKeyApiResponse,
                ClassObjectBrickGetLayoutByKeyApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/layout` }),
                providesTags: ["Class Definition"],
            }),
            classObjectBrickGetTree: build.query<ClassObjectBrickGetTreeApiResponse, ClassObjectBrickGetTreeApiArg>({
                query: () => ({ url: `/pimcore-studio/api/class/object-brick/tree` }),
                providesTags: ["Class Definition"],
            }),
            classObjectBrickGetUsages: build.query<
                ClassObjectBrickGetUsagesApiResponse,
                ClassObjectBrickGetUsagesApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/class/object-brick/${queryArg.key}/usages` }),
                providesTags: ["Class Definition"],
            }),
            classSelectOptionCreate: build.mutation<ClassSelectOptionCreateApiResponse, ClassSelectOptionCreateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/select-option`,
                    method: "POST",
                    body: queryArg.createSelectOption,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classSelectOptionGet: build.query<ClassSelectOptionGetApiResponse, ClassSelectOptionGetApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/class/select-option/${queryArg.id}` }),
                providesTags: ["Class Definition"],
            }),
            classSelectOptionUpdate: build.mutation<ClassSelectOptionUpdateApiResponse, ClassSelectOptionUpdateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/select-option/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.updateSelectOption,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classSelectOptionDelete: build.mutation<ClassSelectOptionDeleteApiResponse, ClassSelectOptionDeleteApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/select-option/${queryArg.id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classSelectOptionGetTree: build.query<ClassSelectOptionGetTreeApiResponse, ClassSelectOptionGetTreeApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/select-option/tree`,
                    params: {
                        withGroup: queryArg.withGroup,
                    },
                }),
                providesTags: ["Class Definition"],
            }),
            classSelectOptionGetUsages: build.query<
                ClassSelectOptionGetUsagesApiResponse,
                ClassSelectOptionGetUsagesApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/class/select-option/${queryArg.id}/usages` }),
                providesTags: ["Class Definition"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type ClassGetAvailableVisibleFieldsApiResponse =
    /** status 200 Successfully retrieved available visible fields */ {
        totalItems: number;
        items: ClassDefinitionVisibleField[];
    };
export type ClassGetAvailableVisibleFieldsApiArg = {
    /** Comma-separated list of class names */
    classNames?: string;
};
export type ClassBulkExportAvailableApiResponse = /** status 200 List of available exportable items */ {
    items: BulkExportAvailableItem[];
};
export type ClassBulkExportAvailableApiArg = void;
export type ClassBulkExportApiResponse = /** status 200 Bulk export JSON file download */ Blob;
export type ClassBulkExportApiArg = {
    bulkExportParameters: BulkExportParameters;
};
export type ClassBulkImportApiResponse = /** status 201 Successfully created jobRun for bulk import */ {
    /** ID of created jobRun */
    jobRunId: number;
};
export type ClassBulkImportApiArg = {
    /** File identifier returned by the prepare import endpoint */
    fileId: string;
    bulkImportParameters: BulkImportParameters;
};
export type ClassBulkImportDeleteFileApiResponse = unknown;
export type ClassBulkImportDeleteFileApiArg = {
    /** File identifier returned by the prepare import endpoint */
    fileId: string;
};
export type ClassBulkImportPrepareApiResponse =
    /** status 200 File identifier and list of importable items */ BulkImportPrepareResponse;
export type ClassBulkImportPrepareApiArg = {
    body: {
        /** Bulk export JSON file to analyze */
        file: Blob;
    };
};
export type ClassDefinitionCollectionApiResponse = /** status 200 List of class definitions */ {
    totalItems: number;
    items: ClassDefinitionListItem[];
};
export type ClassDefinitionCollectionApiArg = void;
export type ClassDefinitionCollectionCreatableApiResponse =
    /** status 200 List of class definitions that can be created. */ {
        totalItems: number;
        items: ClassDefinitionListItem[];
    };
export type ClassDefinitionCollectionCreatableApiArg = void;
export type ClassCustomLayoutCollectionApiResponse =
    /** status 200 List of custom layouts for the given data object class in a simple and compact format for listings.
     */ {
        totalItems: number;
        items: CustomLayoutsInCompactFormatToBeUsedForEGListings[];
    };
export type ClassCustomLayoutCollectionApiArg = {
    /** Comma-separated list of class Ids */
    classIds?: string;
};
export type ClassAllLayoutCollectionApiResponse = /** status 200 List of all available class layouts */ {
    totalItems: number;
    items: ClassLayoutDataInCompactFormatToBeUsedForEGListingInWorkspaces[];
};
export type ClassAllLayoutCollectionApiArg = void;
export type ClassCustomLayoutGetApiResponse = /** status 200 Custom layout data */ CustomLayouts;
export type ClassCustomLayoutGetApiArg = {
    /** Id of custom layout */
    customLayoutId: string;
};
export type ClassCustomLayoutUpdateApiResponse = /** status 200 Custom layout updated */ CustomLayouts;
export type ClassCustomLayoutUpdateApiArg = {
    /** Id of custom layout */
    customLayoutId: string;
    customLayoutUpdate: SchemaUsedToUpdateCustomLayouts;
};
export type ClassCustomLayoutCreateApiResponse = /** status 200 Custom layout created */ CustomLayouts;
export type ClassCustomLayoutCreateApiArg = {
    /** Id of custom layout */
    customLayoutId: string;
    customLayoutNew: SchemaUsedToCreateCustomLayouts;
};
export type ClassCustomLayoutDeleteApiResponse = unknown;
export type ClassCustomLayoutDeleteApiArg = {
    /** Id of custom layout */
    customLayoutId: string;
};
export type ClassCustomLayoutEditorCollectionApiResponse =
    /** status 200 List of custom layouts for the given data object ID */ {
        totalItems: number;
        items: CustomLayoutsInCompactFormatToBeUsedForEGListings[];
    };
export type ClassCustomLayoutEditorCollectionApiArg = {
    /** ObjectId of the element */
    objectId: number;
};
export type ClassCustomLayoutExportApiResponse = /** status 200 Custom layout data as JSON */ Blob;
export type ClassCustomLayoutExportApiArg = {
    /** Id of custom layout */
    customLayoutId: string;
};
export type ClassCustomLayoutGetIdentifierDataApiResponse =
    /** status 200 Identifier data for new custom layout as JSON */ CustomLayoutIdentifierData;
export type ClassCustomLayoutGetIdentifierDataApiArg = {
    /** Class definition unique identifier for custom layouts */
    classDefinitionId: string;
};
export type ClassCustomLayoutImportApiResponse =
    /** status 200 Successfully imported custom layout configuration */ CustomLayouts;
export type ClassCustomLayoutImportApiArg = {
    /** Id of custom layout */
    customLayoutId: string;
    body: {
        /** Import file to upload */
        file: Blob;
    };
};
export type ClassDefinitionGetBrickFieldsApiResponse = /** status 200 List of object brick field names */ {
    items: ClassDefinitionObjectBrickField[];
};
export type ClassDefinitionGetBrickFieldsApiArg = {
    /** Class definition unique identifier */
    id: string;
};
export type ClassDefinitionGetBricksUsagesApiResponse = /** status 200 Object bricks usage data */ {
    items: ClassDefinitionObjectBrickData[];
};
export type ClassDefinitionGetBricksUsagesApiArg = {
    /** Class definition unique identifier */
    id: string;
};
export type ClassDefinitionCreateApiResponse =
    /** status 200 Successfully created class definition configuration */ CustomLayouts;
export type ClassDefinitionCreateApiArg = {
    createClassDefinition: SchemaUsedToCreateClassDefinitions;
};
export type ClassDefinitionGetByIdApiResponse = /** status 200 Class definition data */ ClassDefinition;
export type ClassDefinitionGetByIdApiArg = {
    /** Class definition unique identifier */
    id: string;
};
export type ClassDefinitionUpdateApiResponse =
    /** status 200 Successfully updated class definition configuration */ ClassDefinition;
export type ClassDefinitionUpdateApiArg = {
    /** Class definition unique identifier */
    id: string;
    classDefinitionUpdate: SchemaUsedToUpdateClassDefinitionConfiguration;
};
export type ClassDefinitionDeleteApiResponse = unknown;
export type ClassDefinitionDeleteApiArg = {
    /** Class definition unique identifier */
    id: string;
};
export type ClassDefinitionExportApiResponse = /** status 200 Exported class definition configuration as JSON */ Blob;
export type ClassDefinitionExportApiArg = {
    /** Class definition unique identifier */
    id: string;
};
export type ClassDefinitionGetIdentifierDataApiResponse =
    /** status 200 Suggested unique ID and existing class IDs */ ClassDefinitionIdentifierData;
export type ClassDefinitionGetIdentifierDataApiArg = void;
export type ClassDefinitionImportApiResponse =
    /** status 200 Successfully imported class definition configuration */ ClassDefinition;
export type ClassDefinitionImportApiArg = {
    /** Class definition unique identifier */
    id: string;
    body: {
        /** Import file with JSON encoded class definition configuration */
        file: Blob;
    };
};
export type ClassDefinitionGetLayoutByIdApiResponse = /** status 200 Layout definition data */ Layout;
export type ClassDefinitionGetLayoutByIdApiArg = {
    /** Class definition unique identifier */
    id: string;
};
export type ClassGetSelectedVisibleFieldsApiResponse =
    /** status 200 Successfully retrieved selected visible fields */ {
        columns?: GridColumnConfiguration[];
    };
export type ClassGetSelectedVisibleFieldsApiArg = {
    /** Class definition unique identifier */
    id: string;
    /** Relation field name for which the selected fields should be retrieved as dot notation. */
    relationField?: string;
};
export type ClassDefinitionGetTextLayoutPreviewApiResponse = /** status 200 Text layout preview as HTML */ Blob;
export type ClassDefinitionGetTextLayoutPreviewApiArg = {
    /** Class definition name where layout is defined */
    className: string;
    /** Path to optional object to render the layout with */
    path?: string;
    /** Optional dynamic data to be used for rendering the layout */
    renderingData?: string;
    /** Optional rendering class to be used for rendering the layout */
    renderingClass?: string;
    /** Optional static HTML to be used for rendering the layout */
    html?: string;
};
export type ClassDefinitionGetTreeApiResponse = /** status 200 Class definition data for the tree view */ {
    totalItems: number;
    items: (ClassDefinitionTreeNodeItem | ClassDefinitionTreeNodeFolder)[];
};
export type ClassDefinitionGetTreeApiArg = {
    /** Whether to group the results. */
    withGroup: boolean;
};
export type ClassFieldCollectionCollectionApiResponse = /** status 200 List of field collection configurations */ {
    totalItems: number;
    items: FieldCollectionConfiguration[];
};
export type ClassFieldCollectionCollectionApiArg = void;
export type ClassFieldCollectionCreateApiResponse =
    /** status 200 Successfully created field collection definition */ FieldCollectionDetail;
export type ClassFieldCollectionCreateApiArg = {
    createFieldCollection: SchemaUsedToCreateFieldCollectionDefinitions;
};
export type ClassFieldCollectionGetByKeyApiResponse =
    /** status 200 Field collection detail data */ FieldCollectionDetail;
export type ClassFieldCollectionGetByKeyApiArg = {
    /** Field collection unique key */
    key: string;
};
export type ClassFieldCollectionUpdateApiResponse =
    /** status 200 Successfully updated field collection definition */ FieldCollectionDetail;
export type ClassFieldCollectionUpdateApiArg = {
    /** Field collection unique key */
    key: string;
    fieldCollectionUpdate: SchemaUsedToUpdateFieldCollectionDefinition;
};
export type ClassFieldCollectionDeleteApiResponse = unknown;
export type ClassFieldCollectionDeleteApiArg = {
    /** Field collection unique key */
    key: string;
};
export type ClassFieldCollectionExportApiResponse = /** status 200 Exported field collection definition as JSON */ Blob;
export type ClassFieldCollectionExportApiArg = {
    /** Field collection unique key */
    key: string;
};
export type ClassFieldCollectionImportApiResponse =
    /** status 200 Successfully imported field collection definition */ FieldCollectionDetail;
export type ClassFieldCollectionImportApiArg = {
    /** Field collection unique key */
    key: string;
    body: {
        /** Import file with JSON encoded field collection definition */
        file: Blob;
    };
};
export type ClassFieldCollectionObjectLayoutApiResponse = /** status 200 List of layouts */ {
    totalItems: number;
    items: FieldCollectionLayoutDefinition[];
};
export type ClassFieldCollectionObjectLayoutApiArg = {
    /** ObjectId of the element */
    objectId: number;
};
export type ClassFieldCollectionGetLayoutByKeyApiResponse =
    /** status 200 Field collection layout definition data */ ConfigLayoutDefinition;
export type ClassFieldCollectionGetLayoutByKeyApiArg = {
    /** Field collection unique key */
    key: string;
};
export type ClassFieldCollectionGetTreeApiResponse = /** status 200 Field collection tree with nodes and folders */ {
    totalItems: number;
    items: (FieldCollectionTreeNodeItem | FieldCollectionTreeNodeFolder)[];
};
export type ClassFieldCollectionGetTreeApiArg = {
    /** Comma-separated list of allowed field collection types to filter by. */
    allowedTypes?: string;
};
export type ClassFieldCollectionGetUsagesApiResponse = /** status 200 Field collection usage data */ {
    items: FieldCollectionUsageData[];
};
export type ClassFieldCollectionGetUsagesApiArg = {
    /** Field collection unique key */
    key: string;
};
export type ClassGetFieldsByTypeApiResponse =
    /** status 200 Successfully retrieved class definition fields for the requested types */ {
        totalItems: number;
        items: FieldKeyByType[];
    };
export type ClassGetFieldsByTypeApiArg = {
    /** The class ID to retrieve fields for. */
    classId: string;
    /** Comma-separated list of field types to filter by. */
    type: string;
};
export type ClassDefinitionFolderCollectionApiResponse = /** status 200 List of all data object classes in a folder */ {
    totalItems: number;
    items: ClassInDataObjectFolder[];
};
export type ClassDefinitionFolderCollectionApiArg = {
    /** FolderId of the data-object */
    folderId: number;
};
export type ClassDefinitionGetApiResponse = /** status 200 Class definition */ ClassDefinition;
export type ClassDefinitionGetApiArg = {
    /** Data object class */
    dataObjectClass: string;
};
export type ClassObjectBrickClassesApiResponse =
    /** status 200 Collection of class definitions with ObjectBricks fields */ {
        totalItems: number;
        items: ClassDefinitionListItem[];
    };
export type ClassObjectBrickClassesApiArg = void;
export type ClassObjectBrickCollectionApiResponse = /** status 200 Collection of object brick definitions */ {
    totalItems: number;
    items: ObjectBrickConfiguration[];
};
export type ClassObjectBrickCollectionApiArg = void;
export type ClassObjectBrickCreateApiResponse =
    /** status 200 Created object brick definition detail */ ObjectBrickDetail;
export type ClassObjectBrickCreateApiArg = {
    createObjectBrick: SchemaUsedToCreateObjectBrickDefinitions;
};
export type ClassObjectBrickCustomLayoutGetApiResponse =
    /** status 200 Object brick custom layout data */ CustomLayouts;
export type ClassObjectBrickCustomLayoutGetApiArg = {
    /** Object brick key */
    key: string;
    /** Id of the base custom layout */
    customLayoutId: string;
};
export type ClassObjectBrickCustomLayoutUpdateApiResponse =
    /** status 200 Updated object brick custom layout */ CustomLayouts;
export type ClassObjectBrickCustomLayoutUpdateApiArg = {
    /** Object brick key */
    key: string;
    /** Id of the base custom layout */
    customLayoutId: string;
    customLayoutUpdate: SchemaUsedToUpdateCustomLayouts;
};
export type ClassObjectBrickCustomLayoutDeleteApiResponse = unknown;
export type ClassObjectBrickCustomLayoutDeleteApiArg = {
    /** Object brick key */
    key: string;
    /** Id of the base custom layout */
    customLayoutId: string;
};
export type ClassObjectBrickCustomLayoutExportApiResponse =
    /** status 200 Object brick custom layout data as JSON */ Blob;
export type ClassObjectBrickCustomLayoutExportApiArg = {
    /** Object brick key */
    key: string;
    /** Id of the base custom layout */
    customLayoutId: string;
};
export type ClassObjectBrickCustomLayoutImportApiResponse =
    /** status 200 Successfully imported object brick custom layout */ CustomLayouts;
export type ClassObjectBrickCustomLayoutImportApiArg = {
    /** Object brick key */
    key: string;
    /** Id of the base custom layout */
    customLayoutId: string;
    body: {
        /** Import file to upload */
        file: Blob;
    };
};
export type ClassObjectBrickGetByKeyApiResponse = /** status 200 Object brick definition detail */ ObjectBrickDetail;
export type ClassObjectBrickGetByKeyApiArg = {
    /** Object brick unique key */
    key: string;
};
export type ClassObjectBrickUpdateApiResponse =
    /** status 200 Updated object brick definition detail */ ObjectBrickDetail;
export type ClassObjectBrickUpdateApiArg = {
    /** Object brick unique key */
    key: string;
    objectBrickUpdate: SchemaUsedToUpdateObjectBrickDefinition;
};
export type ClassObjectBrickDeleteApiResponse = unknown;
export type ClassObjectBrickDeleteApiArg = {
    /** Object brick unique key */
    key: string;
};
export type ClassObjectBrickExportApiResponse = /** status 200 JSON export of the object brick definition */ Blob;
export type ClassObjectBrickExportApiArg = {
    /** Object brick unique key */
    key: string;
};
export type ClassObjectBrickImportApiResponse =
    /** status 200 Imported object brick definition detail */ ObjectBrickDetail;
export type ClassObjectBrickImportApiArg = {
    /** Object brick unique key */
    key: string;
    body: {
        /** Import file with JSON encoded object brick definition */
        file: Blob;
    };
};
export type ClassObjectBrickObjectLayoutApiResponse = /** status 200 List of layouts */ {
    totalItems: number;
    items: ObjectBrickLayoutDefinition[];
};
export type ClassObjectBrickObjectLayoutApiArg = {
    /** ObjectId of the element */
    objectId: number;
};
export type ClassObjectBrickGetLayoutByKeyApiResponse =
    /** status 200 Object brick layout definition */ ConfigLayoutDefinition;
export type ClassObjectBrickGetLayoutByKeyApiArg = {
    /** Object brick unique key */
    key: string;
};
export type ClassObjectBrickGetTreeApiResponse = /** status 200 Object brick tree with nodes and folders */ {
    totalItems: number;
    items: (ObjectBrickTreeNodeItem | ObjectBrickTreeNodeFolder)[];
};
export type ClassObjectBrickGetTreeApiArg = void;
export type ClassObjectBrickGetUsagesApiResponse = /** status 200 List of classes and fields using the object brick */ {
    items: ObjectBrickUsageData[];
};
export type ClassObjectBrickGetUsagesApiArg = {
    /** Object brick unique key */
    key: string;
};
export type ClassSelectOptionCreateApiResponse =
    /** status 200 Newly created select option configuration detail */ SelectOptionDetail;
export type ClassSelectOptionCreateApiArg = {
    createSelectOption: SchemaUsedToCreateSelectOptionConfigurations;
};
export type ClassSelectOptionGetApiResponse = /** status 200 Select option configuration detail */ SelectOptionDetail;
export type ClassSelectOptionGetApiArg = {
    /** Select option configuration ID */
    id: string;
};
export type ClassSelectOptionUpdateApiResponse =
    /** status 200 Updated select option configuration detail */ SelectOptionDetail;
export type ClassSelectOptionUpdateApiArg = {
    /** Select option configuration ID */
    id: string;
    updateSelectOption: SchemaUsedToUpdateSelectOptionConfigurations;
};
export type ClassSelectOptionDeleteApiResponse = unknown;
export type ClassSelectOptionDeleteApiArg = {
    /** Select option configuration ID */
    id: string;
};
export type ClassSelectOptionGetTreeApiResponse = /** status 200 Select options data for the tree view */ {
    totalItems: number;
    items: (SelectOptionTreeItem | SelectOptionTreeFolder)[];
};
export type ClassSelectOptionGetTreeApiArg = {
    /** Whether to group the results. */
    withGroup: boolean;
};
export type ClassSelectOptionGetUsagesApiResponse =
    /** status 200 List of classes and fields using the select option configuration */ {
        items: SelectOptionUsageItem[];
    };
export type ClassSelectOptionGetUsagesApiArg = {
    /** Select option configuration ID */
    id: string;
};
export type ClassDefinitionVisibleField = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Field key */
    key: string;
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
export type BulkExportAvailableItem = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Definition type */
    type: string;
    /** Definition name or identifier */
    name: string;
    /** Human-readable display name */
    displayName: string;
    /** Icon identifier */
    icon: string;
};
export type BulkExportParameters = {
    /** Items to export */
    items: {
        /** Type of the item */
        type?: string;
        /** Name of the item */
        name?: string;
    }[];
};
export type BulkImportParameters = {
    /** Items to import from the uploaded file */
    items: {
        /** Type of the item */
        type?: string;
        /** Name of the item */
        name?: string;
    }[];
};
export type BulkImportPrepareResponse = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Unique file identifier for the stored import file */
    fileId: string;
    /** List of importable items found in the file */
    items: BulkExportAvailableItem[];
};
export type ElementIcon = {
    /** Icon type */
    type: "name" | "path";
    /** Icon value */
    value: string;
};
export type ClassDefinitionListItem = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Id of class definition */
    id: string;
    /** Name of class definition */
    name: string;
    /** Title */
    title: string;
    /** icon */
    icon: ElementIcon;
    /** Group */
    group: string | null;
};
export type CustomLayoutsInCompactFormatToBeUsedForEGListings = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Id of custom layout */
    id: string;
    /** Name */
    name: string;
    /** Whether it is the default layout */
    default: boolean;
};
export type ClassLayoutDataInCompactFormatToBeUsedForEGListingInWorkspaces = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Id of layout */
    id: string;
    /** Name */
    name: string;
    /** Whether it is the default layout */
    type: string;
};
export type Layout = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Name */
    name: string;
    /** Data Type */
    datatype: string;
    /** Field Type */
    fieldtype: string;
    /** Type */
    type: string | null;
    /** Layout */
    layout: string | null;
    /** Region */
    region: string | null;
    /** Title */
    title: string | null;
    /** Width */
    width: number;
    /** Height */
    height: number;
    /** Collapsible */
    collapsible: boolean;
    /** Collapsed */
    collapsed: boolean;
    /** Body Style */
    bodyStyle: string | null;
    /** Locked */
    locked: boolean;
    /** Children */
    children: object[];
    /** Icon */
    icon: ElementIcon | null;
    /** Label Align */
    labelAlign: string;
    /** Label Width */
    labelWidth: number;
    /** Border */
    border: boolean;
};
export type CustomLayouts = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Id of custom layout */
    id: string;
    /** Name */
    name: string;
    /** Description */
    description: string;
    /** Creation date timestamp */
    creationDate: number;
    /** Modification date timestamp */
    modificationDate: number;
    /** User id of owner */
    userOwner: number | null;
    /** Class id */
    classId: string;
    /** Whether it is the default layout */
    default: boolean;
    /** Layout definitions */
    layoutDefinition: Layout | null;
};
export type SchemaUsedToUpdateCustomLayouts = {
    /** Layout configuration for fields (Panel, Input, ..) */
    configuration: object;
    /** Values for custom layout object itself */
    values: object;
};
export type SchemaUsedToCreateCustomLayouts = {
    /** Name */
    name: string;
    /** Data object class id */
    classId: number;
};
export type CustomLayoutIdentifierData = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Suggested unique ID for custom layout */
    suggestedId: string;
    /** Array of existing custom layout IDs */
    existingIds: string[];
    /** Array of existing custom layout names */
    existingNames: string[];
};
export type ClassDefinitionObjectBrickField = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Name of the class definition field of type object brick */
    fieldName: string;
};
export type ClassDefinitionObjectBrickData = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key of the object brick */
    key: string;
    /** Name of class definition field */
    fieldName: string;
};
export type SchemaUsedToCreateClassDefinitions = {
    /** Name */
    name: string;
    /** Class definition unique ID */
    uid: string;
};
export type ClassDefinition = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Id of class definition */
    id: string;
    /** Name of class definition */
    name: string;
    /** Title */
    title: string;
    /** Description */
    description: string;
    /** Creation date timestamp */
    creationDate: number | null;
    /** Modification date timestamp */
    modificationDate: number | null;
    /** User id of owner */
    userOwner: number | null;
    /** Namespace of parent class */
    parentClass: string;
    /** Interface implementations */
    implementsInterfaces: string;
    /** List of parent class */
    listingParentClass: string;
    /** Traits usage */
    useTraits: string;
    /** Traits usage listing */
    listingUseTraits: string;
    /** Whether encryption is ued */
    encryption: boolean;
    /** Whether inheritance is allowed */
    allowInherit: boolean;
    /** Whether variants are allowed */
    allowVariants: boolean;
    /** Whether variants are visible in the tree */
    showVariants: boolean;
    /** icon */
    icon: ElementIcon;
    /** Show application logger tab */
    showAppLoggerTab: boolean;
    /** Namespace of link generator */
    linkGeneratorReference: string;
    /** Namespace of preview generator */
    previewGeneratorReference: string;
    /** Composite indices */
    compositeIndices: object;
    /** Show field lookup */
    showFieldLookup: boolean;
    /** Visibility of properties for grid, search, ... */
    propertyVisibility: object;
    /** Whether grid locking is enabled */
    enableGridLocking: boolean;
    /** Blocked variables for export */
    blockedVarsForExport: string[];
    /** Whether the class definition can be written to */
    isWriteable: boolean;
    /** Group */
    group: string | null;
};
export type SchemaUsedToUpdateClassDefinitionConfiguration = {
    /** Layout configuration for fields (Panel, Input, ..) */
    configuration: object;
    /** Values for class definition object itself */
    values: object;
};
export type ClassDefinitionIdentifierData = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Suggested unique ID for the new class definition */
    suggestedId: string;
    /** Array of existing class definition IDs */
    existingIds: string[];
};
export type GridColumnConfiguration = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key */
    key: string;
    /** Define the group structure */
    group: object;
    /** Sortable */
    sortable: boolean;
    /** Editable */
    editable: boolean;
    /** Exportable */
    exportable?: boolean;
    /** Filterable */
    filterable?: boolean;
    /** Localizable */
    localizable: boolean;
    /** Locale */
    locale?: string | null;
    /** Type */
    type: string;
    /** Frontend Type */
    frontendType?: string;
    /** Config */
    config: object;
};
export type ClassDefinitionTreeNodeItem = ClassDefinitionListItem & {
    /** Enable grid locking */
    enableGridLocking: boolean;
    /** Has brick field */
    hasBrickField: boolean;
};
export type ClassDefinitionTreeNodeFolder = ClassDefinitionListItem & {
    /** Child nodes */
    children: ClassDefinitionTreeNodeItem[];
};
export type FieldCollectionConfiguration = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key */
    key: string;
    /** Title */
    title: string;
};
export type FieldCollectionDetail = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key */
    key: string;
    /** Title */
    title: string | null;
    /** Group */
    group: string | null;
    /** Namespace of parent class */
    parentClass: string | null;
    /** Interface implementations */
    implementsInterfaces: string | null;
    /** Blocked variables for export */
    blockedVarsForExport: string[];
    /** Whether the field collection definition can be written to */
    isWriteable: boolean;
};
export type SchemaUsedToCreateFieldCollectionDefinitions = {
    /** Key of the field collection */
    key: string;
};
export type SchemaUsedToUpdateFieldCollectionDefinition = {
    /** Layout configuration for fields (Panel, Input, ..) */
    configuration: object;
    /** Values for field collection definition metadata */
    values: object;
};
export type FieldCollectionLayoutDefinition = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key of Field Collection */
    key: string;
    /** Data Type */
    datatype: string;
    /** Group */
    group?: string | null;
    /** Name */
    name?: string | null;
    /** Type */
    type?: string | null;
    /** Region */
    region?: string | null;
    /** Title */
    title: string | null;
    /** Width */
    width: number;
    /** Height */
    height: number;
    /** Collapsible */
    collapsible: boolean;
    /** collapsed */
    collapsed: boolean;
    /** Children */
    children: object;
};
export type ConfigLayoutDefinition = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Name */
    name: string | null;
    /** Type */
    type: string | null;
    /** Region */
    region: string | null;
    /** Title */
    title: string | null;
    /** Width */
    width: number;
    /** Height */
    height: number;
    /** Collapsible */
    collapsible: boolean;
    /** Collapsed */
    collapsed: boolean;
    /** Body Style */
    bodyStyle: string | null;
    /** Data Type */
    datatype: string;
    /** Children */
    children: object[];
    /** Locked */
    locked: boolean;
    /** Field Type */
    fieldtype: string;
    /** Layout */
    layout: string | null;
    /** Border */
    border: boolean;
    /** Icon */
    icon: string | null;
    /** Label Width */
    labelWidth: number;
    /** Label Align */
    labelAlign: string;
};
export type FieldCollectionTreeNodeItem = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key of field collection */
    key: string;
    /** Name */
    name: string;
    /** icon */
    icon: ElementIcon;
    /** Group name */
    group: string | null;
};
export type FieldCollectionTreeNodeFolder = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key of folder with group_ prefix */
    key: string;
    /** Group name */
    name: string;
    /** icon */
    icon: ElementIcon;
    /** Group */
    group?: string;
    /** Child nodes */
    children: FieldCollectionTreeNodeItem[];
};
export type FieldCollectionUsageData = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Name of the class using the field collection */
    class: string;
    /** Name of the field in the class */
    field: string;
};
export type FieldKeyByType = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Field key */
    key: string;
};
export type ClassInDataObjectFolder = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of class */
    id: string;
    /** Name of class */
    name: string;
    /** Inheritance allowed */
    inheritance: boolean;
};
export type ObjectBrickConfiguration = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key */
    key: string;
    /** Title */
    title: string;
};
export type ObjectBrickDetail = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key */
    key: string;
    /** Title */
    title: string | null;
    /** Group */
    group: string | null;
    /** Namespace of parent class */
    parentClass: string | null;
    /** Interface implementations */
    implementsInterfaces: string | null;
    /** Blocked variables for export */
    blockedVarsForExport: string[];
    /** Whether the object brick definition can be written to */
    isWriteable: boolean;
    /** Class definitions assigned to this object brick */
    classDefinitions: {
        /** Name of the class */
        classname?: string;
        /** Name of the field */
        fieldname?: string;
    }[];
};
export type SchemaUsedToCreateObjectBrickDefinitions = {
    /** Key of the object brick */
    key: string;
};
export type SchemaUsedToUpdateObjectBrickDefinition = {
    /** Layout configuration for fields (Panel, Input, ..) */
    configuration: object;
    /** Values for object brick definition metadata */
    values: object;
};
export type ObjectBrickLayoutDefinition = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key of Object Brick */
    key: string;
    /** Data Type */
    datatype: string;
    /** Name */
    name?: string | null;
    /** Type */
    type?: string | null;
    /** Region */
    region?: string | null;
    /** Title */
    title: string | null;
    /** Width */
    width: number;
    /** Height */
    height: number;
    /** Collapsible */
    collapsible: boolean;
    /** collapsed */
    collapsed: boolean;
    /** Children */
    children: object;
};
export type ObjectBrickTreeNodeItem = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key of object brick */
    key: string;
    /** Name */
    name: string;
    /** icon */
    icon: ElementIcon;
    /** Group name */
    group: string | null;
};
export type ObjectBrickTreeNodeFolder = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key of folder with group_ prefix */
    key: string;
    /** Group name */
    name: string;
    /** icon */
    icon: ElementIcon;
    /** Group */
    group: string;
    /** Child nodes */
    children: ObjectBrickTreeNodeItem[];
};
export type ObjectBrickUsageData = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Name of the class using the object brick */
    class: string;
    /** Name of the field in the class */
    field: string;
};
export type SelectOptionData = {
    /** Value of the select option */
    value: string;
    /** Display label of the select option */
    label: string;
    /** Enum case name of the select option */
    name: string;
};
export type SelectOptionDetail = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of the select options configuration */
    id: string;
    /** Group name */
    group: string | null;
    /** Whether this configuration is restricted to admin */
    adminOnly: boolean;
    /** PHP traits to use */
    useTraits: string;
    /** PHP interfaces to implement */
    implementsInterfaces: string;
    /** Select option entries */
    selectOptions: SelectOptionData[];
    /** Fully qualified enum name */
    enumName: string;
    /** Whether the configuration is writeable */
    isWriteable: boolean;
};
export type SchemaUsedToCreateSelectOptionConfigurations = {
    /** ID of the select options configuration */
    id: string;
};
export type SchemaUsedToUpdateSelectOptionConfigurations = {
    /** Group name */
    group: string | null;
    /** Whether this configuration is restricted to admin */
    adminOnly: boolean;
    /** PHP traits to use */
    useTraits: string;
    /** PHP interfaces to implement */
    implementsInterfaces: string;
    /** Select option entries */
    selectOptions: SelectOptionData[] | null;
};
export type SelectOptionTreeItem = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Id of select option */
    id: string;
    /** Text of select option */
    name: string;
    /** icon */
    icon: ElementIcon;
    /** Group */
    group: string | null;
    /** Only for admin user */
    adminOnly: boolean;
};
export type SelectOptionTreeFolder = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Id of select option */
    id: string;
    /** Text of select option */
    name: string;
    /** icon */
    icon: ElementIcon;
    /** Group */
    group: string | null;
    /** Child nodes */
    children: SelectOptionTreeItem[];
};
export type SelectOptionUsageItem = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Name of the class using the select options */
    class: string;
    /** Name of the field using the select options */
    field: string;
};
export const {
    useClassGetAvailableVisibleFieldsQuery,
    useClassBulkExportAvailableQuery,
    useClassBulkExportMutation,
    useClassBulkImportMutation,
    useClassBulkImportDeleteFileMutation,
    useClassBulkImportPrepareMutation,
    useClassDefinitionCollectionQuery,
    useClassDefinitionCollectionCreatableQuery,
    useClassCustomLayoutCollectionQuery,
    useClassAllLayoutCollectionQuery,
    useClassCustomLayoutGetQuery,
    useClassCustomLayoutUpdateMutation,
    useClassCustomLayoutCreateMutation,
    useClassCustomLayoutDeleteMutation,
    useClassCustomLayoutEditorCollectionQuery,
    useClassCustomLayoutExportQuery,
    useClassCustomLayoutGetIdentifierDataQuery,
    useClassCustomLayoutImportMutation,
    useClassDefinitionGetBrickFieldsQuery,
    useClassDefinitionGetBricksUsagesQuery,
    useClassDefinitionCreateMutation,
    useClassDefinitionGetByIdQuery,
    useClassDefinitionUpdateMutation,
    useClassDefinitionDeleteMutation,
    useClassDefinitionExportQuery,
    useClassDefinitionGetIdentifierDataQuery,
    useClassDefinitionImportMutation,
    useClassDefinitionGetLayoutByIdQuery,
    useClassGetSelectedVisibleFieldsQuery,
    useClassDefinitionGetTextLayoutPreviewQuery,
    useClassDefinitionGetTreeQuery,
    useClassFieldCollectionCollectionQuery,
    useClassFieldCollectionCreateMutation,
    useClassFieldCollectionGetByKeyQuery,
    useClassFieldCollectionUpdateMutation,
    useClassFieldCollectionDeleteMutation,
    useClassFieldCollectionExportQuery,
    useClassFieldCollectionImportMutation,
    useClassFieldCollectionObjectLayoutQuery,
    useClassFieldCollectionGetLayoutByKeyQuery,
    useClassFieldCollectionGetTreeQuery,
    useClassFieldCollectionGetUsagesQuery,
    useClassGetFieldsByTypeQuery,
    useClassDefinitionFolderCollectionQuery,
    useClassDefinitionGetQuery,
    useClassObjectBrickClassesQuery,
    useClassObjectBrickCollectionQuery,
    useClassObjectBrickCreateMutation,
    useClassObjectBrickCustomLayoutGetQuery,
    useClassObjectBrickCustomLayoutUpdateMutation,
    useClassObjectBrickCustomLayoutDeleteMutation,
    useClassObjectBrickCustomLayoutExportQuery,
    useClassObjectBrickCustomLayoutImportMutation,
    useClassObjectBrickGetByKeyQuery,
    useClassObjectBrickUpdateMutation,
    useClassObjectBrickDeleteMutation,
    useClassObjectBrickExportQuery,
    useClassObjectBrickImportMutation,
    useClassObjectBrickObjectLayoutQuery,
    useClassObjectBrickGetLayoutByKeyQuery,
    useClassObjectBrickGetTreeQuery,
    useClassObjectBrickGetUsagesQuery,
    useClassSelectOptionCreateMutation,
    useClassSelectOptionGetQuery,
    useClassSelectOptionUpdateMutation,
    useClassSelectOptionDeleteMutation,
    useClassSelectOptionGetTreeQuery,
    useClassSelectOptionGetUsagesQuery,
} = injectedRtkApi;
