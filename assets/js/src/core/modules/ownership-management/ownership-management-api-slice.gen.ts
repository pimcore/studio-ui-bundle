import { api } from "@sdk/api";
export const addTagTypes = ["Ownership Management"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            ownershipManagementGetCollection: build.mutation<
                OwnershipManagementGetCollectionApiResponse,
                OwnershipManagementGetCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/ownership-management/${queryArg["type"]}/configurations`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["Ownership Management"],
            }),
            ownershipManagementDeleteConfigurations: build.mutation<
                OwnershipManagementDeleteConfigurationsApiResponse,
                OwnershipManagementDeleteConfigurationsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/ownership-management/${queryArg["type"]}/configurations`,
                    method: "DELETE",
                    body: queryArg.ownershipDeleteParameter,
                }),
                invalidatesTags: ["Ownership Management"],
            }),
            ownershipManagementReassignOwner: build.mutation<
                OwnershipManagementReassignOwnerApiResponse,
                OwnershipManagementReassignOwnerApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/ownership-management/${queryArg["type"]}/owner`,
                    method: "PUT",
                    body: queryArg.ownershipReassignOwnerParameter,
                }),
                invalidatesTags: ["Ownership Management"],
            }),
            ownershipManagementGetTypes: build.query<
                OwnershipManagementGetTypesApiResponse,
                OwnershipManagementGetTypesApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/ownership-management/types` }),
                providesTags: ["Ownership Management"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type OwnershipManagementGetCollectionApiResponse =
    /** status 200 Successfully retrieved the list of configurations */ {
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
export type OwnershipManagementDeleteConfigurationsApiResponse =
    /** status 201 A job run was created to delete the configurations asynchronously */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type OwnershipManagementDeleteConfigurationsApiArg = {
    /** Configuration type to delete from. */
    type: string;
    ownershipDeleteParameter: OwnershipDeleteParameter;
};
export type OwnershipManagementReassignOwnerApiResponse =
    /** status 201 A job run was created to reassign the owner asynchronously */ {
        /** ID of created jobRun */
        jobRunId: number;
    };
export type OwnershipManagementReassignOwnerApiArg = {
    /** Configuration type whose owner should be reassigned. */
    type: string;
    ownershipReassignOwnerParameter: OwnershipReassignOwnerParameter;
};
export type OwnershipManagementGetTypesApiResponse =
    /** status 200 Successfully retrieved the list of configuration types */ {
        totalItems: number;
        items: OwnershipConfigurationType[];
    };
export type OwnershipManagementGetTypesApiArg = void;
export type OwnershipConfiguration = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Unique identifier of the configuration */
    id: string;
    /** Type identifier of the configuration */
    type: string;
    /** Display name of the configuration */
    name: string;
    /** User ID of the current owner */
    ownerId: number;
    /** Username of the current owner. Null when the owner has been deleted. */
    ownerName?: string | null;
    /** Whether the owner user no longer exists. When true the UI should show the owner id only. */
    ownerDeleted: boolean;
    /** Creation date as a unix timestamp */
    creationDate?: number | null;
    /** Modification date as a unix timestamp */
    modificationDate?: number | null;
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
export type OwnershipDeleteParameter = {
    /** Identifiers of the configurations to delete */
    ids: string[];
};
export type OwnershipReassignOwnerParameter = {
    /** Identifiers of the configurations whose owner should be reassigned */
    ids: string[];
    /** User ID of the new owner */
    newOwnerId: number;
};
export type OwnershipConfigurationType = {
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
export const {
    useOwnershipManagementGetCollectionMutation,
    useOwnershipManagementDeleteConfigurationsMutation,
    useOwnershipManagementReassignOwnerMutation,
    useOwnershipManagementGetTypesQuery,
} = injectedRtkApi;
