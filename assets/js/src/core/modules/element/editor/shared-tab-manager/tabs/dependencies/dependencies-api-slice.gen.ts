import { api } from "../../../../../../app/api/pimcore/index";
export const addTagTypes = ["Dependencies"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            dependencyGetCollectionByElementType: build.query<
                DependencyGetCollectionByElementTypeApiResponse,
                DependencyGetCollectionByElementTypeApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/dependencies/${queryArg.elementType}/${queryArg.id}`,
                    params: {
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        dependencyMode: queryArg.dependencyMode,
                    },
                }),
                providesTags: ["Dependencies"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type DependencyGetCollectionByElementTypeApiResponse =
    /** status 200 Paginated dependencies with total count as header param */ {
        totalItems: number;
        items: Dependency[];
    };
export type DependencyGetCollectionByElementTypeApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Id of the element */
    id: number;
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Dependency mode */
    dependencyMode: "required_by" | "requires";
};
export type Dependency = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** id */
    id: number;
    /** path */
    path: string;
    /** type */
    type: string;
    /** subType */
    subType: string;
    /** published */
    published: boolean;
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
export const { useDependencyGetCollectionByElementTypeQuery } = injectedRtkApi;
