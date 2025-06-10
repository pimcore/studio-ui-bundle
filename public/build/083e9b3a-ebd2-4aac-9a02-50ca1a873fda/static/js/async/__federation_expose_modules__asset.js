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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__asset"], {
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
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
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
                lineNumber: 49,
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
                lineNumber: 59,
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
                lineNumber: 69,
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
"./js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useUploadNewVersion: () => (useUploadNewVersion)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice.gen.ts");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/message/useMessage/index.tsx");
/* ESM import */var _Pimcore_modules_element_hooks_use_cache_update__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/hooks/use-cache-update.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var _Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
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











const useUploadNewVersion = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_5__.useFormModal)();
    const messageApi = (0,_Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_6__.useMessage)();
    const { updateFieldValue } = (0,_Pimcore_modules_element_hooks_use_cache_update__WEBPACK_IMPORTED_MODULE_7__.useCacheUpdate)('asset', [
        'ASSET_TREE'
    ]);
    const [replaceAsset] = (0,_Pimcore_modules_asset_asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.useAssetReplaceMutation)();
    const { isTreeActionAllowed } = (0,_Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_9__.useTreePermission)();
    const uploadNewVersion = (id, accept, onFinish)=>{
        modal.upload({
            title: t('asset.upload'),
            label: t('asset.upload.label'),
            accept,
            rule: {
                required: true,
                message: t('element.rename.validation')
            },
            onOk: async (value)=>{
                const file = value[0];
                await uploadNewVersionMutation(id, file);
                onFinish === null || onFinish === void 0 ? void 0 : onFinish();
            }
        });
    };
    const uploadNewVersionMutation = async (id, file)=>{
        const formData = new FormData();
        formData.append('file', file);
        const replaceAssetTask = replaceAsset({
            id,
            body: formData
        });
        try {
            const response = await replaceAssetTask;
            if (response.error !== undefined) {
                throw new Error(response.error.data.error);
            }
            const data = response.data;
            updateFieldValue(id, 'filename', data.data);
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            messageApi.error({
                content: e.message
            });
        }
    };
    const uploadNewVersionContextMenuItem = (node, onFinish)=>{
        return {
            label: t('asset.tree.context-menu.upload-new-version'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_11__.ContextMenuActionName.uploadNewVersion,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: 'upload-cloud'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx",
                lineNumber: 91,
                columnNumber: 13
            }, undefined),
            hidden: node.type === 'folder' || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'list') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'view') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'publish') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'versions'),
            onClick: ()=>{
                uploadNewVersion(node.id, node.mimeType, onFinish);
            }
        };
    };
    const uploadNewVersionTreeContextMenuItem = (node)=>{
        return {
            label: t('asset.tree.context-menu.upload-new-version'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_11__.ContextMenuActionName.uploadNewVersion,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: 'upload-cloud'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx",
                lineNumber: 111,
                columnNumber: 13
            }, undefined),
            hidden: !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_10__.TreePermission.UploadNewVersion) || node.type === 'folder' || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'list') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'view') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'publish') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_8__.checkElementPermission)(node.permissions, 'versions'),
            onClick: ()=>{
                uploadNewVersion(parseInt(node.id), node.metaData.asset.mimeType);
            }
        };
    };
    return {
        uploadNewVersion,
        uploadNewVersionTreeContextMenuItem,
        uploadNewVersionContextMenuItem
    };
};
_s(useUploadNewVersion, "ysZw4w0l6RnF8vdwbm6+EuVESvI=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_5__.useFormModal,
        _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_6__.useMessage,
        _Pimcore_modules_element_hooks_use_cache_update__WEBPACK_IMPORTED_MODULE_7__.useCacheUpdate,
        _Pimcore_modules_asset_asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.useAssetReplaceMutation,
        _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_9__.useTreePermission
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
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
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
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
                lineNumber: 92,
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
                lineNumber: 107,
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
"./js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TAB_CUSTOM_METADATA: () => (TAB_CUSTOM_METADATA),
  TAB_EMBEDDED_METADATA: () => (TAB_EMBEDDED_METADATA),
  TAB_VERSIONS: () => (TAB_VERSIONS)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_modules_app_component_registry_component_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/component-registry/component-renderer.tsx");
/* ESM import */var _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/component-registry/component-config.tsx");
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




const TAB_EMBEDDED_METADATA = {
    key: 'embedded-metadata',
    label: 'asset.asset-editor-tabs.embedded-metadata',
    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_component_registry_component_renderer__WEBPACK_IMPORTED_MODULE_3__.ComponentRenderer, {
        component: _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_4__.componentConfig.asset.editor.tab.embeddedMetadata.name
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 20,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
        value: 'embedded-metadata'
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 21,
        columnNumber: 9
    }, undefined),
    isDetachable: true
};
const TAB_CUSTOM_METADATA = {
    key: 'custom-metadata',
    label: 'asset.asset-editor-tabs.custom-metadata',
    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_component_registry_component_renderer__WEBPACK_IMPORTED_MODULE_3__.ComponentRenderer, {
        component: _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_4__.componentConfig.asset.editor.tab.customMetadata.name
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 28,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
        value: 'custom-metadata'
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 29,
        columnNumber: 9
    }, undefined),
    isDetachable: true
};
const TAB_VERSIONS = {
    key: 'versions',
    label: 'version.label',
    workspacePermission: 'versions',
    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_component_registry_component_renderer__WEBPACK_IMPORTED_MODULE_3__.ComponentRenderer, {
        component: _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_4__.componentConfig.asset.editor.tab.versions.name
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 37,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
        value: 'history'
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 38,
        columnNumber: 9
    }, undefined),
    isDetachable: true
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
"./js/src/core/modules/asset/editor/types/archive/tab-manager/archive-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ArchiveTabManager: () => (ArchiveTabManager)
});
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
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
class ArchiveTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'archive';
    }
}

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
"./js/src/core/modules/asset/editor/types/audio/tab-manager/audio-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AudioTabManager: () => (AudioTabManager)
});
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
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
class AudioTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'audio';
    }
}

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
"./js/src/core/modules/asset/editor/types/document/tab-manager/document-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentTabManager: () => (DocumentTabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
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



class DocumentTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'document';
    }
}
DocumentTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], DocumentTabManager);

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
"./js/src/core/modules/asset/editor/types/folder/tab-manager/folder-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FolderTabManager: () => (FolderTabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
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



class FolderTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'folder';
    }
}
FolderTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], FolderTabManager);

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
"./js/src/core/modules/asset/editor/types/image/tab-manager/image-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ImageTabManager: () => (ImageTabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
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



class ImageTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'image';
    }
}
ImageTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], ImageTabManager);

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
"./js/src/core/modules/asset/editor/types/text/tab-manager/text-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TextTabManager: () => (TextTabManager)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
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



class TextTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'text';
    }
}
TextTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], TextTabManager);

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
"./js/src/core/modules/asset/editor/types/unknown/tab-manager/unknown-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UnknownTabManager: () => (UnknownTabManager)
});
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
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
class UnknownTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'unknown';
    }
}

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
"./js/src/core/modules/asset/editor/types/video/tab-manager/video-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  VideoTabManager: () => (VideoTabManager)
});
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
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
class VideoTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'video';
    }
}

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
"./js/src/core/modules/asset/hooks/use-asset.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAsset: () => (useAsset)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
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

const useAsset = ()=>{
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_1__.AssetContext);
    return {
        id
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
"./js/src/core/modules/execution-engine/jobs/download/factory.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createJob: () => (createJob)
});
/* ESM import */var _abstact_job__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/execution-engine/jobs/abstact-job.ts");
/* ESM import */var _factory_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/execution-engine/jobs/factory-helper.ts");
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
"./js/src/sdk/modules/asset/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ArchiveTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_archive_tab_manager_archive_tab_manager__WEBPACK_IMPORTED_MODULE_8__.ArchiveTabManager),
  AssetApiSlice: () => (/* reexport module object */ _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_20__),
  AssetContext: () => (/* reexport safe */ _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_22__.AssetContext),
  AssetProvider: () => (/* reexport safe */ _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_22__.AssetProvider),
  AudioTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_audio_tab_manager_audio_tab_manager__WEBPACK_IMPORTED_MODULE_9__.AudioTabManager),
  DocumentTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_document_tab_manager_document_tab_manager__WEBPACK_IMPORTED_MODULE_10__.DocumentTabManager),
  FolderTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_folder_tab_manager_folder_tab_manager__WEBPACK_IMPORTED_MODULE_11__.FolderTabManager),
  ImageTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_image_tab_manager_image_tab_manager__WEBPACK_IMPORTED_MODULE_12__.ImageTabManager),
  MetadataApiSlice: () => (/* reexport module object */ _Pimcore_modules_asset_editor_shared_tab_manager_tabs_custom_metadata_metadata_api_slice_gen__WEBPACK_IMPORTED_MODULE_7__),
  TAB_CUSTOM_METADATA: () => (/* reexport safe */ _Pimcore_modules_asset_editor_shared_tab_manager_tab_definitions__WEBPACK_IMPORTED_MODULE_6__.TAB_CUSTOM_METADATA),
  TAB_EMBEDDED_METADATA: () => (/* reexport safe */ _Pimcore_modules_asset_editor_shared_tab_manager_tab_definitions__WEBPACK_IMPORTED_MODULE_6__.TAB_EMBEDDED_METADATA),
  TAB_VERSIONS: () => (/* reexport safe */ _Pimcore_modules_asset_editor_shared_tab_manager_tab_definitions__WEBPACK_IMPORTED_MODULE_6__.TAB_VERSIONS),
  TextTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_text_tab_manager_text_tab_manager__WEBPACK_IMPORTED_MODULE_13__.TextTabManager),
  UnknownTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_unknown_tab_manager_unknown_tab_manager__WEBPACK_IMPORTED_MODULE_14__.UnknownTabManager),
  VideoTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_video_tab_manager_video_tab_manager__WEBPACK_IMPORTED_MODULE_15__.VideoTabManager),
  addCustomMetadataToAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.addCustomMetadataToAsset),
  addImageSettingsToAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.addImageSettingsToAsset),
  addPropertyToAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.addPropertyToAsset),
  addScheduleToAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.addScheduleToAsset),
  assetReceived: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.assetReceived),
  assetsAdapter: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.assetsAdapter),
  removeAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.removeAsset),
  removeCustomMetadataFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.removeCustomMetadataFromAsset),
  removeCustomSettingsFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.removeCustomSettingsFromAsset),
  removeImageSettingFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.removeImageSettingFromAsset),
  removePropertyFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.removePropertyFromAsset),
  removeScheduleFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.removeScheduleFromAsset),
  resetAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.resetAsset),
  resetChanges: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.resetChanges),
  resetSchedulesChangesForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.resetSchedulesChangesForAsset),
  selectAssetById: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.selectAssetById),
  setActiveTabForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.setActiveTabForAsset),
  setCustomMetadataForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.setCustomMetadataForAsset),
  setCustomSettingsForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.setCustomSettingsForAsset),
  setModifiedCells: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.setModifiedCells),
  setPropertiesForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.setPropertiesForAsset),
  setSchedulesForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.setSchedulesForAsset),
  slice: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.slice),
  updateAllCustomMetadataForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.updateAllCustomMetadataForAsset),
  updateCustomMetadataForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.updateCustomMetadataForAsset),
  updateImageSettingForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.updateImageSettingForAsset),
  updatePropertyForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.updatePropertyForAsset),
  updateScheduleForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.updateScheduleForAsset),
  updateTextDataForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__.updateTextDataForAsset),
  useAsset: () => (/* reexport safe */ _Pimcore_modules_asset_hooks_use_asset__WEBPACK_IMPORTED_MODULE_16__.useAsset),
  useAssetDraft: () => (/* reexport safe */ _Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_17__.useAssetDraft),
  useAssetHelper: () => (/* reexport safe */ _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_18__.useAssetHelper),
  useClearThumbnails: () => (/* reexport safe */ _Pimcore_modules_asset_actions_clear_thumbnails_use_clear_thumbnails__WEBPACK_IMPORTED_MODULE_0__.useClearThumbnails),
  useCustomMetadataDraft: () => (/* reexport safe */ _Pimcore_modules_asset_draft_hooks_use_custom_metadata__WEBPACK_IMPORTED_MODULE_4__.useCustomMetadataDraft),
  useCustomMetadataReducers: () => (/* reexport safe */ _Pimcore_modules_asset_draft_hooks_use_custom_metadata__WEBPACK_IMPORTED_MODULE_4__.useCustomMetadataReducers),
  useDownload: () => (/* reexport safe */ _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_1__.useDownload),
  useGlobalAssetContext: () => (/* reexport safe */ _Pimcore_modules_asset_hooks_use_global_asset_context__WEBPACK_IMPORTED_MODULE_19__.useGlobalAssetContext),
  useImageSettingsDraft: () => (/* reexport safe */ _Pimcore_modules_asset_draft_hooks_use_image_settings__WEBPACK_IMPORTED_MODULE_5__.useImageSettingsDraft),
  useImageSettingsReducers: () => (/* reexport safe */ _Pimcore_modules_asset_draft_hooks_use_image_settings__WEBPACK_IMPORTED_MODULE_5__.useImageSettingsReducers),
  useUploadNewVersion: () => (/* reexport safe */ _Pimcore_modules_asset_actions_upload_new_version_upload_new_version__WEBPACK_IMPORTED_MODULE_2__.useUploadNewVersion),
  useZipDownload: () => (/* reexport safe */ _Pimcore_modules_asset_actions_zip_download_use_zip_download__WEBPACK_IMPORTED_MODULE_3__.useZipDownload)
});
/* ESM import */var _Pimcore_modules_asset_actions_clear_thumbnails_use_clear_thumbnails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/asset/actions/clear-thumbnails/use-clear-thumbnails.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/actions/download/use-download.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_upload_new_version_upload_new_version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_zip_download_use_zip_download__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/actions/zip-download/use-zip-download.tsx");
/* ESM import */var _Pimcore_modules_asset_draft_hooks_use_custom_metadata__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/draft/hooks/use-custom-metadata.ts");
/* ESM import */var _Pimcore_modules_asset_draft_hooks_use_image_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/draft/hooks/use-image-settings.ts");
/* ESM import */var _Pimcore_modules_asset_editor_shared_tab_manager_tab_definitions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_shared_tab_manager_tabs_custom_metadata_metadata_api_slice_gen__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_archive_tab_manager_archive_tab_manager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/asset/editor/types/archive/tab-manager/archive-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_audio_tab_manager_audio_tab_manager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/asset/editor/types/audio/tab-manager/audio-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_document_tab_manager_document_tab_manager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/asset/editor/types/document/tab-manager/document-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_folder_tab_manager_folder_tab_manager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/asset/editor/types/folder/tab-manager/folder-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_image_tab_manager_image_tab_manager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/asset/editor/types/image/tab-manager/image-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_text_tab_manager_text_tab_manager__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/asset/editor/types/text/tab-manager/text-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_unknown_tab_manager_unknown_tab_manager__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/asset/editor/types/unknown/tab-manager/unknown-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_video_tab_manager_video_tab_manager__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/asset/editor/types/video/tab-manager/video-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset.ts");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-draft.ts");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-helper.ts");
/* ESM import */var _Pimcore_modules_asset_hooks_use_global_asset_context__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-global-asset-context.ts");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./js/src/core/modules/asset/asset-draft-slice.tsx");
/* ESM import */var _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
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
//# sourceMappingURL=__federation_expose_modules__asset.js.map