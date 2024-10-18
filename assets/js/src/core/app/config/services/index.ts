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

import { container } from '@Pimcore/app/depency-injection'
import { FolderTabManager } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/folder-tab-manager'
import { IconLibrary } from '@Pimcore/modules/icon-library/services/icon-library'
import { WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { ImageTabManager } from '@Pimcore/modules/asset/editor/types/image/tab-manager/image-tab-manager'
import { TypeRegistry } from '@Pimcore/components/grid/services/type-registry'
import { TextTabManager } from '@Pimcore/modules/asset/editor/types/text/tab-manager/text-tab-manager'
import { DocumentTabManager } from '@Pimcore/modules/asset/editor/types/document/tab-manager/document-tab-manager'
import { VideoTabManager } from '@Pimcore/modules/asset/editor/types/video/tab-manager/video-tab-manager'
import { AudioTabManager } from '@Pimcore/modules/asset/editor/types/audio/tab-manager/audio-tab-manager'
import { UnknownTabManager } from '@Pimcore/modules/asset/editor/types/unknown/tab-manager/unknown-tab-manager'
import { MetadataTypeRegistry } from '@Pimcore/modules/asset/metadata-type-provider/services/metadata-type-registry'
import { JobComponentRegistry } from '@Pimcore/modules/execution-engine/services/job-component-registry'
import { ArchiveTabManager } from '@Pimcore/modules/asset/editor/types/archive/tab-manager/archive-tab-manager'
import { ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { ObjectTabManager } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/object-tab-manager'
import { DynamicTypeFieldFilterRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/dynamic-type-field-filter-registry'
import { DynamicTypeListingText } from '@Pimcore/modules/element/dynamic-types/defintinitions/listing/text/dynamic-type-listing-text'
import { DynamicTypeListingRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/listing/dynamic-type-listing-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { DynamicTypeFieldFilterText } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/text/dynamic-type-field-filter-text'
import { DynamicTypeFieldFilterSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/select/dynamic-type-field-filter-select'
import { DynamicTypeListingSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/listing/select/dynamic-type-listing-select'

// Widget manager
container.bind(serviceIds.widgetManager).to(WidgetRegistry).inSingletonScope()

// Assets
container.bind(serviceIds['Asset/Editor/TypeComponentRegistry']).to(ComponentRegistry).inSingletonScope()

container.bind(serviceIds['Asset/Editor/DocumentTabManager']).to(DocumentTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/FolderTabManager']).to(FolderTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/ImageTabManager']).to(ImageTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/TextTabManager']).to(TextTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/VideoTabManager']).to(VideoTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/AudioTabManager']).to(AudioTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/ArchiveTabManager']).to(ArchiveTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/UnknownTabManager']).to(UnknownTabManager).inSingletonScope()
container.bind(serviceIds['Asset/MetadataTypeProvider/MetadataTypeRegistry']).to(MetadataTypeRegistry).inSingletonScope()

// Data Objects
container.bind(serviceIds['DataObject/Editor/TypeComponentRegistry']).to(ComponentRegistry).inSingletonScope()

container.bind(serviceIds['DataObject/Editor/ObjectTabManager']).to(ObjectTabManager).inSingletonScope()
container.bind(serviceIds['DataObject/Editor/FolderTabManager']).to(FolderTabManager).inSingletonScope()

// Icon library
container.bind(serviceIds.iconLibrary).to(IconLibrary).inSingletonScope()

// Grid
container.bind(serviceIds['Grid/TypeRegistry']).to(TypeRegistry).inSingletonScope()

// dynamic types field filters
container.bind(serviceIds['DynamicTypes/FieldFilterRegistry']).to(DynamicTypeFieldFilterRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Text']).to(DynamicTypeFieldFilterText).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Select']).to(DynamicTypeFieldFilterSelect).inSingletonScope()

// dynamic types listing
container.bind(serviceIds['DynamicTypes/ListingRegistry']).to(DynamicTypeListingRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Listing/Text']).to(DynamicTypeListingText).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Listing/Select']).to(DynamicTypeListingSelect).inSingletonScope()

// Execution engine
container.bind(serviceIds['ExecutionEngine/JobComponentRegistry']).to(JobComponentRegistry).inSingletonScope()

// Component registry
container.bind(serviceIds['App/ComponentRegistry/ComponentRegistry']).to(ComponentRegistry).inSingletonScope()
