import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Class Definition"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            classFieldCollectionObjectLayout: build.query<
                ClassFieldCollectionObjectLayoutApiResponse,
                ClassFieldCollectionObjectLayoutApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/field-collection/${queryArg.objectId}/object/layout`,
                }),
                providesTags: ["Class Definition"],
            }),
            classObjectBrickObjectLayout: build.query<
                ClassObjectBrickObjectLayoutApiResponse,
                ClassObjectBrickObjectLayoutApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/object-brick/${queryArg.objectId}/object/layout`,
                }),
                providesTags: ["Class Definition"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type ClassFieldCollectionObjectLayoutApiResponse = /** status 200 List of layouts */ {
    totalItems: number;
    items: FieldCollectionLayoutDefinition[];
};
export type ClassFieldCollectionObjectLayoutApiArg = {
    /** ObjectId of the element */
    objectId: number;
};
export type ClassObjectBrickObjectLayoutApiResponse = /** status 200 List of layouts */ {
    totalItems: number;
    items: ObjectBrickLayoutDefinition[];
};
export type ClassObjectBrickObjectLayoutApiArg = {
    /** ObjectId of the element */
    objectId: number;
};
export type FieldCollectionLayoutDefinition = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key of Field Collection */
    key: string;
    /** Data Type */
    datatype: string;
    /** Group */
    group?: any;
    /** Name */
    name?: any;
    /** Type */
    type?: any;
    /** Region */
    region?: any;
    /** Title */
    title: any;
    /** Width */
    width: number;
    /** Height */
    height: number;
    /** Collapsible */
    collapsible: boolean;
    /** collapsed */
    collapsed: boolean;
    /** Children */
    children: any[];
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
export type ObjectBrickLayoutDefinition = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key of Object Brick */
    key: string;
    /** Data Type */
    datatype: string;
    /** Name */
    name?: any;
    /** Type */
    type?: any;
    /** Region */
    region?: any;
    /** Title */
    title: any;
    /** Width */
    width: number;
    /** Height */
    height: number;
    /** Collapsible */
    collapsible: boolean;
    /** collapsed */
    collapsed: boolean;
    /** Children */
    children: any[];
};
export const { useClassFieldCollectionObjectLayoutQuery, useClassObjectBrickObjectLayoutQuery } = injectedRtkApi;
