import { api } from "@sdk/api";
export const addTagTypes = ["Custom Reports"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            customReportsChart: build.query<CustomReportsChartApiResponse, CustomReportsChartApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/custom-reports/chart`,
                    params: {
                        name: queryArg.name,
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        sortOrder: queryArg.sortOrder,
                        sortBy: queryArg.sortBy,
                        filter: queryArg.filter,
                        reportOffset: queryArg.reportOffset,
                        reportLimit: queryArg.reportLimit,
                    },
                }),
                providesTags: ["Custom Reports"],
            }),
            customReportsConfigGetTree: build.query<
                CustomReportsConfigGetTreeApiResponse,
                CustomReportsConfigGetTreeApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/custom-reports/tree/config`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                    },
                }),
                providesTags: ["Custom Reports"],
            }),
            customReportExportCsv: build.mutation<CustomReportExportCsvApiResponse, CustomReportExportCsvApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/custom-report/export/csv`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Custom Reports"],
            }),
            customReportsReport: build.query<CustomReportsReportApiResponse, CustomReportsReportApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/custom-reports/report/${queryArg.name}` }),
                providesTags: ["Custom Reports"],
            }),
            customReportsGetTree: build.query<CustomReportsGetTreeApiResponse, CustomReportsGetTreeApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/custom-reports/tree`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                    },
                }),
                providesTags: ["Custom Reports"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type CustomReportsChartApiResponse =
    /** status 200 Chart data as JSON. The actual data depends on the selected adapter in the report configuration. */ {
        items?: CustomReportChartData[];
    };
export type CustomReportsChartApiArg = {
    /** Name of the report */
    name: string;
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Sort order (asc or desc). */
    sortOrder?: "ASC" | "DESC";
    /** Sort by column parameter */
    sortBy?: string;
    /** Filter for chart data */
    filter?: string;
    /** Offset of the report data */
    reportOffset?: number;
    /** Limit of the report data */
    reportLimit?: number;
};
export type CustomReportsConfigGetTreeApiResponse =
    /** status 200 Get all reports for the current user to display in configuration tree. */ {
        items?: CustomReportConfigurationTreeNode[];
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
        name?: string;
        sortOrder?: string;
        sortBy?: string;
        filter?: string;
        reportLimit?: number;
        reportOffset?: number;
        includeHeaders?: boolean;
    };
};
export type CustomReportsReportApiResponse = /** status 200 Report data as JSON */ CustomReportDetails;
export type CustomReportsReportApiArg = {
    /** Name of the report */
    name: string;
};
export type CustomReportsGetTreeApiResponse =
    /** status 200 Get all reports for the current user to display in tree. */ {
        items?: CustomReportTreeNode[];
    };
export type CustomReportsGetTreeApiArg = {
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
};
export type CustomReportChartData = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Chart data depending on the adapter in the report configuration. */
    data: object;
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
export type CustomReportConfigurationTreeNode = {
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
export type CustomReportColumnConfiguration = {
    /** Name */
    name?: string;
    /** Display name of column */
    display?: boolean;
    /** Whether the column should be included in exports */
    export?: boolean;
    /** Order */
    order?: boolean;
    /** Label/display name of column */
    label?: string;
    /** Id */
    id?: string;
};
export type CustomReportDetails = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Name */
    name: string;
    /** Sql */
    sql: string;
    /** Configuration for data source. Content of array depends on selected adapter/data source */
    dataSourceConfig: object;
    /** Configuration for columns to be displayed in report */
    columnConfigurations: CustomReportColumnConfiguration[];
    /** Label/nice name of report */
    niceName: string;
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
    /** Data column for pie chart */
    pieColumn: string | null;
    /** Label of data column for pie chart */
    pieLabelColumn: string | null;
    /** X axis column names */
    xAxis: string[] | null;
    /** Y axis column information */
    yAxis: string[] | null;
};
export type CustomReportTreeNode = {
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
    useCustomReportsChartQuery,
    useCustomReportsConfigGetTreeQuery,
    useCustomReportExportCsvMutation,
    useCustomReportsReportQuery,
    useCustomReportsGetTreeQuery,
} = injectedRtkApi;
