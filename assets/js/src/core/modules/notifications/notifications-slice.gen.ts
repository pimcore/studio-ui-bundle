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
            notificationGetSubscriptions: build.query<
                NotificationGetSubscriptionsApiResponse,
                NotificationGetSubscriptionsApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/notifications/subscriptions` }),
                providesTags: ["Notifications"],
            }),
            notificationUpdateSubscriptions: build.mutation<
                NotificationUpdateSubscriptionsApiResponse,
                NotificationUpdateSubscriptionsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/notifications/subscriptions`,
                    method: "PUT",
                    body: queryArg.notificationUpdateSubscriptionsParameters,
                }),
                invalidatesTags: ["Notifications"],
            }),
            notificationGetUnreadCount: build.query<
                NotificationGetUnreadCountApiResponse,
                NotificationGetUnreadCountApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/notifications/unread-count` }),
                providesTags: ["Notifications"],
            }),
            notificationGetRecipients: build.query<
                NotificationGetRecipientsApiResponse,
                NotificationGetRecipientsApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/notifications/recipients` }),
                providesTags: ["Notifications"],
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
            columnFilters?: object;
            sortFilter?: object;
            additionalSortFilters?: object;
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
export type NotificationGetSubscriptionsApiResponse =
    /** status 200 Notification preferences for the current user */ NotificationSubscriptionCollection;
export type NotificationGetSubscriptionsApiArg = void;
export type NotificationUpdateSubscriptionsApiResponse =
    /** status 200 The stored notification preferences for the current user */ NotificationSubscriptionCollection;
export type NotificationUpdateSubscriptionsApiArg = {
    notificationUpdateSubscriptionsParameters: NotificationUpdateSubscriptionsParameters;
};
export type NotificationGetUnreadCountApiResponse =
    /** status 200 Count of unread notifications for the current user */ UnreadCount;
export type NotificationGetUnreadCountApiArg = void;
export type NotificationGetRecipientsApiResponse =
    /** status 200 List of notification recipients for the current user */ {
        totalItems: number;
        items: Recipient[];
    };
export type NotificationGetRecipientsApiArg = void;
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
    /** linked attachment fullPath */
    attachmentFullPath: string | null;
};
export type NotificationAvailableChannel = {
    /** channel id */
    id: string;
    /** translation key for the column label */
    translationKey: string;
    /** translation key explaining why this channel cannot reach the caller, null when it can */
    unavailableReasonKey?: string | null;
};
export type NotificationSubscriptionChannel = {
    /** channel id */
    id: string;
    /** whether the user has this channel enabled */
    enabled: boolean;
    /** whether this type can use this channel */
    supported: boolean;
};
export type NotificationSubscribableType = {
    /** notification type id */
    typeId: string;
    /** translation key for the row label */
    translationKey: string;
    /** translation key for the row description */
    descriptionKey: string;
    /** grouping key */
    group: string;
    /** explicit order; never rely on registration order */
    sortOrder: number;
    /** whether the user is subscribed */
    subscribed: boolean;
    /** whether the subscription cannot be turned off */
    subscriptionLocked: boolean;
    /** one entry per available channel */
    channels: NotificationSubscriptionChannel[];
};
export type NotificationSubscriptionCollection = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** channels offerable anywhere in this installation */
    availableChannels: NotificationAvailableChannel[];
    /** subscribable types with the caller's effective preferences */
    items: NotificationSubscribableType[];
};
export type NotificationUpdateSubscriptionItem = {
    /** notification type id */
    typeId: string;
    /** whether the user wants this type at all */
    subscribed: boolean;
    /** enabled channel ids */
    channels: string[];
};
export type NotificationUpdateSubscriptionsParameters = {
    /** preferences to store, one entry per notification type */
    items: NotificationUpdateSubscriptionItem[];
};
export type UnreadCount = {
    /** Count of unread notifications */
    unreadNotificationsCount: number;
};
export type Recipient = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID of the Recipient */
    id: number;
    /** User name or Group Name of the Recipient */
    recipientName: string;
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
    useNotificationGetSubscriptionsQuery,
    useNotificationUpdateSubscriptionsMutation,
    useNotificationGetUnreadCountQuery,
    useNotificationGetRecipientsQuery,
    useNotificationSendMutation,
} = injectedRtkApi;
