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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_api"], {
"./js/src/core/app/api/pimcore/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api)
});
/* ESM import */var _reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs");
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
const baseQuery = (0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.fetchBaseQuery)({
    baseUrl: '/'
});
const api = (0,_reduxjs_toolkit_query_react__WEBPACK_IMPORTED_MODULE_0__.createApi)({
    baseQuery,
    endpoints: ()=>({})
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
"./js/src/core/app/api/pimcore/route.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getPrefix: () => (getPrefix)
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
 */ function getPrefix() {
    return '/pimcore-studio/api';
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
    NOTIFICATIONS: 'NOTIFICATIONS',
    NOTIFICATION_DETAILS: 'NOTIFICATION_DETAILS',
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
    NOTIFICATION: (id)=>[
            {
                type: tagNames.NOTIFICATIONS,
                id
            }
        ],
    NOTIFICATION_DETAIL: (id)=>[
            {
                type: tagNames.NOTIFICATION_DETAILS,
                id
            }
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
    NOTIFICATION: (id)=>[
            {
                type: tagNames.NOTIFICATIONS,
                id
            }
        ],
    NOTIFICATIONS: ()=>[
            tagNames.NOTIFICATIONS
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
"./js/src/sdk/api/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (/* reexport safe */ _Pimcore_app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api),
  getPrefix: () => (/* reexport safe */ _Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_1__.getPrefix),
  invalidatingTags: () => (/* reexport safe */ _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_2__.invalidatingTags),
  providingTags: () => (/* reexport safe */ _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_2__.providingTags),
  tagNames: () => (/* reexport safe */ _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_2__.tagNames)
});
/* ESM import */var _Pimcore_app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* ESM import */var _Pimcore_app_api_pimcore_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
/* ESM import */var _Pimcore_app_api_pimcore_tags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
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



function $RefreshSig$() {
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