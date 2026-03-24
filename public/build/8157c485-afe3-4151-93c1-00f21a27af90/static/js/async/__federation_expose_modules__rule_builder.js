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
(self["chunk_pimcore_studio_ui_bundle "] = self["chunk_pimcore_studio_ui_bundle "] || []).push([["__federation_expose_modules__rule_builder"], {
"./js/src/core/components/form/hooks/use-debounced-form-change.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDebouncedFormChange: () => (useDebouncedFormChange)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var lodash__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_1);
/* import */ var _Pimcore_utils_uuid__rspack_import_2 = __webpack_require__("./js/src/core/utils/uuid.ts");
/* import */ var _Pimcore_app_depency_injection__rspack_import_3 = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* import */ var _Pimcore_app_config_services_service_ids__rspack_import_4 = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* import */ var _providers_debounced_form_provider__rspack_import_5 = __webpack_require__("./js/src/core/components/form/providers/debounced-form-provider.tsx");
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





const useDebouncedFormChange = function(onFormChange) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { disabled = false, delay = 300, immediateFields = [] } = options;
    const resolvedTag = (0,_providers_debounced_form_provider__rspack_import_5.useDebouncedFormContext)(options.tag);
    const registry = (0,_Pimcore_app_depency_injection__rspack_import_3.useInjection)(_Pimcore_app_config_services_service_ids__rspack_import_4.serviceIds.debouncedFormRegistry);
    const registryKey = (0,react__rspack_import_0.useMemo)(()=>`${resolvedTag ?? 'default'}-${(0,_Pimcore_utils_uuid__rspack_import_2.uuid)()}`, [
        resolvedTag
    ]);
    const onFormChangeRef = (0,react__rspack_import_0.useRef)(onFormChange);
    (0,react__rspack_import_0.useLayoutEffect)(()=>{
        onFormChangeRef.current = onFormChange;
    }, [
        onFormChange
    ]);
    const debouncedChangeRef = (0,react__rspack_import_0.useRef)((0,lodash__rspack_import_1.debounce)((changedValues, allValues)=>{
        onFormChangeRef.current(changedValues, allValues);
    }, delay));
    const handleFormChange = (0,react__rspack_import_0.useCallback)((changedValues, allValues)=>{
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
    const flush = (0,react__rspack_import_0.useCallback)(()=>{
        debouncedChangeRef.current.flush();
    }, []);
    (0,react__rspack_import_0.useEffect)(()=>{
        if (!(0,lodash__rspack_import_1.isNil)(resolvedTag) && !(0,lodash__rspack_import_1.isEmpty)(resolvedTag)) {
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/rule-config-form/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleConfigForm: () => (/* reexport safe */ _rule_config_form__rspack_import_0.RuleConfigForm)
});
/* import */ var _rule_config_form__rspack_import_0 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-config-form/rule-config-form.tsx");
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/shared/hooks/use-rule-items.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useRuleItems: () => (useRuleItems)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _Pimcore_utils_uuid__rspack_import_1 = __webpack_require__("./js/src/core/utils/uuid.ts");
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

/**
 * Shared hook for managing rule items (actions, triggers)
 */ function useRuleItems(props) {
    const { value = [], onChange, registry } = props;
    const handleAdd = (0,react__rspack_import_0.useCallback)((type)=>{
        if (onChange === undefined) return;
        const defaultValue = registry.getDefaultValue(type);
        const newItem = {
            id: (0,_Pimcore_utils_uuid__rspack_import_1.uuid)(),
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
    const handleRemove = (0,react__rspack_import_0.useCallback)((id)=>{
        if (onChange === undefined) return;
        onChange(value.filter((item)=>item.id !== id));
    }, [
        onChange,
        value
    ]);
    const handleMove = (0,react__rspack_import_0.useCallback)((id, direction)=>{
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
    const handleUpdate = (0,react__rspack_import_0.useCallback)((id, config)=>{
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
    const canMoveUp = (0,react__rspack_import_0.useCallback)((id)=>{
        const index = value.findIndex((item)=>item.id === id);
        return index > 0;
    }, [
        value
    ]);
    const canMoveDown = (0,react__rspack_import_0.useCallback)((id)=>{
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/sortable-rules-list/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SortableRuleItem: () => (/* reexport safe */ _sortable_rule_item__rspack_import_1.SortableRuleItem),
  SortableRulesList: () => (/* reexport safe */ _sortable_rules_list__rspack_import_0.SortableRulesList)
});
/* import */ var _sortable_rules_list__rspack_import_0 = __webpack_require__("./js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rules-list.tsx");
/* import */ var _sortable_rule_item__rspack_import_1 = __webpack_require__("./js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rule-item.tsx");
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


function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rules-list.styles.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* import */ var antd_style__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/antd-style/antd-style");
/* import */ var antd_style__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(antd_style__rspack_import_0);
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
const useStyles = (0,antd_style__rspack_import_0.createStyles)((param)=>{
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/dynamic-types/rule-action/dynamic-type-rule-action-registry.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeRuleActionRegistry: () => (DynamicTypeRuleActionRegistry)
});
/* import */ var _swc_helpers_ts_decorate__rspack_import_2 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* import */ var inversify__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_0);
/* import */ var _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx");
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

class DynamicTypeRuleActionRegistry extends _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__rspack_import_1.DynamicTypeRegistryAbstract {
    getActionFormComponent(id, props) {
        return this.getDynamicType(id).renderForm(props);
    }
    getDefaultValue(id) {
        return this.getDynamicType(id).defaultValue;
    }
}
DynamicTypeRuleActionRegistry = (0,_swc_helpers_ts_decorate__rspack_import_2.__decorate)([
    (0,inversify__rspack_import_0.injectable)()
], DynamicTypeRuleActionRegistry);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/dynamic-types/rule-condition/dynamic-type-rule-condition-registry.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeRuleConditionRegistry: () => (DynamicTypeRuleConditionRegistry)
});
/* import */ var _swc_helpers_ts_decorate__rspack_import_2 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* import */ var inversify__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_0);
/* import */ var _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx");
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

class DynamicTypeRuleConditionRegistry extends _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__rspack_import_1.DynamicTypeRegistryAbstract {
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
DynamicTypeRuleConditionRegistry = (0,_swc_helpers_ts_decorate__rspack_import_2.__decorate)([
    (0,inversify__rspack_import_0.injectable)()
], DynamicTypeRuleConditionRegistry);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/dynamic-types/rule-trigger/dynamic-type-rule-trigger-registry.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeRuleTriggerRegistry: () => (DynamicTypeRuleTriggerRegistry)
});
/* import */ var _swc_helpers_ts_decorate__rspack_import_2 = __webpack_require__("./node_modules/tslib/tslib.es6.mjs");
/* import */ var inversify__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_0);
/* import */ var _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx");
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

class DynamicTypeRuleTriggerRegistry extends _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__rspack_import_1.DynamicTypeRegistryAbstract {
    getTriggerFormComponent(id, props) {
        return this.getDynamicType(id).renderForm(props);
    }
    getDefaultValue(id) {
        return this.getDynamicType(id).defaultValue;
    }
}
DynamicTypeRuleTriggerRegistry = (0,_swc_helpers_ts_decorate__rspack_import_2.__decorate)([
    (0,inversify__rspack_import_0.injectable)()
], DynamicTypeRuleTriggerRegistry);

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/sdk/modules/rule-builder/index.ts"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeRuleActionAbstract: () => (/* reexport safe */ _Pimcore_modules_rule_builder_dynamic_types_rule_action_dynamic_type_rule_action_abstract__rspack_import_5.DynamicTypeRuleActionAbstract),
  DynamicTypeRuleActionRegistry: () => (/* reexport safe */ _Pimcore_modules_rule_builder_dynamic_types_rule_action_dynamic_type_rule_action_registry__rspack_import_8.DynamicTypeRuleActionRegistry),
  DynamicTypeRuleConditionAbstract: () => (/* reexport safe */ _Pimcore_modules_rule_builder_dynamic_types_rule_condition_dynamic_type_rule_condition_abstract__rspack_import_6.DynamicTypeRuleConditionAbstract),
  DynamicTypeRuleConditionRegistry: () => (/* reexport safe */ _Pimcore_modules_rule_builder_dynamic_types_rule_condition_dynamic_type_rule_condition_registry__rspack_import_9.DynamicTypeRuleConditionRegistry),
  DynamicTypeRuleTriggerAbstract: () => (/* reexport safe */ _Pimcore_modules_rule_builder_dynamic_types_rule_trigger_dynamic_type_rule_trigger_abstract__rspack_import_7.DynamicTypeRuleTriggerAbstract),
  DynamicTypeRuleTriggerRegistry: () => (/* reexport safe */ _Pimcore_modules_rule_builder_dynamic_types_rule_trigger_dynamic_type_rule_trigger_registry__rspack_import_10.DynamicTypeRuleTriggerRegistry),
  RuleActions: () => (/* reexport safe */ _Pimcore_modules_rule_builder_components_rule_actions_rule_actions__rspack_import_0.RuleActions),
  RuleConditions: () => (/* reexport safe */ _Pimcore_modules_rule_builder_components_rule_conditions_rule_conditions__rspack_import_2.RuleConditions),
  RuleConfigForm: () => (/* reexport safe */ _Pimcore_modules_rule_builder_components_rule_config_form__rspack_import_4.RuleConfigForm),
  RuleTriggers: () => (/* reexport safe */ _Pimcore_modules_rule_builder_components_rule_triggers_rule_triggers__rspack_import_1.RuleTriggers),
  SortableRuleItem: () => (/* reexport safe */ _Pimcore_modules_rule_builder_components_sortable_rules_list__rspack_import_3.SortableRuleItem),
  SortableRulesList: () => (/* reexport safe */ _Pimcore_modules_rule_builder_components_sortable_rules_list__rspack_import_3.SortableRulesList)
});
/* import */ var _Pimcore_modules_rule_builder_components_rule_actions_rule_actions__rspack_import_0 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/rule-actions.tsx");
/* import */ var _Pimcore_modules_rule_builder_components_rule_triggers_rule_triggers__rspack_import_1 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/rule-triggers.tsx");
/* import */ var _Pimcore_modules_rule_builder_components_rule_conditions_rule_conditions__rspack_import_2 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-conditions/rule-conditions.tsx");
/* import */ var _Pimcore_modules_rule_builder_components_sortable_rules_list__rspack_import_3 = __webpack_require__("./js/src/core/modules/rule-builder/components/sortable-rules-list/index.ts");
/* import */ var _Pimcore_modules_rule_builder_components_rule_config_form__rspack_import_4 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-config-form/index.ts");
/* import */ var _Pimcore_modules_rule_builder_dynamic_types_rule_action_dynamic_type_rule_action_abstract__rspack_import_5 = __webpack_require__("./js/src/core/modules/rule-builder/dynamic-types/rule-action/dynamic-type-rule-action-abstract.tsx");
/* import */ var _Pimcore_modules_rule_builder_dynamic_types_rule_condition_dynamic_type_rule_condition_abstract__rspack_import_6 = __webpack_require__("./js/src/core/modules/rule-builder/dynamic-types/rule-condition/dynamic-type-rule-condition-abstract.tsx");
/* import */ var _Pimcore_modules_rule_builder_dynamic_types_rule_trigger_dynamic_type_rule_trigger_abstract__rspack_import_7 = __webpack_require__("./js/src/core/modules/rule-builder/dynamic-types/rule-trigger/dynamic-type-rule-trigger-abstract.tsx");
/* import */ var _Pimcore_modules_rule_builder_dynamic_types_rule_action_dynamic_type_rule_action_registry__rspack_import_8 = __webpack_require__("./js/src/core/modules/rule-builder/dynamic-types/rule-action/dynamic-type-rule-action-registry.ts");
/* import */ var _Pimcore_modules_rule_builder_dynamic_types_rule_condition_dynamic_type_rule_condition_registry__rspack_import_9 = __webpack_require__("./js/src/core/modules/rule-builder/dynamic-types/rule-condition/dynamic-type-rule-condition-registry.ts");
/* import */ var _Pimcore_modules_rule_builder_dynamic_types_rule_trigger_dynamic_type_rule_trigger_registry__rspack_import_10 = __webpack_require__("./js/src/core/modules/rule-builder/dynamic-types/rule-trigger/dynamic-type-rule-trigger-registry.ts");
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
// Components





// Dynamic Type Abstracts



// Dynamic Type Registries




function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/rule-actions/components/action-item.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ActionItem: () => (ActionItem)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_components_toolstrip_box_tool_strip_box__rspack_import_3 = __webpack_require__("./js/src/core/components/toolstrip/box/tool-strip-box.tsx");
/* import */ var _Pimcore_components_alert_alert__rspack_import_4 = __webpack_require__("./js/src/core/components/alert/alert.tsx");
/* import */ var _Pimcore_modules_rule_builder_components_shared_rule_item_tool_strip__rspack_import_5 = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/rule-item-tool-strip.tsx");
/* import */ var _provider_rule_actions_provider_use_rule_actions__rspack_import_6 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/provider/rule-actions-provider/use-rule-actions.tsx");
/* import */ var _Pimcore_modules_rule_builder_components_shared_hooks_use_sortable_item__rspack_import_7 = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/hooks/use-sortable-item.ts");
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






const ActionItem = (param)=>{
    let { action, disabled = false } = param;
    var _dynamicType_isAvailable;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const { registry, handleRemoveAction, handleMoveAction, handleUpdateAction, canMoveUp, canMoveDown } = (0,_provider_rule_actions_provider_use_rule_actions__rspack_import_6.useRuleActions)();
    const dynamicType = registry.getDynamicType(action.type, false);
    const { attributes, listeners, setNodeRef, style } = (0,_Pimcore_modules_rule_builder_components_shared_hooks_use_sortable_item__rspack_import_7.useSortableItem)(action.id);
    const isAvailable = (dynamicType === null || dynamicType === void 0 ? void 0 : (_dynamicType_isAvailable = dynamicType.isAvailable) === null || _dynamicType_isAvailable === void 0 ? void 0 : _dynamicType_isAvailable.call(dynamicType)) ?? true;
    if (dynamicType === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_alert_alert__rspack_import_4.Alert, {
            banner: true,
            message: `Unknown action type: ${action.type}`,
            type: "warning"
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/components/action-item.tsx",
            lineNumber: 42,
            columnNumber: 12
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
        ref: setNodeRef,
        style: style,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_toolstrip_box_tool_strip_box__rspack_import_3.ToolStripBox, {
            docked: false,
            renderToolStripStart: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_rule_builder_components_shared_rule_item_tool_strip__rspack_import_5.RuleItemToolStrip, {
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
            }, undefined),
            children: [
                !isAvailable && (dynamicType === null || dynamicType === void 0 ? void 0 : dynamicType.notAvailableHint) !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_alert_alert__rspack_import_4.Alert, {
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
        react_i18next__rspack_import_2.useTranslation,
        _provider_rule_actions_provider_use_rule_actions__rspack_import_6.useRuleActions,
        _Pimcore_modules_rule_builder_components_shared_hooks_use_sortable_item__rspack_import_7.useSortableItem
    ];
});
_c = ActionItem;
var _c;
$RefreshReg$(_c, "ActionItem");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/rule-actions/components/add-action-button/add-action-button.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AddActionButton: () => (AddActionButton)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_components_dropdown_dropdown__rspack_import_3 = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* import */ var _Pimcore_components_icon_text_button_icon_text_button__rspack_import_4 = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* import */ var _hooks_use_add_action_menu_items__rspack_import_5 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/hooks/use-add-action-menu-items.tsx");
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




const AddActionButton = (param)=>{
    let { disabled = false, children } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const menuItems = (0,_hooks_use_add_action_menu_items__rspack_import_5.useAddActionMenuItems)();
    const defaultButton = /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__rspack_import_4.IconTextButton, {
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
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_dropdown__rspack_import_3.Dropdown, {
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
        react_i18next__rspack_import_2.useTranslation,
        _hooks_use_add_action_menu_items__rspack_import_5.useAddActionMenuItems
    ];
});
_c = AddActionButton;
var _c;
$RefreshReg$(_c, "AddActionButton");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/rule-actions/hooks/use-add-action-menu-items.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAddActionMenuItems: () => (useAddActionMenuItems)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var antd__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_2);
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_components_icon_icon__rspack_import_4 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _provider_rule_actions_provider_use_rule_actions__rspack_import_5 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/provider/rule-actions-provider/use-rule-actions.tsx");
/* import */ var lodash__rspack_import_6 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_6_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_6);
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





/**
 * Shared hook for generating action type menu items with icons
 */ const useAddActionMenuItems = ()=>{
    _s();
    const { registry, handleAddAction } = (0,_provider_rule_actions_provider_use_rule_actions__rspack_import_5.useRuleActions)();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    return (0,react__rspack_import_1.useMemo)(()=>{
        const allActionTypes = registry.getDynamicTypes();
        return allActionTypes.map((dynamicType)=>{
            var _dynamicType_isAvailable;
            const isAvailable = ((_dynamicType_isAvailable = dynamicType.isAvailable) === null || _dynamicType_isAvailable === void 0 ? void 0 : _dynamicType_isAvailable.call(dynamicType)) ?? true;
            const label = t(dynamicType.label);
            return {
                key: dynamicType.id,
                label: !isAvailable && dynamicType.notAvailableHint !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Tooltip, {
                    title: t(dynamicType.notAvailableHint),
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("span", {
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
                icon: (0,lodash__rspack_import_6.isNil)(dynamicType.icon) ? undefined : /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_4.Icon, {
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
        _provider_rule_actions_provider_use_rule_actions__rspack_import_5.useRuleActions,
        react_i18next__rspack_import_3.useTranslation
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/rule-actions/provider/rule-actions-provider/rule-actions-provider.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleActionsProvider: () => (RuleActionsProvider),
  RuleActionsProviderContext: () => (RuleActionsProviderContext)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_modules_rule_builder_components_shared_hooks_use_rule_items__rspack_import_2 = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/hooks/use-rule-items.ts");
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

const RuleActionsProviderContext = /*#__PURE__*/ (0,react__rspack_import_1.createContext)(undefined);
const RuleActionsProvider = (props)=>{
    _s();
    const { children, ...ruleActionsProps } = props;
    const { registry, handleAdd, handleRemove, handleMove, handleUpdate, canMoveUp, canMoveDown } = (0,_Pimcore_modules_rule_builder_components_shared_hooks_use_rule_items__rspack_import_2.useRuleItems)(ruleActionsProps);
    const value = (0,react__rspack_import_1.useMemo)(()=>({
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
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(RuleActionsProviderContext.Provider, {
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
        _Pimcore_modules_rule_builder_components_shared_hooks_use_rule_items__rspack_import_2.useRuleItems
    ];
});
_c = RuleActionsProvider;
var _c;
$RefreshReg$(_c, "RuleActionsProvider");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/rule-actions/provider/rule-actions-provider/use-rule-actions.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useRuleActions: () => (useRuleActions)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _rule_actions_provider__rspack_import_1 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/provider/rule-actions-provider/rule-actions-provider.tsx");
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

const useRuleActions = ()=>{
    _s();
    const context = (0,react__rspack_import_0.useContext)(_rule_actions_provider__rspack_import_1.RuleActionsProviderContext);
    if (context === undefined) {
        throw new Error('useRuleActions must be used within a RuleActionsProvider');
    }
    return context;
};
_s(useRuleActions, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/rule-actions/rule-actions.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleActions: () => (RuleActions)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _components_action_item__rspack_import_2 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/components/action-item.tsx");
/* import */ var _components_add_action_button_add_action_button__rspack_import_3 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/components/add-action-button/add-action-button.tsx");
/* import */ var _provider_rule_actions_provider_rule_actions_provider__rspack_import_4 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-actions/provider/rule-actions-provider/rule-actions-provider.tsx");
/* import */ var _shared_rule_item_list__rspack_import_5 = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx");
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




const RuleActions = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_shared_rule_item_list__rspack_import_5.RuleItemList, {
        Provider: _provider_rule_actions_provider_rule_actions_provider__rspack_import_4.RuleActionsProvider,
        onChange: props.onChange,
        providerProps: props,
        renderAddButton: (disabled)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_components_add_action_button_add_action_button__rspack_import_3.AddActionButton, {
                disabled: disabled
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/rule-actions.tsx",
                lineNumber: 17,
                columnNumber: 132
            }, undefined),
        renderItem: (action, disabled)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_components_action_item__rspack_import_2.ActionItem, {
                action: action,
                disabled: disabled
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-actions/rule-actions.tsx",
                lineNumber: 17,
                columnNumber: 207
            }, undefined),
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/rule-conditions/rule-conditions.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleConditions: () => (RuleConditions)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_rule_condition_rule_condition__rspack_import_2 = __webpack_require__("./js/src/core/components/rule-condition/rule-condition.tsx");
/* import */ var _Pimcore_modules_app_error_boundary_error_boundary__rspack_import_3 = __webpack_require__("./js/src/core/modules/app/error-boundary/error-boundary.tsx");
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


const RuleConditions = (props)=>{
    _s();
    const { registry, value, onChange, disabled } = props;
    const conditionTypes = (0,react__rspack_import_1.useMemo)(()=>{
        return registry.getDynamicTypes();
    }, [
        registry
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_error_boundary_error_boundary__rspack_import_3["default"], {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_rule_condition_rule_condition__rspack_import_2.RuleCondition, {
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/rule-config-form/rule-config-form.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleConfigForm: () => (RuleConfigForm)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _sdk_components__rspack_import_2 = __webpack_require__("./js/src/sdk/components/index.ts");
/* import */ var _Pimcore_components_form_hooks_use_debounced_form_change__rspack_import_3 = __webpack_require__("./js/src/core/components/form/hooks/use-debounced-form-change.ts");
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


/**
 * Reusable form wrapper for rule configurations (conditions, actions, triggers).
 */ function RuleConfigForm(param) {
    let { config, onChange, disabled, children, debounceOptions } = param;
    _s();
    const [form] = _sdk_components__rspack_import_2.Form.useForm();
    const handleValuesChange = (0,react__rspack_import_1.useCallback)((_changedValues, allValues)=>{
        onChange(allValues);
    }, [
        onChange
    ]);
    const { handleFormChange } = (0,_Pimcore_components_form_hooks_use_debounced_form_change__rspack_import_3.useDebouncedFormChange)(handleValuesChange, {
        ...debounceOptions,
        disabled: debounceOptions === undefined
    });
    const formProps = (0,react__rspack_import_1.useMemo)(()=>({
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
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sdk_components__rspack_import_2.FormKit, {
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
        _sdk_components__rspack_import_2.Form.useForm,
        _Pimcore_components_form_hooks_use_debounced_form_change__rspack_import_3.useDebouncedFormChange
    ];
});
_c = RuleConfigForm;
var _c;
$RefreshReg$(_c, "RuleConfigForm");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/rule-triggers/components/add-trigger-button/add-trigger-button.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AddTriggerButton: () => (AddTriggerButton)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_components_dropdown_dropdown__rspack_import_3 = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* import */ var _Pimcore_components_icon_text_button_icon_text_button__rspack_import_4 = __webpack_require__("./js/src/core/components/icon-text-button/icon-text-button.tsx");
/* import */ var _hooks_use_add_trigger_menu_items__rspack_import_5 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/hooks/use-add-trigger-menu-items.tsx");
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




const AddTriggerButton = (param)=>{
    let { disabled = false, children } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const menuItems = (0,_hooks_use_add_trigger_menu_items__rspack_import_5.useAddTriggerMenuItems)();
    const defaultButton = /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_text_button_icon_text_button__rspack_import_4.IconTextButton, {
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
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_dropdown__rspack_import_3.Dropdown, {
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
        react_i18next__rspack_import_2.useTranslation,
        _hooks_use_add_trigger_menu_items__rspack_import_5.useAddTriggerMenuItems
    ];
});
_c = AddTriggerButton;
var _c;
$RefreshReg$(_c, "AddTriggerButton");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/rule-triggers/components/trigger-item.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TriggerItem: () => (TriggerItem)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_components_toolstrip_box_tool_strip_box__rspack_import_3 = __webpack_require__("./js/src/core/components/toolstrip/box/tool-strip-box.tsx");
/* import */ var _Pimcore_components_alert_alert__rspack_import_4 = __webpack_require__("./js/src/core/components/alert/alert.tsx");
/* import */ var _Pimcore_modules_rule_builder_components_shared_rule_item_tool_strip__rspack_import_5 = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/rule-item-tool-strip.tsx");
/* import */ var _provider_rule_triggers_provider_use_rule_triggers__rspack_import_6 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/provider/rule-triggers-provider/use-rule-triggers.tsx");
/* import */ var _Pimcore_modules_rule_builder_components_shared_hooks_use_sortable_item__rspack_import_7 = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/hooks/use-sortable-item.ts");
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






const TriggerItem = (param)=>{
    let { trigger, disabled = false } = param;
    var _dynamicType_isAvailable;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    const { registry, handleRemoveTrigger, handleMoveTrigger, handleUpdateTrigger, canMoveUp, canMoveDown } = (0,_provider_rule_triggers_provider_use_rule_triggers__rspack_import_6.useRuleTriggers)();
    const dynamicType = registry.getDynamicType(trigger.type, false);
    const { attributes, listeners, setNodeRef, style } = (0,_Pimcore_modules_rule_builder_components_shared_hooks_use_sortable_item__rspack_import_7.useSortableItem)(trigger.id);
    const isAvailable = (dynamicType === null || dynamicType === void 0 ? void 0 : (_dynamicType_isAvailable = dynamicType.isAvailable) === null || _dynamicType_isAvailable === void 0 ? void 0 : _dynamicType_isAvailable.call(dynamicType)) ?? true;
    if (dynamicType === undefined) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_alert_alert__rspack_import_4.Alert, {
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
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("div", {
        ref: setNodeRef,
        style: style,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_toolstrip_box_tool_strip_box__rspack_import_3.ToolStripBox, {
            docked: false,
            renderToolStripStart: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_rule_builder_components_shared_rule_item_tool_strip__rspack_import_5.RuleItemToolStrip, {
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
            }, undefined),
            children: [
                !isAvailable && (dynamicType === null || dynamicType === void 0 ? void 0 : dynamicType.notAvailableHint) !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_alert_alert__rspack_import_4.Alert, {
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
        react_i18next__rspack_import_2.useTranslation,
        _provider_rule_triggers_provider_use_rule_triggers__rspack_import_6.useRuleTriggers,
        _Pimcore_modules_rule_builder_components_shared_hooks_use_sortable_item__rspack_import_7.useSortableItem
    ];
});
_c = TriggerItem;
var _c;
$RefreshReg$(_c, "TriggerItem");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/rule-triggers/hooks/use-add-trigger-menu-items.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAddTriggerMenuItems: () => (useAddTriggerMenuItems)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var antd__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* import */ var antd__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(antd__rspack_import_2);
/* import */ var react_i18next__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_3);
/* import */ var _Pimcore_components_icon_icon__rspack_import_4 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _provider_rule_triggers_provider_use_rule_triggers__rspack_import_5 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/provider/rule-triggers-provider/use-rule-triggers.tsx");
/* import */ var lodash__rspack_import_6 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_6_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_6);
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





/**
 * Shared hook for generating trigger type menu items with icons
 */ const useAddTriggerMenuItems = ()=>{
    _s();
    const { registry, handleAddTrigger } = (0,_provider_rule_triggers_provider_use_rule_triggers__rspack_import_5.useRuleTriggers)();
    const { t } = (0,react_i18next__rspack_import_3.useTranslation)();
    return (0,react__rspack_import_1.useMemo)(()=>{
        const allTriggerTypes = registry.getDynamicTypes();
        return allTriggerTypes.map((dynamicType)=>{
            var _dynamicType_isAvailable;
            const isAvailable = ((_dynamicType_isAvailable = dynamicType.isAvailable) === null || _dynamicType_isAvailable === void 0 ? void 0 : _dynamicType_isAvailable.call(dynamicType)) ?? true;
            const label = t(dynamicType.label);
            return {
                key: dynamicType.id,
                label: !isAvailable && dynamicType.notAvailableHint !== undefined ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(antd__rspack_import_2.Tooltip, {
                    title: t(dynamicType.notAvailableHint),
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)("span", {
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
                icon: (0,lodash__rspack_import_6.isNil)(dynamicType.icon) ? undefined : /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_4.Icon, {
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
        _provider_rule_triggers_provider_use_rule_triggers__rspack_import_5.useRuleTriggers,
        react_i18next__rspack_import_3.useTranslation
    ];
});

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/rule-triggers/provider/rule-triggers-provider/rule-triggers-provider.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleTriggersProvider: () => (RuleTriggersProvider),
  RuleTriggersProviderContext: () => (RuleTriggersProviderContext)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_modules_rule_builder_components_shared_hooks_use_rule_items__rspack_import_2 = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/hooks/use-rule-items.ts");
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

const RuleTriggersProviderContext = /*#__PURE__*/ (0,react__rspack_import_1.createContext)(undefined);
const RuleTriggersProvider = (props)=>{
    _s();
    const { children, ...ruleTriggersProps } = props;
    const { registry, handleAdd, handleRemove, handleMove, handleUpdate, canMoveUp, canMoveDown } = (0,_Pimcore_modules_rule_builder_components_shared_hooks_use_rule_items__rspack_import_2.useRuleItems)(ruleTriggersProps);
    const value = (0,react__rspack_import_1.useMemo)(()=>({
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
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(RuleTriggersProviderContext.Provider, {
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
        _Pimcore_modules_rule_builder_components_shared_hooks_use_rule_items__rspack_import_2.useRuleItems
    ];
});
_c = RuleTriggersProvider;
var _c;
$RefreshReg$(_c, "RuleTriggersProvider");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/rule-triggers/provider/rule-triggers-provider/use-rule-triggers.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useRuleTriggers: () => (useRuleTriggers)
});
/* import */ var react__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_0);
/* import */ var _rule_triggers_provider__rspack_import_1 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/provider/rule-triggers-provider/rule-triggers-provider.tsx");
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

const useRuleTriggers = ()=>{
    _s();
    const context = (0,react__rspack_import_0.useContext)(_rule_triggers_provider__rspack_import_1.RuleTriggersProviderContext);
    if (context === undefined) {
        throw new Error('useRuleTriggers must be used within a RuleTriggersProvider');
    }
    return context;
};
_s(useRuleTriggers, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/rule-triggers/rule-triggers.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleTriggers: () => (RuleTriggers)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _components_trigger_item__rspack_import_2 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/components/trigger-item.tsx");
/* import */ var _components_add_trigger_button_add_trigger_button__rspack_import_3 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/components/add-trigger-button/add-trigger-button.tsx");
/* import */ var _provider_rule_triggers_provider_rule_triggers_provider__rspack_import_4 = __webpack_require__("./js/src/core/modules/rule-builder/components/rule-triggers/provider/rule-triggers-provider/rule-triggers-provider.tsx");
/* import */ var _shared_rule_item_list__rspack_import_5 = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx");
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




const RuleTriggers = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_shared_rule_item_list__rspack_import_5.RuleItemList, {
        Provider: _provider_rule_triggers_provider_rule_triggers_provider__rspack_import_4.RuleTriggersProvider,
        providerProps: props,
        renderAddButton: (disabled)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_components_add_trigger_button_add_trigger_button__rspack_import_3.AddTriggerButton, {
                disabled: disabled
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-triggers/rule-triggers.tsx",
                lineNumber: 17,
                columnNumber: 107
            }, undefined),
        renderItem: (trigger, disabled)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_components_trigger_item__rspack_import_2.TriggerItem, {
                disabled: disabled,
                trigger: trigger
            }, void 0, false, {
                fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/rule-triggers/rule-triggers.tsx",
                lineNumber: 17,
                columnNumber: 184
            }, undefined),
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/shared/rule-item-list.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleItemList: () => (RuleItemList)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _dnd_kit_core__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/@dnd-kit/core/@dnd-kit/core");
/* import */ var _dnd_kit_core__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(_dnd_kit_core__rspack_import_2);
/* import */ var _dnd_kit_sortable__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/@dnd-kit/sortable/@dnd-kit/sortable");
/* import */ var _dnd_kit_sortable__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(_dnd_kit_sortable__rspack_import_3);
/* import */ var _Pimcore_components_flex_flex__rspack_import_4 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_box_box__rspack_import_5 = __webpack_require__("./js/src/core/components/box/box.tsx");
/* import */ var _Pimcore_modules_app_error_boundary_error_boundary__rspack_import_6 = __webpack_require__("./js/src/core/modules/app/error-boundary/error-boundary.tsx");
/* import */ var _hooks_use_rule_item_drag_drop__rspack_import_7 = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/hooks/use-rule-item-drag-drop.ts");
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






function RuleItemList(props) {
    _s();
    const { value = [], disabled = false, onChange, renderItem, renderAddButton, Provider, providerProps } = props;
    const { strategy, ...dndConfig } = (0,_hooks_use_rule_item_drag_drop__rspack_import_7.useRuleItemDragDrop)();
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
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_error_boundary_error_boundary__rspack_import_6["default"], {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(Provider, {
                ...providerProps,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_box_box__rspack_import_5.Box, {
                    padding: {
                        y: 'extra-small'
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_4.Flex, {
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
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_modules_app_error_boundary_error_boundary__rspack_import_6["default"], {
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(Provider, {
            ...providerProps,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_4.Flex, {
                gap: "small",
                vertical: true,
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_dnd_kit_core__rspack_import_2.DndContext, {
                        onDragEnd: handleDragEnd,
                        ...dndConfig,
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_dnd_kit_sortable__rspack_import_3.SortableContext, {
                            items: value.map((item)=>item.id),
                            strategy: strategy,
                            children: value.map((item, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_box_box__rspack_import_5.Box, {
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
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_box_box__rspack_import_5.Box, {
                        margin: {
                            top: 'small'
                        },
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_4.Flex, {
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
        _hooks_use_rule_item_drag_drop__rspack_import_7.useRuleItemDragDrop
    ];
});
_c = RuleItemList;
var _c;
$RefreshReg$(_c, "RuleItemList");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/shared/rule-item-tool-strip.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RuleItemToolStrip: () => (RuleItemToolStrip)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var react_i18next__rspack_import_2 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_2_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_2);
/* import */ var _Pimcore_components_icon_button_icon_button__rspack_import_3 = __webpack_require__("./js/src/core/components/icon-button/icon-button.tsx");
/* import */ var _Pimcore_components_toolstrip_tool_strip__rspack_import_4 = __webpack_require__("./js/src/core/components/toolstrip/tool-strip.tsx");
/* import */ var _Pimcore_components_flex_flex__rspack_import_5 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_split_split__rspack_import_6 = __webpack_require__("./js/src/core/components/split/split.tsx");
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





const RuleItemToolStrip = (param)=>{
    let { label, icon, onMoveUp, onMoveDown, onRemove, canMoveUp, canMoveDown, disabled = false, dragHandleProps = false } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_2.useTranslation)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_toolstrip_tool_strip__rspack_import_4.ToolStrip, {
        additionalIcon: icon,
        additionalIconAutoColor: true,
        additionalIconPosition: "before",
        dragger: dragHandleProps,
        theme: "default",
        title: t(label),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_split_split__rspack_import_6.Split, {
            dividerSize: "small",
            size: "mini",
            theme: "secondary",
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_5.Flex, {
                    gap: "extra-small",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_button_icon_button__rspack_import_3.IconButton, {
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
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_button_icon_button__rspack_import_3.IconButton, {
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
                /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_button_icon_button__rspack_import_3.IconButton, {
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
        react_i18next__rspack_import_2.useTranslation
    ];
});
_c = RuleItemToolStrip;
var _c;
$RefreshReg$(_c, "RuleItemToolStrip");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rule-item.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SortableRuleItem: () => (SortableRuleItem)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_flex_flex__rspack_import_2 = __webpack_require__("./js/src/core/components/flex/flex.tsx");
/* import */ var _Pimcore_components_icon_icon__rspack_import_3 = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* import */ var _Pimcore_components_text_text__rspack_import_4 = __webpack_require__("./js/src/core/components/text/text.tsx");
/* import */ var _Pimcore_components_dropdown_dropdown__rspack_import_5 = __webpack_require__("./js/src/core/components/dropdown/dropdown.tsx");
/* import */ var classnames__rspack_import_6 = __webpack_require__("webpack/sharing/consume/default/classnames/classnames");
/* import */ var classnames__rspack_import_6_default = /*#__PURE__*/__webpack_require__.n(classnames__rspack_import_6);
/* import */ var _shared_hooks_use_sortable_item__rspack_import_7 = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/hooks/use-sortable-item.ts");
/* import */ var _sortable_rules_list_styles__rspack_import_8 = __webpack_require__("./js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rules-list.styles.ts");
/* import */ var lodash__rspack_import_9 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_9_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_9);
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








function SortableRuleItem(param) {
    let { item, isDragDisabled, contextMenuItems, onClick, renderContent } = param;
    var _item_icon, _item_icon1;
    _s();
    const { styles } = (0,_sortable_rules_list_styles__rspack_import_8.useStyles)();
    const { attributes, listeners, setNodeRef, style } = (0,_shared_hooks_use_sortable_item__rspack_import_7.useSortableItem)(String(item.id), {
        disabled: isDragDisabled
    });
    const content = /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_flex_flex__rspack_import_2.Flex, {
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
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_icon_icon__rspack_import_3.Icon, {
                className: classnames__rspack_import_6_default()(styles.ruleItemIcon, {
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
            (0,lodash__rspack_import_9.isNil)(renderContent) ? /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_text_text__rspack_import_4.Text, {
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
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_dropdown_dropdown__rspack_import_5.Dropdown, {
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
        _sortable_rules_list_styles__rspack_import_8.useStyles,
        _shared_hooks_use_sortable_item__rspack_import_7.useSortableItem
    ];
});
_c = SortableRuleItem;
var _c;
$RefreshReg$(_c, "SortableRuleItem");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rules-list.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SortableRulesList: () => (SortableRulesList)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("webpack/sharing/consume/default/react/react");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var _Pimcore_components_content_content__rspack_import_2 = __webpack_require__("./js/src/core/components/content/content.tsx");
/* import */ var _dnd_kit_core__rspack_import_3 = __webpack_require__("webpack/sharing/consume/default/@dnd-kit/core/@dnd-kit/core");
/* import */ var _dnd_kit_core__rspack_import_3_default = /*#__PURE__*/__webpack_require__.n(_dnd_kit_core__rspack_import_3);
/* import */ var _dnd_kit_sortable__rspack_import_4 = __webpack_require__("webpack/sharing/consume/default/@dnd-kit/sortable/@dnd-kit/sortable");
/* import */ var _dnd_kit_sortable__rspack_import_4_default = /*#__PURE__*/__webpack_require__.n(_dnd_kit_sortable__rspack_import_4);
/* import */ var react_i18next__rspack_import_5 = __webpack_require__("webpack/sharing/consume/default/react-i18next/react-i18next");
/* import */ var react_i18next__rspack_import_5_default = /*#__PURE__*/__webpack_require__.n(react_i18next__rspack_import_5);
/* import */ var _shared_hooks_use_rule_item_drag_drop__rspack_import_6 = __webpack_require__("./js/src/core/modules/rule-builder/components/shared/hooks/use-rule-item-drag-drop.ts");
/* import */ var _sortable_rule_item__rspack_import_7 = __webpack_require__("./js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rule-item.tsx");
/* import */ var lodash__rspack_import_8 = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* import */ var lodash__rspack_import_8_default = /*#__PURE__*/__webpack_require__.n(lodash__rspack_import_8);
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







function SortableRulesList(param) {
    let { items, isDragDisabled = false, onReorder, emptyMessage, onItemClick, renderItemContent } = param;
    _s();
    const { t } = (0,react_i18next__rspack_import_5.useTranslation)();
    const { strategy, ...dndConfig } = (0,_shared_hooks_use_rule_item_drag_drop__rspack_import_6.useRuleItemDragDrop)();
    const displayEmptyMessage = emptyMessage ?? t('no-items');
    const handleDragEnd = (event)=>{
        if ((0,lodash__rspack_import_8.isNil)(onReorder)) {
            return;
        }
        const { active, over } = event;
        if (over === null || active.id === over.id) {
            return;
        }
        const oldIndex = items.findIndex((item)=>String(item.id) === active.id);
        const newIndex = items.findIndex((item)=>String(item.id) === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
            const newOrder = (0,_dnd_kit_sortable__rspack_import_4.arrayMove)(items, oldIndex, newIndex);
            onReorder(newOrder);
        }
    };
    if (items.length === 0) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_Pimcore_components_content_content__rspack_import_2.Content, {
            centered: true,
            padded: true,
            children: displayEmptyMessage
        }, void 0, false, {
            fileName: "/var/www/dev-bundles/pimcore/studio-ui-bundle/assets/js/src/core/modules/rule-builder/components/sortable-rules-list/sortable-rules-list.tsx",
            lineNumber: 54,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_dnd_kit_core__rspack_import_3.DndContext, {
        onDragEnd: handleDragEnd,
        ...dndConfig,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_dnd_kit_sortable__rspack_import_4.SortableContext, {
            items: items.map((item)=>String(item.id)),
            strategy: strategy,
            children: items.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(_sortable_rule_item__rspack_import_7.SortableRuleItem, {
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
        react_i18next__rspack_import_5.useTranslation,
        _shared_hooks_use_rule_item_drag_drop__rspack_import_6.useRuleItemDragDrop
    ];
});
_c = SortableRulesList;
var _c;
$RefreshReg$(_c, "SortableRulesList");

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/dynamic-types/rule-action/dynamic-type-rule-action-abstract.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeRuleActionAbstract: () => (DynamicTypeRuleActionAbstract)
});
/* import */ var inversify__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_0);
/* import */ var _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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

let DynamicTypeRuleActionAbstract = (_dec = (0,inversify__rspack_import_0.injectable)(), _dec(_class = class DynamicTypeRuleActionAbstract extends _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__rspack_import_1.DynamicTypeAbstract {
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/dynamic-types/rule-condition/dynamic-type-rule-condition-abstract.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeRuleConditionAbstract: () => (DynamicTypeRuleConditionAbstract)
});
/* import */ var inversify__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_0);
/* import */ var _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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

let DynamicTypeRuleConditionAbstract = (_dec = (0,inversify__rspack_import_0.injectable)(), _dec(_class = class DynamicTypeRuleConditionAbstract extends _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__rspack_import_1.DynamicTypeAbstract {
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},
"./js/src/core/modules/rule-builder/dynamic-types/rule-trigger/dynamic-type-rule-trigger-abstract.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeRuleTriggerAbstract: () => (DynamicTypeRuleTriggerAbstract)
});
/* import */ var inversify__rspack_import_0 = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* import */ var inversify__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(inversify__rspack_import_0);
/* import */ var _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__rspack_import_1 = __webpack_require__("./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
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

let DynamicTypeRuleTriggerAbstract = (_dec = (0,inversify__rspack_import_0.injectable)(), _dec(_class = class DynamicTypeRuleTriggerAbstract extends _Pimcore_modules_element_dynamic_types_registry_dynamic_type_registry_abstract__rspack_import_1.DynamicTypeAbstract {
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

function $RefreshSig$() { return $ReactRefreshRuntime$.createSignatureFunctionForTransform() }
function $RefreshReg$(type, id) { $ReactRefreshRuntime$.register(type, module.id + "_" + id) }
Promise.resolve().then(() => { $ReactRefreshRuntime$.refresh(module.id, module.hot) });


},

}]);
//# sourceMappingURL=__federation_expose_modules__rule_builder.js.map