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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_modules_application-logger_index_ts"], {
"./js/src/core/modules/application-logger/application-logger-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api),
  useBundleApplicationLoggerGetCollectionQuery: () => (useBundleApplicationLoggerGetCollectionQuery),
  useBundleApplicationLoggerListComponentsQuery: () => (useBundleApplicationLoggerListComponentsQuery),
  useBundleApplicationLoggerListPrioritiesQuery: () => (useBundleApplicationLoggerListPrioritiesQuery)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _application_logger_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/application-logger/application-logger-api-slice.gen.ts");
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

const api = _application_logger_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.APPLICATION_LOGGER,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.tagNames.APPLICATION_LOGGER_DETAIL
    ],
    endpoints: {
        bundleApplicationLoggerGetCollection: {
            providesTags: (result, error, args)=>{
                var _result_items;
                const tagCollection = [];
                result === null || result === void 0 ? void 0 : (_result_items = result.items) === null || _result_items === void 0 ? void 0 : _result_items.forEach((entry)=>{
                    tagCollection.push(..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.APPLICATION_LOGGER_DETAIL(entry.id));
                });
                return [
                    ...tagCollection,
                    ..._Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.providingTags.APPLICATION_LOGGER()
                ];
            }
        }
    }
});
const { useBundleApplicationLoggerGetCollectionQuery, useBundleApplicationLoggerListComponentsQuery, useBundleApplicationLoggerListPrioritiesQuery } = api;

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
"./js/src/core/modules/application-logger/application-logger-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useBundleApplicationLoggerGetCollectionQuery: () => (useBundleApplicationLoggerGetCollectionQuery),
  useBundleApplicationLoggerListComponentsQuery: () => (useBundleApplicationLoggerListComponentsQuery),
  useBundleApplicationLoggerListPrioritiesQuery: () => (useBundleApplicationLoggerListPrioritiesQuery)
});
/* ESM import */var _sdk_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/api/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Bundle Application Logger"
];
const injectedRtkApi = _sdk_api__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
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
"./js/src/core/modules/application-logger/components/sidebar/application-logger-sidebar-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApplicationLoggerSidebarManager: () => (ApplicationLoggerSidebarManager)
});
/* ESM import */var _Pimcore_modules_element_sidebar_sidebar_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/sidebar/sidebar-manager.ts");
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
class ApplicationLoggerSidebarManager extends _Pimcore_modules_element_sidebar_sidebar_manager__WEBPACK_IMPORTED_MODULE_0__.SidebarManager {
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
"./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/use-filter.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useFilter: () => (useFilter)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _filter_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/filter-provider.tsx");
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

const useFilter = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_filter_provider__WEBPACK_IMPORTED_MODULE_1__.FilterProviderContext);
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
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
"./js/src/core/modules/application-logger/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  APPLICATION_LOGGER_WIDGET: () => (APPLICATION_LOGGER_WIDGET)
});
/* ESM import */var _Pimcore_app_module_system_module_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/module-system/module-system.ts");
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _application_logger_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/application-logger/application-logger-container.tsx");
/* ESM import */var _auth_enums_user_permission__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/auth/enums/user-permission.ts");
/* ESM import */var _perspectives_enums_nav_permission__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/perspectives/enums/nav-permission.ts");
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
_Pimcore_app_module_system_module_system__WEBPACK_IMPORTED_MODULE_0__.moduleSystem.registerModule({
    onInit: ()=>{
        const mainNavRegistryService = _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_1__.container.get(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_2__.serviceIds.mainNavRegistry);
        mainNavRegistryService.registerMainNavItem({
            path: 'System/Application Logger',
            label: 'navigation.application-logger',
            dividerBottom: true,
            order: 500,
            permission: _auth_enums_user_permission__WEBPACK_IMPORTED_MODULE_4__.UserPermission.ApplicationLogger,
            perspectivePermission: _perspectives_enums_nav_permission__WEBPACK_IMPORTED_MODULE_5__.NavPermission.ApplicationLogger,
            widgetConfig: APPLICATION_LOGGER_WIDGET
        });
        const widgetRegistryService = _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_1__.container.get(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_2__.serviceIds.widgetManager);
        widgetRegistryService.registerWidget({
            name: 'application-logger',
            component: _application_logger_container__WEBPACK_IMPORTED_MODULE_3__.ApplicationLoggerContainer
        });
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
"./js/src/core/modules/application-logger/application-logger-container-inner.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApplicationLoggerContainerInner: () => (ApplicationLoggerContainerInner)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_components_divider_divider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/divider/divider.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_components_pagination_pagination__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/pagination/pagination.tsx");
/* ESM import */var _Pimcore_components_title_title__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/title/title.tsx");
/* ESM import */var _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* ESM import */var _Pimcore_modules_application_logger_application_logger_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/application-logger/application-logger-api-slice-enhanced.ts");
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_14__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_15__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_16__);
/* ESM import */var _application_logger__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/application-logger/application-logger.tsx");
/* ESM import */var _application_logger_api_slice_gen__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/modules/application-logger/application-logger-api-slice.gen.ts");
/* ESM import */var _components_sidebar_tabs_filter_provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/use-filter.ts");
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



















const ApplicationLoggerContainerInner = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_16__.useTranslation)();
    const dispatch = (0,_sdk_app__WEBPACK_IMPORTED_MODULE_12__.useAppDispatch)();
    const [currentPage, setCurrentPage] = (0,react__WEBPACK_IMPORTED_MODULE_15__.useState)(1);
    const [pageSize, setPageSize] = (0,react__WEBPACK_IMPORTED_MODULE_15__.useState)(20);
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_15__.useState)(false);
    const [refreshInterval, setRefreshInterval] = (0,react__WEBPACK_IMPORTED_MODULE_15__.useState)(undefined);
    const { columnFilters, setIsLoading: setFilterLoading } = (0,_components_sidebar_tabs_filter_provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_19__.useFilter)();
    const { data, isFetching: isRTKFetching } = (0,_application_logger_api_slice_gen__WEBPACK_IMPORTED_MODULE_18__.useBundleApplicationLoggerGetCollectionQuery)({
        body: {
            filters: {
                page: currentPage,
                pageSize,
                columnFilters
            }
        }
    });
    const total = (data === null || data === void 0 ? void 0 : data.totalItems) ?? 0;
    const onPagerChange = (page, pageSize)=>{
        setCurrentPage(page);
        setPageSize(pageSize);
    };
    const refreshData = (0,react__WEBPACK_IMPORTED_MODULE_15__.useCallback)(()=>{
        dispatch(_Pimcore_modules_application_logger_application_logger_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_11__.api.util.invalidateTags(_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_1__.invalidatingTags.APPLICATION_LOGGER()));
    }, [
        dispatch
    ]);
    const handleRefreshIntervalChange = (value)=>{
        setRefreshInterval(value);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_15__.useEffect)(()=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_14__.isNil)(refreshInterval)) {
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
    (0,react__WEBPACK_IMPORTED_MODULE_15__.useEffect)(()=>{
        setFilterLoading(isRTKFetching);
    }, [
        isRTKFetching
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_3__.ContentLayout, {
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_10__.Toolbar, {
            justify: "space-between",
            theme: "secondary",
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_6__.Flex, {
                    align: "center",
                    gap: 8,
                    children: [
                        !(0,lodash__WEBPACK_IMPORTED_MODULE_14__.isNil)(refreshInterval) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                            children: t('application-logger.refresh-interval')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                            lineNumber: 83,
                            columnNumber: 41
                        }, void 0),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_13__.CreatableSelect, {
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
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                    lineNumber: 82,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_6__.Flex, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_7__.IconButton, {
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
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                            lineNumber: 121,
                            columnNumber: 13
                        }, void 0),
                        total > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_divider_divider__WEBPACK_IMPORTED_MODULE_5__.Divider, {
                                    size: "small",
                                    type: "vertical"
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                                    lineNumber: 129,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_pagination_pagination__WEBPACK_IMPORTED_MODULE_8__.Pagination, {
                                    current: currentPage,
                                    defaultPageSize: pageSize,
                                    onChange: onPagerChange,
                                    showSizeChanger: true,
                                    showTotal: (total)=>t('pagination.show-total', {
                                            total
                                        }),
                                    total: total
                                }, void 0, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                                    lineNumber: 130,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                    lineNumber: 120,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
            lineNumber: 81,
            columnNumber: 40
        }, void 0),
        renderTopBar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_10__.Toolbar, {
            justify: "space-between",
            margin: {
                x: 'mini',
                y: 'none'
            },
            theme: "secondary",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_title_title__WEBPACK_IMPORTED_MODULE_9__.Title, {
                children: t('application-logger.label')
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                lineNumber: 139,
                columnNumber: 11
            }, void 0)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
            lineNumber: 135,
            columnNumber: 35
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_4__.Content, {
            loading: isLoading,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_2__.Box, {
                className: "h-full",
                margin: {
                    x: 'extra-small',
                    y: 'none'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_application_logger__WEBPACK_IMPORTED_MODULE_17__.ApplicationLogger, {
                    items: (data === null || data === void 0 ? void 0 : data.items) ?? []
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                    lineNumber: 146,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
                lineNumber: 142,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
            lineNumber: 141,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container-inner.tsx",
        lineNumber: 81,
        columnNumber: 10
    }, undefined);
};
_s(ApplicationLoggerContainerInner, "6mr7gSrvrJAfIWW1Ht1325vmJS0=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_16__.useTranslation,
        _sdk_app__WEBPACK_IMPORTED_MODULE_12__.useAppDispatch,
        _components_sidebar_tabs_filter_provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_19__.useFilter,
        _application_logger_api_slice_gen__WEBPACK_IMPORTED_MODULE_18__.useBundleApplicationLoggerGetCollectionQuery
    ];
});
_c = ApplicationLoggerContainerInner;
var _c;
$RefreshReg$(_c, "ApplicationLoggerContainerInner");

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
"./js/src/core/modules/application-logger/application-logger-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApplicationLoggerContainer: () => (ApplicationLoggerContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _application_logger_container_inner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/application-logger/application-logger-container-inner.tsx");
/* ESM import */var _components_sidebar_tabs_filter_provider_filter_provider_filter_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/filter-provider.tsx");
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



const ApplicationLoggerContainer = ()=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_sidebar_tabs_filter_provider_filter_provider_filter_provider__WEBPACK_IMPORTED_MODULE_3__.FilterProvider, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_application_logger_container_inner__WEBPACK_IMPORTED_MODULE_2__.ApplicationLoggerContainerInner, {}, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger-container.tsx",
        lineNumber: 15,
        columnNumber: 10
    }, undefined);
};
_c = ApplicationLoggerContainer;
var _c;
$RefreshReg$(_c, "ApplicationLoggerContainer");

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
"./js/src/core/modules/application-logger/application-logger.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ApplicationLogger: () => (ApplicationLogger)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _components_sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/index.tsx");
/* ESM import */var _components_table_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/application-logger/components/table/table.tsx");
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





const ApplicationLogger = (param)=>{
    let { items } = param;
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(items)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.ContentLayout, {
        renderSidebar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Sidebar, {
            entries: _components_sidebar__WEBPACK_IMPORTED_MODULE_4__.sidebarManager.getEntries()
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger.tsx",
            lineNumber: 22,
            columnNumber: 40
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_table_table__WEBPACK_IMPORTED_MODULE_5__.Table, {
            items: items
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/application-logger.tsx",
        lineNumber: 22,
        columnNumber: 10
    }, undefined);
};
_c = ApplicationLogger;
var _c;
$RefreshReg$(_c, "ApplicationLogger");

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
"./js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DetailModal: () => (DetailModal)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var _Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/input/input.tsx");
/* ESM import */var _Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/modal/modal.tsx");
/* ESM import */var _Pimcore_components_modal_modal_title_modal_title__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/modal/modal-title/modal-title.tsx");
/* ESM import */var _Pimcore_components_textarea_textarea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/textarea/textarea.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_many_to_one_relation_many_to_one_relation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_field_width_provider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_10__);
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










const DetailModal = (props)=>{
    var _props_data, _props_data1, _props_data2, _props_data3, _props_data4, _props_data5, _props_data6;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_10__.useTranslation)();
    const [form] = _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_1__.Form.useForm();
    const closeModel = ()=>{
        props.setOpen(false);
    };
    const formData = {
        date: ((_props_data = props.data) === null || _props_data === void 0 ? void 0 : _props_data.date) ?? '',
        message: ((_props_data1 = props.data) === null || _props_data1 === void 0 ? void 0 : _props_data1.message) ?? '',
        priority: ((_props_data2 = props.data) === null || _props_data2 === void 0 ? void 0 : _props_data2.priority) ?? '',
        component: ((_props_data3 = props.data) === null || _props_data3 === void 0 ? void 0 : _props_data3.component) ?? '',
        source: ((_props_data4 = props.data) === null || _props_data4 === void 0 ? void 0 : _props_data4.source) ?? '',
        fileObject: ((_props_data5 = props.data) === null || _props_data5 === void 0 ? void 0 : _props_data5.relatedElementData) ?? null
    };
    // Reset form fields when data changes or modal opens
    (0,react__WEBPACK_IMPORTED_MODULE_9__.useEffect)(()=>{
        if (props.open && !(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(props.data)) {
            form.setFieldsValue(formData);
        }
    }, [
        props.open,
        props.data,
        form
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_modal__WEBPACK_IMPORTED_MODULE_3__.Modal, {
        onCancel: closeModel,
        onClose: closeModel,
        onOk: closeModel,
        open: props.open,
        title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_modal_title_modal_title__WEBPACK_IMPORTED_MODULE_4__.ModalTitle, {
            children: t('application-logger.detail-modal.title')
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
            lineNumber: 44,
            columnNumber: 103
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_field_width_provider__WEBPACK_IMPORTED_MODULE_7__.FieldWidthProvider, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_1__.Form, {
                form: form,
                initialValues: formData,
                layout: "vertical",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                        label: t('application-logger.columns.timestamp'),
                        name: "date",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_2__.Input, {
                            readOnly: true
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                            lineNumber: 50,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                        label: t('application-logger.columns.message'),
                        name: "message",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_textarea_textarea__WEBPACK_IMPORTED_MODULE_5__.TextArea, {
                            readOnly: true
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                            lineNumber: 54,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                        label: t('application-logger.columns.type'),
                        name: "priority",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_2__.Input, {
                            readOnly: true
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                        label: t('application-logger.columns.component'),
                        name: "component",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_2__.Input, {
                            readOnly: true
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                        label: t('application-logger.columns.source'),
                        name: "source",
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_input_input__WEBPACK_IMPORTED_MODULE_2__.Input, {
                            readOnly: true
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, undefined),
                    ((_props_data6 = props.data) === null || _props_data6 === void 0 ? void 0 : _props_data6.fileObject) !== null && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                        label: t('application-logger.columns.related-object'),
                        name: 'fileObject',
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_many_to_one_relation_many_to_one_relation__WEBPACK_IMPORTED_MODULE_6__.ManyToOneRelation, {
                            assetsAllowed: true,
                            dataObjectsAllowed: true,
                            documentsAllowed: true,
                            readOnly: true
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                            lineNumber: 70,
                            columnNumber: 15
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                        lineNumber: 69,
                        columnNumber: 47
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx",
        lineNumber: 44,
        columnNumber: 10
    }, undefined);
};
_s(DetailModal, "4Y75fFDCKnEvYldnrTM+CZH0Qgk=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_10__.useTranslation,
        _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_1__.Form.useForm
    ];
});
_c = DetailModal;
var _c;
$RefreshReg$(_c, "DetailModal");

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
"./js/src/core/modules/application-logger/components/sidebar/index.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  sidebarManager: () => (sidebarManager)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _application_logger_sidebar_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/application-logger-sidebar-manager.ts");
/* ESM import */var _tabs_filter_filter_tab_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx");
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




const sidebarManager = new _application_logger_sidebar_manager__WEBPACK_IMPORTED_MODULE_2__.ApplicationLoggerSidebarManager();
sidebarManager.registerEntry({
    key: 'filter',
    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
        options: {
            width: '16px',
            height: '16px'
        },
        value: 'filter'
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/index.tsx",
        lineNumber: 18,
        columnNumber: 9
    }, undefined),
    component: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tabs_filter_filter_tab_container__WEBPACK_IMPORTED_MODULE_3__.FilterTabContainer, {}, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/index.tsx",
        lineNumber: 22,
        columnNumber: 14
    }, undefined)
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
"./js/src/core/modules/application-logger/components/sidebar/tabs/filter/components/component-select/component-select.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ComponentSelect: () => (ComponentSelect)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_application_logger_application_logger_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/application-logger/application-logger-api-slice.gen.ts");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/use-filter.ts");
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




const ComponentSelect = ()=>{
    _s();
    const { data, isLoading } = (0,_Pimcore_modules_application_logger_application_logger_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.useBundleApplicationLoggerListComponentsQuery)();
    const [options, setOptions] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const { component, setComponent } = (0,_provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_4__.useFilter)();
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
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
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.Select, {
        loading: isLoading,
        onChange: (value)=>{
            setComponent(value);
        },
        options: options ?? [],
        value: component ?? undefined
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/components/component-select/component-select.tsx",
        lineNumber: 37,
        columnNumber: 10
    }, undefined);
};
_s(ComponentSelect, "au4s35Ib755BdziPZg8D4QRhb/8=", false, function() {
    return [
        _Pimcore_modules_application_logger_application_logger_api_slice_gen__WEBPACK_IMPORTED_MODULE_1__.useBundleApplicationLoggerListComponentsQuery,
        _provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_4__.useFilter
    ];
});
_c = ComponentSelect;
var _c;
$RefreshReg$(_c, "ComponentSelect");

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
"./js/src/core/modules/application-logger/components/sidebar/tabs/filter/components/priority-select/priority-select.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PrioritySelect: () => (PrioritySelect)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_application_logger_application_logger_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/application-logger/application-logger-api-slice-enhanced.ts");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/use-filter.ts");
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





const PrioritySelect = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const { data, isLoading } = (0,_Pimcore_modules_application_logger_application_logger_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.useBundleApplicationLoggerListPrioritiesQuery)();
    const [options, setOptions] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const { logLevel, setLogLevel } = (0,_provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_5__.useFilter)();
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
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
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.Select, {
        loading: isLoading,
        onChange: (value)=>{
            setLogLevel(value);
        },
        options: options ?? [],
        value: logLevel ?? undefined
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/components/priority-select/priority-select.tsx",
        lineNumber: 41,
        columnNumber: 10
    }, undefined);
};
_s(PrioritySelect, "GVjBAD07UWyPwilm+ke9EA86uZo=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _Pimcore_modules_application_logger_application_logger_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.useBundleApplicationLoggerListPrioritiesQuery,
        _provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_5__.useFilter
    ];
});
_c = PrioritySelect;
var _c;
$RefreshReg$(_c, "PrioritySelect");

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
"./js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FilterTabContainer: () => (FilterTabContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _components_component_select_component_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/components/component-select/component-select.tsx");
/* ESM import */var _components_priority_select_priority_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/components/priority-select/priority-select.tsx");
/* ESM import */var _provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/use-filter.ts");
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






const DATE_FORMAT = 'YYYY-MM-DD HH:mm';
const FilterTabContainer = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const [form] = _sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.useForm();
    const { dateFrom, setDateFrom, dateTo, setDateTo, relatedObjectId, setRelatedObjectId, message, setMessage, pid, setPid, resetFilters, updateFilters, isLoading } = (0,_provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_6__.useFilter)();
    const handleResetFilters = ()=>{
        resetFilters();
        form.resetFields();
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.ContentLayout, {
        renderToolbar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Toolbar, {
            theme: "secondary",
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.IconTextButton, {
                    disabled: isLoading,
                    icon: {
                        value: 'close'
                    },
                    onClick: handleResetFilters,
                    type: "link",
                    children: t('sidebar.clear-all-filters')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                    lineNumber: 43,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                    disabled: isLoading,
                    loading: isLoading,
                    onClick: updateFilters,
                    type: "primary",
                    children: t('button.apply')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                    lineNumber: 49,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
            lineNumber: 42,
            columnNumber: 40
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Content, {
            padded: true,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form, {
                form: form,
                layout: "vertical",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Space, {
                    direction: "vertical",
                    size: "none",
                    style: {
                        width: '100%'
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Title, {
                            children: t('application-logger.sidebar.search-parameter')
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                            label: t('application-logger.filter.date-from'),
                            name: "dateFrom",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.DatePicker, {
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
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                            label: t('application-logger.filter.date-to'),
                            name: "dateTo",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.DatePicker, {
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
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                            label: t('application-logger.filter.priority'),
                            name: "priority",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_priority_select_priority_select__WEBPACK_IMPORTED_MODULE_5__.PrioritySelect, {}, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                                lineNumber: 77,
                                columnNumber: 15
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                            label: t('application-logger.filter.component'),
                            name: "component",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_component_select_component_select__WEBPACK_IMPORTED_MODULE_4__.ComponentSelect, {}, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                            label: t('application-logger.filter.related-object-id'),
                            name: "relatedObjectId",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Input, {
                                min: "0",
                                onChange: (e)=>{
                                    const value = e.target.value;
                                    setRelatedObjectId(value !== '' ? parseInt(value) : null);
                                },
                                step: "1",
                                type: "number",
                                value: relatedObjectId ?? undefined
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                            label: t('application-logger.filter.message'),
                            name: "message",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Input, {
                                onChange: (e)=>{
                                    const value = e.target.value;
                                    setMessage(value ?? null);
                                },
                                value: message ?? undefined
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                                lineNumber: 92,
                                columnNumber: 15
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                            label: t('application-logger.filter.pid'),
                            name: "pid",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Input, {
                                min: "0",
                                onChange: (e)=>{
                                    const value = e.target.value;
                                    setPid(value !== '' ? parseInt(value) : null);
                                },
                                step: "1",
                                type: "number",
                                value: pid ?? undefined
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                                lineNumber: 99,
                                columnNumber: 15
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, undefined)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                    lineNumber: 55,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/filter-tab-container.tsx",
        lineNumber: 42,
        columnNumber: 10
    }, undefined);
};
_s(FilterTabContainer, "IcyMd4jY+cmIknY/30wyEgXpRSc=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.useForm,
        _provider_filter_provider_use_filter__WEBPACK_IMPORTED_MODULE_6__.useFilter
    ];
});
_c = FilterTabContainer;
var _c;
$RefreshReg$(_c, "FilterTabContainer");

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
"./js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/filter-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FilterProvider: () => (FilterProvider),
  FilterProviderContext: () => (FilterProviderContext)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
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


const FilterProviderContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)(undefined);
const FilterProvider = (props)=>{
    _s();
    const [dateFrom, setDateFrom] = react__WEBPACK_IMPORTED_MODULE_2___default().useState(null);
    const [dateTo, setDateTo] = react__WEBPACK_IMPORTED_MODULE_2___default().useState(null);
    const [columnFilters, setColumnFilters] = react__WEBPACK_IMPORTED_MODULE_2___default().useState([]);
    const [logLevel, setLogLevel] = react__WEBPACK_IMPORTED_MODULE_2___default().useState(null);
    const [component, setComponent] = react__WEBPACK_IMPORTED_MODULE_2___default().useState(null);
    const [relatedObjectId, setRelatedObjectId] = react__WEBPACK_IMPORTED_MODULE_2___default().useState(null);
    const [message, setMessage] = react__WEBPACK_IMPORTED_MODULE_2___default().useState(null);
    const [pid, setPid] = react__WEBPACK_IMPORTED_MODULE_2___default().useState(null);
    const [isLoading, setIsLoading] = react__WEBPACK_IMPORTED_MODULE_2___default().useState(false);
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
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(dateFrom)) {
            filters.push({
                key: 'dateFrom',
                type: 'date',
                filterValue: {
                    operator: 'from',
                    value: dateFrom
                }
            });
        }
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(dateTo)) {
            filters.push({
                key: 'dateTo',
                type: 'date',
                filterValue: {
                    operator: 'to',
                    value: dateTo
                }
            });
        }
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(logLevel)) {
            filters.push({
                key: 'priority',
                type: 'equals',
                filterValue: parseInt(logLevel)
            });
        }
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(component)) {
            filters.push({
                key: 'component',
                type: 'equals',
                filterValue: component
            });
        }
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(relatedObjectId)) {
            filters.push({
                key: 'relatedobject',
                type: 'equals',
                filterValue: relatedObjectId
            });
        }
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(message)) {
            filters.push({
                key: 'message',
                type: 'like',
                filterValue: message
            });
        }
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(pid)) {
            filters.push({
                key: 'pid',
                type: 'equals',
                filterValue: pid
            });
        }
        return filters;
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(FilterProviderContext.Provider, {
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
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/sidebar/tabs/filter/provider/filter-provider/filter-provider.tsx",
            lineNumber: 96,
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
_s(FilterProvider, "qgDNDlz0nNHX5qQ7pCOdqFv/Dao=");
_c = FilterProvider;
var _c;
$RefreshReg$(_c, "FilterProvider");

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
"./js/src/core/modules/application-logger/components/table/table.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Table: () => (Table)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_grid_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/grid/grid.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-helper.ts");
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/utils/date-time.ts");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("webpack/sharing/consume/default/@tanstack/react-table/@tanstack/react-table");
/* ESM import */var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_tanstack_react_table__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_10__);
/* ESM import */var _detail_modal_detail_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/application-logger/components/detail-modal/detail-modal.tsx");
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
    let { items } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_10__.useTranslation)();
    const { openElement } = (0,_Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_4__.useElementHelper)();
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)(false);
    const [modelData, setModelData] = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)(null);
    const openModal = (data)=>{
        setModelData(data);
        setOpen(true);
    };
    const tableItems = items.map((item)=>{
        return {
            ...item,
            date: (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_5__.formatDateTime)({
                timestamp: item.date,
                dateStyle: 'short',
                timeStyle: 'short'
            }),
            translatedPriority: t(`application-logger.filter.priority-level.${item.priority}`)
        };
    });
    const columnHelper = (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_7__.createColumnHelper)();
    const columns = [
        columnHelper.accessor('date', {
            header: t('application-logger.columns.timestamp'),
            size: 80
        }),
        columnHelper.accessor('pid', {
            header: t('application-logger.columns.pid'),
            size: 60
        }),
        columnHelper.accessor('message', {
            header: t('application-logger.columns.message')
        }),
        columnHelper.accessor('translatedPriority', {
            header: t('application-logger.columns.type'),
            size: 60
        }),
        columnHelper.accessor('fileObject', {
            header: t('application-logger.columns.file-object'),
            cell: (param)=>{
                let { row } = param;
                const column = row.original;
                const fileObjectBasePath = '/admin/bundle/applicationlogger/log/show-file-object?filePath=';
                if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(column.fileObject)) {
                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
                }
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
                    href: fileObjectBasePath + column.fileObject,
                    target: "_blank",
                    type: "link",
                    children: t('open')
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/table/table.tsx",
                    lineNumber: 70,
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
                if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(column.relatedElementData)) {
                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
                }
                const element = column.relatedElementData;
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
                    onClick: ()=>{
                        openElement({
                            id: element.id,
                            type: element.type === 'object' ? 'data-object' : element.type
                        }).catch(()=>{});
                    },
                    type: "link",
                    children: `${element.type} ${element.id}`
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/table/table.tsx",
                    lineNumber: 85,
                    columnNumber: 14
                }, undefined);
            },
            size: 60
        }),
        columnHelper.accessor('component', {
            header: t('application-logger.columns.component'),
            size: 100
        }),
        columnHelper.accessor('source', {
            header: t('application-logger.columns.source')
        }),
        columnHelper.accessor('actions', {
            header: t('application-logger.columns.details'),
            cell: (param)=>{
                let { row } = param;
                const column = row.original;
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_1__.Flex, {
                    align: "center",
                    className: "w-full",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
                        icon: {
                            value: 'expand-01'
                        },
                        onClick: async ()=>{
                            openModal(column);
                        },
                        type: "link"
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/table/table.tsx",
                        lineNumber: 107,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/table/table.tsx",
                    lineNumber: 106,
                    columnNumber: 14
                }, undefined);
            },
            size: 40
        })
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_grid_grid__WEBPACK_IMPORTED_MODULE_2__.Grid, {
                autoWidth: true,
                columns: columns,
                data: tableItems,
                // isLoading={notesAndEventsFetching}
                modifiedCells: [],
                resizable: true
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/table/table.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_detail_modal_detail_modal__WEBPACK_IMPORTED_MODULE_11__.DetailModal, {
                data: modelData,
                open: open,
                setOpen: setOpen
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/application-logger/components/table/table.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true);
};
_s(Table, "vRNpB5IRiJJBXCo6t7NLUKSkhLw=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_10__.useTranslation,
        _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_4__.useElementHelper
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

}]);
//# sourceMappingURL=js_src_core_modules_application-logger_index_ts.js.map