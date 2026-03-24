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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_modules__class_definitions"], {
"./js/src/sdk/modules/class-definitions/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.api),
  useClassCustomLayoutCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassCustomLayoutCollectionQuery),
  useClassCustomLayoutCreateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassCustomLayoutCreateMutation),
  useClassCustomLayoutDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassCustomLayoutDeleteMutation),
  useClassCustomLayoutEditorCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassCustomLayoutEditorCollectionQuery),
  useClassCustomLayoutExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassCustomLayoutExportQuery),
  useClassCustomLayoutGetIdentifierDataQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassCustomLayoutGetIdentifierDataQuery),
  useClassCustomLayoutGetQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassCustomLayoutGetQuery),
  useClassCustomLayoutImportMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassCustomLayoutImportMutation),
  useClassCustomLayoutUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassCustomLayoutUpdateMutation),
  useClassDefinitionCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassDefinitionCollectionQuery),
  useClassDefinitionCreateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassDefinitionCreateMutation),
  useClassDefinitionDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassDefinitionDeleteMutation),
  useClassDefinitionExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassDefinitionExportQuery),
  useClassDefinitionFolderCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassDefinitionFolderCollectionQuery),
  useClassDefinitionGetBricksUsagesQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassDefinitionGetBricksUsagesQuery),
  useClassDefinitionGetByIdQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassDefinitionGetByIdQuery),
  useClassDefinitionGetIdentifierDataQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassDefinitionGetIdentifierDataQuery),
  useClassDefinitionGetLayoutByIdQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassDefinitionGetLayoutByIdQuery),
  useClassDefinitionGetQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassDefinitionGetQuery),
  useClassDefinitionGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassDefinitionGetTreeQuery),
  useClassDefinitionImportMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassDefinitionImportMutation),
  useClassDefinitionUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassDefinitionUpdateMutation),
  useClassFieldCollectionCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassFieldCollectionCollectionQuery),
  useClassFieldCollectionCreateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassFieldCollectionCreateMutation),
  useClassFieldCollectionDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassFieldCollectionDeleteMutation),
  useClassFieldCollectionExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassFieldCollectionExportQuery),
  useClassFieldCollectionGetByKeyQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassFieldCollectionGetByKeyQuery),
  useClassFieldCollectionGetLayoutByKeyQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassFieldCollectionGetLayoutByKeyQuery),
  useClassFieldCollectionGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassFieldCollectionGetTreeQuery),
  useClassFieldCollectionGetUsagesQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassFieldCollectionGetUsagesQuery),
  useClassFieldCollectionImportMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassFieldCollectionImportMutation),
  useClassFieldCollectionObjectLayoutQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassFieldCollectionObjectLayoutQuery),
  useClassFieldCollectionUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassFieldCollectionUpdateMutation),
  useClassGetAvailableVisibleFieldsQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassGetAvailableVisibleFieldsQuery),
  useClassGetFieldsByTypeQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassGetFieldsByTypeQuery),
  useClassGetSelectedVisibleFieldsQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassGetSelectedVisibleFieldsQuery),
  useClassObjectBrickClassesQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickClassesQuery),
  useClassObjectBrickCollectionQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickCollectionQuery),
  useClassObjectBrickCreateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickCreateMutation),
  useClassObjectBrickCustomLayoutDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickCustomLayoutDeleteMutation),
  useClassObjectBrickCustomLayoutExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickCustomLayoutExportQuery),
  useClassObjectBrickCustomLayoutGetQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickCustomLayoutGetQuery),
  useClassObjectBrickCustomLayoutImportMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickCustomLayoutImportMutation),
  useClassObjectBrickCustomLayoutUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickCustomLayoutUpdateMutation),
  useClassObjectBrickDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickDeleteMutation),
  useClassObjectBrickExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickExportQuery),
  useClassObjectBrickGetByKeyQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickGetByKeyQuery),
  useClassObjectBrickGetLayoutByKeyQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickGetLayoutByKeyQuery),
  useClassObjectBrickGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickGetTreeQuery),
  useClassObjectBrickGetUsagesQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickGetUsagesQuery),
  useClassObjectBrickImportMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickImportMutation),
  useClassObjectBrickObjectLayoutQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickObjectLayoutQuery),
  useClassObjectBrickUpdateMutation: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassObjectBrickUpdateMutation),
  useClassSelectOptionGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useClassSelectOptionGetTreeQuery),
  useLazyClassDefinitionExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useLazyClassDefinitionExportQuery),
  useLazyClassFieldCollectionExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useLazyClassFieldCollectionExportQuery),
  useLazyClassObjectBrickExportQuery: () => (/* reexport safe */ _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0.useLazyClassObjectBrickExportQuery)
});
/* import */ var _Pimcore_modules_class_definition_class_definition_slice_enhanced__rspack_import_0 = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice-enhanced.ts");
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
// @todo mark as deprecated


function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=__federation_expose_modules__class_definitions.js.map