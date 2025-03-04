import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Perspectives"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            perspectiveCreate: build.mutation<PerspectiveCreateApiResponse, PerspectiveCreateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/perspectives/configuration`,
                    method: "POST",
                    body: queryArg.addPerspectiveConfig,
                }),
                invalidatesTags: ["Perspectives"],
            }),
            perspectiveGetConfigCollection: build.query<
                PerspectiveGetConfigCollectionApiResponse,
                PerspectiveGetConfigCollectionApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/perspectives/configurations` }),
                providesTags: ["Perspectives"],
            }),
            perspectiveGetConfigById: build.query<PerspectiveGetConfigByIdApiResponse, PerspectiveGetConfigByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/perspectives/configuration/${queryArg.perspectiveId}`,
                }),
                providesTags: ["Perspectives"],
            }),
            perspectiveUpdateConfigById: build.mutation<
                PerspectiveUpdateConfigByIdApiResponse,
                PerspectiveUpdateConfigByIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/perspectives/configuration/${queryArg.perspectiveId}`,
                    method: "PUT",
                    body: queryArg.savePerspectiveConfig,
                }),
                invalidatesTags: ["Perspectives"],
            }),
            perspectiveDelete: build.mutation<PerspectiveDeleteApiResponse, PerspectiveDeleteApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/perspectives/configuration/${queryArg.perspectiveId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Perspectives"],
            }),
            perspectiveWidgetCreate: build.mutation<PerspectiveWidgetCreateApiResponse, PerspectiveWidgetCreateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/perspectives/widgets/${queryArg.widgetType}/configuration`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Perspectives"],
            }),
            perspectiveWidgetGetConfigCollection: build.query<
                PerspectiveWidgetGetConfigCollectionApiResponse,
                PerspectiveWidgetGetConfigCollectionApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/perspectives/widgets/configurations` }),
                providesTags: ["Perspectives"],
            }),
            perspectiveWidgetGetConfigById: build.query<
                PerspectiveWidgetGetConfigByIdApiResponse,
                PerspectiveWidgetGetConfigByIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/perspectives/widgets/${queryArg.widgetType}/configuration/${queryArg.widgetId}`,
                }),
                providesTags: ["Perspectives"],
            }),
            perspectiveWidgetUpdateConfigById: build.mutation<
                PerspectiveWidgetUpdateConfigByIdApiResponse,
                PerspectiveWidgetUpdateConfigByIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/perspectives/widgets/${queryArg.widgetType}/configuration/${queryArg.widgetId}`,
                    method: "PUT",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Perspectives"],
            }),
            perspectiveWidgetDelete: build.mutation<PerspectiveWidgetDeleteApiResponse, PerspectiveWidgetDeleteApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/perspectives/widgets/${queryArg.widgetType}/configuration/${queryArg.widgetId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Perspectives"],
            }),
            perspectiveWidgetGetTypeCollection: build.query<
                PerspectiveWidgetGetTypeCollectionApiResponse,
                PerspectiveWidgetGetTypeCollectionApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/perspectives/widgets/types` }),
                providesTags: ["Perspectives"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type PerspectiveCreateApiResponse = /** status 200 Id of the new perspective */ void;
export type PerspectiveCreateApiArg = {
    addPerspectiveConfig: AddPerspectiveConfig;
};
export type PerspectiveGetConfigCollectionApiResponse = /** status 200 List of perspective configurations */ {
    totalItems: number;
    items: PerspectiveConfig[];
};
export type PerspectiveGetConfigCollectionApiArg = void;
export type PerspectiveGetConfigByIdApiResponse =
    /** status 200 Perspective configuration data as JSON */ PerspectiveConfigDetail;
export type PerspectiveGetConfigByIdApiArg = {
    /** Get perspective by matching Id */
    perspectiveId: string;
};
export type PerspectiveUpdateConfigByIdApiResponse =
    /** status 200 Successfully updated perspective configuration */ void;
export type PerspectiveUpdateConfigByIdApiArg = {
    /** Update perspective by matching Id */
    perspectiveId: string;
    savePerspectiveConfig: CreatePerspectiveConfig;
};
export type PerspectiveDeleteApiResponse = /** status 200 Successfully deleted perspective */ void;
export type PerspectiveDeleteApiArg = {
    /** Get perspective by matching Id */
    perspectiveId: string;
};
export type PerspectiveWidgetCreateApiResponse = /** status 200 Id of the new widget */ void;
export type PerspectiveWidgetCreateApiArg = {
    /** Create widget by matching widget type */
    widgetType: string;
    body: {
        data: {
            name?: any;
        };
    };
};
export type PerspectiveWidgetGetConfigCollectionApiResponse = /** status 200 List of widget configurations */ {
    totalItems: number;
    items: WidgetConfig[];
};
export type PerspectiveWidgetGetConfigCollectionApiArg = void;
export type PerspectiveWidgetGetConfigByIdApiResponse = /** status 200 Widget configuration data as JSON */ {
    /** Data of the widget configuration */
    data: string;
};
export type PerspectiveWidgetGetConfigByIdApiArg = {
    /** Filter widgets by matching widget Id */
    widgetId: string;
    /** Filter widgets by matching widget type */
    widgetType: string;
};
export type PerspectiveWidgetUpdateConfigByIdApiResponse =
    /** status 200 Successfully updated widget configuration */ void;
export type PerspectiveWidgetUpdateConfigByIdApiArg = {
    /** Update widget by matching widget Id */
    widgetId: string;
    /** Update widget by matching widget type */
    widgetType: string;
    body: {
        data: {
            name?: any;
        };
    };
};
export type PerspectiveWidgetDeleteApiResponse = /** status 200 Successfully deleted widget */ void;
export type PerspectiveWidgetDeleteApiArg = {
    /** Filter widgets by matching widget Id */
    widgetId: string;
    /** Filter widgets by matching widget type */
    widgetType: string;
};
export type PerspectiveWidgetGetTypeCollectionApiResponse = /** status 200 List of widget types */ {
    items: WidgetType[];
};
export type PerspectiveWidgetGetTypeCollectionApiArg = void;
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
export type AddPerspectiveConfig = {
    /** Name */
    name: string;
};
export type ElementIcon = {
    /** Icon type */
    type: "name" | "path";
    /** Icon value */
    value: string;
};
export type PerspectiveConfig = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Perspective ID */
    id: string;
    /** Name */
    name: string;
    /** Icon */
    icon: ElementIcon;
    /** Is Writeable */
    isWriteable: boolean;
};
export type WidgetConfig = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Widget ID */
    id: string;
    /** Name */
    name: string;
    /** Widget Type */
    widgetType: string;
    /** Icon */
    icon: ElementIcon;
};
export type SaveAssetContextPermissions = {
    /** Hide Add Menu */
    hideAdd: boolean;
    /** Add Upload */
    addUpload: boolean;
    /** Upload New Version */
    uploadNewVersion: boolean;
    /** Add Upload Zip */
    addUploadZip: boolean;
    /** Download */
    download: boolean;
    /** Download Zip */
    downloadZip: boolean;
    /** Add Folder */
    addFolder: boolean;
    /** Copy */
    copy: boolean;
    /** Cut */
    cut: boolean;
    /** Delete */
    delete: boolean;
    /** Lock */
    lock: boolean;
    /** Lock And Propagate */
    lockAndPropagate: boolean;
    /** Paste */
    paste: boolean;
    /** Paste Cut */
    pasteCut: boolean;
    /** Refresh */
    refresh: boolean;
    /** Rename */
    rename: boolean;
    /** SearchAndMove */
    searchAndMove: boolean;
    /** Unlock */
    unlock: boolean;
    /** Unlock And Propagate */
    unlockAndPropagate: boolean;
};
export type AssetContextPermissions = SaveAssetContextPermissions & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
};
export type SaveDataObjectContextPermissions = {
    /** Add */
    add: boolean;
    /** Add Folder */
    addFolder: boolean;
    /** Change Children SortBy */
    changeChildrenSortBy: boolean;
    /** Copy */
    copy: boolean;
    /** Cut */
    cut: boolean;
    /** Delete */
    delete: boolean;
    /** Lock */
    lock: boolean;
    /** Lock and Propagate */
    lockAndPropagate: boolean;
    /** Paste */
    paste: boolean;
    /** Publish */
    publish: boolean;
    /** Refresh */
    refresh: boolean;
    /** Rename */
    rename: boolean;
    /** Search and Move */
    searchAndMove: boolean;
    /** Unlock */
    unlock: boolean;
    /** Unlock and Propagate */
    unlockAndPropagate: boolean;
    /** Unpublish */
    unpublish: boolean;
};
export type DataObjectContextPermissions = SaveDataObjectContextPermissions & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
};
export type SaveDocumentContextPermissions = {
    /** Add */
    add: boolean;
    /** Add E-Mail */
    addEmail: boolean;
    /** Add Folder */
    addFolder: boolean;
    /** Add Hardlink */
    addHardlink: boolean;
    /** Add Headless Document */
    addHeadlessDocument: boolean;
    /** Add Link */
    addLink: boolean;
    /** Add Newsletter */
    addNewsletter: boolean;
    /** Add Print Page */
    addPrintPage: boolean;
    /** Add Snippet */
    addSnippet: boolean;
    /** Convert */
    convert: boolean;
    /** Copy */
    copy: boolean;
    /** Cut */
    cut: boolean;
    /** Delete */
    delete: boolean;
    /** Edit Site */
    editSite: boolean;
    /** Lock */
    lock: boolean;
    /** Lock and Propagate */
    lockAndPropagate: boolean;
    /** Open */
    open: boolean;
    /** Paste */
    paste: boolean;
    /** Paste Cut */
    pasteCut: boolean;
    /** Publish */
    publish: boolean;
    /** Refresh */
    refresh: boolean;
    /** Remove Site */
    removeSite: boolean;
    /** Rename */
    rename: boolean;
    /** Search and Move */
    searchAndMove: boolean;
    /** Unlock */
    unlock: boolean;
    /** Unlock and Propagate */
    unlockAndPropagate: boolean;
    /** Unpublish */
    unpublish: boolean;
    /** Use As Site */
    useAsSite: boolean;
};
export type DocumentContextPermissions = SaveDocumentContextPermissions & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
};
export type ElementTreeWidget = WidgetConfig & {
    /** Context Permissions */
    contextPermissions?: AssetContextPermissions | DataObjectContextPermissions | DocumentContextPermissions;
    /** Element Type */
    elementType?: string;
    /** Root Folder */
    rootFolder?: string;
    /** Root Folder ID */
    rootFolderId?: number;
    /** Show Root */
    showRoot?: boolean;
    /** Classes */
    classes?: object;
    /** PQL */
    pql?: any;
    /** Page size */
    pageSize?: any;
    /** Is Writeable */
    isWriteable?: boolean;
};
export type PerspectiveConfigDetail = PerspectiveConfig & {
    /** Context Permissions */
    contextPermissions?: object;
    /** Widgets Left */
    widgetsLeft?: ElementTreeWidget[];
    /** Widgets Right */
    widgetsRight?: ElementTreeWidget[];
    /** Widgets Bottom */
    widgetsBottom?: ElementTreeWidget[];
    /** Left Expanded Widget */
    expandedLeft?: any;
    /** Right Expanded Widget */
    expandedRight?: any;
};
export type CreatePerspectiveConfig = AddPerspectiveConfig & {
    /** Icon */
    icon?: ElementIcon;
    /** Context Permissions */
    contextPermissions?: object;
    /** Widgets Left */
    widgetsLeft?: object;
    /** Widgets Right */
    widgetsRight?: object;
    /** Widgets Bottom */
    widgetsBottom?: object;
    /** Left Expanded Widget */
    expandedLeft?: any;
    /** Right Expanded Widget */
    expandedRight?: any;
};
export type WidgetType = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** id */
    id: string;
};
export const {
    usePerspectiveCreateMutation,
    usePerspectiveGetConfigCollectionQuery,
    usePerspectiveGetConfigByIdQuery,
    usePerspectiveUpdateConfigByIdMutation,
    usePerspectiveDeleteMutation,
    usePerspectiveWidgetCreateMutation,
    usePerspectiveWidgetGetConfigCollectionQuery,
    usePerspectiveWidgetGetConfigByIdQuery,
    usePerspectiveWidgetUpdateConfigByIdMutation,
    usePerspectiveWidgetDeleteMutation,
    usePerspectiveWidgetGetTypeCollectionQuery,
} = injectedRtkApi;
