import { api } from "@sdk/api";
export const addTagTypes = ["GDPR Data Extractor"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            gdprExport: build.query<GdprExportApiResponse, GdprExportApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/gdpr/export-data/${queryArg.id}`,
                    params: {
                        providerKey: queryArg.providerKey,
                    },
                }),
                providesTags: ["GDPR Data Extractor"],
            }),
            gdprListProviders: build.query<GdprListProvidersApiResponse, GdprListProvidersApiArg>({
                query: () => ({ url: `/pimcore-studio/api/gdpr/providers` }),
                providesTags: ["GDPR Data Extractor"],
            }),
            gdprSearchData: build.query<GdprSearchDataApiResponse, GdprSearchDataApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/gdpr/search`,
                    method: "POST",
                    body: queryArg.body,
                    params: {
                        provider: queryArg.provider,
                    },
                }),
                providesTags: ["GDPR Data Extractor"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type GdprExportApiResponse =
    /** status 200 Successfully retrieved the data export as a downloadable JSON file. */ Blob;
export type GdprExportApiArg = {
    /** Id of the element */
    id: number;
    /** The key of the single provider to export */
    providerKey: string;
};
export type GdprListProvidersApiResponse = /** status 200 Successfully retrieved the list of GDPR providers */ {
    totalItems: number;
    items: GdprDataProvider[];
};
export type GdprListProvidersApiArg = void;
export type GdprSearchDataApiResponse =
    /** status 200 Successfully retrieved the list of matching data from all searched providers. */ {
        totalItems: number;
        items: GdprDataRow[];
    };
export type GdprSearchDataApiArg = {
    /** Define the data provider to search in. */
    provider?: string;
    body: {
        filters?: {
            page?: number;
            pageSize?: number;
            columnFilters?: object;
            sortFilter?: object;
        };
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
export type GdprDataProvider = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Unique key of the provider */
    key: string;
    /** Label of the provider */
    label: string;
};
export type GdprDataRow = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Data row values */
    data: object;
};
export const { useGdprExportQuery, useGdprListProvidersQuery, useGdprSearchDataQuery } = injectedRtkApi;
