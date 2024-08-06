import { api } from "../../../../app/api/pimcore/index";
export const addTagTypes = ["AssetThumbnails"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getImageThumbnails: build.query<GetImageThumbnailsApiResponse, GetImageThumbnailsApiArg>({
                query: () => ({ url: `/studio/api/thumbnails/image` }),
                providesTags: ["AssetThumbnails"],
            }),
            getVideoThumbnails: build.query<GetVideoThumbnailsApiResponse, GetVideoThumbnailsApiArg>({
                query: () => ({ url: `/studio/api/thumbnails/video` }),
                providesTags: ["AssetThumbnails"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type GetImageThumbnailsApiResponse = /** status 200 All downloadable image thumbnails */ {
    items: Thumbnail[];
};
export type GetImageThumbnailsApiArg = void;
export type GetVideoThumbnailsApiResponse = /** status 200 All video thumbnails */ {
    items: Thumbnail[];
};
export type GetVideoThumbnailsApiArg = void;
export type Thumbnail = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object | any[];
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
export const { useGetImageThumbnailsQuery, useGetVideoThumbnailsQuery } = injectedRtkApi;
