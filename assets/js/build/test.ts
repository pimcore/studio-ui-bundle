import { api } from '../app/api/pimcore/index'
export const addTagTypes = ['Asset', 'Image', 'Thumbnail', 'User'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes
  })
  .injectEndpoints({
    endpoints: (build) => ({
      apiAssetsGetCollection: build.query<ApiAssetsGetCollectionApiResponse, ApiAssetsGetCollectionApiArg>({
        query: (queryArg) => ({ url: '/api/assets', params: { page: queryArg.page } }),
        providesTags: ['Asset']
      }),
      apiAssetsPost: build.mutation<ApiAssetsPostApiResponse, ApiAssetsPostApiArg>({
        query: (queryArg) => ({ url: '/api/assets', method: 'POST', body: queryArg.assetJsonldSet }),
        invalidatesTags: ['Asset']
      }),
      apiAssetsIdGet: build.query<ApiAssetsIdGetApiResponse, ApiAssetsIdGetApiArg>({
        query: (queryArg) => ({ url: `/api/assets/${queryArg.id}` }),
        providesTags: ['Asset']
      }),
      apiAssetsIdPut: build.mutation<ApiAssetsIdPutApiResponse, ApiAssetsIdPutApiArg>({
        query: (queryArg) => ({
          url: `/api/assets/${queryArg.id}`,
          method: 'PUT',
          body: queryArg.assetJsonldSet
        }),
        invalidatesTags: ['Asset']
      }),
      apiAssetsIdDelete: build.mutation<ApiAssetsIdDeleteApiResponse, ApiAssetsIdDeleteApiArg>({
        query: (queryArg) => ({ url: `/api/assets/${queryArg.id}`, method: 'DELETE' }),
        invalidatesTags: ['Asset']
      }),
      apiAssetsIdPatch: build.mutation<ApiAssetsIdPatchApiResponse, ApiAssetsIdPatchApiArg>({
        query: (queryArg) => ({ url: `/api/assets/${queryArg.id}`, method: 'PATCH', body: queryArg.assetSet }),
        invalidatesTags: ['Asset']
      }),
      apiImagesGetCollection: build.query<ApiImagesGetCollectionApiResponse, ApiImagesGetCollectionApiArg>({
        query: (queryArg) => ({ url: '/api/images', params: { page: queryArg.page } }),
        providesTags: ['Image']
      }),
      apiImagesPost: build.mutation<ApiImagesPostApiResponse, ApiImagesPostApiArg>({
        query: (queryArg) => ({ url: '/api/images', method: 'POST', body: queryArg.imageJsonldSet }),
        invalidatesTags: ['Image']
      }),
      apiImagesIdGet: build.query<ApiImagesIdGetApiResponse, ApiImagesIdGetApiArg>({
        query: (queryArg) => ({ url: `/api/images/${queryArg.id}` }),
        providesTags: ['Image']
      }),
      apiImagesIdPut: build.mutation<ApiImagesIdPutApiResponse, ApiImagesIdPutApiArg>({
        query: (queryArg) => ({
          url: `/api/images/${queryArg.id}`,
          method: 'PUT',
          body: queryArg.imageJsonldSet
        }),
        invalidatesTags: ['Image']
      }),
      apiImagesIdDelete: build.mutation<ApiImagesIdDeleteApiResponse, ApiImagesIdDeleteApiArg>({
        query: (queryArg) => ({ url: `/api/images/${queryArg.id}`, method: 'DELETE' }),
        invalidatesTags: ['Image']
      }),
      apiImagesIdPatch: build.mutation<ApiImagesIdPatchApiResponse, ApiImagesIdPatchApiArg>({
        query: (queryArg) => ({ url: `/api/images/${queryArg.id}`, method: 'PATCH', body: queryArg.imageSet }),
        invalidatesTags: ['Image']
      }),
      apiThumbnailsGetCollection: build.query<
      ApiThumbnailsGetCollectionApiResponse,
      ApiThumbnailsGetCollectionApiArg
      >({
        query: (queryArg) => ({ url: '/api/thumbnails', params: { page: queryArg.page } }),
        providesTags: ['Thumbnail']
      }),
      apiThumbnailsPut: build.mutation<ApiThumbnailsPutApiResponse, ApiThumbnailsPutApiArg>({
        query: (queryArg) => ({ url: '/api/thumbnails', method: 'PUT', body: queryArg.thumbnailJsonldSet }),
        invalidatesTags: ['Thumbnail']
      }),
      apiThumbnailsPost: build.mutation<ApiThumbnailsPostApiResponse, ApiThumbnailsPostApiArg>({
        query: (queryArg) => ({ url: '/api/thumbnails', method: 'POST', body: queryArg.thumbnailJsonldSet }),
        invalidatesTags: ['Thumbnail']
      }),
      apiThumbnailsDelete: build.mutation<ApiThumbnailsDeleteApiResponse, ApiThumbnailsDeleteApiArg>({
        query: () => ({ url: '/api/thumbnails', method: 'DELETE' }),
        invalidatesTags: ['Thumbnail']
      }),
      apiThumbnailsPatch: build.mutation<ApiThumbnailsPatchApiResponse, ApiThumbnailsPatchApiArg>({
        query: (queryArg) => ({ url: '/api/thumbnails', method: 'PATCH', body: queryArg.thumbnailSet }),
        invalidatesTags: ['Thumbnail']
      }),
      postApiUsersResetPassword: build.mutation<
      PostApiUsersResetPasswordApiResponse,
      PostApiUsersResetPasswordApiArg
      >({
        query: (queryArg) => ({
          url: '/api/users/reset-password',
          method: 'POST',
          body: queryArg.userResetPasswordRequestJsonldSet
        }),
        invalidatesTags: ['User']
      })
    }),
    overrideExisting: false
  })
export { injectedRtkApi as api }
export interface ApiAssetsGetCollectionApiResponse {
  'hydra:member': AssetJsonldGetRead[]
  'hydra:totalItems'?: number
  'hydra:view'?: {
    '@id'?: string
    '@type'?: string
    'hydra:first'?: string
    'hydra:last'?: string
    'hydra:previous'?: string
    'hydra:next'?: string
  }
  'hydra:search'?: {
    '@type'?: string
    'hydra:template'?: string
    'hydra:variableRepresentation'?: string
    'hydra:mapping'?: Array<{
      '@type'?: string
      variable?: string
      property?: any
      required?: boolean
    }>
  }
}
export interface ApiAssetsGetCollectionApiArg {
  /** The collection page number */
  page?: number
}
export type ApiAssetsPostApiResponse = /** status 201 Asset resource created */ AssetJsonldGetRead
export interface ApiAssetsPostApiArg {
  /** The new Asset resource */
  assetJsonldSet: AssetJsonldSet
}
export type ApiAssetsIdGetApiResponse = /** status 200 Asset resource */ AssetJsonldGetRead
export interface ApiAssetsIdGetApiArg {
  /** Asset identifier */
  id: string
}
export type ApiAssetsIdPutApiResponse = /** status 200 Asset resource updated */ AssetJsonldGetRead
export interface ApiAssetsIdPutApiArg {
  /** Asset identifier */
  id: string
  /** The updated Asset resource */
  assetJsonldSet: AssetJsonldSet
}
export type ApiAssetsIdDeleteApiResponse = unknown
export interface ApiAssetsIdDeleteApiArg {
  /** Asset identifier */
  id: string
}
export type ApiAssetsIdPatchApiResponse = /** status 200 Asset resource updated */ AssetJsonldGetRead
export interface ApiAssetsIdPatchApiArg {
  /** Asset identifier */
  id: string
  /** The updated Asset resource */
  assetSet: AssetSet
}
export interface ApiImagesGetCollectionApiResponse {
  'hydra:member': ImageJsonldGetRead[]
  'hydra:totalItems'?: number
  'hydra:view'?: {
    '@id'?: string
    '@type'?: string
    'hydra:first'?: string
    'hydra:last'?: string
    'hydra:previous'?: string
    'hydra:next'?: string
  }
  'hydra:search'?: {
    '@type'?: string
    'hydra:template'?: string
    'hydra:variableRepresentation'?: string
    'hydra:mapping'?: Array<{
      '@type'?: string
      variable?: string
      property?: any
      required?: boolean
    }>
  }
}
export interface ApiImagesGetCollectionApiArg {
  /** The collection page number */
  page?: number
}
export type ApiImagesPostApiResponse = /** status 201 Image resource created */ ImageJsonldGetRead
export interface ApiImagesPostApiArg {
  /** The new Image resource */
  imageJsonldSet: ImageJsonldSet
}
export type ApiImagesIdGetApiResponse = /** status 200 Image resource */ ImageJsonldGetRead
export interface ApiImagesIdGetApiArg {
  /** Image identifier */
  id: string
}
export type ApiImagesIdPutApiResponse = /** status 200 Image resource updated */ ImageJsonldGetRead
export interface ApiImagesIdPutApiArg {
  /** Image identifier */
  id: string
  /** The updated Image resource */
  imageJsonldSet: ImageJsonldSet
}
export type ApiImagesIdDeleteApiResponse = unknown
export interface ApiImagesIdDeleteApiArg {
  /** Image identifier */
  id: string
}
export type ApiImagesIdPatchApiResponse = /** status 200 Image resource updated */ ImageJsonldGetRead
export interface ApiImagesIdPatchApiArg {
  /** Image identifier */
  id: string
  /** The updated Image resource */
  imageSet: ImageSet
}
export interface ApiThumbnailsGetCollectionApiResponse {
  'hydra:member': ThumbnailJsonldGetRead[]
  'hydra:totalItems'?: number
  'hydra:view'?: {
    '@id'?: string
    '@type'?: string
    'hydra:first'?: string
    'hydra:last'?: string
    'hydra:previous'?: string
    'hydra:next'?: string
  }
  'hydra:search'?: {
    '@type'?: string
    'hydra:template'?: string
    'hydra:variableRepresentation'?: string
    'hydra:mapping'?: Array<{
      '@type'?: string
      variable?: string
      property?: any
      required?: boolean
    }>
  }
}
export interface ApiThumbnailsGetCollectionApiArg {
  /** The collection page number */
  page?: number
}
export type ApiThumbnailsPutApiResponse = /** status 200 Thumbnail resource updated */ ThumbnailJsonldGetRead
export interface ApiThumbnailsPutApiArg {
  /** The updated Thumbnail resource */
  thumbnailJsonldSet: ThumbnailJsonldSet
}
export type ApiThumbnailsPostApiResponse = /** status 201 Thumbnail resource created */ ThumbnailJsonldGetRead
export interface ApiThumbnailsPostApiArg {
  /** The new Thumbnail resource */
  thumbnailJsonldSet: ThumbnailJsonldSet
}
export type ApiThumbnailsDeleteApiResponse = unknown
export type ApiThumbnailsDeleteApiArg = void
export type ApiThumbnailsPatchApiResponse = /** status 200 Thumbnail resource updated */ ThumbnailJsonldGetRead
export interface ApiThumbnailsPatchApiArg {
  /** The updated Thumbnail resource */
  thumbnailSet: ThumbnailSet
}
export type PostApiUsersResetPasswordApiResponse = /** status 202 User resource created */ any
export interface PostApiUsersResetPasswordApiArg {
  /** The new User resource */
  userResetPasswordRequestJsonldSet: UserResetPasswordRequestJsonldSet
}
export interface VersionJsonldGet {}
export interface VersionJsonldGetRead {
  '@context'?:
  | string
  | {
    '@vocab': string
    hydra: 'http://www.w3.org/ns/hydra/core#'
    [key: string]: any
  }
  '@id'?: string
  '@type'?: string
}
export interface DependencyJsonldGet {}
export interface DependencyJsonldGetRead {
  '@context'?:
  | string
  | {
    '@vocab': string
    hydra: 'http://www.w3.org/ns/hydra/core#'
    [key: string]: any
  }
  '@id'?: string
  '@type'?: string
}
export interface PropertyJsonldGet {}
export interface PropertyJsonldGetRead {
  '@context'?:
  | string
  | {
    '@vocab': string
    hydra: 'http://www.w3.org/ns/hydra/core#'
    [key: string]: any
  }
  '@id'?: string
  '@type'?: string
}
export interface TaskJsonldGet {}
export interface TaskJsonldGetRead {
  '@context'?:
  | string
  | {
    '@vocab': string
    hydra: 'http://www.w3.org/ns/hydra/core#'
    [key: string]: any
  }
  '@id'?: string
  '@type'?: string
}
export interface AssetJsonldGet {
  type?: string
  filename?: string
  mimetype?: string
  versions?: VersionJsonldGet[]
  metadata?: string[]
  /** List of some custom settings  [key] => value
    Here there can be stored some data, eg. the video thumbnail files, ...  of the asset, . */
  customSettings?: string[]
  hasMetaData?: boolean
  dependencies?: DependencyJsonldGet
  path?: string
  properties?: PropertyJsonldGet[]
  id?: any
  creationDate?: number
  modificationDate?: number
  versionCount?: number
  userOwner?: number
  locked?: any
  userModification?: number
  parentId?: any
  /** Contains all scheduled tasks */
  scheduledTasks?: TaskJsonldGet[]
}
export interface AssetJsonldGetRead {
  '@context'?:
  | string
  | {
    '@vocab': string
    hydra: 'http://www.w3.org/ns/hydra/core#'
    [key: string]: any
  }
  '@id'?: string
  '@type'?: string
  type?: string
  filename?: string
  mimetype?: string
  versions?: VersionJsonldGetRead[]
  metadata?: string[]
  /** List of some custom settings  [key] => value
    Here there can be stored some data, eg. the video thumbnail files, ...  of the asset, . */
  customSettings?: string[]
  hasMetaData?: boolean
  dependencies?: DependencyJsonldGetRead
  path?: string
  properties?: PropertyJsonldGetRead[]
  id?: any
  creationDate?: number
  modificationDate?: number
  versionCount?: number
  userOwner?: number
  locked?: any
  userModification?: number
  parentId?: any
  /** Contains all scheduled tasks */
  scheduledTasks?: TaskJsonldGetRead[]
  fullPath?: string
}
export type AssetJsonldSet = object
export type AssetSet = object
export interface ThumbnailInterfaceJsonldGet {}
export interface ThumbnailInterfaceJsonldGetRead {
  '@context'?:
  | string
  | {
    '@vocab': string
    hydra: 'http://www.w3.org/ns/hydra/core#'
    [key: string]: any
  }
  '@id'?: string
  '@type'?: string
}
export interface ImageJsonldGet {
  type?: string
  filename?: string
  mimetype?: string
  versions?: VersionJsonldGet[]
  metadata?: string[]
  /** List of some custom settings  [key] => value
    Here there can be stored some data, eg. the video thumbnail files, ...  of the asset, . */
  customSettings?: string[]
  hasMetaData?: boolean
  dependencies?: DependencyJsonldGet
  path?: string
  properties?: PropertyJsonldGet[]
  id?: any
  creationDate?: number
  modificationDate?: number
  versionCount?: number
  userOwner?: number
  locked?: any
  userModification?: number
  parentId?: any
  /** Contains all scheduled tasks */
  scheduledTasks?: TaskJsonldGet[]
  /** Returns a path to a given thumbnail or a thumbnail configuration. */
  thumbnail?: ThumbnailInterfaceJsonldGet
}
export interface ImageJsonldGetRead {
  '@context'?:
  | string
  | {
    '@vocab': string
    hydra: 'http://www.w3.org/ns/hydra/core#'
    [key: string]: any
  }
  '@id'?: string
  '@type'?: string
  type?: string
  filename?: string
  mimetype?: string
  versions?: VersionJsonldGetRead[]
  metadata?: string[]
  /** List of some custom settings  [key] => value
    Here there can be stored some data, eg. the video thumbnail files, ...  of the asset, . */
  customSettings?: string[]
  hasMetaData?: boolean
  dependencies?: DependencyJsonldGetRead
  path?: string
  properties?: PropertyJsonldGetRead[]
  id?: any
  creationDate?: number
  modificationDate?: number
  versionCount?: number
  userOwner?: number
  locked?: any
  userModification?: number
  parentId?: any
  /** Contains all scheduled tasks */
  scheduledTasks?: TaskJsonldGetRead[]
  /** Returns a path to a given thumbnail or a thumbnail configuration. */
  thumbnail?: ThumbnailInterfaceJsonldGetRead
  format?: string
  dimensions?: string[]
  width?: number
  height?: number
  fullPath?: string
}
export type ImageJsonldSet = object
export type ImageSet = object
export interface ThumbnailJsonldGet {}
export interface ThumbnailJsonldGetRead {
  '@context'?:
  | string
  | {
    '@vocab': string
    hydra: 'http://www.w3.org/ns/hydra/core#'
    [key: string]: any
  }
  '@id'?: string
  '@type'?: string
  path?: string
  imageTag?: string
}
export type ThumbnailJsonldSet = object
export type ThumbnailSet = object
export interface UserResetPasswordRequestJsonldSet {
  username: string
}
export const {
  useApiAssetsGetCollectionQuery,
  useApiAssetsPostMutation,
  useApiAssetsIdGetQuery,
  useApiAssetsIdPutMutation,
  useApiAssetsIdDeleteMutation,
  useApiAssetsIdPatchMutation,
  useApiImagesGetCollectionQuery,
  useApiImagesPostMutation,
  useApiImagesIdGetQuery,
  useApiImagesIdPutMutation,
  useApiImagesIdDeleteMutation,
  useApiImagesIdPatchMutation,
  useApiThumbnailsGetCollectionQuery,
  useApiThumbnailsPutMutation,
  useApiThumbnailsPostMutation,
  useApiThumbnailsDeleteMutation,
  useApiThumbnailsPatchMutation,
  usePostApiUsersResetPasswordMutation
} = injectedRtkApi
