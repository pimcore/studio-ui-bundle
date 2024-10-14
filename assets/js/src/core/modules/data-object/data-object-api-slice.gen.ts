import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Data Objects", "Data Object Grid"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            dataObjectAdd: build.mutation<DataObjectAddApiResponse, DataObjectAddApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/data-objects/add/${queryArg.parentId}`,
                    method: "POST",
                    body: queryArg.dataObjectAddParameters,
                }),
                invalidatesTags: ["Data Objects"],
            }),
            dataObjectClone: build.mutation<DataObjectCloneApiResponse, DataObjectCloneApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/data-objects/${queryArg.id}/clone/${queryArg.parentId}`,
                    method: "POST",
                    body: queryArg.cloneParameters,
                }),
                invalidatesTags: ["Data Objects"],
            }),
            dataObjectGetById: build.query<DataObjectGetByIdApiResponse, DataObjectGetByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/data-objects/${queryArg.id}` }),
                providesTags: ["Data Objects"],
            }),
            dataObjectUpdateById: build.mutation<DataObjectUpdateByIdApiResponse, DataObjectUpdateByIdApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/data-objects/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Data Objects"],
            }),
            dataObjectGetAvailableGridColumns: build.query<
                DataObjectGetAvailableGridColumnsApiResponse,
                DataObjectGetAvailableGridColumnsApiArg
            >({
                query: (queryArg) => ({
                    url: `/studio/api/data-object/grid/available-columns/${queryArg.classId}/folderId`,
                }),
                providesTags: ["Data Object Grid"],
            }),
            dataObjectGetGrid: build.mutation<DataObjectGetGridApiResponse, DataObjectGetGridApiArg>({
                query: (queryArg) => ({ url: `/studio/api/data-objects/grid`, method: "POST", body: queryArg.body }),
                invalidatesTags: ["Data Object Grid"],
            }),
            dataObjectPatchById: build.mutation<DataObjectPatchByIdApiResponse, DataObjectPatchByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/data-objects`, method: "PATCH", body: queryArg.body }),
                invalidatesTags: ["Data Objects"],
            }),
            dataObjectReplaceContent: build.mutation<
                DataObjectReplaceContentApiResponse,
                DataObjectReplaceContentApiArg
            >({
                query: (queryArg) => ({
                    url: `/studio/api/data-objects/${queryArg.sourceId}/replace/${queryArg.targetId}`,
                    method: "POST",
                }),
                invalidatesTags: ["Data Objects"],
            }),
            dataObjectGetTree: build.query<DataObjectGetTreeApiResponse, DataObjectGetTreeApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/data-objects/tree`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        parentId: queryArg.parentId,
                        idSearchTerm: queryArg.idSearchTerm,
                        excludeFolders: queryArg.excludeFolders,
                        path: queryArg.path,
                        pathIncludeParent: queryArg.pathIncludeParent,
                        pathIncludeDescendants: queryArg.pathIncludeDescendants,
                        className: queryArg.className,
                    },
                }),
                providesTags: ["Data Objects"],
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
            parentId?: number | null;
            index?: number | null;
            key?: string | null;
            locked?: string | null;
            childrenSortBy?: string | null;
            childrenSortOrder?: string | null;
            published?: boolean | null;
            properties?: UpdateDataProperty[] | null;
        };
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
        columns?: GridColumnData[];
    }[];
};
export type DataObjectGetGridApiArg = {
    body: {
        folderId: number;
        columns: GridColumnRequest[];
        filters?: GridFilter;
    };
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
            parentId?: number | null;
            index?: number | null;
            key?: string | null;
            locked?: string | null;
            childrenSortBy?: string | null;
            childrenSortOrder?: string | null;
            published?: boolean | null;
        }[];
    };
};
export type DataObjectReplaceContentApiResponse = /** status 200 Successfully replaced content of data object */ void;
export type DataObjectReplaceContentApiArg = {
    /** SourceId of the data-object */
    sourceId: number;
    /** TargetId of the data-object */
    targetId: number;
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
    /** Filter folders from result. */
    excludeFolders?: boolean;
    /** Filter by path. */
    path?: string;
    /** Include the parent item in the result. */
    pathIncludeParent?: boolean;
    /** Include all descendants in the result. */
    pathIncludeDescendants?: boolean;
    /** Filter by class. */
    className?:
        | "CustomerSegmentGroup"
        | "CustomerSegment"
        | "TermSegmentBuilderDefinition"
        | "LinkActivityDefinition"
        | "test"
        | "AccessoryPart"
        | "BodyStyle"
        | "Category"
        | "Car"
        | "Customer"
        | "FilterDefinition"
        | "OnlineShopOrder"
        | "OnlineShopOrderItem"
        | "OnlineShopTaxClass"
        | "OnlineShopVoucherSeries"
        | "OnlineShopVoucherToken"
        | "OfferToolCustomProduct"
        | "OfferToolOffer"
        | "OfferToolOfferItem"
        | "Event"
        | "Manufacturer"
        | "News"
        | "PortalUser"
        | "PortalUserGroup";
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
    icon?: ElementIcon;
    /** ID of owner */
    userOwner: number;
    /** User that modified the element */
    userModification: number;
    /** Locked */
    locked: string | null;
    /** Is locked */
    isLocked: boolean;
    /** Creation date */
    creationDate: number | null;
    /** Modification date */
    modificationDate: number | null;
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
    localizedEdit?: string | null;
    /** Localized View */
    localizedView?: string | null;
    /** Layouts */
    layouts?: string | null;
};
export type DataObject = Element & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    customAttributes?: CustomAttributes;
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
};
export type DataObjectFolder = DataObject;
export type UpdateDataProperty = {
    /** key */
    key: string;
    /** data */
    data: any | null;
    /** type */
    type: string;
    /** inheritable */
    inheritable: boolean;
};
export type GridColumnConfiguration = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** Key */
    key: string;
    /** Group */
    group: string;
    /** Sortable */
    sortable: boolean;
    /** Editable */
    editable: boolean;
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
export type GridColumnData = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** Key */
    key?: string;
    /** Locale */
    locale?: string | null;
    /** Value */
    value?: any | null;
};
export type GridColumnRequest = {
    /** Key */
    key: string;
    /** Locale */
    locale?: string | null;
    /** Type */
    type: string;
    /** Group */
    group?: string | null;
    /** Config */
    config: string[];
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
export const {
    useDataObjectAddMutation,
    useDataObjectCloneMutation,
    useDataObjectGetByIdQuery,
    useDataObjectUpdateByIdMutation,
    useDataObjectGetAvailableGridColumnsQuery,
    useDataObjectGetGridMutation,
    useDataObjectPatchByIdMutation,
    useDataObjectReplaceContentMutation,
    useDataObjectGetTreeQuery,
} = injectedRtkApi;
