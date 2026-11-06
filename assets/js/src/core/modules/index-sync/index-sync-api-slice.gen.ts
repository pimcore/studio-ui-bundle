import { api } from "@sdk/api";
export const addTagTypes = ["Index Sync"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            indexSyncStart: build.mutation<IndexSyncStartApiResponse, IndexSyncStartApiArg>({
                query: () => ({ url: `/pimcore-studio/api/index-sync`, method: "POST" }),
                invalidatesTags: ["Index Sync"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type IndexSyncStartApiResponse =
    /** status 201 A job run was created to synchronize the search index asynchronously */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type IndexSyncStartApiArg = void;
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
export const { useIndexSyncStartMutation } = injectedRtkApi;
