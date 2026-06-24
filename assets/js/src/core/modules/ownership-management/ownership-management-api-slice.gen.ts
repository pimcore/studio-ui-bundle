import { api } from "@sdk/api";
export const addTagTypes = ["Ownership Management"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            ownershipManagementGetTypes: build.query<
                OwnershipManagementGetTypesApiResponse,
                OwnershipManagementGetTypesApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/ownership-management/types` }),
                providesTags: ["Ownership Management"],
            }),
            ownershipManagementGetCollection: build.query<
                OwnershipManagementGetCollectionApiResponse,
                OwnershipManagementGetCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/ownership-management/${queryArg.type}/configurations`,
                    method: "POST",
                    body: queryArg.body,
                }),
                providesTags: ["Ownership Management"],
            }),
            ownershipManagementReassignOwner: build.mutation<
                OwnershipManagementReassignOwnerApiResponse,
                OwnershipManagementReassignOwnerApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/ownership-management/${queryArg.type}/owner`,
                    method: "PUT",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Ownership Management"],
            }),
            ownershipManagementDelete: build.mutation<
                OwnershipManagementDeleteApiResponse,
                OwnershipManagementDeleteApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/ownership-management/${queryArg.type}/configurations`,
                    method: "DELETE",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Ownership Management"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type OwnershipManagementGetTypesApiResponse = /** status 200 Manageable configuration types */ {
    totalItems: number;
    items: ConfigurationType[];
};
export type OwnershipManagementGetTypesApiArg = void;
export type OwnershipManagementGetCollectionApiResponse =
    /** status 200 Paginated configurations with total count */ {
        totalItems: number;
        items: OwnershipConfiguration[];
    };
export type OwnershipManagementGetCollectionApiArg = {
    /** Configuration type to list. */
    type: string;
    body: {
        filters?: {
            page?: number;
            pageSize?: number;
            columnFilters?: object;
            sortFilter?: object;
            additionalSortFilters?: object;
        };
    };
};
export type OwnershipManagementReassignOwnerApiResponse =
    /** status 201 Successfully created <strong>jobRun</strong> to reassign the owner */ {
        /** ID of created jobRun */
        jobRunId?: number;
    };
export type OwnershipManagementReassignOwnerApiArg = {
    /** Configuration type whose owner should be reassigned. */
    type: string;
    body: {
        ids: string[];
        newOwnerId: number;
    };
};
export type OwnershipManagementDeleteApiResponse =
    /** status 201 Successfully created <strong>jobRun</strong> to delete the configurations */ {
        /** ID of created jobRun */
        jobRunId?: number;
    };
export type OwnershipManagementDeleteApiArg = {
    /** Configuration type to delete from. */
    type: string;
    body: {
        ids: string[];
    };
};
export type ConfigurationType = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Unique type identifier */
    type: string;
    /** Translation key for the tab label */
    label: string;
    /** Icon identifier for the tab */
    icon: string;
};
export type OwnershipConfiguration = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: string;
    /** Type */
    type: string;
    /** Name */
    name: string;
    /** Owner ID */
    ownerId: number;
    /** Owner username (null when the owner has been deleted) */
    ownerName?: string | null;
    /** Whether the owner user no longer exists */
    ownerDeleted: boolean;
    /** Creation date as a unix timestamp */
    creationDate?: number | null;
    /** Modification date as a unix timestamp */
    modificationDate?: number | null;
};
export const {
    useOwnershipManagementGetTypesQuery,
    useOwnershipManagementGetCollectionQuery,
    useOwnershipManagementReassignOwnerMutation,
    useOwnershipManagementDeleteMutation,
} = injectedRtkApi;
