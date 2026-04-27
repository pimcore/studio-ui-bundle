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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_api__settings"], {
"./js/src/core/modules/app/settings/settings-slice.gen.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useActiveBundlesGetQuery: () => (useActiveBundlesGetQuery),
  useAdminSettingsGetQuery: () => (useAdminSettingsGetQuery),
  useAdminSettingsUpdateMutation: () => (useAdminSettingsUpdateMutation),
  usePingActionQuery: () => (usePingActionQuery),
  useSettingAdminThumbnailQuery: () => (useSettingAdminThumbnailQuery),
  useSettingsCountryCollectionQuery: () => (useSettingsCountryCollectionQuery),
  useSettingsImageAdapterCheckQuery: () => (useSettingsImageAdapterCheckQuery),
  useSettingsUpdateMutation: () => (useSettingsUpdateMutation),
  useSystemSettingsGetQuery: () => (useSystemSettingsGetQuery)
});
/* import */ var _sdk_api__rspack_import_0 = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Settings Admin",
    "Settings"
];
const injectedRtkApi = _sdk_api__rspack_import_0.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            adminSettingsGet: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/settings/admin`
                    }),
                providesTags: [
                    "Settings Admin"
                ]
            }),
            adminSettingsUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/settings/admin/save`,
                        method: "POST",
                        body: queryArg.updateAdminSettings
                    }),
                invalidatesTags: [
                    "Settings Admin"
                ]
            }),
            settingAdminThumbnail: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/setting/admin/thumbnail`
                    }),
                providesTags: [
                    "Settings Admin"
                ]
            }),
            settingsCountryCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/settings/available-countries`
                    }),
                providesTags: [
                    "Settings"
                ]
            }),
            systemSettingsGet: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/settings`
                    }),
                providesTags: [
                    "Settings"
                ]
            }),
            settingsUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/settings`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Settings"
                ]
            }),
            settingsImageAdapterCheck: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/settings/adapter/image`
                    }),
                providesTags: [
                    "Settings"
                ]
            }),
            activeBundlesGet: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/settings/active-bundles`
                    }),
                providesTags: [
                    "Settings"
                ]
            }),
            pingAction: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/settings/ping`
                    }),
                providesTags: [
                    "Settings"
                ]
            })
        }),
    overrideExisting: false
});

const { useAdminSettingsGetQuery, useAdminSettingsUpdateMutation, useSettingAdminThumbnailQuery, useSettingsCountryCollectionQuery, useSystemSettingsGetQuery, useSettingsUpdateMutation, useSettingsImageAdapterCheckQuery, useActiveBundlesGetQuery, usePingActionQuery } = injectedRtkApi;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/api/settings/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (/* reexport safe */ _Pimcore_modules_app_settings_settings_slice_gen__rspack_import_0.addTagTypes),
  api: () => (/* reexport safe */ _Pimcore_modules_app_settings_settings_slice_gen__rspack_import_0.api),
  useActiveBundlesGetQuery: () => (/* reexport safe */ _Pimcore_modules_app_settings_settings_slice_gen__rspack_import_0.useActiveBundlesGetQuery),
  useAdminSettingsGetQuery: () => (/* reexport safe */ _Pimcore_modules_app_settings_settings_slice_gen__rspack_import_0.useAdminSettingsGetQuery),
  useAdminSettingsUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_app_settings_settings_slice_gen__rspack_import_0.useAdminSettingsUpdateMutation),
  usePingActionQuery: () => (/* reexport safe */ _Pimcore_modules_app_settings_settings_slice_gen__rspack_import_0.usePingActionQuery),
  useSettingAdminThumbnailQuery: () => (/* reexport safe */ _Pimcore_modules_app_settings_settings_slice_gen__rspack_import_0.useSettingAdminThumbnailQuery),
  useSettingsCountryCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_app_settings_settings_slice_gen__rspack_import_0.useSettingsCountryCollectionQuery),
  useSettingsImageAdapterCheckQuery: () => (/* reexport safe */ _Pimcore_modules_app_settings_settings_slice_gen__rspack_import_0.useSettingsImageAdapterCheckQuery),
  useSettingsUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_app_settings_settings_slice_gen__rspack_import_0.useSettingsUpdateMutation),
  useSystemSettingsGetQuery: () => (/* reexport safe */ _Pimcore_modules_app_settings_settings_slice_gen__rspack_import_0.useSystemSettingsGetQuery)
});
/* import */ var _Pimcore_modules_app_settings_settings_slice_gen__rspack_import_0 = __webpack_require__("./js/src/core/modules/app/settings/settings-slice.gen.ts");
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
//# sourceMappingURL=__federation_expose_api__settings.js.map