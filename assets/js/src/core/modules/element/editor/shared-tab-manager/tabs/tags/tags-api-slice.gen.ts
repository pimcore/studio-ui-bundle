import {api} from "../../../../../../app/api/pimcore/index";

export const addTagTypes = ["Tags", "Tags for Element"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            tagGetCollection: build.query<TagGetCollectionApiResponse, TagGetCollectionApiArg>({
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
            tagGetById: build.query<TagGetByIdApiResponse, TagGetByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/tags/${queryArg.id}` }),
                providesTags: ["Tags"],
            }),
            tagUpdateById: build.mutation<TagUpdateByIdApiResponse, TagUpdateByIdApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/tags/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.updateTagParameters,
                }),
                invalidatesTags: ["Tags"],
            }),
            tagDeleteById: build.mutation<TagDeleteByIdApiResponse, TagDeleteByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/tags/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Tags"],
            }),
            tagAssignToElement: build.mutation<TagAssignToElementApiResponse, TagAssignToElementApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/tags/assign/${queryArg.elementType}/${queryArg.id}/${queryArg.tagId}`,
                    method: "POST",
                }),
                invalidatesTags: ["Tags for Element"],
            }),
            tagBatchAssignToElementsByType: build.mutation<
                TagBatchAssignToElementsByTypeApiResponse,
                TagBatchAssignToElementsByTypeApiArg
            >({
                query: (queryArg) => ({
                    url: `/studio/api/tags/batch/assign/${queryArg.elementType}`,
                    method: "POST",
                    body: queryArg.elementTagIdCollection,
                }),
                invalidatesTags: ["Tags for Element"],
            }),
            tagBatchReplaceForElementsByType: build.mutation<
                TagBatchReplaceForElementsByTypeApiResponse,
                TagBatchReplaceForElementsByTypeApiArg
            >({
                query: (queryArg) => ({
                    url: `/studio/api/tags/batch/replace/${queryArg.elementType}`,
                    method: "POST",
                    body: queryArg.elementTagIdCollection,
                }),
                invalidatesTags: ["Tags for Element"],
            }),
            tagGetCollectionForElementByTypeAndId: build.query<
                TagGetCollectionForElementByTypeAndIdApiResponse,
                TagGetCollectionForElementByTypeAndIdApiArg
            >({
                query: (queryArg) => ({ url: `/studio/api/tags/${queryArg.elementType}/${queryArg.id}` }),
                providesTags: ["Tags for Element"],
            }),
            tagUnassignFromElement: build.mutation<TagUnassignFromElementApiResponse, TagUnassignFromElementApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/tags/${queryArg.elementType}/${queryArg.id}/${queryArg.tagId}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Tags for Element"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type TagGetCollectionApiResponse =
    /** status 200 All tags for a parent filtered based on type and query parameters */ {
        items?: Tag[];
    };
export type TagGetCollectionApiArg = {
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
export type TagGetByIdApiResponse = /** status 200 Successfully retrieved tag data as JSON */ Tag;
export type TagGetByIdApiArg = {
    /** Id of the tag */
    id: number;
};
export type TagUpdateByIdApiResponse = /** status 200 Successfully updated tag data as JSON */ Tag;
export type TagUpdateByIdApiArg = {
    /** Id of the tag */
    id: number;
    updateTagParameters: ChangeTagParameters;
};
export type TagDeleteByIdApiResponse = /** status 200 ID of successfully deleted tag */ {
    /** ID of deleted tag */
    id: number;
};
export type TagDeleteByIdApiArg = {
    /** Id of the tag */
    id: number;
};
export type TagAssignToElementApiResponse = unknown;
export type TagAssignToElementApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Id of the element */
    id: number;
    /** TagId of the tag */
    tagId: number;
};
export type TagBatchAssignToElementsByTypeApiResponse = unknown;
export type TagBatchAssignToElementsByTypeApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    elementTagIdCollection: CollectionOfElementAndTagIds;
};
export type TagBatchReplaceForElementsByTypeApiResponse = unknown;
export type TagBatchReplaceForElementsByTypeApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    elementTagIdCollection: CollectionOfElementAndTagIds;
};
export type TagGetCollectionForElementByTypeAndIdApiResponse = /** status 200 Paginated tags for element */ {
    totalItems: number;
    items: Tag[];
};
export type TagGetCollectionForElementByTypeAndIdApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Id of the element */
    id: number;
};
export type TagUnassignFromElementApiResponse = unknown;
export type TagUnassignFromElementApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Id of the element */
    id: number;
    /** TagId of the tag */
    tagId: number;
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
export type ChangeTagParameters = {
    /** Parent id */
    parentId?: number | null;
    /** Tag name */
    name?: string | null;
};
export type CollectionOfElementAndTagIds = {
    /** element ids */
    elementIds?: number[];
    /** tag ids */
    tagIds?: number[];
};
export const {
    useTagGetCollectionQuery,
    useTagGetByIdQuery,
    useTagUpdateByIdMutation,
    useTagDeleteByIdMutation,
    useTagAssignToElementMutation,
    useTagBatchAssignToElementsByTypeMutation,
    useTagBatchReplaceForElementsByTypeMutation,
    useTagGetCollectionForElementByTypeAndIdQuery,
    useTagUnassignFromElementMutation,
} = injectedRtkApi;
