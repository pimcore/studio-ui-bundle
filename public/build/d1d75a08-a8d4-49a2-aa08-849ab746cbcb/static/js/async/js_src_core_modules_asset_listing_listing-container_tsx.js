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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_modules_asset_listing_listing-container_tsx"], {
"./js/src/core/modules/asset/listing/decorator/action-column/action-column-decorator.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActionColumnDecorator: () => (ActionColumnDecorator)
});
/* ESM import */var _view_layer_components_grid_hooks_with_action_column_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/action-column/view-layer/components/grid/hooks/with-action-column-configuration.tsx");
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
"./js/src/core/modules/asset/listing/decorator/column-configuration/column-configuration-decorator.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ColumnConfigurationDecorator: () => (ColumnConfigurationDecorator)
});
/* ESM import */var _configuration_layer_with_column_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx");
/* ESM import */var _view_layer_components_sidebar_hooks_with_configuration_sidebar_entry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/hooks/with-configuration-sidebar-entry.tsx");
/* ESM import */var _context_layer_with_available_columns_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/column-configuration/context-layer/with-available-columns-context.tsx");
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
    const { ConfigurationComponent, ContextComponent, useSidebarOptions, ...defaultProps } = props;
    const newProps = {
        ...defaultProps,
        ContextComponent: (0,_context_layer_with_available_columns_context__WEBPACK_IMPORTED_MODULE_2__.WithAvailableColumnsContext)(ContextComponent),
        ConfigurationComponent: (0,_configuration_layer_with_column_configuration__WEBPACK_IMPORTED_MODULE_0__.withColumnConfiguration)(ConfigurationComponent),
        useSidebarOptions: (0,_view_layer_components_sidebar_hooks_with_configuration_sidebar_entry__WEBPACK_IMPORTED_MODULE_1__.withConfigurationSidebarEntry)(useSidebarOptions)
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
"./js/src/core/modules/asset/listing/hooks/use-element-id.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useElementId: () => (useElementId)
});
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
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
const useElementId = ()=>{
    const { id } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_0__.useElementContext)();
    const getId = ()=>id;
    return {
        getId
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
"./js/src/core/modules/element/listing/decorators/inline-edit/inline-edit-decorator.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  InlineEditDecorator: () => (InlineEditDecorator)
});
/* ESM import */var _view_layer_components_grid_hooks_use_grid_options_with_inline_edit_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/inline-edit/view-layer/components/grid/hooks/use-grid-options/with-inline-edit-options.tsx");
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
const InlineEditDecorator = (props, config)=>{
    const { useGridOptions, ...baseProps } = props;
    const newProps = {
        ...baseProps,
        useGridOptions: (0,_view_layer_components_grid_hooks_use_grid_options_with_inline_edit_options__WEBPACK_IMPORTED_MODULE_0__.WithInlineEdit)(useGridOptions, config)
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
"./js/src/core/modules/asset/listing/decorator/action-column/view-layer/components/grid/hooks/with-action-column-configuration.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
                    type: 'asset-actions'
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
"./js/src/core/modules/asset/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withColumnConfiguration: () => (withColumnConfiguration)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/settings/use-settings.ts");
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








const withColumnConfiguration = (Component)=>{
    var _s = $RefreshSig$();
    const WithAssetColumnConfiguration = ()=>{
        _s();
        const { isLoading, data } = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useAssetGetAvailableGridColumnsQuery)();
        const { useElementId, useDataQueryHelper } = (0,_Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_5__.useSettings)();
        const { getId } = useElementId();
        const { id: configId } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_7__.useSelectedGridConfigId)();
        const { isLoading: isInitialConfigLoading, data: initialConfigurationData } = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useAssetGetGridConfigurationByFolderIdQuery)({
            folderId: getId(),
            configurationId: configId
        });
        const { setSelectedColumns } = (0,_Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_3__.useSelectedColumns)();
        const { setAvailableColumns } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_6__.useAvailableColumns)();
        const { setGridConfig } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_8__.useGridConfig)();
        const { setDataLoadingState } = useDataQueryHelper();
        const isConfigLoading = isLoading || isInitialConfigLoading;
        (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
            if (data === undefined || initialConfigurationData === undefined) {
                return;
            }
            const selectedColumns = [];
            const availableColumns = data.columns.map((column)=>column);
            for (const column of initialConfigurationData.columns){
                const availableColumn = data.columns.find((availableColumn)=>availableColumn.key === column.key);
                if (availableColumn !== undefined) {
                    selectedColumns.push({
                        key: column.key,
                        locale: column.locale,
                        type: availableColumn.type,
                        config: availableColumn.config,
                        sortable: availableColumn.sortable,
                        editable: availableColumn.editable,
                        localizable: availableColumn.localizable,
                        exportable: availableColumn.exportable,
                        frontendType: availableColumn.frontendType,
                        group: availableColumn.group,
                        originalApiDefinition: availableColumn
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
        if (isConfigLoading) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__.Content, {
                loading: true
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx",
                lineNumber: 85,
                columnNumber: 14
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {}, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx",
            lineNumber: 87,
            columnNumber: 12
        }, undefined);
    };
    _s(WithAssetColumnConfiguration, "VWDXxaYPpBaJ/RCbNZNVBGmPkho=", true, function() {
        return [
            _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useAssetGetAvailableGridColumnsQuery,
            _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_5__.useSettings,
            _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_7__.useSelectedGridConfigId,
            _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useAssetGetGridConfigurationByFolderIdQuery,
            _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_3__.useSelectedColumns,
            _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_6__.useAvailableColumns,
            _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_8__.useGridConfig
        ];
    });
    return WithAssetColumnConfiguration;
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
"./js/src/core/modules/asset/listing/decorator/context-menu/context-menu-decorator.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ContextMenuDecorator: () => (ContextMenuDecorator)
});
/* ESM import */var _view_layer_components_grid_hooks_with_context_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/context-menu/view-layer/components/grid/hooks/with-context-menu.tsx");
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
"./js/src/core/modules/asset/listing/decorator/context-menu/view-layer/components/context-menu/list-grid-context-menu.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
        row,
        onComplete: ()=>{
            setIsOpen(undefined);
        }
    };
    const items = (0,_Pimcore_modules_app_context_menu_registry_use_context_menu_slot__WEBPACK_IMPORTED_MODULE_4__.useContextMenuSlot)(_Pimcore_modules_app_context_menu_registry_context_menu_config__WEBPACK_IMPORTED_MODULE_5__.contextMenuConfig.assetListGrid.name, context);
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
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/decorator/context-menu/view-layer/components/context-menu/list-grid-context-menu.tsx",
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
"./js/src/core/modules/asset/listing/decorator/context-menu/view-layer/components/grid/hooks/with-context-menu.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withContextMenu: () => (withContextMenu)
});
/* ESM import */var _context_menu_list_grid_context_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/context-menu/view-layer/components/context-menu/list-grid-context-menu.tsx");
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
"./js/src/core/modules/asset/listing/decorator/inline-editing/hooks/use-inline-edit-api-update.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useInlineEditApiUpdate: () => (useInlineEditApiUpdate)
});
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
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
    const [patchAsset] = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useAssetPatchByIdMutation)();
    const dispatch = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const updateCache = (event)=>{
        const { update, getGetRequestArgs } = event;
        const { id, column: columnToUpdate, value } = update;
        dispatch(_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.api.util.updateQueryData('assetGetGrid', getGetRequestArgs, (oldData)=>{
            item_loop: for (const item of oldData.items){
                if (item.id !== id) {
                    continue;
                }
                for (const column of item.columns){
                    if (column.key === columnToUpdate.key && column.locale === columnToUpdate.locale) {
                        column.value = value;
                        break item_loop;
                    }
                }
            }
            return oldData;
        }));
    };
    // todo: remove this as soon as backend added the type to the schema
    const updateApiData = async (event)=>{
        const { update } = event;
        const promise = patchAsset({
            body: {
                data: [
                    {
                        id: update.id,
                        metadata: [
                            {
                                name: update.column.key,
                                language: update.column.locale,
                                data: update.value,
                                type: update.column.type
                            }
                        ]
                    }
                ]
            }
        });
        const result = await promise;
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNil)(result.error)) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.ApiError(result.error));
        }
        return result;
    };
    return {
        updateCache,
        updateApiData
    };
};
_s(useInlineEditApiUpdate, "55P4mvosvDygD+hkEK0sS4foIzI=", false, function() {
    return [
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useAssetPatchByIdMutation,
        _sdk_app__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch
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
"./js/src/core/modules/asset/listing/listing-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActionColumnDecorator: () => (/* reexport safe */ _decorator_action_column_action_column_decorator__WEBPACK_IMPORTED_MODULE_12__.ActionColumnDecorator),
  BaseListing: () => (/* reexport safe */ _Pimcore_modules_element_listing_abstract_listing_container__WEBPACK_IMPORTED_MODULE_2__.ListingContainer),
  ColumnConfigurationDecorator: () => (/* reexport safe */ _decorator_column_configuration_column_configuration_decorator__WEBPACK_IMPORTED_MODULE_5__.ColumnConfigurationDecorator),
  ContextMenuDecorator: () => (/* reexport safe */ _decorator_context_menu_context_menu_decorator__WEBPACK_IMPORTED_MODULE_13__.ContextMenuDecorator),
  GeneralFiltersDecorator: () => (/* reexport safe */ _element_listing_decorators_general_filters_general_filters_decorator__WEBPACK_IMPORTED_MODULE_16__.GeneralFiltersDecorator),
  InlineEditDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_inline_edit_inline_edit_decorator__WEBPACK_IMPORTED_MODULE_7__.InlineEditDecorator),
  ListingContainer: () => (ListingContainer),
  PagingDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_paging_paging_decorator__WEBPACK_IMPORTED_MODULE_10__.PagingDecorator),
  RowSelectionDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_row_selection_row_selection_decorator__WEBPACK_IMPORTED_MODULE_6__.RowSelectionDecorator),
  SortingDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_sorting_sorting_decorator__WEBPACK_IMPORTED_MODULE_14__.SortingDecorator),
  TagFilterDecorator: () => (/* reexport safe */ _decorator_tag_filter_tag_filter_decorator__WEBPACK_IMPORTED_MODULE_15__.TagFilterDecorator),
  listingDefaultProps: () => (defaultProps),
  useInlineEditApiUpdate: () => (/* reexport safe */ _decorator_inline_editing_hooks_use_inline_edit_api_update__WEBPACK_IMPORTED_MODULE_8__.useInlineEditApiUpdate)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_listing_abstract_listing_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/listing-container.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _data_layer_use_data_query_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/listing/data-layer/use-data-query-helper.tsx");
/* ESM import */var _decorator_column_configuration_column_configuration_decorator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/column-configuration/column-configuration-decorator.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_row_selection_row_selection_decorator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/row-selection/row-selection-decorator.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_inline_edit_inline_edit_decorator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/inline-edit/inline-edit-decorator.ts");
/* ESM import */var _decorator_inline_editing_hooks_use_inline_edit_api_update__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/inline-editing/hooks/use-inline-edit-api-update.tsx");
/* ESM import */var _hooks_use_element_id__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/asset/listing/hooks/use-element-id.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_paging_paging_decorator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/paging/paging-decorator.ts");
/* ESM import */var _views_default_view__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/asset/listing/views/default-view.tsx");
/* ESM import */var _decorator_action_column_action_column_decorator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/action-column/action-column-decorator.ts");
/* ESM import */var _decorator_context_menu_context_menu_decorator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/context-menu/context-menu-decorator.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_sorting_sorting_decorator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/sorting/sorting-decorator.ts");
/* ESM import */var _decorator_tag_filter_tag_filter_decorator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/tag-filter/tag-filter-decorator.ts");
/* ESM import */var _element_listing_decorators_general_filters_general_filters_decorator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/general-filters/general-filters-decorator.ts");
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/sdk/app/index.ts");
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
    ..._Pimcore_modules_element_listing_abstract_listing_container__WEBPACK_IMPORTED_MODULE_2__.defaultProps,
    ViewComponent: _views_default_view__WEBPACK_IMPORTED_MODULE_11__.DefaultView,
    useDataQuery: _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.useAssetGetGridQuery,
    useDataQueryHelper: _data_layer_use_data_query_helper__WEBPACK_IMPORTED_MODULE_4__.useDataQueryHelper,
    useElementId: _hooks_use_element_id__WEBPACK_IMPORTED_MODULE_9__.useElementId
};
const ListingContainer = ()=>{
    _s();
    const listingBuilder = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_17__.useInjection)('Asset/Listing/Builder');
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_abstract_listing_container__WEBPACK_IMPORTED_MODULE_2__.ListingContainer, {
        ...listingBuilder.build({
            props: defaultProps
        })
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/listing-container.tsx",
        lineNumber: 37,
        columnNumber: 10
    }, undefined);
};
_s(ListingContainer, "Fv54hGd6p61AxFEYND6v+G8sUU8=", false, function() {
    return [
        _sdk_app__WEBPACK_IMPORTED_MODULE_17__.useInjection
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
"./js/src/core/modules/asset/listing/toolbar/toolbar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
            component: toolbarSlotName ?? _sdk_modules_app__WEBPACK_IMPORTED_MODULE_2__.componentConfig.asset.listing.toolbar.component.name
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/toolbar/toolbar.tsx",
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
"./js/src/core/modules/asset/listing/views/default-view.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DefaultView: () => (DefaultView)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_element_listing_abstract_view_layer_base_view_listing_base_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/view-layer/base-view/listing-base-view.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _toolbar_toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/listing/toolbar/toolbar.tsx");
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



const DefaultView = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_listing_abstract_view_layer_base_view_listing_base_view__WEBPACK_IMPORTED_MODULE_1__.ListingBaseView, {
        renderToolbar: _toolbar_toolbar__WEBPACK_IMPORTED_MODULE_3__.Toolbar
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/views/default-view.tsx",
        lineNumber: 15,
        columnNumber: 10
    }, undefined);
};
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
"./js/src/core/modules/element/listing/decorators/inline-edit/view-layer/components/grid/hooks/use-grid-options/with-inline-edit-options.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WithInlineEdit: () => (WithInlineEdit)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/settings/use-settings.ts");
/* ESM import */var _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns.tsx");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
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



const WithInlineEdit = (useBaseHook, config)=>{
    var _s = $RefreshSig$();
    const useInlineEditExtension = ()=>{
        _s();
        const { getGridProps: baseGetGridProps, transformGridColumn: baseTransformGridColumn, ...baseMethods } = useBaseHook();
        const [modifiedCells, setModifiedCells] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
        const { useInlineEditApiUpdate } = config;
        const { updateCache, updateApiData } = useInlineEditApiUpdate();
        const { useDataQueryHelper } = (0,_Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_1__.useSettings)();
        const { getArgs } = useDataQueryHelper();
        const { decodeColumnIdentifier } = (0,_Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_2__.useSelectedColumns)();
        const onUpdateCellData = (event)=>{
            const { rowData, columnId, value } = event;
            const column = decodeColumnIdentifier(columnId);
            if (column === undefined) {
                return;
            }
            setModifiedCells((modifiedCells)=>{
                const hasModifiedCell = modifiedCells === null || modifiedCells === void 0 ? void 0 : modifiedCells.some((cell)=>cell.rowIndex === rowData.id && cell.columnId === columnId);
                if (hasModifiedCell === true) {
                    return modifiedCells;
                }
                return [
                    ...modifiedCells ?? [],
                    {
                        rowIndex: rowData.id,
                        columnId
                    }
                ];
            });
            const update = {
                getGetRequestArgs: getArgs(),
                update: {
                    id: rowData.id,
                    column,
                    value
                },
                meta: event.meta
            };
            updateCache(update);
            updateApiData(update).finally(()=>{
                setModifiedCells((modifiedCells)=>{
                    return (modifiedCells === null || modifiedCells === void 0 ? void 0 : modifiedCells.filter((cell)=>cell.rowIndex !== rowData.id || cell.columnId !== columnId)) ?? [];
                });
            }).catch(()=>{});
        };
        const getGridProps = ()=>{
            const baseGridProps = baseGetGridProps();
            return {
                ...baseGridProps,
                onUpdateCellData,
                modifiedCells
            };
        };
        const transformGridColumn = (column)=>{
            const baseColumn = baseTransformGridColumn(column);
            return {
                ...baseColumn,
                meta: {
                    ...baseColumn.meta,
                    editable: (row)=>{
                        return (0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_3__.checkElementPermission)(row.permissions, 'publish') && column.editable;
                    }
                }
            };
        };
        return {
            ...baseMethods,
            getGridProps,
            transformGridColumn
        };
    };
    _s(useInlineEditExtension, "iULv5Wc4K1MmcU3ITPVLJ8zdOCs=", true, function() {
        return [
            useBaseHook,
            _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_1__.useSettings,
            _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_2__.useSelectedColumns
        ];
    });
    return useInlineEditExtension;
};
_c = WithInlineEdit;
var _c;
$RefreshReg$(_c, "WithInlineEdit");

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
//# sourceMappingURL=js_src_core_modules_asset_listing_listing-container_tsx.js.map