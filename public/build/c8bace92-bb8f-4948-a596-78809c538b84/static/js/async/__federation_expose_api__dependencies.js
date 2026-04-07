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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_api__dependencies"], {
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/dependencies/dependencies-api-slice-enhanced.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useDependencyGetCollectionByElementTypeQuery: () => (useDependencyGetCollectionByElementTypeQuery)
});
/* import */ var _Pimcore_app_api_pimcore_tags__rspack_import_0 = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* import */ var _dependencies_api_slice_gen__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/dependencies/dependencies-api-slice.gen.ts");
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

const api = _dependencies_api_slice_gen__rspack_import_1.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.ASSET_DETAIL,
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.DATA_OBJECT_DETAIL,
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.DEPENDENCIES
    ],
    endpoints: {
        dependencyGetCollectionByElementType: {
            providesTags: (result, error, args)=>{
                const tags = _Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.ELEMENT_DEPENDENCIES(args.elementType, args.id);
                return tags.filter((tag)=>tag !== undefined);
            }
        }
    }
});
const { useDependencyGetCollectionByElementTypeQuery } = api;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/dependencies/dependencies-api-slice.gen.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useDependencyGetCollectionByElementTypeQuery: () => (useDependencyGetCollectionByElementTypeQuery)
});
/* import */ var _sdk_api__rspack_import_0 = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Dependencies"
];
const injectedRtkApi = _sdk_api__rspack_import_0.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            dependencyGetCollectionByElementType: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/dependencies/${queryArg.elementType}/${queryArg.id}`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            dependencyMode: queryArg.dependencyMode
                        }
                    }),
                providesTags: [
                    "Dependencies"
                ]
            })
        }),
    overrideExisting: false
});

const { useDependencyGetCollectionByElementTypeQuery } = injectedRtkApi;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/api/dependencies/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_dependencies_dependencies_api_slice_enhanced__rspack_import_0.api),
  useDependencyGetCollectionByElementTypeQuery: () => (/* reexport safe */ _Pimcore_modules_element_editor_shared_tab_manager_tabs_dependencies_dependencies_api_slice_enhanced__rspack_import_0.useDependencyGetCollectionByElementTypeQuery)
});
/* import */ var _Pimcore_modules_element_editor_shared_tab_manager_tabs_dependencies_dependencies_api_slice_enhanced__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/dependencies/dependencies-api-slice-enhanced.ts");
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
//# sourceMappingURL=__federation_expose_api__dependencies.js.map