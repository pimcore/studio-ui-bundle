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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["js_src_sdk_modules_asset_index_ts"], {
"./js/src/core/modules/asset/editor/types/archive/tab-manager/archive-tab-manager.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ArchiveTabManager: () => (ArchiveTabManager)
});
/* import */ var _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
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
class ArchiveTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0.TabManager {
    constructor(){
        super();
        this.type = 'archive';
    }
}

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/editor/types/audio/tab-manager/audio-tab-manager.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AudioTabManager: () => (AudioTabManager)
});
/* import */ var _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
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
class AudioTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0.TabManager {
    constructor(){
        super();
        this.type = 'audio';
    }
}

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/editor/types/document/tab-manager/document-tab-manager.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentTabManager: () => (DocumentTabManager)
});
/* import */ var _swc_helpers_ts_decorate__rspack_import_2 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* import */ var _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* import */ var inversify__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_1);
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

class DocumentTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0.TabManager {
    constructor(){
        super();
        this.type = 'document';
    }
}
DocumentTabManager = (0,_swc_helpers_ts_decorate__rspack_import_2.__decorate)([
    (0,inversify__rspack_import_1.injectable)(),
    (0,_swc_helpers_ts_decorate__rspack_import_2.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__rspack_import_2.__metadata)("design:paramtypes", [])
], DocumentTabManager);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/editor/types/folder/tab-manager/folder-tab-manager.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FolderTabManager: () => (FolderTabManager)
});
/* import */ var _swc_helpers_ts_decorate__rspack_import_2 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* import */ var _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* import */ var inversify__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_1);
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

class FolderTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0.TabManager {
    constructor(){
        super();
        this.type = 'folder';
    }
}
FolderTabManager = (0,_swc_helpers_ts_decorate__rspack_import_2.__decorate)([
    (0,inversify__rspack_import_1.injectable)(),
    (0,_swc_helpers_ts_decorate__rspack_import_2.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__rspack_import_2.__metadata)("design:paramtypes", [])
], FolderTabManager);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/editor/types/image/tab-manager/image-tab-manager.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ImageTabManager: () => (ImageTabManager)
});
/* import */ var _swc_helpers_ts_decorate__rspack_import_2 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* import */ var _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* import */ var inversify__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_1);
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

class ImageTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0.TabManager {
    constructor(){
        super();
        this.type = 'image';
    }
}
ImageTabManager = (0,_swc_helpers_ts_decorate__rspack_import_2.__decorate)([
    (0,inversify__rspack_import_1.injectable)(),
    (0,_swc_helpers_ts_decorate__rspack_import_2.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__rspack_import_2.__metadata)("design:paramtypes", [])
], ImageTabManager);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/editor/types/text/tab-manager/text-tab-manager.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TextTabManager: () => (TextTabManager)
});
/* import */ var _swc_helpers_ts_decorate__rspack_import_2 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* import */ var _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
/* import */ var inversify__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_1);
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

class TextTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0.TabManager {
    constructor(){
        super();
        this.type = 'text';
    }
}
TextTabManager = (0,_swc_helpers_ts_decorate__rspack_import_2.__decorate)([
    (0,inversify__rspack_import_1.injectable)(),
    (0,_swc_helpers_ts_decorate__rspack_import_2.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__rspack_import_2.__metadata)("design:paramtypes", [])
], TextTabManager);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/editor/types/unknown/tab-manager/unknown-tab-manager.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UnknownTabManager: () => (UnknownTabManager)
});
/* import */ var _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
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
class UnknownTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0.TabManager {
    constructor(){
        super();
        this.type = 'unknown';
    }
}

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/editor/types/video/tab-manager/video-tab-manager.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  VideoTabManager: () => (VideoTabManager)
});
/* import */ var _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/editor/tab-manager/tab-manager.ts");
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
class VideoTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__rspack_import_0.TabManager {
    constructor(){
        super();
        this.type = 'video';
    }
}

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/events/post-update-event.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/hooks/use-asset.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAsset: () => (useAsset)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _Pimcore_modules_asset_asset_provider__rspack_import_1 = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
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
    const { id } = (0,react__rspack_import_0.useContext)(_Pimcore_modules_asset_asset_provider__rspack_import_1.AssetContext);
    return {
        id
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/services/processors/asset-save-data-processor-registry.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AssetSaveDataContext: () => (AssetSaveDataContext),
  AssetSaveDataProcessorRegistry: () => (AssetSaveDataProcessorRegistry)
});
/* import */ var _swc_helpers_ts_decorate__rspack_import_3 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* import */ var inversify__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_0);
/* import */ var _Pimcore_modules_app_processor_registry_abstract_processor_registry__rspack_import_1 = __webpack_require__("./js/src/core/modules/app/processor-registry/abstract-processor-registry.ts");
/* import */ var _Pimcore_modules_app_processor_registry_abstract_data_context__rspack_import_2 = __webpack_require__("./js/src/core/modules/app/processor-registry/abstract-data-context.ts");
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


/**
 * Context object passed to asset save data processors
 */ class AssetSaveDataContext extends _Pimcore_modules_app_processor_registry_abstract_data_context__rspack_import_2.AbstractDataContext {
    constructor(assetId, updateData){
        super(updateData), this.assetId = assetId, this.updateData = updateData;
    }
}
class AssetSaveDataProcessorRegistry extends _Pimcore_modules_app_processor_registry_abstract_processor_registry__rspack_import_1.AbstractProcessorRegistry {
}
AssetSaveDataProcessorRegistry = (0,_swc_helpers_ts_decorate__rspack_import_3.__decorate)([
    (0,inversify__rspack_import_0.injectable)()
], AssetSaveDataProcessorRegistry);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/tree/utils/transform-api-data-to-node.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  transformApiDataToNode: () => (transformApiDataToNode),
  transformApiDataToNodes: () => (transformApiDataToNodes)
});
/* import */ var _Pimcore_modules_element_element_helper__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* import */ var _Pimcore_types_enums_element_element_type__rspack_import_1 = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
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

const transformApiDataToNode = (assetNode, node)=>{
    return {
        id: assetNode.id.toString(),
        elementType: _Pimcore_types_enums_element_element_type__rspack_import_1.elementTypes.asset,
        icon: (0,_Pimcore_modules_element_element_helper__rspack_import_0.getElementIcon)(assetNode, {
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/execution-engine/jobs/download/zip-download-job.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ZipDownloadJob: () => (ZipDownloadJob)
});
/* import */ var _abstract_download_job__rspack_import_0 = __webpack_require__("./js/src/core/modules/execution-engine/jobs/download/abstract-download-job.ts");
/* import */ var _Pimcore_app_api_pimcore_route__rspack_import_1 = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
/* import */ var i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* import */ var i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(i18next__rspack_import_2);
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


class ZipDownloadJob extends _abstract_download_job__rspack_import_0.AbstractDownloadJob {
    static getTitle() {
        return (0,i18next__rspack_import_2.t)('jobs.download-zip-job.title');
    }
    static getDownloadUrl() {
        return `${(0,_Pimcore_app_api_pimcore_route__rspack_import_1.getPrefix)()}/assets/download/zip/{jobRunId}`;
    }
    static rehydrate(jobRuns) {
        const [parent] = jobRuns;
        return this.buildHandler({
            jobRunId: parent.id
        });
    }
}
ZipDownloadJob.jobNames = [
    'studio_ee_job_create_download_zip'
];
void ZipDownloadJob;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/modules/asset/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActionColumnDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__rspack_import_26.ActionColumnDecorator),
  ArchiveTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_archive_tab_manager_archive_tab_manager__rspack_import_10.ArchiveTabManager),
  AssetApiSlice: () => (/* reexport module object */ _Pimcore_modules_asset_asset_api_slice_enhanced__rspack_import_22),
  AssetContext: () => (/* reexport safe */ _Pimcore_modules_asset_asset_provider__rspack_import_24.AssetContext),
  AssetListingBuilder: () => (/* reexport safe */ _Pimcore_modules_asset_listing_builder_asset_listing_builder__rspack_import_27.AssetListingBuilder),
  AssetProvider: () => (/* reexport safe */ _Pimcore_modules_asset_asset_provider__rspack_import_24.AssetProvider),
  AssetSaveDataContext: () => (/* reexport safe */ _Pimcore_modules_asset_services_processors_asset_save_data_processor_registry__rspack_import_5.AssetSaveDataContext),
  AssetSaveDataProcessorRegistry: () => (/* reexport safe */ _Pimcore_modules_asset_services_processors_asset_save_data_processor_registry__rspack_import_5.AssetSaveDataProcessorRegistry),
  AudioTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_audio_tab_manager_audio_tab_manager__rspack_import_11.AudioTabManager),
  BaseListing: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__rspack_import_26.BaseListing),
  ColumnConfigurationDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__rspack_import_26.ColumnConfigurationDecorator),
  ContextMenuDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__rspack_import_26.ContextMenuDecorator),
  DocumentTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_document_tab_manager_document_tab_manager__rspack_import_12.DocumentTabManager),
  FolderTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_folder_tab_manager_folder_tab_manager__rspack_import_13.FolderTabManager),
  GeneralFiltersDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__rspack_import_26.GeneralFiltersDecorator),
  ImageTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_image_tab_manager_image_tab_manager__rspack_import_14.ImageTabManager),
  InlineEditDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__rspack_import_26.InlineEditDecorator),
  ListingContainer: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__rspack_import_26.ListingContainer),
  MetadataApiSlice: () => (/* reexport module object */ _Pimcore_modules_asset_editor_shared_tab_manager_tabs_custom_metadata_metadata_api_slice_gen__rspack_import_9),
  PagingDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__rspack_import_26.PagingDecorator),
  RowSelectionDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__rspack_import_26.RowSelectionDecorator),
  SortingDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__rspack_import_26.SortingDecorator),
  TAB_CUSTOM_METADATA: () => (/* reexport safe */ _Pimcore_modules_asset_editor_shared_tab_manager_tab_definitions__rspack_import_8.TAB_CUSTOM_METADATA),
  TAB_EMBEDDED_METADATA: () => (/* reexport safe */ _Pimcore_modules_asset_editor_shared_tab_manager_tab_definitions__rspack_import_8.TAB_EMBEDDED_METADATA),
  TAB_VERSIONS: () => (/* reexport safe */ _Pimcore_modules_asset_editor_shared_tab_manager_tab_definitions__rspack_import_8.TAB_VERSIONS),
  TagFilterDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__rspack_import_26.TagFilterDecorator),
  TextTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_text_tab_manager_text_tab_manager__rspack_import_15.TextTabManager),
  UnknownTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_unknown_tab_manager_unknown_tab_manager__rspack_import_16.UnknownTabManager),
  VideoTabManager: () => (/* reexport safe */ _Pimcore_modules_asset_editor_types_video_tab_manager_video_tab_manager__rspack_import_17.VideoTabManager),
  addCustomMetadataToAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.addCustomMetadataToAsset),
  addImageSettingsToAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.addImageSettingsToAsset),
  addPropertyToAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.addPropertyToAsset),
  addScheduleToAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.addScheduleToAsset),
  assetReceived: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.assetReceived),
  assetsAdapter: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.assetsAdapter),
  listingDefaultProps: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__rspack_import_26.listingDefaultProps),
  removeAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.removeAsset),
  removeCustomMetadataFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.removeCustomMetadataFromAsset),
  removeCustomSettingsFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.removeCustomSettingsFromAsset),
  removeImageSettingFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.removeImageSettingFromAsset),
  removePropertyFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.removePropertyFromAsset),
  removeScheduleFromAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.removeScheduleFromAsset),
  resetAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.resetAsset),
  resetChanges: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.resetChanges),
  resetSchedulesChangesForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.resetSchedulesChangesForAsset),
  selectAssetById: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.selectAssetById),
  setActiveTabForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.setActiveTabForAsset),
  setCustomMetadataForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.setCustomMetadataForAsset),
  setCustomSettingsForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.setCustomSettingsForAsset),
  setModifiedCells: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.setModifiedCells),
  setPropertiesForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.setPropertiesForAsset),
  setSchedulesForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.setSchedulesForAsset),
  slice: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.slice),
  transformApiDataToNode: () => (/* reexport safe */ _Pimcore_modules_asset_tree_utils_transform_api_data_to_node__rspack_import_25.transformApiDataToNode),
  transformApiDataToNodes: () => (/* reexport safe */ _Pimcore_modules_asset_tree_utils_transform_api_data_to_node__rspack_import_25.transformApiDataToNodes),
  updateAllCustomMetadataForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.updateAllCustomMetadataForAsset),
  updateCustomMetadataForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.updateCustomMetadataForAsset),
  updateFilename: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.updateFilename),
  updateImageSettingForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.updateImageSettingForAsset),
  updatePropertyForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.updatePropertyForAsset),
  updateScheduleForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.updateScheduleForAsset),
  updateTextDataForAsset: () => (/* reexport safe */ _Pimcore_modules_asset_asset_draft_slice__rspack_import_23.updateTextDataForAsset),
  useAsset: () => (/* reexport safe */ _Pimcore_modules_asset_hooks_use_asset__rspack_import_18.useAsset),
  useAssetDraft: () => (/* reexport safe */ _Pimcore_modules_asset_hooks_use_asset_draft__rspack_import_19.useAssetDraft),
  useAssetHelper: () => (/* reexport safe */ _Pimcore_modules_asset_hooks_use_asset_helper__rspack_import_20.useAssetHelper),
  useClearThumbnails: () => (/* reexport safe */ _Pimcore_modules_asset_actions_clear_thumbnails_use_clear_thumbnails__rspack_import_0.useClearThumbnails),
  useCustomMetadataDraft: () => (/* reexport safe */ _Pimcore_modules_asset_draft_hooks_use_custom_metadata__rspack_import_6.useCustomMetadataDraft),
  useCustomMetadataReducers: () => (/* reexport safe */ _Pimcore_modules_asset_draft_hooks_use_custom_metadata__rspack_import_6.useCustomMetadataReducers),
  useDownload: () => (/* reexport safe */ _Pimcore_modules_asset_actions_download_use_download__rspack_import_1.useDownload),
  useGlobalAssetContext: () => (/* reexport safe */ _Pimcore_modules_asset_hooks_use_global_asset_context__rspack_import_21.useGlobalAssetContext),
  useImageSettingsDraft: () => (/* reexport safe */ _Pimcore_modules_asset_draft_hooks_use_image_settings__rspack_import_7.useImageSettingsDraft),
  useImageSettingsReducers: () => (/* reexport safe */ _Pimcore_modules_asset_draft_hooks_use_image_settings__rspack_import_7.useImageSettingsReducers),
  useInlineEditApiUpdate: () => (/* reexport safe */ _Pimcore_modules_asset_listing_listing_container__rspack_import_26.useInlineEditApiUpdate),
  useUploadNewVersion: () => (/* reexport safe */ _Pimcore_modules_asset_actions_upload_new_version_upload_new_version__rspack_import_2.useUploadNewVersion),
  useZipDownload: () => (/* reexport safe */ _Pimcore_modules_asset_actions_zip_download_use_zip_download__rspack_import_3.useZipDownload)
});
/* import */ var _Pimcore_modules_asset_actions_clear_thumbnails_use_clear_thumbnails__rspack_import_0 = __webpack_require__("./js/src/core/modules/asset/actions/clear-thumbnails/use-clear-thumbnails.tsx");
/* import */ var _Pimcore_modules_asset_actions_download_use_download__rspack_import_1 = __webpack_require__("./js/src/core/modules/asset/actions/download/use-download.tsx");
/* import */ var _Pimcore_modules_asset_actions_upload_new_version_upload_new_version__rspack_import_2 = __webpack_require__("./js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx");
/* import */ var _Pimcore_modules_asset_actions_zip_download_use_zip_download__rspack_import_3 = __webpack_require__("./js/src/core/modules/asset/actions/zip-download/use-zip-download.tsx");
/* import */ var _Pimcore_modules_asset_events_post_update_event__rspack_import_4 = __webpack_require__("./js/src/core/modules/asset/events/post-update-event.ts");
/* import */ var _Pimcore_modules_asset_services_processors_asset_save_data_processor_registry__rspack_import_5 = __webpack_require__("./js/src/core/modules/asset/services/processors/asset-save-data-processor-registry.ts");
/* import */ var _Pimcore_modules_asset_draft_hooks_use_custom_metadata__rspack_import_6 = __webpack_require__("./js/src/core/modules/asset/draft/hooks/use-custom-metadata.ts");
/* import */ var _Pimcore_modules_asset_draft_hooks_use_image_settings__rspack_import_7 = __webpack_require__("./js/src/core/modules/asset/draft/hooks/use-image-settings.ts");
/* import */ var _Pimcore_modules_asset_editor_shared_tab_manager_tab_definitions__rspack_import_8 = __webpack_require__("./js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx");
/* import */ var _Pimcore_modules_asset_editor_shared_tab_manager_tabs_custom_metadata_metadata_api_slice_gen__rspack_import_9 = __webpack_require__("./js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice.gen.ts");
/* import */ var _Pimcore_modules_asset_editor_types_archive_tab_manager_archive_tab_manager__rspack_import_10 = __webpack_require__("./js/src/core/modules/asset/editor/types/archive/tab-manager/archive-tab-manager.ts");
/* import */ var _Pimcore_modules_asset_editor_types_audio_tab_manager_audio_tab_manager__rspack_import_11 = __webpack_require__("./js/src/core/modules/asset/editor/types/audio/tab-manager/audio-tab-manager.ts");
/* import */ var _Pimcore_modules_asset_editor_types_document_tab_manager_document_tab_manager__rspack_import_12 = __webpack_require__("./js/src/core/modules/asset/editor/types/document/tab-manager/document-tab-manager.ts");
/* import */ var _Pimcore_modules_asset_editor_types_folder_tab_manager_folder_tab_manager__rspack_import_13 = __webpack_require__("./js/src/core/modules/asset/editor/types/folder/tab-manager/folder-tab-manager.ts");
/* import */ var _Pimcore_modules_asset_editor_types_image_tab_manager_image_tab_manager__rspack_import_14 = __webpack_require__("./js/src/core/modules/asset/editor/types/image/tab-manager/image-tab-manager.ts");
/* import */ var _Pimcore_modules_asset_editor_types_text_tab_manager_text_tab_manager__rspack_import_15 = __webpack_require__("./js/src/core/modules/asset/editor/types/text/tab-manager/text-tab-manager.ts");
/* import */ var _Pimcore_modules_asset_editor_types_unknown_tab_manager_unknown_tab_manager__rspack_import_16 = __webpack_require__("./js/src/core/modules/asset/editor/types/unknown/tab-manager/unknown-tab-manager.ts");
/* import */ var _Pimcore_modules_asset_editor_types_video_tab_manager_video_tab_manager__rspack_import_17 = __webpack_require__("./js/src/core/modules/asset/editor/types/video/tab-manager/video-tab-manager.ts");
/* import */ var _Pimcore_modules_asset_hooks_use_asset__rspack_import_18 = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset.ts");
/* import */ var _Pimcore_modules_asset_hooks_use_asset_draft__rspack_import_19 = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-draft.ts");
/* import */ var _Pimcore_modules_asset_hooks_use_asset_helper__rspack_import_20 = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-helper.ts");
/* import */ var _Pimcore_modules_asset_hooks_use_global_asset_context__rspack_import_21 = __webpack_require__("./js/src/core/modules/asset/hooks/use-global-asset-context.ts");
/* import */ var _Pimcore_modules_asset_asset_api_slice_enhanced__rspack_import_22 = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* import */ var _Pimcore_modules_asset_asset_draft_slice__rspack_import_23 = __webpack_require__("./js/src/core/modules/asset/asset-draft-slice.tsx");
/* import */ var _Pimcore_modules_asset_asset_provider__rspack_import_24 = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
/* import */ var _Pimcore_modules_asset_tree_utils_transform_api_data_to_node__rspack_import_25 = __webpack_require__("./js/src/core/modules/asset/tree/utils/transform-api-data-to-node.ts");
/* import */ var _Pimcore_modules_asset_listing_listing_container__rspack_import_26 = __webpack_require__("./js/src/core/modules/asset/listing/listing-container.tsx");
/* import */ var _Pimcore_modules_asset_listing_builder_asset_listing_builder__rspack_import_27 = __webpack_require__("./js/src/core/modules/asset/listing/builder/asset-listing-builder.tsx");
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
"./js/src/core/modules/asset/actions/clear-thumbnails/use-clear-thumbnails.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useClearThumbnails: () => (useClearThumbnails)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_modules_asset_asset_api_slice_gen__rspack_import_1 = __webpack_require__("./js/src/core/modules/asset/asset-api-slice.gen.ts");
/* import */ var _Pimcore_components_icon_icon__rspack_import_2 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var react__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_3);
/* import */ var react_i18next__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_4);
/* import */ var _Pimcore_modules_element_permissions_permission_helper__rspack_import_5 = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_6 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var _Pimcore_modules_element_actions__rspack_import_7 = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 






const useClearThumbnails = ()=>{
    _s();
    const { t } = (0,react_i18next__rspack_import_4.useTranslation)();
    const [clearThumbnail, { isError, error }] = (0,_Pimcore_modules_asset_asset_api_slice_gen__rspack_import_1.useAssetClearThumbnailMutation)();
    (0,react__rspack_import_3.useEffect)(()=>{
        if (isError) {
            (0,_Pimcore_modules_app_error_handler__rspack_import_6["default"])(new _Pimcore_modules_app_error_handler__rspack_import_6.ApiError(error));
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
            key: _Pimcore_modules_element_actions__rspack_import_7.ContextMenuActionName.clearImageThumbnails,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_2.Icon, {
                value: 'remove-image-thumbnail'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/clear-thumbnails/use-clear-thumbnails.tsx",
                lineNumber: 42,
                columnNumber: 13
            }, undefined),
            hidden: node.type !== 'image' || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_5.checkElementPermission)(node.permissions, 'publish'),
            onClick: async ()=>{
                await handleClearThumbnails(node, onFinish);
            }
        };
    };
    const clearVideoThumbnailContextMenuItem = (node, onFinish)=>{
        return {
            label: t('asset.tree.context-menu.clear-thumbnails'),
            key: _Pimcore_modules_element_actions__rspack_import_7.ContextMenuActionName.clearVideoThumbnails,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_2.Icon, {
                value: 'remove-video-thumbnail'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/clear-thumbnails/use-clear-thumbnails.tsx",
                lineNumber: 53,
                columnNumber: 13
            }, undefined),
            hidden: node.type !== 'video' || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_5.checkElementPermission)(node.permissions, 'publish'),
            onClick: async ()=>{
                await handleClearThumbnails(node, onFinish);
            }
        };
    };
    const clearPdfThumbnailContextMenuItem = (node, onFinish)=>{
        return {
            label: t('asset.tree.context-menu.clear-thumbnails'),
            key: _Pimcore_modules_element_actions__rspack_import_7.ContextMenuActionName.clearPdfThumbnails,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_2.Icon, {
                value: 'remove-pdf-thumbnail'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/clear-thumbnails/use-clear-thumbnails.tsx",
                lineNumber: 64,
                columnNumber: 13
            }, undefined),
            hidden: node.mimeType !== 'application/pdf' || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_5.checkElementPermission)(node.permissions, 'publish'),
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
        react_i18next__rspack_import_4.useTranslation,
        _Pimcore_modules_asset_asset_api_slice_gen__rspack_import_1.useAssetClearThumbnailMutation
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useUploadNewVersion: () => (useUploadNewVersion)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_modules_asset_asset_api_slice_enhanced__rspack_import_1 = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_components_icon_icon__rspack_import_3 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var react__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_4);
/* import */ var _Pimcore_modules_element_permissions_permission_helper__rspack_import_5 = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* import */ var _Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__rspack_import_6 = __webpack_require__("./js/src/core/components/element-tree/provider/tree-permission-provider/use-tree-permission.ts");
/* import */ var _Pimcore_modules_perspectives_enums_tree_permission__rspack_import_7 = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* import */ var _Pimcore_modules_element_actions__rspack_import_8 = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* import */ var _Pimcore_components_modal_upload_provider_upload_modal_provider_use_upload_modal_context__rspack_import_9 = __webpack_require__("./js/src/core/components/modal-upload/provider/upload-modal-provider/use-upload-modal-context.tsx");
/* import */ var _Pimcore_app_api_pimcore_route__rspack_import_10 = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
/* import */ var lodash__rspack_import_11 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_11_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_11);
/* import */ var _sdk_app__rspack_import_12 = __webpack_require__("./js/src/sdk/app/index.ts");
/* import */ var _Pimcore_components_element_tree_element_tree_slice__rspack_import_13 = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* import */ var _Pimcore_modules_asset_tree_utils_transform_api_data_to_node__rspack_import_14 = __webpack_require__("./js/src/core/modules/asset/tree/utils/transform-api-data-to-node.ts");
/* import */ var _Pimcore_utils_url_cache_buster__rspack_import_15 = __webpack_require__("./js/src/core/utils/url-cache-buster.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 














const useUploadNewVersion = ()=>{
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const dispatch = (0,_sdk_app__rspack_import_12.useAppDispatch)();
    const { triggerUpload } = (0,_Pimcore_components_modal_upload_provider_upload_modal_provider_use_upload_modal_context__rspack_import_9.useUploadModalContext)();
    const { isTreeActionAllowed } = (0,_Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__rspack_import_6.useTreePermission)();
    const refreshTreeNode = async (id)=>{
        dispatch((0,_Pimcore_components_element_tree_element_tree_slice__rspack_import_13.setNodeFetchingInAllTrees)({
            nodeId: String(id),
            elementType: 'asset',
            isFetching: true
        }));
        const fetcher = dispatch(_Pimcore_modules_asset_asset_api_slice_enhanced__rspack_import_1.api.endpoints.assetGetTree.initiate({
            page: 1,
            pageSize: 1,
            pqlQuery: `id = ${id}`,
            pathIncludeParent: true
        }, {
            forceRefetch: true
        }));
        try {
            var _data_items;
            const { data } = await fetcher;
            if (!(0,lodash__rspack_import_11.isNil)(data === null || data === void 0 ? void 0 : (_data_items = data.items) === null || _data_items === void 0 ? void 0 : _data_items[0])) {
                const freshNode = (0,_Pimcore_modules_asset_tree_utils_transform_api_data_to_node__rspack_import_14.transformApiDataToNode)(data.items[0], {
                    id: String(id),
                    internalKey: String(id)
                });
                const assetItem = data.items[0];
                const cacheBustedItem = 'imageThumbnailPath' in assetItem && !(0,lodash__rspack_import_11.isNil)(assetItem.imageThumbnailPath) ? {
                    ...assetItem,
                    imageThumbnailPath: (0,_Pimcore_utils_url_cache_buster__rspack_import_15.addCacheBusterToUrl)(assetItem.imageThumbnailPath)
                } : assetItem;
                const cacheBustedIcon = freshNode.icon.type === 'path' ? {
                    ...freshNode.icon,
                    value: (0,_Pimcore_utils_url_cache_buster__rspack_import_15.addCacheBusterToUrl)(freshNode.icon.value)
                } : freshNode.icon;
                dispatch((0,_Pimcore_components_element_tree_element_tree_slice__rspack_import_13.updateNodeData)({
                    nodeId: String(id),
                    elementType: 'asset',
                    data: {
                        icon: cacheBustedIcon,
                        label: freshNode.label,
                        metaData: {
                            asset: cacheBustedItem
                        }
                    }
                }));
            }
        } finally{
            fetcher.unsubscribe();
            dispatch((0,_Pimcore_components_element_tree_element_tree_slice__rspack_import_13.setNodeFetchingInAllTrees)({
                nodeId: String(id),
                elementType: 'asset',
                isFetching: false
            }));
        }
    };
    const uploadNewVersion = (id, onFinish)=>{
        triggerUpload({
            action: `${(0,_Pimcore_app_api_pimcore_route__rspack_import_10.getPrefix)()}/assets/${id}/replace`,
            maxItems: 1,
            multiple: false,
            onSuccess: async (result)=>{
                await refreshTreeNode(id);
                onFinish === null || onFinish === void 0 ? void 0 : onFinish();
            }
        });
    };
    const uploadNewVersionContextMenuItem = (node, onFinish)=>{
        return {
            label: t('asset.tree.context-menu.upload-new-version'),
            key: _Pimcore_modules_element_actions__rspack_import_8.ContextMenuActionName.uploadNewVersion,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_3.Icon, {
                value: 'upload-cloud'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx",
                lineNumber: 105,
                columnNumber: 13
            }, undefined),
            hidden: node.type === 'folder' || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_5.checkElementPermission)(node.permissions, 'list') || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_5.checkElementPermission)(node.permissions, 'view') || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_5.checkElementPermission)(node.permissions, 'publish') || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_5.checkElementPermission)(node.permissions, 'versions'),
            onClick: ()=>{
                uploadNewVersion(node.id, onFinish);
            }
        };
    };
    const uploadNewVersionTreeContextMenuItem = (node)=>{
        return {
            label: t('asset.tree.context-menu.upload-new-version'),
            key: _Pimcore_modules_element_actions__rspack_import_8.ContextMenuActionName.uploadNewVersion,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_3.Icon, {
                value: 'upload-cloud'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx",
                lineNumber: 116,
                columnNumber: 13
            }, undefined),
            hidden: !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__rspack_import_7.TreePermission.UploadNewVersion) || node.type === 'folder' || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_5.checkElementPermission)(node.permissions, 'list') || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_5.checkElementPermission)(node.permissions, 'view') || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_5.checkElementPermission)(node.permissions, 'publish') || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_5.checkElementPermission)(node.permissions, 'versions'),
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
        react_i18next__rspack_import_2.useTranslation,
        _sdk_app__rspack_import_12.useAppDispatch,
        _Pimcore_components_modal_upload_provider_upload_modal_provider_use_upload_modal_context__rspack_import_9.useUploadModalContext,
        _Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__rspack_import_6.useTreePermission
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/actions/zip-download/use-zip-download.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useZipDownload: () => (useZipDownload)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _asset_api_slice_enhanced__rspack_import_1 = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* import */ var _Pimcore_modules_execution_engine_jobs_download_zip_download_job__rspack_import_2 = __webpack_require__("./js/src/core/modules/execution-engine/jobs/download/zip-download-job.ts");
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_components_icon_icon__rspack_import_4 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var react__rspack_import_5 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_5_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_5);
/* import */ var _Pimcore_modules_element_permissions_permission_helper__rspack_import_6 = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* import */ var _Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__rspack_import_7 = __webpack_require__("./js/src/core/components/element-tree/provider/tree-permission-provider/use-tree-permission.ts");
/* import */ var _Pimcore_modules_perspectives_enums_tree_permission__rspack_import_8 = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_9 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var _Pimcore_modules_element_actions__rspack_import_10 = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* import */ var lodash__rspack_import_11 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_11_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_11);
/* import */ var _Pimcore_modules_execution_engine_hooks_use_execution_engine__rspack_import_12 = __webpack_require__("./js/src/core/modules/execution-engine/hooks/use-execution-engine.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 











const useZipDownload = (props)=>{
    _s();
    const [fetchFolder] = (0,_asset_api_slice_enhanced__rspack_import_1.useAssetExportZipFolderMutation)();
    const [fetchAssets, { isError, error }] = (0,_asset_api_slice_enhanced__rspack_import_1.useAssetExportZipAssetMutation)();
    const executionEngine = (0,_Pimcore_modules_execution_engine_hooks_use_execution_engine__rspack_import_12.useExecutionEngine)();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const { isTreeActionAllowed } = (0,_Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__rspack_import_7.useTreePermission)();
    (0,react__rspack_import_5.useEffect)(()=>{
        if (isError) {
            (0,_Pimcore_modules_app_error_handler__rspack_import_9["default"])(new _Pimcore_modules_app_error_handler__rspack_import_9.ApiError(error));
        }
    }, [
        isError
    ]);
    const createZipDownload = (param)=>{
        let { requestData } = param;
        const job = new _Pimcore_modules_execution_engine_jobs_download_zip_download_job__rspack_import_2.ZipDownloadJob({
            action: async ()=>{
                let promise;
                if (props.type === 'folder') {
                    promise = fetchFolder(requestData);
                } else {
                    promise = fetchAssets(requestData);
                }
                const response = await promise;
                if (!(0,lodash__rspack_import_11.isUndefined)(response.error)) {
                    (0,_Pimcore_modules_app_error_handler__rspack_import_9["default"])(new _Pimcore_modules_app_error_handler__rspack_import_9.ApiError(response.error));
                    throw new _Pimcore_modules_app_error_handler__rspack_import_9.ApiError(response.error);
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
            key: _Pimcore_modules_element_actions__rspack_import_10.ContextMenuActionName.downloadAsZip,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_4.Icon, {
                value: 'download-zip'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/zip-download/use-zip-download.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, undefined),
            hidden: node.type !== 'folder' || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_6.checkElementPermission)(node.permissions, 'view'),
            onClick: ()=>{
                createZipDownload({
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
            key: _Pimcore_modules_element_actions__rspack_import_10.ContextMenuActionName.downloadAsZip,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_4.Icon, {
                value: 'download-zip'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/actions/zip-download/use-zip-download.tsx",
                lineNumber: 84,
                columnNumber: 13
            }, undefined),
            hidden: !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__rspack_import_8.TreePermission.DownloadZip) || node.type !== 'folder' || !(0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_6.checkElementPermission)(node.permissions, 'view'),
            onClick: ()=>{
                createZipDownload({
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
        _asset_api_slice_enhanced__rspack_import_1.useAssetExportZipFolderMutation,
        _asset_api_slice_enhanced__rspack_import_1.useAssetExportZipAssetMutation,
        _Pimcore_modules_execution_engine_hooks_use_execution_engine__rspack_import_12.useExecutionEngine,
        react_i18next__rspack_import_3.useTranslation,
        _Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__rspack_import_7.useTreePermission
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TAB_CUSTOM_METADATA: () => (TAB_CUSTOM_METADATA),
  TAB_EMBEDDED_METADATA: () => (TAB_EMBEDDED_METADATA),
  TAB_VERSIONS: () => (TAB_VERSIONS)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_components_icon_icon__rspack_import_1 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var react__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_2);
/* import */ var _Pimcore_modules_app_component_registry_component_renderer__rspack_import_3 = __webpack_require__("./js/src/core/modules/app/component-registry/component-renderer.tsx");
/* import */ var _Pimcore_modules_app_component_registry_component_config__rspack_import_4 = __webpack_require__("./js/src/core/modules/app/component-registry/component-config.tsx");
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
    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_component_registry_component_renderer__rspack_import_3.ComponentRenderer, {
        component: _Pimcore_modules_app_component_registry_component_config__rspack_import_4.componentConfig.asset.editor.tab.embeddedMetadata.name
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 18,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_1.Icon, {
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
    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_component_registry_component_renderer__rspack_import_3.ComponentRenderer, {
        component: _Pimcore_modules_app_component_registry_component_config__rspack_import_4.componentConfig.asset.editor.tab.customMetadata.name
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 25,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_1.Icon, {
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
    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_component_registry_component_renderer__rspack_import_3.ComponentRenderer, {
        component: _Pimcore_modules_app_component_registry_component_config__rspack_import_4.componentConfig.asset.editor.tab.versions.name
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 33,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_1.Icon, {
        value: 'history'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/shared-tab-manager/tab-definitions.tsx",
        lineNumber: 34,
        columnNumber: 9
    }, undefined),
    isDetachable: true
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/listing/builder/asset-listing-builder.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AssetListingBuilder: () => (AssetListingBuilder)
});
/* import */ var _sdk_modules_element__rspack_import_0 = __webpack_require__("./js/src/sdk/modules/element/index.ts");
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
class AssetListingBuilder extends _sdk_modules_element__rspack_import_0.ListingBuilder {
}

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=js_src_sdk_modules_asset_index_ts.js.map