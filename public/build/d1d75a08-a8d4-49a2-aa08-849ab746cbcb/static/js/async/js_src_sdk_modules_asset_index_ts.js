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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_sdk_modules_asset_index_ts"], {
"./js/src/core/modules/asset/editor/types/archive/tab-manager/archive-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ArchiveTabManager: () => (ArchiveTabManager)
});
/* ESM import */var _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
"./js/src/core/modules/asset/events/post-update-event.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
"./js/src/core/modules/asset/services/processors/asset-save-data-processor-registry.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AssetSaveDataContext: () => (AssetSaveDataContext),
  AssetSaveDataProcessorRegistry: () => (AssetSaveDataProcessorRegistry)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_app_processor_registry_abstract_processor_registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/processor-registry/abstract-processor-registry.ts");
/* ESM import */var _Pimcore_modules_app_processor_registry_abstract_data_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/processor-registry/abstract-data-context.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 



/**
 * Context object passed to asset save data processors
 */ class AssetSaveDataContext extends _Pimcore_modules_app_processor_registry_abstract_data_context__WEBPACK_IMPORTED_MODULE_2__.AbstractDataContext {
    constructor(assetId, updateData){
        super(updateData), this.assetId = assetId, this.updateData = updateData;
    }
}
class AssetSaveDataProcessorRegistry extends _Pimcore_modules_app_processor_registry_abstract_processor_registry__WEBPACK_IMPORTED_MODULE_1__.AbstractProcessorRegistry {
}
AssetSaveDataProcessorRegistry = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)()
], AssetSaveDataProcessorRegistry);

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
"./js/src/core/modules/asset/tree/utils/transform-api-data-to-node.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  transformApiDataToNode: () => (transformApiDataToNode),
  transformApiDataToNodes: () => (transformApiDataToNodes)
});
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

const transformApiDataToNode = (assetNode, node)=>{
    return {
        id: assetNode.id.toString(),
        elementType: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__.elementTypes.asset,
        icon: (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__.getElementIcon)(assetNode, {
            type: 'name',
            value: 'unknown'
        }),
        label: assetNode.filename,
        type: assetNode.type,
        parentId: String(assetNode.parentId),
        fullPath: assetNode.fullPath,
        hasChildren: assetNode.hasChildren,
        locked: assetNode.locked,
        isLocked: assetNode.isLocked,
        metaData: {
            asset: assetNode
        },
        permissions: assetNode.permissions ?? [],
        internalKey: `${node.internalKey}-${assetNode.id}`
    };
};
const transformApiDataToNodes = (node, data, maxItemsPerNode)=>{
    const nodes = [];
    const assetData = data.items;
    assetData.forEach((assetNode)=>{
        nodes.push(transformApiDataToNode(assetNode, node));
    });
    const total = data.totalItems ?? maxItemsPerNode;
    return {
        nodes,
        total
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
  ActionColumnDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__WEBPACK_IMPORTED_MODULE_26__.ActionColumnDecorator),
  ArchiveTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_archive_tab_manager_archive_tab_manager__WEBPACK_IMPORTED_MODULE_10__.ArchiveTabManager),
  AssetApiSlice: () => (/* reexport module object */ _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_22__),
  AssetContext: () => (/* reexport safe */ _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_24__.AssetContext),
  AssetListingBuilder: () => (/* reexport safe */ _Pimcore_modules_asset_listing_builder_asset_listing_builder__WEBPACK_IMPORTED_MODULE_27__.AssetListingBuilder),
  AssetProvider: () => (/* reexport safe */ _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_24__.AssetProvider),
  AssetSaveDataContext: () => (/* reexport safe */ _Pimcore_modules_asset_services_processors_asset_save_data_processor_registry__WEBPACK_IMPORTED_MODULE_5__.AssetSaveDataContext),
  AssetSaveDataProcessorRegistry: () => (/* reexport safe */ _Pimcore_modules_asset_services_processors_asset_save_data_processor_registry__WEBPACK_IMPORTED_MODULE_5__.AssetSaveDataProcessorRegistry),
  AudioTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_audio_tab_manager_audio_tab_manager__WEBPACK_IMPORTED_MODULE_11__.AudioTabManager),
  BaseListing: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__WEBPACK_IMPORTED_MODULE_26__.BaseListing),
  ColumnConfigurationDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__WEBPACK_IMPORTED_MODULE_26__.ColumnConfigurationDecorator),
  ContextMenuDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__WEBPACK_IMPORTED_MODULE_26__.ContextMenuDecorator),
  DocumentTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_document_tab_manager_document_tab_manager__WEBPACK_IMPORTED_MODULE_12__.DocumentTabManager),
  FolderTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_folder_tab_manager_folder_tab_manager__WEBPACK_IMPORTED_MODULE_13__.FolderTabManager),
  GeneralFiltersDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__WEBPACK_IMPORTED_MODULE_26__.GeneralFiltersDecorator),
  ImageTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_image_tab_manager_image_tab_manager__WEBPACK_IMPORTED_MODULE_14__.ImageTabManager),
  InlineEditDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__WEBPACK_IMPORTED_MODULE_26__.InlineEditDecorator),
  ListingContainer: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__WEBPACK_IMPORTED_MODULE_26__.ListingContainer),
  MetadataApiSlice: () => (/* reexport module object */ _Pimcore_modules_asset_editor_shared_tab_manager_tabs_custom_metadata_metadata_api_slice_gen__WEBPACK_IMPORTED_MODULE_9__),
  PagingDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__WEBPACK_IMPORTED_MODULE_26__.PagingDecorator),
  RowSelectionDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__WEBPACK_IMPORTED_MODULE_26__.RowSelectionDecorator),
  SortingDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__WEBPACK_IMPORTED_MODULE_26__.SortingDecorator),
  TAB_CUSTOM_METADATA: () => (/* reexport safe */ _Pimcore_modules_asset_editor_shared_tab_manager_tab_definitions__WEBPACK_IMPORTED_MODULE_8__.TAB_CUSTOM_METADATA),
  TAB_EMBEDDED_METADATA: () => (/* reexport safe */ _Pimcore_modules_asset_editor_shared_tab_manager_tab_definitions__WEBPACK_IMPORTED_MODULE_8__.TAB_EMBEDDED_METADATA),
  TAB_VERSIONS: () => (/* reexport safe */ _Pimcore_modules_asset_editor_shared_tab_manager_tab_definitions__WEBPACK_IMPORTED_MODULE_8__.TAB_VERSIONS),
  TagFilterDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__WEBPACK_IMPORTED_MODULE_26__.TagFilterDecorator),
  TextTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_text_tab_manager_text_tab_manager__WEBPACK_IMPORTED_MODULE_15__.TextTabManager),
  UnknownTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_unknown_tab_manager_unknown_tab_manager__WEBPACK_IMPORTED_MODULE_16__.UnknownTabManager),
  VideoTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_video_tab_manager_video_tab_manager__WEBPACK_IMPORTED_MODULE_17__.VideoTabManager),
  addCustomMetadataToAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.addCustomMetadataToAsset),
  addImageSettingsToAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.addImageSettingsToAsset),
  addPropertyToAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.addPropertyToAsset),
  addScheduleToAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.addScheduleToAsset),
  assetReceived: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.assetReceived),
  assetsAdapter: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.assetsAdapter),
  listingDefaultProps: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__WEBPACK_IMPORTED_MODULE_26__.listingDefaultProps),
  removeAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.removeAsset),
  removeCustomMetadataFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.removeCustomMetadataFromAsset),
  removeCustomSettingsFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.removeCustomSettingsFromAsset),
  removeImageSettingFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.removeImageSettingFromAsset),
  removePropertyFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.removePropertyFromAsset),
  removeScheduleFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.removeScheduleFromAsset),
  resetAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.resetAsset),
  resetChanges: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.resetChanges),
  resetSchedulesChangesForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.resetSchedulesChangesForAsset),
  selectAssetById: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.selectAssetById),
  setActiveTabForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.setActiveTabForAsset),
  setCustomMetadataForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.setCustomMetadataForAsset),
  setCustomSettingsForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.setCustomSettingsForAsset),
  setModifiedCells: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.setModifiedCells),
  setPropertiesForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.setPropertiesForAsset),
  setSchedulesForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.setSchedulesForAsset),
  slice: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.slice),
  transformApiDataToNode: () => (/* reexport safe */ _Pimcore_modules_asset_tree_utils_transform_api_data_to_node__WEBPACK_IMPORTED_MODULE_25__.transformApiDataToNode),
  transformApiDataToNodes: () => (/* reexport safe */ _Pimcore_modules_asset_tree_utils_transform_api_data_to_node__WEBPACK_IMPORTED_MODULE_25__.transformApiDataToNodes),
  updateAllCustomMetadataForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.updateAllCustomMetadataForAsset),
  updateCustomMetadataForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.updateCustomMetadataForAsset),
  updateFilename: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.updateFilename),
  updateImageSettingForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.updateImageSettingForAsset),
  updatePropertyForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.updatePropertyForAsset),
  updateScheduleForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.updateScheduleForAsset),
  updateTextDataForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__.updateTextDataForAsset),
  useAsset: () => (/* reexport safe */ _Pimcore_modules_asset_hooks_use_asset__WEBPACK_IMPORTED_MODULE_18__.useAsset),
  useAssetDraft: () => (/* reexport safe */ _Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_19__.useAssetDraft),
  useAssetHelper: () => (/* reexport safe */ _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_20__.useAssetHelper),
  useClearThumbnails: () => (/* reexport safe */ _Pimcore_modules_asset_actions_clear_thumbnails_use_clear_thumbnails__WEBPACK_IMPORTED_MODULE_0__.useClearThumbnails),
  useCustomMetadataDraft: () => (/* reexport safe */ _Pimcore_modules_asset_draft_hooks_use_custom_metadata__WEBPACK_IMPORTED_MODULE_6__.useCustomMetadataDraft),
  useCustomMetadataReducers: () => (/* reexport safe */ _Pimcore_modules_asset_draft_hooks_use_custom_metadata__WEBPACK_IMPORTED_MODULE_6__.useCustomMetadataReducers),
  useDownload: () => (/* reexport safe */ _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_1__.useDownload),
  useGlobalAssetContext: () => (/* reexport safe */ _Pimcore_modules_asset_hooks_use_global_asset_context__WEBPACK_IMPORTED_MODULE_21__.useGlobalAssetContext),
  useImageSettingsDraft: () => (/* reexport safe */ _Pimcore_modules_asset_draft_hooks_use_image_settings__WEBPACK_IMPORTED_MODULE_7__.useImageSettingsDraft),
  useImageSettingsReducers: () => (/* reexport safe */ _Pimcore_modules_asset_draft_hooks_use_image_settings__WEBPACK_IMPORTED_MODULE_7__.useImageSettingsReducers),
  useInlineEditApiUpdate: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__WEBPACK_IMPORTED_MODULE_26__.useInlineEditApiUpdate),
  useUploadNewVersion: () => (/* reexport safe */ _Pimcore_modules_asset_actions_upload_new_version_upload_new_version__WEBPACK_IMPORTED_MODULE_2__.useUploadNewVersion),
  useZipDownload: () => (/* reexport safe */ _Pimcore_modules_asset_actions_zip_download_use_zip_download__WEBPACK_IMPORTED_MODULE_3__.useZipDownload)
});
/* ESM import */var _Pimcore_modules_asset_actions_clear_thumbnails_use_clear_thumbnails__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/asset/actions/clear-thumbnails/use-clear-thumbnails.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/actions/download/use-download.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_upload_new_version_upload_new_version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_zip_download_use_zip_download__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/actions/zip-download/use-zip-download.tsx");
/* ESM import */var _Pimcore_modules_asset_events_post_update_event__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/events/post-update-event.ts");
/* ESM import */var _Pimcore_modules_asset_services_processors_asset_save_data_processor_registry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/services/processors/asset-save-data-processor-registry.ts");
/* ESM import */var _Pimcore_modules_asset_draft_hooks_use_custom_metadata__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/asset/draft/hooks/use-custom-metadata.ts");
/* ESM import */var _Pimcore_modules_asset_draft_hooks_use_image_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/asset/draft/hooks/use-image-settings.ts");
/* ESM import */var _Pimcore_modules_asset_editor_shared_tab_manager_tab_definitions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_shared_tab_manager_tabs_custom_metadata_metadata_api_slice_gen__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_archive_tab_manager_archive_tab_manager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/asset/editor/types/archive/tab-manager/archive-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_audio_tab_manager_audio_tab_manager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/asset/editor/types/audio/tab-manager/audio-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_document_tab_manager_document_tab_manager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/asset/editor/types/document/tab-manager/document-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_folder_tab_manager_folder_tab_manager__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/asset/editor/types/folder/tab-manager/folder-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_image_tab_manager_image_tab_manager__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/asset/editor/types/image/tab-manager/image-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_text_tab_manager_text_tab_manager__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/asset/editor/types/text/tab-manager/text-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_unknown_tab_manager_unknown_tab_manager__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/asset/editor/types/unknown/tab-manager/unknown-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_video_tab_manager_video_tab_manager__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/asset/editor/types/video/tab-manager/video-tab-manager.ts");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset.ts");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_draft__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-draft.ts");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-helper.ts");
/* ESM import */var _Pimcore_modules_asset_hooks_use_global_asset_context__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-global-asset-context.ts");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_asset_asset_draft_slice__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("./js/src/core/modules/asset/asset-draft-slice.tsx");
/* ESM import */var _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
/* ESM import */var _Pimcore_modules_asset_tree_utils_transform_api_data_to_node__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("./js/src/core/modules/asset/tree/utils/transform-api-data-to-node.ts");
/* ESM import */var _Pimcore_modules_asset_listing_listing_container__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__("./js/src/core/modules/asset/listing/listing-container.tsx");
/* ESM import */var _Pimcore_modules_asset_listing_builder_asset_listing_builder__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__("./js/src/core/modules/asset/listing/builder/asset-listing-builder.tsx");
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
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/clear-thumbnails/use-clear-thumbnails.tsx",
                lineNumber: 42,
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
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/clear-thumbnails/use-clear-thumbnails.tsx",
                lineNumber: 53,
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
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/clear-thumbnails/use-clear-thumbnails.tsx",
                lineNumber: 64,
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
_s(useClearThumbnails, "1zJ0+W4Bmj4PCFfFqjQg9Y+e1EI=", false, function() {
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
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/element-tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var _Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* ESM import */var _Pimcore_components_modal_upload_provider_upload_modal_provider_use_upload_modal_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/modal-upload/provider/upload-modal-provider/use-upload-modal-context.tsx");
/* ESM import */var _Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_10__);
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation)();
    const dispatch = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_11__.useAppDispatch)();
    const { triggerUpload } = (0,_Pimcore_components_modal_upload_provider_upload_modal_provider_use_upload_modal_context__WEBPACK_IMPORTED_MODULE_8__.useUploadModalContext)();
    const { isTreeActionAllowed } = (0,_Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_5__.useTreePermission)();
    const uploadNewVersion = (id, onFinish)=>{
        triggerUpload({
            action: `${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_9__.getPrefix)()}/assets/${id}/replace`,
            maxItems: 1,
            multiple: false,
            onSuccess: async (result)=>{
                var _result__response, _result_;
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_10__.isNil)(result === null || result === void 0 ? void 0 : (_result_ = result[0]) === null || _result_ === void 0 ? void 0 : (_result__response = _result_.response) === null || _result__response === void 0 ? void 0 : _result__response.data)) {
                    const newFilename = result[0].response.data;
                    dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_12__.renameNode)({
                        nodeId: String(id),
                        elementType: 'asset',
                        newLabel: newFilename
                    }));
                }
                onFinish === null || onFinish === void 0 ? void 0 : onFinish();
            }
        });
    };
    const uploadNewVersionContextMenuItem = (node, onFinish)=>{
        return {
            label: t('asset.tree.context-menu.upload-new-version'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_7__.ContextMenuActionName.uploadNewVersion,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                value: 'upload-cloud'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx",
                lineNumber: 56,
                columnNumber: 13
            }, undefined),
            hidden: node.type === 'folder' || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__.checkElementPermission)(node.permissions, 'list') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__.checkElementPermission)(node.permissions, 'view') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__.checkElementPermission)(node.permissions, 'publish') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__.checkElementPermission)(node.permissions, 'versions'),
            onClick: ()=>{
                uploadNewVersion(node.id, onFinish);
            }
        };
    };
    const uploadNewVersionTreeContextMenuItem = (node)=>{
        return {
            label: t('asset.tree.context-menu.upload-new-version'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_7__.ContextMenuActionName.uploadNewVersion,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                value: 'upload-cloud'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, undefined),
            hidden: !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_6__.TreePermission.UploadNewVersion) || node.type === 'folder' || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__.checkElementPermission)(node.permissions, 'list') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__.checkElementPermission)(node.permissions, 'view') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__.checkElementPermission)(node.permissions, 'publish') || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__.checkElementPermission)(node.permissions, 'versions'),
            onClick: ()=>{
                uploadNewVersion(parseInt(node.id));
            }
        };
    };
    return {
        uploadNewVersion,
        uploadNewVersionTreeContextMenuItem,
        uploadNewVersionContextMenuItem
    };
};
_s(useUploadNewVersion, "IzxZ1nHck89ayYWuwKkMIuHifAU=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation,
        _sdk_app__WEBPACK_IMPORTED_MODULE_11__.useAppDispatch,
        _Pimcore_components_modal_upload_provider_upload_modal_provider_use_upload_modal_context__WEBPACK_IMPORTED_MODULE_8__.useUploadModalContext,
        _Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_5__.useTreePermission
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
/* ESM import */var _asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_execution_engine_jobs_download_download_job__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/execution-engine/jobs/download/download-job.ts");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/element-tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var _Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_12__);
/* ESM import */var _Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
/* ESM import */var _Pimcore_modules_execution_engine_hooks_use_execution_engine__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/execution-engine/hooks/use-execution-engine.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
    const [fetchFolder] = (0,_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.useAssetExportZipFolderMutation)();
    const [fetchAssets, { isError, error }] = (0,_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.useAssetExportZipAssetMutation)();
    const executionEngine = (0,_Pimcore_modules_execution_engine_hooks_use_execution_engine__WEBPACK_IMPORTED_MODULE_14__.useExecutionEngine)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { isTreeActionAllowed } = (0,_Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_8__.useTreePermission)();
    (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(()=>{
        if (isError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_10__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_10__.ApiError(error));
        }
    }, [
        isError
    ]);
    const createZipDownload = (param)=>{
        let { jobTitle, requestData } = param;
        const job = new _Pimcore_modules_execution_engine_jobs_download_download_job__WEBPACK_IMPORTED_MODULE_2__.DownloadJob({
            title: t('jobs.zip-job.title', {
                title: jobTitle
            }),
            downloadUrl: `${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_13__.getPrefix)()}/assets/download/zip/{jobRunId}`,
            action: async ()=>{
                let promise;
                if (props.type === 'folder') {
                    promise = fetchFolder(requestData);
                } else {
                    promise = fetchAssets(requestData);
                }
                const response = await promise;
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_12__.isUndefined)(response.error)) {
                    (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_10__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_10__.ApiError(response.error));
                    throw new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_10__.ApiError(response.error);
                }
                const data = response.data;
                return data.jobRunId;
            }
        });
        void executionEngine.runJob(job);
    };
    const createZipDownloadContextMenuItem = (node, onFinish)=>{
        return {
            label: t('asset.tree.context-menu.download-as-zip'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_11__.ContextMenuActionName.downloadAsZip,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                value: 'download-zip'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/zip-download/use-zip-download.tsx",
                lineNumber: 74,
                columnNumber: 13
            }, undefined),
            hidden: node.type !== 'folder' || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__.checkElementPermission)(node.permissions, 'view'),
            onClick: ()=>{
                createZipDownload({
                    jobTitle: (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_7__.getElementKey)(node, 'asset'),
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
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_11__.ContextMenuActionName.downloadAsZip,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                value: 'download-zip'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/zip-download/use-zip-download.tsx",
                lineNumber: 92,
                columnNumber: 13
            }, undefined),
            hidden: !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_9__.TreePermission.DownloadZip) || node.type !== 'folder' || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__.checkElementPermission)(node.permissions, 'view'),
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
_s(useZipDownload, "krOLnN9AuElNonhQdali1O2qQJ8=", false, function() {
    return [
        _asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.useAssetExportZipFolderMutation,
        _asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.useAssetExportZipAssetMutation,
        _Pimcore_modules_execution_engine_hooks_use_execution_engine__WEBPACK_IMPORTED_MODULE_14__.useExecutionEngine,
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_8__.useTreePermission
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
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 18,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
        value: 'embedded-metadata'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 19,
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
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 25,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
        value: 'custom-metadata'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 26,
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
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 33,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
        value: 'history'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 34,
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
"./js/src/core/modules/asset/listing/builder/asset-listing-builder.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AssetListingBuilder: () => (AssetListingBuilder)
});
/* ESM import */var _sdk_modules_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/modules/element/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 
class AssetListingBuilder extends _sdk_modules_element__WEBPACK_IMPORTED_MODULE_0__.ListingBuilder {
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
//# sourceMappingURL=js_src_sdk_modules_asset_index_ts.js.map