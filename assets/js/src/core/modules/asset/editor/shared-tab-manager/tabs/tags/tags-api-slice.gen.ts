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
            getTagById: build.query<GetTagByIdApiResponse, GetTagByIdApiArg>({
                query: (queryArg) => ({ url: `/studio/api/tags/${queryArg.id}` }),
                providesTags: ["Tags"],
            }),
            updateTag: build.mutation<UpdateTagApiResponse, UpdateTagApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/tags/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.updateTagParameters,
                }),
                invalidatesTags: ["Tags"],
            }),
            deleteTag: build.mutation<DeleteTagApiResponse, DeleteTagApiArg>({
                query: (queryArg) => ({ url: `/studio/api/tags/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Tags"],
            }),
            assignTagForElement: build.mutation<AssignTagForElementApiResponse, AssignTagForElementApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/tags/assign/${queryArg.elementType}/${queryArg.id}/${queryArg.tagId}`,
                    method: "POST",
                }),
                invalidatesTags: ["Tags for Element"],
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
            unassignTagFromElement: build.mutation<UnassignTagFromElementApiResponse, UnassignTagFromElementApiArg>({
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
export type GetTagByIdApiResponse = /** status 200 Tag data as json */ Tag;
export type GetTagByIdApiArg = {
    /** Id of the tag */
    id: number;
};
export type UpdateTagApiResponse = /** status 200 Updated tag data as json */ Tag;
export type UpdateTagApiArg = {
    /** Id of the tag */
    id: number;
    updateTagParameters: ChangeTagParameters;
};
export type DeleteTagApiResponse = /** status 200 Id of deleted tag */ {
    /** ID of deleted tag */
    id: number;
};
export type DeleteTagApiArg = {
    /** Id of the tag */
    id: number;
};
export type AssignTagForElementApiResponse = unknown;
export type AssignTagForElementApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Id of the element */
    id: number;
    /** TagId of the tag */
    tagId: number;
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
export type UnassignTagFromElementApiResponse = unknown;
export type UnassignTagFromElementApiArg = {
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
    useGetTagsQuery,
    useGetTagByIdQuery,
    useUpdateTagMutation,
    useDeleteTagMutation,
    useAssignTagForElementMutation,
    useBatchAssignTagsForElementsMutation,
    useBatchReplaceTagsForElementsMutation,
    useGetTagsForElementByTypeAndIdQuery,
    useUnassignTagFromElementMutation,
} = injectedRtkApi;
