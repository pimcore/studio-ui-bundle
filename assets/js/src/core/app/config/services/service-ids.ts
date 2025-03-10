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

export const dynamicTypeRegistriesServiceIds = {
  'DynamicTypes/FieldFilterRegistry': 'DynamicTypes/FieldFilterRegistry',
  'DynamicTypes/BatchEditRegistry': 'DynamicTypes/BatchEditRegistry',
  'DynamicTypes/GridCellRegistry': 'DynamicTypes/GridCellRegistry',
  'DynamicTypes/ListingRegistry': 'DynamicTypes/ListingRegistry',
  'DynamicTypes/MetadataRegistry': 'DynamicTypes/MetadataRegistry',
  'DynamicTypes/ObjectLayoutRegistry': 'DynamicTypes/ObjectLayoutRegistry',
  'DynamicTypes/ObjectDataRegistry': 'DynamicTypes/ObjectDataRegistry'
}

export const serviceIds = {
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

  'DynamicTypes/GridCell/Text': 'DynamicTypes/GridCell/Text',
  'DynamicTypes/GridCell/Textarea': 'DynamicTypes/GridCell/Textarea',
  'DynamicTypes/GridCell/Number': 'DynamicTypes/GridCell/Number',
  'DynamicTypes/GridCell/Select': 'DynamicTypes/GridCell/Select',
  'DynamicTypes/GridCell/MultiSelect': 'DynamicTypes/GridCell/MultiSelect',
  'DynamicTypes/GridCell/Checkbox': 'DynamicTypes/GridCell/Checkbox',
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

  // Execution engine
  'ExecutionEngine/JobComponentRegistry': 'ExecutionEngine/JobComponentRegistry',

  // Component registry
  'App/ComponentRegistry/ComponentRegistry': 'App/ComponentRegistry/ComponentRegistry'
}
