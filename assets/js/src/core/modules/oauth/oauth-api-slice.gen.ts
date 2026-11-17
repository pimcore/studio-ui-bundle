import { api } from "@sdk/api";
export const addTagTypes = ["OAuth"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      oauthAuthorizationDetails: build.query<
        OauthAuthorizationDetailsApiResponse,
        OauthAuthorizationDetailsApiArg
      >({
        query: (queryArg) => ({
          url: `/pimcore-studio/api/oauth/authorizations/${queryArg.id}`,
        }),
        providesTags: ["OAuth"],
      }),
      oauthAuthorizationApprove: build.mutation<
        OauthAuthorizationApproveApiResponse,
        OauthAuthorizationApproveApiArg
      >({
        query: (queryArg) => ({
          url: `/pimcore-studio/api/oauth/authorizations/${queryArg.id}`,
          method: "POST",
          body: queryArg.approveAuthorization,
        }),
        invalidatesTags: ["OAuth"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as api };
export type OauthAuthorizationDetailsApiResponse =
  /** status 200 Details of the pending authorization to be shown on the consent screen */ OAuthAuthorizationConsent;
export type OauthAuthorizationDetailsApiArg = {
  /** Opaque id of the pending authorization */
  id: string;
};
export type OauthAuthorizationApproveApiResponse =
  /** status 200 Location the browser must be sent to in order to complete the flow */ OAuthAuthorizationRedirect;
export type OauthAuthorizationApproveApiArg = {
  /** Opaque id of the pending authorization */
  id: string;
  approveAuthorization: ApproveAuthorization;
};
export type OAuthConsentClient = {
  /** Client identifier */
  identifier: string;
  /** Client display name (self-chosen; not authoritative) */
  name: string;
  /** Host (with port) of the redirect URI the authorization code will be sent to */
  redirectHost?: string | null;
  /** True if the client was pre-registered by an administrator */
  verified: boolean;
};
export type OAuthConsentUser = {
  /** Pimcore user id the token will act as */
  id: number;
  /** Pimcore username */
  username: string;
};
export type OAuthAuthorizationConsent = {
  /** AdditionalAttributes */
  additionalAttributes?: {
    [key: string]: string | number | boolean | object;
  };
  /** Opaque id of the pending authorization */
  authorizationId: string;
  client: OAuthConsentClient;
  /** Requested scopes */
  scopes: string[];
  user?: OAuthConsentUser | null;
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
export type OAuthAuthorizationRedirect = {
  /** Absolute URL to redirect the browser to */
  location: string;
};
export type ApproveAuthorization = {
  /** Whether the user approved the authorization */
  approved: boolean;
};
export const {
  useOauthAuthorizationDetailsQuery,
  useOauthAuthorizationApproveMutation,
} = injectedRtkApi;
