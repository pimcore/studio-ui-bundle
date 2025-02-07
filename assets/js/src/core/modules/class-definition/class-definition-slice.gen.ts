import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Class Definition"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            classDefinitionCollection: build.query<
                ClassDefinitionCollectionApiResponse,
                ClassDefinitionCollectionApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/class/collection` }),
                providesTags: ["Class Definition"],
            }),
            classCustomLayoutCollection: build.query<
                ClassCustomLayoutCollectionApiResponse,
                ClassCustomLayoutCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/custom-layout/collection/${queryArg.dataObjectClass}`,
                }),
                providesTags: ["Class Definition"],
            }),
            pimcoreStudioApiClassCustomLayoutCreate: build.mutation<
                PimcoreStudioApiClassCustomLayoutCreateApiResponse,
                PimcoreStudioApiClassCustomLayoutCreateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/${queryArg.customLayoutId}`,
                    method: "POST",
                    body: queryArg.customLayoutNew,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            pimcoreStudioApiClassCustomLayoutGet: build.query<
                PimcoreStudioApiClassCustomLayoutGetApiResponse,
                PimcoreStudioApiClassCustomLayoutGetApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}` }),
                providesTags: ["Class Definition"],
            }),
            pimcoreStudioApiClassCustomLayoutUpdate: build.mutation<
                PimcoreStudioApiClassCustomLayoutUpdateApiResponse,
                PimcoreStudioApiClassCustomLayoutUpdateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`,
                    method: "PUT",
                    body: queryArg.customLayoutUpdate,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            pimcoreStudioApiClassCustomLayoutDelete: build.mutation<
                PimcoreStudioApiClassCustomLayoutDeleteApiResponse,
                PimcoreStudioApiClassCustomLayoutDeleteApiArg
            >({
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
            pimcoreStudioApiClassCustomLayoutExport: build.query<
                PimcoreStudioApiClassCustomLayoutExportApiResponse,
                PimcoreStudioApiClassCustomLayoutExportApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/custom-layout/export/${queryArg.customLayoutId}`,
                }),
                providesTags: ["Class Definition"],
            }),
            pimcoreStudioApiClassCustomLayoutImport: build.mutation<
                PimcoreStudioApiClassCustomLayoutImportApiResponse,
                PimcoreStudioApiClassCustomLayoutImportApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/custom-layout/import/${queryArg.customLayoutId}`,
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
            classDefinitionGet: build.query<ClassDefinitionGetApiResponse, ClassDefinitionGetApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/class/definition/${queryArg.dataObjectClass}` }),
                providesTags: ["Class Definition"],
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
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type ClassDefinitionCollectionApiResponse = /** status 200 List of class definitions */ {
    totalItems: number;
    items: ClassDefinitionListItem[];
};
export type ClassDefinitionCollectionApiArg = void;
export type ClassCustomLayoutCollectionApiResponse =
    /** status 200 List of custom layouts for the given data object class in a simple and compact format for listings.
     */ {
        totalItems: number;
        items: CustomLayoutsInCompactFormatToBeUsedForEGListings[];
    };
export type ClassCustomLayoutCollectionApiArg = {
    /** Data object class */
    dataObjectClass: string;
};
export type PimcoreStudioApiClassCustomLayoutCreateApiResponse = /** status 200 Custom layout created */ CustomLayouts;
export type PimcoreStudioApiClassCustomLayoutCreateApiArg = {
    /** Id of custom layout */
    customLayoutId: string;
    customLayoutNew: SchemaUsedToCreateCustomLayouts;
};
export type PimcoreStudioApiClassCustomLayoutGetApiResponse = /** status 200 Custom layout data */ CustomLayouts;
export type PimcoreStudioApiClassCustomLayoutGetApiArg = {
    /** Id of custom layout */
    customLayoutId: string;
};
export type PimcoreStudioApiClassCustomLayoutUpdateApiResponse = /** status 200 Custom layout updated */ CustomLayouts;
export type PimcoreStudioApiClassCustomLayoutUpdateApiArg = {
    /** Id of custom layout */
    customLayoutId: string;
    customLayoutUpdate: SchemaUsedToUpdateCustomLayouts;
};
export type PimcoreStudioApiClassCustomLayoutDeleteApiResponse = /** status 200 Custom layout deleted */ void;
export type PimcoreStudioApiClassCustomLayoutDeleteApiArg = {
    /** Id of custom layout */
    customLayoutId: string;
};
export type ClassCustomLayoutEditorCollectionApiResponse =
    /** status 200 List of custom layouts for the given data object id */ {
        totalItems: number;
        items: CustomLayoutsInCompactFormatToBeUsedForEGListings[];
    };
export type ClassCustomLayoutEditorCollectionApiArg = {
    /** ObjectId of the element */
    objectId: number;
};
export type PimcoreStudioApiClassCustomLayoutExportApiResponse = /** status 200 Custom layout data as JSON */ Blob;
export type PimcoreStudioApiClassCustomLayoutExportApiArg = {
    /** Id of custom layout */
    customLayoutId: string;
};
export type PimcoreStudioApiClassCustomLayoutImportApiResponse = /** status 200 Http status code */ CustomLayouts;
export type PimcoreStudioApiClassCustomLayoutImportApiArg = {
    /** Id of custom layout */
    customLayoutId: string;
    body: {
        /** Import file to upload */
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
export type ClassDefinitionGetApiResponse = /** status 200 Class definition */ ClassDefinition;
export type ClassDefinitionGetApiArg = {
    /** Data object class */
    dataObjectClass: string;
};
export type ClassObjectBrickObjectLayoutApiResponse = /** status 200 List of layouts */ {
    totalItems: number;
    items: ObjectBrickLayoutDefinition[];
};
export type ClassObjectBrickObjectLayoutApiArg = {
    /** ObjectId of the element */
    objectId: number;
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
    group: any;
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
    userOwner: number;
    /** Class id */
    classId: string;
    /** Whether it is the default layout */
    default: boolean;
    /** Layout definitions */
    layoutDefinition: Layout | null;
};
export type SchemaUsedToCreateCustomLayouts = {
    /** Name */
    name: string;
    /** Data object class id */
    classId: number;
};
export type SchemaUsedToUpdateCustomLayouts = {
    /** Layout configuration for fields (Panel, Input, ..) */
    configuration: object;
    /** Values for custom layout object itself */
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
    group?: any;
    /** Name */
    name?: any;
    /** Type */
    type?: any;
    /** Region */
    region?: any;
    /** Title */
    title: any;
    /** Width */
    width: number;
    /** Height */
    height: number;
    /** Collapsible */
    collapsible: boolean;
    /** collapsed */
    collapsed: boolean;
    /** Children */
    children: any[];
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
    creationDate: number;
    /** Modification date timestamp */
    modificationDate: number;
    /** User id of owner */
    userOwner: number;
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
    compositeIndices: any[];
    /** Show field lookup */
    showFieldLookup: boolean;
    /** Visibility of properties for grid, search, ... */
    propertyVisibility: any[];
    /** Whether grid locking is enabled */
    enableGridLocking: boolean;
    /** Blocked variables for export */
    blockedVarsForExport: string[];
    /** Whether the class definition can be written to */
    isWriteable: boolean;
    /** Group */
    group: any;
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
    name?: any;
    /** Type */
    type?: any;
    /** Region */
    region?: any;
    /** Title */
    title: any;
    /** Width */
    width: number;
    /** Height */
    height: number;
    /** Collapsible */
    collapsible: boolean;
    /** collapsed */
    collapsed: boolean;
    /** Children */
    children: any[];
};
export const {
    useClassDefinitionCollectionQuery,
    useClassCustomLayoutCollectionQuery,
    usePimcoreStudioApiClassCustomLayoutCreateMutation,
    usePimcoreStudioApiClassCustomLayoutGetQuery,
    usePimcoreStudioApiClassCustomLayoutUpdateMutation,
    usePimcoreStudioApiClassCustomLayoutDeleteMutation,
    useClassCustomLayoutEditorCollectionQuery,
    usePimcoreStudioApiClassCustomLayoutExportQuery,
    usePimcoreStudioApiClassCustomLayoutImportMutation,
    useClassFieldCollectionObjectLayoutQuery,
    useClassDefinitionGetQuery,
    useClassObjectBrickObjectLayoutQuery,
} = injectedRtkApi;
