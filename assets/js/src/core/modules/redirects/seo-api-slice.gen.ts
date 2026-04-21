import { api } from "@sdk/api";
export const addTagTypes = ["Bundle Seo"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            bundleSeoRedirectAdd: build.mutation<BundleSeoRedirectAddApiResponse, BundleSeoRedirectAddApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/bundle/seo/redirects/add`,
                    method: "POST",
                    body: queryArg.bundleSeoRedirectAdd,
                }),
                invalidatesTags: ["Bundle Seo"],
            }),
            bundleSeoRedirectCleanup: build.mutation<
                BundleSeoRedirectCleanupApiResponse,
                BundleSeoRedirectCleanupApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/bundle/seo/redirects/cleanup`, method: "DELETE" }),
                invalidatesTags: ["Bundle Seo"],
            }),
            bundleSeoRedirectsGetCollection: build.query<
                BundleSeoRedirectsGetCollectionApiResponse,
                BundleSeoRedirectsGetCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/bundle/seo/redirects`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Bundle Seo"],
            }),
            bundleSeoRedirectUpdateById: build.mutation<
                BundleSeoRedirectUpdateByIdApiResponse,
                BundleSeoRedirectUpdateByIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/bundle/seo/redirects/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.bundleSeoRedirectUpdate,
                }),
                invalidatesTags: ["Bundle Seo"],
            }),
            bundleSeoRedirectDelete: build.mutation<BundleSeoRedirectDeleteApiResponse, BundleSeoRedirectDeleteApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/bundle/seo/redirects/${queryArg.id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Bundle Seo"],
            }),
            bundleSeoRedirectsExport: build.query<BundleSeoRedirectsExportApiResponse, BundleSeoRedirectsExportApiArg>({
                query: () => ({ url: `/pimcore-studio/api/bundle/seo/redirects/export` }),
                providesTags: ["Bundle Seo"],
            }),
            bundleSeoRedirectsImport: build.mutation<
                BundleSeoRedirectsImportApiResponse,
                BundleSeoRedirectsImportApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/bundle/seo/redirects/import`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Bundle Seo"],
            }),
            bundleSeoRedirectListPriorities: build.query<
                BundleSeoRedirectListPrioritiesApiResponse,
                BundleSeoRedirectListPrioritiesApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/bundle/seo/redirects/priorities` }),
                providesTags: ["Bundle Seo"],
            }),
            bundleSeoRedirectListStatuses: build.query<
                BundleSeoRedirectListStatusesApiResponse,
                BundleSeoRedirectListStatusesApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/bundle/seo/redirects/statuses` }),
                providesTags: ["Bundle Seo"],
            }),
            bundleSeoRedirectListTypes: build.query<
                BundleSeoRedirectListTypesApiResponse,
                BundleSeoRedirectListTypesApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/bundle/seo/redirects/types` }),
                providesTags: ["Bundle Seo"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type BundleSeoRedirectAddApiResponse = /** status 200 New redirect data as JSON */ BundleSeoRedirect;
export type BundleSeoRedirectAddApiArg = {
    bundleSeoRedirectAdd: BundleSeoRedirectAdd;
};
export type BundleSeoRedirectCleanupApiResponse = unknown;
export type BundleSeoRedirectCleanupApiArg = void;
export type BundleSeoRedirectsGetCollectionApiResponse =
    /** status 200 Paginated redirects with total count as header param as JSON */ {
        totalItems: number;
        items: BundleSeoRedirect[];
    };
export type BundleSeoRedirectsGetCollectionApiArg = {
    body: {
        filters?: {
            page?: number;
            pageSize?: number;
            columnFilters?: object;
            sortFilter?: object;
        };
    };
};
export type BundleSeoRedirectUpdateByIdApiResponse = /** status 200 Successfully updated redirect */ BundleSeoRedirect;
export type BundleSeoRedirectUpdateByIdApiArg = {
    /** Id of the redirect */
    id: number;
    bundleSeoRedirectUpdate: BundleSeoRedirectUpdate;
};
export type BundleSeoRedirectDeleteApiResponse = unknown;
export type BundleSeoRedirectDeleteApiArg = {
    /** Id of the redirect */
    id: number;
};
export type BundleSeoRedirectsExportApiResponse = /** status 200 CSV file with redirects as attachment */ Blob;
export type BundleSeoRedirectsExportApiArg = void;
export type BundleSeoRedirectsImportApiResponse =
    /** status 200 Import statistics data as JSON */ BundleSeoRedirectsImportStatistics;
export type BundleSeoRedirectsImportApiArg = {
    body: {
        /** CSV import file to upload */
        file: Blob;
    };
};
export type BundleSeoRedirectListPrioritiesApiResponse = /** status 200 List of available redirect priorities */ {
    /** Redirect priority used in the PimcoreSeoBundle. */
    priorities: number[];
};
export type BundleSeoRedirectListPrioritiesApiArg = void;
export type BundleSeoRedirectListStatusesApiResponse = /** status 200 List of available redirect statuses */ {
    /** List of redirect statuses used in the PimcoreSeoBundle. */
    statuses: BundleSeoRedirectStatus[];
};
export type BundleSeoRedirectListStatusesApiArg = void;
export type BundleSeoRedirectListTypesApiResponse = /** status 200 List of available redirect types */ {
    /** List of redirect types used in the PimcoreSeoBundle. */
    types: string[];
};
export type BundleSeoRedirectListTypesApiArg = void;
export type BundleSeoRedirect = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number | null;
    /** Type of redirect */
    type: string;
    /** Source URL */
    source: string | null;
    /** ID of the source site */
    sourceSite: number | null;
    /** Whether to pass through parameters */
    passThroughParameters: boolean;
    /** Target URL */
    target: string | null;
    /** ID of the target site */
    targetSite: number | null;
    /** Status code */
    statusCode: number;
    /** Priority */
    priority: number;
    /** Whether the redirect uses regex */
    regex: boolean | null;
    /** Whether the redirect is active */
    active: boolean;
    /** Expiry date in timestamp format */
    expiry: number | null;
    /** Creation date in timestamp format */
    creationDate: number | null;
    /** Modification date in timestamp format */
    modificationDate: number | null;
    /** ID of the user who owns the redirect */
    userOwner: number | null;
    /** ID of the user who last modified the redirect */
    userModification: number | null;
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
export type BundleSeoRedirectAdd = {
    /** Type of redirect */
    type: string;
    /** Source URL */
    source: string | null;
    /** Target URL */
    target: string | null;
};
export type BundleSeoRedirectUpdate = {
    /** Type of redirect */
    type: string;
    /** ID of the source site */
    sourceSite: number | null;
    /** Source URL */
    source: string | null;
    /** ID of the target site */
    targetSite: number | null;
    /** Target URL */
    target: string | null;
    /** Status code */
    statusCode: number;
    /** Priority */
    priority: number;
    /** Whether the redirect uses regex */
    regex: boolean;
    /** Whether the redirect is active */
    active: boolean;
    /** Whether to pass through parameters */
    passThroughParameters: boolean;
    /** Expiry date in timestamp format */
    expiry: number | null;
};
export type BundleSeoRedirectsImportStatistics = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Number of total redirects */
    total: number;
    /** Number of imported redirects */
    imported: number;
    /** Number of created redirects */
    created: number;
    /** Number of updated redirects */
    updated: number;
    /** Number of errored redirects */
    errored: number;
    /** List of errors where index is the index of import line */
    errors: object[];
};
export type BundleSeoRedirectStatus = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Status code */
    code: number;
    /** Status label */
    label: string;
};
export const {
    useBundleSeoRedirectAddMutation,
    useBundleSeoRedirectCleanupMutation,
    useBundleSeoRedirectsGetCollectionQuery,
    useBundleSeoRedirectUpdateByIdMutation,
    useBundleSeoRedirectDeleteMutation,
    useBundleSeoRedirectsExportQuery,
    useBundleSeoRedirectsImportMutation,
    useBundleSeoRedirectListPrioritiesQuery,
    useBundleSeoRedirectListStatusesQuery,
    useBundleSeoRedirectListTypesQuery,
} = injectedRtkApi;
