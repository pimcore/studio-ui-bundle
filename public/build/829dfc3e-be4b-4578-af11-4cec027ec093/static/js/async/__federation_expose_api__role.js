/*!
 * 
 *             /**
 *              * This source file is available under the terms of the
 *              * Pimcore Open Core License (POCL)
 *              * Full copyright and license information is available in
 *              * LICENSE.md which is distributed with this source code.
 *              *
 *              *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *              *  @license    Pimcore Open Core License (POCL)
 *              * /
 *
 */
"use strict";
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_api__role"], {
"./js/src/core/modules/user/roles/roles-api-slice-enhanced.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useRoleGetCollectionQuery: () => (useRoleGetCollectionQuery),
  useRoleGetShareCollectionQuery: () => (useRoleGetShareCollectionQuery)
});
/* import */ var _Pimcore_app_api_pimcore_tags__rspack_import_0 = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* import */ var _roles_api_slice_gen__rspack_import_1 = __webpack_require__("./js/src/core/modules/user/roles/roles-api-slice.gen.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const api = _roles_api_slice_gen__rspack_import_1.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.ROLE
    ],
    endpoints: {
        roleGetCollection: {
            providesTags: ()=>_Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.ROLE()
        }
    }
});
const { useRoleGetCollectionQuery, useRoleGetShareCollectionQuery } = api;


function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/user/roles/roles-api-slice.gen.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useRoleCloneByIdMutation: () => (useRoleCloneByIdMutation),
  useRoleCreateMutation: () => (useRoleCreateMutation),
  useRoleDeleteByIdMutation: () => (useRoleDeleteByIdMutation),
  useRoleFolderCreateMutation: () => (useRoleFolderCreateMutation),
  useRoleFolderDeleteByIdMutation: () => (useRoleFolderDeleteByIdMutation),
  useRoleGetByIdQuery: () => (useRoleGetByIdQuery),
  useRoleGetCollectionQuery: () => (useRoleGetCollectionQuery),
  useRoleGetShareCollectionQuery: () => (useRoleGetShareCollectionQuery),
  useRoleGetTreeQuery: () => (useRoleGetTreeQuery),
  useRoleListWithPermissionQuery: () => (useRoleListWithPermissionQuery),
  useRoleSearchQuery: () => (useRoleSearchQuery),
  useRoleUpdateByIdMutation: () => (useRoleUpdateByIdMutation)
});
/* import */ var _sdk_api__rspack_import_0 = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Role Management"
];
const injectedRtkApi = _sdk_api__rspack_import_0.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            roleCloneById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/clone/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleFolderCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/folder`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleFolderDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/folder/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/${queryArg.id}`
                    }),
                providesTags: [
                    "Role Management"
                ]
            }),
            roleUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updateRole
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleGetCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/roles`
                    }),
                providesTags: [
                    "Role Management"
                ]
            }),
            roleListWithPermission: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/roles/with-permission`,
                        params: {
                            permission: queryArg.permission
                        }
                    }),
                providesTags: [
                    "Role Management"
                ]
            }),
            roleGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/roles/tree`,
                        params: {
                            parentId: queryArg.parentId
                        }
                    }),
                providesTags: [
                    "Role Management"
                ]
            }),
            roleGetShareCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/roles-share-list`
                    }),
                providesTags: [
                    "Role Management"
                ]
            }),
            roleSearch: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/search`,
                        params: {
                            searchQuery: queryArg.searchQuery
                        }
                    }),
                providesTags: [
                    "Role Management"
                ]
            })
        }),
    overrideExisting: false
});

const { useRoleCloneByIdMutation, useRoleFolderCreateMutation, useRoleCreateMutation, useRoleFolderDeleteByIdMutation, useRoleGetByIdQuery, useRoleUpdateByIdMutation, useRoleDeleteByIdMutation, useRoleGetCollectionQuery, useRoleListWithPermissionQuery, useRoleGetTreeQuery, useRoleGetShareCollectionQuery, useRoleSearchQuery } = injectedRtkApi;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/api/role/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (/* reexport safe */ _Pimcore_modules_user_roles_roles_api_slice_enhanced__rspack_import_0.api),
  useRoleGetCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_user_roles_roles_api_slice_enhanced__rspack_import_0.useRoleGetCollectionQuery),
  useRoleGetShareCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_user_roles_roles_api_slice_enhanced__rspack_import_0.useRoleGetShareCollectionQuery)
});
/* import */ var _Pimcore_modules_user_roles_roles_api_slice_enhanced__rspack_import_0 = __webpack_require__("./js/src/core/modules/user/roles/roles-api-slice-enhanced.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ if (true) {
    module.hot.accept();
}


function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=__federation_expose_api__role.js.map