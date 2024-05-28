import { api } from "../../../../../app/api/pimcore/index";
export const addTagTypes = ["Versions"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getVersions: build.query<GetVersionsApiResponse, GetVersionsApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/versions`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        elementId: queryArg.elementId,
                        elementType: queryArg.elementType,
                    },
                }),
                providesTags: ["Versions"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type GetVersionsApiResponse = /** status 200 Paginated versions with total count as header param */ {
    totalItems?: number;
    items?: Version[];
};
export type GetVersionsApiArg = {
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** ID of the element */
    elementId: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "dataObject";
};
export type VersionUser = {
    /** ID */
    id?: number | null;
    /** name */
    name?: string | null;
};
export type Version = {
    /** version ID */
    id?: number;
    /** element ID */
    cid?: number;
    /** element type */
    ctype?: string;
    /** note */
    note?: string;
    /** date */
    date?: number;
    /** public */
    public?: boolean;
    /** version count */
    versionCount?: number;
    /** autosave */
    autosave?: boolean;
    user?: VersionUser;
    /** scheduled */
    scheduled?: number | null;
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
export const { useGetVersionsQuery } = injectedRtkApi;
