import { api } from "@sdk/api";
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
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/perspectives/widgets/configurations`,
                    params: {
                        skipWrapperWidgets: queryArg.skipWrapperWidgets,
                    },
                }),
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
export type PerspectiveCreateApiResponse = unknown;
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
export type PerspectiveUpdateConfigByIdApiResponse = unknown;
export type PerspectiveUpdateConfigByIdApiArg = {
    /** Update perspective by matching Id */
    perspectiveId: string;
    savePerspectiveConfig: CreatePerspectiveConfig;
};
export type PerspectiveDeleteApiResponse = unknown;
export type PerspectiveDeleteApiArg = {
    /** Get perspective by matching Id */
    perspectiveId: string;
};
export type PerspectiveWidgetCreateApiResponse = unknown;
export type PerspectiveWidgetCreateApiArg = {
    /** Create widget by matching widget type */
    widgetType: string;
    body: {
        data: {
            name?: string | null;
        };
    };
};
export type PerspectiveWidgetGetConfigCollectionApiResponse = /** status 200 List of widget configurations */ {
    totalItems: number;
    items: WidgetConfig[];
};
export type PerspectiveWidgetGetConfigCollectionApiArg = {
    /** Skip wrapper widget configurations */
    skipWrapperWidgets?: boolean;
};
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
export type PerspectiveWidgetUpdateConfigByIdApiResponse = unknown;
export type PerspectiveWidgetUpdateConfigByIdApiArg = {
    /** Update widget by matching widget Id */
    widgetId: string;
    /** Update widget by matching widget type */
    widgetType: string;
    body: {
        data: {
            name?: string | null;
        };
    };
};
export type PerspectiveWidgetDeleteApiResponse = unknown;
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
    /** If widget is only wrapper of another configuration */
    onlyWrapper: boolean;
};
export type RelatedElementData = {
    /** ID */
    id: number;
    /** Type of the element */
    type: string;
    /** Subtype of the element */
    subtype: string;
    /** Full path of the element */
    fullPath: string;
    /** Is the element published */
    isPublished: boolean | null;
};
export type ElementTreeWidget = WidgetConfig & {
    /** Context Permissions */
    contextPermissions: object;
    /** Element Type */
    elementType: string;
    /** Data of root folder element */
    rootFolder: RelatedElementData;
    /** Show Root */
    showRoot: boolean;
    /** Classes */
    classes: object;
    /** PQL */
    pql: string | null;
    /** Page size */
    pageSize: number | null;
    /** Is Writeable */
    isWriteable: boolean;
};
export type PerspectiveConfigDetail = PerspectiveConfig & {
    /** Context Permissions */
    contextPermissions: object;
    /** Widgets Left */
    widgetsLeft: ElementTreeWidget[];
    /** Widgets Right */
    widgetsRight: ElementTreeWidget[];
    /** Widgets Bottom */
    widgetsBottom: ElementTreeWidget[];
    /** Left Expanded Widget */
    expandedLeft: string | null;
    /** Right Expanded Widget */
    expandedRight: string | null;
};
export type CreatePerspectiveConfig = AddPerspectiveConfig & {
    /** Icon */
    icon: ElementIcon;
    /** Context Permissions */
    contextPermissions: object;
    /** Widgets Left */
    widgetsLeft: object;
    /** Widgets Right */
    widgetsRight: object;
    /** Widgets Bottom */
    widgetsBottom: object;
    /** Left Expanded Widget */
    expandedLeft: string | null;
    /** Right Expanded Widget */
    expandedRight: string | null;
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
