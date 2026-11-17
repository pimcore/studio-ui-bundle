import { api } from "@sdk/api";
export const addTagTypes = ["Telemetry"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            telemetryOutboxNextBatch: build.query<TelemetryOutboxNextBatchApiResponse, TelemetryOutboxNextBatchApiArg>({
                query: () => ({ url: `/pimcore-studio/api/telemetry/outbox` }),
                providesTags: ["Telemetry"],
            }),
            telemetryOutboxAck: build.mutation<TelemetryOutboxAckApiResponse, TelemetryOutboxAckApiArg>({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/telemetry/outbox/ack`,
                    method: "POST",
                    body: queryArg.telemetryOutboxAckParameters,
                }),
                invalidatesTags: ["Telemetry"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type TelemetryOutboxNextBatchApiResponse =
    /** status 200 Next encrypted telemetry batch ready to forward to the relay */ TelemetryOutboxBatch;
export type TelemetryOutboxNextBatchApiArg = void;
export type TelemetryOutboxAckApiResponse =
    /** status 200 Number of spooled events removed from the outbox */ TelemetryOutboxAckResult;
export type TelemetryOutboxAckApiArg = {
    telemetryOutboxAckParameters: TelemetryOutboxAckParameters;
};
export type TelemetryOutboxBatch = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Lease nonce identifying the claimed batch, passed back on ack */
    nonce: string;
    /** Cleartext instance identifier the relay uses to look up the product key */
    instanceIdentifier: string;
    /** Outbox payload protocol version */
    v: number;
    /** Opaque product-key encrypted envelope to forward verbatim to the relay */
    ciphertext: string;
    /** Relay endpoint the browser must POST the ciphertext to */
    relayEndpoint: string;
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
export type TelemetryOutboxAckResult = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Number of spooled events removed from the outbox by the ack */
    acked: number;
};
export type TelemetryOutboxAckParameters = {
    /** Lease nonce of the batch the relay has accepted */
    nonce: string;
};
export const { useTelemetryOutboxNextBatchQuery, useTelemetryOutboxAckMutation } = injectedRtkApi;
