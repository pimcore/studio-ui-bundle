import { api } from "../../../../../../app/api/pimcore/index";
export const addTagTypes = ["Versions"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getVersionById: build.query<GetVersionByIdApiResponse, GetVersionByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/versions/${queryArg.id}` }),
                providesTags: ["Versions"],
            }),
            publishVersion: build.mutation<PublishVersionApiResponse, PublishVersionApiArg>({
                query: (queryArg) => ({ url: `/studio/api/versions/${queryArg.id}`, method: "POST" }),
                invalidatesTags: ["Versions"],
            }),
            deleteVersion: build.mutation<DeleteVersionApiResponse, DeleteVersionApiArg>({
                query: (queryArg) => ({ url: `/studio/api/versions/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Versions"],
            }),
            getVersions: build.query<GetVersionsApiResponse, GetVersionsApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/versions/${queryArg.elementType}/${queryArg.id}`,
                    params: { page: queryArg.page, pageSize: queryArg.pageSize },
                }),
                providesTags: ["Versions"],
            }),
            cleanupVersion: build.mutation<CleanupVersionApiResponse, CleanupVersionApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/versions/${queryArg.elementType}/${queryArg.id}`,
                    method: "DELETE",
                    params: { elementModificationDate: queryArg.elementModificationDate },
                }),
                invalidatesTags: ["Versions"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type GetVersionByIdApiResponse = /** status 200 Version data as json */
    | AssetVersion
    | ImageVersion
    | DataObjectVersion
    | DocumentVersion;
export type GetVersionByIdApiArg = {
    /** ID of the version */
    id: number;
};
export type PublishVersionApiResponse = /** status 200 ID of published version */ {
    /** ID of published version */
    id?: number;
};
export type PublishVersionApiArg = {
    /** ID of the version */
    id: number;
};
export type DeleteVersionApiResponse = /** status 200 ID of deleted version */ {
    /** ID of deleted version */
    id?: number;
};
export type DeleteVersionApiArg = {
    /** ID of the version */
    id: number;
};
export type GetVersionsApiResponse = /** status 200 Paginated versions with total count as header param */ {
    totalItems: number;
    items: Version[];
};
export type GetVersionsApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "dataObject";
    /** ID of the element */
    id: number;
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
};
export type CleanupVersionApiResponse = /** status 200 IDs of deleted versions */ {
    /** IDs of deleted versions */
    ids?: number[];
};
export type CleanupVersionApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "dataObject";
    /** ID of the ID of the element */
    id: number;
    /** Modification timestamp of the element */
    elementModificationDate: number;
};
export type AssetVersion = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** file name */
    fileName: string;
    /** temporary file */
    temporaryFile?: string | null;
};
export type VersionUser = {
    /** width */
    width?: number | null;
    /** height */
    height?: number | null;
};
export type ImageVersion = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** file name */
    fileName: string;
    /** temporary file */
    temporaryFile?: string | null;
    /** creation date */
    creationDate: number;
    /** modification date */
    modificationDate?: number | null;
    /** file size */
    fileSize: number;
    /** mime type */
    mimeType: string;
    /** dimensions */
    dimensions?: VersionUser | null;
};
export type DataObjectVersion = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** modification date */
    modificationDate: number;
    /** path */
    path: string;
    /** published */
    published: boolean;
};
export type DocumentVersion = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** modification date */
    modificationDate: number;
    /** path */
    path: string;
    /** published */
    published: boolean;
};
export type Error = {
    /** Message */
    message?: string;
};
export type DevError = {
    /** Message */
    message?: string;
    /** Details */
    details?: string;
};
export type VersionUser2 = {
    /** ID */
    id?: number | null;
    /** name */
    name?: string | null;
};
export type Version = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** version ID */
    id: number;
    /** element ID */
    cid: number;
    /** element type */
    ctype: string;
    /** note */
    note: string;
    /** date */
    date: number;
    /** public */
    public: boolean;
    /** version count */
    versionCount: number;
    /** autosave */
    autosave: boolean;
    user: VersionUser2;
    /** scheduled */
    scheduled?: number | null;
};
export const {
    useGetVersionByIdQuery,
    usePublishVersionMutation,
    useDeleteVersionMutation,
    useGetVersionsQuery,
    useCleanupVersionMutation,
} = injectedRtkApi;
