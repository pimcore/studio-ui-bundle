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
(self["webpackChunkpimcore_studio_ui_bundle"] = self["webpackChunkpimcore_studio_ui_bundle"] || []).push([["js_src_core_components_content_content_tsx-js_src_core_components_flex_flex_tsx-js_src_core_c-ef7f05"], {
"./js/src/core/app/config/services/service-ids.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  dynamicTypeRegistriesServiceIds: () => (dynamicTypeRegistriesServiceIds),
  serviceIds: () => (serviceIds)
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
 */ /* eslint-disable max-lines */ const dynamicTypeRegistriesServiceIds = {
    'DynamicTypes/FieldFilterRegistry': 'DynamicTypes/FieldFilterRegistry',
    'DynamicTypes/BatchEditRegistry': 'DynamicTypes/BatchEditRegistry',
    'DynamicTypes/GridCellRegistry': 'DynamicTypes/GridCellRegistry',
    'DynamicTypes/AdvancedGridCellRegistry': 'DynamicTypes/AdvancedGridCellRegistry',
    'DynamicTypes/ListingRegistry': 'DynamicTypes/ListingRegistry',
    'DynamicTypes/MetadataRegistry': 'DynamicTypes/MetadataRegistry',
    'DynamicTypes/CustomReportDefinitionRegistry': 'DynamicTypes/CustomReportDefinitionRegistry',
    'DynamicTypes/ObjectLayoutRegistry': 'DynamicTypes/ObjectLayoutRegistry',
    'DynamicTypes/ObjectDataRegistry': 'DynamicTypes/ObjectDataRegistry',
    'DynamicTypes/DocumentEditableRegistry': 'DynamicTypes/DocumentEditableRegistry',
    'DynamicTypes/EditableDialogLayoutRegistry': 'DynamicTypes/EditableDialogLayoutRegistry',
    'DynamicTypes/AssetRegistry': 'DynamicTypes/AssetRegistry',
    'DynamicTypes/DocumentRegistry': 'DynamicTypes/DocumentRegistry',
    'DynamicTypes/ObjectRegistry': 'DynamicTypes/ObjectRegistry',
    'DynamicTypes/Grid/SourceFieldsRegistry': 'DynamicTypes/Grid/SourceFieldsRegistry',
    'DynamicTypes/Grid/TransformersRegistry': 'DynamicTypes/Grid/TransformersRegistry',
    'DynamicTypes/ThemeRegistry': 'DynamicTypes/ThemeRegistry',
    'DynamicTypes/IconSetRegistry': 'DynamicTypes/IconSetRegistry',
    'DynamicTypes/IconSet/PimcoreDefault': 'DynamicTypes/IconSet/PimcoreDefault',
    'DynamicTypes/IconSet/Twemoji': 'DynamicTypes/IconSet/Twemoji',
    'DynamicTypes/WidgetEditor/WidgetTypeRegistry': 'DynamicTypes/WidgetEditor/WidgetTypeRegistry'
};
const serviceIds = {
    // Main nav
    mainNavRegistry: 'MainNavRegistry',
    // Widget manager
    widgetManager: 'WidgetManagerService',
    // Background processor
    backgroundProcessor: 'BackgroundProcessorService',
    // Form services
    debouncedFormRegistry: 'DebouncedFormRegistry',
    // Global message system
    globalMessageBusProcess: 'GlobalMessageBusProcess',
    globalMessageBus: 'GlobalMessageBus',
    // Dynamic Type Theme instances
    'DynamicTypes/Theme/StudioDefaultLight': 'DynamicTypes/Theme/StudioDefaultLight',
    'DynamicTypes/Theme/StudioDefaultDark': 'DynamicTypes/Theme/StudioDefaultDark',
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
    'Asset/ThumbnailService': 'Asset/ThumbnailService',
    // Data Objects
    'DataObject/Editor/TypeRegistry': 'DataObject/Editor/TypeRegistry',
    'DataObject/Editor/ObjectTabManager': 'DataObject/Editor/ObjectTabManager',
    'DataObject/Editor/VariantTabManager': 'DataObject/Editor/VariantTabManager',
    'DataObject/Editor/FolderTabManager': 'DataObject/Editor/FolderTabManager',
    // Documents
    'Document/Editor/TypeRegistry': 'Document/Editor/TypeRegistry',
    'Document/Editor/PageTabManager': 'Document/Editor/PageTabManager',
    'Document/Editor/EmailTabManager': 'Document/Editor/EmailTabManager',
    'Document/Editor/FolderTabManager': 'Document/Editor/FolderTabManager',
    'Document/Editor/HardlinkTabManager': 'Document/Editor/HardlinkTabManager',
    'Document/Editor/LinkTabManager': 'Document/Editor/LinkTabManager',
    'Document/Editor/SnippetTabManager': 'Document/Editor/SnippetTabManager',
    // Document Sidebar Managers
    'Document/Editor/Sidebar/PageSidebarManager': 'Document/Editor/Sidebar/PageSidebarManager',
    'Document/Editor/Sidebar/SnippetSidebarManager': 'Document/Editor/Sidebar/SnippetSidebarManager',
    'Document/Editor/Sidebar/EmailSidebarManager': 'Document/Editor/Sidebar/EmailSidebarManager',
    'Document/Editor/Sidebar/LinkSidebarManager': 'Document/Editor/Sidebar/LinkSidebarManager',
    'Document/Editor/Sidebar/HardlinkSidebarManager': 'Document/Editor/Sidebar/HardlinkSidebarManager',
    'Document/Editor/Sidebar/FolderSidebarManager': 'Document/Editor/Sidebar/FolderSidebarManager',
    // icon library
    iconLibrary: 'IconLibrary',
    // Grid
    'Grid/TypeRegistry': 'Grid/TypeRegistry',
    // dynamic types
    ...dynamicTypeRegistriesServiceIds,
    'DynamicTypes/FieldFilter/DataObjectAdapter': 'DynamicTypes/FieldFilter/DataObjectAdapter',
    'DynamicTypes/FieldFilter/DataObjectObjectBrick': 'DynamicTypes/FieldFilter/DataObjectObjectBrick',
    'DynamicTypes/FieldFilter/String': 'DynamicTypes/FieldFilter/String',
    'DynamicTypes/FieldFilter/Fulltext': 'DynamicTypes/FieldFilter/Fulltext',
    'DynamicTypes/FieldFilter/Input': 'DynamicTypes/FieldFilter/Input',
    'DynamicTypes/FieldFilter/None': 'DynamicTypes/FieldFilter/None',
    'DynamicTypes/FieldFilter/Id': 'DynamicTypes/FieldFilter/Id',
    'DynamicTypes/FieldFilter/Number': 'DynamicTypes/FieldFilter/Number',
    'DynamicTypes/FieldFilter/Multiselect': 'DynamicTypes/FieldFilter/Multiselect',
    'DynamicTypes/FieldFilter/Date': 'DynamicTypes/FieldFilter/Date',
    'DynamicTypes/FieldFilter/Boolean': 'DynamicTypes/FieldFilter/Boolean',
    'DynamicTypes/FieldFilter/BooleanSelect': 'DynamicTypes/FieldFilter/BooleanSelect',
    'DynamicTypes/FieldFilter/Consent': 'DynamicTypes/FieldFilter/Consent',
    'DynamicTypes/FieldFilter/ClassificationStore': 'DynamicTypes/FieldFilter/ClassificationStore',
    'DynamicTypes/BatchEdit/Text': 'DynamicTypes/BatchEdit/Text',
    'DynamicTypes/BatchEdit/TextArea': 'DynamicTypes/BatchEdit/TextArea',
    'DynamicTypes/BatchEdit/Datetime': 'DynamicTypes/BatchEdit/Datetime',
    'DynamicTypes/BatchEdit/Select': 'DynamicTypes/BatchEdit/Select',
    'DynamicTypes/BatchEdit/Checkbox': 'DynamicTypes/BatchEdit/Checkbox',
    'DynamicTypes/BatchEdit/ElementDropzone': 'DynamicTypes/BatchEdit/ElementDropzone',
    'DynamicTypes/BatchEdit/ClassificationStore': 'DynamicTypes/BatchEdit/ClassificationStore',
    'DynamicTypes/BatchEdit/DataObjectAdapter': 'DynamicTypes/BatchEdit/DataObjectAdapter',
    'DynamicTypes/BatchEdit/DataObjectObjectBrick': 'DynamicTypes/BatchEdit/DataObjectObjectBrick',
    'DynamicTypes/GridCell/Text': 'DynamicTypes/GridCell/Text',
    'DynamicTypes/GridCell/String': 'DynamicTypes/GridCell/String',
    'DynamicTypes/GridCell/Integer': 'DynamicTypes/GridCell/Integer',
    'DynamicTypes/GridCell/Error': 'DynamicTypes/GridCell/Error',
    'DynamicTypes/GridCell/Array': 'DynamicTypes/GridCell/Array',
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
    'DynamicTypes/GridCell/WebsiteSettingsValue': 'DynamicTypes/GridCell/WebsiteSettingsValue',
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
    'DynamicTypes/GridCell/ClassificationStore': 'DynamicTypes/GridCell/ClassificationStore',
    'DynamicTypes/GridCell/DataObjectAdvanced': 'DynamicTypes/GridCell/DataObjectAdvanced',
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
    'DynamicTypes/CustomReportDefinition/Sql': 'DynamicTypes/CustomReportDefinition/Sql',
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
    // Document editables
    'DynamicTypes/DocumentEditable/Area': 'DynamicTypes/DocumentEditable/Area',
    'DynamicTypes/DocumentEditable/Areablock': 'DynamicTypes/DocumentEditable/Areablock',
    'DynamicTypes/DocumentEditable/Block': 'DynamicTypes/DocumentEditable/Block',
    'DynamicTypes/DocumentEditable/Checkbox': 'DynamicTypes/DocumentEditable/Checkbox',
    'DynamicTypes/DocumentEditable/Date': 'DynamicTypes/DocumentEditable/Date',
    'DynamicTypes/DocumentEditable/Embed': 'DynamicTypes/DocumentEditable/Embed',
    'DynamicTypes/DocumentEditable/Image': 'DynamicTypes/DocumentEditable/Image',
    'DynamicTypes/DocumentEditable/Input': 'DynamicTypes/DocumentEditable/Input',
    'DynamicTypes/DocumentEditable/Link': 'DynamicTypes/DocumentEditable/Link',
    'DynamicTypes/DocumentEditable/MultiSelect': 'DynamicTypes/DocumentEditable/MultiSelect',
    'DynamicTypes/DocumentEditable/Numeric': 'DynamicTypes/DocumentEditable/Numeric',
    'DynamicTypes/DocumentEditable/Pdf': 'DynamicTypes/DocumentEditable/Pdf',
    'DynamicTypes/DocumentEditable/Relation': 'DynamicTypes/DocumentEditable/Relation',
    'DynamicTypes/DocumentEditable/Relations': 'DynamicTypes/DocumentEditable/Relations',
    'DynamicTypes/DocumentEditable/Renderlet': 'DynamicTypes/DocumentEditable/Renderlet',
    'DynamicTypes/DocumentEditable/ScheduledBlock': 'DynamicTypes/DocumentEditable/ScheduledBlock',
    'DynamicTypes/DocumentEditable/Select': 'DynamicTypes/DocumentEditable/Select',
    'DynamicTypes/DocumentEditable/Snippet': 'DynamicTypes/DocumentEditable/Snippet',
    'DynamicTypes/DocumentEditable/Table': 'DynamicTypes/DocumentEditable/Table',
    'DynamicTypes/DocumentEditable/Textarea': 'DynamicTypes/DocumentEditable/Textarea',
    'DynamicTypes/DocumentEditable/Video': 'DynamicTypes/DocumentEditable/Video',
    'DynamicTypes/DocumentEditable/Wysiwyg': 'DynamicTypes/DocumentEditable/Wysiwyg',
    // Document editable dialog layout
    'DynamicTypes/EditableDialogLayout/Tabpanel': 'DynamicTypes/EditableDialogLayout/Tabpanel',
    'DynamicTypes/EditableDialogLayout/Panel': 'DynamicTypes/EditableDialogLayout/Panel',
    // Document types
    'DynamicTypes/Document/Page': 'DynamicTypes/Document/Page',
    'DynamicTypes/Document/Newsletter': 'DynamicTypes/Document/Newsletter',
    'DynamicTypes/Document/Snippet': 'DynamicTypes/Document/Snippet',
    'DynamicTypes/Document/Link': 'DynamicTypes/Document/Link',
    'DynamicTypes/Document/Hardlink': 'DynamicTypes/Document/Hardlink',
    'DynamicTypes/Document/Email': 'DynamicTypes/Document/Email',
    'DynamicTypes/Document/Folder': 'DynamicTypes/Document/Folder',
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
    // Advanced Columns source fields
    'DynamicTypes/Grid/SourceFields/Text': 'DynamicTypes/Grid/SourceFields/Text',
    'DynamicTypes/Grid/SourceFields/SimpleField': 'DynamicTypes/Grid/SourceFields/SimpleField',
    'DynamicTypes/Grid/SourceFields/RelationField': 'DynamicTypes/Grid/SourceFields/RelationField',
    // Advanced Columns transformers
    'DynamicTypes/Grid/Transformers/BooleanFormatter': 'DynamicTypes/Grid/Transformers/BooleanFormatter',
    'DynamicTypes/Grid/Transformers/DateFormatter': 'DynamicTypes/Grid/Transformers/DateFormatter',
    'DynamicTypes/Grid/Transformers/ElementCounter': 'DynamicTypes/Grid/Transformers/ElementCounter',
    'DynamicTypes/Grid/Transformers/TwigOperator': 'DynamicTypes/Grid/Transformers/TwigOperator',
    'DynamicTypes/Grid/Transformers/Anonymizer': 'DynamicTypes/Grid/Transformers/Anonymizer',
    'DynamicTypes/Grid/Transformers/Blur': 'DynamicTypes/Grid/Transformers/Blur',
    'DynamicTypes/Grid/Transformers/ChangeCase': 'DynamicTypes/Grid/Transformers/ChangeCase',
    'DynamicTypes/Grid/Transformers/Combine': 'DynamicTypes/Grid/Transformers/Combine',
    'DynamicTypes/Grid/Transformers/Explode': 'DynamicTypes/Grid/Transformers/Explode',
    'DynamicTypes/Grid/Transformers/StringReplace': 'DynamicTypes/Grid/Transformers/StringReplace',
    'DynamicTypes/Grid/Transformers/Substring': 'DynamicTypes/Grid/Transformers/Substring',
    'DynamicTypes/Grid/Transformers/Trim': 'DynamicTypes/Grid/Transformers/Trim',
    'DynamicTypes/Grid/Transformers/Translate': 'DynamicTypes/Grid/Transformers/Translate',
    'DynamicTypes/Grid/Transformers/PHPCode': 'DynamicTypes/Grid/Transformers/PHPCode',
    // Widget Editor types
    'DynamicTypes/WidgetEditor/ElementTree': 'DynamicTypes/WidgetEditor/ElementTree',
    // Execution engine
    'ExecutionEngine/JobComponentRegistry': 'ExecutionEngine/JobComponentRegistry',
    // Execution Engine
    executionEngine: 'ExecutionEngine',
    // Component registry
    'App/ComponentRegistry/ComponentRegistry': 'App/ComponentRegistry/ComponentRegistry',
    // Context menu registry
    'App/ContextMenuRegistry/ContextMenuRegistry': 'App/ContextMenuRegistry/ContextMenuRegistry',
    // Document required fields validation service
    'Document/RequiredFieldsValidationService': 'Document/RequiredFieldsValidationService',
    // Processor registries
    'Document/ProcessorRegistry/UrlProcessor': 'Document/ProcessorRegistry/UrlProcessor',
    'Document/ProcessorRegistry/SaveDataProcessor': 'Document/ProcessorRegistry/SaveDataProcessor',
    'DataObject/ProcessorRegistry/SaveDataProcessor': 'DataObject/ProcessorRegistry/SaveDataProcessor',
    'Asset/ProcessorRegistry/SaveDataProcessor': 'Asset/ProcessorRegistry/SaveDataProcessor',
    'WidgetManager/ProcessorRegistry/PerspectiveProcessor': 'WidgetManager/ProcessorRegistry/PerspectiveProcessor'
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
"./js/src/core/components/flex/flex.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param, props)=>{
    let { css } = param;
    return {
        rowColGap: css`
      column-gap: ${props.x}px;
      row-gap: ${props.y}px;
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
"./js/src/core/components/flex/utils/mapGapToTokenValue.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  mapGapToTokenValue: () => (mapGapToTokenValue)
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
 */ function mapGapToTokenValue(param) {
    let { token, gap } = param;
    switch(gap){
        case 'mini':
            return token.sizeXXS;
        case 'extra-small':
            return token.sizeXS;
        case 'small':
            return token.sizeSM;
        case 'normal':
            return token.size;
        case 'medium':
            return token.sizeMD;
        case 'large':
            return token.sizeLG;
        case 'extra-large':
            return token.sizeXL;
        case 'maxi':
            return token.sizeXXL;
        default:
            return 0;
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
"./js/src/core/components/icon/icon.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
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
    let { token, css } = param;
    return {
        iconHide: css`
      display: none;
    `,
        subIcon: css`
      position: absolute;
      height: 10px;
      z-index: 100;
      bottom: 0;
      left: 0;

      & svg {
        width: inherit;
        height: inherit;
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
"./js/src/core/components/no-content/no-content.styles.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyle: () => (useStyle)
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
const useStyle = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { token, css } = param;
    return {
        content: css`
      .ant-empty-image {
        margin-bottom: ${token.marginXS}px;
        height: auto;
      }
        
      .ant-empty-description {
        padding: 5px ${token.controlPaddingHorizontal}px;
        font-size: 14px;
        color: ${token.Empty.colorTextDisabled};
        line-height: 20px;
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
"./js/src/core/utils/sizing.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SIZING_VALUES: () => (SIZING_VALUES),
  generateAllMarginSizingCSS: () => (generateAllMarginSizingCSS),
  generateAllPaddingSizingCSS: () => (generateAllPaddingSizingCSS),
  getMarginStyles: () => (getMarginStyles),
  getPaddingStyles: () => (getPaddingStyles)
});
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
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
const SIZING_VALUES = [
    'none',
    'mini',
    'extra-small',
    'small',
    'normal',
    'medium',
    'large',
    'extra-large',
    'maxi'
];
const getTokenValue = (token, size, type)=>{
    const mapping = {
        margin: {
            none: 0,
            mini: token.marginXXS,
            'extra-small': token.marginXS,
            small: token.marginSM,
            normal: token.margin,
            medium: token.marginMD,
            large: token.marginLG,
            'extra-large': token.marginXL,
            maxi: token.marginXXL
        },
        padding: {
            none: 0,
            mini: token.paddingXXS,
            'extra-small': token.paddingXS,
            small: token.paddingSM,
            normal: token.padding,
            medium: token.paddingMD,
            large: token.paddingLG,
            'extra-large': token.paddingXL,
            maxi: token.sizeXXL
        }
    };
    return mapping[type][size] ?? mapping[type].normal;
};
const generateStyles = (token, definition, type)=>{
    if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(definition)) {
        return {};
    }
    if (typeof definition === 'string') {
        const value = getTokenValue(token, definition, type);
        return {
            [type]: `${value}px`
        };
    }
    const styles = {};
    const propMapping = {
        x: [
            'Left',
            'Right'
        ],
        y: [
            'Top',
            'Bottom'
        ],
        top: [
            'Top'
        ],
        bottom: [
            'Bottom'
        ],
        left: [
            'Left'
        ],
        right: [
            'Right'
        ]
    };
    for (const [key, props] of Object.entries(propMapping)){
        if (Object.prototype.hasOwnProperty.call(definition, key) === true) {
            const size = definition[key];
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(size)) {
                const value = getTokenValue(token, size, type);
                for (const prop of props){
                    styles[`${type}${prop}`] = `${value}px`;
                }
            }
        }
    }
    return styles;
};
const getMarginStyles = (token, margin)=>generateStyles(token, margin, 'margin');
const getPaddingStyles = (token, padding)=>generateStyles(token, padding, 'padding');
const generateSpacingCSS = (prefixCls, modifier, size, locations, spacingType, token)=>{
    const value = getTokenValue(token, size, spacingType);
    const rules = [];
    for (const location of locations){
        const props = {
            x: [
                'left',
                'right'
            ],
            y: [
                'top',
                'bottom'
            ],
            top: [
                'top'
            ],
            bottom: [
                'bottom'
            ],
            left: [
                'left'
            ],
            right: [
                'right'
            ]
        }[location];
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(props)) {
            const style = props.map((prop)=>`${spacingType}-${prop}: ${value}px;`).join(' ');
            rules.push(`
        &.${prefixCls}--${modifier}-${size} {
          ${style}
        }
      `);
        }
    }
    return rules.join('\n');
};
const generateAllSizingCSS = (prefixCls, modifier, token, locations, type)=>SIZING_VALUES.map((size)=>generateSpacingCSS(prefixCls, modifier, size, locations, type, token)).join('\n');
const generateAllMarginSizingCSS = (prefixCls, modifier, token, locations)=>generateAllSizingCSS(prefixCls, modifier, token, locations, 'margin');
const generateAllPaddingSizingCSS = (prefixCls, modifier, token, locations)=>generateAllSizingCSS(prefixCls, modifier, token, locations, 'padding');

function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),
"./js/src/core/components/box/box.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
    let { css } = param;
    return {
        box: css`
      &.box--inline {
        display: inline-block;
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
"./js/src/core/components/box/box.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Box: () => (Box)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _box_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/box/box.styles.tsx");
/* ESM import */var _utils_sizing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/utils/sizing.ts");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
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




const Box = (param)=>{
    let { children, padding, margin, className, component = 'div', inline, style, ...props } = param;
    _s();
    const { styles } = (0,_box_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles)();
    const { useToken } = antd__WEBPACK_IMPORTED_MODULE_4__.theme;
    const { token } = useToken();
    const ComponentType = component;
    const combinedStyles = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const paddingStyles = (0,_utils_sizing__WEBPACK_IMPORTED_MODULE_3__.getPaddingStyles)(token, padding);
        const marginStyles = (0,_utils_sizing__WEBPACK_IMPORTED_MODULE_3__.getMarginStyles)(token, margin);
        return {
            ...paddingStyles,
            ...marginStyles,
            ...style
        };
    }, [
        padding,
        margin,
        style,
        antd__WEBPACK_IMPORTED_MODULE_4__.theme
    ]);
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ComponentType, {
            className: `box ${styles.box} ${inline === true ? 'box--inline' : ''} ${className ?? ''}`,
            style: combinedStyles,
            ...props,
            children: children
        }, void 0, false, {
            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/box/box.tsx",
            lineNumber: 44,
            columnNumber: 24
        }, undefined), [
        children,
        className,
        component,
        inline,
        combinedStyles
    ]);
};
_s(Box, "R8DcbQM1jMDos4wR2QOZL8Ffosg=", true, function() {
    return [
        _box_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles
    ];
});
_c = Box;
var _c;
$RefreshReg$(_c, "Box");

function $RefreshSig$() {
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
/* ESM import */var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/framer-motion/framer-motion");
/* ESM import */var framer_motion__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(framer_motion__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/classnames/classnames");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _spin_spin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* ESM import */var _button_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/button/button.styles.tsx");
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






const Component = (param, ref)=>{
    let { loading, children, className, type, color, ...props } = param;
    _s();
    const buttonRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { styles } = (0,_button_styles__WEBPACK_IMPORTED_MODULE_6__.useStyles)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, ()=>buttonRef.current);
    const buttonClassNames = classnames__WEBPACK_IMPORTED_MODULE_4___default()('button', `button--type-${type}`, `button--color-${color}`, styles.button, {
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
            loading === true ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_3__.AnimatePresence, {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.div, {
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
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_spin_spin__WEBPACK_IMPORTED_MODULE_5__.Spin, {
                        size: "small",
                        spinning: true
                    }, void 0, false, {
                        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button/button.tsx",
                        lineNumber: 54,
                        columnNumber: 15
                    }, undefined)
                }, 'loading', false, {
                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button/button.tsx",
                    lineNumber: 47,
                    columnNumber: 13
                }, undefined)
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button/button.tsx",
                lineNumber: 46,
                columnNumber: 27
            }, undefined) : null,
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                className: 'button__text',
                children: children
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button/button.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/button/button.tsx",
        lineNumber: 45,
        columnNumber: 10
    }, undefined);
};
_s(Component, "315Y/69id0iBrj8R4esTOHdlcKQ=", false, function() {
    return [
        _button_styles__WEBPACK_IMPORTED_MODULE_6__.useStyles
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
"./js/src/core/components/content/content.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
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
    let { token, css } = param;
    return {
        content: css`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: auto;
      gap: 12px;

      &.content--overflow-x-hidden {
        overflow-x: hidden;
      }

      &.content--overflow-y-hidden {
        overflow-y: hidden;
      }

      &.content--overflow-x-auto {
        overflow-x: auto;
      }

      &.content--overflow-y-auto {
        overflow-y: auto;
      }

      &.content--overflow-x-visible {
        overflow-x: visible;
      }

      &.content--overflow-y-visible {
        overflow-y: visible;
      }

      &.content--overflow-x-scroll {
        overflow-x: scroll;
      }

      &.content--overflow-y-scroll {
        overflow-y: scroll;
      }

      &.content--padded {
        padding: ${token.paddingSM}px;
      }

      &.content--centered {
        justify-content: center;
        align-items: center;
      }
      
      &.content--padded .ant-table-thead,
      &.p-t-small .ant-table-thead {
        top: -${token.paddingSM}px;
      }
    `,
        contentFullPage: css`
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
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
"./js/src/core/components/content/content.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Content: () => (Content)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/classnames/classnames");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _content_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/core/components/content/content.styles.tsx");
/* ESM import */var _no_content_no_content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/no-content/no-content.tsx");
/* ESM import */var _spin_spin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/spin/spin.tsx");
/* ESM import */var _box_box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/box/box.tsx");
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






const Content = (param)=>{
    let { children, padded = false, padding = {
        top: 'small',
        x: 'extra-small',
        bottom: 'extra-small'
    }, overflow = {
        x: 'auto',
        y: 'auto'
    }, margin = 'none', className, loading = false, none = false, centered = false, noneOptions, fullPage, ...props } = param;
    _s();
    const { styles } = (0,_content_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles)();
    const showChildren = !loading && !none;
    const contentCentered = centered || none || loading;
    const classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()(styles.content, 'content', className, `content--overflow-x-${overflow.x}`, `content--overflow-y-${overflow.y}`, {
        'content--centered': contentCentered,
        [styles.contentFullPage]: fullPage
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_box_box__WEBPACK_IMPORTED_MODULE_6__.Box, {
        className: classes,
        padding: padded ? padding : 'none',
        ...props,
        children: [
            loading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_spin_spin__WEBPACK_IMPORTED_MODULE_5__.Spin, {
                asContainer: true,
                tip: "Loading"
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/content/content.tsx",
                lineNumber: 48,
                columnNumber: 19
            }, undefined),
            none && !loading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_no_content_no_content__WEBPACK_IMPORTED_MODULE_4__.NoContent, {
                ...noneOptions
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/content/content.tsx",
                lineNumber: 50,
                columnNumber: 28
            }, undefined),
            showChildren && children
        ]
    }, void 0, true, {
        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/content/content.tsx",
        lineNumber: 47,
        columnNumber: 10
    }, undefined);
};
_s(Content, "7xVbA/cAv2OTrtL4/ZezCn5HG/A=", false, function() {
    return [
        _content_styles__WEBPACK_IMPORTED_MODULE_3__.useStyles
    ];
});
_c = Content;
var _c;
$RefreshReg$(_c, "Content");

function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),
"./js/src/core/components/flex/flex.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Flex: () => (Flex)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/classnames/classnames");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_components_flex_utils_mapGapToTokenValue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/components/flex/utils/mapGapToTokenValue.ts");
/* ESM import */var _Pimcore_components_flex_flex_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/components/flex/flex.styles.ts");
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






const { useToken } = antd__WEBPACK_IMPORTED_MODULE_2__.theme;
const Flex = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(_c = _s((param, ref)=>{
    let { gap = 0, className, rootClassName, children, ...props } = param;
    _s();
    const { token } = useToken();
    const { x, y } = calculateGap(gap);
    const { styles } = (0,_Pimcore_components_flex_flex_styles__WEBPACK_IMPORTED_MODULE_6__.useStyles)({
        x,
        y
    });
    const flexClassNames = classnames__WEBPACK_IMPORTED_MODULE_3___default()(styles.rowColGap, className, rootClassName);
    /**
   * Calculates the row and column gaps based on the provided gap value.
   *  * The function handles three possible cases for the gap:
   *  * - A string value (predefined gap sizes like 'small', 'normal', etc.).
   *  * - A numeric value (representing a direct gap size).
   *  * - An object containing specific row and column gap sizes.
   */ function calculateGap(gap) {
        const getGapValue = (gap)=>{
            return (0,lodash__WEBPACK_IMPORTED_MODULE_4__.isNumber)(gap) ? gap : (0,_Pimcore_components_flex_utils_mapGapToTokenValue__WEBPACK_IMPORTED_MODULE_5__.mapGapToTokenValue)({
                token,
                gap
            });
        };
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_4__.isString)(gap)) return {
            x: getGapValue(gap),
            y: getGapValue(gap)
        };
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_4__.isNumber)(gap)) return {
            x: gap,
            y: gap
        };
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_4__.isObject)(gap)) {
            return {
                x: getGapValue(gap.x),
                y: getGapValue(gap.y)
            };
        }
        return {
            x: 0,
            y: 0
        };
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_2__.Flex, {
        className: flexClassNames,
        ...props,
        ref: ref,
        children: children
    }, void 0, false, {
        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/flex/flex.tsx",
        lineNumber: 75,
        columnNumber: 10
    }, undefined);
}, "e9FdJ9m9XKLdiLn7x4DrC7Tf3b4=", false, function() {
    return [
        useToken,
        _Pimcore_components_flex_flex_styles__WEBPACK_IMPORTED_MODULE_6__.useStyles
    ];
})), "e9FdJ9m9XKLdiLn7x4DrC7Tf3b4=", false, function() {
    return [
        useToken,
        _Pimcore_components_flex_flex_styles__WEBPACK_IMPORTED_MODULE_6__.useStyles
    ];
});
_c1 = Flex;
Flex.displayName = 'Flex';
var _c, _c1;
$RefreshReg$(_c, "Flex$forwardRef");
$RefreshReg$(_c1, "Flex");

function $RefreshSig$() {
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
                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon-text-button/icon-text-button.tsx",
                    lineNumber: 24,
                    columnNumber: 38
                }, undefined),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                    children: children
                }, void 0, false, {
                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon-text-button/icon-text-button.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, undefined),
                iconPlacement === 'right' && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
                    ...icon
                }, void 0, false, {
                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon-text-button/icon-text-button.tsx",
                    lineNumber: 30,
                    columnNumber: 39
                }, undefined)
            ]
        }, void 0, true, {
            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon-text-button/icon-text-button.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon-text-button/icon-text-button.tsx",
        lineNumber: 22,
        columnNumber: 10
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
"./js/src/core/components/icon/icon.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Icon: () => (Icon)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/lodash/lodash");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/classnames/classnames");
/* ESM import */var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* ESM import */var _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./js/src/core/app/depency-injection/index.ts");
/* ESM import */var _Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./js/src/core/app/config/services/service-ids.ts");
/* ESM import */var _icon_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./js/src/core/components/icon/icon.styles.ts");
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







const Icon = (param)=>{
    let { value, type = 'name', options, className, subIconName, subIconVariant = 'default', sphere = false, onLoadError, ...props } = param;
    _s();
    const iconLibrary = (0,_Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_5__.useInjection)(_Pimcore_app_config_services_service_ids__WEBPACK_IMPORTED_MODULE_6__.serviceIds.iconLibrary);
    const width = (options === null || options === void 0 ? void 0 : options.width) ?? 16;
    const height = (options === null || options === void 0 ? void 0 : options.height) ?? 16;
    const { styles } = (0,_icon_styles__WEBPACK_IMPORTED_MODULE_7__.useStyles)();
    const { token } = antd__WEBPACK_IMPORTED_MODULE_4__.theme.useToken();
    const containerSize = sphere ? 24 : width;
    const containerHeight = sphere ? 24 : height;
    const isNameType = type === 'name';
    const isPathType = type === 'path';
    const SvgIcon = isNameType ? iconLibrary.get(value) : undefined;
    const shouldHideIcon = isNameType && ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(value) || (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(SvgIcon));
    const renderIcon = ()=>{
        if (isPathType) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("img", {
                alt: '',
                className: "pimcore-icon__image",
                onError: ()=>{
                    onLoadError === null || onLoadError === void 0 ? void 0 : onLoadError(true);
                },
                onLoad: ()=>{
                    onLoadError === null || onLoadError === void 0 ? void 0 : onLoadError(false);
                },
                src: value,
                style: {
                    width,
                    height
                }
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon/icon.tsx",
                lineNumber: 46,
                columnNumber: 14
            }, undefined);
        }
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(SvgIcon)) {
            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                style: {
                    width,
                    height
                }
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon/icon.tsx",
                lineNumber: 56,
                columnNumber: 14
            }, undefined);
        }
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SvgIcon, {
            height: height,
            width: width,
            ...options
        }, void 0, false, {
            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon/icon.tsx",
            lineNumber: 61,
            columnNumber: 12
        }, undefined);
    };
    const SubIcon = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(subIconName) ? undefined : iconLibrary.get(subIconName);
    const containerStyle = sphere ? {
        width: containerSize,
        height: containerHeight,
        position: 'relative',
        backgroundColor: token.colorFillAlter,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    } : {
        width,
        height,
        position: 'relative'
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(`pimcore-icon pimcore-icon-${value} anticon ${className}`, {
            [styles.iconHide]: shouldHideIcon
        }),
        style: containerStyle,
        ...props,
        children: [
            !(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isNil)(SubIcon) && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: `${styles.subIcon} sub-icon-variant--${subIconVariant}`,
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SubIcon, {}, void 0, false, {
                    fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon/icon.tsx",
                    lineNumber: 81,
                    columnNumber: 100
                }, undefined)
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon/icon.tsx",
                lineNumber: 81,
                columnNumber: 27
            }, undefined),
            renderIcon()
        ]
    }, void 0, true, {
        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/icon/icon.tsx",
        lineNumber: 78,
        columnNumber: 10
    }, undefined);
};
_s(Icon, "OHXPC/QAqg+rPYRzzZfbsR2NQkc=", false, function() {
    return [
        _Pimcore_app_depency_injection__WEBPACK_IMPORTED_MODULE_5__.useInjection,
        _icon_styles__WEBPACK_IMPORTED_MODULE_7__.useStyles,
        antd__WEBPACK_IMPORTED_MODULE_4__.theme.useToken
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
"./js/src/core/components/no-content/no-content.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  NoContent: () => (NoContent)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/antd/antd");
/* ESM import */var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _no_content_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/core/components/no-content/no-content.styles.ts");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/core/components/icon/icon.tsx");
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




const NoContent = (param)=>{
    let { text } = param;
    _s();
    const { styles } = (0,_no_content_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle)();
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.content,
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Empty, {
            description: text,
            image: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pimcore_components_icon_icon__WEBPACK_IMPORTED_MODULE_4__.Icon, {
                options: {
                    width: 184,
                    height: 123
                },
                value: 'no-content'
            }, void 0, false, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/no-content/no-content.tsx",
                lineNumber: 22,
                columnNumber: 40
            }, void 0)
        }, void 0, false, {
            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/no-content/no-content.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/no-content/no-content.tsx",
        lineNumber: 21,
        columnNumber: 10
    }, undefined);
};
_s(NoContent, "URdYaXy4YmAznrcZlyZ0fUK29PA=", false, function() {
    return [
        _no_content_styles__WEBPACK_IMPORTED_MODULE_2__.useStyle
    ];
});
_c = NoContent;
var _c;
$RefreshReg$(_c, "NoContent");

function $RefreshSig$() {
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





const Spin = (param)=>{
    let { asContainer = false, type = 'dotted', tip, ...props } = param;
    _s();
    const { styles } = (0,_spin_styles__WEBPACK_IMPORTED_MODULE_4__.useStyles)();
    let icon = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_icon_icon__WEBPACK_IMPORTED_MODULE_3__.Icon, {
        className: styles.spin,
        value: "spinner"
    }, void 0, false, {
        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/spin/spin.tsx",
        lineNumber: 26,
        columnNumber: 14
    }, undefined);
    if (type === 'classic') {
        icon = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__["default"], {
            spin: true
        }, void 0, false, {
            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/spin/spin.tsx",
            lineNumber: 28,
            columnNumber: 12
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
                        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/spin/spin.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, undefined),
                    tip !== undefined && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        children: tip
                    }, void 0, false, {
                        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/spin/spin.tsx",
                        lineNumber: 40,
                        columnNumber: 33
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/spin/spin.tsx",
                lineNumber: 35,
                columnNumber: 23
            }, undefined)
        ]
    }, void 0, true);
};
_s(Spin, "7xVbA/cAv2OTrtL4/ZezCn5HG/A=", false, function() {
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


const { Text: AntText } = antd__WEBPACK_IMPORTED_MODULE_2__.Typography;
const Text = (props)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AntText, {
        ...props
    }, void 0, false, {
        fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/components/text/text.tsx",
        lineNumber: 17,
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
            fileName: "/Users/valeriia.maltseva/projects/pimcore/demo-enterprise/dev/pimcore/studio-ui-bundle/assets/js/src/core/lib/dependency-injection/index.tsx",
            lineNumber: 25,
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
"./js/src/core/modules/element/dynamic-types/registry/dynamic-type-registry-abstract.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicTypeAbstract: () => (DynamicTypeAbstract),
  DynamicTypeRegistryAbstract: () => (DynamicTypeRegistryAbstract)
});
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/sharing/consume/default/inversify/inversify");
/* ESM import */var inversify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./js/src/core/modules/app/error-handler/index.ts");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rsbuild/plugin-react/node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
var _dec, _class, _dec2, _class2;
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

let DynamicTypeAbstract = (_dec = (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(), _dec(_class = class DynamicTypeAbstract {
    constructor(){
        _defineProperty(this, "id", void 0);
    }
}) || _class);
let DynamicTypeRegistryAbstract = (_dec2 = (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(), _dec2(_class2 = class DynamicTypeRegistryAbstract {
    registerDynamicType(type) {
        if (this.dynamicTypes.has(type.id)) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`Dynamic type with id "${type.id}" already exists`));
        }
        this.dynamicTypes.set(type.id, type);
    }
    getDynamicType(id) {
        let throwException = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        const dynamicType = this.dynamicTypes.get(id);
        if (dynamicType === undefined && throwException) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`Dynamic type with id "${id}" not found`));
        }
        return dynamicType;
    }
    getDynamicTypes() {
        return Array.from(this.dynamicTypes.values());
    }
    overrideDynamicType(type) {
        if (!this.dynamicTypes.has(type.id)) {
            (0,_Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"])(new _Pimcore_modules_app_error_handler__WEBPACK_IMPORTED_MODULE_1__.GeneralError(`Dynamic type with id "${type.id}" not found`));
        }
        this.dynamicTypes.set(type.id, type);
    }
    hasDynamicType(id) {
        return this.dynamicTypes.has(id);
    }
    constructor(){
        _defineProperty(this, "dynamicTypes", new Map());
    }
}) || _class2);

function $RefreshSig$() {
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
//# sourceMappingURL=js_src_core_components_content_content_tsx-js_src_core_components_flex_flex_tsx-js_src_core_c-ef7f05.js.map