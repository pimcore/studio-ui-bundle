import { api } from "@sdk/api";
export const addTagTypes = ["Units"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            unitQuantityValueUnitsCollection: build.mutation<
                UnitQuantityValueUnitsCollectionApiResponse,
                UnitQuantityValueUnitsCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/unit/quantity-value/units/collection`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Units"],
            }),
            unitQuantityValueConvertAll: build.query<
                UnitQuantityValueConvertAllApiResponse,
                UnitQuantityValueConvertAllApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/unit/quantity-value/convert-all`,
                    params: {
                        fromUnitId: queryArg.fromUnitId,
                        value: queryArg.value,
                    },
                }),
                providesTags: ["Units"],
            }),
            unitQuantityValueConvert: build.query<UnitQuantityValueConvertApiResponse, UnitQuantityValueConvertApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/unit/quantity-value/convert`,
                    params: {
                        fromUnitId: queryArg.fromUnitId,
                        toUnitId: queryArg.toUnitId,
                        value: queryArg.value,
                    },
                }),
                providesTags: ["Units"],
            }),
            unitQuantityValueUnitsCreate: build.mutation<
                UnitQuantityValueUnitsCreateApiResponse,
                UnitQuantityValueUnitsCreateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/unit/quantity-value/units`,
                    method: "POST",
                    body: queryArg.createUnitParameters,
                }),
                invalidatesTags: ["Units"],
            }),
            unitQuantityValueUnitsUpdate: build.mutation<
                UnitQuantityValueUnitsUpdateApiResponse,
                UnitQuantityValueUnitsUpdateApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/unit/quantity-value/units/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.updateUnitParameters,
                }),
                invalidatesTags: ["Units"],
            }),
            unitQuantityValueUnitsDelete: build.mutation<
                UnitQuantityValueUnitsDeleteApiResponse,
                UnitQuantityValueUnitsDeleteApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/unit/quantity-value/units/${queryArg.id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Units"],
            }),
            unitQuantityValueUnitsExport: build.query<
                UnitQuantityValueUnitsExportApiResponse,
                UnitQuantityValueUnitsExportApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/unit/quantity-value/units/export` }),
                providesTags: ["Units"],
            }),
            unitQuantityValueUnitsImport: build.mutation<
                UnitQuantityValueUnitsImportApiResponse,
                UnitQuantityValueUnitsImportApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/unit/quantity-value/units/import`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Units"],
            }),
            unitQuantityValueList: build.query<UnitQuantityValueListApiResponse, UnitQuantityValueListApiArg>({
                query: () => ({ url: `/pimcore-studio/api/unit/quantity-value/unit-list` }),
                providesTags: ["Units"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type UnitQuantityValueUnitsCollectionApiResponse =
    /** status 200 unit_quantity_value_units_collection_success_response */ {
        totalItems: number;
        items: QuantityValueUnit[];
    };
export type UnitQuantityValueUnitsCollectionApiArg = {
    body: {
        filters?: {
            page?: number;
            pageSize?: number;
            columnFilters?: object;
            sortFilter?: object;
        };
    };
};
export type UnitQuantityValueConvertAllApiResponse =
    /** status 200 unit_quantity_value_convert_all_success_response */ ConvertedQuantityValues;
export type UnitQuantityValueConvertAllApiArg = {
    /** Id of the unit to convert from */
    fromUnitId: string;
    /** Value to convert. */
    value: number;
};
export type UnitQuantityValueConvertApiResponse = /** status 200 unit_quantity_value_convert_success_response */ {
    /** Converted value */
    data: number | number;
};
export type UnitQuantityValueConvertApiArg = {
    /** Id of the unit to convert from */
    fromUnitId: string;
    /** Id of the unit to convert to */
    toUnitId: string;
    /** Value to convert. */
    value: number;
};
export type UnitQuantityValueUnitsCreateApiResponse =
    /** status 200 unit_quantity_value_units_create_success_response */ QuantityValueUnit;
export type UnitQuantityValueUnitsCreateApiArg = {
    createUnitParameters: CreateUnitParameters;
};
export type UnitQuantityValueUnitsUpdateApiResponse =
    /** status 200 unit_quantity_value_units_update_success_response */ QuantityValueUnit;
export type UnitQuantityValueUnitsUpdateApiArg = {
    /** unit_quantity_value_units_update_param_id */
    id: string;
    updateUnitParameters: UpdateUnitParameters;
};
export type UnitQuantityValueUnitsDeleteApiResponse = unknown;
export type UnitQuantityValueUnitsDeleteApiArg = {
    /** unit_quantity_value_units_delete_param_id */
    id: string;
};
export type UnitQuantityValueUnitsExportApiResponse =
    /** status 200 unit_quantity_value_units_export_success_response */ Blob;
export type UnitQuantityValueUnitsExportApiArg = void;
export type UnitQuantityValueUnitsImportApiResponse = unknown;
export type UnitQuantityValueUnitsImportApiArg = {
    body: {
        /** JSON file containing quantity value unit definitions */
        file: Blob;
    };
};
export type UnitQuantityValueListApiResponse = /** status 200 unit_quantity_value_list_success_response */ {
    items: QuantityValueUnit[];
};
export type UnitQuantityValueListApiArg = void;
export type QuantityValueUnit = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
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
    unitAbbreviation: string;
    /** Unit Long Name */
    unitLongName: string;
    /** Converted Values */
    convertedValue: number;
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
export type CreateUnitParameters = {
    /** Unique unit ID */
    id: string;
    /** Abbreviation */
    abbreviation?: string | null;
    /** Long name */
    longname?: string | null;
    /** Group */
    group?: string | null;
    /** Base unit ID */
    baseunit?: string | null;
    /** Conversion factor */
    factor?: number | null;
    /** Conversion offset */
    conversionOffset?: number | null;
    /** Converter service class */
    converter?: string | null;
    /** Reference */
    reference?: string | null;
};
export type UpdateUnitParameters = {
    /** Abbreviation */
    abbreviation?: string | null;
    /** Long name */
    longname?: string | null;
    /** Group */
    group?: string | null;
    /** Base unit ID */
    baseunit?: string | null;
    /** Conversion factor */
    factor?: number | null;
    /** Conversion offset */
    conversionOffset?: number | null;
    /** Converter service class */
    converter?: string | null;
    /** Reference */
    reference?: string | null;
};
export const {
    useUnitQuantityValueUnitsCollectionMutation,
    useUnitQuantityValueConvertAllQuery,
    useUnitQuantityValueConvertQuery,
    useUnitQuantityValueUnitsCreateMutation,
    useUnitQuantityValueUnitsUpdateMutation,
    useUnitQuantityValueUnitsDeleteMutation,
    useUnitQuantityValueUnitsExportQuery,
    useUnitQuantityValueUnitsImportMutation,
    useUnitQuantityValueListQuery,
} = injectedRtkApi;
