import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Properties", "Properties for Element"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getProperties: build.query<GetPropertiesApiResponse, GetPropertiesApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/properties`,
                    params: { elementType: queryArg.elementType, filter: queryArg.filter },
                }),
                providesTags: ["Properties"],
            }),
            getPropertiesForElementByTypeAndId: build.query<
                GetPropertiesForElementByTypeAndIdApiResponse,
                GetPropertiesForElementByTypeAndIdApiArg
            >({
                query: (queryArg) => ({ url: `/studio/api/properties/${queryArg.elementType}/${queryArg.id}` }),
                providesTags: ["Properties for Element"],
            }),
            updatePropertiesForElementByTypeAndId: build.mutation<
                UpdatePropertiesForElementByTypeAndIdApiResponse,
                UpdatePropertiesForElementByTypeAndIdApiArg
            >({
                query: (queryArg) => ({
                    url: `/studio/api/properties/${queryArg.elementType}/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Properties for Element"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type GetPropertiesApiResponse =
    /** status 200 Predefined properties filtered based on type and query parameters */ {
        items?: PredefinedProperty[];
    };
export type GetPropertiesApiArg = {
    /** Filter elements by matching element type. */
    elementType?: "asset" | "document" | "dataObject";
    /** Filter for properties */
    filter?: string;
};
export type GetPropertiesForElementByTypeAndIdApiResponse = /** status 200 Element Properties data as json */ {
    items?: DataProperty[];
};
export type GetPropertiesForElementByTypeAndIdApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "dataObject";
    /** ID of the element */
    id: number;
};
export type UpdatePropertiesForElementByTypeAndIdApiResponse = /** status 200 Element Properties data as json */ {
    items?: DataProperty[];
};
export type UpdatePropertiesForElementByTypeAndIdApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "dataObject";
    /** ID of the element */
    id: number;
    body: {
        items?: UpdateDataProperty[];
    };
};
export type PredefinedProperty = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** id */
    id?: string;
    /** name */
    name?: string;
    /** description */
    description?: string | null;
    /** key */
    key?: string;
    /** type */
    type?: string;
    /** data */
    data?: string | null;
    /** config */
    config?: string | null;
    /** ctype */
    ctype?: string;
    /** inheritable */
    inheritable?: boolean;
    /** Creation date */
    creationDate?: number;
    /** Modification date */
    modificationDate?: number;
};
export type Error = {
    /** Message */
    message?: string;
};
export type DevError = {
    /** Message */
    message?: string;
    /** Details */
    details?: string;
};
export type DataProperty = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** key */
    key?: string;
    /** data */
    data?: any | null;
    /** type */
    type?: string;
    /** inheritable */
    inheritable?: boolean;
    /** inherited */
    inherited?: boolean;
    /** config */
    config?: string | null;
    /** predefinedName */
    predefinedName?: string | null;
    /** description */
    description?: string | null;
};
export type UpdateDataProperty = {
    /** key */
    key?: string;
    /** data */
    data?: any | null;
    /** type */
    type?: string;
    /** inheritable */
    inheritable?: boolean;
};
export const {
    useGetPropertiesQuery,
    useGetPropertiesForElementByTypeAndIdQuery,
    useUpdatePropertiesForElementByTypeAndIdMutation,
} = injectedRtkApi;
