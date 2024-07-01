import { api } from "../../../app/api/pimcore/index";
export const addTagTypes = ["Schedule"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            deleteSchedule: build.mutation<DeleteScheduleApiResponse, DeleteScheduleApiArg>({
                query: (queryArg) => ({ url: `/studio/api/schedules/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Schedule"],
            }),
            getSchedulesForElementByTypeAndId: build.query<
                GetSchedulesForElementByTypeAndIdApiResponse,
                GetSchedulesForElementByTypeAndIdApiArg
            >({
                query: (queryArg) => ({ url: `/studio/api/schedules/${queryArg.elementType}/${queryArg.id}` }),
                providesTags: ["Schedule"],
            }),
            updateSchedulesForElementByTypeAndId: build.mutation<
                UpdateSchedulesForElementByTypeAndIdApiResponse,
                UpdateSchedulesForElementByTypeAndIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/studio/api/schedules/${queryArg.elementType}/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Schedule"],
            }),
            createSchedule: build.mutation<CreateScheduleApiResponse, CreateScheduleApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/schedules/${queryArg.elementType}/${queryArg.id}`,
                    method: "POST",
                }),
                invalidatesTags: ["Schedule"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type DeleteScheduleApiResponse = /** status 200 Successfully deleted schedule */ void;
export type DeleteScheduleApiArg = {
    /** Id of the schedule */
    id: number;
};
export type GetSchedulesForElementByTypeAndIdApiResponse = /** status 200 List of schedules */ {
    items?: Schedule[];
};
export type GetSchedulesForElementByTypeAndIdApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Id of the element */
    id: number;
};
export type UpdateSchedulesForElementByTypeAndIdApiResponse = /** status 200 List of schedules */ {
    items?: Schedule[];
};
export type UpdateSchedulesForElementByTypeAndIdApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Id of the element */
    id: number;
    body: {
        items?: UpdateSchedule[];
    };
};
export type CreateScheduleApiResponse = /** status 200 Created schedule */ Schedule;
export type CreateScheduleApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Id of the element */
    id: number;
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
export type Schedule = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** id */
    id: number;
    /** ctype */
    ctype: string;
    /** Date of schedule */
    date: number;
    /** Action */
    action?: ("publish" | "delete") | null;
    /** Version ID */
    version?: number | null;
    /** Active */
    active: boolean;
    /** User ID */
    userId: number;
    /** Username */
    username: string;
};
export type UpdateSchedule = {
    /** id */
    id: number;
    /** Date of schedule */
    date: number;
    /** Action */
    action?: ("publish" | "delete") | null;
    /** Version ID */
    version?: number | null;
    /** Active */
    active: boolean;
};
export const {
    useDeleteScheduleMutation,
    useGetSchedulesForElementByTypeAndIdQuery,
    useUpdateSchedulesForElementByTypeAndIdMutation,
    useCreateScheduleMutation,
} = injectedRtkApi;
