import { api } from "@sdk/api";
export const addTagTypes = ["Maintenance Mode"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            maintenanceModeGet: build.query<MaintenanceModeGetApiResponse, MaintenanceModeGetApiArg>({
                query: () => ({ url: `/pimcore-studio/api/maintenance-mode` }),
                providesTags: ["Maintenance Mode"],
            }),
            maintenanceModeActivate: build.mutation<MaintenanceModeActivateApiResponse, MaintenanceModeActivateApiArg>({
                query: () => ({ url: `/pimcore-studio/api/maintenance-mode`, method: "POST" }),
                invalidatesTags: ["Maintenance Mode"],
            }),
            maintenanceModeDeactivate: build.mutation<
                MaintenanceModeDeactivateApiResponse,
                MaintenanceModeDeactivateApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/maintenance-mode`, method: "DELETE" }),
                invalidatesTags: ["Maintenance Mode"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type MaintenanceModeGetApiResponse = /** status 200 Current maintenance mode state */ MaintenanceModeState;
export type MaintenanceModeGetApiArg = void;
export type MaintenanceModeActivateApiResponse =
    /** status 200 Maintenance mode activated, the current session is exempt */ MaintenanceModeState;
export type MaintenanceModeActivateApiArg = void;
export type MaintenanceModeDeactivateApiResponse = /** status 200 Maintenance mode deactivated */ MaintenanceModeState;
export type MaintenanceModeDeactivateApiArg = void;
export type MaintenanceModeState = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Whether maintenance mode is active */
    active: boolean;
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
export const { useMaintenanceModeGetQuery, useMaintenanceModeActivateMutation, useMaintenanceModeDeactivateMutation } =
    injectedRtkApi;
