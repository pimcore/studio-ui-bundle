"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_modules_asset_actions_download_use-download_tsx-js_src_core_modules_element_actio-ada654"], {
"./js/src/core/lib/event-bus/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  eventBus: () => (eventBus)
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
*/ class EventBus {
    subscribe(identifier, callback) {
        const newSubscriber = {
            identifier,
            callback
        };
        this.subscribers.push(newSubscriber);
        return newSubscriber;
    }
    unsubscribe(subscriber) {
        this.subscribers = this.subscribers.filter((sub)=>sub !== subscriber);
    }
    publish(event) {
        this.subscribers.forEach((subscriber)=>{
            if (subscriber.identifier.type === event.identifier.type && subscriber.identifier.id === event.identifier.id) {
                subscriber.callback(event);
            }
        });
    }
    constructor(){
        this.subscribers = [];
    }
}
const eventBus = new EventBus();

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
"./js/src/core/modules/asset/actions/download/use-download.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDownload: () => (useDownload)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
/* ESM import */var _Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/utils/files.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var _Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
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









const useDownload = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { isTreeActionAllowed } = (0,_Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_7__.useTreePermission)();
    const download = (id, label)=>{
        const downloadUrl = `${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_4__.getPrefix)()}/assets/${id}/download`;
        (0,_Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_5__.saveFileLocal)(downloadUrl, label);
    };
    const handleDownload = (node, onFinish)=>{
        const id = typeof node.id === 'string' ? node.id : node.id.toString();
        download(id);
        onFinish === null || onFinish === void 0 ? void 0 : onFinish();
    };
    const downloadContextMenuItem = (node, onFinish)=>{
        return {
            label: t('asset.tree.context-menu.download'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_9__.ContextMenuActionName.download,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: 'download'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/download/use-download.tsx",
                lineNumber: 55,
                columnNumber: 13
            }, undefined),
            hidden: node.type === 'folder' || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__.checkElementPermission)(node.permissions, 'view'),
            onClick: ()=>{
                handleDownload(node, onFinish);
            }
        };
    };
    const downloadTreeContextMenuItem = (node)=>{
        return {
            label: t('asset.tree.context-menu.download'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_9__.ContextMenuActionName.download,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: 'download'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/download/use-download.tsx",
                lineNumber: 65,
                columnNumber: 13
            }, undefined),
            hidden: !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_8__.TreePermission.Download) || node.type === 'folder' || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__.checkElementPermission)(node.permissions, 'view'),
            onClick: ()=>{
                handleDownload(node);
            }
        };
    };
    const downloadGridContextMenuItem = (row)=>{
        const data = row.original ?? {};
        if (data.id === undefined || data.isLocked === undefined || data.permissions === undefined) {
            return;
        }
        return {
            label: t('asset.tree.context-menu.download'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_9__.ContextMenuActionName.download,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: 'download'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/download/use-download.tsx",
                lineNumber: 80,
                columnNumber: 13
            }, undefined),
            onClick: ()=>{
                handleDownload(data);
            }
        };
    };
    return {
        download,
        downloadContextMenuItem,
        downloadTreeContextMenuItem,
        downloadGridContextMenuItem
    };
};
_s(useDownload, "bXlGPMSnk6kp56gkXeAn/SMKJes=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_7__.useTreePermission
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
"./js/src/core/modules/element/actions/delete/use-delete.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDelete: () => (useDelete)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_element_actions_refresh_grid_use_refresh_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/actions/refresh-grid/use-refresh-grid.tsx");
/* ESM import */var _Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/element-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-api.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/execution-engine/hooks/useJobs.ts");
/* ESM import */var _Pimcore_modules_execution_engine_jobs_delete_factory__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/execution-engine/jobs/delete/factory.ts");
/* ESM import */var _Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/execution-engine/topics.ts");
/* ESM import */var _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts");
/* ESM import */var _Pimcore_modules_widget_manager_utils_tools__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/widget-manager/utils/tools.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_16__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_17__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var ___WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* ESM import */var _perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var _tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var _refresh_tree_use_refresh_tree__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./js/src/core/modules/element/actions/refresh-tree/use-refresh-tree.tsx");
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






















const useDelete = (elementType, cacheKey)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_18__.useTranslation)();
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__.useFormModal)();
    const { addJob } = (0,_Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_11__.useJobs)();
    const { refreshGrid } = (0,_Pimcore_modules_element_actions_refresh_grid_use_refresh_grid__WEBPACK_IMPORTED_MODULE_6__.useRefreshGrid)(elementType);
    const { getElementById } = (0,_Pimcore_modules_element_hooks_use_element_api__WEBPACK_IMPORTED_MODULE_9__.useElementApi)(elementType);
    const { refreshTree } = (0,_refresh_tree_use_refresh_tree__WEBPACK_IMPORTED_MODULE_22__.useRefreshTree)(elementType);
    const { isMainWidgetOpen, closeWidget } = (0,_Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_14__.useWidgetManager)();
    const [elementDelete, { isError, error }] = (0,_Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_7__.useElementDeleteMutation)({
        fixedCacheKey: cacheKey
    });
    const { isTreeActionAllowed } = (0,_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_21__.useTreePermission)();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.useAppDispatch)();
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_17__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_17__.useEffect)(()=>{
        if (isError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__.ApiError(error));
        }
    }, [
        isError
    ]);
    const deleteElement = (id, label, parentId, onFinish)=>{
        modal.confirm({
            title: t('element.delete.confirmation.title'),
            content: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        children: t('element.delete.confirmation.text')
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/delete/use-delete.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("br", {}, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/delete/use-delete.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("b", {
                        children: label
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/delete/use-delete.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true),
            okText: t('element.delete.confirmation.ok'),
            onOk: async ()=>{
                setIsLoading(true);
                await deleteMutation(id, parentId, ()=>{
                    onFinish === null || onFinish === void 0 ? void 0 : onFinish();
                    setIsLoading(false);
                });
            }
        });
    };
    const deleteTreeContextMenuItem = (node, onFinish)=>{
        return {
            label: t('element.delete'),
            key: ___WEBPACK_IMPORTED_MODULE_19__.ContextMenuActionName["delete"],
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: 'trash'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/delete/use-delete.tsx",
                lineNumber: 92,
                columnNumber: 13
            }, undefined),
            hidden: !isTreeActionAllowed(_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_20__.TreePermission.Delete) || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_10__.checkElementPermission)(node.permissions, 'delete') || node.isLocked,
            onClick: ()=>{
                const id = parseInt(node.id);
                const parentId = node.parentId !== undefined ? parseInt(node.parentId) : undefined;
                deleteElement(id, node.label, parentId, onFinish);
            }
        };
    };
    const deleteContextMenuItem = (node, onFinish)=>{
        return {
            label: t('element.delete'),
            key: ___WEBPACK_IMPORTED_MODULE_19__.ContextMenuActionName["delete"],
            isLoading,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: 'trash'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/delete/use-delete.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, undefined),
            hidden: !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_10__.checkElementPermission)(node.permissions, 'delete') || node.isLocked,
            onClick: ()=>{
                const id = node.id;
                const parentId = node.parentId ?? undefined;
                deleteElement(id, (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_8__.getElementKey)(node, elementType), parentId, onFinish);
            }
        };
    };
    const deleteGridContextMenuItem = (row)=>{
        const data = row.original ?? {};
        if (data.id === undefined || data.isLocked === undefined || data.permissions === undefined) {
            return;
        }
        return {
            label: t('element.delete'),
            key: ___WEBPACK_IMPORTED_MODULE_19__.ContextMenuActionName["delete"],
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: 'trash'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/delete/use-delete.tsx",
                lineNumber: 126,
                columnNumber: 13
            }, undefined),
            hidden: !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_10__.checkElementPermission)(data.permissions, 'delete') || data.isLocked,
            onClick: async ()=>{
                await stagedLoading(data.id);
            }
        };
    };
    const stagedLoading = async (id)=>{
        const node = await getElementById(id);
        const parentId = node.parentId ?? undefined;
        deleteElement(node.id, (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_8__.getElementKey)(node, elementType), parentId, ()=>{
            void refreshGrid();
        });
    };
    const deleteMutation = async (id, parentId, onFinish)=>{
        dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_2__.markNodeDeleting)({
            nodeId: String(id),
            elementType,
            isDeleting: true
        }));
        const promise = elementDelete({
            id,
            elementType
        });
        const response = await promise;
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_16__.isUndefined)(response.error)) {
            dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_2__.markNodeDeleting)({
                nodeId: String(id),
                elementType,
                isDeleting: false
            }));
            return;
        }
        let jobRunId = null;
        if ((response.data ?? false) !== false) {
            const data = response.data;
            jobRunId = data.jobRunId ?? null;
        }
        if (jobRunId !== null) {
            addJob((0,_Pimcore_modules_execution_engine_jobs_delete_factory__WEBPACK_IMPORTED_MODULE_12__.createJob)({
                title: t('element.delete.deleting-folder'),
                topics: [
                    _Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_13__.topics["deletion-finished"],
                    ..._Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_13__.defaultTopics
                ],
                action: async ()=>{
                    return jobRunId;
                },
                parentFolder: String(parentId),
                elementType
            }));
        } else if (parentId !== undefined) {
            refreshTree(parentId);
        }
        const widgetId = (0,_Pimcore_modules_widget_manager_utils_tools__WEBPACK_IMPORTED_MODULE_15__.getWidgetId)(elementType, id);
        if (isMainWidgetOpen(widgetId)) {
            closeWidget(widgetId);
        }
        onFinish === null || onFinish === void 0 ? void 0 : onFinish();
    };
    return {
        deleteElement,
        deleteTreeContextMenuItem,
        deleteContextMenuItem,
        deleteGridContextMenuItem,
        deleteMutation
    };
};
_s(useDelete, "cUmx8jwYrBuqxYIJCBufHcvDhDA=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_18__.useTranslation,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__.useFormModal,
        _Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_11__.useJobs,
        _Pimcore_modules_element_actions_refresh_grid_use_refresh_grid__WEBPACK_IMPORTED_MODULE_6__.useRefreshGrid,
        _Pimcore_modules_element_hooks_use_element_api__WEBPACK_IMPORTED_MODULE_9__.useElementApi,
        _refresh_tree_use_refresh_tree__WEBPACK_IMPORTED_MODULE_22__.useRefreshTree,
        _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_14__.useWidgetManager,
        _Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_7__.useElementDeleteMutation,
        _tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_21__.useTreePermission,
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.useAppDispatch
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
"./js/src/core/modules/element/actions/refresh-element/use-element-refresh.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useElementRefresh: () => (useElementRefresh)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/asset-draft-slice.tsx");
/* ESM import */var _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/data-object-draft-slice.tsx");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft_fetcher__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft-fetcher.ts");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_draft_fetcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-draft-fetcher.ts");
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
*/ var _s = $RefreshSig$();








const useElementRefresh = (elementType)=>{
    _s();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const { updateDataObjectDraft } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft_fetcher__WEBPACK_IMPORTED_MODULE_6__.useDataObjectDraftFetcher)();
    const { updateAssetDraft } = (0,_Pimcore_modules_asset_hooks_use_asset_draft_fetcher__WEBPACK_IMPORTED_MODULE_7__.useAssetDraftFetcher)();
    const refreshElement = (id, inElementTab)=>{
        if (elementType === 'asset') {
            dispatch((0,_Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_4__.removeAsset)(id));
            dispatch(_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.util.invalidateTags(_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_3__.invalidatingTags.ASSET_DETAIL_ID(id)));
            if (inElementTab === true) {
                dispatch(_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.util.invalidateTags(_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_3__.invalidatingTags.PREDEFINED_ASSET_METADATA()));
            }
            void updateAssetDraft(id, true);
        } else if (elementType === 'data-object') {
            dispatch((0,_Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_5__.removeDataObject)(id));
            dispatch(_Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.api.util.invalidateTags(_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_3__.invalidatingTags.DATA_OBJECT_DETAIL_ID(id)));
            void updateDataObjectDraft(id, true);
        }
    };
    return {
        refreshElement
    };
};
_s(useElementRefresh, "hRbydoq3Dll/KSRo9tF0lxcEOvo=", false, function() {
    return [
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch,
        _Pimcore_modules_data_object_hooks_use_data_object_draft_fetcher__WEBPACK_IMPORTED_MODULE_6__.useDataObjectDraftFetcher,
        _Pimcore_modules_asset_hooks_use_asset_draft_fetcher__WEBPACK_IMPORTED_MODULE_7__.useAssetDraftFetcher
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
"./js/src/core/modules/element/actions/refresh-grid/use-refresh-grid.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useRefreshGrid: () => (useRefreshGrid)
});
/* ESM import */var _Pimcore_lib_event_bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/lib/event-bus/index.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _listing_abstract_data_layer_provider_data_data_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/data-layer/provider/data/data-provider.tsx");
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
*/ var _s = $RefreshSig$();




const useRefreshGrid = (elementType)=>{
    _s();
    const elementContext = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_1__.useOptionalElementContext)();
    const dataContext = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_listing_abstract_data_layer_provider_data_data_provider__WEBPACK_IMPORTED_MODULE_3__.DataContext);
    const refreshGrid = async (parentId)=>{
        const id = parentId ?? (elementContext === null || elementContext === void 0 ? void 0 : elementContext.id);
        if ((dataContext === null || dataContext === void 0 ? void 0 : dataContext.dataQueryResult) !== undefined) {
            const { refetch } = dataContext.dataQueryResult;
            await refetch();
        }
        if (elementType === 'asset' && id !== undefined) {
            _Pimcore_lib_event_bus__WEBPACK_IMPORTED_MODULE_0__.eventBus.publish({
                identifier: {
                    type: 'asset:listing:refresh',
                    id
                }
            });
        }
    };
    return {
        refreshGrid
    };
};
_s(useRefreshGrid, "FAdC9fKgvTJ1ziuLo27pjNVk8bw=", false, function() {
    return [
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_1__.useOptionalElementContext
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
"./js/src/core/modules/element/actions/rename/use-rename.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useRename: () => (useRename)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_modules_element_hooks_use_element_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-api.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_modules_element_actions_refresh_grid_use_refresh_grid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/actions/refresh-grid/use-refresh-grid.tsx");
/* ESM import */var _tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var _perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* ESM import */var _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/data-object/data-object-draft-slice.tsx");
/* ESM import */var ___WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
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














const useRename = (elementType, cacheKey)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation)();
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_2__.useFormModal)();
    const { refreshGrid } = (0,_Pimcore_modules_element_actions_refresh_grid_use_refresh_grid__WEBPACK_IMPORTED_MODULE_8__.useRefreshGrid)(elementType);
    const { elementPatch, getElementById } = (0,_Pimcore_modules_element_hooks_use_element_api__WEBPACK_IMPORTED_MODULE_5__.useElementApi)(elementType, cacheKey);
    const { isTreeActionAllowed } = (0,_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_9__.useTreePermission)();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_11__.useAppDispatch)();
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const rename = (id, currentLabel, parentId, onFinish)=>{
        modal.input({
            title: t('element.rename'),
            label: t('element.rename.label'),
            initialValue: currentLabel,
            rule: {
                required: true,
                message: t('element.rename.validation')
            },
            onOk: async (value)=>{
                setIsLoading(true);
                await renameMutation(id, value, parentId, ()=>{
                    onFinish === null || onFinish === void 0 ? void 0 : onFinish(value);
                    setIsLoading(false);
                });
            }
        });
    };
    const renameContextMenuItem = (node, onFinish)=>{
        return {
            label: t('element.rename'),
            key: ___WEBPACK_IMPORTED_MODULE_14__.ContextMenuActionName.rename,
            isLoading,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: 'rename'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/rename/use-rename.tsx",
                lineNumber: 82,
                columnNumber: 13
            }, undefined),
            hidden: !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__.checkElementPermission)(node.permissions, 'rename') || node.isLocked,
            onClick: ()=>{
                const parentId = node.parentId ?? undefined;
                rename(node.id, (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_7__.getElementKey)(node, elementType), parentId, onFinish);
            }
        };
    };
    const renameGridContextMenuItem = (row)=>{
        const data = row.original ?? {};
        if (data.id === undefined || data.isLocked === undefined || data.permissions === undefined) {
            return;
        }
        return {
            label: t('element.rename'),
            key: ___WEBPACK_IMPORTED_MODULE_14__.ContextMenuActionName.rename,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: 'rename'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/rename/use-rename.tsx",
                lineNumber: 100,
                columnNumber: 13
            }, undefined),
            hidden: !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__.checkElementPermission)(data.permissions, 'rename') || data.isLocked,
            onClick: async ()=>{
                await stagedLoading(data.id);
            }
        };
    };
    const stagedLoading = async (id)=>{
        const node = await getElementById(id);
        const parentId = node.parentId ?? undefined;
        rename(id, (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_7__.getElementKey)(node, elementType), parentId, ()=>{
            void refreshGrid();
        });
    };
    const renameTreeContextMenuItem = (node)=>{
        return {
            label: t('element.rename'),
            key: ___WEBPACK_IMPORTED_MODULE_14__.ContextMenuActionName.rename,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: 'rename'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/rename/use-rename.tsx",
                lineNumber: 124,
                columnNumber: 13
            }, undefined),
            hidden: !isTreeActionAllowed(_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_10__.TreePermission.Rename) || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__.checkElementPermission)(node.permissions, 'rename') || node.isLocked,
            onClick: ()=>{
                const id = parseInt(node.id);
                const parentId = node.parentId !== undefined ? parseInt(node.parentId) : undefined;
                rename(id, node.label, parentId);
            }
        };
    };
    const renameMutation = async (id, value, parentId, onFinish)=>{
        const elementRenameTask = elementPatch({
            body: {
                data: [
                    {
                        id,
                        key: value
                    }
                ]
            }
        });
        try {
            dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_12__.setNodeLoadingInAllTree)({
                nodeId: String(id),
                elementType,
                loading: true
            }));
            const success = await elementRenameTask;
            if (success) {
                dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_12__.renameNode)({
                    elementType,
                    nodeId: String(id),
                    newLabel: value
                }));
            }
            dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_12__.setNodeLoadingInAllTree)({
                nodeId: String(id),
                elementType,
                loading: false
            }));
            dispatch((0,_Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_13__.updateKey)({
                id,
                key: value
            }));
            onFinish === null || onFinish === void 0 ? void 0 : onFinish();
        } catch (error) {
            console.error('Error renaming ' + elementType, error);
        }
    };
    return {
        rename,
        renameTreeContextMenuItem,
        renameContextMenuItem,
        renameGridContextMenuItem,
        renameMutation
    };
};
_s(useRename, "eZ3hY4OQKiMTTl6IJmiCv0U4Nn4=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_2__.useFormModal,
        _Pimcore_modules_element_actions_refresh_grid_use_refresh_grid__WEBPACK_IMPORTED_MODULE_8__.useRefreshGrid,
        _Pimcore_modules_element_hooks_use_element_api__WEBPACK_IMPORTED_MODULE_5__.useElementApi,
        _tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_9__.useTreePermission,
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_11__.useAppDispatch
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
"./js/src/core/modules/execution-engine/jobs/delete/factory.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
        type: 'delete',
        title: job.title,
        status: _abstact_job__WEBPACK_IMPORTED_MODULE_0__.JobStatus.QUEUED,
        topics: job.topics,
        config: {
            elementType: job.elementType,
            parentFolder: job.parentFolder
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
//# sourceMappingURL=js_src_core_modules_asset_actions_download_use-download_tsx-js_src_core_modules_element_actio-ada654.js.map