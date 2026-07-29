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
                query: (queryArg) => ({ url: `/pimcore-studio/api/oauth/authorizations/${queryArg.id}` }),
                providesTags: ["OAuth"],
            }),
            oauthAuthorizationApprove: build.mutation<
                OauthAuthorizationApproveApiResponse,
                OauthAuthorizationApproveApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/oauth/authorizations/${queryArg.id}`,
                    method: "POST",
                    body: queryArg.body,
                }),
                invalidatesTags: ["OAuth"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type OauthAuthorizationDetailsApiResponse =
    /** status 200 The pending authorization details */ OAuthAuthorizationConsent;
export type OauthAuthorizationDetailsApiArg = {
    /** Opaque id of the pending authorization */
    id: string;
};
export type OauthAuthorizationApproveApiResponse =
    /** status 200 The location to redirect the browser to */ OAuthAuthorizationRedirect;
export type OauthAuthorizationApproveApiArg = {
    /** Opaque id of the pending authorization */
    id: string;
    body: {
        approved?: boolean;
    };
};
export type OAuthConsentClient = {
    /** Client identifier */
    identifier: string;
    /** Client display name */
    name: string;
};
export type OAuthConsentUser = {
    /** Pimcore user id the token will act as */
    id: number;
    /** Pimcore username */
    username: string;
};
export type OAuthAuthorizationConsent = {
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
export const { useOauthAuthorizationDetailsQuery, useOauthAuthorizationApproveMutation } = injectedRtkApi;
