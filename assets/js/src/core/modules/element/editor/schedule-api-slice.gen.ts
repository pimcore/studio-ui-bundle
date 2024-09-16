import { api } from "../../../app/api/pimcore/index";
export const addTagTypes = ["Schedule"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            scheduleDeleteById: build.mutation<ScheduleDeleteByIdApiResponse, ScheduleDeleteByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/schedules/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Schedule"],
            }),
            scheduleGetCollectionForElementByTypeAndId: build.query<
                ScheduleGetCollectionForElementByTypeAndIdApiResponse,
                ScheduleGetCollectionForElementByTypeAndIdApiArg
            >({
                query: (queryArg) => ({ url: `/studio/api/schedules/${queryArg.elementType}/${queryArg.id}` }),
                providesTags: ["Schedule"],
            }),
            scheduleUpdateForElementByTypeAndId: build.mutation<
                ScheduleUpdateForElementByTypeAndIdApiResponse,
                ScheduleUpdateForElementByTypeAndIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/studio/api/schedules/${queryArg.elementType}/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Schedule"],
            }),
            scheduleCreateForElementByTypeAndId: build.mutation<
                ScheduleCreateForElementByTypeAndIdApiResponse,
                ScheduleCreateForElementByTypeAndIdApiArg
            >({
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
export type ScheduleDeleteByIdApiResponse = /** status 200 Successfully deleted schedule */ void;
export type ScheduleDeleteByIdApiArg = {
    /** Id of the schedule */
    id: number;
};
export type ScheduleGetCollectionForElementByTypeAndIdApiResponse = /** status 200 List of schedules for element */ {
    items?: Schedule[];
};
export type ScheduleGetCollectionForElementByTypeAndIdApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Id of the element */
    id: number;
};
export type ScheduleUpdateForElementByTypeAndIdApiResponse = /** status 200 List of updated schedules */ {
    items?: Schedule[];
};
export type ScheduleUpdateForElementByTypeAndIdApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Id of the element */
    id: number;
    body: {
        items?: UpdateSchedule[];
    };
};
export type ScheduleCreateForElementByTypeAndIdApiResponse = /** status 200 Created schedule for element */ Schedule;
export type ScheduleCreateForElementByTypeAndIdApiArg = {
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
    /** Id of schedule, if null a new one will be created */
    id: number | null;
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
    useScheduleDeleteByIdMutation,
    useScheduleGetCollectionForElementByTypeAndIdQuery,
    useScheduleUpdateForElementByTypeAndIdMutation,
    useScheduleCreateForElementByTypeAndIdMutation,
} = injectedRtkApi;
