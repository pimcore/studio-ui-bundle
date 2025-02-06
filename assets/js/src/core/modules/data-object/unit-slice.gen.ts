import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Units"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            unitQuantityValueConvertAll: build.query<
                UnitQuantityValueConvertAllApiResponse,
                UnitQuantityValueConvertAllApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/unit/quantity-value/convert-all`,
                    params: { fromUnitId: queryArg.fromUnitId, value: queryArg.value },
                }),
                providesTags: ["Units"],
            }),
            unitQuantityValueConvert: build.query<UnitQuantityValueConvertApiResponse, UnitQuantityValueConvertApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/unit/quantity-value/convert`,
                    params: { fromUnitId: queryArg.fromUnitId, toUnitId: queryArg.toUnitId, value: queryArg.value },
                }),
                providesTags: ["Units"],
            }),
            unitQuantityValueList: build.query<UnitQuantityValueListApiResponse, UnitQuantityValueListApiArg>({
                query: () => ({ url: `/pimcore-studio/api/unit/quantity-value/unit-list` }),
                providesTags: ["Units"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type UnitQuantityValueConvertAllApiResponse = /** status 200 Converted quantity value */ ConvertedQuantityValues;
export type UnitQuantityValueConvertAllApiArg = {
    /** Id of the unit to convert from */
    fromUnitId: string;
    /** Value to convert. */
    value: number | number;
};
export type UnitQuantityValueConvertApiResponse = /** status 200 Converted quantity value */ {
    /** Converted value */
    data: any | number;
};
export type UnitQuantityValueConvertApiArg = {
    /** Id of the unit to convert from */
    fromUnitId: string;
    /** Id of the unit to convert to */
    toUnitId: string;
    /** Value to convert. */
    value: number | number;
};
export type UnitQuantityValueListApiResponse = /** status 200 List of quantity value units */ {
    items: QuantityValueUnit[];
};
export type UnitQuantityValueListApiArg = void;
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
        [key: string]: string | number | boolean | object;
    };
    /** Original Value */
    originalValue: any | number;
    /** From Unit Id */
    fromUnitId: string;
    /** Converted Values */
    convertedValues: ConvertedQuantityValues2[];
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
export type QuantityValueUnit = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: any;
    /** Abbreviation */
    abbreviation: any;
    /** Group */
    group: any;
    /** Long Name */
    longName: any;
    /** Base Unit */
    baseUnit: any;
    /** Reference */
    reference: any;
    /** Factor */
    factor: any;
    /** Conversion Offset */
    conversionOffset: any;
    /** Converter */
    converter: any;
};
export const { useUnitQuantityValueConvertAllQuery, useUnitQuantityValueConvertQuery, useUnitQuantityValueListQuery } =
    injectedRtkApi;
