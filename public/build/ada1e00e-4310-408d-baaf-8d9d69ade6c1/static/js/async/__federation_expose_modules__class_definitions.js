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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__class_definitions"], {
"./js/src/sdk/modules/class-definitions/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.api),
  useClassCustomLayoutCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassCustomLayoutCollectionQuery),
  useClassCustomLayoutCreateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassCustomLayoutCreateMutation),
  useClassCustomLayoutDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassCustomLayoutDeleteMutation),
  useClassCustomLayoutEditorCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassCustomLayoutEditorCollectionQuery),
  useClassCustomLayoutExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassCustomLayoutExportQuery),
  useClassCustomLayoutGetIdentifierDataQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassCustomLayoutGetIdentifierDataQuery),
  useClassCustomLayoutGetQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassCustomLayoutGetQuery),
  useClassCustomLayoutImportMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassCustomLayoutImportMutation),
  useClassCustomLayoutUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassCustomLayoutUpdateMutation),
  useClassDefinitionCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassDefinitionCollectionQuery),
  useClassDefinitionCreateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassDefinitionCreateMutation),
  useClassDefinitionDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassDefinitionDeleteMutation),
  useClassDefinitionExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassDefinitionExportQuery),
  useClassDefinitionFolderCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassDefinitionFolderCollectionQuery),
  useClassDefinitionGetBricksUsagesQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassDefinitionGetBricksUsagesQuery),
  useClassDefinitionGetByIdQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassDefinitionGetByIdQuery),
  useClassDefinitionGetIdentifierDataQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassDefinitionGetIdentifierDataQuery),
  useClassDefinitionGetLayoutByIdQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassDefinitionGetLayoutByIdQuery),
  useClassDefinitionGetQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassDefinitionGetQuery),
  useClassDefinitionGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassDefinitionGetTreeQuery),
  useClassDefinitionImportMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassDefinitionImportMutation),
  useClassDefinitionUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassDefinitionUpdateMutation),
  useClassFieldCollectionCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassFieldCollectionCollectionQuery),
  useClassFieldCollectionCreateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassFieldCollectionCreateMutation),
  useClassFieldCollectionDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassFieldCollectionDeleteMutation),
  useClassFieldCollectionExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassFieldCollectionExportQuery),
  useClassFieldCollectionGetByKeyQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassFieldCollectionGetByKeyQuery),
  useClassFieldCollectionGetLayoutByKeyQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassFieldCollectionGetLayoutByKeyQuery),
  useClassFieldCollectionGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassFieldCollectionGetTreeQuery),
  useClassFieldCollectionGetUsagesQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassFieldCollectionGetUsagesQuery),
  useClassFieldCollectionImportMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassFieldCollectionImportMutation),
  useClassFieldCollectionObjectLayoutQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassFieldCollectionObjectLayoutQuery),
  useClassFieldCollectionUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassFieldCollectionUpdateMutation),
  useClassGetAvailableVisibleFieldsQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassGetAvailableVisibleFieldsQuery),
  useClassGetSelectedVisibleFieldsQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassGetSelectedVisibleFieldsQuery),
  useClassObjectBrickClassesQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickClassesQuery),
  useClassObjectBrickCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickCollectionQuery),
  useClassObjectBrickCreateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickCreateMutation),
  useClassObjectBrickCustomLayoutDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickCustomLayoutDeleteMutation),
  useClassObjectBrickCustomLayoutExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickCustomLayoutExportQuery),
  useClassObjectBrickCustomLayoutGetQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickCustomLayoutGetQuery),
  useClassObjectBrickCustomLayoutImportMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickCustomLayoutImportMutation),
  useClassObjectBrickCustomLayoutUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickCustomLayoutUpdateMutation),
  useClassObjectBrickDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickDeleteMutation),
  useClassObjectBrickExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickExportQuery),
  useClassObjectBrickGetByKeyQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickGetByKeyQuery),
  useClassObjectBrickGetLayoutByKeyQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickGetLayoutByKeyQuery),
  useClassObjectBrickGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickGetTreeQuery),
  useClassObjectBrickGetUsagesQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickGetUsagesQuery),
  useClassObjectBrickImportMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickImportMutation),
  useClassObjectBrickObjectLayoutQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickObjectLayoutQuery),
  useClassObjectBrickUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickUpdateMutation),
  useClassSelectOptionGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassSelectOptionGetTreeQuery),
  useLazyClassDefinitionExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useLazyClassDefinitionExportQuery),
  useLazyClassFieldCollectionExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useLazyClassFieldCollectionExportQuery),
  useLazyClassObjectBrickExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useLazyClassObjectBrickExportQuery)
});
/* ESM import */var _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice-enhanced.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
// @todo mark as deprecated


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
//# sourceMappingURL=__federation_expose_modules__class_definitions.js.map