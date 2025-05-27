import { api } from "../../../app/api/pimcore/index";
export const addTagTypes = ["Classification Store"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            classificationStoreGetCollections: build.query<
                ClassificationStoreGetCollectionsApiResponse,
                ClassificationStoreGetCollectionsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/collections`,
                    params: {
                        storeId: queryArg.storeId,
                        objectId: queryArg.objectId,
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        fieldName: queryArg.fieldName,
                        searchTerm: queryArg.searchTerm,
                    },
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreGetGroups: build.query<
                ClassificationStoreGetGroupsApiResponse,
                ClassificationStoreGetGroupsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/groups`,
                    params: {
                        storeId: queryArg.storeId,
                        objectId: queryArg.objectId,
                        searchTerm: queryArg.searchTerm,
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        fieldName: queryArg.fieldName,
                    },
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreGetKeyGroupRelations: build.query<
                ClassificationStoreGetKeyGroupRelationsApiResponse,
                ClassificationStoreGetKeyGroupRelationsApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/key-group-relations`,
                    params: {
                        storeId: queryArg.storeId,
                        objectId: queryArg.objectId,
                        searchTerm: queryArg.searchTerm,
                        page: queryArg.page,
                        pageSize: queryArg.pageSize,
                        fieldName: queryArg.fieldName,
                    },
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreGetLayoutByCollection: build.query<
                ClassificationStoreGetLayoutByCollectionApiResponse,
                ClassificationStoreGetLayoutByCollectionApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/layout-by-collection/${queryArg.collectionId}`,
                    params: {
                        objectId: queryArg.objectId,
                        fieldName: queryArg.fieldName,
                    },
                }),
                providesTags: ["Classification Store"],
            }),
            classificationStoreGetLayoutByGroup: build.query<
                ClassificationStoreGetLayoutByGroupApiResponse,
                ClassificationStoreGetLayoutByGroupApiArg
            >({
                query: (queryArg) => ({
                    url: `/pimcore-studio/api/classification-store/layout-by-group/${queryArg.groupId}`,
                    params: {
                        objectId: queryArg.objectId,
                        fieldName: queryArg.fieldName,
                    },
                }),
                providesTags: ["Classification Store"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type ClassificationStoreGetCollectionsApiResponse = /** status 200 List of classification store collections */ {
    totalItems: number;
    items: ClassificationStoreCollection[];
};
export type ClassificationStoreGetCollectionsApiArg = {
    /** Classification Store ID */
    storeId: number;
    /** object ID */
    objectId?: number;
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Field Name */
    fieldName: string;
    /** Search Term */
    searchTerm?: string;
};
export type ClassificationStoreGetGroupsApiResponse = /** status 200 List of classification store groups */ {
    totalItems: number;
    items: ClassificationStoreGroup[];
};
export type ClassificationStoreGetGroupsApiArg = {
    /** Classification Store ID */
    storeId: number;
    /** object ID */
    objectId?: number;
    /** Search Term */
    searchTerm?: string;
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Field Name */
    fieldName: string;
};
export type ClassificationStoreGetKeyGroupRelationsApiResponse =
    /** status 200 List of classification store key group relations */ {
        totalItems: number;
        items: ClassificationStoreKeyGroupRelation[];
    };
export type ClassificationStoreGetKeyGroupRelationsApiArg = {
    /** Classification Store ID */
    storeId: number;
    /** object ID */
    objectId?: number;
    /** Search Term */
    searchTerm?: string;
    /** Page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Field Name */
    fieldName: string;
};
export type ClassificationStoreGetLayoutByCollectionApiResponse =
    /** status 200 Layout definition */ ClassificationStoreGroupLayout;
export type ClassificationStoreGetLayoutByCollectionApiArg = {
    /** object ID */
    objectId: number;
    /** CollectionId of the Collection ID */
    collectionId: number;
    /** Field Name */
    fieldName: string;
};
export type ClassificationStoreGetLayoutByGroupApiResponse =
    /** status 200 Layout definition */ ClassificationStoreGroupLayout2;
export type ClassificationStoreGetLayoutByGroupApiArg = {
    /** object ID */
    objectId: number;
    /** GroupId of the Group ID */
    groupId: number;
    /** Field Name */
    fieldName: string;
};
export type ClassificationStoreCollection = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number;
    /** Name */
    name: string;
    /** Description */
    description?: string;
    /** List of Group IDs in collection */
    groups?: object;
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
export type ClassificationStoreGroup = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number;
    /** Name */
    name: string;
    /** Description */
    description?: string | null;
};
export type ClassificationStoreKeyGroupRelation = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** Key ID */
    keyId: number;
    /** Group ID */
    groupId: number;
    /** Key Name */
    keyName: string;
    /** Group Name */
    groupName: string;
    /** Key Description */
    keyDescription?: string | null;
    /** Key Description */
    groupDescription?: string | null;
};
export type ClassificationStoreCollection2 = {
    /** ID */
    id: number;
    /** Name */
    name: string;
    /** Description */
    description: string;
    /** Layout Definition */
    definition: object;
};
export type ClassificationStoreGroupLayout2 = {
    /** AdditionalAttributes */
    additionalAttributes?: {
        [key: string]: string | number | boolean | object;
    };
    /** ID */
    id: number;
    /** Name */
    name: string;
    /** Description */
    description?: string | null;
    /** Description */
    keys: ClassificationStoreCollection2[];
};
export type ClassificationStoreGroupLayout = {
    /** Groups */
    groups: ClassificationStoreGroupLayout2[];
};
export const {
    useClassificationStoreGetCollectionsQuery,
    useClassificationStoreGetGroupsQuery,
    useClassificationStoreGetKeyGroupRelationsQuery,
    useClassificationStoreGetLayoutByCollectionQuery,
    useClassificationStoreGetLayoutByGroupQuery,
} = injectedRtkApi;
