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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_api__documents"], {
"./js/src/sdk/api/documents/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.api),
  useDocumentAddMutation: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentAddMutation),
  useDocumentAddTranslationMutation: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentAddTranslationMutation),
  useDocumentAvailableControllersListQuery: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentAvailableControllersListQuery),
  useDocumentAvailableTemplatesListQuery: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentAvailableTemplatesListQuery),
  useDocumentCloneMutation: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentCloneMutation),
  useDocumentDeleteSiteMutation: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentDeleteSiteMutation),
  useDocumentDeleteTranslationMutation: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentDeleteTranslationMutation),
  useDocumentDocTypeAddMutation: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentDocTypeAddMutation),
  useDocumentDocTypeDeleteMutation: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentDocTypeDeleteMutation),
  useDocumentDocTypeListQuery: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentDocTypeListQuery),
  useDocumentDocTypeTypeListQuery: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentDocTypeTypeListQuery),
  useDocumentDocTypeUpdateByIdMutation: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentDocTypeUpdateByIdMutation),
  useDocumentGetByIdQuery: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentGetByIdQuery),
  useDocumentGetSiteQuery: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentGetSiteQuery),
  useDocumentGetTranslationParentByLanguageQuery: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentGetTranslationParentByLanguageQuery),
  useDocumentGetTranslationsQuery: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentGetTranslationsQuery),
  useDocumentGetTreeQuery: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentGetTreeQuery),
  useDocumentPageSnippetAreaBlockRenderQuery: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentPageSnippetAreaBlockRenderQuery),
  useDocumentPageSnippetChangeMainDocumentMutation: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentPageSnippetChangeMainDocumentMutation),
  useDocumentRenderletRenderQuery: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentRenderletRenderQuery),
  useDocumentUpdateByIdMutation: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentUpdateByIdMutation),
  useDocumentUpdateSiteMutation: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentUpdateSiteMutation),
  useDocumentsListAvailableSitesQuery: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useDocumentsListAvailableSitesQuery),
  useLazyDocumentGetSiteQuery: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useLazyDocumentGetSiteQuery),
  useLazyDocumentGetTranslationsQuery: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useLazyDocumentGetTranslationsQuery),
  useLazyDocumentPageSnippetAreaBlockRenderQuery: () => (/* reexport safe */ _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0.useLazyDocumentPageSnippetAreaBlockRenderQuery)
});
/* import */ var _Pimcore_modules_document_document_api_slice_enhanced__rspack_import_0 = __webpack_require__("./js/src/core/modules/document/document-api-slice-enhanced.ts");
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
//# sourceMappingURL=__federation_expose_api__documents.js.map