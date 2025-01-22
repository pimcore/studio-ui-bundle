import { api } from "../../app/api/pimcore/index";
export const addTagTypes = ["Documents"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            documentsListAvailableSites: build.query<
                DocumentsListAvailableSitesApiResponse,
                DocumentsListAvailableSitesApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/documents/sites/list-available`,
                    params: { excludeMainSite: queryArg.excludeMainSite },
                }),
                providesTags: ["Documents"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type DocumentsListAvailableSitesApiResponse = /** status 200 List of available sites */ {
    items: Site[];
};
export type DocumentsListAvailableSitesApiArg = {
    /** Exclude main site from the list */
    excludeMainSite?: boolean;
};
export type Site = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number;
    /** Domains */
    domains: string[];
    /** Domain */
    domain: string;
    /** ID of the root */
    rootId?: any;
    /** Root path */
    rootPath?: any;
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
export const { useDocumentsListAvailableSitesQuery } = injectedRtkApi;
