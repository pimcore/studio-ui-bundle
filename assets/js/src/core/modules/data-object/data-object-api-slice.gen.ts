import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Data Objects", "Data Object Grid", "Search"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            dataObjectAdd: build.mutation<DataObjectAddApiResponse, DataObjectAddApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-objects/add/${queryArg.parentId}`,
                    method: "POST",
                    body: queryArg.dataObjectAddParameters,
                }),
                invalidatesTags: ["Data Objects"],
            }),
            dataObjectClone: build.mutation<DataObjectCloneApiResponse, DataObjectCloneApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-objects/${queryArg.id}/clone/${queryArg.parentId}`,
                    method: "POST",
                    body: queryArg.cloneParameters,
                }),
                invalidatesTags: ["Data Objects"],
            }),
            dataObjectGetById: build.query<DataObjectGetByIdApiResponse, DataObjectGetByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/data-objects/${queryArg.id}` }),
                providesTags: ["Data Objects"],
            }),
            dataObjectUpdateById: build.mutation<DataObjectUpdateByIdApiResponse, DataObjectUpdateByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-objects/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Data Objects"],
            }),
            dataObjectDeleteGridConfigurationByConfigurationId: build.mutation<
                DataObjectDeleteGridConfigurationByConfigurationIdApiResponse,
                DataObjectDeleteGridConfigurationByConfigurationIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-object/grid/configuration/${queryArg.configurationId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Data Object Grid"],
            }),
            dataObjectGetGridConfiguration: build.query<
                DataObjectGetGridConfigurationApiResponse,
                DataObjectGetGridConfigurationApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-object/grid/configuration/${queryArg.folderId}/${queryArg.classId}`,
                    params: { configurationId: queryArg.configurationId },
                }),
                providesTags: ["Data Object Grid"],
            }),
            dataObjectListSavedGridConfigurations: build.query<
                DataObjectListSavedGridConfigurationsApiResponse,
                DataObjectListSavedGridConfigurationsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-object/grid/configurations/${queryArg.classId}`,
                }),
                providesTags: ["Data Object Grid"],
            }),
            dataObjectSaveGridConfiguration: build.mutation<
                DataObjectSaveGridConfigurationApiResponse,
                DataObjectSaveGridConfigurationApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-object/grid/configuration/save/${queryArg.classId}`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Data Object Grid"],
            }),
            dataObjectSetGridConfigurationAsFavorite: build.mutation<
                DataObjectSetGridConfigurationAsFavoriteApiResponse,
                DataObjectSetGridConfigurationAsFavoriteApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-object/grid/configuration/set-as-favorite/${queryArg.configurationId}/${queryArg.folderId}`,
                    method: "POST",
                }),
                invalidatesTags: ["Data Object Grid"],
            }),
            dataObjectUpdateGridConfiguration: build.mutation<
                DataObjectUpdateGridConfigurationApiResponse,
                DataObjectUpdateGridConfigurationApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-object/grid/configuration/update/${queryArg.configurationId}`,
                    method: "PUT",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Data Object Grid"],
            }),
            dataObjectGetAvailableGridColumns: build.query<
                DataObjectGetAvailableGridColumnsApiResponse,
                DataObjectGetAvailableGridColumnsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-object/grid/available-columns/${queryArg.classId}/${queryArg.folderId}`,
                }),
                providesTags: ["Data Object Grid"],
            }),
            dataObjectGetGrid: build.query<DataObjectGetGridApiResponse, DataObjectGetGridApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-objects/grid/${queryArg.classId}`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Data Object Grid"],
            }),
            dataObjectGetLayoutById: build.query<DataObjectGetLayoutByIdApiResponse, DataObjectGetLayoutByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-objects/${queryArg.id}/layout/${queryArg.layoutId}`,
                }),
                providesTags: ["Data Objects"],
            }),
            dataObjectPatchById: build.mutation<DataObjectPatchByIdApiResponse, DataObjectPatchByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-objects`,
                    method: "PATCH",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Data Objects"],
            }),
            dataObjectPatchFolderById: build.mutation<
                DataObjectPatchFolderByIdApiResponse,
                DataObjectPatchFolderByIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-objects/folder`,
                    method: "PATCH",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Data Objects"],
            }),
            dataObjectFormatPath: build.mutation<DataObjectFormatPathApiResponse, DataObjectFormatPathApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-objects/format-path`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Data Objects"],
            }),
            dataObjectPreviewById: build.query<DataObjectPreviewByIdApiResponse, DataObjectPreviewByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-objects/preview/${queryArg.id}`,
                    params: { site: queryArg.site },
                }),
                providesTags: ["Data Objects"],
            }),
            dataObjectReplaceContent: build.mutation<
                DataObjectReplaceContentApiResponse,
                DataObjectReplaceContentApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-objects/${queryArg.sourceId}/replace/${queryArg.targetId}`,
                    method: "POST",
                }),
                invalidatesTags: ["Data Objects"],
            }),
            dataObjectGetSelectOptions: build.mutation<
                DataObjectGetSelectOptionsApiResponse,
                DataObjectGetSelectOptionsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-objects/select-options`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Data Objects"],
            }),
            dataObjectGetTree: build.query<DataObjectGetTreeApiResponse, DataObjectGetTreeApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/data-objects/tree`,
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
                        className: queryArg.className,
                        classIds: queryArg.classIds,
                    },
                }),
                providesTags: ["Data Objects"],
            }),
            dataObjectGetSearchConfiguration: build.query<
                DataObjectGetSearchConfigurationApiResponse,
                DataObjectGetSearchConfigurationApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/search/configuration/data-objects`,
                    params: { classId: queryArg.classId },
                }),
                providesTags: ["Search"],
            }),
            dataObjectGetSearch: build.query<DataObjectGetSearchApiResponse, DataObjectGetSearchApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/search/data-objects`,
                    method: "POST",
                    body: queryArg.body,
                    params: { classId: queryArg.classId },
                }),
                providesTags: ["Search"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type DataObjectAddApiResponse = /** status 200 ID of added data object */ {
    /** ID of created data object */
    id: number;
};
export type DataObjectAddApiArg = {
    /** ParentId of the data-object */
    parentId: number;
    dataObjectAddParameters: DataObjectAdd;
};
export type DataObjectCloneApiResponse =
    /** status 200 Successfully copied data object */ void | /** status 201 Successfully copied parent data object and created <strong>jobRun</strong> for copying child objects */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type DataObjectCloneApiArg = {
    /** Id of the data-object */
    id: number;
    /** ParentId of the data-object */
    parentId: number;
    cloneParameters: DataObjectCloneParameters;
};
export type DataObjectGetByIdApiResponse = /** status 200 Successfully retrieved data object data as JSON */
    | DataObject
    | DataObjectFolder;
export type DataObjectGetByIdApiArg = {
    /** Id of the data-object */
    id: number;
};
export type DataObjectUpdateByIdApiResponse = /** status 200 Successfully updated data object */
    | DataObject
    | DataObjectFolder;
export type DataObjectUpdateByIdApiArg = {
    /** Id of the data-object */
    id: number;
    body: {
        data: {
            parentId?: any;
            index?: any;
            key?: any;
            useDraftData?: any;
            task?: "autoSave" | "publish" | "save" | "unpublish" | "version";
            locked?: any;
            childrenSortBy?: any;
            childrenSortOrder?: any;
            published?: any;
            editableData?: any;
            properties?: UpdateDataProperty[];
        };
    };
};
export type DataObjectDeleteGridConfigurationByConfigurationIdApiResponse =
    /** status 200 Success */ GridDetailedConfiguration;
export type DataObjectDeleteGridConfigurationByConfigurationIdApiArg = {
    /** ConfigurationId of the element */
    configurationId: number;
};
export type DataObjectGetGridConfigurationApiResponse =
    /** status 200 data_object_get_grid_configuration_success_response */ GridDetailedConfiguration;
export type DataObjectGetGridConfigurationApiArg = {
    /** FolderId of the element */
    folderId: number;
    /** Class Id of the data object */
    classId: string;
    /** Configuration ID */
    configurationId?: number;
};
export type DataObjectListSavedGridConfigurationsApiResponse =
    /** status 200 List of saved grid configurations for data objects */ {
        totalItems: number;
        items: GridConfiguration[];
    };
export type DataObjectListSavedGridConfigurationsApiArg = {
    /** Class Id of the data object */
    classId: string;
};
export type DataObjectSaveGridConfigurationApiResponse =
    /** status 200 Data Object grid configuration saved successfully */ GridConfiguration;
export type DataObjectSaveGridConfigurationApiArg = {
    /** Class Id of the data object */
    classId: string;
    body: {
        folderId: number;
        pageSize: number;
        name: string;
        description: string;
        shareGlobal?: boolean;
        setAsFavorite?: boolean;
        saveFilter?: boolean;
        sharedUsers?: object;
        sharedRoles?: object;
        columns: Column[];
        filter?: GridFilter | null;
    };
};
export type DataObjectSetGridConfigurationAsFavoriteApiResponse =
    /** status 200 data_object_set_grid_configuration_as_favorite_response */ void;
export type DataObjectSetGridConfigurationAsFavoriteApiArg = {
    /** ConfigurationId of the configurationId */
    configurationId: number;
    /** FolderId of the folderId */
    folderId: number;
};
export type DataObjectUpdateGridConfigurationApiResponse =
    /** status 200 Data Object grid configuration updated successfully */ void;
export type DataObjectUpdateGridConfigurationApiArg = {
    /** ConfigurationId of the configurationId */
    configurationId: number;
    body: {
        folderId: number;
        pageSize: number;
        name: string;
        description: string;
        shareGlobal?: boolean;
        setAsFavorite?: boolean;
        saveFilter?: boolean;
        sharedUsers?: object;
        sharedRoles?: object;
        columns: Column[];
        filter?: GridFilter | null;
    };
};
export type DataObjectGetAvailableGridColumnsApiResponse =
    /** status 200 List of available grid columns for data objects */ {
        columns?: GridColumnConfiguration[];
    };
export type DataObjectGetAvailableGridColumnsApiArg = {
    /** Identifies the class name for which the columns should be retrieved. */
    classId: string;
    /** FolderId of the element */
    folderId: number;
};
export type DataObjectGetGridApiResponse = /** status 200 Data object grid data */ {
    totalItems: number;
    items: {
        id?: number;
        columns?: GridColumnData[];
        isLocked?: boolean;
        permissions?: Permissions;
    }[];
};
export type DataObjectGetGridApiArg = {
    /** Identifies the class name for which the the grid should be build. */
    classId: string;
    body: {
        folderId: number;
        columns: GridColumnRequest[];
        filters?: GridFilter;
    };
};
export type DataObjectGetLayoutByIdApiResponse =
    /** status 200 Successfully retrieved data object layout data as JSON */ Layout;
export type DataObjectGetLayoutByIdApiArg = {
    /** Id of the data-object */
    id: number;
    /** ID to get specific layout */
    layoutId?: string;
};
export type DataObjectPatchByIdApiResponse =
    /** status 200 Successfully patched data object */ void | /** status 201 Successfully created jobRun for patching multiple data objects */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type DataObjectPatchByIdApiArg = {
    body: {
        data: {
            /** Data Object ID */
            id: number;
            parentId?: any;
            index?: any;
            key?: any;
            task?: "autoSave" | "publish" | "save" | "unpublish" | "version";
            locked?: any;
            childrenSortBy?: any;
            childrenSortOrder?: any;
            published?: any;
            editableData?: any;
        }[];
    };
};
export type DataObjectPatchFolderByIdApiResponse =
    /** status 201 Successfully created jobRun for patching multiple data objects */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type DataObjectPatchFolderByIdApiArg = {
    body: {
        data: {
            /** Folder ID */
            folderId: number;
            parentId?: any;
            index?: any;
            key?: any;
            locked?: any;
            childrenSortBy?: any;
            childrenSortOrder?: any;
            published?: any;
            editableData?: any;
        }[];
        filters?: GridFilter;
    };
};
export type DataObjectFormatPathApiResponse = /** status 200 Formatted path of the objects */ {
    totalItems: number;
    items: SelectOption[];
};
export type DataObjectFormatPathApiArg = {
    body: {
        objectId: number;
        targets: object;
        context: object;
    };
};
export type DataObjectPreviewByIdApiResponse = unknown;
export type DataObjectPreviewByIdApiArg = {
    /** Id of the data object */
    id: number;
    /** Site ID */
    site?: any;
};
export type DataObjectReplaceContentApiResponse = /** status 200 Successfully replaced content of data object */ void;
export type DataObjectReplaceContentApiArg = {
    /** SourceId of the data-object */
    sourceId: number;
    /** TargetId of the data-object */
    targetId: number;
};
export type DataObjectGetSelectOptionsApiResponse = /** status 200 List of dynamic select options */ {
    totalItems: number;
    items: SelectOption2[];
};
export type DataObjectGetSelectOptionsApiArg = {
    body: {
        objectId: number;
        fieldName: string;
        changedData?: object;
        context: object;
    };
};
export type DataObjectGetTreeApiResponse =
    /** status 200 Paginated data objects with total count as header param as JSON */ {
        totalItems: number;
        items: (DataObject | DataObjectFolder)[];
    };
export type DataObjectGetTreeApiArg = {
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Filter data objects by parent id. */
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
    /** When provided, the search is executed on the specific data object class index. */
    className?: string;
    /** Filter results based on the provided class IDs. */
    classIds?: string;
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
export type DataObjectAdd = {
    /** Key */
    key: string;
    /** Class Id */
    classId: string;
    /** Type */
    type: "object" | "variant";
};
export type DataObjectCloneParameters = {
    /** Recursive */
    recursive: boolean;
    /** Update References */
    updateReferences: boolean;
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
    userModification: number;
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
export type DataObjectPermissions = Permissions & {
    /** Save */
    save?: boolean;
    /** Unpublish */
    unpublish?: boolean;
    /** Localized Edit */
    localizedEdit?: any;
    /** Localized View */
    localizedView?: any;
};
export type DataObjectDraftData = {
    /** ID */
    id: number;
    /** Modification date */
    modificationDate: number;
    /** Is auto save */
    isAutoSave: boolean;
};
export type DataObject = Element & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Inheritance allowed */
    allowInheritance?: boolean;
    /** Variants allowed */
    allowVariants?: boolean;
    /** Show variants */
    showVariants?: boolean;
    /** Has preview */
    hasPreview?: boolean;
    /** Custom attributes for the tree */
    customAttributes?: CustomAttributes;
    /** Has workflow available */
    hasWorkflowAvailable?: boolean;
    /** Key */
    key?: string;
    /** Class name */
    className?: string;
    /** Type */
    type?: string;
    /** Published */
    published?: boolean;
    /** Has children */
    hasChildren?: boolean;
    /** Workflow permissions */
    hasWorkflowWithPermissions?: boolean;
    /** Full path */
    fullPath?: string;
    permissions?: DataObjectPermissions;
    /** Custom index */
    index?: number;
    /** Sort mode of children */
    childrenSortBy?: string;
    /** Sort order of children */
    childrenSortOrder?: string;
    /** Detail object data */
    objectData?: object;
    /** Inheritance object data */
    inheritanceData?: object;
    draftData?: DataObjectDraftData | null;
};
export type DataObjectFolder = DataObject;
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
export type GridConfiguration = {
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
};
export type GridColumnConfiguration = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key */
    key: string;
    /** Group */
    group: string;
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
    locale?: any;
    /** Type */
    type: string;
    /** Frontend Type */
    frontendType?: string;
    /** Config */
    config: object;
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
export type Layout = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Name */
    name: string;
    /** Data Type */
    dataType: string;
    /** Field Type */
    fieldType: string;
    /** Type */
    type: any;
    /** Layout */
    layout: any;
    /** Region */
    region: any;
    /** Title */
    title: any;
    /** Width */
    width: number;
    /** Height */
    height: number;
    /** Collapsible */
    collapsible: boolean;
    /** Collapsed */
    collapsed: boolean;
    /** Body Style */
    bodyStyle: any;
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
export type SelectOption = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Object Reference */
    objectReference: string;
    /** Formated Path */
    formatedPath: string;
};
export type SelectOption2 = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key */
    key: string;
    /** Value */
    value: string;
};
export const {
    useDataObjectAddMutation,
    useDataObjectCloneMutation,
    useDataObjectGetByIdQuery,
    useDataObjectUpdateByIdMutation,
    useDataObjectDeleteGridConfigurationByConfigurationIdMutation,
    useDataObjectGetGridConfigurationQuery,
    useDataObjectListSavedGridConfigurationsQuery,
    useDataObjectSaveGridConfigurationMutation,
    useDataObjectSetGridConfigurationAsFavoriteMutation,
    useDataObjectUpdateGridConfigurationMutation,
    useDataObjectGetAvailableGridColumnsQuery,
    useDataObjectGetGridQuery,
    useDataObjectGetLayoutByIdQuery,
    useDataObjectPatchByIdMutation,
    useDataObjectPatchFolderByIdMutation,
    useDataObjectFormatPathMutation,
    useDataObjectPreviewByIdQuery,
    useDataObjectReplaceContentMutation,
    useDataObjectGetSelectOptionsMutation,
    useDataObjectGetTreeQuery,
    useDataObjectGetSearchConfigurationQuery,
    useDataObjectGetSearchQuery,
} = injectedRtkApi;
