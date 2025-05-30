import { api } from "@sdk/api";
export const addTagTypes = ["Notifications"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            notificationGetCollection: build.query<
                NotificationGetCollectionApiResponse,
                NotificationGetCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/notifications`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Notifications"],
            }),
            notificationDeleteAll: build.mutation<NotificationDeleteAllApiResponse, NotificationDeleteAllApiArg>({
                query: () => ({ url: `/pimcore-studio/api/notifications`, method: "DELETE" }),
                invalidatesTags: ["Notifications"],
            }),
            notificationGetById: build.query<NotificationGetByIdApiResponse, NotificationGetByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/notifications/${queryArg.id}` }),
                providesTags: ["Notifications"],
            }),
            notificationReadById: build.mutation<NotificationReadByIdApiResponse, NotificationReadByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/notifications/${queryArg.id}`, method: "POST" }),
                invalidatesTags: ["Notifications"],
            }),
            notificationDeleteById: build.mutation<NotificationDeleteByIdApiResponse, NotificationDeleteByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/notifications/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Notifications"],
            }),
            notificationSend: build.mutation<NotificationSendApiResponse, NotificationSendApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/notifications/send`,
                    method: "POST",
                    body: queryArg.sendNotificationParameters,
                }),
                invalidatesTags: ["Notifications"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type NotificationGetCollectionApiResponse = /** status 200 Paginated notifications with total count */ {
    totalItems: number;
    items: NotificationListItem[];
};
export type NotificationGetCollectionApiArg = {
    body: {
        filters?: {
            page?: number;
            pageSize?: number;
            includeDescendants?: boolean;
            columnFilters?: object;
            sortFilter?: object;
        };
    };
};
export type NotificationDeleteAllApiResponse = unknown;
export type NotificationDeleteAllApiArg = void;
export type NotificationGetByIdApiResponse = /** status 200 Notification data as JSON */ Notification;
export type NotificationGetByIdApiArg = {
    /** Id of the notification */
    id: number;
};
export type NotificationReadByIdApiResponse = unknown;
export type NotificationReadByIdApiArg = {
    /** Id of the notification */
    id: number;
};
export type NotificationDeleteByIdApiResponse = unknown;
export type NotificationDeleteByIdApiArg = {
    /** Id of the notification */
    id: number;
};
export type NotificationSendApiResponse = unknown;
export type NotificationSendApiArg = {
    sendNotificationParameters: SendEmailParameters;
};
export type NotificationListItem = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** id */
    id: number;
    /** type */
    type: string;
    /** title */
    title: string;
    /** read */
    read: boolean;
    /** has attachment */
    hasAttachment: boolean;
    /** creation date */
    creationDate: number;
    /** sender */
    sender: string | null;
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
export type Notification = NotificationListItem & {
    /** message */
    message: string | null;
    /** payload */
    payload: string | null;
    /** linked attachment type */
    attachmentType: string | null;
    /** linked attachment ID */
    attachmentId: number | null;
};
export type SendEmailParameters = {
    /** recipient ID */
    recipientId: number;
    /** title */
    title: string;
    /** message */
    message: string;
    /** type of the attachment */
    attachmentType?: ("asset" | "document" | "object") | ("asset" | "document" | "object");
    /** ID of the attachment */
    attachmentId?: number | null;
};
export const {
    useNotificationGetCollectionQuery,
    useNotificationDeleteAllMutation,
    useNotificationGetByIdQuery,
    useNotificationReadByIdMutation,
    useNotificationDeleteByIdMutation,
    useNotificationSendMutation,
} = injectedRtkApi;
