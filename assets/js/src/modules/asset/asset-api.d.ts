import { ApiAssetsGetCollectionApiResponse } from "./asset-api-slice.gen";

export type ApiAssetsGetCollectionItem = ApiAssetsGetCollectionApiResponse['hydra:member'][0];
export type ApiAssetsGetCollection = ApiAssetsGetCollectionApiResponse['hydra:member'];
