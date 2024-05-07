export declare const addTagTypes: readonly ["Translation"];
declare const injectedRtkApi: import("@reduxjs/toolkit/query").Api<import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, import("@reduxjs/toolkit/dist/query/endpointDefinitions").UpdateDefinitions<{}, "Translation", never> & {
    getTranslations: import("@reduxjs/toolkit/query").MutationDefinition<GetTranslationsApiArg, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "Translation", Translation, "api">;
}, "api", "Translation", typeof import("@reduxjs/toolkit/query").coreModuleName | typeof import("@reduxjs/toolkit/dist/query/react").reactHooksModuleName>;
export { injectedRtkApi as api };
export type GetTranslationsApiResponse = Translation;
export type GetTranslationsApiArg = {
    translation: Translation;
};
export type Translation = {
    /** Locale */
    locale?: string;
    /** Keys */
    keys?: string[];
};
export type Unauthorized = {
    /** Message */
    message?: string;
};
export declare const useGetTranslationsMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<GetTranslationsApiArg, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "Translation", Translation, "api">>;
//# sourceMappingURL=translations-api-slice.gen.d.ts.map