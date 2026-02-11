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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__field_definitions"], {
"./js/src/core/modules/field-definitions/utils/context-helpers.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getParent: () => (getParent),
  isParent: () => (isParent)
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
 */ const getParent = (context)=>{
    const { fieldDefinitions, path } = context;
    const definition = fieldDefinitions[path[path.length - 2]];
    return definition;
};
const isParent = (fieldType, context)=>{
    const parent = getParent(context);
    return (parent === null || parent === void 0 ? void 0 : parent.fieldtype) === fieldType;
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
"./js/src/sdk/modules/field-definitions/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeFieldDefinitionAbstract: () => (/* reexport safe */ _Pimcore_modules_field_definitions_dynamic_types_dynamic_type_field_definition_abstract__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeFieldDefinitionAbstract),
  DynamicTypeFieldDefinitionDataAbstract: () => (/* reexport safe */ _Pimcore_modules_field_definitions_dynamic_types_types_abstracts_data_dynamic_type_field_defintion_data_abstract__WEBPACK_IMPORTED_MODULE_3__.DynamicTypeFieldDefinitionDataAbstract),
  DynamicTypeFieldDefinitionLayoutAbstract: () => (/* reexport safe */ _Pimcore_modules_field_definitions_dynamic_types_types_abstracts_layout_dynamic_type_field_defintion_layout_abstract__WEBPACK_IMPORTED_MODULE_4__.DynamicTypeFieldDefinitionLayoutAbstract),
  DynamicTypeFieldDefinitionRegistry: () => (/* reexport safe */ _Pimcore_modules_field_definitions_dynamic_types_dynamic_type_field_definition_registry__WEBPACK_IMPORTED_MODULE_2__.DynamicTypeFieldDefinitionRegistry),
  buildTree: () => (/* reexport safe */ _Pimcore_modules_field_definitions_utils_layout_helpers__WEBPACK_IMPORTED_MODULE_0__.buildTree),
  reduce: () => (/* reexport safe */ _Pimcore_modules_field_definitions_utils_layout_helpers__WEBPACK_IMPORTED_MODULE_0__.reduce)
});
/* ESM import */var _Pimcore_modules_field_definitions_utils_layout_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/field-definitions/utils/layout-helpers.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_dynamic_type_field_definition_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_dynamic_type_field_definition_registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_types_abstracts_data_dynamic_type_field_defintion_data_abstract__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/dynamic-type-field-defintion-data-abstract.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_types_abstracts_layout_dynamic_type_field_defintion_layout_abstract__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/layout/dynamic-type-field-defintion-layout-abstract.tsx");
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
"./js/src/core/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeFieldDefinitionAbstract: () => (DynamicTypeFieldDefinitionAbstract)
});
/* ESM import */var _sdk_modules_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/modules/element/index.ts");
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/sdk/app/index.ts");
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

class DynamicTypeFieldDefinitionAbstract extends _sdk_modules_element__WEBPACK_IMPORTED_MODULE_0__.DynamicTypeAbstract {
    getIcon() {
        return {
            type: 'name',
            value: 'questionmark'
        };
    }
    getTags(props) {
        return [
            this.id
        ];
    }
    getAllowedChildTags(props) {
        return [];
    }
    getDisallowedRecursiveChildTags(props) {
        return [];
    }
    getConvertibleTags(props) {
        return [];
    }
    getDropdownTags(props) {
        const isCustomLayout = props.area.includes('custom-layout');
        if (isCustomLayout) {
            return [
                'group:layout'
            ];
        }
        return this.getAllowedChildTags(props);
    }
    getValidChildTags(props) {
        const allowedChildTags = this.getAllowedChildTags(props);
        const validChildTags = this.computeValidTags(allowedChildTags, props);
        return validChildTags;
    }
    getValidConvertibleTags(props) {
        const convertibleTags = this.getConvertibleTags(props);
        const validConvertibleTags = this.computeValidTags(convertibleTags, props).filter((tag)=>tag !== this.id);
        return validConvertibleTags;
    }
    getValidDropdownTags(props) {
        const dropdownTags = this.getDropdownTags(props);
        const validDropdownTags = this.computeValidTags(dropdownTags, props);
        return validDropdownTags;
    }
    isValid(data, context) {
        return true;
    }
    getConvertibleData(context) {
        return {};
    }
    getAdditionalFormFields(context) {
        return null;
    }
    computeValidTags(tags, context) {
        const { path, fieldDefinitions } = context;
        const usedFieldDefinitions = path.map((pathItem)=>fieldDefinitions[pathItem]);
        const fieldDefinitionRegistry = _sdk_app__WEBPACK_IMPORTED_MODULE_1__.container.get(_sdk_app__WEBPACK_IMPORTED_MODULE_1__.serviceIds["DynamicTypes/FieldDefinitionRegistry"]);
        const blockedTags = [];
        usedFieldDefinitions.forEach((usedFieldDefinition)=>{
            if (usedFieldDefinition !== undefined) {
                var _fieldDefinitionRegistry_getDynamicType;
                const disallowedTags = ((_fieldDefinitionRegistry_getDynamicType = fieldDefinitionRegistry.getDynamicType(usedFieldDefinition.fieldtype, false)) === null || _fieldDefinitionRegistry_getDynamicType === void 0 ? void 0 : _fieldDefinitionRegistry_getDynamicType.getDisallowedRecursiveChildTags({
                    ...context
                })) ?? [];
                blockedTags.push(...disallowedTags);
            }
        });
        const allowedChildTags = tags;
        const resolvedBlockedTags = fieldDefinitionRegistry.getTypesByTags(blockedTags, context).map((type)=>type.id);
        const resolvedAllowedChildTags = fieldDefinitionRegistry.getTypesByTags(allowedChildTags, context).map((type)=>type.id);
        const validChildTags = resolvedAllowedChildTags.filter((tag)=>!resolvedBlockedTags.includes(tag));
        return validChildTags;
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
"./js/src/core/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeFieldDefinitionRegistry: () => (DynamicTypeFieldDefinitionRegistry)
});
/* ESM import */var _sdk_modules_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/sdk/modules/element/index.ts");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _dec, _class;
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 


let DynamicTypeFieldDefinitionRegistry = (_dec = (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(), _dec(_class = class DynamicTypeFieldDefinitionRegistry extends _sdk_modules_element__WEBPACK_IMPORTED_MODULE_0__.DynamicTypeRegistryAbstract {
    getTypesByTags(tags, context) {
        return this.getDynamicTypes().filter((type)=>{
            const typeTags = type.getTags(context);
            return tags.some((tag)=>typeTags.includes(tag));
        });
    }
    resolveTags(tags, context) {
        const types = this.getTypesByTags(tags, context);
        return (0,lodash__WEBPACK_IMPORTED_MODULE_2__.uniq)(types.map((type)=>type.id));
    }
    getDropdownGroupInfos() {
        return {
            layout: {
                icon: {
                    value: 'new-layout',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.layout'
            },
            data: {
                icon: {
                    value: 'new-data-component',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data'
            },
            'data/text': {
                icon: {
                    value: 'content',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.text'
            },
            'data/numeric': {
                icon: {
                    value: 'number-type',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.numeric'
            },
            'data/date': {
                icon: {
                    value: 'date',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.date'
            },
            'data/select': {
                icon: {
                    value: 'select-type',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.select'
            },
            'data/media': {
                icon: {
                    value: 'media',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.media'
            },
            'data/relation': {
                icon: {
                    value: 'relation',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.relation'
            },
            'data/geo': {
                icon: {
                    value: 'location-marker',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.geographic'
            },
            'data/crm': {
                icon: {
                    value: 'crm',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.crm'
            },
            'data/structured': {
                icon: {
                    value: 'batch-selection',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.structured'
            },
            'data/other': {
                icon: {
                    value: 'other',
                    type: 'name'
                },
                translationKey: 'field-definition.groups.data.other'
            }
        };
    }
    buildGroupedActions(types, actionKeyPrefix) {
        const groupInfos = this.getDropdownGroupInfos();
        const actions = [];
        const groupedTypes = {};
        types.forEach((type)=>{
            const groups = type.getGroup();
            const groupKey = groups.join('/');
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(groupedTypes[groupKey])) {
                groupedTypes[groupKey] = [];
            }
            groupedTypes[groupKey].push(type);
        });
        for(const groupPath in groupedTypes){
            const groupParts = groupPath.split('/');
            let currentActions = actions;
            let currentGroupPath = '';
            groupParts.forEach((group, index)=>{
                currentGroupPath = index === 0 ? group : `${currentGroupPath}/${group}`;
                const groupKey = `group-${group}`;
                const groupMenuKey = `${actionKeyPrefix}group-${group}`;
                const isRootLevel = currentActions === actions;
                let action = currentActions.find((a)=>a.key === groupKey);
                if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(action)) {
                    var _groupInfos_currentGroupPath, _groupInfos_currentGroupPath1;
                    const baseTranslationKey = (_groupInfos_currentGroupPath = groupInfos[currentGroupPath]) === null || _groupInfos_currentGroupPath === void 0 ? void 0 : _groupInfos_currentGroupPath.translationKey;
                    const shouldAddPrefix = isRootLevel && baseTranslationKey !== undefined && actionKeyPrefix !== 'convert-';
                    const groupTranslationKey = shouldAddPrefix ? `${baseTranslationKey}.with-prefix.${actionKeyPrefix.replace('-', '')}` : baseTranslationKey;
                    action = {
                        key: groupKey,
                        menuKey: groupMenuKey,
                        icon: ((_groupInfos_currentGroupPath1 = groupInfos[currentGroupPath]) === null || _groupInfos_currentGroupPath1 === void 0 ? void 0 : _groupInfos_currentGroupPath1.icon.value) ?? '',
                        iconColorGroup: [
                            'fieldDefinition_group_' + group,
                            'fieldDefinition'
                        ],
                        translationKey: groupTranslationKey,
                        actions: []
                    };
                    currentActions.push(action);
                }
                if (index === groupParts.length - 1) {
                    groupedTypes[groupPath].forEach((type)=>{
                        const isTypeAtRoot = action.actions.length === 0 && isRootLevel;
                        const baseTypeTranslationKey = `field-definition.${(0,lodash__WEBPACK_IMPORTED_MODULE_2__.kebabCase)(type.id)}`;
                        const shouldAddTypePrefix = isTypeAtRoot && actionKeyPrefix !== 'convert-';
                        const typeTranslationKey = shouldAddTypePrefix ? `${baseTypeTranslationKey}.with-prefix.${actionKeyPrefix.replace('-', '')}` : baseTypeTranslationKey;
                        action.actions.push({
                            key: `${actionKeyPrefix}${type.id}`,
                            icon: type.getIcon().value,
                            iconColorGroup: [
                                'fieldDefinition_' + type.id,
                                'fieldDefinition'
                            ],
                            translationKey: typeTranslationKey
                        });
                    });
                } else {
                    currentActions = action.actions;
                }
            });
        }
        return this.optimizeActions(actions, actionKeyPrefix, true) ?? [];
    }
    optimizeActions(actions, actionKeyPrefix) {
        let isRootLevel = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(actions)) {
            return actions;
        }
        if (actions.length === 1 && !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(actions[0].actions) && actions[0].actions.length > 0) {
            const promotedActions = this.optimizeActions(actions[0].actions, actionKeyPrefix, isRootLevel);
            // Add prefix only to items being promoted to the absolute root level (and not for convert)
            if (isRootLevel && actionKeyPrefix !== 'convert-') {
                return promotedActions === null || promotedActions === void 0 ? void 0 : promotedActions.map((action)=>{
                    if (action.translationKey !== undefined && !action.translationKey.includes('.with-prefix.')) {
                        return {
                            ...action,
                            translationKey: `${action.translationKey}.with-prefix.${actionKeyPrefix.replace('-', '')}`
                        };
                    }
                    return action;
                });
            }
            return promotedActions;
        }
        const optimizedActions = [];
        actions.forEach((action)=>{
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(action.actions) && action.actions.length > 0) {
                action.actions = this.optimizeActions(action.actions, actionKeyPrefix, false);
            }
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(action.actions) && action.actions.length === 1) {
                const childAction = action.actions[0];
                // Add prefix only when promoting to root level (and not for convert)
                if (isRootLevel && actionKeyPrefix !== 'convert-' && childAction.translationKey !== undefined && !childAction.translationKey.includes('.with-prefix.')) {
                    childAction.translationKey = `${childAction.translationKey}.with-prefix.${actionKeyPrefix.replace('-', '')}`;
                }
                optimizedActions.push(childAction);
            } else {
                optimizedActions.push(action);
            }
        });
        return optimizedActions.sort((a, b)=>{
            var _a_actions, _b_actions;
            const aHasChildren = (((_a_actions = a.actions) === null || _a_actions === void 0 ? void 0 : _a_actions.length) ?? 0) > 0;
            const bHasChildren = (((_b_actions = b.actions) === null || _b_actions === void 0 ? void 0 : _b_actions.length) ?? 0) > 0;
            if (aHasChildren === bHasChildren) {
                return 0;
            }
            return aHasChildren ? -1 : 1;
        });
    }
    getDropdownActions(context) {
        const { fieldDefinitions, path, area } = context;
        const fieldDefinition = fieldDefinitions[path.at(-1)];
        // @todo remove wrong type of fieldType when backend provides the right typo
        const dynType = this.getDynamicType(fieldDefinition.fieldType ?? fieldDefinition.fieldtype, false);
        if (dynType === undefined) {
            return [];
        }
        const isCustomLayout = area.includes('custom-layout');
        const isRoot = fieldDefinition.name === 'pimcore_root';
        const allowedDropdownTags = isRoot ? [
            'group:root'
        ] : dynType.getValidDropdownTags(context);
        const dropdownTagTypes = this.getTypesByTags(allowedDropdownTags, context);
        const actions = this.buildGroupedActions(dropdownTagTypes, 'add-');
        if (!isRoot) {
            if (!isCustomLayout) {
                const convertibleTagTypes = this.getTypesByTags(dynType.getValidConvertibleTags(context), context);
                const convertibleActions = this.buildGroupedActions(convertibleTagTypes, 'convert-');
                if (((convertibleActions === null || convertibleActions === void 0 ? void 0 : convertibleActions.length) ?? 0) > 0) {
                    actions === null || actions === void 0 ? void 0 : actions.push({
                        key: 'convert',
                        icon: 'convert',
                        translationKey: 'tree.actions.convert',
                        actions: convertibleActions
                    });
                }
                actions === null || actions === void 0 ? void 0 : actions.push({
                    key: 'clone',
                    icon: 'content-duplicate',
                    translationKey: 'tree.actions.clone'
                });
            }
        }
        return actions ?? [];
    }
}) || _class);

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
"./js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/dynamic-type-field-defintion-data-abstract.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeFieldDefinitionDataAbstract: () => (DynamicTypeFieldDefinitionDataAbstract)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_dynamic_type_field_definition_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_types_abstracts_data_field_defintion_data_form_fields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
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



class DynamicTypeFieldDefinitionDataAbstract extends _Pimcore_modules_field_definitions_dynamic_types_dynamic_type_field_definition_abstract__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeFieldDefinitionAbstract {
    getTags(props) {
        return [
            ...super.getTags(props),
            'group:data'
        ];
    }
    getConvertibleTags(props) {
        return [
            'group:data'
        ];
    }
    getDropdownTags(props) {
        const isCustomLayout = props.area.includes('custom-layout');
        if (isCustomLayout) {
            return [];
        }
        return this.getAllowedChildTags(props);
    }
    getGroup() {
        return [
            'data'
        ];
    }
    getDefaultData() {
        return {
            fieldtype: this.id,
            datatype: 'data',
            name: '',
            title: '',
            tooltip: ''
        };
    }
    isValid(data) {
        return data.name.trim().length > 0;
    }
    getId(context) {
        return context.path.at(-1) ?? '';
    }
    getFormFields(context) {
        const id = this.getId(context);
        const fieldDefinition = context.fieldDefinitions[id];
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_dynamic_types_types_abstracts_data_field_defintion_data_form_fields__WEBPACK_IMPORTED_MODULE_2__.FieldDefinitionDataFormFields, {
            context: context,
            id: (fieldDefinition === null || fieldDefinition === void 0 ? void 0 : fieldDefinition.name) ?? id,
            type: this.id
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/dynamic-type-field-defintion-data-abstract.tsx",
            lineNumber: 49,
            columnNumber: 12
        }, this);
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
"./js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FieldDefinitionDataFormFields: () => (FieldDefinitionDataFormFields)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
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




const FieldDefinitionDataFormFields = (props)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const isCustomLayout = props.context.area.includes('custom-layout');
    const typeTranslation = t('field-definition.' + (0,lodash__WEBPACK_IMPORTED_MODULE_4__.kebabCase)(props.type));
    const panelTitle = `${props.id} (${t('type')}: ${typeTranslation})`;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.FormKit.Panel, {
            title: panelTitle,
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                    label: t('name'),
                    name: "name",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Input, {}, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                    label: t('title'),
                    name: "title",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Input, {}, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                    label: t('tooltip'),
                    name: "tooltip",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.TextArea, {}, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                    name: "mandatory",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                        disabled: props.context.disableMandatory,
                        labelRight: t('mandatory')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                    name: "index",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                        disabled: props.context.disableIndex,
                        labelRight: t('index')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, undefined),
                props.context.hideUnique !== true && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                    name: "unique",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                        labelRight: t('unique')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                        lineNumber: 46,
                        columnNumber: 13
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                    lineNumber: 45,
                    columnNumber: 47
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                    name: "noteditable",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                        labelRight: t('not-editable')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                    name: "invisible",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                        labelRight: t('invisible')
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, undefined),
                !isCustomLayout && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                            name: "visibleGridView",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                                labelRight: t('visible-in-gridview')
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                                lineNumber: 59,
                                columnNumber: 13
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Form.Item, {
                            name: "visibleSearch",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_1__.Switch, {
                                labelRight: t('visible-in-searchresult')
                            }, void 0, false, {
                                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, undefined)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, undefined)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, undefined)
    }, void 0, false);
};
_s(FieldDefinitionDataFormFields, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation
    ];
});
_c = FieldDefinitionDataFormFields;
var _c;
$RefreshReg$(_c, "FieldDefinitionDataFormFields");

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
"./js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/layout/dynamic-type-field-defintion-layout-abstract.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeFieldDefinitionLayoutAbstract: () => (DynamicTypeFieldDefinitionLayoutAbstract)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_dynamic_type_field_definition_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract.tsx");
/* ESM import */var _Pimcore_modules_field_definitions_dynamic_types_types_abstracts_layout_field_defintion_layout_form_fields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/layout/field-defintion-layout-form-fields.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
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



class DynamicTypeFieldDefinitionLayoutAbstract extends _Pimcore_modules_field_definitions_dynamic_types_dynamic_type_field_definition_abstract__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeFieldDefinitionAbstract {
    getAllowedChildTags(props) {
        return [
            ...super.getAllowedChildTags(props),
            'group:layout',
            'group:data'
        ];
    }
    getTags(props) {
        return [
            ...super.getTags(props),
            'group:layout'
        ];
    }
    getGroup() {
        return [
            'layout'
        ];
    }
    getDefaultData() {
        return {
            fieldtype: this.id,
            datatype: 'layout',
            name: 'Layout',
            title: '',
            region: ''
        };
    }
    getFormFields(context) {
        const id = context.path.at(-1) ?? '';
        const fieldDefinition = context.fieldDefinitions[id];
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_field_definitions_dynamic_types_types_abstracts_layout_field_defintion_layout_form_fields__WEBPACK_IMPORTED_MODULE_2__.FieldDefinitionLayoutFormFields, {
            context: context,
            id: (fieldDefinition === null || fieldDefinition === void 0 ? void 0 : fieldDefinition.name) ?? id,
            type: this.id
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/layout/dynamic-type-field-defintion-layout-abstract.tsx",
            lineNumber: 36,
            columnNumber: 12
        }, this);
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
"./js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/layout/field-defintion-layout-form-fields.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FieldDefinitionLayoutFormFields: () => (FieldDefinitionLayoutFormFields)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_modules_field_definitions_utils_context_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/field-definitions/utils/context-helpers.ts");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
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



const FieldDefinitionLayoutFormFields = (props)=>{
    const { context } = props;
    const isRegion = (0,_Pimcore_modules_field_definitions_utils_context_helpers__WEBPACK_IMPORTED_MODULE_1__.isParent)('region', context);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.FormKit.Panel, {
            contentPadding: {
                bottom: 'none',
                top: 'small',
                x: 'small'
            },
            title: `${props.id} (${props.type.charAt(0).toUpperCase() + props.type.slice(1)})`,
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                    label: "name",
                    name: "name",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.Input, {}, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/layout/field-defintion-layout-form-fields.tsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/layout/field-defintion-layout-form-fields.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, undefined),
                isRegion && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                    label: "region",
                    name: "region",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.Select, {
                        options: [
                            {
                                label: 'center',
                                value: 'center'
                            },
                            {
                                label: 'north',
                                value: 'north'
                            },
                            {
                                label: 'south',
                                value: 'south'
                            },
                            {
                                label: 'east',
                                value: 'east'
                            },
                            {
                                label: 'west',
                                value: 'west'
                            }
                        ]
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/layout/field-defintion-layout-form-fields.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/layout/field-defintion-layout-form-fields.tsx",
                    lineNumber: 29,
                    columnNumber: 22
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                    label: "title",
                    name: "title",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.Input, {}, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/layout/field-defintion-layout-form-fields.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/layout/field-defintion-layout-form-fields.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                    name: "collapsible",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.Switch, {
                        labelRight: "collapsible"
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/layout/field-defintion-layout-form-fields.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/layout/field-defintion-layout-form-fields.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                    name: "collapsed",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.Switch, {
                        labelRight: "collapsed"
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/layout/field-defintion-layout-form-fields.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/layout/field-defintion-layout-form-fields.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/dynamic-types/types/_abstracts/layout/field-defintion-layout-form-fields.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, undefined)
    }, void 0, false);
};
_c = FieldDefinitionLayoutFormFields;
var _c;
$RefreshReg$(_c, "FieldDefinitionLayoutFormFields");

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
"./js/src/core/modules/field-definitions/utils/layout-helpers.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  buildTree: () => (buildTree),
  reduce: () => (reduce)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _sdk_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/sdk/app/index.ts");
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var _sdk_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/sdk/utils/index.ts");
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




const reduce = (props)=>{
    if (props.layout === undefined) {
        return;
    }
    const initialFieldDefinitions = {};
    const buildStructure = (layoutItem)=>{
        const id = (0,_sdk_utils__WEBPACK_IMPORTED_MODULE_3__.uuid)();
        const node = {
            id,
            children: layoutItem.children !== undefined && layoutItem.children !== null ? layoutItem.children.map((child)=>buildStructure(child)) : []
        };
        const { children, ...fieldDef } = layoutItem;
        // @todo remove type conversion after fix of typo from backendSide (fieldtype vs. fieldType)
        initialFieldDefinitions[id] = fieldDef;
        return node;
    };
    const rootStructure = buildStructure(props.layout);
    return {
        structure: rootStructure,
        fieldDefinitions: initialFieldDefinitions
    };
};
const buildTree = (props)=>{
    var _this = undefined;
    const { fieldDefinitions, structure, itemCallback } = props;
    const buildTreeItems = function(node) {
        let parentPath = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
        const fieldDefinitionRegistry = _sdk_app__WEBPACK_IMPORTED_MODULE_1__.container.get(_sdk_app__WEBPACK_IMPORTED_MODULE_1__.serviceIds["DynamicTypes/FieldDefinitionRegistry"]);
        const fieldDef = fieldDefinitions[node.id];
        let dynType;
        if (fieldDefinitionRegistry.hasDynamicType(fieldDef.fieldtype)) {
            dynType = fieldDefinitionRegistry.getDynamicType(fieldDef.fieldtype);
        }
        const currentPath = [
            ...parentPath,
            node.id
        ];
        const item = {
            title: fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.name,
            icon: dynType !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.Icon, {
                ...dynType.getIcon(),
                iconColorGroup: [
                    'fieldDefinition_' + dynType.id,
                    'fieldDefinition'
                ]
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/field-definitions/utils/layout-helpers.tsx",
                lineNumber: 57,
                columnNumber: 37
            }, _this) : undefined,
            key: node.id,
            meta: {
                currentPath
            },
            children: node.children.map((child)=>buildTreeItems(child, currentPath))
        };
        if (itemCallback !== undefined) {
            return itemCallback({
                fieldDefinition: fieldDef,
                initialTreeItem: item
            });
        }
        return item;
    };
    return buildTreeItems(structure);
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
//# sourceMappingURL=__federation_expose_modules__field_definitions.js.map