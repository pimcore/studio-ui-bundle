import { api } from "@sdk/api";
export const addTagTypes = ["Elements"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            elementGetUsage: build.query<ElementGetUsageApiResponse, ElementGetUsageApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/elements/usage/${queryArg.elementType}/${queryArg.id}`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        sortOrder: queryArg.sortOrder,
                        sortBy: queryArg.sortBy,
                    },
                }),
                providesTags: ["Elements"],
            }),
            elementUsageReplace: build.mutation<ElementUsageReplaceApiResponse, ElementUsageReplaceApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/elements/usage/replace/${queryArg.elementType}/${queryArg.id}`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Elements"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type ElementGetUsageApiResponse = /** status 200 Where the element is referenced */ ElementUsage;
export type ElementGetUsageApiArg = {
    /** Id of the element */
    id: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Sort order (asc or desc). */
    sortOrder?: "ASC" | "DESC";
    /** Sort by field. */
    sortBy?: "id" | "path" | "type";
};
export type ElementUsageReplaceApiResponse = /** status 200 Id of the created job run */ {
    /** ID of created jobRun */
    jobRunId: number;
};
export type ElementUsageReplaceApiArg = {
    /** Id of the element */
    id: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    body: {
        targetType?: "data-object" | "object" | "asset" | "document";
        targetId?: number;
        elements?: ElementUsageBaseItem[];
    };
};
export type ElementUsageBaseItem = {
    /** ID */
    id: number;
    /** type */
    type: "data-object" | "object" | "asset" | "document";
};
export type ElementUsageItem = ElementUsageBaseItem & {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number;
    /** type */
    type: string;
    /** path */
    path: string;
};
export type ElementUsage = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Data */
    data: ElementUsageItem[];
    /** hasHidden */
    hasHidden: boolean;
    /** totalCount */
    totalCount?: number;
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
export const { useElementGetUsageQuery, useElementUsageReplaceMutation } = injectedRtkApi;
