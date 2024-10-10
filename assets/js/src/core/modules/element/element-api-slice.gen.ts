import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Elements"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            elementDelete: build.mutation<ElementDeleteApiResponse, ElementDeleteApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/elements/${queryArg.elementType}/delete/${queryArg.id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Elements"],
            }),
            elementGetDeleteInfo: build.query<ElementGetDeleteInfoApiResponse, ElementGetDeleteInfoApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/elements/${queryArg.elementType}/delete-info/${queryArg.id}`,
                }),
                providesTags: ["Elements"],
            }),
            elementFolderCreate: build.mutation<ElementFolderCreateApiResponse, ElementFolderCreateApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/elements/${queryArg.elementType}/folder/${queryArg.parentId}`,
                    method: "POST",
                    body: queryArg.folderData,
                }),
                invalidatesTags: ["Elements"],
            }),
            elementGetIdByPath: build.query<ElementGetIdByPathApiResponse, ElementGetIdByPathApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/elements/${queryArg.elementType}/path`,
                    params: { elementPath: queryArg.elementPath },
                }),
                providesTags: ["Elements"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type ElementDeleteApiResponse =
    /** status 200 Successfully deleted element */ void | /** status 201 Successfully created jobRun for deleting element and its children */ {
        /** ID of created jobRun */
        id: number;
    };
export type ElementDeleteApiArg = {
    /** Id of the element */
    id: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
};
export type ElementGetDeleteInfoApiResponse = /** status 200 Get delete info for an element */ DeleteInfo;
export type ElementGetDeleteInfoApiArg = {
    /** Id of the element */
    id: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
};
export type ElementFolderCreateApiResponse = /** status 200 Successfully created folder */ void;
export type ElementFolderCreateApiArg = {
    /** ParentId of the element */
    parentId: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    folderData: FolderData;
};
export type ElementGetIdByPathApiResponse = /** status 200 element_get_id_by_path_response_description */ {
    /** ID of the element */
    id: number;
};
export type ElementGetIdByPathApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Filter elements by matching element path. */
    elementPath: string;
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
export type DeleteInfo = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** hasDependencies */
    hasDependencies: boolean;
    /** canUseRecycleBin */
    canUseRecycleBin: boolean;
};
export type FolderData = {
    /** Folder Name */
    folderName: string;
};
export const {
    useElementDeleteMutation,
    useElementGetDeleteInfoQuery,
    useElementFolderCreateMutation,
    useElementGetIdByPathQuery,
} = injectedRtkApi;
