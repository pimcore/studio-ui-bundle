import { api } from "../../../../app/api/pimcore/index";
export const addTagTypes = ["Asset Thumbnails"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            thumbnailImageGetCollection: build.query<
                ThumbnailImageGetCollectionApiResponse,
                ThumbnailImageGetCollectionApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/thumbnails/image` }),
                providesTags: ["Asset Thumbnails"],
            }),
            thumbnailVideoGetCollection: build.query<
                ThumbnailVideoGetCollectionApiResponse,
                ThumbnailVideoGetCollectionApiArg
            >({
                query: () => ({ url: `/pimcore-studio/api/thumbnails/video` }),
                providesTags: ["Asset Thumbnails"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type ThumbnailImageGetCollectionApiResponse = /** status 200 All downloadable image thumbnails */ {
    items: Thumbnail[];
};
export type ThumbnailImageGetCollectionApiArg = void;
export type ThumbnailVideoGetCollectionApiResponse = /** status 200 All video thumbnails */ {
    items: Thumbnail[];
};
export type ThumbnailVideoGetCollectionApiArg = void;
export type Thumbnail = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** id */
    id: string;
    /** text */
    text: string;
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
export const { useThumbnailImageGetCollectionQuery, useThumbnailVideoGetCollectionQuery } = injectedRtkApi;
