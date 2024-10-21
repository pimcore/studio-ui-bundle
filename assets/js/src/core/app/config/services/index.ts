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
import { DynamicTypeListingRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/listing/dynamic-type-listing-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { DynamicTypeFieldFilterText } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/types/text/dynamic-type-field-filter-text'
import { DynamicTypeFieldFilterSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/types/select/dynamic-type-field-filter-select'
import { DynamicTypeGridCellText } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/text/dynamic-type-grid-cell-text'
import { DynamicTypeGridCellRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/dynamic-type-grid-cell-registry'
import { DynamicTypeGridCellTextarea } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/textarea/dynamic-type-grid-cell-text'
import { DynamicTypeGridCellSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/select/dynamic-type-grid-cell-select'
import { DynamicTypeGridCellCheckbox } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/checkbox/dynamic-type-grid-cell-checkbox'
import { DynamicTypeGridCellDate } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/date/dynamic-type-grid-cell-date'
import { DynamicTypeGridCellTime } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/time/dynamic-type-grid-cell-time'
import { DynamicTypeGridCellDateTime } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/date-time/dynamic-type-grid-cell-date-time'
import { DynamicTypeGridCellAssetLink } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/asset-link/dynamic-type-grid-cell-asset-link'
import { DynamicTypeGridCellObjectLink } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/object-link/dynamic-type-grid-cell-object-link'
import { DynamicTypeGridCellDocumentLink } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/document-link/dynamic-type-grid-cell-document-link'
import { DynamicTypeGridCellOpenElement } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/open-element/dynamic-type-grid-cell-open-element'
import { DynamicTypeGridCellAssetPreview } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/asset-preview/dynamic-type-grid-cell-asset-preview'
import { DynamicTypeGridCellAssetActions } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/asset-actions/dynamic-type-grid-cell-asset-preview'
import { DynamicTypeGridCellDependencyTypeIcon } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/_dependencies/dynamic-type-grid-cell-dependency-type-icon'
import { DynamicTypeGridCellAssetCustomMetadataIcon } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/_meta-data/dynamic-type-grid-cell-asset-custom-metadata-icon'
import { DynamicTypeGridCellAssetCustomMetadataValue } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/_meta-data/dynamic-type-grid-cell-asset-custom-metadata-value'
import { DynamicTypeGridCellPropertyIcon } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/_properties/dynamic-type-grid-cell-property-icon'
import { DynamicTypeGridCellPropertyValue } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/_properties/dynamic-type-grid-cell-property-value'
import { DynamicTypeGridCellScheduleActionsSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/_schedule/dynamic-type-grid-cell-schedule-actions-select'
import { DynamicTypeGridCellVersionIdSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/_schedule/dynamic-type-grid-cell-version-id-select'
import { DynamicTypeGridCellAssetVersionPreviewFieldLabel } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/_versions/dynamic-type-grid-cell-asset-version-preview-field-label'
import { DynamicTypeMetaDataRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/meta-data/dynamic-type-metadata-registry'
import { DynamicTypeMetaDataAsset } from '@Pimcore/modules/element/dynamic-types/defintinitions/meta-data/types/dynamic-type-meta-data-asset'
import { DynamicTypeMetaDataCheckbox } from '@Pimcore/modules/element/dynamic-types/defintinitions/meta-data/types/dynamic-type-meta-data-checkbox'
import { DynamicTypeMetaDataDate } from '@Pimcore/modules/element/dynamic-types/defintinitions/meta-data/types/dynamic-type-meta-data-date'
import { DynamicTypeMetaDataDocument } from '@Pimcore/modules/element/dynamic-types/defintinitions/meta-data/types/dynamic-type-meta-data-document'
import { DynamicTypeMetaDataInput } from '@Pimcore/modules/element/dynamic-types/defintinitions/meta-data/types/dynamic-type-meta-data-input'
import { DynamicTypeMetaDataObject } from '@Pimcore/modules/element/dynamic-types/defintinitions/meta-data/types/dynamic-type-meta-data-object'
import { DynamicTypeMetaDataSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/meta-data/types/dynamic-type-meta-data-select'
import { DynamicTypeMetaDataTextarea } from '@Pimcore/modules/element/dynamic-types/defintinitions/meta-data/types/dynamic-type-meta-data-textarea'

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

// dynamic types field filters
container.bind(serviceIds['DynamicTypes/FieldFilterRegistry']).to(DynamicTypeFieldFilterRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Text']).to(DynamicTypeFieldFilterText).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Select']).to(DynamicTypeFieldFilterSelect).inSingletonScope()

// dynamic types grid cells
container.bind(serviceIds['DynamicTypes/GridCellRegistry']).to(DynamicTypeGridCellRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Text']).to(DynamicTypeGridCellText).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Textarea']).to(DynamicTypeGridCellTextarea).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Select']).to(DynamicTypeGridCellSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Checkbox']).to(DynamicTypeGridCellCheckbox).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Date']).to(DynamicTypeGridCellDate).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Time']).to(DynamicTypeGridCellTime).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/DateTime']).to(DynamicTypeGridCellDateTime).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/AssetLink']).to(DynamicTypeGridCellAssetLink).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/ObjectLink']).to(DynamicTypeGridCellObjectLink).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/DocumentLink']).to(DynamicTypeGridCellDocumentLink).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/OpenElement']).to(DynamicTypeGridCellOpenElement).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/AssetPreview']).to(DynamicTypeGridCellAssetPreview).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/AssetActions']).to(DynamicTypeGridCellAssetActions).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/DependencyTypeIcon']).to(DynamicTypeGridCellDependencyTypeIcon).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/AssetCustomMetadataIcon']).to(DynamicTypeGridCellAssetCustomMetadataIcon).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/AssetCustomMetadataValue']).to(DynamicTypeGridCellAssetCustomMetadataValue).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/PropertyIcon']).to(DynamicTypeGridCellPropertyIcon).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/PropertyValue']).to(DynamicTypeGridCellPropertyValue).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/ScheduleActionsSelect']).to(DynamicTypeGridCellScheduleActionsSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/VersionsIdSelect']).to(DynamicTypeGridCellVersionIdSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/AssetVersionPreviewFieldLabel']).to(DynamicTypeGridCellAssetVersionPreviewFieldLabel).inSingletonScope()

// dynamic types listing
container.bind(serviceIds['DynamicTypes/ListingRegistry']).to(DynamicTypeListingRegistry).inSingletonScope()

// Metadata registry
container.bind(serviceIds['DynamicTypes/MetadataRegistry']).to(DynamicTypeMetaDataRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Metadata/Asset']).to(DynamicTypeMetaDataAsset).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Metadata/Checkbox']).to(DynamicTypeMetaDataCheckbox).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Metadata/Date']).to(DynamicTypeMetaDataDate).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Metadata/Document']).to(DynamicTypeMetaDataDocument).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Metadata/Input']).to(DynamicTypeMetaDataInput).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Metadata/Object']).to(DynamicTypeMetaDataObject).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Metadata/Select']).to(DynamicTypeMetaDataSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Metadata/Textarea']).to(DynamicTypeMetaDataTextarea).inSingletonScope()

// Execution engine
container.bind(serviceIds['ExecutionEngine/JobComponentRegistry']).to(JobComponentRegistry).inSingletonScope()

// Component registry
container.bind(serviceIds['App/ComponentRegistry/ComponentRegistry']).to(ComponentRegistry).inSingletonScope()
