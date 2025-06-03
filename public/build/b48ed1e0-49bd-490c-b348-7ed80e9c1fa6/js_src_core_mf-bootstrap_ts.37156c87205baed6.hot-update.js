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
self["webpackHotUpdatepimcore_studio_ui_bundle_core"]("js_src_core_mf-bootstrap_ts", {
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/tabs/collection/collection-tab.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CollectionTab: () => (CollectionTab)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_data_object_classification_store_classification_store_api_slice_gen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/classification-store/classification-store-api-slice.gen.ts");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _Pimcore_components_grid_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/grid/grid.tsx");
/* ESM import */var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/@tanstack/react-table/@tanstack/react-table");
/* ESM import */var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_tanstack_react_table__WEBPACK_IMPORTED_MODULE_6__);
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
var _s = $RefreshSig$();






const CollectionTab = (props)=>{
    _s();
    const { isLoading, data } = (0,_Pimcore_modules_data_object_classification_store_classification_store_api_slice_gen__WEBPACK_IMPORTED_MODULE_2__.useClassificationStoreGetCollectionsQuery)({
        storeId: props.storeId,
        objectId: props.objectId,
        page: 1,
        pageSize: 10,
        fieldName: props.fieldName
    }, {
        refetchOnMountOrArgChange: true
    });
    if (isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_3__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/tabs/collection/collection-tab.tsx",
            lineNumber: 37,
            columnNumber: 12
        }, undefined);
    }
    const columnHelper = (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_6__.createColumnHelper)();
    const columnList = [
        columnHelper.accessor('id', {
            header: 'Id',
            size: 100
        }),
        columnHelper.accessor('name', {
            header: 'Name',
            size: 200
        }),
        columnHelper.accessor('description', {
            header: 'Description',
            size: 200
        })
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_3__.Content, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_4__.ContentLayout, {
            renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                children: "Render Bottom"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/tabs/collection/collection-tab.tsx",
                lineNumber: 60,
                columnNumber: 25
            }, void 0),
            renderTopBar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                children: "Render Top"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/tabs/collection/collection-tab.tsx",
                lineNumber: 61,
                columnNumber: 24
            }, void 0),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_grid_grid__WEBPACK_IMPORTED_MODULE_5__.Grid, {
                columns: columnList,
                data: data === null || data === void 0 ? void 0 : data.items
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/tabs/collection/collection-tab.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/tabs/collection/collection-tab.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/components/classification-store-modal/tabs/collection/collection-tab.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, undefined);
};
_s(CollectionTab, "mxO+MgooSxX2Hs5tg1i1eovlx/U=", false, function() {
    return [
        _Pimcore_modules_data_object_classification_store_classification_store_api_slice_gen__WEBPACK_IMPORTED_MODULE_2__.useClassificationStoreGetCollectionsQuery
    ];
});
_c = CollectionTab;
var _c;
$RefreshReg$(_c, "CollectionTab");

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

});
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.37156c87205baed6.hot-update.js.map