import { api } from "@sdk/api";
export const addTagTypes = ["Recycle Bin"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            recycleBinGetCollection: build.query<RecycleBinGetCollectionApiResponse, RecycleBinGetCollectionApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/recycle-bin/items`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Recycle Bin"],
            }),
            recycleBinDeleteItems: build.mutation<RecycleBinDeleteItemsApiResponse, RecycleBinDeleteItemsApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/recycle-bin/delete`,
                    method: "DELETE",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Recycle Bin"],
            }),
            recycleBinFlush: build.mutation<RecycleBinFlushApiResponse, RecycleBinFlushApiArg>({
                query: () => ({ url: `/pimcore-studio/api/recycle-bin/flush`, method: "DELETE" }),
                invalidatesTags: ["Recycle Bin"],
            }),
            recycleBinRestoreItems: build.mutation<RecycleBinRestoreItemsApiResponse, RecycleBinRestoreItemsApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/recycle-bin/restore`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Recycle Bin"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type RecycleBinGetCollectionApiResponse = /** status 200 Paginated recycle bin items with total count */ {
    totalItems: number;
    items: RecycleBin[];
};
export type RecycleBinGetCollectionApiArg = {
    body: {
        filters?: {
            page?: number;
            pageSize?: number;
            columnFilters?: object;
            sortFilter?: object;
        };
    };
};
export type RecycleBinDeleteItemsApiResponse =
    /** status 201 Successfully created <strong>jobRun</strong> to delete recycle bin items */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type RecycleBinDeleteItemsApiArg = {
    body: {
        items?: number[];
    };
};
export type RecycleBinFlushApiResponse = unknown;
export type RecycleBinFlushApiArg = void;
export type RecycleBinRestoreItemsApiResponse =
    /** status 201 Successfully created <strong>jobRun</strong> to restore recycle bin items */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type RecycleBinRestoreItemsApiArg = {
    body: {
        items?: number[];
    };
};
export type RecycleBin = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number;
    /** Amount */
    amount: number;
    /** Date */
    date: number;
    /** Deleted By */
    deletedBy: string;
    /** Path */
    path: string;
    /** Subtype */
    subtype: string;
    /** Type */
    type: string;
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
export const {
    useRecycleBinGetCollectionQuery,
    useRecycleBinDeleteItemsMutation,
    useRecycleBinFlushMutation,
    useRecycleBinRestoreItemsMutation,
} = injectedRtkApi;
