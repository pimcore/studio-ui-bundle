import { api } from "@sdk/api";
export const addTagTypes = ["Execution Engine"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            executionEngineAbortJobRunById: build.mutation<
                ExecutionEngineAbortJobRunByIdApiResponse,
                ExecutionEngineAbortJobRunByIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/execution-engine/abort/${queryArg.jobRunId}`,
                    method: "POST",
                }),
                invalidatesTags: ["Execution Engine"],
            }),
            executionEngineHideJobRuns: build.mutation<
                ExecutionEngineHideJobRunsApiResponse,
                ExecutionEngineHideJobRunsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/execution-engine/hide`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Execution Engine"],
            }),
            executionEngineListJobs: build.query<ExecutionEngineListJobsApiResponse, ExecutionEngineListJobsApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/execution-engine/running-jobs`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Execution Engine"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type ExecutionEngineAbortJobRunByIdApiResponse = unknown;
export type ExecutionEngineAbortJobRunByIdApiArg = {
    /** JobRunId of the JobRun */
    jobRunId: number;
};
export type ExecutionEngineHideJobRunsApiResponse = unknown;
export type ExecutionEngineHideJobRunsApiArg = {
    body: {
        jobRunIds?: number[];
    };
};
export type ExecutionEngineListJobsApiResponse = /** status 200 List of studio jobs */ {
    totalItems: number;
    items: JobRun[];
};
export type ExecutionEngineListJobsApiArg = {
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
export type JobRun = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number;
    /** Owner ID */
    ownerId: number | null;
    /** State */
    state: string;
    /** Execution context */
    executionContext: string;
    /** Total elements */
    totalElements: number;
    /** Current Message og the last Event */
    currentMessage: string;
    /** Id of the child Job run */
    jobRunChildId: number | null;
    /** Current Step of a running Job */
    currentStep: number | null;
    /** Number of total Steps of a running Job */
    totalSteps: number | null;
    /** Creation date */
    creationDate: number | null;
    /** Modification date */
    modificationDate: number | null;
    /** The name of the job */
    jobName: string;
};
export const {
    useExecutionEngineAbortJobRunByIdMutation,
    useExecutionEngineHideJobRunsMutation,
    useExecutionEngineListJobsQuery,
} = injectedRtkApi;
