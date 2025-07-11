import { api } from "@sdk/api";
export const addTagTypes = ["Translation"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            translationCreate: build.mutation<TranslationCreateApiResponse, TranslationCreateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/translations/create`,
                    method: "POST",
                    body: queryArg.createTranslation,
                }),
                invalidatesTags: ["Translation"],
            }),
            translationDeleteByKey: build.mutation<TranslationDeleteByKeyApiResponse, TranslationDeleteByKeyApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/translations/${queryArg.key}`, method: "DELETE" }),
                invalidatesTags: ["Translation"],
            }),
            translationGetDomains: build.query<TranslationGetDomainsApiResponse, TranslationGetDomainsApiArg>({
                query: () => ({ url: `/pimcore-studio/api/translations/domains` }),
                providesTags: ["Translation"],
            }),
            translationUpdate: build.mutation<TranslationUpdateApiResponse, TranslationUpdateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/translations`,
                    method: "PUT",
                    body: queryArg.updateTranslation,
                }),
                invalidatesTags: ["Translation"],
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
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type TranslationCreateApiResponse = unknown;
export type TranslationCreateApiArg = {
    createTranslation: TranslationCreate;
};
export type TranslationDeleteByKeyApiResponse = unknown;
export type TranslationDeleteByKeyApiArg = {
    /** Delete translations by matching key */
    key: string;
};
export type TranslationGetDomainsApiResponse = /** status 200 List of available translation domains */ {
    /** List if all available domains in the system for translations. */
    domains: string[];
};
export type TranslationGetDomainsApiArg = void;
export type TranslationUpdateApiResponse = unknown;
export type TranslationUpdateApiArg = {
    updateTranslation: TranslationUpdate;
};
export type TranslationGetCollectionApiResponse =
    /** status 200 Key value pairs for given keys and locale */ Translation;
export type TranslationGetCollectionApiArg = {
    translation: Translation;
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
};
export type TranslationCreate = {
    /** Translation Data */
    translationData: TranslationDataForCreate[];
};
export type TranslationData = {
    /** Key */
    key: string;
    /** Translation */
    translation: string;
    /** Type */
    type: string;
};
export type TranslationUpdate = {
    /** Locale */
    locale: string;
    /** Translation Data */
    translationData: TranslationData[];
};
export type Translation = {
    /** Locale */
    locale: string;
    /** Keys for Translation - Fallback will be  applied to all Keys automatically */
    keys: string[];
    /** Apply Fallback Language. Used only if no keys are defined */
    useFallback?: boolean;
};
export const {
    useTranslationCreateMutation,
    useTranslationDeleteByKeyMutation,
    useTranslationGetDomainsQuery,
    useTranslationUpdateMutation,
    useTranslationGetCollectionMutation,
} = injectedRtkApi;
