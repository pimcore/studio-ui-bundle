import { api } from "@sdk/api";
export const addTagTypes = ["Website Settings"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            websiteSettingsAdd: build.mutation<WebsiteSettingsAddApiResponse, WebsiteSettingsAddApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/website-settings/add`,
                    method: "POST",
                    body: queryArg.websiteSettingsAdd,
                }),
                invalidatesTags: ["Website Settings"],
            }),
            websiteSettingsGetCollection: build.query<
                WebsiteSettingsGetCollectionApiResponse,
                WebsiteSettingsGetCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/website-settings`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Website Settings"],
            }),
            websiteSettingsUpdate: build.mutation<WebsiteSettingsUpdateApiResponse, WebsiteSettingsUpdateApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/website-settings/${queryArg.id}`,
                    method: "PUT",
                    body: queryArg.websiteSettingsUpdate,
                }),
                invalidatesTags: ["Website Settings"],
            }),
            websiteSettingsDelete: build.mutation<WebsiteSettingsDeleteApiResponse, WebsiteSettingsDeleteApiArg>({
                query: (queryArg) => ({ url: `/pimcore-studio/api/website-settings/${queryArg.id}`, method: "DELETE" }),
                invalidatesTags: ["Website Settings"],
            }),
            websiteSettingsListTypes: build.query<WebsiteSettingsListTypesApiResponse, WebsiteSettingsListTypesApiArg>({
                query: () => ({ url: `/pimcore-studio/api/website-settings/types` }),
                providesTags: ["Website Settings"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type WebsiteSettingsAddApiResponse = /** status 200 Successfully added website setting */ WebsiteSetting;
export type WebsiteSettingsAddApiArg = {
    websiteSettingsAdd: WebsiteSettingsAdd;
};
export type WebsiteSettingsGetCollectionApiResponse = /** status 200 Paginated website settings with total count */ {
    totalItems: number;
    items: WebsiteSetting[];
};
export type WebsiteSettingsGetCollectionApiArg = {
    body: {
        filters?: {
            page?: number;
            pageSize?: number;
            columnFilters?: object;
            sortFilter?: object;
        };
    };
};
export type WebsiteSettingsUpdateApiResponse = /** status 200 Successfully updated website setting */ WebsiteSetting;
export type WebsiteSettingsUpdateApiArg = {
    /** Id of the website setting */
    id: number;
    websiteSettingsUpdate: WebsiteSettingsUpdate;
};
export type WebsiteSettingsDeleteApiResponse = /** status 200 Successfully deleted website setting */ void;
export type WebsiteSettingsDeleteApiArg = {
    /** Id of the website setting */
    id: number;
};
export type WebsiteSettingsListTypesApiResponse = /** status 200 List of all available website setting types */ {
    items: DocType[];
};
export type WebsiteSettingsListTypesApiArg = void;
export type WebsiteSetting = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number;
    /** Name */
    name: string;
    /** Language */
    language?: string;
    /** Type */
    type: any;
    /** Data */
    data: any;
    /** Site ID */
    siteId?: any;
    /** Creation date */
    creationDate?: any;
    /** Modification date */
    modificationDate?: any;
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
export type WebsiteSettingsAdd = {
    /** Name */
    name: string;
    /** Type */
    type: string;
};
export type WebsiteSettingsUpdate = {
    /** Name */
    name: string;
    /** Language */
    language: string;
    /** Data */
    data: any;
    /** Site ID */
    siteId: any;
};
export type DocType = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: string;
    /** Name */
    name: string;
    /** Type */
    type: string;
    /** Group */
    group: any;
    /** Controller */
    controller: any;
    /** Template */
    template: any;
    /** Priority */
    priority: number;
    /** Creation date */
    creationDate: any;
    /** Modification date */
    modificationDate: any;
    /** Static generator enabled */
    staticGeneratorEnabled: boolean;
    /** Is writeable */
    writeable: boolean;
};
export const {
    useWebsiteSettingsAddMutation,
    useWebsiteSettingsGetCollectionQuery,
    useWebsiteSettingsUpdateMutation,
    useWebsiteSettingsDeleteMutation,
    useWebsiteSettingsListTypesQuery,
} = injectedRtkApi;
