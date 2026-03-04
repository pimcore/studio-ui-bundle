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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__data_object"], {
"./js/src/core/modules/auth/util/user-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getCurrentUser: () => (getCurrentUser)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _user_user_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
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

const getCurrentUser = ()=>{
    return (0,_user_user_slice__WEBPACK_IMPORTED_MODULE_1__.selectCurrentUser)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.getState());
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
"./js/src/core/modules/data-object/editor/types/folder/tab-manager/folder-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
"./js/src/core/modules/data-object/editor/types/object/tab-manager/object-tab-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ObjectTabManager: () => (ObjectTabManager)
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



class ObjectTabManager extends _Pimcore_modules_element_editor_tab_manager_tab_manager__WEBPACK_IMPORTED_MODULE_0__.TabManager {
    constructor(){
        super();
        this.type = 'object';
    }
}
ObjectTabManager = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], ObjectTabManager);

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
"./js/src/core/modules/data-object/events/post-update-event.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
"./js/src/core/modules/data-object/hooks/use-custom-layouts.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useCustomLayouts: () => (useCustomLayouts)
});
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_utils_workflow_availability__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/utils/workflow-availability.ts");
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





const useCustomLayouts = (id)=>{
    const { dataObject, isLoading: isDraftLoading } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_0__.useDataObjectDraft)(id);
    const { data, error, isLoading: isCustomLayoutLoading } = (0,_Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.useClassCustomLayoutEditorCollectionQuery)({
        objectId: id
    }, {
        skip: dataObject === undefined || dataObject.type === 'folder'
    });
    if (error !== undefined) {
        (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__.ApiError(error));
    }
    const layouts = data !== undefined ? data.items : undefined;
    const hasWorkflowAvailable = (0,_Pimcore_modules_element_utils_workflow_availability__WEBPACK_IMPORTED_MODULE_5__.isWorkflowAvailable)(dataObject, 'data-object');
    const { data: workflowDetailsData, isLoading: isLoadingWorkflowDetails } = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_4__.useWorkflowGetDetailsQuery)({
        elementType: 'data-object',
        elementId: id
    }, {
        skip: !hasWorkflowAvailable
    });
    const getDefaultLayoutId = (currentLayout)=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(layouts)) {
            return null;
        }
        const defaultLayout = layouts.find((layout)=>layout.default) ?? layouts.find((layout)=>layout.id === currentLayout) ?? layouts.find((layout)=>layout.id === (workflowDetailsData === null || workflowDetailsData === void 0 ? void 0 : workflowDetailsData.layoutId)) ?? layouts.find((layout)=>layout.id === '0') ?? layouts[0] ?? null;
        return (defaultLayout === null || defaultLayout === void 0 ? void 0 : defaultLayout.id) ?? null;
    };
    const isLoading = isDraftLoading || isLoadingWorkflowDetails || isCustomLayoutLoading && (dataObject === null || dataObject === void 0 ? void 0 : dataObject.type) !== 'folder';
    return {
        layouts,
        getDefaultLayoutId,
        isLoading
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
"./js/src/core/modules/data-object/listing/builder/object-listing-builder.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ObjectListingBuilder: () => (ObjectListingBuilder)
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
class ObjectListingBuilder extends _sdk_modules_element__WEBPACK_IMPORTED_MODULE_0__.ListingBuilder {
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
"./js/src/core/modules/data-object/listing/data-layer/hooks/use-data-query-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDataQueryHelper: () => (useDataQueryHelper)
});
/* ESM import */var _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/settings/use-settings.ts");
/* ESM import */var _decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_data_layer_provider_data_use_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/data-layer/provider/data/use-data.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns.tsx");
/* ESM import */var _Pimcore_components_language_selection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/language-selection/index.ts");
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





const useDataQueryHelper = ()=>{
    const { useElementId } = (0,_Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_1__.useSettings)();
    const { getId } = useElementId();
    const { selectedColumns } = (0,_Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_0__.useSelectedColumns)();
    const { availableColumns } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_4__.useAvailableColumns)();
    const { selectedClassDefinition } = (0,_decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_2__.useClassDefinitionSelection)();
    const { dataLoadingState, setDataLoadingState } = (0,_Pimcore_modules_element_listing_abstract_data_layer_provider_data_use_data__WEBPACK_IMPORTED_MODULE_3__.useData)();
    const { currentLanguage } = (0,_Pimcore_components_language_selection__WEBPACK_IMPORTED_MODULE_5__.useLanguageSelection)();
    const columnsArg = [];
    selectedColumns.forEach((column)=>{
        let advancedColumnConfig;
        if (column.type === 'dataobject.advanced') {
            var _column_originalApiDefinition___meta, _column_originalApiDefinition;
            advancedColumnConfig = (_column_originalApiDefinition = column.originalApiDefinition) === null || _column_originalApiDefinition === void 0 ? void 0 : (_column_originalApiDefinition___meta = _column_originalApiDefinition.__meta) === null || _column_originalApiDefinition___meta === void 0 ? void 0 : _column_originalApiDefinition___meta.advancedColumnConfig;
        }
        columnsArg.push({
            key: column.key,
            type: column.type,
            locale: column.localizable ? (column.locale ?? currentLanguage) === 'default' ? null : column.locale ?? currentLanguage : undefined,
            group: column.group,
            config: advancedColumnConfig ?? column.config
        });
    });
    const systemColumns = availableColumns.filter((column)=>Array.isArray(column.group) && column.group.includes('system'));
    systemColumns.forEach((column)=>{
        const hasColumn = columnsArg.some((selectedColumn)=>selectedColumn.key === column.key);
        if (!hasColumn) {
            columnsArg.push({
                key: column.key,
                type: column.type,
                locale: column.locale,
                group: column.group,
                config: []
            });
        }
    });
    const getArgs = ()=>{
        if (selectedClassDefinition === undefined) {
            throw new Error('No class definition selected');
        }
        return {
            classId: selectedClassDefinition.id,
            body: {
                folderId: getId(),
                columns: columnsArg,
                filters: {
                    includeDescendants: true,
                    page: 1,
                    pageSize: 20
                }
            }
        };
    };
    const hasRequiredArgs = ()=>{
        const args = getArgs();
        return args.body.folderId !== undefined || selectedClassDefinition !== undefined;
    };
    return {
        getArgs,
        hasRequiredArgs,
        dataLoadingState,
        setDataLoadingState
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
"./js/src/core/modules/data-object/listing/decorator/action-column/action-column-decorator.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActionColumnDecorator: () => (ActionColumnDecorator)
});
/* ESM import */var _view_layer_components_grid_hooks_with_action_column_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/action-column/view-layer/components/grid/hooks/with-action-column-configuration.tsx");
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
const ActionColumnDecorator = (props)=>{
    const { useGridOptions, ...defaultProps } = props;
    const newProps = {
        ...defaultProps,
        useGridOptions: (0,_view_layer_components_grid_hooks_with_action_column_configuration__WEBPACK_IMPORTED_MODULE_0__.withActionColumnConfiguration)(useGridOptions)
    };
    return newProps;
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
"./js/src/core/modules/data-object/tree/utils/transform-api-data-to-node.ts": (function (module, __webpack_exports__, __webpack_require__) {
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

const transformApiDataToNode = (dataObjectNode, node)=>{
    return {
        id: dataObjectNode.id.toString(),
        elementType: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__.elementTypes.dataObject,
        icon: (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__.getElementIcon)(dataObjectNode, {
            type: 'name',
            value: 'data-object'
        }),
        label: dataObjectNode.key,
        type: dataObjectNode.type,
        parentId: dataObjectNode.parentId.toString(),
        fullPath: dataObjectNode.fullPath,
        hasChildren: dataObjectNode.hasChildren,
        locked: dataObjectNode.locked,
        isLocked: dataObjectNode.isLocked,
        isPublished: dataObjectNode.published,
        metaData: {
            dataObject: dataObjectNode
        },
        permissions: dataObjectNode.permissions ?? [],
        internalKey: `${node.internalKey}-${dataObjectNode.id}`
    };
};
const transformApiDataToNodes = (node, data, maxItemsPerNode)=>{
    const nodes = [];
    const dataObjectData = data.items;
    dataObjectData.forEach((dataObjectNode)=>{
        nodes.push(transformApiDataToNode(dataObjectNode, node));
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
"./js/src/core/modules/element/editor/layouts/tabs-toolbar-view.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        tabbarToolbar: css`
      &.tabs-toolbar-layout {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }

      .tabs-toolbar-layout__tabbar {
        display: flex;
        overflow: hidden;
        height: calc(100% - ${token.sizeXXL}px);
        width: 100%;
      }

      .tabs-toolbar-layout__toolbar {
        display: flex;
        overflow: hidden;
        height: ${token.sizeXXL}px;
        width: 100%;
      }
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/modules/element/editor/shared-components/workflow/hooks/use-submit-workflow.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useSubmitWorkflow: () => (useSubmitWorkflow)
});
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/message/useMessage/index.tsx");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var _use_workflow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/editor/shared-components/workflow/hooks/use-workflow.ts");
/* ESM import */var _sdk_modules_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/sdk/modules/element/index.ts");
/* ESM import */var _Pimcore_modules_data_object_editor_toolbar_context_menu_provider_use_layout_selection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection.tsx");
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







const useSubmitWorkflow = ()=>{
    const { id: elementId, elementType } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__.useElementContext)();
    const { refreshElement } = (0,_sdk_modules_element__WEBPACK_IMPORTED_MODULE_6__.useElementRefresh)(elementType);
    const { closeModal } = (0,_use_workflow__WEBPACK_IMPORTED_MODULE_5__.useWorkflow)();
    const alertModal = (0,_sdk_components__WEBPACK_IMPORTED_MODULE_4__.useAlertModal)();
    const messageApi = (0,_Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_1__.useMessage)();
    const { setCurrentLayout } = (0,_Pimcore_modules_data_object_editor_toolbar_context_menu_provider_use_layout_selection__WEBPACK_IMPORTED_MODULE_7__.useLayoutSelection)();
    const [fetchSubmitWorkflowActionMutation, { isLoading: submissionLoading, isSuccess: submissionSuccess, isError: isSubmissionError }] = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useWorkflowActionSubmitMutation)();
    const workFlowTransition = (workflowAction, workflowOptions)=>{
        return {
            submitAction: {
                actionType: workflowAction.actionType,
                elementId,
                elementType,
                workflowId: workflowAction.workflowId,
                transitionId: workflowAction.transitionId,
                workflowOptions: workflowOptions ?? {}
            }
        };
    };
    const submitWorkflowAction = (workflowAction, workflowOptions)=>{
        fetchSubmitWorkflowActionMutation(workFlowTransition(workflowAction, workflowOptions)).unwrap().then(()=>{
            void messageApi.success({
                content: (0,i18next__WEBPACK_IMPORTED_MODULE_2__.t)('action-applied-successfully') + ': ' + (0,i18next__WEBPACK_IMPORTED_MODULE_2__.t)(workflowAction.label),
                type: 'success',
                duration: 3
            });
            if (elementType === 'data-object') {
                setCurrentLayout(null);
            }
            refreshElement(elementId);
            closeModal();
        }).catch((error)=>{
            var _error_data;
            void alertModal.error({
                title: (0,i18next__WEBPACK_IMPORTED_MODULE_2__.t)('action-could-not-be-applied'),
                content: ((_error_data = error.data) === null || _error_data === void 0 ? void 0 : _error_data.message) ?? undefined
            });
            closeModal();
        });
    };
    return {
        submitWorkflowAction,
        submissionLoading,
        submissionSuccess,
        submissionError: isSubmissionError
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
"./js/src/core/modules/element/editor/shared-components/workflow/hooks/use-workflow-field-renderer.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useWorkflowFieldRenderer: () => (useWorkflowFieldRenderer)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_field_width_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider.tsx");
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



const useWorkflowFieldRenderer = ()=>{
    const objectDataRegistry = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        return _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_1__.container.get(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_2__.serviceIds["DynamicTypes/ObjectDataRegistry"]);
    }, []);
    const supportedFieldTypes = [
        'input',
        'numeric',
        'textarea',
        'select',
        'datetime',
        'date',
        'user',
        'checkbox'
    ];
    const getSupportedFieldTypes = ()=>supportedFieldTypes;
    const renderFields = function() {
        let additionalFields = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        return additionalFields.filter((field)=>supportedFieldTypes.includes(field.fieldType)).map((field)=>{
            const dynamicType = getDynamicTypeForField(field.fieldType);
            if (dynamicType === null) {
                return null;
            }
            const fieldProps = {
                name: field.name,
                title: field.title,
                datatype: 'data',
                fieldType: field.fieldType,
                defaultFieldWidth: _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_field_width_provider__WEBPACK_IMPORTED_MODULE_3__.defaultFieldWidthValues,
                noteditable: false,
                inherited: false,
                value: undefined,
                ...field.fieldTypeSettings
            };
            const component = dynamicType.getObjectDataComponent(fieldProps);
            return {
                name: field.name,
                title: field.title,
                required: field.required ?? false,
                fieldType: field.fieldType,
                component
            };
        }).filter((field)=>field !== null);
    };
    const getDynamicTypeForField = (fieldType)=>{
        try {
            if (!objectDataRegistry.hasDynamicType(fieldType)) {
                console.warn(`Dynamic type "${fieldType}" not found in ObjectDataRegistry`);
                return null;
            }
            return objectDataRegistry.getDynamicType(fieldType);
        } catch (error) {
            console.warn(`Could not get dynamic type for field type "${fieldType}":`, error);
            return null;
        }
    };
    return {
        renderFields,
        getSupportedFieldTypes
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
"./js/src/core/modules/element/editor/shared-components/workflow/hooks/use-workflow.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useWorkflow: () => (useWorkflow)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_element_editor_shared_components_workflow_provider_workflow_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/editor/shared-components/workflow/provider/workflow-provider.tsx");
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-draft.ts");
/* ESM import */var _Pimcore_modules_element_utils_workflow_availability__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/utils/workflow-availability.ts");
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





const useWorkflow = ()=>{
    const { openModal, closeModal, isModalOpen, triggeredWorkflowAction, setTriggeredWorkflowAction } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Pimcore_modules_element_editor_shared_components_workflow_provider_workflow_provider__WEBPACK_IMPORTED_MODULE_1__.WorkflowContext);
    const { id, elementType } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_3__.useElementContext)();
    const { element } = (0,_Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_4__.useElementDraft)(id, elementType);
    const hasWorkflowAvailable = (0,_Pimcore_modules_element_utils_workflow_availability__WEBPACK_IMPORTED_MODULE_5__.isWorkflowAvailable)(element, elementType);
    const { data: workflowDetailsData, isFetching: isFetchingWorkflowDetails } = (0,_Pimcore_modules_element_editor_shared_tab_manager_tabs_workflow_workflow_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useWorkflowGetDetailsQuery)({
        elementType,
        elementId: id
    }, {
        skip: !hasWorkflowAvailable
    });
    return {
        openModal,
        closeModal,
        isModalOpen,
        triggeredWorkflowAction,
        setTriggeredWorkflowAction,
        workflowDetailsData,
        isFetchingWorkflowDetails
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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useWorkflowActionSubmitMutation: () => (useWorkflowActionSubmitMutation),
  useWorkflowGetDetailsQuery: () => (useWorkflowGetDetailsQuery)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _workflow_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice.gen.ts");
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

const api = _workflow_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.ASSET_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DATA_OBJECT_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.DOCUMENT_DETAIL
    ],
    endpoints: {
        workflowGetDetails: {
            providesTags: (result, error, args)=>{
                const tags = _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.ELEMENT_WORKFLOW(args.elementType, args.elementId);
                return tags.filter((tag)=>tag !== undefined);
            }
        },
        workflowActionSubmit: {
            invalidatesTags: (result, error, args)=>{
                const tags = _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.ELEMENT_WORKFLOW(args.submitAction.elementType, args.submitAction.elementId);
                return tags.filter((tag)=>tag !== undefined);
            }
        }
    }
});
const { useWorkflowActionSubmitMutation, useWorkflowGetDetailsQuery } = api;

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useWorkflowActionSubmitMutation: () => (useWorkflowActionSubmitMutation),
  useWorkflowGetDetailsQuery: () => (useWorkflowGetDetailsQuery)
});
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Workflows"
];
const injectedRtkApi = _sdk_api__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            workflowGetDetails: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/workflows/details`,
                        params: {
                            elementId: queryArg.elementId,
                            elementType: queryArg.elementType
                        }
                    }),
                providesTags: [
                    "Workflows"
                ]
            }),
            workflowActionSubmit: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/workflows/action`,
                        method: "POST",
                        body: queryArg.submitAction
                    }),
                invalidatesTags: [
                    "Workflows"
                ]
            })
        }),
    overrideExisting: false
});

const { useWorkflowGetDetailsQuery, useWorkflowActionSubmitMutation } = injectedRtkApi;

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
"./js/src/core/modules/element/editor/tabs/hooks/use-detach-tab.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDetachTab: () => (useDetachTab)
});
/* ESM import */var _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(i18next__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_hooks_use_tab_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/hooks/use-tab-manager.ts");
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


const useDetachTab = ()=>{
    const { openBottomWidget } = (0,_Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_0__.useWidgetManager)();
    const tabManager = (0,_Pimcore_modules_element_editor_shared_tab_manager_hooks_use_tab_manager__WEBPACK_IMPORTED_MODULE_2__.useTabManager)();
    const detachWidget = (param)=>{
        let { tabKey, config = {} } = param;
        const tab = tabManager.getTab(tabKey);
        if (tab === undefined) {
            return;
        }
        openBottomWidget({
            name: i18next__WEBPACK_IMPORTED_MODULE_1___default().t(String(tab.label)),
            id: `${tabKey}-detached`,
            component: 'detachable-tab',
            config: {
                ...config,
                icon: tab.icon.props,
                tabKey
            }
        });
    };
    return {
        detachWidget
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
"./js/src/core/modules/element/utils/workflow-availability.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isWorkflowAvailable: () => (isWorkflowAvailable)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
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
const isWorkflowAvailable = (element, elementType)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isNil)(element)) {
        return false;
    }
    if (elementType === 'asset' && element.type === 'folder') {
        return false;
    }
    return element.hasWorkflowAvailable ?? false;
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
"./js/src/core/modules/perspectives/enums/nav-permission.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NavPermission: () => (NavPermission)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var NavPermission = /*#__PURE__*/ function(NavPermission) {
    NavPermission["QuickAccessHidden"] = "quickAccess.hidden";
    NavPermission["OpenDocument"] = "quickAccess.open_document";
    NavPermission["OpenObject"] = "quickAccess.open_object";
    NavPermission["OpenAsset"] = "quickAccess.open_asset";
    NavPermission["RecycleBin"] = "quickAccess.recycle_bin";
    NavPermission["DataManagementHidden"] = "dataManagement.hidden";
    NavPermission["NotesAndEvents"] = "dataManagement.notesEvents";
    NavPermission["SearchReplaceAssignments"] = "dataManagement.searchReplaceAssignments";
    NavPermission["PredefinedProperties"] = "dataManagement.predefinedProperties";
    NavPermission["TagConfiguration"] = "dataManagement.tagConfiguration";
    NavPermission["GDPRDataExtractor"] = "dataManagement.gdprDataExtractor";
    NavPermission["ClassDefinitions"] = "dataManagement.dataModel_classes";
    NavPermission["FieldCollections"] = "dataManagement.dataModel_fieldCollections";
    NavPermission["ObjectBricks"] = "dataManagement.dataModel_objectBricks";
    NavPermission["AssetThumbnails"] = "assetManagement.assetThumbnails";
    NavPermission["ExperienceEcommerceHidden"] = "experienceEcommerce.hidden";
    NavPermission["Mails"] = "experienceEcommerce.emails";
    NavPermission["DocumentTypes"] = "experienceEcommerce.documentTypes";
    NavPermission["WebsiteSettings"] = "experienceEcommerce.websiteSettings";
    NavPermission["Redirects"] = "experienceEcommerce.redirects";
    NavPermission["TranslationsHidden"] = "translations.hidden";
    NavPermission["Translations"] = "translations.translations";
    NavPermission["Appearance"] = "system.appearanceBranding";
    NavPermission["ReportingHidden"] = "reporting.hidden";
    NavPermission["Reports"] = "reporting.reports";
    NavPermission["CustomReportsConfiguration"] = "reporting.customReportsConfiguration";
    NavPermission["SystemHidden"] = "system.hidden";
    NavPermission["UsersHidden"] = "system.users_hidden";
    NavPermission["Users"] = "system.users_users";
    NavPermission["Roles"] = "system.users_roles";
    NavPermission["PerspectiveEditor"] = "system.perspectiveEditor";
    NavPermission["WidgetEditor"] = "system.widgetEditor";
    NavPermission["ApplicationLogger"] = "system.applicationLogger";
    NavPermission["About"] = "system.about";
    NavPermission["SystemSettings"] = "system.systemSettings";
    NavPermission["SearchHidden"] = "search.hidden";
    return NavPermission;
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
"./js/src/core/modules/user/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ROLES_WIDGET: () => (ROLES_WIDGET),
  USERS_WIDGET: () => (USERS_WIDGET)
});
/* ESM import */var _Pimcore_modules_user_management_management_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/user/management/management-container.tsx");
/* ESM import */var _Pimcore_modules_user_roles_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/user/roles/container.tsx");
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _Pimcore_app_module_system_module_system__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/module-system/module-system.ts");
/* ESM import */var _perspectives_enums_nav_permission__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/perspectives/enums/nav-permission.ts");
/* ESM import */var _auth_enums_user_permission__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/auth/enums/user-permission.ts");
/* ESM import */var _Pimcore_modules_auth_profile_widget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/auth/profile/widget.tsx");
/* ESM import */var _Pimcore_modules_auth_profile_profile_container__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/auth/profile/profile-container.tsx");
/* ESM import */var _widget_manager_services_static_widget_restorer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/widget-manager/services/static-widget-restorer.ts");
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









const USERS_WIDGET = {
    name: 'Users',
    id: 'user-management',
    component: 'user-management',
    config: {
        translationKey: 'widget.user-management',
        icon: {
            type: 'name',
            value: 'user'
        }
    }
};
const ROLES_WIDGET = {
    name: 'Roles',
    id: 'role-management',
    component: 'role-management',
    config: {
        translationKey: 'widget.role-management',
        icon: {
            type: 'name',
            value: 'user'
        }
    }
};
_Pimcore_app_module_system_module_system__WEBPACK_IMPORTED_MODULE_4__.moduleSystem.registerModule({
    onInit: ()=>{
        const mainNavRegistryService = _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__.container.get(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_3__.serviceIds.mainNavRegistry);
        mainNavRegistryService.registerMainNavItem({
            path: 'System/User & Roles',
            label: 'navigation.user-and-roles',
            order: 100,
            dividerBottom: true,
            permission: _auth_enums_user_permission__WEBPACK_IMPORTED_MODULE_6__.UserPermission.Users,
            perspectivePermissionHide: _perspectives_enums_nav_permission__WEBPACK_IMPORTED_MODULE_5__.NavPermission.UsersHidden
        });
        mainNavRegistryService.registerMainNavItem({
            path: 'System/User & Roles/Users',
            label: 'navigation.users',
            order: 100,
            className: 'item-style-modifier',
            permission: _auth_enums_user_permission__WEBPACK_IMPORTED_MODULE_6__.UserPermission.Users,
            perspectivePermission: _perspectives_enums_nav_permission__WEBPACK_IMPORTED_MODULE_5__.NavPermission.Users,
            widgetConfig: USERS_WIDGET
        });
        mainNavRegistryService.registerMainNavItem({
            path: 'System/User & Roles/Roles',
            label: 'navigation.roles',
            order: 200,
            permission: _auth_enums_user_permission__WEBPACK_IMPORTED_MODULE_6__.UserPermission.Users,
            perspectivePermission: _perspectives_enums_nav_permission__WEBPACK_IMPORTED_MODULE_5__.NavPermission.Roles,
            widgetConfig: ROLES_WIDGET
        });
        const widgetRegistryService = _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_2__.container.get(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_3__.serviceIds.widgetManager);
        widgetRegistryService.registerWidget({
            name: 'user-management',
            component: _Pimcore_modules_user_management_management_container__WEBPACK_IMPORTED_MODULE_0__.ManagementContainer
        });
        widgetRegistryService.registerWidget({
            name: 'role-management',
            component: _Pimcore_modules_user_roles_container__WEBPACK_IMPORTED_MODULE_1__.RoleContainer
        });
        widgetRegistryService.registerWidget(_Pimcore_modules_auth_profile_widget__WEBPACK_IMPORTED_MODULE_7__.UserProfileWidget);
        _widget_manager_services_static_widget_restorer__WEBPACK_IMPORTED_MODULE_9__.staticWidgetRestorer.registerStaticWidget(_Pimcore_modules_auth_profile_profile_container__WEBPACK_IMPORTED_MODULE_8__.USERPROFILE);
    }
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
"./js/src/core/modules/user/management/tree/tree-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  findNodeByKey: () => (findNodeByKey),
  findParentByKey: () => (findParentByKey)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ const findNodeByKey = (data, key)=>{
    for (const node of data){
        if (parseInt(node.key) === parseInt(key)) {
            return node;
        }
        if (node.children !== undefined && node.children !== null) {
            const found = findNodeByKey(node.children, key);
            if (found !== undefined) {
                return found;
            }
        }
    }
    return undefined;
};
const findParentByKey = function(data, key) {
    let parent = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    for (const node of data){
        if (parseInt(node.key) === parseInt(key)) {
            return parent;
        }
        if (node.children !== undefined && node.children !== null) {
            const found = findParentByKey(node.children, key, node);
            if (found !== null) {
                return found;
            }
        }
    }
    return null;
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
"./js/src/core/types/components/types.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
"./js/src/core/utils/global-context-identifiers.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ASSET_CONTEXT_IDENTIFIER_PREFIX: () => (ASSET_CONTEXT_IDENTIFIER_PREFIX),
  DOCUMENT_CONTEXT_IDENTIFIER_PREFIX: () => (DOCUMENT_CONTEXT_IDENTIFIER_PREFIX),
  OBJECT_CONTEXT_IDENTIFIER_PREFIX: () => (OBJECT_CONTEXT_IDENTIFIER_PREFIX),
  getBaseAssetContextIdentifiers: () => (getBaseAssetContextIdentifiers),
  getBaseDataObjectContextIdentifiers: () => (getBaseDataObjectContextIdentifiers),
  getBaseDocumentContextIdentifiers: () => (getBaseDocumentContextIdentifiers)
});
/* ESM import */var _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/utils/type-utils.ts");
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
const OBJECT_CONTEXT_IDENTIFIER_PREFIX = 'object';
const ASSET_CONTEXT_IDENTIFIER_PREFIX = 'asset';
const DOCUMENT_CONTEXT_IDENTIFIER_PREFIX = 'document';
const getBaseDataObjectContextIdentifiers = (objectData, isGrid)=>{
    const tags = [
        OBJECT_CONTEXT_IDENTIFIER_PREFIX,
        ...isGrid ? [
            `${OBJECT_CONTEXT_IDENTIFIER_PREFIX}_grid`
        ] : []
    ];
    const isFolderType = (objectData === null || objectData === void 0 ? void 0 : objectData.type) === 'folder';
    if (!(0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_0__.isEmptyValue)(objectData === null || objectData === void 0 ? void 0 : objectData.className)) {
        tags.push(`${OBJECT_CONTEXT_IDENTIFIER_PREFIX}_${objectData === null || objectData === void 0 ? void 0 : objectData.className.toLowerCase()}`);
    } else if (isFolderType) {
        tags.push(`${OBJECT_CONTEXT_IDENTIFIER_PREFIX}_folder`);
    }
    return {
        type: OBJECT_CONTEXT_IDENTIFIER_PREFIX,
        subType: isFolderType ? 'folder' : OBJECT_CONTEXT_IDENTIFIER_PREFIX,
        tags
    };
};
const getBaseAssetContextIdentifiers = (assetData, isGrid)=>{
    var _assetData_type;
    const tags = [
        ASSET_CONTEXT_IDENTIFIER_PREFIX,
        ...isGrid ? [
            `${ASSET_CONTEXT_IDENTIFIER_PREFIX}_grid`
        ] : []
    ];
    if (!(0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_0__.isEmptyValue)(assetData === null || assetData === void 0 ? void 0 : assetData.type)) {
        tags.push(`${ASSET_CONTEXT_IDENTIFIER_PREFIX}_${assetData === null || assetData === void 0 ? void 0 : assetData.type.toLowerCase()}`);
    }
    return {
        type: ASSET_CONTEXT_IDENTIFIER_PREFIX,
        subType: !(0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_0__.isEmptyValue)(assetData === null || assetData === void 0 ? void 0 : assetData.type) ? assetData === null || assetData === void 0 ? void 0 : (_assetData_type = assetData.type) === null || _assetData_type === void 0 ? void 0 : _assetData_type.toLowerCase() : ASSET_CONTEXT_IDENTIFIER_PREFIX,
        tags
    };
};
const getBaseDocumentContextIdentifiers = (documentData)=>{
    var _documentData_type;
    const tags = [
        DOCUMENT_CONTEXT_IDENTIFIER_PREFIX
    ];
    if (!(0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_0__.isEmptyValue)(documentData === null || documentData === void 0 ? void 0 : documentData.type)) {
        tags.push(`${DOCUMENT_CONTEXT_IDENTIFIER_PREFIX}_${documentData === null || documentData === void 0 ? void 0 : documentData.type.toLowerCase()}`);
    }
    return {
        type: DOCUMENT_CONTEXT_IDENTIFIER_PREFIX,
        subType: !(0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_0__.isEmptyValue)(documentData === null || documentData === void 0 ? void 0 : documentData.type) ? documentData === null || documentData === void 0 ? void 0 : (_documentData_type = documentData.type) === null || _documentData_type === void 0 ? void 0 : _documentData_type.toLowerCase() : DOCUMENT_CONTEXT_IDENTIFIER_PREFIX,
        tags
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
"./js/src/sdk/modules/auth/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UserPermission: () => (/* reexport safe */ _Pimcore_modules_auth_enums_user_permission__WEBPACK_IMPORTED_MODULE_0__.UserPermission),
  getCurrentUser: () => (/* reexport safe */ _Pimcore_modules_auth_util_user_helper__WEBPACK_IMPORTED_MODULE_4__.getCurrentUser),
  isAllowed: () => (/* reexport safe */ _Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_1__.isAllowed),
  useIsAuthenticated: () => (/* reexport safe */ _Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_3__.useIsAuthenticated),
  useUser: () => (/* reexport safe */ _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_2__.useUser)
});
/* ESM import */var _Pimcore_modules_auth_enums_user_permission__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/auth/enums/user-permission.ts");
/* ESM import */var _Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/auth/permission-helper.ts");
/* ESM import */var _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* ESM import */var _Pimcore_modules_auth_hooks_use_is_authenticated__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-is-authenticated.ts");
/* ESM import */var _Pimcore_modules_auth_util_user_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/auth/util/user-helper.ts");
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
"./js/src/sdk/modules/data-object/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActionColumnDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__WEBPACK_IMPORTED_MODULE_23__.ActionColumnDecorator),
  BaseListing: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__WEBPACK_IMPORTED_MODULE_23__.BaseListing),
  ClassDefinitionSelectionDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__WEBPACK_IMPORTED_MODULE_23__.ClassDefinitionSelectionDecorator),
  ColumnConfigurationDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__WEBPACK_IMPORTED_MODULE_23__.ColumnConfigurationDecorator),
  ContextMenuDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__WEBPACK_IMPORTED_MODULE_23__.ContextMenuDecorator),
  DataComponent: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_shared_tab_manager_tabs_versions_components_data_component_data_component__WEBPACK_IMPORTED_MODULE_27__.DataComponent),
  DataObjectContext: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_26__.DataObjectContext),
  DataObjectEditorWidget: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_widget__WEBPACK_IMPORTED_MODULE_20__.DataObjectEditorWidget),
  DataObjectProvider: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_26__.DataObjectProvider),
  DataObjectSaveDataContext: () => (/* reexport safe */ _Pimcore_modules_data_object_services_processors_data_object_save_data_processor_registry__WEBPACK_IMPORTED_MODULE_3__.DataObjectSaveDataContext),
  DataObjectSaveDataProcessorRegistry: () => (/* reexport safe */ _Pimcore_modules_data_object_services_processors_data_object_save_data_processor_registry__WEBPACK_IMPORTED_MODULE_3__.DataObjectSaveDataProcessorRegistry),
  FolderTabManager: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_types_folder_tab_manager_folder_tab_manager__WEBPACK_IMPORTED_MODULE_14__.FolderTabManager),
  GeneralFiltersDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__WEBPACK_IMPORTED_MODULE_23__.GeneralFiltersDecorator),
  InlineEditDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__WEBPACK_IMPORTED_MODULE_23__.InlineEditDecorator),
  LanguageSelection: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_toolbar_language_selection_language_selection__WEBPACK_IMPORTED_MODULE_16__.LanguageSelection),
  LanguageSelectionContext: () => (/* reexport safe */ _Pimcore_components_language_selection_provider_language_selection_provider__WEBPACK_IMPORTED_MODULE_18__.LanguageSelectionContext),
  LanguageSelectionProvider: () => (/* reexport safe */ _Pimcore_components_language_selection_provider_language_selection_provider__WEBPACK_IMPORTED_MODULE_18__.LanguageSelectionProvider),
  LanguageSelectionWithProvider: () => (/* reexport safe */ _Pimcore_components_language_selection_language_selection_with_provider__WEBPACK_IMPORTED_MODULE_17__.LanguageSelectionWithProvider),
  ListingContainer: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__WEBPACK_IMPORTED_MODULE_23__.ListingContainer),
  ObjectListingBuilder: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_builder_object_listing_builder__WEBPACK_IMPORTED_MODULE_24__.ObjectListingBuilder),
  ObjectTabManager: () => (/* reexport safe */ _Pimcore_modules_data_object_editor_types_object_tab_manager_object_tab_manager__WEBPACK_IMPORTED_MODULE_15__.ObjectTabManager),
  PagingDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__WEBPACK_IMPORTED_MODULE_23__.PagingDecorator),
  RowSelectionDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__WEBPACK_IMPORTED_MODULE_23__.RowSelectionDecorator),
  SaveTaskType: () => (/* reexport safe */ _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_1__.SaveTaskType),
  SortingDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__WEBPACK_IMPORTED_MODULE_23__.SortingDecorator),
  TagFilterDecorator: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__WEBPACK_IMPORTED_MODULE_23__.TagFilterDecorator),
  addPropertyToDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.addPropertyToDataObject),
  addScheduleToDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.addScheduleToDataObject),
  dataObjectReceived: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.dataObjectReceived),
  dataObjectsAdapter: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.dataObjectsAdapter),
  elementTypes: () => (/* reexport safe */ _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_13__.elementTypes),
  listingDefaultProps: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__WEBPACK_IMPORTED_MODULE_23__.listingDefaultProps),
  markObjectDataAsModified: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.markObjectDataAsModified),
  publishDraft: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.publishDraft),
  removeDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.removeDataObject),
  removePropertyFromDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.removePropertyFromDataObject),
  removeScheduleFromDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.removeScheduleFromDataObject),
  resetChanges: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.resetChanges),
  resetDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.resetDataObject),
  resetSchedulesChangesForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.resetSchedulesChangesForDataObject),
  selectDataObjectById: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.selectDataObjectById),
  setActiveTabForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.setActiveTabForDataObject),
  setDraftData: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.setDraftData),
  setModifiedCells: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.setModifiedCells),
  setPropertiesForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.setPropertiesForDataObject),
  setSchedulesForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.setSchedulesForDataObject),
  slice: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.slice),
  transformApiDataToNode: () => (/* reexport safe */ _Pimcore_modules_data_object_tree_utils_transform_api_data_to_node__WEBPACK_IMPORTED_MODULE_22__.transformApiDataToNode),
  transformApiDataToNodes: () => (/* reexport safe */ _Pimcore_modules_data_object_tree_utils_transform_api_data_to_node__WEBPACK_IMPORTED_MODULE_22__.transformApiDataToNodes),
  unpublishDraft: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.unpublishDraft),
  updateKey: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.updateKey),
  updatePropertyForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.updatePropertyForDataObject),
  updateScheduleForDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__.updateScheduleForDataObject),
  useAddObject: () => (/* reexport safe */ _Pimcore_modules_data_object_actions_add_object_use_add_object__WEBPACK_IMPORTED_MODULE_0__.useAddObject),
  useClassDefinitionSelection: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_25__.useClassDefinitionSelection),
  useClassDefinitionSelectionOptional: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_25__.useClassDefinitionSelectionOptional),
  useClassDefinitions: () => (/* reexport safe */ _Pimcore_modules_data_object_utils_provider_class_defintions_use_class_definitions__WEBPACK_IMPORTED_MODULE_28__.useClassDefinitions),
  useCustomLayouts: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_custom_layouts__WEBPACK_IMPORTED_MODULE_6__.useCustomLayouts),
  useDataObject: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_data_object__WEBPACK_IMPORTED_MODULE_7__.useDataObject),
  useDataObjectDraft: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_8__.useDataObjectDraft),
  useDataObjectHelper: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_9__.useDataObjectHelper),
  useGlobalDataObjectContext: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_global_data_object_context__WEBPACK_IMPORTED_MODULE_10__.useGlobalDataObjectContext),
  useInlineEditApiUpdate: () => (/* reexport safe */ _Pimcore_modules_data_object_listing_listing_container__WEBPACK_IMPORTED_MODULE_23__.useInlineEditApiUpdate),
  useLanguageSelection: () => (/* reexport safe */ _Pimcore_components_language_selection_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_19__.useLanguageSelection),
  useModifiedObjectDataDraft: () => (/* reexport safe */ _Pimcore_modules_data_object_draft_hooks_use_modified_object_data__WEBPACK_IMPORTED_MODULE_5__.useModifiedObjectDataDraft),
  useModifiedObjectDataReducers: () => (/* reexport safe */ _Pimcore_modules_data_object_draft_hooks_use_modified_object_data__WEBPACK_IMPORTED_MODULE_5__.useModifiedObjectDataReducers),
  useQuantityValueUnits: () => (/* reexport safe */ _Pimcore_modules_data_object_hooks_use_quantity_value_units__WEBPACK_IMPORTED_MODULE_11__.useQuantityValueUnits),
  useSave: () => (/* reexport safe */ _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_1__.useSave),
  withActionStates: () => (/* reexport safe */ _Pimcore_modules_data_object_tree_node_with_action_states__WEBPACK_IMPORTED_MODULE_21__.withActionStates)
});
/* ESM import */var _Pimcore_modules_data_object_actions_add_object_use_add_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/data-object/actions/add-object/use-add-object.tsx");
/* ESM import */var _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/data-object/actions/save/use-save.tsx");
/* ESM import */var _Pimcore_modules_data_object_events_post_update_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/events/post-update-event.ts");
/* ESM import */var _Pimcore_modules_data_object_services_processors_data_object_save_data_processor_registry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/services/processors/data-object-save-data-processor-registry.ts");
/* ESM import */var _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/data-object-draft-slice.tsx");
/* ESM import */var _Pimcore_modules_data_object_draft_hooks_use_modified_object_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/draft/hooks/use-modified-object-data.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_custom_layouts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-custom-layouts.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-helper.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_global_data_object_context__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-global-data-object-context.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_quantity_value_units__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-quantity-value-units.ts");
/* ESM import */var _Pimcore_types_components_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/types/components/types.ts");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_types_folder_tab_manager_folder_tab_manager__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/folder/tab-manager/folder-tab-manager.ts");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_object_tab_manager__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/object-tab-manager.ts");
/* ESM import */var _Pimcore_modules_data_object_editor_toolbar_language_selection_language_selection__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/language-selection/language-selection.tsx");
/* ESM import */var _Pimcore_components_language_selection_language_selection_with_provider__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/components/language-selection/language-selection-with-provider.tsx");
/* ESM import */var _Pimcore_components_language_selection_provider_language_selection_provider__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/components/language-selection/provider/language-selection-provider.tsx");
/* ESM import */var _Pimcore_components_language_selection_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/components/language-selection/provider/use-language-selection.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_widget__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./js/src/core/modules/data-object/editor/widget.tsx");
/* ESM import */var _Pimcore_modules_data_object_tree_node_with_action_states__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./js/src/core/modules/data-object/tree/node/with-action-states.tsx");
/* ESM import */var _Pimcore_modules_data_object_tree_utils_transform_api_data_to_node__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./js/src/core/modules/data-object/tree/utils/transform-api-data-to-node.ts");
/* ESM import */var _Pimcore_modules_data_object_listing_listing_container__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("./js/src/core/modules/data-object/listing/listing-container.tsx");
/* ESM import */var _Pimcore_modules_data_object_listing_builder_object_listing_builder__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("./js/src/core/modules/data-object/listing/builder/object-listing-builder.ts");
/* ESM import */var _Pimcore_modules_data_object_listing_decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection.tsx");
/* ESM import */var _Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_shared_tab_manager_tabs_versions_components_data_component_data_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__("./js/src/core/modules/data-object/editor/shared-tab-manager/tabs/versions/components/data-component/data-component.tsx");
/* ESM import */var _Pimcore_modules_data_object_utils_provider_class_defintions_use_class_definitions__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__("./js/src/core/modules/data-object/utils/provider/class-defintions/use-class-definitions.tsx");
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
"./js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/listing/listing-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ListingContainer: () => (ListingContainer),
  TAB_LISTING: () => (TAB_LISTING)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_asset_listing_listing_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/listing/listing-container.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
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



const ListingContainer = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_asset_listing_listing_container__WEBPACK_IMPORTED_MODULE_1__.ListingContainer, {}, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/listing/listing-container.tsx",
        lineNumber: 15,
        columnNumber: 10
    }, undefined);
};
_c = ListingContainer;
const TAB_LISTING = {
    key: 'listing',
    label: 'folder.folder-editor-tabs.view',
    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ListingContainer, {}, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/listing/listing-container.tsx",
        lineNumber: 20,
        columnNumber: 13
    }, undefined),
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
        value: 'list'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/listing/listing-container.tsx",
        lineNumber: 21,
        columnNumber: 9
    }, undefined),
    isDetachable: false
};
var _c;
$RefreshReg$(_c, "ListingContainer");

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
"./js/src/core/modules/auth/profile/title/title-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TitleContainer: () => (TitleContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_widget_manager_title_tab_title_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/widget-manager/title/tab-title-container.tsx");
/* ESM import */var _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
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



const TitleContainer = (props)=>{
    _s();
    const { node } = props;
    const user = (0,_Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_3__.useUser)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_widget_manager_title_tab_title_container__WEBPACK_IMPORTED_MODULE_2__.TabTitleContainer, {
        modified: (user === null || user === void 0 ? void 0 : user.modified) ?? false,
        node: node
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/auth/profile/title/title-container.tsx",
        lineNumber: 19,
        columnNumber: 10
    }, undefined);
};
_s(TitleContainer, "BPnln+wUpxLjLAxQmw7xYz9C+QI=", false, function() {
    return [
        _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_3__.useUser
    ];
});
_c = TitleContainer;
var _c;
$RefreshReg$(_c, "TitleContainer");

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
"./js/src/core/modules/auth/profile/widget.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UserProfileWidget: () => (UserProfileWidget)
});
/* ESM import */var _Pimcore_modules_auth_profile_title_title_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/auth/profile/title/title-container.tsx");
/* ESM import */var _Pimcore_modules_auth_profile_profile_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/auth/profile/profile-container.tsx");
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

const UserProfileWidget = {
    name: 'user-profile',
    component: _Pimcore_modules_auth_profile_profile_container__WEBPACK_IMPORTED_MODULE_1__.ProfileContainer,
    titleComponent: _Pimcore_modules_auth_profile_title_title_container__WEBPACK_IMPORTED_MODULE_0__.TitleContainer
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
"./js/src/core/modules/data-object/actions/add-object/use-add-object.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAddObject: () => (useAddObject)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/element-tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var _Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_11__);
/* ESM import */var _data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice.gen.ts");
/* ESM import */var _hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-helper.ts");
/* ESM import */var _utils_provider_class_defintions_use_class_definitions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/data-object/utils/provider/class-defintions/use-class-definitions.tsx");
/* ESM import */var _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
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















const useAddObject = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation)();
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__.useFormModal)();
    const [addDataObjectMutation] = (0,_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_12__.useDataObjectAddMutation)();
    const dispatch = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_1__.useAppDispatch)();
    const { openDataObject } = (0,_hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_13__.useDataObjectHelper)();
    const { isTreeActionAllowed } = (0,_Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_7__.useTreePermission)();
    const { getClassDefinitionsForCurrentUser } = (0,_utils_provider_class_defintions_use_class_definitions__WEBPACK_IMPORTED_MODULE_14__.useClassDefinitions)();
    const getClassEntries = (node)=>{
        let classHierarchy = [];
        const classDefinitions = getClassDefinitionsForCurrentUser();
        const structuredClassDefinitions = [
            ...classDefinitions
        ].sort((a, b)=>a.name.localeCompare(b.name)).reduce((acc, classDefinition)=>{
            const groupName = (0,lodash__WEBPACK_IMPORTED_MODULE_9__.isNil)(classDefinition.group) || (0,lodash__WEBPACK_IMPORTED_MODULE_9__.isEmpty)(classDefinition.group) ? 'undefined' : classDefinition.group;
            if (acc[groupName] === undefined) {
                acc[groupName] = [];
            }
            acc[groupName].push(classDefinition);
            return acc;
        }, {});
        if (structuredClassDefinitions.undefined !== undefined) {
            classHierarchy = structuredClassDefinitions.undefined.map((classDefinition)=>getDataObjectEntry(classDefinition, node));
        }
        for (const [group, classDefinitions] of Object.entries(structuredClassDefinitions)){
            if (group !== 'undefined') {
                classHierarchy.push({
                    label: t(group),
                    key: 'add-object-group-' + group,
                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                        value: 'folder'
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, undefined),
                    children: classDefinitions.map((classDefinition)=>getDataObjectEntry(classDefinition, node))
                });
            }
        }
        return classHierarchy;
    };
    const getDataObjectEntry = (classDefinition, node)=>{
        return {
            label: t(classDefinition.name),
            key: classDefinition.id,
            icon: classDefinition.icon.value === 'class' ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                subIconName: "new",
                subIconVariant: 'green',
                value: "data-object"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                lineNumber: 72,
                columnNumber: 54
            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                subIconName: "new",
                subIconVariant: 'green',
                ...classDefinition.icon
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                lineNumber: 72,
                columnNumber: 128
            }, undefined),
            onClick: ()=>{
                const parentId = parseInt(node.id);
                createDataObject(classDefinition, parentId);
            }
        };
    };
    const addObject = (className, classId, parentId, onFinish)=>{
        modal.input({
            title: t('data-object.create-data-object', {
                className
            }),
            label: t('form.label.new-item'),
            rule: {
                required: true,
                message: t('form.validation.required')
            },
            onOk: async (value)=>{
                await createDataObjectMutation(classId, value, parentId);
                onFinish === null || onFinish === void 0 ? void 0 : onFinish(value);
            }
        });
    };
    const createDataObject = (classDefinition, parentId, onFinish)=>{
        addObject(classDefinition.name, classDefinition.id, parentId, onFinish);
    };
    const createDataObjectMutation = async (classId, name, parentId)=>{
        const createDataObjectTask = addDataObjectMutation({
            parentId,
            dataObjectAddParameters: {
                key: name,
                classId,
                type: 'object'
            }
        });
        try {
            const response = await createDataObjectTask;
            if (response.error !== undefined) {
                (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__.ApiError(response.error));
                return;
            }
            const { id } = response.data;
            void openDataObject({
                config: {
                    id
                }
            });
            dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_2__.refreshNodeChildren)({
                nodeId: String(parentId),
                elementType: 'data-object'
            }));
        } catch (error) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__.GeneralError('Error creating data object'));
        }
    };
    const isAddObjectHidden = (node)=>{
        return !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_8__.TreePermission.AddObject) || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__.checkElementPermission)(node.permissions, 'create') || (0,lodash__WEBPACK_IMPORTED_MODULE_9__.isEmpty)(getClassDefinitionsForCurrentUser());
    };
    const addObjectTreeContextMenuItem = (node)=>{
        return {
            label: t('data-object.tree.context-menu.add-object'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_15__.ContextMenuActionName.addObject,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: 'folder'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                lineNumber: 136,
                columnNumber: 13
            }, undefined),
            hidden: isAddObjectHidden(node),
            children: getClassEntries(node)
        };
    };
    return {
        addObjectTreeContextMenuItem,
        addObject
    };
};
_s(useAddObject, "+2rRvs6VzSf3x9TA3Bp4UiqX0Nc=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__.useFormModal,
        _data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_12__.useDataObjectAddMutation,
        _sdk_app__WEBPACK_IMPORTED_MODULE_1__.useAppDispatch,
        _hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_13__.useDataObjectHelper,
        _Pimcore_components_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_7__.useTreePermission,
        _utils_provider_class_defintions_use_class_definitions__WEBPACK_IMPORTED_MODULE_14__.useClassDefinitions
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
"./js/src/core/modules/data-object/editor/editor-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditorContainer: () => (EditorContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_data_object_editor_editor_container_editor_container_inner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_custom_layouts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-custom-layouts.ts");
/* ESM import */var _Pimcore_modules_data_object_editor_toolbar_context_menu_provider_layout_selection_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider.tsx");
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




const EditorContainer = (param)=>{
    let { id } = param;
    _s();
    const { getDefaultLayoutId, isLoading } = (0,_Pimcore_modules_data_object_hooks_use_custom_layouts__WEBPACK_IMPORTED_MODULE_3__.useCustomLayouts)(id);
    const defaultLayoutId = getDefaultLayoutId();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_toolbar_context_menu_provider_layout_selection_provider__WEBPACK_IMPORTED_MODULE_4__.LayoutSelectionProvider, {
        defaultLayout: defaultLayoutId,
        isLoading: isLoading,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_editor_container_editor_container_inner__WEBPACK_IMPORTED_MODULE_2__.EditorContainerInner, {
            id: id
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, undefined)
    }, defaultLayoutId, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container.tsx",
        lineNumber: 23,
        columnNumber: 10
    }, undefined);
};
_s(EditorContainer, "yxwzD4/aHSsQmsTK8HpSxunojgw=", false, function() {
    return [
        _Pimcore_modules_data_object_hooks_use_custom_layouts__WEBPACK_IMPORTED_MODULE_3__.useCustomLayouts
    ];
});
_c = EditorContainer;

var _c;
$RefreshReg$(_c, "EditorContainer");

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
"./js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditorContainerInner: () => (EditorContainerInner)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-is-active-main-widget.ts");
/* ESM import */var _data_object_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_global_data_object_context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-global-data-object-context.ts");
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tabs_container__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tabs-container.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/toolbar.tsx");
/* ESM import */var _Pimcore_modules_element_editor_layouts_tabs_toolbar_view__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx");
/* ESM import */var _Pimcore_components_language_selection_provider_language_selection_provider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/language-selection/provider/language-selection-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_edit_form_provider_edit_form_provider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_inheritance_state_provider_inheritance_state_provider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/inheritance-state-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_save_provider_save_provider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/save-provider.tsx");
/* ESM import */var _Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/components/alert/alert.tsx");
/* ESM import */var _Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* ESM import */var _Pimcore_utils_global_context_identifiers__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/utils/global-context-identifiers.ts");
/* ESM import */var _Pimcore_modules_asset_editor_types_folder_tab_manager_tabs_listing_listing_container__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/listing/listing-container.tsx");
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


















const EditorContainerInner = (props)=>{
    _s();
    const { id } = props;
    const { isLoading, isError, dataObject, editorType, activeTab } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_6__.useDataObjectDraft)(id);
    const isWidgetActive = (0,_Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__WEBPACK_IMPORTED_MODULE_3__.useIsActiveMainWidget)();
    const { setContext, removeContext } = (0,_Pimcore_modules_data_object_hooks_use_global_data_object_context__WEBPACK_IMPORTED_MODULE_7__.useGlobalDataObjectContext)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return ()=>{
            removeContext();
        };
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isWidgetActive) {
            setContext({
                id,
                ...!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(dataObject) && {
                    contextIdentifiers: (0,_Pimcore_utils_global_context_identifiers__WEBPACK_IMPORTED_MODULE_17__.getBaseDataObjectContextIdentifiers)(dataObject, activeTab === _Pimcore_modules_asset_editor_types_folder_tab_manager_tabs_listing_listing_container__WEBPACK_IMPORTED_MODULE_18__.TAB_LISTING.key)
                }
            });
        }
        return ()=>{
            if (!isWidgetActive) {
                removeContext();
            }
        };
    }, [
        isWidgetActive,
        activeTab,
        dataObject
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_5__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
            lineNumber: 66,
            columnNumber: 12
        }, undefined);
    }
    if (isError) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_5__.Content, {
            padded: true,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_15__.Alert, {
                message: "Error: Loading of data object failed",
                type: "error"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
            lineNumber: 69,
            columnNumber: 12
        }, undefined);
    }
    if (dataObject === undefined || editorType === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_data_object_provider__WEBPACK_IMPORTED_MODULE_4__.DataObjectProvider, {
        id: id,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_save_provider_save_provider__WEBPACK_IMPORTED_MODULE_14__.SaveProvider, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_edit_form_provider_edit_form_provider__WEBPACK_IMPORTED_MODULE_12__.EditFormProvider, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_types_object_tab_manager_tabs_edit_providers_inheritance_state_provider_inheritance_state_provider__WEBPACK_IMPORTED_MODULE_13__.InheritanceStateProvider, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_language_selection_provider_language_selection_provider__WEBPACK_IMPORTED_MODULE_11__.LanguageSelectionProvider, {
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_editor_layouts_tabs_toolbar_view__WEBPACK_IMPORTED_MODULE_10__.TabsToolbarView, {
                            dataTestId: `data-object-editor-${(0,_Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_16__.createSafeTestIdString)(id.toString())}`,
                            renderTabbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_editor_shared_tab_manager_tabs_container__WEBPACK_IMPORTED_MODULE_8__.TabsContainer, {
                                elementEditorType: editorType
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                                lineNumber: 81,
                                columnNumber: 121
                            }, void 0),
                            renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_editor_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_9__.Toolbar, {}, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                                lineNumber: 81,
                                columnNumber: 186
                            }, void 0)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                            lineNumber: 81,
                            columnNumber: 15
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                        lineNumber: 80,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/editor-container/editor-container-inner.tsx",
        lineNumber: 76,
        columnNumber: 10
    }, undefined);
};
_s(EditorContainerInner, "j2nZaD9PsIzfpjfOZG3xchLIp1c=", false, function() {
    return [
        _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_6__.useDataObjectDraft,
        _Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__WEBPACK_IMPORTED_MODULE_3__.useIsActiveMainWidget,
        _Pimcore_modules_data_object_hooks_use_global_data_object_context__WEBPACK_IMPORTED_MODULE_7__.useGlobalDataObjectContext
    ];
});
_c = EditorContainerInner;

var _c;
$RefreshReg$(_c, "EditorContainerInner");

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
"./js/src/core/modules/data-object/editor/title/title-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TitleContainer: () => (TitleContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_widget_manager_title_tab_title_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/widget-manager/title/tab-title-container.tsx");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
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




const TitleContainer = (props)=>{
    _s();
    const { node } = props;
    const { dataObject } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_3__.useDataObjectDraft)(node.getConfig().id);
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const nodeName = node.getName();
    node.getName = ()=>{
        if ((dataObject === null || dataObject === void 0 ? void 0 : dataObject.parentId) === 0) {
            node.getName = ()=>t('home');
        }
        return (dataObject === null || dataObject === void 0 ? void 0 : dataObject.key) ?? nodeName;
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_widget_manager_title_tab_title_container__WEBPACK_IMPORTED_MODULE_2__.TabTitleContainer, {
        modified: (dataObject === null || dataObject === void 0 ? void 0 : dataObject.modified) ?? false,
        node: node
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/title/title-container.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, undefined);
};
_s(TitleContainer, "FXFEc6BtxaeTESg8NhgqDkZuLFE=", false, function() {
    return [
        _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_3__.useDataObjectDraft,
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation
    ];
});
_c = TitleContainer;
var _c;
$RefreshReg$(_c, "TitleContainer");

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
"./js/src/core/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LayoutSelectionContext: () => (LayoutSelectionContext),
  LayoutSelectionProvider: () => (LayoutSelectionProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/content/content.tsx");
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


const LayoutSelectionContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    currentLayout: null,
    setCurrentLayout: ()=>{}
});
const LayoutSelectionProvider = (param)=>{
    let { children, defaultLayout, isLoading } = param;
    _s();
    const [currentLayout, setCurrentLayout] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const isInitializedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isInitializedRef.current && !isLoading && defaultLayout !== null) {
            setCurrentLayout(defaultLayout);
            isInitializedRef.current = true;
        }
    }, [
        defaultLayout,
        isLoading
    ]);
    const value = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            currentLayout,
            setCurrentLayout
        }), [
        currentLayout
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LayoutSelectionContext.Provider, {
        value: value,
        children: isLoading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_2__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider.tsx",
            lineNumber: 35,
            columnNumber: 20
        }, undefined) : children
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider.tsx",
        lineNumber: 34,
        columnNumber: 10
    }, undefined);
};
_s(LayoutSelectionProvider, "Xa+WCP1AVEKu66dD9mXJQYMSD/0=");
_c = LayoutSelectionProvider;
var _c;
$RefreshReg$(_c, "LayoutSelectionProvider");

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
"./js/src/core/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useLayoutSelection: () => (useLayoutSelection)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_data_object_editor_toolbar_context_menu_provider_layout_selection_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/data-object/editor/toolbar/context-menu/provider/layout-selection-provider.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var _s = $RefreshSig$();


const useLayoutSelection = ()=>{
    _s();
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Pimcore_modules_data_object_editor_toolbar_context_menu_provider_layout_selection_provider__WEBPACK_IMPORTED_MODULE_1__.LayoutSelectionContext);
};
_s(useLayoutSelection, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");

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
"./js/src/core/modules/data-object/editor/toolbar/language-selection/language-selection.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LanguageSelection: () => (LanguageSelection)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_language_selection_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/language-selection/provider/use-language-selection.tsx");
/* ESM import */var _Pimcore_modules_element_components_language_selection_permission_based_language_selection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/components/language-selection/permission-based-language-selection.tsx");
/* ESM import */var _Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-draft.ts");
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





const LanguageSelection = ()=>{
    _s();
    const { hasLocalizedFields } = (0,_Pimcore_components_language_selection_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_2__.useLanguageSelection)();
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_4__.DataObjectContext);
    const { editorType } = (0,_Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_5__.useDataObjectDraft)(id);
    if (hasLocalizedFields || (editorType === null || editorType === void 0 ? void 0 : editorType.name) === 'folder') {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_components_language_selection_permission_based_language_selection__WEBPACK_IMPORTED_MODULE_3__.PermissionBasedLanguageSelection, {}, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/language-selection/language-selection.tsx",
            lineNumber: 27,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
};
_s(LanguageSelection, "lIJ7jviD/ABi1jXt+BxBKpQOnIk=", false, function() {
    return [
        _Pimcore_components_language_selection_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_2__.useLanguageSelection,
        _Pimcore_modules_data_object_hooks_use_data_object_draft__WEBPACK_IMPORTED_MODULE_5__.useDataObjectDraft
    ];
});
_c = LanguageSelection;
var _c;
$RefreshReg$(_c, "LanguageSelection");

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
"./js/src/core/modules/data-object/editor/toolbar/toolbar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Toolbar: () => (Toolbar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_modules_element_editor_shared_components_workflow_modal_workflow_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx");
/* ESM import */var _Pimcore_modules_element_editor_shared_components_workflow_provider_workflow_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/editor/shared-components/workflow/provider/workflow-provider.tsx");
/* ESM import */var _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/component-registry/component-config.tsx");
/* ESM import */var _Pimcore_modules_app_component_registry_slot_renderer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/app/component-registry/slot-renderer.tsx");
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







const Toolbar = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_2__.Toolbar, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_editor_shared_components_workflow_provider_workflow_provider__WEBPACK_IMPORTED_MODULE_5__.WorkFlowProvider, {
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_component_registry_slot_renderer__WEBPACK_IMPORTED_MODULE_7__.SlotRenderer, {
                        slot: _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_6__.componentConfig.dataObject.editor.toolbar.slots.left.name
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                    align: "center",
                    gap: 'extra-small',
                    style: {
                        height: '32px'
                    },
                    vertical: false,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_component_registry_slot_renderer__WEBPACK_IMPORTED_MODULE_7__.SlotRenderer, {
                        slot: _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_6__.componentConfig.dataObject.editor.toolbar.slots.right.name
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_editor_shared_components_workflow_modal_workflow_modal__WEBPACK_IMPORTED_MODULE_4__.WorkflowModal, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/toolbar/toolbar.tsx",
        lineNumber: 19,
        columnNumber: 10
    }, undefined);
};
_c = Toolbar;
var _c;
$RefreshReg$(_c, "Toolbar");

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
"./js/src/core/modules/data-object/editor/widget.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DataObjectEditorWidget: () => (DataObjectEditorWidget)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_data_object_editor_editor_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/data-object/editor/editor-container.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_title_title_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/editor/title/title-container.tsx");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/data-object-provider.tsx");
/* ESM import */var _Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/data-object/data-object-draft-slice.tsx");
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






const DataObjectEditorWidget = {
    name: 'data-object-editor',
    component: _Pimcore_modules_data_object_editor_editor_container__WEBPACK_IMPORTED_MODULE_1__.EditorContainer,
    titleComponent: _Pimcore_modules_data_object_editor_title_title_container__WEBPACK_IMPORTED_MODULE_2__.TitleContainer,
    defaultGlobalContext: false,
    isModified: (tabNode)=>{
        const config = tabNode.getConfig();
        const dataObject = (0,_Pimcore_modules_data_object_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_6__.selectDataObjectById)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_3__.store.getState(), config.id);
        return (dataObject === null || dataObject === void 0 ? void 0 : dataObject.modified) ?? false;
    },
    getContextProvider: (context, children)=>{
        const config = context.config;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_data_object_data_object_provider__WEBPACK_IMPORTED_MODULE_5__.DataObjectProvider, {
            id: config.id,
            children: children
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/editor/widget.tsx",
            lineNumber: 29,
            columnNumber: 12
        }, undefined);
    }
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
"./js/src/core/modules/data-object/listing/column-mapper/use-column-mapper.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDataObjectColumnMapper: () => (useDataObjectColumnMapper)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_components_language_selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/language-selection/index.ts");
/* ESM import */var _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_column_mapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-column-mapper.tsx");
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var _s = $RefreshSig$();




const useDataObjectColumnMapper = ()=>{
    _s();
    const languageSelection = (0,_Pimcore_components_language_selection__WEBPACK_IMPORTED_MODULE_1__.useLanguageSelection)();
    const currentLanguageRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(languageSelection.currentLanguage);
    const { shouldMapDataToColumn: baseShouldMapDataToColumn, encodeColumnIdentifier: baseEncodeColumnIdentifier, decodeColumnIdentifier: baseDecodeColumnIdentifier, ...props } = (0,_Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_column_mapper__WEBPACK_IMPORTED_MODULE_2__.useColumnMapper)();
    currentLanguageRef.current = languageSelection.currentLanguage;
    const shouldMapDataToColumn = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((data, column)=>{
        const currentLanguage = currentLanguageRef.current;
        if (column.type === 'dataobject.classificationstore') {
            var _data_additionalAttributes, _column_config, _data_additionalAttributes1, _column_config1;
            const dataKey = data.key.split('.')[0];
            if (column.localizable && column.locale === 'default') {
                var _data_additionalAttributes2, _column_config2, _data_additionalAttributes3, _column_config3;
                return dataKey === column.key && ((_data_additionalAttributes2 = data.additionalAttributes) === null || _data_additionalAttributes2 === void 0 ? void 0 : _data_additionalAttributes2.keyId) === ((_column_config2 = column.config) === null || _column_config2 === void 0 ? void 0 : _column_config2.keyId) && ((_data_additionalAttributes3 = data.additionalAttributes) === null || _data_additionalAttributes3 === void 0 ? void 0 : _data_additionalAttributes3.groupId) === ((_column_config3 = column.config) === null || _column_config3 === void 0 ? void 0 : _column_config3.groupId) && data.locale === null;
            }
            if (column.localizable && (column.locale === null || column.locale === undefined)) {
                var _data_additionalAttributes4, _column_config4, _data_additionalAttributes5, _column_config5;
                return dataKey === column.key && ((_data_additionalAttributes4 = data.additionalAttributes) === null || _data_additionalAttributes4 === void 0 ? void 0 : _data_additionalAttributes4.keyId) === ((_column_config4 = column.config) === null || _column_config4 === void 0 ? void 0 : _column_config4.keyId) && ((_data_additionalAttributes5 = data.additionalAttributes) === null || _data_additionalAttributes5 === void 0 ? void 0 : _data_additionalAttributes5.groupId) === ((_column_config5 = column.config) === null || _column_config5 === void 0 ? void 0 : _column_config5.groupId) && data.locale === currentLanguage;
            }
            if (column.localizable) {
                var _data_additionalAttributes6, _column_config6, _data_additionalAttributes7, _column_config7;
                return dataKey === column.key && ((_data_additionalAttributes6 = data.additionalAttributes) === null || _data_additionalAttributes6 === void 0 ? void 0 : _data_additionalAttributes6.keyId) === ((_column_config6 = column.config) === null || _column_config6 === void 0 ? void 0 : _column_config6.keyId) && ((_data_additionalAttributes7 = data.additionalAttributes) === null || _data_additionalAttributes7 === void 0 ? void 0 : _data_additionalAttributes7.groupId) === ((_column_config7 = column.config) === null || _column_config7 === void 0 ? void 0 : _column_config7.groupId) && data.locale === column.locale;
            }
            return dataKey === column.key && ((_data_additionalAttributes = data.additionalAttributes) === null || _data_additionalAttributes === void 0 ? void 0 : _data_additionalAttributes.keyId) === ((_column_config = column.config) === null || _column_config === void 0 ? void 0 : _column_config.keyId) && ((_data_additionalAttributes1 = data.additionalAttributes) === null || _data_additionalAttributes1 === void 0 ? void 0 : _data_additionalAttributes1.groupId) === ((_column_config1 = column.config) === null || _column_config1 === void 0 ? void 0 : _column_config1.groupId);
        }
        if (column.localizable && (column.locale === null || column.locale === undefined)) {
            return data.key === column.key && currentLanguage === data.locale;
        }
        return baseShouldMapDataToColumn(data, column);
    }, [
        baseShouldMapDataToColumn
    ]);
    const encodeColumnIdentifier = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((column)=>{
        if (column.type === 'dataobject.classificationstore') {
            var _column_config, _column_config1;
            return JSON.stringify({
                uuid: (0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_3__.uuid)(),
                key: column.key,
                keyId: (_column_config = column.config) === null || _column_config === void 0 ? void 0 : _column_config.keyId,
                groupId: (_column_config1 = column.config) === null || _column_config1 === void 0 ? void 0 : _column_config1.groupId,
                locale: column.locale ?? null,
                type: column.type.replaceAll('.', '*||*')
            });
        }
        return baseEncodeColumnIdentifier(column);
    }, [
        baseEncodeColumnIdentifier
    ]);
    const decodeColumnIdentifier = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((columnIdentifier, selectedColumns)=>{
        var _data_type;
        try {
            JSON.parse(columnIdentifier);
        } catch (e) {
            return undefined;
        }
        const data = JSON.parse(columnIdentifier);
        const type = (_data_type = data.type) === null || _data_type === void 0 ? void 0 : _data_type.replaceAll('*||*', '.');
        if (type === 'dataobject.classificationstore') {
            return selectedColumns.find((column)=>{
                var _column_config, _column_config1;
                return column.key === data.key && column.type === 'dataobject.classificationstore' && ((_column_config = column.config) === null || _column_config === void 0 ? void 0 : _column_config.keyId) === data.keyId && ((_column_config1 = column.config) === null || _column_config1 === void 0 ? void 0 : _column_config1.groupId) === data.groupId && (column.locale ?? null) === data.locale;
            });
        }
        return baseDecodeColumnIdentifier(columnIdentifier, selectedColumns);
    }, [
        baseDecodeColumnIdentifier
    ]);
    return {
        ...props,
        decodeColumnIdentifier,
        encodeColumnIdentifier,
        shouldMapDataToColumn
    };
};
_s(useDataObjectColumnMapper, "/CS5FPRBGWO2OCtwbF+AdymcXhs=", false, function() {
    return [
        _Pimcore_components_language_selection__WEBPACK_IMPORTED_MODULE_1__.useLanguageSelection,
        _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_column_mapper__WEBPACK_IMPORTED_MODULE_2__.useColumnMapper
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
"./js/src/core/modules/data-object/listing/decorator/action-column/view-layer/components/grid/hooks/with-action-column-configuration.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withActionColumnConfiguration: () => (withActionColumnConfiguration)
});
/* ESM import */var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/@tanstack/react-table/@tanstack/react-table");
/* ESM import */var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tanstack_react_table__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_1__);
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

const columnHelper = (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_0__.createColumnHelper)();
const withActionColumnConfiguration = (useBaseHook)=>{
    var _s = $RefreshSig$();
    const useActionColumnExtension = ()=>{
        _s();
        const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation)();
        const { transformGridColumnDefinition: baseTransformGridColumnDefinition, ...baseMethods } = useBaseHook();
        const transformGridColumnDefinition = (columnDefinition)=>{
            const baseColumnConfiguration = baseTransformGridColumnDefinition(columnDefinition);
            baseColumnConfiguration.push(columnHelper.accessor('actions', {
                header: t('actions.open'),
                enableSorting: false,
                meta: {
                    type: 'data-object-actions'
                },
                size: 65
            }));
            return baseColumnConfiguration;
        };
        return {
            ...baseMethods,
            transformGridColumnDefinition
        };
    };
    _s(useActionColumnExtension, "OM8xzguqZ1r85ICyYcpBufo5Wxw=", false, function() {
        return [
            react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation,
            useBaseHook
        ];
    });
    return useActionColumnExtension;
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
"./js/src/core/modules/data-object/listing/decorator/column-configuration/column-configuration-decorator.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ColumnConfigurationDecorator: () => (ColumnConfigurationDecorator)
});
/* ESM import */var _configuration_layer_with_column_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx");
/* ESM import */var _context_layer_with_available_columns_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/context-layer/with-available-columns-context.tsx");
/* ESM import */var _view_layer_components_grid_hooks_use_grid_options_with_advanced_column_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/with-advanced-column-config.tsx");
/* ESM import */var _view_layer_components_grid_hooks_use_grid_options_hooks_with_configuration_sidebar_entry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/hooks/with-configuration-sidebar-entry.tsx");
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



const ColumnConfigurationDecorator = (props)=>{
    const { ConfigurationComponent, ContextComponent, useGridOptions, useSidebarOptions, ...baseProps } = props;
    return {
        ...baseProps,
        ConfigurationComponent: (0,_configuration_layer_with_column_configuration__WEBPACK_IMPORTED_MODULE_0__.WithColumnConfiguration)(ConfigurationComponent),
        ContextComponent: (0,_context_layer_with_available_columns_context__WEBPACK_IMPORTED_MODULE_1__.WithAvailableColumnsContext)(ContextComponent),
        useGridOptions: (0,_view_layer_components_grid_hooks_use_grid_options_with_advanced_column_config__WEBPACK_IMPORTED_MODULE_2__.withAdvancedColumnConfig)(useGridOptions),
        useSidebarOptions: (0,_view_layer_components_grid_hooks_use_grid_options_hooks_with_configuration_sidebar_entry__WEBPACK_IMPORTED_MODULE_3__.withConfigurationSidebarEntry)(useSidebarOptions)
    };
};
_c = ColumnConfigurationDecorator;
var _c;
$RefreshReg$(_c, "ColumnConfigurationDecorator");

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
"./js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/components/column-config-loader/column-config-loader.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ColumnConfigLoader: () => (ColumnConfigLoader)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/settings/use-settings.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection.tsx");
/* ESM import */var _Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/selected-grid-config-id/use-selected-grid-config-id.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config.ts");
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








const ColumnConfigLoader = (param)=>{
    let { Component } = param;
    _s();
    const { useElementId, ViewComponent, useDataQueryHelper } = (0,_Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_1__.useSettings)();
    const { setDataLoadingState } = useDataQueryHelper();
    const { getId } = useElementId();
    const { selectedClassDefinition } = (0,_class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_3__.useClassDefinitionSelection)();
    const { isLoading, data } = (0,_Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.useDataObjectGetAvailableGridColumnsQuery)({
        folderId: getId(),
        classId: selectedClassDefinition.id
    });
    const { id: configId } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_7__.useSelectedGridConfigId)();
    const { isLoading: isInitialConfigLoading, data: initialConfigurationData } = (0,_Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.useDataObjectGetGridConfigurationQuery)({
        classId: selectedClassDefinition.id,
        folderId: getId(),
        configurationId: configId
    });
    const { selectedColumns, setSelectedColumns } = (0,_Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_5__.useSelectedColumns)();
    const { setAvailableColumns } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_6__.useAvailableColumns)();
    const { setGridConfig } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_8__.useGridConfig)();
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (data === undefined || initialConfigurationData === undefined) {
            return;
        }
        const selectedColumns = [];
        const availableColumns = data.columns.map((column)=>column);
        for (const column of initialConfigurationData.columns){
            const availableColumn = data.columns.find((availableColumn)=>availableColumn.key === column.key);
            const currentColumn = column;
            if (availableColumn !== undefined) {
                const apiColumn = {
                    ...availableColumn,
                    config: availableColumn.type === 'dataobject.classificationstore' ? 'config' in column && column.config : availableColumn.config,
                    __meta: {
                        advancedColumnConfig: currentColumn.config ?? {}
                    }
                };
                selectedColumns.push({
                    key: column.key,
                    locale: column.locale,
                    type: availableColumn.type,
                    config: availableColumn.type === 'dataobject.classificationstore' ? 'config' in column && column.config : availableColumn.config,
                    sortable: availableColumn.sortable,
                    editable: availableColumn.editable,
                    localizable: availableColumn.localizable,
                    exportable: availableColumn.exportable,
                    frontendType: availableColumn.frontendType,
                    group: availableColumn.group,
                    originalApiDefinition: apiColumn
                });
            }
        }
        setSelectedColumns(selectedColumns);
        setAvailableColumns(availableColumns);
        setGridConfig(initialConfigurationData);
        setDataLoadingState('config-changed');
    }, [
        data,
        initialConfigurationData
    ]);
    if (isLoading || isInitialConfigLoading || selectedColumns.length === 0) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ViewComponent, {}, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/components/column-config-loader/column-config-loader.tsx",
            lineNumber: 102,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {}, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/components/column-config-loader/column-config-loader.tsx",
        lineNumber: 104,
        columnNumber: 10
    }, undefined);
};
_s(ColumnConfigLoader, "mSJHIDhmUH3BIekG4jZY/WgrUNw=", true, function() {
    return [
        _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_1__.useSettings,
        _class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_3__.useClassDefinitionSelection,
        _Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.useDataObjectGetAvailableGridColumnsQuery,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_7__.useSelectedGridConfigId,
        _Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.useDataObjectGetGridConfigurationQuery,
        _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_5__.useSelectedColumns,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_6__.useAvailableColumns,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_8__.useGridConfig
    ];
});
_c = ColumnConfigLoader;
var _c;
$RefreshReg$(_c, "ColumnConfigLoader");

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
"./js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WithColumnConfiguration: () => (WithColumnConfiguration)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _class_definition_selection_components_class_definition_select_class_definition_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/components/class-definition-select/class-definition-select.tsx");
/* ESM import */var _components_column_config_loader_column_config_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/components/column-config-loader/column-config-loader.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/text/text.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_8__);
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








const WithColumnConfiguration = (Component)=>{
    var _s = $RefreshSig$();
    const availableColumnsConfigurationComponent = ()=>{
        _s();
        const { selectedClassDefinition } = (0,_class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_2__.useClassDefinitionSelection)();
        const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_8__.useTranslation)();
        if (selectedClassDefinition === undefined) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_3__.Content, {
                padded: true,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_6__.Flex, {
                    align: "center",
                    gap: 'extra-small',
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_7__.Text, {
                            children: t('data-object.select-class-to-display')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx",
                            lineNumber: 30,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_class_definition_selection_components_class_definition_select_class_definition_select__WEBPACK_IMPORTED_MODULE_4__.ClassDefinitionSelect, {}, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx",
                            lineNumber: 31,
                            columnNumber: 13
                        }, undefined)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx",
                    lineNumber: 29,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx",
                lineNumber: 28,
                columnNumber: 14
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_column_config_loader_column_config_loader__WEBPACK_IMPORTED_MODULE_5__.ColumnConfigLoader, {
            Component: Component
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx",
            lineNumber: 35,
            columnNumber: 12
        }, undefined);
    };
    _s(availableColumnsConfigurationComponent, "wi7iLYXtWIWoxY26u3uBLh5OdVA=", false, function() {
        return [
            _class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_2__.useClassDefinitionSelection,
            react_i18next__WEBPACK_IMPORTED_MODULE_8__.useTranslation
        ];
    });
    return availableColumnsConfigurationComponent;
};
_c = WithColumnConfiguration;
var _c;
$RefreshReg$(_c, "WithColumnConfiguration");

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
"./js/src/core/modules/data-object/listing/decorator/column-configuration/context-layer/with-available-columns-context.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WithAvailableColumnsContext: () => (WithAvailableColumnsContext)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_available_columns_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_grid_config_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/grid-config-provider.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_selected_grid_config_id_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/selected-grid-config-id/selected-grid-config-id-provider.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
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




const WithAvailableColumnsContext = (Component)=>{
    const AvailableColumnsContextComponent = ()=>{
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_grid_config_provider__WEBPACK_IMPORTED_MODULE_2__.GridConfigProvider, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_available_columns_provider__WEBPACK_IMPORTED_MODULE_1__.AvailableColumnsProvider, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_selected_grid_config_id_provider__WEBPACK_IMPORTED_MODULE_3__.SelectedGridConfigIdProvider, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {}, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/context-layer/with-available-columns-context.tsx",
                        lineNumber: 20,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/context-layer/with-available-columns-context.tsx",
                    lineNumber: 19,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/context-layer/with-available-columns-context.tsx",
                lineNumber: 18,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/context-layer/with-available-columns-context.tsx",
            lineNumber: 17,
            columnNumber: 12
        }, undefined);
    };
    return AvailableColumnsContextComponent;
};
_c = WithAvailableColumnsContext;
var _c;
$RefreshReg$(_c, "WithAvailableColumnsContext");

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
"./js/src/core/modules/data-object/listing/decorator/context-menu/context-menu-decorator.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ContextMenuDecorator: () => (ContextMenuDecorator)
});
/* ESM import */var _view_layer_components_grid_hooks_with_context_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/context-menu/view-layer/components/grid/hooks/with-context-menu.tsx");
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
const ContextMenuDecorator = (props)=>{
    const { useGridOptions, ...defaultProps } = props;
    const newProps = {
        ...defaultProps,
        useGridOptions: (0,_view_layer_components_grid_hooks_with_context_menu__WEBPACK_IMPORTED_MODULE_0__.withContextMenu)(useGridOptions)
    };
    return newProps;
};
_c = ContextMenuDecorator;
var _c;
$RefreshReg$(_c, "ContextMenuDecorator");

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
"./js/src/core/modules/data-object/listing/decorator/context-menu/view-layer/components/context-menu/list-grid-context-menu.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ListGridContextMenu: () => (ListGridContextMenu)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_app_context_menu_registry_use_context_menu_slot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/context-menu-registry/use-context-menu-slot.ts");
/* ESM import */var _Pimcore_modules_app_context_menu_registry_context_menu_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/context-menu-registry/context-menu-config.ts");
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





const ListGridContextMenu = (props)=>{
    _s();
    const { row } = props;
    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(undefined);
    const context = {
        target: row,
        onComplete: ()=>{
            setIsOpen(undefined);
        }
    };
    const items = (0,_Pimcore_modules_app_context_menu_registry_use_context_menu_slot__WEBPACK_IMPORTED_MODULE_4__.useContextMenuSlot)(_Pimcore_modules_app_context_menu_registry_context_menu_config__WEBPACK_IMPORTED_MODULE_5__.contextMenuConfig.dataObjectListGrid.name, context);
    const handleMenuClick = (e)=>{
        if (e.key === _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_2__.ContextMenuActionName.locateInTree) {
            setIsOpen(true);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
        menu: {
            items,
            onClick: handleMenuClick
        },
        open: isOpen,
        trigger: [
            'contextMenu'
        ],
        children: props.children
    }, row.id, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/context-menu/view-layer/components/context-menu/list-grid-context-menu.tsx",
        lineNumber: 33,
        columnNumber: 10
    }, undefined);
};
_s(ListGridContextMenu, "xAs5U6WdJolTuZWeHAQeO4Bvx/Q=", false, function() {
    return [
        _Pimcore_modules_app_context_menu_registry_use_context_menu_slot__WEBPACK_IMPORTED_MODULE_4__.useContextMenuSlot
    ];
});
_c = ListGridContextMenu;
var _c;
$RefreshReg$(_c, "ListGridContextMenu");

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
"./js/src/core/modules/data-object/listing/decorator/context-menu/view-layer/components/grid/hooks/with-context-menu.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withContextMenu: () => (withContextMenu)
});
/* ESM import */var _context_menu_list_grid_context_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/context-menu/view-layer/components/context-menu/list-grid-context-menu.tsx");
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
const withContextMenu = (useBaseHook)=>{
    var _s = $RefreshSig$();
    const useContextMenuExtension = ()=>{
        _s();
        const { getGridProps: baseGetGridProps, ...baseMethods } = useBaseHook();
        const getGridProps = ()=>{
            const baseGripProps = baseGetGridProps();
            const newGridProps = {
                ...baseGripProps,
                contextMenu: _context_menu_list_grid_context_menu__WEBPACK_IMPORTED_MODULE_0__.ListGridContextMenu
            };
            return newGridProps;
        };
        return {
            ...baseMethods,
            getGridProps
        };
    };
    _s(useContextMenuExtension, "MSgmOMeAtGVhx1noK0eD6wMKTqg=", false, function() {
        return [
            useBaseHook
        ];
    });
    return useContextMenuExtension;
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
"./js/src/core/modules/data-object/listing/decorator/inline-editing/hooks/use-inline-edit-api-update.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useInlineEditApiUpdate: () => (useInlineEditApiUpdate)
});
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice-enhanced.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _batch_actions_batch_append_mode_batch_append_mode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/listing/batch-actions/batch-append-mode/batch-append-mode.ts");
/* ESM import */var _Pimcore_components_language_selection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/language-selection/index.ts");
/* ESM import */var _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/settings/use-settings.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var _s = $RefreshSig$();







const useInlineEditApiUpdate = ()=>{
    _s();
    const [patchDataObject] = (0,_Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useDataObjectPatchByIdMutation)();
    const dispatch = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const { currentLanguage } = (0,_Pimcore_components_language_selection__WEBPACK_IMPORTED_MODULE_5__.useLanguageSelection)();
    const { useColumnMapper } = (0,_Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_6__.useSettings)();
    const columnMapper = useColumnMapper();
    const updateCache = (event)=>{
        const { update, getGetRequestArgs } = event;
        const { id, column: columnToUpdate, value } = update;
        dispatch(_Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.api.util.updateQueryData('dataObjectGetGrid', getGetRequestArgs, (oldData)=>{
            item_loop: for (const item of oldData.items){
                if (item.id !== id) {
                    continue;
                }
                for (const column of item.columns){
                    if (columnMapper.shouldMapDataToColumn(column, columnToUpdate)) {
                        column.value = value;
                        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNil)(column.inheritance) && 'inherited' in column.inheritance && column.inheritance.inherited === true) {
                            column.inheritance.inherited = false;
                        }
                        break item_loop;
                    }
                }
            }
            return oldData;
        }));
    };
    const updateApiData = async (event)=>{
        const columnType = event.update.column.type;
        let dataItem;
        switch(columnType){
            case 'dataobject.classificationstore':
                dataItem = prepareClassificationStoreApiUpdateData(event);
                break;
            default:
                dataItem = prepareDefaultApiUpdateData(event);
                break;
        }
        const promise = patchDataObject({
            body: {
                data: [
                    dataItem
                ]
            }
        });
        const result = await promise;
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNil)(result.error)) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.ApiError(result.error));
        }
        return result;
    };
    const prepareClassificationStoreApiUpdateData = (event)=>{
        const { update } = event;
        const locale = update.column.locale ?? (update.column.localizable ? currentLanguage ?? 'default' : 'default');
        const columnKey = update.column.key;
        const columnConfig = update.column.config;
        return {
            id: update.id,
            editableData: {
                [columnKey]: {
                    [columnConfig.groupId]: {
                        [locale]: {
                            [columnConfig.keyId]: update.value
                        }
                    }
                }
            }
        };
    };
    const prepareDefaultApiUpdateData = (event)=>{
        var _event_meta;
        const { update } = event;
        let columnKey = update.column.key;
        if (update.column.localizable) {
            const splittedColumnKey = (columnKey ?? '').split('.');
            const columnId = splittedColumnKey[splittedColumnKey.length - 1];
            splittedColumnKey.pop();
            const hasPrepath = splittedColumnKey.length > 0 && splittedColumnKey[0] !== '';
            columnKey = `${splittedColumnKey.join('.')}${hasPrepath ? '.' : ''}localizedfields.${columnId}.${update.column.locale ?? currentLanguage}`;
        }
        const value = ((_event_meta = event.meta) === null || _event_meta === void 0 ? void 0 : _event_meta[_batch_actions_batch_append_mode_batch_append_mode__WEBPACK_IMPORTED_MODULE_4__.META_SUPPORTS_BATCH_APPEND_MODE]) === true ? (0,_batch_actions_batch_append_mode_batch_append_mode__WEBPACK_IMPORTED_MODULE_4__.addBatchAppendMode)(update.value, _batch_actions_batch_append_mode_batch_append_mode__WEBPACK_IMPORTED_MODULE_4__.BatchAppendMode.Replace) : update.value;
        const isPublishedColumn = columnKey === 'published';
        return {
            id: update.id,
            ...isPublishedColumn ? {
                published: value
            } : {
                editableData: {
                    ...(0,lodash__WEBPACK_IMPORTED_MODULE_3__.set)({}, columnKey ?? '', value)
                }
            }
        };
    };
    return {
        updateCache,
        updateApiData
    };
};
_s(useInlineEditApiUpdate, "c/5KTZL7+PC1g/K0dbWNXnDHCn0=", true, function() {
    return [
        _Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useDataObjectPatchByIdMutation,
        _sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch,
        _Pimcore_components_language_selection__WEBPACK_IMPORTED_MODULE_5__.useLanguageSelection,
        _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_6__.useSettings
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
"./js/src/core/modules/data-object/listing/listing-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActionColumnDecorator: () => (/* reexport safe */ _decorator_action_column_action_column_decorator__WEBPACK_IMPORTED_MODULE_15__.ActionColumnDecorator),
  BaseListing: () => (/* reexport safe */ _Pimcore_modules_element_listing_abstract_listing_container__WEBPACK_IMPORTED_MODULE_1__.ListingContainer),
  ClassDefinitionSelectionDecorator: () => (/* reexport safe */ _decorator_class_definition_selection_class_definition_selection_decorator__WEBPACK_IMPORTED_MODULE_11__.ClassDefinitionSelectionDecorator),
  ColumnConfigurationDecorator: () => (/* reexport safe */ _decorator_column_configuration_column_configuration_decorator__WEBPACK_IMPORTED_MODULE_6__.ColumnConfigurationDecorator),
  ContextMenuDecorator: () => (/* reexport safe */ _decorator_context_menu_context_menu_decorator__WEBPACK_IMPORTED_MODULE_17__.ContextMenuDecorator),
  GeneralFiltersDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_general_filters_general_filters_decorator__WEBPACK_IMPORTED_MODULE_14__.GeneralFiltersDecorator),
  InlineEditDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_inline_edit_inline_edit_decorator__WEBPACK_IMPORTED_MODULE_12__.InlineEditDecorator),
  ListingContainer: () => (ListingContainer),
  PagingDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_paging_paging_decorator__WEBPACK_IMPORTED_MODULE_8__.PagingDecorator),
  RowSelectionDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_row_selection_row_selection_decorator__WEBPACK_IMPORTED_MODULE_4__.RowSelectionDecorator),
  SortingDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_sorting_sorting_decorator__WEBPACK_IMPORTED_MODULE_9__.SortingDecorator),
  TagFilterDecorator: () => (/* reexport safe */ _Pimcore_modules_asset_listing_decorator_tag_filter_tag_filter_decorator__WEBPACK_IMPORTED_MODULE_16__.TagFilterDecorator),
  listingDefaultProps: () => (defaultProps),
  useInlineEditApiUpdate: () => (/* reexport safe */ _decorator_inline_editing_hooks_use_inline_edit_api_update__WEBPACK_IMPORTED_MODULE_13__.useInlineEditApiUpdate)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_element_listing_abstract_listing_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/listing-container.tsx");
/* ESM import */var _data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice.gen.ts");
/* ESM import */var _data_layer_hooks_use_data_query_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/listing/data-layer/hooks/use-data-query-helper.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_row_selection_row_selection_decorator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/row-selection/row-selection-decorator.ts");
/* ESM import */var _Pimcore_modules_asset_listing_hooks_use_element_id__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/listing/hooks/use-element-id.ts");
/* ESM import */var _decorator_column_configuration_column_configuration_decorator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/column-configuration-decorator.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var _Pimcore_modules_element_listing_decorators_paging_paging_decorator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/paging/paging-decorator.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_sorting_sorting_decorator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/sorting/sorting-decorator.ts");
/* ESM import */var _views_default_view__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/data-object/listing/views/default-view.tsx");
/* ESM import */var _decorator_class_definition_selection_class_definition_selection_decorator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/class-definition-selection-decorator.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_inline_edit_inline_edit_decorator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/inline-edit/inline-edit-decorator.ts");
/* ESM import */var _decorator_inline_editing_hooks_use_inline_edit_api_update__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/inline-editing/hooks/use-inline-edit-api-update.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_general_filters_general_filters_decorator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/general-filters/general-filters-decorator.ts");
/* ESM import */var _decorator_action_column_action_column_decorator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/action-column/action-column-decorator.ts");
/* ESM import */var _Pimcore_modules_asset_listing_decorator_tag_filter_tag_filter_decorator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/tag-filter/tag-filter-decorator.ts");
/* ESM import */var _decorator_context_menu_context_menu_decorator__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/context-menu/context-menu-decorator.tsx");
/* ESM import */var _column_mapper_use_column_mapper__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/modules/data-object/listing/column-mapper/use-column-mapper.tsx");
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/sdk/app/index.ts");
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



















const defaultProps = {
    ..._Pimcore_modules_element_listing_abstract_listing_container__WEBPACK_IMPORTED_MODULE_1__.defaultProps,
    ViewComponent: _views_default_view__WEBPACK_IMPORTED_MODULE_10__.DefaultView,
    useDataQuery: _data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_2__.useDataObjectGetGridQuery,
    useDataQueryHelper: _data_layer_hooks_use_data_query_helper__WEBPACK_IMPORTED_MODULE_3__.useDataQueryHelper,
    useElementId: _Pimcore_modules_asset_listing_hooks_use_element_id__WEBPACK_IMPORTED_MODULE_5__.useElementId,
    useColumnMapper: _column_mapper_use_column_mapper__WEBPACK_IMPORTED_MODULE_18__.useDataObjectColumnMapper
};
const ListingContainer = ()=>{
    _s();
    const listingBuilder = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_19__.useInjection)(_sdk_app__WEBPACK_IMPORTED_MODULE_19__.serviceIds["DataObject/Listing/Builder"]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_abstract_listing_container__WEBPACK_IMPORTED_MODULE_1__.ListingContainer, {
        ...listingBuilder.build({
            props: defaultProps
        })
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/listing-container.tsx",
        lineNumber: 40,
        columnNumber: 10
    }, undefined);
};
_s(ListingContainer, "Fv54hGd6p61AxFEYND6v+G8sUU8=", false, function() {
    return [
        _sdk_app__WEBPACK_IMPORTED_MODULE_19__.useInjection
    ];
});
_c = ListingContainer;

var _c;
$RefreshReg$(_c, "ListingContainer");

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
"./js/src/core/modules/data-object/listing/toolbar/toolbar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Toolbar: () => (Toolbar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _sdk_modules_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/sdk/modules/app/index.ts");
/* ESM import */var _sdk_modules_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/sdk/modules/element/index.ts");
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



const Toolbar = ()=>{
    _s();
    const { toolbarSlotName } = (0,_sdk_modules_element__WEBPACK_IMPORTED_MODULE_3__.useSettings)();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_modules_app__WEBPACK_IMPORTED_MODULE_2__.ComponentRenderer, {
            component: toolbarSlotName ?? _sdk_modules_app__WEBPACK_IMPORTED_MODULE_2__.componentConfig.dataObject.listing.toolbar.component.name
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/toolbar/toolbar.tsx",
            lineNumber: 18,
            columnNumber: 24
        }, undefined), []);
};
_s(Toolbar, "WMl/qvuk7XAOMHk9+zImmLtD7zs=", false, function() {
    return [
        _sdk_modules_element__WEBPACK_IMPORTED_MODULE_3__.useSettings
    ];
});
_c = Toolbar;
var _c;
$RefreshReg$(_c, "Toolbar");

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
"./js/src/core/modules/data-object/listing/views/default-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DefaultView: () => (DefaultView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_data_layer_provider_data_use_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/data-layer/provider/data/use-data.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_view_layer_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/view-layer/components/sidebar/sidebar.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_view_layer_components_grid_grid_container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/view-layer/components/grid/grid-container.tsx");
/* ESM import */var _decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection.tsx");
/* ESM import */var _toolbar_toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/data-object/listing/toolbar/toolbar.tsx");
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







const DefaultView = ()=>{
    _s();
    const { dataQueryResult } = (0,_Pimcore_modules_element_listing_abstract_data_layer_provider_data_use_data__WEBPACK_IMPORTED_MODULE_3__.useData)();
    const { selectedClassDefinition } = (0,_decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_6__.useClassDefinitionSelection)();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_2__.ContentLayout, {
            renderSidebar: dataQueryResult !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_abstract_view_layer_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_4__.Sidebar, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/views/default-view.tsx",
                lineNumber: 25,
                columnNumber: 86
            }, void 0) : undefined,
            renderToolbar: dataQueryResult !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_7__.Toolbar, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/views/default-view.tsx",
                lineNumber: 25,
                columnNumber: 158
            }, void 0) : undefined,
            children: selectedClassDefinition !== undefined && dataQueryResult !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_abstract_view_layer_components_grid_grid_container__WEBPACK_IMPORTED_MODULE_5__.GridContainer, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/views/default-view.tsx",
                lineNumber: 26,
                columnNumber: 82
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/views/default-view.tsx",
            lineNumber: 25,
            columnNumber: 24
        }, undefined), [
        dataQueryResult
    ]);
};
_s(DefaultView, "UYL9xhQGQ03HVrOuaKuRIjlm28Y=", false, function() {
    return [
        _Pimcore_modules_element_listing_abstract_data_layer_provider_data_use_data__WEBPACK_IMPORTED_MODULE_3__.useData,
        _decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_6__.useClassDefinitionSelection
    ];
});
_c = DefaultView;
var _c;
$RefreshReg$(_c, "DefaultView");

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
"./js/src/core/modules/data-object/tree/node/with-action-states.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withActionStates: () => (withActionStates)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_element_tree_hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/element-tree/hooks/use-element-tree-node.ts");
/* ESM import */var _Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/element-api-slice.gen.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice.gen.ts");
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




const withActionStates = (Component)=>{
    var _s = $RefreshSig$();
    const ActionStates = (props, ref)=>{
        _s();
        const originalLoadingState = props.isLoading ?? false;
        const [, { isLoading }] = (0,_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.useDataObjectPatchByIdMutation)({
            fixedCacheKey: `DATA-OBJECT_ACTION_RENAME_ID_${props.id}`
        });
        const [, { isLoading: isDeleteLoading }] = (0,_Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_2__.useElementDeleteMutation)({
            fixedCacheKey: `DATA-OBJECT_ACTION_DELETE_ID_${props.id}`
        });
        const { isFetching: isMarkedAsFetching, isLoading: isMarkedAsLoading, isDeleting: isMarkedAsDeleting } = (0,_Pimcore_components_element_tree_hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_1__.useElementTreeNode)(props.id);
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
            ...props,
            danger: originalLoadingState || isDeleteLoading || isMarkedAsDeleting,
            isLoading: originalLoadingState || isMarkedAsLoading !== true && isMarkedAsFetching || isLoading || isDeleteLoading || isMarkedAsDeleting || isMarkedAsLoading,
            ref: ref
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/tree/node/with-action-states.tsx",
            lineNumber: 33,
            columnNumber: 12
        }, undefined);
    };
    _s(ActionStates, "0RJrLeQcg/LnN/VHjxpslBf84Y4=", false, function() {
        return [
            _data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.useDataObjectPatchByIdMutation,
            _Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_2__.useElementDeleteMutation,
            _Pimcore_components_element_tree_hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_1__.useElementTreeNode
        ];
    });
    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(ActionStates);
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
"./js/src/core/modules/element/components/element-toolbar/element-toolbar.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
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
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        toolbar: css`
      display: flex;
      align-items: center;
      gap: 8px;
        
      .pimcore-icon {
        color: ${token.colorIcon};
      }
    `,
        dropdownInfoWrapper: css`
      .ant-dropdown-trigger {
        display: flex;
        align-items: center;
        gap: 4px;
        border: 1px solid ${token.colorBorder};
        background: ${token.colorFillTertiary};
        color: ${token.colorText};

        .ant-btn-icon.ant-btn-icon-end {
          margin-left: 0;
        }

        &:hover .pimcore-icon {
          color: ${token.colorIconHover};
        }
      }
    `,
        dropdownInfo: css`
      min-width: 130px !important;
    `
    };
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
"./js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ElementToolbar: () => (ElementToolbar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_breadcrumb_breadcrumb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/breadcrumb/breadcrumb.tsx");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/space/space.tsx");
/* ESM import */var _Pimcore_modules_element_actions_locate_in_tree_use_locate_in_tree__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/actions/locate-in-tree/use-locate-in-tree.tsx");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-draft.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_actions_menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-actions-menu.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_modules_element_components_element_toolbar_element_toolbar_styles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/components/element-toolbar/element-toolbar.styles.tsx");
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











const ElementToolbar = (param)=>{
    let { id, elementType, editorTabsWidth } = param;
    _s();
    const elementRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { styles } = (0,_Pimcore_modules_element_components_element_toolbar_element_toolbar_styles__WEBPACK_IMPORTED_MODULE_11__.useStyle)();
    const { element } = (0,_Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_8__.useElementDraft)(id, elementType);
    const [editorTabsBlockSize, setEditorTabsBlockSize] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [locateInTreeLoading, setLocateInTreeLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { locateInTree } = (0,_Pimcore_modules_element_actions_locate_in_tree_use_locate_in_tree__WEBPACK_IMPORTED_MODULE_7__.useLocateInTree)(elementType);
    const { actionMenuItems: menuItems } = (0,_Pimcore_modules_element_hooks_use_element_actions_menu__WEBPACK_IMPORTED_MODULE_9__.useElementActionsMenu)({
        element: element,
        elementType
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(()=>{
        if (editorTabsWidth == null) return;
        editorTabsWidth <= 800 ? setEditorTabsBlockSize('S') : setEditorTabsBlockSize('L');
    }, [
        editorTabsWidth
    ]);
    if (element === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.toolbar,
        ref: elementRef,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_breadcrumb_breadcrumb__WEBPACK_IMPORTED_MODULE_2__.Breadcrumb, {
                editorTabsWidth: editorTabsWidth,
                elementType: elementType,
                pageSize: editorTabsBlockSize,
                path: element.fullPath
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: styles.dropdownInfoWrapper,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_3__.Dropdown, {
                    menu: {
                        items: menuItems
                    },
                    rootClassName: styles.dropdownInfo,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_5__.Button, {
                        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                            value: 'chevron-down'
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx",
                            lineNumber: 60,
                            columnNumber: 25
                        }, void 0),
                        iconPosition: "end",
                        onClick: ()=>{
                            void navigator.clipboard.writeText(element.id.toString());
                        },
                        size: "small",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_6__.Space, {
                            children: [
                                "ID: ",
                                element.id
                            ]
                        }, void 0, true, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_10__.IconButton, {
                icon: {
                    value: 'target'
                },
                loading: locateInTreeLoading,
                onClick: ()=>{
                    setLocateInTreeLoading(true);
                    locateInTree(element.id, ()=>{
                        setLocateInTreeLoading(false);
                    });
                }
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx",
        lineNumber: 52,
        columnNumber: 10
    }, undefined);
};
_s(ElementToolbar, "by6ek+jZUCvi+0mQw5QVBcE4HpM=", false, function() {
    return [
        _Pimcore_modules_element_components_element_toolbar_element_toolbar_styles__WEBPACK_IMPORTED_MODULE_11__.useStyle,
        _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_8__.useElementDraft,
        _Pimcore_modules_element_actions_locate_in_tree_use_locate_in_tree__WEBPACK_IMPORTED_MODULE_7__.useLocateInTree,
        _Pimcore_modules_element_hooks_use_element_actions_menu__WEBPACK_IMPORTED_MODULE_9__.useElementActionsMenu
    ];
});
_c = ElementToolbar;
var _c;
$RefreshReg$(_c, "ElementToolbar");

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
"./js/src/core/modules/element/components/language-selection/permission-based-language-selection.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PermissionBasedLanguageSelection: () => (PermissionBasedLanguageSelection)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_language_selection_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/language-selection/provider/use-language-selection.tsx");
/* ESM import */var _permission_based_language_selection_control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/components/language-selection/permission-based-language-selection-control.tsx");
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



const PermissionBasedLanguageSelection = (props)=>{
    _s();
    const { currentLanguage, setCurrentLanguage } = (0,_Pimcore_components_language_selection_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_2__.useLanguageSelection)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_permission_based_language_selection_control__WEBPACK_IMPORTED_MODULE_3__.PermissionBasedLanguageSelectionControl, {
        isNullable: props.isNullable,
        onChange: setCurrentLanguage,
        value: currentLanguage
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/language-selection/permission-based-language-selection.tsx",
        lineNumber: 19,
        columnNumber: 10
    }, undefined);
};
_s(PermissionBasedLanguageSelection, "X8McRioo4bPWAb4PylWUEyyP8og=", false, function() {
    return [
        _Pimcore_components_language_selection_provider_use_language_selection__WEBPACK_IMPORTED_MODULE_2__.useLanguageSelection
    ];
});
_c = PermissionBasedLanguageSelection;
var _c;
$RefreshReg$(_c, "PermissionBasedLanguageSelection");

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
"./js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SystemInfoModal: () => (SystemInfoModal)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var antd_es_typography_Link__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./node_modules/antd/es/typography/Link.js");
/* ESM import */var _Pimcore_components_form_form_kit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/form/form-kit.tsx");
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/input/input.tsx");
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/text/text.tsx");
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/utils/date-time.ts");
/* ESM import */var _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/user/user-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts");
/* ESM import */var _Pimcore_modules_user__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/user/index.ts");
/* ESM import */var _Pimcore_utils_data_unit__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/utils/data-unit.ts");
/* ESM import */var _Pimcore_app_config_app_config__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/app/config/app-config.ts");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
/* ESM import */var _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice-enhanced.ts");
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


















const SystemInfoModal = (param)=>{
    let { onClose, data } = param;
    var _getByName;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const currentUser = (0,_Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_10__.useUser)();
    const { data: userList } = (0,_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_9__.useUserGetCollectionQuery)();
    const { openMainWidget } = (0,_Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_12__.useWidgetManager)();
    const { data: classDefinitionData } = (0,_Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_17__.useClassDefinitionCollectionQuery)();
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(data)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    const getByName = (name)=>{
        var _classDefinitionData_items;
        return classDefinitionData === null || classDefinitionData === void 0 ? void 0 : (_classDefinitionData_items = classDefinitionData.items) === null || _classDefinitionData_items === void 0 ? void 0 : _classDefinitionData_items.find((classDefinition)=>classDefinition.name === name);
    };
    const handleOpenUserManagement = (userId)=>{
        const updConfig = {
            ..._Pimcore_modules_user__WEBPACK_IMPORTED_MODULE_13__.USERS_WIDGET,
            config: {
                ..._Pimcore_modules_user__WEBPACK_IMPORTED_MODULE_13__.USERS_WIDGET.config,
                userId
            }
        };
        openMainWidget(updConfig);
        onClose();
    };
    const renderInputItem = (param)=>{
        let { label, name, value } = param;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form.Item, {
            label: label,
            name: name,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_6__.Input, {
                disabled: true,
                value: value
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
            lineNumber: 67,
            columnNumber: 9
        }, undefined);
    };
    const getUserLabel = (userId)=>{
        const user = userList === null || userList === void 0 ? void 0 : userList.items.find((user)=>user.id === userId);
        const renderLabel = (value)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_7__.Text, {
                className: "m-l-mini",
                type: "secondary",
                children: value
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
                lineNumber: 72,
                columnNumber: 34
            }, undefined);
        if (userId === 0) return renderLabel(t('system-information.system'));
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(user)) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_11__.Flex, {
                align: "center",
                gap: "mini",
                children: [
                    renderLabel(user.username),
                    userId === currentUser.id && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd_es_typography_Link__WEBPACK_IMPORTED_MODULE_18__["default"], {
                        onClick: ()=>{
                            handleOpenUserManagement(userId);
                        },
                        style: {
                            textDecoration: 'underline'
                        },
                        children: [
                            "(",
                            t('system-information.click-to-open'),
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
                        lineNumber: 79,
                        columnNumber: 41
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
                lineNumber: 77,
                columnNumber: 14
            }, undefined);
        }
        return renderLabel(t('system-information.user-unknown'));
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form_kit__WEBPACK_IMPORTED_MODULE_4__.FormKit, {
        formProps: {
            initialValues: data
        },
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form_kit__WEBPACK_IMPORTED_MODULE_4__.FormKit.Panel, {
            children: [
                renderInputItem({
                    label: t('system-information.id'),
                    name: 'id'
                }),
                renderInputItem({
                    label: t('system-information.path'),
                    name: 'fullPath'
                }),
                (data.type === 'image' || data.type === 'page') && renderInputItem({
                    label: t('system-information.public-url'),
                    value: `${_Pimcore_app_config_app_config__WEBPACK_IMPORTED_MODULE_15__.currentDomain}${data.fullPath}`
                }),
                !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(data === null || data === void 0 ? void 0 : data.parentId) && renderInputItem({
                    label: t('system-information.parent-id'),
                    name: 'parentId'
                }),
                renderInputItem({
                    label: t('system-information.type'),
                    value: data.elementType === _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_16__.elementTypes.asset ? data.type + ' ' + (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(data.mimeType) ? '(MIME: ' + data.mimeType + ')' : '') : data.type
                }),
                data.elementType === _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_16__.elementTypes.dataObject && [
                    renderInputItem({
                        label: t('system-information.class-id'),
                        value: ((_getByName = getByName(data.className)) === null || _getByName === void 0 ? void 0 : _getByName.id) ?? ''
                    }),
                    renderInputItem({
                        label: t('system-information.class'),
                        name: 'className'
                    })
                ],
                !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(data.fileSize) && data.fileSize > 0 && renderInputItem({
                    label: t('system-information.file-size'),
                    value: (0,_Pimcore_utils_data_unit__WEBPACK_IMPORTED_MODULE_14__.formatDataUnit)(data.fileSize)
                }),
                !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(data.modificationDate) && renderInputItem({
                    label: t('system-information.modification-date'),
                    value: (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_8__.formatDateTime)({
                        timestamp: data.modificationDate,
                        dateStyle: 'full',
                        timeStyle: 'full'
                    })
                }),
                renderInputItem({
                    label: t('system-information.creation-date'),
                    value: (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_8__.formatDateTime)({
                        timestamp: data.creationDate,
                        dateStyle: 'full',
                        timeStyle: 'full'
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form.Item, {
                    label: t('system-information.user-modification'),
                    children: getUserLabel(data.userModification)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_5__.Form.Item, {
                    label: t('system-information.owner'),
                    children: getUserLabel(data.userOwner)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, undefined),
                renderInputItem({
                    label: t('system-information.deeplink'),
                    name: 'deeplink'
                })
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
            lineNumber: 93,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx",
        lineNumber: 90,
        columnNumber: 10
    }, undefined);
};
_s(SystemInfoModal, "qc3308AdO6pQL5FuuT2Kmlix7P4=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_10__.useUser,
        _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_9__.useUserGetCollectionQuery,
        _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_12__.useWidgetManager,
        _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_17__.useClassDefinitionCollectionQuery
    ];
});
_c = SystemInfoModal;
var _c;
$RefreshReg$(_c, "SystemInfoModal");

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
"./js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TabsToolbarView: () => (TabsToolbarView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _tabs_toolbar_view_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/editor/layouts/tabs-toolbar-view.styles.ts");
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


const TabsToolbarView = (props)=>{
    _s();
    const { styles } = (0,_tabs_toolbar_view_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: [
            'tabs-toolbar-layout',
            styles.tabbarToolbar
        ].join(' '),
        "data-testid": props.dataTestId,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "tabs-toolbar-layout__tabbar",
                children: props.renderTabbar
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "tabs-toolbar-layout__toolbar",
                children: props.renderToolbar
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/layouts/tabs-toolbar-view.tsx",
        lineNumber: 17,
        columnNumber: 10
    }, undefined);
};
_s(TabsToolbarView, "7xVbA/cAv2OTrtL4/ZezCn5HG/A=", false, function() {
    return [
        _tabs_toolbar_view_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles
    ];
});
_c = TabsToolbarView;

var _c;
$RefreshReg$(_c, "TabsToolbarView");

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
"./js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WorkflowModal: () => (WorkflowModal)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/modal/footer/modal-footer.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/modal/modal.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_modal_modal_title_modal_title__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/modal/modal-title/modal-title.tsx");
/* ESM import */var _Pimcore_modules_element_editor_shared_components_workflow_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/editor/shared-components/workflow/hooks/use-workflow.ts");
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/sharing/consume/default/i18next/i18next");
/* ESM import */var i18next__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(i18next__WEBPACK_IMPORTED_MODULE_10__);
/* ESM import */var _Pimcore_modules_element_editor_shared_components_workflow_hooks_use_submit_workflow__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/editor/shared-components/workflow/hooks/use-submit-workflow.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_12__);
/* ESM import */var _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* ESM import */var _Pimcore_modules_element_editor_shared_components_workflow_hooks_use_workflow_field_renderer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/editor/shared-components/workflow/hooks/use-workflow-field-renderer.ts");
/* ESM import */var _Pimcore_modules_app_hook_use_date_converter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/app/hook/use-date-converter.ts");
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















const WorkflowModal = ()=>{
    var _triggeredWorkflowAction_notes, _triggeredWorkflowAction_notes1, _triggeredWorkflowAction_notes2, _triggeredWorkflowAction_notes3;
    _s();
    const { isModalOpen, closeModal, triggeredWorkflowAction } = (0,_Pimcore_modules_element_editor_shared_components_workflow_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_7__.useWorkflow)();
    const { renderFields } = (0,_Pimcore_modules_element_editor_shared_components_workflow_hooks_use_workflow_field_renderer__WEBPACK_IMPORTED_MODULE_14__.useWorkflowFieldRenderer)();
    const { convertToTimestamp } = (0,_Pimcore_modules_app_hook_use_date_converter__WEBPACK_IMPORTED_MODULE_15__.useDateConverter)();
    const [form] = _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_8__.Form.useForm();
    const { submitWorkflowAction, submissionLoading } = (0,_Pimcore_modules_element_editor_shared_components_workflow_hooks_use_submit_workflow__WEBPACK_IMPORTED_MODULE_11__.useSubmitWorkflow)();
    const additionalFields = (triggeredWorkflowAction === null || triggeredWorkflowAction === void 0 ? void 0 : (_triggeredWorkflowAction_notes = triggeredWorkflowAction.notes) === null || _triggeredWorkflowAction_notes === void 0 ? void 0 : _triggeredWorkflowAction_notes.additionalFields) ?? [];
    const dynamicFields = renderFields(additionalFields);
    const onFinish = (values)=>{
        if (triggeredWorkflowAction === null) return;
        const additionalValues = {};
        dynamicFields.forEach((field)=>{
            additionalValues[field.name] = values[field.name] ?? null;
            if (field.fieldType === 'date' || field.fieldType === 'datetime') {
                const fieldValue = values[field.name];
                if ((0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_13__.isNonEmptyString)(fieldValue)) {
                    additionalValues[field.name] = convertToTimestamp(fieldValue, true, false);
                }
            }
        });
        submitWorkflowAction(triggeredWorkflowAction, {
            notes: values.notes,
            additional: additionalValues
        });
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_4__.Modal, {
        afterClose: ()=>{
            form.resetFields();
            closeModal();
        },
        closable: !submissionLoading,
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_2__.ModalFooter, {
            divider: true,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_5__.Flex, {
                align: 'center',
                gap: 'extra-small',
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
                        disabled: submissionLoading,
                        onClick: ()=>{
                            closeModal();
                        },
                        type: "default",
                        children: (0,i18next__WEBPACK_IMPORTED_MODULE_10__.t)('workflow-modal.cancel')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, void 0),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
                        loading: submissionLoading,
                        onClick: ()=>{
                            form.submit();
                        },
                        type: "primary",
                        children: (0,i18next__WEBPACK_IMPORTED_MODULE_10__.t)('workflow-modal.perform-action')
                    }, "submit", false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, void 0)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
            lineNumber: 65,
            columnNumber: 44
        }, void 0),
        onCancel: ()=>{
            closeModal();
        },
        open: isModalOpen && !(0,lodash__WEBPACK_IMPORTED_MODULE_12__.isNull)(triggeredWorkflowAction),
        size: 'M',
        title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_modal_title_modal_title__WEBPACK_IMPORTED_MODULE_6__.ModalTitle, {
            children: !(0,lodash__WEBPACK_IMPORTED_MODULE_12__.isNull)(triggeredWorkflowAction) ? (0,i18next__WEBPACK_IMPORTED_MODULE_10__.t)(triggeredWorkflowAction.label) : ''
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
            lineNumber: 76,
            columnNumber: 79
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_8__.Form, {
            form: form,
            initialValues: {
                notes: (triggeredWorkflowAction === null || triggeredWorkflowAction === void 0 ? void 0 : (_triggeredWorkflowAction_notes1 = triggeredWorkflowAction.notes) === null || _triggeredWorkflowAction_notes1 === void 0 ? void 0 : _triggeredWorkflowAction_notes1.commentPrefill) ?? ''
            },
            layout: 'vertical',
            onFinish: onFinish,
            children: [
                dynamicFields.map((field)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_8__.Form.Item, {
                        label: (0,i18next__WEBPACK_IMPORTED_MODULE_10__.t)((0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_13__.isNonEmptyString)(field.title) ? field.title : field.name),
                        name: field.name,
                        rules: [
                            {
                                required: field.required,
                                message: (0,i18next__WEBPACK_IMPORTED_MODULE_10__.t)('form.validation.required')
                            }
                        ],
                        children: field.component
                    }, field.name, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
                        lineNumber: 80,
                        columnNumber: 37
                    }, undefined)),
                (triggeredWorkflowAction === null || triggeredWorkflowAction === void 0 ? void 0 : (_triggeredWorkflowAction_notes2 = triggeredWorkflowAction.notes) === null || _triggeredWorkflowAction_notes2 === void 0 ? void 0 : _triggeredWorkflowAction_notes2.commentEnabled) === true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_8__.Form.Item, {
                    label: (0,i18next__WEBPACK_IMPORTED_MODULE_10__.t)('workflow-modal.notes'),
                    name: "notes",
                    rules: [
                        {
                            required: (triggeredWorkflowAction === null || triggeredWorkflowAction === void 0 ? void 0 : (_triggeredWorkflowAction_notes3 = triggeredWorkflowAction.notes) === null || _triggeredWorkflowAction_notes3 === void 0 ? void 0 : _triggeredWorkflowAction_notes3.commentRequired) ?? false,
                            message: (0,i18next__WEBPACK_IMPORTED_MODULE_10__.t)('workflow-modal.notes-required')
                        }
                    ],
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_9__.Input.TextArea, {
                        rows: 4
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
                        lineNumber: 91,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
                    lineNumber: 87,
                    columnNumber: 69
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/modal/workflow-modal.tsx",
        lineNumber: 62,
        columnNumber: 10
    }, undefined);
};
_s(WorkflowModal, "oYjQnDtaOV4P3Y3SZKqjylcfqh4=", false, function() {
    return [
        _Pimcore_modules_element_editor_shared_components_workflow_hooks_use_workflow__WEBPACK_IMPORTED_MODULE_7__.useWorkflow,
        _Pimcore_modules_element_editor_shared_components_workflow_hooks_use_workflow_field_renderer__WEBPACK_IMPORTED_MODULE_14__.useWorkflowFieldRenderer,
        _Pimcore_modules_app_hook_use_date_converter__WEBPACK_IMPORTED_MODULE_15__.useDateConverter,
        _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_8__.Form.useForm,
        _Pimcore_modules_element_editor_shared_components_workflow_hooks_use_submit_workflow__WEBPACK_IMPORTED_MODULE_11__.useSubmitWorkflow
    ];
});
_c = WorkflowModal;
var _c;
$RefreshReg$(_c, "WorkflowModal");

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
"./js/src/core/modules/element/editor/shared-components/workflow/provider/workflow-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WorkFlowProvider: () => (WorkFlowProvider),
  WorkflowContext: () => (WorkflowContext)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

const WorkflowContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    isModalOpen: false,
    openModal: ()=>{},
    closeModal: ()=>{},
    triggeredWorkflowAction: null,
    setTriggeredWorkflowAction: ()=>{}
});
const WorkFlowProvider = (param)=>{
    let { children } = param;
    _s();
    const [isModalOpen, setModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [triggeredWorkflowAction, setTriggeredWorkflowAction] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const openModal = ()=>{
        setModalOpen(true);
    };
    const closeModal = ()=>{
        setModalOpen(false);
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(WorkflowContext.Provider, {
            value: {
                isModalOpen,
                openModal,
                closeModal,
                triggeredWorkflowAction,
                setTriggeredWorkflowAction
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-components/workflow/provider/workflow-provider.tsx",
            lineNumber: 30,
            columnNumber: 24
        }, undefined), [
        isModalOpen,
        children,
        triggeredWorkflowAction
    ]);
};
_s(WorkFlowProvider, "f+XnHA+unc0sVXQT4T4bYHcdHug=");
_c = WorkFlowProvider;
var _c;
$RefreshReg$(_c, "WorkFlowProvider");

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TabsContainer: () => (TabsContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_element_editor_tabs_editor_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/editor/tabs/editor-tabs.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-draft.ts");
/* ESM import */var _Pimcore_modules_element_editor_shared_tab_manager_tab_manager_context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/editor/shared-tab-manager/tab-manager-context.tsx");
/* ESM import */var _Pimcore_modules_app_hook_use_handle_keybindings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/app/hook/use-handle-keybindings.ts");
/* ESM import */var _Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/actions/rename/use-rename.tsx");
/* ESM import */var _Pimcore_modules_element_actions_unpublish_use_unpublish__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/actions/unpublish/use-unpublish.tsx");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_modules_element_actions_refresh_element_use_element_refresh__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/actions/refresh-element/use-element-refresh.tsx");
/* ESM import */var _Pimcore_modules_element_actions_locate_in_tree_use_locate_in_tree__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/element/actions/locate-in-tree/use-locate-in-tree.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_14__);
/* ESM import */var _Pimcore_modules_element_utils_workflow_availability__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/element/utils/workflow-availability.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
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
















const TabsContainer = (param)=>{
    let { elementEditorType } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const tabManager = (0,_Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_4__.useInjection)(elementEditorType.tabManagerServiceId);
    const { id, elementType } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__.useElementContext)();
    const { element } = (0,_Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_6__.useElementDraft)(id, elementType);
    const tabs = tabManager.getTabs();
    const { rename } = (0,_Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_9__.useRename)(elementType);
    const { unpublishTreeNode } = (0,_Pimcore_modules_element_actions_unpublish_use_unpublish__WEBPACK_IMPORTED_MODULE_10__.useUnpublish)(elementType);
    const { refreshElement } = (0,_Pimcore_modules_element_actions_refresh_element_use_element_refresh__WEBPACK_IMPORTED_MODULE_12__.useElementRefresh)(elementType);
    const { locateInTree } = (0,_Pimcore_modules_element_actions_locate_in_tree_use_locate_in_tree__WEBPACK_IMPORTED_MODULE_13__.useLocateInTree)(elementType);
    const preparedTabs = tabs.map((tab, index)=>{
        const baseTab = {
            ...tabs[index],
            label: typeof tab.label === 'string' ? t(tab.label) : tab.label
        };
        if (tab.key === 'workflow') {
            return {
                ...baseTab,
                hidden: ()=>!(0,_Pimcore_modules_element_utils_workflow_availability__WEBPACK_IMPORTED_MODULE_15__.isWorkflowAvailable)(element, elementType)
            };
        }
        return baseTab;
    });
    (0,_Pimcore_modules_app_hook_use_handle_keybindings__WEBPACK_IMPORTED_MODULE_8__.useHandleKeyBindings)(()=>{
        if (element != null && (0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_16__.checkElementPermission)(element.permissions, 'rename') && !element.isLocked) rename(element.id, (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_11__.getElementKey)(element, elementType));
    }, 'rename');
    (0,_Pimcore_modules_app_hook_use_handle_keybindings__WEBPACK_IMPORTED_MODULE_8__.useHandleKeyBindings)(()=>{
        if (element != null && !(0,lodash__WEBPACK_IMPORTED_MODULE_14__.isNull)(elementType) && elementType !== 'asset' && (0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_16__.checkElementPermission)(element.permissions, 'unpublish') && !element.isLocked) unpublishTreeNode(element);
    }, 'unpublish');
    (0,_Pimcore_modules_app_hook_use_handle_keybindings__WEBPACK_IMPORTED_MODULE_8__.useHandleKeyBindings)(()=>{
        if (element != null) refreshElement(element.id);
    }, 'refresh');
    (0,_Pimcore_modules_app_hook_use_handle_keybindings__WEBPACK_IMPORTED_MODULE_8__.useHandleKeyBindings)(()=>{
        if (element != null) locateInTree(element.id);
    }, 'openInTree');
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_editor_shared_tab_manager_tab_manager_context__WEBPACK_IMPORTED_MODULE_7__.TabManagerProvider, {
        tabManager: tabManager,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_editor_tabs_editor_tabs__WEBPACK_IMPORTED_MODULE_2__.EditorTabs, {
            defaultActiveKey: '1',
            items: preparedTabs,
            showLabelIfActive: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs-container.tsx",
            lineNumber: 80,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/shared-tab-manager/tabs-container.tsx",
        lineNumber: 79,
        columnNumber: 10
    }, undefined);
};
_s(TabsContainer, "b6UHi7HBSEONBHH2TpBsb5UIMxE=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_4__.useInjection,
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_5__.useElementContext,
        _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_6__.useElementDraft,
        _Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_9__.useRename,
        _Pimcore_modules_element_actions_unpublish_use_unpublish__WEBPACK_IMPORTED_MODULE_10__.useUnpublish,
        _Pimcore_modules_element_actions_refresh_element_use_element_refresh__WEBPACK_IMPORTED_MODULE_12__.useElementRefresh,
        _Pimcore_modules_element_actions_locate_in_tree_use_locate_in_tree__WEBPACK_IMPORTED_MODULE_13__.useLocateInTree,
        _Pimcore_modules_app_hook_use_handle_keybindings__WEBPACK_IMPORTED_MODULE_8__.useHandleKeyBindings,
        _Pimcore_modules_app_hook_use_handle_keybindings__WEBPACK_IMPORTED_MODULE_8__.useHandleKeyBindings,
        _Pimcore_modules_app_hook_use_handle_keybindings__WEBPACK_IMPORTED_MODULE_8__.useHandleKeyBindings,
        _Pimcore_modules_app_hook_use_handle_keybindings__WEBPACK_IMPORTED_MODULE_8__.useHandleKeyBindings
    ];
});
_c = TabsContainer;
var _c;
$RefreshReg$(_c, "TabsContainer");

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
"./js/src/core/modules/element/editor/tabs/editor-tabs.icon-wrapper.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  IconWrapper: () => (IconWrapper)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
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


const IconWrapper = (param)=>{
    let { tabKey, activeTabKey, tabKeyInFocus, tabKeyOutOfFocus, title, children } = param;
    _s();
    const [showTooltip, setShowTooltip] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (tabKeyInFocus !== undefined) {
            setShowTooltip(tabKeyInFocus);
        }
    }, [
        tabKeyInFocus
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (tabKeyOutOfFocus !== undefined && tabKeyOutOfFocus === showTooltip) {
            setShowTooltip(null);
        }
    }, [
        tabKeyOutOfFocus
    ]);
    const toolTipIsVisible = showTooltip === tabKey && activeTabKey !== tabKey;
    const handleMouseEnter = ()=>{
        setShowTooltip(tabKey);
    };
    const handleMouseLeave = ()=>{
        setShowTooltip(null);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
        open: toolTipIsVisible,
        placement: "top",
        title: title,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            children: children
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.icon-wrapper.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.icon-wrapper.tsx",
        lineNumber: 39,
        columnNumber: 10
    }, undefined);
};
_s(IconWrapper, "JFRjn1uz3Bv0o532BV7KPBBiAG4=");
_c = IconWrapper;
var _c;
$RefreshReg$(_c, "IconWrapper");

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
"./js/src/core/modules/element/editor/tabs/editor-tabs.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
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
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        editorTabsContainer: css`
      width: 100%;
    `,
        editorTabs: css`
      height: 100%;
      width: 100%;
      overflow: hidden;

      .ant-tabs-content {
        display: flex;
        height: 100%;
      }
      
      &.ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab {
        margin: 0 ${token.paddingXS}px !important;
        transition: color .2s;

        display: flex;
        height: 32px;
      }

      .ant-tabs-tabpane {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
      }

      .ant-tabs-content-holder {
        overflow: auto;
      }
      &.ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: ${token.colorPrimaryActive}
      }
      &.ant-tabs-top >.ant-tabs-nav {
        margin-bottom: 0;
        padding-right: ${token.paddingXXS}px;
          
        .ant-tabs-nav-wrap {
          display: flex;
          justify-content: flex-end;
            
          .ant-tabs-nav-list {
            display: flex;
            align-items: center;
          }
        }
      }

      &.ant-tabs .ant-tabs-tab-btn .ant-tabs-tab-icon:not(:last-child) {
        margin-inline-end: 0;
      }
      
      &.ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > .ant-tabs-tab {
        padding: 0;
        
        &:first-of-type {
            margin-left: ${token.paddingSM}px;
            margin-right: ${token.paddingSM}px;
        }
        
        .ant-tabs-tab-btn {
          display: flex;
          padding-top: ${token.paddingXS}px;
          padding-bottom: ${token.paddingXS}px;
          justify-content: center;
          align-items: center;
          gap: ${token.paddingTabs}px;
          
          .ant-tabs-tab-icon {
            height: 16px;
            display: flex;
            justify-content: center;
            align-content: center;
            margin-inline-end: 0;
            color: ${token.Tabs.itemUnselectedIconColor};
            
            svg {
              height: 16px;
              width: 16px
            }
          }
        }
          
        .detachable-button {
          display: none;
          color: ${token.Tabs.itemUnselectedIconColor};
          height: ${token.controlHeightSM}px;
          width: ${token.controlHeightSM}px;
        }

        &:not(.ant-tabs-tab-active) {
          .ant-tabs-tab-icon {
            &:hover {
                color: ${token.colorIconHover};
            }
          }
        }
        
        &.ant-tabs-tab-active  {
          .ant-tabs-tab-icon {
              color: ${token.colorPrimaryActive}
          }

          .detachable-button {
            display: flex;
            color: ${token.colorPrimary};
          }
        }
      }
    `,
        onlyActiveLabel: css`
      .ant-tabs-tab:not(.ant-tabs-tab-active) {
          span:nth-child(2) {
              display: none;
          }

          .ant-tabs-tab-icon {
              margin-inline-end: 0;
          }
      }

      @keyframes fadeIn {
          from {
              opacity: 0;
          }

          to {
              opacity: 1;
          }
      }

      .ant-tabs-tab.ant-tabs-tab-active {
          //border-bottom: 3px solid ${token.colorPrimaryActive};
      }
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/modules/element/editor/tabs/editor-tabs.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EditorTabs: () => (EditorTabs)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_element_editor_tabs_editor_tabs_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/editor/tabs/editor-tabs.styles.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/classnames/classnames");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_modules_element_editor_tabs_hooks_use_detach_tab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/editor/tabs/hooks/use-detach-tab.ts");
/* ESM import */var _Pimcore_modules_element_components_element_toolbar_element_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/components/element-toolbar/element-toolbar.tsx");
/* ESM import */var _Pimcore_modules_element_editor_tabs_editor_tabs_icon_wrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/editor/tabs/editor-tabs.icon-wrapper.tsx");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/utils/hooks/use-element-resize.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-draft.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/auth/permission-helper.ts");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/components/box/box.tsx");
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














const EditorTabs = (param)=>{
    let { defaultActiveKey, showLabelIfActive, items } = param;
    _s();
    const { styles } = (0,_Pimcore_modules_element_editor_tabs_editor_tabs_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle)();
    const { detachWidget } = (0,_Pimcore_modules_element_editor_tabs_hooks_use_detach_tab__WEBPACK_IMPORTED_MODULE_5__.useDetachTab)();
    const { id, elementType } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_8__.useElementContext)();
    const { activeTab, setActiveTab } = (0,_Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_10__.useElementDraft)(id, elementType);
    const [tabKeyInFocus, setTabKeyInFocus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const [tabKeyOutOfFocus, setTabKeyOutOfFocus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    const elementDraft = (0,_Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_10__.useElementDraft)(id, elementType);
    const element = elementDraft.element;
    const elementRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { width: editorTabsWidth } = (0,_Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_9__["default"])(elementRef);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (activeTab === null && (items === null || items === void 0 ? void 0 : items.length) > 0) {
            setActiveTab(items[0].key);
        }
    }, [
        items
    ]);
    const onChange = (key)=>{
        setActiveTab(key);
    };
    const tabKeys = items === null || items === void 0 ? void 0 : items.map((item)=>item.key);
    const findTabKey = (event)=>{
        const target = event.target;
        const id = target.id;
        return tabKeys.find((substring)=>id.includes(substring));
    };
    const onFocus = (event)=>{
        setTabKeyInFocus(findTabKey(event));
    };
    const onBlur = (event)=>{
        setTabKeyOutOfFocus(findTabKey(event));
    };
    const openDetachedWidget = (item)=>{
        detachWidget(item);
        if ((items === null || items === void 0 ? void 0 : items.length) > 0) {
            setActiveTab(items[0].key);
        }
    };
    items = items.filter((item)=>{
        if (item.hidden !== undefined && item.hidden(element)) {
            return false;
        }
        if (item.workspacePermission !== undefined && (element === null || element === void 0 ? void 0 : element.permissions) !== undefined) {
            if (!(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_11__.checkElementPermission)(element.permissions, item.workspacePermission)) {
                return false;
            }
        }
        if (item.userPermission !== undefined && !(0,_Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_12__.isAllowed)(item.userPermission)) {
            return false;
        }
        return true;
    });
    items = items === null || items === void 0 ? void 0 : items.map((item)=>{
        const tmpItem = {
            ...item,
            originalLabel: item.label,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_editor_tabs_editor_tabs_icon_wrapper__WEBPACK_IMPORTED_MODULE_7__.IconWrapper, {
                activeTabKey: activeTab,
                tabKey: item.key,
                tabKeyInFocus: tabKeyInFocus,
                tabKeyOutOfFocus: tabKeyOutOfFocus,
                title: item.label,
                children: item.icon
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
                lineNumber: 96,
                columnNumber: 13
            }, undefined)
        };
        if (tmpItem.isDetachable === true) {
            tmpItem.label = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        children: tmpItem.label
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_13__.IconButton, {
                        className: 'detachable-button',
                        icon: {
                            value: 'share'
                        },
                        onClick: (e)=>{
                            e.stopPropagation();
                            openDetachedWidget({
                                tabKey: item.key
                            });
                        },
                        type: 'link'
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true);
        }
        return tmpItem;
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.editorTabsContainer,
        ref: elementRef,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Tabs, {
            activeKey: activeTab ?? undefined,
            className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(styles.editorTabs, {
                [styles.onlyActiveLabel]: showLabelIfActive
            }),
            defaultActiveKey: defaultActiveKey,
            items: items,
            onBlur: onBlur,
            onFocus: onFocus,
            onTabClick: onChange,
            tabBarExtraContent: {
                left: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_14__.Box, {
                    padding: {
                        left: 'extra-small',
                        top: 'extra-small',
                        bottom: 'extra-small'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_components_element_toolbar_element_toolbar__WEBPACK_IMPORTED_MODULE_6__.ElementToolbar, {
                        editorTabsWidth: editorTabsWidth,
                        elementType: elementType,
                        id: id
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
                        lineNumber: 124,
                        columnNumber: 15
                    }, void 0)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
                    lineNumber: 119,
                    columnNumber: 13
                }, void 0)
            }
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
            lineNumber: 116,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/editor/tabs/editor-tabs.tsx",
        lineNumber: 115,
        columnNumber: 10
    }, undefined);
};
_s(EditorTabs, "46SPCKYwYpxPuTpzK8GLNzcI13E=", false, function() {
    return [
        _Pimcore_modules_element_editor_tabs_editor_tabs_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle,
        _Pimcore_modules_element_editor_tabs_hooks_use_detach_tab__WEBPACK_IMPORTED_MODULE_5__.useDetachTab,
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_8__.useElementContext,
        _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_10__.useElementDraft,
        _Pimcore_modules_element_hooks_use_element_draft__WEBPACK_IMPORTED_MODULE_10__.useElementDraft,
        _Pimcore_utils_hooks_use_element_resize__WEBPACK_IMPORTED_MODULE_9__["default"]
    ];
});
_c = EditorTabs;
var _c;
$RefreshReg$(_c, "EditorTabs");

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
"./js/src/core/modules/element/hooks/use-element-actions-menu.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useElementActionsMenu: () => (useElementActionsMenu)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/text/text.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_modules_element_components_system_info_modal_system_info_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/components/system-info-modal/system-info-modal.tsx");
/* ESM import */var _Pimcore_utils_clipboard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/utils/clipboard.ts");
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









const useElementActionsMenu = (param)=>{
    let { element, elementType } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const { modal } = antd__WEBPACK_IMPORTED_MODULE_3__.App.useApp();
    if (element === undefined) {
        return {
            actionMenuItems: []
        };
    }
    const deeplinkUrl = (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_7__.getElementDeeplink)(elementType, element.id);
    const showSystemInfoModal = (data)=>{
        const modalInstance = modal.info({
            title: t('element.full-information'),
            content: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_components_system_info_modal_system_info_modal__WEBPACK_IMPORTED_MODULE_8__.SystemInfoModal, {
                data: data,
                onClose: ()=>{
                    modalInstance.destroy();
                }
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/hooks/use-element-actions-menu.tsx",
                lineNumber: 39,
                columnNumber: 16
            }, undefined),
            icon: null,
            footer: null,
            closable: true
        });
    };
    const actionMenuItems = [
        {
            key: 'copy-id',
            label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                justify: "space-between",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_5__.Text, {
                        children: t('element.toolbar.copy-id')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/hooks/use-element-actions-menu.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_5__.Text, {
                        style: {
                            fontWeight: 'lighter'
                        },
                        type: "secondary",
                        children: element.id
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/hooks/use-element-actions-menu.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/hooks/use-element-actions-menu.tsx",
                lineNumber: 49,
                columnNumber: 12
            }, undefined),
            onClick: (e)=>{
                e.domEvent.stopPropagation();
                void (0,_Pimcore_utils_clipboard__WEBPACK_IMPORTED_MODULE_9__.copyToClipboard)(element.id.toString());
            }
        },
        {
            key: 'copy-full-path',
            label: t('element.toolbar.copy-full-path-to-clipboard'),
            onClick: (e)=>{
                e.domEvent.stopPropagation();
                void (0,_Pimcore_utils_clipboard__WEBPACK_IMPORTED_MODULE_9__.copyToClipboard)(element.fullPath);
            }
        },
        {
            key: 'copy-deep-link',
            label: t('element.toolbar.copy-deep-link-to-clipboard'),
            onClick: (e)=>{
                e.domEvent.stopPropagation();
                void (0,_Pimcore_utils_clipboard__WEBPACK_IMPORTED_MODULE_9__.copyToClipboard)(deeplinkUrl);
            }
        },
        {
            type: 'divider'
        },
        {
            key: 'show-full-info',
            label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                align: "center",
                gap: "extra-small",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                        value: "info-circle"
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/hooks/use-element-actions-menu.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_5__.Text, {
                        children: t('element.toolbar.show-full-info')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/hooks/use-element-actions-menu.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/hooks/use-element-actions-menu.tsx",
                lineNumber: 77,
                columnNumber: 12
            }, undefined),
            onClick: (e)=>{
                e.domEvent.stopPropagation();
                showSystemInfoModal({
                    ...element,
                    elementType,
                    deeplink: deeplinkUrl
                });
            }
        }
    ];
    if (elementType === 'data-object' && 'className' in element) {
        actionMenuItems === null || actionMenuItems === void 0 ? void 0 : actionMenuItems.splice(0, 0, {
            key: 'copy-className',
            label: t('element.toolbar.copy-className', {
                className: element.className
            }),
            onClick: (e)=>{
                e.domEvent.stopPropagation();
                void (0,_Pimcore_utils_clipboard__WEBPACK_IMPORTED_MODULE_9__.copyToClipboard)(element.className);
            }
        });
    }
    return {
        actionMenuItems
    };
};
_s(useElementActionsMenu, "+zLwmCpyJr1Qvatfc9tBwxU2fH4=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        antd__WEBPACK_IMPORTED_MODULE_3__.App.useApp
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
"./js/src/core/modules/user/hooks/use-user-management-context.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useUserManagementContext: () => (useUserManagementContext)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _user_management_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/user/user-management-provider.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var _s = $RefreshSig$();


const useUserManagementContext = ()=>{
    _s();
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_user_management_provider__WEBPACK_IMPORTED_MODULE_1__.UserContext);
    return {
        id
    };
};
_s(useUserManagementContext, "cXjLo1//Z4eo7bGcJs0ESH2TMGY=");

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
"./js/src/core/modules/user/management/detail/management-detail.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
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
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        detailTabs: css`
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: ${token.paddingSM}px ${token.paddingSM}px;
      
      .detail-tabs__content {
        height: 100%;
        width: 100%;
        overflow: hidden;
        
        .ant-tabs {
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .ant-tabs-content {
          display: flex;
          height: 100%;
          margin-left: -${token.paddingXS}px;
          margin-right: -${token.paddingXS}px;
          padding-left: ${token.paddingXS}px;
          padding-right: ${token.paddingXS}px;
        }

        .ant-tabs-tabpane {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }

        .ant-tabs-content-holder {
          overflow: auto;
        }
      }
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/modules/user/management/detail/management-detail.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ManagementDetail: () => (ManagementDetail)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_user_detail_tab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-helper.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_user_user_management_slice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/user/user-management-slice.tsx");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/tabs/tabs.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _Pimcore_modules_user_management_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/user/management/toolbar/toolbar.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_management_detail_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/user/management/detail/management-detail.styles.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_11__);
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-draft.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_14__);
/* ESM import */var _Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* ESM import */var _Pimcore_modules_auth_hooks_use_user_draft__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user-draft.ts");
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
















const ManagementDetail = (param)=>{
    let { onCloneUser, onRemoveItem, ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation)();
    const { styles } = (0,_Pimcore_modules_user_management_detail_management_detail_styles__WEBPACK_IMPORTED_MODULE_10__.useStyle)();
    const classNames = [
        'detail-tabs',
        styles.detailTabs
    ];
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_12__.useFormModal)();
    const { user } = (0,_Pimcore_modules_auth_hooks_use_user_draft__WEBPACK_IMPORTED_MODULE_16__.useUserDraft)();
    const { openUser, closeUser, removeUser, cloneUser, getAllIds, activeId } = (0,_Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_3__.useUserManagementHelper)();
    const { user: openedUser } = (0,_Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_13__.useUserManagementDraft)(activeId);
    const [popConfirmOpen, setPopConfirmOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const triggerConfirm = (id)=>{
        closeUser(id);
    };
    const onHandleClose = (key)=>{
        var _selectUserById, _selectUserById1;
        if (((_selectUserById = (0,_Pimcore_modules_user_user_management_slice__WEBPACK_IMPORTED_MODULE_5__.selectUserById)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_6__.store.getState(), parseInt(key))) === null || _selectUserById === void 0 ? void 0 : _selectUserById.modified) && popConfirmOpen === null) {
            if (user === null || user === void 0 ? void 0 : user.allowDirtyClose) {
                triggerConfirm(parseInt(key));
            } else {
                setPopConfirmOpen(parseInt(key));
            }
            return;
        }
        if (!((_selectUserById1 = (0,_Pimcore_modules_user_user_management_slice__WEBPACK_IMPORTED_MODULE_5__.selectUserById)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_6__.store.getState(), parseInt(key))) === null || _selectUserById1 === void 0 ? void 0 : _selectUserById1.modified)) {
            triggerConfirm(parseInt(key));
            return;
        }
        if (popConfirmOpen !== null) {
            setPopConfirmOpen(null);
        }
    };
    const handleCloneUser = ()=>{
        modal.input({
            title: t('user-management.clone-user'),
            label: t('user-management.clone-user.label'),
            onOk: async (value)=>{
                const data = await cloneUser({
                    id: activeId,
                    name: value
                });
                onCloneUser(data, openedUser === null || openedUser === void 0 ? void 0 : openedUser.parentId);
            }
        });
    };
    const handleRemoveUser = ()=>{
        modal.confirm({
            title: t('user-management.remove-user'),
            content: t('user-management.remove-user.text'),
            onOk: async ()=>{
                triggerConfirm(activeId);
                await removeUser({
                    id: activeId
                });
                onRemoveItem(activeId, openedUser === null || openedUser === void 0 ? void 0 : openedUser.parentId);
            }
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setPopConfirmOpen(null);
    }, [
        user
    ]);
    if (activeId === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__.Content, {
            none: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/management-detail.tsx",
            lineNumber: 105,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_8__.ContentLayout, {
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_9__.Toolbar, {
            id: activeId,
            onCloneUser: handleCloneUser,
            onRemoveUser: handleRemoveUser
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/management-detail.tsx",
            lineNumber: 107,
            columnNumber: 40
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: classNames.join(' '),
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_7__.Tabs, {
                    activeKey: activeId.toString(),
                    items: getAllIds.map((id)=>{
                        var _selectUserById, _selectUserById1;
                        return {
                            key: id.toString(),
                            label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_14__.Popconfirm, {
                                onCancel: ()=>{
                                    setPopConfirmOpen(null);
                                },
                                onConfirm: ()=>{
                                    triggerConfirm(id);
                                },
                                open: popConfirmOpen === id,
                                title: t('widget-manager.tab-title.close-confirmation'),
                                children: [
                                    (_selectUserById = (0,_Pimcore_modules_user_user_management_slice__WEBPACK_IMPORTED_MODULE_5__.selectUserById)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_6__.store.getState(), id)) === null || _selectUserById === void 0 ? void 0 : _selectUserById.name,
                                    " ",
                                    ((_selectUserById1 = (0,_Pimcore_modules_user_user_management_slice__WEBPACK_IMPORTED_MODULE_5__.selectUserById)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_6__.store.getState(), id)) === null || _selectUserById1 === void 0 ? void 0 : _selectUserById1.modified) ? '*' : ''
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/management-detail.tsx",
                                lineNumber: 111,
                                columnNumber: 16
                            }, void 0)
                        };
                    }),
                    onChange: (id)=>{
                        openUser(Number(id));
                    },
                    onClose: onHandleClose
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/management-detail.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__.Content, {
                    className: 'detail-tabs__content',
                    "data-testid": (0,_Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_15__.createTabContentTestId)(activeId, {
                        prefix: 'user-tab'
                    }),
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_user_detail_tab__WEBPACK_IMPORTED_MODULE_2__.UserDetailTab, {
                        id: activeId
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/management-detail.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/management-detail.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/management-detail.tsx",
            lineNumber: 108,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/management-detail.tsx",
        lineNumber: 107,
        columnNumber: 10
    }, undefined);
};
_s(ManagementDetail, "LyDUrbb75ikF6gl1zDq50taO8aY=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation,
        _Pimcore_modules_user_management_detail_management_detail_styles__WEBPACK_IMPORTED_MODULE_10__.useStyle,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_12__.useFormModal,
        _Pimcore_modules_auth_hooks_use_user_draft__WEBPACK_IMPORTED_MODULE_16__.useUserDraft,
        _Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_3__.useUserManagementHelper,
        _Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_13__.useUserManagementDraft
    ];
});
_c = ManagementDetail;

var _c;
$RefreshReg$(_c, "ManagementDetail");

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
"./js/src/core/modules/user/management/detail/tabs/key-bindings/key-bindings-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KeyBindingsContainer: () => (KeyBindingsContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-draft.tsx");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-context.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-helper.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_key_bindings_key_bindings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/key-bindings/key-bindings.tsx");
/* ESM import */var _Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* ESM import */var _Pimcore_modules_user_hooks_use_merged_keybindings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/user/hooks/use-merged-keybindings.ts");
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









const KeyBindingsContainer = ()=>{
    _s();
    const [form] = _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.useForm();
    const { id } = (0,_Pimcore_modules_user_hooks_use_user_management_context__WEBPACK_IMPORTED_MODULE_4__.useUserManagementContext)();
    const { user, updateUserKeyBinding } = (0,_Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_3__.useUserManagementDraft)(id);
    const { resetUserKeyBindings } = (0,_Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_6__.useUserManagementHelper)();
    const { mergedKeyBindings, isLoading: isMergingKeyBindings } = (0,_Pimcore_modules_user_hooks_use_merged_keybindings__WEBPACK_IMPORTED_MODULE_9__.useMergedKeyBindings)(user === null || user === void 0 ? void 0 : user.keyBindings);
    const handleOnChange = (name, code)=>{
        updateUserKeyBinding(name, code);
    };
    if (isMergingKeyBindings) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_5__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/key-bindings/key-bindings-container.tsx",
            lineNumber: 40,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form, {
        "data-testid": (0,_Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_8__.createTabContentTestId)(id.toString(), {
            prefix: 'user-detail-tab',
            tabKey: 'key-bindings'
        }),
        form: form,
        layout: "vertical",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_key_bindings_key_bindings__WEBPACK_IMPORTED_MODULE_7__.KeyBindings, {
            onChange: handleOnChange,
            onResetKeyBindings: async ()=>await resetUserKeyBindings(id),
            values: mergedKeyBindings
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/key-bindings/key-bindings-container.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/key-bindings/key-bindings-container.tsx",
        lineNumber: 42,
        columnNumber: 10
    }, undefined);
};
_s(KeyBindingsContainer, "uYR6iegUjgCzE5XrIrvL/htq9cM=", false, function() {
    return [
        _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_2__.Form.useForm,
        _Pimcore_modules_user_hooks_use_user_management_context__WEBPACK_IMPORTED_MODULE_4__.useUserManagementContext,
        _Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_3__.useUserManagementDraft,
        _Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_6__.useUserManagementHelper,
        _Pimcore_modules_user_hooks_use_merged_keybindings__WEBPACK_IMPORTED_MODULE_9__.useMergedKeyBindings
    ];
});
_c = KeyBindingsContainer;

var _c;
$RefreshReg$(_c, "KeyBindingsContainer");

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
"./js/src/core/modules/user/management/detail/tabs/references/components/table/table.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Table: () => (Table)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_grid_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/grid/grid.tsx");
/* ESM import */var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/@tanstack/react-table/@tanstack/react-table");
/* ESM import */var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_tanstack_react_table__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
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




const Table = (param)=>{
    let { data, isLoading } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const [gridData, setGridData] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(data);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setGridData(data);
    }, [
        data
    ]);
    const columnHelper = (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_3__.createColumnHelper)();
    const createColumns = ()=>[
            columnHelper.accessor('id', {
                header: t('user-management.workspaces.columns.id'),
                meta: {
                    type: 'element-cell',
                    editable: true
                },
                size: 100
            }),
            columnHelper.accessor('path', {
                header: t('user-management.workspaces.columns.path'),
                meta: {
                    type: 'element-cell',
                    editable: true,
                    autoWidth: true
                }
            }),
            columnHelper.accessor('subtype', {
                header: t('user-management.workspaces.columns.subtype'),
                meta: {
                    type: 'element-cell',
                    editable: true
                },
                size: 150
            })
        ];
    const ownTableColumns = [
        ...createColumns()
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_grid_grid__WEBPACK_IMPORTED_MODULE_2__.Grid, {
        autoWidth: true,
        columns: ownTableColumns,
        data: gridData,
        isLoading: isLoading,
        resizable: true,
        setRowId: (row)=>row.cid
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/references/components/table/table.tsx",
        lineNumber: 50,
        columnNumber: 10
    }, undefined);
};
_s(Table, "rNIBCN+oGVZtDerrLUXvH4d3PZ8=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation
    ];
});
_c = Table;
var _c;
$RefreshReg$(_c, "Table");

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
"./js/src/core/modules/user/management/detail/tabs/references/references-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ReferenceContainer: () => (ReferenceContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_references_components_table_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/references/components/table/table.tsx");
/* ESM import */var _Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-draft.tsx");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-context.tsx");
/* ESM import */var _Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
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







const ReferenceContainer = (param)=>{
    let { ...props } = param;
    var _user_objectDependencies;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const { id } = (0,_Pimcore_modules_user_hooks_use_user_management_context__WEBPACK_IMPORTED_MODULE_6__.useUserManagementContext)();
    const { user } = (0,_Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_5__.useUserManagementDraft)(id);
    const accordionContent = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: t('user-management.references.documents')
            }, void 0, false),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_references_components_table_table__WEBPACK_IMPORTED_MODULE_3__.Table, {
                data: (user === null || user === void 0 ? void 0 : (_user_objectDependencies = user.objectDependencies) === null || _user_objectDependencies === void 0 ? void 0 : _user_objectDependencies.dependencies) ?? [],
                isLoading: false
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/references/references-container.tsx",
                lineNumber: 33,
                columnNumber: 15
            }, undefined)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_4__.Accordion, {
        activeKey: '1',
        bordered: true,
        collapsible: "icon",
        "data-testid": (0,_Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_7__.createTabContentTestId)(id.toString(), {
            prefix: 'user-detail-tab',
            tabKey: 'user-references'
        }),
        items: accordionContent,
        size: 'small',
        table: true
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/references/references-container.tsx",
        lineNumber: 35,
        columnNumber: 10
    }, undefined);
};
_s(ReferenceContainer, "wCY0uTGrPSMErYpH9LqYKnCDyaE=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _Pimcore_modules_user_hooks_use_user_management_context__WEBPACK_IMPORTED_MODULE_6__.useUserManagementContext,
        _Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_5__.useUserManagementDraft
    ];
});
_c = ReferenceContainer;

var _c;
$RefreshReg$(_c, "ReferenceContainer");

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
"./js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AdminAccordion: () => (AdminAccordion)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* ESM import */var _Pimcore_components_switch_switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/switch/switch.tsx");
/* ESM import */var _sdk_modules_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/sdk/modules/auth/index.ts");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var _login_token_modal_login_token_modal_container__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal-container.tsx");
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







const AdminAccordion = (param)=>{
    let { isDisabled, ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)();
    const { Text } = antd__WEBPACK_IMPORTED_MODULE_4__.Typography;
    const user = (0,_sdk_modules_auth__WEBPACK_IMPORTED_MODULE_3__.getCurrentUser)();
    const content = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: t('user-management.admin')
            }, void 0, false),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    user.isAdmin && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "m-b-normal",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                                name: 'admin',
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_switch_switch__WEBPACK_IMPORTED_MODULE_2__.Switch, {
                                    disabled: isDisabled === true,
                                    labelRight: t('user-management.admin'),
                                    size: 'small'
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx",
                                    lineNumber: 35,
                                    columnNumber: 15
                                }, undefined)
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Text, {
                                disabled: true,
                                children: t('user-management.admin.info')
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx",
                        lineNumber: 33,
                        columnNumber: 26
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_login_token_modal_login_token_modal_container__WEBPACK_IMPORTED_MODULE_7__.LoginTokenModalContainer, {
                            disabled: isDisabled
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_1__.Accordion, {
        activeKey: '1',
        bordered: true,
        items: content,
        size: 'small'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx",
        lineNumber: 46,
        columnNumber: 10
    }, undefined);
};
_s(AdminAccordion, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation
    ];
});
_c = AdminAccordion;

var _c;
$RefreshReg$(_c, "AdminAccordion");

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
"./js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CustomisationAccordion: () => (CustomisationAccordion)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_switch_switch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/switch/switch.tsx");
/* ESM import */var _Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/select/select.tsx");
/* ESM import */var _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/app/settings/hooks/use-settings.ts");
/* ESM import */var _Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/perspectives/hooks/use-perspectives.tsx");
/* ESM import */var _Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-helper.tsx");
/* ESM import */var _Pimcore_modules_translations_hooks_use_language_lookup__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/translations/hooks/use-language-lookup.ts");
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










const CustomisationAccordion = (param)=>{
    let { isAdmin, ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const { availableAdminLanguages, validLocales } = (0,_Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_7__.useSettings)();
    const { getDisplayName } = (0,_Pimcore_modules_translations_hooks_use_language_lookup__WEBPACK_IMPORTED_MODULE_10__.useLanguageLookup)();
    const [roleOptions, setRoleOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [perspectiveOptions, setPerspectiveOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { getRoleCollection } = (0,_Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_9__.useRoleHelper)();
    const { getPerspectiveConfigCollection } = (0,_Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_8__.usePerspectives)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (perspectiveOptions.length === 0) {
            getPerspectiveConfigCollection().then((data)=>{
                if (data === undefined) {
                    return;
                }
                setPerspectiveOptions(data.items.map((item)=>({
                        value: item.id,
                        label: item.name
                    })));
            }).catch((error)=>{
                console.error('Error fetching perspective config collection:', error);
            });
        }
        if (roleOptions.length === 0) {
            getRoleCollection().then((data)=>{
                if (data === undefined) {
                    return;
                }
                setRoleOptions(data.items.map((item)=>({
                        value: item.id,
                        label: item.name
                    })));
            }).catch((error)=>{
                console.error('Error fetching role collection:', error);
            });
        }
    }, []);
    const validLocalesOptions = [
        {
            value: '',
            label: '(system)'
        },
        ...Object.entries(validLocales).map((param)=>{
            let [key, value] = param;
            return {
                value: key,
                label: value
            };
        })
    ];
    const content = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: t('user-management.customisation')
            }, void 0, false),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                        label: t('user-management.firstname'),
                        name: "firstname",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {}, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                        label: t('user-management.lastname'),
                        name: "lastname",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {}, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                        label: t('user-management.email'),
                        name: "email",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {
                            type: 'email'
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                        label: t('user-management.language'),
                        name: "language",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_6__.Select, {
                            optionFilterProp: "label",
                            options: availableAdminLanguages.map((language)=>({
                                    value: language,
                                    label: getDisplayName(language)
                                })),
                            placeholder: t('user-management.language'),
                            showSearch: true
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, undefined),
                    isAdmin === false ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                label: t('user-management.roles'),
                                name: "roles",
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_6__.Select, {
                                    mode: "multiple",
                                    options: roleOptions,
                                    placeholder: t('user-management.roles')
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                                    lineNumber: 103,
                                    columnNumber: 17
                                }, undefined)
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                                lineNumber: 102,
                                columnNumber: 15
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                label: t('user-management.perspectives'),
                                name: "perspectives",
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_6__.Select, {
                                    mode: "multiple",
                                    options: perspectiveOptions,
                                    placeholder: t('user-management.perspectives')
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                                    lineNumber: 107,
                                    columnNumber: 17
                                }, undefined)
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, undefined)
                        ]
                    }, void 0, true) : null,
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                        label: t('user-management.dateTime'),
                        name: "dateTimeLocale",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_6__.Select, {
                            optionFilterProp: "label",
                            options: validLocalesOptions,
                            placeholder: t('user-management.dateTime'),
                            showSearch: true
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                        name: "welcomeScreen",
                        style: {
                            marginBottom: '0'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_switch_switch__WEBPACK_IMPORTED_MODULE_5__.Switch, {
                            labelRight: t('user-management.welcomeScreen'),
                            size: 'small'
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                        name: "memorizeTabs",
                        style: {
                            marginBottom: '0'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_switch_switch__WEBPACK_IMPORTED_MODULE_5__.Switch, {
                            labelRight: t('user-management.memorizeTabs'),
                            size: 'small'
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                        name: "allowDirtyClose",
                        style: {
                            marginBottom: '0'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_switch_switch__WEBPACK_IMPORTED_MODULE_5__.Switch, {
                            labelRight: t('user-management.allowDirtyClose'),
                            size: 'small'
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                        name: "closeWarning",
                        style: {
                            marginBottom: '0'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_switch_switch__WEBPACK_IMPORTED_MODULE_5__.Switch, {
                            labelRight: t('user-management.closeWarning'),
                            size: 'small'
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_3__.Accordion, {
        activeKey: '1',
        bordered: true,
        items: content,
        size: 'small'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx",
        lineNumber: 140,
        columnNumber: 10
    }, undefined);
};
_s(CustomisationAccordion, "N5+1iL+EzP6GPHOb3g6tXrrVas4=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_7__.useSettings,
        _Pimcore_modules_translations_hooks_use_language_lookup__WEBPACK_IMPORTED_MODULE_10__.useLanguageLookup,
        _Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_9__.useRoleHelper,
        _Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_8__.usePerspectives
    ];
});
_c = CustomisationAccordion;

var _c;
$RefreshReg$(_c, "CustomisationAccordion");

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
"./js/src/core/modules/user/management/detail/tabs/settings/components/form/permissions-accordion.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PermissionsAccordion: () => (PermissionsAccordion)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/select/select.tsx");
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





const PermissionsAccordion = (param)=>{
    let { permissions, ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const content = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: t('user-management.permissions.default')
            }, void 0, false),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                        name: "permissionsDefault",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_5__.Select, {
                            dataTestId: "permissions-select-default",
                            mode: "multiple",
                            options: permissions.default.map((permission)=>({
                                    value: permission.key,
                                    label: t(`user-management.permissions.${permission.key}`)
                                })),
                            placeholder: t('user-management.permissions.default')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/permissions-accordion.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/permissions-accordion.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                        name: "permissionsBundles",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_5__.Select, {
                            dataTestId: "permissions-select-bundles",
                            mode: "multiple",
                            options: permissions.bundles.map((permission)=>({
                                    value: permission.key,
                                    label: permission.key
                                })),
                            placeholder: t('user-management.permissions.bundles')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/permissions-accordion.tsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/permissions-accordion.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_3__.Accordion, {
        activeKey: '1',
        bordered: true,
        items: content,
        size: 'small'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/permissions-accordion.tsx",
        lineNumber: 41,
        columnNumber: 10
    }, undefined);
};
_s(PermissionsAccordion, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation
    ];
});
_c = PermissionsAccordion;

var _c;
$RefreshReg$(_c, "PermissionsAccordion");

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
"./js/src/core/modules/user/management/detail/tabs/settings/components/form/shared-translation-settings-accordion.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SharedTranslationSettingsAccordion: () => (SharedTranslationSettingsAccordion)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_settings_components_table_language_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/table/language-table.tsx");
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




const SharedTranslationSettingsAccordion = (param)=>{
    let { data, viewData, editData, onChange, ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const content = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: t('user-management.shared-translation-settings')
            }, void 0, false),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_table_language_table__WEBPACK_IMPORTED_MODULE_4__.LanguageTable, {
                data: data,
                editData: editData,
                onChange: (languages)=>{
                    onChange(languages);
                },
                viewData: viewData
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/shared-translation-settings-accordion.tsx",
                lineNumber: 28,
                columnNumber: 15
            }, undefined)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_2__.Accordion, {
        activeKey: '1',
        bordered: true,
        items: content,
        size: 'small',
        table: true
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/shared-translation-settings-accordion.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, undefined);
};
_s(SharedTranslationSettingsAccordion, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation
    ];
});
_c = SharedTranslationSettingsAccordion;

var _c;
$RefreshReg$(_c, "SharedTranslationSettingsAccordion");

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
"./js/src/core/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TypesAndClassesAccordion: () => (TypesAndClassesAccordion)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/select/select.tsx");
/* ESM import */var _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/document/document-api-slice-enhanced.ts");
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







const TypesAndClassesAccordion = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const { data: classesData, isLoading: classesLoading } = (0,_Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_6__.useClassDefinitionCollectionQuery)();
    const { data: documentTypesData, isLoading: documentTypesLoading } = (0,_Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_7__.useDocumentDocTypeListQuery)({});
    const content = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: t('user-management.types-and-classes')
            }, void 0, false),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                        name: "docTypes",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_5__.Select, {
                            disabled: documentTypesLoading,
                            mode: "multiple",
                            options: documentTypesData === null || documentTypesData === void 0 ? void 0 : documentTypesData.items.map((item)=>({
                                    label: item.name,
                                    value: item.id
                                })),
                            placeholder: t('user-management.doc-types')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion.tsx",
                            lineNumber: 35,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                        name: "classes",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_5__.Select, {
                            disabled: classesLoading,
                            mode: "multiple",
                            options: classesData === null || classesData === void 0 ? void 0 : classesData.items.map((item)=>({
                                    label: item.name,
                                    value: item.id
                                })),
                            placeholder: t('user-management.classes')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_3__.Accordion, {
        activeKey: '1',
        bordered: true,
        items: content,
        size: 'small'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion.tsx",
        lineNumber: 48,
        columnNumber: 10
    }, undefined);
};
_s(TypesAndClassesAccordion, "wmBrroyGRDVU3CXZIO7BmDdcsaI=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _Pimcore_modules_class_definition_class_definition_slice_enhanced__WEBPACK_IMPORTED_MODULE_6__.useClassDefinitionCollectionQuery,
        _Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_7__.useDocumentDocTypeListQuery
    ];
});
_c = TypesAndClassesAccordion;

var _c;
$RefreshReg$(_c, "TypesAndClassesAccordion");

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
"./js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LoginTokenModalContainer: () => (LoginTokenModalContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_app_config_app_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/config/app-config.ts");
/* ESM import */var _Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/router/router.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_modules_app_modal_holder_use_modal_holder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/modal-holder/use-modal-holder.ts");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-context.tsx");
/* ESM import */var _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/user/user-api-slice-enhanced.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("webpack/sharing/consume/default/react-router-dom/react-router-dom");
/* ESM import */var react_router_dom__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var _login_token_modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx");
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










const LoginTokenModalContainer = (param)=>{
    let { disabled } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_8__.useTranslation)();
    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
    const { addModal, removeModal } = (0,_Pimcore_modules_app_modal_holder_use_modal_holder__WEBPACK_IMPORTED_MODULE_4__.useModalHolder)();
    const modalId = 'login-as-different-user-modal';
    const { id } = (0,_Pimcore_modules_user_hooks_use_user_management_context__WEBPACK_IMPORTED_MODULE_5__.useUserManagementContext)();
    const [trigger, { data, isLoading, isFetching }] = (0,_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_6__.useLazyUserTokenLinkGetQuery)();
    const closeModal = ()=>{
        if (isOpen) {
            setIsOpen(false);
            removeModal(modalId);
        }
    };
    const openModal = async ()=>{
        if (!isOpen) {
            await trigger({
                id,
                tokenLink: {
                    tokenLoginUrl: `${_Pimcore_app_config_app_config__WEBPACK_IMPORTED_MODULE_1__.currentDomain}${(0,react_router_dom__WEBPACK_IMPORTED_MODULE_9__.generatePath)(_Pimcore_app_router_router__WEBPACK_IMPORTED_MODULE_2__.routes.login)}`
                }
            });
            setIsOpen(true);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(()=>{
        if (isOpen) {
            addModal(modalId, /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_login_token_modal__WEBPACK_IMPORTED_MODULE_10__.LoginTokenModal, {
                isLoading: isLoading || isFetching,
                onCancel: closeModal,
                onClose: closeModal,
                onOk: closeModal,
                open: isOpen,
                tokenUrl: (data === null || data === void 0 ? void 0 : data.link) ?? ''
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal-container.tsx",
                lineNumber: 60,
                columnNumber: 25
            }, undefined));
        }
    }, [
        isOpen,
        data,
        isLoading
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
        disabled: disabled,
        loading: isLoading || isFetching,
        onClick: openModal,
        type: "default",
        children: t('user-management.admin.login')
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal-container.tsx",
        lineNumber: 63,
        columnNumber: 10
    }, undefined);
};
_s(LoginTokenModalContainer, "mo3RtykGo1pPEhBJL/7EAj2RNJ4=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_8__.useTranslation,
        _Pimcore_modules_app_modal_holder_use_modal_holder__WEBPACK_IMPORTED_MODULE_4__.useModalHolder,
        _Pimcore_modules_user_hooks_use_user_management_context__WEBPACK_IMPORTED_MODULE_5__.useUserManagementContext,
        _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_6__.useLazyUserTokenLinkGetQuery
    ];
});
_c = LoginTokenModalContainer;
var _c;
$RefreshReg$(_c, "LoginTokenModalContainer");

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
"./js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LoginTokenModal: () => (LoginTokenModal)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/button-group/button-group.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/modal/modal.tsx");
/* ESM import */var _Pimcore_utils_clipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/utils/clipboard.ts");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_8__);
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








const LoginTokenModal = (param)=>{
    let { tokenUrl, isLoading = false, ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_8__.useTranslation)();
    const { success, error } = (0,_sdk_components__WEBPACK_IMPORTED_MODULE_6__.useMessage)();
    const copyToClipboard = (e)=>{
        var _props_onClose;
        void (0,_Pimcore_utils_clipboard__WEBPACK_IMPORTED_MODULE_5__.copyToClipboardWithFeedback)(tokenUrl, ()=>{
            void success(t('clipboard.copy.success'));
        }, ()=>{
            void error(t('clipboard.copy.error'));
        });
        (_props_onClose = props.onClose) === null || _props_onClose === void 0 ? void 0 : _props_onClose.call(props, e);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_4__.Modal, {
        ...props,
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
            justify: "end",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
                items: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        loading: isLoading,
                        onClick: props.onClose,
                        children: t('login-token-modal.close')
                    }, "closeBtn", false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx",
                        lineNumber: 39,
                        columnNumber: 77
                    }, void 0),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        loading: isLoading,
                        onClick: copyToClipboard,
                        type: "primary",
                        children: t('login-token-modal.copy-and-close')
                    }, "copyAndCloseBtn", false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx",
                        lineNumber: 41,
                        columnNumber: 22
                    }, void 0)
                ]
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx",
                lineNumber: 39,
                columnNumber: 56
            }, void 0)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx",
            lineNumber: 39,
            columnNumber: 36
        }, void 0),
        title: t('login-token-modal.title'),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_3__.Flex, {
            vertical: true,
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                    children: [
                        t('login-token-modal.description'),
                        ":"
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.TextArea, {
                    readOnly: true,
                    rows: 5,
                    value: tokenUrl
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/components/login-token-modal/login-token-modal.tsx",
        lineNumber: 39,
        columnNumber: 10
    }, undefined);
};
_s(LoginTokenModal, "nHP74TSLNaRmA+FLjQOmPqbtdF4=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_8__.useTranslation,
        _sdk_components__WEBPACK_IMPORTED_MODULE_6__.useMessage
    ];
});
_c = LoginTokenModal;
var _c;
$RefreshReg$(_c, "LoginTokenModal");

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
"./js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SettingsContainer: () => (SettingsContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* ESM import */var _Pimcore_components_switch_switch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/switch/switch.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-draft.tsx");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_context__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-context.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-helper.tsx");
/* ESM import */var _Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_settings_components_user_avatar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/user-avatar.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_settings_settings_helper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/settings-helper.ts");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/app/settings/hooks/use-settings.ts");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_settings_components_form_admin_accordion__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/admin-accordion.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_settings_components_form_customisation_accordion__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/customisation-accordion.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_settings_components_form_permissions_accordion__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/permissions-accordion.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_settings_components_form_types_classes_accordion__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_settings_components_form_editor_settings_accordion__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/editor-settings-accordion.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_settings_components_form_shared_translation_settings_accordion__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/shared-translation-settings-accordion.tsx");
/* ESM import */var _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
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























const SettingsContainer = (param)=>{
    let { ...props } = param;
    _s();
    const { validLanguages } = (0,_Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_16__.useSettings)();
    const [form] = _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.useForm();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation)();
    const { Text } = antd__WEBPACK_IMPORTED_MODULE_3__.Typography;
    const { id } = (0,_Pimcore_modules_user_hooks_use_user_management_context__WEBPACK_IMPORTED_MODULE_9__.useUserManagementContext)();
    const user = (0,_Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_23__.useUser)();
    const { user: openedUser, isLoading, changeUserInState, updateUserImageInState } = (0,_Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_8__.useUserManagementDraft)(id);
    const { getAvailablePermissions } = (0,_Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_11__.useUserManagementHelper)();
    const permissions = (0,_Pimcore_modules_user_management_detail_tabs_settings_settings_helper__WEBPACK_IMPORTED_MODULE_14__.getGroupedPermissions)(getAvailablePermissions());
    const [passwordType, setPasswordType] = react__WEBPACK_IMPORTED_MODULE_2___default().useState('password');
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (!isLoading) {
            var _openedUser_twoFactorAuthentication;
            form.setFieldsValue({
                active: openedUser === null || openedUser === void 0 ? void 0 : openedUser.active,
                admin: openedUser === null || openedUser === void 0 ? void 0 : openedUser.admin,
                classes: openedUser === null || openedUser === void 0 ? void 0 : openedUser.classes,
                docTypes: openedUser === null || openedUser === void 0 ? void 0 : openedUser.docTypes,
                name: openedUser === null || openedUser === void 0 ? void 0 : openedUser.name,
                twoFactorAuthenticationRequired: (openedUser === null || openedUser === void 0 ? void 0 : (_openedUser_twoFactorAuthentication = openedUser.twoFactorAuthentication) === null || _openedUser_twoFactorAuthentication === void 0 ? void 0 : _openedUser_twoFactorAuthentication.required) ?? false,
                firstname: openedUser === null || openedUser === void 0 ? void 0 : openedUser.firstname,
                lastname: openedUser === null || openedUser === void 0 ? void 0 : openedUser.lastname,
                email: openedUser === null || openedUser === void 0 ? void 0 : openedUser.email,
                language: openedUser === null || openedUser === void 0 ? void 0 : openedUser.language,
                dateTimeLocale: (openedUser === null || openedUser === void 0 ? void 0 : openedUser.dateTimeLocale) ?? '',
                welcomeScreen: openedUser === null || openedUser === void 0 ? void 0 : openedUser.welcomeScreen,
                memorizeTabs: openedUser === null || openedUser === void 0 ? void 0 : openedUser.memorizeTabs,
                allowDirtyClose: openedUser === null || openedUser === void 0 ? void 0 : openedUser.allowDirtyClose,
                closeWarning: openedUser === null || openedUser === void 0 ? void 0 : openedUser.closeWarning,
                roles: (openedUser === null || openedUser === void 0 ? void 0 : openedUser.roles) ?? [],
                permissionsDefault: Array.isArray(openedUser === null || openedUser === void 0 ? void 0 : openedUser.permissions) ? openedUser.permissions.filter((permission)=>permissions.default.some((defaultPermission)=>defaultPermission.key === permission)) : [],
                permissionsBundles: Array.isArray(openedUser === null || openedUser === void 0 ? void 0 : openedUser.permissions) ? openedUser.permissions.filter((permission)=>permissions.bundles.some((defaultPermission)=>defaultPermission.key === permission)) : []
            });
        }
    }, [
        openedUser,
        isLoading,
        permissions
    ]);
    const onValuesChange = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((0,lodash__WEBPACK_IMPORTED_MODULE_1__.debounce)((changedValues, allValues)=>{
        if (changedValues.permissionsDefault !== undefined || changedValues.permissionsBundles !== undefined) {
            allValues.permissions = [
                ...changedValues.permissionsDefault ?? allValues.permissionsDefault ?? [],
                ...changedValues.permissionsBundles ?? allValues.permissionsBundles ?? []
            ];
        }
        changeUserInState(allValues);
    }, 300), [
        changeUserInState
    ]);
    const formatLastLogin = (timestamp)=>{
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    };
    if (isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_10__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
            lineNumber: 97,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form, {
        "data-testid": (0,_Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_12__.createTabContentTestId)(id.toString(), {
            prefix: 'user-detail-tab',
            tabKey: 'settings'
        }),
        form: form,
        layout: "vertical",
        onValuesChange: onValuesChange,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Row, {
            gutter: [
                10,
                10
            ],
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                    span: 8,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_5__.Accordion, {
                        activeKey: '1',
                        bordered: true,
                        items: [
                            {
                                key: '1',
                                title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: t('user-management.general')
                                }, void 0, false),
                                info: 'ID: ' + id,
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Flex, {
                                            align: "center",
                                            gap: "small",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                                                    className: 'm-b-none',
                                                    name: "active",
                                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_switch_switch__WEBPACK_IMPORTED_MODULE_6__.Switch, {
                                                        disabled: (user === null || user === void 0 ? void 0 : user.id) === (openedUser === null || openedUser === void 0 ? void 0 : openedUser.id),
                                                        labelRight: t('user-management.active'),
                                                        size: 'small'
                                                    }, void 0, false, {
                                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                                        lineNumber: 112,
                                                        columnNumber: 23
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 21
                                                }, void 0),
                                                (openedUser === null || openedUser === void 0 ? void 0 : openedUser.lastLogin) !== undefined && (openedUser === null || openedUser === void 0 ? void 0 : openedUser.lastLogin) !== null ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Text, {
                                                    disabled: true,
                                                    children: [
                                                        t('user-management.last-login'),
                                                        ": ",
                                                        formatLastLogin(openedUser.lastLogin)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 94
                                                }, void 0) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                            lineNumber: 110,
                                            columnNumber: 19
                                        }, void 0),
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                                            label: t('user-management.name'),
                                            name: 'name',
                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Input, {
                                                disabled: true
                                            }, void 0, false, {
                                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                                lineNumber: 119,
                                                columnNumber: 21
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                            lineNumber: 118,
                                            columnNumber: 19
                                        }, void 0),
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                                            label: t('user-management.password'),
                                            name: 'password',
                                            rules: [
                                                {
                                                    min: 10
                                                }
                                            ],
                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Input, {
                                                autoComplete: "new-password",
                                                suffix: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_15__.IconButton, {
                                                    icon: {
                                                        value: 'locked'
                                                    },
                                                    onClick: ()=>{
                                                        const newPassword = (0,_Pimcore_modules_user_management_detail_tabs_settings_settings_helper__WEBPACK_IMPORTED_MODULE_14__.generatePassword)();
                                                        form.setFieldValue('password', newPassword);
                                                        changeUserInState({
                                                            password: newPassword
                                                        });
                                                        setPasswordType('text');
                                                    },
                                                    title: t('user-management.generate-password'),
                                                    variant: 'minimal'
                                                }, void 0, false, {
                                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 64
                                                }, void 0),
                                                type: passwordType
                                            }, void 0, false, {
                                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                                lineNumber: 125,
                                                columnNumber: 21
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                            lineNumber: 122,
                                            columnNumber: 19
                                        }, void 0),
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.Item, {
                                            name: 'twoFactorAuthenticationRequired',
                                            style: {
                                                marginBottom: '0'
                                            },
                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_switch_switch__WEBPACK_IMPORTED_MODULE_6__.Switch, {
                                                labelRight: t('user-management.two-factor-authentication'),
                                                size: 'small'
                                            }, void 0, false, {
                                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                                lineNumber: 140,
                                                columnNumber: 21
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                            lineNumber: 137,
                                            columnNumber: 19
                                        }, void 0)
                                    ]
                                }, void 0, true)
                            }
                        ],
                        size: 'small'
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                    span: 8,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_user_avatar__WEBPACK_IMPORTED_MODULE_13__.UserAvatar, {
                        onUserImageChanged: (imageUrl)=>{
                            updateUserImageInState(imageUrl);
                        },
                        user: openedUser
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 146,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                    span: 16,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_customisation_accordion__WEBPACK_IMPORTED_MODULE_18__.CustomisationAccordion, {
                        isAdmin: openedUser === null || openedUser === void 0 ? void 0 : openedUser.admin
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 150,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                    span: 16,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_admin_accordion__WEBPACK_IMPORTED_MODULE_17__.AdminAccordion, {
                        isDisabled: (user === null || user === void 0 ? void 0 : user.id) === (openedUser === null || openedUser === void 0 ? void 0 : openedUser.id)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, undefined),
                (openedUser === null || openedUser === void 0 ? void 0 : openedUser.admin) === false ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                            span: 16,
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_permissions_accordion__WEBPACK_IMPORTED_MODULE_19__.PermissionsAccordion, {
                                permissions: permissions
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                lineNumber: 159,
                                columnNumber: 17
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                            lineNumber: 158,
                            columnNumber: 15
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                            span: 16,
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_types_classes_accordion__WEBPACK_IMPORTED_MODULE_20__.TypesAndClassesAccordion, {}, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                                lineNumber: 162,
                                columnNumber: 17
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                            lineNumber: 161,
                            columnNumber: 15
                        }, undefined)
                    ]
                }, void 0, true) : null,
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                    span: 16,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_editor_settings_accordion__WEBPACK_IMPORTED_MODULE_21__.EditorSettingsAccordion, {
                        data: openedUser === null || openedUser === void 0 ? void 0 : openedUser.contentLanguages,
                        editData: openedUser === null || openedUser === void 0 ? void 0 : openedUser.websiteTranslationLanguagesEdit,
                        onChange: (languages)=>{
                            changeUserInState({
                                contentLanguages: languages
                            });
                        },
                        viewData: openedUser === null || openedUser === void 0 ? void 0 : openedUser.websiteTranslationLanguagesView
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 166,
                    columnNumber: 9
                }, undefined),
                (openedUser === null || openedUser === void 0 ? void 0 : openedUser.admin) === false ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                    span: 16,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_shared_translation_settings_accordion__WEBPACK_IMPORTED_MODULE_22__.SharedTranslationSettingsAccordion, {
                        data: validLanguages,
                        editData: openedUser === null || openedUser === void 0 ? void 0 : openedUser.websiteTranslationLanguagesEdit,
                        onChange: (languages)=>{
                            changeUserInState({
                                websiteTranslationLanguagesEdit: languages.filter((language)=>language.edit).map((language)=>language.abbreviation),
                                websiteTranslationLanguagesView: languages.filter((language)=>language.view).map((language)=>language.abbreviation)
                            });
                        },
                        viewData: openedUser === null || openedUser === void 0 ? void 0 : openedUser.websiteTranslationLanguagesView
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 175,
                        columnNumber: 15
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 174,
                    columnNumber: 40
                }, undefined) : null
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
            lineNumber: 103,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx",
        lineNumber: 99,
        columnNumber: 10
    }, undefined);
};
_s(SettingsContainer, "OZd2ySkzIrjo2bcmib16WBOhV+o=", false, function() {
    return [
        _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_16__.useSettings,
        _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.useForm,
        react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation,
        _Pimcore_modules_user_hooks_use_user_management_context__WEBPACK_IMPORTED_MODULE_9__.useUserManagementContext,
        _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_23__.useUser,
        _Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_8__.useUserManagementDraft,
        _Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_11__.useUserManagementHelper
    ];
});
_c = SettingsContainer;

var _c;
$RefreshReg$(_c, "SettingsContainer");

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
"./js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UserDetailTab: () => (UserDetailTab)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/tabs/tabs.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_settings_settings_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/settings-container.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_workspaces_workspaces_container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_key_bindings_key_bindings_container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/key-bindings/key-bindings-container.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_references_references_container__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/references/references-container.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var _Pimcore_modules_user_user_management_provider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/user/user-management-provider.tsx");
/* ESM import */var _Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-is-active-main-widget.ts");
/* ESM import */var _Pimcore_modules_user_hooks_use_global_user_management_context__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/user/hooks/use-global-user-management-context.ts");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-draft.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/content/content.tsx");
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












const UserDetailTab = (param)=>{
    let { id, ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation)();
    const isWidgetActive = (0,_Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__WEBPACK_IMPORTED_MODULE_9__.useIsActiveMainWidget)();
    const { setContext, removeContext } = (0,_Pimcore_modules_user_hooks_use_global_user_management_context__WEBPACK_IMPORTED_MODULE_10__.useGlobalUserContext)();
    const { user, isLoading, isError, removeUserFromState } = (0,_Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_11__.useUserManagementDraft)(id);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return ()=>{
            removeContext();
            removeUserFromState();
        };
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isWidgetActive) {
            setContext({
                id
            });
        }
        return ()=>{
            if (!isWidgetActive) {
                removeContext();
            }
        };
    }, [
        isWidgetActive
    ]);
    if (isError) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            children: "Error"
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx",
            lineNumber: 60,
            columnNumber: 12
        }, undefined);
    }
    if (isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_12__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx",
            lineNumber: 63,
            columnNumber: 12
        }, undefined);
    }
    if (user === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    const items = [
        {
            key: 'settings',
            label: t('user-management.settings.title'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_settings_container__WEBPACK_IMPORTED_MODULE_3__.SettingsContainer, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx",
                lineNumber: 71,
                columnNumber: 15
            }, undefined)
        },
        {
            key: 'workspaces',
            label: t('user-management.workspaces.title'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_workspaces_container__WEBPACK_IMPORTED_MODULE_4__.WorkspacesContainer, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx",
                lineNumber: 75,
                columnNumber: 15
            }, undefined),
            disabled: user.admin
        },
        {
            key: 'key-bindings',
            label: t('user-management.key-bindings.title'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_key_bindings_key_bindings_container__WEBPACK_IMPORTED_MODULE_5__.KeyBindingsContainer, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx",
                lineNumber: 80,
                columnNumber: 15
            }, undefined)
        },
        {
            key: 'user-references',
            label: t('user-management.references.title'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_references_references_container__WEBPACK_IMPORTED_MODULE_6__.ReferenceContainer, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx",
                lineNumber: 84,
                columnNumber: 15
            }, undefined)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_user_management_provider__WEBPACK_IMPORTED_MODULE_8__.UserManagementProvider, {
        id: id,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_2__.Tabs, {
            defaultActiveKey: "1",
            destroyInactiveTabPane: true,
            items: items
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx",
            lineNumber: 87,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/user-detail-tab.tsx",
        lineNumber: 86,
        columnNumber: 10
    }, undefined);
};
_s(UserDetailTab, "6jQPMR72b59VwIrgVjt/XEKOre4=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation,
        _Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__WEBPACK_IMPORTED_MODULE_9__.useIsActiveMainWidget,
        _Pimcore_modules_user_hooks_use_global_user_management_context__WEBPACK_IMPORTED_MODULE_10__.useGlobalUserContext,
        _Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_11__.useUserManagementDraft
    ];
});
_c = UserDetailTab;

var _c;
$RefreshReg$(_c, "UserDetailTab");

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
"./js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SpecialSettings: () => (SpecialSettings)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_modules_class_definition_class_definition_slice_gen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/class-definition/class-definition-slice.gen.ts");
/* ESM import */var _Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/select/select.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/app/settings/hooks/use-settings.ts");
/* ESM import */var _Pimcore_modules_translations_hooks_use_language_lookup__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/translations/hooks/use-language-lookup.ts");
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









const SpecialSettings = (param)=>{
    let { localizedView, localizedEdit, layouts, onValuesChange } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { data } = (0,_Pimcore_modules_class_definition_class_definition_slice_gen__WEBPACK_IMPORTED_MODULE_5__.useClassAllLayoutCollectionQuery)();
    const { validLanguages } = (0,_Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_8__.useSettings)();
    const { getDisplayName } = (0,_Pimcore_modules_translations_hooks_use_language_lookup__WEBPACK_IMPORTED_MODULE_9__.useLanguageLookup)();
    const [form] = antd__WEBPACK_IMPORTED_MODULE_7__.Form.useForm();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        form.setFieldsValue({
            localizedView,
            localizedEdit,
            layouts
        });
    }, []);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_7__.Form, {
        form: form,
        layout: "vertical",
        onValuesChange: onValuesChange,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
            gap: 'small',
            vertical: true,
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_2__.Accordion, {
                    activeKey: 'localizedFields',
                    bordered: true,
                    items: [
                        {
                            key: 'localizedFields',
                            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: t('user-management.workspaces.localized-fields')
                            }, void 0, false),
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_7__.Form.Item, {
                                        label: t('user-management.workspaces.localized-fields.view'),
                                        name: "localizedView",
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_6__.Select, {
                                            mode: "multiple",
                                            options: validLanguages.map((lang)=>({
                                                    value: lang,
                                                    label: getDisplayName(lang)
                                                })),
                                            placeholder: t('user-management.workspaces.localized-fields.view')
                                        }, void 0, false, {
                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
                                            lineNumber: 53,
                                            columnNumber: 19
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
                                        lineNumber: 52,
                                        columnNumber: 17
                                    }, void 0),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_7__.Form.Item, {
                                        label: t('user-management.workspaces.localized-fields.edit'),
                                        name: "localizedEdit",
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_6__.Select, {
                                            mode: "multiple",
                                            options: validLanguages.map((lang)=>({
                                                    value: lang,
                                                    label: getDisplayName(lang)
                                                })),
                                            placeholder: t('user-management.workspaces.localized-fields.edit')
                                        }, void 0, false, {
                                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
                                            lineNumber: 60,
                                            columnNumber: 19
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
                                        lineNumber: 59,
                                        columnNumber: 17
                                    }, void 0)
                                ]
                            }, void 0, true)
                        }
                    ],
                    size: 'small'
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_2__.Accordion, {
                    activeKey: 'customLayouts',
                    bordered: true,
                    items: [
                        {
                            key: 'customLayouts',
                            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: t('user-management.workspaces.custom-layouts')
                            }, void 0, false),
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_7__.Form.Item, {
                                label: t('user-management.workspaces.custom-layouts.select'),
                                name: "layouts",
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_6__.Select, {
                                    mode: "multiple",
                                    options: data === null || data === void 0 ? void 0 : data.items.map((layout)=>({
                                            value: layout.id,
                                            label: layout.name
                                        })),
                                    placeholder: t('user-management.workspaces.custom-layouts.select')
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
                                    lineNumber: 72,
                                    columnNumber: 17
                                }, void 0)
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
                                lineNumber: 71,
                                columnNumber: 19
                            }, void 0)
                        }
                    ],
                    size: 'small'
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx",
        lineNumber: 46,
        columnNumber: 10
    }, undefined);
};
_s(SpecialSettings, "vUEwtuT2PKc5urw+ZWazfTHFUa0=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_modules_class_definition_class_definition_slice_gen__WEBPACK_IMPORTED_MODULE_5__.useClassAllLayoutCollectionQuery,
        _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_8__.useSettings,
        _Pimcore_modules_translations_hooks_use_language_lookup__WEBPACK_IMPORTED_MODULE_9__.useLanguageLookup,
        antd__WEBPACK_IMPORTED_MODULE_7__.Form.useForm
    ];
});
_c = SpecialSettings;

var _c;
$RefreshReg$(_c, "SpecialSettings");

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
"./js/src/core/modules/user/management/detail/tabs/workspaces/components/table/table.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Table: () => (Table)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_grid_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/grid/grid.tsx");
/* ESM import */var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/@tanstack/react-table/@tanstack/react-table");
/* ESM import */var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_tanstack_react_table__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var _Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_workspaces_workspaces_container__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx");
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








const Table = (param)=>{
    let { showDuplicatePropertyModal, data, type, isLoading, onUpdateData, onShowSpecialSettings } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const [gridData, setGridData] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(data);
    const isAsset = type === _Pimcore_modules_user_management_detail_tabs_workspaces_workspaces_container__WEBPACK_IMPORTED_MODULE_8__.WorkspaceType.ASSET;
    const isObject = type === _Pimcore_modules_user_management_detail_tabs_workspaces_workspaces_container__WEBPACK_IMPORTED_MODULE_8__.WorkspaceType.OBJECT;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setGridData(data);
    }, [
        data
    ]);
    const columnHelper = (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_3__.createColumnHelper)();
    const createColumns = ()=>[
            columnHelper.accessor('cpath', {
                header: t('user-management.workspaces.columns.cpath'),
                meta: {
                    type,
                    editable: true,
                    autoWidth: true
                },
                size: 272
            }),
            columnHelper.accessor('list', {
                header: t('user-management.workspaces.columns.list'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            columnHelper.accessor('view', {
                header: t('user-management.workspaces.columns.view'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            !isAsset ? columnHelper.accessor('save', {
                header: t('user-management.workspaces.columns.save'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }) : null,
            columnHelper.accessor('publish', {
                header: t('user-management.workspaces.columns.publish'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            !isAsset ? columnHelper.accessor('unpublish', {
                header: t('user-management.workspaces.columns.unpublish'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }) : null,
            columnHelper.accessor('delete', {
                header: t('user-management.workspaces.columns.delete'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            columnHelper.accessor('rename', {
                header: t('user-management.workspaces.columns.rename'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            columnHelper.accessor('create', {
                header: t('user-management.workspaces.columns.create'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            columnHelper.accessor('settings', {
                header: t('user-management.workspaces.columns.settings'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            columnHelper.accessor('versions', {
                header: t('user-management.workspaces.columns.versions'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            columnHelper.accessor('properties', {
                header: t('user-management.workspaces.columns.properties'),
                size: 72,
                meta: {
                    type: 'checkbox',
                    editable: true,
                    config: {
                        align: 'center'
                    }
                }
            }),
            ...isObject ? [
                columnHelper.accessor('specialSettings', {
                    header: '',
                    size: 40,
                    cell: (context)=>{
                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__.IconButton, {
                            icon: {
                                value: 'settings'
                            },
                            onClick: ()=>onShowSpecialSettings === null || onShowSpecialSettings === void 0 ? void 0 : onShowSpecialSettings(context.row.original.cid),
                            type: "link"
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/table/table.tsx",
                            lineNumber: 159,
                            columnNumber: 14
                        }, undefined);
                    }
                })
            ] : [],
            columnHelper.accessor('actions', {
                header: '',
                size: 40,
                cell: (context)=>{
                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_6__.Flex, {
                        align: "center",
                        className: "w-full h-full",
                        justify: "center",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_5__.IconButton, {
                            icon: {
                                value: 'trash'
                            },
                            onClick: ()=>{
                                handleRemoveRow(context.row.id);
                            },
                            type: "link"
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/table/table.tsx",
                            lineNumber: 168,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/table/table.tsx",
                        lineNumber: 167,
                        columnNumber: 14
                    }, undefined);
                }
            })
        ].filter(Boolean);
    const ownTableColumns = [
        ...createColumns()
    ];
    const onUpdateCellData = (param)=>{
        let { rowIndex, columnId, value, rowData } = param;
        setGridData(gridData.map((item, index)=>{
            if (index === rowIndex) {
                return {
                    ...item,
                    [columnId]: value
                };
            }
            return item;
        }));
        const updatedProperties = [
            ...gridData ?? []
        ];
        const propertyIndex = updatedProperties.findIndex((property)=>property.cpath === rowData.cpath);
        const updatedProperty = {
            ...updatedProperties.at(propertyIndex),
            [columnId]: value,
            cid: value.id !== undefined ? value.id : rowData.cid,
            cpath: value.fullPath !== undefined ? value.fullPath : rowData.cpath
        };
        updatedProperties[propertyIndex] = updatedProperty;
        const hasDuplicate = updatedProperties.filter((property)=>property.cpath === updatedProperty.cpath).length > 1;
        if (hasDuplicate) {
            updatedProperty.cpath = '';
            setGridData(updatedProperties);
            showDuplicatePropertyModal();
        } else {
            setGridData(updatedProperties);
            onUpdateData(updatedProperties);
        }
    };
    const handleRemoveRow = (id)=>{
        const updatedProperties = [
            ...gridData ?? []
        ];
        const propertyIndex = updatedProperties.findIndex((property)=>property.cid === id);
        updatedProperties.splice(propertyIndex, 1);
        setGridData(updatedProperties);
        onUpdateData(updatedProperties);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_grid_grid__WEBPACK_IMPORTED_MODULE_2__.Grid, {
        autoWidth: true,
        columns: ownTableColumns,
        data: gridData,
        dataTestId: (0,_Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_7__.createTableTestId)(`user-workspaces-${type ?? 'unknown'}`),
        isLoading: isLoading,
        onUpdateCellData: onUpdateCellData,
        resizable: true,
        setRowId: (row)=>row.cid
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/components/table/table.tsx",
        lineNumber: 218,
        columnNumber: 10
    }, undefined);
};
_s(Table, "rNIBCN+oGVZtDerrLUXvH4d3PZ8=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation
    ];
});
_c = Table;
var _c;
$RefreshReg$(_c, "Table");

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
"./js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WorkspaceType: () => (WorkspaceType),
  WorkspacesContainer: () => (WorkspacesContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_workspaces_components_table_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/workspaces/components/table/table.tsx");
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-draft.tsx");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-context.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_modal_useModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/modal/useModal/index.tsx");
/* ESM import */var _Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/modal/footer/modal-footer.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_workspaces_components_special_settings__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/workspaces/components/special-settings.tsx");
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













let WorkspaceType = /*#__PURE__*/ function(WorkspaceType) {
    WorkspaceType["DOCUMENT"] = "document";
    WorkspaceType["ASSET"] = "asset";
    WorkspaceType["OBJECT"] = "object";
    return WorkspaceType;
}({});
const WorkspacesContainer = (param)=>{
    let { ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { id } = (0,_Pimcore_modules_user_hooks_use_user_management_context__WEBPACK_IMPORTED_MODULE_7__.useUserManagementContext)();
    const { user, isLoading, changeUserInState } = (0,_Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_6__.useUserManagementDraft)(id);
    const [assetWorkspaces, setAssetWorkspaces] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((user === null || user === void 0 ? void 0 : user.assetWorkspaces) ?? []);
    const [documentWorkspaces, setDocumentWorkspaces] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((user === null || user === void 0 ? void 0 : user.documentWorkspaces) ?? []);
    const [objectWorkspaces, setObjectWorkspaces] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((user === null || user === void 0 ? void 0 : user.dataObjectWorkspaces) ?? []);
    const [specialModalContext, setSpecialModalContext] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { showModal: showDuplicatePropertyModal, closeModal: closeDuplicatePropertyModal, renderModal: DuplicatePropertyModal } = (0,_Pimcore_components_modal_useModal__WEBPACK_IMPORTED_MODULE_9__.useModal)({
        type: 'error'
    });
    const { renderModal: SpecialSettingsModal, showModal: showSpecialSettingsModal, handleCancel, handleOk } = (0,_Pimcore_components_modal_useModal__WEBPACK_IMPORTED_MODULE_9__.useModal)({
        type: 'default'
    });
    if (user === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    const documentsAccordion = [
        {
            key: 'documents',
            id: 'documents',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: t('user-management.workspaces.documents')
            }, void 0, false),
            info: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_5__.IconTextButton, {
                icon: {
                    value: 'add-find'
                },
                onClick: ()=>{
                    setDocumentWorkspaces([
                        ...user.documentWorkspaces,
                        {
                            cid: new Date().getTime(),
                            // after path update is set to document id
                            cpath: '',
                            list: false,
                            view: false,
                            save: false,
                            publish: false,
                            unpublish: false,
                            delete: false,
                            rename: false,
                            create: false,
                            settings: false,
                            versions: false,
                            properties: false
                        }
                    ]);
                },
                children: t('user-management.workspaces.add')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 70,
                columnNumber: 11
            }, undefined),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_components_table_table__WEBPACK_IMPORTED_MODULE_4__.Table, {
                data: documentWorkspaces,
                isLoading: isLoading,
                onUpdateData: (data)=>{
                    changeUserInState({
                        documentWorkspaces: data
                    });
                },
                showDuplicatePropertyModal: ()=>{
                    showDuplicatePropertyModal();
                },
                type: WorkspaceType.DOCUMENT
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 92,
                columnNumber: 15
            }, undefined)
        }
    ];
    const assetsAccordion = [
        {
            key: 'assets',
            id: 'assets',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: t('user-management.workspaces.assets')
            }, void 0, false),
            info: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_5__.IconTextButton, {
                icon: {
                    value: 'add-find'
                },
                onClick: ()=>{
                    setAssetWorkspaces([
                        ...user.assetWorkspaces,
                        {
                            cid: new Date().getTime(),
                            // after path update is set to document id
                            cpath: '',
                            list: false,
                            view: false,
                            publish: false,
                            delete: false,
                            rename: false,
                            create: false,
                            settings: false,
                            versions: false,
                            properties: false
                        }
                    ]);
                },
                children: t('user-management.workspaces.add')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 104,
                columnNumber: 11
            }, undefined),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_components_table_table__WEBPACK_IMPORTED_MODULE_4__.Table, {
                data: assetWorkspaces,
                isLoading: isLoading,
                onUpdateData: (data)=>{
                    changeUserInState({
                        assetWorkspaces: data
                    });
                },
                showDuplicatePropertyModal: ()=>{
                    showDuplicatePropertyModal();
                },
                type: WorkspaceType.ASSET
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 124,
                columnNumber: 15
            }, undefined)
        }
    ];
    let currentSpecialModalData = {};
    const getSpecialModalValues = (type)=>{
        var _user_dataObjectWorkspaces_find;
        return (user === null || user === void 0 ? void 0 : (_user_dataObjectWorkspaces_find = user.dataObjectWorkspaces.find((ws)=>ws.cid === specialModalContext)) === null || _user_dataObjectWorkspaces_find === void 0 ? void 0 : _user_dataObjectWorkspaces_find[type]) ?? [];
    };
    const objectsAccordion = [
        {
            key: 'objects',
            id: 'objects',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: t('user-management.workspaces.objects')
            }, void 0, false),
            info: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_5__.IconTextButton, {
                icon: {
                    value: 'add-find'
                },
                onClick: ()=>{
                    setObjectWorkspaces([
                        ...user.dataObjectWorkspaces,
                        {
                            cid: new Date().getTime(),
                            // after path update is set to document id
                            cpath: '',
                            list: false,
                            view: false,
                            save: false,
                            publish: false,
                            unpublish: false,
                            delete: false,
                            rename: false,
                            create: false,
                            settings: false,
                            versions: false,
                            properties: false
                        }
                    ]);
                },
                children: t('user-management.workspaces.add')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 140,
                columnNumber: 11
            }, undefined),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_components_table_table__WEBPACK_IMPORTED_MODULE_4__.Table, {
                data: objectWorkspaces,
                isLoading: isLoading,
                onShowSpecialSettings: (id)=>{
                    setSpecialModalContext(id);
                    showSpecialSettingsModal();
                },
                onUpdateData: (data)=>{
                    changeUserInState({
                        dataObjectWorkspaces: data
                    });
                },
                showDuplicatePropertyModal: ()=>{
                    showDuplicatePropertyModal();
                },
                type: WorkspaceType.OBJECT
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 162,
                columnNumber: 15
            }, undefined)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_8__.Flex, {
        "data-testid": (0,_Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_12__.createTabContentTestId)(id.toString(), {
            prefix: 'user-detail-tab',
            tabKey: 'workspaces'
        }),
        gap: 'small',
        vertical: true,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_2__.Accordion, {
                activeKey: 'documents',
                bordered: true,
                collapsible: "icon",
                items: documentsAccordion,
                size: 'small',
                table: true
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_2__.Accordion, {
                activeKey: 'assets',
                bordered: true,
                collapsible: "icon",
                items: assetsAccordion,
                size: 'small',
                table: true
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_2__.Accordion, {
                activeKey: 'objects',
                bordered: true,
                collapsible: "icon",
                items: objectsAccordion,
                size: 'small',
                table: true
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(DuplicatePropertyModal, {
                footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_10__.ModalFooter, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_11__.Button, {
                        onClick: closeDuplicatePropertyModal,
                        type: "primary",
                        children: t('button.ok')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                        lineNumber: 184,
                        columnNumber: 13
                    }, void 0)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                    lineNumber: 183,
                    columnNumber: 39
                }, void 0),
                title: t('properties.property-already-exist.title'),
                children: t('properties.property-already-exist.error')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SpecialSettingsModal, {
                footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_10__.ModalFooter, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_11__.Button, {
                            onClick: handleCancel,
                            type: 'default',
                            children: t('button.cancel')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                            lineNumber: 192,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_11__.Button, {
                            onClick: ()=>{
                                changeUserInState({
                                    dataObjectWorkspaces: user.dataObjectWorkspaces.map((ws)=>ws.cid === specialModalContext ? {
                                            ...ws,
                                            ...currentSpecialModalData
                                        } : ws)
                                });
                                handleOk();
                            },
                            type: 'primary',
                            children: t('button.apply')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                            lineNumber: 195,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                    lineNumber: 191,
                    columnNumber: 37
                }, void 0),
                size: 'L',
                title: t('user-management.workspaces.additional-settings'),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_components_special_settings__WEBPACK_IMPORTED_MODULE_13__.SpecialSettings, {
                    layouts: getSpecialModalValues('layouts'),
                    localizedEdit: getSpecialModalValues('localizedEdit'),
                    localizedView: getSpecialModalValues('localizedView'),
                    onValuesChange: (changedValues)=>{
                        const mergedData = {
                            ...currentSpecialModalData,
                            ...changedValues
                        };
                        currentSpecialModalData = mergedData;
                    }
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                    lineNumber: 207,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/detail/tabs/workspaces/workspaces-container.tsx",
        lineNumber: 173,
        columnNumber: 10
    }, undefined);
};
_s(WorkspacesContainer, "CbbplPZfGZQCWkNaKfHn2JCjyIE=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_modules_user_hooks_use_user_management_context__WEBPACK_IMPORTED_MODULE_7__.useUserManagementContext,
        _Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_6__.useUserManagementDraft,
        _Pimcore_components_modal_useModal__WEBPACK_IMPORTED_MODULE_9__.useModal,
        _Pimcore_components_modal_useModal__WEBPACK_IMPORTED_MODULE_9__.useModal
    ];
});
_c = WorkspacesContainer;

var _c;
$RefreshReg$(_c, "WorkspacesContainer");

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
"./js/src/core/modules/user/management/management-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ManagementContainer: () => (ManagementContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_user_management_tree_tree_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/user/management/tree/tree-container.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_management_detail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/user/management/detail/management-detail.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-helper.tsx");
/* ESM import */var _Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/user/management/tree/tree-helper.ts");
/* ESM import */var _Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* ESM import */var _Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* ESM import */var _Pimcore_components_predefined_layouts_config_config_layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/predefined-layouts/config/config-layout.tsx");
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










const ManagementContainer = (param)=>{
    let { userId, ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    const { getUserTree } = (0,_Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_6__.useUserManagementHelper)();
    const [expandedKeys, setExpandedKeys] = react__WEBPACK_IMPORTED_MODULE_1___default().useState([
        0
    ]);
    const treeParentItem = {
        title: t('user-management.tree.all'),
        key: 0,
        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
            value: 'folder'
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/management-container.tsx",
            lineNumber: 35,
            columnNumber: 11
        }, undefined),
        'data-testid': (0,_Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_9__.createTreeNodeTestId)(0, 'folder'),
        children: [],
        actions: [
            {
                key: 'add-folder',
                icon: 'folder-plus'
            },
            {
                key: 'add-user',
                icon: 'add-user'
            }
        ]
    };
    const [treeData, setTreeData] = react__WEBPACK_IMPORTED_MODULE_1___default().useState([
        treeParentItem
    ]);
    const createNodeByResponse = (items)=>{
        return items.map((item)=>({
                title: item.name,
                key: item.id,
                selectable: item.type === 'user',
                allowDrop: item.type !== 'user',
                allowDrag: item.type === 'user',
                icon: item.type === 'user' ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                    value: 'user'
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/management-container.tsx",
                    lineNumber: 54,
                    columnNumber: 36
                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                    value: 'folder'
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/management-container.tsx",
                    lineNumber: 54,
                    columnNumber: 62
                }, undefined),
                'data-testid': (0,_Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_9__.createTreeNodeTestId)(item.id, item.type),
                actions: item.type === 'user' ? [
                    {
                        key: 'clone-user',
                        icon: 'copy'
                    },
                    {
                        key: 'remove-user',
                        icon: 'trash'
                    }
                ] : [
                    {
                        key: 'add-folder',
                        icon: 'folder-plus'
                    },
                    {
                        key: 'add-user',
                        icon: 'add-user'
                    },
                    {
                        key: 'remove-folder',
                        icon: 'trash'
                    }
                ],
                children: [],
                isLeaf: item.hasChildren === false
            }));
    };
    const updateTreeData = (key, items)=>{
        setNodeLoading(key, false);
        setTreeData((data)=>{
            const parentNode = (0,_Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_7__.findNodeByKey)(data, key);
            if (parentNode !== undefined) {
                parentNode.children = parentNode.children ?? [];
                if (items.length === 0) {
                    parentNode.isLeaf = true;
                    setExpandedKeys(expandedKeys.filter((k)=>k !== key));
                } else {
                    parentNode.isLeaf = false;
                }
                const newChildren = createNodeByResponse(items);
                const newKeys = new Set(newChildren.map((child)=>child.key));
                parentNode.children = parentNode.children.filter((child)=>newKeys.has(child.key));
                const existingKeys = new Set(parentNode.children.map((child)=>child.key));
                parentNode.children = [
                    ...parentNode.children,
                    ...newChildren.filter((child)=>!existingKeys.has(child.key))
                ];
            }
            return [
                ...data
            ];
        });
    };
    const handleOnLoadData = async (node)=>{
        await getUserTree({
            parentId: Number(node.key)
        }).then((response)=>{
            updateTreeData(node.key, response.items);
        });
    };
    const setNodeLoading = (key, isLoading)=>{
        const node = (0,_Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_7__.findNodeByKey)(treeData, key);
        if (node !== undefined) {
            node.switcherIcon = isLoading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_8__.Spin, {
                type: "classic"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/management-container.tsx",
                lineNumber: 107,
                columnNumber: 39
            }, undefined) : undefined;
        }
        setTreeData([
            ...treeData
        ]);
    };
    const reloadTree = async (key)=>{
        if (key === undefined) {
            key = 0;
        }
        const { items } = await getUserTree({
            parentId: key
        });
        updateTreeData(key, items);
    };
    const sidebar = {
        id: 'user-tree',
        minSize: 170,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_tree_tree_container__WEBPACK_IMPORTED_MODULE_2__.TreeContainer, {
                expandedKeys: expandedKeys,
                onLoadTreeData: handleOnLoadData,
                onReloadTree: async (keys)=>{
                    for (const key of keys){
                        setNodeLoading(key, true);
                        await reloadTree(key);
                    }
                },
                onSetExpandedKeys: (keys)=>{
                    setExpandedKeys(keys);
                },
                onUpdateTreeData: updateTreeData,
                treeData: treeData,
                userId: userId
            }, "user-tree", false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/management-container.tsx",
                lineNumber: 125,
                columnNumber: 16
            }, undefined)
        ]
    };
    const main = {
        id: 'user-detail',
        minSize: 600,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_management_detail__WEBPACK_IMPORTED_MODULE_3__.ManagementDetail, {
                onCloneUser: async (data, parentId)=>{
                    setNodeLoading(parentId, true);
                    await reloadTree(parentId);
                },
                onRemoveItem: async (id, parentId)=>{
                    setNodeLoading(parentId, true);
                    await reloadTree(parentId);
                }
            }, "user-detail", false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/management-container.tsx",
                lineNumber: 137,
                columnNumber: 16
            }, undefined)
        ]
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_predefined_layouts_config_config_layout__WEBPACK_IMPORTED_MODULE_10__.ConfigLayout, {
        leftItem: sidebar,
        rightItem: main
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/management-container.tsx",
        lineNumber: 145,
        columnNumber: 10
    }, undefined);
};
_s(ManagementContainer, "v0KE6aAkVznvKTIds9cOb9OZ7zc=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation,
        _Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_6__.useUserManagementHelper
    ];
});
_c = ManagementContainer;

var _c;
$RefreshReg$(_c, "ManagementContainer");

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
"./js/src/core/modules/user/management/toolbar/toolbar-tree.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ToolbarTree: () => (ToolbarTree)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/dropdown-button/dropdown-button.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
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








const ToolbarTree = (param)=>{
    let { actions, onReload, onAddItem, onAddFolder } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const items = actions ?? [
        {
            key: '1',
            label: t('tree.actions.user'),
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_7__.Icon, {
                value: "add-user"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar-tree.tsx",
                lineNumber: 31,
                columnNumber: 11
            }, undefined),
            onClick: onAddItem ?? (()=>{})
        },
        {
            key: '2',
            label: t('tree.actions.folder'),
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_7__.Icon, {
                value: "folder-plus"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar-tree.tsx",
                lineNumber: 36,
                columnNumber: 11
            }, undefined),
            onClick: onAddFolder ?? (()=>{})
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_2__.Toolbar, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_4__.IconButton, {
                icon: {
                    value: 'refresh'
                },
                onClick: onReload,
                children: t('toolbar.reload')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar-tree.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_5__.Dropdown, {
                menu: {
                    items
                },
                trigger: [
                    'click'
                ],
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_6__.DropdownButton, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_8__.Flex, {
                        align: 'center',
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_7__.Icon, {
                                options: {
                                    width: 18,
                                    height: 18
                                },
                                value: 'new'
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar-tree.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, undefined),
                            " ",
                            t('toolbar.new')
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar-tree.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar-tree.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar-tree.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar-tree.tsx",
        lineNumber: 39,
        columnNumber: 10
    }, undefined);
};
_s(ToolbarTree, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation
    ];
});
_c = ToolbarTree;
var _c;
$RefreshReg$(_c, "ToolbarTree");

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
"./js/src/core/modules/user/management/toolbar/toolbar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Toolbar: () => (Toolbar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-draft.tsx");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-helper.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var _Pimcore_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/dropdown-button/dropdown-button.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
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












const Toolbar = (param)=>{
    let { id, onCloneUser, onRemoveUser, ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { user, isLoading, reloadUser } = (0,_Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_5__.useUserManagementDraft)(id);
    const { updateUserById } = (0,_Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_6__.useUserManagementHelper)();
    const hasChanges = (user === null || user === void 0 ? void 0 : user.modified) === true;
    const [popConfirmOpen, setPopConfirmOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const onOpenChange = (newOpen)=>{
        if (!newOpen) {
            setPopConfirmOpen(false);
            return;
        }
        if (hasChanges) {
            setPopConfirmOpen(true);
        } else {
            reloadUser();
        }
    };
    const onCancel = ()=>{
        setPopConfirmOpen(false);
    };
    const onConfirm = ()=>{
        setPopConfirmOpen(false);
        reloadUser();
    };
    const onSaveClick = ()=>{
        updateUserById({
            id,
            user: {
                ...user
            }
        }).catch(()=>{
            console.error('error');
        });
    };
    const items = [
        {
            key: '1',
            label: t('tree.actions.clone-user'),
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__.Icon, {
                value: "copy"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
                lineNumber: 73,
                columnNumber: 11
            }, undefined),
            onClick: onCloneUser
        },
        {
            key: '2',
            label: t('tree.actions.remove-user'),
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__.Icon, {
                value: "trash"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
                lineNumber: 78,
                columnNumber: 11
            }, undefined),
            onClick: onRemoveUser
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_2__.Toolbar, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_12__.Flex, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_8__.Popconfirm, {
                        onCancel: onCancel,
                        onConfirm: onConfirm,
                        onOpenChange: onOpenChange,
                        open: popConfirmOpen,
                        title: t('toolbar.reload.confirmation'),
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_7__.IconButton, {
                            icon: {
                                value: 'refresh'
                            },
                            children: t('toolbar.reload')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, undefined),
                    onCloneUser !== null || onRemoveUser !== null ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_11__.Dropdown, {
                        menu: {
                            items
                        },
                        trigger: [
                            'click'
                        ],
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_9__.DropdownButton, {
                            children: t('toolbar.more')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
                            lineNumber: 94,
                            columnNumber: 15
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
                        lineNumber: 91,
                        columnNumber: 58
                    }, undefined) : null
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                disabled: !hasChanges || isLoading,
                loading: isLoading,
                onClick: onSaveClick,
                type: "primary",
                children: t('toolbar.save')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/toolbar/toolbar.tsx",
        lineNumber: 81,
        columnNumber: 10
    }, undefined);
};
_s(Toolbar, "49j3Oue6ljvI0CMlxt7PZ8r9Gh0=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_modules_user_hooks_use_user_management_draft__WEBPACK_IMPORTED_MODULE_5__.useUserManagementDraft,
        _Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_6__.useUserManagementHelper
    ];
});
_c = Toolbar;
var _c;
$RefreshReg$(_c, "Toolbar");

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
"./js/src/core/modules/user/management/tree/tree-autocomplete.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreeAutocomplete: () => (TreeAutocomplete)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-helper.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _ant_design_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/@ant-design/icons/es/icons/UserOutlined.js");
/* ESM import */var _Pimcore_components_search_input_search_input_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/search-input/search-input.styles.ts");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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








const TreeAutocomplete = (param)=>{
    let { loading = true, ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const { openUser, searchUserByText } = (0,_Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_2__.useUserManagementHelper)();
    const [searchOptions, setSearchOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [searchValue, setSearchValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const { Text } = antd__WEBPACK_IMPORTED_MODULE_3__.Typography;
    const { styles } = (0,_Pimcore_components_search_input_search_input_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles)();
    const onSearch = (value)=>{
        setSearchValue(value);
        searchUserByText(searchValue).then((response)=>{
            setSearchOptions(response.items.map((item)=>({
                    value: item.id.toString(),
                    label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Row, {
                        gutter: 8,
                        wrap: false,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                                flex: "none",
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Avatar, {
                                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_8__["default"], {}, void 0, false, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                                        lineNumber: 45,
                                        columnNumber: 29
                                    }, void 0),
                                    size: 26
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, undefined)
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                                flex: "auto",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                        children: item.username
                                    }, void 0, false, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                                        lineNumber: 48,
                                        columnNumber: 15
                                    }, undefined),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Text, {
                                        strong: true,
                                        children: [
                                            t('user-management.search.id'),
                                            ": "
                                        ]
                                    }, void 0, true, {
                                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, undefined),
                                    " ",
                                    item.id
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                        lineNumber: 43,
                        columnNumber: 16
                    }, undefined)
                })));
        }).catch((e)=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_7__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_7__.GeneralError('An error occured while searching for a user'));
        });
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.AutoComplete, {
        className: 'tree--search',
        onSearch: onSearch,
        onSelect: (id, option)=>{
            openUser(Number(id));
            setSearchValue('');
        },
        options: searchOptions,
        value: searchValue,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Input.Search, {
            allowClear: {
                clearIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                    className: styles.closeIcon,
                    value: "close"
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                    lineNumber: 62,
                    columnNumber: 18
                }, void 0)
            },
            className: styles.searchWithoutAddon,
            placeholder: t('user-management.search'),
            prefix: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_6__.Icon, {
                className: styles.searchIcon,
                options: {
                    width: 12,
                    height: 12
                },
                value: "search"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
                lineNumber: 63,
                columnNumber: 96
            }, void 0)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-autocomplete.tsx",
        lineNumber: 57,
        columnNumber: 10
    }, undefined);
};
_s(TreeAutocomplete, "TraqEKTpX6sgczoTvz7x6jU1XNY=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_2__.useUserManagementHelper,
        _Pimcore_components_search_input_search_input_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles
    ];
});
_c = TreeAutocomplete;

var _c;
$RefreshReg$(_c, "TreeAutocomplete");

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
"./js/src/core/modules/user/management/tree/tree-container.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
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
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        treeContainer: css`
      margin-top: ${token.paddingSM}px;

      .tree--search {
        margin: ${token.paddingSM}px ${token.paddingSM}px 0;
      }
      
      :has(.tree--search) {
        margin-top: 0;
      }
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/modules/user/management/tree/tree-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreeContainer: () => (TreeContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_tree_element_tree_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/tree-element/tree-element.tsx");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-helper.tsx");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_modules_user_management_toolbar_toolbar_tree__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/user/management/toolbar/toolbar-tree.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_user_management_tree_tree_container_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/user/management/tree/tree-container.styles.tsx");
/* ESM import */var _Pimcore_modules_user_management_tree_tree_autocomplete__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/user/management/tree/tree-autocomplete.tsx");
/* ESM import */var _Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/user/management/tree/tree-helper.ts");
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












const TreeContainer = (param)=>{
    let { expandedKeys, treeData, onLoadTreeData, onReloadTree, onSetExpandedKeys, onUpdateTreeData, userId, ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { openUser, moveUserById, addNewUser, addNewFolder, removeUser, cloneUser, removeFolder } = (0,_Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_5__.useUserManagementHelper)();
    const { styles } = (0,_Pimcore_modules_user_management_tree_tree_container_styles__WEBPACK_IMPORTED_MODULE_10__.useStyle)();
    const classNames = [
        styles.treeContainer
    ];
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(userId)) {
            openUser(userId);
        }
    }, [
        userId
    ]);
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_6__.useFormModal)();
    const handleAddUser = (key)=>{
        modal.input({
            title: t('user-management.add-user'),
            label: t('user-management.add-user.label'),
            onOk: async (value)=>{
                await addNewUser({
                    parentId: key,
                    name: value
                });
                onReloadTree([
                    key
                ]);
            }
        });
    };
    const handleAddFolder = (key)=>{
        modal.input({
            title: t('user-management.add-folder'),
            label: t('user-management.add-folder.label'),
            onOk: async (value)=>{
                await addNewFolder({
                    parentId: key,
                    name: value
                });
                onReloadTree([
                    key
                ]);
            }
        });
    };
    const getUserNameByKey = (data, key)=>{
        const node = (0,_Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_12__.findNodeByKey)(data, key);
        return (node === null || node === void 0 ? void 0 : node.title) ?? '';
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_8__.ContentLayout, {
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_toolbar_toolbar_tree__WEBPACK_IMPORTED_MODULE_7__.ToolbarTree, {
            onAddFolder: ()=>{
                handleAddFolder(0);
            },
            onAddItem: ()=>{
                handleAddUser(0);
            },
            onReload: ()=>{
                onReloadTree([
                    0
                ]);
            }
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-container.tsx",
            lineNumber: 85,
            columnNumber: 40
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_9__.Content, {
            className: classNames.join(', '),
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_tree_tree_autocomplete__WEBPACK_IMPORTED_MODULE_11__.TreeAutocomplete, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-container.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tree_element_tree_element__WEBPACK_IMPORTED_MODULE_4__.TreeElement, {
                    defaultExpandedKeys: expandedKeys,
                    draggable: true,
                    expandedKeys: expandedKeys,
                    onActionsClick: (key, action)=>{
                        if (typeof key === 'string') {
                            key = parseInt(key);
                        }
                        switch(action){
                            case 'add-folder':
                                handleAddFolder(key);
                                break;
                            case 'add-user':
                                handleAddUser(key);
                                break;
                            case 'clone-user':
                                modal.input({
                                    title: t('user-management.clone-user'),
                                    label: t('user-management.clone-user.label'),
                                    onOk: async (value)=>{
                                        var _findParentByKey;
                                        const parentId = (_findParentByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_12__.findParentByKey)(treeData, key)) === null || _findParentByKey === void 0 ? void 0 : _findParentByKey.key;
                                        const data = await cloneUser({
                                            id: key,
                                            name: value
                                        });
                                        if (data !== undefined) {
                                            onReloadTree([
                                                parentId
                                            ]);
                                        }
                                    }
                                });
                                break;
                            case 'remove-user':
                                modal.confirm({
                                    title: t('user-management.remove-user'),
                                    content: t('user-management.remove-user.text', {
                                        name: getUserNameByKey(treeData, key)
                                    }),
                                    okText: t('button.confirm'),
                                    cancelText: t('button.cancel'),
                                    onOk: async ()=>{
                                        var _findParentByKey;
                                        await removeUser({
                                            id: Number(key)
                                        });
                                        onReloadTree([
                                            (_findParentByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_12__.findParentByKey)(treeData, key)) === null || _findParentByKey === void 0 ? void 0 : _findParentByKey.key
                                        ]);
                                    }
                                });
                                break;
                            case 'remove-folder':
                                modal.confirm({
                                    title: t('user-management.remove-folder'),
                                    content: t('user-management.remove-folder.text'),
                                    okText: t('button.confirm'),
                                    cancelText: t('button.cancel'),
                                    onOk: async ()=>{
                                        var _findParentByKey;
                                        await removeFolder({
                                            id: Number(key)
                                        });
                                        onReloadTree([
                                            (_findParentByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_12__.findParentByKey)(treeData, key)) === null || _findParentByKey === void 0 ? void 0 : _findParentByKey.key
                                        ]);
                                    }
                                });
                                break;
                        }
                    },
                    onDragAndDrop: async (params)=>{
                        const data = await moveUserById({
                            id: Number(params.dragNode.key),
                            parentId: Number(params.node.key)
                        });
                        if (data !== undefined) {
                            var _findParentByKey;
                            onReloadTree([
                                (_findParentByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_12__.findParentByKey)(treeData, params.dragNode.key)) === null || _findParentByKey === void 0 ? void 0 : _findParentByKey.key,
                                params.node.key
                            ]);
                        }
                    },
                    onExpand: (keys)=>{
                        onSetExpandedKeys(keys);
                    },
                    onLoadData: onLoadTreeData,
                    onSelected: (key)=>{
                        var _findNodeByKey;
                        if (((_findNodeByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_12__.findNodeByKey)(treeData, key)) === null || _findNodeByKey === void 0 ? void 0 : _findNodeByKey.selectable) === true) {
                            openUser(Number(key));
                        }
                    },
                    treeData: treeData
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-container.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-container.tsx",
            lineNumber: 92,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/management/tree/tree-container.tsx",
        lineNumber: 85,
        columnNumber: 10
    }, undefined);
};
_s(TreeContainer, "hotPDMuZzHAEBxrGLGqyuskTvHI=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_5__.useUserManagementHelper,
        _Pimcore_modules_user_management_tree_tree_container_styles__WEBPACK_IMPORTED_MODULE_10__.useStyle,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_6__.useFormModal
    ];
});
_c = TreeContainer;

var _c;
$RefreshReg$(_c, "TreeContainer");

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
"./js/src/core/modules/user/roles/container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RoleContainer: () => (RoleContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_user_roles_tree_tree_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/user/roles/tree/tree-container.tsx");
/* ESM import */var _Pimcore_modules_user_roles_detail_detail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/user/roles/detail/detail.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var _Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/user/management/tree/tree-helper.ts");
/* ESM import */var _Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-helper.tsx");
/* ESM import */var _Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* ESM import */var _Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/utils/test-id-generator.ts");
/* ESM import */var _Pimcore_components_predefined_layouts_config_config_layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/predefined-layouts/config/config-layout.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_11__);
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











const RoleContainer = (param)=>{
    let { ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    const { getRoleTree } = (0,_Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_7__.useRoleHelper)();
    const [expandedKeys, setExpandedKeys] = react__WEBPACK_IMPORTED_MODULE_1___default().useState([
        0
    ]);
    const updateExpandedKeys = (keys)=>{
        setExpandedKeys((0,lodash__WEBPACK_IMPORTED_MODULE_11__.uniq)([
            ...keys,
            0
        ]));
    };
    const treeParentItem = {
        title: t('roles.tree.all'),
        key: 0,
        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
            value: 'folder'
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/container.tsx",
            lineNumber: 38,
            columnNumber: 11
        }, undefined),
        'data-testid': (0,_Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_9__.createTreeNodeTestId)(0, 'folder'),
        children: [],
        actions: [
            {
                key: 'add-folder',
                icon: 'folder-plus'
            },
            {
                key: 'add-role',
                icon: 'shield-plus'
            }
        ]
    };
    const [treeData, setTreeData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([
        treeParentItem
    ]);
    const createNodeByResponse = (items)=>{
        return items.map((item)=>({
                title: item.name,
                key: item.id,
                selectable: item.type === 'role',
                allowDrop: item.type !== 'role',
                allowDrag: item.type === 'role',
                icon: item.type === 'role' ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                    value: 'shield'
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/container.tsx",
                    lineNumber: 57,
                    columnNumber: 36
                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                    value: 'folder'
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/container.tsx",
                    lineNumber: 57,
                    columnNumber: 64
                }, undefined),
                'data-testid': (0,_Pimcore_utils_test_id_generator__WEBPACK_IMPORTED_MODULE_9__.createTreeNodeTestId)(item.id, item.type),
                actions: item.type === 'role' ? [
                    {
                        key: 'clone-role',
                        icon: 'copy'
                    },
                    {
                        key: 'remove-role',
                        icon: 'trash'
                    }
                ] : [
                    {
                        key: 'add-folder',
                        icon: 'folder-plus'
                    },
                    {
                        key: 'add-role',
                        icon: 'shield-plus'
                    },
                    {
                        key: 'remove-folder',
                        icon: 'trash'
                    }
                ],
                children: [],
                isLeaf: item.hasChildren === false
            }));
    };
    const updateTreeData = (key, items)=>{
        setNodeLoading(key, false);
        setTreeData((data)=>{
            const parentNode = (0,_Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_6__.findNodeByKey)(data, key);
            if (parentNode !== undefined) {
                parentNode.children = parentNode.children ?? [];
                if (items.length === 0) {
                    parentNode.isLeaf = true;
                    updateExpandedKeys(expandedKeys.filter((k)=>k !== key));
                } else {
                    parentNode.isLeaf = false;
                }
                const newChildren = createNodeByResponse(items);
                const newKeys = new Set(newChildren.map((child)=>child.key));
                parentNode.children = parentNode.children.filter((child)=>newKeys.has(child.key));
                const existingKeys = new Set(parentNode.children.map((child)=>child.key));
                parentNode.children = [
                    ...parentNode.children,
                    ...newChildren.filter((child)=>!existingKeys.has(child.key))
                ];
            }
            return [
                ...data
            ];
        });
    };
    const handleOnLoadData = async (node)=>{
        await getRoleTree({
            parentId: Number(node.key)
        }).then((response)=>{
            updateTreeData(node.key, response.items);
        });
    };
    const setNodeLoading = (key, isLoading)=>{
        const node = (0,_Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_6__.findNodeByKey)(treeData, key);
        if (node !== undefined) {
            node.switcherIcon = isLoading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_8__.Spin, {
                type: "classic"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/container.tsx",
                lineNumber: 110,
                columnNumber: 39
            }, undefined) : undefined;
        }
        setTreeData([
            ...treeData
        ]);
    };
    const reloadTree = async (key)=>{
        if (key === undefined) {
            key = 0;
        }
        const { items } = await getRoleTree({
            parentId: key
        });
        updateTreeData(key, items);
    };
    const sidebar = {
        id: 'role-tree',
        size: 20,
        minSize: 170,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_roles_tree_tree_container__WEBPACK_IMPORTED_MODULE_2__.TreeContainer, {
                expandedKeys: expandedKeys,
                onLoadTreeData: handleOnLoadData,
                onReloadTree: async (keys)=>{
                    for (const key of keys){
                        setNodeLoading(key, true);
                        await reloadTree(key);
                    }
                },
                onSetExpandedKeys: (keys)=>{
                    updateExpandedKeys(keys);
                },
                onUpdateTreeData: updateTreeData,
                treeData: treeData
            }, "role-tree", false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/container.tsx",
                lineNumber: 129,
                columnNumber: 16
            }, undefined)
        ]
    };
    const main = {
        id: 'role-detail',
        size: 80,
        minSize: 600,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_roles_detail_detail__WEBPACK_IMPORTED_MODULE_3__.Detail, {
                onCloneRole: async (data, parentId)=>{
                    setNodeLoading(parentId, true);
                    await reloadTree(parentId);
                },
                onRemoveRole: async (id, parentId)=>{
                    setNodeLoading(parentId, true);
                    await reloadTree(parentId);
                }
            }, "role-detail", false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/container.tsx",
                lineNumber: 142,
                columnNumber: 16
            }, undefined)
        ]
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_predefined_layouts_config_config_layout__WEBPACK_IMPORTED_MODULE_10__.ConfigLayout, {
        leftItem: sidebar,
        rightItem: main
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/container.tsx",
        lineNumber: 150,
        columnNumber: 10
    }, undefined);
};
_s(RoleContainer, "uhm71qQyQFkCY/gZ4htGJCx1sY4=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation,
        _Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_7__.useRoleHelper
    ];
});
_c = RoleContainer;

var _c;
$RefreshReg$(_c, "RoleContainer");

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
"./js/src/core/modules/user/roles/detail/detail.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
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
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        detailTabs: css`
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: ${token.paddingSM}px ${token.paddingSM}px;
      
      .detail-tabs__content {
        height: 100%;
        width: 100%;
        overflow: hidden;
        
        .ant-tabs {
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .ant-tabs-content {
          display: flex;
          height: 100%;
          margin-left: -${token.paddingXS}px;
          margin-right: -${token.paddingXS}px;
          padding-left: ${token.paddingXS}px;
          padding-right: ${token.paddingXS}px;
        }

        .ant-tabs-tabpane {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }

        .ant-tabs-content-holder {
          overflow: auto;
        }
      }
    `
    };
}, {
    hashPriority: 'low'
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
"./js/src/core/modules/user/roles/detail/detail.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Detail: () => (Detail)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_user_roles_detail_tabs_detail_tab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/user/roles/detail/tabs/detail-tab.tsx");
/* ESM import */var _Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-helper.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_user_roles_roles_slice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/user/roles/roles-slice.tsx");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/tabs/tabs.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _Pimcore_modules_user_roles_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/user/roles/toolbar/toolbar.tsx");
/* ESM import */var _Pimcore_modules_user_roles_detail_detail_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/user/roles/detail/detail.styles.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_11__);
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_13__);
/* ESM import */var _Pimcore_modules_user_roles_hooks_use_roles_draft__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-draft.tsx");
/* ESM import */var _Pimcore_modules_auth_hooks_use_user_draft__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user-draft.ts");
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















const Detail = (param)=>{
    let { onCloneRole, onRemoveRole, ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation)();
    const { styles } = (0,_Pimcore_modules_user_roles_detail_detail_styles__WEBPACK_IMPORTED_MODULE_10__.useStyle)();
    const classNames = [
        'detail-tabs',
        styles.detailTabs
    ];
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_12__.useFormModal)();
    const { user } = (0,_Pimcore_modules_auth_hooks_use_user_draft__WEBPACK_IMPORTED_MODULE_15__.useUserDraft)();
    const { openRole, closeRole, removeRole, cloneRole, getAllIds, activeId } = (0,_Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_3__.useRoleHelper)();
    const { role } = (0,_Pimcore_modules_user_roles_hooks_use_roles_draft__WEBPACK_IMPORTED_MODULE_14__.useRoleDraft)(activeId);
    const [popConfirmOpen, setPopConfirmOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const triggerConfirm = (id)=>{
        closeRole(id);
    };
    const onHandleClose = (key)=>{
        const id = parseInt(key);
        const role = (0,_Pimcore_modules_user_roles_roles_slice__WEBPACK_IMPORTED_MODULE_5__.selectRoleById)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_6__.store.getState(), id);
        if ((role === null || role === void 0 ? void 0 : role.modified) && popConfirmOpen === null) {
            if (user === null || user === void 0 ? void 0 : user.allowDirtyClose) {
                triggerConfirm(id);
            } else {
                setPopConfirmOpen(id);
            }
            return;
        }
        if (!(role === null || role === void 0 ? void 0 : role.modified)) {
            triggerConfirm(id);
            return;
        }
        if (popConfirmOpen !== null) {
            setPopConfirmOpen(null);
        }
    };
    const handleCloneRole = ()=>{
        modal.input({
            title: t('roles.clone-item'),
            label: t('roles.clone-item.label'),
            onOk: async (value)=>{
                const data = await cloneRole({
                    id: activeId,
                    name: value
                });
                onCloneRole(data, (role === null || role === void 0 ? void 0 : role.parentId) ?? 0);
            }
        });
    };
    const handleRemoveRole = ()=>{
        modal.confirm({
            title: t('roles.remove-item'),
            content: t('roles.remove-item.text'),
            onOk: async ()=>{
                triggerConfirm(activeId);
                await removeRole({
                    id: activeId
                });
                onRemoveRole(activeId, (role === null || role === void 0 ? void 0 : role.parentId) ?? 0);
            }
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setPopConfirmOpen(null);
    }, [
        role
    ]);
    if (activeId === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__.Content, {
            none: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/detail.tsx",
            lineNumber: 106,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_8__.ContentLayout, {
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_roles_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_9__.Toolbar, {
            id: activeId,
            onCloneRole: handleCloneRole,
            onRemoveRole: handleRemoveRole
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/detail.tsx",
            lineNumber: 108,
            columnNumber: 40
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: classNames.join(' '),
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_7__.Tabs, {
                    activeKey: activeId.toString(),
                    items: getAllIds.map((id)=>{
                        var _selectRoleById, _selectRoleById1;
                        return {
                            key: id.toString(),
                            label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_13__.Popconfirm, {
                                onCancel: ()=>{
                                    setPopConfirmOpen(null);
                                },
                                onConfirm: ()=>{
                                    triggerConfirm(id);
                                },
                                open: popConfirmOpen === id,
                                title: t('widget-manager.tab-title.close-confirmation'),
                                children: [
                                    (_selectRoleById = (0,_Pimcore_modules_user_roles_roles_slice__WEBPACK_IMPORTED_MODULE_5__.selectRoleById)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_6__.store.getState(), id)) === null || _selectRoleById === void 0 ? void 0 : _selectRoleById.name,
                                    " ",
                                    ((_selectRoleById1 = (0,_Pimcore_modules_user_roles_roles_slice__WEBPACK_IMPORTED_MODULE_5__.selectRoleById)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_6__.store.getState(), id)) === null || _selectRoleById1 === void 0 ? void 0 : _selectRoleById1.modified) ? '*' : ''
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/detail.tsx",
                                lineNumber: 112,
                                columnNumber: 16
                            }, void 0)
                        };
                    }),
                    onChange: (id)=>{
                        openRole(Number(id));
                    },
                    onClose: onHandleClose
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/detail.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__.Content, {
                    className: 'detail-tabs__content',
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_roles_detail_tabs_detail_tab__WEBPACK_IMPORTED_MODULE_2__.DetailTab, {
                        id: activeId
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/detail.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/detail.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/detail.tsx",
            lineNumber: 109,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/detail.tsx",
        lineNumber: 108,
        columnNumber: 10
    }, undefined);
};
_s(Detail, "QpayYefsqxD0EPfu0fE838BR26g=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation,
        _Pimcore_modules_user_roles_detail_detail_styles__WEBPACK_IMPORTED_MODULE_10__.useStyle,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_12__.useFormModal,
        _Pimcore_modules_auth_hooks_use_user_draft__WEBPACK_IMPORTED_MODULE_15__.useUserDraft,
        _Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_3__.useRoleHelper,
        _Pimcore_modules_user_roles_hooks_use_roles_draft__WEBPACK_IMPORTED_MODULE_14__.useRoleDraft
    ];
});
_c = Detail;

var _c;
$RefreshReg$(_c, "Detail");

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
"./js/src/core/modules/user/roles/detail/tabs/detail-tab.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DetailTab: () => (DetailTab)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/tabs/tabs.tsx");
/* ESM import */var _Pimcore_modules_user_roles_detail_tabs_settings_settings_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx");
/* ESM import */var _Pimcore_modules_user_roles_detail_tabs_workspaces_workspaces_container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var _Pimcore_modules_user_roles_role_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/user/roles/role-provider.tsx");
/* ESM import */var _Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-is-active-main-widget.ts");
/* ESM import */var _Pimcore_modules_user_hooks_use_global_user_management_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/user/hooks/use-global-user-management-context.ts");
/* ESM import */var _Pimcore_modules_user_roles_hooks_use_roles_draft__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-draft.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/content/content.tsx");
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










const DetailTab = (param)=>{
    let { id } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    const isWidgetActive = (0,_Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__WEBPACK_IMPORTED_MODULE_7__.useIsActiveMainWidget)();
    const { setContext, removeContext } = (0,_Pimcore_modules_user_hooks_use_global_user_management_context__WEBPACK_IMPORTED_MODULE_8__.useGlobalUserContext)();
    const { role, isLoading, isError, removeRoleFromState } = (0,_Pimcore_modules_user_roles_hooks_use_roles_draft__WEBPACK_IMPORTED_MODULE_9__.useRoleDraft)(id);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return ()=>{
            removeContext();
            removeRoleFromState();
        };
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isWidgetActive) {
            setContext({
                id
            });
        }
        return ()=>{
            if (!isWidgetActive) {
                removeContext();
            }
        };
    }, [
        isWidgetActive
    ]);
    if (isError) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            children: "Error"
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/detail-tab.tsx",
            lineNumber: 57,
            columnNumber: 12
        }, undefined);
    }
    if (isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_10__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/detail-tab.tsx",
            lineNumber: 60,
            columnNumber: 12
        }, undefined);
    }
    if (role === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    const items = [
        {
            key: 'settings',
            label: t('roles.settings.title'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_roles_detail_tabs_settings_settings_container__WEBPACK_IMPORTED_MODULE_3__.SettingsContainer, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/detail-tab.tsx",
                lineNumber: 68,
                columnNumber: 15
            }, undefined)
        },
        {
            key: 'workspaces',
            label: t('roles.workspaces.title'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_roles_detail_tabs_workspaces_workspaces_container__WEBPACK_IMPORTED_MODULE_4__.WorkspacesContainer, {}, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/detail-tab.tsx",
                lineNumber: 72,
                columnNumber: 15
            }, undefined)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_roles_role_provider__WEBPACK_IMPORTED_MODULE_6__.RoleProvider, {
        id: id,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_2__.Tabs, {
            defaultActiveKey: "1",
            destroyInactiveTabPane: true,
            items: items
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/detail-tab.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/detail-tab.tsx",
        lineNumber: 74,
        columnNumber: 10
    }, undefined);
};
_s(DetailTab, "l/9Yai2GU4XnaVy02jZ2lUPRNbI=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation,
        _Pimcore_modules_widget_manager_hooks_use_is_active_main_widget__WEBPACK_IMPORTED_MODULE_7__.useIsActiveMainWidget,
        _Pimcore_modules_user_hooks_use_global_user_management_context__WEBPACK_IMPORTED_MODULE_8__.useGlobalUserContext,
        _Pimcore_modules_user_roles_hooks_use_roles_draft__WEBPACK_IMPORTED_MODULE_9__.useRoleDraft
    ];
});
_c = DetailTab;

var _c;
$RefreshReg$(_c, "DetailTab");

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
"./js/src/core/modules/user/roles/detail/tabs/settings/components/form/general-accordion.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GeneralAccordion: () => (GeneralAccordion)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/select/select.tsx");
/* ESM import */var _Pimcore_modules_user_roles_hooks_use_role_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-role-context.tsx");
/* ESM import */var _Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/perspectives/hooks/use-perspectives.tsx");
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







const GeneralAccordion = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const { id } = (0,_Pimcore_modules_user_roles_hooks_use_role_context__WEBPACK_IMPORTED_MODULE_6__.useRoleContext)();
    const [perspectiveOptions, setPerspectiveOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { getPerspectiveConfigCollection } = (0,_Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_7__.usePerspectives)();
    const fetchPerspectiveConfig = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        getPerspectiveConfigCollection().then((data)=>{
            if ((data === null || data === void 0 ? void 0 : data.items) !== undefined) {
                setPerspectiveOptions(data.items.map((item)=>({
                        value: item.id,
                        label: item.name
                    })));
            }
        }).catch((error)=>{
            console.error('Error fetching perspective config collection:', error);
        });
    }, [
        getPerspectiveConfigCollection
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (perspectiveOptions.length === 0) {
            fetchPerspectiveConfig();
        }
    }, [
        id
    ]);
    const content = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: t('roles.general')
            }, void 0, false),
            info: 'ID: ' + id,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                label: t('user-management.perspectives'),
                name: "perspectives",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_select_select__WEBPACK_IMPORTED_MODULE_5__.Select, {
                    mode: "multiple",
                    options: perspectiveOptions,
                    placeholder: t('user-management.perspectives')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/components/form/general-accordion.tsx",
                    lineNumber: 51,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/components/form/general-accordion.tsx",
                lineNumber: 50,
                columnNumber: 15
            }, undefined)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_3__.Accordion, {
        activeKey: '1',
        bordered: true,
        items: content,
        size: 'small'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/components/form/general-accordion.tsx",
        lineNumber: 54,
        columnNumber: 10
    }, undefined);
};
_s(GeneralAccordion, "uPd9paZu25W/CGq9BWW1Umu7Sfk=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _Pimcore_modules_user_roles_hooks_use_role_context__WEBPACK_IMPORTED_MODULE_6__.useRoleContext,
        _Pimcore_modules_perspectives_hooks_use_perspectives__WEBPACK_IMPORTED_MODULE_7__.usePerspectives
    ];
});
_c = GeneralAccordion;

var _c;
$RefreshReg$(_c, "GeneralAccordion");

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
"./js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SettingsContainer: () => (SettingsContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_modules_user_roles_hooks_use_role_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-role-context.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_user_roles_detail_tabs_settings_components_form_general_accordion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/user/roles/detail/tabs/settings/components/form/general-accordion.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_settings_components_form_permissions_accordion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/permissions-accordion.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_settings_components_form_types_classes_accordion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_settings_components_form_shared_translation_settings_accordion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/components/form/shared-translation-settings-accordion.tsx");
/* ESM import */var _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/app/settings/hooks/use-settings.ts");
/* ESM import */var _Pimcore_modules_user_roles_hooks_use_roles_draft__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-draft.tsx");
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_settings_settings_helper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/settings/settings-helper.ts");
/* ESM import */var _Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/user/hooks/use-user-management-helper.tsx");
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














const SettingsContainer = (param)=>{
    let { ...props } = param;
    _s();
    const { validLanguages } = (0,_Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_11__.useSettings)();
    const [form] = _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.useForm();
    const { id } = (0,_Pimcore_modules_user_roles_hooks_use_role_context__WEBPACK_IMPORTED_MODULE_5__.useRoleContext)();
    const { role, isLoading, changeRoleInState } = (0,_Pimcore_modules_user_roles_hooks_use_roles_draft__WEBPACK_IMPORTED_MODULE_12__.useRoleDraft)(id);
    const { getAvailablePermissions } = (0,_Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_14__.useUserManagementHelper)();
    const permissions = (0,_Pimcore_modules_user_management_detail_tabs_settings_settings_helper__WEBPACK_IMPORTED_MODULE_13__.getGroupedPermissions)(getAvailablePermissions());
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (!isLoading) {
            form.setFieldsValue({
                name: role === null || role === void 0 ? void 0 : role.name,
                classes: (role === null || role === void 0 ? void 0 : role.classes) ?? [],
                docTypes: role === null || role === void 0 ? void 0 : role.docTypes,
                perspectives: (role === null || role === void 0 ? void 0 : role.perspectives) ?? [],
                permissionsDefault: Array.isArray(role === null || role === void 0 ? void 0 : role.permissions) ? role.permissions.filter((permission)=>permissions.default.some((defaultPermission)=>defaultPermission.key === permission)) : [],
                permissionsBundles: Array.isArray(role === null || role === void 0 ? void 0 : role.permissions) ? role.permissions.filter((permission)=>permissions.bundles.some((defaultPermission)=>defaultPermission.key === permission)) : []
            });
        }
    }, [
        role,
        isLoading
    ]);
    const onValuesChange = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((0,lodash__WEBPACK_IMPORTED_MODULE_1__.debounce)((changedValues, allValues)=>{
        const updatedValues = {
            ...allValues
        };
        if (changedValues.permissionsDefault !== undefined || changedValues.permissionsBundles !== undefined) {
            updatedValues.permissions = [
                ...changedValues.permissionsDefault ?? allValues.permissionsDefault ?? [],
                ...changedValues.permissionsBundles ?? allValues.permissionsBundles ?? []
            ];
        }
        changeRoleInState(updatedValues);
    }, 300), [
        changeRoleInState
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_6__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
            lineNumber: 66,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form, {
        form: form,
        layout: "vertical",
        onValuesChange: onValuesChange,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Row, {
            gutter: [
                10,
                10
            ],
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                    span: 16,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_roles_detail_tabs_settings_components_form_general_accordion__WEBPACK_IMPORTED_MODULE_7__.GeneralAccordion, {}, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                    span: 16,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_permissions_accordion__WEBPACK_IMPORTED_MODULE_8__.PermissionsAccordion, {
                        permissions: permissions
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                    span: 16,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_types_classes_accordion__WEBPACK_IMPORTED_MODULE_9__.TypesAndClassesAccordion, {}, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Col, {
                    span: 16,
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_settings_components_form_shared_translation_settings_accordion__WEBPACK_IMPORTED_MODULE_10__.SharedTranslationSettingsAccordion, {
                        data: validLanguages,
                        editData: role === null || role === void 0 ? void 0 : role.websiteTranslationLanguagesEdit,
                        onChange: (languages)=>{
                            changeRoleInState({
                                websiteTranslationLanguagesEdit: languages.filter((language)=>language.edit).map((language)=>language.abbreviation),
                                websiteTranslationLanguagesView: languages.filter((language)=>language.view).map((language)=>language.abbreviation)
                            });
                        },
                        viewData: role === null || role === void 0 ? void 0 : role.websiteTranslationLanguagesView
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
            lineNumber: 69,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/settings/settings-container.tsx",
        lineNumber: 68,
        columnNumber: 10
    }, undefined);
};
_s(SettingsContainer, "xAHX5ro9z7nzMHG+Q17e78GQgG8=", false, function() {
    return [
        _Pimcore_modules_app_settings_hooks_use_settings__WEBPACK_IMPORTED_MODULE_11__.useSettings,
        _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_4__.Form.useForm,
        _Pimcore_modules_user_roles_hooks_use_role_context__WEBPACK_IMPORTED_MODULE_5__.useRoleContext,
        _Pimcore_modules_user_roles_hooks_use_roles_draft__WEBPACK_IMPORTED_MODULE_12__.useRoleDraft,
        _Pimcore_modules_user_hooks_use_user_management_helper__WEBPACK_IMPORTED_MODULE_14__.useUserManagementHelper
    ];
});
_c = SettingsContainer;

var _c;
$RefreshReg$(_c, "SettingsContainer");

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
"./js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WorkspacesContainer: () => (WorkspacesContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/accordion/accordion.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_user_management_detail_tabs_workspaces_components_table_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/user/management/detail/tabs/workspaces/components/table/table.tsx");
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var _Pimcore_modules_user_roles_hooks_use_role_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-role-context.tsx");
/* ESM import */var _Pimcore_modules_user_roles_hooks_use_roles_draft__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-draft.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var _Pimcore_components_modal_useModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/modal/useModal/index.tsx");
/* ESM import */var _Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/modal/footer/modal-footer.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/button/button.tsx");
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











const WorkspacesContainer = (param)=>{
    let { ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { id } = (0,_Pimcore_modules_user_roles_hooks_use_role_context__WEBPACK_IMPORTED_MODULE_6__.useRoleContext)();
    const { role, isLoading, changeRoleInState } = (0,_Pimcore_modules_user_roles_hooks_use_roles_draft__WEBPACK_IMPORTED_MODULE_7__.useRoleDraft)(id);
    const [assetWorkspaces, setAssetWorkspaces] = react__WEBPACK_IMPORTED_MODULE_1___default().useState((role === null || role === void 0 ? void 0 : role.assetWorkspaces) ?? []);
    const [documentWorkspaces, setDocumentWorkspaces] = react__WEBPACK_IMPORTED_MODULE_1___default().useState((role === null || role === void 0 ? void 0 : role.documentWorkspaces) ?? []);
    const [objectWorkspaces, setObjectWorkspaces] = react__WEBPACK_IMPORTED_MODULE_1___default().useState((role === null || role === void 0 ? void 0 : role.dataObjectWorkspaces) ?? []);
    const { showModal: showDuplicatePropertyModal, closeModal: closeDuplicatePropertyModal, renderModal: DuplicatePropertyModal } = (0,_Pimcore_components_modal_useModal__WEBPACK_IMPORTED_MODULE_9__.useModal)({
        type: 'error'
    });
    if (role === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    const handleAddNewWorkspaces = (workspaces, type)=>{
        const newWorkspace = {
            cid: new Date().getTime(),
            // after path update is set to document id
            cpath: '',
            list: false,
            view: false,
            publish: false,
            delete: false,
            rename: false,
            create: false,
            settings: false,
            versions: false,
            properties: false
        };
        switch(type){
            case 'document':
                setDocumentWorkspaces([
                    ...workspaces,
                    newWorkspace
                ]);
                break;
            case 'asset':
                setAssetWorkspaces([
                    ...workspaces,
                    newWorkspace
                ]);
                break;
            case 'object':
                setObjectWorkspaces([
                    ...workspaces,
                    newWorkspace
                ]);
                break;
        }
    };
    const documentsAccordion = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: t('user-management.workspaces.documents')
            }, void 0, false),
            info: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_5__.IconTextButton, {
                icon: {
                    value: 'add-find'
                },
                onClick: ()=>{
                    handleAddNewWorkspaces(role.documentWorkspaces, 'document');
                },
                children: t('user-management.workspaces.add')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 79,
                columnNumber: 11
            }, undefined),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_components_table_table__WEBPACK_IMPORTED_MODULE_4__.Table, {
                data: documentWorkspaces,
                isLoading: isLoading,
                onUpdateData: (data)=>{
                    changeRoleInState({
                        documentWorkspaces: data
                    });
                },
                showDuplicatePropertyModal: ()=>{
                    showDuplicatePropertyModal();
                },
                type: 'document'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 84,
                columnNumber: 15
            }, undefined)
        }
    ];
    const assetsAccordion = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: t('user-management.workspaces.assets')
            }, void 0, false),
            info: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_5__.IconTextButton, {
                icon: {
                    value: 'add-find'
                },
                onClick: ()=>{
                    handleAddNewWorkspaces(role.assetWorkspaces, 'asset');
                },
                children: t('user-management.workspaces.add')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 95,
                columnNumber: 11
            }, undefined),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_components_table_table__WEBPACK_IMPORTED_MODULE_4__.Table, {
                data: assetWorkspaces,
                isLoading: isLoading,
                onUpdateData: (data)=>{
                    changeRoleInState({
                        assetWorkspaces: data
                    });
                },
                showDuplicatePropertyModal: ()=>{
                    showDuplicatePropertyModal();
                },
                type: 'asset'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 100,
                columnNumber: 15
            }, undefined)
        }
    ];
    const objectsAccordion = [
        {
            key: '1',
            title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: t('user-management.workspaces.objects')
            }, void 0, false),
            info: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_5__.IconTextButton, {
                icon: {
                    value: 'add-find'
                },
                onClick: ()=>{
                    handleAddNewWorkspaces(role.dataObjectWorkspaces, 'object');
                },
                children: t('user-management.workspaces.add')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 111,
                columnNumber: 11
            }, undefined),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_detail_tabs_workspaces_components_table_table__WEBPACK_IMPORTED_MODULE_4__.Table, {
                data: objectWorkspaces,
                isLoading: isLoading,
                onUpdateData: (data)=>{
                    changeRoleInState({
                        dataObjectWorkspaces: data
                    });
                },
                showDuplicatePropertyModal: ()=>{
                    showDuplicatePropertyModal();
                },
                type: 'object'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 116,
                columnNumber: 15
            }, undefined)
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_8__.Flex, {
        gap: 'middle',
        vertical: true,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_2__.Accordion, {
                activeKey: '1',
                bordered: true,
                collapsible: "icon",
                items: documentsAccordion,
                size: 'small',
                table: true
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_2__.Accordion, {
                activeKey: '1',
                bordered: true,
                collapsible: "icon",
                items: assetsAccordion,
                size: 'small',
                table: true
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_2__.Accordion, {
                activeKey: '1',
                bordered: true,
                collapsible: "icon",
                items: objectsAccordion,
                size: 'small',
                table: true
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(DuplicatePropertyModal, {
                footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_10__.ModalFooter, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_11__.Button, {
                        onClick: closeDuplicatePropertyModal,
                        type: "primary",
                        children: t('button.ok')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, void 0)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                    lineNumber: 131,
                    columnNumber: 39
                }, void 0),
                title: t('properties.property-already-exist.title'),
                children: t('properties.property-already-exist.error')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/detail/tabs/workspaces/workspaces-container.tsx",
        lineNumber: 124,
        columnNumber: 10
    }, undefined);
};
_s(WorkspacesContainer, "WC+EjEDBi0BXuXzb4pfHakdagJs=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_modules_user_roles_hooks_use_role_context__WEBPACK_IMPORTED_MODULE_6__.useRoleContext,
        _Pimcore_modules_user_roles_hooks_use_roles_draft__WEBPACK_IMPORTED_MODULE_7__.useRoleDraft,
        _Pimcore_components_modal_useModal__WEBPACK_IMPORTED_MODULE_9__.useModal
    ];
});
_c = WorkspacesContainer;

var _c;
$RefreshReg$(_c, "WorkspacesContainer");

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
"./js/src/core/modules/user/roles/hooks/use-role-context.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useRoleContext: () => (useRoleContext)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_user_roles_role_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/user/roles/role-provider.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var _s = $RefreshSig$();


const useRoleContext = ()=>{
    _s();
    const { id } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Pimcore_modules_user_roles_role_provider__WEBPACK_IMPORTED_MODULE_1__.RoleContext);
    return {
        id
    };
};
_s(useRoleContext, "cXjLo1//Z4eo7bGcJs0ESH2TMGY=");

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
"./js/src/core/modules/user/roles/role-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RoleContext: () => (RoleContext),
  RoleProvider: () => (RoleProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

const RoleContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    id: -1
});
const RoleProvider = (param)=>{
    let { id, children } = param;
    _s();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(RoleContext.Provider, {
            value: {
                id
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/role-provider.tsx",
            lineNumber: 19,
            columnNumber: 24
        }, undefined), [
        id
    ]);
};
_s(RoleProvider, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = RoleProvider;
var _c;
$RefreshReg$(_c, "RoleProvider");

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
"./js/src/core/modules/user/roles/toolbar/toolbar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Toolbar: () => (Toolbar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_modules_user_roles_hooks_use_roles_draft__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-draft.tsx");
/* ESM import */var _Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-helper.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var _Pimcore_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/dropdown-button/dropdown-button.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
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












const Toolbar = (param)=>{
    let { id, onCloneRole, onRemoveRole } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { role, isLoading, reloadRole } = (0,_Pimcore_modules_user_roles_hooks_use_roles_draft__WEBPACK_IMPORTED_MODULE_5__.useRoleDraft)(id);
    const { updateRoleById } = (0,_Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_6__.useRoleHelper)();
    const hasChanges = (role === null || role === void 0 ? void 0 : role.modified) === true;
    const [popConfirmOpen, setPopConfirmOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const onOpenChange = (newOpen)=>{
        if (!newOpen) {
            setPopConfirmOpen(false);
            return;
        }
        if (hasChanges) {
            setPopConfirmOpen(true);
        } else {
            reloadRole();
        }
    };
    const onCancel = ()=>{
        setPopConfirmOpen(false);
    };
    const onConfirm = ()=>{
        setPopConfirmOpen(false);
        reloadRole();
    };
    const onSaveClick = ()=>{
        updateRoleById({
            id,
            item: role
        }).catch((error)=>{
            console.error(error);
        });
    };
    const items = [
        {
            key: '1',
            label: t('tree.actions.clone-role'),
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__.Icon, {
                value: "copy"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
                lineNumber: 70,
                columnNumber: 11
            }, undefined),
            onClick: onCloneRole
        },
        {
            key: '2',
            label: t('tree.actions.remove-role'),
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__.Icon, {
                value: "trash"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
                lineNumber: 75,
                columnNumber: 11
            }, undefined),
            onClick: onRemoveRole
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_2__.Toolbar, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_12__.Flex, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_8__.Popconfirm, {
                        onCancel: onCancel,
                        onConfirm: onConfirm,
                        onOpenChange: onOpenChange,
                        open: popConfirmOpen,
                        title: t('toolbar.reload.confirmation'),
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_7__.IconButton, {
                            icon: {
                                value: 'refresh'
                            },
                            children: t('toolbar.reload')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_11__.Dropdown, {
                        menu: {
                            items
                        },
                        trigger: [
                            'click'
                        ],
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_button_dropdown_button__WEBPACK_IMPORTED_MODULE_9__.DropdownButton, {
                            children: t('toolbar.more')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
                disabled: !hasChanges || isLoading,
                loading: isLoading,
                onClick: onSaveClick,
                type: "primary",
                children: t('toolbar.save')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/toolbar/toolbar.tsx",
        lineNumber: 78,
        columnNumber: 10
    }, undefined);
};
_s(Toolbar, "+uSDkkfhVzC6Is3vdIKK0H6p6/c=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_modules_user_roles_hooks_use_roles_draft__WEBPACK_IMPORTED_MODULE_5__.useRoleDraft,
        _Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_6__.useRoleHelper
    ];
});
_c = Toolbar;
var _c;
$RefreshReg$(_c, "Toolbar");

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
"./js/src/core/modules/user/roles/tree/tree-autocomplete.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreeAutocomplete: () => (TreeAutocomplete)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_search_input_search_input_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/search-input/search-input.styles.ts");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-helper.tsx");
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







const TreeAutocomplete = (param)=>{
    let { loading = true, ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { openRole, searchRoleByText } = (0,_Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_7__.useRoleHelper)();
    const [searchOptions, setSearchOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [searchValue, setSearchValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const { Text } = antd__WEBPACK_IMPORTED_MODULE_2__.Typography;
    const { styles } = (0,_Pimcore_components_search_input_search_input_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    const onSearch = (value)=>{
        setSearchValue(value);
        searchRoleByText(searchValue).then((response)=>{
            setSearchOptions(response.items.map((item)=>({
                    value: item.id.toString(),
                    label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                children: item.name
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-autocomplete.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Text, {
                                strong: true,
                                children: [
                                    t('roles.search.id'),
                                    ": "
                                ]
                            }, void 0, true, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-autocomplete.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, undefined),
                            " ",
                            item.id
                        ]
                    }, void 0, true)
                })));
        }).catch((e)=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__.GeneralError('An error occured while searching for a role'));
        });
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.AutoComplete, {
        className: 'tree--search',
        onSearch: onSearch,
        onSelect: (id, option)=>{
            openRole(Number(id));
            setSearchValue('');
        },
        options: searchOptions,
        value: searchValue,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Input.Search, {
            allowClear: {
                clearIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                    className: styles.closeIcon,
                    value: "close"
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-autocomplete.tsx",
                    lineNumber: 56,
                    columnNumber: 18
                }, void 0)
            },
            className: styles.searchWithoutAddon,
            placeholder: t('roles.search'),
            prefix: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                className: styles.searchIcon,
                options: {
                    width: 12,
                    height: 12
                },
                value: "search"
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-autocomplete.tsx",
                lineNumber: 57,
                columnNumber: 86
            }, void 0)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-autocomplete.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-autocomplete.tsx",
        lineNumber: 51,
        columnNumber: 10
    }, undefined);
};
_s(TreeAutocomplete, "WSxl4HHKYGXJ3Dm42jlIJEs2iHg=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_7__.useRoleHelper,
        _Pimcore_components_search_input_search_input_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles
    ];
});
_c = TreeAutocomplete;

var _c;
$RefreshReg$(_c, "TreeAutocomplete");

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
"./js/src/core/modules/user/roles/tree/tree-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreeContainer: () => (TreeContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_tree_element_tree_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/tree-element/tree-element.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_modules_user_management_toolbar_toolbar_tree__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/user/management/toolbar/toolbar-tree.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_user_management_tree_tree_container_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/user/management/tree/tree-container.styles.tsx");
/* ESM import */var _Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/user/management/tree/tree-helper.ts");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/user/roles/hooks/use-roles-helper.tsx");
/* ESM import */var _Pimcore_modules_user_roles_tree_tree_autocomplete__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/user/roles/tree/tree-autocomplete.tsx");
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












const TreeContainer = (param)=>{
    let { expandedKeys, treeData, onLoadTreeData, onReloadTree, onSetExpandedKeys, onUpdateTreeData, ...props } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { openRole, addNewRole, addNewFolder, removeRole, cloneRole, removeFolder, moveRoleById } = (0,_Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_11__.useRoleHelper)();
    const { styles } = (0,_Pimcore_modules_user_management_tree_tree_container_styles__WEBPACK_IMPORTED_MODULE_8__.useStyle)();
    const classNames = [
        styles.treeContainer
    ];
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__.useFormModal)();
    const handleAddRole = (key)=>{
        modal.input({
            title: t('roles.add-role'),
            label: t('roles.add-role.label'),
            onOk: async (value)=>{
                await addNewRole({
                    parentId: key,
                    name: value
                });
                onReloadTree([
                    key
                ]);
            }
        });
    };
    const handleAddFolder = (key)=>{
        modal.input({
            title: t('roles.add-folder'),
            label: t('roles.add-folder.label'),
            onOk: async (value)=>{
                await addNewFolder({
                    parentId: key,
                    name: value
                });
                onReloadTree([
                    key
                ]);
            }
        });
    };
    const getRoleNameByKey = (data, key)=>{
        const node = (0,_Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_9__.findNodeByKey)(data, key);
        return (node === null || node === void 0 ? void 0 : node.title) ?? '';
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_6__.ContentLayout, {
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_management_toolbar_toolbar_tree__WEBPACK_IMPORTED_MODULE_5__.ToolbarTree, {
            actions: [
                {
                    key: 'add-role',
                    label: t('tree.actions.role'),
                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__.Icon, {
                        value: "shield-plus"
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-container.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, void 0),
                    onClick: ()=>{
                        handleAddRole(0);
                    }
                },
                {
                    key: 'add-folder',
                    label: t('tree.actions.folder'),
                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__.Icon, {
                        value: "folder-plus"
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-container.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, void 0),
                    onClick: ()=>{
                        handleAddFolder(0);
                    }
                }
            ],
            onReload: ()=>{
                onReloadTree([
                    0
                ]);
            }
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-container.tsx",
            lineNumber: 79,
            columnNumber: 40
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_7__.Content, {
            className: classNames.join(', '),
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_user_roles_tree_tree_autocomplete__WEBPACK_IMPORTED_MODULE_12__.TreeAutocomplete, {}, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-container.tsx",
                    lineNumber: 97,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_tree_element_tree_element__WEBPACK_IMPORTED_MODULE_2__.TreeElement, {
                    defaultExpandedKeys: expandedKeys,
                    draggable: true,
                    expandedKeys: expandedKeys,
                    onActionsClick: (key, action)=>{
                        if (typeof key === 'string') {
                            key = parseInt(key);
                        }
                        switch(action){
                            case 'add-folder':
                                handleAddFolder(key);
                                break;
                            case 'add-role':
                                handleAddRole(key);
                                break;
                            case 'clone-role':
                                modal.input({
                                    title: t('roles.clone-role'),
                                    label: t('roles.clone-role.text'),
                                    onOk: async (value)=>{
                                        var _findParentByKey;
                                        const parentId = (_findParentByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_9__.findParentByKey)(treeData, key)) === null || _findParentByKey === void 0 ? void 0 : _findParentByKey.key;
                                        const data = await cloneRole({
                                            id: key,
                                            name: value
                                        });
                                        if (data !== undefined) {
                                            onReloadTree([
                                                parentId
                                            ]);
                                        }
                                    }
                                });
                                break;
                            case 'remove-role':
                                modal.confirm({
                                    title: t('roles.remove-role'),
                                    content: t('roles.remove-role.text', {
                                        name: getRoleNameByKey(treeData, key)
                                    }),
                                    okText: t('button.confirm'),
                                    cancelText: t('button.cancel'),
                                    onOk: async ()=>{
                                        var _findParentByKey;
                                        await removeRole({
                                            id: Number(key)
                                        });
                                        onReloadTree([
                                            (_findParentByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_9__.findParentByKey)(treeData, key)) === null || _findParentByKey === void 0 ? void 0 : _findParentByKey.key
                                        ]);
                                    }
                                });
                                break;
                            case 'remove-folder':
                                modal.confirm({
                                    title: t('roles.remove-folder'),
                                    content: t('roles.remove-folder.text'),
                                    okText: t('button.confirm'),
                                    cancelText: t('button.cancel'),
                                    onOk: async ()=>{
                                        var _findParentByKey;
                                        await removeFolder({
                                            id: Number(key)
                                        });
                                        onReloadTree([
                                            (_findParentByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_9__.findParentByKey)(treeData, key)) === null || _findParentByKey === void 0 ? void 0 : _findParentByKey.key
                                        ]);
                                    }
                                });
                                break;
                        }
                    },
                    onDragAndDrop: async (params)=>{
                        const data = await moveRoleById({
                            id: Number(params.dragNode.key),
                            parentId: Number(params.node.key)
                        });
                        if (data !== undefined) {
                            var _findParentByKey;
                            onReloadTree([
                                (_findParentByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_9__.findParentByKey)(treeData, params.dragNode.key)) === null || _findParentByKey === void 0 ? void 0 : _findParentByKey.key,
                                params.node.key
                            ]);
                        }
                    },
                    onExpand: (keys)=>{
                        onSetExpandedKeys(keys);
                    },
                    onLoadData: onLoadTreeData,
                    onSelected: (key)=>{
                        var _findNodeByKey;
                        if (((_findNodeByKey = (0,_Pimcore_modules_user_management_tree_tree_helper__WEBPACK_IMPORTED_MODULE_9__.findNodeByKey)(treeData, key)) === null || _findNodeByKey === void 0 ? void 0 : _findNodeByKey.selectable) === true) {
                            openRole(Number(key));
                        }
                    },
                    treeData: treeData
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-container.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-container.tsx",
            lineNumber: 96,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/roles/tree/tree-container.tsx",
        lineNumber: 79,
        columnNumber: 10
    }, undefined);
};
_s(TreeContainer, "WjbMjkfdvoVhUBvBFD+/+AZ3M9I=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_modules_user_roles_hooks_use_roles_helper__WEBPACK_IMPORTED_MODULE_11__.useRoleHelper,
        _Pimcore_modules_user_management_tree_tree_container_styles__WEBPACK_IMPORTED_MODULE_8__.useStyle,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__.useFormModal
    ];
});
_c = TreeContainer;

var _c;
$RefreshReg$(_c, "TreeContainer");

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
"./js/src/core/modules/user/user-management-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UserContext: () => (UserContext),
  UserManagementProvider: () => (UserManagementProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

const UserContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    id: -1
});
const UserManagementProvider = (param)=>{
    let { id, children } = param;
    _s();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(UserContext.Provider, {
            value: {
                id
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/user/user-management-provider.tsx",
            lineNumber: 19,
            columnNumber: 24
        }, undefined), [
        id
    ]);
};
_s(UserManagementProvider, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = UserManagementProvider;
var _c;
$RefreshReg$(_c, "UserManagementProvider");

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
//# sourceMappingURL=__federation_expose_modules__data_object.js.map