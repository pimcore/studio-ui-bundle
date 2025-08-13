import { api } from "@sdk/api";
export const addTagTypes = ["Bundle Custom Reports"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            customReportsListDrillDownOptions: build.query<
                CustomReportsListDrillDownOptionsApiResponse,
                CustomReportsListDrillDownOptionsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/bundle/custom-reports/drill-down-options`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Bundle Custom Reports"],
            }),
            customReportsChart: build.query<CustomReportsChartApiResponse, CustomReportsChartApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/bundle/custom-reports/chart`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Bundle Custom Reports"],
            }),
            customReportsConfigAdd: build.mutation<CustomReportsConfigAddApiResponse, CustomReportsConfigAddApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/bundle/custom-reports/config/add`,
                    method: "POST",
                    body: queryArg.bundleCustomReportAdd,
                }),
                invalidatesTags: ["Bundle Custom Reports"],
            }),
            customReportsConfigClone: build.mutation<
                CustomReportsConfigCloneApiResponse,
                CustomReportsConfigCloneApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/bundle/custom-reports/config/clone/${queryArg.name}`,
                    method: "POST",
                    body: queryArg.bundleCustomReportClone,
                }),
                invalidatesTags: ["Bundle Custom Reports"],
            }),
            customReportsColumnConfigList: build.mutation<
                CustomReportsColumnConfigListApiResponse,
                CustomReportsColumnConfigListApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/bundle/custom-reports/column-config/${queryArg.name}`,
                    method: "POST",
                    body: queryArg.bundleCustomReportsDataSourceConfig,
                }),
                invalidatesTags: ["Bundle Custom Reports"],
            }),
            customReportsConfigUpdate: build.mutation<
                CustomReportsConfigUpdateApiResponse,
                CustomReportsConfigUpdateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/bundle/custom-reports/config/${queryArg.name}`,
                    method: "PUT",
                    body: queryArg.bundleCustomReportUpdate,
                }),
                invalidatesTags: ["Bundle Custom Reports"],
            }),
            customReportsConfigDelete: build.mutation<
                CustomReportsConfigDeleteApiResponse,
                CustomReportsConfigDeleteApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/bundle/custom-reports/config/${queryArg.name}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Bundle Custom Reports"],
            }),
            customReportsReport: build.query<CustomReportsReportApiResponse, CustomReportsReportApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/bundle/custom-reports/report/${queryArg.name}` }),
                providesTags: ["Bundle Custom Reports"],
            }),
            customReportsConfigGetTree: build.query<
                CustomReportsConfigGetTreeApiResponse,
                CustomReportsConfigGetTreeApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/bundle/custom-reports/tree/config`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                    },
                }),
                providesTags: ["Bundle Custom Reports"],
            }),
            customReportExportCsv: build.mutation<CustomReportExportCsvApiResponse, CustomReportExportCsvApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/bundle/custom-reports/export/csv`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Bundle Custom Reports"],
            }),
            customReportsGetTree: build.query<CustomReportsGetTreeApiResponse, CustomReportsGetTreeApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/bundle/custom-reports/tree`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                    },
                }),
                providesTags: ["Bundle Custom Reports"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type CustomReportsListDrillDownOptionsApiResponse = /** status 200 List of drill down options for the report */ {
    items: BundleCustomReportsDrillDownOption[];
};
export type CustomReportsListDrillDownOptionsApiArg = {
    body: {
        name: string | null;
        field: string | null;
        filters?: {
            columnFilters?: object;
            drillDownFilters?: object;
        };
    };
};
export type CustomReportsChartApiResponse =
    /** status 200 Chart data as JSON. The actual data depends on the selected adapter in the report configuration. */ {
        totalItems: number;
        items: BundleCustomReportsChartData[];
    };
export type CustomReportsChartApiArg = {
    body: {
        name: string | null;
        filters?: {
            columnFilters?: object;
            drillDownFilters?: object;
        };
        /** Sort by field. */
        sortBy?: string;
        /** Sort order (ASC or DESC). */
        sortOrder?: string;
        /** Page of the report data */
        page?: number;
        /** Page size of the report data */
        pageSize?: number;
        /** Fields to be included in the chart data. If not provided, all fields will be included. */
        fields?: string[];
    };
};
export type CustomReportsConfigAddApiResponse =
    /** status 200 Successfully added custom report configuration */ BundleCustomReportsDetails;
export type CustomReportsConfigAddApiArg = {
    bundleCustomReportAdd: BundleCustomReportAdd;
};
export type CustomReportsConfigCloneApiResponse =
    /** status 200 Successfully cloned custom report configuration */ BundleCustomReportsDetails;
export type CustomReportsConfigCloneApiArg = {
    /** Name of the report to clone */
    name: string;
    bundleCustomReportClone: BundleCustomReportClone;
};
export type CustomReportsColumnConfigListApiResponse =
    /** status 200 List of column configurations for the custom report */ {
        items: BundleCustomReportsColumnInformation[];
    };
export type CustomReportsColumnConfigListApiArg = {
    /** Name of the report */
    name: string;
    bundleCustomReportsDataSourceConfig: BundleCustomReportsDataSourceConfig;
};
export type CustomReportsConfigUpdateApiResponse =
    /** status 200 Successfully updated custom report configuration */ BundleCustomReportsDetails;
export type CustomReportsConfigUpdateApiArg = {
    /** Name of the report */
    name: string;
    bundleCustomReportUpdate: BundleCustomReportUpdate;
};
export type CustomReportsConfigDeleteApiResponse = unknown;
export type CustomReportsConfigDeleteApiArg = {
    /** Name of the custom report to delete */
    name: string;
};
export type CustomReportsReportApiResponse = /** status 200 Report data as JSON */ BundleCustomReportsDetails;
export type CustomReportsReportApiArg = {
    /** Name of the report */
    name: string;
};
export type CustomReportsConfigGetTreeApiResponse =
    /** status 200 Get all reports for the current user to display in configuration tree. */ {
        items?: BundleCustomReportsConfigurationTreeNode[];
    };
export type CustomReportsConfigGetTreeApiArg = {
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
};
export type CustomReportExportCsvApiResponse =
    /** status 201 Successfully created <strong>jobRun</strong> for csv export */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type CustomReportExportCsvApiArg = {
    body: {
        name: string | null;
        filters?: {
            columnFilters?: object;
            drillDownFilters?: object;
        };
        /** Sort by field. */
        sortBy?: string;
        /** Sort order (ASC or DESC). */
        sortOrder?: string;
        /** Page of the report data */
        page?: number;
        /** Page size of the report data */
        pageSize?: number;
        includeHeaders?: boolean;
        delimiter?: string;
    };
};
export type CustomReportsGetTreeApiResponse =
    /** status 200 Get all reports for the current user to display in tree. */ {
        items?: BundleCustomReportsTreeNode[];
    };
export type CustomReportsGetTreeApiArg = {
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
};
export type BundleCustomReportsDrillDownOption = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** name */
    name: string | number;
    /** value */
    value: string | number | null;
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
export type BundleCustomReportsChartData = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Chart data depending on the adapter in the report configuration. */
    data: object;
};
export type BundleCustomReportsColumnConfiguration = {
    /** Name */
    name: string;
    /** Display column */
    display: boolean;
    /** Whether the column should be included in exports */
    export: boolean;
    /** Order */
    order: boolean;
    /** Label/display name of column */
    label: string;
    /** Action of the column */
    action: string;
    /** Id */
    id: string;
    /** Width of the column */
    width: number | null;
    /** Display type of the column */
    displayType: string | null;
    /** Type of the filter */
    filterType: string | null;
    /** Drilldown filter */
    filterDrilldown: string | null;
};
export type BundleCustomReportsDetails = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Name */
    name: string;
    /** Sql */
    sql: string;
    /** Configuration for columns to be displayed in report */
    columnConfigurations: BundleCustomReportsColumnConfiguration[];
    /** Label/nice name of report */
    niceName: string;
    /** Group of the report */
    group?: string;
    /** Group icon class */
    groupIconClass: string;
    /** Icon class */
    iconClass: string;
    /** Whether the report has a shortcut in the menu */
    menuShortcut: boolean;
    /** Report class of custom report implementation */
    reportClass: string;
    /** Chart type */
    chartType: string;
    /** Modification date time stamp */
    modificationDate: number;
    /** Creation date time stamp */
    creationDate: number;
    /** Array with user names the report is shared with */
    sharedUserNames: string[];
    /** Array with roles the report is shared with */
    sharedRoleNames: string[];
    /** Whether the report is shared globally */
    sharedGlobally: boolean;
    /** Whether the report is writeable */
    writeable: boolean;
    /** Configuration for data source. Content of array depends on selected adapter/data source */
    dataSourceConfig: object | null;
    /** Data column for pie chart */
    pieColumn: string | null;
    /** Label of data column for pie chart */
    pieLabelColumn: string | null;
    /** X axis column names */
    xAxis: string | null;
    /** Y axis column information */
    yAxis: string[] | null;
};
export type BundleCustomReportAdd = {
    /** Name of the new custom report */
    name: string;
};
export type BundleCustomReportClone = {
    /** New name the cloned custom report */
    newName: string;
};
export type BundleCustomReportsColumnInformation = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Name */
    name: string;
    /** Disable order by */
    disableOrderBy: boolean;
    /** Disable filterable */
    disableFilterable: boolean;
    /** Disable dropdown filterable */
    disableDropdownFilterable: boolean;
    /** Disable label */
    disableLabel: boolean;
};
export type BundleCustomReportsDataSourceConfig = {
    /** Configuration for data source. Content of array depends on selected adapter/data source */
    configuration: object;
};
export type BundleCustomReportUpdate = {
    /** Sql */
    sql: string;
    /** Configuration for columns to be displayed in report */
    columnConfigurations: BundleCustomReportsColumnConfiguration[];
    /** Label/nice name of report */
    niceName: string;
    /** Group of the report */
    group: string;
    /** Group icon class */
    groupIconClass: string;
    /** Icon class */
    iconClass: string;
    /** Whether the report has a shortcut in the menu */
    menuShortcut: boolean;
    /** Report class of custom report implementation */
    reportClass: string;
    /** Chart type */
    chartType: string;
    /** Array with user names the report is shared with */
    sharedUserNames: string[];
    /** Array with roles the report is shared with */
    sharedRoleNames: string[];
    /** Whether the report is shared globally */
    sharedGlobally: boolean;
    /** Configuration for data source. Content of array depends on selected adapter/data source */
    dataSourceConfig: object;
    /** Data column for pie chart */
    pieColumn: string | null;
    /** Label of data column for pie chart */
    pieLabelColumn: string | null;
    /** X axis column names */
    xAxis: string | null;
    /** Y axis column information */
    yAxis: string[] | null;
};
export type BundleCustomReportsConfigurationTreeNode = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** id */
    id: string;
    /** text */
    text: string;
    /** css class */
    cls: string;
    /** writeable */
    writeable: boolean;
};
export type BundleCustomReportsTreeNode = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** report name */
    name: string;
    /** nice name */
    niceName: string;
    /** icon class */
    iconClass: string;
    /** group */
    group: string;
    /** group icon class */
    groupIconClass: string;
    /** menu shortcut */
    menuShortcut: boolean;
    /** report class */
    reportClass: string;
};
export const {
    useCustomReportsListDrillDownOptionsQuery,
    useCustomReportsChartQuery,
    useCustomReportsConfigAddMutation,
    useCustomReportsConfigCloneMutation,
    useCustomReportsColumnConfigListMutation,
    useCustomReportsConfigUpdateMutation,
    useCustomReportsConfigDeleteMutation,
    useCustomReportsReportQuery,
    useCustomReportsConfigGetTreeQuery,
    useCustomReportExportCsvMutation,
    useCustomReportsGetTreeQuery,
} = injectedRtkApi;
