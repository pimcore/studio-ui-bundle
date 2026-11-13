import { api } from "@sdk/api";
export const addTagTypes = ["Mercure"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      mercureCreateCookie: build.mutation<
        MercureCreateCookieApiResponse,
        MercureCreateCookieApiArg
      >({
        query: () => ({
          url: `/pimcore-studio/api/mercure/auth`,
          method: "POST",
        }),
        invalidatesTags: ["Mercure"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as api };
export type MercureCreateCookieApiResponse =
  /** status 200 Retrieve JWT token for Mercure hub as cookie */ MercureAuthorization;
export type MercureCreateCookieApiArg = void;
export type MercureAuthorization = {
  /** Lifetime of the authorization cookie in seconds, renew it before it elapses */
  cookieLifetime: number;
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
export const { useMercureCreateCookieMutation } = injectedRtkApi;
