import { api } from "@sdk/api";
export const addTagTypes = ["E-Mails"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            emailBlocklistGetCollection: build.query<
                EmailBlocklistGetCollectionApiResponse,
                EmailBlocklistGetCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/emails/blocklist`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        email: queryArg.email,
                    },
                }),
                providesTags: ["E-Mails"],
            }),
            emailBlocklistAdd: build.mutation<EmailBlocklistAddApiResponse, EmailBlocklistAddApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/emails/blocklist`,
                    method: "POST",
                    body: queryArg.emailAddressParameter,
                }),
                invalidatesTags: ["E-Mails"],
            }),
            emailBlocklistDelete: build.mutation<EmailBlocklistDeleteApiResponse, EmailBlocklistDeleteApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/emails/blocklist`,
                    method: "DELETE",
                    params: {
                        email: queryArg.email,
                    },
                }),
                invalidatesTags: ["E-Mails"],
            }),
            emailLogGetCollection: build.query<EmailLogGetCollectionApiResponse, EmailLogGetCollectionApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/emails`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                    },
                }),
                providesTags: ["E-Mails"],
            }),
            emailLogGetById: build.query<EmailLogGetByIdApiResponse, EmailLogGetByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/emails/${queryArg.id}` }),
                providesTags: ["E-Mails"],
            }),
            emailLogDelete: build.mutation<EmailLogDeleteApiResponse, EmailLogDeleteApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/emails/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["E-Mails"],
            }),
            emailLogGetHtml: build.query<EmailLogGetHtmlApiResponse, EmailLogGetHtmlApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/emails/${queryArg.id}/html` }),
                providesTags: ["E-Mails"],
            }),
            emailLogGetParams: build.query<EmailLogGetParamsApiResponse, EmailLogGetParamsApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/emails/${queryArg.id}/params` }),
                providesTags: ["E-Mails"],
            }),
            emailLogGetText: build.query<EmailLogGetTextApiResponse, EmailLogGetTextApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/emails/${queryArg.id}/text` }),
                providesTags: ["E-Mails"],
            }),
            emailLogForwardById: build.mutation<EmailLogForwardByIdApiResponse, EmailLogForwardByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/emails/${queryArg.id}/forward`,
                    method: "POST",
                    body: queryArg.emailAddressParameter,
                }),
                invalidatesTags: ["E-Mails"],
            }),
            emailLogResendById: build.mutation<EmailLogResendByIdApiResponse, EmailLogResendByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/emails/${queryArg.id}/resend`, method: "POST" }),
                invalidatesTags: ["E-Mails"],
            }),
            emailSendTest: build.mutation<EmailSendTestApiResponse, EmailSendTestApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/emails/test`,
                    method: "POST",
                    body: queryArg.sendEmailParameters,
                }),
                invalidatesTags: ["E-Mails"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type EmailBlocklistGetCollectionApiResponse =
    /** status 200 Paginated E-Mail blocklist entries with total count as header param */ {
        totalItems: number;
        items: Blocklist[];
    };
export type EmailBlocklistGetCollectionApiArg = {
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Email address to be filtered by */
    email?: string;
};
export type EmailBlocklistAddApiResponse = unknown;
export type EmailBlocklistAddApiArg = {
    emailAddressParameter: Blocklist2;
};
export type EmailBlocklistDeleteApiResponse = unknown;
export type EmailBlocklistDeleteApiArg = {
    /** Email address to be deleted from blocklist */
    email?: string;
};
export type EmailLogGetCollectionApiResponse =
    /** status 200 Paginated E-Mail log entries with total count as header param */ {
        totalItems: number;
        items: EmailLog[];
    };
export type EmailLogGetCollectionApiArg = {
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
};
export type EmailLogGetByIdApiResponse = /** status 200 E-Mail log entry data as JSON */ EmailLogDetail;
export type EmailLogGetByIdApiArg = {
    /** Id of the E-Mail */
    id: number;
};
export type EmailLogDeleteApiResponse = unknown;
export type EmailLogDeleteApiArg = {
    /** Id of the E-Mail */
    id: number;
};
export type EmailLogGetHtmlApiResponse = /** status 200 HTML content of the E-Mail log entry */ {
    /** Email log entry HTML data. */
    data: string;
};
export type EmailLogGetHtmlApiArg = {
    /** Id of the E-Mail */
    id: number;
};
export type EmailLogGetParamsApiResponse = /** status 200 Parameters of the E-Mail log entry */ {
    /** Email log entry parameters */
    data: EmailLogParameters[];
};
export type EmailLogGetParamsApiArg = {
    /** Id of the E-Mail */
    id: number;
};
export type EmailLogGetTextApiResponse = /** status 200 Text content of the E-Mail log entry */ {
    /** Email log entry text data. */
    data: string;
};
export type EmailLogGetTextApiArg = {
    /** Id of the E-Mail */
    id: number;
};
export type EmailLogForwardByIdApiResponse = unknown;
export type EmailLogForwardByIdApiArg = {
    /** Id of the E-Mail */
    id: number;
    emailAddressParameter: Blocklist2;
};
export type EmailLogResendByIdApiResponse = unknown;
export type EmailLogResendByIdApiArg = {
    /** Id of the E-Mail */
    id: number;
};
export type EmailSendTestApiResponse = unknown;
export type EmailSendTestApiArg = {
    sendEmailParameters: SendEmailParameters;
};
export type Blocklist = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** email address */
    email: string;
    /** creation date */
    creationDate: number;
    /** modification date */
    modificationDate: number | null;
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
export type Blocklist2 = {
    /** email address */
    email: string;
};
export type EmailLog = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** id */
    id: number;
    /** sent date */
    sentDate: number;
    /** HTML log exists */
    hasHtmlLog: boolean;
    /** Text log exists */
    hasTextLog: boolean;
    /** Error occurred */
    hasError: boolean;
    /** from */
    from: string | null;
    /** to */
    to: string | null;
    /** subject */
    subject: string | null;
};
export type EmailLogDetail = EmailLog & {
    /** bcc */
    bcc: string | null;
    /** cc */
    cc: string | null;
    /** error */
    error: string | null;
};
export type EmailLogObjectParameterData = {
    /** id */
    id: number;
    /** type */
    type: string;
    /** class */
    class: string;
    /** path */
    path: string;
};
export type EmailLogParameters = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** name */
    name: string;
    /** value */
    value: string | null;
    /** data for object parameters */
    objectData: EmailLogObjectParameterData | null;
};
export type EmailDocumentParameters = {
    /** parameter key */
    key: string;
    /** parameter value */
    value: string | number | boolean | object | null;
};
export type SendEmailParameters = {
    /** from email address(es) */
    from: string;
    /** to email address(es) */
    to: string;
    /** email subject */
    subject: string;
    /** email content type */
    contentType: "document" | "html" | "text";
    /** email content */
    content?: string | null;
    /** path to the email document */
    documentPath?: string | null;
    /** email document parameters */
    documentParameters?: EmailDocumentParameters[];
    /** id of the asset attachment */
    attachmentId?: number | null;
};
export const {
    useEmailBlocklistGetCollectionQuery,
    useEmailBlocklistAddMutation,
    useEmailBlocklistDeleteMutation,
    useEmailLogGetCollectionQuery,
    useEmailLogGetByIdQuery,
    useEmailLogDeleteMutation,
    useEmailLogGetHtmlQuery,
    useEmailLogGetParamsQuery,
    useEmailLogGetTextQuery,
    useEmailLogForwardByIdMutation,
    useEmailLogResendByIdMutation,
    useEmailSendTestMutation,
} = injectedRtkApi;
