"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_modules_app_component-registry_component-config_ts"], {
"./js/src/core/components/reload-popconfirm/reload-popconfirm.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ReloadPopconfirm: () => (ReloadPopconfirm)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();


const ReloadPopconfirm = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(_c = _s((props, ref)=>{
    _s();
    const [popConfirmOpen, setPopConfirmOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    // Expose open function to parent via ref
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, ()=>({
            refresh: ()=>{
                if (props.hasDataChanged()) {
                    setPopConfirmOpen(true);
                } else {
                    props.onReload();
                }
            }
        }));
    const onOpenChange = (newOpen)=>{
        if (!newOpen) {
            setPopConfirmOpen(false);
            return;
        }
        if (props.hasDataChanged()) {
            setPopConfirmOpen(true);
        } else {
            props.onReload();
        }
    };
    const onConfirm = ()=>{
        setPopConfirmOpen(false);
        props.onReload();
    };
    const onCancel = ()=>{
        var _props_onCancel;
        setPopConfirmOpen(false);
        (_props_onCancel = props.onCancel) === null || _props_onCancel === void 0 ? void 0 : _props_onCancel.call(props);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Popconfirm, {
        onCancel: onCancel,
        onConfirm: onConfirm,
        onOpenChange: onOpenChange,
        open: popConfirmOpen,
        title: props.title,
        children: props.children
    }, "reload", false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/reload-popconfirm/reload-popconfirm.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, undefined);
}, "MOPT5Lxi9AeqTnbSjJkC3wWdVDg=")), "MOPT5Lxi9AeqTnbSjJkC3wWdVDg=");
_c1 = ReloadPopconfirm;
ReloadPopconfirm.displayName = 'ReloadPopconfirm';

var _c, _c1;
$RefreshReg$(_c, "ReloadPopconfirm$forwardRef");
$RefreshReg$(_c1, "ReloadPopconfirm");

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
"./js/src/core/modules/app/component-registry/component-config.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  componentConfig: () => (componentConfig)
});
/* ESM import */var _enums_component_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/app/component-registry/enums/component-type.ts");
/* ESM import */var _Pimcore_modules_asset_editor_toolbar_context_menu_context_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/editor/toolbar/context-menu/context-menu.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 

const defaultComponentConfig = {
    asset: {
        editor: {
            container: {
                type: _enums_component_type__WEBPACK_IMPORTED_MODULE_0__.ComponentType.SINGLE,
                name: 'asset.editor.container'
            },
            tab: {
                customMetadata: {
                    type: _enums_component_type__WEBPACK_IMPORTED_MODULE_0__.ComponentType.SINGLE,
                    name: 'asset.editor.tab.customMetadata'
                },
                embeddedMetadata: {
                    type: _enums_component_type__WEBPACK_IMPORTED_MODULE_0__.ComponentType.SINGLE,
                    name: 'asset.editor.tab.embeddedMetadata'
                },
                versions: {
                    type: _enums_component_type__WEBPACK_IMPORTED_MODULE_0__.ComponentType.SINGLE,
                    name: 'asset.editor.tab.versions'
                }
            },
            toolbar: {
                contextMenu: {
                    type: _enums_component_type__WEBPACK_IMPORTED_MODULE_0__.ComponentType.SINGLE,
                    name: 'asset.editor.toolbar.contextMenu'
                },
                slots: {
                    left: {
                        type: _enums_component_type__WEBPACK_IMPORTED_MODULE_0__.ComponentType.SLOT,
                        name: 'asset.editor.toolbar.slots.left',
                        defaultEntries: [
                            {
                                name: 'contextMenu',
                                priority: 100,
                                component: _Pimcore_modules_asset_editor_toolbar_context_menu_context_menu__WEBPACK_IMPORTED_MODULE_1__.EditorToolbarContextMenu
                            }
                        ]
                    },
                    right: {
                        type: _enums_component_type__WEBPACK_IMPORTED_MODULE_0__.ComponentType.SLOT,
                        name: 'asset.editor.toolbar.slots.right'
                    }
                }
            }
        },
        tree: {
            contextMenu: {
                type: _enums_component_type__WEBPACK_IMPORTED_MODULE_0__.ComponentType.SINGLE,
                name: 'asset.tree.contextMenu'
            }
        }
    },
    dataObject: {
        editor: {
            toolbar: {
                contextMenu: {
                    type: _enums_component_type__WEBPACK_IMPORTED_MODULE_0__.ComponentType.SINGLE,
                    name: 'dataObject.editor.toolbar.contextMenu'
                }
            }
        },
        tree: {
            contextMenu: {
                type: _enums_component_type__WEBPACK_IMPORTED_MODULE_0__.ComponentType.SINGLE,
                name: 'dataObject.tree.contextMenu'
            }
        }
    },
    wysiwyg: {
        editor: {
            type: _enums_component_type__WEBPACK_IMPORTED_MODULE_0__.ComponentType.SINGLE,
            name: 'wysiwyg.editor'
        }
    }
};
const componentConfig = {
    ...defaultComponentConfig
};

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
"./js/src/core/modules/app/component-registry/enums/component-type.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ComponentType: () => (ComponentType)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ var ComponentType = /*#__PURE__*/ function(ComponentType) {
    ComponentType["SINGLE"] = "single";
    ComponentType["SLOT"] = "slot";
    return ComponentType;
}({});

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
"./js/src/core/modules/asset/actions/clear-thumbnails/use-clear-thumbnails.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useClearThumbnails: () => (useClearThumbnails)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice.gen.ts");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();







const useClearThumbnails = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const [clearThumbnail, { isError, error }] = (0,_Pimcore_modules_asset_asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.useAssetClearThumbnailMutation)();
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (isError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__.ApiError(error));
        }
    }, [
        isError
    ]);
    const handleClearThumbnails = async (node, onFinish)=>{
        const clearThumbnailTask = clearThumbnail({
            id: node.id
        });
        await clearThumbnailTask;
        onFinish === null || onFinish === void 0 ? void 0 : onFinish();
    };
    const clearImageThumbnailContextMenuItem = (node, onFinish)=>{
        return {
            label: t('asset.tree.context-menu.clear-thumbnails'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_7__.ContextMenuActionName.clearImageThumbnails,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                value: 'remove-image-thumbnail'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/clear-thumbnails/use-clear-thumbnails.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, undefined),
            hidden: node.type !== 'image' || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_5__.checkElementPermission)(node.permissions, 'publish'),
            onClick: async ()=>{
                await handleClearThumbnails(node, onFinish);
            }
        };
    };
    const clearVideoThumbnailContextMenuItem = (node, onFinish)=>{
        return {
            label: t('asset.tree.context-menu.clear-thumbnails'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_7__.ContextMenuActionName.clearVideoThumbnails,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                value: 'remove-video-thumbnail'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/clear-thumbnails/use-clear-thumbnails.tsx",
                lineNumber: 62,
                columnNumber: 13
            }, undefined),
            hidden: node.type !== 'video' || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_5__.checkElementPermission)(node.permissions, 'publish'),
            onClick: async ()=>{
                await handleClearThumbnails(node, onFinish);
            }
        };
    };
    const clearPdfThumbnailContextMenuItem = (node, onFinish)=>{
        return {
            label: t('asset.tree.context-menu.clear-thumbnails'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_7__.ContextMenuActionName.clearPdfThumbnails,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                value: 'remove-pdf-thumbnail'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/clear-thumbnails/use-clear-thumbnails.tsx",
                lineNumber: 72,
                columnNumber: 13
            }, undefined),
            hidden: node.mimeType !== 'application/pdf' || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_5__.checkElementPermission)(node.permissions, 'publish'),
            onClick: async ()=>{
                await handleClearThumbnails(node, onFinish);
            }
        };
    };
    return {
        clearImageThumbnailContextMenuItem,
        clearVideoThumbnailContextMenuItem,
        clearPdfThumbnailContextMenuItem
    };
};
_s(useClearThumbnails, "Cy9C5hnrNmO1ljfjhncCjJa6Cfo=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _Pimcore_modules_asset_asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.useAssetClearThumbnailMutation
    ];
});

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
"./js/src/core/modules/asset/actions/zip-download/use-zip-download.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useZipDownload: () => (useZipDownload)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/execution-engine/hooks/useJobs.ts");
/* ESM import */var _asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_execution_engine_jobs_download_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/execution-engine/jobs/download/factory.ts");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/execution-engine/topics.ts");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var _Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();













const useZipDownload = (props)=>{
    _s();
    const [fetchFolder] = (0,_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useAssetExportZipFolderMutation)();
    const [fetchAssets, { isError, error }] = (0,_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useAssetExportZipAssetMutation)();
    const { addJob } = (0,_Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_1__.useJobs)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const { isTreeActionAllowed } = (0,_Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_10__.useTreePermission)();
    (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(()=>{
        if (isError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_12__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_12__.ApiError(error));
        }
    }, [
        isError
    ]);
    const createZipDownload = (param)=>{
        let { jobTitle, requestData } = param;
        addJob((0,_Pimcore_modules_execution_engine_jobs_download_factory__WEBPACK_IMPORTED_MODULE_3__.createJob)({
            // @todo add api domain
            title: t('jobs.zip-job.title', {
                title: jobTitle
            }),
            topics: [
                _Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_5__.topics["zip-download-ready"],
                ..._Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_5__.defaultTopics
            ],
            downloadUrl: '/pimcore-studio/api/assets/download/zip/{jobRunId}',
            action: async ()=>{
                let promise;
                if (props.type === 'folder') {
                    promise = fetchFolder(requestData);
                } else {
                    promise = fetchAssets(requestData);
                }
                const response = await promise;
                const data = response.data;
                return data.jobRunId;
            }
        }));
    };
    const createZipDownloadContextMenuItem = (node, onFinish)=>{
        return {
            label: t('asset.tree.context-menu.download-as-zip'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_13__.ContextMenuActionName.downloadAsZip,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                value: 'download-zip'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/zip-download/use-zip-download.tsx",
                lineNumber: 95,
                columnNumber: 13
            }, undefined),
            hidden: node.type !== 'folder' || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'view'),
            onClick: ()=>{
                createZipDownload({
                    jobTitle: (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_9__.getElementKey)(node, 'asset'),
                    requestData: {
                        body: {
                            folders: [
                                node.id
                            ]
                        }
                    }
                });
            }
        };
    };
    const createZipDownloadTreeContextMenuItem = (node)=>{
        return {
            label: t('asset.tree.context-menu.download-as-zip'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_13__.ContextMenuActionName.downloadAsZip,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                value: 'download-zip'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/zip-download/use-zip-download.tsx",
                lineNumber: 110,
                columnNumber: 13
            }, undefined),
            hidden: !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_11__.TreePermission.DownloadZip) || node.type !== 'folder' || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'view'),
            onClick: ()=>{
                createZipDownload({
                    jobTitle: node.label,
                    requestData: {
                        body: {
                            folders: [
                                parseInt(node.id)
                            ]
                        }
                    }
                });
            }
        };
    };
    if (props.type === 'folder') {
        return {
            createZipDownload: createZipDownload,
            createZipDownloadTreeContextMenuItem,
            createZipDownloadContextMenuItem
        };
    }
    return {
        createZipDownload: createZipDownload,
        createZipDownloadTreeContextMenuItem,
        createZipDownloadContextMenuItem
    };
};
_s(useZipDownload, "bYmN8nzajMMU1hAZ7+8sPdyFznA=", false, function() {
    return [
        _asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useAssetExportZipFolderMutation,
        _asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useAssetExportZipAssetMutation,
        _Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_1__.useJobs,
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_10__.useTreePermission
    ];
});

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
"./js/src/core/modules/asset/editor/toolbar/context-menu/context-menu.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditorToolbarContextMenu: () => (EditorToolbarContextMenu)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-draft.ts");
/* ESM import */var _Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/actions/rename/use-rename.tsx");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/actions/delete/use-delete.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/asset/actions/download/use-download.tsx");
/* ESM import */var _Pimcore_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/dropdown-button/dropdown-button.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_zip_download_use_zip_download__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/asset/actions/zip-download/use-zip-download.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_clear_thumbnails_use_clear_thumbnails__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/asset/actions/clear-thumbnails/use-clear-thumbnails.tsx");
/* ESM import */var _Pimcore_modules_element_actions_refresh_element_use_element_refresh__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/element/actions/refresh-element/use-element-refresh.tsx");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_components_reload_popconfirm_reload_popconfirm__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/components/reload-popconfirm/reload-popconfirm.tsx");
/* ESM import */var _Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/components/button-group/button-group.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 
var _s = $RefreshSig$();
















const EditorToolbarContextMenu = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_4__.AssetContext);
    const { asset } = (0,_Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_5__.useAssetDraft)(id);
    const { renameContextMenuItem } = (0,_Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_6__.useRename)('asset', (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_14__.getElementActionCacheKey)('asset', 'rename', asset.id));
    const { deleteContextMenuItem } = (0,_Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_8__.useDelete)('asset', (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_14__.getElementActionCacheKey)('asset', 'delete', asset.id));
    const { downloadContextMenuItem } = (0,_Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_9__.useDownload)();
    const { createZipDownloadContextMenuItem } = (0,_Pimcore_modules_asset_actions_zip_download_use_zip_download__WEBPACK_IMPORTED_MODULE_11__.useZipDownload)({
        type: 'folder'
    });
    const { refreshElement } = (0,_Pimcore_modules_element_actions_refresh_element_use_element_refresh__WEBPACK_IMPORTED_MODULE_13__.useElementRefresh)('asset');
    const { clearImageThumbnailContextMenuItem, clearVideoThumbnailContextMenuItem, clearPdfThumbnailContextMenuItem } = (0,_Pimcore_modules_asset_actions_clear_thumbnails_use_clear_thumbnails__WEBPACK_IMPORTED_MODULE_12__.useClearThumbnails)();
    const items = [
        renameContextMenuItem(asset, ()=>{
            refreshElement(asset.id);
        }),
        deleteContextMenuItem(asset),
        downloadContextMenuItem(asset),
        createZipDownloadContextMenuItem(asset),
        clearImageThumbnailContextMenuItem(asset),
        clearVideoThumbnailContextMenuItem(asset),
        clearPdfThumbnailContextMenuItem(asset)
    ];
    const visibleItems = items.filter((item)=>item !== null && 'hidden' in item ? (item === null || item === void 0 ? void 0 : item.hidden) === false : false);
    const buttonGroupItems = [];
    buttonGroupItems.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_reload_popconfirm_reload_popconfirm__WEBPACK_IMPORTED_MODULE_15__.ReloadPopconfirm, {
        hasDataChanged: hasDataChanged,
        onReload: onReload,
        title: t('toolbar.reload.confirmation'),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_1__.IconButton, {
            icon: {
                value: 'refresh'
            },
            children: t('toolbar.reload')
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/context-menu/context-menu.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, undefined)
    }, 'reload-button', false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/context-menu/context-menu.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, undefined));
    if (visibleItems.length > 0) {
        buttonGroupItems.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_7__.Dropdown, {
            menu: {
                items
            },
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_10__.DropdownButton, {
                children: t('toolbar.more')
            }, 'dropdown-button', false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/context-menu/context-menu.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, undefined)
        }, 'more-button', false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/context-menu/context-menu.tsx",
            lineNumber: 78,
            columnNumber: 7
        }, undefined));
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_16__.ButtonGroup, {
        items: buttonGroupItems,
        noSpacing: true
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/toolbar/context-menu/context-menu.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, undefined);
    function hasDataChanged() {
        return Object.keys((asset === null || asset === void 0 ? void 0 : asset.changes) ?? {}).length > 0;
    }
    function onReload() {
        refreshElement(id, true);
    }
};
_s(EditorToolbarContextMenu, "UsEY1sYhRABvd9xxgxD/SWmA/8I=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_5__.useAssetDraft,
        _Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_6__.useRename,
        _Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_8__.useDelete,
        _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_9__.useDownload,
        _Pimcore_modules_asset_actions_zip_download_use_zip_download__WEBPACK_IMPORTED_MODULE_11__.useZipDownload,
        _Pimcore_modules_element_actions_refresh_element_use_element_refresh__WEBPACK_IMPORTED_MODULE_13__.useElementRefresh,
        _Pimcore_modules_asset_actions_clear_thumbnails_use_clear_thumbnails__WEBPACK_IMPORTED_MODULE_12__.useClearThumbnails
    ];
});
_c = EditorToolbarContextMenu;
var _c;
$RefreshReg$(_c, "EditorToolbarContextMenu");

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
"./js/src/core/modules/execution-engine/jobs/download/factory.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createJob: () => (createJob)
});
/* ESM import */var _abstact_job__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/execution-engine/jobs/abstact-job.ts");
/* ESM import */var _factory_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/execution-engine/jobs/factory-helper.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/ 

const createJob = (job)=>{
    return {
        id: (0,_factory_helper__WEBPACK_IMPORTED_MODULE_1__.getUniqueId)(),
        action: job.action,
        type: 'download',
        title: job.title,
        status: _abstact_job__WEBPACK_IMPORTED_MODULE_0__.JobStatus.QUEUED,
        topics: job.topics,
        config: {
            downloadUrl: job.downloadUrl
        }
    };
};

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
//# sourceMappingURL=js_src_core_modules_app_component-registry_component-config_ts.js.map