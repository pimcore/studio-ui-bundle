import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Elements"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
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
export const { useElementGetIdByPathQuery } = injectedRtkApi;
