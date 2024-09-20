import { api } from "../../../../../../app/api/pimcore/index";
export const addTagTypes = ["Properties"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            propertyGetCollection: build.query<PropertyGetCollectionApiResponse, PropertyGetCollectionApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/properties`,
                    params: { elementType: queryArg.elementType, filter: queryArg.filter },
                }),
                providesTags: ["Properties"],
            }),
            propertyUpdate: build.mutation<PropertyUpdateApiResponse, PropertyUpdateApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/properties/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.updatePredefinedProperty,
                }),
                invalidatesTags: ["Properties"],
            }),
            propertyDelete: build.mutation<PropertyDeleteApiResponse, PropertyDeleteApiArg>({
                query: (queryArg) => ({ url: `/studio/api/properties/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Properties"],
            }),
            propertyGetCollectionForElementByTypeAndId: build.query<
                PropertyGetCollectionForElementByTypeAndIdApiResponse,
                PropertyGetCollectionForElementByTypeAndIdApiArg
            >({
                query: (queryArg) => ({ url: `/studio/api/properties/${queryArg.elementType}/${queryArg.id}` }),
                providesTags: ["Properties"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type PropertyGetCollectionApiResponse =
    /** status 200 Predefined properties filtered based on type and query parameters */ {
        items?: PredefinedProperty[];
    };
export type PropertyGetCollectionApiArg = {
    /** Filter elements by matching element type. */
    elementType?: "asset" | "document" | "data-object";
    /** Filter for properties */
    filter?: string;
};
export type PropertyUpdateApiResponse = /** status 200 Updated predefined property */ PredefinedProperty;
export type PropertyUpdateApiArg = {
    /** Id of the property */
    id: string;
    updatePredefinedProperty: UpdatePredefinedProperty;
};
export type PropertyDeleteApiResponse = /** status 200 Successfully deleted property with given id */ void;
export type PropertyDeleteApiArg = {
    /** Id of the property */
    id: string;
};
export type PropertyGetCollectionForElementByTypeAndIdApiResponse = /** status 200 Element Properties data as json */ {
    items?: DataProperty[];
};
export type PropertyGetCollectionForElementByTypeAndIdApiArg = {
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
    /** Id of the element */
    id: number;
};
export type PredefinedProperty = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** id */
    id: string;
    /** name */
    name: string;
    /** description */
    description?: string | null;
    /** key */
    key: string;
    /** type */
    type: string;
    /** data */
    data?: string | null;
    /** config */
    config?: string | null;
    /** ctype */
    ctype: string;
    /** inheritable */
    inheritable: boolean;
    /** Creation date */
    creationDate: number;
    /** Modification date */
    modificationDate: number;
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
export type UpdatePredefinedProperty = {
    /** name */
    name: string;
    /** description */
    description?: string | null;
    /** key */
    key: string;
    /** type */
    type: string;
    /** data */
    data?: string | null;
    /** config */
    config?: string | null;
    /** ctype */
    ctype: string;
    /** inheritable */
    inheritable: boolean;
};
export type DataProperty = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** key */
    key: string;
    /** data */
    data: any | null;
    /** type */
    type: string;
    /** inheritable */
    inheritable: boolean;
    /** inherited */
    inherited: boolean;
    /** config */
    config?: string | null;
    /** predefinedName */
    predefinedName?: string | null;
    /** description */
    description?: string | null;
};
export const {
    usePropertyGetCollectionQuery,
    usePropertyUpdateMutation,
    usePropertyDeleteMutation,
    usePropertyGetCollectionForElementByTypeAndIdQuery,
} = injectedRtkApi;
