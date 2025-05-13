"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_modules_widget-manager_hooks_use-widget-manager_ts"], {
"./js/src/core/app/store/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addAppMiddleware: () => (addAppMiddleware),
  injectSliceWithState: () => (injectSliceWithState),
  rootReducer: () => (rootReducer),
  store: () => (store),
  useAppDispatch: () => (useAppDispatch),
  useAppSelector: () => (useAppSelector),
  withAppMiddleware: () => (withAppMiddleware)
});
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
/* ESM import */var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-redux/dist/react-redux.mjs");
/* ESM import */var _Pimcore_app_api_pimcore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* ESM import */var _middleware_rtkQueryErrorLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/store/middleware/rtkQueryErrorLogger.ts");
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



const slices = [
    _Pimcore_app_api_pimcore__WEBPACK_IMPORTED_MODULE_0__.api
];
const createRootReducer = ()=>{
    return (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.combineSlices)({}, ...slices).withLazyLoadedSlices();
};
const dynamicMiddleware = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.createDynamicMiddleware)();
const { addMiddleware, withMiddleware } = dynamicMiddleware;
const rootReducer = createRootReducer();
const store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.configureStore)({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'execution-engine/jobReceived'
                ],
                ignoredActionPaths: [
                    'execution-engine',
                    'meta'
                ],
                ignoredPaths: [
                    'execution-engine',
                    'meta'
                ]
            }
        }).concat(_Pimcore_app_api_pimcore__WEBPACK_IMPORTED_MODULE_0__.api.middleware, _middleware_rtkQueryErrorLogger__WEBPACK_IMPORTED_MODULE_1__.rtkQueryErrorLogger, dynamicMiddleware.middleware)
});
const injectSliceWithState = (newSlice)=>{
    slices.push(newSlice);
    const updatedRootReducer = createRootReducer();
    store.replaceReducer(updatedRootReducer);
    return updatedRootReducer;
};
const useAppDispatch = react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch;
const useAppSelector = react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector;
const addAppMiddleware = addMiddleware.withTypes();
const withAppMiddleware = withMiddleware.withTypes();

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
"./js/src/core/app/store/middleware/rtkQueryErrorLogger.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  rtkQueryErrorLogger: () => (rtkQueryErrorLogger)
});
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
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
// Cannot use directly from the slice
// Middleware doesn't have direct access to the state management logic defined in slices
const initialState = {
    id: 0,
    username: '',
    permissions: [],
    isAdmin: false,
    classes: [],
    docTypes: [],
    activePerspective: 0,
    perspectives: [],
    language: 'en'
};
const rtkQueryErrorLogger = (api)=>(next)=>(action)=>{
            // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
            if ((0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.isRejectedWithValue)(action)) {
                const payload = action.payload;
                // Handle the case when the user's session has expired and further requests return a 401 status.
                if ((payload === null || payload === void 0 ? void 0 : payload.status) === 401) {
                    api.dispatch({
                        type: 'auth/setUser',
                        payload: initialState
                    });
                    // Need to prevent further handling of the error to avoid triggering the error boundary etc.
                    return;
                }
            }
            return next(action);
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
"./js/src/core/modules/perspectives/active-perspective-slice.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  activePerspectiveSliceName: () => (activePerspectiveSliceName),
  selectActivePerspective: () => (selectActivePerspective),
  setActivePerspective: () => (setActivePerspective)
});
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
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

const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({
    name: 'activePerspective',
    initialState: null,
    reducers: {
        setActivePerspective: (state, param)=>{
            let { payload } = param;
            return payload;
        }
    }
});
const activePerspectiveSliceName = slice.name;
(0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.injectSliceWithState)(slice);
const { setActivePerspective } = slice.actions;
const selectActivePerspective = (state)=>state.activePerspective;

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
"./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useWidgetManager: () => (useWidgetManager)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _widget_manager_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/widget-manager/widget-manager-slice.ts");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/flexlayout-react/lib/index.js");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flexlayout_react__WEBPACK_IMPORTED_MODULE_2__);
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


const useWidgetManager = ()=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    function openMainWidget(tabConfig) {
        dispatch((0,_widget_manager_slice__WEBPACK_IMPORTED_MODULE_1__.openMainWidget)(tabConfig));
    }
    function openBottomWidget(tabConfig) {
        dispatch((0,_widget_manager_slice__WEBPACK_IMPORTED_MODULE_1__.openBottomWidget)(tabConfig));
    }
    function openLeftWidget(tabConfig) {
        dispatch((0,_widget_manager_slice__WEBPACK_IMPORTED_MODULE_1__.openLeftWidget)(tabConfig));
    }
    function openRightWidget(tabConfig) {
        dispatch((0,_widget_manager_slice__WEBPACK_IMPORTED_MODULE_1__.openRightWidget)(tabConfig));
    }
    function switchToWidget(id) {
        dispatch((0,_widget_manager_slice__WEBPACK_IMPORTED_MODULE_1__.setActiveWidgetById)(id));
    }
    function closeWidget(id) {
        dispatch((0,_widget_manager_slice__WEBPACK_IMPORTED_MODULE_1__.closeWidget)(id));
    }
    function getInnerModel() {
        const state = _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.getState();
        const modelJson = (0,_widget_manager_slice__WEBPACK_IMPORTED_MODULE_1__.selectInnerModel)(state);
        return flexlayout_react__WEBPACK_IMPORTED_MODULE_2__.Model.fromJson(modelJson);
    }
    function isMainWidgetOpen(id) {
        return getInnerModel().getNodeById(id) !== undefined;
    }
    function getOpenedMainWidget() {
        var _getInnerModel_getActiveTabset;
        return (_getInnerModel_getActiveTabset = getInnerModel().getActiveTabset()) === null || _getInnerModel_getActiveTabset === void 0 ? void 0 : _getInnerModel_getActiveTabset.getSelectedNode();
    }
    return {
        openMainWidget,
        openBottomWidget,
        openLeftWidget,
        openRightWidget,
        switchToWidget,
        closeWidget,
        isMainWidgetOpen,
        getOpenedMainWidget
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
"./js/src/core/modules/widget-manager/utils/widget-manager-inner-model.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getInitialModelJson: () => (getInitialModelJson)
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
*/ const getInitialModelJson = ()=>{
    return {
        global: {
            tabEnableRename: false,
            tabSetEnableMaximize: false
        },
        layout: {
            id: 'main',
            type: 'row',
            children: [
                {
                    type: 'tabset',
                    id: 'main_tabset',
                    enableDeleteWhenEmpty: false,
                    weight: 50,
                    selected: 0,
                    children: []
                }
            ]
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
"./js/src/core/modules/widget-manager/utils/widget-manager-outer-model.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getInitialModelJson: () => (getInitialModelJson)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_perspectives_active_perspective_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/perspectives/active-perspective-slice.ts");
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
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



const getInitialModelJson = ()=>{
    const activePerspective = (0,_Pimcore_modules_perspectives_active_perspective_slice__WEBPACK_IMPORTED_MODULE_1__.selectActivePerspective)(_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.getState());
    const usedIds = new Set();
    const widgetsLeft = getWidgetsLeft(activePerspective, usedIds);
    const widgetsRight = getWidgetsRight(activePerspective, usedIds);
    const widgetsBottom = getWidgetsBottom(activePerspective, usedIds);
    return {
        global: {
            tabEnableRename: false,
            tabSetEnableMaximize: false,
            rootOrientationVertical: true
        },
        layout: {
            id: 'main',
            type: 'row',
            children: [
                {
                    type: 'tabset',
                    id: 'main_tabset',
                    enableDeleteWhenEmpty: false,
                    weight: 50,
                    selected: 0,
                    children: [
                        {
                            type: 'tab',
                            component: 'inner-widget-manager',
                            contentClassName: 'widget-manager-inner-container',
                            enableClose: false
                        }
                    ],
                    enableDrag: false,
                    enableDrop: false,
                    enableTabStrip: false
                },
                {
                    type: 'tabset',
                    id: 'bottom_tabset',
                    enableDeleteWhenEmpty: false,
                    weight: 50,
                    minHeight: 0,
                    selected: 0,
                    children: widgetsBottom
                }
            ]
        },
        borders: [
            {
                type: 'border',
                location: 'left',
                size: 315,
                selected: getWidgetIndex(activePerspective === null || activePerspective === void 0 ? void 0 : activePerspective.widgetsLeft, activePerspective === null || activePerspective === void 0 ? void 0 : activePerspective.expandedLeft),
                children: widgetsLeft
            },
            {
                type: 'border',
                location: 'right',
                size: 315,
                selected: getWidgetIndex(activePerspective === null || activePerspective === void 0 ? void 0 : activePerspective.widgetsRight, activePerspective === null || activePerspective === void 0 ? void 0 : activePerspective.expandedRight),
                children: widgetsRight
            }
        ]
    };
};
const getWidgetsLeft = (activePerspective, usedIds)=>{
    if (activePerspective === null) {
        return [];
    }
    return widgetsToModelJson(activePerspective.widgetsLeft, usedIds);
};
const getWidgetsRight = (activePerspective, usedIds)=>{
    if (activePerspective === null) {
        return [];
    }
    return widgetsToModelJson(activePerspective.widgetsRight, usedIds);
};
const getWidgetsBottom = (activePerspective, usedIds)=>{
    if (activePerspective === null) {
        return [];
    }
    return widgetsToModelJson(activePerspective.widgetsBottom, usedIds);
};
const getWidgetIndex = (widgets, widgetId)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNil)(widgets) || (0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNil)(widgetId)) {
        return undefined;
    }
    return widgets.findIndex((widget)=>widget.id === widgetId);
};
const widgetsToModelJson = (widgets, usedIds)=>{
    const result = [];
    widgets === null || widgets === void 0 ? void 0 : widgets.forEach((widget)=>{
        // skip document trees until we have a documents implementation
        if (widget.widgetType === 'element_tree' && 'elementType' in widget && widget.elementType === 'document') {
            return;
        }
        let widgetId = widget.id;
        while(usedIds.has(widgetId)){
            widgetId = `${(0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_2__.uuid)()}_${widget.id}`;
        }
        usedIds.add(widgetId);
        result.push({
            id: widgetId,
            type: 'tab',
            name: widget.name,
            component: widget.widgetType,
            enableClose: false,
            config: {
                ...widget,
                id: widgetId
            }
        });
    });
    return result;
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
"./js/src/core/modules/widget-manager/widget-manager-slice.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  closeWidget: () => (closeWidget),
  initialState: () => (initialState),
  openBottomWidget: () => (openBottomWidget),
  openLeftWidget: () => (openLeftWidget),
  openMainWidget: () => (openMainWidget),
  openRightWidget: () => (openRightWidget),
  selectInnerModel: () => (selectInnerModel),
  selectMainWidgetContext: () => (selectMainWidgetContext),
  selectOuterModel: () => (selectOuterModel),
  setActiveWidgetById: () => (setActiveWidgetById),
  slice: () => (slice),
  updateInnerModel: () => (updateInnerModel),
  updateMainWidgetContext: () => (updateMainWidgetContext),
  updateOuterModel: () => (updateOuterModel),
  widgetManagerSliceName: () => (widgetManagerSliceName)
});
/* ESM import */var _Pimcore_app_store_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/flexlayout-react/lib/index.js");
/* ESM import */var flexlayout_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flexlayout_react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _utils_widget_manager_outer_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/widget-manager/utils/widget-manager-outer-model.tsx");
/* ESM import */var _utils_widget_manager_inner_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/widget-manager/utils/widget-manager-inner-model.tsx");
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




const initialState = {
    outerModel: (0,_utils_widget_manager_outer_model__WEBPACK_IMPORTED_MODULE_2__.getInitialModelJson)(),
    innerModel: (0,_utils_widget_manager_inner_model__WEBPACK_IMPORTED_MODULE_3__.getInitialModelJson)(),
    mainWidgetContext: null
};
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_4__.createSlice)({
    name: 'widget-manager',
    initialState,
    reducers: {
        updateOuterModel: (state, action)=>{
            state.outerModel = {
                ...action.payload
            };
        },
        updateInnerModel: (state, action)=>{
            state.innerModel = {
                ...action.payload
            };
        },
        updateMainWidgetContext: (state, action)=>{
            state.mainWidgetContext = action.payload;
        },
        setActiveWidgetById: (state, action)=>{
            const outerModel = flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Model.fromJson(state.outerModel);
            const innerModel = flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Model.fromJson(state.innerModel);
            let node = outerModel.getNodeById(action.payload);
            let model = outerModel;
            let isOuterModelNode = true;
            if (node === undefined) {
                node = innerModel.getNodeById(action.payload);
                model = innerModel;
                isOuterModelNode = false;
            }
            if (node !== undefined) {
                const parent = node.getParent();
                if (parent !== undefined && (parent instanceof flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.BorderNode && parent.getSelectedNode() !== node || !(parent instanceof flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.BorderNode))) {
                    model.doAction(flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Actions.selectTab(node.getId()));
                }
            }
            if (isOuterModelNode) {
                state.outerModel = {
                    ...model.toJson()
                };
            } else {
                state.innerModel = {
                    ...model.toJson()
                };
            }
        },
        openMainWidget: (state, action)=>{
            const model = flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Model.fromJson(state.innerModel);
            let node;
            if (action.payload.id !== undefined) {
                node = model.getNodeById(action.payload.id);
            }
            if (node !== undefined) {
                model.doAction(flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Actions.selectTab(node.getId()));
            } else {
                model.doAction(flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Actions.addNode(action.payload, 'main_tabset', flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.DockLocation.CENTER, -1, true));
            }
            state.innerModel = {
                ...model.toJson()
            };
        },
        openBottomWidget: (state, action)=>{
            const model = flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Model.fromJson(state.outerModel);
            let node;
            if (action.payload.id !== undefined) {
                node = model.getNodeById(action.payload.id);
            }
            if (node !== undefined) {
                model.doAction(flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Actions.selectTab(node.getId()));
            } else {
                model.doAction(flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Actions.addNode(action.payload, 'bottom_tabset', flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.DockLocation.CENTER, -1, true));
            }
            state.outerModel = {
                ...model.toJson()
            };
        },
        openLeftWidget: (state, action)=>{
            const model = flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Model.fromJson(state.outerModel);
            let node;
            if (action.payload.id !== undefined) {
                node = model.getNodeById(action.payload.id);
            }
            if (node !== undefined) {
                model.doAction(flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Actions.selectTab(node.getId()));
            } else {
                model.doAction(flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Actions.addNode(action.payload, 'border_left', flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.DockLocation.CENTER, -1, true));
            }
            state.outerModel = {
                ...model.toJson()
            };
        },
        openRightWidget: (state, action)=>{
            const model = flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Model.fromJson(state.outerModel);
            let node;
            if (action.payload.id !== undefined) {
                node = model.getNodeById(action.payload.id);
            }
            if (node !== undefined) {
                model.doAction(flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Actions.selectTab(node.getId()));
            } else {
                model.doAction(flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Actions.addNode(action.payload, 'border_right', flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.DockLocation.CENTER, -1, true));
            }
            state.outerModel = {
                ...model.toJson()
            };
        },
        closeWidget: (state, action)=>{
            const outerModel = flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Model.fromJson(state.outerModel);
            const innerModel = flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Model.fromJson(state.innerModel);
            let node = outerModel.getNodeById(action.payload);
            let model = outerModel;
            let isOuterModelNode = true;
            if (node === undefined) {
                node = innerModel.getNodeById(action.payload);
                model = innerModel;
                isOuterModelNode = false;
            }
            if (node !== undefined) {
                model.doAction(flexlayout_react__WEBPACK_IMPORTED_MODULE_1__.Actions.deleteTab(node.getId()));
            }
            if (isOuterModelNode) {
                state.outerModel = {
                    ...model.toJson()
                };
            } else {
                state.innerModel = {
                    ...model.toJson()
                };
            }
        }
    },
    selectors: {
        selectOuterModel: (state)=>{
            return state.outerModel;
        },
        selectInnerModel: (state)=>{
            return state.innerModel;
        },
        selectMainWidgetContext: (state)=>{
            return state.mainWidgetContext;
        }
    }
});
const widgetManagerSliceName = slice.name;
(0,_Pimcore_app_store_index__WEBPACK_IMPORTED_MODULE_0__.injectSliceWithState)(slice);
const { updateOuterModel, updateMainWidgetContext, updateInnerModel, openMainWidget, openBottomWidget, openLeftWidget, openRightWidget, setActiveWidgetById, closeWidget } = slice.actions;
const { selectInnerModel, selectOuterModel, selectMainWidgetContext } = slice.selectors;

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
"./js/src/core/utils/uuid.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  uuid: () => (uuid)
});
/* ESM import */var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js");
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
function uuid() {
    return (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
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
//# sourceMappingURL=js_src_core_modules_widget-manager_hooks_use-widget-manager_ts.js.map