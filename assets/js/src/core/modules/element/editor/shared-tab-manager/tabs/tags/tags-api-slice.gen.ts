import { api } from "../../../../../../app/api/pimcore/index";
export const addTagTypes = ["Tags", "Tags for Element"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            tagGetCollection: build.query<TagGetCollectionApiResponse, TagGetCollectionApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/tags`,
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
            tagCreate: build.mutation<TagCreateApiResponse, TagCreateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/tag`,
                    method: "POST",
                    body: queryArg.createTagParameters,
                }),
                invalidatesTags: ["Tags"],
            }),
            tagGetById: build.query<TagGetByIdApiResponse, TagGetByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/tags/${queryArg.id}` }),
                providesTags: ["Tags"],
            }),
            tagUpdateById: build.mutation<TagUpdateByIdApiResponse, TagUpdateByIdApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/tags/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.updateTagParameters,
                }),
                invalidatesTags: ["Tags"],
            }),
            tagDeleteById: build.mutation<TagDeleteByIdApiResponse, TagDeleteByIdApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/tags/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Tags"],
            }),
            tagAssignToElement: build.mutation<TagAssignToElementApiResponse, TagAssignToElementApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/tags/assign/${queryArg.elementType}/${queryArg.id}/${queryArg.tagId}`,
                    method: "POST",
                }),
                invalidatesTags: ["Tags for Element"],
            }),
            tagBatchOperationToElementsByTypeAndId: build.mutation<
                TagBatchOperationToElementsByTypeAndIdApiResponse,
                TagBatchOperationToElementsByTypeAndIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/tags/batch/${queryArg.operation}/${queryArg.elementType}/${queryArg.id}`,
                    method: "POST",
                }),
                invalidatesTags: ["Tags for Element"],
            }),
            tagGetCollectionForElementByTypeAndId: build.query<
                TagGetCollectionForElementByTypeAndIdApiResponse,
                TagGetCollectionForElementByTypeAndIdApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/tags/${queryArg.elementType}/${queryArg.id}` }),
                providesTags: ["Tags for Element"],
            }),
            tagUnassignFromElement: build.mutation<TagUnassignFromElementApiResponse, TagUnassignFromElementApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/tags/${queryArg.elementType}/${queryArg.id}/${queryArg.tagId}`,
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
export type TagCreateApiResponse = /** status 200 tag_create_success_description */ Tag;
export type TagCreateApiArg = {
    createTagParameters: CreateTagParameters;
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
export type TagBatchOperationToElementsByTypeAndIdApiResponse =
    /** status 201 Successfully created jobRun for batch tag assignment/replacement */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type TagBatchOperationToElementsByTypeAndIdApiArg = {
    /** Id of the element */
    id: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Execute operation based on provided type. */
    operation: "assign" | "replace";
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
        [key: string]: string | number | boolean | object;
    };
    /** tag ID */
    id: number;
    /** parent tag ID */
    parentId: number;
    /** tag text */
    text: string;
    /** path */
    path: string;
    /** has children */
    hasChildren: boolean;
    /** IconName */
    iconName: string;
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
export type CreateTagParameters = {
    /** Parent id */
    parentId?: number;
    /** Tag name */
    name?: string;
};
export type ChangeTagParameters = {
    /** Parent id */
    parentId?: any;
    /** Tag name */
    name?: any;
};
export const {
    useTagGetCollectionQuery,
    useTagCreateMutation,
    useTagGetByIdQuery,
    useTagUpdateByIdMutation,
    useTagDeleteByIdMutation,
    useTagAssignToElementMutation,
    useTagBatchOperationToElementsByTypeAndIdMutation,
    useTagGetCollectionForElementByTypeAndIdQuery,
    useTagUnassignFromElementMutation,
} = injectedRtkApi;
