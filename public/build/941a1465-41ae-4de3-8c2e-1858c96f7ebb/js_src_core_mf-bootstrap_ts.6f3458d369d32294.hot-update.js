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
"./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/hotspot-image.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  HotspotImage: () => (HotspotImage)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/classnames/index.js");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/card/card.tsx");
/* ESM import */var _footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/footer.tsx");
/* ESM import */var _Pimcore_components_asset_target_asset_target__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/asset-target/asset-target.tsx");
/* ESM import */var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/react-i18next/dist/es/index.js");
/* ESM import */var _Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/drag-and-drop/droppable.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_hotspot_image_image_preview__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/image-preview.tsx");
/* ESM import */var _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./js/src/core/components/modal/form-modal/hooks/use-form-modal.tsx");
/* ESM import */var _Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_hotspot_image_utils_value_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/utils/value-data.ts");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_11__);
/* ESM import */var _Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./js/src/core/utils/css.tsx");
/* ESM import */var _hotspot_image_styles__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/hotspot-image.styles.tsx");
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













const HotspotImage = (props)=>{
    var _value_image;
    _s();
    const [value, setValueState] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(props.value ?? null);
    const [markerModalOpen, setMarkerModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [cropModalOpen, setCropModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { confirm } = (0,_Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_9__.useFormModal)();
    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)();
    const { styles } = (0,_hotspot_image_styles__WEBPACK_IMPORTED_MODULE_13__.useStyles)();
    const setValue = (newValue)=>{
        if (!lodash__WEBPACK_IMPORTED_MODULE_11___default().isEqual(newValue, value)) {
            var _props_onChange;
            setValueState(newValue);
            (_props_onChange = props.onChange) === null || _props_onChange === void 0 ? void 0 : _props_onChange.call(props, newValue);
        }
    };
    const emptyValue = ()=>{
        setValue(null);
    };
    const width = (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_12__.toCssDimension)(props.width, 300);
    const height = (0,_Pimcore_utils_css__WEBPACK_IMPORTED_MODULE_12__.toCssDimension)(props.height, 150);
    const replaceImage = (newImage)=>{
        if ((0,_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_hotspot_image_utils_value_data__WEBPACK_IMPORTED_MODULE_10__.hasValueData)(value)) {
            confirm({
                title: t('hotspots.clear-data'),
                content: t('hotspots.clear-data.dnd-message'),
                okText: t('yes'),
                cancelText: t('no'),
                onOk: ()=>{
                    setImage(newImage, true);
                },
                onCancel: ()=>{
                    setImage(newImage, false);
                }
            });
        } else {
            setImage(newImage, true);
        }
    };
    const setImage = (image, replaceValueData)=>{
        let newValue = value === null ? {
            image: null,
            hotspots: [],
            marker: [],
            crop: {}
        } : {
            ...value
        };
        if (replaceValueData) {
            newValue = {
                image,
                hotspots: [],
                marker: [],
                crop: {}
            };
        } else {
            newValue = {
                ...newValue,
                image
            };
        }
        setValue(newValue);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_card_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('max-w-full', styles.image, props.className),
        fitContent: true,
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_footer__WEBPACK_IMPORTED_MODULE_4__.HotspotImageFooter, {
            disabled: props.disabled,
            emptyValue: emptyValue,
            replaceImage: replaceImage,
            setCropModalOpen: setCropModalOpen,
            setMarkerModalOpen: setMarkerModalOpen,
            setValue: setValue,
            value: value
        }, "image-footer", false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/hotspot-image.tsx",
            lineNumber: 115,
            columnNumber: 16
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_drag_and_drop_droppable__WEBPACK_IMPORTED_MODULE_7__.Droppable, {
            isValidContext: (info)=>props.disabled !== true,
            isValidData: (info)=>info.type === 'asset' && info.data.type === 'image',
            onDrop: (info)=>{
                const newImage = {
                    type: 'asset',
                    id: info.data.id
                };
                replaceImage(newImage);
            },
            variant: "outline",
            children: value !== null && (value === null || value === void 0 ? void 0 : value.image) !== null ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_modules_element_dynamic_types_definitions_objects_data_related_components_hotspot_image_image_preview__WEBPACK_IMPORTED_MODULE_8__.HotspotImagePreview, {
                assetId: value === null || value === void 0 ? void 0 : (_value_image = value.image) === null || _value_image === void 0 ? void 0 : _value_image.id,
                cropModalOpen: cropModalOpen,
                disabled: props.disabled,
                height: height,
                markerModalOpen: markerModalOpen,
                onChange: setValue,
                setCropModalOpen: setCropModalOpen,
                setMarkerModalOpen: setMarkerModalOpen,
                value: value,
                width: width
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/hotspot-image.tsx",
                lineNumber: 138,
                columnNumber: 15
            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_asset_target_asset_target__WEBPACK_IMPORTED_MODULE_5__.AssetTarget, {
                dndIcon: props.disabled !== true,
                height: height,
                title: t(props.disabled !== true ? 'image.dnd-target' : 'empty-image'),
                width: width
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/hotspot-image.tsx",
                lineNumber: 152,
                columnNumber: 15
            }, undefined)
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/hotspot-image.tsx",
            lineNumber: 126,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/studio-ui-bundle/assets/js/src/core/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/hotspot-image.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, undefined);
};
_s(HotspotImage, "o3jTKTZd11ilYzK6FTvAdIk+mgc=", false, function() {
    return [
        _Pimcore_components_modal_form_modal_hooks_use_form_modal__WEBPACK_IMPORTED_MODULE_9__.useFormModal,
        react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation,
        _hotspot_image_styles__WEBPACK_IMPORTED_MODULE_13__.useStyles
    ];
});
_c = HotspotImage;
var _c;
$RefreshReg$(_c, "HotspotImage");

function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),

});
//# sourceMappingURL=js_src_core_mf-bootstrap_ts.6f3458d369d32294.hot-update.js.map