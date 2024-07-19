import { api } from "../../../../../../app/api/pimcore/index";
export const addTagTypes = ["Tags", "Tags for Element"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getTags: build.query<GetTagsApiResponse, GetTagsApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/tags`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        elementType: queryArg.elementType,
                        filter: queryArg.filter,
                        parentId: queryArg.parentId,
                    },
                }),
                providesTags: ["Tags"],
            }),
            batchAssignTagsForElements: build.mutation<
                BatchAssignTagsForElementsApiResponse,
                BatchAssignTagsForElementsApiArg
            >({
                query: (queryArg) => ({
                    url: `/studio/api/tags/batch/assign/${queryArg.elementType}`,
                    method: "POST",
                    body: queryArg.elementTagIdCollection,
                }),
                invalidatesTags: ["Tags for Element"],
            }),
            batchReplaceTagsForElements: build.mutation<
                BatchReplaceTagsForElementsApiResponse,
                BatchReplaceTagsForElementsApiArg
            >({
                query: (queryArg) => ({
                    url: `/studio/api/tags/batch/replace/${queryArg.elementType}`,
                    method: "POST",
                    body: queryArg.elementTagIdCollection,
                }),
                invalidatesTags: ["Tags for Element"],
            }),
            getTagsForElementByTypeAndId: build.query<
                GetTagsForElementByTypeAndIdApiResponse,
                GetTagsForElementByTypeAndIdApiArg
            >({
                query: (queryArg) => ({ url: `/studio/api/tags/${queryArg.elementType}/${queryArg.id}` }),
                providesTags: ["Tags for Element"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type GetTagsApiResponse = /** status 200 Tags filtered based on type and query parameters */ {
    items?: Tag[];
};
export type GetTagsApiArg = {
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Filter elements by matching element type. */
    elementType?: "asset" | "document" | "data-object";
    /** Filter for properties */
    filter?: string;
    /** Filter tags by parent id. */
    parentId?: number;
};
export type BatchAssignTagsForElementsApiResponse = unknown;
export type BatchAssignTagsForElementsApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    elementTagIdCollection: CollectionOfElementAndTagIds;
};
export type BatchReplaceTagsForElementsApiResponse = unknown;
export type BatchReplaceTagsForElementsApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    elementTagIdCollection: CollectionOfElementAndTagIds;
};
export type GetTagsForElementByTypeAndIdApiResponse = /** status 200 List of tags */ {
    totalItems: number;
    items: Tag[];
};
export type GetTagsForElementByTypeAndIdApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Id of the element */
    id: number;
};
export type Tag = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** tag ID */
    id?: number;
    /** parent tag ID */
    parentId?: number;
    /** tag text */
    text?: string;
    /** path */
    path?: string;
    /** has children */
    hasChildren?: boolean;
    /** IconName */
    iconName?: string;
    /** children */
    children?: Tag[];
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
export type CollectionOfElementAndTagIds = {
    /** element ids */
    elementIds?: number[];
    /** tag ids */
    tagIds?: number[];
};
export const {
    useGetTagsQuery,
    useBatchAssignTagsForElementsMutation,
    useBatchReplaceTagsForElementsMutation,
    useGetTagsForElementByTypeAndIdQuery,
} = injectedRtkApi;
