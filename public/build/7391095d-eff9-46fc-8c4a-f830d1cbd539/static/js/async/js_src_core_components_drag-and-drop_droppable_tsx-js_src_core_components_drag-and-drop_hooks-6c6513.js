"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_components_drag-and-drop_droppable_tsx-js_src_core_components_drag-and-drop_hooks-6c6513"], {
"./js/src/core/components/drag-and-drop/callback-registry.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CallbackRegistry: () => (CallbackRegistry)
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
*/ class CallbackRegistry {
    register(key, callback) {
        this.callbacks[key] = callback;
    }
    unregister(key) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete this.callbacks[key];
    }
    get(key) {
        return this.callbacks[key];
    }
    getCallbacks() {
        return this.callbacks;
    }
    constructor(){
        this.callbacks = {};
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
"./js/src/core/components/drag-and-drop/collision-detection/boundingRectIntersection.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  boundingRectIntersection: () => (boundingRectIntersection),
  transformBoundingRectToCoordinates: () => (transformBoundingRectToCoordinates)
});
/* ESM import */var _dnd_kit_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@dnd-kit/core/dist/core.esm.js");
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
const transformBoundingRectToCoordinates = (rect)=>{
    return {
        x1: rect.left,
        x2: rect.right,
        y1: rect.top,
        y2: rect.bottom
    };
};
const boundingRectIntersection = (props)=>{
    const pointerCollisions = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_0__.pointerWithin)(props);
    if (pointerCollisions.length > 0) {
        return pointerCollisions;
    }
    const { droppableContainers } = props;
    const activeEl = document.querySelector('.dnd-overlay');
    const collisions = [];
    const draggableRect = activeEl === null || activeEl === void 0 ? void 0 : activeEl.getBoundingClientRect();
    if (draggableRect === undefined) {
        return [];
    }
    const draggableRectCoordinates = transformBoundingRectToCoordinates(draggableRect);
    for (const container of droppableContainers){
        if (container.node.current === null) {
            continue;
        }
        const droppableRect = container.node.current.getBoundingClientRect();
        if (droppableRect.width === 0) {
            continue;
        }
        const droppableRectCoordinates = transformBoundingRectToCoordinates(droppableRect);
        const intersectX1 = Math.max(draggableRectCoordinates.x1, droppableRectCoordinates.x1);
        const intersectX2 = Math.min(draggableRectCoordinates.x2, droppableRectCoordinates.x2);
        const intersectY1 = Math.max(draggableRectCoordinates.y1, droppableRectCoordinates.y1);
        const intersectY2 = Math.min(draggableRectCoordinates.y2, droppableRectCoordinates.y2);
        if (intersectX1 < intersectX2 && intersectY1 < intersectY2) {
            collisions.push({
                id: container.id,
                data: container.data,
                ratio: getIntersectionRatio(draggableRect, droppableRect)
            });
        }
    }
    return collisions.sort((a, b)=>b.ratio - a.ratio);
};
const getIntersectionRatio = (rect1, rect2)=>{
    const x1 = Math.max(rect1.left, rect2.left);
    const y1 = Math.max(rect1.top, rect2.top);
    const x2 = Math.min(rect1.right, rect2.right);
    const y2 = Math.min(rect1.bottom, rect2.bottom);
    const intersectionWidth = Math.max(0, x2 - x1);
    const intersectionHeight = Math.max(0, y2 - y1);
    const intersectionArea = intersectionWidth * intersectionHeight;
    const rect1Area = rect1.width * rect1.height;
    const rect2Area = rect2.width * rect2.height;
    const unionArea = rect1Area + rect2Area - intersectionArea;
    return intersectionArea / unionArea;
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
"./js/src/core/components/drag-and-drop/context-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DragAndDropContextProvider: () => (DragAndDropContextProvider),
  DragAndDropInfoContext: () => (DragAndDropInfoContext)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@dnd-kit/core/dist/core.esm.js");
/* ESM import */var _callback_registry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/drag-and-drop/callback-registry.tsx");
/* ESM import */var _drag_overlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/drag-and-drop/drag-overlay.tsx");
/* ESM import */var _collision_detection_boundingRectIntersection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/drag-and-drop/collision-detection/boundingRectIntersection.ts");
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





const defaultInfo = {
    type: 'unknown',
    data: null,
    title: '',
    icon: 'widget'
};
const DragAndDropInfoContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    ...defaultInfo,
    setInfo: (info)=>{},
    getInfo: ()=>defaultInfo,
    removeInfo: ()=>{}
});
const DragAndDropContextProvider = (param)=>{
    let { children } = param;
    _s();
    const [info, setInfo] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(defaultInfo);
    const callbackRegistry = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(new _callback_registry__WEBPACK_IMPORTED_MODULE_3__.CallbackRegistry());
    const isSortableInfo = Object.keys(info).includes('sortable');
    const collisionDetection = isSortableInfo ? _dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.closestCorners : _collision_detection_boundingRectIntersection__WEBPACK_IMPORTED_MODULE_5__.boundingRectIntersection;
    const mouseSensor = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.useSensor)(_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.MouseSensor, {
        activationConstraint: {
            distance: 5
        }
    });
    const touchSensor = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.useSensor)(_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.TouchSensor, {
        activationConstraint: {
            distance: 5
        }
    });
    const sensors = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.useSensors)(mouseSensor, touchSensor);
    function setContext(info) {
        setInfo(info);
        document.body.classList.add('dnd--dragging');
    }
    function removeContext() {
        setInfo(defaultInfo);
        document.body.classList.remove('dnd--dragging');
    }
    function getContext() {
        return info;
    }
    function onDragStart(event) {
        const data = event.active.data.current;
        setContext(data);
    }
    function onDragCancel() {
        removeContext();
    }
    function onDragEnd(event) {
        // @ts-expect-error - TS doesn't like the type of the event
        Object.entries(callbackRegistry.current.getCallbacks()).forEach((callback)=>{
            callback[1](event);
        });
        removeContext();
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.DndContext, {
            autoScroll: false,
            collisionDetection: collisionDetection,
            onDragCancel: onDragCancel,
            onDragEnd: onDragEnd,
            onDragStart: onDragStart,
            sensors: sensors,
            children: [
                info.sortable === undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.DragOverlay, {
                    className: "dnd-overlay",
                    dropAnimation: null,
                    style: {
                        width: 'max-content',
                        zIndex: 1001
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_drag_overlay__WEBPACK_IMPORTED_MODULE_4__.DragOverlay, {
                        info: info
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/drag-and-drop/context-provider.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/drag-and-drop/context-provider.tsx",
                    lineNumber: 97,
                    columnNumber: 7
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(DragAndDropInfoContext.Provider, {
                    value: {
                        type: info.type,
                        data: info.data,
                        icon: info.icon,
                        title: info.title,
                        setInfo: setContext,
                        removeInfo: removeContext,
                        getInfo: getContext,
                        callbackRegistry
                    },
                    children: children
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/drag-and-drop/context-provider.tsx",
                    lineNumber: 106,
                    columnNumber: 7
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/drag-and-drop/context-provider.tsx",
            lineNumber: 88,
            columnNumber: 5
        }, undefined), [
        info,
        children,
        collisionDetection
    ]);
};
_s(DragAndDropContextProvider, "psTboEqRTWpc2/Z9Bmm+kLM5NDg=", false, function() {
    return [
        _dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.useSensor,
        _dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.useSensor,
        _dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.useSensors
    ];
});
_c = DragAndDropContextProvider;
var _c;
$RefreshReg$(_c, "DragAndDropContextProvider");

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
"./js/src/core/components/drag-and-drop/drag-overlay.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
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
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { css } = param;
    return {
        dragOverlay: css`
      display: inline-flex;
      gap: 5px;
      align-items: center;
      padding: 5px;
      width: max-content;
      background: white;
      box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
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
"./js/src/core/components/drag-and-drop/drag-overlay.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DragOverlay: () => (DragOverlay)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _icon_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _drag_overlay_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/drag-and-drop/drag-overlay.styles.ts");
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



const DragOverlay = (props)=>{
    _s();
    const { styles } = (0,_drag_overlay_styles__WEBPACK_IMPORTED_MODULE_3__.useStyle)();
    const ref = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(null);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: [
            'dnd__overlay',
            styles.dragOverlay
        ].join(' '),
        ref: ref,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icon_icon__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                value: props.info.icon
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/drag-and-drop/drag-overlay.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, undefined),
            " ",
            props.info.title
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/drag-and-drop/drag-overlay.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, undefined);
};
_s(DragOverlay, "yNQBEEIPNwu/edJP48Me5v/D3ls=", false, function() {
    return [
        _drag_overlay_styles__WEBPACK_IMPORTED_MODULE_3__.useStyle
    ];
});
_c = DragOverlay;
var _c;
$RefreshReg$(_c, "DragOverlay");

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
"./js/src/core/components/drag-and-drop/droppable-context-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DroppableContextProvider: () => (DroppableContextProvider),
  droppableContext: () => (droppableContext)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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
const droppableContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
    isOver: false,
    isValid: false,
    isDragActive: false
});
const DroppableContextProvider = droppableContext.Provider;

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
"./js/src/core/components/drag-and-drop/droppable.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Droppable: () => (Droppable)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _context_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/drag-and-drop/context-provider.tsx");
/* ESM import */var _dnd_kit_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@dnd-kit/core/dist/core.esm.js");
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* ESM import */var _Pimcore_components_drag_and_drop_droppable_base_droppable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/drag-and-drop/droppable/base-droppable.tsx");
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





const Droppable = (props)=>{
    _s();
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_provider__WEBPACK_IMPORTED_MODULE_2__.DragAndDropInfoContext);
    const [isValidContext, setIsValidContext] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [id] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_4__.uuid)());
    let isValidData = true;
    const info = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>context.getInfo(), [
        context
    ]);
    if (typeof props.isValidData === 'function') {
        isValidData = props.isValidData(info);
    }
    const { isOver, setNodeRef } = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_3__.useDroppable)({
        id,
        disabled: context.getInfo().sortable !== undefined || props.disabled === true
    });
    if (isValidContext && isOver && !isValidData) {
        document.body.classList.add('dnd--invalid');
    } else {
        document.body.classList.remove('dnd--invalid');
    }
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (typeof props.isValidContext !== 'boolean') {
            setIsValidContext(props.isValidContext(info));
        } else {
            setIsValidContext(props.isValidContext);
        }
        context.callbackRegistry.current.register(id, (event)=>{
            if (isValidContext && isValidData && info.sortable !== undefined) {
                var _props_onSort;
                if (event.over === null) {
                    return;
                }
                (_props_onSort = props.onSort) === null || _props_onSort === void 0 ? void 0 : _props_onSort.call(props, info, event.active.id, event.over.id);
                return;
            }
            if (!isValidData || !isValidContext || !isOver) return;
            props.onDrop(info);
        });
        return ()=>{
            context.callbackRegistry.current.unregister(id);
        };
    }, [
        context,
        isOver
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_droppable_base_droppable__WEBPACK_IMPORTED_MODULE_5__.BaseDroppable, {
        className: props.className,
        isOver: isOver,
        isValidContext: isValidContext,
        isValidData: isValidData,
        setNodeRef: setNodeRef,
        shape: props.shape,
        variant: props.variant,
        children: props.children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/drag-and-drop/droppable.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, undefined);
};
_s(Droppable, "HjidjwGjOQHPlYBVt5Njpisq3PM=", false, function() {
    return [
        _dnd_kit_core__WEBPACK_IMPORTED_MODULE_3__.useDroppable
    ];
});
_c = Droppable;
var _c;
$RefreshReg$(_c, "Droppable");

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
"./js/src/core/components/drag-and-drop/droppable/base-droppable.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
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
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        default: css`
      & .dnd--drag-active {
        background: ${token.colorBgContainerDisabled};
        border: 1px dashed ${token.colorBorder};
      }
      
      & .dnd--drag-valid {
        background: ${token.colorBgTextActive};
        border: 1px dashed ${token.colorInfoBorderHover};
      }

      & .dnd--drag-error {
        background: ${token.colorErrorBg};
        border: 1px dashed ${token.colorErrorActive};
      }
    `,
        outline: css`
      & .dnd--drag-valid {
        outline: 1px dashed ${token.colorInfoBorderHover} !important;
      }

      & .dnd--drag-error {
        outline: 1px dashed ${token.colorErrorActive} !important;
      }
    `,
        round: css`
      & .dnd--drag-active, & .dnd--drag-valid, & .dnd--drag-error {
        border-radius: ${token.borderRadius}px;
      }
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
"./js/src/core/components/drag-and-drop/droppable/base-droppable.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BaseDroppable: () => (BaseDroppable)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_drag_and_drop_droppable_context_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/drag-and-drop/droppable-context-provider.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _base_droppable_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/drag-and-drop/droppable/base-droppable.styles.ts");
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/utils/uuid.ts");
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






const BaseDroppable = (param)=>{
    let { children, className, variant, shape, isValidContext, isValidData, isOver, setNodeRef } = param;
    _s();
    const { styles } = (0,_base_droppable_styles__WEBPACK_IMPORTED_MODULE_5__.useStyle)();
    const [id] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_6__.uuid)());
    const Child = react__WEBPACK_IMPORTED_MODULE_1__.Children.only(children);
    if (!/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.isValidElement)(Child)) {
        (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_4__.GeneralError('Children must be a valid react component'));
        return null;
    }
    const Component = Child.type;
    if ('ref' in Child && Child.ref !== null) {
        const ref = Child.ref;
        setNodeRef(ref.current);
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, styles[variant ?? 'default'], shape !== 'angular' ? styles.round : undefined),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_droppable_context_provider__WEBPACK_IMPORTED_MODULE_3__.DroppableContextProvider, {
                value: {
                    isDragActive: isValidContext,
                    isOver: isOver && isValidContext,
                    isValid: isValidData && isValidContext
                },
                children: /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(Component, {
                    ...Child.props,
                    key: id,
                    ref: 'ref' in Child && Child.ref !== null ? Child.ref : setNodeRef,
                    __source: {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/drag-and-drop/droppable/base-droppable.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    },
                    __self: undefined
                })
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/drag-and-drop/droppable/base-droppable.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/drag-and-drop/droppable/base-droppable.tsx",
            lineNumber: 51,
            columnNumber: 5
        }, undefined), [
        isOver,
        children,
        isValidContext,
        isValidData
    ]);
};
_s(BaseDroppable, "2GOVXzwf3vtsUYuJKQWd1bomOjw=", false, function() {
    return [
        _base_droppable_styles__WEBPACK_IMPORTED_MODULE_5__.useStyle
    ];
});
_c = BaseDroppable;
var _c;
$RefreshReg$(_c, "BaseDroppable");

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
"./js/src/core/components/drag-and-drop/hooks/use-droppable.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDroppable: () => (useDroppable)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _droppable_context_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/drag-and-drop/droppable-context-provider.tsx");
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


const useDroppable = ()=>{
    _s();
    const { isDragActive, isOver, isValid } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_droppable_context_provider__WEBPACK_IMPORTED_MODULE_1__.droppableContext);
    function getStateClasses() {
        const cssClasses = [];
        if (isDragActive) {
            cssClasses.push('dnd--drag-active');
        }
        if (isOver && isValid) {
            cssClasses.push('dnd--drag-valid');
        }
        if (isOver && !isValid) {
            cssClasses.push('dnd--drag-error');
        }
        return cssClasses;
    }
    return {
        isDragActive,
        isOver,
        isValid,
        getStateClasses
    };
};
_s(useDroppable, "NePiyuVX7oNQhPyQVMpkU3XXWig=");

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
"./js/src/core/modules/element/utils/element-type.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  allElementTypes: () => (allElementTypes),
  isValidElementType: () => (isValidElementType),
  mapToElementType: () => (mapToElementType)
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
*/ const isValidElementType = (type)=>{
    return allElementTypes.includes(type);
};
const allElementTypes = [
    'asset',
    'document',
    'data-object'
];
const mapToElementType = (elementType)=>{
    switch(elementType){
        case 'asset':
            return 'asset';
        case 'document':
            return 'document';
        case 'data-object':
        case 'object':
        case 'dataObject':
            return 'data-object';
        default:
            return null;
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

}]);
//# sourceMappingURL=js_src_core_components_drag-and-drop_droppable_tsx-js_src_core_components_drag-and-drop_hooks-6c6513.js.map