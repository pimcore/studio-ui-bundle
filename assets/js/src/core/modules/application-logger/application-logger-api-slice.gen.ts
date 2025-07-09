import { api } from "@sdk/api";
export const addTagTypes = ["Bundle Application Logger"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            bundleApplicationLoggerGetCollection: build.query<
                BundleApplicationLoggerGetCollectionApiResponse,
                BundleApplicationLoggerGetCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/bundle/application-logger/list`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Bundle Application Logger"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type BundleApplicationLoggerGetCollectionApiResponse =
    /** status 200 Paginated log entries with total count as header param as JSON */ {
        totalItems: number;
        items: BundleApplicationLoggerLogEntry[];
    };
export type BundleApplicationLoggerGetCollectionApiArg = {
    body: {
        filters?: {
            page?: number;
            pageSize?: number;
            columnFilters?: object;
            sortFilter?: object;
        };
    };
};
export type BundleApplicationLoggerLogEntry = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number;
    /** Log priority level */
    priority: number;
    /** Date */
    date: string | null;
    /** PID */
    pid: number | null;
    /** Message */
    message: string | null;
    /** File object path */
    fileObject: string | null;
    /** ID of related object */
    relatedObjectId: number | null;
    /** Type of related object */
    relatedObjectType: string | null;
    /** Component */
    component: string | null;
    /** Source */
    source: string | null;
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
export const { useBundleApplicationLoggerGetCollectionQuery } = injectedRtkApi;
