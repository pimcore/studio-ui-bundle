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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["js_src_core_modules_asset_listing_listing-container_tsx"], {
"./js/src/core/modules/asset/listing/decorator/action-column/action-column-decorator.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActionColumnDecorator: () => (ActionColumnDecorator)
});
/* import */ var _view_layer_components_grid_hooks_with_action_column_configuration__rspack_import_0 = __webpack_require__("./js/src/core/modules/asset/listing/decorator/action-column/view-layer/components/grid/hooks/with-action-column-configuration.tsx");
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
const ActionColumnDecorator = (props)=>{
    const { useGridOptions, ...defaultProps } = props;
    const newProps = {
        ...defaultProps,
        useGridOptions: (0,_view_layer_components_grid_hooks_with_action_column_configuration__rspack_import_0.withActionColumnConfiguration)(useGridOptions)
    };
    return newProps;
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/listing/decorator/column-configuration/column-configuration-decorator.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ColumnConfigurationDecorator: () => (ColumnConfigurationDecorator)
});
/* import */ var _configuration_layer_with_column_configuration__rspack_import_0 = __webpack_require__("./js/src/core/modules/asset/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx");
/* import */ var _view_layer_components_sidebar_hooks_with_configuration_sidebar_entry__rspack_import_1 = __webpack_require__("./js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/hooks/with-configuration-sidebar-entry.tsx");
/* import */ var _context_layer_with_available_columns_context__rspack_import_2 = __webpack_require__("./js/src/core/modules/asset/listing/decorator/column-configuration/context-layer/with-available-columns-context.tsx");
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


const ColumnConfigurationDecorator = (props)=>{
    const { ConfigurationComponent, ContextComponent, useSidebarOptions, ...defaultProps } = props;
    const newProps = {
        ...defaultProps,
        ContextComponent: (0,_context_layer_with_available_columns_context__rspack_import_2.WithAvailableColumnsContext)(ContextComponent),
        ConfigurationComponent: (0,_configuration_layer_with_column_configuration__rspack_import_0.withColumnConfiguration)(ConfigurationComponent),
        useSidebarOptions: (0,_view_layer_components_sidebar_hooks_with_configuration_sidebar_entry__rspack_import_1.withConfigurationSidebarEntry)(useSidebarOptions)
    };
    return newProps;
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/listing/hooks/use-element-id.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useElementId: () => (useElementId)
});
/* import */ var _Pimcore_modules_element_hooks_use_element_context__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
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
const useElementId = ()=>{
    const { id } = (0,_Pimcore_modules_element_hooks_use_element_context__rspack_import_0.useElementContext)();
    const getId = ()=>id;
    return {
        getId
    };
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/listing/decorators/inline-edit/inline-edit-decorator.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  InlineEditDecorator: () => (InlineEditDecorator)
});
/* import */ var _view_layer_components_grid_hooks_use_grid_options_with_inline_edit_options__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/listing/decorators/inline-edit/view-layer/components/grid/hooks/use-grid-options/with-inline-edit-options.tsx");
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
const InlineEditDecorator = (props, config)=>{
    const { useGridOptions, ...baseProps } = props;
    const newProps = {
        ...baseProps,
        useGridOptions: (0,_view_layer_components_grid_hooks_use_grid_options_with_inline_edit_options__rspack_import_0.WithInlineEdit)(useGridOptions, config)
    };
    return newProps;
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/listing/decorator/action-column/view-layer/components/grid/hooks/with-action-column-configuration.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withActionColumnConfiguration: () => (withActionColumnConfiguration)
});
/* import */ var _tanstack_react_table__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/@tanstack/react-table/@tanstack/react-table");
/* import */ var _tanstack_react_table__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(_tanstack_react_table__rspack_import_0);
/* import */ var react_i18next__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_1);
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

const columnHelper = (0,_tanstack_react_table__rspack_import_0.createColumnHelper)();
const withActionColumnConfiguration = (useBaseHook)=>{
    var _s = $RefreshSig$();
    const useActionColumnExtension = ()=>{
        _s();
        const { t } = (0,react_i18next__rspack_import_1.useTranslation)();
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
            react_i18next__rspack_import_1.useTranslation,
            useBaseHook
        ];
    });
    return useActionColumnExtension;
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withColumnConfiguration: () => (withColumnConfiguration)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_modules_asset_asset_api_slice_enhanced__rspack_import_2 = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* import */ var _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__rspack_import_3 = __webpack_require__("./js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_4 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_modules_element_listing_abstract_settings_use_settings__rspack_import_5 = __webpack_require__("./js/src/core/modules/element/listing/abstract/settings/use-settings.ts");
/* import */ var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__rspack_import_6 = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns.tsx");
/* import */ var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__rspack_import_7 = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/selected-grid-config-id/use-selected-grid-config-id.ts");
/* import */ var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__rspack_import_8 = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config.ts");
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







const withColumnConfiguration = (Component)=>{
    var _s = $RefreshSig$();
    const WithAssetColumnConfiguration = ()=>{
        _s();
        const { isLoading, data } = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__rspack_import_2.useAssetGetAvailableGridColumnsQuery)();
        const { useElementId, useDataQueryHelper } = (0,_Pimcore_modules_element_listing_abstract_settings_use_settings__rspack_import_5.useSettings)();
        const { getId } = useElementId();
        const { id: configId } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__rspack_import_7.useSelectedGridConfigId)();
        const { isLoading: isInitialConfigLoading, data: initialConfigurationData } = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__rspack_import_2.useAssetGetGridConfigurationByFolderIdQuery)({
            folderId: getId(),
            configurationId: configId
        });
        const { setSelectedColumns } = (0,_Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__rspack_import_3.useSelectedColumns)();
        const { setAvailableColumns } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__rspack_import_6.useAvailableColumns)();
        const { setGridConfig } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__rspack_import_8.useGridConfig)();
        const { setDataLoadingState } = useDataQueryHelper();
        const isConfigLoading = isLoading || isInitialConfigLoading;
        (0,react__rspack_import_1.useEffect)(()=>{
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
                        width: column.width,
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
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_4.Content, {
                loading: true
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx",
                lineNumber: 86,
                columnNumber: 14
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(Component, {}, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/decorator/column-configuration/configuration-layer/with-column-configuration.tsx",
            lineNumber: 88,
            columnNumber: 12
        }, undefined);
    };
    _s(WithAssetColumnConfiguration, "VWDXxaYPpBaJ/RCbNZNVBGmPkho=", true, function() {
        return [
            _Pimcore_modules_asset_asset_api_slice_enhanced__rspack_import_2.useAssetGetAvailableGridColumnsQuery,
            _Pimcore_modules_element_listing_abstract_settings_use_settings__rspack_import_5.useSettings,
            _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__rspack_import_7.useSelectedGridConfigId,
            _Pimcore_modules_asset_asset_api_slice_enhanced__rspack_import_2.useAssetGetGridConfigurationByFolderIdQuery,
            _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__rspack_import_3.useSelectedColumns,
            _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__rspack_import_6.useAvailableColumns,
            _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__rspack_import_8.useGridConfig
        ];
    });
    return WithAssetColumnConfiguration;
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/listing/decorator/context-menu/context-menu-decorator.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ContextMenuDecorator: () => (ContextMenuDecorator)
});
/* import */ var _view_layer_components_grid_hooks_with_context_menu__rspack_import_0 = __webpack_require__("./js/src/core/modules/asset/listing/decorator/context-menu/view-layer/components/grid/hooks/with-context-menu.tsx");
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
const ContextMenuDecorator = (props)=>{
    const { useGridOptions, ...defaultProps } = props;
    const newProps = {
        ...defaultProps,
        useGridOptions: (0,_view_layer_components_grid_hooks_with_context_menu__rspack_import_0.withContextMenu)(useGridOptions)
    };
    return newProps;
};
_c = ContextMenuDecorator;
var _c;
$RefreshReg$(_c, "ContextMenuDecorator");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/listing/decorator/context-menu/view-layer/components/context-menu/list-grid-context-menu.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ListGridContextMenu: () => (ListGridContextMenu)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_components_dropdown_dropdown__rspack_import_1 = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* import */ var _Pimcore_modules_element_actions__rspack_import_2 = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* import */ var react__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_3);
/* import */ var _Pimcore_modules_app_context_menu_registry_use_context_menu_slot__rspack_import_4 = __webpack_require__("./js/src/core/modules/app/context-menu-registry/use-context-menu-slot.ts");
/* import */ var _Pimcore_modules_app_context_menu_registry_context_menu_config__rspack_import_5 = __webpack_require__("./js/src/core/modules/app/context-menu-registry/context-menu-config.ts");
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




const ListGridContextMenu = (props)=>{
    _s();
    const { row } = props;
    const [isOpen, setIsOpen] = (0,react__rspack_import_3.useState)(undefined);
    const context = {
        row,
        onComplete: ()=>{
            setIsOpen(undefined);
        }
    };
    const items = (0,_Pimcore_modules_app_context_menu_registry_use_context_menu_slot__rspack_import_4.useContextMenuSlot)(_Pimcore_modules_app_context_menu_registry_context_menu_config__rspack_import_5.contextMenuConfig.assetListGrid.name, context);
    const handleMenuClick = (e)=>{
        if (e.key === _Pimcore_modules_element_actions__rspack_import_2.ContextMenuActionName.locateInTree) {
            setIsOpen(true);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_dropdown__rspack_import_1.Dropdown, {
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
        _Pimcore_modules_app_context_menu_registry_use_context_menu_slot__rspack_import_4.useContextMenuSlot
    ];
});
_c = ListGridContextMenu;
var _c;
$RefreshReg$(_c, "ListGridContextMenu");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/listing/decorator/context-menu/view-layer/components/grid/hooks/with-context-menu.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withContextMenu: () => (withContextMenu)
});
/* import */ var _context_menu_list_grid_context_menu__rspack_import_0 = __webpack_require__("./js/src/core/modules/asset/listing/decorator/context-menu/view-layer/components/context-menu/list-grid-context-menu.tsx");
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
const withContextMenu = (useBaseHook)=>{
    var _s = $RefreshSig$();
    const useContextMenuExtension = ()=>{
        _s();
        const { getGridProps: baseGetGridProps, ...baseMethods } = useBaseHook();
        const getGridProps = ()=>{
            const baseGripProps = baseGetGridProps();
            const newGridProps = {
                ...baseGripProps,
                contextMenu: _context_menu_list_grid_context_menu__rspack_import_0.ListGridContextMenu
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/listing/decorator/inline-editing/hooks/use-inline-edit-api-update.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useInlineEditApiUpdate: () => (useInlineEditApiUpdate)
});
/* import */ var _sdk_app__rspack_import_0 = __webpack_require__("./js/src/sdk/app/index.ts");
/* import */ var _Pimcore_modules_app_error_handler__rspack_import_1 = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* import */ var _Pimcore_modules_asset_asset_api_slice_enhanced__rspack_import_2 = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* import */ var lodash__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_3);
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



const useInlineEditApiUpdate = ()=>{
    _s();
    const [patchAsset] = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__rspack_import_2.useAssetPatchByIdMutation)();
    const dispatch = (0,_sdk_app__rspack_import_0.useAppDispatch)();
    const updateCache = (event)=>{
        const { update, getGetRequestArgs } = event;
        const { id, column: columnToUpdate, value } = update;
        dispatch(_Pimcore_modules_asset_asset_api_slice_enhanced__rspack_import_2.api.util.updateQueryData('assetGetGrid', getGetRequestArgs, (oldData)=>{
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
        if (!(0,lodash__rspack_import_3.isNil)(result.error)) {
            (0,_Pimcore_modules_app_error_handler__rspack_import_1["default"])(new _Pimcore_modules_app_error_handler__rspack_import_1.ApiError(result.error));
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
        _Pimcore_modules_asset_asset_api_slice_enhanced__rspack_import_2.useAssetPatchByIdMutation,
        _sdk_app__rspack_import_0.useAppDispatch
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/listing/listing-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActionColumnDecorator: () => (/* reexport safe */ _decorator_action_column_action_column_decorator__rspack_import_12.ActionColumnDecorator),
  BaseListing: () => (/* reexport safe */ _Pimcore_modules_element_listing_abstract_listing_container__rspack_import_2.ListingContainer),
  ColumnConfigurationDecorator: () => (/* reexport safe */ _decorator_column_configuration_column_configuration_decorator__rspack_import_5.ColumnConfigurationDecorator),
  ContextMenuDecorator: () => (/* reexport safe */ _decorator_context_menu_context_menu_decorator__rspack_import_13.ContextMenuDecorator),
  GeneralFiltersDecorator: () => (/* reexport safe */ _element_listing_decorators_general_filters_general_filters_decorator__rspack_import_16.GeneralFiltersDecorator),
  InlineEditDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_inline_edit_inline_edit_decorator__rspack_import_7.InlineEditDecorator),
  ListingContainer: () => (ListingContainer),
  PagingDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_paging_paging_decorator__rspack_import_10.PagingDecorator),
  RowSelectionDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_row_selection_row_selection_decorator__rspack_import_6.RowSelectionDecorator),
  SortingDecorator: () => (/* reexport safe */ _Pimcore_modules_element_listing_decorators_sorting_sorting_decorator__rspack_import_14.SortingDecorator),
  TagFilterDecorator: () => (/* reexport safe */ _decorator_tag_filter_tag_filter_decorator__rspack_import_15.TagFilterDecorator),
  listingDefaultProps: () => (defaultProps),
  useInlineEditApiUpdate: () => (/* reexport safe */ _decorator_inline_editing_hooks_use_inline_edit_api_update__rspack_import_8.useInlineEditApiUpdate)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_modules_asset_asset_api_slice_enhanced__rspack_import_1 = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* import */ var _Pimcore_modules_element_listing_abstract_listing_container__rspack_import_2 = __webpack_require__("./js/src/core/modules/element/listing/abstract/listing-container.tsx");
/* import */ var react__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_3);
/* import */ var _data_layer_use_data_query_helper__rspack_import_4 = __webpack_require__("./js/src/core/modules/asset/listing/data-layer/use-data-query-helper.tsx");
/* import */ var _decorator_column_configuration_column_configuration_decorator__rspack_import_5 = __webpack_require__("./js/src/core/modules/asset/listing/decorator/column-configuration/column-configuration-decorator.ts");
/* import */ var _Pimcore_modules_element_listing_decorators_row_selection_row_selection_decorator__rspack_import_6 = __webpack_require__("./js/src/core/modules/element/listing/decorators/row-selection/row-selection-decorator.ts");
/* import */ var _Pimcore_modules_element_listing_decorators_inline_edit_inline_edit_decorator__rspack_import_7 = __webpack_require__("./js/src/core/modules/element/listing/decorators/inline-edit/inline-edit-decorator.ts");
/* import */ var _decorator_inline_editing_hooks_use_inline_edit_api_update__rspack_import_8 = __webpack_require__("./js/src/core/modules/asset/listing/decorator/inline-editing/hooks/use-inline-edit-api-update.tsx");
/* import */ var _hooks_use_element_id__rspack_import_9 = __webpack_require__("./js/src/core/modules/asset/listing/hooks/use-element-id.ts");
/* import */ var _Pimcore_modules_element_listing_decorators_paging_paging_decorator__rspack_import_10 = __webpack_require__("./js/src/core/modules/element/listing/decorators/paging/paging-decorator.ts");
/* import */ var _views_default_view__rspack_import_11 = __webpack_require__("./js/src/core/modules/asset/listing/views/default-view.tsx");
/* import */ var _decorator_action_column_action_column_decorator__rspack_import_12 = __webpack_require__("./js/src/core/modules/asset/listing/decorator/action-column/action-column-decorator.ts");
/* import */ var _decorator_context_menu_context_menu_decorator__rspack_import_13 = __webpack_require__("./js/src/core/modules/asset/listing/decorator/context-menu/context-menu-decorator.tsx");
/* import */ var _Pimcore_modules_element_listing_decorators_sorting_sorting_decorator__rspack_import_14 = __webpack_require__("./js/src/core/modules/element/listing/decorators/sorting/sorting-decorator.ts");
/* import */ var _decorator_tag_filter_tag_filter_decorator__rspack_import_15 = __webpack_require__("./js/src/core/modules/asset/listing/decorator/tag-filter/tag-filter-decorator.ts");
/* import */ var _element_listing_decorators_general_filters_general_filters_decorator__rspack_import_16 = __webpack_require__("./js/src/core/modules/element/listing/decorators/general-filters/general-filters-decorator.ts");
/* import */ var _sdk_app__rspack_import_17 = __webpack_require__("./js/src/sdk/app/index.ts");
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
















const defaultProps = {
    ..._Pimcore_modules_element_listing_abstract_listing_container__rspack_import_2.defaultProps,
    ViewComponent: _views_default_view__rspack_import_11.DefaultView,
    useDataQuery: _Pimcore_modules_asset_asset_api_slice_enhanced__rspack_import_1.useAssetGetGridQuery,
    useDataQueryHelper: _data_layer_use_data_query_helper__rspack_import_4.useDataQueryHelper,
    useElementId: _hooks_use_element_id__rspack_import_9.useElementId
};
const ListingContainer = ()=>{
    _s();
    const listingBuilder = (0,_sdk_app__rspack_import_17.useInjection)('Asset/Listing/Builder');
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_listing_abstract_listing_container__rspack_import_2.ListingContainer, {
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
        _sdk_app__rspack_import_17.useInjection
    ];
});
_c = ListingContainer;

var _c;
$RefreshReg$(_c, "ListingContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/listing/toolbar/toolbar.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Toolbar: () => (Toolbar)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _sdk_modules_app__rspack_import_2 = __webpack_require__("./js/src/sdk/modules/app/index.ts");
/* import */ var _sdk_modules_element__rspack_import_3 = __webpack_require__("./js/src/sdk/modules/element/index.ts");
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


const Toolbar = ()=>{
    _s();
    const { toolbarSlotName } = (0,_sdk_modules_element__rspack_import_3.useSettings)();
    return (0,react__rspack_import_1.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_modules_app__rspack_import_2.ComponentRenderer, {
            component: toolbarSlotName ?? _sdk_modules_app__rspack_import_2.componentConfig.asset.listing.toolbar.component.name
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/toolbar/toolbar.tsx",
            lineNumber: 18,
            columnNumber: 24
        }, undefined), []);
};
_s(Toolbar, "WMl/qvuk7XAOMHk9+zImmLtD7zs=", false, function() {
    return [
        _sdk_modules_element__rspack_import_3.useSettings
    ];
});
_c = Toolbar;
var _c;
$RefreshReg$(_c, "Toolbar");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/asset/listing/views/default-view.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DefaultView: () => (DefaultView)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_modules_element_listing_abstract_view_layer_base_view_listing_base_view__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/listing/abstract/view-layer/base-view/listing-base-view.tsx");
/* import */ var react__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_2);
/* import */ var _toolbar_toolbar__rspack_import_3 = __webpack_require__("./js/src/core/modules/asset/listing/toolbar/toolbar.tsx");
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


const DefaultView = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_listing_abstract_view_layer_base_view_listing_base_view__rspack_import_1.ListingBaseView, {
        renderToolbar: _toolbar_toolbar__rspack_import_3.Toolbar
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/views/default-view.tsx",
        lineNumber: 15,
        columnNumber: 10
    }, undefined);
};
_c = DefaultView;
var _c;
$RefreshReg$(_c, "DefaultView");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/element/listing/decorators/inline-edit/view-layer/components/grid/hooks/use-grid-options/with-inline-edit-options.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WithInlineEdit: () => (WithInlineEdit)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _Pimcore_modules_element_listing_abstract_settings_use_settings__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/listing/abstract/settings/use-settings.ts");
/* import */ var _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__rspack_import_2 = __webpack_require__("./js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns.tsx");
/* import */ var _Pimcore_modules_element_permissions_permission_helper__rspack_import_3 = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
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



const WithInlineEdit = (useBaseHook, config)=>{
    var _s = $RefreshSig$();
    const useInlineEditExtension = ()=>{
        _s();
        const { getGridProps: baseGetGridProps, transformGridColumn: baseTransformGridColumn, ...baseMethods } = useBaseHook();
        const [modifiedCells, setModifiedCells] = (0,react__rspack_import_0.useState)([]);
        const { useInlineEditApiUpdate } = config;
        const { updateCache, updateApiData } = useInlineEditApiUpdate();
        const { useDataQueryHelper } = (0,_Pimcore_modules_element_listing_abstract_settings_use_settings__rspack_import_1.useSettings)();
        const { getArgs } = useDataQueryHelper();
        const { decodeColumnIdentifier } = (0,_Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__rspack_import_2.useSelectedColumns)();
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
                        return (0,_Pimcore_modules_element_permissions_permission_helper__rspack_import_3.checkElementPermission)(row.permissions, 'publish') && column.editable;
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
            _Pimcore_modules_element_listing_abstract_settings_use_settings__rspack_import_1.useSettings,
            _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__rspack_import_2.useSelectedColumns
        ];
    });
    return useInlineEditExtension;
};
_c = WithInlineEdit;
var _c;
$RefreshReg$(_c, "WithInlineEdit");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=js_src_core_modules_asset_listing_listing-container_tsx.js.map