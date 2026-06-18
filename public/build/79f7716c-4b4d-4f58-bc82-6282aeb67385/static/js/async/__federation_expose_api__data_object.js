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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_api__data_object"], {
"./js/src/core/utils/normalize-icon.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  denormalizeIcon: () => (denormalizeIcon),
  denormalizeLayoutTreeIcons: () => (denormalizeLayoutTreeIcons),
  normalizeIcon: () => (normalizeIcon),
  normalizeLayoutTreeIcons: () => (normalizeLayoutTreeIcons)
});
/* import */ var _Pimcore_app_depency_injection__rspack_import_0 = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* import */ var _Pimcore_app_config_services_service_ids__rspack_import_1 = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
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

const normalizeIcon = (value)=>{
    if (value === null || value === undefined || value === '') {
        return null;
    }
    if (typeof value !== 'string') {
        return value;
    }
    const iconLibrary = _Pimcore_app_depency_injection__rspack_import_0.container.get(_Pimcore_app_config_services_service_ids__rspack_import_1.serviceIds.iconLibrary);
    const type = iconLibrary.get(value) !== undefined ? 'name' : 'path';
    return {
        type,
        value
    };
};
const denormalizeIcon = (value)=>{
    if (value === null || value === undefined) {
        return null;
    }
    if (typeof value === 'string') {
        return value;
    }
    return value.value;
};
const transformLayoutNodeIcons = (node, transform)=>{
    if (node === null || typeof node !== 'object' || Array.isArray(node)) {
        return node;
    }
    const obj = node;
    const result = {
        ...obj
    };
    if ('icon' in obj) {
        result.icon = transform(obj.icon);
    }
    if (Array.isArray(obj.children)) {
        result.children = obj.children.map((child)=>transformLayoutNodeIcons(child, transform));
    }
    return result;
};
const normalizeLayoutTreeIcons = (layout)=>{
    return transformLayoutNodeIcons(layout, normalizeIcon);
};
const denormalizeLayoutTreeIcons = (layout)=>{
    return transformLayoutNodeIcons(layout, denormalizeIcon);
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/api/data-object/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.api),
  useDataObjectAddMutation: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useDataObjectAddMutation),
  useDataObjectCloneMutation: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useDataObjectCloneMutation),
  useDataObjectDeleteGridConfigurationByConfigurationIdMutation: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useDataObjectDeleteGridConfigurationByConfigurationIdMutation),
  useDataObjectGetAvailableGridColumnsQuery: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useDataObjectGetAvailableGridColumnsQuery),
  useDataObjectGetByIdQuery: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useDataObjectGetByIdQuery),
  useDataObjectGetGridConfigurationQuery: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useDataObjectGetGridConfigurationQuery),
  useDataObjectGetLayoutByIdQuery: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useDataObjectGetLayoutByIdQuery),
  useDataObjectGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useDataObjectGetTreeQuery),
  useDataObjectListSavedGridConfigurationsQuery: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useDataObjectListSavedGridConfigurationsQuery),
  useDataObjectPatchByIdMutation: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useDataObjectPatchByIdMutation),
  useDataObjectPatchFolderByIdMutation: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useDataObjectPatchFolderByIdMutation),
  useDataObjectRemoveGridConfigurationAsFavoriteMutation: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useDataObjectRemoveGridConfigurationAsFavoriteMutation),
  useDataObjectSaveGridConfigurationMutation: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useDataObjectSaveGridConfigurationMutation),
  useDataObjectSetGridConfigurationAsFavoriteMutation: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useDataObjectSetGridConfigurationAsFavoriteMutation),
  useDataObjectUpdateByIdMutation: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useDataObjectUpdateByIdMutation),
  useDataObjectUpdateGridConfigurationMutation: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useDataObjectUpdateGridConfigurationMutation),
  useLazyDataObjectGetSelectOptionsQuery: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0.useLazyDataObjectGetSelectOptionsQuery)
});
/* import */ var _Pimcore_modules_data_object_data_object_api_slice_enhanced__rspack_import_0 = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice-enhanced.ts");
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
//# sourceMappingURL=__federation_expose_api__data_object.js.map