import { api } from "../../../app/api/pimcore/index";
export const addTagTypes = ["Translation"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getTranslations: build.mutation<GetTranslationsApiResponse, GetTranslationsApiArg>({
                query: (queryArg) => ({ url: `/studio/api/translations`, method: "POST", body: queryArg.translation }),
                invalidatesTags: ["Translation"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type GetTranslationsApiResponse = /** status 200 Key value pairs for given keys and locale */ Translation;
export type GetTranslationsApiArg = {
    translation: Translation;
};
export type Translation = {
    /** Locale */
    locale: string;
    /** Keys */
    keys: string[];
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
export const { useGetTranslationsMutation } = injectedRtkApi;
