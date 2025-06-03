import { api } from "@sdk/api";
export const addTagTypes = [] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({}),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export const {} = injectedRtkApi;
