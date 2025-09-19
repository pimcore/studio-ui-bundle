import { api } from "@sdk/api";
export const addTagTypes = ["Translation"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            translationGetAvailableLocales: build.query<
                TranslationGetAvailableLocalesApiResponse,
                TranslationGetAvailableLocalesApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/translations/available-locales` }),
                providesTags: ["Translation"],
            }),
            translationCleanupByDomain: build.mutation<
                TranslationCleanupByDomainApiResponse,
                TranslationCleanupByDomainApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/translations/${queryArg.domain}/cleanup`,
                    method: "DELETE",
                }),
                invalidatesTags: ["Translation"],
            }),
            translationCreate: build.mutation<TranslationCreateApiResponse, TranslationCreateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/translations/create`,
                    method: "POST",
                    body: queryArg.createTranslation,
                }),
                invalidatesTags: ["Translation"],
            }),
            translationDetermineCsvSettingsForImport: build.mutation<
                TranslationDetermineCsvSettingsForImportApiResponse,
                TranslationDetermineCsvSettingsForImportApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/translations/csv-settings`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Translation"],
            }),
            translationDeleteByKey: build.mutation<TranslationDeleteByKeyApiResponse, TranslationDeleteByKeyApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/translations/${queryArg.key}`,
                    method: "DELETE",
                    params: {
                        domain: queryArg.domain,
                    },
                }),
                invalidatesTags: ["Translation"],
            }),
            translationGetDomains: build.query<TranslationGetDomainsApiResponse, TranslationGetDomainsApiArg>({
                query: () => ({ url: `/pimcore-studio/api/translations/domains` }),
                providesTags: ["Translation"],
            }),
            translationExportList: build.mutation<TranslationExportListApiResponse, TranslationExportListApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/translations/export`,
                    method: "POST",
                    body: queryArg.body,
                    params: {
                        domain: queryArg.domain,
                    },
                }),
                invalidatesTags: ["Translation"],
            }),
            translationImportCsv: build.mutation<TranslationImportCsvApiResponse, TranslationImportCsvApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/translations/${queryArg.domain}/import`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Translation"],
            }),
            translationGetList: build.query<TranslationGetListApiResponse, TranslationGetListApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/translations/list`,
                    method: "POST",
                    body: queryArg.body,
                    params: {
                        domain: queryArg.domain,
                    },
                }),
                providesTags: ["Translation"],
            }),
            translationGetCollection: build.mutation<
                TranslationGetCollectionApiResponse,
                TranslationGetCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/translations`,
                    method: "POST",
                    body: queryArg.translation,
                }),
                invalidatesTags: ["Translation"],
            }),
            translationUpdate: build.mutation<TranslationUpdateApiResponse, TranslationUpdateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/translations/${queryArg.domain}`,
                    method: "PUT",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Translation"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type TranslationGetAvailableLocalesApiResponse = /** status 200 List of available locales in the system */ {
    /** Locale code. */
    locale?: string;
    /** The display name of the locale. */
    displayName: string;
}[];
export type TranslationGetAvailableLocalesApiArg = void;
export type TranslationCleanupByDomainApiResponse = unknown;
export type TranslationCleanupByDomainApiArg = {
    /** Domain of the translation, to be cleaned up */
    domain: string;
};
export type TranslationCreateApiResponse = unknown;
export type TranslationCreateApiArg = {
    createTranslation: TranslationCreate;
};
export type TranslationDetermineCsvSettingsForImportApiResponse =
    /** status 200 Detected CSV dialect settings */ CsvSettings;
export type TranslationDetermineCsvSettingsForImportApiArg = {
    body: {
        /** Sample CSV content (first few lines) */
        sample: string;
    };
};
export type TranslationDeleteByKeyApiResponse = unknown;
export type TranslationDeleteByKeyApiArg = {
    /** Delete translations by matching key */
    key: string;
    /** Domain of the translation, defaults to "studio" */
    domain?: string;
};
export type TranslationGetDomainsApiResponse = /** status 200 List of available translation domains */ {
    /** The domain name. */
    domain: string;
    /** If the domain is a frontend or admin domain. */
    isFrontendDomain: boolean;
}[];
export type TranslationGetDomainsApiArg = void;
export type TranslationExportListApiResponse = /** status 200 CSV export file for the given domain */ Blob;
export type TranslationExportListApiArg = {
    /** Domain to filter translations by */
    domain?: string;
    body: {
        filters?: {
            columnFilters?: object;
            sortFilter?: object;
        };
    };
};
export type TranslationImportCsvApiResponse = /** status 200 Translation delta based on imported data */ {
    items: DeltaItem[];
};
export type TranslationImportCsvApiArg = {
    /** Domain of the translation for import */
    domain: string;
    body: {
        /** CSV import file to upload */
        file: Blob;
        /** Settings for CSV import */
        csvSettings: {
            delimiter?: string;
            quoteChar?: string;
            escapeChar?: string;
            lineTerminator?: string;
        };
    };
};
export type TranslationGetListApiResponse =
    /** status 200 List of translations for the given domain including all languages */ {
        totalItems: number;
        items: Translations[];
    };
export type TranslationGetListApiArg = {
    /** Domain to filter translations by */
    domain?: string;
    body: {
        filters?: {
            page?: number;
            pageSize?: number;
            columnFilters?: object;
            sortFilter?: object;
        };
    };
};
export type TranslationGetCollectionApiResponse =
    /** status 200 Key value pairs for given keys and locale */ Translation;
export type TranslationGetCollectionApiArg = {
    translation: Translation;
};
export type TranslationUpdateApiResponse = unknown;
export type TranslationUpdateApiArg = {
    /** Domain of the translation, to be updated */
    domain: string;
    body: {
        data: TranslationUpdate[];
    };
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
export type TranslationDataForCreate = {
    /** Key */
    key: string;
    /** Type */
    type: string;
    /** Domain */
    domain?: string;
};
export type TranslationCreate = {
    /** Throw an error on duplicate key */
    errorOnDuplicate?: boolean;
    /** Translation Data */
    translationData: TranslationDataForCreate[];
};
export type CsvSettings = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Field delimiter character */
    delimiter: string;
    /** Quote character for fields */
    quoteChar: string;
    /** Escape character */
    escapeChar: string;
    /** Line terminator character */
    lineTerminator: string;
};
export type TranslationDeltaValues = {
    /** Locale */
    locale: string;
    /** Current translation */
    currentTranslation: string;
    /** Imported translation */
    importTranslation: string;
};
export type DeltaItem = {
    /** Key of the translation */
    key: string;
    /** List of translation deltas for the given key */
    deltaValues: TranslationDeltaValues[];
};
export type Translations = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key of the translation */
    key: string;
    /** List of translations for the given key */
    translations: object[];
    /** Type simple or custom */
    type: string;
};
export type Translation = {
    /** Locale */
    locale: string;
    /** Keys for Translation - Fallback will be  applied to all Keys automatically */
    keys: string[];
    /** Apply Fallback Language. Used only if no keys are defined */
    useFallback?: boolean;
};
export type TranslationData = {
    /** Locale */
    locale: string;
    /** Translation */
    translation: string;
};
export type TranslationUpdate = {
    /** Key of the translation */
    key: string;
    /** Type of the translation */
    type: string | null;
    /** Translation Data */
    translationData: TranslationData[];
};
export const {
    useTranslationGetAvailableLocalesQuery,
    useTranslationCleanupByDomainMutation,
    useTranslationCreateMutation,
    useTranslationDetermineCsvSettingsForImportMutation,
    useTranslationDeleteByKeyMutation,
    useTranslationGetDomainsQuery,
    useTranslationExportListMutation,
    useTranslationImportCsvMutation,
    useTranslationGetListQuery,
    useTranslationGetCollectionMutation,
    useTranslationUpdateMutation,
} = injectedRtkApi;
