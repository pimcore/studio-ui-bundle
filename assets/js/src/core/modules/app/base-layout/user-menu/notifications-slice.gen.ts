import { api } from "../../../../app/api/pimcore/index";
export const addTagTypes = ["Notifications"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            notificationGetCollection: build.mutation<
                NotificationGetCollectionApiResponse,
                NotificationGetCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/notifications`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Notifications"],
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
        filters?: GridFilter;
    };
};
export type NotificationDeleteAllApiResponse = /** status 200 Successfully deleted all notifications */ void;
export type NotificationDeleteAllApiArg = void;
export type NotificationGetByIdApiResponse = /** status 200 Notification data as JSON */ Notification;
export type NotificationGetByIdApiArg = {
    /** Id of the notification */
    id: number;
};
export type NotificationReadByIdApiResponse = /** status 200 Successfully marked notification as read */ void;
export type NotificationReadByIdApiArg = {
    /** Id of the notification */
    id: number;
};
export type NotificationDeleteByIdApiResponse = /** status 200 Successfully deleted notification */ void;
export type NotificationDeleteByIdApiArg = {
    /** Id of the notification */
    id: number;
};
export type NotificationSendApiResponse = /** status 200 Successfully sent notification */ void;
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
    creationDate?: number;
    /** sender */
    sender: any;
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
export type Notification = NotificationListItem & {
    /** message */
    message?: any;
    /** payload */
    payload?: any;
    /** linked attachment type */
    attachmentType?: any;
    /** linked attachment ID */
    attachmentId?: any;
};
export type SendEmailParameters = {
    /** recipient ID */
    recipientId: number;
    /** title */
    title: string;
    /** message */
    message: string;
    /** type of the attachment */
    attachmentType?: "asset" | "document" | "object";
    /** ID of the attachment */
    attachmentId?: any;
};
export const {
    useNotificationGetCollectionMutation,
    useNotificationDeleteAllMutation,
    useNotificationGetByIdQuery,
    useNotificationReadByIdMutation,
    useNotificationDeleteByIdMutation,
    useNotificationSendMutation,
} = injectedRtkApi;
