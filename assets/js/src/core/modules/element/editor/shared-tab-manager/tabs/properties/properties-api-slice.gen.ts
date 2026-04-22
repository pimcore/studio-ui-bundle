import { api } from "@sdk/api";
export const addTagTypes = ["Properties"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            propertyGetCollection: build.query<PropertyGetCollectionApiResponse, PropertyGetCollectionApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/properties`,
                    params: {
                        elementType: queryArg.elementType,
                        filter: queryArg.filter,
                    },
                }),
                providesTags: ["Properties"],
            }),
            propertyCreate: build.mutation<PropertyCreateApiResponse, PropertyCreateApiArg>({
                query: () => ({ url: `/pimcore-studio/api/property`, method: "POST" }),
                invalidatesTags: ["Properties"],
            }),
            propertyUpdate: build.mutation<PropertyUpdateApiResponse, PropertyUpdateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/properties/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.updatePredefinedProperty,
                }),
                invalidatesTags: ["Properties"],
            }),
            propertyDelete: build.mutation<PropertyDeleteApiResponse, PropertyDeleteApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/properties/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Properties"],
            }),
            propertyGetCollectionForElementByTypeAndId: build.query<
                PropertyGetCollectionForElementByTypeAndIdApiResponse,
                PropertyGetCollectionForElementByTypeAndIdApiArg
            >({
                query: (queryArg) => ({ url: `/pimcore-studio/api/properties/${queryArg.elementType}/${queryArg.id}` }),
                providesTags: ["Properties"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type PropertyGetCollectionApiResponse = /** status 200 property_get_collection_success_response */ {
    items?: PredefinedProperty[];
};
export type PropertyGetCollectionApiArg = {
    /** Filter elements by matching element type. */
    elementType?: "asset" | "document" | "data-object";
    /** Filter for properties */
    filter?: string;
};
export type PropertyCreateApiResponse = /** status 200 property_create_success_response */ PredefinedProperty;
export type PropertyCreateApiArg = void;
export type PropertyUpdateApiResponse = /** status 200 property_update_success_response */ PredefinedProperty;
export type PropertyUpdateApiArg = {
    /** Id of the property */
    id: string;
    updatePredefinedProperty: UpdatePredefinedProperty;
};
export type PropertyDeleteApiResponse = unknown;
export type PropertyDeleteApiArg = {
    /** Id of the property */
    id: string;
};
export type PropertyGetCollectionForElementByTypeAndIdApiResponse =
    /** status 200 property_get_collection_for_element_by_type_and_id_success_response */ {
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
        [key: string]: string | number | boolean | object;
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
        [key: string]: string | number | boolean | object;
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
    usePropertyCreateMutation,
    usePropertyUpdateMutation,
    usePropertyDeleteMutation,
    usePropertyGetCollectionForElementByTypeAndIdQuery,
} = injectedRtkApi;
