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
            classQuantityValueUnitConvertAll: build.mutation<
                ClassQuantityValueUnitConvertAllApiResponse,
                ClassQuantityValueUnitConvertAllApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/quantity-value/convert-all`,
                    method: "POST",
                    body: queryArg.convertAllParameters,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classQuantityValueUnitConvert: build.mutation<
                ClassQuantityValueUnitConvertApiResponse,
                ClassQuantityValueUnitConvertApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/class/quantity-value/convert`,
                    method: "POST",
                    body: queryArg.convertParameters,
                }),
                invalidatesTags: ["Class Definition"],
            }),
            classQuantityValueUnitList: build.query<
                ClassQuantityValueUnitListApiResponse,
                ClassQuantityValueUnitListApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/class/quantity-value/unit-list` }),
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
export type ClassQuantityValueUnitConvertAllApiResponse =
    /** status 200 Converted quantity value */ ConvertedQuantityValues;
export type ClassQuantityValueUnitConvertAllApiArg = {
    convertAllParameters: ConvertAllUnitsParameters;
};
export type ClassQuantityValueUnitConvertApiResponse = /** status 200 Converted quantity value */ {
    /** Converted value */
    data: any | number;
};
export type ClassQuantityValueUnitConvertApiArg = {
    convertParameters: UnitConvertParameters;
};
export type ClassQuantityValueUnitListApiResponse = /** status 200 List of quantity value units */ {
    items: QuantityValueUnit[];
};
export type ClassQuantityValueUnitListApiArg = void;
export type FieldCollectionLayoutDefinition = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** Key of Field Collection */
    key: string;
    /** Data Type */
    datatype: string;
    /** Group */
    group?: string | null;
    /** Name */
    name?: string | null;
    /** Type */
    type?: string | null;
    /** Region */
    region?: string | null;
    /** Title */
    title: string | null;
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
export type ConvertedQuantityValues2 = {
    /** Unit Abbreviation */
    unitAbbreviation?: string;
    /** Unit Long Name */
    unitLongName?: string;
    /** Converted Values */
    convertedValue?: number;
};
export type ConvertedQuantityValues = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** Original Value */
    originalValue: any | number;
    /** From Unit Id */
    fromUnitId: string;
    /** Converted Values */
    convertedValues: ConvertedQuantityValues2[];
};
export type ConvertAllUnitsParameters = {
    /** From Unit Id */
    fromUnitId: string;
    /** Value */
    value: any | number;
};
export type UnitConvertParameters = {
    /** From Unit Id */
    fromUnitId: string;
    /** To Unit Id */
    toUnitId: string;
    /** Value */
    value: any | number;
};
export type QuantityValueUnit = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
    };
    /** ID */
    id: string | null;
    /** Abbreviation */
    abbreviation: string | null;
    /** Group */
    group: string | null;
    /** Long Name */
    longName: string | null;
    /** Base Unit */
    baseUnit: string | null;
    /** Reference */
    reference: string | null;
    /** Factor */
    factor: number | null;
    /** Conversion Offset */
    conversionOffset: number | null;
    /** Converter */
    converter: string | null;
};
export const {
    useClassFieldCollectionObjectLayoutQuery,
    useClassQuantityValueUnitConvertAllMutation,
    useClassQuantityValueUnitConvertMutation,
    useClassQuantityValueUnitListQuery,
} = injectedRtkApi;
