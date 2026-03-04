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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["__federation_expose_modules__rule_builder"], {
"./js/src/core/components/form/hooks/use-debounced-form-change.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDebouncedFormChange: () => (useDebouncedFormChange)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/utils/uuid.ts");
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _providers_debounced_form_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/form/providers/debounced-form-provider.tsx");
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





const useDebouncedFormChange = function(onFormChange) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { disabled = false, delay = 300, immediateFields = [] } = options;
    const resolvedTag = (0,_providers_debounced_form_provider__WEBPACK_IMPORTED_MODULE_5__.useDebouncedFormContext)(options.tag);
    const registry = (0,_Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_3__.useInjection)(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_4__.serviceIds.debouncedFormRegistry);
    const registryKey = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>`${resolvedTag ?? 'default'}-${(0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_2__.uuid)()}`, [
        resolvedTag
    ]);
    const debouncedChangeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)((0,lodash__WEBPACK_IMPORTED_MODULE_1__.debounce)((changedValues, allValues)=>{
        onFormChange(changedValues, allValues);
    }, delay));
    const handleFormChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((changedValues, allValues)=>{
        if (disabled) {
            onFormChange(changedValues, allValues);
            return;
        }
        const immediateChanges = {};
        const debouncedChanges = {};
        Object.entries(changedValues).forEach((param)=>{
            let [key, value] = param;
            if (immediateFields.includes(key)) {
                immediateChanges[key] = value;
            } else {
                debouncedChanges[key] = value;
            }
        });
        if (Object.keys(immediateChanges).length > 0) {
            onFormChange(immediateChanges, allValues);
        }
        if (Object.keys(debouncedChanges).length > 0) {
            debouncedChangeRef.current(debouncedChanges, allValues);
        }
    }, [
        onFormChange,
        immediateFields
    ]);
    const flush = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        debouncedChangeRef.current.flush();
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isNil)(resolvedTag) && !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(resolvedTag)) {
            registry.register(registryKey, flush, resolvedTag);
            return ()=>{
                registry.unregister(registryKey);
            };
        }
    }, [
        registry,
        registryKey,
        flush,
        resolvedTag
    ]);
    return {
        handleFormChange,
        flush
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
"./js/src/core/components/rule-condition/types/rule-condition.types.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
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
"./js/src/core/modules/rule-builder/components/rule-actions/types/rule-actions.types.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
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
"./js/src/core/modules/rule-builder/components/rule-conditions/types/rule-conditions.types.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
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
"./js/src/core/modules/rule-builder/components/rule-config-form/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleConfigForm: () => (/* reexport safe */ _rule_config_form__WEBPACK_IMPORTED_MODULE_0__.RuleConfigForm)
});
/* ESM import */var _rule_config_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-config-form/rule-config-form.tsx");
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
"./js/src/core/modules/rule-builder/components/rule-triggers/types/rule-triggers.types.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
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
"./js/src/core/modules/rule-builder/components/shared/hooks/use-rule-items.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useRuleItems: () => (useRuleItems)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/utils/uuid.ts");
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

/**
 * Shared hook for managing rule items (actions, triggers)
 */ function useRuleItems(props) {
    const { value = [], onChange, registry } = props;
    const handleAdd = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((type)=>{
        if (onChange === undefined) return;
        const defaultValue = registry.getDefaultValue(type);
        const newItem = {
            id: (0,_Pimcore_utils_uuid__WEBPACK_IMPORTED_MODULE_1__.uuid)(),
            type,
            config: defaultValue
        };
        onChange([
            ...value,
            newItem
        ]);
    }, [
        onChange,
        registry,
        value
    ]);
    const handleRemove = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((id)=>{
        if (onChange === undefined) return;
        onChange(value.filter((item)=>item.id !== id));
    }, [
        onChange,
        value
    ]);
    const handleMove = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((id, direction)=>{
        if (onChange === undefined) return;
        const index = value.findIndex((item)=>item.id === id);
        if (index === -1) return;
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= value.length) return;
        const newItems = [
            ...value
        ];
        const [movedItem] = newItems.splice(index, 1);
        newItems.splice(newIndex, 0, movedItem);
        onChange(newItems);
    }, [
        onChange,
        value
    ]);
    const handleUpdate = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((id, config)=>{
        if (onChange === undefined) return;
        const newItems = value.map((item)=>item.id === id ? {
                ...item,
                config
            } : item);
        onChange(newItems);
    }, [
        onChange,
        value
    ]);
    const canMoveUp = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((id)=>{
        const index = value.findIndex((item)=>item.id === id);
        return index > 0;
    }, [
        value
    ]);
    const canMoveDown = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((id)=>{
        const index = value.findIndex((item)=>item.id === id);
        return index >= 0 && index < value.length - 1;
    }, [
        value
    ]);
    return {
        registry,
        handleAdd,
        handleRemove,
        handleMove,
        handleUpdate,
        canMoveUp,
        canMoveDown
    };
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
"./js/src/core/modules/rule-builder/components/sortable-rules-list/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SortableRuleItem: () => (/* reexport safe */ _sortable_rule_item__WEBPACK_IMPORTED_MODULE_1__.SortableRuleItem),
  SortableRulesList: () => (/* reexport safe */ _sortable_rules_list__WEBPACK_IMPORTED_MODULE_0__.SortableRulesList)
});
/* ESM import */var _sortable_rules_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rules-list.tsx");
/* ESM import */var _sortable_rule_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rule-item.tsx");
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
"./js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rules-list.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_style__WEBPACK_IMPORTED_MODULE_0__);
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { css, token } = param;
    return {
        ruleItem: css`
      padding: 2px ${token.paddingXS}px;

      &:hover {
        background-color: ${token.controlItemBgActiveHover};
      }

      &:active {
        cursor: grabbing;
      }
    `,
        ruleItemIcon: css`
      color: ${token.colorIcon};
    `,
        ruleItemTitle: css`
      color: ${token.colorText};
    `,
        inactiveIcon: css`
      .pimcore-icon__svg {
        opacity: 0.4;
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
"./js/src/core/modules/rule-builder/dynamic-types/rule-action/dynamic-type-rule-action-registry.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeRuleActionRegistry: () => (DynamicTypeRuleActionRegistry)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx");
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


class DynamicTypeRuleActionRegistry extends _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeRegistryAbstract {
    getActionFormComponent(id, props) {
        return this.getDynamicType(id).renderForm(props);
    }
    getDefaultValue(id) {
        return this.getDynamicType(id).defaultValue;
    }
}
DynamicTypeRuleActionRegistry = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)()
], DynamicTypeRuleActionRegistry);

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
"./js/src/core/modules/rule-builder/dynamic-types/rule-condition/dynamic-type-rule-condition-registry.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeRuleConditionRegistry: () => (DynamicTypeRuleConditionRegistry)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx");
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


class DynamicTypeRuleConditionRegistry extends _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeRegistryAbstract {
    getConditionTypeConfig(id) {
        const type = this.getDynamicType(id, false);
        if (type === undefined) {
            return undefined;
        }
        return {
            id: type.id,
            label: type.label,
            icon: type.icon,
            defaultValue: type.defaultValue,
            renderForm: type.renderForm
        };
    }
}
DynamicTypeRuleConditionRegistry = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)()
], DynamicTypeRuleConditionRegistry);

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
"./js/src/core/modules/rule-builder/dynamic-types/rule-trigger/dynamic-type-rule-trigger-registry.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeRuleTriggerRegistry: () => (DynamicTypeRuleTriggerRegistry)
});
/* ESM import */var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx");
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


class DynamicTypeRuleTriggerRegistry extends _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeRegistryAbstract {
    getTriggerFormComponent(id, props) {
        return this.getDynamicType(id).renderForm(props);
    }
    getDefaultValue(id) {
        return this.getDynamicType(id).defaultValue;
    }
}
DynamicTypeRuleTriggerRegistry = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)()
], DynamicTypeRuleTriggerRegistry);

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
"./js/src/sdk/modules/rule-builder/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeRuleActionAbstract: () => (/* reexport safe */ _Pimcore_modules_rule_builder_dynamic_types_rule_action_dynamic_type_rule_action_abstract__WEBPACK_IMPORTED_MODULE_5__.DynamicTypeRuleActionAbstract),
  DynamicTypeRuleActionRegistry: () => (/* reexport safe */ _Pimcore_modules_rule_builder_dynamic_types_rule_action_dynamic_type_rule_action_registry__WEBPACK_IMPORTED_MODULE_8__.DynamicTypeRuleActionRegistry),
  DynamicTypeRuleConditionAbstract: () => (/* reexport safe */ _Pimcore_modules_rule_builder_dynamic_types_rule_condition_dynamic_type_rule_condition_abstract__WEBPACK_IMPORTED_MODULE_6__.DynamicTypeRuleConditionAbstract),
  DynamicTypeRuleConditionRegistry: () => (/* reexport safe */ _Pimcore_modules_rule_builder_dynamic_types_rule_condition_dynamic_type_rule_condition_registry__WEBPACK_IMPORTED_MODULE_9__.DynamicTypeRuleConditionRegistry),
  DynamicTypeRuleTriggerAbstract: () => (/* reexport safe */ _Pimcore_modules_rule_builder_dynamic_types_rule_trigger_dynamic_type_rule_trigger_abstract__WEBPACK_IMPORTED_MODULE_7__.DynamicTypeRuleTriggerAbstract),
  DynamicTypeRuleTriggerRegistry: () => (/* reexport safe */ _Pimcore_modules_rule_builder_dynamic_types_rule_trigger_dynamic_type_rule_trigger_registry__WEBPACK_IMPORTED_MODULE_10__.DynamicTypeRuleTriggerRegistry),
  RuleActions: () => (/* reexport safe */ _Pimcore_modules_rule_builder_components_rule_actions_rule_actions__WEBPACK_IMPORTED_MODULE_0__.RuleActions),
  RuleConditions: () => (/* reexport safe */ _Pimcore_modules_rule_builder_components_rule_conditions_rule_conditions__WEBPACK_IMPORTED_MODULE_2__.RuleConditions),
  RuleConfigForm: () => (/* reexport safe */ _Pimcore_modules_rule_builder_components_rule_config_form__WEBPACK_IMPORTED_MODULE_4__.RuleConfigForm),
  RuleTriggers: () => (/* reexport safe */ _Pimcore_modules_rule_builder_components_rule_triggers_rule_triggers__WEBPACK_IMPORTED_MODULE_1__.RuleTriggers),
  SortableRuleItem: () => (/* reexport safe */ _Pimcore_modules_rule_builder_components_sortable_rules_list__WEBPACK_IMPORTED_MODULE_3__.SortableRuleItem),
  SortableRulesList: () => (/* reexport safe */ _Pimcore_modules_rule_builder_components_sortable_rules_list__WEBPACK_IMPORTED_MODULE_3__.SortableRulesList)
});
/* ESM import */var _Pimcore_modules_rule_builder_components_rule_actions_rule_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/rule-actions.tsx");
/* ESM import */var _Pimcore_modules_rule_builder_components_rule_triggers_rule_triggers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/rule-triggers.tsx");
/* ESM import */var _Pimcore_modules_rule_builder_components_rule_conditions_rule_conditions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-conditions/rule-conditions.tsx");
/* ESM import */var _Pimcore_modules_rule_builder_components_sortable_rules_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/rule-builder/components/sortable-rules-list/index.ts");
/* ESM import */var _Pimcore_modules_rule_builder_components_rule_config_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-config-form/index.ts");
/* ESM import */var _Pimcore_modules_rule_builder_dynamic_types_rule_action_dynamic_type_rule_action_abstract__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/rule-builder/dynamic-types/rule-action/dynamic-type-rule-action-abstract.tsx");
/* ESM import */var _Pimcore_modules_rule_builder_dynamic_types_rule_condition_dynamic_type_rule_condition_abstract__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/rule-builder/dynamic-types/rule-condition/dynamic-type-rule-condition-abstract.tsx");
/* ESM import */var _Pimcore_modules_rule_builder_dynamic_types_rule_trigger_dynamic_type_rule_trigger_abstract__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/rule-builder/dynamic-types/rule-trigger/dynamic-type-rule-trigger-abstract.tsx");
/* ESM import */var _Pimcore_modules_rule_builder_dynamic_types_rule_action_dynamic_type_rule_action_registry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/rule-builder/dynamic-types/rule-action/dynamic-type-rule-action-registry.ts");
/* ESM import */var _Pimcore_modules_rule_builder_dynamic_types_rule_condition_dynamic_type_rule_condition_registry__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/rule-builder/dynamic-types/rule-condition/dynamic-type-rule-condition-registry.ts");
/* ESM import */var _Pimcore_modules_rule_builder_dynamic_types_rule_trigger_dynamic_type_rule_trigger_registry__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/rule-builder/dynamic-types/rule-trigger/dynamic-type-rule-trigger-registry.ts");
/* ESM import */var _Pimcore_modules_rule_builder_components_rule_actions_types_rule_actions_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/types/rule-actions.types.ts");
/* ESM import */var _Pimcore_modules_rule_builder_components_rule_triggers_types_rule_triggers_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/types/rule-triggers.types.ts");
/* ESM import */var _Pimcore_modules_rule_builder_components_rule_conditions_types_rule_conditions_types__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-conditions/types/rule-conditions.types.ts");
/* ESM import */var _Pimcore_components_rule_condition_types_rule_condition_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./js/src/core/components/rule-condition/types/rule-condition.types.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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
// Components





// Dynamic Type Abstracts



// Dynamic Type Registries



// Types



// Condition types (re-exported from components for convenience)


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
"./js/src/core/modules/rule-builder/components/rule-actions/components/action-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActionItem: () => (ActionItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_toolstrip_box_tool_strip_box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/toolstrip/box/tool-strip-box.tsx");
/* ESM import */var _Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/alert/alert.tsx");
/* ESM import */var _Pimcore_modules_rule_builder_components_shared_rule_item_tool_strip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/rule-item-tool-strip.tsx");
/* ESM import */var _provider_rule_actions_provider_use_rule_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/provider/rule-actions-provider/use-rule-actions.tsx");
/* ESM import */var _Pimcore_modules_rule_builder_components_shared_hooks_use_sortable_item__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/hooks/use-sortable-item.ts");
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







const ActionItem = (param)=>{
    let { action, disabled = false } = param;
    var _dynamicType_isAvailable;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const { registry, handleRemoveAction, handleMoveAction, handleUpdateAction, canMoveUp, canMoveDown } = (0,_provider_rule_actions_provider_use_rule_actions__WEBPACK_IMPORTED_MODULE_6__.useRuleActions)();
    const dynamicType = registry.getDynamicType(action.type, false);
    const { attributes, listeners, setNodeRef, style } = (0,_Pimcore_modules_rule_builder_components_shared_hooks_use_sortable_item__WEBPACK_IMPORTED_MODULE_7__.useSortableItem)(action.id);
    const isAvailable = (dynamicType === null || dynamicType === void 0 ? void 0 : (_dynamicType_isAvailable = dynamicType.isAvailable) === null || _dynamicType_isAvailable === void 0 ? void 0 : _dynamicType_isAvailable.call(dynamicType)) ?? true;
    if (dynamicType === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_4__.Alert, {
            banner: true,
            message: `Unknown action type: ${action.type}`,
            type: "warning"
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/components/action-item.tsx",
            lineNumber: 42,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        ref: setNodeRef,
        style: style,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolstrip_box_tool_strip_box__WEBPACK_IMPORTED_MODULE_3__.ToolStripBox, {
            docked: false,
            renderToolStripStart: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_rule_builder_components_shared_rule_item_tool_strip__WEBPACK_IMPORTED_MODULE_5__.RuleItemToolStrip, {
                canMoveDown: canMoveDown(action.id),
                canMoveUp: canMoveUp(action.id),
                disabled: disabled,
                dragHandleProps: {
                    listeners: {
                        ...attributes,
                        ...listeners
                    }
                },
                icon: dynamicType.icon,
                label: dynamicType.label,
                onMoveDown: ()=>{
                    handleMoveAction(action.id, 'down');
                },
                onMoveUp: ()=>{
                    handleMoveAction(action.id, 'up');
                },
                onRemove: ()=>{
                    handleRemoveAction(action.id);
                }
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/components/action-item.tsx",
                lineNumber: 45,
                columnNumber: 58
            }, void 0),
            children: [
                !isAvailable && (dynamicType === null || dynamicType === void 0 ? void 0 : dynamicType.notAvailableHint) !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_4__.Alert, {
                    banner: true,
                    message: t(dynamicType.notAvailableHint),
                    showIcon: true,
                    type: "warning"
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/components/action-item.tsx",
                    lineNumber: 57,
                    columnNumber: 73
                }, undefined),
                registry.getActionFormComponent(action.type, {
                    value: action.config,
                    onChange: (config)=>{
                        handleUpdateAction(action.id, config);
                    },
                    disabled
                })
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/components/action-item.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/components/action-item.tsx",
        lineNumber: 44,
        columnNumber: 10
    }, undefined);
};
_s(ActionItem, "8P14PRS7tDdUexuW+4WwXra3KxY=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _provider_rule_actions_provider_use_rule_actions__WEBPACK_IMPORTED_MODULE_6__.useRuleActions,
        _Pimcore_modules_rule_builder_components_shared_hooks_use_sortable_item__WEBPACK_IMPORTED_MODULE_7__.useSortableItem
    ];
});
_c = ActionItem;
var _c;
$RefreshReg$(_c, "ActionItem");

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
"./js/src/core/modules/rule-builder/components/rule-actions/components/add-action-button/add-action-button.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AddActionButton: () => (AddActionButton)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var _hooks_use_add_action_menu_items__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/hooks/use-add-action-menu-items.tsx");
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





const AddActionButton = (param)=>{
    let { disabled = false, children } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const menuItems = (0,_hooks_use_add_action_menu_items__WEBPACK_IMPORTED_MODULE_5__.useAddActionMenuItems)();
    const defaultButton = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_4__.IconTextButton, {
        disabled: disabled,
        icon: {
            value: 'plus-circle'
        },
        children: t('rule-builder.add-action')
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/components/add-action-button/add-action-button.tsx",
        lineNumber: 24,
        columnNumber: 25
    }, undefined);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_3__.Dropdown, {
        disabled: disabled,
        menu: {
            items: menuItems
        },
        trigger: [
            'click'
        ],
        children: children ?? defaultButton
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/components/add-action-button/add-action-button.tsx",
        lineNumber: 29,
        columnNumber: 10
    }, undefined);
};
_s(AddActionButton, "sLdw6VEp36gKldMynojMnl9sN7A=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _hooks_use_add_action_menu_items__WEBPACK_IMPORTED_MODULE_5__.useAddActionMenuItems
    ];
});
_c = AddActionButton;
var _c;
$RefreshReg$(_c, "AddActionButton");

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
"./js/src/core/modules/rule-builder/components/rule-actions/hooks/use-add-action-menu-items.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAddActionMenuItems: () => (useAddActionMenuItems)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _provider_rule_actions_provider_use_rule_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/provider/rule-actions-provider/use-rule-actions.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
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






/**
 * Shared hook for generating action type menu items with icons
 */ const useAddActionMenuItems = ()=>{
    _s();
    const { registry, handleAddAction } = (0,_provider_rule_actions_provider_use_rule_actions__WEBPACK_IMPORTED_MODULE_5__.useRuleActions)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const allActionTypes = registry.getDynamicTypes();
        return allActionTypes.map((dynamicType)=>{
            var _dynamicType_isAvailable;
            const isAvailable = ((_dynamicType_isAvailable = dynamicType.isAvailable) === null || _dynamicType_isAvailable === void 0 ? void 0 : _dynamicType_isAvailable.call(dynamicType)) ?? true;
            const label = t(dynamicType.label);
            return {
                key: dynamicType.id,
                label: !isAvailable && dynamicType.notAvailableHint !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
                    title: t(dynamicType.notAvailableHint),
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        children: label
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/hooks/use-add-action-menu-items.tsx",
                        lineNumber: 37,
                        columnNumber: 15
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/hooks/use-add-action-menu-items.tsx",
                    lineNumber: 36,
                    columnNumber: 77
                }, undefined) : label,
                icon: (0,lodash__WEBPACK_IMPORTED_MODULE_6__.isNil)(dynamicType.icon) ? undefined : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                    ...dynamicType.icon
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/hooks/use-add-action-menu-items.tsx",
                    lineNumber: 39,
                    columnNumber: 53
                }, undefined),
                disabled: !isAvailable,
                onClick: ()=>{
                    handleAddAction(dynamicType.id);
                }
            };
        });
    }, [
        registry,
        handleAddAction
    ]);
};
_s(useAddActionMenuItems, "ZKpNH35c9srux9BnmpXGgnpWuho=", false, function() {
    return [
        _provider_rule_actions_provider_use_rule_actions__WEBPACK_IMPORTED_MODULE_5__.useRuleActions,
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation
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
"./js/src/core/modules/rule-builder/components/rule-actions/provider/rule-actions-provider/rule-actions-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleActionsProvider: () => (RuleActionsProvider),
  RuleActionsProviderContext: () => (RuleActionsProviderContext)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_rule_builder_components_shared_hooks_use_rule_items__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/hooks/use-rule-items.ts");
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


const RuleActionsProviderContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const RuleActionsProvider = (props)=>{
    _s();
    const { children, ...ruleActionsProps } = props;
    const { registry, handleAdd, handleRemove, handleMove, handleUpdate, canMoveUp, canMoveDown } = (0,_Pimcore_modules_rule_builder_components_shared_hooks_use_rule_items__WEBPACK_IMPORTED_MODULE_2__.useRuleItems)(ruleActionsProps);
    const value = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            registry,
            handleAddAction: handleAdd,
            handleRemoveAction: handleRemove,
            handleMoveAction: handleMove,
            handleUpdateAction: handleUpdate,
            canMoveUp,
            canMoveDown
        }), [
        registry,
        handleAdd,
        handleRemove,
        handleMove,
        handleUpdate,
        canMoveUp,
        canMoveDown
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(RuleActionsProviderContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/provider/rule-actions-provider/rule-actions-provider.tsx",
        lineNumber: 37,
        columnNumber: 10
    }, undefined);
};
_s(RuleActionsProvider, "7ydYH8jsjSnRD+bXJpmBdfHsG4M=", false, function() {
    return [
        _Pimcore_modules_rule_builder_components_shared_hooks_use_rule_items__WEBPACK_IMPORTED_MODULE_2__.useRuleItems
    ];
});
_c = RuleActionsProvider;
var _c;
$RefreshReg$(_c, "RuleActionsProvider");

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
"./js/src/core/modules/rule-builder/components/rule-actions/provider/rule-actions-provider/use-rule-actions.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useRuleActions: () => (useRuleActions)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _rule_actions_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/provider/rule-actions-provider/rule-actions-provider.tsx");
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


const useRuleActions = ()=>{
    _s();
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_rule_actions_provider__WEBPACK_IMPORTED_MODULE_1__.RuleActionsProviderContext);
    if (context === undefined) {
        throw new Error('useRuleActions must be used within a RuleActionsProvider');
    }
    return context;
};
_s(useRuleActions, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");

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
"./js/src/core/modules/rule-builder/components/rule-actions/rule-actions.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleActions: () => (RuleActions)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _components_action_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/components/action-item.tsx");
/* ESM import */var _components_add_action_button_add_action_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/components/add-action-button/add-action-button.tsx");
/* ESM import */var _provider_rule_actions_provider_rule_actions_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/provider/rule-actions-provider/rule-actions-provider.tsx");
/* ESM import */var _shared_rule_item_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx");
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





const RuleActions = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_shared_rule_item_list__WEBPACK_IMPORTED_MODULE_5__.RuleItemList, {
        Provider: _provider_rule_actions_provider_rule_actions_provider__WEBPACK_IMPORTED_MODULE_4__.RuleActionsProvider,
        onChange: props.onChange,
        providerProps: props,
        renderAddButton: (disabled)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_add_action_button_add_action_button__WEBPACK_IMPORTED_MODULE_3__.AddActionButton, {
                disabled: disabled
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/rule-actions.tsx",
                lineNumber: 17,
                columnNumber: 132
            }, void 0),
        renderItem: (action, disabled)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_action_item__WEBPACK_IMPORTED_MODULE_2__.ActionItem, {
                action: action,
                disabled: disabled
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/rule-actions.tsx",
                lineNumber: 17,
                columnNumber: 207
            }, void 0),
        value: props.value ?? []
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/rule-actions.tsx",
        lineNumber: 17,
        columnNumber: 10
    }, undefined);
};
_c = RuleActions;
var _c;
$RefreshReg$(_c, "RuleActions");

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
"./js/src/core/modules/rule-builder/components/rule-conditions/rule-conditions.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleConditions: () => (RuleConditions)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_rule_condition_rule_condition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/rule-condition/rule-condition.tsx");
/* ESM import */var _Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/app/error-boundary/error-boundary.tsx");
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



const RuleConditions = (props)=>{
    _s();
    const { registry, value, onChange, disabled } = props;
    const conditionTypes = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return registry.getDynamicTypes();
    }, [
        registry
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_3__["default"], {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_rule_condition_rule_condition__WEBPACK_IMPORTED_MODULE_2__.RuleCondition, {
            conditionTypes: conditionTypes,
            disabled: disabled,
            onChange: onChange,
            value: value
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-conditions/rule-conditions.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-conditions/rule-conditions.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, undefined);
};
_s(RuleConditions, "YMyKo5GkgewPHTYCq4gjKZktvfw=");
_c = RuleConditions;
var _c;
$RefreshReg$(_c, "RuleConditions");

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
"./js/src/core/modules/rule-builder/components/rule-config-form/rule-config-form.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleConfigForm: () => (RuleConfigForm)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _sdk_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/sdk/components/index.ts");
/* ESM import */var _Pimcore_components_form_hooks_use_debounced_form_change__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/hooks/use-debounced-form-change.ts");
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



/**
 * Reusable form wrapper for rule configurations (conditions, actions, triggers).
 */ function RuleConfigForm(param) {
    let { config, onChange, disabled, children, debounceOptions } = param;
    _s();
    const [form] = _sdk_components__WEBPACK_IMPORTED_MODULE_2__.Form.useForm();
    const handleValuesChange = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((_changedValues, allValues)=>{
        onChange(allValues);
    }, [
        onChange
    ]);
    const { handleFormChange } = (0,_Pimcore_components_form_hooks_use_debounced_form_change__WEBPACK_IMPORTED_MODULE_3__.useDebouncedFormChange)(handleValuesChange, {
        ...debounceOptions,
        disabled: debounceOptions === undefined
    });
    const formProps = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            form,
            component: false,
            disabled,
            initialValues: config,
            onValuesChange: handleFormChange
        }), [
        form,
        disabled,
        config,
        handleFormChange
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sdk_components__WEBPACK_IMPORTED_MODULE_2__.FormKit, {
        formProps: formProps,
        children: children
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-config-form/rule-config-form.tsx",
        lineNumber: 41,
        columnNumber: 10
    }, this);
}
_s(RuleConfigForm, "HkjnBSv3lmp2w64A58wNEMYh2Lc=", false, function() {
    return [
        _sdk_components__WEBPACK_IMPORTED_MODULE_2__.Form.useForm,
        _Pimcore_components_form_hooks_use_debounced_form_change__WEBPACK_IMPORTED_MODULE_3__.useDebouncedFormChange
    ];
});
_c = RuleConfigForm;
var _c;
$RefreshReg$(_c, "RuleConfigForm");

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
"./js/src/core/modules/rule-builder/components/rule-triggers/components/add-trigger-button/add-trigger-button.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AddTriggerButton: () => (AddTriggerButton)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var _Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* ESM import */var _hooks_use_add_trigger_menu_items__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/hooks/use-add-trigger-menu-items.tsx");
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





const AddTriggerButton = (param)=>{
    let { disabled = false, children } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const menuItems = (0,_hooks_use_add_trigger_menu_items__WEBPACK_IMPORTED_MODULE_5__.useAddTriggerMenuItems)();
    const defaultButton = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__WEBPACK_IMPORTED_MODULE_4__.IconTextButton, {
        disabled: disabled,
        icon: {
            value: 'plus-circle'
        },
        children: t('rule-builder.add-trigger')
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-triggers/components/add-trigger-button/add-trigger-button.tsx",
        lineNumber: 24,
        columnNumber: 25
    }, undefined);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_3__.Dropdown, {
        disabled: disabled,
        menu: {
            items: menuItems
        },
        trigger: [
            'click'
        ],
        children: children ?? defaultButton
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-triggers/components/add-trigger-button/add-trigger-button.tsx",
        lineNumber: 29,
        columnNumber: 10
    }, undefined);
};
_s(AddTriggerButton, "241+RpFtLE6YKo+P3i9omLzgXmI=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _hooks_use_add_trigger_menu_items__WEBPACK_IMPORTED_MODULE_5__.useAddTriggerMenuItems
    ];
});
_c = AddTriggerButton;
var _c;
$RefreshReg$(_c, "AddTriggerButton");

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
"./js/src/core/modules/rule-builder/components/rule-triggers/components/trigger-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TriggerItem: () => (TriggerItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_toolstrip_box_tool_strip_box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/toolstrip/box/tool-strip-box.tsx");
/* ESM import */var _Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/alert/alert.tsx");
/* ESM import */var _Pimcore_modules_rule_builder_components_shared_rule_item_tool_strip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/rule-item-tool-strip.tsx");
/* ESM import */var _provider_rule_triggers_provider_use_rule_triggers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/provider/rule-triggers-provider/use-rule-triggers.tsx");
/* ESM import */var _Pimcore_modules_rule_builder_components_shared_hooks_use_sortable_item__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/hooks/use-sortable-item.ts");
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







const TriggerItem = (param)=>{
    let { trigger, disabled = false } = param;
    var _dynamicType_isAvailable;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    const { registry, handleRemoveTrigger, handleMoveTrigger, handleUpdateTrigger, canMoveUp, canMoveDown } = (0,_provider_rule_triggers_provider_use_rule_triggers__WEBPACK_IMPORTED_MODULE_6__.useRuleTriggers)();
    const dynamicType = registry.getDynamicType(trigger.type, false);
    const { attributes, listeners, setNodeRef, style } = (0,_Pimcore_modules_rule_builder_components_shared_hooks_use_sortable_item__WEBPACK_IMPORTED_MODULE_7__.useSortableItem)(trigger.id);
    const isAvailable = (dynamicType === null || dynamicType === void 0 ? void 0 : (_dynamicType_isAvailable = dynamicType.isAvailable) === null || _dynamicType_isAvailable === void 0 ? void 0 : _dynamicType_isAvailable.call(dynamicType)) ?? true;
    if (dynamicType === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_4__.Alert, {
            banner: true,
            message: `Unknown trigger type: ${trigger.type}`,
            type: "warning"
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-triggers/components/trigger-item.tsx",
            lineNumber: 42,
            columnNumber: 12
        }, undefined);
    }
    const triggerFormElement = registry.getTriggerFormComponent(trigger.type, {
        value: trigger.config,
        onChange: (config)=>{
            handleUpdateTrigger(trigger.id, config);
        },
        disabled
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        ref: setNodeRef,
        style: style,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolstrip_box_tool_strip_box__WEBPACK_IMPORTED_MODULE_3__.ToolStripBox, {
            docked: false,
            renderToolStripStart: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_rule_builder_components_shared_rule_item_tool_strip__WEBPACK_IMPORTED_MODULE_5__.RuleItemToolStrip, {
                canMoveDown: canMoveDown(trigger.id),
                canMoveUp: canMoveUp(trigger.id),
                disabled: disabled,
                dragHandleProps: {
                    listeners: {
                        ...attributes,
                        ...listeners
                    }
                },
                icon: dynamicType.icon,
                label: dynamicType.label,
                onMoveDown: ()=>{
                    handleMoveTrigger(trigger.id, 'down');
                },
                onMoveUp: ()=>{
                    handleMoveTrigger(trigger.id, 'up');
                },
                onRemove: ()=>{
                    handleRemoveTrigger(trigger.id);
                }
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-triggers/components/trigger-item.tsx",
                lineNumber: 52,
                columnNumber: 58
            }, void 0),
            children: [
                !isAvailable && (dynamicType === null || dynamicType === void 0 ? void 0 : dynamicType.notAvailableHint) !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_alert_alert__WEBPACK_IMPORTED_MODULE_4__.Alert, {
                    banner: true,
                    message: t(dynamicType.notAvailableHint),
                    showIcon: true,
                    type: "warning"
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-triggers/components/trigger-item.tsx",
                    lineNumber: 64,
                    columnNumber: 73
                }, undefined),
                triggerFormElement
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-triggers/components/trigger-item.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-triggers/components/trigger-item.tsx",
        lineNumber: 51,
        columnNumber: 10
    }, undefined);
};
_s(TriggerItem, "0mbGlNIOhq+8zASLF/eGFJfuppU=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation,
        _provider_rule_triggers_provider_use_rule_triggers__WEBPACK_IMPORTED_MODULE_6__.useRuleTriggers,
        _Pimcore_modules_rule_builder_components_shared_hooks_use_sortable_item__WEBPACK_IMPORTED_MODULE_7__.useSortableItem
    ];
});
_c = TriggerItem;
var _c;
$RefreshReg$(_c, "TriggerItem");

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
"./js/src/core/modules/rule-builder/components/rule-triggers/hooks/use-add-trigger-menu-items.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAddTriggerMenuItems: () => (useAddTriggerMenuItems)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _provider_rule_triggers_provider_use_rule_triggers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/provider/rule-triggers-provider/use-rule-triggers.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
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






/**
 * Shared hook for generating trigger type menu items with icons
 */ const useAddTriggerMenuItems = ()=>{
    _s();
    const { registry, handleAddTrigger } = (0,_provider_rule_triggers_provider_use_rule_triggers__WEBPACK_IMPORTED_MODULE_5__.useRuleTriggers)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const allTriggerTypes = registry.getDynamicTypes();
        return allTriggerTypes.map((dynamicType)=>{
            var _dynamicType_isAvailable;
            const isAvailable = ((_dynamicType_isAvailable = dynamicType.isAvailable) === null || _dynamicType_isAvailable === void 0 ? void 0 : _dynamicType_isAvailable.call(dynamicType)) ?? true;
            const label = t(dynamicType.label);
            return {
                key: dynamicType.id,
                label: !isAvailable && dynamicType.notAvailableHint !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
                    title: t(dynamicType.notAvailableHint),
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        children: label
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-triggers/hooks/use-add-trigger-menu-items.tsx",
                        lineNumber: 37,
                        columnNumber: 15
                    }, undefined)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-triggers/hooks/use-add-trigger-menu-items.tsx",
                    lineNumber: 36,
                    columnNumber: 77
                }, undefined) : label,
                icon: (0,lodash__WEBPACK_IMPORTED_MODULE_6__.isNil)(dynamicType.icon) ? undefined : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                    ...dynamicType.icon
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-triggers/hooks/use-add-trigger-menu-items.tsx",
                    lineNumber: 39,
                    columnNumber: 53
                }, undefined),
                disabled: !isAvailable,
                onClick: ()=>{
                    handleAddTrigger(dynamicType.id);
                }
            };
        });
    }, [
        registry,
        handleAddTrigger,
        t
    ]);
};
_s(useAddTriggerMenuItems, "dLF9UAJuDmv75UckVAzAqIcGjPI=", false, function() {
    return [
        _provider_rule_triggers_provider_use_rule_triggers__WEBPACK_IMPORTED_MODULE_5__.useRuleTriggers,
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation
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
"./js/src/core/modules/rule-builder/components/rule-triggers/provider/rule-triggers-provider/rule-triggers-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleTriggersProvider: () => (RuleTriggersProvider),
  RuleTriggersProviderContext: () => (RuleTriggersProviderContext)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_modules_rule_builder_components_shared_hooks_use_rule_items__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/hooks/use-rule-items.ts");
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


const RuleTriggersProviderContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const RuleTriggersProvider = (props)=>{
    _s();
    const { children, ...ruleTriggersProps } = props;
    const { registry, handleAdd, handleRemove, handleMove, handleUpdate, canMoveUp, canMoveDown } = (0,_Pimcore_modules_rule_builder_components_shared_hooks_use_rule_items__WEBPACK_IMPORTED_MODULE_2__.useRuleItems)(ruleTriggersProps);
    const value = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            registry,
            handleAddTrigger: handleAdd,
            handleRemoveTrigger: handleRemove,
            handleMoveTrigger: handleMove,
            handleUpdateTrigger: handleUpdate,
            canMoveUp,
            canMoveDown
        }), [
        registry,
        handleAdd,
        handleRemove,
        handleMove,
        handleUpdate,
        canMoveUp,
        canMoveDown
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(RuleTriggersProviderContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-triggers/provider/rule-triggers-provider/rule-triggers-provider.tsx",
        lineNumber: 37,
        columnNumber: 10
    }, undefined);
};
_s(RuleTriggersProvider, "7ydYH8jsjSnRD+bXJpmBdfHsG4M=", false, function() {
    return [
        _Pimcore_modules_rule_builder_components_shared_hooks_use_rule_items__WEBPACK_IMPORTED_MODULE_2__.useRuleItems
    ];
});
_c = RuleTriggersProvider;
var _c;
$RefreshReg$(_c, "RuleTriggersProvider");

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
"./js/src/core/modules/rule-builder/components/rule-triggers/provider/rule-triggers-provider/use-rule-triggers.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useRuleTriggers: () => (useRuleTriggers)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _rule_triggers_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/provider/rule-triggers-provider/rule-triggers-provider.tsx");
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


const useRuleTriggers = ()=>{
    _s();
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_rule_triggers_provider__WEBPACK_IMPORTED_MODULE_1__.RuleTriggersProviderContext);
    if (context === undefined) {
        throw new Error('useRuleTriggers must be used within a RuleTriggersProvider');
    }
    return context;
};
_s(useRuleTriggers, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");

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
"./js/src/core/modules/rule-builder/components/rule-triggers/rule-triggers.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleTriggers: () => (RuleTriggers)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _components_trigger_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/components/trigger-item.tsx");
/* ESM import */var _components_add_trigger_button_add_trigger_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/components/add-trigger-button/add-trigger-button.tsx");
/* ESM import */var _provider_rule_triggers_provider_rule_triggers_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/provider/rule-triggers-provider/rule-triggers-provider.tsx");
/* ESM import */var _shared_rule_item_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx");
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





const RuleTriggers = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_shared_rule_item_list__WEBPACK_IMPORTED_MODULE_5__.RuleItemList, {
        Provider: _provider_rule_triggers_provider_rule_triggers_provider__WEBPACK_IMPORTED_MODULE_4__.RuleTriggersProvider,
        providerProps: props,
        renderAddButton: (disabled)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_add_trigger_button_add_trigger_button__WEBPACK_IMPORTED_MODULE_3__.AddTriggerButton, {
                disabled: disabled
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-triggers/rule-triggers.tsx",
                lineNumber: 17,
                columnNumber: 107
            }, void 0),
        renderItem: (trigger, disabled)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_trigger_item__WEBPACK_IMPORTED_MODULE_2__.TriggerItem, {
                disabled: disabled,
                trigger: trigger
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-triggers/rule-triggers.tsx",
                lineNumber: 17,
                columnNumber: 184
            }, void 0),
        value: props.value ?? []
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-triggers/rule-triggers.tsx",
        lineNumber: 17,
        columnNumber: 10
    }, undefined);
};
_c = RuleTriggers;
var _c;
$RefreshReg$(_c, "RuleTriggers");

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
"./js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleItemList: () => (RuleItemList)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/@dnd-kit/core/@dnd-kit/core");
/* ESM import */var _dnd_kit_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/@dnd-kit/sortable/@dnd-kit/sortable");
/* ESM import */var _dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/box/box.tsx");
/* ESM import */var _Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/error-boundary/error-boundary.tsx");
/* ESM import */var _hooks_use_rule_item_drag_drop__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/hooks/use-rule-item-drag-drop.ts");
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







function RuleItemList(props) {
    _s();
    const { value = [], disabled = false, onChange, renderItem, renderAddButton, Provider, providerProps } = props;
    const { strategy, ...dndConfig } = (0,_hooks_use_rule_item_drag_drop__WEBPACK_IMPORTED_MODULE_7__.useRuleItemDragDrop)();
    const handleDragEnd = (event)=>{
        const { active, over } = event;
        if (over === null || active.id === over.id) {
            return;
        }
        const oldIndex = value.findIndex((item)=>item.id === active.id);
        const newIndex = value.findIndex((item)=>item.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
            const newValue = [
                ...value
            ];
            const [movedItem] = newValue.splice(oldIndex, 1);
            newValue.splice(newIndex, 0, movedItem);
            onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        }
    };
    if (value.length === 0) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_6__["default"], {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Provider, {
                ...providerProps,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_5__.Box, {
                    padding: {
                        y: 'extra-small'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                        align: "center",
                        justify: "flex-start",
                        children: renderAddButton(disabled)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx",
                        lineNumber: 55,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx",
                    lineNumber: 52,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx",
                lineNumber: 51,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx",
            lineNumber: 50,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_app_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_6__["default"], {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Provider, {
            ...providerProps,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                gap: "small",
                vertical: true,
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.DndContext, {
                        onDragEnd: handleDragEnd,
                        ...dndConfig,
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_3__.SortableContext, {
                            items: value.map((item)=>item.id),
                            strategy: strategy,
                            children: value.map((item, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_5__.Box, {
                                    margin: {
                                        bottom: index < value.length - 1 ? 'small' : 'none'
                                    },
                                    children: renderItem(item, disabled)
                                }, item.id, false, {
                                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx",
                                    lineNumber: 67,
                                    columnNumber: 43
                                }, this))
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_box_box__WEBPACK_IMPORTED_MODULE_5__.Box, {
                        margin: {
                            top: 'small'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_4__.Flex, {
                            justify: "flex-start",
                            children: renderAddButton(disabled)
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx",
                lineNumber: 64,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx",
        lineNumber: 62,
        columnNumber: 10
    }, this);
}
_s(RuleItemList, "mqQiNKBUNGT5UB/7KyqBs6J3KUk=", false, function() {
    return [
        _hooks_use_rule_item_drag_drop__WEBPACK_IMPORTED_MODULE_7__.useRuleItemDragDrop
    ];
});
_c = RuleItemList;
var _c;
$RefreshReg$(_c, "RuleItemList");

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
"./js/src/core/modules/rule-builder/components/shared/rule-item-tool-strip.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleItemToolStrip: () => (RuleItemToolStrip)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* ESM import */var _Pimcore_components_toolstrip_tool_strip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/toolstrip/tool-strip.tsx");
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_split_split__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/split/split.tsx");
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






const RuleItemToolStrip = (param)=>{
    let { label, icon, onMoveUp, onMoveDown, onRemove, canMoveUp, canMoveDown, disabled = false, dragHandleProps = false } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_toolstrip_tool_strip__WEBPACK_IMPORTED_MODULE_4__.ToolStrip, {
        additionalIcon: icon,
        additionalIconAutoColor: true,
        additionalIconPosition: "before",
        dragger: dragHandleProps,
        theme: "default",
        title: t(label),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_split_split__WEBPACK_IMPORTED_MODULE_6__.Split, {
            dividerSize: "small",
            size: "mini",
            theme: "secondary",
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_5__.Flex, {
                    gap: "extra-small",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
                            disabled: disabled || !canMoveUp,
                            icon: {
                                value: 'chevron-up'
                            },
                            onClick: onMoveUp,
                            size: "small",
                            tooltip: {
                                title: t('rule-builder.move-up')
                            }
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-tool-strip.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, undefined),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
                            disabled: disabled || !canMoveDown,
                            icon: {
                                value: 'chevron-down'
                            },
                            onClick: onMoveDown,
                            size: "small",
                            tooltip: {
                                title: t('rule-builder.move-down')
                            }
                        }, void 0, false, {
                            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-tool-strip.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, undefined)
                    ]
                }, void 0, true, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-tool-strip.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_button_icon_button__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
                    disabled: disabled,
                    icon: {
                        value: 'trash'
                    },
                    onClick: onRemove,
                    size: "small",
                    tooltip: {
                        title: t('rule-builder.remove')
                    }
                }, void 0, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-tool-strip.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-tool-strip.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/shared/rule-item-tool-strip.tsx",
        lineNumber: 31,
        columnNumber: 10
    }, undefined);
};
_s(RuleItemToolStrip, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation
    ];
});
_c = RuleItemToolStrip;
var _c;
$RefreshReg$(_c, "RuleItemToolStrip");

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
"./js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rule-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SortableRuleItem: () => (SortableRuleItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/text/text.tsx");
/* ESM import */var _Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("webpack/sharing/consume/default/classnames/classnames");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var _shared_hooks_use_sortable_item__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/hooks/use-sortable-item.ts");
/* ESM import */var _sortable_rules_list_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rules-list.styles.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
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









function SortableRuleItem(param) {
    let { item, isDragDisabled, contextMenuItems, onClick, renderContent } = param;
    var _item_icon, _item_icon1;
    _s();
    const { styles } = (0,_sortable_rules_list_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles)();
    const { attributes, listeners, setNodeRef, style } = (0,_shared_hooks_use_sortable_item__WEBPACK_IMPORTED_MODULE_7__.useSortableItem)(String(item.id), {
        disabled: isDragDisabled
    });
    const content = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_flex_flex__WEBPACK_IMPORTED_MODULE_2__.Flex, {
        align: "center",
        className: styles.ruleItem,
        gap: "mini",
        onClick: onClick !== undefined ? ()=>{
            onClick(item);
        } : undefined,
        ref: setNodeRef,
        style: style,
        ...attributes,
        ...!isDragDisabled ? listeners : {},
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                className: classnames__WEBPACK_IMPORTED_MODULE_6___default()(styles.ruleItemIcon, {
                    [styles.inactiveIcon]: item.active === false
                }),
                subIconName: item.active === false ? 'eye-off' : undefined,
                type: ((_item_icon = item.icon) === null || _item_icon === void 0 ? void 0 : _item_icon.type) ?? 'name',
                value: ((_item_icon1 = item.icon) === null || _item_icon1 === void 0 ? void 0 : _item_icon1.value) ?? 'target'
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rule-item.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            (0,lodash__WEBPACK_IMPORTED_MODULE_9__.isNil)(renderContent) ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_4__.Text, {
                className: styles.ruleItemTitle,
                children: item.label
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rule-item.tsx",
                lineNumber: 44,
                columnNumber: 31
            }, this) : renderContent(item)
        ]
    }, void 0, true, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rule-item.tsx",
        lineNumber: 38,
        columnNumber: 19
    }, this);
    if (contextMenuItems !== undefined && contextMenuItems.length > 0) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_dropdown__WEBPACK_IMPORTED_MODULE_5__.Dropdown, {
            menu: {
                items: contextMenuItems
            },
            trigger: [
                'contextMenu'
            ],
            children: content
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rule-item.tsx",
            lineNumber: 49,
            columnNumber: 12
        }, this);
    }
    return content;
}
_s(SortableRuleItem, "BoIlGqVfVDJtNb3Hli61dCdgnF4=", false, function() {
    return [
        _sortable_rules_list_styles__WEBPACK_IMPORTED_MODULE_8__.useStyles,
        _shared_hooks_use_sortable_item__WEBPACK_IMPORTED_MODULE_7__.useSortableItem
    ];
});
_c = SortableRuleItem;
var _c;
$RefreshReg$(_c, "SortableRuleItem");

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
"./js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rules-list.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SortableRulesList: () => (SortableRulesList)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/content/content.tsx");
/* ESM import */var _dnd_kit_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/@dnd-kit/core/@dnd-kit/core");
/* ESM import */var _dnd_kit_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_dnd_kit_core__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/@dnd-kit/sortable/@dnd-kit/sortable");
/* ESM import */var _dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var _shared_hooks_use_rule_item_drag_drop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/hooks/use-rule-item-drag-drop.ts");
/* ESM import */var _sortable_rule_item__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rule-item.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_8__);
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








function SortableRulesList(param) {
    let { items, isDragDisabled = false, onReorder, emptyMessage, onItemClick, renderItemContent } = param;
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)();
    const { strategy, ...dndConfig } = (0,_shared_hooks_use_rule_item_drag_drop__WEBPACK_IMPORTED_MODULE_6__.useRuleItemDragDrop)();
    const displayEmptyMessage = emptyMessage ?? t('no-items');
    const handleDragEnd = (event)=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_8__.isNil)(onReorder)) {
            return;
        }
        const { active, over } = event;
        if (over === null || active.id === over.id) {
            return;
        }
        const oldIndex = items.findIndex((item)=>String(item.id) === active.id);
        const newIndex = items.findIndex((item)=>String(item.id) === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
            const newOrder = (0,_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_4__.arrayMove)(items, oldIndex, newIndex);
            onReorder(newOrder);
        }
    };
    if (items.length === 0) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_content_content__WEBPACK_IMPORTED_MODULE_2__.Content, {
            centered: true,
            padded: true,
            children: displayEmptyMessage
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rules-list.tsx",
            lineNumber: 54,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_dnd_kit_core__WEBPACK_IMPORTED_MODULE_3__.DndContext, {
        onDragEnd: handleDragEnd,
        ...dndConfig,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_4__.SortableContext, {
            items: items.map((item)=>String(item.id)),
            strategy: strategy,
            children: items.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_sortable_rule_item__WEBPACK_IMPORTED_MODULE_7__.SortableRuleItem, {
                    contextMenuItems: item.contextMenuItems,
                    isDragDisabled: isDragDisabled,
                    item: item,
                    onClick: onItemClick,
                    renderContent: renderItemContent
                }, item.id, false, {
                    fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rules-list.tsx",
                    lineNumber: 60,
                    columnNumber: 28
                }, this))
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rules-list.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rules-list.tsx",
        lineNumber: 58,
        columnNumber: 10
    }, this);
}
_s(SortableRulesList, "9heqt0iPgrydDIzUEn2ido7511g=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation,
        _shared_hooks_use_rule_item_drag_drop__WEBPACK_IMPORTED_MODULE_6__.useRuleItemDragDrop
    ];
});
_c = SortableRulesList;
var _c;
$RefreshReg$(_c, "SortableRulesList");

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
"./js/src/core/modules/rule-builder/dynamic-types/rule-action/dynamic-type-rule-action-abstract.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeRuleActionAbstract: () => (DynamicTypeRuleActionAbstract)
});
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _dec, _class;
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

let DynamicTypeRuleActionAbstract = (_dec = (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(), _dec(_class = class DynamicTypeRuleActionAbstract extends _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeAbstract {
    constructor(...args){
        super(...args);
        _defineProperty(this, "id", void 0);
        _defineProperty(this, "label", void 0);
        _defineProperty(this, "icon", void 0);
        _defineProperty(this, "defaultValue", void 0);
        /**
     * Optional availability check. If this function returns false, the action
     * will be disabled in the "Add Action" dropdown and show a warning if already configured.
     * Defaults to true if not implemented.
     */ _defineProperty(this, "isAvailable", void 0);
        /**
     * Optional hint to display when the action is not available.
     * Shown as a tooltip in the dropdown and as a warning message in configured actions.
     */ _defineProperty(this, "notAvailableHint", void 0);
        /**
     * Render the form for configuring this action.
     * Must be an arrow function property to preserve 'this' binding.
     *
     * @example
     * renderForm = (props: ActionFormProps<MyActionConfig>): ReactNode => {
     *   return <MyForm {...props} />
     * }
     */ _defineProperty(this, "renderForm", void 0);
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
"./js/src/core/modules/rule-builder/dynamic-types/rule-condition/dynamic-type-rule-condition-abstract.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeRuleConditionAbstract: () => (DynamicTypeRuleConditionAbstract)
});
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _dec, _class;
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

let DynamicTypeRuleConditionAbstract = (_dec = (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(), _dec(_class = class DynamicTypeRuleConditionAbstract extends _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeAbstract {
    constructor(...args){
        super(...args);
        _defineProperty(this, "id", void 0);
        _defineProperty(this, "label", void 0);
        _defineProperty(this, "icon", void 0);
        _defineProperty(this, "defaultValue", void 0);
        /**
     * Optional availability check. If this function returns false, the condition
     * will be disabled in the "Add Condition" dropdown and show a warning if already configured.
     * Defaults to true if not implemented.
     */ _defineProperty(this, "isAvailable", void 0);
        /**
     * Optional hint to display when the condition is not available.
     * Shown as a tooltip in the dropdown and as a warning message in configured conditions.
     */ _defineProperty(this, "notAvailableHint", void 0);
        /**
     * Render the form for this condition type.
     * Must be an arrow function property to preserve 'this' binding.
     *
     * @example
     * renderForm = (props: RuleConditionFormProps<MyConditionConfig>): ReactNode => {
     *   return <MyForm {...props} />
     * }
     */ _defineProperty(this, "renderForm", void 0);
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
"./js/src/core/modules/rule-builder/dynamic-types/rule-trigger/dynamic-type-rule-trigger-abstract.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeRuleTriggerAbstract: () => (DynamicTypeRuleTriggerAbstract)
});
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _dec, _class;
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */ 

let DynamicTypeRuleTriggerAbstract = (_dec = (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(), _dec(_class = class DynamicTypeRuleTriggerAbstract extends _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__WEBPACK_IMPORTED_MODULE_1__.DynamicTypeAbstract {
    constructor(...args){
        super(...args);
        _defineProperty(this, "id", void 0);
        _defineProperty(this, "label", void 0);
        _defineProperty(this, "icon", void 0);
        _defineProperty(this, "defaultValue", void 0);
        /**
     * Optional availability check. If this function returns false, the trigger
     * will be disabled in the "Add Trigger" dropdown and show a warning if already configured.
     * Defaults to true if not implemented.
     */ _defineProperty(this, "isAvailable", void 0);
        /**
     * Optional hint to display when the trigger is not available.
     * Shown as a tooltip in the dropdown and as a warning message in configured triggers.
     */ _defineProperty(this, "notAvailableHint", void 0);
        /**
     * Render the form for configuring this trigger.
     * Must be an arrow function property to preserve 'this' binding.
     *
     * @example
     * renderForm = (props: TriggerFormProps<MyTriggerConfig>): ReactNode => {
     *   return <MyForm {...props} />
     * }
     */ _defineProperty(this, "renderForm", void 0);
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

}]);
//# sourceMappingURL=__federation_expose_modules__rule_builder.js.map