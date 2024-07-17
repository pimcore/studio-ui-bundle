import { api } from "../../../../../../app/api/pimcore/index";
export const addTagTypes = ["Notes"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getNotes: build.query<GetNotesApiResponse, GetNotesApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/notes`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        sortBy: queryArg.sortBy,
                        sortOrder: queryArg.sortOrder,
                        filter: queryArg.filter,
                        fieldFilters: queryArg.fieldFilters,
                    },
                }),
                providesTags: ["Notes"],
            }),
            deleteNote: build.mutation<DeleteNoteApiResponse, DeleteNoteApiArg>({
                query: (queryArg) => ({ url: `/studio/api/notes/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Notes"],
            }),
            getNotesForElementByTypeAndId: build.query<
                GetNotesForElementByTypeAndIdApiResponse,
                GetNotesForElementByTypeAndIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/studio/api/notes/${queryArg.elementType}/${queryArg.id}`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        sortBy: queryArg.sortBy,
                        sortOrder: queryArg.sortOrder,
                        filter: queryArg.filter,
                        fieldFilters: queryArg.fieldFilters,
                    },
                }),
                providesTags: ["Notes"],
            }),
            createNoteForElement: build.mutation<CreateNoteForElementApiResponse, CreateNoteForElementApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/notes/${queryArg.elementType}/${queryArg.id}`,
                    method: "POST",
                    body: queryArg.createNote,
                }),
                invalidatesTags: ["Notes"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type GetNotesApiResponse = /** status 200 Paginated assets with total count as header param */ {
    totalItems: number;
    items: Note[];
};
export type GetNotesApiArg = {
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Sort by field. Only works in combination with sortOrder. */
    sortBy?: "id" | "type" | "cId" | "cType" | "cPath" | "date" | "title" | "description" | "locked";
    /** Sort order (asc or desc). */
    sortOrder?: "ASC" | "DESC";
    /** Filter for notes */
    filter?: string;
    /** Filter for specific fields, will be json decoded to an array. e.g.
                [{"operator":"like","value":"John","field":"name","type":"string"}] */
    fieldFilters?: any;
};
export type DeleteNoteApiResponse = /** status 200 Successfully deleted note */ void;
export type DeleteNoteApiArg = {
    /** Id of the element */
    id: number;
};
export type GetNotesForElementByTypeAndIdApiResponse =
    /** status 200 Paginated notes with total count as header param */ {
        totalItems: number;
        items: Note[];
    };
export type GetNotesForElementByTypeAndIdApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Id of the element */
    id: number;
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Sort by field. Only works in combination with sortOrder. */
    sortBy?: "id" | "type" | "cId" | "cType" | "cPath" | "date" | "title" | "description" | "locked";
    /** Sort order (asc or desc). */
    sortOrder?: "ASC" | "DESC";
    /** Filter for notes */
    filter?: string;
    /** Filter for specific fields, will be json decoded to an array. e.g.
                [{"operator":"like","value":"John","field":"name","type":"string"}] */
    fieldFilters?: any;
};
export type CreateNoteForElementApiResponse = unknown;
export type CreateNoteForElementApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Id of the element */
    id: number;
    createNote: CreateNote;
};
export type Note = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** id */
    id: number;
    /** type */
    type: string;
    /** Id of element */
    cId: number;
    /** Type of element */
    cType: string;
    /** Path of element */
    cPath: string;
    /** Creation date of note */
    date: number;
    /** title */
    title: string;
    /** description */
    description: string;
    /** Locked */
    locked: boolean;
    /** Data of note */
    data: any[];
    /** User ID */
    userId?: number | null;
    /** Username */
    userName?: string | null;
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
export type CreateNote = {
    /** title */
    title: string;
    /** description */
    description: string;
    /** type */
    type: string;
};
export const {
    useGetNotesQuery,
    useDeleteNoteMutation,
    useGetNotesForElementByTypeAndIdQuery,
    useCreateNoteForElementMutation,
} = injectedRtkApi;
