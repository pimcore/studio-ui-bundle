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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_api"], {
"./js/src/core/app/api/pimcore/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (api)
});
/* import */ var _reduxjs_toolkit_query_react__rspack_import_1 = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs");
/* import */ var _reduxjs_toolkit_query_react__rspack_import_2 = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs");
/* import */ var _route__rspack_import_0 = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
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

const dynamicBaseQuery = async (args, api, extraOptions)=>{
    const prefix = (0,_route__rspack_import_0.getPrefix)();
    const defaultBaseUrl = '/pimcore-studio/api';
    const replaceBaseUrl = (url)=>url.startsWith(defaultBaseUrl) ? `${prefix}${url.slice(defaultBaseUrl.length)}` : url;
    const adjustedArgs = typeof args === 'string' ? replaceBaseUrl(args) : {
        ...args,
        url: replaceBaseUrl(args.url)
    };
    return await (0,_reduxjs_toolkit_query_react__rspack_import_1.fetchBaseQuery)({
        baseUrl: '/'
    })(adjustedArgs, api, extraOptions);
};
const api = (0,_reduxjs_toolkit_query_react__rspack_import_2.createApi)({
    baseQuery: dynamicBaseQuery,
    endpoints: ()=>({})
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/api/pimcore/route.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getPrefix: () => (getPrefix)
});
/* import */ var _Pimcore_app_config_app_config__rspack_import_0 = __webpack_require__("./js/src/core/app/config/app-config.ts");
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
function getPrefix() {
    return _Pimcore_app_config_app_config__rspack_import_0.appConfig.apiPrefix;
}

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/api/pimcore/tags.ts"(module, __webpack_exports__, __webpack_require__) {
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
    DATA_OBJECT_GRID_CONFIGURATION: 'DATA_OBJECT_GRID_CONFIGURATION',
    DATA_OBJECT_GRID_CONFIGURATION_LIST: 'DATA_OBJECT_GRID_CONFIGURATION_LIST',
    DATA_OBJECT_GRID_CONFIGURATION_DETAIL: 'DATA_OBJECT_GRID_CONFIGURATION_DETAIL',
    DOCUMENT: 'DOCUMENT',
    DOCUMENT_DETAIL: 'DOCUMENT_DETAIL',
    DOCUMENT_TREE: 'DOCUMENT_TREE',
    DOCUMENT_TYPES: 'DOCUMENT_TYPES',
    DOCUMENT_SITE: 'DOCUMENT_SITE',
    VERSIONS: 'VERSION',
    PROPERTIES: 'PROPERTIES',
    SCHEDULES: 'SCHEDULES',
    DEPENDENCIES: 'DEPENDENCIES',
    NOTES_AND_EVENTS: 'NOTES_AND_EVENTS',
    NOTIFICATIONS: 'NOTIFICATIONS',
    NOTIFICATION_DETAILS: 'NOTIFICATION_DETAILS',
    AVAILABLE_TAGS: 'AVAILABLE_TAGS',
    SETTINGS_ADMIN: 'SETTINGS_ADMIN',
    WEBSITE_SETTINGS: 'WEBSITE_SETTINGS',
    REDIRECTS: 'REDIRECTS',
    ROBOTS_TXT: 'ROBOTS_TXT',
    ELEMENT_TAGS: 'TAGS',
    ROLE: 'ROLE',
    DOMAIN_TRANSLATIONS: 'DOMAIN_TRANSLATIONS',
    LOCALES: 'LOCALES',
    PREDEFINED_ASSET_METADATA: 'PREDEFINED_ASSET_METADATA',
    CURRENT_USER_INFORMATION: 'CURRENT_USER_INFORMATION',
    EMAIL_BLOCKLIST: 'EMAIL_BLOCKLIST',
    EMAIL_BLOCKLIST_DETAIL: 'EMAIL_BLOCKLIST_DETAIL',
    APPLICATION_LOGGER: 'APPLICATION_LOGGER',
    APPLICATION_LOGGER_DETAIL: 'APPLICATION_LOGGER_DETAIL',
    EMAIL_LOG: 'EMAIL_LOG',
    EMAIL_LOG_DETAIL: 'EMAIL_LOG_DETAIL',
    RECYCLE_BIN: 'RECYCLE_BIN',
    RECYCLE_BIN_DETAIL: 'RECYCLE_BIN_DETAIL',
    PERSPECTIVES: 'PERSPECTIVES',
    PERSPECTIVE_DETAIL: 'PERSPECTIVE_DETAIL',
    WIDGETS: 'WIDGETS',
    WIDGET_DETAIL: 'WIDGET_DETAIL',
    USERS: 'USERS',
    USER_DETAIL: 'USER_DETAIL',
    USER_TREE: 'USER_TREE',
    GDPR_DATA: 'GDPR_DATA',
    GDPR_DATA_DETAIL: 'GDPR_DATA_DETAIL',
    CLASS_DEFINITION: 'CLASS_DEFINITION',
    CLASS_DEFINITION_DETAIL: 'CLASS_DEFINITION_DETAIL',
    CLASS_DEFINITION_COLLECTION: 'CLASS_DEFINITION_COLLECTION',
    CUSTOM_LAYOUT: 'CUSTOM_LAYOUT',
    CUSTOM_LAYOUT_DETAIL: 'CUSTOM_LAYOUT_DETAIL',
    CUSTOM_LAYOUT_COLLECTION: 'CUSTOM_LAYOUT_COLLECTION',
    FIELD_COLLECTION: 'FIELD_COLLECTION',
    FIELD_COLLECTION_DETAIL: 'FIELD_COLLECTION_DETAIL',
    FIELD_COLLECTION_COLLECTION: 'FIELD_COLLECTION_COLLECTION',
    OBJECT_BRICK: 'OBJECT_BRICK',
    OBJECT_BRICK_DETAIL: 'OBJECT_BRICK_DETAIL',
    OBJECT_BRICK_COLLECTION: 'OBJECT_BRICK_COLLECTION',
    OBJECT_BRICK_CUSTOM_LAYOUT: 'OBJECT_BRICK_CUSTOM_LAYOUT',
    OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL: 'OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL',
    OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION: 'OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION',
    SELECT_OPTION_DETAIL: 'SELECT_OPTION_DETAIL',
    SELECT_OPTION_COLLECTION: 'SELECT_OPTION_COLLECTION',
    QUANTITY_VALUE_UNITS: 'QUANTITY_VALUE_UNITS'
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
    DATA_OBJECT_GRID_CONFIGURATION: ()=>[
            tagNames.DATA_OBJECT_GRID_CONFIGURATION
        ],
    DATA_OBJECT_GRID_CONFIGURATION_LIST: ()=>[
            tagNames.DATA_OBJECT,
            tagNames.DATA_OBJECT_GRID_CONFIGURATION,
            {
                type: tagNames.DATA_OBJECT_GRID_CONFIGURATION_LIST
            }
        ],
    DATA_OBJECT_GRID_CONFIGURATION_DETAIL: (configurationId)=>[
            tagNames.DATA_OBJECT,
            {
                type: tagNames.DATA_OBJECT_DETAIL
            },
            tagNames.DATA_OBJECT_GRID_CONFIGURATION,
            {
                type: tagNames.DATA_OBJECT_GRID_CONFIGURATION_DETAIL,
                id: configurationId
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
    DOCUMENT_TYPES: ()=>[
            tagNames.DOCUMENT_TYPES
        ],
    DOCUMENT_SITE: ()=>[
            tagNames.DOCUMENT,
            tagNames.DOCUMENT_SITE
        ],
    DOMAIN_TRANSLATIONS: ()=>[
            tagNames.DOMAIN_TRANSLATIONS
        ],
    LOCALES: ()=>[
            tagNames.LOCALES
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
            getElementDetailTag(elementType, id)
        ],
    PROPERTY_DETAIL: (id)=>[
            {
                type: tagNames.PROPERTIES,
                id
            }
        ],
    GLOBAL_PROPERTIES: ()=>[
            tagNames.PROPERTIES
        ],
    SETTINGS_ADMIN: ()=>[
            tagNames.SETTINGS_ADMIN
        ],
    WEBSITE_SETTINGS: ()=>[
            tagNames.WEBSITE_SETTINGS
        ],
    REDIRECTS: ()=>[
            tagNames.REDIRECTS
        ],
    ROBOTS_TXT: ()=>[
            tagNames.ROBOTS_TXT
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
    NOTES_AND_EVENTS: ()=>[
            tagNames.NOTES_AND_EVENTS
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
    NOTIFICATIONS: ()=>[
            tagNames.NOTIFICATIONS
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
        ],
    EMAIL_BLOCKLIST: ()=>[
            tagNames.EMAIL_BLOCKLIST
        ],
    EMAIL_BLOCKLIST_DETAIL: (id)=>[
            {
                type: tagNames.EMAIL_BLOCKLIST_DETAIL,
                id
            }
        ],
    EMAIL_LOG: ()=>[
            tagNames.EMAIL_LOG
        ],
    EMAIL_LOG_DETAIL: (id)=>[
            {
                type: tagNames.EMAIL_LOG_DETAIL,
                id
            }
        ],
    RECYCLING_BIN: ()=>[
            tagNames.RECYCLE_BIN
        ],
    RECYCLING_BIN_DETAIL: (id)=>[
            {
                type: tagNames.RECYCLE_BIN_DETAIL,
                id
            }
        ],
    APPLICATION_LOGGER: ()=>[
            tagNames.APPLICATION_LOGGER
        ],
    APPLICATION_LOGGER_DETAIL: (id)=>[
            {
                type: tagNames.APPLICATION_LOGGER_DETAIL,
                id
            }
        ],
    PERSPECTIVES: ()=>[
            tagNames.PERSPECTIVES
        ],
    PERSPECTIVE_DETAIL: (id)=>[
            {
                type: tagNames.PERSPECTIVE_DETAIL,
                id
            }
        ],
    WIDGETS: ()=>[
            tagNames.WIDGETS
        ],
    WIDGET_DETAIL: (id, widgetType)=>[
            {
                type: tagNames.WIDGET_DETAIL,
                id,
                widgetType
            }
        ],
    USERS: ()=>[
            tagNames.USERS
        ],
    USER_DETAIL: (id)=>[
            {
                type: tagNames.USER_DETAIL,
                id
            }
        ],
    USER_TREE: ()=>[
            tagNames.USER_TREE
        ],
    GDPR_DATA: (providerKey)=>[
            {
                type: tagNames.GDPR_DATA,
                id: providerKey
            }
        ],
    GDPR_DATA_DETAIL: (providerKey, id)=>[
            {
                type: tagNames.GDPR_DATA_DETAIL,
                id: `${providerKey}-${id}`
            }
        ],
    CLASS_DEFINITION: ()=>[
            tagNames.CLASS_DEFINITION
        ],
    CLASS_DEFINITION_COLLECTION: ()=>[
            tagNames.CLASS_DEFINITION,
            tagNames.CLASS_DEFINITION_COLLECTION
        ],
    CLASS_DEFINITION_DETAIL: (id)=>[
            tagNames.CLASS_DEFINITION,
            {
                type: tagNames.CLASS_DEFINITION_DETAIL,
                id
            }
        ],
    CUSTOM_LAYOUT: ()=>[
            tagNames.CUSTOM_LAYOUT
        ],
    CUSTOM_LAYOUT_COLLECTION: ()=>[
            tagNames.CUSTOM_LAYOUT,
            tagNames.CUSTOM_LAYOUT_COLLECTION
        ],
    CUSTOM_LAYOUT_DETAIL: (id)=>[
            tagNames.CUSTOM_LAYOUT,
            {
                type: tagNames.CUSTOM_LAYOUT_DETAIL,
                id
            }
        ],
    FIELD_COLLECTION: ()=>[
            tagNames.FIELD_COLLECTION
        ],
    FIELD_COLLECTION_COLLECTION: ()=>[
            tagNames.FIELD_COLLECTION,
            tagNames.FIELD_COLLECTION_COLLECTION
        ],
    FIELD_COLLECTION_DETAIL: (key)=>[
            tagNames.FIELD_COLLECTION,
            {
                type: tagNames.FIELD_COLLECTION_DETAIL,
                id: key
            }
        ],
    OBJECT_BRICK: ()=>[
            tagNames.OBJECT_BRICK
        ],
    OBJECT_BRICK_COLLECTION: ()=>[
            tagNames.OBJECT_BRICK,
            tagNames.OBJECT_BRICK_COLLECTION
        ],
    OBJECT_BRICK_DETAIL: (key)=>[
            tagNames.OBJECT_BRICK,
            {
                type: tagNames.OBJECT_BRICK_DETAIL,
                id: key
            }
        ],
    OBJECT_BRICK_CUSTOM_LAYOUT: ()=>[
            tagNames.OBJECT_BRICK_CUSTOM_LAYOUT
        ],
    OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION: (key)=>[
            tagNames.OBJECT_BRICK_CUSTOM_LAYOUT,
            {
                type: tagNames.OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION,
                id: key
            }
        ],
    OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL: (key, id)=>[
            tagNames.OBJECT_BRICK_CUSTOM_LAYOUT,
            {
                type: tagNames.OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL,
                id: `${key}-${id}`
            }
        ],
    SELECT_OPTION_COLLECTION: ()=>[
            tagNames.SELECT_OPTION_COLLECTION
        ],
    SELECT_OPTION_DETAIL: (id)=>[
            {
                type: tagNames.SELECT_OPTION_DETAIL,
                id
            }
        ],
    QUANTITY_VALUE_UNITS: ()=>[
            tagNames.QUANTITY_VALUE_UNITS
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
            tagNames.ASSET_GRID_CONFIGURATION
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
    DATA_OBJECT_GRID_CONFIGURATION: ()=>[
            tagNames.DATA_OBJECT_GRID_CONFIGURATION
        ],
    DATA_OBJECT_GRID_CONFIGURATION_DETAIL: (configurationId)=>[
            {
                type: tagNames.DATA_OBJECT_GRID_CONFIGURATION_DETAIL,
                id: configurationId
            },
            tagNames.DATA_OBJECT_GRID_CONFIGURATION
        ],
    DATA_OBJECT_GRID_CONFIGURATION_LIST: ()=>[
            {
                type: tagNames.DATA_OBJECT_GRID_CONFIGURATION_LIST
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
    DOCUMENT_TYPES: ()=>[
            tagNames.DOCUMENT_TYPES
        ],
    DOCUMENT_SITE: ()=>[
            tagNames.DOCUMENT_SITE
        ],
    DOMAIN_TRANSLATIONS: ()=>[
            tagNames.DOMAIN_TRANSLATIONS
        ],
    LOCALES: ()=>[
            tagNames.LOCALES
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
    ELEMENT_WORKFLOW: (elementType, id)=>[],
    PROPERTY_DETAIL: (id)=>[
            {
                type: tagNames.PROPERTIES,
                id
            }
        ],
    ELEMENT_PROPERTIES: (elementType, id)=>[
            getElementSpecificTag(tagNames.PROPERTIES, elementType, id)
        ],
    GLOBAL_PROPERTIES: ()=>[
            tagNames.PROPERTIES
        ],
    SETTINGS_ADMIN: ()=>[
            tagNames.SETTINGS_ADMIN
        ],
    WEBSITE_SETTINGS: ()=>[
            tagNames.WEBSITE_SETTINGS
        ],
    REDIRECTS: ()=>[
            tagNames.REDIRECTS
        ],
    ROBOTS_TXT: ()=>[
            tagNames.ROBOTS_TXT
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
    NOTES_AND_EVENTS: ()=>[
            tagNames.NOTES_AND_EVENTS
        ],
    NOTES_AND_EVENTS_DETAIL: (id)=>[
            {
                type: tagNames.NOTES_AND_EVENTS,
                id
            }
        ],
    NOTIFICATION_DETAIL: (id)=>[
            {
                type: tagNames.NOTIFICATION_DETAILS,
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
            getElementDetailTag(elementType, id),
            getElementGridTag(elementType)
        ],
    EMAIL_BLOCKLIST: ()=>[
            tagNames.EMAIL_BLOCKLIST
        ],
    EMAIL_BLOCKLIST_DETAIL: (id)=>[
            {
                type: tagNames.EMAIL_BLOCKLIST_DETAIL,
                id
            }
        ],
    APPLICATION_LOGGER: ()=>[
            tagNames.APPLICATION_LOGGER
        ],
    APPLICATION_LOGGER_DETAIL: (id)=>[
            {
                type: tagNames.APPLICATION_LOGGER_DETAIL,
                id
            }
        ],
    EMAIL_LOG: ()=>[
            tagNames.EMAIL_LOG
        ],
    EMAIL_LOG_DETAIL: (id)=>[
            {
                type: tagNames.EMAIL_LOG_DETAIL,
                id
            }
        ],
    RECYCLING_BIN: ()=>[
            tagNames.RECYCLE_BIN
        ],
    PERSPECTIVES: ()=>[
            tagNames.PERSPECTIVES
        ],
    WIDGETS: ()=>[
            tagNames.WIDGETS
        ],
    USERS: ()=>[
            tagNames.USERS
        ],
    USER_DETAIL: (id)=>[
            {
                type: tagNames.USER_DETAIL,
                id
            }
        ],
    USER_TREE: ()=>[
            tagNames.USER_TREE
        ],
    GDPR_DATA: (providerKey)=>[
            {
                type: tagNames.GDPR_DATA,
                id: providerKey
            }
        ],
    GDPR_DATA_DETAIL: (providerKey, id)=>[
            {
                type: tagNames.GDPR_DATA_DETAIL,
                id: `${providerKey}-${id}`
            }
        ],
    CLASS_DEFINITION: ()=>[
            tagNames.CLASS_DEFINITION
        ],
    CLASS_DEFINITION_COLLECTION: ()=>[
            tagNames.CLASS_DEFINITION_COLLECTION
        ],
    CLASS_DEFINITION_DETAIL: (id)=>[
            {
                type: tagNames.CLASS_DEFINITION_DETAIL,
                id
            }
        ],
    CUSTOM_LAYOUT: ()=>[
            tagNames.CUSTOM_LAYOUT
        ],
    CUSTOM_LAYOUT_COLLECTION: ()=>[
            tagNames.CUSTOM_LAYOUT_COLLECTION
        ],
    CUSTOM_LAYOUT_DETAIL: (id)=>[
            {
                type: tagNames.CUSTOM_LAYOUT_DETAIL,
                id
            }
        ],
    FIELD_COLLECTION: ()=>[
            tagNames.FIELD_COLLECTION
        ],
    FIELD_COLLECTION_COLLECTION: ()=>[
            tagNames.FIELD_COLLECTION_COLLECTION
        ],
    FIELD_COLLECTION_DETAIL: (key)=>[
            {
                type: tagNames.FIELD_COLLECTION_DETAIL,
                id: key
            }
        ],
    OBJECT_BRICK: ()=>[
            tagNames.OBJECT_BRICK
        ],
    OBJECT_BRICK_COLLECTION: ()=>[
            tagNames.OBJECT_BRICK_COLLECTION
        ],
    OBJECT_BRICK_DETAIL: (key)=>[
            {
                type: tagNames.OBJECT_BRICK_DETAIL,
                id: key
            }
        ],
    OBJECT_BRICK_CUSTOM_LAYOUT: ()=>[
            tagNames.OBJECT_BRICK_CUSTOM_LAYOUT
        ],
    OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION: (key)=>[
            {
                type: tagNames.OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION,
                id: key
            }
        ],
    OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL: (key, id)=>[
            {
                type: tagNames.OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL,
                id: `${key}-${id}`
            }
        ],
    SELECT_OPTION_COLLECTION: ()=>[
            tagNames.SELECT_OPTION_COLLECTION
        ],
    SELECT_OPTION_DETAIL: (id)=>[
            {
                type: tagNames.SELECT_OPTION_DETAIL,
                id
            }
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
                type: tagNames.DOCUMENT_DETAIL,
                id
            };
    }
};
const getElementGridTag = (elementType)=>{
    switch(elementType){
        case 'asset':
            return tagNames.ASSET_GRID;
        case 'data-object':
            return tagNames.DATA_OBJECT_GRID;
        case 'document':
            return tagNames.DOCUMENT;
    }
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/app/config/app-config.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  appConfig: () => (appConfig),
  currentDomain: () => (currentDomain)
});
/* import */ var _Pimcore_utils_iframe__rspack_import_0 = __webpack_require__("./js/src/core/utils/iframe.ts");
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
const appElement = (0,_Pimcore_utils_iframe__rspack_import_0.getParentDocument)().querySelector('#app');
const currentDomain = window.location.origin;
if (appElement === null) {
    console.warn('App element not found');
}
const appConfigJSON = (appElement === null || appElement === void 0 ? void 0 : appElement.getAttribute('data-app-config')) ?? null;
let appConfigData = null;
if (appConfigJSON !== null) {
    appConfigData = JSON.parse(appConfigJSON);
}
const appConfig = {
    baseUrl: (appConfigData === null || appConfigData === void 0 ? void 0 : appConfigData.baseUrl) ?? '/pimcore-studio/',
    mercureUrl: (appConfigData === null || appConfigData === void 0 ? void 0 : appConfigData.mercureUrl) ?? `${currentDomain}/.well-known/mercure`,
    wysiwyg: (appConfigData === null || appConfigData === void 0 ? void 0 : appConfigData.wysiwyg) ?? {
        defaultEditorConfig: {
            dataObject: {},
            document: {}
        }
    },
    apiPrefix: (appConfigData === null || appConfigData === void 0 ? void 0 : appConfigData.apiPrefix) ?? '/pimcore-studio/api',
    ...appConfigData ?? {}
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/utils/iframe.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getIframeOffset: () => (getIframeOffset),
  getParentDocument: () => (getParentDocument),
  isInIframe: () => (isInIframe)
});
/* import */ var lodash__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_0);
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
const iframeCache = new Map();
/**
 * Checks if the current window is running inside an iframe
 * @returns true if running in an iframe, false otherwise
 */ const isInIframe = ()=>{
    try {
        return window.parent !== null && window.parent !== window;
    } catch (error) {
        // In case of cross-origin restrictions, assume we're in an iframe
        return true;
    }
};
const getIframeOffset = (view)=>{
    const viewDocument = view.document;
    if (viewDocument === window.parent.document) {
        return {
            x: 0,
            y: 0
        };
    }
    if (!iframeCache.has(viewDocument)) {
        const iframes = window.parent.document.querySelectorAll('iframe');
        const matchingIframe = Array.from(iframes).find((iframe)=>iframe.contentDocument === viewDocument);
        iframeCache.set(viewDocument, matchingIframe ?? null);
    }
    const cachedIframe = iframeCache.get(viewDocument);
    if (!(0,lodash__rspack_import_0.isNil)(cachedIframe)) {
        const iframeRect = cachedIframe.getBoundingClientRect();
        return {
            x: iframeRect.left,
            y: iframeRect.top
        };
    }
    return {
        x: 0,
        y: 0
    };
};
/**
 * Safely gets the parent document when running in an iframe
 * @returns The parent document if accessible, null otherwise
 */ const getParentDocument = ()=>{
    if (!isInIframe()) {
        return document;
    }
    try {
        return window.parent.document;
    } catch  {
        // Cross-origin restriction - parent document not accessible
        return document;
    }
};

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/api/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  api: () => (/* reexport safe */ _Pimcore_app_api_pimcore_index__rspack_import_0.api),
  getPrefix: () => (/* reexport safe */ _Pimcore_app_api_pimcore_route__rspack_import_1.getPrefix),
  invalidatingTags: () => (/* reexport safe */ _Pimcore_app_api_pimcore_tags__rspack_import_2.invalidatingTags),
  providingTags: () => (/* reexport safe */ _Pimcore_app_api_pimcore_tags__rspack_import_2.providingTags),
  tagNames: () => (/* reexport safe */ _Pimcore_app_api_pimcore_tags__rspack_import_2.tagNames)
});
/* import */ var _Pimcore_app_api_pimcore_index__rspack_import_0 = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* import */ var _Pimcore_app_api_pimcore_route__rspack_import_1 = __webpack_require__("./js/src/core/app/api/pimcore/route.ts");
/* import */ var _Pimcore_app_api_pimcore_tags__rspack_import_2 = __webpack_require__("./js/src/core/app/api/pimcore/tags.ts");
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

}]);
//# sourceMappingURL=__federation_expose_api.js.map