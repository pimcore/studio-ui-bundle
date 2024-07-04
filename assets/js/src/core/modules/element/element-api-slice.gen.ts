import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Elements"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getElementIdByPath: build.query<GetElementIdByPathApiResponse, GetElementIdByPathApiArg>({
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
export type GetElementIdByPathApiResponse = /** status 200 Id of the element */ {
    /** ID of the element */
    id: number;
};
export type GetElementIdByPathApiArg = {
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
export const { useGetElementIdByPathQuery } = injectedRtkApi;
