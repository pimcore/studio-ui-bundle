import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Translation"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            apiTranslationsPost: build.mutation<ApiTranslationsPostApiResponse, ApiTranslationsPostApiArg>({
                query: (queryArg) => ({ url: `/api/translations`, method: "POST", body: queryArg.translationJsonld }),
                invalidatesTags: ["Translation"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type ApiTranslationsPostApiResponse =
    /** status 201 Translation resource created */ TranslationJsonldTranslationReadRead;
export type ApiTranslationsPostApiArg = {
    /** The new Translation resource */
    translationJsonld: TranslationJsonld;
};
export type TranslationJsonldTranslationRead = {
    locale?: string;
    keys?: string[];
};
export type TranslationJsonldTranslationReadRead = {
    "@context"?:
        | string
        | {
              "@vocab": string;
              hydra: "http://www.w3.org/ns/hydra/core#";
              [key: string]: any;
          };
    "@id"?: string;
    "@type"?: string;
    locale?: string;
    keys?: string[];
};
export type TranslationJsonld = {
    locale?: string;
    keys?: string[];
};
export const { useApiTranslationsPostMutation } = injectedRtkApi;
