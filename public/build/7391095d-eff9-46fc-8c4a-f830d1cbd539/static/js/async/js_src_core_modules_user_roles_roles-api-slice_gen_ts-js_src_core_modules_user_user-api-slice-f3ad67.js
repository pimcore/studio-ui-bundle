"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_modules_user_roles_roles-api-slice_gen_ts-js_src_core_modules_user_user-api-slice-f3ad67"], {
"./js/src/core/modules/user/roles/roles-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
  useRoleGetTreeQuery: () => (useRoleGetTreeQuery),
  useRoleUpdateByIdMutation: () => (useRoleUpdateByIdMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Role Management"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
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
            })
        }),
    overrideExisting: false
});

const { useRoleCloneByIdMutation, useRoleFolderCreateMutation, useRoleCreateMutation, useRoleFolderDeleteByIdMutation, useRoleGetByIdQuery, useRoleUpdateByIdMutation, useRoleDeleteByIdMutation, useRoleGetCollectionQuery, useRoleGetTreeQuery } = injectedRtkApi;

function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),
"./js/src/core/modules/user/user-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  usePimcoreStudioApiUserSearchQuery: () => (usePimcoreStudioApiUserSearchQuery),
  useUserCloneByIdMutation: () => (useUserCloneByIdMutation),
  useUserCreateMutation: () => (useUserCreateMutation),
  useUserDefaultKeyBindingsQuery: () => (useUserDefaultKeyBindingsQuery),
  useUserDeleteByIdMutation: () => (useUserDeleteByIdMutation),
  useUserFolderCreateMutation: () => (useUserFolderCreateMutation),
  useUserFolderDeleteByIdMutation: () => (useUserFolderDeleteByIdMutation),
  useUserGetAvailablePermissionsQuery: () => (useUserGetAvailablePermissionsQuery),
  useUserGetByIdQuery: () => (useUserGetByIdQuery),
  useUserGetCollectionQuery: () => (useUserGetCollectionQuery),
  useUserGetCurrentInformationQuery: () => (useUserGetCurrentInformationQuery),
  useUserGetImageQuery: () => (useUserGetImageQuery),
  useUserGetTreeQuery: () => (useUserGetTreeQuery),
  useUserResetPasswordMutation: () => (useUserResetPasswordMutation),
  useUserUpdateByIdMutation: () => (useUserUpdateByIdMutation),
  useUserUpdatePasswordByIdMutation: () => (useUserUpdatePasswordByIdMutation),
  useUserUploadImageMutation: () => (useUserUploadImageMutation)
});
/* ESM import */var _user_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/user/user-api-slice.gen.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
const api = _user_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    endpoints: {
        userUploadImage: {
            query: (queryArg)=>{
                const formData = new FormData();
                formData.append('userImage', queryArg.body.userImage);
                return {
                    url: `/pimcore-studio/api/user/upload-image/${queryArg.id}`,
                    method: 'POST',
                    body: formData
                };
            }
        }
    }
});
const { useUserCloneByIdMutation, useUserCreateMutation, useUserFolderCreateMutation, useUserGetCurrentInformationQuery, useUserGetByIdQuery, useUserUpdateByIdMutation, useUserDeleteByIdMutation, useUserFolderDeleteByIdMutation, useUserDefaultKeyBindingsQuery, useUserGetAvailablePermissionsQuery, useUserGetCollectionQuery, useUserResetPasswordMutation, usePimcoreStudioApiUserSearchQuery, useUserUpdatePasswordByIdMutation, useUserUploadImageMutation, useUserGetImageQuery, useUserGetTreeQuery } = api;


function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),
"./js/src/core/modules/user/user-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  usePimcoreStudioApiUserSearchQuery: () => (usePimcoreStudioApiUserSearchQuery),
  useUserCloneByIdMutation: () => (useUserCloneByIdMutation),
  useUserCreateMutation: () => (useUserCreateMutation),
  useUserDefaultKeyBindingsQuery: () => (useUserDefaultKeyBindingsQuery),
  useUserDeleteByIdMutation: () => (useUserDeleteByIdMutation),
  useUserFolderCreateMutation: () => (useUserFolderCreateMutation),
  useUserFolderDeleteByIdMutation: () => (useUserFolderDeleteByIdMutation),
  useUserGetAvailablePermissionsQuery: () => (useUserGetAvailablePermissionsQuery),
  useUserGetByIdQuery: () => (useUserGetByIdQuery),
  useUserGetCollectionQuery: () => (useUserGetCollectionQuery),
  useUserGetCurrentInformationQuery: () => (useUserGetCurrentInformationQuery),
  useUserGetImageQuery: () => (useUserGetImageQuery),
  useUserGetTreeQuery: () => (useUserGetTreeQuery),
  useUserResetPasswordMutation: () => (useUserResetPasswordMutation),
  useUserUpdateActivePerspectiveMutation: () => (useUserUpdateActivePerspectiveMutation),
  useUserUpdateByIdMutation: () => (useUserUpdateByIdMutation),
  useUserUpdatePasswordByIdMutation: () => (useUserUpdatePasswordByIdMutation),
  useUserUploadImageMutation: () => (useUserUploadImageMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "User Management"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            userCloneById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/clone/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userFolderCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/folder`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userGetCurrentInformation: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/user/current-user-information`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updateUser
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userFolderDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/folder/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userDefaultKeyBindings: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/users/default-key-bindings`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetAvailablePermissions: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/user/available-permissions`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/users`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userResetPassword: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/reset-password`,
                        method: "POST",
                        body: queryArg.resetPassword
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            pimcoreStudioApiUserSearch: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/search`,
                        params: {
                            searchQuery: queryArg.searchQuery
                        }
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userUpdateActivePerspective: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/active-perspective/${queryArg.perspectiveId}`,
                        method: "PUT"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUpdatePasswordById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}/password`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUploadImage: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/upload-image/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userGetImage: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/image/${queryArg.id}`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/users/tree`,
                        params: {
                            parentId: queryArg.parentId
                        }
                    }),
                providesTags: [
                    "User Management"
                ]
            })
        }),
    overrideExisting: false
});

const { useUserCloneByIdMutation, useUserCreateMutation, useUserFolderCreateMutation, useUserGetCurrentInformationQuery, useUserGetByIdQuery, useUserUpdateByIdMutation, useUserDeleteByIdMutation, useUserFolderDeleteByIdMutation, useUserDefaultKeyBindingsQuery, useUserGetAvailablePermissionsQuery, useUserGetCollectionQuery, useUserResetPasswordMutation, usePimcoreStudioApiUserSearchQuery, useUserUpdateActivePerspectiveMutation, useUserUpdatePasswordByIdMutation, useUserUploadImageMutation, useUserGetImageQuery, useUserGetTreeQuery } = injectedRtkApi;

function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),

}]);
//# sourceMappingURL=js_src_core_modules_user_roles_roles-api-slice_gen_ts-js_src_core_modules_user_user-api-slice-f3ad67.js.map