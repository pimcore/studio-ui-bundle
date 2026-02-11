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
  useClassCustomLayoutEditorCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassCustomLayoutEditorCollectionQuery),
  useClassCustomLayoutGetIdentifierDataQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassCustomLayoutGetIdentifierDataQuery),
  useClassCustomLayoutImportMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassCustomLayoutImportMutation),
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
  useClassFieldCollectionObjectLayoutQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassFieldCollectionObjectLayoutQuery),
  useClassObjectBrickObjectLayoutQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassObjectBrickObjectLayoutQuery),
  useClassSelectOptionGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useClassSelectOptionGetTreeQuery),
  useLazyClassDefinitionExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useLazyClassDefinitionExportQuery),
  usePimcoreStudioApiClassCustomLayoutCreateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.usePimcoreStudioApiClassCustomLayoutCreateMutation),
  usePimcoreStudioApiClassCustomLayoutDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.usePimcoreStudioApiClassCustomLayoutDeleteMutation),
  usePimcoreStudioApiClassCustomLayoutExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.usePimcoreStudioApiClassCustomLayoutExportQuery),
  usePimcoreStudioApiClassCustomLayoutGetQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.usePimcoreStudioApiClassCustomLayoutGetQuery),
  usePimcoreStudioApiClassCustomLayoutUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.usePimcoreStudioApiClassCustomLayoutUpdateMutation)
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