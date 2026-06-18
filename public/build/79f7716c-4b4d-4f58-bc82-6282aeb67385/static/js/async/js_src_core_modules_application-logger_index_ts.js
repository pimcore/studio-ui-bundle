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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["js_src_core_modules_application-logger_index_ts"], {
"./js/src/core/modules/application-logger/application-logger-api-slice-enhanced.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useBundleApplicationLoggerGetCollectionQuery: () => (useBundleApplicationLoggerGetCollectionQuery),
  useBundleApplicationLoggerListComponentsQuery: () => (useBundleApplicationLoggerListComponentsQuery),
  useBundleApplicationLoggerListPrioritiesQuery: () => (useBundleApplicationLoggerListPrioritiesQuery)
});
/* import */ var _Pimcore_app_api_pimcore_tags__rspack_import_0 = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* import */ var _application_logger_api_slice_gen__rspack_import_1 = __webpack_require__("./js/src/core/modules/application-logger/application-logger-api-slice.gen.ts");
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

const api = _application_logger_api_slice_gen__rspack_import_1.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.APPLICATION_LOGGER,
        _Pimcore_app_api_pimcore_tags__rspack_import_0.tagNames.APPLICATION_LOGGER_DETAIL
    ],
    endpoints: {
        bundleApplicationLoggerGetCollection: {
            providesTags: (result, error, args)=>{
                var _result_items;
                const tagCollection = [];
                result === null || result === void 0 ? void 0 : (_result_items = result.items) === null || _result_items === void 0 ? void 0 : _result_items.forEach((entry)=>{
                    tagCollection.push(..._Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.APPLICATION_LOGGER_DETAIL(entry.id));
                });
                return [
                    ...tagCollection,
                    ..._Pimcore_app_api_pimcore_tags__rspack_import_0.providingTags.APPLICATION_LOGGER()
                ];
            }
        }
    }
});
const { useBundleApplicationLoggerGetCollectionQuery, useBundleApplicationLoggerListComponentsQuery, useBundleApplicationLoggerListPrioritiesQuery } = api;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/application-logger/application-logger-api-slice.gen.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useBundleApplicationLoggerGetCollectionQuery: () => (useBundleApplicationLoggerGetCollectionQuery),
  useBundleApplicationLoggerListComponentsQuery: () => (useBundleApplicationLoggerListComponentsQuery),
  useBundleApplicationLoggerListPrioritiesQuery: () => (useBundleApplicationLoggerListPrioritiesQuery)
});
/* import */ var _sdk_api__rspack_import_0 = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Bundle Application Logger"
];
const injectedRtkApi = _sdk_api__rspack_import_0.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            bundleApplicationLoggerGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/bundle/application-logger/list`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Bundle Application Logger"
                ]
            }),
            bundleApplicationLoggerListComponents: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/bundle/application-logger/components`
                    }),
                providesTags: [
                    "Bundle Application Logger"
                ]
            }),
            bundleApplicationLoggerListPriorities: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/bundle/application-logger/priorities`
                    }),
                providesTags: [
                    "Bundle Application Logger"
                ]
            })
        }),
    overrideExisting: false
});

const { useBundleApplicationLoggerGetCollectionQuery, useBundleApplicationLoggerListComponentsQuery, useBundleApplicationLoggerListPrioritiesQuery } = injectedRtkApi;

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/application-logger/components/sidebar/application-logger-sidebar-manager.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApplicationLoggerSidebarManager: () => (ApplicationLoggerSidebarManager)
});
/* import */ var _Pimcore_modules_element_sidebar_sidebar_manager__rspack_import_0 = __webpack_require__("./js/src/core/modules/element/sidebar/sidebar-manager.ts");
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
class ApplicationLoggerSidebarManager extends _Pimcore_modules_element_sidebar_sidebar_manager__rspack_import_0.SidebarManager {
}

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/use-filter.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useFilter: () => (useFilter)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _filter_provider__rspack_import_1 = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/filter-provider.tsx");
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

const useFilter = ()=>{
    const context = (0,react__rspack_import_0.useContext)(_filter_provider__rspack_import_1.FilterProviderContext);
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/application-logger/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  APPLICATION_LOGGER_WIDGET: () => (APPLICATION_LOGGER_WIDGET)
});
/* import */ var _Pimcore_app_module_system_module_system__rspack_import_0 = __webpack_require__("./js/src/core/app/module-system/module-system.ts");
/* import */ var _Pimcore_app_depency_injection__rspack_import_1 = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* import */ var _Pimcore_app_config_services_service_ids__rspack_import_2 = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* import */ var _application_logger_container__rspack_import_3 = __webpack_require__("./js/src/core/modules/application-logger/application-logger-container.tsx");
/* import */ var _auth_enums_user_permission__rspack_import_4 = __webpack_require__("./js/src/core/modules/auth/enums/user-permission.ts");
/* import */ var _perspectives_enums_nav_permission__rspack_import_5 = __webpack_require__("./js/src/core/modules/perspectives/enums/nav-permission.ts");
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





const APPLICATION_LOGGER_WIDGET = {
    name: 'Application Logger',
    id: 'application-logger',
    component: 'application-logger',
    config: {
        translationKey: 'widget.application-logger',
        icon: {
            type: 'name',
            value: 'application-logger'
        }
    }
};
_Pimcore_app_module_system_module_system__rspack_import_0.moduleSystem.registerModule({
    onInit: ()=>{
        const mainNavRegistryService = _Pimcore_app_depency_injection__rspack_import_1.container.get(_Pimcore_app_config_services_service_ids__rspack_import_2.serviceIds.mainNavRegistry);
        mainNavRegistryService.registerMainNavItem({
            path: 'System/Application Logger',
            label: 'navigation.application-logger',
            dividerBottom: true,
            order: 500,
            permission: _auth_enums_user_permission__rspack_import_4.UserPermission.ApplicationLogger,
            perspectivePermission: _perspectives_enums_nav_permission__rspack_import_5.NavPermission.ApplicationLogger,
            widgetConfig: APPLICATION_LOGGER_WIDGET
        });
        const widgetRegistryService = _Pimcore_app_depency_injection__rspack_import_1.container.get(_Pimcore_app_config_services_service_ids__rspack_import_2.serviceIds.widgetManager);
        widgetRegistryService.registerWidget({
            name: 'application-logger',
            component: _application_logger_container__rspack_import_3.ApplicationLoggerContainer
        });
    }
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/application-logger/application-logger-container-inner.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApplicationLoggerContainerInner: () => (ApplicationLoggerContainerInner)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_app_api_pimcore_tags__rspack_import_1 = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* import */ var _Pimcore_components_box_box__rspack_import_2 = __webpack_require__("./js/src/core/components/box/box.tsx");
/* import */ var _Pimcore_components_content_layout_content_layout__rspack_import_3 = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* import */ var _Pimcore_components_content_content__rspack_import_4 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _Pimcore_components_divider_divider__rspack_import_5 = __webpack_require__("./js/src/core/components/divider/divider.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_6 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_icon_button_icon_button__rspack_import_7 = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* import */ var _Pimcore_components_pagination_pagination__rspack_import_8 = __webpack_require__("./js/src/core/components/pagination/pagination.tsx");
/* import */ var _Pimcore_components_title_title__rspack_import_9 = __webpack_require__("./js/src/core/components/title/title.tsx");
/* import */ var _Pimcore_components_toolbar_toolbar__rspack_import_10 = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* import */ var _Pimcore_modules_application_logger_application_logger_api_slice_enhanced__rspack_import_11 = __webpack_require__("./js/src/core/modules/application-logger/application-logger-api-slice-enhanced.ts");
/* import */ var _sdk_app__rspack_import_12 = __webpack_require__("./js/src/sdk/app/index.ts");
/* import */ var _sdk_components__rspack_import_13 = __webpack_require__("./js/src/sdk/components/index.ts");
/* import */ var lodash__rspack_import_14 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_14_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_14);
/* import */ var react__rspack_import_15 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_15_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_15);
/* import */ var react_i18next__rspack_import_16 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_16_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_16);
/* import */ var _application_logger__rspack_import_17 = __webpack_require__("./js/src/core/modules/application-logger/application-logger.tsx");
/* import */ var _application_logger_api_slice_gen__rspack_import_18 = __webpack_require__("./js/src/core/modules/application-logger/application-logger-api-slice.gen.ts");
/* import */ var _components_sidebar_tabs_filter_provider_filter_provider_use_filter__rspack_import_19 = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/use-filter.ts");
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


















const ApplicationLoggerContainerInner = ()=>{
    _s();
    const { t } = (0,react_i18next__rspack_import_16.useTranslation)();
    const dispatch = (0,_sdk_app__rspack_import_12.useAppDispatch)();
    const [currentPage, setCurrentPage] = (0,react__rspack_import_15.useState)(1);
    const [pageSize, setPageSize] = (0,react__rspack_import_15.useState)(20);
    const [isLoading, setIsLoading] = (0,react__rspack_import_15.useState)(false);
    const [refreshInterval, setRefreshInterval] = (0,react__rspack_import_15.useState)(undefined);
    const [sorting, setSorting] = (0,react__rspack_import_15.useState)([]);
    const { columnFilters, setIsLoading: setFilterLoading } = (0,_components_sidebar_tabs_filter_provider_filter_provider_use_filter__rspack_import_19.useFilter)();
    const sortKeyMap = {
        date: 'timestamp',
        message: 'message',
        translatedPriority: 'priority',
        fileObject: 'fileobject',
        component: 'component',
        source: 'source'
    };
    const sortFilter = sorting.length > 0 ? {
        key: sortKeyMap[sorting[0].id] ?? sorting[0].id,
        direction: sorting[0].desc ? 'DESC' : 'ASC'
    } : {
        key: 'id',
        direction: 'DESC'
    };
    const { data, isFetching: isRTKFetching } = (0,_application_logger_api_slice_gen__rspack_import_18.useBundleApplicationLoggerGetCollectionQuery)({
        body: {
            filters: {
                page: currentPage,
                pageSize,
                columnFilters,
                sortFilter
            }
        }
    });
    const total = (data === null || data === void 0 ? void 0 : data.totalItems) ?? 0;
    const onPagerChange = (page, pageSize)=>{
        setCurrentPage(page);
        setPageSize(pageSize);
    };
    const refreshData = (0,react__rspack_import_15.useCallback)(()=>{
        dispatch(_Pimcore_modules_application_logger_application_logger_api_slice_enhanced__rspack_import_11.api.util.invalidateTags(_Pimcore_app_api_pimcore_tags__rspack_import_1.invalidatingTags.APPLICATION_LOGGER()));
    }, [
        dispatch
    ]);
    const handleRefreshIntervalChange = (value)=>{
        setRefreshInterval(value);
    };
    (0,react__rspack_import_15.useEffect)(()=>{
        if ((0,lodash__rspack_import_14.isNil)(refreshInterval)) {
            return;
        }
        const intervalMs = parseInt(refreshInterval) * 1000;
        const intervalId = setInterval(()=>{
            refreshData();
        }, intervalMs);
        return ()=>{
            clearInterval(intervalId);
        };
    }, [
        refreshInterval,
        refreshData
    ]);
    (0,react__rspack_import_15.useEffect)(()=>{
        setFilterLoading(isRTKFetching);
    }, [
        isRTKFetching
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_layout_content_layout__rspack_import_3.ContentLayout, {
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_toolbar_toolbar__rspack_import_10.Toolbar, {
            justify: "space-between",
            theme: "secondary",
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_6.Flex, {
                    align: "center",
                    gap: 8,
                    children: [
                        !(0,lodash__rspack_import_14.isNil)(refreshInterval) && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("span", {
                            children: t('application-logger.refresh-interval')
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                            lineNumber: 100,
                            columnNumber: 41
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_13.CreatableSelect, {
                            allowClear: true,
                            inputType: "number",
                            minWidth: 200,
                            numberInputProps: {
                                min: 1
                            },
                            onChange: handleRefreshIntervalChange,
                            onCreateOption: (value)=>{
                                return {
                                    value,
                                    label: t('application-logger.refresh-interval.seconds', {
                                        seconds: value
                                    })
                                };
                            },
                            options: [
                                {
                                    value: '3',
                                    label: t('application-logger.refresh-interval.seconds', {
                                        seconds: 3
                                    })
                                },
                                {
                                    value: '5',
                                    label: t('application-logger.refresh-interval.seconds', {
                                        seconds: 5
                                    })
                                },
                                {
                                    value: '10',
                                    label: t('application-logger.refresh-interval.seconds', {
                                        seconds: 10
                                    })
                                },
                                {
                                    value: '30',
                                    label: t('application-logger.refresh-interval.seconds', {
                                        seconds: 30
                                    })
                                },
                                {
                                    value: '60',
                                    label: t('application-logger.refresh-interval.seconds', {
                                        seconds: 60
                                    })
                                }
                            ],
                            placeholder: t('application-logger.refresh-interval.select'),
                            validate: (value)=>!isNaN(parseInt(value)) && parseInt(value) > 0,
                            value: refreshInterval
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, undefined)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                    lineNumber: 99,
                    columnNumber: 11
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_6.Flex, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_button_icon_button__rspack_import_7.IconButton, {
                            disabled: isLoading || isRTKFetching,
                            icon: {
                                value: 'refresh'
                            },
                            onClick: ()=>{
                                setIsLoading(true);
                                refreshData();
                                setIsLoading(false);
                            }
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, undefined),
                        total > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_divider_divider__rspack_import_5.Divider, {
                                    size: "small",
                                    type: "vertical"
                                }, void 0, false, {
                                    fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                                    lineNumber: 146,
                                    columnNumber: 17
                                }, undefined),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_pagination_pagination__rspack_import_8.Pagination, {
                                    current: currentPage,
                                    defaultPageSize: pageSize,
                                    onChange: onPagerChange,
                                    showSizeChanger: true,
                                    showTotal: (total)=>t('pagination.show-total', {
                                            total
                                        }),
                                    total: total
                                }, void 0, false, {
                                    fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                                    lineNumber: 147,
                                    columnNumber: 17
                                }, undefined)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                    lineNumber: 137,
                    columnNumber: 11
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
            lineNumber: 98,
            columnNumber: 40
        }, undefined),
        renderTopBar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_toolbar_toolbar__rspack_import_10.Toolbar, {
            justify: "space-between",
            padding: {
                left: 'small',
                right: 'extra-small'
            },
            theme: "secondary",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_title_title__rspack_import_9.Title, {
                children: t('application-logger.label')
            }, void 0, false, {
                fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                lineNumber: 156,
                columnNumber: 11
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
            lineNumber: 152,
            columnNumber: 35
        }, undefined),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_4.Content, {
            loading: isLoading,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_box_box__rspack_import_2.Box, {
                className: "h-full",
                margin: {
                    x: 'extra-small',
                    y: 'none'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_application_logger__rspack_import_17.ApplicationLogger, {
                    isLoading: isRTKFetching,
                    items: (data === null || data === void 0 ? void 0 : data.items) ?? [],
                    onSortingChange: setSorting,
                    sorting: sorting
                }, void 0, false, {
                    fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                    lineNumber: 163,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                lineNumber: 159,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
            lineNumber: 158,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
        lineNumber: 98,
        columnNumber: 10
    }, undefined);
};
_s(ApplicationLoggerContainerInner, "/O7heRVYJmSrcMz/2bNAVhv1+WM=", false, function() {
    return [
        react_i18next__rspack_import_16.useTranslation,
        _sdk_app__rspack_import_12.useAppDispatch,
        _components_sidebar_tabs_filter_provider_filter_provider_use_filter__rspack_import_19.useFilter,
        _application_logger_api_slice_gen__rspack_import_18.useBundleApplicationLoggerGetCollectionQuery
    ];
});
_c = ApplicationLoggerContainerInner;
var _c;
$RefreshReg$(_c, "ApplicationLoggerContainerInner");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/application-logger/application-logger-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApplicationLoggerContainer: () => (ApplicationLoggerContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _application_logger_container_inner__rspack_import_2 = __webpack_require__("./js/src/core/modules/application-logger/application-logger-container-inner.tsx");
/* import */ var _components_sidebar_tabs_filter_provider_filter_provider_filter_provider__rspack_import_3 = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/filter-provider.tsx");
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


const ApplicationLoggerContainer = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_components_sidebar_tabs_filter_provider_filter_provider_filter_provider__rspack_import_3.FilterProvider, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_application_logger_container_inner__rspack_import_2.ApplicationLoggerContainerInner, {}, void 0, false, {
            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container.tsx",
        lineNumber: 15,
        columnNumber: 10
    }, undefined);
};
_c = ApplicationLoggerContainer;
var _c;
$RefreshReg$(_c, "ApplicationLoggerContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/application-logger/application-logger.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApplicationLogger: () => (ApplicationLogger)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _sdk_components__rspack_import_1 = __webpack_require__("./js/src/sdk/components/index.ts");
/* import */ var lodash__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_2);
/* import */ var react__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_3);
/* import */ var _components_sidebar__rspack_import_4 = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/index.tsx");
/* import */ var _components_table_table__rspack_import_5 = __webpack_require__("./js/src/core/modules/application-logger/components/table/table.tsx");
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




const ApplicationLogger = (param)=>{
    let { items, isLoading, sorting, onSortingChange } = param;
    if ((0,lodash__rspack_import_2.isNil)(items)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {}, void 0, false);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.ContentLayout, {
        renderSidebar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Sidebar, {
            entries: _components_sidebar__rspack_import_4.sidebarManager.getEntries()
        }, void 0, false, {
            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger.tsx",
            lineNumber: 25,
            columnNumber: 40
        }, undefined),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_components_table_table__rspack_import_5.Table, {
            isLoading: isLoading,
            items: items,
            onSortingChange: onSortingChange,
            sorting: sorting
        }, void 0, false, {
            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger.tsx",
        lineNumber: 25,
        columnNumber: 10
    }, undefined);
};
_c = ApplicationLogger;
var _c;
$RefreshReg$(_c, "ApplicationLogger");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DetailModal: () => (DetailModal)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_components_form_form__rspack_import_1 = __webpack_require__("./js/src/core/components/form/form.tsx");
/* import */ var _Pimcore_components_input_input__rspack_import_2 = __webpack_require__("./js/src/core/components/input/input.tsx");
/* import */ var _Pimcore_components_modal_modal__rspack_import_3 = __webpack_require__("./js/src/core/components/modal/modal.tsx");
/* import */ var _Pimcore_components_modal_modal_title_modal_title__rspack_import_4 = __webpack_require__("./js/src/core/components/modal/modal-title/modal-title.tsx");
/* import */ var _Pimcore_components_textarea_textarea__rspack_import_5 = __webpack_require__("./js/src/core/components/textarea/textarea.tsx");
/* import */ var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_many_to_one_relation_many_to_one_relation__rspack_import_6 = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.tsx");
/* import */ var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_field_width_provider__rspack_import_7 = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider.tsx");
/* import */ var lodash__rspack_import_8 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_8_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_8);
/* import */ var react__rspack_import_9 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_9_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_9);
/* import */ var react_i18next__rspack_import_10 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_10_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_10);
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









const DetailModal = (props)=>{
    var _props_data, _props_data1, _props_data2, _props_data3, _props_data4, _props_data5, _props_data6;
    _s();
    const { t } = (0,react_i18next__rspack_import_10.useTranslation)();
    const [form] = _Pimcore_components_form_form__rspack_import_1.Form.useForm();
    const closeModel = ()=>{
        props.setOpen(false);
    };
    const formData = {
        date: ((_props_data = props.data) === null || _props_data === void 0 ? void 0 : _props_data.date) ?? '',
        message: ((_props_data1 = props.data) === null || _props_data1 === void 0 ? void 0 : _props_data1.message) ?? '',
        priority: t(`application-logger.filter.priority-level.${((_props_data2 = props.data) === null || _props_data2 === void 0 ? void 0 : _props_data2.priority) ?? ''}`),
        component: ((_props_data3 = props.data) === null || _props_data3 === void 0 ? void 0 : _props_data3.component) ?? '',
        source: ((_props_data4 = props.data) === null || _props_data4 === void 0 ? void 0 : _props_data4.source) ?? '',
        fileObject: ((_props_data5 = props.data) === null || _props_data5 === void 0 ? void 0 : _props_data5.relatedElementData) ?? null
    };
    // Reset form fields when data changes or modal opens
    (0,react__rspack_import_9.useEffect)(()=>{
        if (props.open && !(0,lodash__rspack_import_8.isNil)(props.data)) {
            form.setFieldsValue(formData);
        }
    }, [
        props.open,
        props.data,
        form
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_modal_modal__rspack_import_3.Modal, {
        onCancel: closeModel,
        onClose: closeModel,
        onOk: closeModel,
        open: props.open,
        title: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_modal_modal_title_modal_title__rspack_import_4.ModalTitle, {
            children: t('application-logger.detail-modal.title')
        }, void 0, false, {
            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
            lineNumber: 44,
            columnNumber: 103
        }, undefined),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_field_width_provider__rspack_import_7.FieldWidthProvider, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_1.Form, {
                form: form,
                initialValues: formData,
                layout: "vertical",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_1.Form.Item, {
                        label: t('application-logger.columns.timestamp'),
                        name: "date",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_input_input__rspack_import_2.Input, {
                            readOnly: true
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                            lineNumber: 50,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_1.Form.Item, {
                        label: t('application-logger.columns.message'),
                        name: "message",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_textarea_textarea__rspack_import_5.TextArea, {
                            readOnly: true
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                            lineNumber: 54,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_1.Form.Item, {
                        label: t('application-logger.columns.type'),
                        name: "priority",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_input_input__rspack_import_2.Input, {
                            readOnly: true
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_1.Form.Item, {
                        label: t('application-logger.columns.component'),
                        name: "component",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_input_input__rspack_import_2.Input, {
                            readOnly: true
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_1.Form.Item, {
                        label: t('application-logger.columns.source'),
                        name: "source",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_input_input__rspack_import_2.Input, {
                            readOnly: true
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, undefined),
                    ((_props_data6 = props.data) === null || _props_data6 === void 0 ? void 0 : _props_data6.fileObject) !== null && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_form_form__rspack_import_1.Form.Item, {
                        label: t('application-logger.columns.related-object'),
                        name: 'fileObject',
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_many_to_one_relation_many_to_one_relation__rspack_import_6.ManyToOneRelation, {
                            assetsAllowed: true,
                            dataObjectsAllowed: true,
                            documentsAllowed: true,
                            readOnly: true
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                            lineNumber: 70,
                            columnNumber: 15
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                        lineNumber: 69,
                        columnNumber: 47
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
        lineNumber: 44,
        columnNumber: 10
    }, undefined);
};
_s(DetailModal, "4Y75fFDCKnEvYldnrTM+CZH0Qgk=", false, function() {
    return [
        react_i18next__rspack_import_10.useTranslation,
        _Pimcore_components_form_form__rspack_import_1.Form.useForm
    ];
});
_c = DetailModal;
var _c;
$RefreshReg$(_c, "DetailModal");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/application-logger/components/sidebar/index.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  sidebarManager: () => (sidebarManager)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_components_icon_icon__rspack_import_1 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _application_logger_sidebar_manager__rspack_import_2 = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/application-logger-sidebar-manager.ts");
/* import */ var _tabs_filter_filter_tab_container__rspack_import_3 = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx");
/* import */ var react__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_4);
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



const sidebarManager = new _application_logger_sidebar_manager__rspack_import_2.ApplicationLoggerSidebarManager();
sidebarManager.registerEntry({
    key: 'filter',
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_1.Icon, {
        options: {
            width: '16px',
            height: '16px'
        },
        value: 'filter'
    }, void 0, false, {
        fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/index.tsx",
        lineNumber: 18,
        columnNumber: 9
    }, undefined),
    component: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_tabs_filter_filter_tab_container__rspack_import_3.FilterTabContainer, {}, void 0, false, {
        fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/index.tsx",
        lineNumber: 22,
        columnNumber: 14
    }, undefined)
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/application-logger/components/sidebar/tabs/filter/components/component-select/component-select.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ComponentSelect: () => (ComponentSelect)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_modules_application_logger_application_logger_api_slice_gen__rspack_import_1 = __webpack_require__("./js/src/core/modules/application-logger/application-logger-api-slice.gen.ts");
/* import */ var _sdk_components__rspack_import_2 = __webpack_require__("./js/src/sdk/components/index.ts");
/* import */ var react__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_3);
/* import */ var _provider_filter_provider_use_filter__rspack_import_4 = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/use-filter.ts");
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



const ComponentSelect = ()=>{
    _s();
    const { data, isLoading } = (0,_Pimcore_modules_application_logger_application_logger_api_slice_gen__rspack_import_1.useBundleApplicationLoggerListComponentsQuery)();
    const [options, setOptions] = (0,react__rspack_import_3.useState)([]);
    const { component, setComponent } = (0,_provider_filter_provider_use_filter__rspack_import_4.useFilter)();
    (0,react__rspack_import_3.useEffect)(()=>{
        if ((data === null || data === void 0 ? void 0 : data.items) !== undefined && data.items.length > 0) {
            const tmpOptions = [];
            data.items.forEach((component)=>{
                tmpOptions.push({
                    value: component,
                    label: component
                });
            });
            setOptions(tmpOptions);
        }
    }, [
        data
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_2.Select, {
        loading: isLoading,
        onChange: (value)=>{
            setComponent(value);
        },
        options: options ?? [],
        value: component ?? undefined
    }, void 0, false, {
        fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/components/component-select/component-select.tsx",
        lineNumber: 37,
        columnNumber: 10
    }, undefined);
};
_s(ComponentSelect, "au4s35Ib755BdziPZg8D4QRhb/8=", false, function() {
    return [
        _Pimcore_modules_application_logger_application_logger_api_slice_gen__rspack_import_1.useBundleApplicationLoggerListComponentsQuery,
        _provider_filter_provider_use_filter__rspack_import_4.useFilter
    ];
});
_c = ComponentSelect;
var _c;
$RefreshReg$(_c, "ComponentSelect");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/application-logger/components/sidebar/tabs/filter/components/priority-select/priority-select.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PrioritySelect: () => (PrioritySelect)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_modules_application_logger_application_logger_api_slice_enhanced__rspack_import_1 = __webpack_require__("./js/src/core/modules/application-logger/application-logger-api-slice-enhanced.ts");
/* import */ var _sdk_components__rspack_import_2 = __webpack_require__("./js/src/sdk/components/index.ts");
/* import */ var react__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_3);
/* import */ var react_i18next__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_4);
/* import */ var _provider_filter_provider_use_filter__rspack_import_5 = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/use-filter.ts");
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




const PrioritySelect = ()=>{
    _s();
    const { t } = (0,react_i18next__rspack_import_4.useTranslation)();
    const { data, isLoading } = (0,_Pimcore_modules_application_logger_application_logger_api_slice_enhanced__rspack_import_1.useBundleApplicationLoggerListPrioritiesQuery)();
    const [options, setOptions] = (0,react__rspack_import_3.useState)([]);
    const { logLevel, setLogLevel } = (0,_provider_filter_provider_use_filter__rspack_import_5.useFilter)();
    (0,react__rspack_import_3.useEffect)(()=>{
        if ((data === null || data === void 0 ? void 0 : data.priorities) !== undefined && data.priorities.length > 0) {
            const tmpOptions = [];
            data.priorities.forEach((priority)=>{
                tmpOptions.push({
                    value: priority.toString(),
                    label: t('application-logger.filter.priority-level.' + priority.toString())
                });
            });
            setOptions(tmpOptions);
        }
    }, [
        data
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_2.Select, {
        loading: isLoading,
        onChange: (value)=>{
            setLogLevel(value);
        },
        options: options ?? [],
        value: logLevel ?? undefined
    }, void 0, false, {
        fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/components/priority-select/priority-select.tsx",
        lineNumber: 41,
        columnNumber: 10
    }, undefined);
};
_s(PrioritySelect, "GVjBAD07UWyPwilm+ke9EA86uZo=", false, function() {
    return [
        react_i18next__rspack_import_4.useTranslation,
        _Pimcore_modules_application_logger_application_logger_api_slice_enhanced__rspack_import_1.useBundleApplicationLoggerListPrioritiesQuery,
        _provider_filter_provider_use_filter__rspack_import_5.useFilter
    ];
});
_c = PrioritySelect;
var _c;
$RefreshReg$(_c, "PrioritySelect");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FilterTabContainer: () => (FilterTabContainer)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _sdk_components__rspack_import_1 = __webpack_require__("./js/src/sdk/components/index.ts");
/* import */ var react__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_2);
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _components_component_select_component_select__rspack_import_4 = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/components/component-select/component-select.tsx");
/* import */ var _components_priority_select_priority_select__rspack_import_5 = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/components/priority-select/priority-select.tsx");
/* import */ var _provider_filter_provider_use_filter__rspack_import_6 = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/use-filter.ts");
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





const DATE_FORMAT = 'YYYY-MM-DD HH:mm';
const FilterTabContainer = ()=>{
    _s();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    const [form] = _sdk_components__rspack_import_1.Form.useForm();
    const { dateFrom, setDateFrom, dateTo, setDateTo, relatedObjectId, setRelatedObjectId, message, setMessage, pid, setPid, resetFilters, updateFilters, isLoading } = (0,_provider_filter_provider_use_filter__rspack_import_6.useFilter)();
    const handleResetFilters = ()=>{
        resetFilters();
        form.resetFields();
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.ContentLayout, {
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Toolbar, {
            theme: "secondary",
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.IconTextButton, {
                    disabled: isLoading,
                    icon: {
                        value: 'close'
                    },
                    onClick: handleResetFilters,
                    type: "link",
                    children: t('sidebar.clear-all-filters')
                }, void 0, false, {
                    fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                    lineNumber: 43,
                    columnNumber: 11
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Button, {
                    disabled: isLoading,
                    loading: isLoading,
                    onClick: updateFilters,
                    type: "primary",
                    children: t('button.apply')
                }, void 0, false, {
                    fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                    lineNumber: 49,
                    columnNumber: 11
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
            lineNumber: 42,
            columnNumber: 40
        }, undefined),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Content, {
            padded: true,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Form, {
                form: form,
                layout: "vertical",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Space, {
                    direction: "vertical",
                    size: "none",
                    style: {
                        width: '100%'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Title, {
                            children: t('application-logger.sidebar.search-parameter')
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Form.Item, {
                            label: t('application-logger.filter.date-from'),
                            name: "dateFrom",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.DatePicker, {
                                className: "w-full",
                                format: DATE_FORMAT,
                                onChange: (value)=>{
                                    setDateFrom(value);
                                },
                                outputType: "dateString",
                                showTime: {
                                    format: 'HH:mm'
                                },
                                value: dateFrom
                            }, void 0, false, {
                                fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Form.Item, {
                            label: t('application-logger.filter.date-to'),
                            name: "dateTo",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.DatePicker, {
                                className: "w-full",
                                format: DATE_FORMAT,
                                onChange: (value)=>{
                                    setDateTo(value);
                                },
                                outputType: "dateString",
                                showTime: {
                                    format: 'HH:mm'
                                },
                                value: dateTo
                            }, void 0, false, {
                                fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Form.Item, {
                            label: t('application-logger.filter.priority'),
                            name: "priority",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_components_priority_select_priority_select__rspack_import_5.PrioritySelect, {}, void 0, false, {
                                fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                                lineNumber: 77,
                                columnNumber: 15
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Form.Item, {
                            label: t('application-logger.filter.component'),
                            name: "component",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_components_component_select_component_select__rspack_import_4.ComponentSelect, {}, void 0, false, {
                                fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Form.Item, {
                            label: t('application-logger.filter.related-object-id'),
                            name: "relatedObjectId",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Input, {
                                min: "0",
                                onChange: (e)=>{
                                    const value = e.target.value;
                                    setRelatedObjectId(value !== '' ? parseInt(value) : null);
                                },
                                step: "1",
                                type: "number",
                                value: relatedObjectId ?? undefined
                            }, void 0, false, {
                                fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Form.Item, {
                            label: t('application-logger.filter.message'),
                            name: "message",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Input, {
                                onChange: (e)=>{
                                    const value = e.target.value;
                                    setMessage(value ?? null);
                                },
                                value: message ?? undefined
                            }, void 0, false, {
                                fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                                lineNumber: 92,
                                columnNumber: 15
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Form.Item, {
                            label: t('application-logger.filter.pid'),
                            name: "pid",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_1.Input, {
                                min: "0",
                                onChange: (e)=>{
                                    const value = e.target.value;
                                    setPid(value !== '' ? parseInt(value) : null);
                                },
                                step: "1",
                                type: "number",
                                value: pid ?? undefined
                            }, void 0, false, {
                                fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                                lineNumber: 99,
                                columnNumber: 15
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, undefined)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                    lineNumber: 55,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
        lineNumber: 42,
        columnNumber: 10
    }, undefined);
};
_s(FilterTabContainer, "IcyMd4jY+cmIknY/30wyEgXpRSc=", false, function() {
    return [
        react_i18next__rspack_import_3.useTranslation,
        _sdk_components__rspack_import_1.Form.useForm,
        _provider_filter_provider_use_filter__rspack_import_6.useFilter
    ];
});
_c = FilterTabContainer;
var _c;
$RefreshReg$(_c, "FilterTabContainer");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/filter-provider.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FilterProvider: () => (FilterProvider),
  FilterProviderContext: () => (FilterProviderContext)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var lodash__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_1);
/* import */ var react__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_2);
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

const FilterProviderContext = /*#__PURE__*/ (0,react__rspack_import_2.createContext)(undefined);
const getInitialColumnFilters = (initialRelatedObjectId)=>{
    if (!(0,lodash__rspack_import_1.isNil)(initialRelatedObjectId)) {
        return [
            {
                key: 'relatedobject',
                type: 'equals',
                filterValue: initialRelatedObjectId
            }
        ];
    }
    return [];
};
const FilterProvider = (props)=>{
    _s();
    const [dateFrom, setDateFrom] = react__rspack_import_2_default().useState(null);
    const [dateTo, setDateTo] = react__rspack_import_2_default().useState(null);
    const [columnFilters, setColumnFilters] = react__rspack_import_2_default().useState(()=>getInitialColumnFilters(props.initialRelatedObjectId));
    const [logLevel, setLogLevel] = react__rspack_import_2_default().useState(null);
    const [component, setComponent] = react__rspack_import_2_default().useState(null);
    const [relatedObjectId, setRelatedObjectId] = react__rspack_import_2_default().useState(props.initialRelatedObjectId ?? null);
    const [message, setMessage] = react__rspack_import_2_default().useState(null);
    const [pid, setPid] = react__rspack_import_2_default().useState(null);
    const [isLoading, setIsLoading] = react__rspack_import_2_default().useState(false);
    const updateFilters = ()=>{
        setColumnFilters(getColumnFilters());
    };
    const resetFilters = ()=>{
        setDateFrom(()=>null);
        setDateTo(()=>null);
        setLogLevel(()=>null);
        setComponent(()=>null);
        setRelatedObjectId(()=>null);
        setMessage(()=>null);
        setPid(()=>null);
        setColumnFilters([]);
    };
    const getColumnFilters = ()=>{
        const filters = [];
        if (!(0,lodash__rspack_import_1.isNil)(dateFrom)) {
            filters.push({
                key: 'dateFrom',
                type: 'date',
                filterValue: {
                    operator: 'from',
                    value: dateFrom
                }
            });
        }
        if (!(0,lodash__rspack_import_1.isNil)(dateTo)) {
            filters.push({
                key: 'dateTo',
                type: 'date',
                filterValue: {
                    operator: 'to',
                    value: dateTo
                }
            });
        }
        if (!(0,lodash__rspack_import_1.isNil)(logLevel)) {
            filters.push({
                key: 'priority',
                type: 'equals',
                filterValue: parseInt(logLevel)
            });
        }
        if (!(0,lodash__rspack_import_1.isNil)(component)) {
            filters.push({
                key: 'component',
                type: 'equals',
                filterValue: component
            });
        }
        if (!(0,lodash__rspack_import_1.isNil)(relatedObjectId)) {
            filters.push({
                key: 'relatedobject',
                type: 'equals',
                filterValue: relatedObjectId
            });
        }
        if (!(0,lodash__rspack_import_1.isNil)(message)) {
            filters.push({
                key: 'message',
                type: 'like',
                filterValue: message
            });
        }
        if (!(0,lodash__rspack_import_1.isNil)(pid)) {
            filters.push({
                key: 'pid',
                type: 'equals',
                filterValue: pid
            });
        }
        return filters;
    };
    return (0,react__rspack_import_2.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(FilterProviderContext.Provider, {
            value: {
                dateFrom,
                setDateFrom,
                dateTo,
                setDateTo,
                logLevel,
                setLogLevel,
                component,
                setComponent,
                relatedObjectId,
                setRelatedObjectId,
                message,
                setMessage,
                pid,
                setPid,
                columnFilters,
                updateFilters,
                resetFilters,
                isLoading,
                setIsLoading
            },
            children: props.children
        }, void 0, false, {
            fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/filter-provider.tsx",
            lineNumber: 106,
            columnNumber: 24
        }, undefined), [
        dateFrom,
        dateTo,
        columnFilters,
        logLevel,
        component,
        relatedObjectId,
        message,
        pid,
        isLoading
    ]);
};
_s(FilterProvider, "b9wU222dLPObs0+sMu+MiWssSXI=");
_c = FilterProvider;
var _c;
$RefreshReg$(_c, "FilterProvider");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/application-logger/components/table/table.styles.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* import */ var _Pimcore_modules_ant_design_styles_create_styles__rspack_import_0 = __webpack_require__("./js/src/core/modules/ant-design/styles/create-styles.ts");
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
const useStyles = (0,_Pimcore_modules_ant_design_styles_create_styles__rspack_import_0.createStyles)((param)=>{
    let { token, css } = param;
    return {
        cellTruncate: css`
      display: block !important;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 0 ${token.paddingXXS}px;
      padding: ${token.paddingXXS}px;
    `
    };
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/application-logger/components/table/table.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Table: () => (Table)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var _Pimcore_components_flex_flex__rspack_import_1 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_grid_grid__rspack_import_2 = __webpack_require__("./js/src/core/components/grid/grid.tsx");
/* import */ var _Pimcore_components_icon_button_icon_button__rspack_import_3 = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* import */ var _Pimcore_modules_element_hooks_use_element_helper__rspack_import_4 = __webpack_require__("./js/src/core/modules/element/hooks/use-element-helper.ts");
/* import */ var _Pimcore_utils_date_time__rspack_import_5 = __webpack_require__("./js/src/core/utils/date-time.ts");
/* import */ var _sdk_components__rspack_import_6 = __webpack_require__("./js/src/sdk/components/index.ts");
/* import */ var _tanstack_react_table__rspack_import_7 = __webpack_require__("webpack/sharing/consume/default/@tanstack/react-table/@tanstack/react-table");
/* import */ var _tanstack_react_table__rspack_import_7_default = /*#__PURE__*/__webpack_require__.n(_tanstack_react_table__rspack_import_7);
/* import */ var lodash__rspack_import_8 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_8_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_8);
/* import */ var react__rspack_import_9 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_9_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_9);
/* import */ var react_i18next__rspack_import_10 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_10_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_10);
/* import */ var _detail_modal_detail_modal__rspack_import_11 = __webpack_require__("./js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx");
/* import */ var _table_styles__rspack_import_12 = __webpack_require__("./js/src/core/modules/application-logger/components/table/table.styles.tsx");
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











const Table = (param)=>{
    let { items, isLoading, sorting, onSortingChange } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_10.useTranslation)();
    const { openElement } = (0,_Pimcore_modules_element_hooks_use_element_helper__rspack_import_4.useElementHelper)();
    const { styles } = (0,_table_styles__rspack_import_12.useStyles)();
    const [open, setOpen] = (0,react__rspack_import_9.useState)(false);
    const [modelData, setModelData] = (0,react__rspack_import_9.useState)(null);
    const openModal = (data)=>{
        setModelData(data);
        setOpen(true);
    };
    const tableItems = items.map((item)=>{
        return {
            ...item,
            date: (0,_Pimcore_utils_date_time__rspack_import_5.formatDateTime)({
                timestamp: item.date,
                dateStyle: 'short',
                timeStyle: 'medium'
            }),
            translatedPriority: t(`application-logger.filter.priority-level.${item.priority}`)
        };
    });
    const columnHelper = (0,_tanstack_react_table__rspack_import_7.createColumnHelper)();
    const columns = [
        columnHelper.accessor('date', {
            header: t('application-logger.columns.timestamp'),
            size: 80,
            enableSorting: true
        }),
        columnHelper.accessor('pid', {
            header: t('application-logger.columns.pid'),
            size: 60
        }),
        columnHelper.accessor('message', {
            header: t('application-logger.columns.message'),
            enableSorting: true,
            cell: (param)=>{
                let { getValue } = param;
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("span", {
                    className: styles.cellTruncate,
                    children: getValue()
                }, void 0, false, {
                    fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/table/table.tsx",
                    lineNumber: 68,
                    columnNumber: 11
                }, undefined);
            }
        }),
        columnHelper.accessor('translatedPriority', {
            header: t('application-logger.columns.type'),
            size: 60,
            enableSorting: true
        }),
        columnHelper.accessor('fileObject', {
            header: t('application-logger.columns.file-object'),
            enableSorting: true,
            cell: (param)=>{
                let { row } = param;
                const column = row.original;
                const fileObjectBasePath = '/pimcore-studio/api/bundle/application-logger/file-object?filePath=';
                if ((0,lodash__rspack_import_8.isNil)(column.fileObject)) {
                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {}, void 0, false);
                }
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_6.Button, {
                    href: fileObjectBasePath + column.fileObject,
                    target: "_blank",
                    type: "link",
                    children: t('open')
                }, void 0, false, {
                    fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/table/table.tsx",
                    lineNumber: 86,
                    columnNumber: 14
                }, undefined);
            },
            size: 60
        }),
        columnHelper.accessor('relatedElementData', {
            header: t('application-logger.columns.related-object'),
            cell: (param)=>{
                let { row } = param;
                const column = row.original;
                if ((0,lodash__rspack_import_8.isNil)(column.relatedElementData)) {
                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {}, void 0, false);
                }
                const element = column.relatedElementData;
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_6.Button, {
                    onClick: ()=>{
                        openElement({
                            id: element.id,
                            type: element.type === 'object' ? 'data-object' : element.type
                        }).catch(()=>{});
                    },
                    type: "link",
                    children: `${element.type} ${element.id}`
                }, void 0, false, {
                    fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/table/table.tsx",
                    lineNumber: 101,
                    columnNumber: 14
                }, undefined);
            },
            size: 60
        }),
        columnHelper.accessor('component', {
            header: t('application-logger.columns.component'),
            size: 100,
            enableSorting: true
        }),
        columnHelper.accessor('source', {
            header: t('application-logger.columns.source'),
            enableSorting: true
        }),
        columnHelper.accessor('actions', {
            header: t('application-logger.columns.details'),
            enableSorting: false,
            cell: (param)=>{
                let { row } = param;
                const column = row.original;
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_1.Flex, {
                    align: "center",
                    className: "w-full",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_button_icon_button__rspack_import_3.IconButton, {
                        icon: {
                            value: 'expand-01'
                        },
                        onClick: async ()=>{
                            openModal(column);
                        },
                        type: "link"
                    }, void 0, false, {
                        fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/table/table.tsx",
                        lineNumber: 126,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/table/table.tsx",
                    lineNumber: 125,
                    columnNumber: 14
                }, undefined);
            },
            size: 40
        })
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(react_jsx_dev_runtime__rspack_import_0.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_grid_grid__rspack_import_2.Grid, {
                autoWidth: true,
                columns: columns,
                data: tableItems,
                enableSorting: true,
                isLoading: isLoading,
                manualSorting: true,
                modifiedCells: [],
                onSortingChange: onSortingChange,
                resizable: true,
                sorting: sorting
            }, void 0, false, {
                fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/table/table.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_detail_modal_detail_modal__rspack_import_11.DetailModal, {
                data: modelData,
                open: open,
                setOpen: setOpen
            }, void 0, false, {
                fileName: "/var/www/2025.x/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/table/table.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true);
};
_s(Table, "J8810Rj+DtDHNA+rqMQPTbCpIFc=", false, function() {
    return [
        react_i18next__rspack_import_10.useTranslation,
        _Pimcore_modules_element_hooks_use_element_helper__rspack_import_4.useElementHelper,
        _table_styles__rspack_import_12.useStyles
    ];
});
_c = Table;
var _c;
$RefreshReg$(_c, "Table");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=js_src_core_modules_application-logger_index_ts.js.map