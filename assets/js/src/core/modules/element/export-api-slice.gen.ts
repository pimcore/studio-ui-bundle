import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Export"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            exportDownloadCsv: build.query<ExportDownloadCsvApiResponse, ExportDownloadCsvApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/export/download/csv/${queryArg.jobRunId}` }),
                providesTags: ["Export"],
            }),
            exportDeleteCsv: build.mutation<ExportDeleteCsvApiResponse, ExportDeleteCsvApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/export/download/csv/${queryArg.jobRunId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Export"],
            }),
            exportCsv: build.mutation<ExportCsvApiResponse, ExportCsvApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/export/csv`, method: "POST", body: queryArg.body }),
                invalidatesTags: ["Export"],
            }),
            exportCsvFolder: build.mutation<ExportCsvFolderApiResponse, ExportCsvFolderApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/export/csv/folder`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Export"],
            }),
            exportDownloadXlsx: build.query<ExportDownloadXlsxApiResponse, ExportDownloadXlsxApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/export/download/xlsx/${queryArg.jobRunId}` }),
                providesTags: ["Export"],
            }),
            exportDeleteXlsx: build.mutation<ExportDeleteXlsxApiResponse, ExportDeleteXlsxApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/export/download/xlsx/${queryArg.jobRunId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Export"],
            }),
            exportXlsx: build.mutation<ExportXlsxApiResponse, ExportXlsxApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/export/xlsx`, method: "POST", body: queryArg.body }),
                invalidatesTags: ["Export"],
            }),
            exportXlsxFolder: build.mutation<ExportXlsxFolderApiResponse, ExportXlsxFolderApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/export/xlsx/folder`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Export"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type ExportDownloadCsvApiResponse = /** status 200 CSV File as attachment */ Blob;
export type ExportDownloadCsvApiArg = {
    /** JobRunId of the JobRun */
    jobRunId: number;
};
export type ExportDeleteCsvApiResponse = /** status 200 Success */ void;
export type ExportDeleteCsvApiArg = {
    /** JobRunId of the JobRun */
    jobRunId: number;
};
export type ExportCsvApiResponse = /** status 201 Successfully created <strong>jobRun</strong> for csv export */ {
    /** ID of created jobRun */
    jobRunId: number;
};
export type ExportCsvApiArg = {
    body: {
        elements?: number[];
        columns?: GridColumnRequest[];
        config?: {
            delimiter?: string;
            header?:
                | "id"
                | "custom_report_config"
                | "custom_report_to_export"
                | "element_to_export"
                | "element_type"
                | "folder_to_export"
                | "grid_export_data"
                | "grid_export_data_info"
                | "config"
                | "columns"
                | "filters"
                | "delimiter"
                | "header"
                | "no_header"
                | "title"
                | "name"
                | "\r\n"
                | "array"
                | "int"
                | "string"
                | "bool";
        };
        elementType?: "data-object" | "object" | "asset" | "document";
    };
};
export type ExportCsvFolderApiResponse = /** status 201 Successfully created <strong>jobRun</strong> for csv export */ {
    /** ID of created jobRun */
    jobRunId: number;
};
export type ExportCsvFolderApiArg = {
    body: {
        folders?: number[];
        columns?: GridColumnRequest[];
        filters?: GridFilter;
        config?: {
            delimiter?: string;
            header?:
                | "id"
                | "custom_report_config"
                | "custom_report_to_export"
                | "element_to_export"
                | "element_type"
                | "folder_to_export"
                | "grid_export_data"
                | "grid_export_data_info"
                | "config"
                | "columns"
                | "filters"
                | "delimiter"
                | "header"
                | "no_header"
                | "title"
                | "name"
                | "\r\n"
                | "array"
                | "int"
                | "string"
                | "bool";
        };
        elementType?: "data-object" | "object" | "asset" | "document";
    };
};
export type ExportDownloadXlsxApiResponse = /** status 200 XLSX File as attachment */ Blob;
export type ExportDownloadXlsxApiArg = {
    /** JobRunId of the JobRun */
    jobRunId: number;
};
export type ExportDeleteXlsxApiResponse = /** status 200 Success */ void;
export type ExportDeleteXlsxApiArg = {
    /** JobRunId of the JobRun */
    jobRunId: number;
};
export type ExportXlsxApiResponse = /** status 201 Successfully created <strong>jobRun</strong> for XLSX export */ {
    /** ID of created jobRun */
    jobRunId: number;
};
export type ExportXlsxApiArg = {
    body: {
        elements?: number[];
        columns?: GridColumnRequest[];
        config?: {
            delimiter?: string;
            header?:
                | "id"
                | "custom_report_config"
                | "custom_report_to_export"
                | "element_to_export"
                | "element_type"
                | "folder_to_export"
                | "grid_export_data"
                | "grid_export_data_info"
                | "config"
                | "columns"
                | "filters"
                | "delimiter"
                | "header"
                | "no_header"
                | "title"
                | "name"
                | "\r\n"
                | "array"
                | "int"
                | "string"
                | "bool";
        };
        elementType?: "data-object" | "object" | "asset" | "document";
    };
};
export type ExportXlsxFolderApiResponse =
    /** status 201 Successfully created <strong>jobRun</strong> for XLSX export */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type ExportXlsxFolderApiArg = {
    body: {
        folders?: number[];
        columns?: GridColumnRequest[];
        filters?: GridFilter;
        config?: {
            delimiter?: string;
            header?:
                | "id"
                | "custom_report_config"
                | "custom_report_to_export"
                | "element_to_export"
                | "element_type"
                | "folder_to_export"
                | "grid_export_data"
                | "grid_export_data_info"
                | "config"
                | "columns"
                | "filters"
                | "delimiter"
                | "header"
                | "no_header"
                | "title"
                | "name"
                | "\r\n"
                | "array"
                | "int"
                | "string"
                | "bool";
        };
        elementType?: "data-object" | "object" | "asset" | "document";
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
    useExportDownloadCsvQuery,
    useExportDeleteCsvMutation,
    useExportCsvMutation,
    useExportCsvFolderMutation,
    useExportDownloadXlsxQuery,
    useExportDeleteXlsxMutation,
    useExportXlsxMutation,
    useExportXlsxFolderMutation,
} = injectedRtkApi;
