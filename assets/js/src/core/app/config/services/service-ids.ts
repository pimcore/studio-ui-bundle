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
  'DynamicTypes/ListingRegistry': 'DynamicTypes/ListingRegistry'
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

  'DynamicTypes/Listing/Text': 'DynamicTypes/Listing/Text',
  'DynamicTypes/Listing/Select': 'DynamicTypes/Listing/Select',

  // Execution engine
  'ExecutionEngine/JobComponentRegistry': 'ExecutionEngine/JobComponentRegistry',

  // Component registry
  'App/ComponentRegistry/ComponentRegistry': 'App/ComponentRegistry/ComponentRegistry'
}
