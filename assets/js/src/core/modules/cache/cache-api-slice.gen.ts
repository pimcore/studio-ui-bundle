import { api } from "@sdk/api";
export const addTagTypes = ["Cache"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            cacheClear: build.mutation<CacheClearApiResponse, CacheClearApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/cache`,
                    method: "DELETE",
                    params: {
                        onlyPimcoreCache: queryArg.onlyPimcoreCache,
                        onlySymfonyCache: queryArg.onlySymfonyCache,
                    },
                }),
                invalidatesTags: ["Cache"],
            }),
            cacheClearOutput: build.mutation<CacheClearOutputApiResponse, CacheClearOutputApiArg>({
                query: () => ({ url: `/pimcore-studio/api/cache/output`, method: "DELETE" }),
                invalidatesTags: ["Cache"],
            }),
            cacheClearTemporaryFiles: build.mutation<
                CacheClearTemporaryFilesApiResponse,
                CacheClearTemporaryFilesApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/cache/temporary-files`, method: "DELETE" }),
                invalidatesTags: ["Cache"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type CacheClearApiResponse = unknown;
export type CacheClearApiArg = {
    /** Only clear the Pimcore cache */
    onlyPimcoreCache?: boolean;
    /** Only clear the Symfony cache */
    onlySymfonyCache?: boolean;
};
export type CacheClearOutputApiResponse = unknown;
export type CacheClearOutputApiArg = void;
export type CacheClearTemporaryFilesApiResponse = unknown;
export type CacheClearTemporaryFilesApiArg = void;
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
export const { useCacheClearMutation, useCacheClearOutputMutation, useCacheClearTemporaryFilesMutation } =
    injectedRtkApi;
