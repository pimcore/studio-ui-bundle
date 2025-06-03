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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_api__user"], {
"./js/src/core/modules/auth/user/user-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
  useUserUpdateProfileMutation: () => (useUserUpdateProfileMutation),
  useUserUploadImageMutation: () => (useUserUploadImageMutation)
});
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "User Management"
];
const injectedRtkApi = _sdk_api__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
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
            userUpdateProfile: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/update-profile`,
                        method: "PUT",
                        body: queryArg.updateUserProfile
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

const { useUserCloneByIdMutation, useUserCreateMutation, useUserFolderCreateMutation, useUserGetCurrentInformationQuery, useUserGetByIdQuery, useUserUpdateByIdMutation, useUserDeleteByIdMutation, useUserFolderDeleteByIdMutation, useUserDefaultKeyBindingsQuery, useUserGetAvailablePermissionsQuery, useUserGetCollectionQuery, useUserResetPasswordMutation, usePimcoreStudioApiUserSearchQuery, useUserUpdateActivePerspectiveMutation, useUserUpdatePasswordByIdMutation, useUserUpdateProfileMutation, useUserUploadImageMutation, useUserGetImageQuery, useUserGetTreeQuery } = injectedRtkApi;

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
/* ESM import */var _Pimcore_modules_auth_user_user_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/auth/user/user-api-slice.gen.ts");
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
const api = _Pimcore_modules_auth_user_user_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
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
"./js/src/sdk/api/user/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.api),
  usePimcoreStudioApiUserSearchQuery: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.usePimcoreStudioApiUserSearchQuery),
  useUserCloneByIdMutation: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useUserCloneByIdMutation),
  useUserCreateMutation: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useUserCreateMutation),
  useUserDefaultKeyBindingsQuery: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useUserDefaultKeyBindingsQuery),
  useUserDeleteByIdMutation: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useUserDeleteByIdMutation),
  useUserFolderCreateMutation: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useUserFolderCreateMutation),
  useUserFolderDeleteByIdMutation: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useUserFolderDeleteByIdMutation),
  useUserGetAvailablePermissionsQuery: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useUserGetAvailablePermissionsQuery),
  useUserGetByIdQuery: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useUserGetByIdQuery),
  useUserGetCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useUserGetCollectionQuery),
  useUserGetCurrentInformationQuery: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useUserGetCurrentInformationQuery),
  useUserGetImageQuery: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useUserGetImageQuery),
  useUserGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useUserGetTreeQuery),
  useUserResetPasswordMutation: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useUserResetPasswordMutation),
  useUserUpdateByIdMutation: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useUserUpdateByIdMutation),
  useUserUpdatePasswordByIdMutation: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useUserUpdatePasswordByIdMutation),
  useUserUploadImageMutation: () => (/* reexport safe */ _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useUserUploadImageMutation)
});
/* ESM import */var _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/user/user-api-slice-enhanced.ts");
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