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
  'DynamicTypes/GridCellRegistry': 'DynamicTypes/GridCellRegistry',
  'DynamicTypes/ListingRegistry': 'DynamicTypes/ListingRegistry',
  'DynamicTypes/MetadataRegistry': 'DynamicTypes/MetadataRegistry'
}

export const serviceIds = {
  // Widget manager
  widgetManager: 'WidgetManagerService',

  // Assets
  'Asset/Editor/TypeComponentRegistry': 'Asset/Editor/TypeComponentRegistry',
  'Asset/Editor/DocumentTabManager': 'Asset/Editor/DocumentTabManager',
  'Asset/Editor/FolderTabManager': 'Asset/Editor/FolderTabManager',
  'Asset/Editor/ImageTabManager': 'Asset/Editor/ImageTabManager',
  'Asset/Editor/TextTabManager': 'Asset/Editor/TextTabManager',
  'Asset/Editor/VideoTabManager': 'Asset/Editor/VideoTabManager',
  'Asset/Editor/AudioTabManager': 'Asset/Editor/AudioTabManager',
  'Asset/Editor/ArchiveTabManager': 'Asset/Editor/ArchiveTabManager',
  'Asset/Editor/UnknownTabManager': 'Asset/Editor/UnknownTabManager',
  'Asset/MetadataTypeProvider/MetadataTypeRegistry': 'Asset/MetadataTypeProvider/MetadataTypeRegistry',

  // Data Objects
  'DataObject/Editor/TypeComponentRegistry': 'DataObject/Editor/TypeComponentRegistry',
  'DataObject/Editor/ObjectTabManager': 'DataObject/Editor/ObjectTabManager',
  'DataObject/Editor/FolderTabManager': 'DataObject/Editor/FolderTabManager',

  // icon library
  iconLibrary: 'IconLibrary',

  // Grid
  'Grid/TypeRegistry': 'Grid/TypeRegistry',

  // dynamic types
  ...dynamicTypeRegistriesServiceIds,

  'DynamicTypes/FieldFilter/Text': 'DynamicTypes/FieldFilter/Text',
  'DynamicTypes/FieldFilter/Select': 'DynamicTypes/FieldFilter/Select',

  'DynamicTypes/GridCell/Text': 'DynamicTypes/GridCell/Text',
  'DynamicTypes/GridCell/Textarea': 'DynamicTypes/GridCell/Textarea',
  'DynamicTypes/GridCell/Select': 'DynamicTypes/GridCell/Select',
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
  'DynamicTypes/GridCell/DependencyTypeIcon': 'DynamicTypes/GridCell/DependencyTypeIcon',
  'DynamicTypes/GridCell/AssetCustomMetadataIcon': 'DynamicTypes/GridCell/AssetCustomMetadataIcon',
  'DynamicTypes/GridCell/AssetCustomMetadataValue': 'DynamicTypes/GridCell/AssetCustomMetadataValue',
  'DynamicTypes/GridCell/PropertyIcon': 'DynamicTypes/GridCell/PropertyIcon',
  'DynamicTypes/GridCell/PropertyValue': 'DynamicTypes/GridCell/PropertyValue',
  'DynamicTypes/GridCell/ScheduleActionsSelect': 'DynamicTypes/GridCell/ScheduleActionsSelect',
  'DynamicTypes/GridCell/VersionsIdSelect': 'DynamicTypes/GridCell/VersionsIdSelect',
  'DynamicTypes/GridCell/AssetVersionPreviewFieldLabel': 'DynamicTypes/GridCell/AssetVersionPreviewFieldLabel',

  'DynamicTypes/Listing/Text': 'DynamicTypes/Listing/Text',
  'DynamicTypes/Listing/Select': 'DynamicTypes/Listing/Select',

  'DynamicTypes/Metadata/Asset': 'DynamicTypes/Metadata/Asset',
  'DynamicTypes/Metadata/Document': 'DynamicTypes/Metadata/Document',
  'DynamicTypes/Metadata/Object': 'DynamicTypes/Metadata/Object',
  'DynamicTypes/Metadata/Input': 'DynamicTypes/Metadata/Input',
  'DynamicTypes/Metadata/Textarea': 'DynamicTypes/Metadata/Textarea',
  'DynamicTypes/Metadata/Checkbox': 'DynamicTypes/Metadata/Checkbox',
  'DynamicTypes/Metadata/Select': 'DynamicTypes/Metadata/Select',
  'DynamicTypes/Metadata/Date': 'DynamicTypes/Metadata/Date',

  // Execution engine
  'ExecutionEngine/JobComponentRegistry': 'ExecutionEngine/JobComponentRegistry',

  // Component registry
  'App/ComponentRegistry/ComponentRegistry': 'App/ComponentRegistry/ComponentRegistry'
}
