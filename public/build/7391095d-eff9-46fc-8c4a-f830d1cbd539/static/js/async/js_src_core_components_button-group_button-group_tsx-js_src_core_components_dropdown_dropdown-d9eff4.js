"use strict";
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_components_button-group_button-group_tsx-js_src_core_components_dropdown_dropdown-d9eff4"], {
"./js/src/core/app/config/services/service-ids.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  dynamicTypeRegistriesServiceIds: () => (dynamicTypeRegistriesServiceIds),
  serviceIds: () => (serviceIds)
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
*/ const dynamicTypeRegistriesServiceIds = {
    'DynamicTypes/FieldFilterRegistry': 'DynamicTypes/FieldFilterRegistry',
    'DynamicTypes/BatchEditRegistry': 'DynamicTypes/BatchEditRegistry',
    'DynamicTypes/GridCellRegistry': 'DynamicTypes/GridCellRegistry',
    'DynamicTypes/ListingRegistry': 'DynamicTypes/ListingRegistry',
    'DynamicTypes/MetadataRegistry': 'DynamicTypes/MetadataRegistry',
    'DynamicTypes/ObjectLayoutRegistry': 'DynamicTypes/ObjectLayoutRegistry',
    'DynamicTypes/ObjectDataRegistry': 'DynamicTypes/ObjectDataRegistry',
    'DynamicTypes/AssetRegistry': 'DynamicTypes/AssetRegistry',
    'DynamicTypes/ObjectRegistry': 'DynamicTypes/ObjectRegistry'
};
const serviceIds = {
    // Main nav
    mainNavRegistry: 'MainNavRegistry',
    // Widget manager
    widgetManager: 'WidgetManagerService',
    // Assets
    'Asset/Editor/TypeRegistry': 'Asset/Editor/TypeRegistry',
    'Asset/Editor/TypeComponentRegistry': 'Asset/Editor/TypeComponentRegistry',
    'Asset/Editor/DocumentTabManager': 'Asset/Editor/DocumentTabManager',
    'Asset/Editor/FolderTabManager': 'Asset/Editor/FolderTabManager',
    'Asset/Editor/ImageTabManager': 'Asset/Editor/ImageTabManager',
    'Asset/Editor/TextTabManager': 'Asset/Editor/TextTabManager',
    'Asset/Editor/VideoTabManager': 'Asset/Editor/VideoTabManager',
    'Asset/Editor/AudioTabManager': 'Asset/Editor/AudioTabManager',
    'Asset/Editor/ArchiveTabManager': 'Asset/Editor/ArchiveTabManager',
    'Asset/Editor/UnknownTabManager': 'Asset/Editor/UnknownTabManager',
    // Data Objects
    'DataObject/Editor/TypeRegistry': 'DataObject/Editor/TypeRegistry',
    'DataObject/Editor/ObjectTabManager': 'DataObject/Editor/ObjectTabManager',
    'DataObject/Editor/FolderTabManager': 'DataObject/Editor/FolderTabManager',
    // icon library
    iconLibrary: 'IconLibrary',
    // Grid
    'Grid/TypeRegistry': 'Grid/TypeRegistry',
    // dynamic types
    ...dynamicTypeRegistriesServiceIds,
    'DynamicTypes/FieldFilter/Text': 'DynamicTypes/FieldFilter/Text',
    'DynamicTypes/FieldFilter/Number': 'DynamicTypes/FieldFilter/Number',
    'DynamicTypes/FieldFilter/Select': 'DynamicTypes/FieldFilter/Select',
    'DynamicTypes/FieldFilter/Datetime': 'DynamicTypes/FieldFilter/Datetime',
    'DynamicTypes/BatchEdit/Text': 'DynamicTypes/BatchEdit/Text',
    'DynamicTypes/BatchEdit/TextArea': 'DynamicTypes/BatchEdit/TextArea',
    'DynamicTypes/BatchEdit/Datetime': 'DynamicTypes/BatchEdit/Datetime',
    'DynamicTypes/BatchEdit/Select': 'DynamicTypes/BatchEdit/Select',
    'DynamicTypes/BatchEdit/Checkbox': 'DynamicTypes/BatchEdit/Checkbox',
    'DynamicTypes/BatchEdit/ElementDropzone': 'DynamicTypes/BatchEdit/ElementDropzone',
    'DynamicTypes/BatchEdit/DataObjectAdapter': 'DynamicTypes/BatchEdit/DataObjectAdapter',
    'DynamicTypes/BatchEdit/DataObjectObjectBrick': 'DynamicTypes/BatchEdit/DataObjectObjectBrick',
    'DynamicTypes/GridCell/Text': 'DynamicTypes/GridCell/Text',
    'DynamicTypes/GridCell/Textarea': 'DynamicTypes/GridCell/Textarea',
    'DynamicTypes/GridCell/Number': 'DynamicTypes/GridCell/Number',
    'DynamicTypes/GridCell/Select': 'DynamicTypes/GridCell/Select',
    'DynamicTypes/GridCell/MultiSelect': 'DynamicTypes/GridCell/MultiSelect',
    'DynamicTypes/GridCell/Checkbox': 'DynamicTypes/GridCell/Checkbox',
    'DynamicTypes/GridCell/Boolean': 'DynamicTypes/GridCell/Boolean',
    'DynamicTypes/GridCell/Date': 'DynamicTypes/GridCell/Date',
    'DynamicTypes/GridCell/Time': 'DynamicTypes/GridCell/Time',
    'DynamicTypes/GridCell/DateTime': 'DynamicTypes/GridCell/DateTime',
    'DynamicTypes/GridCell/AssetLink': 'DynamicTypes/GridCell/AssetLink',
    'DynamicTypes/GridCell/ObjectLink': 'DynamicTypes/GridCell/ObjectLink',
    'DynamicTypes/GridCell/DocumentLink': 'DynamicTypes/GridCell/DocumentLink',
    'DynamicTypes/GridCell/OpenElement': 'DynamicTypes/GridCell/OpenElement',
    'DynamicTypes/GridCell/AssetPreview': 'DynamicTypes/GridCell/AssetPreview',
    'DynamicTypes/GridCell/AssetActions': 'DynamicTypes/GridCell/AssetActions',
    'DynamicTypes/GridCell/DataObjectActions': 'DynamicTypes/GridCell/DataObjectActions',
    'DynamicTypes/GridCell/DependencyTypeIcon': 'DynamicTypes/GridCell/DependencyTypeIcon',
    'DynamicTypes/GridCell/AssetCustomMetadataIcon': 'DynamicTypes/GridCell/AssetCustomMetadataIcon',
    'DynamicTypes/GridCell/AssetCustomMetadataValue': 'DynamicTypes/GridCell/AssetCustomMetadataValue',
    'DynamicTypes/GridCell/PropertyIcon': 'DynamicTypes/GridCell/PropertyIcon',
    'DynamicTypes/GridCell/PropertyValue': 'DynamicTypes/GridCell/PropertyValue',
    'DynamicTypes/GridCell/ScheduleActionsSelect': 'DynamicTypes/GridCell/ScheduleActionsSelect',
    'DynamicTypes/GridCell/VersionsIdSelect': 'DynamicTypes/GridCell/VersionsIdSelect',
    'DynamicTypes/GridCell/AssetVersionPreviewFieldLabel': 'DynamicTypes/GridCell/AssetVersionPreviewFieldLabel',
    'DynamicTypes/GridCell/Asset': 'DynamicTypes/GridCell/Asset',
    'DynamicTypes/GridCell/Object': 'DynamicTypes/GridCell/Object',
    'DynamicTypes/GridCell/Document': 'DynamicTypes/GridCell/Document',
    'DynamicTypes/GridCell/Element': 'DynamicTypes/GridCell/Element',
    'DynamicTypes/GridCell/LanguageSelect': 'DynamicTypes/GridCell/LanguageSelect',
    'DynamicTypes/GridCell/Translate': 'DynamicTypes/GridCell/Translate',
    'DynamicTypes/GridCell/DataObjectAdapter': 'DynamicTypes/GridCell/DataObjectAdapter',
    'DynamicTypes/GridCell/DataObjectObjectBrick': 'DynamicTypes/GridCell/DataObjectObjectBrick',
    'DynamicTypes/Listing/Text': 'DynamicTypes/Listing/Text',
    'DynamicTypes/Listing/AssetLink': 'DynamicTypes/Listing/AssetLink',
    'DynamicTypes/Listing/Select': 'DynamicTypes/Listing/Select',
    'DynamicTypes/Metadata/Asset': 'DynamicTypes/Metadata/Asset',
    'DynamicTypes/Metadata/Document': 'DynamicTypes/Metadata/Document',
    'DynamicTypes/Metadata/Object': 'DynamicTypes/Metadata/Object',
    'DynamicTypes/Metadata/Input': 'DynamicTypes/Metadata/Input',
    'DynamicTypes/Metadata/Textarea': 'DynamicTypes/Metadata/Textarea',
    'DynamicTypes/Metadata/Checkbox': 'DynamicTypes/Metadata/Checkbox',
    'DynamicTypes/Metadata/Select': 'DynamicTypes/Metadata/Select',
    'DynamicTypes/Metadata/Date': 'DynamicTypes/Metadata/Date',
    // Object layout
    'DynamicTypes/ObjectLayout/Panel': 'DynamicTypes/ObjectLayout/Panel',
    'DynamicTypes/ObjectLayout/Tabpanel': 'DynamicTypes/ObjectLayout/Tabpanel',
    'DynamicTypes/ObjectLayout/Accordion': 'DynamicTypes/ObjectLayout/Accordion',
    'DynamicTypes/ObjectLayout/Region': 'DynamicTypes/ObjectLayout/Region',
    'DynamicTypes/ObjectLayout/Text': 'DynamicTypes/ObjectLayout/Text',
    'DynamicTypes/ObjectLayout/Fieldset': 'DynamicTypes/ObjectLayout/Fieldset',
    'DynamicTypes/ObjectLayout/FieldContainer': 'DynamicTypes/ObjectLayout/FieldContainer',
    // Object data
    'DynamicTypes/ObjectData/Input': 'DynamicTypes/ObjectData/Input',
    'DynamicTypes/ObjectData/Textarea': 'DynamicTypes/ObjectData/Textarea',
    'DynamicTypes/ObjectData/Wysiwyg': 'DynamicTypes/ObjectData/Wysiwyg',
    'DynamicTypes/ObjectData/Password': 'DynamicTypes/ObjectData/Password',
    'DynamicTypes/ObjectData/InputQuantityValue': 'DynamicTypes/ObjectData/InputQuantityValue',
    'DynamicTypes/ObjectData/Select': 'DynamicTypes/ObjectData/Select',
    'DynamicTypes/ObjectData/MultiSelect': 'DynamicTypes/ObjectData/MultiSelect',
    'DynamicTypes/ObjectData/Language': 'DynamicTypes/ObjectData/Language',
    'DynamicTypes/ObjectData/LanguageMultiSelect': 'DynamicTypes/ObjectData/LanguageMultiSelect',
    'DynamicTypes/ObjectData/Country': 'DynamicTypes/ObjectData/Country',
    'DynamicTypes/ObjectData/CountryMultiSelect': 'DynamicTypes/ObjectData/CountryMultiSelect',
    'DynamicTypes/ObjectData/User': 'DynamicTypes/ObjectData/User',
    'DynamicTypes/ObjectData/BooleanSelect': 'DynamicTypes/ObjectData/BooleanSelect',
    'DynamicTypes/ObjectData/Numeric': 'DynamicTypes/ObjectData/Numeric',
    'DynamicTypes/ObjectData/NumericRange': 'DynamicTypes/ObjectData/NumericRange',
    'DynamicTypes/ObjectData/Slider': 'DynamicTypes/ObjectData/Slider',
    'DynamicTypes/ObjectData/QuantityValue': 'DynamicTypes/ObjectData/QuantityValue',
    'DynamicTypes/ObjectData/QuantityValueRange': 'DynamicTypes/ObjectData/QuantityValueRange',
    'DynamicTypes/ObjectData/Consent': 'DynamicTypes/ObjectData/Consent',
    'DynamicTypes/ObjectData/Firstname': 'DynamicTypes/ObjectData/Firstname',
    'DynamicTypes/ObjectData/Lastname': 'DynamicTypes/ObjectData/Lastname',
    'DynamicTypes/ObjectData/Email': 'DynamicTypes/ObjectData/Email',
    'DynamicTypes/ObjectData/Gender': 'DynamicTypes/ObjectData/Gender',
    'DynamicTypes/ObjectData/RgbaColor': 'DynamicTypes/ObjectData/RgbaColor',
    'DynamicTypes/ObjectData/EncryptedField': 'DynamicTypes/ObjectData/EncryptedField',
    'DynamicTypes/ObjectData/CalculatedValue': 'DynamicTypes/ObjectData/CalculatedValue',
    'DynamicTypes/ObjectData/Checkbox': 'DynamicTypes/ObjectData/Checkbox',
    'DynamicTypes/ObjectData/Link': 'DynamicTypes/ObjectData/Link',
    'DynamicTypes/ObjectData/UrlSlug': 'DynamicTypes/ObjectData/UrlSlug',
    'DynamicTypes/ObjectData/Date': 'DynamicTypes/ObjectData/Date',
    'DynamicTypes/ObjectData/Datetime': 'DynamicTypes/ObjectData/Datetime',
    'DynamicTypes/ObjectData/DateRange': 'DynamicTypes/ObjectData/DateRange',
    'DynamicTypes/ObjectData/Time': 'DynamicTypes/ObjectData/Time',
    'DynamicTypes/ObjectData/ExternalImage': 'DynamicTypes/ObjectData/ExternalImage',
    'DynamicTypes/ObjectData/Image': 'DynamicTypes/ObjectData/Image',
    'DynamicTypes/ObjectData/Video': 'DynamicTypes/ObjectData/Video',
    'DynamicTypes/ObjectData/HotspotImage': 'DynamicTypes/ObjectData/HotspotImage',
    'DynamicTypes/ObjectData/ImageGallery': 'DynamicTypes/ObjectData/ImageGallery',
    'DynamicTypes/ObjectData/GeoPoint': 'DynamicTypes/ObjectData/GeoPoint',
    'DynamicTypes/ObjectData/GeoBounds': 'DynamicTypes/ObjectData/GeoBounds',
    'DynamicTypes/ObjectData/GeoPolygon': 'DynamicTypes/ObjectData/GeoPolygon',
    'DynamicTypes/ObjectData/GeoPolyLine': 'DynamicTypes/ObjectData/GeoPolyLine',
    'DynamicTypes/ObjectData/ManyToOneRelation': 'DynamicTypes/ObjectData/ManyToOneRelation',
    'DynamicTypes/ObjectData/ManyToManyRelation': 'DynamicTypes/ObjectData/ManyToManyRelation',
    'DynamicTypes/ObjectData/ManyToManyObjectRelation': 'DynamicTypes/ObjectData/ManyToManyObjectRelation',
    'DynamicTypes/ObjectData/AdvancedManyToManyRelation': 'DynamicTypes/ObjectData/AdvancedManyToManyRelation',
    'DynamicTypes/ObjectData/AdvancedManyToManyObjectRelation': 'DynamicTypes/ObjectData/AdvancedManyToManyObjectRelation',
    'DynamicTypes/ObjectData/ReverseObjectRelation': 'DynamicTypes/ObjectData/ReverseObjectRelation',
    'DynamicTypes/ObjectData/Table': 'DynamicTypes/ObjectData/Table',
    'DynamicTypes/ObjectData/StructuredTable': 'DynamicTypes/ObjectData/StructuredTable',
    'DynamicTypes/ObjectData/Block': 'DynamicTypes/ObjectData/Block',
    'DynamicTypes/ObjectData/LocalizedFields': 'DynamicTypes/ObjectData/LocalizedFields',
    'DynamicTypes/ObjectData/FieldCollection': 'DynamicTypes/ObjectData/FieldCollection',
    'DynamicTypes/ObjectData/ObjectBrick': 'DynamicTypes/ObjectData/ObjectBrick',
    'DynamicTypes/ObjectData/ClassificationStore': 'DynamicTypes/ObjectData/ClassificationStore',
    // Asset types
    'DynamicTypes/Asset/Video': 'DynamicTypes/Asset/Video',
    'DynamicTypes/Asset/Audio': 'DynamicTypes/Asset/Audio',
    'DynamicTypes/Asset/Image': 'DynamicTypes/Asset/Image',
    'DynamicTypes/Asset/Document': 'DynamicTypes/Asset/Document',
    'DynamicTypes/Asset/Archive': 'DynamicTypes/Asset/Archive',
    'DynamicTypes/Asset/Unknown': 'DynamicTypes/Asset/Unknown',
    'DynamicTypes/Asset/Folder': 'DynamicTypes/Asset/Folder',
    'DynamicTypes/Asset/Text': 'DynamicTypes/Asset/Text',
    // Object types
    'DynamicTypes/Object/Folder': 'DynamicTypes/Object/Folder',
    'DynamicTypes/Object/Object': 'DynamicTypes/Object/Object',
    'DynamicTypes/Object/Variant': 'DynamicTypes/Object/Variant',
    // Execution engine
    'ExecutionEngine/JobComponentRegistry': 'ExecutionEngine/JobComponentRegistry',
    // Component registry
    'App/ComponentRegistry/ComponentRegistry': 'App/ComponentRegistry/ComponentRegistry'
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
"./js/src/core/app/depency-injection/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ContainerContext: () => (ContainerContext),
  ContainerProvider: () => (ContainerProvider),
  container: () => (container),
  useInjection: () => (useInjection),
  useMultiInjection: () => (useMultiInjection),
  useOptionalInjection: () => (useOptionalInjection)
});
/* ESM import */var _Pimcore_lib_dependency_injection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/lib/dependency-injection/index.tsx");
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
const { container, ContainerContext, ContainerProvider, useInjection, useMultiInjection, useOptionalInjection } = (0,_Pimcore_lib_dependency_injection__WEBPACK_IMPORTED_MODULE_0__.createDiInstance)();

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
"./js/src/core/components/button-group/button-group.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { css, token } = param;
    return {
        buttonGroup: css`
      &.button-group--with-separator {
        & > .button-group__item:not(:last-child) {
          position: relative;

          &::after {
            content: '';
            position: absolute;
            right: -4px;
            top: 3px;
            bottom: 3px;
            width: 1px;
            background-color: ${token.Divider.colorSplit};
          }
        }
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
"./js/src/core/components/button-group/button-group.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ButtonGroup: () => (ButtonGroup)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _button_group_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/button-group/button-group.styles.ts");
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



const ButtonGroup = (param)=>{
    let { items, noSpacing = false, withSeparator = false } = param;
    _s();
    const { styles } = (0,_button_group_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
    const classnames = [
        styles.buttonGroup,
        'button-group'
    ];
    if (withSeparator) {
        classnames.push('button-group--with-separator');
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            !noSpacing && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                align: "center",
                className: classnames.join(' '),
                gap: 'small',
                children: items.map((item, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "button-group__item",
                        children: item
                    }, index, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button-group/button-group.tsx",
                        lineNumber: 41,
                        columnNumber: 13
                    }, undefined))
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button-group/button-group.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, undefined),
            noSpacing && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Button.Group, {
                children: items.map((item, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        children: item
                    }, index, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button-group/button-group.tsx",
                        lineNumber: 54,
                        columnNumber: 13
                    }, undefined))
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button-group/button-group.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true);
};
_s(ButtonGroup, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _button_group_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles
    ];
});
_c = ButtonGroup;
var _c;
$RefreshReg$(_c, "ButtonGroup");

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
"./js/src/core/components/button/button.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        button: css`
      position: relative;

      .button__loading-spinner,
      .ant-spin-dot {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        margin: auto;
        color: inherit;
        transform: translateY(-50%);
      }
      
      .button__text {
        transition: opacity 200ms ease-in-out;
        
        &:empty {
          display: none;
        }
      }
      
      .button__loading-spinner + .button__text {
        opacity: 0;
      }

      &.button--type-action {
        background-color: ${token.colorBgToolbar};
        border: none;
        box-shadow: none;
        border-radius: ${token.borderRadius}px ${token.borderRadius}px 0 0;

        &.ant-btn-variant-outlined:not(:disabled):not(.ant-btn-disabled):hover {
          background-color: ${token.colorFillActive};
        }
      }

      &.button--color-secondary {
        border-color: ${token.colorBorderSecondary};
        box-shadow: none;
        color: ${token.colorText};
      }
      &.button--color-secondary:hover {
        border-color: ${token.colorBorderSecondary} !important;
        color: ${token.colorText} !important;
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
"./js/src/core/components/button/button.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Button: () => (Button)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var framer_motion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs");
/* ESM import */var framer_motion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _spin_spin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* ESM import */var _button_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/button/button.styles.tsx");
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






const Component = (param, ref)=>{
    let { loading, children, className, type, color, ...props } = param;
    _s();
    const buttonRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { styles } = (0,_button_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, ()=>buttonRef.current);
    const buttonClassNames = classnames__WEBPACK_IMPORTED_MODULE_3___default()('button', 'button2', `button--type-${type}`, `button--color-${color}`, styles.button, {
        'ant-btn-loading': loading
    }, className);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (loading === true && buttonRef.current !== null) {
            buttonRef.current.style.width = buttonRef.current.getBoundingClientRect().width + 'px';
            buttonRef.current.style.height = buttonRef.current.getBoundingClientRect().height + 'px';
        }
        return ()=>{
            if (loading === true && buttonRef.current !== null) {
                buttonRef.current.style.width = '';
                buttonRef.current.style.height = '';
            }
        };
    }, [
        loading
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
        className: buttonClassNames,
        ref: buttonRef,
        type: type === 'action' ? undefined : type,
        ...props,
        color: color === 'secondary' ? undefined : color,
        children: [
            loading === true ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_6__.AnimatePresence, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_7__.motion.div, {
                    animate: {
                        opacity: 1
                    },
                    className: "button__loading-spinner",
                    exit: {
                        opacity: 0
                    },
                    initial: {
                        opacity: 0
                    },
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_spin_spin__WEBPACK_IMPORTED_MODULE_4__.Spin, {
                        size: "small",
                        spinning: true
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button/button.tsx",
                        lineNumber: 78,
                        columnNumber: 15
                    }, undefined)
                }, 'loading', false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button/button.tsx",
                    lineNumber: 71,
                    columnNumber: 13
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button/button.tsx",
                lineNumber: 70,
                columnNumber: 11
            }, undefined) : null,
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                className: 'button__text',
                children: children
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button/button.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button/button.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, undefined);
};
_s(Component, "FRFsMY1hSM1bD5hMIfIKFcdXRcY=", false, function() {
    return [
        _button_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles
    ];
});
_c = Component;
const Button = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().forwardRef(Component);
_c1 = Button;
var _c, _c1;
$RefreshReg$(_c, "Component");
$RefreshReg$(_c1, "Button");

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
            lineNumber: 27,
            columnNumber: 5
        }, undefined);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
        ...props,
        dropdownRender: renderMenuComponent,
        children: props.children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/dropdown-inner.tsx",
        lineNumber: 36,
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
"./js/src/core/components/dropdown/dropdown.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
        dropdown: css`
    .ant-dropdown-menu {
    display: flex;
    flex-direction: column;
    }
    
    .ant-dropdown-menu-item-group-list {
    display: flex;
    flex-direction: column;
    }
    
      .ant-dropdown-menu-submenu {
          .ant-dropdown-menu-submenu-title {
              display: flex;
              align-items: center;
          }
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
            overlayClassName: styles.dropdown
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/dropdown.tsx",
            lineNumber: 94,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/dropdown.tsx",
        lineNumber: 90,
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
                        lineNumber: 49,
                        columnNumber: 13
                    }, undefined),
                    icon,
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        children: label
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/types/default/default-item.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, undefined),
                    selectable === true && selectionType !== 'disabled' && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_dropdown_selection_selection_button__WEBPACK_IMPORTED_MODULE_4__.SelectionButton, {
                        id: id
                    }, id, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/types/default/default-item.tsx",
                        lineNumber: 60,
                        columnNumber: 13
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/types/default/default-item.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/types/default/default-item.tsx",
            lineNumber: 39,
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


const DividerItem = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Menu.Divider, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/types/divider/divider-item.tsx",
        lineNumber: 20,
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
            lineNumber: 26,
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
            lineNumber: 22,
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
            lineNumber: 32,
            columnNumber: 12
        }, undefined);
    }
    if ('type' in item && item.type === 'group') {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_types_group_group_item__WEBPACK_IMPORTED_MODULE_4__.GroupItem, {
            ...item
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/utils/dropdown-item.tsx",
            lineNumber: 36,
            columnNumber: 12
        }, undefined);
    }
    if ('type' in item && item.type === 'custom') {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_types_custom_custom_item__WEBPACK_IMPORTED_MODULE_2__.CustomItem, {
            ...item
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/utils/dropdown-item.tsx",
            lineNumber: 40,
            columnNumber: 12
        }, undefined);
    }
    if (!('type' in item) && 'children' in item) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_types_sub_menu_sub_menu_item__WEBPACK_IMPORTED_MODULE_5__.SubMenuItem, {
            ...item
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/utils/dropdown-item.tsx",
            lineNumber: 44,
            columnNumber: 12
        }, undefined);
    }
    if (!('type' in item) && !('children' in item)) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_types_default_default_item__WEBPACK_IMPORTED_MODULE_6__.DefaultItem, {
            ...item,
            id: item.key
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/dropdown/item/utils/dropdown-item.tsx",
            lineNumber: 49,
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
        lineNumber: 34,
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
            lineNumber: 52,
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
"./js/src/core/components/element-tree/element-tree-slice.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  initialNodeState: () => (initialNodeState),
  locateInTree: () => (locateInTree),
  markNodeDeleting: () => (markNodeDeleting),
  refreshNodeChildren: () => (refreshNodeChildren),
  refreshSourceNode: () => (refreshSourceNode),
  refreshTargetNode: () => (refreshTargetNode),
  renameNode: () => (renameNode),
  selectNodeState: () => (selectNodeState),
  setFetchTriggered: () => (setFetchTriggered),
  setNodeExpanded: () => (setNodeExpanded),
  setNodeFetching: () => (setNodeFetching),
  setNodeHasChildren: () => (setNodeHasChildren),
  setNodeLoading: () => (setNodeLoading),
  setNodeLoadingInAllTree: () => (setNodeLoadingInAllTree),
  setNodeLocked: () => (setNodeLocked),
  setNodePage: () => (setNodePage),
  setNodePublished: () => (setNodePublished),
  setNodeScrollTo: () => (setNodeScrollTo),
  setNodeSearchTerm: () => (setNodeSearchTerm),
  setRootFetchTriggered: () => (setRootFetchTriggered),
  setRootNode: () => (setRootNode),
  setSelectedNodeIds: () => (setSelectedNodeIds),
  treeSliceName: () => (treeSliceName),
  updateNodesByParentId: () => (updateNodesByParentId)
});
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var reselect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/reselect/dist/reselect.mjs");
/* ESM import */var _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/actions/lock/use-lock.tsx");
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
*/ /* eslint-disable max-lines */ 




const initialNodeState = {
    isExpanded: false,
    isFetching: false,
    page: 1,
    isSelected: false,
    isScrollTo: false,
    isFetchTriggered: false,
    isDeleting: false,
    childrenIds: []
};
const initialTreeState = {
    nodes: {}
};
const initialState = {};
const initializeNodeState = (state, treeId, nodeId)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(state[treeId])) {
        state[treeId] = {
            ...initialTreeState
        };
    }
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(state[treeId].nodes[nodeId])) {
        state[treeId] = {
            ...state[treeId],
            nodes: {
                ...state[treeId].nodes,
                [nodeId]: {
                    ...initialNodeState
                }
            }
        };
    }
    return state[treeId].nodes[nodeId];
};
const updateNodeState = (state, treeId, nodeId, updateFn)=>{
    const node = initializeNodeState(state, treeId, nodeId);
    const updatedNode = updateFn(node);
    if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEqual)(node, updatedNode)) {
        state[treeId].nodes[nodeId] = updatedNode;
    }
};
const getAscendants = (nodes, parentId)=>{
    const ascendants = [];
    Object.keys(nodes).forEach((nodeId)=>{
        if (nodeId === parentId) {
            var _nodes_nodeId_treeNodeProps;
            if (((_nodes_nodeId_treeNodeProps = nodes[nodeId].treeNodeProps) === null || _nodes_nodeId_treeNodeProps === void 0 ? void 0 : _nodes_nodeId_treeNodeProps.parentId) !== undefined) {
                var _nodes_nodeId_treeNodeProps1;
                ascendants.push((_nodes_nodeId_treeNodeProps1 = nodes[nodeId].treeNodeProps) === null || _nodes_nodeId_treeNodeProps1 === void 0 ? void 0 : _nodes_nodeId_treeNodeProps1.parentId);
            }
        }
    });
    let allAscendants = [
        ...ascendants
    ];
    ascendants.forEach((ascendantId)=>{
        allAscendants = [
            ...allAscendants,
            ...getAscendants(nodes, ascendantId)
        ];
    });
    return allAscendants;
};
const applyToAllAscendants = (state, nodes, nodeId, elementType, updateFn)=>{
    const ascendants = getAscendants(nodes, nodeId).reverse();
    ascendants.forEach((nodeId)=>{
        Object.keys(state).forEach((treeId)=>{
            var _state_treeId_nodes_nodeId_treeNodeProps, _state_treeId_nodes_nodeId;
            if (((_state_treeId_nodes_nodeId = state[treeId].nodes[nodeId]) === null || _state_treeId_nodes_nodeId === void 0 ? void 0 : (_state_treeId_nodes_nodeId_treeNodeProps = _state_treeId_nodes_nodeId.treeNodeProps) === null || _state_treeId_nodes_nodeId_treeNodeProps === void 0 ? void 0 : _state_treeId_nodes_nodeId_treeNodeProps.elementType) === elementType) {
                updateNodeState(state, treeId, nodeId, (node)=>updateFn(node));
            }
        });
    });
};
const getDescendants = function(nodes, parentId) {
    let recursive = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    const descendants = Object.keys(nodes).filter((nodeId)=>{
        var _nodes_nodeId_treeNodeProps;
        return ((_nodes_nodeId_treeNodeProps = nodes[nodeId].treeNodeProps) === null || _nodes_nodeId_treeNodeProps === void 0 ? void 0 : _nodes_nodeId_treeNodeProps.parentId) === parentId;
    });
    let allDescendants = [
        ...descendants
    ];
    if (recursive) {
        descendants.forEach((descendantId)=>{
            allDescendants = [
                ...allDescendants,
                ...getDescendants(nodes, descendantId, true)
            ];
        });
    }
    return allDescendants;
};
const applyToAllDescendants = (state, nodes, parentId, elementType, updateFn)=>{
    const descendants = getDescendants(nodes, parentId, true);
    descendants.forEach((nodeId)=>{
        Object.keys(state).forEach((treeId)=>{
            var _state_treeId_nodes_nodeId_treeNodeProps, _state_treeId_nodes_nodeId;
            if (((_state_treeId_nodes_nodeId = state[treeId].nodes[nodeId]) === null || _state_treeId_nodes_nodeId === void 0 ? void 0 : (_state_treeId_nodes_nodeId_treeNodeProps = _state_treeId_nodes_nodeId.treeNodeProps) === null || _state_treeId_nodes_nodeId_treeNodeProps === void 0 ? void 0 : _state_treeId_nodes_nodeId_treeNodeProps.elementType) === elementType) {
                updateNodeState(state, treeId, nodeId, (node)=>updateFn(node));
            }
        });
    });
};
const removeDescendants = function(nodes, parentId) {
    let keepBasicStates = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    const descendants = getDescendants(nodes, parentId, !keepBasicStates);
    const result = {};
    Object.keys(nodes).forEach((nodeId)=>{
        if (!descendants.includes(nodeId)) {
            result[nodeId] = nodes[nodeId];
        } else if (keepBasicStates) {
            result[nodeId] = {
                ...nodes[nodeId],
                treeNodeProps: undefined
            };
        }
    });
    return result;
};
const updateSelectedNodeIds = (state, treeId, selectedNodeIds)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(state[treeId])) {
        state[treeId] = {
            ...initialTreeState
        };
    }
    Object.keys(state[treeId].nodes).forEach((nodeId)=>{
        updateNodeState(state, treeId, nodeId, (node)=>({
                ...node,
                isSelected: selectedNodeIds.includes(nodeId)
            }));
    });
    selectedNodeIds.forEach((nodeId)=>{
        updateNodeState(state, treeId, nodeId, (node)=>({
                ...node,
                isSelected: true
            }));
    });
};
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_3__.createSlice)({
    name: 'trees',
    initialState,
    reducers: {
        setNodeLoading: (state, param)=>{
            let { payload } = param;
            updateNodeState(state, payload.treeId, payload.nodeId, (node)=>({
                    ...node,
                    isLoading: payload.loading
                }));
        },
        setNodeLoadingInAllTree: (state, param)=>{
            let { payload } = param;
            Object.keys(state).forEach((treeId)=>{
                var _state_treeId_nodes_payload_nodeId_treeNodeProps, _state_treeId_nodes_payload_nodeId;
                if (((_state_treeId_nodes_payload_nodeId = state[treeId].nodes[payload.nodeId]) === null || _state_treeId_nodes_payload_nodeId === void 0 ? void 0 : (_state_treeId_nodes_payload_nodeId_treeNodeProps = _state_treeId_nodes_payload_nodeId.treeNodeProps) === null || _state_treeId_nodes_payload_nodeId_treeNodeProps === void 0 ? void 0 : _state_treeId_nodes_payload_nodeId_treeNodeProps.elementType) === payload.elementType) {
                    updateNodeState(state, treeId, payload.nodeId, (node)=>({
                            ...node,
                            isLoading: payload.loading
                        }));
                }
            });
        },
        setFetchTriggered: (state, param)=>{
            let { payload } = param;
            updateNodeState(state, payload.treeId, payload.nodeId, (node)=>({
                    ...node,
                    isFetchTriggered: payload.fetchTriggered
                }));
        },
        setRootFetchTriggered: (state, param)=>{
            let { payload } = param;
            updateNodeState(state, payload.treeId, payload.nodeId, (node)=>({
                    ...node,
                    isRootFetchTriggered: payload.rootFetchTriggered
                }));
        },
        setNodeExpanded: (state, param)=>{
            let { payload } = param;
            updateNodeState(state, payload.treeId, payload.nodeId, (node)=>({
                    ...node,
                    isExpanded: payload.expanded
                }));
        },
        setNodeHasChildren: (state, param)=>{
            let { payload } = param;
            updateNodeState(state, payload.treeId, payload.nodeId, (node)=>({
                    ...node,
                    treeNodeProps: !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(node.treeNodeProps) ? {
                        ...node.treeNodeProps,
                        hasChildren: payload.hasChildren
                    } : undefined
                }));
        },
        setNodePage: (state, param)=>{
            let { payload } = param;
            updateNodeState(state, payload.treeId, payload.nodeId, (node)=>{
                const isFetchTriggered = node.page !== payload.page ? false : node.isFetchTriggered;
                const isLoading = node.page !== payload.page ? undefined : node.isLoading;
                return {
                    ...node,
                    page: payload.page,
                    isFetchTriggered,
                    isLoading
                };
            });
        },
        setNodeSearchTerm: (state, param)=>{
            let { payload } = param;
            updateNodeState(state, payload.treeId, payload.nodeId, (node)=>{
                const isFetchTriggered = node.searchTerm !== payload.searchTerm ? false : node.isFetchTriggered;
                const isLoading = node.searchTerm !== payload.searchTerm ? undefined : node.isLoading;
                return {
                    ...node,
                    searchTerm: payload.searchTerm,
                    isFetchTriggered,
                    isLoading
                };
            });
        },
        setSelectedNodeIds: (state, param)=>{
            let { payload } = param;
            updateSelectedNodeIds(state, payload.treeId, payload.selectedNodeIds);
        },
        setNodeScrollTo: (state, param)=>{
            let { payload } = param;
            updateNodeState(state, payload.treeId, payload.nodeId, (node)=>({
                    ...node,
                    isScrollTo: payload.scrollTo
                }));
        },
        updateNodesByParentId: (state, param)=>{
            let { payload } = param;
            updateNodeState(state, payload.treeId, payload.parentId, (node)=>({
                    ...node,
                    total: payload.total,
                    childrenIds: payload.nodes.map((child)=>String(child.id)) // Save child node IDs
                }));
            const currentNodes = state[payload.treeId].nodes;
            const updatedNodes = removeDescendants(currentNodes, payload.parentId, true);
            // Add or update the new nodes
            let order = 0;
            payload.nodes.forEach((node)=>{
                const nodeId = String(node.id);
                updatedNodes[nodeId] = initializeNodeState(state, payload.treeId, nodeId);
                updatedNodes[nodeId] = {
                    ...updatedNodes[nodeId],
                    isDeleting: false,
                    treeNodeProps: node,
                    order: order++
                };
            });
            state[payload.treeId].nodes = updatedNodes;
        },
        locateInTree: (state, param)=>{
            let { payload } = param;
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(state[payload.treeId])) {
                state[payload.treeId] = {
                    ...initialTreeState
                };
            }
            let hasParentChanged = false;
            payload.treeLevelData.forEach((param)=>{
                let { parentId, elementId, pageNumber } = param;
                var _state_payload_treeId_nodes_String_treeNodeProps, _state_payload_treeId_nodes_String, _state_payload_treeId;
                if ((0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(parentId)) {
                    return;
                }
                if (parentId === elementId) {
                    return;
                }
                const isParentIdCurrent = ((_state_payload_treeId = state[payload.treeId]) === null || _state_payload_treeId === void 0 ? void 0 : (_state_payload_treeId_nodes_String = _state_payload_treeId.nodes[String(elementId)]) === null || _state_payload_treeId_nodes_String === void 0 ? void 0 : (_state_payload_treeId_nodes_String_treeNodeProps = _state_payload_treeId_nodes_String.treeNodeProps) === null || _state_payload_treeId_nodes_String_treeNodeProps === void 0 ? void 0 : _state_payload_treeId_nodes_String_treeNodeProps.parentId) === String(parentId);
                if (hasParentChanged || !isParentIdCurrent) {
                    hasParentChanged = true;
                    updateNodeState(state, payload.treeId, String(elementId), (node)=>{
                        return {
                            ...node,
                            treeNodeProps: undefined
                        };
                    });
                }
                updateNodeState(state, payload.treeId, String(parentId), (node)=>{
                    const isItemOnPage = node.page === pageNumber && (0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(node.searchTerm) && isParentIdCurrent;
                    return {
                        ...node,
                        isLoading: !isItemOnPage ? undefined : node.isLoading,
                        isFetchTriggered: !isItemOnPage ? false : node.isFetchTriggered,
                        isExpanded: true,
                        page: pageNumber,
                        searchTerm: undefined
                    };
                });
            });
            updateNodeState(state, payload.treeId, payload.nodeId, (node)=>({
                    ...node,
                    isSelected: true,
                    isScrollTo: true
                }));
            updateSelectedNodeIds(state, payload.treeId, [
                payload.nodeId
            ]);
        },
        setNodeFetching: (state, param)=>{
            let { payload } = param;
            updateNodeState(state, payload.treeId, payload.nodeId, (node)=>({
                    ...node,
                    isFetching: payload.isFetching
                }));
        },
        refreshNodeChildren: (state, param)=>{
            let { payload } = param;
            Object.keys(state).forEach((treeId)=>{
                var _state_treeId_nodes_payload_nodeId_treeNodeProps, _state_treeId_nodes_payload_nodeId;
                if (((_state_treeId_nodes_payload_nodeId = state[treeId].nodes[payload.nodeId]) === null || _state_treeId_nodes_payload_nodeId === void 0 ? void 0 : (_state_treeId_nodes_payload_nodeId_treeNodeProps = _state_treeId_nodes_payload_nodeId.treeNodeProps) === null || _state_treeId_nodes_payload_nodeId_treeNodeProps === void 0 ? void 0 : _state_treeId_nodes_payload_nodeId_treeNodeProps.elementType) === payload.elementType) {
                    updateNodeState(state, treeId, payload.nodeId, (node)=>({
                            ...node,
                            isLoading: undefined,
                            isExpanded: true,
                            isFetchTriggered: false
                        }));
                    state[treeId].nodes = removeDescendants(state[treeId].nodes, payload.nodeId);
                }
            });
        },
        renameNode: (state, param)=>{
            let { payload } = param;
            Object.keys(state).forEach((treeId)=>{
                var _state_treeId_nodes_payload_nodeId_treeNodeProps, _state_treeId_nodes_payload_nodeId;
                if (((_state_treeId_nodes_payload_nodeId = state[treeId].nodes[payload.nodeId]) === null || _state_treeId_nodes_payload_nodeId === void 0 ? void 0 : (_state_treeId_nodes_payload_nodeId_treeNodeProps = _state_treeId_nodes_payload_nodeId.treeNodeProps) === null || _state_treeId_nodes_payload_nodeId_treeNodeProps === void 0 ? void 0 : _state_treeId_nodes_payload_nodeId_treeNodeProps.elementType) === payload.elementType) {
                    updateNodeState(state, treeId, payload.nodeId, (node)=>({
                            ...node,
                            treeNodeProps: !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(node.treeNodeProps) ? {
                                ...node.treeNodeProps,
                                label: payload.newLabel
                            } : undefined
                        }));
                }
            });
        },
        refreshTargetNode: (state, param)=>{
            let { payload } = param;
            Object.keys(state).forEach((treeId)=>{
                var _state_treeId_nodes_payload_nodeId_treeNodeProps, _state_treeId_nodes_payload_nodeId;
                if (((_state_treeId_nodes_payload_nodeId = state[treeId].nodes[payload.nodeId]) === null || _state_treeId_nodes_payload_nodeId === void 0 ? void 0 : (_state_treeId_nodes_payload_nodeId_treeNodeProps = _state_treeId_nodes_payload_nodeId.treeNodeProps) === null || _state_treeId_nodes_payload_nodeId_treeNodeProps === void 0 ? void 0 : _state_treeId_nodes_payload_nodeId_treeNodeProps.elementType) === payload.elementType) {
                    updateNodeState(state, treeId, payload.nodeId, (node)=>({
                            ...node,
                            isExpanded: true,
                            isFetchTriggered: false,
                            treeNodeProps: !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(node.treeNodeProps) ? {
                                ...node.treeNodeProps,
                                hasChildren: true
                            } : undefined
                        }));
                // state[treeId].nodes = removeDescendants(state[treeId].nodes, payload.nodeId)
                }
            });
        },
        refreshSourceNode: (state, param)=>{
            let { payload } = param;
            Object.keys(state).forEach((treeId)=>{
                var _state_treeId_nodes_payload_nodeId_treeNodeProps, _state_treeId_nodes_payload_nodeId;
                if (((_state_treeId_nodes_payload_nodeId = state[treeId].nodes[payload.nodeId]) === null || _state_treeId_nodes_payload_nodeId === void 0 ? void 0 : (_state_treeId_nodes_payload_nodeId_treeNodeProps = _state_treeId_nodes_payload_nodeId.treeNodeProps) === null || _state_treeId_nodes_payload_nodeId_treeNodeProps === void 0 ? void 0 : _state_treeId_nodes_payload_nodeId_treeNodeProps.elementType) === payload.elementType) {
                    updateNodeState(state, treeId, payload.nodeId, (node)=>({
                            ...node,
                            isFetchTriggered: false
                        }));
                }
            });
        },
        markNodeDeleting: (state, param)=>{
            let { payload } = param;
            Object.keys(state).forEach((treeId)=>{
                var _state_treeId_nodes_payload_nodeId_treeNodeProps, _state_treeId_nodes_payload_nodeId;
                if (((_state_treeId_nodes_payload_nodeId = state[treeId].nodes[payload.nodeId]) === null || _state_treeId_nodes_payload_nodeId === void 0 ? void 0 : (_state_treeId_nodes_payload_nodeId_treeNodeProps = _state_treeId_nodes_payload_nodeId.treeNodeProps) === null || _state_treeId_nodes_payload_nodeId_treeNodeProps === void 0 ? void 0 : _state_treeId_nodes_payload_nodeId_treeNodeProps.elementType) === payload.elementType) {
                    updateNodeState(state, treeId, payload.nodeId, (node)=>({
                            ...node,
                            isDeleting: payload.isDeleting
                        }));
                }
            });
        },
        setNodePublished: (state, param)=>{
            let { payload } = param;
            Object.keys(state).forEach((treeId)=>{
                var _state_treeId_nodes_payload_nodeId_treeNodeProps, _state_treeId_nodes_payload_nodeId;
                if (((_state_treeId_nodes_payload_nodeId = state[treeId].nodes[payload.nodeId]) === null || _state_treeId_nodes_payload_nodeId === void 0 ? void 0 : (_state_treeId_nodes_payload_nodeId_treeNodeProps = _state_treeId_nodes_payload_nodeId.treeNodeProps) === null || _state_treeId_nodes_payload_nodeId_treeNodeProps === void 0 ? void 0 : _state_treeId_nodes_payload_nodeId_treeNodeProps.elementType) === payload.elementType) {
                    updateNodeState(state, treeId, payload.nodeId, (node)=>({
                            ...node,
                            treeNodeProps: !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(node.treeNodeProps) ? {
                                ...node.treeNodeProps,
                                isPublished: payload.isPublished
                            } : undefined
                        }));
                }
            });
        },
        setRootNode: (state, param)=>{
            let { payload } = param;
            updateNodeState(state, payload.treeId, payload.nodeId, (node)=>({
                    ...node,
                    treeNodeProps: payload.rootNode,
                    isExpanded: true,
                    isRoot: true
                }));
        },
        setNodeLocked: (state, param)=>{
            let { payload } = param;
            Object.keys(state).forEach((treeId)=>{
                var _state_treeId_nodes_payload_nodeId_treeNodeProps, _state_treeId_nodes_payload_nodeId;
                if (((_state_treeId_nodes_payload_nodeId = state[treeId].nodes[payload.nodeId]) === null || _state_treeId_nodes_payload_nodeId === void 0 ? void 0 : (_state_treeId_nodes_payload_nodeId_treeNodeProps = _state_treeId_nodes_payload_nodeId.treeNodeProps) === null || _state_treeId_nodes_payload_nodeId_treeNodeProps === void 0 ? void 0 : _state_treeId_nodes_payload_nodeId_treeNodeProps.elementType) === payload.elementType) {
                    const locked = ()=>{
                        if (payload.lockType === _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_2__.LockType.Self) {
                            return 'self';
                        }
                        if (payload.lockType === _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_2__.LockType.Propagate) {
                            return 'propagate';
                        }
                        return null;
                    };
                    const refreshChildren = payload.lockType === _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_2__.LockType.Self || payload.lockType === _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_2__.LockType.Unlock;
                    updateNodeState(state, treeId, payload.nodeId, (node)=>({
                            ...node,
                            isLoading: refreshChildren ? undefined : node.isLoading,
                            isFetchTriggered: refreshChildren ? false : node.isFetchTriggered,
                            treeNodeProps: !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(node.treeNodeProps) ? {
                                ...node.treeNodeProps,
                                locked: locked(),
                                isLocked: payload.isLocked
                            } : undefined
                        }));
                    if (refreshChildren) {
                        state[treeId].nodes = removeDescendants(state[treeId].nodes, payload.nodeId);
                    }
                    if (payload.lockType === _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_2__.LockType.Self || payload.lockType === _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_2__.LockType.Propagate || payload.lockType === _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_2__.LockType.Unlock || payload.lockType === _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_2__.LockType.UnlockPropagate) {
                        const isUnlock = payload.lockType === _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_2__.LockType.Unlock || payload.lockType === _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_2__.LockType.UnlockPropagate;
                        const isFetchTriggered = (node)=>{
                            return isUnlock ? false : node.isFetchTriggered;
                        };
                        applyToAllAscendants(state, state[treeId].nodes, payload.nodeId, payload.elementType, (node)=>{
                            var _node_treeNodeProps;
                            if (!isUnlock && ((_node_treeNodeProps = node.treeNodeProps) === null || _node_treeNodeProps === void 0 ? void 0 : _node_treeNodeProps.id) === '1') {
                                return node;
                            }
                            return {
                                ...node,
                                isFetchTriggered: isFetchTriggered(node),
                                treeNodeProps: !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(node.treeNodeProps) ? {
                                    ...node.treeNodeProps,
                                    isLocked: isUnlock ? node.treeNodeProps.isLocked : payload.isLocked
                                } : undefined
                            };
                        });
                    }
                    if (payload.lockType === _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_2__.LockType.Propagate || payload.lockType === _Pimcore_modules_element_actions_lock_use_lock__WEBPACK_IMPORTED_MODULE_2__.LockType.UnlockPropagate) {
                        applyToAllDescendants(state, state[treeId].nodes, payload.nodeId, payload.elementType, (node)=>{
                            return {
                                ...node,
                                treeNodeProps: !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(node.treeNodeProps) ? {
                                    ...node.treeNodeProps,
                                    isLocked: payload.isLocked
                                } : undefined
                            };
                        });
                    }
                }
            });
        }
    }
});
const treeSliceName = slice.name;
(0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.injectSliceWithState)(slice);
const { setNodeLoading, setNodeLoadingInAllTree, setNodeExpanded, setNodeHasChildren, setNodePage, setNodeSearchTerm, setSelectedNodeIds, setNodeScrollTo, updateNodesByParentId, locateInTree, setFetchTriggered, setRootFetchTriggered, setNodeFetching, refreshNodeChildren, refreshTargetNode, refreshSourceNode, markNodeDeleting, renameNode, setNodePublished, setRootNode, setNodeLocked } = slice.actions;
const selectNodeState = (0,reselect__WEBPACK_IMPORTED_MODULE_4__.createSelector)((state)=>state.trees, (state, treeId)=>treeId, (state, treeId, nodeId)=>nodeId, (trees, treeId, nodeId)=>{
    var _trees_treeId;
    return (_trees_treeId = trees[treeId]) === null || _trees_treeId === void 0 ? void 0 : _trees_treeId.nodes[nodeId];
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
"./js/src/core/components/form/form.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Form: () => (Form)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _space_space__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/space/space.tsx");
/* ESM import */var _item_with_group_name__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/form/item/with-group-name.tsx");
/* ESM import */var _group_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/form/group/group.tsx");
/* ESM import */var _keyed_list_keyed_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/form/keyed-list/keyed-list.tsx");
/* ESM import */var _item_with_item_provider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/form/item/with-item-provider.tsx");
/* ESM import */var _item_with_keyed_item_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/components/form/item/with-keyed-item-context.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_localized_fields_form_item_with_localized_fields_locale__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/localized-fields/form-item/with-localized-fields-locale.tsx");
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./node_modules/redux/dist/redux.mjs");
/* ESM import */var _numbered_list_numbered_list__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/form/numbered-list/numbered-list.tsx");
/* ESM import */var _item_with_numbered_item_context__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/components/form/item/with-numbered-item-context.tsx");
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












const Form = (param)=>{
    let { ...props } = param;
    const requiredMark = (label, param)=>{
        let { required } = param;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_space_space__WEBPACK_IMPORTED_MODULE_3__.Space, {
            size: "mini",
            children: [
                label,
                required && '*'
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/form.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, undefined);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Form, {
        requiredMark: requiredMark,
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/form.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, undefined);
};
const newFormItem = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_12__.compose)(_item_with_group_name__WEBPACK_IMPORTED_MODULE_4__.withGroupName, _item_with_keyed_item_context__WEBPACK_IMPORTED_MODULE_8__.withKeyedItemContext, _item_with_numbered_item_context__WEBPACK_IMPORTED_MODULE_11__.withNumberedItemContext, _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_localized_fields_form_item_with_localized_fields_locale__WEBPACK_IMPORTED_MODULE_9__.withLocalizedFieldsLocale, _item_with_item_provider__WEBPACK_IMPORTED_MODULE_7__.withItemProvider)(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item);
Form.Item = newFormItem;
Form.List = antd__WEBPACK_IMPORTED_MODULE_2__.Form.List;
Form.Provider = antd__WEBPACK_IMPORTED_MODULE_2__.Form.Provider;
Form.Group = _group_group__WEBPACK_IMPORTED_MODULE_5__.Group;
Form.KeyedList = _keyed_list_keyed_list__WEBPACK_IMPORTED_MODULE_6__.KeyedList;
Form.NumberedList = _numbered_list_numbered_list__WEBPACK_IMPORTED_MODULE_10__.NumberedList;
Form.useForm = antd__WEBPACK_IMPORTED_MODULE_2__.Form.useForm;
Form.useFormInstance = antd__WEBPACK_IMPORTED_MODULE_2__.Form.useFormInstance;
Form.useWatch = antd__WEBPACK_IMPORTED_MODULE_2__.Form.useWatch;
Form.ErrorList = antd__WEBPACK_IMPORTED_MODULE_2__.Form.ErrorList;


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
"./js/src/core/components/form/group/group.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Group: () => (Group)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _provider_form_group_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/group/provider/form-group-provider.tsx");
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


const Group = (param)=>{
    let { children, name } = param;
    _s();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_provider_form_group_provider__WEBPACK_IMPORTED_MODULE_2__.FormGroupProvider, {
            name: name,
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/group/group.tsx",
            lineNumber: 25,
            columnNumber: 5
        }, undefined), [
        name,
        children
    ]);
};
_s(Group, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = Group;
var _c;
$RefreshReg$(_c, "Group");

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
"./js/src/core/components/form/group/provider/form-group-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  FormGroupContext: () => (FormGroupContext),
  FormGroupProvider: () => (FormGroupProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _use_form_group_optional__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/group/provider/use-form-group-optional.ts");
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
var _s = $RefreshSig$();



const FormGroupContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const FormGroupProvider = (param)=>{
    let { name, children } = param;
    _s();
    const groupContext = (0,_use_form_group_optional__WEBPACK_IMPORTED_MODULE_2__.useFormGroupOptional)();
    let groupName = name;
    if (groupContext !== undefined) {
        const { name: parentName } = groupContext;
        groupName = [
            ...(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isArray)(parentName) ? parentName : [
                parentName
            ],
            ...(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isArray)(name) ? name : [
                name
            ]
        ];
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(FormGroupContext.Provider, {
            value: {
                name: groupName
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/group/provider/form-group-provider.tsx",
            lineNumber: 45,
            columnNumber: 5
        }, undefined), [
        groupName,
        children
    ]);
};
_s(FormGroupProvider, "Ore4/PIfogDLIeGkC+azIs1lKBs=", false, function() {
    return [
        _use_form_group_optional__WEBPACK_IMPORTED_MODULE_2__.useFormGroupOptional
    ];
});
_c = FormGroupProvider;
var _c;
$RefreshReg$(_c, "FormGroupProvider");

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
"./js/src/core/components/form/group/provider/use-form-group-optional.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useFormGroupOptional: () => (useFormGroupOptional)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _form_group_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/form/group/provider/form-group-provider.tsx");
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

const useFormGroupOptional = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_form_group_provider__WEBPACK_IMPORTED_MODULE_1__.FormGroupContext);
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
"./js/src/core/components/form/item/provider/item/item-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ItemContext: () => (ItemContext),
  ItemProvider: () => (ItemProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

const ItemContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const ItemProvider = (param)=>{
    let { item, children } = param;
    _s();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ItemContext.Provider, {
            value: item,
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/item/provider/item/item-provider.tsx",
            lineNumber: 30,
            columnNumber: 5
        }, undefined), [
        item,
        children
    ]);
};
_s(ItemProvider, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = ItemProvider;
var _c;
$RefreshReg$(_c, "ItemProvider");

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
"./js/src/core/components/form/item/provider/item/use-item.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useItem: () => (useItem),
  useItemOptional: () => (useItemOptional)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _item_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/form/item/provider/item/item-provider.tsx");
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

const useItem = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_item_provider__WEBPACK_IMPORTED_MODULE_1__.ItemContext);
    if (context === undefined) {
        throw new Error('useItem must be used within a ItemProvider');
    }
    return context;
};
const useItemOptional = ()=>{
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_item_provider__WEBPACK_IMPORTED_MODULE_1__.ItemContext);
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
"./js/src/core/components/form/item/with-group-name.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withGroupName: () => (withGroupName)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _group_provider_use_form_group_optional__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/group/provider/use-form-group-optional.ts");
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



const withGroupName = (Component)=>{
    var _s = $RefreshSig$();
    const FormItemWithGroupContext = (props)=>{
        _s();
        const context = (0,_group_provider_use_form_group_optional__WEBPACK_IMPORTED_MODULE_2__.useFormGroupOptional)();
        const { name, ...baseProps } = props;
        let formItemName = name;
        if (context !== undefined) {
            const { name: parentName } = context;
            formItemName = [
                ...(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isArray)(parentName) ? parentName : [
                    parentName
                ],
                ...(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isArray)(name) ? name : [
                    name
                ]
            ];
        }
        return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                ...baseProps,
                name: formItemName
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/item/with-group-name.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, undefined), [
            props
        ]);
    };
    _s(FormItemWithGroupContext, "to/SRWn7FoJE1BJ97W9mvulqd4s=", false, function() {
        return [
            _group_provider_use_form_group_optional__WEBPACK_IMPORTED_MODULE_2__.useFormGroupOptional
        ];
    });
    const NewFormItem = FormItemWithGroupContext;
    NewFormItem.useStatus = Component.useStatus;
    return NewFormItem;
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
"./js/src/core/components/form/item/with-item-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withItemProvider: () => (withItemProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _provider_item_item_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/item/provider/item/item-provider.tsx");
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


const withItemProvider = (Component)=>{
    var _s = $RefreshSig$();
    const FormItemWithItemProvider = (props)=>{
        _s();
        return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_provider_item_item_provider__WEBPACK_IMPORTED_MODULE_2__.ItemProvider, {
                item: props,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                    ...props
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/item/with-item-provider.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/item/with-item-provider.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, undefined), [
            props
        ]);
    };
    _s(FormItemWithItemProvider, "nwk+m61qLgjDVUp4IGV/072DDN4=");
    const NewFormItem = FormItemWithItemProvider;
    NewFormItem.useStatus = Component.useStatus;
    return NewFormItem;
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
"./js/src/core/components/form/item/with-keyed-item-context.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withKeyedItemContext: () => (withKeyedItemContext)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _keyed_list_provider_keyed_list_use_keyed_list_optional__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/keyed-list/provider/keyed-list/use-keyed-list-optional.ts");
/* ESM import */var _keyed_list_form_item_keyed_form_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/keyed-list/form-item/keyed-form-item.tsx");
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



const withKeyedItemContext = (Component)=>{
    var _s = $RefreshSig$();
    const FormItemWithKeyedListContext = (props)=>{
        _s();
        const hasKeyedContext = (0,_keyed_list_provider_keyed_list_use_keyed_list_optional__WEBPACK_IMPORTED_MODULE_2__.useKeyedListOptional)() !== undefined;
        if (!hasKeyedContext) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                ...props
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/item/with-keyed-item-context.tsx",
                lineNumber: 24,
                columnNumber: 14
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_keyed_list_form_item_keyed_form_item__WEBPACK_IMPORTED_MODULE_3__.KeyedFormItem, {
            Component: Component,
            componentProps: props
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/item/with-keyed-item-context.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, undefined);
    };
    _s(FormItemWithKeyedListContext, "XHkcjgBbvxgXNAgcL2F8RF7R9vo=", false, function() {
        return [
            _keyed_list_provider_keyed_list_use_keyed_list_optional__WEBPACK_IMPORTED_MODULE_2__.useKeyedListOptional
        ];
    });
    const NewFormItem = FormItemWithKeyedListContext;
    NewFormItem.useStatus = Component.useStatus;
    return NewFormItem;
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
"./js/src/core/components/form/item/with-numbered-item-context.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withNumberedItemContext: () => (withNumberedItemContext)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _numbered_list_provider_numbered_list_use_numbered_list_optional__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/numbered-list/provider/numbered-list/use-numbered-list-optional.ts");
/* ESM import */var _numbered_list_form_item_numbered_form_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/numbered-list/form-item/numbered-form-item.tsx");
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



const withNumberedItemContext = (Component)=>{
    var _s = $RefreshSig$();
    const FormItemWithNumberedListContext = (props)=>{
        _s();
        const hasNumberedContext = (0,_numbered_list_provider_numbered_list_use_numbered_list_optional__WEBPACK_IMPORTED_MODULE_2__.useNumberedListOptional)() !== undefined;
        if (!hasNumberedContext) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                ...props
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/item/with-numbered-item-context.tsx",
                lineNumber: 24,
                columnNumber: 14
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_numbered_list_form_item_numbered_form_item__WEBPACK_IMPORTED_MODULE_3__.NumberedFormItem, {
            Component: Component,
            componentProps: props
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/item/with-numbered-item-context.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, undefined);
    };
    _s(FormItemWithNumberedListContext, "6BeB8i3vjLNHdBrAvUFFkO7CHpQ=", false, function() {
        return [
            _numbered_list_provider_numbered_list_use_numbered_list_optional__WEBPACK_IMPORTED_MODULE_2__.useNumberedListOptional
        ];
    });
    const NewFormItem = FormItemWithNumberedListContext;
    NewFormItem.useStatus = Component.useStatus;
    return NewFormItem;
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
"./js/src/core/components/form/keyed-list/form-item/keyed-form-item-control.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KeyedFormItemControl: () => (KeyedFormItemControl)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _provider_keyed_list_use_keyed_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/keyed-list/provider/keyed-list/use-keyed-list.ts");
/* ESM import */var _item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/item/provider/item/use-item.ts");
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



const KeyedFormItemControl = (param)=>{
    let { children, onChange: baseOnChange, value: baseValue, ...props } = param;
    _s();
    const { operations, getAdditionalComponentProps } = (0,_provider_keyed_list_use_keyed_list__WEBPACK_IMPORTED_MODULE_2__.useKeyedList)();
    const { name } = (0,_item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_3__.useItem)();
    const Child = react__WEBPACK_IMPORTED_MODULE_1__.Children.only(children);
    const value = operations.getValue(name);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        operations.update(name, value ?? null, true);
    }, []);
    const onChange = (value)=>{
        if ((value === null || value === void 0 ? void 0 : value.target) !== undefined && typeof value.target === 'object') {
            operations.update(name, value.target.value, false);
            return;
        }
        operations.update(name, value, false);
    };
    if (!/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.isValidElement)(Child)) {
        throw new Error('KeyedFormItemControl only accepts a single child');
    }
    const Component = Child.type;
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
            ...Child.props,
            ...props,
            ...getAdditionalComponentProps === null || getAdditionalComponentProps === void 0 ? void 0 : getAdditionalComponentProps(name),
            onChange: onChange,
            value: value
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/keyed-list/form-item/keyed-form-item-control.tsx",
            lineNumber: 53,
            columnNumber: 5
        }, undefined), [
        Child.props,
        props,
        value
    ]);
};
_s(KeyedFormItemControl, "ZoxU0E3qe9LZ2ICSMY+ceGFJ4zA=", false, function() {
    return [
        _provider_keyed_list_use_keyed_list__WEBPACK_IMPORTED_MODULE_2__.useKeyedList,
        _item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_3__.useItem
    ];
});
_c = KeyedFormItemControl;
var _c;
$RefreshReg$(_c, "KeyedFormItemControl");

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
"./js/src/core/components/form/keyed-list/form-item/keyed-form-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KeyedFormItem: () => (KeyedFormItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _keyed_form_item_control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/keyed-list/form-item/keyed-form-item-control.tsx");
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


const KeyedFormItem = (param)=>{
    let { Component, componentProps } = param;
    _s();
    const { children, ...baseProps } = componentProps;
    const currentChildren = children;
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
            ...baseProps,
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_keyed_form_item_control__WEBPACK_IMPORTED_MODULE_2__.KeyedFormItemControl, {
                children: currentChildren
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/keyed-list/form-item/keyed-form-item.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/keyed-list/form-item/keyed-form-item.tsx",
            lineNumber: 28,
            columnNumber: 5
        }, undefined), [
        baseProps.name
    ]);
};
_s(KeyedFormItem, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = KeyedFormItem;
var _c;
$RefreshReg$(_c, "KeyedFormItem");

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
"./js/src/core/components/form/keyed-list/iterator/keyed-list-iterator.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KeyedListIterator: () => (KeyedListIterator)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _provider_keyed_list_use_keyed_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/keyed-list/provider/keyed-list/use-keyed-list.ts");
/* ESM import */var _form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/form.tsx");
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



const KeyedListIterator = (param)=>{
    let { children } = param;
    _s();
    const { values } = (0,_provider_keyed_list_use_keyed_list__WEBPACK_IMPORTED_MODULE_2__.useKeyedList)();
    const getValuesIterator = ()=>{
        return Object.keys(values).map((key)=>{
            return {
                key,
                value: values[key]
            };
        });
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: getValuesIterator().map((param)=>{
            let { key, value } = param;
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_form__WEBPACK_IMPORTED_MODULE_3__.Form.Group, {
                name: key,
                children: children
            }, key, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/keyed-list/iterator/keyed-list-iterator.tsx",
                lineNumber: 38,
                columnNumber: 11
            }, undefined);
        })
    }, void 0, false);
};
_s(KeyedListIterator, "TpSurIK6Nh3dwL0fgmWBzg943CQ=", false, function() {
    return [
        _provider_keyed_list_use_keyed_list__WEBPACK_IMPORTED_MODULE_2__.useKeyedList
    ];
});
_c = KeyedListIterator;
var _c;
$RefreshReg$(_c, "KeyedListIterator");

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
"./js/src/core/components/form/keyed-list/keyed-list.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KeyedList: () => (KeyedList)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _provider_keyed_list_keyed_list_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/keyed-list/provider/keyed-list/keyed-list-provider.tsx");
/* ESM import */var _iterator_keyed_list_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/form/keyed-list/iterator/keyed-list-iterator.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var _item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/form/item/provider/item/use-item.ts");
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






const KeyedList = (param)=>{
    let { children, value: baseValue, onChange: baseOnChange, onFieldChange, getAdditionalComponentProps } = param;
    _s();
    const initialValue = (0,lodash__WEBPACK_IMPORTED_MODULE_5__.isArray)(baseValue) ? {} : baseValue ?? {};
    const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)((0,lodash__WEBPACK_IMPORTED_MODULE_5__.cloneDeep)(initialValue));
    const { name } = (0,_item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_6__.useItem)();
    const onChange = (newValue)=>{
        baseOnChange !== undefined && baseOnChange(newValue);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const timeoutId = setTimeout(()=>{
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_5__.isEqual)(value, initialValue)) {
                onChange(value);
            }
        }, 300);
        return ()=>{
            clearTimeout(timeoutId);
        };
    }, [
        value
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_5__.isEqual)(value, initialValue)) {
            setValue(initialValue);
        }
    }, [
        baseValue
    ]);
    const add = function(key) {
        let newValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        setValue((currentValue)=>{
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_5__.isObject)(currentValue) && currentValue[key] !== undefined) {
                return currentValue;
            }
            const _newValue = (0,lodash__WEBPACK_IMPORTED_MODULE_5__.cloneDeep)(currentValue);
            _newValue[key] = newValue;
            return _newValue;
        });
    };
    const remove = (key)=>{
        const newValue = (0,lodash__WEBPACK_IMPORTED_MODULE_5__.cloneDeep)(value);
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete newValue[key];
        setValue(()=>newValue);
    };
    const update = (subFieldname, newSubValue, isInitialValue)=>{
        const currentName = (0,lodash__WEBPACK_IMPORTED_MODULE_5__.isArray)(name) ? name : [
            name
        ];
        const currentSubFieldname = (0,lodash__WEBPACK_IMPORTED_MODULE_5__.isArray)(subFieldname) ? subFieldname : [
            subFieldname
        ];
        const nameDifference = [];
        for(let i = 0; i < currentSubFieldname.length; i++){
            if (currentName[i] !== currentSubFieldname[i]) {
                nameDifference.push(currentSubFieldname[i]);
            }
        }
        if (!isInitialValue) {
            onFieldChange === null || onFieldChange === void 0 ? void 0 : onFieldChange(currentSubFieldname, newSubValue);
        }
        const setAsObject = (obj)=>{
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_5__.isUndefined)(obj)) {
                return {};
            }
            return obj;
        };
        setValue((currentValue)=>{
            const newValue = (0,lodash__WEBPACK_IMPORTED_MODULE_5__.cloneDeep)(currentValue);
            (0,lodash__WEBPACK_IMPORTED_MODULE_5__.setWith)(newValue, nameDifference, newSubValue, setAsObject);
            return newValue;
        });
    };
    const getValue = (subFieldNames)=>{
        const currentName = (0,lodash__WEBPACK_IMPORTED_MODULE_5__.isArray)(name) ? name : [
            name
        ];
        const nameDifference = [];
        for(let i = 0; i < subFieldNames.length; i++){
            if (currentName[i] !== subFieldNames[i]) {
                nameDifference.push(subFieldNames[i]);
            }
        }
        return (0,lodash__WEBPACK_IMPORTED_MODULE_5__.get)(value, nameDifference);
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_provider_keyed_list_keyed_list_provider__WEBPACK_IMPORTED_MODULE_3__.KeyedListProvider, {
            getAdditionalComponentProps: getAdditionalComponentProps,
            onChange: onChange,
            operations: {
                add,
                remove,
                update,
                getValue
            },
            values: value ?? {},
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_form__WEBPACK_IMPORTED_MODULE_1__.Form.Group, {
                name: name,
                children: children
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/keyed-list/keyed-list.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/keyed-list/keyed-list.tsx",
            lineNumber: 120,
            columnNumber: 5
        }, undefined), [
        name,
        value,
        children,
        onChange,
        add,
        remove,
        update,
        getValue
    ]);
};
_s(KeyedList, "d12jzrIexBw29lne+pwuvB8f3UY=", false, function() {
    return [
        _item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_6__.useItem
    ];
});
_c = KeyedList;
KeyedList.Iterator = _iterator_keyed_list_iterator__WEBPACK_IMPORTED_MODULE_4__.KeyedListIterator;

var _c;
$RefreshReg$(_c, "KeyedList");

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
"./js/src/core/components/form/keyed-list/provider/keyed-list/keyed-list-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KeyedListContext: () => (KeyedListContext),
  KeyedListProvider: () => (KeyedListProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

const KeyedListContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const KeyedListProvider = (param)=>{
    let { children, ...props } = param;
    _s();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(KeyedListContext.Provider, {
            value: {
                ...props
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/keyed-list/provider/keyed-list/keyed-list-provider.tsx",
            lineNumber: 43,
            columnNumber: 5
        }, undefined), [
        props,
        children
    ]);
};
_s(KeyedListProvider, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = KeyedListProvider;
var _c;
$RefreshReg$(_c, "KeyedListProvider");

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
"./js/src/core/components/form/keyed-list/provider/keyed-list/use-keyed-list-optional.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useKeyedListOptional: () => (useKeyedListOptional)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _keyed_list_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/form/keyed-list/provider/keyed-list/keyed-list-provider.tsx");
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

const useKeyedListOptional = ()=>{
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_keyed_list_provider__WEBPACK_IMPORTED_MODULE_1__.KeyedListContext);
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
"./js/src/core/components/form/keyed-list/provider/keyed-list/use-keyed-list.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useKeyedList: () => (useKeyedList)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _keyed_list_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/form/keyed-list/provider/keyed-list/keyed-list-provider.tsx");
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

const useKeyedList = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_keyed_list_provider__WEBPACK_IMPORTED_MODULE_1__.KeyedListContext);
    if (context === undefined) {
        throw new Error('useKeyedList must be used within a KeyedListProvider');
    }
    const getValueByKey = (key)=>{
        return context.values[key];
    };
    return {
        ...context,
        getValueByKey
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
"./js/src/core/components/form/numbered-list/form-item/numbered-form-item-control.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NumberedFormItemControl: () => (NumberedFormItemControl)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _provider_numbered_list_use_numbered_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/numbered-list/provider/numbered-list/use-numbered-list.ts");
/* ESM import */var _item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/item/provider/item/use-item.ts");
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



const NumberedFormItemControl = (param)=>{
    let { children, onChange: baseOnChange, value: baseValue, ...props } = param;
    _s();
    const { operations, getAdditionalComponentProps } = (0,_provider_numbered_list_use_numbered_list__WEBPACK_IMPORTED_MODULE_2__.useNumberedList)();
    const { name } = (0,_item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_3__.useItem)();
    const Child = react__WEBPACK_IMPORTED_MODULE_1__.Children.only(children);
    const value = operations.getValue(name);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        operations.update(name, value ?? null, true);
    }, []);
    const onChange = (value)=>{
        if ((value === null || value === void 0 ? void 0 : value.target) !== undefined && typeof value.target === 'object') {
            operations.update(name, value.target.value, false);
            return;
        }
        operations.update(name, value, false);
    };
    if (!/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.isValidElement)(Child)) {
        throw new Error('NumberedFormItemControl only accepts a single child');
    }
    const Component = Child.type;
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
            ...Child.props,
            ...props,
            ...getAdditionalComponentProps === null || getAdditionalComponentProps === void 0 ? void 0 : getAdditionalComponentProps(name),
            onChange: onChange,
            value: value
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/numbered-list/form-item/numbered-form-item-control.tsx",
            lineNumber: 53,
            columnNumber: 5
        }, undefined), [
        Child.props,
        props,
        value
    ]);
};
_s(NumberedFormItemControl, "RIrdwSxkcjTHP39A/E5veP5ldKE=", false, function() {
    return [
        _provider_numbered_list_use_numbered_list__WEBPACK_IMPORTED_MODULE_2__.useNumberedList,
        _item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_3__.useItem
    ];
});
_c = NumberedFormItemControl;
var _c;
$RefreshReg$(_c, "NumberedFormItemControl");

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
"./js/src/core/components/form/numbered-list/form-item/numbered-form-item.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NumberedFormItem: () => (NumberedFormItem)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _numbered_form_item_control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/numbered-list/form-item/numbered-form-item-control.tsx");
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


const NumberedFormItem = (param)=>{
    let { Component, componentProps } = param;
    const { children, ...baseProps } = componentProps;
    const currentChildren = children;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
        ...baseProps,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_numbered_form_item_control__WEBPACK_IMPORTED_MODULE_2__.NumberedFormItemControl, {
            children: currentChildren
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/numbered-list/form-item/numbered-form-item.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/numbered-list/form-item/numbered-form-item.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, undefined);
};
_c = NumberedFormItem;
var _c;
$RefreshReg$(_c, "NumberedFormItem");

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
"./js/src/core/components/form/numbered-list/iterator/numbered-list-iterator.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NumberedListIterator: () => (NumberedListIterator)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _provider_numbered_list_use_numbered_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/form/numbered-list/provider/numbered-list/use-numbered-list.ts");
/* ESM import */var _form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/form.tsx");
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



const NumberedListIterator = (param)=>{
    let { children } = param;
    _s();
    const { values } = (0,_provider_numbered_list_use_numbered_list__WEBPACK_IMPORTED_MODULE_2__.useNumberedList)();
    const getValuesIterator = ()=>{
        return Object.keys(values).map((key)=>{
            return {
                key,
                value: values[key]
            };
        });
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: getValuesIterator().map((param)=>{
            let { key, value } = param;
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_form__WEBPACK_IMPORTED_MODULE_3__.Form.Group, {
                name: key,
                children: children
            }, key, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/numbered-list/iterator/numbered-list-iterator.tsx",
                lineNumber: 38,
                columnNumber: 11
            }, undefined);
        })
    }, void 0, false);
};
_s(NumberedListIterator, "e6q/l8h56Lstppaj/gbT5XP9zDg=", false, function() {
    return [
        _provider_numbered_list_use_numbered_list__WEBPACK_IMPORTED_MODULE_2__.useNumberedList
    ];
});
_c = NumberedListIterator;
var _c;
$RefreshReg$(_c, "NumberedListIterator");

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
"./js/src/core/components/form/numbered-list/numbered-list.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NumberedList: () => (NumberedList)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/form/form.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _provider_numbered_list_numbered_list_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/form/numbered-list/provider/numbered-list/numbered-list-provider.tsx");
/* ESM import */var _iterator_numbered_list_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/form/numbered-list/iterator/numbered-list-iterator.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* ESM import */var _item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/form/item/provider/item/use-item.ts");
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






const NumberedList = (param)=>{
    let { children, value: baseValue, onChange: baseOnChange, onFieldChange, getAdditionalComponentProps } = param;
    _s();
    const initialValue = baseValue ?? [];
    const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)((0,lodash__WEBPACK_IMPORTED_MODULE_5__.cloneDeep)(initialValue));
    const { name: tempItemName } = (0,_item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_6__.useItem)();
    const itemName = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>(0,lodash__WEBPACK_IMPORTED_MODULE_5__.isArray)(tempItemName) ? tempItemName : [
            tempItemName
        ], [
        tempItemName
    ]);
    const name = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>itemName[itemName.length - 1], [
        itemName
    ]);
    const onChange = (newValue)=>{
        baseOnChange !== undefined && baseOnChange(newValue);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const timeoutId = setTimeout(()=>{
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_5__.isEqual)(value, initialValue)) {
                onChange(value);
            }
        }, 300);
        return ()=>{
            clearTimeout(timeoutId);
        };
    }, [
        value
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_5__.isEqual)(value, initialValue)) {
            setValue(initialValue);
        }
    }, [
        baseValue
    ]);
    const add = (newValue, key)=>{
        let currentKey = key;
        if (currentKey === undefined) {
            currentKey = value.length;
        }
        setValue((currentValue)=>{
            const _newValue = (0,lodash__WEBPACK_IMPORTED_MODULE_5__.cloneDeep)(currentValue);
            _newValue.splice(currentKey, 0, newValue);
            return _newValue;
        });
    };
    const remove = (key)=>{
        const newValue = (0,lodash__WEBPACK_IMPORTED_MODULE_5__.cloneDeep)(value);
        newValue.splice(key, 1);
        setValue(()=>newValue);
    };
    const update = (subFieldname, newSubValue, isInitialValue)=>{
        const currentName = itemName;
        const currentSubFieldname = subFieldname;
        const nameDifference = [];
        for(let i = 0; i < currentSubFieldname.length; i++){
            if (currentName[i] !== currentSubFieldname[i]) {
                nameDifference.push(currentSubFieldname[i]);
            }
        }
        if (!isInitialValue) {
            onFieldChange === null || onFieldChange === void 0 ? void 0 : onFieldChange(currentSubFieldname, newSubValue);
        }
        setValue((currentValue)=>{
            const newValue = (0,lodash__WEBPACK_IMPORTED_MODULE_5__.cloneDeep)(currentValue);
            (0,lodash__WEBPACK_IMPORTED_MODULE_5__.set)(newValue, nameDifference, newSubValue);
            return newValue;
        });
    };
    const move = (from, to)=>{
        setValue((currentValue)=>{
            const newValue = (0,lodash__WEBPACK_IMPORTED_MODULE_5__.cloneDeep)(currentValue);
            const [removed] = newValue.splice(from, 1);
            newValue.splice(to, 0, removed);
            return newValue;
        });
    };
    const getValue = (subFieldNames)=>{
        const currentName = itemName;
        const nameDifference = [];
        for(let i = 0; i < subFieldNames.length; i++){
            if (currentName[i] !== subFieldNames[i]) {
                nameDifference.push(subFieldNames[i]);
            }
        }
        return (0,lodash__WEBPACK_IMPORTED_MODULE_5__.get)(value, nameDifference);
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_provider_numbered_list_numbered_list_provider__WEBPACK_IMPORTED_MODULE_3__.NumberedListProvider, {
            getAdditionalComponentProps: getAdditionalComponentProps,
            onChange: onChange,
            operations: {
                add,
                remove,
                update,
                move,
                getValue
            },
            values: value ?? {},
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_form__WEBPACK_IMPORTED_MODULE_1__.Form.Group, {
                name: name,
                children: children
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/numbered-list/numbered-list.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/numbered-list/numbered-list.tsx",
            lineNumber: 124,
            columnNumber: 5
        }, undefined), [
        name,
        value,
        children,
        onChange,
        add,
        remove,
        update,
        getValue
    ]);
};
_s(NumberedList, "90PGhuk5whOvhjJhk8viBgh37gA=", false, function() {
    return [
        _item_provider_item_use_item__WEBPACK_IMPORTED_MODULE_6__.useItem
    ];
});
_c = NumberedList;
NumberedList.Iterator = _iterator_numbered_list_iterator__WEBPACK_IMPORTED_MODULE_4__.NumberedListIterator;

var _c;
$RefreshReg$(_c, "NumberedList");

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
"./js/src/core/components/form/numbered-list/provider/numbered-list/numbered-list-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NumberedListContext: () => (NumberedListContext),
  NumberedListProvider: () => (NumberedListProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

const NumberedListContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const NumberedListProvider = (param)=>{
    let { children, ...props } = param;
    _s();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(NumberedListContext.Provider, {
            value: {
                ...props
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/form/numbered-list/provider/numbered-list/numbered-list-provider.tsx",
            lineNumber: 44,
            columnNumber: 5
        }, undefined), [
        props,
        children
    ]);
};
_s(NumberedListProvider, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = NumberedListProvider;
var _c;
$RefreshReg$(_c, "NumberedListProvider");

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
"./js/src/core/components/form/numbered-list/provider/numbered-list/use-numbered-list-optional.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useNumberedListOptional: () => (useNumberedListOptional)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _numbered_list_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/form/numbered-list/provider/numbered-list/numbered-list-provider.tsx");
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

const useNumberedListOptional = ()=>{
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_numbered_list_provider__WEBPACK_IMPORTED_MODULE_1__.NumberedListContext);
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
"./js/src/core/components/form/numbered-list/provider/numbered-list/use-numbered-list.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useNumberedList: () => (useNumberedList)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _numbered_list_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/form/numbered-list/provider/numbered-list/numbered-list-provider.tsx");
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

const useNumberedList = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_numbered_list_provider__WEBPACK_IMPORTED_MODULE_1__.NumberedListContext);
    if (context === undefined) {
        throw new Error('useNumberedList must be used within a NumberedListProvider');
    }
    const getValueByKey = (key)=>{
        return context.values[key];
    };
    return {
        ...context,
        getValueByKey
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
"./js/src/core/components/icon-button/icon-button.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        button: css`
      padding: 6px;
      height: 32px;
      width: 32px;
      line-height: 0;

      &.icon-button--theme-secondary {
        color: ${token.colorText};
      }
      
      &.icon-button--hide-shadow {
        box-shadow: none;
      }

      &.icon-button--variant-minimal {
        padding: 0;
        width: auto;
        height: auto;
      }

      &.icon-button--variant-static {
        width: 24px;
        height: 24px;
        padding: 4px;
        border: 1px solid ${token.colorBorderContainer};
        background-color: ${token.IconButton.colorBgContainer};
        border-radius: ${token.IconButton.borderRadiusSM};

        &:hover, &:disabled, &:active {
          border-color: ${token.colorBorderContainer} !important;
        }

        &:focus-visible {
          outline: none !important;
          outline-offset: 0 !important;
        }
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
"./js/src/core/components/icon-button/icon-button.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  IconButton: () => (IconButton)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _button_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var _icon_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _icon_button_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon-button/icon-button.styles.ts");
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





const Component = (props, ref)=>{
    _s();
    const { children, icon, type = 'link', theme = 'primary', hideShadow = false, variant, className, ...buttonProps } = props;
    const { styles } = (0,_icon_button_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles)();
    const iconButtonClassNames = classnames__WEBPACK_IMPORTED_MODULE_2___default()(styles.button, `icon-button--theme-${theme}`, `icon-button--variant-${variant}`, {
        'icon-button--hide-shadow': hideShadow
    }, className);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_button_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
        type: type,
        ...buttonProps,
        className: iconButtonClassNames,
        ref: ref,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
            ...icon
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon-button/icon-button.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon-button/icon-button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, undefined);
};
_s(Component, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _icon_button_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles
    ];
});
_c = Component;
const IconButton = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(Component);
_c1 = IconButton;
var _c, _c1;
$RefreshReg$(_c, "Component");
$RefreshReg$(_c1, "IconButton");

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
"./js/src/core/components/icon-text-button/icon-text-button.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  IconTextButton: () => (IconTextButton)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _button_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/button/button.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
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




const IconTextButton = (param)=>{
    let { icon, children, iconOptions, iconPlacement = 'left', ...buttonProps } = param;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_button_button__WEBPACK_IMPORTED_MODULE_1__.Button, {
        ...buttonProps,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_4__.Flex, {
            align: "center",
            gap: 6,
            justify: "center",
            children: [
                iconPlacement === 'left' && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                    ...icon
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon-text-button/icon-text-button.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                    children: children
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon-text-button/icon-text-button.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, undefined),
                iconPlacement === 'right' && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                    ...icon
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon-text-button/icon-text-button.tsx",
                    lineNumber: 44,
                    columnNumber: 11
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon-text-button/icon-text-button.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon-text-button/icon-text-button.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, undefined);
};
_c = IconTextButton;
var _c;
$RefreshReg$(_c, "IconTextButton");

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
"./js/src/core/components/icon/icon.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        subIcon: css`
      position: absolute;
      width: 10px;
      height: 10px;
      left: -5px;
      top: 50%;
      transform: translateY(-50%);

      & svg {
        color: ${token.gold7};
        background: ${token.gold1};
        border-radius: ${token.borderRadiusLG}px;
      }

      &.sub-icon-variant--green {
        & svg {
          color: ${token.green7};
        }
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
"./js/src/core/components/icon/icon.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Icon: () => (Icon)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _icon_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/icon/icon.styles.ts");
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





const Icon = (param)=>{
    let { value, type = 'name', options, className, subIconName, subIconVariant = 'default', ...props } = param;
    _s();
    const iconLibrary = (0,_Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_1__.useInjection)(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_3__.serviceIds.iconLibrary);
    const width = (options === null || options === void 0 ? void 0 : options.width) ?? 16;
    const height = (options === null || options === void 0 ? void 0 : options.height) ?? 16;
    const { styles } = (0,_icon_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles)();
    const renderIcon = ()=>{
        if (type === 'path') {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("img", {
                alt: '',
                className: "pimcore-icon__image",
                src: value,
                style: {
                    width,
                    height
                }
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon/icon.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, undefined);
        }
        const SvgIcon = iconLibrary.get(value);
        if (SvgIcon === undefined) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                style: {
                    width,
                    height
                }
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon/icon.tsx",
                lineNumber: 53,
                columnNumber: 14
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SvgIcon, {
            height: height,
            width: width,
            ...options
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon/icon.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, undefined);
    };
    const SubIcon = (0,lodash__WEBPACK_IMPORTED_MODULE_4__.isUndefined)(subIconName) ? undefined : iconLibrary.get(subIconName);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: `pimcore-icon pimcore-icon-${value} anticon ${className}`,
        style: {
            width,
            height,
            position: 'relative'
        },
        ...props,
        children: [
            !(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isNil)(SubIcon) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: `${styles.subIcon} sub-icon-variant--${subIconVariant}`,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SubIcon, {}, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon/icon.tsx",
                    lineNumber: 74,
                    columnNumber: 84
                }, undefined)
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon/icon.tsx",
                lineNumber: 74,
                columnNumber: 9
            }, undefined),
            renderIcon()
        ]
    }, void 0, true, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon/icon.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, undefined);
};
_s(Icon, "zjQcLe4HJ4rGTcr7ocSOc9XDC10=", false, function() {
    return [
        _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_1__.useInjection,
        _icon_styles__WEBPACK_IMPORTED_MODULE_5__.useStyles
    ];
});
_c = Icon;
var _c;
$RefreshReg$(_c, "Icon");

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
"./js/src/core/components/space/space.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { css, token } = param;
    return {
        space: css`
      &.space--sizing-none {
        gap: 0;
      }

      &.space--sizing-mini {
        gap: ${token.sizeXXS}px;
      }

      &.space--sizing-extra-small {
        gap: ${token.sizeXS}px;
      }

      &.space--sizing-small {
        gap: ${token.sizeSM}px;
      }

      &.space--sizing-normal {
        gap: ${token.size}px;
      }

      &.space--sizing-medium {
        gap: ${token.sizeMD}px;
      }

      &.space--sizing-large {
        gap: ${token.sizeLG}px;
      }

      &.space--sizing-extra-large {
        gap: ${token.sizeXL}px;
      }

      &.space--sizing-maxi {
        gap: ${token.sizeXXL}px;
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
"./js/src/core/components/space/space.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Space: () => (Space)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _space_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/space/space.styles.ts");
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



const Space = (param)=>{
    let { size = 'small', className, ...props } = param;
    _s();
    const { styles } = (0,_space_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
    const classes = [
        styles.space,
        className
    ];
    classes.push(`space--sizing-${size}`);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Space, {
        className: classes.join(' '),
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/space/space.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, undefined);
};
_s(Space, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _space_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles
    ];
});
_c = Space;
var _c;
$RefreshReg$(_c, "Space");

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
"./js/src/core/components/spin/spin.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        spin: css`
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes spin-dot {
        0% {
          opacity: 0.3;
        } 
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0.3;
        }
      }

      animation-name: spin;
      animation-duration: 2s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;

      circle {
        animation: spin-dot 2s infinite;

        &:nth-child(1) {
          animation-delay: 0.5s;
        }

        &:nth-child(2) {
          animation-delay: 1.5s;
        }

        &:nth-child(3) {
          animation-delay: 1s;
        }

        
        &:nth-child(4) {
          animation-delay: 2s;
        }
      }
    `,
        spinContainer: css`
      display: flex;
      flex-direction: column;
      gap: 8px;
      justify-content: center;
      align-items: center;
      height: 100px;
      width: 100px;
      color: ${token.colorPrimary};
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
"./js/src/core/components/spin/spin.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Spin: () => (Spin)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _ant_design_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@ant-design/icons/es/icons/LoadingOutlined.js");
/* ESM import */var _icon_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var _spin_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/spin/spin.styles.tsx");
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





const Spin = (param)=>{
    let { asContainer = false, type = 'dotted', tip, ...props } = param;
    _s();
    const { styles } = (0,_spin_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    let icon = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
        className: styles.spin,
        value: "spinner"
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/spin/spin.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, undefined);
    if (type === 'classic') {
        icon = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__["default"], {
            spin: true
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/spin/spin.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, undefined);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            !asContainer && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: icon
            }, void 0, false),
            asContainer && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: styles.spinContainer,
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Spin, {
                        indicator: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: icon
                        }, void 0, false),
                        ...props
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/spin/spin.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, undefined),
                    tip !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        children: tip
                    }, void 0, false, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/spin/spin.tsx",
                        lineNumber: 59,
                        columnNumber: 13
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/spin/spin.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true);
};
_s(Spin, "1BGFRu6BGAbhzJ8kKgs1GUjvI6w=", false, function() {
    return [
        _spin_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles
    ];
});
_c = Spin;
var _c;
$RefreshReg$(_c, "Spin");

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
"./js/src/core/components/text/text.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Text: () => (Text)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
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


const { Text: AntText } = antd__WEBPACK_IMPORTED_MODULE_2__.Typography;
const Text = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AntText, {
        ...props
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/text/text.tsx",
        lineNumber: 23,
        columnNumber: 10
    }, undefined);
};
_c = Text;
var _c;
$RefreshReg$(_c, "Text");

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
"./js/src/core/lib/dependency-injection/index.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createDiInstance: () => (createDiInstance)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_2__);
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


function createDiInstance() {
    var _window_Pimcore;
    const container = new inversify__WEBPACK_IMPORTED_MODULE_2__.Container();
    if (((_window_Pimcore = window.Pimcore) === null || _window_Pimcore === void 0 ? void 0 : _window_Pimcore.container) === undefined) {
        window.Pimcore = window.Pimcore ?? {};
        window.Pimcore.container = container;
    }
    const currentContainer = window.Pimcore.container;
    const ContainerContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(currentContainer);
    const ContainerProvider = (param)=>{
        let { children } = param;
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ContainerContext.Provider, {
            value: currentContainer,
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/lib/dependency-injection/index.tsx",
            lineNumber: 38,
            columnNumber: 12
        }, this);
    };
    const useInjection = function(identifier) {
        const container = currentContainer;
        return container.get(identifier);
    };
    const useOptionalInjection = function(identifier) {
        const container = currentContainer;
        return container.isBound(identifier) ? container.get(identifier) : null;
    };
    const useMultiInjection = function(identifier) {
        const container = currentContainer;
        return container.getAll(identifier);
    };
    return {
        container: currentContainer,
        ContainerContext,
        ContainerProvider,
        useInjection,
        useOptionalInjection,
        useMultiInjection
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
"./js/src/core/modules/app/settings/settings-slice.gen.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addTagTypes: () => (addTagTypes),
  api: () => (injectedRtkApi),
  useAssetCustomSettingsGetByIdQuery: () => (useAssetCustomSettingsGetByIdQuery),
  useSystemSettingsGetQuery: () => (useSystemSettingsGetQuery)
});
/* ESM import */var _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/api/pimcore/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

const addTagTypes = [
    "Assets",
    "Settings"
];
const injectedRtkApi = _app_api_pimcore_index__WEBPACK_IMPORTED_MODULE_0__.api.enhanceEndpoints({
    addTagTypes
}).injectEndpoints({
    endpoints: (build)=>({
            assetCustomSettingsGetById: build.query({
                query: (queryArg)=>({
                        url: `/pimcore-studio/api/assets/${queryArg.id}/custom-settings`
                    }),
                providesTags: [
                    "Assets"
                ]
            }),
            systemSettingsGet: build.query({
                query: ()=>({
                        url: `/pimcore-studio/api/settings`
                    }),
                providesTags: [
                    "Settings"
                ]
            })
        }),
    overrideExisting: false
});

const { useAssetCustomSettingsGetByIdQuery, useSystemSettingsGetQuery } = injectedRtkApi;

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
"./js/src/core/modules/asset/asset-draft-error-slice.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addFailedDraftId: () => (addFailedDraftId),
  "default": () => (__WEBPACK_DEFAULT_EXPORT__),
  isFailedDraftId: () => (isFailedDraftId),
  removeFailedDraftId: () => (removeFailedDraftId)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
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
    failedDraftIds: []
};
const assetErrorSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({
    name: 'asset-draft-error',
    initialState,
    reducers: {
        addFailedDraftId: (state, action)=>{
            if (!state.failedDraftIds.includes(action.payload)) {
                state.failedDraftIds.push(action.payload);
            }
        },
        removeFailedDraftId: (state, action)=>{
            state.failedDraftIds = state.failedDraftIds.filter((id)=>id !== action.payload);
        }
    }
});
const { addFailedDraftId, removeFailedDraftId } = assetErrorSlice.actions;
const isFailedDraftId = (state, id)=>{
    return state['asset-draft-error'].failedDraftIds.includes(id);
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (assetErrorSlice.reducer);
(0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.injectSliceWithState)(assetErrorSlice);

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
"./js/src/core/modules/asset/asset-draft-slice.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addCustomMetadataToAsset: () => (addCustomMetadataToAsset),
  addImageSettingsToAsset: () => (addImageSettingsToAsset),
  addPropertyToAsset: () => (addPropertyToAsset),
  addScheduleToAsset: () => (addScheduleToAsset),
  assetReceived: () => (assetReceived),
  assetsAdapter: () => (assetsAdapter),
  removeAsset: () => (removeAsset),
  removeCustomMetadataFromAsset: () => (removeCustomMetadataFromAsset),
  removeCustomSettingsFromAsset: () => (removeCustomSettingsFromAsset),
  removeImageSettingFromAsset: () => (removeImageSettingFromAsset),
  removePropertyFromAsset: () => (removePropertyFromAsset),
  removeScheduleFromAsset: () => (removeScheduleFromAsset),
  resetAsset: () => (resetAsset),
  resetChanges: () => (resetChanges),
  resetSchedulesChangesForAsset: () => (resetSchedulesChangesForAsset),
  selectAssetById: () => (selectAssetById),
  setActiveTabForAsset: () => (setActiveTabForAsset),
  setCustomMetadataForAsset: () => (setCustomMetadataForAsset),
  setCustomSettingsForAsset: () => (setCustomSettingsForAsset),
  setModifiedCells: () => (setModifiedCells),
  setPropertiesForAsset: () => (setPropertiesForAsset),
  setSchedulesForAsset: () => (setSchedulesForAsset),
  slice: () => (slice),
  updateAllCustomMetadataForAsset: () => (updateAllCustomMetadataForAsset),
  updateCustomMetadataForAsset: () => (updateCustomMetadataForAsset),
  updateImageSettingForAsset: () => (updateImageSettingForAsset),
  updatePropertyForAsset: () => (updatePropertyForAsset),
  updateScheduleForAsset: () => (updateScheduleForAsset),
  updateTextDataForAsset: () => (updateTextDataForAsset)
});
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-properties.ts");
/* ESM import */var _Pimcore_modules_asset_draft_hooks_use_custom_metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/draft/hooks/use-custom-metadata.ts");
/* ESM import */var _Pimcore_modules_asset_draft_hooks_use_custom_settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/asset/draft/hooks/use-custom-settings.ts");
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_trackable_changes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-trackable-changes.ts");
/* ESM import */var _Pimcore_modules_asset_draft_hooks_use_image_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/asset/draft/hooks/use-image-settings.ts");
/* ESM import */var _Pimcore_modules_asset_draft_hooks_use_text_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/asset/draft/hooks/use-text-settings.ts");
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_schedules__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-schedules.ts");
/* ESM import */var _element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-tabs.ts");
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









const assetsAdapter = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_9__.createEntityAdapter)({});
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_9__.createSlice)({
    name: 'asset-draft',
    initialState: assetsAdapter.getInitialState({
        modified: false,
        properties: [],
        customMetadata: [],
        customSettings: [],
        textData: {},
        imageSettings: [],
        schedule: [],
        changes: {},
        modifiedCells: {},
        ..._element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_8__.initialTabsStateValue
    }),
    reducers: {
        assetReceived: assetsAdapter.upsertOne,
        removeAsset (state, action) {
            assetsAdapter.removeOne(state, action.payload);
        },
        resetAsset (state, action) {
            if (state.entities[action.payload] !== undefined) {
                state.entities[action.payload] = assetsAdapter.getInitialState({
                    modified: false,
                    properties: [],
                    changes: {}
                }).entities[action.payload];
            }
        },
        ...(0,_Pimcore_modules_element_draft_hooks_use_trackable_changes__WEBPACK_IMPORTED_MODULE_4__.useTrackableChangesReducers)(assetsAdapter),
        ...(0,_Pimcore_modules_element_draft_hooks_use_properties__WEBPACK_IMPORTED_MODULE_1__.usePropertiesReducers)(assetsAdapter),
        ...(0,_Pimcore_modules_element_draft_hooks_use_schedules__WEBPACK_IMPORTED_MODULE_7__.useSchedulesReducers)(assetsAdapter),
        ...(0,_Pimcore_modules_asset_draft_hooks_use_custom_metadata__WEBPACK_IMPORTED_MODULE_2__.useCustomMetadataReducers)(assetsAdapter),
        ...(0,_Pimcore_modules_asset_draft_hooks_use_custom_settings__WEBPACK_IMPORTED_MODULE_3__.useCustomSettingsReducers)(assetsAdapter),
        ...(0,_Pimcore_modules_asset_draft_hooks_use_image_settings__WEBPACK_IMPORTED_MODULE_5__.useImageSettingsReducers)(assetsAdapter),
        ...(0,_Pimcore_modules_asset_draft_hooks_use_text_settings__WEBPACK_IMPORTED_MODULE_6__.useTextDataReducers)(assetsAdapter),
        ...(0,_element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_8__.useTabsReducers)(assetsAdapter)
    }
});
(0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.injectSliceWithState)(slice);
const { assetReceived, removeAsset, resetAsset, resetChanges, setModifiedCells, addImageSettings: addImageSettingsToAsset, removeImageSetting: removeImageSettingFromAsset, updateImageSetting: updateImageSettingForAsset, addProperty: addPropertyToAsset, removeProperty: removePropertyFromAsset, setProperties: setPropertiesForAsset, updateProperty: updatePropertyForAsset, addSchedule: addScheduleToAsset, removeSchedule: removeScheduleFromAsset, setSchedules: setSchedulesForAsset, updateSchedule: updateScheduleForAsset, resetSchedulesChanges: resetSchedulesChangesForAsset, updateAllCustomMetadata: updateAllCustomMetadataForAsset, addCustomMetadata: addCustomMetadataToAsset, removeCustomMetadata: removeCustomMetadataFromAsset, updateCustomMetadata: updateCustomMetadataForAsset, setCustomMetadata: setCustomMetadataForAsset, setActiveTab: setActiveTabForAsset, updateTextData: updateTextDataForAsset, setCustomSettings: setCustomSettingsForAsset, removeCustomSettings: removeCustomSettingsFromAsset } = slice.actions;
const { selectById: selectAssetById } = assetsAdapter.getSelectors((state)=>state['asset-draft']);

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
"./js/src/core/modules/asset/asset-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AssetContext: () => (AssetContext),
  AssetProvider: () => (AssetProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

const AssetContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    id: 0
});
const AssetProvider = (param)=>{
    let { id, children } = param;
    _s();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AssetContext.Provider, {
            value: {
                id
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/asset/asset-provider.tsx",
            lineNumber: 29,
            columnNumber: 5
        }, undefined), [
        id
    ]);
};
_s(AssetProvider, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = AssetProvider;
var _c;
$RefreshReg$(_c, "AssetProvider");

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
"./js/src/core/modules/asset/draft/hooks/use-custom-metadata.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useCustomMetadataDraft: () => (useCustomMetadataDraft),
  useCustomMetadataReducers: () => (useCustomMetadataReducers)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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

const useCustomMetadataReducers = (entityAdapter)=>{
    const addCustomMetadata = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.customMetadata = [
                ...draft.customMetadata ?? [],
                action.payload.customMetadata
            ];
            markedAsModified(draft);
            return draft;
        });
    };
    const updateCustomMetadata = (state, action)=>{
        let found = false;
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.customMetadata = (draft.customMetadata ?? []).map((customMetadata, index)=>{
                if (customMetadata.name === action.payload.customMetadata.name && customMetadata.language === action.payload.customMetadata.language) {
                    markedAsModified(draft);
                    found = true;
                    return action.payload.customMetadata;
                }
                return customMetadata;
            });
            return draft;
        });
        if (!found) {
            addCustomMetadata(state, action);
        }
    };
    const removeCustomMetadata = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.customMetadata = (draft.customMetadata ?? []).filter((customMetadata)=>customMetadata.name !== action.payload.customMetadata.name || customMetadata.language !== action.payload.customMetadata.language);
            markedAsModified(draft);
            return draft;
        });
    };
    const updateAllCustomMetadata = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.customMetadata = action.payload.customMetadata;
            markedAsModified(draft);
            return draft;
        });
    };
    const setCustomMetadata = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.customMetadata = action.payload.customMetadata;
            return draft;
        });
    };
    const modifyDraft = (state, id, modification)=>{
        const draft = entityAdapter.getSelectors().selectById(state, id);
        if (draft === undefined) (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`Item with id ${id} not found`));
        state.entities[id] = modification({
            ...draft
        });
    };
    const markedAsModified = (draft)=>{
        draft.modified = true;
        draft.changes = {
            ...draft.changes,
            customMetadata: true
        };
    };
    return {
        addCustomMetadata,
        removeCustomMetadata,
        updateCustomMetadata,
        updateAllCustomMetadata,
        setCustomMetadata
    };
};
const useCustomMetadataDraft = (id, draft, updateCustomMetadataAction, addCustomMetadataAction, removeCustomMetadataAction, setCustomMetadataAction, updateAllCustomMetadataAction)=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    return {
        customMetadata: draft === null || draft === void 0 ? void 0 : draft.customMetadata,
        updateCustomMetadata: (customMetadata)=>{
            dispatch(updateCustomMetadataAction({
                id,
                customMetadata
            }));
        },
        addCustomMetadata: (customMetadata)=>{
            dispatch(addCustomMetadataAction({
                id,
                customMetadata
            }));
        },
        removeCustomMetadata: (customMetadata)=>{
            dispatch(removeCustomMetadataAction({
                id,
                customMetadata
            }));
        },
        updateAllCustomMetadata: (customMetadata)=>{
            dispatch(updateAllCustomMetadataAction({
                id,
                customMetadata
            }));
        },
        setCustomMetadata: (customMetadata)=>{
            dispatch(setCustomMetadataAction({
                id,
                customMetadata
            }));
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
"./js/src/core/modules/asset/draft/hooks/use-custom-settings.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useCustomSettingsDraft: () => (useCustomSettingsDraft),
  useCustomSettingsReducers: () => (useCustomSettingsReducers)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
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

const useCustomSettingsReducers = (entityAdapter)=>{
    const modifyDraft = (state, id, modification)=>{
        const draft = entityAdapter.getSelectors().selectById(state, id);
        if (draft === undefined) {
            console.error(`Item with id ${id} not found`);
            return;
        }
        state.entities[id] = modification({
            ...draft
        });
    };
    const markedAsModified = (draft)=>{
        draft.modified = true;
        draft.changes = {
            ...draft.changes,
            customSettings: true
        };
    };
    const setCustomSettings = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            const { customSettings } = action.payload;
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(customSettings) && !(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(customSettings.key)) {
                const currentState = state.entities[action.payload.id];
                const currentCustomSettingsList = currentState.customSettings ?? [];
                const index = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.findIndex)(currentCustomSettingsList, {
                    key: customSettings.key
                });
                if (index > -1) {
                    currentCustomSettingsList[index] = {
                        ...currentCustomSettingsList[index],
                        value: customSettings.value
                    };
                } else {
                    currentCustomSettingsList.push(customSettings);
                }
                draft.customSettings = currentCustomSettingsList;
                markedAsModified(draft);
            }
            return draft;
        });
    };
    const removeCustomSettings = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            const { customSettings } = action.payload;
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(customSettings === null || customSettings === void 0 ? void 0 : customSettings.key)) {
                const currentState = state.entities[action.payload.id];
                const currentCustomSettingsList = currentState.customSettings ?? [];
                const index = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.findIndex)(currentCustomSettingsList, {
                    key: customSettings.key
                });
                if (index > -1) {
                    currentCustomSettingsList.splice(index, 1);
                    draft.customSettings = currentCustomSettingsList;
                    markedAsModified(draft);
                }
            }
            return draft;
        });
    };
    return {
        setCustomSettings,
        removeCustomSettings
    };
};
const useCustomSettingsDraft = (param)=>{
    let { id, draft, setCustomSettingsAction, removeCustomSettingsAction } = param;
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    return {
        customSettings: draft === null || draft === void 0 ? void 0 : draft.customSettings,
        setCustomSettings: (customSettings)=>{
            dispatch(setCustomSettingsAction({
                id,
                customSettings
            }));
        },
        removeCustomSettings: (customSettings)=>{
            dispatch(removeCustomSettingsAction({
                id,
                customSettings
            }));
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
"./js/src/core/modules/asset/draft/hooks/use-image-settings.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useImageSettingsDraft: () => (useImageSettingsDraft),
  useImageSettingsReducers: () => (useImageSettingsReducers)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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

const useImageSettingsReducers = (entityAdapter)=>{
    const addImageSettings = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.imageSettings = {
                ...draft.imageSettings,
                ...action.payload.settings
            };
            markedAsModified(draft);
            return draft;
        });
    };
    const removeImageSetting = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            const clonedImageSettings = structuredClone(draft.imageSettings);
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete clonedImageSettings[action.payload.setting];
            draft.imageSettings = {
                ...clonedImageSettings
            };
            markedAsModified(draft);
            return draft;
        });
    };
    const updateImageSetting = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.imageSettings[action.payload.setting] = action.payload.value;
            markedAsModified(draft);
            return draft;
        });
    };
    const modifyDraft = (state, id, modification)=>{
        const draft = entityAdapter.getSelectors().selectById(state, id);
        if (draft === undefined) (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`Item with id ${id} not found`));
        state.entities[id] = modification({
            ...draft
        });
    };
    const markedAsModified = (draft)=>{
        draft.modified = true;
        draft.changes = {
            ...draft.changes,
            imageSettings: true
        };
    };
    return {
        addImageSettings,
        removeImageSetting,
        updateImageSetting
    };
};
const useImageSettingsDraft = (id, draft, addSettingsAction, removeSettingAction, updateSettingAction)=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    return {
        imageSettings: draft === null || draft === void 0 ? void 0 : draft.imageSettings,
        addImageSettings: (settings)=>{
            dispatch(addSettingsAction({
                id,
                settings
            }));
        },
        removeImageSetting: (setting)=>{
            dispatch(removeSettingAction({
                id,
                setting
            }));
        },
        updateImageSetting: (setting, value)=>{
            dispatch(updateSettingAction({
                id,
                setting,
                value
            }));
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
"./js/src/core/modules/asset/draft/hooks/use-text-settings.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useTextDataDraft: () => (useTextDataDraft),
  useTextDataReducers: () => (useTextDataReducers)
});
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
const useTextDataReducers = (entityAdapter)=>{
    const modifyDraft = (state, id, modification)=>{
        const draft = entityAdapter.getSelectors().selectById(state, id);
        if (draft === undefined) {
            console.error(`Item with id ${id} not found`);
            return;
        }
        state.entities[id] = modification({
            ...draft
        });
    };
    const markedAsModified = (draft)=>{
        draft.modified = true;
        draft.changes = {
            ...draft.changes,
            textData: true
        };
    };
    const updateTextData = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.textData = action.payload.textData ?? '';
            markedAsModified(draft);
            return draft;
        });
    };
    return {
        updateTextData
    };
};
const useTextDataDraft = (param)=>{
    let { id, draft, updateTextDataAction } = param;
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    return {
        textData: draft === null || draft === void 0 ? void 0 : draft.textData,
        updateTextData: (textData)=>{
            dispatch(updateTextDataAction({
                id,
                textData
            }));
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
"./js/src/core/modules/asset/hooks/use-asset-draft-fetcher.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAssetDraftFetcher: () => (useAssetDraftFetcher)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _asset_draft_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/asset/asset-draft-slice.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-tabs.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* ESM import */var _Pimcore_modules_app_settings_settings_slice_gen__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/settings/settings-slice.gen.ts");
/* ESM import */var _asset_draft_error_slice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/asset/asset-draft-error-slice.ts");
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







// Global map to track fetching drafts
const fetchingDrafts = new Map();
const useAssetDraftFetcher = ()=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    async function getAsset(id) {
        const { data, isError: isGetAssetError, error: getAssetError } = await dispatch(_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.assetGetById.initiate({
            id
        }));
        if (isGetAssetError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__.ApiError(getAssetError));
            dispatch((0,_asset_draft_error_slice__WEBPACK_IMPORTED_MODULE_7__.addFailedDraftId)(id));
        }
        return data;
    }
    async function getCustomSettings(id) {
        let objectToReturn = {};
        const { data, isSuccess, isError: isAssetCustomSettingsError, error: assetCustomSettingsError } = await dispatch(_Pimcore_modules_app_settings_settings_slice_gen__WEBPACK_IMPORTED_MODULE_6__.api.endpoints.assetCustomSettingsGetById.initiate({
            id
        }));
        if (isAssetCustomSettingsError) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_5__.ApiError(assetCustomSettingsError));
            dispatch((0,_asset_draft_error_slice__WEBPACK_IMPORTED_MODULE_7__.addFailedDraftId)(id));
            return undefined;
        }
        if (isSuccess && data !== undefined) {
            const settings = data.items;
            const dynamicSettings = settings === null || settings === void 0 ? void 0 : settings.dynamicCustomSettings;
            if (dynamicSettings !== undefined && Object.prototype.hasOwnProperty.call(dynamicSettings, 'focalPointX') === true && Object.prototype.hasOwnProperty.call(dynamicSettings, 'focalPointY') === true) {
                const focalPoint = {
                    x: dynamicSettings.focalPointX,
                    y: dynamicSettings.focalPointY
                };
                objectToReturn = {
                    ...objectToReturn,
                    focalPoint
                };
            }
        }
        return objectToReturn;
    }
    const updateAssetDraft = async function(id) {
        let forceRefetch = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        if (fetchingDrafts.get(id) === true && !forceRefetch) {
            return;
        }
        fetchingDrafts.set(id, true);
        try {
            await Promise.all([
                getAsset(id),
                getCustomSettings(id)
            ]).then((param)=>{
                let [assetData, customSettingsResponse] = param;
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(assetData) && !(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(customSettingsResponse)) {
                    const mergedAssetData = {
                        ...assetData,
                        id,
                        modified: false,
                        properties: [],
                        customMetadata: [],
                        customSettings: [],
                        schedules: [],
                        textData: '',
                        imageSettings: customSettingsResponse,
                        changes: {},
                        modifiedCells: {},
                        ..._Pimcore_modules_element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_4__.initialTabsStateValue
                    };
                    dispatch((0,_asset_draft_slice__WEBPACK_IMPORTED_MODULE_2__.assetReceived)(mergedAssetData));
                    dispatch((0,_asset_draft_error_slice__WEBPACK_IMPORTED_MODULE_7__.removeFailedDraftId)(id));
                }
            });
        } finally{
            fetchingDrafts.delete(id);
        }
    };
    return {
        updateAssetDraft
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
"./js/src/core/modules/asset/hooks/use-asset-draft.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAssetDraft: () => (useAssetDraft)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/asset-draft-slice.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_properties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-properties.ts");
/* ESM import */var _Pimcore_modules_asset_draft_hooks_use_custom_metadata__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/asset/draft/hooks/use-custom-metadata.ts");
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_trackable_changes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-trackable-changes.ts");
/* ESM import */var _Pimcore_modules_asset_draft_hooks_use_image_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/asset/draft/hooks/use-image-settings.ts");
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_schedules__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-schedules.ts");
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-tabs.ts");
/* ESM import */var _Pimcore_modules_asset_draft_hooks_use_text_settings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./js/src/core/modules/asset/draft/hooks/use-text-settings.ts");
/* ESM import */var _Pimcore_modules_asset_draft_hooks_use_custom_settings__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/modules/asset/draft/hooks/use-custom-settings.ts");
/* ESM import */var _asset_draft_error_slice__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/asset/asset-draft-error-slice.ts");
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













const useAssetDraft = (id)=>{
    const asset = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppSelector)((state)=>(0,_asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.selectAssetById)(state, id));
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true);
    const typeRegistry = (0,_Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_8__.useInjection)(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_9__.serviceIds["Asset/Editor/TypeRegistry"]);
    const isError = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppSelector)((state)=>(0,_asset_draft_error_slice__WEBPACK_IMPORTED_MODULE_13__.isFailedDraftId)(state, id));
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (asset === undefined) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [
        asset
    ]);
    const trackableChangesActions = (0,_Pimcore_modules_element_draft_hooks_use_trackable_changes__WEBPACK_IMPORTED_MODULE_5__.useTrackableChangesDraft)(id, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.resetChanges, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.setModifiedCells);
    const propertyActions = (0,_Pimcore_modules_element_draft_hooks_use_properties__WEBPACK_IMPORTED_MODULE_3__.usePropertiesDraft)(id, asset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.updatePropertyForAsset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.addPropertyToAsset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.removePropertyFromAsset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.setPropertiesForAsset);
    const schedulesActions = (0,_Pimcore_modules_element_draft_hooks_use_schedules__WEBPACK_IMPORTED_MODULE_7__.useSchedulesDraft)(id, asset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.updateScheduleForAsset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.addScheduleToAsset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.removeScheduleFromAsset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.setSchedulesForAsset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.resetSchedulesChangesForAsset);
    const customMetadataActions = (0,_Pimcore_modules_asset_draft_hooks_use_custom_metadata__WEBPACK_IMPORTED_MODULE_4__.useCustomMetadataDraft)(id, asset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.updateCustomMetadataForAsset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.addCustomMetadataToAsset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.removeCustomMetadataFromAsset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.setCustomMetadataForAsset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.updateAllCustomMetadataForAsset);
    const customSettingsActions = (0,_Pimcore_modules_asset_draft_hooks_use_custom_settings__WEBPACK_IMPORTED_MODULE_12__.useCustomSettingsDraft)({
        id,
        draft: asset,
        setCustomSettingsAction: _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.setCustomSettingsForAsset,
        removeCustomSettingsAction: _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.removeCustomSettingsFromAsset
    });
    const imageSettingsActions = (0,_Pimcore_modules_asset_draft_hooks_use_image_settings__WEBPACK_IMPORTED_MODULE_6__.useImageSettingsDraft)(id, asset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.addImageSettingsToAsset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.removeImageSettingFromAsset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.updateImageSettingForAsset);
    const textDataActions = (0,_Pimcore_modules_asset_draft_hooks_use_text_settings__WEBPACK_IMPORTED_MODULE_11__.useTextDataDraft)({
        id,
        draft: asset,
        updateTextDataAction: _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.updateTextDataForAsset
    });
    const tabsActions = (0,_Pimcore_modules_element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_10__.useTabsDraft)(id, asset, _asset_draft_slice__WEBPACK_IMPORTED_MODULE_1__.setActiveTabForAsset);
    const editorType = (asset === null || asset === void 0 ? void 0 : asset.type) === undefined ? undefined : typeRegistry.get(asset.type) ?? typeRegistry.get('unknown');
    return {
        isLoading,
        isError,
        asset,
        editorType,
        ...trackableChangesActions,
        ...propertyActions,
        ...schedulesActions,
        ...customMetadataActions,
        ...customSettingsActions,
        ...imageSettingsActions,
        ...textDataActions,
        ...tabsActions
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
"./js/src/core/modules/auth/hooks/use-user.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useUser: () => (useUser)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/react-redux/dist/react-redux.mjs");
/* ESM import */var _Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/auth/user/user-slice.ts");
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


const useUser = ()=>{
    const user = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(_Pimcore_modules_auth_user_user_slice__WEBPACK_IMPORTED_MODULE_1__.selectCurrentUser);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>user, [
        user
    ]);
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

// The logic dependency is in the rtkQueryErrorLogger middleware
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
"./js/src/core/modules/data-object/data-object-draft-error-slice.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addFailedDraftId: () => (addFailedDraftId),
  "default": () => (__WEBPACK_DEFAULT_EXPORT__),
  isFailedDraftId: () => (isFailedDraftId),
  removeFailedDraftId: () => (removeFailedDraftId)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
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
    failedDraftIds: []
};
const dataObjectErrorSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({
    name: 'data-object-draft-error',
    initialState,
    reducers: {
        addFailedDraftId: (state, action)=>{
            if (!state.failedDraftIds.includes(action.payload)) {
                state.failedDraftIds.push(action.payload);
            }
        },
        removeFailedDraftId: (state, action)=>{
            state.failedDraftIds = state.failedDraftIds.filter((id)=>id !== action.payload);
        }
    }
});
const { addFailedDraftId, removeFailedDraftId } = dataObjectErrorSlice.actions;
const isFailedDraftId = (state, id)=>{
    return state['data-object-draft-error'].failedDraftIds.includes(id);
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dataObjectErrorSlice.reducer);
(0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.injectSliceWithState)(dataObjectErrorSlice);

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
"./js/src/core/modules/data-object/data-object-draft-slice.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addPropertyToDataObject: () => (addPropertyToDataObject),
  addScheduleToDataObject: () => (addScheduleToDataObject),
  dataObjectReceived: () => (dataObjectReceived),
  dataObjectsAdapter: () => (dataObjectsAdapter),
  markObjectDataAsModified: () => (markObjectDataAsModified),
  publishDraft: () => (publishDraft),
  removeDataObject: () => (removeDataObject),
  removePropertyFromDataObject: () => (removePropertyFromDataObject),
  removeScheduleFromDataObject: () => (removeScheduleFromDataObject),
  resetChanges: () => (resetChanges),
  resetDataObject: () => (resetDataObject),
  resetSchedulesChangesForDataObject: () => (resetSchedulesChangesForDataObject),
  selectDataObjectById: () => (selectDataObjectById),
  setActiveTabForDataObject: () => (setActiveTabForDataObject),
  setDraftData: () => (setDraftData),
  setModifiedCells: () => (setModifiedCells),
  setPropertiesForDataObject: () => (setPropertiesForDataObject),
  setSchedulesForDataObject: () => (setSchedulesForDataObject),
  slice: () => (slice),
  unpublishDraft: () => (unpublishDraft),
  updateKey: () => (updateKey),
  updatePropertyForDataObject: () => (updatePropertyForDataObject),
  updateScheduleForDataObject: () => (updateScheduleForDataObject)
});
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-properties.ts");
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_trackable_changes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-trackable-changes.ts");
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-tabs.ts");
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_schedules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-schedules.ts");
/* ESM import */var _Pimcore_modules_data_object_draft_hooks_use_modified_object_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/data-object/draft/hooks/use-modified-object-data.ts");
/* ESM import */var _Pimcore_modules_data_object_draft_hooks_use_draft_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/data-object/draft/hooks/use-draft-data.ts");
/* ESM import */var _element_draft_hooks_use_published__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-published.ts");
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








const dataObjectsAdapter = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_8__.createEntityAdapter)({});
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_8__.createSlice)({
    name: 'data-object-draft',
    initialState: dataObjectsAdapter.getInitialState({
        modified: false,
        properties: [],
        schedule: [],
        changes: {},
        modifiedCells: {},
        modifiedObjectData: {},
        ..._Pimcore_modules_element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_3__.initialTabsStateValue
    }),
    reducers: {
        dataObjectReceived: dataObjectsAdapter.upsertOne,
        removeDataObject (state, action) {
            dataObjectsAdapter.removeOne(state, action.payload);
        },
        resetDataObject (state, action) {
            if (state.entities[action.payload] !== undefined) {
                state.entities[action.payload] = dataObjectsAdapter.getInitialState({
                    modified: false,
                    properties: [],
                    changes: {}
                }).entities[action.payload];
            }
        },
        updateKey (state, action) {
            if (state.entities[action.payload.id] !== undefined) {
                const dataObject = state.entities[action.payload.id];
                dataObject.key = action.payload.key;
                if (dataObject.fullPath !== undefined) {
                    var _dataObject_fullPath;
                    const fullPathAsArray = (_dataObject_fullPath = dataObject.fullPath) === null || _dataObject_fullPath === void 0 ? void 0 : _dataObject_fullPath.split('/');
                    fullPathAsArray[fullPathAsArray.length - 1] = action.payload.key;
                    dataObject.fullPath = fullPathAsArray.join('/');
                }
                if (dataObject.path !== undefined) {
                    const pathAsArray = dataObject.path.split('/');
                    pathAsArray[pathAsArray.length - 1] = action.payload.key;
                    dataObject.path = pathAsArray.join('/');
                }
            }
        },
        ...(0,_Pimcore_modules_element_draft_hooks_use_trackable_changes__WEBPACK_IMPORTED_MODULE_2__.useTrackableChangesReducers)(dataObjectsAdapter),
        ...(0,_Pimcore_modules_element_draft_hooks_use_properties__WEBPACK_IMPORTED_MODULE_1__.usePropertiesReducers)(dataObjectsAdapter),
        ...(0,_Pimcore_modules_element_draft_hooks_use_schedules__WEBPACK_IMPORTED_MODULE_4__.useSchedulesReducers)(dataObjectsAdapter),
        ...(0,_Pimcore_modules_element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_3__.useTabsReducers)(dataObjectsAdapter),
        ...(0,_Pimcore_modules_data_object_draft_hooks_use_modified_object_data__WEBPACK_IMPORTED_MODULE_5__.useModifiedObjectDataReducers)(dataObjectsAdapter),
        ...(0,_Pimcore_modules_data_object_draft_hooks_use_modified_object_data__WEBPACK_IMPORTED_MODULE_5__.useModifiedObjectDataReducers)(dataObjectsAdapter),
        ...(0,_Pimcore_modules_data_object_draft_hooks_use_draft_data__WEBPACK_IMPORTED_MODULE_6__.useDraftDataReducers)(dataObjectsAdapter),
        ...(0,_element_draft_hooks_use_published__WEBPACK_IMPORTED_MODULE_7__.usePublishedReducers)(dataObjectsAdapter)
    }
});
(0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.injectSliceWithState)(slice);
const { dataObjectReceived, removeDataObject, resetDataObject, updateKey, resetChanges, setModifiedCells, addProperty: addPropertyToDataObject, removeProperty: removePropertyFromDataObject, setProperties: setPropertiesForDataObject, updateProperty: updatePropertyForDataObject, addSchedule: addScheduleToDataObject, removeSchedule: removeScheduleFromDataObject, setSchedules: setSchedulesForDataObject, updateSchedule: updateScheduleForDataObject, resetSchedulesChanges: resetSchedulesChangesForDataObject, setActiveTab: setActiveTabForDataObject, markObjectDataAsModified, setDraftData, publishDraft, unpublishDraft } = slice.actions;
const { selectById: selectDataObjectById } = dataObjectsAdapter.getSelectors((state)=>state['data-object-draft']);

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
"./js/src/core/modules/data-object/data-object-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DataObjectContext: () => (DataObjectContext),
  DataObjectProvider: () => (DataObjectProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

const DataObjectContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
    id: 0
});
const DataObjectProvider = (param)=>{
    let { id, children } = param;
    _s();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(DataObjectContext.Provider, {
            value: {
                id
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/data-object/data-object-provider.tsx",
            lineNumber: 29,
            columnNumber: 5
        }, undefined), [
        id
    ]);
};
_s(DataObjectProvider, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = DataObjectProvider;
var _c;
$RefreshReg$(_c, "DataObjectProvider");

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
"./js/src/core/modules/data-object/draft/hooks/use-draft-data.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  IS_AUTO_SAVE_DRAFT_CREATED: () => (IS_AUTO_SAVE_DRAFT_CREATED),
  useDraftDataDraft: () => (useDraftDataDraft),
  useDraftDataReducers: () => (useDraftDataReducers)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
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


const IS_AUTO_SAVE_DRAFT_CREATED = 'isAutoSaveDraftCreated';
const useDraftDataReducers = (entityAdapter)=>{
    const setDraftData = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            var _action_payload_draftData;
            if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(draft.draftData) && ((_action_payload_draftData = action.payload.draftData) === null || _action_payload_draftData === void 0 ? void 0 : _action_payload_draftData.isAutoSave) === true) {
                draft.changes = {
                    ...draft.changes,
                    [IS_AUTO_SAVE_DRAFT_CREATED]: true
                };
            }
            draft.draftData = action.payload.draftData;
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
        setDraftData
    };
};
const useDraftDataDraft = (id, setDraftDataAction)=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const [, startTransition] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useTransition)();
    return {
        setDraftData: (draftData)=>{
            startTransition(()=>{
                dispatch(setDraftDataAction({
                    id,
                    draftData
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
"./js/src/core/modules/data-object/draft/hooks/use-modified-object-data.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useModifiedObjectDataDraft: () => (useModifiedObjectDataDraft),
  useModifiedObjectDataReducers: () => (useModifiedObjectDataReducers)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

const useModifiedObjectDataReducers = (entityAdapter)=>{
    const markObjectDataAsModified = (state, action)=>{
        modifyDraft(state, action.payload, (draft)=>{
            markedAsModified(draft);
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
    const markedAsModified = (draft)=>{
        draft.modified = true;
        draft.changes = {
            ...draft.changes,
            objectData: true
        };
    };
    return {
        markObjectDataAsModified
    };
};
const useModifiedObjectDataDraft = (id, draft, markObjectDataAsModifiedAction)=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const [, startTransition] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useTransition)();
    return {
        markObjectDataAsModified: ()=>{
            var _draft_changes;
            if (draft === null || draft === void 0 ? void 0 : (_draft_changes = draft.changes) === null || _draft_changes === void 0 ? void 0 : _draft_changes.objectData) {
                return;
            }
            startTransition(()=>{
                dispatch(markObjectDataAsModifiedAction(id));
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
"./js/src/core/modules/data-object/hooks/use-data-object-draft-fetcher.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useDataObjectDraftFetcher: () => (useDataObjectDraftFetcher)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice-enhanced.ts");
/* ESM import */var _data_object_draft_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/data-object-draft-slice.tsx");
/* ESM import */var _data_object_draft_error_slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/modules/data-object/data-object-draft-error-slice.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_modules_element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/element/draft/hooks/use-tabs.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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


 // Import the new action



// Global map to track fetching drafts
const fetchingDrafts = new Map();
const useDataObjectDraftFetcher = ()=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const updateDataObjectDraft = async function(id) {
        let forceRefetch = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        if (fetchingDrafts.get(id) === true && !forceRefetch) {
            return;
        }
        fetchingDrafts.set(id, true);
        try {
            const { data: dataObjectData, error } = await dispatch(_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api.endpoints.dataObjectGetById.initiate({
                id
            }, {
                forceRefetch
            }));
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isUndefined)(error)) {
                (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_6__.ApiError(error));
                dispatch((0,_data_object_draft_error_slice__WEBPACK_IMPORTED_MODULE_3__.addFailedDraftId)(id));
            }
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isUndefined)(dataObjectData)) {
                const mergedDataObjectData = {
                    ...dataObjectData,
                    id,
                    modified: false,
                    properties: [],
                    schedules: [],
                    changes: {},
                    modifiedCells: {},
                    modifiedObjectData: {},
                    ..._Pimcore_modules_element_draft_hooks_use_tabs__WEBPACK_IMPORTED_MODULE_5__.initialTabsStateValue
                };
                dispatch((0,_data_object_draft_slice__WEBPACK_IMPORTED_MODULE_2__.dataObjectReceived)(mergedDataObjectData));
                dispatch((0,_data_object_draft_error_slice__WEBPACK_IMPORTED_MODULE_3__.removeFailedDraftId)(id));
            }
        } finally{
            fetchingDrafts.delete(id);
        }
    };
    return {
        updateDataObjectDraft
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
"./js/src/core/modules/element/actions/index.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ContextMenuActionName: () => (ContextMenuActionName)
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
*/ var ContextMenuActionName = /*#__PURE__*/ function(ContextMenuActionName) {
    ContextMenuActionName["rename"] = "rename";
    ContextMenuActionName["unpublish"] = "unpublish";
    ContextMenuActionName["delete"] = "delete";
    ContextMenuActionName["refresh"] = "refresh";
    ContextMenuActionName["publish"] = "publish";
    ContextMenuActionName["open"] = "open";
    ContextMenuActionName["lock"] = "lock";
    ContextMenuActionName["lockAndPropagate"] = "lockAndPropagate";
    ContextMenuActionName["unlock"] = "unlock";
    ContextMenuActionName["unlockAndPropagate"] = "unlockAndPropagate";
    ContextMenuActionName["locateInTree"] = "locateInTree";
    ContextMenuActionName["copy"] = "copy";
    ContextMenuActionName["cut"] = "cut";
    ContextMenuActionName["paste"] = "paste";
    ContextMenuActionName["pasteCut"] = "pasteCut";
    ContextMenuActionName["addFolder"] = "addFolder";
    ContextMenuActionName["addObject"] = "addObject";
    ContextMenuActionName["pasteAsChildRecursive"] = "pasteAsChildRecursive";
    ContextMenuActionName["pasteRecursiveUpdatingReferences"] = "pasteRecursiveUpdatingReferences";
    ContextMenuActionName["pasteAsChild"] = "pasteAsChild";
    ContextMenuActionName["pasteOnlyContents"] = "pasteOnlyContents";
    ContextMenuActionName["downloadAsZip"] = "downloadAsZip";
    ContextMenuActionName["uploadNewVersion"] = "uploadNewVersion";
    ContextMenuActionName["download"] = "download";
    ContextMenuActionName["clearImageThumbnails"] = "clearImageThumbnails";
    ContextMenuActionName["clearVideoThumbnails"] = "clearVideoThumbnails";
    ContextMenuActionName["clearPdfThumbnails"] = "clearPdfThumbnails";
    return ContextMenuActionName;
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
"./js/src/core/modules/element/actions/lock/use-lock.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LockType: () => (LockType),
  useLock: () => (useLock)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_modules_element_hooks_use_element_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/hooks/use-element-api.ts");
/* ESM import */var _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/modules/auth/hooks/use-user.ts");
/* ESM import */var _tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-permission-provider/use-tree-permission.ts");
/* ESM import */var _perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/modules/perspectives/enums/tree-permission.ts");
/* ESM import */var ___WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/actions/index.ts");
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/components/element-tree/element-tree-slice.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_11__);
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











var LockType = /*#__PURE__*/ function(LockType) {
    LockType["Self"] = "self";
    LockType["Propagate"] = "propagate";
    LockType["Unlock"] = "";
    LockType["UnlockPropagate"] = "unlockPropagate";
    return LockType;
}({});
const useLock = (elementType)=>{
    _s();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const { elementPatch } = (0,_Pimcore_modules_element_hooks_use_element_api__WEBPACK_IMPORTED_MODULE_4__.useElementApi)(elementType);
    const user = (0,_Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_5__.useUser)();
    const { isTreeActionAllowed } = (0,_tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_6__.useTreePermission)();
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_9__.useAppDispatch)();
    const lock = async (id)=>{
        await patchLock(id, "self");
    };
    const lockAndPropagate = async (id)=>{
        await patchLock(id, "propagate");
    };
    const unlock = async (id)=>{
        await patchLock(id, "");
    };
    const unlockAndPropagate = async (id)=>{
        await patchLock(id, "unlockPropagate");
    };
    const patchLock = async (id, lockType)=>{
        const elementLockTask = elementPatch({
            body: {
                data: [
                    {
                        id,
                        locked: lockType
                    }
                ]
            }
        });
        const getLockedFromLockType = (lockType)=>{
            return lockType === 'self' || lockType === 'propagate';
        };
        try {
            dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_10__.setNodeLoadingInAllTree)({
                nodeId: String(id),
                elementType,
                loading: true
            }));
            const success = await elementLockTask;
            if (success) {
                dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_10__.setNodeLocked)({
                    elementType,
                    nodeId: String(id),
                    isLocked: getLockedFromLockType(lockType),
                    lockType
                }));
            }
            dispatch((0,_Pimcore_components_element_tree_element_tree_slice__WEBPACK_IMPORTED_MODULE_10__.setNodeLoadingInAllTree)({
                nodeId: String(id),
                elementType,
                loading: false
            }));
        } catch (error) {
            console.error('Error renaming ' + elementType, error);
        }
    };
    const lockTreeContextMenuItem = (node)=>{
        return {
            label: t('element.lock'),
            key: ___WEBPACK_IMPORTED_MODULE_8__.ContextMenuActionName.lock,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: 'lock'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/lock/use-lock.tsx",
                lineNumber: 106,
                columnNumber: 13
            }, undefined),
            hidden: isLockHidden(node),
            onClick: async ()=>{
                await lock(parseInt(node.id));
            }
        };
    };
    const lockContextMenuItem = (node, onFinish)=>{
        return {
            label: t('element.lock'),
            key: ___WEBPACK_IMPORTED_MODULE_8__.ContextMenuActionName.lock,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: 'lock'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/lock/use-lock.tsx",
                lineNumber: 118,
                columnNumber: 13
            }, undefined),
            hidden: isLockHidden(node),
            onClick: async ()=>{
                await lock(node.id);
                onFinish === null || onFinish === void 0 ? void 0 : onFinish();
            }
        };
    };
    const lockAndPropagateTreeContextMenuItem = (node)=>{
        return {
            label: t('element.lock-and-propagate-to-children'),
            key: ___WEBPACK_IMPORTED_MODULE_8__.ContextMenuActionName.lockAndPropagate,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: 'file-locked'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/lock/use-lock.tsx",
                lineNumber: 131,
                columnNumber: 13
            }, undefined),
            hidden: isLockPropagateHidden(node),
            onClick: async ()=>{
                await lockAndPropagate(parseInt(node.id));
            }
        };
    };
    const lockAndPropagateContextMenuItem = (node, onFinish)=>{
        return {
            label: t('element.lock-and-propagate-to-children'),
            key: ___WEBPACK_IMPORTED_MODULE_8__.ContextMenuActionName.lockAndPropagate,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: 'file-locked'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/lock/use-lock.tsx",
                lineNumber: 143,
                columnNumber: 13
            }, undefined),
            hidden: isLockPropagateHidden(node),
            onClick: async ()=>{
                await lockAndPropagate(node.id);
                onFinish === null || onFinish === void 0 ? void 0 : onFinish();
            }
        };
    };
    const unlockTreeContextMenuItem = (node)=>{
        return {
            label: t('element.unlock'),
            key: ___WEBPACK_IMPORTED_MODULE_8__.ContextMenuActionName.unlock,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: 'unlocked'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/lock/use-lock.tsx",
                lineNumber: 156,
                columnNumber: 13
            }, undefined),
            hidden: isUnlockHidden(node),
            onClick: async ()=>{
                await unlock(parseInt(node.id));
            }
        };
    };
    const unlockContextMenuItem = (node, onFinish)=>{
        return {
            label: t('element.unlock'),
            key: ___WEBPACK_IMPORTED_MODULE_8__.ContextMenuActionName.unlock,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: 'unlocked'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/lock/use-lock.tsx",
                lineNumber: 168,
                columnNumber: 13
            }, undefined),
            hidden: isUnlockHidden(node),
            onClick: async ()=>{
                await unlock(node.id);
                onFinish === null || onFinish === void 0 ? void 0 : onFinish();
            }
        };
    };
    const unlockAndPropagateTreeContextMenuItem = (node)=>{
        return {
            label: t('element.unlock-and-propagate-to-children'),
            key: ___WEBPACK_IMPORTED_MODULE_8__.ContextMenuActionName.unlockAndPropagate,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: 'unlocked'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/lock/use-lock.tsx",
                lineNumber: 181,
                columnNumber: 13
            }, undefined),
            hidden: isUnlockPropagateHidden(node),
            onClick: async ()=>{
                await unlockAndPropagate(parseInt(node.id));
            }
        };
    };
    const unlockAndPropagateContextMenuItem = (node, onFinish)=>{
        return {
            label: t('element.unlock-and-propagate-to-children'),
            key: ___WEBPACK_IMPORTED_MODULE_8__.ContextMenuActionName.unlockAndPropagate,
            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_1__.Icon, {
                value: 'unlocked'
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/actions/lock/use-lock.tsx",
                lineNumber: 193,
                columnNumber: 13
            }, undefined),
            hidden: isUnlockPropagateHidden(node),
            onClick: async ()=>{
                await unlockAndPropagate(node.id);
                onFinish === null || onFinish === void 0 ? void 0 : onFinish();
            }
        };
    };
    const isNodeDirectlyLocked = (node)=>{
        return node.isLocked && !(0,lodash__WEBPACK_IMPORTED_MODULE_11__.isNil)(node.locked);
    };
    const isLockHidden = (node)=>{
        if (node.isLocked && (0,lodash__WEBPACK_IMPORTED_MODULE_11__.isNil)(node.locked)) {
            return false;
        }
        return !isTreeActionAllowed(_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_7__.TreePermission.Lock) || node.isLocked || !user.isAdmin;
    };
    const isLockPropagateHidden = (node)=>{
        if (!isNodeDirectlyLocked(node)) {
            return false;
        }
        return !isTreeActionAllowed(_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_7__.TreePermission.LockAndPropagate) || node.isLocked || !user.isAdmin;
    };
    const isUnlockHidden = (node)=>{
        if (!isNodeDirectlyLocked(node)) {
            return true;
        }
        return !isTreeActionAllowed(_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_7__.TreePermission.Unlock) || !node.isLocked || !user.isAdmin;
    };
    const isUnlockPropagateHidden = (node)=>{
        return !isTreeActionAllowed(_perspectives_enums_tree_permission__WEBPACK_IMPORTED_MODULE_7__.TreePermission.UnlockAndPropagate) || !node.isLocked || !user.isAdmin;
    };
    const isLockMenuHidden = (node)=>{
        return isLockHidden(node) && isLockPropagateHidden(node) && isUnlockHidden(node) && isUnlockPropagateHidden(node);
    };
    return {
        lock,
        lockAndPropagate,
        unlock,
        unlockAndPropagate,
        lockTreeContextMenuItem,
        lockContextMenuItem,
        lockAndPropagateTreeContextMenuItem,
        lockAndPropagateContextMenuItem,
        unlockTreeContextMenuItem,
        unlockContextMenuItem,
        unlockAndPropagateTreeContextMenuItem,
        unlockAndPropagateContextMenuItem,
        isLockMenuHidden
    };
};
_s(useLock, "ax/g/JtWXZt/hQdWjOhjyPV2ffk=", false, function() {
    return [
        react_i18next__WEBPACK_IMPORTED_MODULE_3__.useTranslation,
        _Pimcore_modules_element_hooks_use_element_api__WEBPACK_IMPORTED_MODULE_4__.useElementApi,
        _Pimcore_modules_auth_hooks_use_user__WEBPACK_IMPORTED_MODULE_5__.useUser,
        _tree_provider_tree_permission_provider_use_tree_permission__WEBPACK_IMPORTED_MODULE_6__.useTreePermission,
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_9__.useAppDispatch
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
"./js/src/core/modules/element/draft/hooks/use-properties.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  usePropertiesDraft: () => (usePropertiesDraft),
  usePropertiesReducers: () => (usePropertiesReducers)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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

const usePropertiesReducers = (entityAdapter)=>{
    const addProperty = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.properties = [
                ...draft.properties ?? [],
                action.payload.property
            ];
            markedAsModified(draft);
            return draft;
        });
    };
    const updateProperty = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.properties = (draft.properties ?? []).map((property, index)=>{
                if (property.key === action.payload.key && property.inherited === action.payload.property.inherited) {
                    markedAsModified(draft);
                    return action.payload.property;
                }
                return property;
            });
            return draft;
        });
    };
    const removeProperty = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.properties = (draft.properties ?? []).filter((property)=>property.key !== action.payload.property.key);
            markedAsModified(draft);
            return draft;
        });
    };
    const setProperties = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.properties = action.payload.properties;
            return draft;
        });
    };
    const modifyDraft = (state, id, modification)=>{
        const draft = entityAdapter.getSelectors().selectById(state, id);
        if (draft === undefined) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`Item with id ${id} not found`));
            return;
        }
        state.entities[id] = modification({
            ...draft
        });
    };
    const markedAsModified = (draft)=>{
        draft.modified = true;
        draft.changes = {
            ...draft.changes,
            properties: true
        };
    };
    return {
        addProperty,
        removeProperty,
        updateProperty,
        setProperties
    };
};
const usePropertiesDraft = (id, draft, updatePropertyAction, addPropertyAction, removePropertyAction, setPropertiesAction)=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    return {
        properties: draft === null || draft === void 0 ? void 0 : draft.properties,
        updateProperty: (key, property)=>{
            dispatch(updatePropertyAction({
                id,
                key,
                property
            }));
        },
        addProperty: (property)=>{
            dispatch(addPropertyAction({
                id,
                property
            }));
        },
        removeProperty: (property)=>{
            dispatch(removePropertyAction({
                id,
                property
            }));
        },
        setProperties: (properties)=>{
            dispatch(setPropertiesAction({
                id,
                properties
            }));
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
"./js/src/core/modules/element/draft/hooks/use-schedules.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useSchedulesDraft: () => (useSchedulesDraft),
  useSchedulesReducers: () => (useSchedulesReducers)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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

const useSchedulesReducers = (entityAdapter)=>{
    const addSchedule = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.schedules = [
                ...draft.schedules ?? [],
                action.payload.schedule
            ];
            markedAsModified(draft);
            return draft;
        });
    };
    const updateSchedule = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.schedules = (draft.schedules ?? []).map((schedule, index)=>{
                if (schedule.id === action.payload.schedule.id) {
                    markedAsModified(draft);
                    return action.payload.schedule;
                }
                return schedule;
            });
            return draft;
        });
    };
    const removeSchedule = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.schedules = (draft.schedules ?? []).filter((schedule)=>schedule.id !== action.payload.schedule.id);
            markedAsModified(draft);
            return draft;
        });
    };
    const setSchedules = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.schedules = action.payload.schedules;
            return draft;
        });
    };
    const resetSchedulesChanges = (state, action)=>{
        modifyDraft(state, action.payload, (draft)=>{
            if (draft.changes.schedules === undefined) {
                return draft;
            }
            const { schedules, ...changesWithoutSchedules } = draft.changes;
            draft.changes = changesWithoutSchedules;
            draft.modified = Object.keys(draft.changes).length > 0;
            return draft;
        });
    };
    const modifyDraft = (state, id, modification)=>{
        const draft = entityAdapter.getSelectors().selectById(state, id);
        if (draft === undefined) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`Item with id ${id} not found`));
            return;
        }
        state.entities[id] = modification({
            ...draft
        });
    };
    const markedAsModified = (draft)=>{
        draft.modified = true;
        draft.changes = {
            ...draft.changes,
            schedules: true
        };
    };
    return {
        addSchedule,
        removeSchedule,
        updateSchedule,
        setSchedules,
        resetSchedulesChanges
    };
};
const useSchedulesDraft = (id, draft, updateScheduleAction, addScheduleAction, removeScheduleAction, setSchedulesAction, resetSchedulesChangesAction)=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    return {
        schedules: draft === null || draft === void 0 ? void 0 : draft.schedules,
        updateSchedule: (schedule)=>{
            dispatch(updateScheduleAction({
                id,
                schedule
            }));
        },
        addSchedule: (schedule)=>{
            dispatch(addScheduleAction({
                id,
                schedule
            }));
        },
        removeSchedule: (schedule)=>{
            dispatch(removeScheduleAction({
                id,
                schedule
            }));
        },
        setSchedules: (schedules)=>{
            dispatch(setSchedulesAction({
                id,
                schedules
            }));
        },
        resetSchedulesChanges: ()=>{
            dispatch(resetSchedulesChangesAction(id));
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
"./js/src/core/modules/element/draft/hooks/use-tabs.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  initialTabsStateValue: () => (initialTabsStateValue),
  useTabsDraft: () => (useTabsDraft),
  useTabsReducers: () => (useTabsReducers)
});
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
const initialTabsStateValue = {
    activeTab: null
};
const useTabsReducers = (adapter)=>{
    const setActiveTab = (state, action)=>{
        const { id, activeTab } = action.payload;
        modifyDraft(state, id, (draft)=>{
            draft.activeTab = activeTab;
            return draft;
        });
    };
    const modifyDraft = (state, id, modification)=>{
        const draft = adapter.getSelectors().selectById(state, id);
        if (draft === undefined) {
            console.error(`Item with id ${id} not found`);
            return;
        }
        state.entities[id] = modification({
            ...draft
        });
    };
    return {
        setActiveTab
    };
};
const useTabsDraft = (id, draft, setActiveTabAction)=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    return {
        ...draft,
        setActiveTab: (tab)=>dispatch(setActiveTabAction({
                id,
                activeTab: tab
            }))
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
"./js/src/core/modules/element/draft/hooks/use-trackable-changes.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useTrackableChangesDraft: () => (useTrackableChangesDraft),
  useTrackableChangesReducers: () => (useTrackableChangesReducers)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
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

const useTrackableChangesReducers = (entityAdapter)=>{
    const resetChanges = (state, action)=>{
        modifyDraft(state, action.payload, (draft)=>{
            draft.changes = {};
            draft.modifiedCells = {};
            draft.modified = false;
            return draft;
        });
    };
    const setModifiedCells = (state, action)=>{
        modifyDraft(state, action.payload.id, (draft)=>{
            draft.modifiedCells = {
                ...draft.modifiedCells,
                [action.payload.type]: action.payload.modifiedCells
            };
            return draft;
        });
    };
    const modifyDraft = (state, id, modification)=>{
        const draft = entityAdapter.getSelectors().selectById(state, id);
        if (draft === undefined) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`Item with id ${id} not found`));
            return;
        }
        state.entities[id] = modification({
            ...draft
        });
    };
    return {
        resetChanges,
        setModifiedCells
    };
};
const useTrackableChangesDraft = (id, resetChangesAction, setModifiedCellsAction)=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    return {
        removeTrackedChanges: ()=>{
            dispatch(resetChangesAction(id));
        },
        setModifiedCells: (type, modifiedCells)=>{
            dispatch(setModifiedCellsAction({
                id,
                type,
                modifiedCells
            }));
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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/localized-fields/form-item/with-localized-fields-locale.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  withLocalizedFieldsLocale: () => (withLocalizedFieldsLocale)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _provider_localized_fields_provider_use_localized_fields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/localized-fields/provider/localized-fields-provider/use-localized-fields.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/text/text.tsx");
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




const withLocalizedFieldsLocale = (Component)=>{
    var _s = $RefreshSig$();
    const FormItemWithLocalizedFieldsLocale = (props)=>{
        _s();
        const context = (0,_provider_localized_fields_provider_use_localized_fields__WEBPACK_IMPORTED_MODULE_2__.useLocalizedFields)();
        return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
            if (context === undefined) {
                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                    ...props
                }, void 0, false, {
                    fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/localized-fields/form-item/with-localized-fields-locale.tsx",
                    lineNumber: 26,
                    columnNumber: 16
                }, undefined);
            }
            const { locales } = context;
            const { name, label, ...baseProps } = props;
            const newName = [
                ...(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isArray)(name) ? name : [
                    name
                ],
                locales[0]
            ];
            const newLabel = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    label,
                    " ",
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_text_text__WEBPACK_IMPORTED_MODULE_4__.Text, {
                        type: "secondary",
                        children: [
                            "(",
                            locales[0].toUpperCase(),
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/localized-fields/form-item/with-localized-fields-locale.tsx",
                        lineNumber: 34,
                        columnNumber: 19
                    }, undefined)
                ]
            }, void 0, true);
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {
                ...baseProps,
                label: newLabel,
                name: newName
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/localized-fields/form-item/with-localized-fields-locale.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, undefined);
        }, [
            context,
            props
        ]);
    };
    _s(FormItemWithLocalizedFieldsLocale, "AXj5ClmcTXVody+3/Mrvii7YmUQ=", false, function() {
        return [
            _provider_localized_fields_provider_use_localized_fields__WEBPACK_IMPORTED_MODULE_2__.useLocalizedFields
        ];
    });
    const NewFormItem = FormItemWithLocalizedFieldsLocale;
    NewFormItem.useStatus = Component.useStatus;
    return NewFormItem;
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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/localized-fields/provider/localized-fields-provider/localized-fields-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LocalizedFieldsContext: () => (LocalizedFieldsContext),
  LocalizedFieldsProvider: () => (LocalizedFieldsProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

const LocalizedFieldsContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const LocalizedFieldsProvider = (param)=>{
    let { locales, children } = param;
    _s();
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LocalizedFieldsContext.Provider, {
            value: {
                locales
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/localized-fields/provider/localized-fields-provider/localized-fields-provider.tsx",
            lineNumber: 28,
            columnNumber: 5
        }, undefined), [
        locales,
        children
    ]);
};
_s(LocalizedFieldsProvider, "nwk+m61qLgjDVUp4IGV/072DDN4=");
_c = LocalizedFieldsProvider;
var _c;
$RefreshReg$(_c, "LocalizedFieldsProvider");

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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/localized-fields/provider/localized-fields-provider/use-localized-fields.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useLocalizedFields: () => (useLocalizedFields)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _localized_fields_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/localized-fields/provider/localized-fields-provider/localized-fields-provider.tsx");
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


const useLocalizedFields = ()=>{
    _s();
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_localized_fields_provider__WEBPACK_IMPORTED_MODULE_1__.LocalizedFieldsContext);
    return context;
};
_s(useLocalizedFields, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");

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
"./js/src/core/modules/element/hooks/use-cache-update.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useCacheUpdate: () => (useCacheUpdate)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/asset/asset-api-slice-enhanced.ts");
/* ESM import */var _Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/modules/data-object/data-object-api-slice-enhanced.ts");
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


const useCacheUpdate = (elementType, tags)=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const api = getElementTypeDependantApi();
    const cacheEntries = getCacheEntries(tags);
    function getCacheEntries(tags) {
        return api.util.selectInvalidatedBy(// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.store.getState(), tags);
    }
    function getElementTypeDependantApi() {
        if (elementType === 'asset') {
            return _Pimcore_modules_asset_asset_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_1__.api;
        }
        if (elementType === 'data-object') {
            return _Pimcore_modules_data_object_data_object_api_slice_enhanced__WEBPACK_IMPORTED_MODULE_2__.api;
        }
        throw new Error('Unknown element type');
    }
    const update = (param)=>{
        let { updateFn } = param;
        cacheEntries.forEach((cacheEntry)=>{
            // @ts-expect-error not compatible with the current type definitions
            dispatch(api.util.updateQueryData(cacheEntry.endpointName, cacheEntry.originalArgs, updateFn));
        });
    };
    const updateFieldValue = (id, field, value)=>{
        update({
            updateFn: (draft)=>{
                if ('items' in draft && typeof draft.items === 'object') {
                    const entries = draft.items;
                    const indexToUpdate = entries.findIndex((entry)=>entry.id === id);
                    if (indexToUpdate !== -1 && field in draft.items[indexToUpdate]) {
                        draft.items[indexToUpdate][field] = value;
                    }
                }
            }
        });
    };
    return {
        update,
        updateFieldValue
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
"./js/src/core/modules/element/listing/abstract/data-layer/provider/data/data-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DataContext: () => (DataContext),
  DataProvider: () => (DataProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

const DataContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
const DataProvider = (param)=>{
    let { children } = param;
    _s();
    const [dataQueryResult, setDataQueryResult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const [dataLoadingState, setDataLoadingState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('initial');
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(DataContext.Provider, {
            value: {
                dataQueryResult,
                setDataQueryResult,
                data,
                setData,
                dataLoadingState,
                setDataLoadingState
            },
            children: children
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/listing/abstract/data-layer/provider/data/data-provider.tsx",
            lineNumber: 40,
            columnNumber: 5
        }, undefined), [
        dataQueryResult,
        data,
        dataLoadingState
    ]);
};
_s(DataProvider, "p2hBM9RgVJ3xu4rsGaH76CUZ+d4=");
_c = DataProvider;
var _c;
$RefreshReg$(_c, "DataProvider");

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
"./js/src/core/modules/element/tree/provider/tree-permission-provider/tree-permission-provider.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreePermissionContext: () => (TreePermissionContext),
  TreePermissionProvider: () => (TreePermissionProvider)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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

const TreePermissionContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const TreePermissionProvider = (param)=>{
    let { children, permissions } = param;
    _s();
    const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            permissions
        }), [
        permissions
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(TreePermissionContext.Provider, {
        value: contextValue,
        children: children
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/tree/provider/tree-permission-provider/tree-permission-provider.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, undefined);
};
_s(TreePermissionProvider, "JLzJfL3KLoV7bWTi3UEfulSv7uk=");
_c = TreePermissionProvider;
var _c;
$RefreshReg$(_c, "TreePermissionProvider");

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
"./js/src/core/modules/element/tree/provider/tree-permission-provider/use-tree-permission.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useTreePermission: () => (useTreePermission)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _tree_permission_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/element/tree/provider/tree-permission-provider/tree-permission-provider.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
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


// used to check if a tree action is allowed in the perspectives tree widget config
const useTreePermission = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_tree_permission_provider__WEBPACK_IMPORTED_MODULE_1__.TreePermissionContext);
    const isTreeActionAllowed = (permission)=>{
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(context)) {
            return true;
        }
        return context.permissions[permission] ?? false;
    };
    return {
        permissions: (context === null || context === void 0 ? void 0 : context.permissions) ?? {},
        isTreeActionAllowed
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
"./js/src/core/modules/execution-engine/execution-engine-slice.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  jobAdapter: () => (jobAdapter),
  jobDeleted: () => (jobDeleted),
  jobReceived: () => (jobReceived),
  jobUpdated: () => (jobUpdated),
  selectAll: () => (selectAll),
  selectById: () => (selectById),
  slice: () => (slice)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs");
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

const jobAdapter = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createEntityAdapter)({});
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({
    name: 'execution-engine',
    initialState: jobAdapter.getInitialState(),
    reducers: {
        jobReceived: jobAdapter.addOne,
        jobUpdated: jobAdapter.updateOne,
        jobDeleted: jobAdapter.removeOne
    }
});
(0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.injectSliceWithState)(slice);
const { jobReceived, jobUpdated, jobDeleted } = slice.actions;
const { selectAll, selectById } = jobAdapter.getSelectors((state)=>state['execution-engine']);

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
"./js/src/core/modules/execution-engine/hooks/useJobs.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useJobs: () => (useJobs)
});
/* ESM import */var _Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/core/app/store/index.ts");
/* ESM import */var _execution_engine_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/execution-engine/execution-engine-slice.ts");
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

const useJobs = ()=>{
    const dispatch = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppDispatch)();
    const jobs = (0,_Pimcore_app_store__WEBPACK_IMPORTED_MODULE_0__.useAppSelector)(_execution_engine_slice__WEBPACK_IMPORTED_MODULE_1__.selectAll);
    function updateJob(jobId, update) {
        dispatch((0,_execution_engine_slice__WEBPACK_IMPORTED_MODULE_1__.jobUpdated)({
            id: jobId,
            changes: {
                ...update
            }
        }));
    }
    function removeJob(jobId) {
        dispatch((0,_execution_engine_slice__WEBPACK_IMPORTED_MODULE_1__.jobDeleted)(jobId));
    }
    ;
    function addJob(job) {
        dispatch((0,_execution_engine_slice__WEBPACK_IMPORTED_MODULE_1__.jobReceived)(job));
    }
    return {
        jobs,
        updateJob,
        removeJob,
        addJob
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
"./js/src/core/modules/execution-engine/jobs/abstact-job.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  JobStatus: () => (JobStatus)
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
*/ var JobStatus = /*#__PURE__*/ function(JobStatus) {
    JobStatus["QUEUED"] = "queued";
    JobStatus["RUNNING"] = "running";
    JobStatus["SUCCESS"] = "success";
    JobStatus["FINISHED_WITH_ERRORS"] = "finished_with_errors";
    JobStatus["FAILED"] = "failed";
    return JobStatus;
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
"./js/src/core/modules/perspectives/enums/tree-permission.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  TreePermission: () => (TreePermission)
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
*/ var TreePermission = /*#__PURE__*/ function(TreePermission) {
    TreePermission["Add"] = "add";
    TreePermission["AddFolder"] = "addFolder";
    TreePermission["Copy"] = "copy";
    TreePermission["Cut"] = "cut";
    TreePermission["Delete"] = "delete";
    TreePermission["Lock"] = "lock";
    TreePermission["LockAndPropagate"] = "lockAndPropagate";
    TreePermission["Paste"] = "paste";
    TreePermission["Publish"] = "publish";
    TreePermission["Refresh"] = "refresh";
    TreePermission["Rename"] = "rename";
    TreePermission["SearchAndMove"] = "searchAndMove";
    TreePermission["Unlock"] = "unlock";
    TreePermission["UnlockAndPropagate"] = "unlockAndPropagate";
    TreePermission["Unpublish"] = "unpublish";
    // Asset specific
    TreePermission["HideAdd"] = "hideAdd";
    TreePermission["AddUpload"] = "addUpload";
    TreePermission["AddUploadZip"] = "addUploadZip";
    TreePermission["Download"] = "download";
    TreePermission["DownloadZip"] = "downloadZip";
    TreePermission["UploadNewVersion"] = "uploadNewVersion";
    // Data object specific
    TreePermission["ChangeChildrenSortBy"] = "changeChildrenSortBy";
    return TreePermission;
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
"./js/src/core/modules/widget-manager/utils/tools.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getWidgetId: () => (getWidgetId)
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
*/ const getWidgetId = (elementType, id)=>{
    return `${elementType}-${id.toString()}`;
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
"./js/src/core/utils/files.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  replaceFileEnding: () => (replaceFileEnding),
  saveFileLocal: () => (saveFileLocal)
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
*/ function replaceFileEnding(name, ending) {
    const extensionP = name.split('.');
    extensionP[extensionP.length - 1] = ending;
    return extensionP.join('.');
}
function saveFileLocal(url, name) {
    const a = document.createElement('a');
    a.download = name ?? '';
    a.href = url;
    a.click();
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
//# sourceMappingURL=js_src_core_components_button-group_button-group_tsx-js_src_core_components_dropdown_dropdown-d9eff4.js.map