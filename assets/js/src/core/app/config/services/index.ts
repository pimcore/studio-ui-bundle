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

/* eslint-disable max-lines */
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
import { JobComponentRegistry } from '@Pimcore/modules/execution-engine/services/job-component-registry'
import { ArchiveTabManager } from '@Pimcore/modules/asset/editor/types/archive/tab-manager/archive-tab-manager'
import { ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { ObjectTabManager } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/object-tab-manager'
import { DynamicTypeFieldFilterRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/dynamic-type-field-filter-registry'
import { DynamicTypeListingRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/listing/dynamic-type-listing-registry'
import { DynamicTypeListingAssetLink } from '@Pimcore/modules/element/dynamic-types/defintinitions/listing/types/dynamic-type-listing-asset-link'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { DynamicTypeFieldFilterText } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/types/text/dynamic-type-field-filter-text'
import { DynamicTypeFieldFilterNumber } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/types/number/dynamic-type-field-filter-number'
import { DynamicTypeFieldFilterSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/types/select/dynamic-type-field-filter-select'
import { DynamicTypeFieldFilterDatetime } from '@Pimcore/modules/element/dynamic-types/defintinitions/field-filters/types/datetime/dynamic-type-field-filter-datetime'
import { DynamicTypeGridCellText } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/text/dynamic-type-grid-cell-text'
import { DynamicTypeGridCellRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/dynamic-type-grid-cell-registry'
import { DynamicTypeGridCellTextarea } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/textarea/dynamic-type-grid-cell-text'
import { DynamicTypeGridCellNumber } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/number/dynamic-type-grid-cell-number'
import { DynamicTypeGridCellSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/select/dynamic-type-grid-cell-select'
import { DynamicTypeGridCellMultiSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/multi-select/dynamic-type-grid-cell-multi-select'
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
import { TypeRegistry } from '@Pimcore/modules/element/editor/services/type-registry'
import { DynamicTypeObjectLayoutRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/layout-related/dynamic-type-object-layout-registry'
import { DynamicTypeObjectLayoutPanel } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/layout-related/types/dynamic-type-object-layout-panel'
import { DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-registry'
import { DynamicTypeObjectLayoutTabpanel } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/layout-related/types/dynamic-type-object-layout-tabpanel'
import { DynamicTypeObjectLayoutAccordion } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/layout-related/types/dynamic-type-object-layout-accordion'
import { DynamicTypeObjectLayoutRegion } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/layout-related/types/dynamic-type-object-layout-region'
import { DynamicTypeObjectLayoutText } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/layout-related/types/dynamic-type-object-layout-text'
import { DynamicTypeObjectLayoutFieldset } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/layout-related/types/dynamic-type-object-layout-fieldset'
import { DynamicTypeObjectLayoutFieldContainer } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/layout-related/types/dynamic-type-object-layout-field-container'
import { DynamicTypeObjectDataInput } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-input'
import { DynamicTypeObjectDataTextarea } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-textarea'
import { DynamicTypeObjectDataPassword } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-password'
import { DynamicTypeObjectDataInputQuantityValue } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-input-quantity-value'
import { DynamicTypeObjectDataSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-select'
import { DynamicTypeObjectDataMultiSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-multiselect'
import { DynamicTypeObjectDataLanguage } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-language'
import { DynamicTypeObjectDataLanguageMultiSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-language-multiselect'
import { DynamicTypeObjectDataCountry } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-country'
import { DynamicTypeObjectDataCountryMultiSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-country-multiselect'
import { DynamicTypeObjectDataUser } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-user'
import { DynamicTypeObjectDataBooleanSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-boolean-select'
import { DynamicTypeObjectDataNumeric } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-numeric'
import { DynamicTypeObjectDataNumericRange } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-numeric-range'
import { DynamicTypeObjectDataSlider } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-slider'
import { DynamicTypeObjectDataQuantityValue } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-quantity-value'
import { DynamicTypeObjectDataQuantityValueRange } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-quantity-value-range'
import { DynamicTypeObjectDataConsent } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-consent'
import { DynamicTypeObjectDataFirstname } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-firstname'
import { DynamicTypeObjectDataLastname } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-lastname'
import { DynamicTypeObjectDataEmail } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-email'
import { DynamicTypeObjectDataGender } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-gender'
import { DynamicTypeObjectDataRgbaColor } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-rgba-color'
import { DynamicTypeObjectDataEncryptedField } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-encrypted-field'
import { DynamicTypeObjectDataCalculatedValue } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-calculated-value'
import { DynamicTypeObjectDataCheckbox } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-checkbox'
import { DynamicTypeObjectDataLink } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-link'
import { DynamicTypeObjectDataUrlSlug } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-url-slug'
import { DynamicTypeObjectDataDate } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-date'
import { DynamicTypeObjectDataDatetime } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-datetime'
import { DynamicTypeObjectDataDateRange } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-date-range'
import { DynamicTypeObjectDataTime } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-time'
import { DynamicTypeObjectDataExternalImage } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-external-image'
import { DynamicTypeObjectDataImage } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-image'
import { DynamicTypeObjectDataVideo } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-video'
import { DynamicTypeObjectDataHotspotImage } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-hotspotimage'
import { DynamicTypeObjectDataImageGallery } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-image-gallery'
import { DynamicTypeObjectDataGeoPoint } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-geopoint'
import { DynamicTypeObjectDataGeoBounds } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-geobounds'
import { DynamicTypeObjectDataGeoPolygon } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-geopolygon'
import { DynamicTypeObjectDataGeoPolyLine } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-geopolyline'
import { DynamicTypeObjectDataManyToOneRelation } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-many-to-one-relation'
import { DynamicTypeObjectDataManyToManyRelation } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-many-to-many-relation'
import { DynamicTypeObjectDataManyToManyObjectRelation } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-many-to-many-object-relation'
import { DynamicTypeObjectDataAdvancedManyToManyRelation } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-advanced-many-to-many-relation'
import { DynamicTypeObjectDataAdvancedManyToManyObjectRelation } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-advanced-many-to-many-object-relation'
import { DynamicTypeObjectDataReverseObjectRelation } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-reverse-object-relation'
import { DynamicTypeObjectDataStructuredTable } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-structured-table'
import { DynamicTypeObjectDataTable } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-table'
import { DynamicTypeObjectDataBlock } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-block'
import { DynamicTypeObjectDataLocalizedFields } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-localized-fields'
import { DynamicTypeGridCellAsset } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/asset/dynamic-type-grid-cell-asset'
import { DynamicTypeGridCellObject } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/object/dynamic-type-grid-cell-object'
import { DynamicTypeGridCellDocument } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/document/dynamic-type-grid-cell-document'
import { DynamicTypeGridCellLanguageSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/language-select/dynamic-type-grid-cell-language-select'
import { DynamicTypeGridCellTranslate } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/translate/dynamic-type-grid-cell-translate'
import {
  DynamicTypeBatchEditRegistry
} from '@Pimcore/modules/element/dynamic-types/defintinitions/batch-edits/dynamic-type-batch-edit-registry'
import {
  DynamicTypeBatchEditText
} from '@Pimcore/modules/element/dynamic-types/defintinitions/batch-edits/types/text/dynamic-type-batch-edit-text'
import {
  DynamicTypeBatchEditTextArea
} from '@Pimcore/modules/element/dynamic-types/defintinitions/batch-edits/types/text/dynamic-type-batch-edit-text-area'
import { DynamicTypeObjectDataFieldCollection } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-field-collection'
import { DynamicTypeObjectDataObjectBrick } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-object-brick'
import { DynamicTypeGridCellDataObjectAdapter } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/data-object-adapter/dynamic-type-grid-cell-data-object-adapter'
import { MainNavRegistry } from '@Pimcore/modules/app/nav/services/main-nav-registry'
import { DynamicTypeGridCellDataObjectActions } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/data-object-actions/dynamic-type-grid-cell-data-object-actions'
import { DynamicTypeGridCellDataObjectObjectBrick } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/types/data-object-object-brick/dynamic-type-grid-cell-data-object-adapter'

// Main nav
container.bind(serviceIds.mainNavRegistry).to(MainNavRegistry).inSingletonScope()

// Widget manager
container.bind(serviceIds.widgetManager).to(WidgetRegistry).inSingletonScope()

// Assets
container.bind(serviceIds['Asset/Editor/TypeRegistry']).to(TypeRegistry).inSingletonScope()
container.bind(serviceIds['Asset/Editor/DocumentTabManager']).to(DocumentTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/FolderTabManager']).to(FolderTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/ImageTabManager']).to(ImageTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/TextTabManager']).to(TextTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/VideoTabManager']).to(VideoTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/AudioTabManager']).to(AudioTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/ArchiveTabManager']).to(ArchiveTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/UnknownTabManager']).to(UnknownTabManager).inSingletonScope()

// Data Objects
container.bind(serviceIds['DataObject/Editor/TypeRegistry']).to(TypeRegistry).inSingletonScope()

container.bind(serviceIds['DataObject/Editor/ObjectTabManager']).to(ObjectTabManager).inSingletonScope()
container.bind(serviceIds['DataObject/Editor/FolderTabManager']).to(FolderTabManager).inSingletonScope()

// Icon library
container.bind(serviceIds.iconLibrary).to(IconLibrary).inSingletonScope()

// dynamic types field filters
container.bind(serviceIds['DynamicTypes/FieldFilterRegistry']).to(DynamicTypeFieldFilterRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Text']).to(DynamicTypeFieldFilterText).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Number']).to(DynamicTypeFieldFilterNumber).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Select']).to(DynamicTypeFieldFilterSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Datetime']).to(DynamicTypeFieldFilterDatetime).inSingletonScope()

// dynamic types batch edit
container.bind(serviceIds['DynamicTypes/BatchEditRegistry']).to(DynamicTypeBatchEditRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/BatchEdit/Text']).to(DynamicTypeBatchEditText).inSingletonScope()
container.bind(serviceIds['DynamicTypes/BatchEdit/TextArea']).to(DynamicTypeBatchEditTextArea).inSingletonScope()

// dynamic types grid cells
container.bind(serviceIds['DynamicTypes/GridCellRegistry']).to(DynamicTypeGridCellRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Text']).to(DynamicTypeGridCellText).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Textarea']).to(DynamicTypeGridCellTextarea).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Number']).to(DynamicTypeGridCellNumber).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Select']).to(DynamicTypeGridCellSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/MultiSelect']).to(DynamicTypeGridCellMultiSelect).inSingletonScope()
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
container.bind(serviceIds['DynamicTypes/GridCell/DataObjectActions']).to(DynamicTypeGridCellDataObjectActions).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/DependencyTypeIcon']).to(DynamicTypeGridCellDependencyTypeIcon).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/AssetCustomMetadataIcon']).to(DynamicTypeGridCellAssetCustomMetadataIcon).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/AssetCustomMetadataValue']).to(DynamicTypeGridCellAssetCustomMetadataValue).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/PropertyIcon']).to(DynamicTypeGridCellPropertyIcon).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/PropertyValue']).to(DynamicTypeGridCellPropertyValue).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/ScheduleActionsSelect']).to(DynamicTypeGridCellScheduleActionsSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/VersionsIdSelect']).to(DynamicTypeGridCellVersionIdSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/AssetVersionPreviewFieldLabel']).to(DynamicTypeGridCellAssetVersionPreviewFieldLabel).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Asset']).to(DynamicTypeGridCellAsset).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Object']).to(DynamicTypeGridCellObject).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Document']).to(DynamicTypeGridCellDocument).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/LanguageSelect']).to(DynamicTypeGridCellLanguageSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Translate']).to(DynamicTypeGridCellTranslate).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/DataObjectAdapter']).to(DynamicTypeGridCellDataObjectAdapter).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/DataObjectObjectBrick']).to(DynamicTypeGridCellDataObjectObjectBrick).inSingletonScope()

// dynamic types listing
container.bind(serviceIds['DynamicTypes/ListingRegistry']).to(DynamicTypeListingRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Listing/AssetLink']).to(DynamicTypeListingAssetLink).inSingletonScope()

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

// Object layout
container.bind(serviceIds['DynamicTypes/ObjectLayoutRegistry']).to(DynamicTypeObjectLayoutRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectLayout/Panel']).to(DynamicTypeObjectLayoutPanel).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectLayout/Tabpanel']).to(DynamicTypeObjectLayoutTabpanel).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectLayout/Accordion']).to(DynamicTypeObjectLayoutAccordion).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectLayout/Region']).to(DynamicTypeObjectLayoutRegion).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectLayout/Text']).to(DynamicTypeObjectLayoutText).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectLayout/Fieldset']).to(DynamicTypeObjectLayoutFieldset).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectLayout/FieldContainer']).to(DynamicTypeObjectLayoutFieldContainer).inSingletonScope()

container.bind(serviceIds['DynamicTypes/ObjectDataRegistry']).to(DynamicTypeObjectDataRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Input']).to(DynamicTypeObjectDataInput).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Textarea']).to(DynamicTypeObjectDataTextarea).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/InputQuantityValue']).to(DynamicTypeObjectDataInputQuantityValue).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Password']).to(DynamicTypeObjectDataPassword).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Select']).to(DynamicTypeObjectDataSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/MultiSelect']).to(DynamicTypeObjectDataMultiSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Language']).to(DynamicTypeObjectDataLanguage).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/LanguageMultiSelect']).to(DynamicTypeObjectDataLanguageMultiSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Country']).to(DynamicTypeObjectDataCountry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/CountryMultiSelect']).to(DynamicTypeObjectDataCountryMultiSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/User']).to(DynamicTypeObjectDataUser).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/BooleanSelect']).to(DynamicTypeObjectDataBooleanSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Numeric']).to(DynamicTypeObjectDataNumeric).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/NumericRange']).to(DynamicTypeObjectDataNumericRange).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Slider']).to(DynamicTypeObjectDataSlider).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/QuantityValue']).to(DynamicTypeObjectDataQuantityValue).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/QuantityValueRange']).to(DynamicTypeObjectDataQuantityValueRange).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Consent']).to(DynamicTypeObjectDataConsent).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Firstname']).to(DynamicTypeObjectDataFirstname).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Lastname']).to(DynamicTypeObjectDataLastname).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Email']).to(DynamicTypeObjectDataEmail).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Gender']).to(DynamicTypeObjectDataGender).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/RgbaColor']).to(DynamicTypeObjectDataRgbaColor).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/EncryptedField']).to(DynamicTypeObjectDataEncryptedField).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/CalculatedValue']).to(DynamicTypeObjectDataCalculatedValue).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Checkbox']).to(DynamicTypeObjectDataCheckbox).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Link']).to(DynamicTypeObjectDataLink).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/UrlSlug']).to(DynamicTypeObjectDataUrlSlug).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Date']).to(DynamicTypeObjectDataDate).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Datetime']).to(DynamicTypeObjectDataDatetime).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/DateRange']).to(DynamicTypeObjectDataDateRange).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Time']).to(DynamicTypeObjectDataTime).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/ExternalImage']).to(DynamicTypeObjectDataExternalImage).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Image']).to(DynamicTypeObjectDataImage).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Video']).to(DynamicTypeObjectDataVideo).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/HotspotImage']).to(DynamicTypeObjectDataHotspotImage).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/ImageGallery']).to(DynamicTypeObjectDataImageGallery).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/GeoPoint']).to(DynamicTypeObjectDataGeoPoint).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/GeoBounds']).to(DynamicTypeObjectDataGeoBounds).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/GeoPolygon']).to(DynamicTypeObjectDataGeoPolygon).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/GeoPolyLine']).to(DynamicTypeObjectDataGeoPolyLine).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/ManyToOneRelation']).to(DynamicTypeObjectDataManyToOneRelation).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/ManyToManyRelation']).to(DynamicTypeObjectDataManyToManyRelation).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/ManyToManyObjectRelation']).to(DynamicTypeObjectDataManyToManyObjectRelation).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/AdvancedManyToManyRelation']).to(DynamicTypeObjectDataAdvancedManyToManyRelation).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/AdvancedManyToManyObjectRelation']).to(DynamicTypeObjectDataAdvancedManyToManyObjectRelation).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/ReverseObjectRelation']).to(DynamicTypeObjectDataReverseObjectRelation).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Table']).to(DynamicTypeObjectDataTable).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/StructuredTable']).to(DynamicTypeObjectDataStructuredTable).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Block']).to(DynamicTypeObjectDataBlock).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/LocalizedFields']).to(DynamicTypeObjectDataLocalizedFields).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/FieldCollection']).to(DynamicTypeObjectDataFieldCollection).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/ObjectBrick']).to(DynamicTypeObjectDataObjectBrick).inSingletonScope()

// Execution engine
container.bind(serviceIds['ExecutionEngine/JobComponentRegistry']).to(JobComponentRegistry).inSingletonScope()

// Component registry
container.bind(serviceIds['App/ComponentRegistry/ComponentRegistry']).to(ComponentRegistry).inSingletonScope()
