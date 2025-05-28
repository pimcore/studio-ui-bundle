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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/grid.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ManyToManyRelationGrid: () => (ManyToManyRelationGrid),
  getElementCellConfig: () => (getElementCellConfig)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/drag-and-drop/hooks/use-droppable.tsx");
/* ESM import */var _Pimcore_components_grid_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/grid/grid.tsx");
/* ESM import */var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./node_modules/@tanstack/table-core/build/lib/index.mjs");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-helper.ts");
/* ESM import */var _Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/button-group/button-group.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_12__);
/* ESM import */var _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/asset/actions/download/use-download.tsx");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_element_utils_element_type__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/element/utils/element-type.ts");
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

















const getElementCellConfig = (disabled)=>{
    return {
        allowedTypes: [],
        getElementInfo: (itemProps)=>{
            const element = itemProps.row.original;
            const elementType = (0,_Pimcore_modules_element_utils_element_type__WEBPACK_IMPORTED_MODULE_16__.mapToElementType)(element.type);
            return {
                elementType: elementType ?? undefined,
                id: element.id,
                fullPath: element.fullPath,
                published: element.isPublished ?? undefined,
                disabled
            };
        }
    };
};
const ManyToManyRelationGrid = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(_c = _s(function ManyToManyRelationGrid(props, ref) {
    _s();
    const { getStateClasses } = (0,_Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_3__.useDroppable)();
    const { confirm } = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_11__.useFormModal)();
    const { openElement, mapToElementType } = (0,_Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_8__.useElementHelper)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation)();
    const { download } = (0,_Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_13__.useDownload)();
    const columnHelper = (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_17__.createColumnHelper)();
    const columns = props.columnDefinition !== undefined ? [
        ...props.columnDefinition
    ] : [
        columnHelper.accessor('id', {
            header: t('relations.id'),
            size: 80
        }),
        columnHelper.accessor('fullPath', {
            header: t('relations.reference'),
            meta: {
                type: 'element',
                autoWidth: true,
                editable: false,
                config: getElementCellConfig(props.inherited === true || props.disabled === true)
            },
            size: 200
        }),
        columnHelper.accessor('type', {
            header: t('relations.type'),
            meta: {
                type: 'translate'
            },
            size: 150
        }),
        columnHelper.accessor('subtype', {
            header: t('relations.subtype'),
            meta: {
                type: 'translate'
            },
            size: 150
        })
    ];
    columns.push(columnHelper.accessor('actions', {
        header: t('actions'),
        size: 110,
        cell: (info)=>{
            const rowIndex = info.row.index;
            const rowValue = info.row.original;
            const buttons = [];
            buttons.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_6__.Tooltip, {
                title: t('open'),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__.IconButton, {
                    icon: {
                        value: 'open-folder'
                    },
                    onClick: async ()=>{
                        const typeValue = mapToElementType(rowValue.type);
                        !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(typeValue) && await openElement({
                            type: typeValue,
                            id: rowValue.id
                        });
                    },
                    type: "link"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/grid.tsx",
                    lineNumber: 127,
                    columnNumber: 13
                }, this)
            }, "open", false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/grid.tsx",
                lineNumber: 123,
                columnNumber: 11
            }, this));
            if (props.assetInlineDownloadAllowed && rowValue.type === 'asset') {
                buttons.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_6__.Tooltip, {
                    title: t('download'),
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__.IconButton, {
                        "aria-label": t('aria.asset.image-sidebar.tab.details.download-thumbnail'),
                        icon: {
                            value: 'download'
                        },
                        onClick: ()=>{
                            download(rowValue.id.toString());
                        },
                        type: "link"
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/grid.tsx",
                        lineNumber: 148,
                        columnNumber: 15
                    }, this)
                }, "download", false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/grid.tsx",
                    lineNumber: 144,
                    columnNumber: 13
                }, this));
            }
            if (props.disabled !== true) {
                buttons.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_6__.Tooltip, {
                    title: t('remove'),
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__.IconButton, {
                        icon: {
                            value: 'trash'
                        },
                        onClick: ()=>{
                            confirm({
                                title: t('remove'),
                                content: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_i18next__WEBPACK_IMPORTED_MODULE_7__.Trans, {
                                    i18nKey: 'delete-confirmation-advanced',
                                    shouldUnescape: true,
                                    values: {
                                        type: t('relation'),
                                        value: rowValue.fullPath
                                    }
                                }, void 0, false, {
                                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/grid.tsx",
                                    lineNumber: 173,
                                    columnNumber: 30
                                }, void 0),
                                onOk: ()=>{
                                    props.deleteItem(rowIndex);
                                }
                            });
                        },
                        type: "link"
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/grid.tsx",
                        lineNumber: 168,
                        columnNumber: 15
                    }, this)
                }, "remove", false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/grid.tsx",
                    lineNumber: 164,
                    columnNumber: 13
                }, this));
            }
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_10__.Box, {
                padding: "mini",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_9__.ButtonGroup, {
                    items: buttons,
                    noSpacing: true
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/grid.tsx",
                    lineNumber: 194,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/grid.tsx",
                lineNumber: 193,
                columnNumber: 11
            }, this);
        }
    }));
    const getDataArray = ()=>{
        const result = props.value ?? [];
        return result.map((item)=>{
            const elementType = mapToElementType(item.type);
            const resultRow = {
                ...item,
                type: elementType ?? ''
            };
            if (props.enrichRowData !== undefined) {
                return props.enrichRowData(resultRow);
            }
            return resultRow;
        });
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_12___default()(...getStateClasses()),
        ref: ref,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_15__.Content, {
            style: {
                width: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_14__.toCssDimension)(props.width),
                height: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_14__.toCssDimension)(props.height)
            },
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                style: {
                    maxWidth: 'calc(100% - 2px)'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_grid_grid__WEBPACK_IMPORTED_MODULE_4__.Grid, {
                        autoWidth: true,
                        className: props.className,
                        columns: columns,
                        data: getDataArray(),
                        disabled: props.disabled === true || props.inherited === true,
                        onUpdateCellData: props.onUpdateCellData,
                        resizable: true
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/grid.tsx",
                        lineNumber: 234,
                        columnNumber: 11
                    }, this),
                    props.hint
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/grid.tsx",
                lineNumber: 229,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/grid.tsx",
            lineNumber: 223,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/grid.tsx",
        lineNumber: 219,
        columnNumber: 5
    }, this);
}, "/MLcNIYhDN+IG/TVy1StvwHQHrI=", false, function() {
    return [
        _Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_3__.useDroppable,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_11__.useFormModal,
        _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_8__.useElementHelper,
        react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation,
        _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_13__.useDownload
    ];
})), "/MLcNIYhDN+IG/TVy1StvwHQHrI=", false, function() {
    return [
        _Pimcore_components_drag_and_drop_hooks_use_droppable__WEBPACK_IMPORTED_MODULE_3__.useDroppable,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_11__.useFormModal,
        _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_8__.useElementHelper,
        react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation,
        _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_13__.useDownload
    ];
});
_c1 = ManyToManyRelationGrid;
var _c, _c1;
$RefreshReg$(_c, "ManyToManyRelationGrid$forwardRef");
$RefreshReg$(_c1, "ManyToManyRelationGrid");

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
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.bbc2a46da469b1ec.hot-update.js.map