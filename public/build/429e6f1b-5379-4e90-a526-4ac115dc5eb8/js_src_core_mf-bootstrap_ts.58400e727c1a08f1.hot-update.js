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
self["webpackHotUpdatepimcore_studio_ui_bundle_core"]("js_src_core_mf-bootstrap_ts", {
"./js/src/core/app/api/pimcore/tags.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  invalidatingTags: () => (invalidatingTags),
  providingTags: () => (providingTags),
  tagNames: () => (tagNames)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ const tagNames = {
    ELEMENT: 'ELEMENT',
    ASSET: 'ASSET',
    ASSET_DETAIL: 'ASSET_DETAIL',
    ASSET_TREE: 'ASSET_TREE',
    ASSET_GRID_CONFIGURATION: 'ASSET_GRID_CONFIGURATION',
    ASSET_GRID: 'ASSET_GRID',
    ASSET_GRID_CONFIGURATION_LIST: 'ASSET_GRID_CONFIGURATION_LIST',
    ASSET_GRID_CONFIGURATION_DETAIL: 'ASSET_GRID_CONFIGURATION_DETAIL',
    DATA_OBJECT: 'DATA_OBJECT',
    DATA_OBJECT_DETAIL: 'DATA_OBJECT_DETAIL',
    DATA_OBJECT_TREE: 'DATA_OBJECT_TREE',
    DATA_OBJECT_GRID: 'DATA_OBJECT_GRID',
    DOCUMENT: 'DOCUMENT',
    DOCUMENT_DETAIL: 'DOCUMENT_DETAIL',
    DOCUMENT_TREE: 'DOCUMENT_TREE',
    WORKFLOW: 'WORKFLOW',
    VERSIONS: 'VERSION',
    PROPERTIES: 'PROPERTIES',
    SCHEDULES: 'SCHEDULES',
    DEPENDENCIES: 'DEPENDENCIES',
    NOTES_AND_EVENTS: 'NOTES_AND_EVENTS',
    AVAILABLE_TAGS: 'AVAILABLE_TAGS',
    ELEMENT_TAGS: 'TAGS',
    ROLE: 'ROLE',
    PREDEFINED_ASSET_METADATA: 'PREDEFINED_ASSET_METADATA',
    CURRENT_USER_INFORMATION: 'CURRENT_USER_INFORMATION'
};
const providingTags = {
    ELEMENT: ()=>[
            tagNames.ELEMENT
        ],
    ASSET: ()=>[
            tagNames.ASSET
        ],
    ASSET_DETAIL: ()=>[
            tagNames.ASSET,
            tagNames.ASSET_DETAIL
        ],
    ASSET_DETAIL_ID: (id)=>[
            tagNames.ASSET,
            {
                type: tagNames.ASSET_DETAIL,
                id
            }
        ],
    ASSET_TREE: ()=>[
            tagNames.ASSET,
            tagNames.ASSET_TREE
        ],
    ASSET_TREE_ID: (id)=>[
            tagNames.ASSET,
            {
                type: tagNames.ASSET_TREE,
                id
            }
        ],
    ASSET_GRID_CONFIGURATION: ()=>[
            tagNames.ASSET_GRID_CONFIGURATION
        ],
    ASSET_GRID_CONFIGURATION_LIST: ()=>[
            tagNames.ASSET,
            tagNames.ASSET_GRID_CONFIGURATION,
            {
                type: tagNames.ASSET_GRID_CONFIGURATION_LIST
            }
        ],
    ASSET_GRID_CONFIGURATION_DETAIL: (configurationId)=>[
            tagNames.ASSET,
            {
                type: tagNames.ASSET_DETAIL
            },
            tagNames.ASSET_GRID_CONFIGURATION,
            {
                type: tagNames.ASSET_GRID_CONFIGURATION_DETAIL,
                id: configurationId
            }
        ],
    ASSET_GRID_ID: (id)=>[
            tagNames.ASSET,
            {
                type: tagNames.ASSET_GRID,
                id
            }
        ],
    DATA_OBJECT_DETAIL: ()=>[
            tagNames.DATA_OBJECT,
            tagNames.DATA_OBJECT_DETAIL
        ],
    DATA_OBJECT_DETAIL_ID: (id)=>[
            tagNames.DATA_OBJECT,
            {
                type: tagNames.DATA_OBJECT_DETAIL,
                id
            }
        ],
    DATA_OBJECT_TREE: ()=>[
            tagNames.DATA_OBJECT,
            tagNames.DATA_OBJECT_TREE
        ],
    DATA_OBJECT_TREE_ID: (id)=>[
            tagNames.DATA_OBJECT,
            {
                type: tagNames.DATA_OBJECT_TREE,
                id
            }
        ],
    DATA_OBJECT_GRID_ID: (id)=>[
            tagNames.DATA_OBJECT,
            {
                type: tagNames.DATA_OBJECT_GRID,
                id
            }
        ],
    DOCUMENT_DETAIL: ()=>[
            tagNames.DOCUMENT,
            tagNames.DOCUMENT_DETAIL
        ],
    DOCUMENT_DETAIL_ID: (id)=>[
            tagNames.DOCUMENT,
            {
                type: tagNames.DOCUMENT_DETAIL,
                id
            }
        ],
    DOCUMENT_TREE: ()=>[
            tagNames.DOCUMENT,
            tagNames.DOCUMENT_TREE
        ],
    DOCUMENT_TREE_ID: (id)=>[
            tagNames.DOCUMENT,
            {
                type: tagNames.DOCUMENT_TREE,
                id
            }
        ],
    ELEMENT_DEPENDENCIES: (elementType, id)=>[
            getElementDetailTag(elementType, id),
            getElementSpecificTag(tagNames.DEPENDENCIES, elementType, id)
        ],
    ELEMENT_WORKFLOW: (elementType, id)=>[
            getElementDetailTag(elementType, id),
            getElementSpecificTag(tagNames.WORKFLOW, elementType, id)
        ],
    PROPERTY_DETAIL: (id)=>[
            {
                type: tagNames.PROPERTIES,
                id
            }
        ],
    ELEMENT_PROPERTIES: (elementType, id)=>[
            getElementDetailTag(elementType, id),
            getElementSpecificTag(tagNames.PROPERTIES, elementType, id)
        ],
    SCHEDULE_DETAIL: (id)=>[
            {
                type: tagNames.SCHEDULES,
                id
            },
            tagNames.SCHEDULES
        ],
    ELEMENT_SCHEDULES: (elementType, id)=>[
            getElementDetailTag(elementType, id),
            getElementSpecificTag(tagNames.SCHEDULES, elementType, id)
        ],
    VERSIONS_DETAIL: (id)=>[
            {
                type: tagNames.VERSIONS,
                id
            }
        ],
    ELEMENT_VERSIONS: (elementType, id)=>[
            getElementDetailTag(elementType, id),
            getElementSpecificTag(tagNames.VERSIONS, elementType, id)
        ],
    NOTES_AND_EVENTS_DETAIL: (id)=>[
            {
                type: tagNames.NOTES_AND_EVENTS,
                id
            }
        ],
    ELEMENT_NOTES_AND_EVENTS: (elementType, id)=>[
            getElementDetailTag(elementType, id),
            getElementSpecificTag(tagNames.NOTES_AND_EVENTS, elementType, id)
        ],
    AVAILABLE_TAGS: ()=>[
            tagNames.AVAILABLE_TAGS
        ],
    ELEMENT_TAGS: (elementType, id)=>[
            getElementDetailTag(elementType, id),
            getElementSpecificTag(tagNames.ELEMENT_TAGS, elementType, id)
        ],
    ROLE: ()=>[
            tagNames.ROLE
        ],
    PREDEFINED_ASSET_METADATA: ()=>[
            tagNames.PREDEFINED_ASSET_METADATA
        ],
    CURRENT_USER_INFORMATION: ()=>[
            tagNames.CURRENT_USER_INFORMATION
        ]
};
const invalidatingTags = {
    ELEMENT: ()=>[
            tagNames.ELEMENT
        ],
    ASSET: ()=>[
            tagNames.ASSET
        ],
    ASSET_DETAIL: ()=>[
            tagNames.ASSET_DETAIL
        ],
    ASSET_DETAIL_ID: (id)=>[
            {
                type: tagNames.ASSET_DETAIL,
                id
            },
            elementUnspecificDataTag
        ],
    ASSET_TREE: ()=>[
            tagNames.ASSET_TREE
        ],
    ASSET_TREE_ID: (id)=>[
            {
                type: tagNames.ASSET_TREE,
                id
            }
        ],
    ASSET_GRID_CONFIGURATION: ()=>[
            tagNames.ASSET_GRID_CONFIGURATION
        ],
    ASSET_GRID_CONFIGURATION_DETAIL: (configurationId)=>[
            {
                type: tagNames.ASSET_GRID_CONFIGURATION_DETAIL,
                id: configurationId
            },
            {
                type: tagNames.ASSET_GRID_CONFIGURATION_DETAIL,
                id: configurationId
            }
        ],
    ASSET_GRID_CONFIGURATION_LIST: ()=>[
            {
                type: tagNames.ASSET_GRID_CONFIGURATION_LIST
            }
        ],
    ASSET_GRID_ID: (id)=>[
            {
                type: tagNames.ASSET_GRID,
                id
            }
        ],
    DATA_OBJECT: ()=>[
            tagNames.DATA_OBJECT
        ],
    DATA_OBJECT_DETAIL: ()=>[
            tagNames.DATA_OBJECT_DETAIL
        ],
    DATA_OBJECT_DETAIL_ID: (id)=>[
            {
                type: tagNames.DATA_OBJECT_DETAIL,
                id
            },
            elementUnspecificDataTag
        ],
    DATA_OBJECT_TREE: ()=>[
            tagNames.DATA_OBJECT_TREE
        ],
    DATA_OBJECT_TREE_ID: (id)=>[
            {
                type: tagNames.DATA_OBJECT_TREE,
                id
            }
        ],
    DATA_OBJECT_GRID_ID: (id)=>[
            {
                type: tagNames.DATA_OBJECT_GRID,
                id
            }
        ],
    DOCUMENT: ()=>[
            tagNames.DOCUMENT
        ],
    DOCUMENT_DETAIL: ()=>[
            tagNames.DOCUMENT_DETAIL
        ],
    DOCUMENT_DETAIL_ID: (id)=>[
            {
                type: tagNames.DOCUMENT_DETAIL,
                id
            },
            elementUnspecificDataTag
        ],
    DOCUMENT_TREE: ()=>[
            tagNames.DOCUMENT_TREE
        ],
    DOCUMENT_TREE_ID: (id)=>[
            {
                type: tagNames.DOCUMENT_TREE,
                id
            }
        ],
    ELEMENT_DEPENDENCIES: (elementType, id)=>[
            getElementSpecificTag(tagNames.DEPENDENCIES, elementType, id)
        ],
    ELEMENT_WORKFLOW: (elementType, id)=>[
            getElementSpecificTag(tagNames.WORKFLOW, elementType, id)
        ],
    PROPERTY_DETAIL: (id)=>[
            {
                type: tagNames.PROPERTIES,
                id
            }
        ],
    ELEMENT_PROPERTIES: (elementType, id)=>[
            getElementSpecificTag(tagNames.PROPERTIES, elementType, id)
        ],
    SCHEDULE_DETAIL: (id)=>[
            {
                type: tagNames.SCHEDULES,
                id
            }
        ],
    ELEMENT_SCHEDULES: (elementType, id)=>[
            getElementSpecificTag(tagNames.SCHEDULES, elementType, id)
        ],
    VERSIONS_DETAIL: (id)=>[
            {
                type: tagNames.VERSIONS,
                id
            }
        ],
    ELEMENT_VERSIONS: (elementType, id)=>[
            getElementSpecificTag(tagNames.VERSIONS, elementType, id)
        ],
    NOTES_AND_EVENTS_DETAIL: (id)=>[
            {
                type: tagNames.NOTES_AND_EVENTS,
                id
            }
        ],
    ELEMENT_NOTES_AND_EVENTS: (elementType, id)=>[
            getElementSpecificTag(tagNames.NOTES_AND_EVENTS, elementType, id)
        ],
    AVAILABLE_TAGS: ()=>[
            tagNames.AVAILABLE_TAGS
        ],
    ELEMENT_TAGS: (elementType, id)=>[
            getElementSpecificTag(tagNames.ELEMENT_TAGS, elementType, id)
        ],
    ROLE: ()=>[
            tagNames.ROLE
        ],
    PREDEFINED_ASSET_METADATA: ()=>[
            tagNames.PREDEFINED_ASSET_METADATA
        ],
    ELEMENT_DETAIL: (elementType, id)=>[
            getElementDetailTag(elementType, id)
        ]
};
const elementUnspecificDataTag = tagNames.AVAILABLE_TAGS;
const getElementSpecificTag = (tagType, elementType, id)=>({
        type: tagType,
        id,
        elementType
    });
const getElementDetailTag = (elementType, id)=>{
    switch(elementType){
        case 'asset':
            return {
                type: tagNames.ASSET_DETAIL,
                id
            };
        case 'data-object':
            return {
                type: tagNames.DATA_OBJECT_DETAIL,
                id
            };
        case 'document':
            return {
                type: tagNames.DATA_OBJECT_DETAIL,
                id
            };
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
"./js/src/core/app/store/middleware/rtkQueryErrorLogger.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  rtkQueryErrorLogger: () => (rtkQueryErrorLogger)
});
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
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
// Cannot use directly from the slice
// Middleware doesn't have direct access to the state management logic defined in slices
const initialState = {
    id: 0,
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    permissions: [],
    isAdmin: false,
    classes: [],
    docTypes: [],
    language: 'en',
    activePerspective: 0,
    perspectives: [],
    dateTimeLocale: '',
    welcomeScreen: false,
    memorizeTabs: false,
    hasImage: false,
    contentLanguages: [],
    keyBindings: []
};
const rtkQueryErrorLogger = (api)=>(next)=>(action)=>{
            // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
            if ((0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.isRejectedWithValue)(action)) {
                var _action_meta;
                const payload = action.payload;
                const actionMetaArgs = (_action_meta = action.meta) === null || _action_meta === void 0 ? void 0 : _action_meta.arg;
                // Handle the case when the user's session has expired and further requests return a 401 status.
                // @todo - check if we can bind it to another endpoint that is specific to the user session
                if ((payload === null || payload === void 0 ? void 0 : payload.status) === 401) {
                    if ('endpointName' in actionMetaArgs && actionMetaArgs.endpointName === 'userGetCurrentInformation') {
                        return next(action);
                    }
                    api.dispatch({
                        type: 'auth/setUser',
                        payload: initialState
                    });
                    api.dispatch({
                        type: 'authentication/setAuthState',
                        payload: false
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
"./js/src/core/components/dropdown/dropdown-inner.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DropdownInner: () => (DropdownInner)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _item_utils_dropdown_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/dropdown/item/utils/dropdown-item.tsx");
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



const DropdownInner = (param)=>{
    let { selectedKeys, onSelect, menu, menuRef, ...props } = param;
    const { items, ...rest } = menu;
    const renderMenuComponent = ()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Menu, {
            ref: menuRef,
            ...rest,
            children: items === null || items === void 0 ? void 0 : items.map((item)=>(0,_item_utils_dropdown_item__WEBPACK_IMPORTED_MODULE_3__.renderDropdownItem)({
                    item
                }))
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/dropdown-inner.tsx",
            lineNumber: 24,
            columnNumber: 5
        }, undefined);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
        ...props,
        dropdownRender: renderMenuComponent,
        children: props.children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/dropdown-inner.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, undefined);
};
_c = DropdownInner;
var _c;
$RefreshReg$(_c, "DropdownInner");

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
"./js/src/core/components/dropdown/dropdown.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Dropdown: () => (Dropdown)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _dropdown_inner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/dropdown/dropdown-inner.tsx");
/* ESM import */var _selection_selection_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/dropdown/selection/selection-provider.tsx");
/* ESM import */var _dropdown_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.styles.ts");
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




const Dropdown = (param)=>{
    let { selectedKeys, onSelect, menu, ...props } = param;
    _s();
    const { styles } = (0,_dropdown_styles__WEBPACK_IMPORTED_MODULE_4__.useStyle)();
    const { selectable, multiple, items } = menu;
    let selectionType = _selection_selection_provider__WEBPACK_IMPORTED_MODULE_3__.SelectionType.Disabled;
    if (selectable === true) {
        selectionType = multiple === true ? _selection_selection_provider__WEBPACK_IMPORTED_MODULE_3__.SelectionType.Multiple : _selection_selection_provider__WEBPACK_IMPORTED_MODULE_3__.SelectionType.Single;
    }
    const filteredItems = items === null || items === void 0 ? void 0 : items.filter(function filterItems(item) {
        // @ts-expect-error - the prop exists trust me bro ;)
        if ((item === null || item === void 0 ? void 0 : item.hidden) === true) {
            return false;
        }
        // @ts-expect-error - the prop exists trust me bro ;)
        if ((item === null || item === void 0 ? void 0 : item.children) !== undefined) {
            // @ts-expect-error - the prop exists trust me bro ;)
            const filteredChildren = item.children.filter(filterItems);
            // @ts-expect-error - the prop exists trust me bro ;)
            item.children = filteredChildren;
            return filteredChildren.length;
        }
        return true;
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_selection_selection_provider__WEBPACK_IMPORTED_MODULE_3__.SelectionProvider, {
        selectedKeys: selectedKeys,
        selectionType: selectionType,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_dropdown_inner__WEBPACK_IMPORTED_MODULE_2__.DropdownInner, {
            ...props,
            menu: {
                ...menu,
                items: filteredItems
            },
            onSelect: onSelect,
            overlayClassName: [
                props.overlayClassName,
                styles.dropdown
            ].join(' ')
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/dropdown.tsx",
            lineNumber: 91,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/dropdown.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, undefined);
};
_s(Dropdown, "4AcVho8W1Y+Yfard/v4lDs8ZRDQ=", false, function() {
    return [
        _dropdown_styles__WEBPACK_IMPORTED_MODULE_4__.useStyle
    ];
});
_c = Dropdown;
var _c;
$RefreshReg$(_c, "Dropdown");

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
"./js/src/core/components/dropdown/item/types/custom/custom-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CustomItem: () => (CustomItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

const CustomItem = (param)=>{
    let { component } = param;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: component
    }, void 0, false);
};
_c = CustomItem;
var _c;
$RefreshReg$(_c, "CustomItem");

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
"./js/src/core/components/dropdown/item/types/default/default-item.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        dropdownItem: css`
      &.ant-dropdown-menu-item-active {
        background-color: ${token.colorBgContainer} !important;

        &:hover {
          background-color: rgba(0, 0, 0, 0.04) !important;
        }
      }

      &.default-item--with-icon-right {
        padding-right: 4px !important;
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
"./js/src/core/components/dropdown/item/types/default/default-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DefaultItem: () => (DefaultItem),
  WithExtendedApi: () => (WithExtendedApi)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _default_item_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/dropdown/item/types/default/default-item.styles.tsx");
/* ESM import */var _Pimcore_components_dropdown_selection_selection_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/dropdown/selection/selection-button.tsx");
/* ESM import */var _Pimcore_components_dropdown_selection_hooks_use_selection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/dropdown/selection/hooks/use-selection.ts");
/* ESM import */var _Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/spin/spin.tsx");
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






const WithExtendedApi = (Component)=>{
    var _s = $RefreshSig$();
    const DecoratedMenuItem = (param)=>{
        let { label, key, selectable, id, icon, ...props } = param;
        _s();
        const { styles } = (0,_default_item_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
        const { selectionType } = (0,_Pimcore_components_dropdown_selection_hooks_use_selection__WEBPACK_IMPORTED_MODULE_5__.useSelection)();
        const classes = [
            styles.dropdownItem
        ];
        classes.push('is-custom-item');
        if (selectable === true && selectionType !== 'disabled') {
            classes.push('default-item--with-icon-right');
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
            id: key,
            ...props,
            className: classes.join(' '),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                align: "center",
                gap: 8,
                children: [
                    props.isLoading === true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_spin_spin__WEBPACK_IMPORTED_MODULE_6__.Spin, {
                        tip: "Loading",
                        type: "classic"
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/types/default/default-item.tsx",
                        lineNumber: 46,
                        columnNumber: 13
                    }, undefined),
                    icon,
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        children: label
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/types/default/default-item.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, undefined),
                    props.extra !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: props.extra
                    }, void 0, false),
                    selectable === true && selectionType !== 'disabled' && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_selection_selection_button__WEBPACK_IMPORTED_MODULE_4__.SelectionButton, {
                        id: id
                    }, id, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/types/default/default-item.tsx",
                        lineNumber: 61,
                        columnNumber: 13
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/types/default/default-item.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/types/default/default-item.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, undefined);
    };
    _s(DecoratedMenuItem, "myJ6B3t5AftZ5IBoaLy6A8eULqI=", false, function() {
        return [
            _default_item_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles,
            _Pimcore_components_dropdown_selection_hooks_use_selection__WEBPACK_IMPORTED_MODULE_5__.useSelection
        ];
    });
    return DecoratedMenuItem;
};
_c = WithExtendedApi;
const DefaultItem = WithExtendedApi(antd__WEBPACK_IMPORTED_MODULE_2__.Menu.Item);
var _c;
$RefreshReg$(_c, "WithExtendedApi");

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
"./js/src/core/components/dropdown/item/types/divider/divider-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DividerItem: () => (DividerItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
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


const DividerItem = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Menu.Divider, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/types/divider/divider-item.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, undefined);
};
_c = DividerItem;
var _c;
$RefreshReg$(_c, "DividerItem");

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
"./js/src/core/components/dropdown/item/types/group/group-item.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        groupItem: css`
      .ant-dropdown-menu-item-group-list {
        margin: 0 !important;
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
"./js/src/core/components/dropdown/item/types/group/group-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GroupItem: () => (GroupItem),
  WithExtendedApi: () => (WithExtendedApi)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _utils_dropdown_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/dropdown/item/utils/dropdown-item.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _group_item_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/dropdown/item/types/group/group-item.styles.tsx");
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




const WithExtendedApi = (Component)=>{
    var _s = $RefreshSig$();
    const ExtendedMenuItemGroup = (param)=>{
        let { children, label, ...props } = param;
        _s();
        const { styles } = (0,_group_item_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
        return(// @ts-expect-error ref is incompatible due to wrong typing in antd
        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
            title: label,
            ...props,
            className: styles.groupItem,
            children: children === null || children === void 0 ? void 0 : children.map((item)=>(0,_utils_dropdown_item__WEBPACK_IMPORTED_MODULE_2__.renderDropdownItem)({
                    item
                }))
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/types/group/group-item.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, undefined));
    };
    _s(ExtendedMenuItemGroup, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
        return [
            _group_item_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles
        ];
    });
    return ExtendedMenuItemGroup;
};
_c = WithExtendedApi;
const GroupItem = WithExtendedApi(antd__WEBPACK_IMPORTED_MODULE_1__.Menu.ItemGroup);
var _c;
$RefreshReg$(_c, "WithExtendedApi");

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
"./js/src/core/components/dropdown/item/types/sub-menu/sub-menu-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SubMenuItem: () => (SubMenuItem),
  WithExtendedApi: () => (WithExtendedApi)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _utils_dropdown_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/dropdown/item/utils/dropdown-item.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
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



const WithExtendedApi = (Component)=>{
    const ExtendedSubmenu = (param)=>{
        let { children, popupOffset, label, ...props } = param;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
            title: label,
            ...props,
            children: children === null || children === void 0 ? void 0 : children.map((item)=>(0,_utils_dropdown_item__WEBPACK_IMPORTED_MODULE_2__.renderDropdownItem)({
                    item
                }))
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/types/sub-menu/sub-menu-item.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, undefined);
    };
    return ExtendedSubmenu;
};
_c = WithExtendedApi;
const SubMenuItem = WithExtendedApi(antd__WEBPACK_IMPORTED_MODULE_1__.Menu.SubMenu);
var _c;
$RefreshReg$(_c, "WithExtendedApi");

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
"./js/src/core/components/dropdown/item/utils/dropdown-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  renderDropdownItem: () => (renderDropdownItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _types_custom_custom_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/dropdown/item/types/custom/custom-item.tsx");
/* ESM import */var _types_divider_divider_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/dropdown/item/types/divider/divider-item.tsx");
/* ESM import */var _types_group_group_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/dropdown/item/types/group/group-item.tsx");
/* ESM import */var _types_sub_menu_sub_menu_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/dropdown/item/types/sub-menu/sub-menu-item.tsx");
/* ESM import */var _types_default_default_item__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/dropdown/item/types/default/default-item.tsx");
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






const renderDropdownItem = (param)=>{
    let { item } = param;
    if (item === null) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
    }
    if ('type' in item && item.type === 'divider') {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_types_divider_divider_item__WEBPACK_IMPORTED_MODULE_3__.DividerItem, {
            ...item
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/utils/dropdown-item.tsx",
            lineNumber: 29,
            columnNumber: 12
        }, undefined);
    }
    if ('type' in item && item.type === 'group') {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_types_group_group_item__WEBPACK_IMPORTED_MODULE_4__.GroupItem, {
            ...item
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/utils/dropdown-item.tsx",
            lineNumber: 33,
            columnNumber: 12
        }, undefined);
    }
    if ('type' in item && item.type === 'custom') {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_types_custom_custom_item__WEBPACK_IMPORTED_MODULE_2__.CustomItem, {
            ...item
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/utils/dropdown-item.tsx",
            lineNumber: 37,
            columnNumber: 12
        }, undefined);
    }
    if (!('type' in item) && 'children' in item) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_types_sub_menu_sub_menu_item__WEBPACK_IMPORTED_MODULE_5__.SubMenuItem, {
            ...item
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/utils/dropdown-item.tsx",
            lineNumber: 41,
            columnNumber: 12
        }, undefined);
    }
    if (!('type' in item) && !('children' in item)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_types_default_default_item__WEBPACK_IMPORTED_MODULE_6__.DefaultItem, {
            ...item,
            id: item.key
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/utils/dropdown-item.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false);
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
"./js/src/core/components/dropdown/selection/hooks/use-selection.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useSelection: () => (useSelection)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _selection_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/dropdown/selection/selection-provider.tsx");
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

const useSelection = ()=>{
    const { selectedKeys, setSelectedKeys, selectionType, ...context } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_selection_provider__WEBPACK_IMPORTED_MODULE_1__.SelectionContext);
    function isSelected(key) {
        return selectedKeys.includes(key);
    }
    function select(key) {
        if (selectionType === _selection_provider__WEBPACK_IMPORTED_MODULE_1__.SelectionType.Disabled) {
            return;
        }
        if (selectionType === _selection_provider__WEBPACK_IMPORTED_MODULE_1__.SelectionType.Single) {
            setSelectedKeys([
                key
            ]);
            return;
        }
        if (selectionType === _selection_provider__WEBPACK_IMPORTED_MODULE_1__.SelectionType.Multiple) {
            setSelectedKeys([
                ...selectedKeys,
                key
            ]);
        }
    }
    function deselect(key) {
        if (selectionType === _selection_provider__WEBPACK_IMPORTED_MODULE_1__.SelectionType.Disabled) {
            return;
        }
        setSelectedKeys(selectedKeys.filter((selectedKey)=>selectedKey !== key));
    }
    function toggle(key) {
        if (isSelected(key)) {
            deselect(key);
            return;
        }
        select(key);
    }
    return {
        isSelected,
        select,
        deselect,
        toggle,
        selectedKeys,
        setSelectedKeys,
        selectionType,
        ...context
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
"./js/src/core/components/dropdown/selection/selection-button.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { css, token } = param;
    return {
        selectionButton: css`
      color: transparent;
      transition: color 0.3s;

      &.selection-button--active {
        color: ${token.colorPrimary};
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
"./js/src/core/components/dropdown/selection/selection-button.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SelectionButton: () => (SelectionButton)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _hooks_use_selection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/dropdown/selection/hooks/use-selection.ts");
/* ESM import */var _selection_button_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/dropdown/selection/selection-button.styles.tsx");
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




const SelectionButton = (param)=>{
    let { id } = param;
    _s();
    const { styles } = (0,_selection_button_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    const { toggle, isSelected } = (0,_hooks_use_selection__WEBPACK_IMPORTED_MODULE_3__.useSelection)();
    const classes = [
        styles.selectionButton
    ];
    if (isSelected(id)) {
        classes.push('selection-button--active');
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_1__.IconButton, {
        className: classes.join(' '),
        icon: {
            value: 'pin'
        },
        onClick: onClick,
        variant: "minimal"
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/selection/selection-button.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, undefined);
    function onClick(event) {
        event.stopPropagation();
        toggle(id);
    }
};
_s(SelectionButton, "FzUgcyTbKImjlEafQIfaO62x1XY=", false, function() {
    return [
        _selection_button_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles,
        _hooks_use_selection__WEBPACK_IMPORTED_MODULE_3__.useSelection
    ];
});
_c = SelectionButton;
var _c;
$RefreshReg$(_c, "SelectionButton");

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
"./js/src/core/components/dropdown/selection/selection-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SelectionContext: () => (SelectionContext),
  SelectionProvider: () => (SelectionProvider),
  SelectionType: () => (SelectionType)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

var SelectionType = /*#__PURE__*/ function(SelectionType) {
    SelectionType["Disabled"] = "disabled";
    SelectionType["Single"] = "single";
    SelectionType["Multiple"] = "multiple";
    return SelectionType;
}({});
const SelectionContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    selectionType: "disabled",
    selectedKeys: [],
    setSelectedKeys: ()=>{},
    onSelected: ()=>{}
});
const SelectionProvider = (param)=>{
    let { children, onSelected, ...props } = param;
    _s();
    const [selected, setSelected] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.selectedKeys ?? []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setSelected(props.selectedKeys ?? []);
    }, [
        props.selectedKeys
    ]);
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SelectionContext.Provider, {
            value: {
                selectedKeys: selected,
                setSelectedKeys,
                selectionType: props.selectionType,
                onSelected
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/selection/selection-provider.tsx",
            lineNumber: 49,
            columnNumber: 5
        }, undefined), [
        selected,
        props.selectionType,
        children
    ]);
    function setSelectedKeys(selected) {
        setSelected(()=>{
            if (onSelected !== undefined) {
                onSelected(selected);
            }
            return selected;
        });
    }
};
_s(SelectionProvider, "HCpIJFfwlxDp11llvH/vtB7pNd4=");
_c = SelectionProvider;
var _c;
$RefreshReg$(_c, "SelectionProvider");

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
"./js/src/core/components/element-tree/element-tree.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ElementTree: () => (ElementTree),
  TreeContext: () => (TreeContext),
  defaultProps: () => (defaultProps)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _node_tree_node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/element-tree/node/tree-node.tsx");
/* ESM import */var _node_content_tree_node_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/element-tree/node/content/tree-node-content.tsx");
/* ESM import */var _element_tree_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/element-tree/element-tree.styles.ts");
/* ESM import */var _skeleton_skeleton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/element-tree/skeleton/skeleton.tsx");
/* ESM import */var _box_box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/element-tree/hooks/use-element-tree-node.ts");
/* ESM import */var _list_tree_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/element-tree/list/tree-list.tsx");
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








const defaultProps = {
    nodeId: 1,
    renderNodeContent: _node_content_tree_node_content__WEBPACK_IMPORTED_MODULE_3__.TreeNodeContent,
    renderNode: _node_tree_node__WEBPACK_IMPORTED_MODULE_2__.TreeNode,
    showRoot: true
};
const TreeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    ...defaultProps
});
const ElementTree = (param)=>{
    let { renderNode = defaultProps.renderNode, renderNodeContent = defaultProps.renderNodeContent, contextMenu: ContextMenu, rootNode, ...props } = param;
    _s();
    const { styles } = (0,_element_tree_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    const { nodeId } = props;
    const hasRootNode = rootNode !== undefined && parseInt(rootNode.id) === nodeId && props.showRoot;
    const preparedRootNode = rootNode;
    const { getChildren, isLoading } = (0,_hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_7__.useElementTreeNode)(String(nodeId));
    const nodesRefs = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({});
    const nodeOrder = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        return Object.keys(nodesRefs.current).sort((a, b)=>{
            const nodeA = nodesRefs.current[a].node;
            const nodeB = nodesRefs.current[b].node;
            const indexesA = nodeA.internalKey.split('-');
            const indexesB = nodeB.internalKey.split('-');
            for(let index = 0; index < indexesA.length; index++){
                if (indexesA[index] !== indexesB[index]) {
                    return parseInt(indexesA[index]) - parseInt(indexesB[index]);
                }
            }
            return 0;
        });
    }, [
        nodesRefs.current
    ]);
    const [rightClickedNode, setRightClickedNode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
    async function onRightClick(event, node) {
        event.preventDefault();
        setRightClickedNode(node);
    }
    const treeContextValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            ...props,
            nodesRefs,
            nodeOrder,
            renderNode,
            renderNodeContent,
            onRightClick
        }), [
        props,
        nodesRefs,
        nodeOrder,
        renderNode,
        renderNodeContent,
        onRightClick
    ]);
    const items = getChildren();
    const TreeNode = renderNode;
    const treeContent = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: [
            'tree',
            styles.tree
        ].join(' '),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(TreeContext.Provider, {
            value: treeContextValue,
            children: [
                hasRootNode && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(TreeNode, {
                    level: -1,
                    ...preparedRootNode
                }, preparedRootNode.id, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/element-tree.tsx",
                    lineNumber: 134,
                    columnNumber: 9
                }, undefined),
                !hasRootNode && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_list_tree_list__WEBPACK_IMPORTED_MODULE_8__.TreeList, {
                    node: {
                        ...preparedRootNode,
                        level: -1
                    }
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/element-tree.tsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/element-tree.tsx",
            lineNumber: 131,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/element-tree.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, undefined);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            isLoading === true && !hasRootNode && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_box_box__WEBPACK_IMPORTED_MODULE_6__.Box, {
                padding: {
                    left: 'extra-small'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_skeleton_skeleton__WEBPACK_IMPORTED_MODULE_5__.Skeleton, {}, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/element-tree.tsx",
                    lineNumber: 155,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/element-tree.tsx",
                lineNumber: 154,
                columnNumber: 9
            }, undefined),
            (items.length !== 0 || hasRootNode) && (ContextMenu !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ContextMenu, {
                node: rightClickedNode,
                children: treeContent
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/element-tree.tsx",
                lineNumber: 162,
                columnNumber: 13
            }, undefined) : treeContent)
        ]
    }, void 0, true);
};
_s(ElementTree, "jQTZH+zGhxAqC3I1VK25r9zH/ug=", false, function() {
    return [
        _element_tree_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles,
        _hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_7__.useElementTreeNode
    ];
});
_c = ElementTree;

var _c;
$RefreshReg$(_c, "ElementTree");

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
"./js/src/core/components/element-tree/node/tree-node.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        treeNode: css`
      user-select: none;

      &.tree-node--is-root {
        .tree-node__content {
          padding-left: ${token.paddingSM}px;
        }
      }

      &.tree-node--danger {
        .tree-node__content .tree-node__content-wrapper {
          color: ${token.colorError};
          text-decoration: line-through;
        }
      }

      .tree-node__content {
        cursor: pointer;
        width: 100%;
        padding: 2px ${token.paddingSM}px 2px 0;
        white-space: nowrap;
        align-items: center;

        .tree-node__content-wrapper {
          width: 100%;
          overflow: hidden;
        }

        @media (hover: hover) {
          &:hover {
            background-color: ${token.controlItemBgActiveHover};
          }
        }

        &:focus {
          outline: none;
          background-color: ${token.controlItemBgActiveHover};
        }
      }

      &.tree-node--selected > .tree-node__content {
        background-color: ${token.controlItemBgActive};
      }

      .tree-node-content__label {
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
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
"./js/src/core/components/element-tree/node/tree-node.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreeNode: () => (TreeNode),
  defaultProps: () => (defaultProps)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _tree_node_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/element-tree/node/tree-node.styles.ts");
/* ESM import */var _element_tree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/element-tree/element-tree.tsx");
/* ESM import */var _list_tree_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/element-tree/list/tree-list.tsx");
/* ESM import */var _expander_tree_expander__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/element-tree/expander/tree-expander.tsx");
/* ESM import */var _hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/element-tree/hooks/use-element-tree-node.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
/* ESM import */var _Pimcore_modules_widget_manager_widget_utils_widget_content_scroll__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/widget-manager/widget/utils/widget-content-scroll.ts");
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









const defaultProps = {
    id: Math.random().toString(16).slice(2),
    internalKey: '',
    icon: {
        type: 'name',
        value: 'folder'
    },
    label: '',
    children: [],
    permissions: {
        list: false,
        view: false,
        publish: false,
        delete: false,
        rename: false,
        create: false,
        settings: false,
        versions: false,
        properties: false
    },
    level: 0,
    locked: null,
    isLocked: false,
    isRoot: false
};
const { useToken } = antd__WEBPACK_IMPORTED_MODULE_1__.theme;
const TreeNode = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(_c = _s(function ForwardedTreeNode(param, forwardRef) {
    let { id = defaultProps.id, internalKey = defaultProps.internalKey, icon = defaultProps.icon, label = defaultProps.label, level = defaultProps.level, isRoot = defaultProps.isRoot, isLoading = false, danger = false, wrapNode = (children)=>children, ...props } = param;
    _s();
    const { token } = useToken();
    const { styles } = (0,_tree_node_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
    const { renderNodeContent: RenderNodeContent, onSelect, onRightClick, nodesRefs, nodeOrder } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_element_tree__WEBPACK_IMPORTED_MODULE_4__.TreeContext);
    const { isExpanded, setExpanded, isSelected, isScrollTo, setScrollTo, setSelectedIds } = (0,_hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_7__.useElementTreeNode)(id);
    const treeNodeProps = {
        id,
        icon,
        label,
        internalKey,
        level,
        isLoading,
        isRoot,
        danger,
        ...props
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        return ()=>{
            if (nodesRefs !== undefined) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete nodesRefs.current[internalKey];
            }
        };
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (isScrollTo) {
            var _nodesRefs_current_internalKey;
            const nodeElement = nodesRefs === null || nodesRefs === void 0 ? void 0 : (_nodesRefs_current_internalKey = nodesRefs.current[internalKey]) === null || _nodesRefs_current_internalKey === void 0 ? void 0 : _nodesRefs_current_internalKey.el;
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(nodeElement)) {
                (0,_Pimcore_modules_widget_manager_widget_utils_widget_content_scroll__WEBPACK_IMPORTED_MODULE_9__.scrollToNodeElement)(nodeElement);
                setScrollTo(false);
            }
        }
    }, [
        isScrollTo,
        nodesRefs,
        internalKey,
        setScrollTo
    ]);
    function getClasses() {
        const classes = [
            'tree-node',
            styles.treeNode
        ];
        if (isSelected) {
            classes.push('tree-node--selected');
        }
        if (danger) {
            classes.push('tree-node--danger');
        }
        if (isRoot === true) {
            classes.push('tree-node--is-root');
        }
        return classes.join(' ');
    }
    function selectNode() {
        setSelectedIds([
            id
        ]);
        if (onSelect !== undefined) {
            onSelect(treeNodeProps);
        }
    }
    function onClick(event) {
        selectNode();
    }
    function onContextMenu(event) {
        if (onRightClick !== undefined) {
            onRightClick(event, treeNodeProps);
        }
    }
    function onKeyDown(event) {
        if (event.key === 'Enter') {
            selectNode();
        }
        if (event.key === 'ArrowRight') {
            expandItem();
        }
        if (event.key === 'ArrowLeft') {
            collapseItem();
        }
        if (event.key === 'ArrowDown') {
            gotoNextNode(event);
        }
        if (event.key === 'ArrowUp') {
            gotoPreviousNode(event);
        }
    }
    function expandItem() {
        setExpanded(true);
    }
    function collapseItem() {
        setExpanded(false);
    }
    function gotoNextNode(event) {
        event.preventDefault();
        const index = nodeOrder().indexOf(internalKey);
        if (index < nodeOrder().length - 1) {
            nodesRefs.current[nodeOrder()[index + 1]].el.focus();
        }
    }
    function gotoPreviousNode(event) {
        event.preventDefault();
        const index = nodeOrder().indexOf(internalKey);
        if (index > 0) {
            nodesRefs.current[nodeOrder()[index - 1]].el.focus();
        }
    }
    function setRef(el) {
        registerNode(el);
    }
    function registerNode(el) {
        const nodeRef = {
            el,
            node: treeNodeProps
        };
        nodesRefs.current[internalKey] = nodeRef;
    }
    const nodeContent = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Flex, {
        gap: "small",
        onClick: onClick,
        onContextMenu: onContextMenu,
        onKeyDown: onKeyDown,
        ref: setRef,
        role: "button",
        style: {
            paddingLeft: token.paddingSM + 20 * level,
            minWidth: `${20 * level + 200}px`
        },
        tabIndex: -1,
        children: [
            isRoot !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_expander_tree_expander__WEBPACK_IMPORTED_MODULE_6__.TreeExpander, {
                node: treeNodeProps,
                state: [
                    isExpanded,
                    setExpanded
                ]
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/tree-node.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "tree-node__content-wrapper",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(RenderNodeContent, {
                    node: treeNodeProps
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/tree-node.tsx",
                    lineNumber: 238,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/tree-node.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/tree-node.tsx",
        lineNumber: 216,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: getClasses(),
        ref: forwardRef,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "tree-node__content",
                children: wrapNode(nodeContent)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/tree-node.tsx",
                lineNumber: 248,
                columnNumber: 7
            }, this),
            isExpanded && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_list_tree_list__WEBPACK_IMPORTED_MODULE_5__.TreeList, {
                node: treeNodeProps
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/tree-node.tsx",
                lineNumber: 253,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/element-tree/node/tree-node.tsx",
        lineNumber: 244,
        columnNumber: 5
    }, this);
}, "b5VJ0r66oZ/2trH/k1rNEFy5gv4=", false, function() {
    return [
        useToken,
        _tree_node_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles,
        _hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_7__.useElementTreeNode
    ];
})), "b5VJ0r66oZ/2trH/k1rNEFy5gv4=", false, function() {
    return [
        useToken,
        _tree_node_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles,
        _hooks_use_element_tree_node__WEBPACK_IMPORTED_MODULE_7__.useElementTreeNode
    ];
});
_c1 = TreeNode;

var _c, _c1;
$RefreshReg$(_c, "TreeNode$forwardRef");
$RefreshReg$(_c1, "TreeNode");

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
"./js/src/core/components/key-value-list/key-value-list.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KeyValueList: () => (KeyValueList)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/text/text.tsx");
/* ESM import */var _Pimcore_components_sanitize_html_sanitize_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/sanitize-html/sanitize-html.tsx");
/* ESM import */var _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/utils/date-time.ts");
/* ESM import */var _key_value_list_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/key-value-list/key-value-list.styles.ts");
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








const FIELDS_TO_CONVERT_TO_DATE = [
    'creationDate',
    'modificationDate'
];
const SPECIAL_DATA_TYPES = [
    'documentData',
    'objectData'
];
const KeyValueList = (param)=>{
    let { items, skipEmpty = true } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { styles } = (0,_key_value_list_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles)();
    const preparedItems = [];
    const shouldSkipValue = (value)=>skipEmpty && ((0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_6__.isEmptyValue)(value) || (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEqual)(value, false));
    items.forEach((item)=>{
        if (shouldSkipValue(item === null || item === void 0 ? void 0 : item.value)) {
            return;
        }
        if (SPECIAL_DATA_TYPES.includes(item.key)) {
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isObject)(item.value)) {
                const renderObjectValue = (objectValue)=>{
                    Object.entries(objectValue).forEach((param)=>{
                        let [key, value] = param;
                        if (shouldSkipValue(value)) {
                            return;
                        }
                        if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isObject)(value)) {
                            renderObjectValue(value);
                        } else {
                            preparedItems.push({
                                key,
                                value,
                                withoutTranslate: item.key === 'objectData'
                            });
                        }
                    });
                };
                renderObjectValue(item.value);
            }
        } else {
            preparedItems.push(item);
        }
    });
    const renderItem = (item)=>{
        let fieldValue = item === null || item === void 0 ? void 0 : item.value;
        if (FIELDS_TO_CONVERT_TO_DATE.includes(item.key)) {
            fieldValue = (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_7__.formatDateTime)({
                timestamp: (item === null || item === void 0 ? void 0 : item.value) ?? null,
                dateStyle: 'short',
                timeStyle: 'short'
            });
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("tr", {
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("td", {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_4__.Text, {
                        children: (item === null || item === void 0 ? void 0 : item.withoutTranslate) === true ? item.key : t(`modal-search.field.${item.key}`)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("td", {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_4__.Text, {
                        children: fieldValue === 0 ? fieldValue : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_sanitize_html_sanitize_html__WEBPACK_IMPORTED_MODULE_5__.SanitizeHtml, {
                            html: fieldValue ?? ''
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                            lineNumber: 85,
                            columnNumber: 46
                        }, undefined)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, undefined)
            ]
        }, item.key, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
            lineNumber: 79,
            columnNumber: 7
        }, undefined);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("table", {
        className: styles.keyValueList,
        children: preparedItems.map((item)=>renderItem(item))
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/key-value-list/key-value-list.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, undefined);
};
_s(KeyValueList, "RLrtxoYLhU6K3pUxNPOpN7Ah0UQ=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _key_value_list_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles
    ];
});
_c = KeyValueList;
var _c;
$RefreshReg$(_c, "KeyValueList");

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
"./js/src/core/components/login-form/login-form.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LoginForm: () => (LoginForm)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_login_form_login_form_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/login-form/login-form-style.tsx");
/* ESM import */var react_redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/react-redux/dist/react-redux.mjs");
/* ESM import */var _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/message/useMessage/index.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _icon_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_auth_authorization_api_slice_gen__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/auth/authorization-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_auth_auth_slice__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/auth/auth-slice.ts");
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



// import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons-old'








const LoginForm = (param)=>{
    let { additionalLogins } = param;
    _s();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_11__.useDispatch)();
    const { styles } = (0,_Pimcore_components_login_form_login_form_style__WEBPACK_IMPORTED_MODULE_4__.useStyle)();
    const messageApi = (0,_Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_5__.useMessage)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)();
    const [formState, setFormState] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({
        username: '',
        password: ''
    });
    const [login] = (0,_Pimcore_modules_auth_authorization_api_slice_gen__WEBPACK_IMPORTED_MODULE_8__.useLoginMutation)();
    // Use manual isLoading state because the rtkQueryErrorLogger prevents this action on 401 error
    const [isLoginLoading, setIsLoginLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const handleAuthentication = async (event)=>{
        const loginTask = login({
            credentials: formState
        });
        setIsLoginLoading(true);
        loginTask.catch((error)=>{
            setIsLoginLoading(false);
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_9__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_9__.ApiError(error));
        });
        try {
            event.preventDefault();
            const response = await loginTask;
            if (response.error !== undefined) {
                (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_9__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_9__.ApiError(response.error));
            }
            setIsLoginLoading(false);
            dispatch((0,_Pimcore_modules_auth_auth_slice__WEBPACK_IMPORTED_MODULE_10__.setAuthState)(true));
        } catch (e) {
            setIsLoginLoading(false);
            await messageApi.error({
                content: e.message
            });
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.form,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("form", {
                onSubmit: handleAuthentication,
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Input, {
                        onChange: (e)=>{
                            setFormState({
                                ...formState,
                                username: e.target.value
                            });
                        },
                        placeholder: "Username",
                        prefix: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icon_icon__WEBPACK_IMPORTED_MODULE_7__.Icon, {
                            value: "user"
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                            lineNumber: 85,
                            columnNumber: 20
                        }, void 0)
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Input.Password, {
                        // iconRender={ (visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />) }
                        onChange: (e)=>{
                            setFormState({
                                ...formState,
                                password: e.target.value
                            });
                        },
                        placeholder: "Password"
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: 'flex-space',
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Checkbox, {
                                "aria-label": t('aria.login-form-additional-logins.remember-me-checkbox'),
                                children: t('login-form.remember-me')
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                type: 'link',
                                children: t('login-form.forgot-password')
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        htmlType: "submit",
                        loading: isLoginLoading,
                        type: "primary",
                        children: t('login-form.login')
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, undefined),
            Array.isArray(additionalLogins) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: 'login__additional-logins',
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                        children: t('login-form-additional-logins.or')
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, undefined),
                    additionalLogins === null || additionalLogins === void 0 ? void 0 : additionalLogins.map((login)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                            "aria-label": `${t('aria.login-form-additional-logins.additional-login-provider')} ${login.name}`,
                            href: login.link,
                            type: 'primary',
                            children: login.name
                        }, login.key, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                            lineNumber: 115,
                            columnNumber: 13
                        }, undefined))
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/login-form/login-form.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, undefined);
};
_s(LoginForm, "CsDoDMTmXQTwhQhmd7BAY+8uG5o=", false, function() {
    return [
        react_redux__WEBPACK_IMPORTED_MODULE_11__.useDispatch,
        _Pimcore_components_login_form_login_form_style__WEBPACK_IMPORTED_MODULE_4__.useStyle,
        _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_5__.useMessage,
        react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation,
        _Pimcore_modules_auth_authorization_api_slice_gen__WEBPACK_IMPORTED_MODULE_8__.useLoginMutation
    ];
});
_c = LoginForm;
var _c;
$RefreshReg$(_c, "LoginForm");

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
"./js/src/core/components/tree-element/tree-element.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param, props)=>{
    let { token, css } = param;
    return {
        treeContainer: css`
      .ant-tree-list-holder-inner {
        .ant-tree-treenode-leaf-last {
          &:first-child {
            .ant-tree-checkbox {
              display: ${props.isHideRootChecker === true ? 'none' : 'block'};
            }
          }
        }

        .ant-tree-treenode {
          padding: 0 ${token.paddingXS}px;
          position: relative;
          
          @media (hover: hover) {
            &:hover {
              background-color: ${token.controlItemBgActiveHover};
            }
          }

          &:focus {
            outline: none;
            background-color: ${token.controlItemBgActiveHover};
          }

          .ant-tree-node-content-wrapper {
            padding: 0;
            background: none;

            &:hover {
              background: none;
            }
          }
        }

        .ant-tree-treenode-selected,
        .ant-tree-treenode-selected:hover {
          background-color: ${token.controlItemBgActive};
        }
      }
      
      .ant-tree-switcher {
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:hover {
          background-color: transparent !important;
        }
      }

      .ant-tree-switcher-noop {
        pointer-events: none;
      }
      
      .ant-tree-switcher_close {
        .ant-tree-switcher-icon {
          svg {
            transform: rotate(0deg);
          }
        }
      }

      .ant-tree-switcher_open {
        .ant-tree-switcher-icon {
          svg {
            transform: rotate(-180deg);
          }
        }
      }

      .ant-tree-draggable-icon {
        display: none;
      }
      
      .ant-tree-title__btn {
        background: transparent;
        border: none;
        color: ${token.colorTextTreeElement};
        cursor: pointer;
        padding: 0;
        font-size: ${token.fontSize}px; 
                
        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }
    `
    };
}, {
    hashPriority: 'high'
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
"./js/src/core/modules/app/base-layout/user-menu/user-menu.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UserMenu: () => (UserMenu)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _user_menu_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/base-layout/user-menu/user-menu.styles.tsx");
/* ESM import */var _Pimcore_modules_auth_authorization_api_slice_gen__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/auth/authorization-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_notifications__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/notifications/index.tsx");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/container/remote/@sdk/components");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_sdk_components__WEBPACK_IMPORTED_MODULE_10__);
/* ESM import */var _sdk_modules_widget_manager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("webpack/container/remote/@sdk/modules/widget-manager");
/* ESM import */var _sdk_modules_widget_manager__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_sdk_modules_widget_manager__WEBPACK_IMPORTED_MODULE_11__);
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











const UserMenu = (param)=>{
    let { className } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    const { styles } = (0,_user_menu_styles__WEBPACK_IMPORTED_MODULE_6__.useStyle)();
    const [logout] = (0,_Pimcore_modules_auth_authorization_api_slice_gen__WEBPACK_IMPORTED_MODULE_7__.useLogoutMutation)();
    const { openMainWidget } = (0,_sdk_modules_widget_manager__WEBPACK_IMPORTED_MODULE_11__.useWidgetManager)();
    const handleLogout = ()=>{
        const logoutTask = logout();
        logoutTask.then(()=>{
            window.location.reload();
        }).catch((error)=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_8__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_8__.ApiError(error));
        });
    };
    const items = [
        {
            key: 'title',
            label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: 'user-menu__title',
                children: t('user-menu.title')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/user-menu/user-menu.tsx",
                lineNumber: 47,
                columnNumber: 9
            }, undefined),
            type: 'group'
        },
        {
            key: 'notifications',
            label: t('user-menu.notifications'),
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_10__.Badge, {
                count: 5
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/user-menu/user-menu.tsx",
                lineNumber: 54,
                columnNumber: 13
            }, undefined),
            onClick: ()=>{
                openMainWidget(_Pimcore_modules_notifications__WEBPACK_IMPORTED_MODULE_9__.NOTIFICATIONS);
            },
            extra: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_10__.Button, {
                className: 'user-menu__item-extra',
                size: 'small',
                children: t('user-menu.notifications-send')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/user-menu/user-menu.tsx",
                lineNumber: 56,
                columnNumber: 14
            }, undefined)
        },
        {
            key: 'myprofile',
            label: t('user-menu.my-profile'),
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: 'user'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/user-menu/user-menu.tsx",
                lineNumber: 64,
                columnNumber: 13
            }, undefined),
            onClick: ()=>{
                console.log('My Profile clicked');
            }
        },
        {
            key: 'logout',
            label: t('user-menu.log-out'),
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: 'log-out'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/user-menu/user-menu.tsx",
                lineNumber: 72,
                columnNumber: 13
            }, undefined),
            onClick: handleLogout
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_4__.Dropdown, {
        className: className,
        menu: {
            items
        },
        overlayClassName: [
            styles.userMenu
        ].join(' '),
        overlayStyle: {
            minWidth: 275
        },
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Avatar, {
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: "user"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/user-menu/user-menu.tsx",
                lineNumber: 85,
                columnNumber: 16
            }, void 0),
            size: 26
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/user-menu/user-menu.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/app/base-layout/user-menu/user-menu.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, undefined);
};
_s(UserMenu, "5Fv9SJBVd6k52FRHK+2+sTs663c=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation,
        _user_menu_styles__WEBPACK_IMPORTED_MODULE_6__.useStyle,
        _Pimcore_modules_auth_authorization_api_slice_gen__WEBPACK_IMPORTED_MODULE_7__.useLogoutMutation,
        _sdk_modules_widget_manager__WEBPACK_IMPORTED_MODULE_11__.useWidgetManager
    ];
});
_c = UserMenu;
var _c;
$RefreshReg$(_c, "UserMenu");

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
"./js/src/core/modules/app/mercure-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useMercureCreateCookieMutation: () => (useMercureCreateCookieMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Mercure"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            mercureCreateCookie: build.mutation({
                query: ()=>({
                        url: `/pimcore-studio/api/mercure/auth`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Mercure"
                ]
            })
        }),
    overrideExisting: false
});

const { useMercureCreateCookieMutation } = injectedRtkApi;

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
"./js/src/core/modules/app/translations/translations-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useTranslationCreateMutation: () => (useTranslationCreateMutation),
  useTranslationDeleteByKeyMutation: () => (useTranslationDeleteByKeyMutation),
  useTranslationGetCollectionMutation: () => (useTranslationGetCollectionMutation),
  useTranslationUpdateMutation: () => (useTranslationUpdateMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Translation"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            translationCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations/create`,
                        method: "POST",
                        body: queryArg.createTranslation
                    }),
                invalidatesTags: [
                    "Translation"
                ]
            }),
            translationDeleteByKey: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations/${queryArg.key}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Translation"
                ]
            }),
            translationUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations`,
                        method: "PUT",
                        body: queryArg.updateTranslation
                    }),
                invalidatesTags: [
                    "Translation"
                ]
            }),
            translationGetCollection: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/translations`,
                        method: "POST",
                        body: queryArg.translation
                    }),
                invalidatesTags: [
                    "Translation"
                ]
            })
        }),
    overrideExisting: false
});

const { useTranslationCreateMutation, useTranslationDeleteByKeyMutation, useTranslationUpdateMutation, useTranslationGetCollectionMutation } = injectedRtkApi;

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
"./js/src/core/modules/asset/asset-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useAssetAddMutation: () => (useAssetAddMutation),
  useAssetClearThumbnailMutation: () => (useAssetClearThumbnailMutation),
  useAssetCloneMutation: () => (useAssetCloneMutation),
  useAssetCustomMetadataGetByIdQuery: () => (useAssetCustomMetadataGetByIdQuery),
  useAssetCustomSettingsGetByIdQuery: () => (useAssetCustomSettingsGetByIdQuery),
  useAssetDeleteGridConfigurationByConfigurationIdMutation: () => (useAssetDeleteGridConfigurationByConfigurationIdMutation),
  useAssetDeleteZipMutation: () => (useAssetDeleteZipMutation),
  useAssetDocumentStreamPreviewQuery: () => (useAssetDocumentStreamPreviewQuery),
  useAssetDownloadByIdQuery: () => (useAssetDownloadByIdQuery),
  useAssetDownloadZipQuery: () => (useAssetDownloadZipQuery),
  useAssetExportZipAssetMutation: () => (useAssetExportZipAssetMutation),
  useAssetExportZipFolderMutation: () => (useAssetExportZipFolderMutation),
  useAssetGetAvailableGridColumnsQuery: () => (useAssetGetAvailableGridColumnsQuery),
  useAssetGetByIdQuery: () => (useAssetGetByIdQuery),
  useAssetGetGridConfigurationByFolderIdQuery: () => (useAssetGetGridConfigurationByFolderIdQuery),
  useAssetGetGridQuery: () => (useAssetGetGridQuery),
  useAssetGetSavedGridConfigurationsQuery: () => (useAssetGetSavedGridConfigurationsQuery),
  useAssetGetTextDataByIdQuery: () => (useAssetGetTextDataByIdQuery),
  useAssetGetTreeQuery: () => (useAssetGetTreeQuery),
  useAssetImageDownloadByFormatQuery: () => (useAssetImageDownloadByFormatQuery),
  useAssetImageDownloadByThumbnailQuery: () => (useAssetImageDownloadByThumbnailQuery),
  useAssetImageDownloadCustomQuery: () => (useAssetImageDownloadCustomQuery),
  useAssetImageStreamCustomQuery: () => (useAssetImageStreamCustomQuery),
  useAssetImageStreamPreviewQuery: () => (useAssetImageStreamPreviewQuery),
  useAssetImageStreamQuery: () => (useAssetImageStreamQuery),
  useAssetPatchByIdMutation: () => (useAssetPatchByIdMutation),
  useAssetPatchFolderByIdMutation: () => (useAssetPatchFolderByIdMutation),
  useAssetReplaceMutation: () => (useAssetReplaceMutation),
  useAssetSaveGridConfigurationMutation: () => (useAssetSaveGridConfigurationMutation),
  useAssetSetGridConfigurationAsFavoriteMutation: () => (useAssetSetGridConfigurationAsFavoriteMutation),
  useAssetUpdateByIdMutation: () => (useAssetUpdateByIdMutation),
  useAssetUpdateGridConfigurationMutation: () => (useAssetUpdateGridConfigurationMutation),
  useAssetUploadInfoQuery: () => (useAssetUploadInfoQuery),
  useAssetUploadZipMutation: () => (useAssetUploadZipMutation),
  useAssetVideoDownloadByThumbnailQuery: () => (useAssetVideoDownloadByThumbnailQuery),
  useAssetVideoImageThumbnailStreamQuery: () => (useAssetVideoImageThumbnailStreamQuery),
  useAssetVideoStreamByThumbnailQuery: () => (useAssetVideoStreamByThumbnailQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Assets",
    "Asset Grid",
    "Metadata"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            assetClone: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/clone/${queryArg.parentId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetCustomSettingsGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/custom-settings`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetGetTextDataById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/text`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetDocumentStreamPreview: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/document/stream/pdf-preview`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetDownloadZip: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/download/zip/${queryArg.jobRunId}`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetDeleteZip: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/download/zip/${queryArg.jobRunId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetDownloadById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/download`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetExportZipAsset: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/export/zip/asset`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetExportZipFolder: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/export/zip/folder`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetDeleteGridConfigurationByConfigurationId: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/grid/configuration/${queryArg.configurationId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Asset Grid"
                ]
            }),
            assetGetAvailableGridColumns: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/assets/grid/available-columns`
                    }),
                providesTags: [
                    "Asset Grid"
                ]
            }),
            assetGetGridConfigurationByFolderId: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/grid/configuration/${queryArg.folderId}`,
                        params: {
                            configurationId: queryArg.configurationId
                        }
                    }),
                providesTags: [
                    "Asset Grid"
                ]
            }),
            assetGetSavedGridConfigurations: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/assets/grid/configurations`
                    }),
                providesTags: [
                    "Asset Grid"
                ]
            }),
            assetSaveGridConfiguration: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/grid/configuration/save`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Asset Grid"
                ]
            }),
            assetSetGridConfigurationAsFavorite: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/grid/configuration/set-as-favorite/${queryArg.configurationId}/${queryArg.folderId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Asset Grid"
                ]
            }),
            assetUpdateGridConfiguration: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/grid/configuration/update/${queryArg.configurationId}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Asset Grid"
                ]
            }),
            assetGetGrid: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/grid`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Asset Grid"
                ]
            }),
            assetImageDownloadCustom: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/image/download/custom`,
                        params: {
                            mimeType: queryArg.mimeType,
                            resizeMode: queryArg.resizeMode,
                            width: queryArg.width,
                            height: queryArg.height,
                            quality: queryArg.quality,
                            dpi: queryArg.dpi
                        }
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetImageStreamCustom: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/image/stream/custom`,
                        params: {
                            mimeType: queryArg.mimeType,
                            resizeMode: queryArg.resizeMode,
                            width: queryArg.width,
                            height: queryArg.height,
                            quality: queryArg.quality,
                            dpi: queryArg.dpi,
                            contain: queryArg.contain,
                            frame: queryArg.frame,
                            cover: queryArg.cover,
                            forceResize: queryArg.forceResize,
                            cropPercent: queryArg.cropPercent,
                            cropWidth: queryArg.cropWidth,
                            cropHeight: queryArg.cropHeight,
                            cropTop: queryArg.cropTop,
                            cropLeft: queryArg.cropLeft
                        }
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetImageDownloadByFormat: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/image/download/format/${queryArg.format}`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetImageStreamPreview: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/image/stream/preview`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetImageStream: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/image/stream`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetImageDownloadByThumbnail: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/image/download/thumbnail/${queryArg.thumbnailName}`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetPatchById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets`,
                        method: "PATCH",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetPatchFolderById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/folder`,
                        method: "PATCH",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetClearThumbnail: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/thumbnail/clear`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/tree`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            parentId: queryArg.parentId,
                            idSearchTerm: queryArg.idSearchTerm,
                            pqlQuery: queryArg.pqlQuery,
                            excludeFolders: queryArg.excludeFolders,
                            path: queryArg.path,
                            pathIncludeParent: queryArg.pathIncludeParent,
                            pathIncludeDescendants: queryArg.pathIncludeDescendants
                        }
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetAdd: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/add/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetUploadInfo: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/exists/${queryArg.parentId}`,
                        params: {
                            fileName: queryArg.fileName
                        }
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetReplace: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/replace`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetUploadZip: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/add-zip/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Assets"
                ]
            }),
            assetVideoImageThumbnailStream: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/video/stream/image-thumbnail`,
                        params: {
                            width: queryArg.width,
                            height: queryArg.height,
                            aspectRatio: queryArg.aspectRatio,
                            frame: queryArg.frame,
                            async: queryArg["async"]
                        }
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetVideoDownloadByThumbnail: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/video/download/${queryArg.thumbnailName}`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetVideoStreamByThumbnail: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/video/stream/${queryArg.thumbnailName}`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            assetCustomMetadataGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/custom-metadata`
                    }),
                providesTags: [
                    "Metadata"
                ]
            })
        }),
    overrideExisting: false
});

const { useAssetCloneMutation, useAssetCustomSettingsGetByIdQuery, useAssetGetTextDataByIdQuery, useAssetDocumentStreamPreviewQuery, useAssetDownloadZipQuery, useAssetDeleteZipMutation, useAssetDownloadByIdQuery, useAssetExportZipAssetMutation, useAssetExportZipFolderMutation, useAssetGetByIdQuery, useAssetUpdateByIdMutation, useAssetDeleteGridConfigurationByConfigurationIdMutation, useAssetGetAvailableGridColumnsQuery, useAssetGetGridConfigurationByFolderIdQuery, useAssetGetSavedGridConfigurationsQuery, useAssetSaveGridConfigurationMutation, useAssetSetGridConfigurationAsFavoriteMutation, useAssetUpdateGridConfigurationMutation, useAssetGetGridQuery, useAssetImageDownloadCustomQuery, useAssetImageStreamCustomQuery, useAssetImageDownloadByFormatQuery, useAssetImageStreamPreviewQuery, useAssetImageStreamQuery, useAssetImageDownloadByThumbnailQuery, useAssetPatchByIdMutation, useAssetPatchFolderByIdMutation, useAssetClearThumbnailMutation, useAssetGetTreeQuery, useAssetAddMutation, useAssetUploadInfoQuery, useAssetReplaceMutation, useAssetUploadZipMutation, useAssetVideoImageThumbnailStreamQuery, useAssetVideoDownloadByThumbnailQuery, useAssetVideoStreamByThumbnailQuery, useAssetCustomMetadataGetByIdQuery } = injectedRtkApi;

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
"./js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useAssetCustomMetadataGetByIdQuery: () => (useAssetCustomMetadataGetByIdQuery),
  useMetadataGetCollectionQuery: () => (useMetadataGetCollectionQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Metadata"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            assetCustomMetadataGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/custom-metadata`
                    }),
                providesTags: [
                    "Metadata"
                ]
            }),
            metadataGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/metadata`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Metadata"
                ]
            })
        }),
    overrideExisting: false
});

const { useAssetCustomMetadataGetByIdQuery, useMetadataGetCollectionQuery } = injectedRtkApi;

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
"./js/src/core/modules/asset/editor/types/audio/tab-manager/tabs/preview/preview-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PreviewContainer: () => (PreviewContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _preview_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/editor/types/audio/tab-manager/tabs/preview/preview-view.tsx");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
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





const PreviewContainer = ()=>{
    _s();
    const assetContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_4__.AssetContext);
    const { data } = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_3__.useAssetGetByIdQuery)({
        id: assetContext.id
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_5__.ContentLayout, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_preview_view__WEBPACK_IMPORTED_MODULE_2__.PreviewView, {
            src: data.fullPath
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/audio/tab-manager/tabs/preview/preview-container.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/audio/tab-manager/tabs/preview/preview-container.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, undefined);
};
_s(PreviewContainer, "SE0Nw5P3kNt86QksiRF7u6Urqfo=", false, function() {
    return [
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_3__.useAssetGetByIdQuery
    ];
});
_c = PreviewContainer;

var _c;
$RefreshReg$(_c, "PreviewContainer");

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
"./js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/preview/card/preview-card-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PreviewCardContainer: () => (PreviewCardContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_preview_card_preview_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/preview-card/preview-card.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-helper.ts");
/* ESM import */var _Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/actions/rename/use-rename.tsx");
/* ESM import */var _Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/actions/delete/use-delete.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/asset/actions/download/use-download.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_upload_new_version_upload_new_version__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx");
/* ESM import */var _Pimcore_modules_element_actions_open_open__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/actions/open/open.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
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











const PreviewCardContainer = (param)=>{
    let { asset } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { openAsset } = (0,_Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_4__.useAssetHelper)();
    const { renameContextMenuItem } = (0,_Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_5__.useRename)('asset', (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_11__.getElementActionCacheKey)('asset', 'rename', asset.id));
    const { deleteContextMenuItem } = (0,_Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_6__.useDelete)('asset', (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_11__.getElementActionCacheKey)('asset', 'delete', asset.id));
    const { downloadContextMenuItem } = (0,_Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_7__.useDownload)();
    const { uploadNewVersionContextMenuItem } = (0,_Pimcore_modules_asset_actions_upload_new_version_upload_new_version__WEBPACK_IMPORTED_MODULE_8__.useUploadNewVersion)();
    const { openContextMenuItem } = (0,_Pimcore_modules_element_actions_open_open__WEBPACK_IMPORTED_MODULE_9__.useOpen)('asset');
    const onClickCard = (e)=>{
        openAsset({
            config: {
                id: asset.id
            }
        });
    };
    const dropdownItems = [
        openContextMenuItem(asset),
        {
            key: 'locate-in-tree',
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__.Icon, {
                value: "target"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/preview/card/preview-card-container.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, undefined),
            label: t('preview-card.locate-in-tree'),
            hidden: true
        },
        {
            key: 'info',
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_10__.Icon, {
                value: "info-circle"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/preview/card/preview-card-container.tsx",
                lineNumber: 56,
                columnNumber: 13
            }, undefined),
            label: t('info'),
            hidden: true
        },
        renameContextMenuItem(asset),
        uploadNewVersionContextMenuItem(asset),
        downloadContextMenuItem(asset),
        deleteContextMenuItem(asset)
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_preview_card_preview_card__WEBPACK_IMPORTED_MODULE_1__.PreviewCard, {
        dropdownItems: dropdownItems,
        imgSrc: 'imageThumbnailPath' in asset ? asset.imageThumbnailPath : asset.icon,
        name: asset.filename,
        onClick: onClickCard
    }, asset.id, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/folder/tab-manager/tabs/preview/card/preview-card-container.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, undefined);
};
_s(PreviewCardContainer, "i6/OKgqcAa3qdLV+ABgR/kMg5hU=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_4__.useAssetHelper,
        _Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_5__.useRename,
        _Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_6__.useDelete,
        _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_7__.useDownload,
        _Pimcore_modules_asset_actions_upload_new_version_upload_new_version__WEBPACK_IMPORTED_MODULE_8__.useUploadNewVersion,
        _Pimcore_modules_element_actions_open_open__WEBPACK_IMPORTED_MODULE_9__.useOpen
    ];
});
_c = PreviewCardContainer;
var _c;
$RefreshReg$(_c, "PreviewCardContainer");

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
"./js/src/core/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/tabs/details/details-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DetailContainer: () => (DetailContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/asset-provider.tsx");
/* ESM import */var _Pimcore_modules_asset_editor_types_image_tab_manager_tabs_preview_sidebar_tabs_details_details_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/tabs/details/details-view.tsx");
/* ESM import */var _Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/utils/files.ts");
/* ESM import */var _Pimcore_utils_query_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/utils/query-string.ts");
/* ESM import */var _Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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








const DetailContainer = ()=>{
    _s();
    const assetContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_Pimcore_modules_asset_asset_provider__WEBPACK_IMPORTED_MODULE_3__.AssetContext);
    const { data } = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useAssetGetByIdQuery)({
        id: assetContext.id
    });
    const imageData = data;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_asset_editor_types_image_tab_manager_tabs_preview_sidebar_tabs_details_details_view__WEBPACK_IMPORTED_MODULE_4__.AssetEditorSidebarDetailsView, {
        height: imageData.height ?? 0,
        onClickCustomDownload: async (customDownloadProps)=>{
            downloadImageByCustomSettings(assetContext.id, customDownloadProps);
        },
        onClickDownloadByFormat: async (format)=>{
            downloadImageByFormat(assetContext.id, format);
        },
        width: imageData.width ?? 0
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/tabs/details/details-container.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, undefined);
    function downloadImageByCustomSettings(id, param) {
        let { width, height, quality, dpi, mode, format } = param;
        // ?mimeType=JPEG&resizeMode=scaleByWidth&width=140&height=78&quality=99&dpi=200
        const keyValues = [
            {
                key: 'mimeType',
                value: format
            },
            {
                key: 'resizeMode',
                value: mode
            },
            {
                key: 'dpi',
                value: dpi.toString()
            },
            {
                key: 'quality',
                value: quality.toString()
            },
            {
                key: 'height',
                value: height.toString()
            },
            {
                key: 'width',
                value: width.toString()
            }
        ];
        const queryString = (0,_Pimcore_utils_query_string__WEBPACK_IMPORTED_MODULE_6__.buildQueryString)(keyValues, [
            '',
            '-1'
        ]);
        fetch(`${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_7__.getPrefix)()}/assets/${id}/image/download/custom?${queryString}`).then(async (response)=>await response.blob()).then((imageBlob)=>{
            const imageURL = URL.createObjectURL(imageBlob);
            downloadShortcutsHandlerForCustomSettings(imageData.filename, imageURL, format);
        }).catch(()=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_8__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_8__.GeneralError('Could not download image'));
        });
    }
    function downloadImageByFormat(id, format) {
        if (format === 'original') {
            prepareDownload(`${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_7__.getPrefix)()}/assets/${id}/download`, format);
            return;
        }
        prepareDownload(`${(0,_Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_7__.getPrefix)()}/assets/${id}/image/download/format/${format}`, format);
    }
    function prepareDownload(url, format) {
        fetch(url).then(async (response)=>await response.blob()).then((imageBlob)=>{
            const imageURL = URL.createObjectURL(imageBlob);
            downloadShortcutsHandler(imageData.filename, imageURL, format);
        }).catch(()=>{
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_8__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_8__.GeneralError('Could not prepare download'));
        });
    }
    function downloadShortcutsHandler(name, url, format) {
        let filename = name;
        if (format !== 'original') {
            filename = (0,_Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_5__.replaceFileEnding)(name, 'jpg');
        }
        (0,_Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_5__.saveFileLocal)(url, filename);
    }
    function downloadShortcutsHandlerForCustomSettings(name, url, format) {
        const filename = (0,_Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_5__.replaceFileEnding)(name, format.toLowerCase());
        (0,_Pimcore_utils_files__WEBPACK_IMPORTED_MODULE_5__.saveFileLocal)(url, filename);
    }
};
_s(DetailContainer, "SE0Nw5P3kNt86QksiRF7u6Urqfo=", false, function() {
    return [
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useAssetGetByIdQuery
    ];
});
_c = DetailContainer;

var _c;
$RefreshReg$(_c, "DetailContainer");

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
"./js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BatchEditModal: () => (BatchEditModal)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/modal/footer/modal-footer.tsx");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var _Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _Pimcore_components_modal_window_modal_window_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/modal/window-modal/window-modal.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_modal_modal_title_modal_title__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/modal/modal-title/modal-title.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns.tsx");
/* ESM import */var _hooks_use_batch_edit__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/hooks/use-batch-edit.ts");
/* ESM import */var _batch_edit_list_container__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-list-container.tsx");
/* ESM import */var _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_row_selection_context_layer_provider_use_row_selection__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection.tsx");
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/modules/execution-engine/hooks/useJobs.ts");
/* ESM import */var _Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./js/src/core/modules/execution-engine/topics.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-context.ts");
/* ESM import */var _Pimcore_modules_execution_engine_jobs_batch_edit_factory__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./js/src/core/modules/execution-engine/jobs/batch-edit/factory.ts");
/* ESM import */var _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/settings/use-settings.ts");
/* ESM import */var _Pimcore_modules_element_dynamic_types_resolver_hooks_use_dynamic_type_resolver__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver.ts");
/* ESM import */var _Pimcore_modules_element_actions_refresh_grid_use_refresh_grid__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("./js/src/core/modules/element/actions/refresh-grid/use-refresh-grid.tsx");
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

























const BatchEditModal = (param)=>{
    let { batchEditModalOpen, setBatchEditModalOpen } = param;
    var _getFilteredAvailableDropdownList;
    _s();
    const { getAvailableColumnsDropdown } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_10__.useAvailableColumns)();
    const { batchEdits, addOrUpdateBatchEdit, resetBatchEdits } = (0,_hooks_use_batch_edit__WEBPACK_IMPORTED_MODULE_11__.useBatchEdit)();
    const [form] = _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_13__.Form.useForm();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_14__.useTranslation)();
    const [patchAssets, { isError, isSuccess, error }] = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_15__.useAssetPatchByIdMutation)();
    const [patchAssetsInFolder, { isError: isFolderPatchError, isSuccess: isFolderPatchSuccess, error: folderPatchError }] = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_15__.useAssetPatchFolderByIdMutation)();
    const { selectedRows } = (0,_Pimcore_modules_element_listing_decorators_row_selection_context_layer_provider_use_row_selection__WEBPACK_IMPORTED_MODULE_17__.useRowSelection)();
    const selectedRowsIds = Object.keys(selectedRows ?? {}).map(Number);
    const selectedRowsCount = selectedRowsIds.length;
    const { addJob } = (0,_Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_19__.useJobs)();
    const { id, elementType } = (0,_Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_21__.useElementContext)();
    const { useDataQueryHelper } = (0,_Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_23__.useSettings)();
    const { getArgs } = useDataQueryHelper();
    const { hasType } = (0,_Pimcore_modules_element_dynamic_types_resolver_hooks_use_dynamic_type_resolver__WEBPACK_IMPORTED_MODULE_24__.useDynamicTypeResolver)();
    const { refreshGrid } = (0,_Pimcore_modules_element_actions_refresh_grid_use_refresh_grid__WEBPACK_IMPORTED_MODULE_25__.useRefreshGrid)(elementType);
    const resetModal = ()=>{
        resetBatchEdits();
        form.resetFields();
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isSuccess || isFolderPatchSuccess) {
            setBatchEditModalOpen(false);
            resetModal();
        }
        if (selectedRowsCount === 1) {
            _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_15__.api.util.invalidateTags(_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_18__.invalidatingTags.ASSET_GRID_ID(selectedRowsIds[0]));
        }
    }, [
        isSuccess,
        isFolderPatchSuccess
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__.ApiError(error));
        }
        if (isFolderPatchError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__.ApiError(folderPatchError));
        }
    }, [
        isError,
        isFolderPatchSuccess
    ]);
    const onColumnClick = (column)=>{
        const locale = column.locale ?? null;
        addOrUpdateBatchEdit({
            ...column,
            locale
        });
    };
    const handleApplyChanges = ()=>{
        form.submit();
        setBatchEditModalOpen(false);
    };
    const onFormFinish = async (values)=>{
        const patches = batchEdits.map((batchEdit)=>{
            return {
                name: batchEdit.key,
                language: batchEdit.locale,
                data: values[batchEdit.key],
                type: batchEdit.type
            };
        });
        if (selectedRowsCount === 0) {
            addJob((0,_Pimcore_modules_execution_engine_jobs_batch_edit_factory__WEBPACK_IMPORTED_MODULE_22__.createJob)({
                title: t('batch-edit.job-title'),
                topics: [
                    _Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_20__.topics["patch-finished"],
                    ..._Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_20__.defaultTopics
                ],
                action: async ()=>{
                    var _getArgs_body, _getArgs, _response_data, _response_data1;
                    const response = await patchAssetsInFolder({
                        body: {
                            data: [
                                {
                                    folderId: id,
                                    metadata: patches
                                }
                            ],
                            filters: (_getArgs = getArgs()) === null || _getArgs === void 0 ? void 0 : (_getArgs_body = _getArgs.body) === null || _getArgs_body === void 0 ? void 0 : _getArgs_body.filters
                        }
                    });
                    if (((_response_data = response.data) === null || _response_data === void 0 ? void 0 : _response_data.jobRunId) === undefined) {
                        (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__.GeneralError('JobRunId is undefined'));
                        throw new Error('JobRunId is undefined');
                    }
                    return (_response_data1 = response.data) === null || _response_data1 === void 0 ? void 0 : _response_data1.jobRunId;
                },
                refreshGrid,
                // @todo change that to a more generic context
                assetContextId: id
            }));
        } else if (selectedRowsCount === 1) {
            await patchAssets({
                body: {
                    data: [
                        {
                            id: selectedRowsIds[0],
                            metadata: patches
                        }
                    ]
                }
            });
        } else {
            addJob((0,_Pimcore_modules_execution_engine_jobs_batch_edit_factory__WEBPACK_IMPORTED_MODULE_22__.createJob)({
                title: t('batch-edit.job-title'),
                topics: [
                    _Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_20__.topics["patch-finished"],
                    ..._Pimcore_modules_execution_engine_topics__WEBPACK_IMPORTED_MODULE_20__.defaultTopics
                ],
                action: async ()=>{
                    var _response_data, _response_data1;
                    const response = await patchAssets({
                        body: {
                            data: selectedRowsIds.map((rowId)=>({
                                    id: rowId,
                                    metadata: patches
                                }))
                        }
                    });
                    if (((_response_data = response.data) === null || _response_data === void 0 ? void 0 : _response_data.jobRunId) === undefined) {
                        (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_16__.GeneralError('JobRunId is undefined'));
                        throw new Error('JobRunId is undefined');
                    }
                    return (_response_data1 = response.data) === null || _response_data1 === void 0 ? void 0 : _response_data1.jobRunId;
                },
                refreshGrid,
                // @todo change that to a more generic context
                assetContextId: id
            }));
        }
    };
    const availableDropdownList = getAvailableColumnsDropdown(onColumnClick).menu.items;
    const getFilteredTypes = (column)=>{
        var _column_children;
        return column === null || column === void 0 ? void 0 : (_column_children = column.children) === null || _column_children === void 0 ? void 0 : _column_children.filter((child)=>{
            const isEditable = child.editable === true;
            const isAlreadyInBatchEditList = batchEdits.some((item)=>child.key === item.key && child.group === item.group);
            const hasDynamicType = hasType({
                target: 'BATCH_EDIT',
                dynamicTypeIds: [
                    child === null || child === void 0 ? void 0 : child.frontendType
                ]
            });
            return isEditable && hasDynamicType && !isAlreadyInBatchEditList;
        });
    };
    const getFilteredAvailableDropdownList = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>()=>{
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(availableDropdownList)) return [];
            return availableDropdownList.map((column)=>{
                return {
                    ...column,
                    children: getFilteredTypes(column)
                };
            });
        }, [
        availableDropdownList
    ]);
    const isEmptyDropdownList = (_getFilteredAvailableDropdownList = getFilteredAvailableDropdownList()) === null || _getFilteredAvailableDropdownList === void 0 ? void 0 : _getFilteredAvailableDropdownList.every((item)=>{
        var _item_children;
        return (item === null || item === void 0 ? void 0 : (_item_children = item.children) === null || _item_children === void 0 ? void 0 : _item_children.length) === 0;
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_window_modal_window_modal__WEBPACK_IMPORTED_MODULE_7__.WindowModal, {
        afterClose: ()=>{
            resetModal();
        },
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_footer_modal_footer__WEBPACK_IMPORTED_MODULE_3__.ModalFooter, {
            divider: true,
            justify: 'space-between',
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_4__.Dropdown, {
                    menu: {
                        items: getFilteredAvailableDropdownList()
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_5__.IconTextButton, {
                        disabled: isEmptyDropdownList,
                        icon: {
                            value: 'new'
                        },
                        type: "default",
                        children: t('listing.add-column')
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
                        lineNumber: 209,
                        columnNumber: 13
                    }, void 0)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
                    lineNumber: 208,
                    columnNumber: 11
                }, void 0),
                batchEdits.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_8__.Flex, {
                    align: 'center',
                    gap: 'extra-small',
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_5__.IconTextButton, {
                            icon: {
                                value: 'close'
                            },
                            onClick: ()=>{
                                resetBatchEdits();
                            },
                            type: "link",
                            children: t('batch-edit.modal-footer.discard-all-changes')
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
                            lineNumber: 223,
                            columnNumber: 17
                        }, void 0),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_button__WEBPACK_IMPORTED_MODULE_6__.Button, {
                            onClick: handleApplyChanges,
                            type: "primary",
                            children: t('batch-edit.modal-footer.apply-changes')
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
                            lineNumber: 232,
                            columnNumber: 17
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
                    lineNumber: 219,
                    columnNumber: 15
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
            lineNumber: 204,
            columnNumber: 9
        }, void 0),
        onCancel: ()=>{
            setBatchEditModalOpen(false);
            resetModal();
        },
        open: batchEditModalOpen,
        size: "M",
        title: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_modal_title_modal_title__WEBPACK_IMPORTED_MODULE_9__.ModalTitle, {
            children: t('batch-edit.modal-title')
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
            lineNumber: 248,
            columnNumber: 15
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_13__.Form, {
            form: form,
            onFinish: onFormFinish,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_batch_edit_list_container__WEBPACK_IMPORTED_MODULE_12__.BatchEditListContainer, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
                lineNumber: 254,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
            lineNumber: 250,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/batch-actions/batch-edit-modal/batch-edit-modal.tsx",
        lineNumber: 199,
        columnNumber: 5
    }, undefined);
};
_s(BatchEditModal, "fJjSB+aanyTXSUqdVmAc2baZh5A=", true, function() {
    return [
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_10__.useAvailableColumns,
        _hooks_use_batch_edit__WEBPACK_IMPORTED_MODULE_11__.useBatchEdit,
        _Pimcore_components_form_form__WEBPACK_IMPORTED_MODULE_13__.Form.useForm,
        react_i18next__WEBPACK_IMPORTED_MODULE_14__.useTranslation,
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_15__.useAssetPatchByIdMutation,
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_15__.useAssetPatchFolderByIdMutation,
        _Pimcore_modules_element_listing_decorators_row_selection_context_layer_provider_use_row_selection__WEBPACK_IMPORTED_MODULE_17__.useRowSelection,
        _Pimcore_modules_execution_engine_hooks_useJobs__WEBPACK_IMPORTED_MODULE_19__.useJobs,
        _Pimcore_modules_element_hooks_use_element_context__WEBPACK_IMPORTED_MODULE_21__.useElementContext,
        _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_23__.useSettings,
        _Pimcore_modules_element_dynamic_types_resolver_hooks_use_dynamic_type_resolver__WEBPACK_IMPORTED_MODULE_24__.useDynamicTypeResolver,
        _Pimcore_modules_element_actions_refresh_grid_use_refresh_grid__WEBPACK_IMPORTED_MODULE_25__.useRefreshGrid
    ];
});
_c = BatchEditModal;
var _c;
$RefreshReg$(_c, "BatchEditModal");

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
"./js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/grid-config-inner.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GridConfigInner: () => (GridConfigInner)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _hooks_use_grid_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/hooks/use-grid-config.tsx");
/* ESM import */var _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _views_edit_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/views/edit-view.tsx");
/* ESM import */var _views_save_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/views/save-view.tsx");
/* ESM import */var antd_es_form_Form__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./node_modules/antd/es/form/hooks/useForm.js");
/* ESM import */var _forms_save_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/forms/save-form.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_user_roles_roles_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/user/roles/roles-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/user/user-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/selected-grid-config-id/use-selected-grid-config-id.ts");
/* ESM import */var _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/settings/use-settings.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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


















var ViewState = /*#__PURE__*/ function(ViewState) {
    ViewState["Edit"] = "edit";
    ViewState["Save"] = "save";
    ViewState["Update"] = "update";
    return ViewState;
}(ViewState || {});
const GridConfigInner = ()=>{
    _s();
    const { useElementId } = (0,_Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_16__.useSettings)();
    const { getAvailableColumnsDropdown } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_12__.useAvailableColumns)();
    const { selectedColumns, setSelectedColumns } = (0,_Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_13__.useSelectedColumns)();
    const { columns, setColumns, addColumn } = (0,_hooks_use_grid_config__WEBPACK_IMPORTED_MODULE_3__.useGridConfig)();
    const { getId } = useElementId();
    const userData = (0,_Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_4__.useUser)();
    const { id: selectedGridConfigId, setId: setSelectedGridConfigId } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_15__.useSelectedGridConfigId)();
    const { gridConfig, setGridConfig } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_14__.useGridConfig)();
    const { isLoading, isFetching, data } = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetGetSavedGridConfigurationsQuery)();
    const { data: roleList } = (0,_Pimcore_modules_user_roles_roles_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_10__.useRoleGetCollectionQuery)();
    const { data: userList } = (0,_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_11__.useUserGetCollectionQuery)();
    const { isFetching: gridConfigIsLoading } = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetGetGridConfigurationByFolderIdQuery)({
        folderId: getId(),
        configurationId: selectedGridConfigId
    });
    const [fetchSaveGridConfig, { isLoading: isSaveLoading, isError: isSaveGridConfigError, error: saveGridConfigError }] = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetSaveGridConfigurationMutation)();
    const [fetchUpdateGridConfig, { isLoading: isUpdating, isError: isUpdateGridConfigError, error: updateGridConfigError }] = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetUpdateGridConfigurationMutation)();
    const [fetchDeleteGridConfig, { isLoading: isDeleting, isError: isDeleteGridConfigError, error: deleteGridConfigError }] = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetDeleteGridConfigurationByConfigurationIdMutation)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isSaveGridConfigError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__.ApiError(saveGridConfigError));
        }
    }, [
        isSaveGridConfigError
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isUpdateGridConfigError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__.ApiError(updateGridConfigError));
        }
    }, [
        isUpdateGridConfigError
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isDeleteGridConfigError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__.ApiError(deleteGridConfigError));
        }
    }, [
        isDeleteGridConfigError
    ]);
    const [view, setView] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("edit");
    const [form] = (0,antd_es_form_Form__WEBPACK_IMPORTED_MODULE_18__["default"])();
    const isSavedConfiguration = (gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.name) !== 'Predefined' && gridConfig !== undefined;
    const savedGridConfigurations = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (data !== undefined) {
            var _data_items;
            return ((_data_items = data.items) === null || _data_items === void 0 ? void 0 : _data_items.map((item)=>{
                return {
                    key: item.id,
                    label: item.name,
                    onClick: ()=>{
                        setSelectedGridConfigId(item.id);
                    }
                };
            })) ?? [];
        }
        return [];
    }, [
        data
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setColumns(selectedColumns.map((column)=>{
            return {
                ...column.originalApiDefinition,
                locale: column === null || column === void 0 ? void 0 : column.locale
            };
        }));
    }, [
        selectedColumns
    ]);
    const onColumnClick = (column)=>{
        addColumn(column);
    };
    const availableColumnsDropdown = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>getAvailableColumnsDropdown(onColumnClick), [
        getAvailableColumnsDropdown,
        columns
    ]);
    const onDeleteClick = async ()=>{
        if (isSavedConfiguration) {
            await fetchDeleteGridConfig({
                configurationId: gridConfig.id
            }).then(()=>{
                setView("edit");
                setSelectedGridConfigId(undefined);
            });
        }
    };
    const onUpdatedConfigurationClick = async ()=>{
        if (gridConfig === undefined) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_17__.GeneralError('No grid configuration available'));
            return;
        }
        await fetchUpdateGridConfig({
            configurationId: gridConfig.id,
            body: {
                folderId: getId(),
                columns: prepareColumns(columns),
                name: gridConfig.name,
                description: gridConfig.description,
                setAsFavorite: gridConfig.setAsFavorite,
                shareGlobal: gridConfig.shareGlobal,
                sharedRoles: gridConfig.sharedRoles,
                sharedUsers: gridConfig.sharedUsers,
                saveFilter: false,
                pageSize: 0
            }
        });
    };
    function prepareColumns(columns) {
        return columns.map((column)=>({
                key: column.key,
                locale: column.locale ?? null,
                group: column.group
            }));
    }
    const onFormFinish = async (values)=>{
        const columnsToSave = prepareColumns(columns);
        const isShareGlobally = values.shareGlobally === true;
        // for global sharing the sharedUsers and sharedRoles need to be cleared
        // @todo Check if we really should modify the global grid config here...
        if (isShareGlobally && !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(gridConfig)) {
            setGridConfig({
                ...gridConfig,
                sharedUsers: [],
                sharedRoles: []
            });
        }
        if (view === "update" && isSavedConfiguration) {
            await fetchUpdateGridConfig({
                configurationId: gridConfig.id,
                body: {
                    folderId: getId(),
                    columns: columnsToSave,
                    name: values.name,
                    description: values.description,
                    setAsFavorite: values.setAsDefault,
                    shareGlobal: values.shareGlobally,
                    sharedRoles: gridConfig.sharedRoles,
                    sharedUsers: gridConfig.sharedUsers,
                    saveFilter: false,
                    pageSize: 0
                }
            }).then(()=>{
                setView("edit");
            });
        }
        if (view === "save") {
            await fetchSaveGridConfig({
                folderId: getId(),
                body: {
                    folderId: getId(),
                    columns: columnsToSave,
                    name: values.name,
                    description: values.description,
                    setAsFavorite: values.setAsDefault,
                    shareGlobal: values.shareGlobally,
                    sharedRoles: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.sharedRoles,
                    sharedUsers: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.sharedUsers,
                    saveFilter: false,
                    pageSize: 0
                }
            }).then((response)=>{
                if ((response === null || response === void 0 ? void 0 : response.data) !== undefined) {
                    setSelectedGridConfigId(response.data.id);
                    setView("edit");
                }
            });
        }
    };
    const onCancelClick = ()=>{
        setColumns(selectedColumns.map((column)=>column.originalApiDefinition));
    };
    const onApplyClick = ()=>{
        setSelectedColumns(columns.map((column)=>{
            return {
                key: column.key,
                locale: column.locale,
                type: column.type,
                config: column.config,
                sortable: column.sortable,
                editable: column.editable,
                localizable: column.localizable,
                exportable: column.exportable,
                frontendType: column.frontendType,
                group: column.group,
                originalApiDefinition: column
            };
        }));
    };
    if (gridConfigIsLoading || isDeleting) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_9__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/grid-config-inner.tsx",
            lineNumber: 239,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            view === "edit" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_views_edit_view__WEBPACK_IMPORTED_MODULE_6__.EditView, {
                addColumnMenu: availableColumnsDropdown.menu.items,
                columns: columns,
                currentUserId: userData === null || userData === void 0 ? void 0 : userData.id,
                gridConfig: gridConfig,
                isLoading: isLoading || isFetching,
                isUpdating: isUpdating,
                onApplyClick: onApplyClick,
                onCancelClick: onCancelClick,
                onEditConfigurationClick: ()=>{
                    setView("update");
                },
                onSaveConfigurationClick: ()=>{
                    setView("save");
                },
                onUpdateConfigurationClick: onUpdatedConfigurationClick,
                savedGridConfigurations: savedGridConfigurations
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/grid-config-inner.tsx",
                lineNumber: 245,
                columnNumber: 9
            }, undefined),
            (view === "save" || view === "update") && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_views_save_view__WEBPACK_IMPORTED_MODULE_7__.SaveView, {
                formProps: {
                    form,
                    onFinish: onFormFinish,
                    initialValues: view === "update" && isSavedConfiguration ? {
                        name: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.name,
                        description: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.description,
                        setAsDefault: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.setAsFavorite,
                        shareGlobally: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.shareGlobal
                    } : {
                        ..._forms_save_form__WEBPACK_IMPORTED_MODULE_8__.defaultValues
                    }
                },
                isDeleting: isDeleting,
                isLoading: isSaveLoading || isUpdating,
                modificationDate: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.modificationDate,
                onCancelClick: ()=>{
                    setView("edit");
                },
                onDeleteClick: isSavedConfiguration ? onDeleteClick : undefined,
                roleList: roleList,
                saveAsNewConfiguration: view === "save",
                userList: userList,
                userName: userData === null || userData === void 0 ? void 0 : userData.username
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/grid-config-inner.tsx",
                lineNumber: 264,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true);
};
_s(GridConfigInner, "nwGy4H+ZFfdrolup90kbHp8qDB4=", true, function() {
    return [
        _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_16__.useSettings,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_12__.useAvailableColumns,
        _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_13__.useSelectedColumns,
        _hooks_use_grid_config__WEBPACK_IMPORTED_MODULE_3__.useGridConfig,
        _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_4__.useUser,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_15__.useSelectedGridConfigId,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_14__.useGridConfig,
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetGetSavedGridConfigurationsQuery,
        _Pimcore_modules_user_roles_roles_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_10__.useRoleGetCollectionQuery,
        _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_11__.useUserGetCollectionQuery,
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetGetGridConfigurationByFolderIdQuery,
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetSaveGridConfigurationMutation,
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetUpdateGridConfigurationMutation,
        _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_5__.useAssetDeleteGridConfigurationByConfigurationIdMutation,
        antd_es_form_Form__WEBPACK_IMPORTED_MODULE_18__["default"]
    ];
});
_c = GridConfigInner;
var _c;
$RefreshReg$(_c, "GridConfigInner");

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
"./js/src/core/modules/asset/tree/context-menu/context-menu.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AssetTreeContextMenu: () => (AssetTreeContextMenu)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_element_tree_node_tree_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/element-tree/node/tree-node.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/actions/download/use-download.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_upload_new_version_upload_new_version__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/asset/actions/upload-new-version/upload-new-version.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_zip_download_use_zip_download__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/asset/actions/zip-download/use-zip-download.tsx");
/* ESM import */var _Pimcore_modules_element_actions_add_folder_use_add_folder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/actions/add-folder/use-add-folder.tsx");
/* ESM import */var _Pimcore_modules_element_actions_copy_paste_use_copy_paste__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/actions/copy-paste/use-copy-paste.tsx");
/* ESM import */var _Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/actions/delete/use-delete.tsx");
/* ESM import */var _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/actions/lock/use-lock.tsx");
/* ESM import */var _Pimcore_modules_element_actions_refresh_tree_use_refresh_tree__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/actions/refresh-tree/use-refresh-tree.tsx");
/* ESM import */var _Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/element/actions/rename/use-rename.tsx");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _actions_upload_use_upload__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/modules/asset/actions/upload/use-upload.tsx");
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



















const AssetTreeContextMenu = (props)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_18__.useTranslation)();
    const node = props.node ?? _Pimcore_components_element_tree_node_tree_node__WEBPACK_IMPORTED_MODULE_3__.defaultProps;
    const { createZipDownloadTreeContextMenuItem } = (0,_Pimcore_modules_asset_actions_zip_download_use_zip_download__WEBPACK_IMPORTED_MODULE_7__.useZipDownload)({
        type: 'folder'
    });
    const { addFolderTreeContextMenuItem } = (0,_Pimcore_modules_element_actions_add_folder_use_add_folder__WEBPACK_IMPORTED_MODULE_8__.useAddFolder)('asset');
    const { renameTreeContextMenuItem } = (0,_Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_13__.useRename)('asset', (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_14__.getElementActionCacheKey)('asset', 'rename', parseInt(node.id)));
    const { deleteTreeContextMenuItem } = (0,_Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_10__.useDelete)('asset', (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_14__.getElementActionCacheKey)('asset', 'delete', parseInt(node.id)));
    const { refreshTreeContextMenuItem } = (0,_Pimcore_modules_element_actions_refresh_tree_use_refresh_tree__WEBPACK_IMPORTED_MODULE_12__.useRefreshTree)('asset');
    const { downloadTreeContextMenuItem } = (0,_Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_5__.useDownload)();
    const { copyTreeContextMenuItem, cutTreeContextMenuItem, pasteTreeContextMenuItem, pasteCutContextMenuItem } = (0,_Pimcore_modules_element_actions_copy_paste_use_copy_paste__WEBPACK_IMPORTED_MODULE_9__.useCopyPaste)('asset');
    const { lockTreeContextMenuItem, lockAndPropagateTreeContextMenuItem, unlockTreeContextMenuItem, unlockAndPropagateTreeContextMenuItem, isLockMenuHidden } = (0,_Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_11__.useLock)('asset');
    const { uploadNewVersionTreeContextMenuItem } = (0,_Pimcore_modules_asset_actions_upload_new_version_upload_new_version__WEBPACK_IMPORTED_MODULE_6__.useUploadNewVersion)();
    const { uploadContextMenuItem, zipUploadContextMenuItem } = (0,_actions_upload_use_upload__WEBPACK_IMPORTED_MODULE_19__.useUpload)();
    const { isTreeActionAllowed } = (0,_Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_17__.useTreePermission)();
    const isUploadMenuHidden = isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_16__.TreePermission.HideAdd) || !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_16__.TreePermission.AddUpload) && !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_16__.TreePermission.AddUploadZip) || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_15__.checkElementPermission)(node.permissions, 'create') || (node === null || node === void 0 ? void 0 : node.type) !== 'folder';
    const items = [
        {
            label: t('element.tree.context-menu.new-assets'),
            key: 'new-assets',
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                value: 'asset'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/tree/context-menu/context-menu.tsx",
                lineNumber: 56,
                columnNumber: 13
            }, undefined),
            hidden: isUploadMenuHidden,
            children: [
                uploadContextMenuItem(node),
                zipUploadContextMenuItem(node)
            ]
        },
        addFolderTreeContextMenuItem(node),
        renameTreeContextMenuItem(node),
        copyTreeContextMenuItem(node),
        pasteTreeContextMenuItem(node),
        cutTreeContextMenuItem(node),
        pasteCutContextMenuItem(parseInt(node.id)),
        deleteTreeContextMenuItem(node),
        createZipDownloadTreeContextMenuItem(node),
        uploadNewVersionTreeContextMenuItem(node),
        downloadTreeContextMenuItem(node),
        {
            label: t('element.tree.context-menu.advanced'),
            key: 'advanced',
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                value: 'more'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/tree/context-menu/context-menu.tsx",
                lineNumber: 76,
                columnNumber: 13
            }, undefined),
            hidden: isLockMenuHidden(node),
            children: [
                {
                    label: t('element.lock'),
                    key: 'advanced-lock',
                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                        value: 'lock'
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/tree/context-menu/context-menu.tsx",
                        lineNumber: 82,
                        columnNumber: 17
                    }, undefined),
                    hidden: isLockMenuHidden(node),
                    children: [
                        lockTreeContextMenuItem(node),
                        lockAndPropagateTreeContextMenuItem(node),
                        unlockTreeContextMenuItem(node),
                        unlockAndPropagateTreeContextMenuItem(node)
                    ]
                }
            ]
        },
        refreshTreeContextMenuItem(node)
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
        menu: {
            items
        },
        trigger: [
            'contextMenu'
        ],
        children: props.children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/tree/context-menu/context-menu.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, undefined);
};
_s(AssetTreeContextMenu, "BOfIj4+tGEU1n7HsBDokdcrKS2w=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_18__.useTranslation,
        _Pimcore_modules_asset_actions_zip_download_use_zip_download__WEBPACK_IMPORTED_MODULE_7__.useZipDownload,
        _Pimcore_modules_element_actions_add_folder_use_add_folder__WEBPACK_IMPORTED_MODULE_8__.useAddFolder,
        _Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_13__.useRename,
        _Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_10__.useDelete,
        _Pimcore_modules_element_actions_refresh_tree_use_refresh_tree__WEBPACK_IMPORTED_MODULE_12__.useRefreshTree,
        _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_5__.useDownload,
        _Pimcore_modules_element_actions_copy_paste_use_copy_paste__WEBPACK_IMPORTED_MODULE_9__.useCopyPaste,
        _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_11__.useLock,
        _Pimcore_modules_asset_actions_upload_new_version_upload_new_version__WEBPACK_IMPORTED_MODULE_6__.useUploadNewVersion,
        _actions_upload_use_upload__WEBPACK_IMPORTED_MODULE_19__.useUpload,
        _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_17__.useTreePermission
    ];
});
_c = AssetTreeContextMenu;
var _c;
$RefreshReg$(_c, "AssetTreeContextMenu");

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
"./js/src/core/modules/asset/tree/node/with-draggable.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withDraggable: () => (withDraggable)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_drag_and_drop_draggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/drag-and-drop/draggable.tsx");
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


const withDraggable = (Component)=>{
    const DraggableNodeContent = (props, ref)=>{
        var _props_metaData, _props_metaData1;
        const metaData = (_props_metaData = props.metaData) === null || _props_metaData === void 0 ? void 0 : _props_metaData.asset;
        if (((_props_metaData1 = props.metaData) === null || _props_metaData1 === void 0 ? void 0 : _props_metaData1.asset) === undefined) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                ...props,
                ref: ref
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/tree/node/with-draggable.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_draggable__WEBPACK_IMPORTED_MODULE_2__.Draggable, {
            info: {
                icon: metaData.icon.value,
                title: metaData.filename,
                type: 'asset',
                data: {
                    ...metaData
                }
            },
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                ...props,
                ref: ref
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/tree/node/with-draggable.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/tree/node/with-draggable.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, undefined);
    };
    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(DraggableNodeContent);
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
"./js/src/core/modules/asset/tree/tree-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AssetTreeNode: () => (AssetTreeNode),
  TreeContainer: () => (TreeContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_element_tree_element_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/element-tree/element-tree.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_element_tree_node_tree_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/element-tree/node/tree-node.tsx");
/* ESM import */var _Pimcore_modules_element_tree_pager_pager_container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/tree/pager/pager-container.tsx");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-helper.ts");
/* ESM import */var _search_search_container__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/asset/tree/search/search-container.tsx");
/* ESM import */var _node_with_draggable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/asset/tree/node/with-draggable.tsx");
/* ESM import */var _Pimcore_components_element_tree_skeleton_skeleton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/element-tree/skeleton/skeleton.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _node_with_droppable_with_droppable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/asset/tree/node/with-droppable/with-droppable.tsx");
/* ESM import */var _node_with_action_states__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/asset/tree/node/with-action-states.tsx");
/* ESM import */var _Pimcore_modules_element_tree_node_with_droppable_with_droppable_styling__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/tree/node/with-droppable/with-droppable-styling.tsx");
/* ESM import */var _Pimcore_components_element_tree_hooks_use_element_tree_root_node__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/element-tree/hooks/use-element-tree-root-node.ts");
/* ESM import */var _Pimcore_modules_app_component_registry_use_component_registry__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/app/component-registry/use-component-registry.ts");
/* ESM import */var _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/app/component-registry/component-config.ts");
/* ESM import */var _node_with_dnd_upload__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/asset/tree/node/with-dnd-upload.tsx");
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
















const AssetTreeNode = (0,_node_with_dnd_upload__WEBPACK_IMPORTED_MODULE_16__.withDndUpload)(_c3 = (0,_Pimcore_modules_element_tree_node_with_droppable_with_droppable_styling__WEBPACK_IMPORTED_MODULE_12__.withDroppableStyling)(_c2 = (0,_node_with_droppable_with_droppable__WEBPACK_IMPORTED_MODULE_10__.withDroppable)(_c1 = (0,_node_with_action_states__WEBPACK_IMPORTED_MODULE_11__.withActionStates)(_c = (0,_node_with_draggable__WEBPACK_IMPORTED_MODULE_7__.withDraggable)(_Pimcore_components_element_tree_node_tree_node__WEBPACK_IMPORTED_MODULE_3__.TreeNode)))));
_c4 = AssetTreeNode;
const TreeContainer = (param)=>{
    let { id = 1, showRoot = true } = param;
    _s();
    const { openAsset } = (0,_Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_5__.useAssetHelper)();
    const { rootNode, isLoading } = (0,_Pimcore_components_element_tree_hooks_use_element_tree_root_node__WEBPACK_IMPORTED_MODULE_13__.useElementTreeRootNode)(id, showRoot);
    const componentRegistry = (0,_Pimcore_modules_app_component_registry_use_component_registry__WEBPACK_IMPORTED_MODULE_14__.useComponentRegistry)();
    const contextMenu = componentRegistry.get(_Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_15__.componentConfig.asset.tree.contextMenu.name);
    if (showRoot && isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_9__.Box, {
            padding: 'small',
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_element_tree_skeleton_skeleton__WEBPACK_IMPORTED_MODULE_8__.Skeleton, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/tree/tree-container.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/tree/tree-container.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, undefined);
    }
    async function onSelect(node) {
        openAsset({
            config: {
                id: parseInt(node.id)
            }
        });
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_element_tree_element_tree__WEBPACK_IMPORTED_MODULE_1__.ElementTree, {
        contextMenu: contextMenu,
        nodeId: id,
        onSelect: onSelect,
        renderFilter: _search_search_container__WEBPACK_IMPORTED_MODULE_6__.SearchContainer,
        renderNode: AssetTreeNode,
        renderNodeContent: _Pimcore_components_element_tree_element_tree__WEBPACK_IMPORTED_MODULE_1__.defaultProps.renderNodeContent,
        renderPager: _Pimcore_modules_element_tree_pager_pager_container__WEBPACK_IMPORTED_MODULE_4__.PagerContainer,
        rootNode: rootNode,
        showRoot: showRoot
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/tree/tree-container.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, undefined);
};
_s(TreeContainer, "WjgSK0xccPhg+JKCYVYp8xc73IA=", false, function() {
    return [
        _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_5__.useAssetHelper,
        _Pimcore_components_element_tree_hooks_use_element_tree_root_node__WEBPACK_IMPORTED_MODULE_13__.useElementTreeRootNode,
        _Pimcore_modules_app_component_registry_use_component_registry__WEBPACK_IMPORTED_MODULE_14__.useComponentRegistry
    ];
});
_c5 = TreeContainer;

var _c, _c1, _c2, _c3, _c4, _c5;
$RefreshReg$(_c, "AssetTreeNode$withDndUpload$withDroppableStyling$withDroppable$withActionStates");
$RefreshReg$(_c1, "AssetTreeNode$withDndUpload$withDroppableStyling$withDroppable");
$RefreshReg$(_c2, "AssetTreeNode$withDndUpload$withDroppableStyling");
$RefreshReg$(_c3, "AssetTreeNode$withDndUpload");
$RefreshReg$(_c4, "AssetTreeNode");
$RefreshReg$(_c5, "TreeContainer");

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
  transformApiDataToNodes: () => (transformApiDataToNodes)
});
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
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

const transformApiDataToNodes = (node, data, maxItemsPerNode)=>{
    const nodes = [];
    const assetData = data.items;
    assetData.forEach((assetNode)=>{
        nodes.push({
            id: assetNode.id.toString(),
            elementType: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__.elementTypes.asset,
            icon: (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__.getElementIcon)(assetNode, {
                type: 'name',
                value: 'unknown'
            }),
            label: assetNode.filename,
            type: assetNode.type,
            parentId: assetNode.parentId.toString(),
            hasChildren: assetNode.hasChildren,
            locked: assetNode.locked,
            isLocked: assetNode.isLocked,
            metaData: {
                asset: assetNode
            },
            permissions: assetNode.permissions ?? [],
            internalKey: `${node.internalKey}-${assetNode.id}`
        });
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
"./js/src/core/modules/auth/authorization-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useLoginMutation: () => (useLoginMutation),
  useLogoutMutation: () => (useLogoutMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Authorization"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            login: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/login`,
                        method: "POST",
                        body: queryArg.credentials
                    }),
                invalidatesTags: [
                    "Authorization"
                ]
            }),
            logout: build.mutation({
                query: ()=>({
                        url: `/pimcore-studio/api/logout`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Authorization"
                ]
            })
        }),
    overrideExisting: false
});

const { useLoginMutation, useLogoutMutation } = injectedRtkApi;

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
"./js/src/core/modules/auth/user/user-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  usePimcoreStudioApiUserSearchQuery: () => (usePimcoreStudioApiUserSearchQuery),
  useUserCloneByIdMutation: () => (useUserCloneByIdMutation),
  useUserCreateMutation: () => (useUserCreateMutation),
  useUserDefaultKeyBindingsQuery: () => (useUserDefaultKeyBindingsQuery),
  useUserDeleteByIdMutation: () => (useUserDeleteByIdMutation),
  useUserFolderCreateMutation: () => (useUserFolderCreateMutation),
  useUserFolderDeleteByIdMutation: () => (useUserFolderDeleteByIdMutation),
  useUserGetAvailablePermissionsQuery: () => (useUserGetAvailablePermissionsQuery),
  useUserGetByIdQuery: () => (useUserGetByIdQuery),
  useUserGetCollectionQuery: () => (useUserGetCollectionQuery),
  useUserGetCurrentInformationQuery: () => (useUserGetCurrentInformationQuery),
  useUserGetImageQuery: () => (useUserGetImageQuery),
  useUserGetTreeQuery: () => (useUserGetTreeQuery),
  useUserResetPasswordMutation: () => (useUserResetPasswordMutation),
  useUserUpdateActivePerspectiveMutation: () => (useUserUpdateActivePerspectiveMutation),
  useUserUpdateByIdMutation: () => (useUserUpdateByIdMutation),
  useUserUpdatePasswordByIdMutation: () => (useUserUpdatePasswordByIdMutation),
  useUserUpdateProfileMutation: () => (useUserUpdateProfileMutation),
  useUserUploadImageMutation: () => (useUserUploadImageMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "User Management"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            userCloneById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/clone/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userFolderCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/folder`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userGetCurrentInformation: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/user/current-user-information`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updateUser
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userFolderDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/folder/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userDefaultKeyBindings: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/users/default-key-bindings`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetAvailablePermissions: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/user/available-permissions`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/users`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userResetPassword: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/reset-password`,
                        method: "POST",
                        body: queryArg.resetPassword
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            pimcoreStudioApiUserSearch: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/search`,
                        params: {
                            searchQuery: queryArg.searchQuery
                        }
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userUpdateActivePerspective: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/active-perspective/${queryArg.perspectiveId}`,
                        method: "PUT"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUpdatePasswordById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}/password`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUpdateProfile: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/update-profile`,
                        method: "PUT",
                        body: queryArg.updateUserProfile
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUploadImage: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/upload-image/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userGetImage: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/image/${queryArg.id}`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/users/tree`,
                        params: {
                            parentId: queryArg.parentId
                        }
                    }),
                providesTags: [
                    "User Management"
                ]
            })
        }),
    overrideExisting: false
});

const { useUserCloneByIdMutation, useUserCreateMutation, useUserFolderCreateMutation, useUserGetCurrentInformationQuery, useUserGetByIdQuery, useUserUpdateByIdMutation, useUserDeleteByIdMutation, useUserFolderDeleteByIdMutation, useUserDefaultKeyBindingsQuery, useUserGetAvailablePermissionsQuery, useUserGetCollectionQuery, useUserResetPasswordMutation, usePimcoreStudioApiUserSearchQuery, useUserUpdateActivePerspectiveMutation, useUserUpdatePasswordByIdMutation, useUserUpdateProfileMutation, useUserUploadImageMutation, useUserGetImageQuery, useUserGetTreeQuery } = injectedRtkApi;

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
"./js/src/core/modules/auth/user/user-slice.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  selectCurrentUser: () => (selectCurrentUser),
  setUser: () => (setUser),
  userSliceName: () => (userSliceName)
});
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
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

// The logic dependency is in the rtkQueryErrorLogger middleware
const initialState = {
    id: 0,
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    permissions: [],
    isAdmin: false,
    classes: [],
    docTypes: [],
    language: 'en',
    activePerspective: 0,
    perspectives: [],
    dateTimeLocale: '',
    welcomeScreen: false,
    memorizeTabs: false,
    hasImage: false,
    contentLanguages: [],
    keyBindings: []
};
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, param)=>{
            let { payload } = param;
            return {
                ...state,
                ...payload
            };
        }
    }
});
const userSliceName = slice.name;
(0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.injectSliceWithState)(slice);
const { setUser } = slice.actions;
const selectCurrentUser = (state)=>state.auth;

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
"./js/src/core/modules/class-definition/class-definition-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useClassCustomLayoutCollectionQuery: () => (useClassCustomLayoutCollectionQuery),
  useClassCustomLayoutEditorCollectionQuery: () => (useClassCustomLayoutEditorCollectionQuery),
  useClassDefinitionCollectionQuery: () => (useClassDefinitionCollectionQuery),
  useClassDefinitionFolderCollectionQuery: () => (useClassDefinitionFolderCollectionQuery),
  useClassDefinitionGetQuery: () => (useClassDefinitionGetQuery),
  useClassFieldCollectionObjectLayoutQuery: () => (useClassFieldCollectionObjectLayoutQuery),
  useClassObjectBrickObjectLayoutQuery: () => (useClassObjectBrickObjectLayoutQuery),
  usePimcoreStudioApiClassCustomLayoutCreateMutation: () => (usePimcoreStudioApiClassCustomLayoutCreateMutation),
  usePimcoreStudioApiClassCustomLayoutDeleteMutation: () => (usePimcoreStudioApiClassCustomLayoutDeleteMutation),
  usePimcoreStudioApiClassCustomLayoutExportQuery: () => (usePimcoreStudioApiClassCustomLayoutExportQuery),
  usePimcoreStudioApiClassCustomLayoutGetQuery: () => (usePimcoreStudioApiClassCustomLayoutGetQuery),
  usePimcoreStudioApiClassCustomLayoutImportMutation: () => (usePimcoreStudioApiClassCustomLayoutImportMutation),
  usePimcoreStudioApiClassCustomLayoutUpdateMutation: () => (usePimcoreStudioApiClassCustomLayoutUpdateMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Class Definition"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            classDefinitionCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/class/collection`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classCustomLayoutCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/collection/${queryArg.dataObjectClass}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/${queryArg.customLayoutId}`,
                        method: "POST",
                        body: queryArg.customLayoutNew
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutGet: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`,
                        method: "PUT",
                        body: queryArg.customLayoutUpdate
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/${queryArg.customLayoutId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classCustomLayoutEditorCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/editor/collection/${queryArg.objectId}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutExport: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/export/${queryArg.customLayoutId}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            pimcoreStudioApiClassCustomLayoutImport: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/custom-layout/import/${queryArg.customLayoutId}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Class Definition"
                ]
            }),
            classFieldCollectionObjectLayout: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/field-collection/${queryArg.objectId}/object/layout`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionFolderCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/folder/${queryArg.folderId}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classDefinitionGet: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/definition/${queryArg.dataObjectClass}`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            }),
            classObjectBrickObjectLayout: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/class/object-brick/${queryArg.objectId}/object/layout`
                    }),
                providesTags: [
                    "Class Definition"
                ]
            })
        }),
    overrideExisting: false
});

const { useClassDefinitionCollectionQuery, useClassCustomLayoutCollectionQuery, usePimcoreStudioApiClassCustomLayoutCreateMutation, usePimcoreStudioApiClassCustomLayoutGetQuery, usePimcoreStudioApiClassCustomLayoutUpdateMutation, usePimcoreStudioApiClassCustomLayoutDeleteMutation, useClassCustomLayoutEditorCollectionQuery, usePimcoreStudioApiClassCustomLayoutExportQuery, usePimcoreStudioApiClassCustomLayoutImportMutation, useClassFieldCollectionObjectLayoutQuery, useClassDefinitionFolderCollectionQuery, useClassDefinitionGetQuery, useClassObjectBrickObjectLayoutQuery } = injectedRtkApi;

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
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var _Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice.gen.ts");
/* ESM import */var _hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-helper.ts");
/* ESM import */var _utils_provider_class_defintions_use_class_definitions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/data-object/utils/provider/class-defintions/use-class-definitions.tsx");
/* ESM import */var _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
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















const useAddObject = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation)();
    const modal = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__.useFormModal)();
    const [addDataObjectMutation] = (0,_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_12__.useDataObjectAddMutation)();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.useAppDispatch)();
    const { openDataObject } = (0,_hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_13__.useDataObjectHelper)();
    const { isTreeActionAllowed } = (0,_Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_7__.useTreePermission)();
    const { getClassDefinitionsForCurrentUser } = (0,_utils_provider_class_defintions_use_class_definitions__WEBPACK_IMPORTED_MODULE_14__.useClassDefinitions)();
    const getClassEntries = (node)=>{
        let classHierarchy = [];
        const classDefinitions = getClassDefinitionsForCurrentUser();
        const structuredClassDefinitions = [
            ...classDefinitions
        ].sort((a, b)=>a.name.localeCompare(b.name)).reduce((acc, classDefinition)=>{
            const groupName = (0,lodash__WEBPACK_IMPORTED_MODULE_9__.isEmpty)(classDefinition.group) ? 'undefined' : classDefinition.group;
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
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                        lineNumber: 74,
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
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                lineNumber: 89,
                columnNumber: 11
            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                subIconName: "new",
                subIconVariant: 'green',
                ...classDefinition.icon
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                lineNumber: 96,
                columnNumber: 11
            }, undefined),
            onClick: ()=>{
                const parentId = parseInt(node.id);
                createDataObject(classDefinition, parentId);
            }
        };
    };
    const createDataObject = (classDefinition, parentId, onFinish)=>{
        modal.input({
            title: t('data-object.create-data-object', {
                className: classDefinition.name
            }),
            label: t('form.label.new-item'),
            rule: {
                required: true,
                message: t('form.validation.required')
            },
            onOk: async (value)=>{
                await createDataObjectMutation(classDefinition.id, value, parentId);
                onFinish === null || onFinish === void 0 ? void 0 : onFinish(value);
            }
        });
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
        return !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_8__.TreePermission.Add) || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_6__.checkElementPermission)(node.permissions, 'create') || (0,lodash__WEBPACK_IMPORTED_MODULE_9__.isEmpty)(getClassDefinitionsForCurrentUser());
    };
    const addObjectTreeContextMenuItem = (node)=>{
        return {
            label: t('data-object.tree.context-menu.add-object'),
            key: _Pimcore_modules_element_actions__WEBPACK_IMPORTED_MODULE_15__.ContextMenuActionName.addObject,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                value: 'folder'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/actions/add-object/use-add-object.tsx",
                lineNumber: 168,
                columnNumber: 13
            }, undefined),
            hidden: isAddObjectHidden(node),
            children: getClassEntries(node)
        };
    };
    return {
        addObjectTreeContextMenuItem
    };
};
_s(useAddObject, "XBKjbXtzxpwzlZN8G+HvPOaTqVs=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_11__.useTranslation,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_4__.useFormModal,
        _data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_12__.useDataObjectAddMutation,
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.useAppDispatch,
        _hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_13__.useDataObjectHelper,
        _Pimcore_modules_element_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_7__.useTreePermission,
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
"./js/src/core/modules/data-object/classification-store/classification-store-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useClassificationStoreGetCollectionsQuery: () => (useClassificationStoreGetCollectionsQuery),
  useClassificationStoreGetGroupsQuery: () => (useClassificationStoreGetGroupsQuery),
  useClassificationStoreGetKeyGroupRelationsQuery: () => (useClassificationStoreGetKeyGroupRelationsQuery),
  useClassificationStoreGetLayoutByCollectionQuery: () => (useClassificationStoreGetLayoutByCollectionQuery),
  useClassificationStoreGetLayoutByGroupQuery: () => (useClassificationStoreGetLayoutByGroupQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Classification Store"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            classificationStoreGetCollections: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/classification-store/collections`,
                        params: {
                            storeId: queryArg.storeId,
                            objectId: queryArg.objectId,
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            fieldName: queryArg.fieldName,
                            searchTerm: queryArg.searchTerm
                        }
                    }),
                providesTags: [
                    "Classification Store"
                ]
            }),
            classificationStoreGetGroups: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/classification-store/groups`,
                        params: {
                            storeId: queryArg.storeId,
                            objectId: queryArg.objectId,
                            searchTerm: queryArg.searchTerm,
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            fieldName: queryArg.fieldName
                        }
                    }),
                providesTags: [
                    "Classification Store"
                ]
            }),
            classificationStoreGetKeyGroupRelations: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/classification-store/key-group-relations`,
                        params: {
                            storeId: queryArg.storeId,
                            objectId: queryArg.objectId,
                            searchTerm: queryArg.searchTerm,
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            fieldName: queryArg.fieldName
                        }
                    }),
                providesTags: [
                    "Classification Store"
                ]
            }),
            classificationStoreGetLayoutByCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/classification-store/layout-by-collection/${queryArg.collectionId}`,
                        params: {
                            objectId: queryArg.objectId,
                            fieldName: queryArg.fieldName
                        }
                    }),
                providesTags: [
                    "Classification Store"
                ]
            }),
            classificationStoreGetLayoutByGroup: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/classification-store/layout-by-group/${queryArg.groupId}`,
                        params: {
                            objectId: queryArg.objectId,
                            fieldName: queryArg.fieldName
                        }
                    }),
                providesTags: [
                    "Classification Store"
                ]
            })
        }),
    overrideExisting: false
});

const { useClassificationStoreGetCollectionsQuery, useClassificationStoreGetGroupsQuery, useClassificationStoreGetKeyGroupRelationsQuery, useClassificationStoreGetLayoutByCollectionQuery, useClassificationStoreGetLayoutByGroupQuery } = injectedRtkApi;

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
"./js/src/core/modules/data-object/data-object-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useDataObjectAddMutation: () => (useDataObjectAddMutation),
  useDataObjectCloneMutation: () => (useDataObjectCloneMutation),
  useDataObjectDeleteGridConfigurationByConfigurationIdMutation: () => (useDataObjectDeleteGridConfigurationByConfigurationIdMutation),
  useDataObjectFormatPathMutation: () => (useDataObjectFormatPathMutation),
  useDataObjectGetAvailableGridColumnsQuery: () => (useDataObjectGetAvailableGridColumnsQuery),
  useDataObjectGetByIdQuery: () => (useDataObjectGetByIdQuery),
  useDataObjectGetGridConfigurationQuery: () => (useDataObjectGetGridConfigurationQuery),
  useDataObjectGetGridQuery: () => (useDataObjectGetGridQuery),
  useDataObjectGetLayoutByIdQuery: () => (useDataObjectGetLayoutByIdQuery),
  useDataObjectGetSelectOptionsMutation: () => (useDataObjectGetSelectOptionsMutation),
  useDataObjectGetTreeQuery: () => (useDataObjectGetTreeQuery),
  useDataObjectListSavedGridConfigurationsQuery: () => (useDataObjectListSavedGridConfigurationsQuery),
  useDataObjectPatchByIdMutation: () => (useDataObjectPatchByIdMutation),
  useDataObjectPatchFolderByIdMutation: () => (useDataObjectPatchFolderByIdMutation),
  useDataObjectPreviewByIdQuery: () => (useDataObjectPreviewByIdQuery),
  useDataObjectReplaceContentMutation: () => (useDataObjectReplaceContentMutation),
  useDataObjectSaveGridConfigurationMutation: () => (useDataObjectSaveGridConfigurationMutation),
  useDataObjectSetGridConfigurationAsFavoriteMutation: () => (useDataObjectSetGridConfigurationAsFavoriteMutation),
  useDataObjectUpdateByIdMutation: () => (useDataObjectUpdateByIdMutation),
  useDataObjectUpdateGridConfigurationMutation: () => (useDataObjectUpdateGridConfigurationMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Data Objects",
    "Data Object Grid"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            dataObjectAdd: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/add/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.dataObjectAddParameters
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectClone: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/${queryArg.id}/clone/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.cloneParameters
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/${queryArg.id}`
                    }),
                providesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectDeleteGridConfigurationByConfigurationId: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configuration/${queryArg.configurationId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectGetGridConfiguration: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configuration/${queryArg.folderId}/${queryArg.classId}`,
                        params: {
                            configurationId: queryArg.configurationId
                        }
                    }),
                providesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectListSavedGridConfigurations: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configurations/${queryArg.classId}`
                    }),
                providesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectSaveGridConfiguration: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configuration/save/${queryArg.classId}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectSetGridConfigurationAsFavorite: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configuration/set-as-favorite/${queryArg.configurationId}/${queryArg.folderId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectUpdateGridConfiguration: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/configuration/update/${queryArg.configurationId}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectGetAvailableGridColumns: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-object/grid/available-columns`,
                        params: {
                            classId: queryArg.classId,
                            folderId: queryArg.folderId
                        }
                    }),
                providesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectGetGrid: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/grid/${queryArg.classId}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Data Object Grid"
                ]
            }),
            dataObjectGetLayoutById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/${queryArg.id}/layout/${queryArg.layoutId}`
                    }),
                providesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectPatchById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects`,
                        method: "PATCH",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectPatchFolderById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/folder`,
                        method: "PATCH",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectFormatPath: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/format-path`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectPreviewById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/preview/${queryArg.id}`,
                        params: {
                            site: queryArg.site
                        }
                    }),
                providesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectReplaceContent: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/${queryArg.sourceId}/replace/${queryArg.targetId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectGetSelectOptions: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/select-options`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Data Objects"
                ]
            }),
            dataObjectGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/data-objects/tree`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            parentId: queryArg.parentId,
                            idSearchTerm: queryArg.idSearchTerm,
                            pqlQuery: queryArg.pqlQuery,
                            excludeFolders: queryArg.excludeFolders,
                            path: queryArg.path,
                            pathIncludeParent: queryArg.pathIncludeParent,
                            pathIncludeDescendants: queryArg.pathIncludeDescendants,
                            className: queryArg.className,
                            classIds: queryArg.classIds
                        }
                    }),
                providesTags: [
                    "Data Objects"
                ]
            })
        }),
    overrideExisting: false
});

const { useDataObjectAddMutation, useDataObjectCloneMutation, useDataObjectGetByIdQuery, useDataObjectUpdateByIdMutation, useDataObjectDeleteGridConfigurationByConfigurationIdMutation, useDataObjectGetGridConfigurationQuery, useDataObjectListSavedGridConfigurationsQuery, useDataObjectSaveGridConfigurationMutation, useDataObjectSetGridConfigurationAsFavoriteMutation, useDataObjectUpdateGridConfigurationMutation, useDataObjectGetAvailableGridColumnsQuery, useDataObjectGetGridQuery, useDataObjectGetLayoutByIdQuery, useDataObjectPatchByIdMutation, useDataObjectPatchFolderByIdMutation, useDataObjectFormatPathMutation, useDataObjectPreviewByIdQuery, useDataObjectReplaceContentMutation, useDataObjectGetSelectOptionsMutation, useDataObjectGetTreeQuery } = injectedRtkApi;

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
"./js/src/core/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getBreadcrumbTitle: () => (getBreadcrumbTitle),
  getFormattedDataStructure: () => (getFormattedDataStructure),
  versionsDataToTableData: () => (versionsDataToTableData)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/utils/date-time.ts");
/* ESM import */var _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/utils/type-utils.ts");
/* ESM import */var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/editor/shared-tab-manager/tabs/versions/types.ts");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_constants_typesList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/constants/typesList.ts");
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




const isFieldValueEmpty = (fieldValue)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isObject)(fieldValue)) {
        return (0,lodash__WEBPACK_IMPORTED_MODULE_0__.every)(fieldValue, _Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_2__.isEmptyValue);
    }
    return (0,_Pimcore_utils_type_utils__WEBPACK_IMPORTED_MODULE_2__.isEmptyValue)(fieldValue);
};
const getBreadcrumbTitle = (value1, value2)=>{
    return [
        value1,
        value2
    ].filter(Boolean).join('/');
};
const fieldTypesRequiringChildren = [
    _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_constants_typesList__WEBPACK_IMPORTED_MODULE_4__.DynamicTypesList.BLOCK
];
const getFormattedDataStructure = async (param)=>{
    let { objectId, layout, versionData, versionId, versionCount, objectDataRegistry, layoutsList, setLayoutsList } = param;
    const formattedSystemData = {
        fullPath: versionData.fullPath,
        creationDate: (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_1__.formatDateTime)({
            timestamp: versionData.creationDate ?? null,
            dateStyle: 'short',
            timeStyle: 'medium'
        }),
        modificationDate: (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_1__.formatDateTime)({
            timestamp: versionData.modificationDate ?? null,
            dateStyle: 'short',
            timeStyle: 'medium'
        })
    };
    const processLayoutData = async (param)=>{
        let { data, objectValuesData = versionData === null || versionData === void 0 ? void 0 : versionData.objectData, fieldBreadcrumbTitle = '' } = param;
        const promises = data.map(async (item)=>{
            if (item.datatype === _types__WEBPACK_IMPORTED_MODULE_3__.DATATYPE_LIST.LAYOUT) {
                const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, item.title);
                return await processLayoutData({
                    data: item.children,
                    fieldBreadcrumbTitle: breadcrumbTitle,
                    objectValuesData
                });
            }
            if (item.datatype === _types__WEBPACK_IMPORTED_MODULE_3__.DATATYPE_LIST.DATA) {
                const fieldName = item.name;
                const fieldValueByName = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.get)(objectValuesData, fieldName);
                const currentFieldType = item.fieldtype;
                if (!objectDataRegistry.hasDynamicType(currentFieldType)) {
                    return [];
                }
                const objectDataType = objectDataRegistry.getDynamicType(currentFieldType);
                const processedDataList = await objectDataType.processVersionFieldData({
                    objectId,
                    item,
                    fieldBreadcrumbTitle,
                    fieldValueByName,
                    versionId,
                    versionCount,
                    layoutsList,
                    setLayoutsList
                });
                const processedPromises = processedDataList === null || processedDataList === void 0 ? void 0 : processedDataList.map(async (processedDataItem)=>{
                    var _processedDataItem_fieldData, _processedDataItem_fieldData1;
                    objectValuesData = {};
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(processedDataItem === null || processedDataItem === void 0 ? void 0 : (_processedDataItem_fieldData = processedDataItem.fieldData) === null || _processedDataItem_fieldData === void 0 ? void 0 : _processedDataItem_fieldData.children) && !fieldTypesRequiringChildren.includes(processedDataItem === null || processedDataItem === void 0 ? void 0 : (_processedDataItem_fieldData1 = processedDataItem.fieldData) === null || _processedDataItem_fieldData1 === void 0 ? void 0 : _processedDataItem_fieldData1.fieldtype)) {
                        var _processedDataItem_fieldData2, _processedDataItem_fieldData3;
                        const breadcrumbTitle = getBreadcrumbTitle(fieldBreadcrumbTitle, processedDataItem === null || processedDataItem === void 0 ? void 0 : (_processedDataItem_fieldData2 = processedDataItem.fieldData) === null || _processedDataItem_fieldData2 === void 0 ? void 0 : _processedDataItem_fieldData2.title);
                        return await processLayoutData({
                            data: [
                                processedDataItem === null || processedDataItem === void 0 ? void 0 : processedDataItem.fieldData
                            ],
                            objectValuesData: {
                                ...objectValuesData,
                                [processedDataItem === null || processedDataItem === void 0 ? void 0 : (_processedDataItem_fieldData3 = processedDataItem.fieldData) === null || _processedDataItem_fieldData3 === void 0 ? void 0 : _processedDataItem_fieldData3.name]: processedDataItem === null || processedDataItem === void 0 ? void 0 : processedDataItem.fieldValue
                            },
                            fieldBreadcrumbTitle: breadcrumbTitle
                        });
                    }
                    return [
                        processedDataItem
                    ];
                });
                return (await Promise.all(processedPromises)).flatMap((item)=>item);
            }
            return [];
        });
        return (await Promise.all(promises)).flatMap((item)=>item);
    };
    const getGeneralSystemData = ()=>{
        const result = [];
        Object.entries(formattedSystemData).forEach((param)=>{
            let [key, value] = param;
            result.push({
                fieldBreadcrumbTitle: 'systemData',
                fieldData: {
                    title: key,
                    name: key,
                    fieldtype: 'input'
                },
                fieldValue: value,
                versionId,
                versionCount
            });
        });
        return result;
    };
    const layoutData = await processLayoutData({
        data: layout
    });
    const generalSystemData = getGeneralSystemData();
    return [
        ...generalSystemData,
        ...layoutData
    ];
};
const versionsDataToTableData = (param)=>{
    let { data } = param;
    const resultList = [];
    const mainVersionData = data[0] ?? [];
    const compareVersionData = data[1] ?? [];
    const isComparisonMode = !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(compareVersionData);
    for(let index = 0; index < mainVersionData.length; index++){
        const mainVersionItem = mainVersionData[index];
        const compareVersionItem = compareVersionData[index];
        const isEmptyField = isFieldValueEmpty(mainVersionItem === null || mainVersionItem === void 0 ? void 0 : mainVersionItem.fieldValue) && isFieldValueEmpty(compareVersionItem === null || compareVersionItem === void 0 ? void 0 : compareVersionItem.fieldValue);
        if (isEmptyField) {
            continue;
        }
        const hasCompareVersion = !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(compareVersionItem);
        const field = {
            Field: {
                fieldBreadcrumbTitle: mainVersionItem === null || mainVersionItem === void 0 ? void 0 : mainVersionItem.fieldBreadcrumbTitle,
                ...mainVersionItem === null || mainVersionItem === void 0 ? void 0 : mainVersionItem.fieldData
            }
        };
        // Set the field for the main version count
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(mainVersionItem)) {
            field[`Version ${mainVersionItem.versionCount}`] = mainVersionItem.fieldValue;
        } else if (hasCompareVersion) {
            field[`Version ${compareVersionItem.versionCount}`] = null;
        }
        // Set the field for the compare version count
        if (hasCompareVersion) {
            field[`Version ${compareVersionItem.versionCount}`] = compareVersionItem.fieldValue ?? null;
        }
        if (isComparisonMode && !(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEqual)(mainVersionItem === null || mainVersionItem === void 0 ? void 0 : mainVersionItem.fieldValue, compareVersionItem === null || compareVersionItem === void 0 ? void 0 : compareVersionItem.fieldValue)) {
            var _mainVersionItem_fieldData;
            field.isModifiedValue = true;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if ((mainVersionItem === null || mainVersionItem === void 0 ? void 0 : (_mainVersionItem_fieldData = mainVersionItem.fieldData) === null || _mainVersionItem_fieldData === void 0 ? void 0 : _mainVersionItem_fieldData.fieldtype) === _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_constants_typesList__WEBPACK_IMPORTED_MODULE_4__.DynamicTypesList.FIELD_COLLECTIONS) {
                var _mainVersionItem_fieldValue, _compareVersionItem_fieldValue;
                const mainVersionLength = mainVersionItem === null || mainVersionItem === void 0 ? void 0 : (_mainVersionItem_fieldValue = mainVersionItem.fieldValue) === null || _mainVersionItem_fieldValue === void 0 ? void 0 : _mainVersionItem_fieldValue.length;
                const compareVersionLength = compareVersionItem === null || compareVersionItem === void 0 ? void 0 : (_compareVersionItem_fieldValue = compareVersionItem.fieldValue) === null || _compareVersionItem_fieldValue === void 0 ? void 0 : _compareVersionItem_fieldValue.length;
                const mainList = compareVersionLength > mainVersionLength ? compareVersionItem : mainVersionItem;
                const compareList = mainVersionLength < compareVersionLength ? mainVersionItem : compareVersionItem;
                const differences = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.differenceWith)(mainList === null || mainList === void 0 ? void 0 : mainList.fieldValue, compareList === null || compareList === void 0 ? void 0 : compareList.fieldValue, (item1, item2)=>{
                    return (item1 === null || item1 === void 0 ? void 0 : item1.type) === (item2 === null || item2 === void 0 ? void 0 : item2.type) && (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEqual)(item1 === null || item1 === void 0 ? void 0 : item1.data, item2 === null || item2 === void 0 ? void 0 : item2.data);
                });
                field.fieldCollectionModifiedList = differences.map((item)=>item.type);
            }
        }
        resultList.push(field);
    }
    return resultList;
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
"./js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/grid-config-inner.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GridConfigInner: () => (GridConfigInner)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _hooks_use_grid_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/hooks/use-grid-config.tsx");
/* ESM import */var _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* ESM import */var _views_edit_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/views/edit-view.tsx");
/* ESM import */var _views_save_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/views/save-view.tsx");
/* ESM import */var antd_es_form_Form__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./node_modules/antd/es/form/hooks/useForm.js");
/* ESM import */var _forms_save_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/forms/save-form.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_modules_user_roles_roles_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/user/roles/roles-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/user/user-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns.tsx");
/* ESM import */var _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns.tsx");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/use-grid-config.ts");
/* ESM import */var _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/selected-grid-config-id/use-selected-grid-config-id.ts");
/* ESM import */var _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/element/listing/abstract/settings/use-settings.ts");
/* ESM import */var _Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_data_object_listing_decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection.tsx");
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


















var ViewState = /*#__PURE__*/ function(ViewState) {
    ViewState["Edit"] = "edit";
    ViewState["Save"] = "save";
    ViewState["Update"] = "update";
    return ViewState;
}(ViewState || {});
const GridConfigInner = ()=>{
    _s();
    const { useElementId } = (0,_Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_15__.useSettings)();
    const { getAvailableColumnsDropdown } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_11__.useAvailableColumns)();
    const { selectedColumns, setSelectedColumns } = (0,_Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_12__.useSelectedColumns)();
    const { columns, setColumns, addColumn } = (0,_hooks_use_grid_config__WEBPACK_IMPORTED_MODULE_3__.useGridConfig)();
    const { getId } = useElementId();
    const userData = (0,_Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_4__.useUser)();
    const { id: selectedGridConfigId, setId: setSelectedGridConfigId } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_14__.useSelectedGridConfigId)();
    const { gridConfig, setGridConfig } = (0,_Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_13__.useGridConfig)();
    const { selectedClassDefinition } = (0,_Pimcore_modules_data_object_listing_decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_17__.useClassDefinitionSelection)();
    const { isLoading, isFetching, data } = (0,_Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectListSavedGridConfigurationsQuery)({
        classId: selectedClassDefinition.id
    });
    const { data: roleList } = (0,_Pimcore_modules_user_roles_roles_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_9__.useRoleGetCollectionQuery)();
    const { data: userList } = (0,_Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_10__.useUserGetCollectionQuery)();
    const { isFetching: gridConfigIsLoading } = (0,_Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectGetGridConfigurationQuery)({
        classId: selectedClassDefinition.id,
        folderId: getId(),
        configurationId: selectedGridConfigId
    });
    const [fetchSaveGridConfig, { isLoading: isSaveLoading }] = (0,_Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectSaveGridConfigurationMutation)();
    const [fetchUpdateGridConfig, { isLoading: isUpdating }] = (0,_Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectUpdateGridConfigurationMutation)();
    const [fetchDeleteGridConfig, { isLoading: isDeleting }] = (0,_Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectDeleteGridConfigurationByConfigurationIdMutation)();
    // @todo prefill current language with language of the current configuration
    const [currentLanguage, setCurrentLanguage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('en');
    const [view, setView] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("edit");
    const [form] = (0,antd_es_form_Form__WEBPACK_IMPORTED_MODULE_18__["default"])();
    const isSavedConfiguration = (gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.name) !== 'Predefined' && gridConfig !== undefined;
    const savedGridConfigurations = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (data !== undefined) {
            var _data_items;
            return ((_data_items = data.items) === null || _data_items === void 0 ? void 0 : _data_items.map((item)=>{
                return {
                    key: item.id,
                    label: item.name,
                    onClick: ()=>{
                        setSelectedGridConfigId(item.id);
                    }
                };
            })) ?? [];
        }
        return [];
    }, [
        data
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setColumns(selectedColumns.map((column)=>{
            return {
                ...column.originalApiDefinition,
                locale: column === null || column === void 0 ? void 0 : column.locale
            };
        }));
    }, [
        selectedColumns
    ]);
    const onColumnClick = (column)=>{
        addColumn(column);
    };
    const availableColumnsDropdown = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>getAvailableColumnsDropdown(onColumnClick), [
        getAvailableColumnsDropdown,
        columns
    ]);
    function onDeleteClick() {
        if (isSavedConfiguration) {
            fetchDeleteGridConfig({
                configurationId: gridConfig.id
            }).then(()=>{
                setView("edit");
                setSelectedGridConfigId(undefined);
            }).catch((error)=>{
                console.error('Failed to switch to edit view', error);
            });
        }
    }
    function onUpdatedConfigurationClick() {
        if (gridConfig === undefined) {
            console.error('No grid configuration available');
            return;
        }
        fetchUpdateGridConfig({
            configurationId: gridConfig.id,
            body: {
                folderId: getId(),
                columns: prepareColumns(columns),
                name: gridConfig.name,
                description: gridConfig.description,
                setAsFavorite: gridConfig.setAsFavorite,
                shareGlobal: gridConfig.shareGlobal,
                sharedRoles: gridConfig.sharedRoles,
                sharedUsers: gridConfig.sharedUsers,
                saveFilter: false,
                pageSize: 0
            }
        }).catch((error)=>{
            console.error('Failed to update grid configuration', error);
        });
    }
    function prepareColumns(columns) {
        return columns.map((column)=>({
                key: column.key,
                locale: column.locale ?? null,
                group: column.group
            }));
    }
    function onFormFinish(values) {
        const columnsToSave = prepareColumns(columns);
        const isShareGlobally = values.shareGlobally === true;
        // for global sharing the sharedUsers and sharedRoles need to be cleared
        // @todo Check if we really should modify the global grid config here...
        if (isShareGlobally && !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(gridConfig)) {
            setGridConfig({
                ...gridConfig,
                sharedUsers: [],
                sharedRoles: []
            });
        }
        if (view === "update" && isSavedConfiguration) {
            fetchUpdateGridConfig({
                configurationId: gridConfig.id,
                body: {
                    folderId: getId(),
                    columns: columnsToSave,
                    name: values.name,
                    description: values.description,
                    setAsFavorite: values.setAsDefault,
                    shareGlobal: values.shareGlobally,
                    sharedRoles: gridConfig.sharedRoles,
                    sharedUsers: gridConfig.sharedUsers,
                    saveFilter: false,
                    pageSize: 0
                }
            }).catch((error)=>{
                console.error('Failed to update grid configuration', error);
            }).then(()=>{
                setView("edit");
            }).catch((error)=>{
                console.error('Failed to switch to edit view', error);
            });
        }
        if (view === "save") {
            fetchSaveGridConfig({
                classId: selectedClassDefinition.id,
                body: {
                    folderId: getId(),
                    columns: columnsToSave,
                    name: values.name,
                    description: values.description,
                    setAsFavorite: values.setAsDefault,
                    shareGlobal: values.shareGlobally,
                    sharedRoles: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.sharedRoles,
                    sharedUsers: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.sharedUsers,
                    saveFilter: false,
                    pageSize: 0
                }
            }).catch((error)=>{
                console.error('Failed to save grid configuration', error);
            }).then((response)=>{
                if ((response === null || response === void 0 ? void 0 : response.data) !== undefined) {
                    setSelectedGridConfigId(response.data.id);
                    setView("edit");
                }
            }).catch((error)=>{
                console.error('Failed to switch to edit view', error);
            });
        }
    }
    const onCancelClick = ()=>{
        setColumns(selectedColumns.map((column)=>column.originalApiDefinition));
    };
    const onApplyClick = ()=>{
        setSelectedColumns(columns.map((column)=>{
            return {
                key: column.key,
                locale: column.locale === null && column.localizable ? currentLanguage : column.locale,
                type: column.type,
                config: column.config,
                sortable: column.sortable,
                editable: column.editable,
                localizable: column.localizable,
                exportable: column.exportable,
                frontendType: column.frontendType,
                group: column.group,
                originalApiDefinition: column
            };
        }));
    };
    if (gridConfigIsLoading || isDeleting) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_8__.Content, {
            loading: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/grid-config-inner.tsx",
            lineNumber: 234,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            view === "edit" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_views_edit_view__WEBPACK_IMPORTED_MODULE_5__.EditView, {
                addColumnMenu: availableColumnsDropdown.menu.items,
                columns: columns,
                currentLanguage: currentLanguage,
                currentUserId: userData === null || userData === void 0 ? void 0 : userData.id,
                gridConfig: gridConfig,
                isLoading: isLoading || isFetching,
                isUpdating: isUpdating,
                onApplyClick: onApplyClick,
                onCancelClick: onCancelClick,
                onEditConfigurationClick: ()=>{
                    setView("update");
                },
                onSaveConfigurationClick: ()=>{
                    setView("save");
                },
                onUpdateConfigurationClick: onUpdatedConfigurationClick,
                savedGridConfigurations: savedGridConfigurations,
                setCurrentLanguage: setCurrentLanguage
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/grid-config-inner.tsx",
                lineNumber: 240,
                columnNumber: 9
            }, undefined),
            (view === "save" || view === "update") && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_views_save_view__WEBPACK_IMPORTED_MODULE_6__.SaveView, {
                formProps: {
                    form,
                    onFinish: onFormFinish,
                    initialValues: view === "update" && isSavedConfiguration ? {
                        name: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.name,
                        description: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.description,
                        setAsDefault: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.setAsFavorite,
                        shareGlobally: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.shareGlobal
                    } : {
                        ..._forms_save_form__WEBPACK_IMPORTED_MODULE_7__.defaultValues
                    }
                },
                isDeleting: isDeleting,
                isLoading: isSaveLoading || isUpdating,
                modificationDate: gridConfig === null || gridConfig === void 0 ? void 0 : gridConfig.modificationDate,
                onCancelClick: ()=>{
                    setView("edit");
                },
                onDeleteClick: isSavedConfiguration ? onDeleteClick : undefined,
                roleList: roleList,
                saveAsNewConfiguration: view === "save",
                userList: userList,
                userName: userData === null || userData === void 0 ? void 0 : userData.username
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/tabs/grid-config/grid-config-inner.tsx",
                lineNumber: 261,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true);
};
_s(GridConfigInner, "/COEeTWpbkUg7Z4w+Txf/t3whY0=", true, function() {
    return [
        _Pimcore_modules_element_listing_abstract_settings_use_settings__WEBPACK_IMPORTED_MODULE_15__.useSettings,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_available_columns_use_available_columns__WEBPACK_IMPORTED_MODULE_11__.useAvailableColumns,
        _Pimcore_modules_element_listing_abstract_configuration_layer_provider_selected_columns_use_selected_columns__WEBPACK_IMPORTED_MODULE_12__.useSelectedColumns,
        _hooks_use_grid_config__WEBPACK_IMPORTED_MODULE_3__.useGridConfig,
        _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_4__.useUser,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_selected_grid_config_id_use_selected_grid_config_id__WEBPACK_IMPORTED_MODULE_14__.useSelectedGridConfigId,
        _Pimcore_modules_element_listing_decorators_utils_column_configuration_context_layer_provider_grid_config_use_grid_config__WEBPACK_IMPORTED_MODULE_13__.useGridConfig,
        _Pimcore_modules_data_object_listing_decorator_class_definition_selection_context_layer_provider_use_class_definition_selection__WEBPACK_IMPORTED_MODULE_17__.useClassDefinitionSelection,
        _Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectListSavedGridConfigurationsQuery,
        _Pimcore_modules_user_roles_roles_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_9__.useRoleGetCollectionQuery,
        _Pimcore_modules_user_user_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_10__.useUserGetCollectionQuery,
        _Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectGetGridConfigurationQuery,
        _Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectSaveGridConfigurationMutation,
        _Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectUpdateGridConfigurationMutation,
        _Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_16__.useDataObjectDeleteGridConfigurationByConfigurationIdMutation,
        antd_es_form_Form__WEBPACK_IMPORTED_MODULE_18__["default"]
    ];
});
_c = GridConfigInner;
var _c;
$RefreshReg$(_c, "GridConfigInner");

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
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice-enhanced.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _batch_actions_batch_append_mode_batch_append_mode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/listing/batch-actions/batch-append-mode/batch-append-mode.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const updateCache = (event)=>{
        const { update, getGetRequestArgs } = event;
        const { id, column: columnToUpdate, value } = update;
        dispatch(_Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.api.util.updateQueryData('dataObjectGetGrid', getGetRequestArgs, (oldData)=>{
            item_loop: for (const item of oldData.items){
                if (item.id !== id) {
                    continue;
                }
                for (const column of item.columns){
                    if (column.key === columnToUpdate.key && column.locale === columnToUpdate.locale) {
                        column.value = value;
                        if (column.inheritance === true) {
                            column.inheritance = 'broken';
                        }
                        break item_loop;
                    }
                }
            }
            return oldData;
        }));
    };
    const updateApiData = async (event)=>{
        var _event_meta;
        const { update } = event;
        let columnKey = update.column.key;
        if (update.column.localizable && update.column.locale !== undefined && update.column.locale !== null) {
            const splittedColumnKey = columnKey.split('.');
            const columnId = splittedColumnKey[splittedColumnKey.length - 1];
            splittedColumnKey.pop();
            const hasPrepath = splittedColumnKey.length > 0 && splittedColumnKey[0] !== '';
            columnKey = `${splittedColumnKey.join('.')}${hasPrepath ? '.' : ''}localizedfields.${columnId}.${update.column.locale}`;
        }
        const value = ((_event_meta = event.meta) === null || _event_meta === void 0 ? void 0 : _event_meta[_batch_actions_batch_append_mode_batch_append_mode__WEBPACK_IMPORTED_MODULE_4__.META_SUPPORTS_BATCH_APPEND_MODE]) === true ? (0,_batch_actions_batch_append_mode_batch_append_mode__WEBPACK_IMPORTED_MODULE_4__.addBatchAppendMode)(update.value, _batch_actions_batch_append_mode_batch_append_mode__WEBPACK_IMPORTED_MODULE_4__.BatchAppendMode.Replace) : update.value;
        const promise = patchDataObject({
            body: {
                data: [
                    {
                        id: update.id,
                        editableData: {
                            ...(0,lodash__WEBPACK_IMPORTED_MODULE_3__.set)({}, columnKey, value)
                        }
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
_s(useInlineEditApiUpdate, "In3OxzQxeXhdbUnAtDZfCm3ghb0=", false, function() {
    return [
        _Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.useDataObjectPatchByIdMutation,
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch
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
"./js/src/core/modules/data-object/tree/context-menu/context-menu.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DataObjectTreeContextMenu: () => (DataObjectTreeContextMenu)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_element_tree_node_tree_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/element-tree/node/tree-node.tsx");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_element_actions_add_folder_use_add_folder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/actions/add-folder/use-add-folder.tsx");
/* ESM import */var _Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/actions/rename/use-rename.tsx");
/* ESM import */var _Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/actions/delete/use-delete.tsx");
/* ESM import */var _Pimcore_modules_element_actions_refresh_tree_use_refresh_tree__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/actions/refresh-tree/use-refresh-tree.tsx");
/* ESM import */var _Pimcore_modules_element_actions_copy_paste_use_copy_paste__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/actions/copy-paste/use-copy-paste.tsx");
/* ESM import */var _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/actions/lock/use-lock.tsx");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_modules_element_actions_unpublish_use_unpublish__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/element/actions/unpublish/use-unpublish.tsx");
/* ESM import */var _actions_add_object_use_add_object__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/data-object/actions/add-object/use-add-object.tsx");
/* ESM import */var _Pimcore_modules_data_object_actions_paste_use_paste__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/data-object/actions/paste/use-paste.tsx");
/* ESM import */var _Pimcore_modules_element_actions_publish_use_publish__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/modules/element/actions/publish/use-publish.tsx");
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
















const DataObjectTreeContextMenu = (props)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const node = props.node ?? _Pimcore_components_element_tree_node_tree_node__WEBPACK_IMPORTED_MODULE_3__.defaultProps;
    const { addFolderTreeContextMenuItem } = (0,_Pimcore_modules_element_actions_add_folder_use_add_folder__WEBPACK_IMPORTED_MODULE_6__.useAddFolder)('data-object');
    const { renameTreeContextMenuItem } = (0,_Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_7__.useRename)('data-object', (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_12__.getElementActionCacheKey)('data-object', 'rename', parseInt(node.id)));
    const { deleteTreeContextMenuItem } = (0,_Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_8__.useDelete)('data-object', (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_12__.getElementActionCacheKey)('data-object', 'delete', parseInt(node.id)));
    const { refreshTreeContextMenuItem } = (0,_Pimcore_modules_element_actions_refresh_tree_use_refresh_tree__WEBPACK_IMPORTED_MODULE_9__.useRefreshTree)('data-object');
    const { copyTreeContextMenuItem, cutTreeContextMenuItem, pasteCutContextMenuItem, nodeTask, storedNode } = (0,_Pimcore_modules_element_actions_copy_paste_use_copy_paste__WEBPACK_IMPORTED_MODULE_10__.useCopyPaste)('data-object');
    const { lockTreeContextMenuItem, lockAndPropagateTreeContextMenuItem, unlockTreeContextMenuItem, unlockAndPropagateTreeContextMenuItem, isLockMenuHidden } = (0,_Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_11__.useLock)('data-object');
    const { unpublishTreeContextMenuItem } = (0,_Pimcore_modules_element_actions_unpublish_use_unpublish__WEBPACK_IMPORTED_MODULE_13__.useUnpublish)('data-object');
    const { pasteAsChildRecursiveTreeContextMenuItem, pasteRecursiveUpdatingReferencesTreeContextMenuItem, pasteAsChildTreeContextMenuItem, pasteOnlyContentsTreeContextMenuItem, isPasteMenuHidden } = (0,_Pimcore_modules_data_object_actions_paste_use_paste__WEBPACK_IMPORTED_MODULE_15__.usePaste)({
        storedNode,
        nodeTask
    });
    const { addObjectTreeContextMenuItem } = (0,_actions_add_object_use_add_object__WEBPACK_IMPORTED_MODULE_14__.useAddObject)();
    const { publishTreeContextMenuItem } = (0,_Pimcore_modules_element_actions_publish_use_publish__WEBPACK_IMPORTED_MODULE_16__.usePublish)('data-object');
    const items = [
        addObjectTreeContextMenuItem(node),
        addFolderTreeContextMenuItem(node),
        {
            label: t('element.tree.paste'),
            key: 'paste',
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                value: 'paste'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/tree/context-menu/context-menu.tsx",
                lineNumber: 59,
                columnNumber: 13
            }, undefined),
            hidden: isPasteMenuHidden(node),
            children: [
                pasteAsChildRecursiveTreeContextMenuItem(node),
                pasteRecursiveUpdatingReferencesTreeContextMenuItem(node),
                pasteAsChildTreeContextMenuItem(node),
                pasteOnlyContentsTreeContextMenuItem(node)
            ]
        },
        renameTreeContextMenuItem(node),
        copyTreeContextMenuItem(node),
        cutTreeContextMenuItem(node),
        publishTreeContextMenuItem(node),
        unpublishTreeContextMenuItem(node),
        pasteCutContextMenuItem(parseInt(node.id)),
        deleteTreeContextMenuItem(node),
        {
            label: t('element.tree.context-menu.advanced'),
            key: 'advanced',
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                value: 'more'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/tree/context-menu/context-menu.tsx",
                lineNumber: 78,
                columnNumber: 13
            }, undefined),
            hidden: isLockMenuHidden(node),
            children: [
                {
                    label: t('element.lock'),
                    key: 'advanced-lock',
                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                        value: 'lock'
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/tree/context-menu/context-menu.tsx",
                        lineNumber: 84,
                        columnNumber: 17
                    }, undefined),
                    hidden: isLockMenuHidden(node),
                    children: [
                        lockTreeContextMenuItem(node),
                        lockAndPropagateTreeContextMenuItem(node),
                        unlockTreeContextMenuItem(node),
                        unlockAndPropagateTreeContextMenuItem(node)
                    ]
                }
            ]
        },
        refreshTreeContextMenuItem(node)
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_4__.Dropdown, {
            menu: {
                items
            },
            trigger: [
                'contextMenu'
            ],
            children: props.children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/tree/context-menu/context-menu.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, undefined)
    }, void 0, false);
};
_s(DataObjectTreeContextMenu, "R3E5J7QyLTFboI+fwAvZ/N2u1xc=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _Pimcore_modules_element_actions_add_folder_use_add_folder__WEBPACK_IMPORTED_MODULE_6__.useAddFolder,
        _Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_7__.useRename,
        _Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_8__.useDelete,
        _Pimcore_modules_element_actions_refresh_tree_use_refresh_tree__WEBPACK_IMPORTED_MODULE_9__.useRefreshTree,
        _Pimcore_modules_element_actions_copy_paste_use_copy_paste__WEBPACK_IMPORTED_MODULE_10__.useCopyPaste,
        _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_11__.useLock,
        _Pimcore_modules_element_actions_unpublish_use_unpublish__WEBPACK_IMPORTED_MODULE_13__.useUnpublish,
        _Pimcore_modules_data_object_actions_paste_use_paste__WEBPACK_IMPORTED_MODULE_15__.usePaste,
        _actions_add_object_use_add_object__WEBPACK_IMPORTED_MODULE_14__.useAddObject,
        _Pimcore_modules_element_actions_publish_use_publish__WEBPACK_IMPORTED_MODULE_16__.usePublish
    ];
});
_c = DataObjectTreeContextMenu;
var _c;
$RefreshReg$(_c, "DataObjectTreeContextMenu");

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
"./js/src/core/modules/data-object/tree/node/with-draggable.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withDraggable: () => (withDraggable)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_drag_and_drop_draggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/drag-and-drop/draggable.tsx");
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


const withDraggable = (Component)=>{
    const DraggableNodeContent = (props, ref)=>{
        var _props_metaData;
        const metaData = props.metaData.dataObject;
        if (((_props_metaData = props.metaData) === null || _props_metaData === void 0 ? void 0 : _props_metaData.dataObject) === undefined) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                ...props
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/tree/node/with-draggable.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_draggable__WEBPACK_IMPORTED_MODULE_2__.Draggable, {
            info: {
                icon: metaData.icon.value,
                title: metaData.key,
                type: 'data-object',
                data: {
                    ...metaData
                }
            },
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                ...props,
                ref: ref
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/tree/node/with-draggable.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/tree/node/with-draggable.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, undefined);
    };
    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(DraggableNodeContent);
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
"./js/src/core/modules/data-object/tree/tree-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DataObjectTreeNode: () => (DataObjectTreeNode),
  TreeContainer: () => (TreeContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_element_tree_element_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/element-tree/element-tree.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_element_tree_node_tree_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/element-tree/node/tree-node.tsx");
/* ESM import */var _search_search_container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/data-object/tree/search/search-container.tsx");
/* ESM import */var _node_with_draggable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/tree/node/with-draggable.tsx");
/* ESM import */var _Pimcore_modules_data_object_hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/data-object/hooks/use-data-object-helper.ts");
/* ESM import */var _Pimcore_modules_element_tree_pager_pager_container__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/tree/pager/pager-container.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_element_tree_skeleton_skeleton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/element-tree/skeleton/skeleton.tsx");
/* ESM import */var _node_with_droppable_with_droppable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/data-object/tree/node/with-droppable/with-droppable.tsx");
/* ESM import */var _node_with_action_states__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/data-object/tree/node/with-action-states.tsx");
/* ESM import */var _Pimcore_components_element_tree_hooks_use_element_tree_root_node__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/element-tree/hooks/use-element-tree-root-node.ts");
/* ESM import */var _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/app/component-registry/component-config.ts");
/* ESM import */var _Pimcore_modules_app_component_registry_use_component_registry__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/app/component-registry/use-component-registry.ts");
/* ESM import */var _Pimcore_modules_element_tree_node_with_droppable_with_droppable_styling__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/element/tree/node/with-droppable/with-droppable-styling.tsx");
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















const DataObjectTreeNode = (0,_Pimcore_modules_element_tree_node_with_droppable_with_droppable_styling__WEBPACK_IMPORTED_MODULE_15__.withDroppableStyling)(_c2 = (0,_node_with_droppable_with_droppable__WEBPACK_IMPORTED_MODULE_10__.withDroppable)(_c1 = (0,_node_with_action_states__WEBPACK_IMPORTED_MODULE_11__.withActionStates)(_c = (0,_node_with_draggable__WEBPACK_IMPORTED_MODULE_5__.withDraggable)(_Pimcore_components_element_tree_node_tree_node__WEBPACK_IMPORTED_MODULE_3__.TreeNode))));
_c3 = DataObjectTreeNode;
const TreeContainer = (param)=>{
    let { id = 1, showRoot = true } = param;
    _s();
    const { openDataObject } = (0,_Pimcore_modules_data_object_hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_6__.useDataObjectHelper)();
    const { rootNode, isLoading } = (0,_Pimcore_components_element_tree_hooks_use_element_tree_root_node__WEBPACK_IMPORTED_MODULE_12__.useElementTreeRootNode)(id, showRoot);
    const componentRegistry = (0,_Pimcore_modules_app_component_registry_use_component_registry__WEBPACK_IMPORTED_MODULE_14__.useComponentRegistry)();
    const contextMenu = componentRegistry.get(_Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_13__.componentConfig.dataObject.tree.contextMenu.name);
    if (showRoot && isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_8__.Box, {
            padding: 'small',
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_element_tree_skeleton_skeleton__WEBPACK_IMPORTED_MODULE_9__.Skeleton, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/tree/tree-container.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/tree/tree-container.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, undefined);
    }
    async function onSelect(node) {
        void openDataObject({
            config: {
                id: parseInt(node.id)
            }
        });
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_element_tree_element_tree__WEBPACK_IMPORTED_MODULE_1__.ElementTree, {
        contextMenu: contextMenu,
        nodeId: id,
        onSelect: onSelect,
        renderFilter: _search_search_container__WEBPACK_IMPORTED_MODULE_4__.SearchContainer,
        renderNode: DataObjectTreeNode,
        renderNodeContent: _Pimcore_components_element_tree_element_tree__WEBPACK_IMPORTED_MODULE_1__.defaultProps.renderNodeContent,
        renderPager: _Pimcore_modules_element_tree_pager_pager_container__WEBPACK_IMPORTED_MODULE_7__.PagerContainer,
        rootNode: rootNode,
        showRoot: showRoot
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/tree/tree-container.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, undefined);
};
_s(TreeContainer, "OD0BxN1EBr3kjoWRHvDlUAUJAcw=", false, function() {
    return [
        _Pimcore_modules_data_object_hooks_use_data_object_helper__WEBPACK_IMPORTED_MODULE_6__.useDataObjectHelper,
        _Pimcore_components_element_tree_hooks_use_element_tree_root_node__WEBPACK_IMPORTED_MODULE_12__.useElementTreeRootNode,
        _Pimcore_modules_app_component_registry_use_component_registry__WEBPACK_IMPORTED_MODULE_14__.useComponentRegistry
    ];
});
_c4 = TreeContainer;

var _c, _c1, _c2, _c3, _c4;
$RefreshReg$(_c, "DataObjectTreeNode$withDroppableStyling$withDroppable$withActionStates");
$RefreshReg$(_c1, "DataObjectTreeNode$withDroppableStyling$withDroppable");
$RefreshReg$(_c2, "DataObjectTreeNode$withDroppableStyling");
$RefreshReg$(_c3, "DataObjectTreeNode");
$RefreshReg$(_c4, "TreeContainer");

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
  transformApiDataToNodes: () => (transformApiDataToNodes)
});
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
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

const transformApiDataToNodes = (node, data, maxItemsPerNode)=>{
    const nodes = [];
    const dataObjectData = data.items;
    dataObjectData.forEach((dataObjectNode)=>{
        nodes.push({
            id: dataObjectNode.id.toString(),
            elementType: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__.elementTypes.dataObject,
            icon: (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__.getElementIcon)(dataObjectNode, {
                type: 'name',
                value: 'data-object'
            }),
            label: dataObjectNode.key,
            type: dataObjectNode.type,
            parentId: dataObjectNode.parentId.toString(),
            hasChildren: dataObjectNode.hasChildren,
            locked: dataObjectNode.locked,
            isLocked: dataObjectNode.isLocked,
            isPublished: dataObjectNode.published,
            metaData: {
                dataObject: dataObjectNode
            },
            permissions: dataObjectNode.permissions ?? [],
            internalKey: `${node.internalKey}-${dataObjectNode.id}`
        });
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
"./js/src/core/modules/data-object/unit-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useUnitQuantityValueConvertAllQuery: () => (useUnitQuantityValueConvertAllQuery),
  useUnitQuantityValueConvertQuery: () => (useUnitQuantityValueConvertQuery),
  useUnitQuantityValueListQuery: () => (useUnitQuantityValueListQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Units"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            unitQuantityValueConvertAll: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/unit/quantity-value/convert-all`,
                        params: {
                            fromUnitId: queryArg.fromUnitId,
                            value: queryArg.value
                        }
                    }),
                providesTags: [
                    "Units"
                ]
            }),
            unitQuantityValueConvert: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/unit/quantity-value/convert`,
                        params: {
                            fromUnitId: queryArg.fromUnitId,
                            toUnitId: queryArg.toUnitId,
                            value: queryArg.value
                        }
                    }),
                providesTags: [
                    "Units"
                ]
            }),
            unitQuantityValueList: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/unit/quantity-value/unit-list`
                    }),
                providesTags: [
                    "Units"
                ]
            })
        }),
    overrideExisting: false
});

const { useUnitQuantityValueConvertAllQuery, useUnitQuantityValueConvertQuery, useUnitQuantityValueListQuery } = injectedRtkApi;

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
"./js/src/core/modules/document/document-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useDocumentAddMutation: () => (useDocumentAddMutation),
  useDocumentDocTypeListQuery: () => (useDocumentDocTypeListQuery),
  useDocumentGetByIdQuery: () => (useDocumentGetByIdQuery),
  useDocumentGetTreeQuery: () => (useDocumentGetTreeQuery),
  useDocumentPageStreamPreviewQuery: () => (useDocumentPageStreamPreviewQuery),
  useDocumentReplaceContentMutation: () => (useDocumentReplaceContentMutation),
  useDocumentsListAvailableSitesQuery: () => (useDocumentsListAvailableSitesQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Documents"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            documentAdd: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/add/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.documentAddParameters
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentsListAvailableSites: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/sites/list-available`,
                        params: {
                            excludeMainSite: queryArg.excludeMainSite
                        }
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentDocTypeList: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/doc-types`,
                        params: {
                            type: queryArg["type"]
                        }
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/${queryArg.id}`
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentPageStreamPreview: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/${queryArg.id}/page/stream/preview`
                    }),
                providesTags: [
                    "Documents"
                ]
            }),
            documentReplaceContent: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/${queryArg.sourceId}/replace/${queryArg.targetId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Documents"
                ]
            }),
            documentGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/tree`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            parentId: queryArg.parentId,
                            idSearchTerm: queryArg.idSearchTerm,
                            pqlQuery: queryArg.pqlQuery,
                            excludeFolders: queryArg.excludeFolders,
                            path: queryArg.path,
                            pathIncludeParent: queryArg.pathIncludeParent,
                            pathIncludeDescendants: queryArg.pathIncludeDescendants
                        }
                    }),
                providesTags: [
                    "Documents"
                ]
            })
        }),
    overrideExisting: false
});

const { useDocumentAddMutation, useDocumentsListAvailableSitesQuery, useDocumentDocTypeListQuery, useDocumentGetByIdQuery, useDocumentPageStreamPreviewQuery, useDocumentReplaceContentMutation, useDocumentGetTreeQuery } = injectedRtkApi;

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
"./js/src/core/modules/document/hooks/use-document-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDocumentHelper: () => (useDocumentHelper)
});
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/document/document-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/widget-manager/hooks/use-widget-manager.ts");
/* ESM import */var _Pimcore_modules_widget_manager_utils_tools__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/widget-manager/utils/tools.tsx");
/* ESM import */var _use_document_draft_fetcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-draft-fetcher.ts");
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







const useDocumentHelper = ()=>{
    const { openMainWidget, isMainWidgetOpen } = (0,_Pimcore_modules_widget_manager_hooks_use_widget_manager__WEBPACK_IMPORTED_MODULE_5__.useWidgetManager)();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.useAppDispatch)();
    const { updateDocumentDraft } = (0,_use_document_draft_fetcher__WEBPACK_IMPORTED_MODULE_7__.useDocumentDraftFetcher)();
    async function openDocument(props) {
        const { config } = props;
        const widgetId = (0,_Pimcore_modules_widget_manager_utils_tools__WEBPACK_IMPORTED_MODULE_6__.getWidgetId)('document', config.id);
        if (!isMainWidgetOpen(widgetId)) {
            dispatch(_Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.api.util.invalidateTags(_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_0__.invalidatingTags.DOCUMENT_DETAIL_ID(config.id)));
            void updateDocumentDraft(config.id, true);
        }
        const { data } = await _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_1__.store.dispatch(_Pimcore_modules_document_document_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.api.endpoints.documentGetById.initiate({
            id: config.id
        }));
        if (data === undefined || !(0,_Pimcore_modules_element_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_4__.checkElementPermission)(data.permissions, 'view')) {
            return;
        }
        const icon = (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_3__.getElementIcon)(data, {
            value: 'widget',
            type: 'name'
        });
        const iconConfig = {
            type: icon.type,
            value: icon.value
        };
        openMainWidget({
            name: data === null || data === void 0 ? void 0 : data.key,
            id: widgetId,
            component: 'document-editor',
            config: {
                ...config,
                icon: iconConfig
            }
        });
    }
    return {
        openDocument
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
"./js/src/core/modules/document/sites-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useDocumentsListAvailableSitesQuery: () => (useDocumentsListAvailableSitesQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Documents"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            documentsListAvailableSites: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/documents/sites/list-available`,
                        params: {
                            excludeMainSite: queryArg.excludeMainSite
                        }
                    }),
                providesTags: [
                    "Documents"
                ]
            })
        }),
    overrideExisting: false
});

const { useDocumentsListAvailableSitesQuery } = injectedRtkApi;

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
"./js/src/core/modules/document/tree/context-menu/context-menu.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentTreeContextMenu: () => (DocumentTreeContextMenu)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_element_tree_node_tree_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/element-tree/node/tree-node.tsx");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_element_actions_add_folder_use_add_folder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/actions/add-folder/use-add-folder.tsx");
/* ESM import */var _Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/actions/rename/use-rename.tsx");
/* ESM import */var _Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/actions/delete/use-delete.tsx");
/* ESM import */var _Pimcore_modules_element_actions_refresh_tree_use_refresh_tree__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/actions/refresh-tree/use-refresh-tree.tsx");
/* ESM import */var _Pimcore_modules_element_actions_copy_paste_use_copy_paste__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/actions/copy-paste/use-copy-paste.tsx");
/* ESM import */var _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/actions/lock/use-lock.tsx");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_modules_element_actions_unpublish_use_unpublish__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/element/actions/unpublish/use-unpublish.tsx");
/* ESM import */var _Pimcore_modules_element_actions_publish_use_publish__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/actions/publish/use-publish.tsx");
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














const DocumentTreeContextMenu = (props)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const node = props.node ?? _Pimcore_components_element_tree_node_tree_node__WEBPACK_IMPORTED_MODULE_3__.defaultProps;
    const { addFolderTreeContextMenuItem } = (0,_Pimcore_modules_element_actions_add_folder_use_add_folder__WEBPACK_IMPORTED_MODULE_6__.useAddFolder)('document');
    const { renameTreeContextMenuItem } = (0,_Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_7__.useRename)('document', (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_12__.getElementActionCacheKey)('document', 'rename', parseInt(node.id)));
    const { deleteTreeContextMenuItem } = (0,_Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_8__.useDelete)('document', (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_12__.getElementActionCacheKey)('document', 'delete', parseInt(node.id)));
    const { refreshTreeContextMenuItem } = (0,_Pimcore_modules_element_actions_refresh_tree_use_refresh_tree__WEBPACK_IMPORTED_MODULE_9__.useRefreshTree)('document');
    const { copyTreeContextMenuItem, cutTreeContextMenuItem, pasteCutContextMenuItem } = (0,_Pimcore_modules_element_actions_copy_paste_use_copy_paste__WEBPACK_IMPORTED_MODULE_10__.useCopyPaste)('document');
    const { lockTreeContextMenuItem, lockAndPropagateTreeContextMenuItem, unlockTreeContextMenuItem, unlockAndPropagateTreeContextMenuItem, isLockMenuHidden } = (0,_Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_11__.useLock)('document');
    const { unpublishTreeContextMenuItem } = (0,_Pimcore_modules_element_actions_unpublish_use_unpublish__WEBPACK_IMPORTED_MODULE_13__.useUnpublish)('document');
    const { publishTreeContextMenuItem } = (0,_Pimcore_modules_element_actions_publish_use_publish__WEBPACK_IMPORTED_MODULE_14__.usePublish)('document');
    const items = [
        addFolderTreeContextMenuItem(node),
        renameTreeContextMenuItem(node),
        copyTreeContextMenuItem(node),
        cutTreeContextMenuItem(node),
        publishTreeContextMenuItem(node),
        unpublishTreeContextMenuItem(node),
        pasteCutContextMenuItem(parseInt(node.id)),
        deleteTreeContextMenuItem(node),
        {
            label: t('element.tree.context-menu.advanced'),
            key: 'advanced',
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                value: 'more'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/tree/context-menu/context-menu.tsx",
                lineNumber: 55,
                columnNumber: 13
            }, undefined),
            hidden: isLockMenuHidden(node),
            children: [
                {
                    label: t('element.lock'),
                    key: 'advanced-lock',
                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_5__.Icon, {
                        value: 'lock'
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/tree/context-menu/context-menu.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, undefined),
                    hidden: isLockMenuHidden(node),
                    children: [
                        lockTreeContextMenuItem(node),
                        lockAndPropagateTreeContextMenuItem(node),
                        unlockTreeContextMenuItem(node),
                        unlockAndPropagateTreeContextMenuItem(node)
                    ]
                }
            ]
        },
        refreshTreeContextMenuItem(node)
    ];
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_4__.Dropdown, {
        menu: {
            items
        },
        trigger: [
            'contextMenu'
        ],
        children: props.children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/tree/context-menu/context-menu.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, undefined);
};
_s(DocumentTreeContextMenu, "rKXdPY37AQqOPgXLBS9GBuunZNQ=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _Pimcore_modules_element_actions_add_folder_use_add_folder__WEBPACK_IMPORTED_MODULE_6__.useAddFolder,
        _Pimcore_modules_element_actions_rename_use_rename__WEBPACK_IMPORTED_MODULE_7__.useRename,
        _Pimcore_modules_element_actions_delete_use_delete__WEBPACK_IMPORTED_MODULE_8__.useDelete,
        _Pimcore_modules_element_actions_refresh_tree_use_refresh_tree__WEBPACK_IMPORTED_MODULE_9__.useRefreshTree,
        _Pimcore_modules_element_actions_copy_paste_use_copy_paste__WEBPACK_IMPORTED_MODULE_10__.useCopyPaste,
        _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_11__.useLock,
        _Pimcore_modules_element_actions_unpublish_use_unpublish__WEBPACK_IMPORTED_MODULE_13__.useUnpublish,
        _Pimcore_modules_element_actions_publish_use_publish__WEBPACK_IMPORTED_MODULE_14__.usePublish
    ];
});
_c = DocumentTreeContextMenu;
var _c;
$RefreshReg$(_c, "DocumentTreeContextMenu");

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
"./js/src/core/modules/document/tree/node/with-draggable.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withDraggable: () => (withDraggable)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_drag_and_drop_draggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/drag-and-drop/draggable.tsx");
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


const withDraggable = (Component)=>{
    const DraggableNodeContent = (props, ref)=>{
        var _props_metaData;
        const metaData = props.metaData.document;
        if (((_props_metaData = props.metaData) === null || _props_metaData === void 0 ? void 0 : _props_metaData.document) === undefined) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                ...props
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/tree/node/with-draggable.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_draggable__WEBPACK_IMPORTED_MODULE_2__.Draggable, {
            info: {
                icon: metaData.icon.value,
                title: metaData.key,
                type: 'document',
                data: {
                    ...metaData
                }
            },
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                ...props,
                ref: ref
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/tree/node/with-draggable.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/tree/node/with-draggable.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, undefined);
    };
    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(DraggableNodeContent);
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
"./js/src/core/modules/document/tree/tree-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DocumentTreeNode: () => (DocumentTreeNode),
  TreeContainer: () => (TreeContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_element_tree_element_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/element-tree/element-tree.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_element_tree_node_tree_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/element-tree/node/tree-node.tsx");
/* ESM import */var _search_search_container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/document/tree/search/search-container.tsx");
/* ESM import */var _node_with_draggable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/document/tree/node/with-draggable.tsx");
/* ESM import */var _Pimcore_modules_document_hooks_use_document_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/document/hooks/use-document-helper.ts");
/* ESM import */var _Pimcore_modules_element_tree_pager_pager_container__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/tree/pager/pager-container.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_element_tree_skeleton_skeleton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/element-tree/skeleton/skeleton.tsx");
/* ESM import */var _node_with_droppable_with_droppable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/document/tree/node/with-droppable/with-droppable.tsx");
/* ESM import */var _node_with_action_states__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/document/tree/node/with-action-states.tsx");
/* ESM import */var _Pimcore_components_element_tree_hooks_use_element_tree_root_node__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/element-tree/hooks/use-element-tree-root-node.ts");
/* ESM import */var _Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/app/component-registry/component-config.ts");
/* ESM import */var _Pimcore_modules_app_component_registry_use_component_registry__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/app/component-registry/use-component-registry.ts");
/* ESM import */var _Pimcore_modules_element_tree_node_with_droppable_with_droppable_styling__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/element/tree/node/with-droppable/with-droppable-styling.tsx");
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















const DocumentTreeNode = (0,_Pimcore_modules_element_tree_node_with_droppable_with_droppable_styling__WEBPACK_IMPORTED_MODULE_15__.withDroppableStyling)(_c2 = (0,_node_with_droppable_with_droppable__WEBPACK_IMPORTED_MODULE_10__.withDroppable)(_c1 = (0,_node_with_action_states__WEBPACK_IMPORTED_MODULE_11__.withActionStates)(_c = (0,_node_with_draggable__WEBPACK_IMPORTED_MODULE_5__.withDraggable)(_Pimcore_components_element_tree_node_tree_node__WEBPACK_IMPORTED_MODULE_3__.TreeNode))));
_c3 = DocumentTreeNode;
const TreeContainer = (param)=>{
    let { id = 1, showRoot = true } = param;
    _s();
    const { openDocument } = (0,_Pimcore_modules_document_hooks_use_document_helper__WEBPACK_IMPORTED_MODULE_6__.useDocumentHelper)();
    const { rootNode, isLoading } = (0,_Pimcore_components_element_tree_hooks_use_element_tree_root_node__WEBPACK_IMPORTED_MODULE_12__.useElementTreeRootNode)(id, showRoot);
    const componentRegistry = (0,_Pimcore_modules_app_component_registry_use_component_registry__WEBPACK_IMPORTED_MODULE_14__.useComponentRegistry)();
    const contextMenu = componentRegistry.get(_Pimcore_modules_app_component_registry_component_config__WEBPACK_IMPORTED_MODULE_13__.componentConfig.document.tree.contextMenu.name);
    if (showRoot && isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_8__.Box, {
            padding: 'small',
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_element_tree_skeleton_skeleton__WEBPACK_IMPORTED_MODULE_9__.Skeleton, {}, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/tree/tree-container.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/tree/tree-container.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, undefined);
    }
    async function onSelect(node) {
        void openDocument({
            config: {
                id: parseInt(node.id)
            }
        });
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_element_tree_element_tree__WEBPACK_IMPORTED_MODULE_1__.ElementTree, {
        contextMenu: contextMenu,
        nodeId: id,
        onSelect: onSelect,
        renderFilter: _search_search_container__WEBPACK_IMPORTED_MODULE_4__.SearchContainer,
        renderNode: DocumentTreeNode,
        renderNodeContent: _Pimcore_components_element_tree_element_tree__WEBPACK_IMPORTED_MODULE_1__.defaultProps.renderNodeContent,
        renderPager: _Pimcore_modules_element_tree_pager_pager_container__WEBPACK_IMPORTED_MODULE_7__.PagerContainer,
        rootNode: rootNode,
        showRoot: showRoot
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/document/tree/tree-container.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, undefined);
};
_s(TreeContainer, "oqYWUg/o70Gkc5Os5oOZtgbrZBM=", false, function() {
    return [
        _Pimcore_modules_document_hooks_use_document_helper__WEBPACK_IMPORTED_MODULE_6__.useDocumentHelper,
        _Pimcore_components_element_tree_hooks_use_element_tree_root_node__WEBPACK_IMPORTED_MODULE_12__.useElementTreeRootNode,
        _Pimcore_modules_app_component_registry_use_component_registry__WEBPACK_IMPORTED_MODULE_14__.useComponentRegistry
    ];
});
_c4 = TreeContainer;

var _c, _c1, _c2, _c3, _c4;
$RefreshReg$(_c, "DocumentTreeNode$withDroppableStyling$withDroppable$withActionStates");
$RefreshReg$(_c1, "DocumentTreeNode$withDroppableStyling$withDroppable");
$RefreshReg$(_c2, "DocumentTreeNode$withDroppableStyling");
$RefreshReg$(_c3, "DocumentTreeNode");
$RefreshReg$(_c4, "TreeContainer");

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
"./js/src/core/modules/document/tree/utils/transform-api-data-to-node.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  transformApiDataToNodes: () => (transformApiDataToNodes)
});
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
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

const transformApiDataToNodes = (node, data, maxItemsPerNode)=>{
    const nodes = [];
    const documentData = data.items;
    documentData.forEach((documentNode)=>{
        nodes.push({
            id: documentNode.id.toString(),
            elementType: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_1__.elementTypes.document,
            icon: (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_0__.getElementIcon)(documentNode, {
                type: 'name',
                value: 'document'
            }),
            label: documentNode.key,
            type: documentNode.type,
            parentId: documentNode.parentId.toString(),
            hasChildren: documentNode.hasChildren,
            locked: documentNode.locked,
            isLocked: documentNode.isLocked,
            isPublished: documentNode.published,
            metaData: {
                document: documentNode
            },
            permissions: documentNode.permissions ?? [],
            internalKey: `${node.internalKey}-${documentNode.id}`
        });
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
"./js/src/core/modules/element/actions/unpublish/use-unpublish.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useUnpublish: () => (useUnpublish)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/actions/save/use-save.tsx");
/* ESM import */var _Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-helper.ts");
/* ESM import */var _permissions_permission_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/permissions/permission-helper.ts");
/* ESM import */var _tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var ___WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
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









const useUnpublish = (elementType)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    const { isTreeActionAllowed } = (0,_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_8__.useTreePermission)();
    const { executeElementTask } = (0,_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_6__.useElementHelper)();
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const isUnpublishHidden = (node)=>{
        return !(0,_permissions_permission_helper__WEBPACK_IMPORTED_MODULE_7__.checkElementPermission)(node.permissions, 'unpublish') || node.type === 'folder' || node.isLocked;
    };
    const unpublishTreeNode = (node, onFinish)=>{
        const nodeId = typeof node.id === 'string' ? parseInt(node.id) : node.id;
        executeElementTask(elementType, nodeId, _Pimcore_modules_data_object_actions_save_use_save__WEBPACK_IMPORTED_MODULE_2__.SaveTaskType.Unpublish, onFinish);
    };
    const unpublishContextMenuItem = (node, onFinish)=>{
        return {
            label: t('element.unpublish'),
            key: ___WEBPACK_IMPORTED_MODULE_9__.ContextMenuActionName.unpublish,
            isLoading,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: "eye-off"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/unpublish/use-unpublish.tsx",
                lineNumber: 54,
                columnNumber: 13
            }, undefined),
            hidden: node.published === false || isUnpublishHidden(node),
            onClick: ()=>{
                setIsLoading(true);
                unpublishTreeNode(node, ()=>{
                    onFinish === null || onFinish === void 0 ? void 0 : onFinish();
                    setIsLoading(false);
                });
            }
        };
    };
    const unpublishTreeContextMenuItem = (node)=>{
        return {
            label: t('element.unpublish'),
            key: ___WEBPACK_IMPORTED_MODULE_9__.ContextMenuActionName.unpublish,
            isLoading,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: "eye-off"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/unpublish/use-unpublish.tsx",
                lineNumber: 71,
                columnNumber: 13
            }, undefined),
            hidden: node.isPublished === false || !isTreeActionAllowed(_Pimcore_modules_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_3__.TreePermission.Unpublish) || isUnpublishHidden(node),
            onClick: ()=>{
                unpublishTreeNode(node);
            }
        };
    };
    return {
        unpublishTreeContextMenuItem,
        unpublishContextMenuItem
    };
};
_s(useUnpublish, "DXszsBxr2ek2Lqcr7eSMrOMU7g0=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation,
        _tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_8__.useTreePermission,
        _hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_6__.useElementHelper
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
"./js/src/core/modules/element/draft/hooks/use-published.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  usePublishedDraft: () => (usePublishedDraft),
  usePublishedReducers: () => (usePublishedReducers)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

const usePublishedReducers = (entityAdapter)=>{
    const publishDraft = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.published = true;
            return draft;
        });
    };
    const unpublishDraft = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.published = false;
            return draft;
        });
    };
    const modifyDraft = (state, id, modification)=>{
        const draft = entityAdapter.getSelectors().selectById(state, id);
        if (draft === undefined) {
            return;
        }
        state.entities[id] = modification({
            ...draft
        });
    };
    return {
        publishDraft,
        unpublishDraft
    };
};
const usePublishedDraft = (id, publishDraftAction, unpublishDraftAction)=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const [, startTransition] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useTransition)();
    return {
        publishDraft: ()=>{
            startTransition(()=>{
                dispatch(publishDraftAction({
                    id
                }));
            });
        },
        unpublishDraft: ()=>{
            startTransition(()=>{
                dispatch(unpublishDraftAction({
                    id
                }));
            });
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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/footer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  HotspotImageFooter: () => (HotspotImageFooter)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/button-group/button-group.tsx");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-helper.ts");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_hotspot_image_utils_value_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/utils/value-data.ts");
/* ESM import */var _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/message/useMessage/index.tsx");
/* ESM import */var _Pimcore_modules_element_element_selector_components_triggers_button_element_selector_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/element-selector/components/triggers/button/element-selector-button.tsx");
/* ESM import */var _Pimcore_components_dropdown_selection_selection_provider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/dropdown/selection/selection-provider.tsx");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
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














const HotspotImageFooter = (props)=>{
    var _props_value_image, _props_value;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    const { openAsset } = (0,_Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_7__.useAssetHelper)();
    const messageApi = (0,_Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_11__.useMessage)();
    const clearValueData = async ()=>{
        props.setValue({
            ...props.value,
            hotspots: [],
            marker: [],
            crop: {}
        });
        await messageApi.success(t('hotspots.data-cleared'));
    };
    const buttons = [
        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
            title: t('open'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_2__.IconButton, {
                disabled: (0,lodash__WEBPACK_IMPORTED_MODULE_3__.isEmpty)(props.value),
                icon: {
                    value: 'open-folder'
                },
                onClick: ()=>{
                    var _props_value_image, _props_value;
                    if (typeof ((_props_value = props.value) === null || _props_value === void 0 ? void 0 : (_props_value_image = _props_value.image) === null || _props_value_image === void 0 ? void 0 : _props_value_image.id) === 'number') {
                        openAsset({
                            config: {
                                id: props.value.image.id
                            }
                        });
                    }
                }
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/footer.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, undefined)
        }, "open", false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/footer.tsx",
            lineNumber: 57,
            columnNumber: 5
        }, undefined)
    ];
    if (props.disabled !== true) {
        buttons.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_element_selector_components_triggers_button_element_selector_button__WEBPACK_IMPORTED_MODULE_12__.ElementSelectorButton, {
            elementSelectorConfig: {
                selectionType: _Pimcore_components_dropdown_selection_selection_provider__WEBPACK_IMPORTED_MODULE_13__.SelectionType.Single,
                areas: {
                    asset: true,
                    object: false,
                    document: false
                },
                config: {
                    assets: {
                        allowedTypes: [
                            'image'
                        ]
                    }
                },
                onFinish: (event)=>{
                    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isEmpty)(event.items)) {
                        props.replaceImage({
                            type: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_14__.elementTypes.asset,
                            id: event.items[0].data.id
                        });
                    }
                }
            }
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/footer.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, undefined));
        buttons.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
            title: t('empty'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_2__.IconButton, {
                disabled: (0,lodash__WEBPACK_IMPORTED_MODULE_3__.isEmpty)(props.value) || props.disabled,
                icon: {
                    value: 'trash'
                },
                onClick: props.emptyValue
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/footer.tsx",
                lineNumber: 104,
                columnNumber: 9
            }, undefined)
        }, "empty", false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/footer.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, undefined));
    }
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNumber)((_props_value = props.value) === null || _props_value === void 0 ? void 0 : (_props_value_image = _props_value.image) === null || _props_value_image === void 0 ? void 0 : _props_value_image.id)) {
        buttons.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_8__.Dropdown, {
            menu: {
                items: [
                    {
                        label: t('crop'),
                        key: 'crop',
                        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_9__.Icon, {
                            value: 'crop'
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/footer.tsx",
                            lineNumber: 122,
                            columnNumber: 21
                        }, void 0),
                        onClick: async ()=>{
                            props.setCropModalOpen(true);
                        }
                    },
                    {
                        label: t(props.disabled === true ? 'hotspots.show' : 'hotspots.edit'),
                        key: 'hotspots-edit',
                        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_9__.Icon, {
                            value: 'new-marker'
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/footer.tsx",
                            lineNumber: 130,
                            columnNumber: 21
                        }, void 0),
                        onClick: async ()=>{
                            props.setMarkerModalOpen(true);
                        }
                    },
                    {
                        hidden: props.disabled === true || !(0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_hotspot_image_utils_value_data__WEBPACK_IMPORTED_MODULE_10__.hasValueData)(props.value),
                        label: t('hotspots.clear-data'),
                        key: 'clear-data',
                        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_9__.Icon, {
                            value: 'remove-marker'
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/footer.tsx",
                            lineNumber: 139,
                            columnNumber: 21
                        }, void 0),
                        onClick: clearValueData
                    }
                ]
            },
            placement: "topLeft",
            trigger: [
                'click'
            ],
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_2__.IconButton, {
                icon: {
                    value: 'more'
                },
                onClick: (e)=>{
                    e.stopPropagation();
                },
                size: "small"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/footer.tsx",
                lineNumber: 147,
                columnNumber: 9
            }, undefined)
        }, "more", false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/footer.tsx",
            lineNumber: 115,
            columnNumber: 7
        }, undefined));
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_6__.ButtonGroup, {
        items: buttons,
        noSpacing: true
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/footer.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, undefined);
};
_s(HotspotImageFooter, "COg1yxCrmkbr+LBbksvB+5cA2ns=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation,
        _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_7__.useAssetHelper,
        _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_11__.useMessage
    ];
});
_c = HotspotImageFooter;
var _c;
$RefreshReg$(_c, "HotspotImageFooter");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-preview/image-preview.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ImageGalleryImagePreview: () => (ImageGalleryImagePreview)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/drag-and-drop/droppable.tsx");
/* ESM import */var _Pimcore_components_image_preview_image_preview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/image-preview/image-preview.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-helper.ts");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_helpers_hotspot_image_utils_hotspot_converter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/utils/hotspot-converter.ts");
/* ESM import */var _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/message/useMessage/index.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_helpers_hotspot_image_crop_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/crop-modal.tsx");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
/* ESM import */var _Pimcore_components_dropdown_selection_selection_provider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/dropdown/selection/selection-provider.tsx");
/* ESM import */var _Pimcore_modules_element_element_selector_provider_element_selector_use_element_selector__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/element-selector/provider/element-selector/use-element-selector.tsx");
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














const ImageGalleryImagePreview = (param)=>{
    let { item, index, value, setValue, disabled, hotspotMarkersModalContainer, width, height } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    const [markerModalOpen, setMarkerModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [cropModalOpen, setCropModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { openAsset } = (0,_Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_6__.useAssetHelper)();
    const messageApi = (0,_Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_8__.useMessage)();
    const { confirm } = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_10__.useFormModal)();
    const { open: openElementSelector } = (0,_Pimcore_modules_element_element_selector_provider_element_selector_use_element_selector__WEBPACK_IMPORTED_MODULE_14__.useElementSelector)({
        selectionType: _Pimcore_components_dropdown_selection_selection_provider__WEBPACK_IMPORTED_MODULE_13__.SelectionType.Single,
        areas: {
            asset: true,
            object: false,
            document: false
        },
        config: {
            assets: {
                allowedTypes: [
                    'image'
                ]
            }
        },
        onFinish: (event)=>{
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_9__.isEmpty)(event.items)) {
                replaceImage({
                    type: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_12__.elementTypes.asset,
                    id: event.items[0].data.id
                });
            }
        }
    });
    const hotspots = (0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_helpers_hotspot_image_utils_hotspot_converter__WEBPACK_IMPORTED_MODULE_7__.toIHotspots)(item.hotspots ?? [], item.marker ?? []);
    const hideMarkerModal = ()=>{
        setMarkerModalOpen(false);
    };
    const onHotspotsChange = (iHotspots)=>{
        const { hotspots, marker } = (0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_helpers_hotspot_image_utils_hotspot_converter__WEBPACK_IMPORTED_MODULE_7__.fromIHotspots)(iHotspots);
        const newValue = value.map((v, i)=>i === index ? {
                ...v,
                hotspots,
                marker
            } : v);
        setValue(newValue);
    };
    if (hotspotMarkersModalContainer.current !== null) {
        var _hotspotMarkersModalContainer_current;
        const hotspotMarkersModalProps = {
            disabled,
            hotspots,
            crop: item.crop,
            imageId: item.image.id,
            open: markerModalOpen,
            onClose: hideMarkerModal,
            onChange: onHotspotsChange
        };
        (_hotspotMarkersModalContainer_current = hotspotMarkersModalContainer.current) === null || _hotspotMarkersModalContainer_current === void 0 ? void 0 : _hotspotMarkersModalContainer_current.setModal(index, hotspotMarkersModalProps);
    }
    const onCropChange = (crop)=>{
        const newValue = value.map((v, i)=>i === index ? {
                ...v,
                crop: crop ?? {}
            } : v);
        setValue(newValue);
    };
    const hideCropModal = ()=>{
        setCropModalOpen(false);
    };
    const clearValueData = async ()=>{
        setValue(value.map((v, i)=>i === index ? {
                ...v,
                hotspots: [],
                marker: [],
                crop: {}
            } : v));
        await messageApi.success(t('hotspots.data-cleared'));
    };
    const hasHotspotData = (index)=>{
        return !(0,lodash__WEBPACK_IMPORTED_MODULE_9__.isEmpty)(value[index].hotspots) || !(0,lodash__WEBPACK_IMPORTED_MODULE_9__.isEmpty)(value[index].marker);
    };
    const hasValueData = (index)=>{
        return hasHotspotData(index) || !(0,lodash__WEBPACK_IMPORTED_MODULE_9__.isEmpty)(value[index].crop);
    };
    const replaceImage = (newImage)=>{
        if (hasValueData(index)) {
            confirm({
                title: t('hotspots.clear-data'),
                content: t('hotspots.clear-data.dnd-message'),
                okText: t('yes'),
                cancelText: t('no'),
                onOk: ()=>{
                    setImage(index, newImage, true);
                },
                onCancel: ()=>{
                    setImage(index, newImage, false);
                }
            });
        } else {
            setImage(index, newImage, true);
        }
    };
    const setImage = (index, image, replaceValueData)=>{
        const newValue = [
            ...value
        ];
        if (replaceValueData) {
            newValue[index] = {
                image,
                hotspots: [],
                marker: [],
                crop: {}
            };
        } else {
            newValue[index] = {
                ...newValue[index],
                image
            };
        }
        setValue(newValue);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_2__.Droppable, {
                isValidContext: (info)=>{
                    if (disabled === true) {
                        return false;
                    }
                    if (info.sortable !== undefined) {
                        return true;
                    }
                    return info.type === 'asset' || info.type === 'document' || info.type === 'data-object' || info.type === 'unknown';
                },
                isValidData: (info)=>{
                    if (info.sortable !== undefined || info.type === 'unknown') {
                        return true;
                    }
                    return info.type === 'asset' && info.data.type === 'image' || info.type === 'unknown';
                },
                onDrop: (info)=>{
                    const newImage = {
                        type: 'asset',
                        id: info.data.id
                    };
                    replaceImage(newImage);
                },
                onSort: (info, dragId, dropId)=>{
                    const newValue = [
                        ...value
                    ];
                    const dragValue = value[Number(dragId)];
                    const dropValue = value[Number(dropId)];
                    if (dragValue !== undefined && dropValue !== undefined) {
                        newValue.splice(Number(dragId), 1);
                        newValue.splice(Number(dropId), 0, dragValue);
                        setValue(newValue);
                    }
                },
                variant: "outline",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_image_preview_image_preview__WEBPACK_IMPORTED_MODULE_3__.ImagePreview, {
                    assetId: item.image.id,
                    bordered: true,
                    dropdownItems: [
                        {
                            hidden: disabled,
                            key: 'add',
                            label: t('add'),
                            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                                value: 'new'
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-preview/image-preview.tsx",
                                lineNumber: 204,
                                columnNumber: 21
                            }, void 0),
                            onClick: ()=>{
                                const newValue = [
                                    ...value
                                ];
                                newValue.splice(index + 1, 0, {
                                    image: null,
                                    hotspots: [],
                                    marker: [],
                                    crop: {}
                                });
                                setValue(newValue);
                            }
                        },
                        {
                            hidden: disabled,
                            key: 'delete',
                            label: t('delete'),
                            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                                value: 'trash'
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-preview/image-preview.tsx",
                                lineNumber: 215,
                                columnNumber: 21
                            }, void 0),
                            onClick: ()=>{
                                const newValue = [
                                    ...value
                                ];
                                newValue.splice(index, 1);
                                setValue(newValue);
                            }
                        },
                        {
                            label: t('crop'),
                            key: 'crop',
                            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                                value: 'crop'
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-preview/image-preview.tsx",
                                lineNumber: 225,
                                columnNumber: 21
                            }, void 0),
                            onClick: async ()=>{
                                setCropModalOpen(true);
                            }
                        },
                        {
                            label: t(disabled === true ? 'hotspots.show' : 'hotspots.edit'),
                            key: 'hotspots-edit',
                            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                                value: 'new-marker'
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-preview/image-preview.tsx",
                                lineNumber: 233,
                                columnNumber: 21
                            }, void 0),
                            onClick: async ()=>{
                                setMarkerModalOpen(true);
                            }
                        },
                        {
                            hidden: !hasValueData(index) || disabled === true,
                            label: t('hotspots.clear-data'),
                            key: 'clear-data',
                            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                                value: 'remove-marker'
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-preview/image-preview.tsx",
                                lineNumber: 242,
                                columnNumber: 21
                            }, void 0),
                            onClick: clearValueData
                        },
                        {
                            label: t('element.open'),
                            key: 'open',
                            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                                value: 'open-folder'
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-preview/image-preview.tsx",
                                lineNumber: 248,
                                columnNumber: 21
                            }, void 0),
                            onClick: async ()=>{
                                openAsset({
                                    config: {
                                        id: item.image.id
                                    }
                                });
                            }
                        },
                        {
                            hidden: disabled,
                            key: 'search',
                            label: t('search'),
                            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                                value: 'search'
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-preview/image-preview.tsx",
                                lineNumber: 261,
                                columnNumber: 21
                            }, void 0),
                            onClick: ()=>{
                                openElementSelector();
                            }
                        },
                        {
                            hidden: disabled,
                            label: t('empty'),
                            key: 'empty',
                            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                                value: 'trash'
                            }, void 0, false, {
                                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-preview/image-preview.tsx",
                                lineNumber: 271,
                                columnNumber: 21
                            }, void 0),
                            onClick: async ()=>{
                                setValue(value.map((v, i)=>i === index ? {
                                        image: null,
                                        hotspots: [],
                                        marker: [],
                                        crop: {}
                                    } : v));
                            }
                        }
                    ],
                    height: height,
                    onHotspotsDataButtonClick: hasHotspotData(index) ? ()=>{
                        setMarkerModalOpen(true);
                    } : undefined,
                    style: {
                        backgroundColor: '#fff'
                    },
                    thumbnailSettings: item.crop,
                    width: width
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-preview/image-preview.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-preview/image-preview.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, undefined),
            cropModalOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_helpers_hotspot_image_crop_modal__WEBPACK_IMPORTED_MODULE_11__.CropModal, {
                crop: (0,lodash__WEBPACK_IMPORTED_MODULE_9__.isEmpty)(item.crop) ? null : item.crop,
                disabled: disabled,
                imageId: item.image.id,
                onChange: onCropChange,
                onClose: hideCropModal,
                open: cropModalOpen
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-preview/image-preview.tsx",
                lineNumber: 285,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true);
};
_s(ImageGalleryImagePreview, "0VPACq4okX2hcWMvP5BtGhcyJR0=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation,
        _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_6__.useAssetHelper,
        _Pimcore_components_message_useMessage__WEBPACK_IMPORTED_MODULE_8__.useMessage,
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_10__.useFormModal,
        _Pimcore_modules_element_element_selector_provider_element_selector_use_element_selector__WEBPACK_IMPORTED_MODULE_14__.useElementSelector
    ];
});
_c = ImageGalleryImagePreview;
var _c;
$RefreshReg$(_c, "ImageGalleryImagePreview");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-target/image-target.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ImageGalleryImageTarget: () => (ImageGalleryImageTarget)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/drag-and-drop/droppable.tsx");
/* ESM import */var _Pimcore_components_asset_target_asset_target__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/asset-target/asset-target.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_element_element_selector_provider_element_selector_use_element_selector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/element-selector/provider/element-selector/use-element-selector.tsx");
/* ESM import */var _Pimcore_components_dropdown_selection_selection_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/dropdown/selection/selection-provider.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* ESM import */var _image_gallery_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/image-gallery.styles.tsx");
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








const ImageGalleryImageTarget = (param)=>{
    let { index, value, setValue, disabled, width, height } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)();
    const { open: openElementSelector } = (0,_Pimcore_modules_element_element_selector_provider_element_selector_use_element_selector__WEBPACK_IMPORTED_MODULE_5__.useElementSelector)({
        selectionType: _Pimcore_components_dropdown_selection_selection_provider__WEBPACK_IMPORTED_MODULE_6__.SelectionType.Single,
        areas: {
            asset: true,
            object: false,
            document: false
        },
        config: {
            assets: {
                allowedTypes: [
                    'image'
                ]
            }
        },
        onFinish: (event)=>{
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_7__.isEmpty)(event.items)) {
                const newValue = [
                    ...value
                ];
                newValue[index] = {
                    image: {
                        type: 'asset',
                        id: event.items[0].data.id
                    },
                    hotspots: [],
                    marker: [],
                    crop: {}
                };
                setValue(newValue);
            }
        }
    });
    const { styles } = (0,_image_gallery_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_2__.Droppable, {
        className: styles.imageItem,
        isValidContext: (info)=>true,
        isValidData: (info)=>info.type === 'asset' && info.data.type === 'image',
        onDrop: (info)=>{
            const newValue = [
                ...value
            ];
            newValue[index] = {
                image: {
                    type: 'asset',
                    id: info.data.id
                },
                hotspots: [],
                marker: [],
                crop: {}
            };
            setValue(newValue);
        },
        variant: "outline",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_asset_target_asset_target__WEBPACK_IMPORTED_MODULE_3__.AssetTarget, {
            dndIcon: disabled !== true,
            height: height,
            onRemove: value[index] === undefined ? undefined : ()=>{
                const newValue = [
                    ...value
                ];
                newValue.splice(index, 1);
                setValue(newValue);
            },
            onSearch: openElementSelector,
            title: t(disabled !== true ? 'image.dnd-target' : 'empty'),
            width: width
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-target/image-target.tsx",
            lineNumber: 68,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-target/image-target.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, undefined);
};
_s(ImageGalleryImageTarget, "bhcoT+yRHzRB7AFRDL4+lTFg6F4=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation,
        _Pimcore_modules_element_element_selector_provider_element_selector_use_element_selector__WEBPACK_IMPORTED_MODULE_5__.useElementSelector,
        _image_gallery_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles
    ];
});
_c = ImageGalleryImageTarget;
var _c;
$RefreshReg$(_c, "ImageGalleryImageTarget");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image/footer.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ImageFooter: () => (ImageFooter)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/button-group/button-group.tsx");
/* ESM import */var _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/asset/hooks/use-asset-helper.ts");
/* ESM import */var _Pimcore_modules_element_element_selector_components_triggers_button_element_selector_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/element-selector/components/triggers/button/element-selector-button.tsx");
/* ESM import */var _Pimcore_components_dropdown_selection_selection_provider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/dropdown/selection/selection-provider.tsx");
/* ESM import */var _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/types/enums/element/element-type.tsx");
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










const ImageFooter = (props)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    const { openAsset } = (0,_Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_7__.useAssetHelper)();
    const buttons = [
        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
            title: t('open'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_2__.IconButton, {
                disabled: (0,lodash__WEBPACK_IMPORTED_MODULE_3__.isEmpty)(props.value),
                icon: {
                    value: 'open-folder'
                },
                onClick: ()=>{
                    var _props_value;
                    if (typeof ((_props_value = props.value) === null || _props_value === void 0 ? void 0 : _props_value.id) === 'number') {
                        openAsset({
                            config: {
                                id: props.value.id
                            }
                        });
                    }
                }
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image/footer.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, undefined)
        }, "open", false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image/footer.tsx",
            lineNumber: 37,
            columnNumber: 5
        }, undefined)
    ];
    if (props.disabled !== true) {
        buttons.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_element_selector_components_triggers_button_element_selector_button__WEBPACK_IMPORTED_MODULE_8__.ElementSelectorButton, {
            elementSelectorConfig: {
                selectionType: _Pimcore_components_dropdown_selection_selection_provider__WEBPACK_IMPORTED_MODULE_9__.SelectionType.Single,
                areas: {
                    asset: true,
                    object: false,
                    document: false
                },
                config: {
                    assets: {
                        allowedTypes: [
                            'image'
                        ]
                    }
                },
                onFinish: (event)=>{
                    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isEmpty)(event.items)) {
                        props.setValue({
                            type: _Pimcore_types_enums_element_element_type__WEBPACK_IMPORTED_MODULE_10__.elementTypes.asset,
                            id: event.items[0].data.id
                        });
                    }
                }
            }
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image/footer.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, undefined));
        buttons.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
            title: t('empty'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_2__.IconButton, {
                disabled: (0,lodash__WEBPACK_IMPORTED_MODULE_3__.isEmpty)(props.value),
                icon: {
                    value: 'trash'
                },
                onClick: props.emptyValue
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image/footer.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, undefined)
        }, "empty", false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image/footer.tsx",
            lineNumber: 79,
            columnNumber: 7
        }, undefined));
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_6__.ButtonGroup, {
        items: buttons,
        noSpacing: true
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/image/footer.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, undefined);
};
_s(ImageFooter, "PE6YbivzrtbbJ06ya/eNdTANWXM=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation,
        _Pimcore_modules_asset_hooks_use_asset_helper__WEBPACK_IMPORTED_MODULE_7__.useAssetHelper
    ];
});
_c = ImageFooter;
var _c;
$RefreshReg$(_c, "ImageFooter");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/components/toolbar/toolbar.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ManyToManyRelationToolbar: () => (ManyToManyRelationToolbar)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_modal_upload_components_modal_upload_button_modal_upload_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/modal-upload/components/modal-upload-button/modal-upload-button.tsx");
/* ESM import */var _Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/button-group/button-group.tsx");
/* ESM import */var _Pimcore_modules_element_element_selector_components_triggers_button_element_selector_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/element-selector/components/triggers/button/element-selector-button.tsx");
/* ESM import */var _Pimcore_components_dropdown_selection_selection_provider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/dropdown/selection/selection-provider.tsx");
/* ESM import */var _helpers_relations_allowed_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/allowed-types.ts");
/* ESM import */var _Pimcore_components_search_input_search_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/components/search-input/search-input.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_14__);
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














const ManyToManyRelationToolbar = (props)=>{
    _s();
    const { confirm } = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_6__.useFormModal)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation)();
    const buttons = [];
    if (props.disabled !== true) {
        buttons.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_element_selector_components_triggers_button_element_selector_button__WEBPACK_IMPORTED_MODULE_10__.ElementSelectorButton, {
            elementSelectorConfig: {
                selectionType: _Pimcore_components_dropdown_selection_selection_provider__WEBPACK_IMPORTED_MODULE_11__.SelectionType.Multiple,
                areas: (0,_helpers_relations_allowed_types__WEBPACK_IMPORTED_MODULE_12__.createElementSelectorAreas)(props),
                config: {
                    assets: {
                        allowedTypes: props.allowedAssetTypes
                    },
                    documents: {
                        allowedTypes: props.allowedAssetTypes
                    },
                    objects: {
                        allowedTypes: props.allowedClasses
                    }
                },
                onFinish: (event)=>{
                    const getSubType = (item)=>{
                        if (item.elementType === 'data-object') {
                            return item.data.classname ?? 'folder';
                        }
                        return item.data.type ?? null;
                    };
                    const items = event.items.map((item)=>({
                            id: item.data.id,
                            type: item.elementType,
                            subtype: getSubType(item),
                            fullPath: item.data.fullpath,
                            isPublished: item.data.published ?? null
                        }));
                    if (items.length > 0) {
                        props.addItems(items);
                    }
                }
            },
            type: "default"
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/components/toolbar/toolbar.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, undefined));
    }
    if (props.allowClear) {
        buttons.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
            title: t('empty'),
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
                icon: {
                    value: 'trash'
                },
                onClick: ()=>{
                    confirm({
                        title: t('remove'),
                        content: t('relations.remove-all.confirm'),
                        onOk: props.empty
                    });
                },
                type: "default"
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/components/toolbar/toolbar.tsx",
                lineNumber: 93,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/components/toolbar/toolbar.tsx",
            lineNumber: 92,
            columnNumber: 7
        }, undefined));
    }
    if (props.enableUpload) {
        buttons.push(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_modal_upload_components_modal_upload_button_modal_upload_button__WEBPACK_IMPORTED_MODULE_8__.ModalUploadButton, {
            maxItems: props.uploadMaxItems,
            onSuccess: props.addAssets,
            showMaxItemsError: props.uploadShowMaxItemsError,
            targetFolderPath: props.assetUploadPath ?? undefined
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/components/toolbar/toolbar.tsx",
            lineNumber: 110,
            columnNumber: 7
        }, undefined));
    }
    const debouncedSearch = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((0,lodash__WEBPACK_IMPORTED_MODULE_14__.debounce)((value)=>{
        props.onSearch(value);
    }, 200), [
        props.onSearch
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_5__.Box, {
        padding: "extra-small",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_2__.Flex, {
            align: "center",
            gap: "extra-small",
            justify: "space-between",
            children: [
                buttons.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_button_group_button_group__WEBPACK_IMPORTED_MODULE_9__.ButtonGroup, {
                    items: buttons
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/components/toolbar/toolbar.tsx",
                    lineNumber: 133,
                    columnNumber: 32
                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {}, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/components/toolbar/toolbar.tsx",
                    lineNumber: 133,
                    columnNumber: 68
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_search_input_search_input__WEBPACK_IMPORTED_MODULE_13__.SearchInput, {
                        onClear: ()=>{
                            props.onSearch('');
                        },
                        onInput: (e)=>{
                            debouncedSearch(e.target.value);
                        },
                        placeholder: t('search'),
                        withoutAddon: true
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/components/toolbar/toolbar.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/components/toolbar/toolbar.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/components/toolbar/toolbar.tsx",
            lineNumber: 128,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/components/toolbar/toolbar.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, undefined);
};
_s(ManyToManyRelationToolbar, "3P0BidvlPz7KjWpAA3EdGjtK7r4=", false, function() {
    return [
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_6__.useFormModal,
        react_i18next__WEBPACK_IMPORTED_MODULE_7__.useTranslation
    ];
});
_c = ManyToManyRelationToolbar;
var _c;
$RefreshReg$(_c, "ManyToManyRelationToolbar");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ManyToOneRelation: () => (ManyToOneRelation)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var _Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/drag-and-drop/droppable.tsx");
/* ESM import */var _Pimcore_components_dropdown_selection_selection_provider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/dropdown/selection/selection-provider.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/asset/actions/download/use-download.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_helpers_relations_allowed_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/allowed-types.ts");
/* ESM import */var _Pimcore_modules_element_element_selector_components_triggers_button_element_selector_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/element/element-selector/components/triggers/button/element-selector-button.tsx");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-helper.ts");
/* ESM import */var _Pimcore_modules_element_utils_element_type__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/modules/element/utils/element-type.ts");
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var _path_target__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/path-target.tsx");
/* ESM import */var _many_to_one_relation_styles__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.styles.tsx");
/* ESM import */var _Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/modules/element/element-helper.ts");
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



















const ManyToOneRelation = (props)=>{
    _s();
    const [value, setValue] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(props.value ?? null);
    const { openElement, mapToElementType } = (0,_Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_14__.useElementHelper)();
    const { download } = (0,_Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_10__.useDownload)();
    const fieldWidth = (0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_11__.useFieldWidth)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const { styles } = (0,_many_to_one_relation_styles__WEBPACK_IMPORTED_MODULE_18__.useStyles)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isEqual)(value, props.value ?? null)) {
            var _props_onChange;
            (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, value);
        }
    }, [
        value
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setValue(props.value ?? null);
    }, [
        props.value
    ]);
    const clickOpenElement = ()=>{
        if (value !== null && value.textInput !== true) {
            var _props_onOpenElement;
            const elementType = mapToElementType(value.type);
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isUndefined)(elementType)) {
                openElement({
                    type: elementType,
                    id: value.id
                }).catch(()=>{});
            }
            (_props_onOpenElement = props.onOpenElement) === null || _props_onOpenElement === void 0 ? void 0 : _props_onOpenElement.call(props);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_8__.Flex, {
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(styles.container, props.className),
        gap: "extra-small",
        style: {
            maxWidth: (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_16__.toCssDimension)(props.width, fieldWidth.large)
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: styles.droppableWrapper,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_6__.Droppable, {
                    isValidContext: (info)=>props.disabled !== true && (0,_Pimcore_modules_element_utils_element_type__WEBPACK_IMPORTED_MODULE_15__.isValidElementType)(info.type),
                    isValidData: (info)=>(0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_helpers_relations_allowed_types__WEBPACK_IMPORTED_MODULE_12__.dndIsValidData)(info, props),
                    onDrop: (info)=>{
                        const newValue = (0,_Pimcore_modules_element_element_helper__WEBPACK_IMPORTED_MODULE_19__.convertDragAndDropInfoToElementReference)(info);
                        setValue(newValue ?? null);
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_path_target__WEBPACK_IMPORTED_MODULE_17__.PathTarget, {
                        allowPathTextInput: props.allowPathTextInput,
                        disabled: props.disabled,
                        inherited: props.inherited,
                        onChange: setValue,
                        value: value
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_8__.Flex, {
                gap: "extra-small",
                children: [
                    props.allowPathTextInput !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Tooltip, {
                        title: t('open'),
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_9__.IconButton, {
                            disabled: value === null,
                            icon: {
                                value: 'open-folder'
                            },
                            onClick: clickOpenElement,
                            style: {
                                flex: '0 0 auto'
                            },
                            type: "default"
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, undefined)
                    }, "open", false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, undefined),
                    props.assetInlineDownloadAllowed === true && (value === null || value === void 0 ? void 0 : value.textInput) !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Tooltip, {
                        title: t('download'),
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_9__.IconButton, {
                            disabled: (value === null || value === void 0 ? void 0 : value.type) !== 'asset' || (value === null || value === void 0 ? void 0 : value.subtype) === 'folder',
                            icon: {
                                value: 'download'
                            },
                            onClick: ()=>{
                                download(String(value === null || value === void 0 ? void 0 : value.id));
                            },
                            type: "default"
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.tsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, undefined)
                    }, "download", false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, undefined),
                    props.allowToClearRelation === true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Tooltip, {
                        title: t('empty'),
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_9__.IconButton, {
                            disabled: value === null || props.disabled === true,
                            icon: {
                                value: 'trash'
                            },
                            onClick: ()=>{
                                setValue(null);
                            },
                            type: "default"
                        }, void 0, false, {
                            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.tsx",
                            lineNumber: 166,
                            columnNumber: 11
                        }, undefined)
                    }, "empty", false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, undefined),
                    props.disabled !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_element_selector_components_triggers_button_element_selector_button__WEBPACK_IMPORTED_MODULE_13__.ElementSelectorButton, {
                        elementSelectorConfig: {
                            selectionType: _Pimcore_components_dropdown_selection_selection_provider__WEBPACK_IMPORTED_MODULE_7__.SelectionType.Single,
                            areas: (0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_helpers_relations_allowed_types__WEBPACK_IMPORTED_MODULE_12__.createElementSelectorAreas)(props),
                            config: {
                                assets: {
                                    allowedTypes: props.allowedAssetTypes
                                },
                                documents: {
                                    allowedTypes: props.allowedAssetTypes
                                },
                                objects: {
                                    allowedTypes: props.allowedClasses
                                }
                            },
                            onFinish: (event)=>{
                                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(event.items)) {
                                    setValue({
                                        type: event.items[0].elementType,
                                        subtype: event.items[0].data.type,
                                        id: event.items[0].data.id,
                                        fullPath: event.items[0].data.fullpath
                                    });
                                }
                            }
                        },
                        type: "default"
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, undefined);
};
_s(ManyToOneRelation, "Wdl1wA1RHSwqMY59EAXla3DKq9w=", false, function() {
    return [
        _Pimcore_modules_element_hooks_use_element_helper__WEBPACK_IMPORTED_MODULE_14__.useElementHelper,
        _Pimcore_modules_asset_actions_download_use_download__WEBPACK_IMPORTED_MODULE_10__.useDownload,
        _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_providers_field_width_use_field_width__WEBPACK_IMPORTED_MODULE_11__.useFieldWidth,
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _many_to_one_relation_styles__WEBPACK_IMPORTED_MODULE_18__.useStyles
    ];
});
_c = ManyToOneRelation;
var _c;
$RefreshReg$(_c, "ManyToOneRelation");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/constants/typesList.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypesList: () => (DynamicTypesList)
});
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var DynamicTypesList = /*#__PURE__*/ function(DynamicTypesList) {
    DynamicTypesList["LOCALIZED_FIELDS"] = "localizedfields";
    DynamicTypesList["OBJECT_BRICKS"] = "objectbricks";
    DynamicTypesList["FIELD_COLLECTIONS"] = "fieldcollections";
    DynamicTypesList["BLOCK"] = "block";
    DynamicTypesList["CLASSIFICATION_STORE"] = "classificationstore";
    return DynamicTypesList;
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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-classification-store.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeObjectDataClassificationStore: () => (DynamicTypeObjectDataClassificationStore)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _dynamic_type_object_data_abstract__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract.tsx");
/* ESM import */var _components_classification_store_classification_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/classification-store.tsx");
/* ESM import */var _Pimcore_modules_data_object_editor_shared_tab_manager_tabs_versions_details_functions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/editor/shared-tab-manager/tabs/versions/details-functions.ts");
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





class DynamicTypeObjectDataClassificationStore extends _dynamic_type_object_data_abstract__WEBPACK_IMPORTED_MODULE_3__.DynamicTypeObjectDataAbstract {
    getObjectDataComponent(props) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_classification_store_classification_store__WEBPACK_IMPORTED_MODULE_4__.ClassificationStore, {
            ...props
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-classification-store.tsx",
            lineNumber: 27,
            columnNumber: 12
        }, this);
    }
    getObjectDataFormItemProps(props) {
        return {
            ...super.getObjectDataFormItemProps(props),
            label: null
        };
    }
    async processVersionFieldData(props) {
        const { item, fieldBreadcrumbTitle, fieldValueByName, versionId, versionCount } = props;
        const processClassificationStoreData = (param)=>{
            let { data, updatedFieldBreadcrumbTitle = fieldBreadcrumbTitle, groupKey } = param;
            return data.flatMap((dataItem)=>{
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(dataItem.keys)) {
                    const breadcrumbField = dataItem.title ?? dataItem.name;
                    const breadcrumbTitle = (0,_Pimcore_modules_data_object_editor_shared_tab_manager_tabs_versions_details_functions__WEBPACK_IMPORTED_MODULE_5__.getBreadcrumbTitle)(updatedFieldBreadcrumbTitle, breadcrumbField);
                    return processClassificationStoreData({
                        data: dataItem.keys,
                        updatedFieldBreadcrumbTitle: breadcrumbTitle,
                        groupKey: dataItem.id
                    });
                }
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(dataItem.definition)) {
                    const fieldValue = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.get)(fieldValueByName, groupKey ?? '');
                    return {
                        fieldBreadcrumbTitle: updatedFieldBreadcrumbTitle,
                        fieldData: {
                            ...dataItem.definition
                        },
                        fieldValue,
                        versionId,
                        versionCount
                    };
                }
                return [];
            });
        };
        async function handleClassificationStoreData() {
            try {
                if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(item)) return [];
                const breadcrumbField = item.title ?? item.name;
                const breadcrumbTitle = (0,_Pimcore_modules_data_object_editor_shared_tab_manager_tabs_versions_details_functions__WEBPACK_IMPORTED_MODULE_5__.getBreadcrumbTitle)(fieldBreadcrumbTitle, breadcrumbField);
                return processClassificationStoreData({
                    data: item.activeGroupDefinitions,
                    updatedFieldBreadcrumbTitle: breadcrumbTitle
                });
            } catch (e) {
                return [];
            }
        }
        return await handleClassificationStoreData();
    }
    constructor(...args){
        super(...args), this.id = 'classificationstore';
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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useNoteDeleteByIdMutation: () => (useNoteDeleteByIdMutation),
  useNoteElementCreateMutation: () => (useNoteElementCreateMutation),
  useNoteElementGetCollectionQuery: () => (useNoteElementGetCollectionQuery),
  useNoteElementGetTypeCollectionQuery: () => (useNoteElementGetTypeCollectionQuery),
  useNoteGetCollectionQuery: () => (useNoteGetCollectionQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Notes"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            noteGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notes`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Notes"
                ]
            }),
            noteDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notes/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Notes"
                ]
            }),
            noteElementGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notes/${queryArg.elementType}/${queryArg.id}`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            sortBy: queryArg.sortBy,
                            sortOrder: queryArg.sortOrder,
                            filter: queryArg.filter,
                            fieldFilters: queryArg.fieldFilters
                        }
                    }),
                providesTags: [
                    "Notes"
                ]
            }),
            noteElementCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notes/${queryArg.elementType}/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.createNote
                    }),
                invalidatesTags: [
                    "Notes"
                ]
            }),
            noteElementGetTypeCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notes/type/${queryArg.elementType}`
                    }),
                providesTags: [
                    "Notes"
                ]
            })
        }),
    overrideExisting: false
});

const { useNoteGetCollectionQuery, useNoteDeleteByIdMutation, useNoteElementGetCollectionQuery, useNoteElementCreateMutation, useNoteElementGetTypeCollectionQuery } = injectedRtkApi;

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  usePropertyDeleteMutation: () => (usePropertyDeleteMutation),
  usePropertyGetCollectionForElementByTypeAndIdQuery: () => (usePropertyGetCollectionForElementByTypeAndIdQuery),
  usePropertyGetCollectionQuery: () => (usePropertyGetCollectionQuery),
  usePropertyUpdateMutation: () => (usePropertyUpdateMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Properties"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            propertyGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/properties`,
                        params: {
                            elementType: queryArg.elementType,
                            filter: queryArg.filter
                        }
                    }),
                providesTags: [
                    "Properties"
                ]
            }),
            propertyUpdate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/properties/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updatePredefinedProperty
                    }),
                invalidatesTags: [
                    "Properties"
                ]
            }),
            propertyDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/properties/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Properties"
                ]
            }),
            propertyGetCollectionForElementByTypeAndId: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/properties/${queryArg.elementType}/${queryArg.id}`
                    }),
                providesTags: [
                    "Properties"
                ]
            })
        }),
    overrideExisting: false
});

const { usePropertyGetCollectionQuery, usePropertyUpdateMutation, usePropertyDeleteMutation, usePropertyGetCollectionForElementByTypeAndIdQuery } = injectedRtkApi;

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useScheduleCreateForElementByTypeAndIdMutation: () => (useScheduleCreateForElementByTypeAndIdMutation),
  useScheduleDeleteByIdMutation: () => (useScheduleDeleteByIdMutation),
  useScheduleGetCollectionForElementByTypeAndIdQuery: () => (useScheduleGetCollectionForElementByTypeAndIdQuery),
  useScheduleUpdateForElementByTypeAndIdMutation: () => (useScheduleUpdateForElementByTypeAndIdMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Schedule"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            scheduleDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/schedules/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Schedule"
                ]
            }),
            scheduleGetCollectionForElementByTypeAndId: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/schedules/${queryArg.elementType}/${queryArg.id}`
                    }),
                providesTags: [
                    "Schedule"
                ]
            }),
            scheduleUpdateForElementByTypeAndId: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/schedules/${queryArg.elementType}/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Schedule"
                ]
            }),
            scheduleCreateForElementByTypeAndId: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/schedules/${queryArg.elementType}/${queryArg.id}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Schedule"
                ]
            })
        }),
    overrideExisting: false
});

const { useScheduleDeleteByIdMutation, useScheduleGetCollectionForElementByTypeAndIdQuery, useScheduleUpdateForElementByTypeAndIdMutation, useScheduleCreateForElementByTypeAndIdMutation } = injectedRtkApi;

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useTagAssignToElementMutation: () => (useTagAssignToElementMutation),
  useTagBatchOperationToElementsByTypeAndIdMutation: () => (useTagBatchOperationToElementsByTypeAndIdMutation),
  useTagCreateMutation: () => (useTagCreateMutation),
  useTagDeleteByIdMutation: () => (useTagDeleteByIdMutation),
  useTagGetByIdQuery: () => (useTagGetByIdQuery),
  useTagGetCollectionForElementByTypeAndIdQuery: () => (useTagGetCollectionForElementByTypeAndIdQuery),
  useTagGetCollectionQuery: () => (useTagGetCollectionQuery),
  useTagUnassignFromElementMutation: () => (useTagUnassignFromElementMutation),
  useTagUpdateByIdMutation: () => (useTagUpdateByIdMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Tags",
    "Tags for Element"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            tagGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tags`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            elementType: queryArg.elementType,
                            filter: queryArg.filter,
                            parentId: queryArg.parentId
                        }
                    }),
                providesTags: [
                    "Tags"
                ]
            }),
            tagCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tag`,
                        method: "POST",
                        body: queryArg.createTagParameters
                    }),
                invalidatesTags: [
                    "Tags"
                ]
            }),
            tagGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tags/${queryArg.id}`
                    }),
                providesTags: [
                    "Tags"
                ]
            }),
            tagUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tags/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updateTagParameters
                    }),
                invalidatesTags: [
                    "Tags"
                ]
            }),
            tagDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tags/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Tags"
                ]
            }),
            tagAssignToElement: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tags/assign/${queryArg.elementType}/${queryArg.id}/${queryArg.tagId}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Tags for Element"
                ]
            }),
            tagBatchOperationToElementsByTypeAndId: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tags/batch/${queryArg.operation}/${queryArg.elementType}/${queryArg.id}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Tags for Element"
                ]
            }),
            tagGetCollectionForElementByTypeAndId: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tags/${queryArg.elementType}/${queryArg.id}`
                    }),
                providesTags: [
                    "Tags for Element"
                ]
            }),
            tagUnassignFromElement: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/tags/${queryArg.elementType}/${queryArg.id}/${queryArg.tagId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Tags for Element"
                ]
            })
        }),
    overrideExisting: false
});

const { useTagGetCollectionQuery, useTagCreateMutation, useTagGetByIdQuery, useTagUpdateByIdMutation, useTagDeleteByIdMutation, useTagAssignToElementMutation, useTagBatchOperationToElementsByTypeAndIdMutation, useTagGetCollectionForElementByTypeAndIdQuery, useTagUnassignFromElementMutation } = injectedRtkApi;

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
"./js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useVersionAssetDownloadByIdQuery: () => (useVersionAssetDownloadByIdQuery),
  useVersionCleanupForElementByTypeAndIdMutation: () => (useVersionCleanupForElementByTypeAndIdMutation),
  useVersionDeleteByIdMutation: () => (useVersionDeleteByIdMutation),
  useVersionGetByIdQuery: () => (useVersionGetByIdQuery),
  useVersionGetCollectionForElementByTypeAndIdQuery: () => (useVersionGetCollectionForElementByTypeAndIdQuery),
  useVersionImageStreamByIdQuery: () => (useVersionImageStreamByIdQuery),
  useVersionPdfStreamByIdQuery: () => (useVersionPdfStreamByIdQuery),
  useVersionPublishByIdMutation: () => (useVersionPublishByIdMutation),
  useVersionUpdateByIdMutation: () => (useVersionUpdateByIdMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Versions"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            versionAssetDownloadById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}/asset/download`
                    }),
                providesTags: [
                    "Versions"
                ]
            }),
            versionImageStreamById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}/image/stream`
                    }),
                providesTags: [
                    "Versions"
                ]
            }),
            versionPdfStreamById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}/pdf/stream`
                    }),
                providesTags: [
                    "Versions"
                ]
            }),
            versionGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}`
                    }),
                providesTags: [
                    "Versions"
                ]
            }),
            versionUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updateVersion
                    }),
                invalidatesTags: [
                    "Versions"
                ]
            }),
            versionPublishById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Versions"
                ]
            }),
            versionDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Versions"
                ]
            }),
            versionGetCollectionForElementByTypeAndId: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.elementType}/${queryArg.id}`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize
                        }
                    }),
                providesTags: [
                    "Versions"
                ]
            }),
            versionCleanupForElementByTypeAndId: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/versions/${queryArg.elementType}/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Versions"
                ]
            })
        }),
    overrideExisting: false
});

const { useVersionAssetDownloadByIdQuery, useVersionImageStreamByIdQuery, useVersionPdfStreamByIdQuery, useVersionGetByIdQuery, useVersionUpdateByIdMutation, useVersionPublishByIdMutation, useVersionDeleteByIdMutation, useVersionGetCollectionForElementByTypeAndIdQuery, useVersionCleanupForElementByTypeAndIdMutation } = injectedRtkApi;

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
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Workflows"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
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
"./js/src/core/modules/element/element-api-slice-enhanced.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useElementDeleteMutation: () => (useElementDeleteMutation),
  useElementFolderCreateMutation: () => (useElementFolderCreateMutation),
  useElementGetContextPermissionsQuery: () => (useElementGetContextPermissionsQuery),
  useElementGetDeleteInfoQuery: () => (useElementGetDeleteInfoQuery),
  useElementGetIdByPathQuery: () => (useElementGetIdByPathQuery),
  useElementGetSubtypeQuery: () => (useElementGetSubtypeQuery),
  useElementResolveBySearchTermQuery: () => (useElementResolveBySearchTermQuery),
  useLazyElementResolveBySearchTermQuery: () => (useLazyElementResolveBySearchTermQuery)
});
/* ESM import */var _Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/element/element-api-slice.gen.ts");
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
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

const api = _Pimcore_modules_element_element_api_slice_gen__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes: [
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_1__.tagNames.DATA_OBJECT_DETAIL,
        _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_1__.tagNames.ASSET_DETAIL
    ],
    endpoints: {
        elementDelete: {
            invalidatesTags: (result, error, args)=>_Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_1__.invalidatingTags.ELEMENT_DETAIL(args.elementType, args.id)
        }
    }
});
const { useElementDeleteMutation, useElementGetDeleteInfoQuery, useElementFolderCreateMutation, useElementGetContextPermissionsQuery, useElementGetIdByPathQuery, useElementGetSubtypeQuery, useElementResolveBySearchTermQuery, useLazyElementResolveBySearchTermQuery } = api;

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
"./js/src/core/modules/element/element-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useElementDeleteMutation: () => (useElementDeleteMutation),
  useElementFolderCreateMutation: () => (useElementFolderCreateMutation),
  useElementGetContextPermissionsQuery: () => (useElementGetContextPermissionsQuery),
  useElementGetDeleteInfoQuery: () => (useElementGetDeleteInfoQuery),
  useElementGetIdByPathQuery: () => (useElementGetIdByPathQuery),
  useElementGetSubtypeQuery: () => (useElementGetSubtypeQuery),
  useElementGetTreeLocationQuery: () => (useElementGetTreeLocationQuery),
  useElementResolveBySearchTermQuery: () => (useElementResolveBySearchTermQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Elements"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            elementDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/delete/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Elements"
                ]
            }),
            elementGetDeleteInfo: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/delete-info/${queryArg.id}`
                    }),
                providesTags: [
                    "Elements"
                ]
            }),
            elementFolderCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/folder/${queryArg.parentId}`,
                        method: "POST",
                        body: queryArg.folderData
                    }),
                invalidatesTags: [
                    "Elements"
                ]
            }),
            elementGetContextPermissions: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/context-permissions/`
                    }),
                providesTags: [
                    "Elements"
                ]
            }),
            elementGetTreeLocation: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/location/${queryArg.id}/${queryArg.perspectiveId}`
                    }),
                providesTags: [
                    "Elements"
                ]
            }),
            elementGetIdByPath: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/path`,
                        params: {
                            elementPath: queryArg.elementPath
                        }
                    }),
                providesTags: [
                    "Elements"
                ]
            }),
            elementGetSubtype: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/subtype/${queryArg.id}`
                    }),
                providesTags: [
                    "Elements"
                ]
            }),
            elementResolveBySearchTerm: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/elements/${queryArg.elementType}/resolve`,
                        params: {
                            searchTerm: queryArg.searchTerm
                        }
                    }),
                providesTags: [
                    "Elements"
                ]
            })
        }),
    overrideExisting: false
});

const { useElementDeleteMutation, useElementGetDeleteInfoQuery, useElementFolderCreateMutation, useElementGetContextPermissionsQuery, useElementGetTreeLocationQuery, useElementGetIdByPathQuery, useElementGetSubtypeQuery, useElementResolveBySearchTermQuery } = injectedRtkApi;

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
"./js/src/core/modules/element/element-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  convertDragAndDropInfoToElementReference: () => (convertDragAndDropInfoToElementReference),
  getElementActionCacheKey: () => (getElementActionCacheKey),
  getElementIcon: () => (getElementIcon),
  getElementKey: () => (getElementKey)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
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
const getElementIcon = (element, defaultIcon)=>{
    var _element_customAttributes, _element_customAttributes1;
    if (((_element_customAttributes = element.customAttributes) === null || _element_customAttributes === void 0 ? void 0 : _element_customAttributes.icon) !== undefined && ((_element_customAttributes1 = element.customAttributes) === null || _element_customAttributes1 === void 0 ? void 0 : _element_customAttributes1.icon) !== null) {
        return element.customAttributes.icon;
    }
    if (element.icon !== undefined && element.icon !== null) {
        return element.icon;
    }
    return defaultIcon;
};
const getElementKey = (element, elementType)=>{
    if (elementType === 'asset') {
        return element.filename ?? '';
    }
    if (elementType === 'data-object') {
        return element.key ?? '';
    }
    return '';
};
const getElementActionCacheKey = (elementType, action, id)=>{
    let cacheKey = `${elementType}_ACTION_${action}`;
    if (id !== undefined) {
        cacheKey += `_ID_${id}`;
    }
    return cacheKey.toUpperCase();
};
const convertDragAndDropInfoToElementReference = (info)=>{
    const elementData = info.data;
    const getSubType = (info)=>{
        if (info.type === 'data-object') {
            return info.data.classname ?? 'folder';
        }
        return info.data.type ?? undefined;
    };
    const published = 'published' in elementData ? elementData.published : null;
    return {
        id: elementData.id,
        type: info.type === 'data-object' ? 'object' : info.type,
        fullPath: String(elementData.fullPath),
        isPublished: (0,lodash__WEBPACK_IMPORTED_MODULE_0__.isBoolean)(published) ? published : null,
        subtype: getSubType(info)
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
"./js/src/core/modules/element/element-selector/provider/element-selector/element-selector-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ElementSelectorContext: () => (ElementSelectorContext),
  ElementSelectorProvider: () => (ElementSelectorProvider),
  defaultElementSelectorConfig: () => (defaultElementSelectorConfig)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _element_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/element-selector/element-selector.tsx");
/* ESM import */var _Pimcore_components_dropdown_selection_selection_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/dropdown/selection/selection-provider.tsx");
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/utils/uuid.ts");
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




const defaultElementSelectorConfig = {
    selectionType: _Pimcore_components_dropdown_selection_selection_provider__WEBPACK_IMPORTED_MODULE_3__.SelectionType.Multiple,
    areas: {
        asset: true,
        document: true,
        object: true
    },
    config: {
        assets: {
            allowedTypes: undefined
        },
        documents: {
            allowedTypes: undefined
        },
        objects: {
            allowedTypes: undefined
        }
    }
};
const ElementSelectorContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const ElementSelectorProvider = (param)=>{
    let { children } = param;
    _s();
    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [config, setConfig] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultElementSelectorConfig);
    const [renderKey, setRenderKey] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_4__.uuid)());
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ElementSelectorContext.Provider, {
            value: {
                renderKey,
                setRenderKey,
                isOpen,
                setIsOpen,
                config,
                setConfig
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_element_selector__WEBPACK_IMPORTED_MODULE_2__.ElementSelector, {}, renderKey, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/element-selector/provider/element-selector/element-selector-provider.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, undefined),
                children
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/element-selector/provider/element-selector/element-selector-provider.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, undefined);
    }, [
        children,
        isOpen,
        config
    ]);
};
_s(ElementSelectorProvider, "mfQobjrSxW3hsVhzokApyI42XL8=");
_c = ElementSelectorProvider;
var _c;
$RefreshReg$(_c, "ElementSelectorProvider");

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
"./js/src/core/modules/element/export-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useExportCsvFolderMutation: () => (useExportCsvFolderMutation),
  useExportCsvMutation: () => (useExportCsvMutation),
  useExportDeleteCsvMutation: () => (useExportDeleteCsvMutation),
  useExportDeleteXlsxMutation: () => (useExportDeleteXlsxMutation),
  useExportDownloadCsvQuery: () => (useExportDownloadCsvQuery),
  useExportDownloadXlsxQuery: () => (useExportDownloadXlsxQuery),
  useExportXlsxFolderMutation: () => (useExportXlsxFolderMutation),
  useExportXlsxMutation: () => (useExportXlsxMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Export"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            exportDownloadCsv: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/export/download/csv/${queryArg.jobRunId}`
                    }),
                providesTags: [
                    "Export"
                ]
            }),
            exportDeleteCsv: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/export/download/csv/${queryArg.jobRunId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Export"
                ]
            }),
            exportCsv: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/export/csv`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Export"
                ]
            }),
            exportCsvFolder: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/export/csv/folder`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Export"
                ]
            }),
            exportDownloadXlsx: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/export/download/xlsx/${queryArg.jobRunId}`
                    }),
                providesTags: [
                    "Export"
                ]
            }),
            exportDeleteXlsx: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/export/download/xlsx/${queryArg.jobRunId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Export"
                ]
            }),
            exportXlsx: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/export/xlsx`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Export"
                ]
            }),
            exportXlsxFolder: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/export/xlsx/folder`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Export"
                ]
            })
        }),
    overrideExisting: false
});

const { useExportDownloadCsvQuery, useExportDeleteCsvMutation, useExportCsvMutation, useExportCsvFolderMutation, useExportDownloadXlsxQuery, useExportDeleteXlsxMutation, useExportXlsxMutation, useExportXlsxFolderMutation } = injectedRtkApi;

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
"./js/src/core/modules/element/hooks/use-element-api.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useElementApi: () => (useElementApi)
});
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_element_hooks_use_cache_update__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/hooks/use-cache-update.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice.gen.ts");
/* ESM import */var _Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice.gen.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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







const useElementApi = (elementType, cacheKey)=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_3__.useAppDispatch)();
    const [assetPatch] = (0,_Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_0__.useAssetPatchByIdMutation)({
        fixedCacheKey: cacheKey
    });
    const [dataObjectPatch] = (0,_Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.useDataObjectPatchByIdMutation)({
        fixedCacheKey: cacheKey
    });
    const [assetClone] = (0,_Pimcore_modules_asset_asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.useAssetCloneMutation)();
    const [dataObjectClone] = (0,_Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_5__.useDataObjectCloneMutation)();
    const { updateFieldValue: updateAssetFieldValue } = (0,_Pimcore_modules_element_hooks_use_cache_update__WEBPACK_IMPORTED_MODULE_2__.useCacheUpdate)('asset', [
        'ASSET_TREE'
    ]);
    const { updateFieldValue: updateDataObjectFieldValue } = (0,_Pimcore_modules_element_hooks_use_cache_update__WEBPACK_IMPORTED_MODULE_2__.useCacheUpdate)('data-object', [
        'DATA_OBJECT_TREE'
    ]);
    const elementPatch = async (args)=>{
        try {
            if (elementType === 'asset') {
                const response = await assetPatch(args);
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_6__.isUndefined)(response.error)) {
                    (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_7__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_7__.ApiError(response.error));
                }
                updateAssetFieldValue(args.body.data[0].id, 'filename', args.body.data[0].key);
                return (0,lodash__WEBPACK_IMPORTED_MODULE_6__.isUndefined)(response.error);
            } else if (elementType === 'data-object') {
                const response = await dataObjectPatch(args);
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_6__.isUndefined)(response.error)) {
                    (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_7__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_7__.ApiError(response.error));
                }
                updateDataObjectFieldValue(args.body.data[0].id, 'key', args.body.data[0].key);
                return (0,lodash__WEBPACK_IMPORTED_MODULE_6__.isUndefined)(response.error);
            }
        } catch  {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_7__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_7__.GeneralError('Error while patching element'));
        }
        return false;
    };
    const getElementById = async (id)=>{
        if (elementType === 'asset') {
            const { data } = await dispatch(_Pimcore_modules_asset_asset_api_slice_gen__WEBPACK_IMPORTED_MODULE_4__.api.endpoints.assetGetById.initiate({
                id
            }));
            if (data !== undefined) {
                return data;
            }
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            return {};
        }
        if (elementType === 'data-object') {
            const { data } = await dispatch(_Pimcore_modules_data_object_data_object_api_slice_gen__WEBPACK_IMPORTED_MODULE_5__.api.endpoints.dataObjectGetById.initiate({
                id
            }));
            if (data !== undefined) {
                return data;
            }
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            return {};
        }
    };
    const elementClone = async (args)=>{
        try {
            if (elementType === 'asset') {
                var _response_data;
                const response = await assetClone(args);
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_6__.isUndefined)(response.error)) {
                    (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_7__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_7__.ApiError(response.error));
                    return {
                        success: false
                    };
                }
                return {
                    success: true,
                    jobRunId: (_response_data = response.data) === null || _response_data === void 0 ? void 0 : _response_data.jobRunId
                };
            } else if (elementType === 'data-object') {
                var _response_data1;
                const response = await dataObjectClone(args);
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_6__.isUndefined)(response.error)) {
                    (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_7__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_7__.ApiError(response.error));
                    return {
                        success: false
                    };
                }
                return {
                    success: true,
                    jobRunId: ((_response_data1 = response.data) === null || _response_data1 === void 0 ? void 0 : _response_data1.jobRunId) ?? undefined
                };
            }
        } catch (error) {
            console.error(error);
        }
        return {
            success: false
        };
    };
    return {
        elementPatch,
        getElementById,
        elementClone
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
"./js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SelectedColumnsContext: () => (SelectedColumnsContext),
  SelectedColumnsProvider: () => (SelectedColumnsProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
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


const SelectedColumnsContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)({
    selectedColumns: [],
    setSelectedColumns: ()=>{},
    encodeColumnIdentifier: ()=>'',
    decodeColumnIdentifier: ()=>undefined
});
const SelectedColumnsProvider = (param)=>{
    let { children } = param;
    _s();
    const [selectedColumns, setSelectedColumns] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const encodeColumnIdentifier = (column)=>{
        return JSON.stringify({
            uuid: (0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_1__.uuid)(),
            key: column.key.replaceAll('.', '**'),
            locale: column.locale
        });
    };
    const decodeColumnIdentifier = (columnIdentifier)=>{
        try {
            JSON.parse(columnIdentifier);
        } catch (e) {
            return undefined;
        }
        const { key, locale } = JSON.parse(columnIdentifier);
        const formattedKey = key.replaceAll('**', '.');
        return selectedColumns.find((column)=>column.key === formattedKey && column.locale === locale);
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SelectedColumnsContext.Provider, {
            value: {
                selectedColumns,
                setSelectedColumns,
                encodeColumnIdentifier,
                decodeColumnIdentifier
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider.tsx",
            lineNumber: 72,
            columnNumber: 5
        }, undefined), [
        selectedColumns
    ]);
};
_s(SelectedColumnsProvider, "MMZk15tnGAeJ2XYddqUfTuyt/eA=");
_c = SelectedColumnsProvider;
var _c;
$RefreshReg$(_c, "SelectedColumnsProvider");

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
"./js/src/core/modules/element/permissions/permission-helper.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  checkElementPermission: () => (checkElementPermission)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
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
const checkElementPermission = (permissions, permission)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(permissions)) {
        return false;
    }
    return permissions[permission] === true;
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
"./js/src/core/modules/icon-library/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_module_system_module_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/module-system/module-system.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _Pimcore_assets_icons_arrow_narrow_right_inline_svg_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/assets/icons/arrow-narrow-right.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_accessory_inline_svg_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/assets/icons/accessory.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_add_find_inline_svg_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/assets/icons/add-find.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_add_folder_inline_svg_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/assets/icons/add-folder.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_add_image_inline_svg_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/assets/icons/add-image.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_add_package_inline_svg_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/assets/icons/add-package.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_add_something_inline_svg_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/assets/icons/add-something.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_add_user_inline_svg_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/assets/icons/add-user.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_alert_inline_svg_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/assets/icons/alert.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_asset_inline_svg_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/assets/icons/asset.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_attachment_inline_svg_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/assets/icons/attachment.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_audio_inline_svg_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/assets/icons/audio.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_auto_save_inline_svg_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./js/src/core/assets/icons/auto-save.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_batch_selection_inline_svg_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./js/src/core/assets/icons/batch-selection.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_body_style_inline_svg_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./js/src/core/assets/icons/body-style.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_bookmark_inline_svg_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./js/src/core/assets/icons/bookmark.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_cache_inline_svg_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./js/src/core/assets/icons/cache.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_calculator_inline_svg_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./js/src/core/assets/icons/calculator.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_calendar_inline_svg_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./js/src/core/assets/icons/calendar.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_car_inline_svg_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./js/src/core/assets/icons/car.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_catalog_inline_svg_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__("./js/src/core/assets/icons/catalog.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_category_inline_svg_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__("./js/src/core/assets/icons/category.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_cdp_inline_svg_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__("./js/src/core/assets/icons/cdp.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_channels_inline_svg_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__("./js/src/core/assets/icons/channels.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_check_circle_inline_svg_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__("./js/src/core/assets/icons/check-circle.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_checkbox_inline_svg_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__("./js/src/core/assets/icons/checkbox.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_checkmark_inline_svg_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__("./js/src/core/assets/icons/checkmark.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_chevron_down_inline_svg_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__("./js/src/core/assets/icons/chevron-down.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_chevron_left_inline_svg_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__("./js/src/core/assets/icons/chevron-left.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_chevron_right_inline_svg_react__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__("./js/src/core/assets/icons/chevron-right.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_chevron_selector_horizontal_inline_svg_react__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__("./js/src/core/assets/icons/chevron-selector-horizontal.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_chevron_up_inline_svg_react__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__("./js/src/core/assets/icons/chevron-up.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_children_grid_inline_svg_react__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__("./js/src/core/assets/icons/children-grid.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_close_filled_inline_svg_react__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__("./js/src/core/assets/icons/close-filled.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_close_inline_svg_react__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__("./js/src/core/assets/icons/close.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_cms_inline_svg_react__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__("./js/src/core/assets/icons/cms.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_collection_inline_svg_react__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__("./js/src/core/assets/icons/collection.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_columns_inline_svg_react__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__("./js/src/core/assets/icons/columns.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_content_duplicate_inline_svg_react__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__("./js/src/core/assets/icons/content-duplicate.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_content_inline_svg_react__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__("./js/src/core/assets/icons/content.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_copilot_inline_svg_react__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__("./js/src/core/assets/icons/copilot.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_copy_inline_svg_react__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__("./js/src/core/assets/icons/copy.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_country_select_inline_svg_react__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__("./js/src/core/assets/icons/country-select.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_crop_inline_svg_react__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__("./js/src/core/assets/icons/crop.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_custom_metadata_inline_svg_react__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__("./js/src/core/assets/icons/custom-metadata.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_customer_segment_group_inline_svg_react__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__("./js/src/core/assets/icons/customer-segment-group.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_customer_segment_inline_svg_react__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__("./js/src/core/assets/icons/customer-segment.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_customer_inline_svg_react__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__("./js/src/core/assets/icons/customer.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_customers_inline_svg_react__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__("./js/src/core/assets/icons/customers.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_cut_inline_svg_react__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__("./js/src/core/assets/icons/cut.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_dashboard_inline_svg_react__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__("./js/src/core/assets/icons/dashboard.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_data_object_variant_inline_svg_react__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__("./js/src/core/assets/icons/data-object-variant.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_data_object_inline_svg_react__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__("./js/src/core/assets/icons/data-object.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_data_quality_inline_svg_react__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__("./js/src/core/assets/icons/data-quality.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_date_time_field_inline_svg_react__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__("./js/src/core/assets/icons/date-time-field.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_delete_column_inline_svg_react__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__("./js/src/core/assets/icons/delete-column.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_delete_row_inline_svg_react__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__("./js/src/core/assets/icons/delete-row.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_dependencies_inline_svg_react__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__("./js/src/core/assets/icons/dependencies.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_details_inline_svg_react__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__("./js/src/core/assets/icons/details.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_document_inline_svg_react__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__("./js/src/core/assets/icons/document.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_double_arrow_down_inline_svg_react__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__("./js/src/core/assets/icons/double-arrow-down.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_double_arrow_left_inline_svg_react__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__("./js/src/core/assets/icons/double-arrow-left.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_double_arrow_right_inline_svg_react__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__("./js/src/core/assets/icons/double-arrow-right.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_double_arrow_up_inline_svg_react__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__("./js/src/core/assets/icons/double-arrow-up.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_download_cloud_inline_svg_react__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__("./js/src/core/assets/icons/download-cloud.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_download_zip_inline_svg_react__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__("./js/src/core/assets/icons/download-zip.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_download_inline_svg_react__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__("./js/src/core/assets/icons/download.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_draft_inline_svg_react__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__("./js/src/core/assets/icons/draft.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_drag_option_inline_svg_react__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__("./js/src/core/assets/icons/drag-option.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_drop_target_inline_svg_react__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__("./js/src/core/assets/icons/drop-target.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_edit_pen_inline_svg_react__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__("./js/src/core/assets/icons/edit-pen.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_edit_inline_svg_react__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__("./js/src/core/assets/icons/edit.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_embedded_metadata_inline_svg_react__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__("./js/src/core/assets/icons/embedded-metadata.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_event_inline_svg_react__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__("./js/src/core/assets/icons/event.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_excluded_from_nav_inline_svg_react__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__("./js/src/core/assets/icons/excluded-from-nav.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_expand_inline_svg_react__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__("./js/src/core/assets/icons/expand.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_export_inline_svg_react__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__("./js/src/core/assets/icons/export.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_eye_off_inline_svg_react__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__("./js/src/core/assets/icons/eye-off.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_eye_inline_svg_react__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__("./js/src/core/assets/icons/eye.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_factory_inline_svg_react__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__("./js/src/core/assets/icons/factory.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_favorites_inline_svg_react__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__("./js/src/core/assets/icons/favorites.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_field_collection_field_inline_svg_react__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__("./js/src/core/assets/icons/field-collection-field.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_file_locked_inline_svg_react__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__("./js/src/core/assets/icons/file-locked.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_filter_inline_svg_react__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__("./js/src/core/assets/icons/filter.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_flag_inline_svg_react__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__("./js/src/core/assets/icons/flag.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_flip_forward_inline_svg_react__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__("./js/src/core/assets/icons/flip-forward.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_focal_point_inline_svg_react__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__("./js/src/core/assets/icons/focal-point.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_folder_plus_inline_svg_react__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__("./js/src/core/assets/icons/folder-plus.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_folder_inline_svg_react__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__("./js/src/core/assets/icons/folder.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_graph_inline_svg_react__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__("./js/src/core/assets/icons/graph.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_group_by_keys_inline_svg_react__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__("./js/src/core/assets/icons/group-by-keys.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_group_inline_svg_react__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__("./js/src/core/assets/icons/group.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_heading_inline_svg_react__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__("./js/src/core/assets/icons/heading.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_help_circle_inline_svg_react__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__("./js/src/core/assets/icons/help-circle.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_history_inline_svg_react__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__("./js/src/core/assets/icons/history.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_home_root_folder_inline_svg_react__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__("./js/src/core/assets/icons/home-root-folder.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_image_inline_svg_react__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__("./js/src/core/assets/icons/image.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_info_circle_inline_svg_react__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__("./js/src/core/assets/icons/info-circle.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_info_inline_svg_react__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__("./js/src/core/assets/icons/info.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_inheritance_active_inline_svg_react__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__("./js/src/core/assets/icons/inheritance-active.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_inheritance_broken_inline_svg_react__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__("./js/src/core/assets/icons/inheritance-broken.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_json_inline_svg_react__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__("./js/src/core/assets/icons/json.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_language_select_inline_svg_react__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__("./js/src/core/assets/icons/language-select.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_layout_inline_svg_react__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__("./js/src/core/assets/icons/layout.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_list_inline_svg_react__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__("./js/src/core/assets/icons/list.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_loading_inline_svg_react__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__("./js/src/core/assets/icons/loading.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_location_marker_inline_svg_react__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__("./js/src/core/assets/icons/location-marker.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_lock_inline_svg_react__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__("./js/src/core/assets/icons/lock.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_locked_inline_svg_react__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__("./js/src/core/assets/icons/locked.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_log_out_inline_svg_react__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__("./js/src/core/assets/icons/log-out.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_long_text_inline_svg_react__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__("./js/src/core/assets/icons/long-text.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_mail_answer_inline_svg_react__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__("./js/src/core/assets/icons/mail-answer.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_many_to_many_inline_svg_react__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__("./js/src/core/assets/icons/many-to-many.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_market_inline_svg_react__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__("./js/src/core/assets/icons/market.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_marketing_inline_svg_react__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__("./js/src/core/assets/icons/marketing.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_menu_inline_svg_react__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__("./js/src/core/assets/icons/menu.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_minus_square_inline_svg_react__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__("./js/src/core/assets/icons/minus-square.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_minus_inline_svg_react__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__("./js/src/core/assets/icons/minus.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_more_inline_svg_react__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__("./js/src/core/assets/icons/more.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_move_down_inline_svg_react__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__("./js/src/core/assets/icons/move-down.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_move_up_inline_svg_react__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__("./js/src/core/assets/icons/move-up.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_multi_select_inline_svg_react__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__("./js/src/core/assets/icons/multi-select.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_new_circle_inline_svg_react__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__("./js/src/core/assets/icons/new-circle.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_new_column_inline_svg_react__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__("./js/src/core/assets/icons/new-column.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_new_hotspot_inline_svg_react__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__("./js/src/core/assets/icons/new-hotspot.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_new_marker_inline_svg_react__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__("./js/src/core/assets/icons/new-marker.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_new_row_inline_svg_react__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__("./js/src/core/assets/icons/new-row.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_new_something_inline_svg_react__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__("./js/src/core/assets/icons/new-something.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_new_inline_svg_react__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__("./js/src/core/assets/icons/new.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_news_inline_svg_react__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__("./js/src/core/assets/icons/news.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_no_content_inline_svg_react__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__("./js/src/core/assets/icons/no-content.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_notes_events_inline_svg_react__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__("./js/src/core/assets/icons/notes-events.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_notification_inline_svg_react__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__("./js/src/core/assets/icons/notification.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_number_field_inline_svg_react__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__("./js/src/core/assets/icons/number-field.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_open_folder_inline_svg_react__WEBPACK_IMPORTED_MODULE_137__ = __webpack_require__("./js/src/core/assets/icons/open-folder.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_package_inline_svg_react__WEBPACK_IMPORTED_MODULE_138__ = __webpack_require__("./js/src/core/assets/icons/package.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_paste_inline_svg_react__WEBPACK_IMPORTED_MODULE_139__ = __webpack_require__("./js/src/core/assets/icons/paste.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_pdf_inline_svg_react__WEBPACK_IMPORTED_MODULE_140__ = __webpack_require__("./js/src/core/assets/icons/pdf.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_personal_user_inline_svg_react__WEBPACK_IMPORTED_MODULE_141__ = __webpack_require__("./js/src/core/assets/icons/personal-user.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_pie_chart_inline_svg_react__WEBPACK_IMPORTED_MODULE_142__ = __webpack_require__("./js/src/core/assets/icons/pie-chart.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_pimcore_inline_svg_react__WEBPACK_IMPORTED_MODULE_143__ = __webpack_require__("./js/src/core/assets/icons/pimcore.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_pin_inline_svg_react__WEBPACK_IMPORTED_MODULE_144__ = __webpack_require__("./js/src/core/assets/icons/pin.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_pined_inline_svg_react__WEBPACK_IMPORTED_MODULE_145__ = __webpack_require__("./js/src/core/assets/icons/pined.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_plus_square_inline_svg_react__WEBPACK_IMPORTED_MODULE_146__ = __webpack_require__("./js/src/core/assets/icons/plus-square.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_presentation_inline_svg_react__WEBPACK_IMPORTED_MODULE_147__ = __webpack_require__("./js/src/core/assets/icons/presentation.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_preview_inline_svg_react__WEBPACK_IMPORTED_MODULE_148__ = __webpack_require__("./js/src/core/assets/icons/preview.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_properties_inline_svg_react__WEBPACK_IMPORTED_MODULE_149__ = __webpack_require__("./js/src/core/assets/icons/properties.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_published_inline_svg_react__WEBPACK_IMPORTED_MODULE_150__ = __webpack_require__("./js/src/core/assets/icons/published.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_questionmark_inline_svg_react__WEBPACK_IMPORTED_MODULE_151__ = __webpack_require__("./js/src/core/assets/icons/questionmark.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_refresh_inline_svg_react__WEBPACK_IMPORTED_MODULE_152__ = __webpack_require__("./js/src/core/assets/icons/refresh.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_remove_image_thumbnail_inline_svg_react__WEBPACK_IMPORTED_MODULE_153__ = __webpack_require__("./js/src/core/assets/icons/remove-image-thumbnail.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_remove_marker_inline_svg_react__WEBPACK_IMPORTED_MODULE_154__ = __webpack_require__("./js/src/core/assets/icons/remove-marker.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_remove_pdf_thumbnail_inline_svg_react__WEBPACK_IMPORTED_MODULE_155__ = __webpack_require__("./js/src/core/assets/icons/remove-pdf-thumbnail.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_remove_video_thumbnail_inline_svg_react__WEBPACK_IMPORTED_MODULE_156__ = __webpack_require__("./js/src/core/assets/icons/remove-video-thumbnail.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_rename_inline_svg_react__WEBPACK_IMPORTED_MODULE_157__ = __webpack_require__("./js/src/core/assets/icons/rename.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_required_by_inline_svg_react__WEBPACK_IMPORTED_MODULE_158__ = __webpack_require__("./js/src/core/assets/icons/required-by.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_requires_inline_svg_react__WEBPACK_IMPORTED_MODULE_159__ = __webpack_require__("./js/src/core/assets/icons/requires.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_reverse_inline_svg_react__WEBPACK_IMPORTED_MODULE_160__ = __webpack_require__("./js/src/core/assets/icons/reverse.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_run_inline_svg_react__WEBPACK_IMPORTED_MODULE_161__ = __webpack_require__("./js/src/core/assets/icons/run.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_save_inline_svg_react__WEBPACK_IMPORTED_MODULE_162__ = __webpack_require__("./js/src/core/assets/icons/save.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_schedule_inline_svg_react__WEBPACK_IMPORTED_MODULE_163__ = __webpack_require__("./js/src/core/assets/icons/schedule.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_search_inline_svg_react__WEBPACK_IMPORTED_MODULE_164__ = __webpack_require__("./js/src/core/assets/icons/search.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_segment_tagging_inline_svg_react__WEBPACK_IMPORTED_MODULE_165__ = __webpack_require__("./js/src/core/assets/icons/segment-tagging.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_seo_inline_svg_react__WEBPACK_IMPORTED_MODULE_166__ = __webpack_require__("./js/src/core/assets/icons/seo.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_settings_inline_svg_react__WEBPACK_IMPORTED_MODULE_167__ = __webpack_require__("./js/src/core/assets/icons/settings.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_share_inline_svg_react__WEBPACK_IMPORTED_MODULE_168__ = __webpack_require__("./js/src/core/assets/icons/share.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_shared_users_inline_svg_react__WEBPACK_IMPORTED_MODULE_169__ = __webpack_require__("./js/src/core/assets/icons/shared-users.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_shield_inline_svg_react__WEBPACK_IMPORTED_MODULE_170__ = __webpack_require__("./js/src/core/assets/icons/shield.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_show_details_inline_svg_react__WEBPACK_IMPORTED_MODULE_171__ = __webpack_require__("./js/src/core/assets/icons/show-details.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_spinner_inline_svg_react__WEBPACK_IMPORTED_MODULE_172__ = __webpack_require__("./js/src/core/assets/icons/spinner.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_split_view_inline_svg_react__WEBPACK_IMPORTED_MODULE_173__ = __webpack_require__("./js/src/core/assets/icons/split-view.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_style_inline_svg_react__WEBPACK_IMPORTED_MODULE_174__ = __webpack_require__("./js/src/core/assets/icons/style.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_tag_configuration_inline_svg_react__WEBPACK_IMPORTED_MODULE_175__ = __webpack_require__("./js/src/core/assets/icons/tag-configuration.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_tag_inline_svg_react__WEBPACK_IMPORTED_MODULE_176__ = __webpack_require__("./js/src/core/assets/icons/tag.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_target_inline_svg_react__WEBPACK_IMPORTED_MODULE_177__ = __webpack_require__("./js/src/core/assets/icons/target.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_tax_class_inline_svg_react__WEBPACK_IMPORTED_MODULE_178__ = __webpack_require__("./js/src/core/assets/icons/tax-class.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_text_field_inline_svg_react__WEBPACK_IMPORTED_MODULE_179__ = __webpack_require__("./js/src/core/assets/icons/text-field.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_transfer_inline_svg_react__WEBPACK_IMPORTED_MODULE_180__ = __webpack_require__("./js/src/core/assets/icons/transfer.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_translate_inline_svg_react__WEBPACK_IMPORTED_MODULE_181__ = __webpack_require__("./js/src/core/assets/icons/translate.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_trash_inline_svg_react__WEBPACK_IMPORTED_MODULE_182__ = __webpack_require__("./js/src/core/assets/icons/trash.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_tree_inline_svg_react__WEBPACK_IMPORTED_MODULE_183__ = __webpack_require__("./js/src/core/assets/icons/tree.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_txt_docs_inline_svg_react__WEBPACK_IMPORTED_MODULE_184__ = __webpack_require__("./js/src/core/assets/icons/txt-docs.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_unknown_inline_svg_react__WEBPACK_IMPORTED_MODULE_185__ = __webpack_require__("./js/src/core/assets/icons/unknown.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_unlocked_inline_svg_react__WEBPACK_IMPORTED_MODULE_186__ = __webpack_require__("./js/src/core/assets/icons/unlocked.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_upload_cloud_inline_svg_react__WEBPACK_IMPORTED_MODULE_187__ = __webpack_require__("./js/src/core/assets/icons/upload-cloud.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_upload_zip_inline_svg_react__WEBPACK_IMPORTED_MODULE_188__ = __webpack_require__("./js/src/core/assets/icons/upload-zip.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_user_select_inline_svg_react__WEBPACK_IMPORTED_MODULE_189__ = __webpack_require__("./js/src/core/assets/icons/user-select.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_user_inline_svg_react__WEBPACK_IMPORTED_MODULE_190__ = __webpack_require__("./js/src/core/assets/icons/user.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_video_inline_svg_react__WEBPACK_IMPORTED_MODULE_191__ = __webpack_require__("./js/src/core/assets/icons/video.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_view_inline_svg_react__WEBPACK_IMPORTED_MODULE_192__ = __webpack_require__("./js/src/core/assets/icons/view.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_warning_circle_inline_svg_react__WEBPACK_IMPORTED_MODULE_193__ = __webpack_require__("./js/src/core/assets/icons/warning-circle.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_webhook_inline_svg_react__WEBPACK_IMPORTED_MODULE_194__ = __webpack_require__("./js/src/core/assets/icons/webhook.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_widget_inline_svg_react__WEBPACK_IMPORTED_MODULE_195__ = __webpack_require__("./js/src/core/assets/icons/widget.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_workflow_inline_svg_react__WEBPACK_IMPORTED_MODULE_196__ = __webpack_require__("./js/src/core/assets/icons/workflow.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_wysiwyg_field_inline_svg_react__WEBPACK_IMPORTED_MODULE_197__ = __webpack_require__("./js/src/core/assets/icons/wysiwyg-field.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_x_circle_inline_svg_react__WEBPACK_IMPORTED_MODULE_198__ = __webpack_require__("./js/src/core/assets/icons/x-circle.inline.svg?react");
/* ESM import */var _Pimcore_assets_icons_xlsx_csv_inline_svg_react__WEBPACK_IMPORTED_MODULE_199__ = __webpack_require__("./js/src/core/assets/icons/xlsx-csv.inline.svg?react");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ /* eslint-disable max-lines */ 







































































































































































































_Pimcore_app_module_system_module_system__WEBPACK_IMPORTED_MODULE_1__.moduleSystem.registerModule({
    onInit: ()=>{
        const iconLibrary = _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_0__.container.get(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_2__.serviceIds.iconLibrary);
        iconLibrary.register({
            name: 'accessory',
            component: _Pimcore_assets_icons_accessory_inline_svg_react__WEBPACK_IMPORTED_MODULE_4__["default"]
        });
        iconLibrary.register({
            name: 'add-find',
            component: _Pimcore_assets_icons_add_find_inline_svg_react__WEBPACK_IMPORTED_MODULE_5__["default"]
        });
        iconLibrary.register({
            name: 'add-folder',
            component: _Pimcore_assets_icons_add_folder_inline_svg_react__WEBPACK_IMPORTED_MODULE_6__["default"]
        });
        iconLibrary.register({
            name: 'add-image',
            component: _Pimcore_assets_icons_add_image_inline_svg_react__WEBPACK_IMPORTED_MODULE_7__["default"]
        });
        iconLibrary.register({
            name: 'add-package',
            component: _Pimcore_assets_icons_add_package_inline_svg_react__WEBPACK_IMPORTED_MODULE_8__["default"]
        });
        iconLibrary.register({
            name: 'add-something',
            component: _Pimcore_assets_icons_add_something_inline_svg_react__WEBPACK_IMPORTED_MODULE_9__["default"]
        });
        iconLibrary.register({
            name: 'add-user',
            component: _Pimcore_assets_icons_add_user_inline_svg_react__WEBPACK_IMPORTED_MODULE_10__["default"]
        });
        iconLibrary.register({
            name: 'alert',
            component: _Pimcore_assets_icons_alert_inline_svg_react__WEBPACK_IMPORTED_MODULE_11__["default"]
        });
        iconLibrary.register({
            name: 'arrow-narrow-right',
            component: _Pimcore_assets_icons_arrow_narrow_right_inline_svg_react__WEBPACK_IMPORTED_MODULE_3__["default"]
        });
        iconLibrary.register({
            name: 'asset',
            component: _Pimcore_assets_icons_asset_inline_svg_react__WEBPACK_IMPORTED_MODULE_12__["default"]
        });
        iconLibrary.register({
            name: 'attachment',
            component: _Pimcore_assets_icons_attachment_inline_svg_react__WEBPACK_IMPORTED_MODULE_13__["default"]
        });
        iconLibrary.register({
            name: 'audio',
            component: _Pimcore_assets_icons_audio_inline_svg_react__WEBPACK_IMPORTED_MODULE_14__["default"]
        });
        iconLibrary.register({
            name: 'auto-save',
            component: _Pimcore_assets_icons_auto_save_inline_svg_react__WEBPACK_IMPORTED_MODULE_15__["default"]
        });
        iconLibrary.register({
            name: 'batch-selection',
            component: _Pimcore_assets_icons_batch_selection_inline_svg_react__WEBPACK_IMPORTED_MODULE_16__["default"]
        });
        iconLibrary.register({
            name: 'body-style',
            component: _Pimcore_assets_icons_body_style_inline_svg_react__WEBPACK_IMPORTED_MODULE_17__["default"]
        });
        iconLibrary.register({
            name: 'bookmark',
            component: _Pimcore_assets_icons_bookmark_inline_svg_react__WEBPACK_IMPORTED_MODULE_18__["default"]
        });
        iconLibrary.register({
            name: 'cache',
            component: _Pimcore_assets_icons_cache_inline_svg_react__WEBPACK_IMPORTED_MODULE_19__["default"]
        });
        iconLibrary.register({
            name: 'calculator',
            component: _Pimcore_assets_icons_calculator_inline_svg_react__WEBPACK_IMPORTED_MODULE_20__["default"]
        });
        iconLibrary.register({
            name: 'calendar',
            component: _Pimcore_assets_icons_calendar_inline_svg_react__WEBPACK_IMPORTED_MODULE_21__["default"]
        });
        iconLibrary.register({
            name: 'car',
            component: _Pimcore_assets_icons_car_inline_svg_react__WEBPACK_IMPORTED_MODULE_22__["default"]
        });
        iconLibrary.register({
            name: 'catalog',
            component: _Pimcore_assets_icons_catalog_inline_svg_react__WEBPACK_IMPORTED_MODULE_23__["default"]
        });
        iconLibrary.register({
            name: 'category',
            component: _Pimcore_assets_icons_category_inline_svg_react__WEBPACK_IMPORTED_MODULE_24__["default"]
        });
        iconLibrary.register({
            name: 'cdp',
            component: _Pimcore_assets_icons_cdp_inline_svg_react__WEBPACK_IMPORTED_MODULE_25__["default"]
        });
        iconLibrary.register({
            name: 'channels',
            component: _Pimcore_assets_icons_channels_inline_svg_react__WEBPACK_IMPORTED_MODULE_26__["default"]
        });
        iconLibrary.register({
            name: 'check-circle',
            component: _Pimcore_assets_icons_check_circle_inline_svg_react__WEBPACK_IMPORTED_MODULE_27__["default"]
        });
        iconLibrary.register({
            name: 'checkbox',
            component: _Pimcore_assets_icons_checkbox_inline_svg_react__WEBPACK_IMPORTED_MODULE_28__["default"]
        });
        iconLibrary.register({
            name: 'checkmark',
            component: _Pimcore_assets_icons_checkmark_inline_svg_react__WEBPACK_IMPORTED_MODULE_29__["default"]
        });
        iconLibrary.register({
            name: 'chevron-down',
            component: _Pimcore_assets_icons_chevron_down_inline_svg_react__WEBPACK_IMPORTED_MODULE_30__["default"]
        });
        iconLibrary.register({
            name: 'chevron-left',
            component: _Pimcore_assets_icons_chevron_left_inline_svg_react__WEBPACK_IMPORTED_MODULE_31__["default"]
        });
        iconLibrary.register({
            name: 'chevron-right',
            component: _Pimcore_assets_icons_chevron_right_inline_svg_react__WEBPACK_IMPORTED_MODULE_32__["default"]
        });
        iconLibrary.register({
            name: 'chevron-selector-horizontal',
            component: _Pimcore_assets_icons_chevron_selector_horizontal_inline_svg_react__WEBPACK_IMPORTED_MODULE_33__["default"]
        });
        iconLibrary.register({
            name: 'chevron-up',
            component: _Pimcore_assets_icons_chevron_up_inline_svg_react__WEBPACK_IMPORTED_MODULE_34__["default"]
        });
        iconLibrary.register({
            name: 'children-grid',
            component: _Pimcore_assets_icons_children_grid_inline_svg_react__WEBPACK_IMPORTED_MODULE_35__["default"]
        });
        iconLibrary.register({
            name: 'close-filled',
            component: _Pimcore_assets_icons_close_filled_inline_svg_react__WEBPACK_IMPORTED_MODULE_36__["default"]
        });
        iconLibrary.register({
            name: 'close',
            component: _Pimcore_assets_icons_close_inline_svg_react__WEBPACK_IMPORTED_MODULE_37__["default"]
        });
        iconLibrary.register({
            name: 'cms',
            component: _Pimcore_assets_icons_cms_inline_svg_react__WEBPACK_IMPORTED_MODULE_38__["default"]
        });
        iconLibrary.register({
            name: 'collection',
            component: _Pimcore_assets_icons_collection_inline_svg_react__WEBPACK_IMPORTED_MODULE_39__["default"]
        });
        iconLibrary.register({
            name: 'columns',
            component: _Pimcore_assets_icons_columns_inline_svg_react__WEBPACK_IMPORTED_MODULE_40__["default"]
        });
        iconLibrary.register({
            name: 'content-duplicate',
            component: _Pimcore_assets_icons_content_duplicate_inline_svg_react__WEBPACK_IMPORTED_MODULE_41__["default"]
        });
        iconLibrary.register({
            name: 'content',
            component: _Pimcore_assets_icons_content_inline_svg_react__WEBPACK_IMPORTED_MODULE_42__["default"]
        });
        iconLibrary.register({
            name: 'copilot',
            component: _Pimcore_assets_icons_copilot_inline_svg_react__WEBPACK_IMPORTED_MODULE_43__["default"]
        });
        iconLibrary.register({
            name: 'copy',
            component: _Pimcore_assets_icons_copy_inline_svg_react__WEBPACK_IMPORTED_MODULE_44__["default"]
        });
        iconLibrary.register({
            name: 'country-select',
            component: _Pimcore_assets_icons_country_select_inline_svg_react__WEBPACK_IMPORTED_MODULE_45__["default"]
        });
        iconLibrary.register({
            name: 'crop',
            component: _Pimcore_assets_icons_crop_inline_svg_react__WEBPACK_IMPORTED_MODULE_46__["default"]
        });
        iconLibrary.register({
            name: 'custom-metadata',
            component: _Pimcore_assets_icons_custom_metadata_inline_svg_react__WEBPACK_IMPORTED_MODULE_47__["default"]
        });
        iconLibrary.register({
            name: 'customer-segment-group',
            component: _Pimcore_assets_icons_customer_segment_group_inline_svg_react__WEBPACK_IMPORTED_MODULE_48__["default"]
        });
        iconLibrary.register({
            name: 'customer-segment',
            component: _Pimcore_assets_icons_customer_segment_inline_svg_react__WEBPACK_IMPORTED_MODULE_49__["default"]
        });
        iconLibrary.register({
            name: 'customer',
            component: _Pimcore_assets_icons_customer_inline_svg_react__WEBPACK_IMPORTED_MODULE_50__["default"]
        });
        iconLibrary.register({
            name: 'customers',
            component: _Pimcore_assets_icons_customers_inline_svg_react__WEBPACK_IMPORTED_MODULE_51__["default"]
        });
        iconLibrary.register({
            name: 'cut',
            component: _Pimcore_assets_icons_cut_inline_svg_react__WEBPACK_IMPORTED_MODULE_52__["default"]
        });
        iconLibrary.register({
            name: 'dashboard',
            component: _Pimcore_assets_icons_dashboard_inline_svg_react__WEBPACK_IMPORTED_MODULE_53__["default"]
        });
        iconLibrary.register({
            name: 'data-object-variant',
            component: _Pimcore_assets_icons_data_object_variant_inline_svg_react__WEBPACK_IMPORTED_MODULE_54__["default"]
        });
        iconLibrary.register({
            name: 'data-object',
            component: _Pimcore_assets_icons_data_object_inline_svg_react__WEBPACK_IMPORTED_MODULE_55__["default"]
        });
        iconLibrary.register({
            name: 'data-quality',
            component: _Pimcore_assets_icons_data_quality_inline_svg_react__WEBPACK_IMPORTED_MODULE_56__["default"]
        });
        iconLibrary.register({
            name: 'date-time-field',
            component: _Pimcore_assets_icons_date_time_field_inline_svg_react__WEBPACK_IMPORTED_MODULE_57__["default"]
        });
        iconLibrary.register({
            name: 'delete-column',
            component: _Pimcore_assets_icons_delete_column_inline_svg_react__WEBPACK_IMPORTED_MODULE_58__["default"]
        });
        iconLibrary.register({
            name: 'delete-row',
            component: _Pimcore_assets_icons_delete_row_inline_svg_react__WEBPACK_IMPORTED_MODULE_59__["default"]
        });
        iconLibrary.register({
            name: 'dependencies',
            component: _Pimcore_assets_icons_dependencies_inline_svg_react__WEBPACK_IMPORTED_MODULE_60__["default"]
        });
        iconLibrary.register({
            name: 'details',
            component: _Pimcore_assets_icons_details_inline_svg_react__WEBPACK_IMPORTED_MODULE_61__["default"]
        });
        iconLibrary.register({
            name: 'document',
            component: _Pimcore_assets_icons_document_inline_svg_react__WEBPACK_IMPORTED_MODULE_62__["default"]
        });
        iconLibrary.register({
            name: 'double-arrow-down',
            component: _Pimcore_assets_icons_double_arrow_down_inline_svg_react__WEBPACK_IMPORTED_MODULE_63__["default"]
        });
        iconLibrary.register({
            name: 'double-arrow-left',
            component: _Pimcore_assets_icons_double_arrow_left_inline_svg_react__WEBPACK_IMPORTED_MODULE_64__["default"]
        });
        iconLibrary.register({
            name: 'double-arrow-right',
            component: _Pimcore_assets_icons_double_arrow_right_inline_svg_react__WEBPACK_IMPORTED_MODULE_65__["default"]
        });
        iconLibrary.register({
            name: 'double-arrow-up',
            component: _Pimcore_assets_icons_double_arrow_up_inline_svg_react__WEBPACK_IMPORTED_MODULE_66__["default"]
        });
        iconLibrary.register({
            name: 'download-cloud',
            component: _Pimcore_assets_icons_download_cloud_inline_svg_react__WEBPACK_IMPORTED_MODULE_67__["default"]
        });
        iconLibrary.register({
            name: 'download-zip',
            component: _Pimcore_assets_icons_download_zip_inline_svg_react__WEBPACK_IMPORTED_MODULE_68__["default"]
        });
        iconLibrary.register({
            name: 'download',
            component: _Pimcore_assets_icons_download_inline_svg_react__WEBPACK_IMPORTED_MODULE_69__["default"]
        });
        iconLibrary.register({
            name: 'draft',
            component: _Pimcore_assets_icons_draft_inline_svg_react__WEBPACK_IMPORTED_MODULE_70__["default"]
        });
        iconLibrary.register({
            name: 'drag-option',
            component: _Pimcore_assets_icons_drag_option_inline_svg_react__WEBPACK_IMPORTED_MODULE_71__["default"]
        });
        iconLibrary.register({
            name: 'drop-target',
            component: _Pimcore_assets_icons_drop_target_inline_svg_react__WEBPACK_IMPORTED_MODULE_72__["default"]
        });
        iconLibrary.register({
            name: 'edit-pen',
            component: _Pimcore_assets_icons_edit_pen_inline_svg_react__WEBPACK_IMPORTED_MODULE_73__["default"]
        });
        iconLibrary.register({
            name: 'edit',
            component: _Pimcore_assets_icons_edit_inline_svg_react__WEBPACK_IMPORTED_MODULE_74__["default"]
        });
        iconLibrary.register({
            name: 'embedded-metadata',
            component: _Pimcore_assets_icons_embedded_metadata_inline_svg_react__WEBPACK_IMPORTED_MODULE_75__["default"]
        });
        iconLibrary.register({
            name: 'event',
            component: _Pimcore_assets_icons_event_inline_svg_react__WEBPACK_IMPORTED_MODULE_76__["default"]
        });
        iconLibrary.register({
            name: 'excluded-from-nav',
            component: _Pimcore_assets_icons_excluded_from_nav_inline_svg_react__WEBPACK_IMPORTED_MODULE_77__["default"]
        });
        iconLibrary.register({
            name: 'expand',
            component: _Pimcore_assets_icons_expand_inline_svg_react__WEBPACK_IMPORTED_MODULE_78__["default"]
        });
        iconLibrary.register({
            name: 'export',
            component: _Pimcore_assets_icons_export_inline_svg_react__WEBPACK_IMPORTED_MODULE_79__["default"]
        });
        iconLibrary.register({
            name: 'eye-off',
            component: _Pimcore_assets_icons_eye_off_inline_svg_react__WEBPACK_IMPORTED_MODULE_80__["default"]
        });
        iconLibrary.register({
            name: 'eye',
            component: _Pimcore_assets_icons_eye_inline_svg_react__WEBPACK_IMPORTED_MODULE_81__["default"]
        });
        iconLibrary.register({
            name: 'factory',
            component: _Pimcore_assets_icons_factory_inline_svg_react__WEBPACK_IMPORTED_MODULE_82__["default"]
        });
        iconLibrary.register({
            name: 'favorites',
            component: _Pimcore_assets_icons_favorites_inline_svg_react__WEBPACK_IMPORTED_MODULE_83__["default"]
        });
        iconLibrary.register({
            name: 'field-collection-field',
            component: _Pimcore_assets_icons_field_collection_field_inline_svg_react__WEBPACK_IMPORTED_MODULE_84__["default"]
        });
        iconLibrary.register({
            name: 'file-locked',
            component: _Pimcore_assets_icons_file_locked_inline_svg_react__WEBPACK_IMPORTED_MODULE_85__["default"]
        });
        iconLibrary.register({
            name: 'filter',
            component: _Pimcore_assets_icons_filter_inline_svg_react__WEBPACK_IMPORTED_MODULE_86__["default"]
        });
        iconLibrary.register({
            name: 'flag',
            component: _Pimcore_assets_icons_flag_inline_svg_react__WEBPACK_IMPORTED_MODULE_87__["default"]
        });
        iconLibrary.register({
            name: 'flip-forward',
            component: _Pimcore_assets_icons_flip_forward_inline_svg_react__WEBPACK_IMPORTED_MODULE_88__["default"]
        });
        iconLibrary.register({
            name: 'focal-point',
            component: _Pimcore_assets_icons_focal_point_inline_svg_react__WEBPACK_IMPORTED_MODULE_89__["default"]
        });
        iconLibrary.register({
            name: 'folder-plus',
            component: _Pimcore_assets_icons_folder_plus_inline_svg_react__WEBPACK_IMPORTED_MODULE_90__["default"]
        });
        iconLibrary.register({
            name: 'folder',
            component: _Pimcore_assets_icons_folder_inline_svg_react__WEBPACK_IMPORTED_MODULE_91__["default"]
        });
        iconLibrary.register({
            name: 'graph',
            component: _Pimcore_assets_icons_graph_inline_svg_react__WEBPACK_IMPORTED_MODULE_92__["default"]
        });
        iconLibrary.register({
            name: 'group-by-keys',
            component: _Pimcore_assets_icons_group_by_keys_inline_svg_react__WEBPACK_IMPORTED_MODULE_93__["default"]
        });
        iconLibrary.register({
            name: 'group',
            component: _Pimcore_assets_icons_group_inline_svg_react__WEBPACK_IMPORTED_MODULE_94__["default"]
        });
        iconLibrary.register({
            name: 'heading',
            component: _Pimcore_assets_icons_heading_inline_svg_react__WEBPACK_IMPORTED_MODULE_95__["default"]
        });
        iconLibrary.register({
            name: 'help-circle',
            component: _Pimcore_assets_icons_help_circle_inline_svg_react__WEBPACK_IMPORTED_MODULE_96__["default"]
        });
        iconLibrary.register({
            name: 'history',
            component: _Pimcore_assets_icons_history_inline_svg_react__WEBPACK_IMPORTED_MODULE_97__["default"]
        });
        iconLibrary.register({
            name: 'home-root-folder',
            component: _Pimcore_assets_icons_home_root_folder_inline_svg_react__WEBPACK_IMPORTED_MODULE_98__["default"]
        });
        iconLibrary.register({
            name: 'image',
            component: _Pimcore_assets_icons_image_inline_svg_react__WEBPACK_IMPORTED_MODULE_99__["default"]
        });
        iconLibrary.register({
            name: 'info-circle',
            component: _Pimcore_assets_icons_info_circle_inline_svg_react__WEBPACK_IMPORTED_MODULE_100__["default"]
        });
        iconLibrary.register({
            name: 'info',
            component: _Pimcore_assets_icons_info_inline_svg_react__WEBPACK_IMPORTED_MODULE_101__["default"]
        });
        iconLibrary.register({
            name: 'inheritance-active',
            component: _Pimcore_assets_icons_inheritance_active_inline_svg_react__WEBPACK_IMPORTED_MODULE_102__["default"]
        });
        iconLibrary.register({
            name: 'inheritance-broken',
            component: _Pimcore_assets_icons_inheritance_broken_inline_svg_react__WEBPACK_IMPORTED_MODULE_103__["default"]
        });
        iconLibrary.register({
            name: 'json',
            component: _Pimcore_assets_icons_json_inline_svg_react__WEBPACK_IMPORTED_MODULE_104__["default"]
        });
        iconLibrary.register({
            name: 'language-select',
            component: _Pimcore_assets_icons_language_select_inline_svg_react__WEBPACK_IMPORTED_MODULE_105__["default"]
        });
        iconLibrary.register({
            name: 'layout',
            component: _Pimcore_assets_icons_layout_inline_svg_react__WEBPACK_IMPORTED_MODULE_106__["default"]
        });
        iconLibrary.register({
            name: 'list',
            component: _Pimcore_assets_icons_list_inline_svg_react__WEBPACK_IMPORTED_MODULE_107__["default"]
        });
        iconLibrary.register({
            name: 'loading',
            component: _Pimcore_assets_icons_loading_inline_svg_react__WEBPACK_IMPORTED_MODULE_108__["default"]
        });
        iconLibrary.register({
            name: 'location-marker',
            component: _Pimcore_assets_icons_location_marker_inline_svg_react__WEBPACK_IMPORTED_MODULE_109__["default"]
        });
        iconLibrary.register({
            name: 'lock',
            component: _Pimcore_assets_icons_lock_inline_svg_react__WEBPACK_IMPORTED_MODULE_110__["default"]
        });
        iconLibrary.register({
            name: 'locked',
            component: _Pimcore_assets_icons_locked_inline_svg_react__WEBPACK_IMPORTED_MODULE_111__["default"]
        });
        iconLibrary.register({
            name: 'log-out',
            component: _Pimcore_assets_icons_log_out_inline_svg_react__WEBPACK_IMPORTED_MODULE_112__["default"]
        });
        iconLibrary.register({
            name: 'long-text',
            component: _Pimcore_assets_icons_long_text_inline_svg_react__WEBPACK_IMPORTED_MODULE_113__["default"]
        });
        iconLibrary.register({
            name: 'mail-answer',
            component: _Pimcore_assets_icons_mail_answer_inline_svg_react__WEBPACK_IMPORTED_MODULE_114__["default"]
        });
        iconLibrary.register({
            name: 'many-to-many',
            component: _Pimcore_assets_icons_many_to_many_inline_svg_react__WEBPACK_IMPORTED_MODULE_115__["default"]
        });
        iconLibrary.register({
            name: 'market',
            component: _Pimcore_assets_icons_market_inline_svg_react__WEBPACK_IMPORTED_MODULE_116__["default"]
        });
        iconLibrary.register({
            name: 'marketing',
            component: _Pimcore_assets_icons_marketing_inline_svg_react__WEBPACK_IMPORTED_MODULE_117__["default"]
        });
        iconLibrary.register({
            name: 'menu',
            component: _Pimcore_assets_icons_menu_inline_svg_react__WEBPACK_IMPORTED_MODULE_118__["default"]
        });
        iconLibrary.register({
            name: 'minus-square',
            component: _Pimcore_assets_icons_minus_square_inline_svg_react__WEBPACK_IMPORTED_MODULE_119__["default"]
        });
        iconLibrary.register({
            name: 'minus',
            component: _Pimcore_assets_icons_minus_inline_svg_react__WEBPACK_IMPORTED_MODULE_120__["default"]
        });
        iconLibrary.register({
            name: 'more',
            component: _Pimcore_assets_icons_more_inline_svg_react__WEBPACK_IMPORTED_MODULE_121__["default"]
        });
        iconLibrary.register({
            name: 'move-down',
            component: _Pimcore_assets_icons_move_down_inline_svg_react__WEBPACK_IMPORTED_MODULE_122__["default"]
        });
        iconLibrary.register({
            name: 'move-up',
            component: _Pimcore_assets_icons_move_up_inline_svg_react__WEBPACK_IMPORTED_MODULE_123__["default"]
        });
        iconLibrary.register({
            name: 'multi-select',
            component: _Pimcore_assets_icons_multi_select_inline_svg_react__WEBPACK_IMPORTED_MODULE_124__["default"]
        });
        iconLibrary.register({
            name: 'new-circle',
            component: _Pimcore_assets_icons_new_circle_inline_svg_react__WEBPACK_IMPORTED_MODULE_125__["default"]
        });
        iconLibrary.register({
            name: 'new-column',
            component: _Pimcore_assets_icons_new_column_inline_svg_react__WEBPACK_IMPORTED_MODULE_126__["default"]
        });
        iconLibrary.register({
            name: 'new-hotspot',
            component: _Pimcore_assets_icons_new_hotspot_inline_svg_react__WEBPACK_IMPORTED_MODULE_127__["default"]
        });
        iconLibrary.register({
            name: 'new-marker',
            component: _Pimcore_assets_icons_new_marker_inline_svg_react__WEBPACK_IMPORTED_MODULE_128__["default"]
        });
        iconLibrary.register({
            name: 'new-row',
            component: _Pimcore_assets_icons_new_row_inline_svg_react__WEBPACK_IMPORTED_MODULE_129__["default"]
        });
        iconLibrary.register({
            name: 'new-something',
            component: _Pimcore_assets_icons_new_something_inline_svg_react__WEBPACK_IMPORTED_MODULE_130__["default"]
        });
        iconLibrary.register({
            name: 'new',
            component: _Pimcore_assets_icons_new_inline_svg_react__WEBPACK_IMPORTED_MODULE_131__["default"]
        });
        iconLibrary.register({
            name: 'news',
            component: _Pimcore_assets_icons_news_inline_svg_react__WEBPACK_IMPORTED_MODULE_132__["default"]
        });
        iconLibrary.register({
            name: 'no-content',
            component: _Pimcore_assets_icons_no_content_inline_svg_react__WEBPACK_IMPORTED_MODULE_133__["default"]
        });
        iconLibrary.register({
            name: 'notes-events',
            component: _Pimcore_assets_icons_notes_events_inline_svg_react__WEBPACK_IMPORTED_MODULE_134__["default"]
        });
        iconLibrary.register({
            name: 'notification',
            component: _Pimcore_assets_icons_notification_inline_svg_react__WEBPACK_IMPORTED_MODULE_135__["default"]
        });
        iconLibrary.register({
            name: 'number-field',
            component: _Pimcore_assets_icons_number_field_inline_svg_react__WEBPACK_IMPORTED_MODULE_136__["default"]
        });
        iconLibrary.register({
            name: 'open-folder',
            component: _Pimcore_assets_icons_open_folder_inline_svg_react__WEBPACK_IMPORTED_MODULE_137__["default"]
        });
        iconLibrary.register({
            name: 'package',
            component: _Pimcore_assets_icons_package_inline_svg_react__WEBPACK_IMPORTED_MODULE_138__["default"]
        });
        iconLibrary.register({
            name: 'paste',
            component: _Pimcore_assets_icons_paste_inline_svg_react__WEBPACK_IMPORTED_MODULE_139__["default"]
        });
        iconLibrary.register({
            name: 'pdf',
            component: _Pimcore_assets_icons_pdf_inline_svg_react__WEBPACK_IMPORTED_MODULE_140__["default"]
        });
        iconLibrary.register({
            name: 'personal-user',
            component: _Pimcore_assets_icons_personal_user_inline_svg_react__WEBPACK_IMPORTED_MODULE_141__["default"]
        });
        iconLibrary.register({
            name: 'pie-chart',
            component: _Pimcore_assets_icons_pie_chart_inline_svg_react__WEBPACK_IMPORTED_MODULE_142__["default"]
        });
        iconLibrary.register({
            name: 'pimcore',
            component: _Pimcore_assets_icons_pimcore_inline_svg_react__WEBPACK_IMPORTED_MODULE_143__["default"]
        });
        iconLibrary.register({
            name: 'pin',
            component: _Pimcore_assets_icons_pin_inline_svg_react__WEBPACK_IMPORTED_MODULE_144__["default"]
        });
        iconLibrary.register({
            name: 'pined',
            component: _Pimcore_assets_icons_pined_inline_svg_react__WEBPACK_IMPORTED_MODULE_145__["default"]
        });
        iconLibrary.register({
            name: 'plus-square',
            component: _Pimcore_assets_icons_plus_square_inline_svg_react__WEBPACK_IMPORTED_MODULE_146__["default"]
        });
        iconLibrary.register({
            name: 'presentation',
            component: _Pimcore_assets_icons_presentation_inline_svg_react__WEBPACK_IMPORTED_MODULE_147__["default"]
        });
        iconLibrary.register({
            name: 'preview',
            component: _Pimcore_assets_icons_preview_inline_svg_react__WEBPACK_IMPORTED_MODULE_148__["default"]
        });
        iconLibrary.register({
            name: 'properties',
            component: _Pimcore_assets_icons_properties_inline_svg_react__WEBPACK_IMPORTED_MODULE_149__["default"]
        });
        iconLibrary.register({
            name: 'published',
            component: _Pimcore_assets_icons_published_inline_svg_react__WEBPACK_IMPORTED_MODULE_150__["default"]
        });
        iconLibrary.register({
            name: 'questionmark',
            component: _Pimcore_assets_icons_questionmark_inline_svg_react__WEBPACK_IMPORTED_MODULE_151__["default"]
        });
        iconLibrary.register({
            name: 'refresh',
            component: _Pimcore_assets_icons_refresh_inline_svg_react__WEBPACK_IMPORTED_MODULE_152__["default"]
        });
        iconLibrary.register({
            name: 'remove-image-thumbnail',
            component: _Pimcore_assets_icons_remove_image_thumbnail_inline_svg_react__WEBPACK_IMPORTED_MODULE_153__["default"]
        });
        iconLibrary.register({
            name: 'remove-marker',
            component: _Pimcore_assets_icons_remove_marker_inline_svg_react__WEBPACK_IMPORTED_MODULE_154__["default"]
        });
        iconLibrary.register({
            name: 'remove-pdf-thumbnail',
            component: _Pimcore_assets_icons_remove_pdf_thumbnail_inline_svg_react__WEBPACK_IMPORTED_MODULE_155__["default"]
        });
        iconLibrary.register({
            name: 'remove-video-thumbnail',
            component: _Pimcore_assets_icons_remove_video_thumbnail_inline_svg_react__WEBPACK_IMPORTED_MODULE_156__["default"]
        });
        iconLibrary.register({
            name: 'rename',
            component: _Pimcore_assets_icons_rename_inline_svg_react__WEBPACK_IMPORTED_MODULE_157__["default"]
        });
        iconLibrary.register({
            name: 'required-by',
            component: _Pimcore_assets_icons_required_by_inline_svg_react__WEBPACK_IMPORTED_MODULE_158__["default"]
        });
        iconLibrary.register({
            name: 'requires',
            component: _Pimcore_assets_icons_requires_inline_svg_react__WEBPACK_IMPORTED_MODULE_159__["default"]
        });
        iconLibrary.register({
            name: 'reverse',
            component: _Pimcore_assets_icons_reverse_inline_svg_react__WEBPACK_IMPORTED_MODULE_160__["default"]
        });
        iconLibrary.register({
            name: 'run',
            component: _Pimcore_assets_icons_run_inline_svg_react__WEBPACK_IMPORTED_MODULE_161__["default"]
        });
        iconLibrary.register({
            name: 'save',
            component: _Pimcore_assets_icons_save_inline_svg_react__WEBPACK_IMPORTED_MODULE_162__["default"]
        });
        iconLibrary.register({
            name: 'schedule',
            component: _Pimcore_assets_icons_schedule_inline_svg_react__WEBPACK_IMPORTED_MODULE_163__["default"]
        });
        iconLibrary.register({
            name: 'search',
            component: _Pimcore_assets_icons_search_inline_svg_react__WEBPACK_IMPORTED_MODULE_164__["default"]
        });
        iconLibrary.register({
            name: 'segment-tagging',
            component: _Pimcore_assets_icons_segment_tagging_inline_svg_react__WEBPACK_IMPORTED_MODULE_165__["default"]
        });
        iconLibrary.register({
            name: 'seo',
            component: _Pimcore_assets_icons_seo_inline_svg_react__WEBPACK_IMPORTED_MODULE_166__["default"]
        });
        iconLibrary.register({
            name: 'settings',
            component: _Pimcore_assets_icons_settings_inline_svg_react__WEBPACK_IMPORTED_MODULE_167__["default"]
        });
        iconLibrary.register({
            name: 'share',
            component: _Pimcore_assets_icons_share_inline_svg_react__WEBPACK_IMPORTED_MODULE_168__["default"]
        });
        iconLibrary.register({
            name: 'shared-users',
            component: _Pimcore_assets_icons_shared_users_inline_svg_react__WEBPACK_IMPORTED_MODULE_169__["default"]
        });
        iconLibrary.register({
            name: 'shield',
            component: _Pimcore_assets_icons_shield_inline_svg_react__WEBPACK_IMPORTED_MODULE_170__["default"]
        });
        iconLibrary.register({
            name: 'show-details',
            component: _Pimcore_assets_icons_show_details_inline_svg_react__WEBPACK_IMPORTED_MODULE_171__["default"]
        });
        iconLibrary.register({
            name: 'spinner',
            component: _Pimcore_assets_icons_spinner_inline_svg_react__WEBPACK_IMPORTED_MODULE_172__["default"]
        });
        iconLibrary.register({
            name: 'split-view',
            component: _Pimcore_assets_icons_split_view_inline_svg_react__WEBPACK_IMPORTED_MODULE_173__["default"]
        });
        iconLibrary.register({
            name: 'style',
            component: _Pimcore_assets_icons_style_inline_svg_react__WEBPACK_IMPORTED_MODULE_174__["default"]
        });
        iconLibrary.register({
            name: 'tag-configuration',
            component: _Pimcore_assets_icons_tag_configuration_inline_svg_react__WEBPACK_IMPORTED_MODULE_175__["default"]
        });
        iconLibrary.register({
            name: 'tag',
            component: _Pimcore_assets_icons_tag_inline_svg_react__WEBPACK_IMPORTED_MODULE_176__["default"]
        });
        iconLibrary.register({
            name: 'target',
            component: _Pimcore_assets_icons_target_inline_svg_react__WEBPACK_IMPORTED_MODULE_177__["default"]
        });
        iconLibrary.register({
            name: 'tax-class',
            component: _Pimcore_assets_icons_tax_class_inline_svg_react__WEBPACK_IMPORTED_MODULE_178__["default"]
        });
        iconLibrary.register({
            name: 'text-field',
            component: _Pimcore_assets_icons_text_field_inline_svg_react__WEBPACK_IMPORTED_MODULE_179__["default"]
        });
        iconLibrary.register({
            name: 'transfer',
            component: _Pimcore_assets_icons_transfer_inline_svg_react__WEBPACK_IMPORTED_MODULE_180__["default"]
        });
        iconLibrary.register({
            name: 'translate',
            component: _Pimcore_assets_icons_translate_inline_svg_react__WEBPACK_IMPORTED_MODULE_181__["default"]
        });
        iconLibrary.register({
            name: 'trash',
            component: _Pimcore_assets_icons_trash_inline_svg_react__WEBPACK_IMPORTED_MODULE_182__["default"]
        });
        iconLibrary.register({
            name: 'tree',
            component: _Pimcore_assets_icons_tree_inline_svg_react__WEBPACK_IMPORTED_MODULE_183__["default"]
        });
        iconLibrary.register({
            name: 'txt-docs',
            component: _Pimcore_assets_icons_txt_docs_inline_svg_react__WEBPACK_IMPORTED_MODULE_184__["default"]
        });
        iconLibrary.register({
            name: 'unknown',
            component: _Pimcore_assets_icons_unknown_inline_svg_react__WEBPACK_IMPORTED_MODULE_185__["default"]
        });
        iconLibrary.register({
            name: 'unlocked',
            component: _Pimcore_assets_icons_unlocked_inline_svg_react__WEBPACK_IMPORTED_MODULE_186__["default"]
        });
        iconLibrary.register({
            name: 'upload-cloud',
            component: _Pimcore_assets_icons_upload_cloud_inline_svg_react__WEBPACK_IMPORTED_MODULE_187__["default"]
        });
        iconLibrary.register({
            name: 'upload-zip',
            component: _Pimcore_assets_icons_upload_zip_inline_svg_react__WEBPACK_IMPORTED_MODULE_188__["default"]
        });
        iconLibrary.register({
            name: 'user-select',
            component: _Pimcore_assets_icons_user_select_inline_svg_react__WEBPACK_IMPORTED_MODULE_189__["default"]
        });
        iconLibrary.register({
            name: 'user',
            component: _Pimcore_assets_icons_user_inline_svg_react__WEBPACK_IMPORTED_MODULE_190__["default"]
        });
        iconLibrary.register({
            name: 'video',
            component: _Pimcore_assets_icons_video_inline_svg_react__WEBPACK_IMPORTED_MODULE_191__["default"]
        });
        iconLibrary.register({
            name: 'view',
            component: _Pimcore_assets_icons_view_inline_svg_react__WEBPACK_IMPORTED_MODULE_192__["default"]
        });
        iconLibrary.register({
            name: 'warning-circle',
            component: _Pimcore_assets_icons_warning_circle_inline_svg_react__WEBPACK_IMPORTED_MODULE_193__["default"]
        });
        iconLibrary.register({
            name: 'webhook',
            component: _Pimcore_assets_icons_webhook_inline_svg_react__WEBPACK_IMPORTED_MODULE_194__["default"]
        });
        iconLibrary.register({
            name: 'widget',
            component: _Pimcore_assets_icons_widget_inline_svg_react__WEBPACK_IMPORTED_MODULE_195__["default"]
        });
        iconLibrary.register({
            name: 'workflow',
            component: _Pimcore_assets_icons_workflow_inline_svg_react__WEBPACK_IMPORTED_MODULE_196__["default"]
        });
        iconLibrary.register({
            name: 'wysiwyg-field',
            component: _Pimcore_assets_icons_wysiwyg_field_inline_svg_react__WEBPACK_IMPORTED_MODULE_197__["default"]
        });
        iconLibrary.register({
            name: 'x-circle',
            component: _Pimcore_assets_icons_x_circle_inline_svg_react__WEBPACK_IMPORTED_MODULE_198__["default"]
        });
        iconLibrary.register({
            name: 'xlsx-csv',
            component: _Pimcore_assets_icons_xlsx_csv_inline_svg_react__WEBPACK_IMPORTED_MODULE_199__["default"]
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
"./js/src/core/modules/notifications/hooks/use-notification-detail.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useNotificationDetail: () => (useNotificationDetail)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _notifications_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/notifications/notifications-slice.gen.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _reduxjs_toolkit_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var _s = $RefreshSig$();




const useNotificationDetail = (param)=>{
    let { id } = param;
    _s();
    const [isExpanded, setIsExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const { data: notificationDetail, isLoading: detailLoading, isError: isDetailError, error: detailError } = (0,_notifications_slice_gen__WEBPACK_IMPORTED_MODULE_1__.useNotificationGetByIdQuery)(isExpanded ? {
        id
    } : _reduxjs_toolkit_query__WEBPACK_IMPORTED_MODULE_3__.skipToken);
    const [deleteNotification, { isError: isDeleteError, error: deleteError, isLoading: deleteLoading }] = (0,_notifications_slice_gen__WEBPACK_IMPORTED_MODULE_1__.useNotificationDeleteByIdMutation)();
    const deleteNotificationDetail = async ()=>{
        await deleteNotification({
            id
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (isDetailError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__.ApiError(detailError));
        }
    }, [
        isDetailError
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (isDeleteError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__.ApiError(deleteError));
        }
    }, [
        isDeleteError
    ]);
    return {
        notificationDetail,
        detailLoading,
        isExpanded,
        setIsExpanded,
        deleteNotification: deleteNotificationDetail,
        deleteLoading
    };
};
_s(useNotificationDetail, "KkXhR2jUfOUQblbTjfjV0098h0w=", false, function() {
    return [
        _notifications_slice_gen__WEBPACK_IMPORTED_MODULE_1__.useNotificationGetByIdQuery,
        _notifications_slice_gen__WEBPACK_IMPORTED_MODULE_1__.useNotificationDeleteByIdMutation
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
"./js/src/core/modules/notifications/hooks/use-notifications.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useNotifications: () => (useNotifications)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _notifications_slice_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/notifications/notifications-slice.gen.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ var _s = $RefreshSig$();



const useNotifications = ()=>{
    _s();
    const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
    const [pageSize, setPageSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(20);
    const queryArgs = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>({
            body: {
                filters: {
                    page,
                    pageSize,
                    includeDescendants: true
                }
            }
        }), [
        page,
        pageSize
    ]);
    const { data: notifications, isLoading, isError, error } = (0,_notifications_slice_gen__WEBPACK_IMPORTED_MODULE_1__.useNotificationGetCollectionQuery)(queryArgs);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (isError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_2__.ApiError(error));
        }
    }, [
        isError
    ]);
    return {
        notifications,
        isLoading,
        page,
        setPage,
        pageSize,
        setPageSize
    };
};
_s(useNotifications, "M6gcudCG0jEqJy9cEBhQWF7DdPE=", false, function() {
    return [
        _notifications_slice_gen__WEBPACK_IMPORTED_MODULE_1__.useNotificationGetCollectionQuery
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
"./js/src/core/modules/notifications/index.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NOTIFICATIONS: () => (NOTIFICATIONS)
});
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _Pimcore_app_module_system_module_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/module-system/module-system.ts");
/* ESM import */var _notifications_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/notifications/notifications-container.tsx");
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



const NOTIFICATIONS = {
    component: 'notifications',
    name: 'Notifications',
    id: 'notifications',
    config: {
        translationKey: 'notifications.label',
        icon: {
            type: 'name',
            value: 'notification'
        }
    }
};
_Pimcore_app_module_system_module_system__WEBPACK_IMPORTED_MODULE_2__.moduleSystem.registerModule({
    onInit: ()=>{
        const widgetRegistryService = _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_0__.container.get(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_1__.serviceIds.widgetManager);
        widgetRegistryService.registerWidget({
            name: 'notifications',
            component: _notifications_container__WEBPACK_IMPORTED_MODULE_3__.NotificationsContainer
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
"./js/src/core/modules/notifications/notification-detail.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NotificationDetail: () => (NotificationDetail)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/utils/helpers.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/space/space.tsx");
/* ESM import */var _Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/utils/date-time.ts");
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/text/text.tsx");
/* ESM import */var _Pimcore_components_split_split__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/split/split.tsx");
/* ESM import */var _Pimcore_components_paragraph_paragraph__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/paragraph/paragraph.tsx");
/* ESM import */var _Pimcore_components_collapse_collapse__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/collapse/collapse.tsx");
/* ESM import */var _hooks_use_notification_detail__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/notifications/hooks/use-notification-detail.tsx");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/app/i18n/index.ts");
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













const NotificationDetail = (param)=>{
    let { notification } = param;
    _s();
    const { isExpanded, setIsExpanded, notificationDetail, detailLoading, deleteNotification, deleteLoading } = (0,_hooks_use_notification_detail__WEBPACK_IMPORTED_MODULE_10__.useNotificationDetail)({
        id: notification.id
    });
    const extra = ()=>{
        const hasAttachment = notification.hasAttachment ?? undefined;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_space_space__WEBPACK_IMPORTED_MODULE_4__.Space, {
            align: "center",
            size: "extra-small",
            children: [
                hasAttachment !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Tag, {
                    children: "attachment"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                    lineNumber: 48,
                    columnNumber: 41
                }, undefined),
                notification.creationDate !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                    children: (0,_Pimcore_utils_date_time__WEBPACK_IMPORTED_MODULE_5__.formatDateTime)({
                        timestamp: notification.creationDate,
                        dateStyle: 'short',
                        timeStyle: 'medium'
                    })
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                    lineNumber: 49,
                    columnNumber: 53
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_12__.IconButton, {
                    "aria-label": _Pimcore_app_i18n__WEBPACK_IMPORTED_MODULE_13__["default"].t('aria.notes-and-events.delete'),
                    icon: {
                        value: 'trash'
                    },
                    loading: deleteLoading,
                    onClick: async (e)=>{
                        e.stopPropagation();
                        await deleteNotification();
                    },
                    theme: "primary"
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, undefined);
    };
    const children = ()=>{
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_11__.Content, {
            loading: detailLoading,
            none: notificationDetail === undefined || notificationDetail.message.length === 0,
            children: notificationDetail !== undefined && typeof notificationDetail.message === 'string' && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_paragraph_paragraph__WEBPACK_IMPORTED_MODULE_8__.Paragraph, {
                children: (0,_Pimcore_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.respectLineBreak)(notificationDetail.message)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                lineNumber: 71,
                columnNumber: 12
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
            lineNumber: 66,
            columnNumber: 7
        }, undefined);
    };
    const item = {
        key: notification.id.toString(),
        label: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_split_split__WEBPACK_IMPORTED_MODULE_7__.Split, {
            dividerSize: "small",
            size: "extra-small",
            theme: "secondary",
            children: [
                notification.title !== '' && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_6__.Text, {
                        strong: true,
                        children: notification.title
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_6__.Text, {
                    type: "secondary",
                    children: notification.sender
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
                    lineNumber: 95,
                    columnNumber: 7
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
            lineNumber: 83,
            columnNumber: 12
        }, undefined),
        extra: extra(),
        children: children()
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_collapse_collapse__WEBPACK_IMPORTED_MODULE_9__.Collapse, {
        activeKeys: isExpanded ? [
            notification.id.toString()
        ] : [],
        items: [
            item
        ],
        onChange: (expandedKeys)=>{
            if (expandedKeys.length > 0) {
                setIsExpanded(true);
            } else {
                setIsExpanded(false);
            }
        }
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-detail.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, undefined);
};
_s(NotificationDetail, "+4qVGmWPZtg/KXiL//3Tpgd5/kA=", false, function() {
    return [
        _hooks_use_notification_detail__WEBPACK_IMPORTED_MODULE_10__.useNotificationDetail
    ];
});
_c = NotificationDetail;
var _c;
$RefreshReg$(_c, "NotificationDetail");

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
"./js/src/core/modules/notifications/notification-list.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NotificationList: () => (NotificationList)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _hooks_use_notifications__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/notifications/hooks/use-notifications.tsx");
/* ESM import */var _notification_detail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/notifications/notification-detail.tsx");
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



const NotificationList = ()=>{
    _s();
    const { notifications } = (0,_hooks_use_notifications__WEBPACK_IMPORTED_MODULE_2__.useNotifications)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: notifications === null || notifications === void 0 ? void 0 : notifications.items.map((notification)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_notification_detail__WEBPACK_IMPORTED_MODULE_3__.NotificationDetail, {
                notification: notification
            }, notification.id, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notification-list.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, undefined))
    }, void 0, false);
};
_s(NotificationList, "/zaS+M+tnr5cjIsRO+nG6TcuXiY=", false, function() {
    return [
        _hooks_use_notifications__WEBPACK_IMPORTED_MODULE_2__.useNotifications
    ];
});
_c = NotificationList;
var _c;
$RefreshReg$(_c, "NotificationList");

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
"./js/src/core/modules/notifications/notifications-container.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NotificationsContainer: () => (NotificationsContainer)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_title_title__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/title/title.tsx");
/* ESM import */var _Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/toolbar/toolbar.tsx");
/* ESM import */var _Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/content-layout/content-layout.tsx");
/* ESM import */var _Pimcore_components_pagination_pagination__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/pagination/pagination.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _notification_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/notifications/notification-list.tsx");
/* ESM import */var _hooks_use_notifications__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/notifications/hooks/use-notifications.tsx");
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










const NotificationsContainer = ()=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)();
    const { notifications, isLoading, page, setPage, setPageSize } = (0,_hooks_use_notifications__WEBPACK_IMPORTED_MODULE_10__.useNotifications)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_layout_content_layout__WEBPACK_IMPORTED_MODULE_4__.ContentLayout, {
        renderToolbar: (notifications === null || notifications === void 0 ? void 0 : notifications.totalItems) !== 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_3__.Toolbar, {
            justify: "flex-end",
            theme: "secondary",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_pagination_pagination__WEBPACK_IMPORTED_MODULE_5__.Pagination, {
                current: page,
                onChange: (page, pageSize)=>{
                    setPage(page);
                    setPageSize(pageSize);
                },
                showSizeChanger: true,
                showTotal: (total)=>t('pagination.show-total', {
                        total
                    }),
                total: (notifications === null || notifications === void 0 ? void 0 : notifications.totalItems) ?? 0
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notifications-container.tsx",
                lineNumber: 40,
                columnNumber: 13
            }, void 0)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notifications-container.tsx",
            lineNumber: 36,
            columnNumber: 11
        }, void 0) : undefined,
        renderTopBar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolbar_toolbar__WEBPACK_IMPORTED_MODULE_3__.Toolbar, {
            justify: "space-between",
            margin: {
                x: 'mini',
                y: 'none'
            },
            theme: "secondary",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_title_title__WEBPACK_IMPORTED_MODULE_2__.Title, {
                children: t('notifications.label')
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notifications-container.tsx",
                lineNumber: 63,
                columnNumber: 11
            }, void 0)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notifications-container.tsx",
            lineNumber: 54,
            columnNumber: 9
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_7__.Content, {
            loading: isLoading,
            none: (notifications === null || notifications === void 0 ? void 0 : notifications.totalItems) === 0,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_8__.Box, {
                margin: {
                    x: 'extra-small',
                    y: 'none'
                },
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_notification_list__WEBPACK_IMPORTED_MODULE_9__.NotificationList, {}, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notifications-container.tsx",
                    lineNumber: 77,
                    columnNumber: 11
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notifications-container.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notifications-container.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/notifications/notifications-container.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, undefined);
};
_s(NotificationsContainer, "UT/Y2olDj/snCYsmps1AAT3EG+M=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation,
        _hooks_use_notifications__WEBPACK_IMPORTED_MODULE_10__.useNotifications
    ];
});
_c = NotificationsContainer;

var _c;
$RefreshReg$(_c, "NotificationsContainer");

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
"./js/src/core/modules/notifications/notifications-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useNotificationDeleteAllMutation: () => (useNotificationDeleteAllMutation),
  useNotificationDeleteByIdMutation: () => (useNotificationDeleteByIdMutation),
  useNotificationGetByIdQuery: () => (useNotificationGetByIdQuery),
  useNotificationGetCollectionQuery: () => (useNotificationGetCollectionQuery),
  useNotificationReadByIdMutation: () => (useNotificationReadByIdMutation),
  useNotificationSendMutation: () => (useNotificationSendMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Notifications"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            notificationGetCollection: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notifications`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Notifications"
                ]
            }),
            notificationDeleteAll: build.mutation({
                query: ()=>({
                        url: `/pimcore-studio/api/notifications`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Notifications"
                ]
            }),
            notificationGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notifications/${queryArg.id}`
                    }),
                providesTags: [
                    "Notifications"
                ]
            }),
            notificationReadById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notifications/${queryArg.id}`,
                        method: "POST"
                    }),
                invalidatesTags: [
                    "Notifications"
                ]
            }),
            notificationDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notifications/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Notifications"
                ]
            }),
            notificationSend: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/notifications/send`,
                        method: "POST",
                        body: queryArg.sendNotificationParameters
                    }),
                invalidatesTags: [
                    "Notifications"
                ]
            })
        }),
    overrideExisting: false
});

const { useNotificationGetCollectionQuery, useNotificationDeleteAllMutation, useNotificationGetByIdQuery, useNotificationReadByIdMutation, useNotificationDeleteByIdMutation, useNotificationSendMutation } = injectedRtkApi;

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
"./js/src/core/modules/perspectives/perspectives-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  usePerspectiveCreateMutation: () => (usePerspectiveCreateMutation),
  usePerspectiveDeleteMutation: () => (usePerspectiveDeleteMutation),
  usePerspectiveGetConfigByIdQuery: () => (usePerspectiveGetConfigByIdQuery),
  usePerspectiveGetConfigCollectionQuery: () => (usePerspectiveGetConfigCollectionQuery),
  usePerspectiveUpdateConfigByIdMutation: () => (usePerspectiveUpdateConfigByIdMutation),
  usePerspectiveWidgetCreateMutation: () => (usePerspectiveWidgetCreateMutation),
  usePerspectiveWidgetDeleteMutation: () => (usePerspectiveWidgetDeleteMutation),
  usePerspectiveWidgetGetConfigByIdQuery: () => (usePerspectiveWidgetGetConfigByIdQuery),
  usePerspectiveWidgetGetConfigCollectionQuery: () => (usePerspectiveWidgetGetConfigCollectionQuery),
  usePerspectiveWidgetGetTypeCollectionQuery: () => (usePerspectiveWidgetGetTypeCollectionQuery),
  usePerspectiveWidgetUpdateConfigByIdMutation: () => (usePerspectiveWidgetUpdateConfigByIdMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Perspectives"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            perspectiveCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/configuration`,
                        method: "POST",
                        body: queryArg.addPerspectiveConfig
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveGetConfigCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/perspectives/configurations`
                    }),
                providesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveGetConfigById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/configuration/${queryArg.perspectiveId}`
                    }),
                providesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveUpdateConfigById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/configuration/${queryArg.perspectiveId}`,
                        method: "PUT",
                        body: queryArg.savePerspectiveConfig
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/configuration/${queryArg.perspectiveId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/widgets/${queryArg.widgetType}/configuration`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetGetConfigCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/perspectives/widgets/configurations`
                    }),
                providesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetGetConfigById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/widgets/${queryArg.widgetType}/configuration/${queryArg.widgetId}`
                    }),
                providesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetUpdateConfigById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/widgets/${queryArg.widgetType}/configuration/${queryArg.widgetId}`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetDelete: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/perspectives/widgets/${queryArg.widgetType}/configuration/${queryArg.widgetId}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Perspectives"
                ]
            }),
            perspectiveWidgetGetTypeCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/perspectives/widgets/types`
                    }),
                providesTags: [
                    "Perspectives"
                ]
            })
        }),
    overrideExisting: false
});

const { usePerspectiveCreateMutation, usePerspectiveGetConfigCollectionQuery, usePerspectiveGetConfigByIdQuery, usePerspectiveUpdateConfigByIdMutation, usePerspectiveDeleteMutation, usePerspectiveWidgetCreateMutation, usePerspectiveWidgetGetConfigCollectionQuery, usePerspectiveWidgetGetConfigByIdQuery, usePerspectiveWidgetUpdateConfigByIdMutation, usePerspectiveWidgetDeleteMutation, usePerspectiveWidgetGetTypeCollectionQuery } = injectedRtkApi;

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
"./js/src/core/modules/search/search-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useAssetGetSearchConfigurationQuery: () => (useAssetGetSearchConfigurationQuery),
  useAssetGetSearchQuery: () => (useAssetGetSearchQuery),
  useDataObjectGetSearchConfigurationQuery: () => (useDataObjectGetSearchConfigurationQuery),
  useDataObjectGetSearchQuery: () => (useDataObjectGetSearchQuery),
  useSimpleSearchGetQuery: () => (useSimpleSearchGetQuery),
  useSimpleSearchPreviewGetQuery: () => (useSimpleSearchPreviewGetQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Search"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            assetGetSearchConfiguration: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/search/configuration/assets`
                    }),
                providesTags: [
                    "Search"
                ]
            }),
            assetGetSearch: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/search/assets`,
                        method: "POST",
                        body: queryArg.body
                    }),
                providesTags: [
                    "Search"
                ]
            }),
            dataObjectGetSearchConfiguration: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/search/configuration/data-objects`,
                        params: {
                            classId: queryArg.classId
                        }
                    }),
                providesTags: [
                    "Search"
                ]
            }),
            dataObjectGetSearch: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/search/data-objects`,
                        method: "POST",
                        body: queryArg.body,
                        params: {
                            classId: queryArg.classId
                        }
                    }),
                providesTags: [
                    "Search"
                ]
            }),
            simpleSearchPreviewGet: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/search/preview/${queryArg.elementType}/${queryArg.id}`
                    }),
                providesTags: [
                    "Search"
                ]
            }),
            simpleSearchGet: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/search`,
                        params: {
                            page: queryArg.page,
                            pageSize: queryArg.pageSize,
                            searchTerm: queryArg.searchTerm
                        }
                    }),
                providesTags: [
                    "Search"
                ]
            })
        }),
    overrideExisting: false
});

const { useAssetGetSearchConfigurationQuery, useAssetGetSearchQuery, useDataObjectGetSearchConfigurationQuery, useDataObjectGetSearchQuery, useSimpleSearchPreviewGetQuery, useSimpleSearchGetQuery } = injectedRtkApi;

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
"./js/src/core/modules/user/roles/roles-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useRoleCloneByIdMutation: () => (useRoleCloneByIdMutation),
  useRoleCreateMutation: () => (useRoleCreateMutation),
  useRoleDeleteByIdMutation: () => (useRoleDeleteByIdMutation),
  useRoleFolderCreateMutation: () => (useRoleFolderCreateMutation),
  useRoleFolderDeleteByIdMutation: () => (useRoleFolderDeleteByIdMutation),
  useRoleGetByIdQuery: () => (useRoleGetByIdQuery),
  useRoleGetCollectionQuery: () => (useRoleGetCollectionQuery),
  useRoleGetTreeQuery: () => (useRoleGetTreeQuery),
  useRoleUpdateByIdMutation: () => (useRoleUpdateByIdMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Role Management"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            roleCloneById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/clone/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleFolderCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/folder`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleFolderDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/folder/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/${queryArg.id}`
                    }),
                providesTags: [
                    "Role Management"
                ]
            }),
            roleUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updateRole
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/role/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "Role Management"
                ]
            }),
            roleGetCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/roles`
                    }),
                providesTags: [
                    "Role Management"
                ]
            }),
            roleGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/roles/tree`,
                        params: {
                            parentId: queryArg.parentId
                        }
                    }),
                providesTags: [
                    "Role Management"
                ]
            })
        }),
    overrideExisting: false
});

const { useRoleCloneByIdMutation, useRoleFolderCreateMutation, useRoleCreateMutation, useRoleFolderDeleteByIdMutation, useRoleGetByIdQuery, useRoleUpdateByIdMutation, useRoleDeleteByIdMutation, useRoleGetCollectionQuery, useRoleGetTreeQuery } = injectedRtkApi;

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
"./js/src/core/modules/user/user-api-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  usePimcoreStudioApiUserSearchQuery: () => (usePimcoreStudioApiUserSearchQuery),
  useUserCloneByIdMutation: () => (useUserCloneByIdMutation),
  useUserCreateMutation: () => (useUserCreateMutation),
  useUserDefaultKeyBindingsQuery: () => (useUserDefaultKeyBindingsQuery),
  useUserDeleteByIdMutation: () => (useUserDeleteByIdMutation),
  useUserFolderCreateMutation: () => (useUserFolderCreateMutation),
  useUserFolderDeleteByIdMutation: () => (useUserFolderDeleteByIdMutation),
  useUserGetAvailablePermissionsQuery: () => (useUserGetAvailablePermissionsQuery),
  useUserGetByIdQuery: () => (useUserGetByIdQuery),
  useUserGetCollectionQuery: () => (useUserGetCollectionQuery),
  useUserGetCurrentInformationQuery: () => (useUserGetCurrentInformationQuery),
  useUserGetImageQuery: () => (useUserGetImageQuery),
  useUserGetTreeQuery: () => (useUserGetTreeQuery),
  useUserResetPasswordMutation: () => (useUserResetPasswordMutation),
  useUserUpdateActivePerspectiveMutation: () => (useUserUpdateActivePerspectiveMutation),
  useUserUpdateByIdMutation: () => (useUserUpdateByIdMutation),
  useUserUpdatePasswordByIdMutation: () => (useUserUpdatePasswordByIdMutation),
  useUserUpdateProfileMutation: () => (useUserUpdateProfileMutation),
  useUserUploadImageMutation: () => (useUserUploadImageMutation)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "User Management"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            userCloneById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/clone/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userFolderCreate: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/folder`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userGetCurrentInformation: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/user/current-user-information`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userUpdateById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`,
                        method: "PUT",
                        body: queryArg.updateUser
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userFolderDeleteById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/folder/${queryArg.id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userDefaultKeyBindings: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/users/default-key-bindings`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetAvailablePermissions: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/user/available-permissions`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetCollection: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/users`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userResetPassword: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/reset-password`,
                        method: "POST",
                        body: queryArg.resetPassword
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            pimcoreStudioApiUserSearch: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/search`,
                        params: {
                            searchQuery: queryArg.searchQuery
                        }
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userUpdateActivePerspective: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/active-perspective/${queryArg.perspectiveId}`,
                        method: "PUT"
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUpdatePasswordById: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/${queryArg.id}/password`,
                        method: "PUT",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUpdateProfile: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/update-profile`,
                        method: "PUT",
                        body: queryArg.updateUserProfile
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userUploadImage: build.mutation({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/upload-image/${queryArg.id}`,
                        method: "POST",
                        body: queryArg.body
                    }),
                invalidatesTags: [
                    "User Management"
                ]
            }),
            userGetImage: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/user/image/${queryArg.id}`
                    }),
                providesTags: [
                    "User Management"
                ]
            }),
            userGetTree: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/users/tree`,
                        params: {
                            parentId: queryArg.parentId
                        }
                    }),
                providesTags: [
                    "User Management"
                ]
            })
        }),
    overrideExisting: false
});

const { useUserCloneByIdMutation, useUserCreateMutation, useUserFolderCreateMutation, useUserGetCurrentInformationQuery, useUserGetByIdQuery, useUserUpdateByIdMutation, useUserDeleteByIdMutation, useUserFolderDeleteByIdMutation, useUserDefaultKeyBindingsQuery, useUserGetAvailablePermissionsQuery, useUserGetCollectionQuery, useUserResetPasswordMutation, usePimcoreStudioApiUserSearchQuery, useUserUpdateActivePerspectiveMutation, useUserUpdatePasswordByIdMutation, useUserUpdateProfileMutation, useUserUploadImageMutation, useUserGetImageQuery, useUserGetTreeQuery } = injectedRtkApi;

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
/* ESM import */var _Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/auth/permission-helper.ts");
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
                selected: getWidgetIndex(widgetsLeft, activePerspective === null || activePerspective === void 0 ? void 0 : activePerspective.expandedLeft),
                children: widgetsLeft
            },
            {
                type: 'border',
                location: 'right',
                size: 315,
                selected: getWidgetIndex(widgetsRight, activePerspective === null || activePerspective === void 0 ? void 0 : activePerspective.expandedRight),
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
    const widgetIndex = widgets.findIndex((widget)=>widget.id === widgetId);
    if (widgetIndex === -1) {
        return widgets.length > 0 ? 0 : undefined;
    }
    return widgetIndex;
};
const widgetsToModelJson = (widgets, usedIds)=>{
    const result = [];
    const hasDocumentPermission =  false ? 0 : (0,_Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_4__.isAllowed)('documents');
    const hasAssetPermission = (0,_Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_4__.isAllowed)('assets');
    const hasObjectPermission = (0,_Pimcore_modules_auth_permission_helper__WEBPACK_IMPORTED_MODULE_4__.isAllowed)('objects');
    widgets === null || widgets === void 0 ? void 0 : widgets.forEach((widget)=>{
        // skip document trees until we have a documents implementation
        if (widget.widgetType === 'element_tree' && 'elementType' in widget && widget.elementType === 'document' && !hasDocumentPermission) {
            return;
        }
        if (widget.widgetType === 'element_tree' && 'elementType' in widget && widget.elementType === 'asset' && !hasAssetPermission) {
            return;
        }
        if (widget.widgetType === 'element_tree' && 'elementType' in widget && widget.elementType === 'data-object' && !hasObjectPermission) {
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
"./js/src/core/assets/icons/arrow-narrow-right.inline.svg?react": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const SvgArrowNarrowRightinline = (props)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        fill: "none",
        viewBox: "0 0 16 16",
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("path", {
            fill: "currentColor",
            d: "M8.804 3.47a.75.75 0 0 1 1.003-.052l.057.052 4 4 .051.057a.75.75 0 0 1-.05 1.003l-4 4a.75.75 0 0 1-1.061-1.06l2.72-2.72H2.666a.75.75 0 0 1 0-1.5h8.856l-2.72-2.72-.051-.056a.75.75 0 0 1 .052-1.004"
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/assets/icons/arrow-narrow-right.inline.svg",
            lineNumber: 3,
            columnNumber: 179
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/assets/icons/arrow-narrow-right.inline.svg",
        lineNumber: 3,
        columnNumber: 71
    }, undefined);
_c = SvgArrowNarrowRightinline;
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgArrowNarrowRightinline);
var _c;
$RefreshReg$(_c, "SvgArrowNarrowRightinline");


}),
"./js/src/core/assets/icons/notification.inline.svg?react": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const SvgNotificationinline = (props)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        fill: "none",
        viewBox: "0 0 16 16",
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("path", {
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 1.4,
            d: "M7.333 2.667H5.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C2 4.187 2 4.747 2 5.867v3.466c0 .62 0 .93.068 1.185a2 2 0 0 0 1.414 1.414c.255.068.565.068 1.185.068v1.557c0 .355 0 .533.072.624.064.08.16.126.261.126.117 0 .256-.112.533-.334l1.59-1.272c.325-.26.488-.39.669-.482q.24-.123.507-.178C8.5 12 8.706 12 9.123 12h1.01c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.218-.428.218-.988.218-2.108v-.133m.081-6.081a2 2 0 1 1-2.828 2.828 2 2 0 0 1 2.828-2.828"
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/assets/icons/notification.inline.svg",
            lineNumber: 3,
            columnNumber: 175
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/assets/icons/notification.inline.svg",
        lineNumber: 3,
        columnNumber: 67
    }, undefined);
_c = SvgNotificationinline;
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgNotificationinline);
var _c;
$RefreshReg$(_c, "SvgNotificationinline");


}),

});
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.58400e727c1a08f1.hot-update.js.map