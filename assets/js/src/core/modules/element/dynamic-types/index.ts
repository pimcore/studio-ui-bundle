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
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type DynamicTypeFieldFilterRegistry } from './definitions/field-filters/dynamic-type-field-filter-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeFieldFilterText } from './definitions/field-filters/types/text/dynamic-type-field-filter-text'
import { type DynamicTypeFieldFilterNumber } from './definitions/field-filters/types/number/dynamic-type-field-filter-number'
import { type DynamicTypeFieldFilterSelect } from './definitions/field-filters/types/select/dynamic-type-field-filter-select'
import { type DynamicTypeFieldFilterDatetime } from './definitions/field-filters/types/datetime/dynamic-type-field-filter-datetime'
import { type DynamicTypeGridCellText } from './definitions/grid-cell/types/text/dynamic-type-grid-cell-text'
import { type DynamicTypeGridCellRegistry } from './definitions/grid-cell/dynamic-type-grid-cell-registry'
import { type DynamicTypeGridCellTextarea } from './definitions/grid-cell/types/textarea/dynamic-type-grid-cell-text'
import { type DynamicTypeGridCellNumber } from './definitions/grid-cell/types/number/dynamic-type-grid-cell-number'
import { type DynamicTypeGridCellSelect } from './definitions/grid-cell/types/select/dynamic-type-grid-cell-select'
import { type DynamicTypeGridCellMultiSelect } from './definitions/grid-cell/types/multi-select/dynamic-type-grid-cell-multi-select'
import { type DynamicTypeGridCellCheckbox } from './definitions/grid-cell/types/checkbox/dynamic-type-grid-cell-checkbox'
import { type DynamicTypeGridCellDate } from './definitions/grid-cell/types/date/dynamic-type-grid-cell-date'
import { type DynamicTypeGridCellTime } from './definitions/grid-cell/types/time/dynamic-type-grid-cell-time'
import { type DynamicTypeGridCellDateTime } from './definitions/grid-cell/types/date-time/dynamic-type-grid-cell-date-time'
import { type DynamicTypeGridCellAssetLink } from './definitions/grid-cell/types/asset-link/dynamic-type-grid-cell-asset-link'
import { type DynamicTypeGridCellObjectLink } from './definitions/grid-cell/types/object-link/dynamic-type-grid-cell-object-link'
import { type DynamicTypeGridCellDocumentLink } from './definitions/grid-cell/types/document-link/dynamic-type-grid-cell-document-link'
import { type DynamicTypeGridCellOpenElement } from './definitions/grid-cell/types/open-element/dynamic-type-grid-cell-open-element'
import { type DynamicTypeGridCellAssetPreview } from './definitions/grid-cell/types/asset-preview/dynamic-type-grid-cell-asset-preview'
import { type DynamicTypeGridCellAssetActions } from './definitions/grid-cell/types/asset-actions/dynamic-type-grid-cell-asset-preview'
import { type DynamicTypeGridCellDependencyTypeIcon } from './definitions/grid-cell/types/_dependencies/dynamic-type-grid-cell-dependency-type-icon'
import { type DynamicTypeGridCellAssetCustomMetadataIcon } from './definitions/grid-cell/types/_meta-data/dynamic-type-grid-cell-asset-custom-metadata-icon'
import { type DynamicTypeGridCellAssetCustomMetadataValue } from './definitions/grid-cell/types/_meta-data/dynamic-type-grid-cell-asset-custom-metadata-value'
import { type DynamicTypeGridCellPropertyIcon } from './definitions/grid-cell/types/_properties/dynamic-type-grid-cell-property-icon'
import { type DynamicTypeGridCellPropertyValue } from './definitions/grid-cell/types/_properties/dynamic-type-grid-cell-property-value'
import { type DynamicTypeGridCellScheduleActionsSelect } from './definitions/grid-cell/types/_schedule/dynamic-type-grid-cell-schedule-actions-select'
import { type DynamicTypeGridCellVersionIdSelect } from './definitions/grid-cell/types/_schedule/dynamic-type-grid-cell-version-id-select'
import { type DynamicTypeGridCellAssetVersionPreviewFieldLabel } from './definitions/grid-cell/types/_versions/dynamic-type-grid-cell-asset-version-preview-field-label'
import { type DynamicTypeGridCellAsset } from './definitions/grid-cell/types/asset/dynamic-type-grid-cell-asset'
import { type DynamicTypeGridCellObject } from './definitions/grid-cell/types/object/dynamic-type-grid-cell-object'
import { type DynamicTypeGridCellDocument } from './definitions/grid-cell/types/document/dynamic-type-grid-cell-document'
import { type DynamicTypeGridCellElement } from './definitions/grid-cell/types/element/dynamic-type-grid-cell-element'
import { type DynamicTypeMetaDataRegistry } from './definitions/meta-data/dynamic-type-metadata-registry'
import { type DynamicTypeMetaDataAsset } from './definitions/meta-data/types/dynamic-type-meta-data-asset'
import { type DynamicTypeMetaDataCheckbox } from './definitions/meta-data/types/dynamic-type-meta-data-checkbox'
import { type DynamicTypeMetaDataDate } from './definitions/meta-data/types/dynamic-type-meta-data-date'
import { type DynamicTypeMetaDataDocument } from './definitions/meta-data/types/dynamic-type-meta-data-document'
import { type DynamicTypeMetaDataInput } from './definitions/meta-data/types/dynamic-type-meta-data-input'
import { type DynamicTypeMetaDataObject } from './definitions/meta-data/types/dynamic-type-meta-data-object'
import { type DynamicTypeMetaDataSelect } from './definitions/meta-data/types/dynamic-type-meta-data-select'
import { type DynamicTypeMetaDataTextarea } from './definitions/meta-data/types/dynamic-type-meta-data-textarea'
import { type DynamicTypeObjectLayoutRegistry } from './definitions/objects/layout-related/dynamic-type-object-layout-registry'
import { type DynamicTypeObjectLayoutPanel } from './definitions/objects/layout-related/types/dynamic-type-object-layout-panel'
import { type DynamicTypeObjectDataRegistry } from './definitions/objects/data-related/dynamic-type-object-data-registry'
import { type DynamicTypeObjectLayoutTabpanel } from './definitions/objects/layout-related/types/dynamic-type-object-layout-tabpanel'
import { type DynamicTypeObjectLayoutAccordion } from './definitions/objects/layout-related/types/dynamic-type-object-layout-accordion'
import { type DynamicTypeObjectLayoutRegion } from './definitions/objects/layout-related/types/dynamic-type-object-layout-region'
import { type DynamicTypeObjectLayoutText } from './definitions/objects/layout-related/types/dynamic-type-object-layout-text'
import { type DynamicTypeObjectLayoutFieldset } from './definitions/objects/layout-related/types/dynamic-type-object-layout-fieldset'
import { type DynamicTypeObjectLayoutFieldContainer } from './definitions/objects/layout-related/types/dynamic-type-object-layout-field-container'
import { type DynamicTypeObjectDataInput } from './definitions/objects/data-related/types/dynamic-type-object-data-input'
import { type DynamicTypeObjectDataTextarea } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-textarea'
import { type DynamicTypeObjectDataWysiwyg } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-wysiwyg'
import { type DynamicTypeObjectDataPassword } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-password'
import { type DynamicTypeObjectDataInputQuantityValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-input-quantity-value'
import { type DynamicTypeObjectDataSelect } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-select'
import { type DynamicTypeObjectDataMultiSelect } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-multiselect'
import { type DynamicTypeObjectDataLanguage } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-language'
import { type DynamicTypeObjectDataLanguageMultiSelect } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-language-multiselect'
import { type DynamicTypeObjectDataCountry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-country'
import { type DynamicTypeObjectDataCountryMultiSelect } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-country-multiselect'
import { type DynamicTypeObjectDataUser } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-user'
import { type DynamicTypeObjectDataBooleanSelect } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-boolean-select'
import { type DynamicTypeObjectDataNumeric } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-numeric'
import { type DynamicTypeObjectDataNumericRange } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-numeric-range'
import { type DynamicTypeObjectDataSlider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-slider'
import { type DynamicTypeObjectDataQuantityValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-quantity-value'
import { type DynamicTypeObjectDataQuantityValueRange } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-quantity-value-range'
import { type DynamicTypeObjectDataConsent } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-consent'
import { type DynamicTypeObjectDataFirstname } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-firstname'
import { type DynamicTypeObjectDataLastname } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-lastname'
import { type DynamicTypeObjectDataEmail } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-email'
import { type DynamicTypeObjectDataGender } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-gender'
import { type DynamicTypeObjectDataRgbaColor } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-rgba-color'
import { type DynamicTypeObjectDataEncryptedField } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-encrypted-field'
import { type DynamicTypeObjectDataCalculatedValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-calculated-value'
import { type DynamicTypeObjectDataCheckbox } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-checkbox'
import { type DynamicTypeObjectDataLink } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-link'
import { type DynamicTypeObjectDataUrlSlug } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-url-slug'
import { type DynamicTypeObjectDataDate } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-date'
import { type DynamicTypeObjectDataDatetime } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-datetime'
import { type DynamicTypeObjectDataDateRange } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-date-range'
import { type DynamicTypeObjectDataTime } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-time'
import { type DynamicTypeObjectDataExternalImage } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-external-image'
import { type DynamicTypeObjectDataImage } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-image'
import { type DynamicTypeObjectDataVideo } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-video'
import { type DynamicTypeObjectDataHotspotImage } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-hotspotimage'
import { type DynamicTypeObjectDataImageGallery } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-image-gallery'
import { type DynamicTypeObjectDataGeoPoint } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-geopoint'
import { type DynamicTypeObjectDataGeoBounds } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-geobounds'
import { type DynamicTypeObjectDataGeoPolygon } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-geopolygon'
import { type DynamicTypeObjectDataGeoPolyLine } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-geopolyline'
import { type DynamicTypeObjectDataManyToOneRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-many-to-one-relation'
import { type DynamicTypeObjectDataManyToManyRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-many-to-many-relation'
import { type DynamicTypeObjectDataManyToManyObjectRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-many-to-many-object-relation'
import { type DynamicTypeObjectDataAdvancedManyToManyRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-advanced-many-to-many-relation'
import { type DynamicTypeObjectDataAdvancedManyToManyObjectRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-advanced-many-to-many-object-relation'
import { type DynamicTypeObjectDataReverseObjectRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-reverse-object-relation'
import { type DynamicTypeObjectDataTable } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-table'
import { type DynamicTypeObjectDataStructuredTable } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-structured-table'

import { type DynamicTypeObjectDataBlock } from './definitions/objects/data-related/types/dynamic-type-object-data-block'
import { type DynamicTypeObjectDataLocalizedFields } from './definitions/objects/data-related/types/dynamic-type-object-data-localized-fields'
import { type DynamicTypeBatchEditRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/dynamic-type-batch-edit-registry'
import { type DynamicTypeBatchEditText } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/types/text/dynamic-type-batch-edit-text'
import { type DynamicTypeBatchEditTextArea } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/types/text/dynamic-type-batch-edit-text-area'
import { type DynamicTypeBatchEditDatetime } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/types/datetime/dynamic-type-batch-edit-datetime'
import { type DynamicTypeBatchEditSelect } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/types/select/dynamic-type-batch-edit-select'
import { type DynamicTypeBatchEditCheckbox } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/types/checkbox/dynamic-type-batch-edit-checkbox'
import { type DynamicTypeBatchEditElementDropzone } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/types/element-dropzone/dynamic-type-batch-edit-element-dropzone'
import { type DynamicTypeGridCellLanguageSelect } from './definitions/grid-cell/types/language-select/dynamic-type-grid-cell-language-select'
import { type DynamicTypeGridCellTranslate } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/translate/dynamic-type-grid-cell-translate'
import { type DynamicTypeListingRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/listing/dynamic-type-listing-registry'
import { type DynamicTypeListingAssetLink } from '@Pimcore/modules/element/dynamic-types/definitions/listing/types/dynamic-type-listing-asset-link'
import { type DynamicTypeObjectDataFieldCollection } from './definitions/objects/data-related/types/dynamic-type-object-data-field-collection'
import { type DynamicTypeObjectDataObjectBrick } from './definitions/objects/data-related/types/dynamic-type-object-data-object-brick'
import { type DynamicTypeGridCellDataObjectAdapter } from './definitions/grid-cell/types/data-object-adapter/dynamic-type-grid-cell-data-object-adapter'
import { type DynamicTypeGridCellDataObjectActions } from './definitions/grid-cell/types/data-object-actions/dynamic-type-grid-cell-data-object-actions'
import { type DynamicTypeGridCellDataObjectObjectBrick } from './definitions/grid-cell/types/data-object-object-brick/dynamic-type-grid-cell-data-object-adapter'
import { type DynamicTypeBatchEditDataObjectAdapter } from './definitions/batch-edits/types/data-object-adapter/dynamic-type-batch-edit-data-object-adpater'
import { type DynamicTypeBatchEditDataObjectObjectBrick } from './definitions/batch-edits/types/data-object-object-brick/dynamic-type-batch-edit-data-object-object-brick'
import { type DynamicTypeAssetRegistry } from './definitions/asset/dynamic-type-asset-registry'
import { type DynamicTypeAssetArchive } from './definitions/asset/types/dynamic-type-asset-archive'
import { type DynamicTypeAssetAudio } from './definitions/asset/types/dynamic-type-asset-audio'
import { type DynamicTypeAssetDocument } from './definitions/asset/types/dynamic-type-asset-document'
import { type DynamicTypeAssetFolder } from './definitions/asset/types/dynamic-type-asset-folder'
import { type DynamicTypeAssetImage } from './definitions/asset/types/dynamic-type-asset-image'
import { type DynamicTypeAssetText } from './definitions/asset/types/dynamic-type-asset-text'
import { type DynamicTypeAssetUnknown } from './definitions/asset/types/dynamic-type-asset-unknown'
import { type DynamicTypeAssetVideo } from './definitions/asset/types/dynamic-type-asset-video'
import { type DynamicTypeObjectRegistry } from './definitions/objects/dynamic-type-object-registry'
import { type DynamicTypeObjectFolder } from './definitions/objects/types/dynamic-type-object-folder'
import { type DynamicTypeObjectObject } from './definitions/objects/types/dynamic-type-object-object'
import { type DynamicTypeObjectVariant } from './definitions/objects/types/dynamic-type-object-variant'
import { type DynamicTypeObjectDataClassificationStore } from './definitions/objects/data-related/types/dynamic-type-object-data-classification-store'
import { type DynamicTypeGridCellBoolean } from './definitions/grid-cell/types/boolean/dynamic-type-grid-cell-boolean'

moduleSystem.registerModule({
  onInit () {
    const fieldFilterRegistry = container.get<DynamicTypeFieldFilterRegistry>(serviceIds['DynamicTypes/FieldFilterRegistry'])

    fieldFilterRegistry.registerDynamicType(container.get<DynamicTypeFieldFilterText>(serviceIds['DynamicTypes/FieldFilter/Text']))
    fieldFilterRegistry.registerDynamicType(container.get<DynamicTypeFieldFilterNumber>(serviceIds['DynamicTypes/FieldFilter/Number']))
    fieldFilterRegistry.registerDynamicType(container.get<DynamicTypeFieldFilterSelect>(serviceIds['DynamicTypes/FieldFilter/Select']))
    fieldFilterRegistry.registerDynamicType(container.get<DynamicTypeFieldFilterDatetime>(serviceIds['DynamicTypes/FieldFilter/Datetime']))

    const batchEditRegistry = container.get<DynamicTypeBatchEditRegistry>(serviceIds['DynamicTypes/BatchEditRegistry'])

    batchEditRegistry.registerDynamicType(container.get<DynamicTypeBatchEditText>(serviceIds['DynamicTypes/BatchEdit/Text']))
    batchEditRegistry.registerDynamicType(container.get<DynamicTypeBatchEditTextArea>(serviceIds['DynamicTypes/BatchEdit/TextArea']))
    batchEditRegistry.registerDynamicType(container.get<DynamicTypeBatchEditDatetime>(serviceIds['DynamicTypes/BatchEdit/Datetime']))
    batchEditRegistry.registerDynamicType(container.get<DynamicTypeBatchEditSelect>(serviceIds['DynamicTypes/BatchEdit/Select']))
    batchEditRegistry.registerDynamicType(container.get<DynamicTypeBatchEditCheckbox>(serviceIds['DynamicTypes/BatchEdit/Checkbox']))
    batchEditRegistry.registerDynamicType(container.get<DynamicTypeBatchEditElementDropzone>(serviceIds['DynamicTypes/BatchEdit/ElementDropzone']))
    batchEditRegistry.registerDynamicType(container.get<DynamicTypeBatchEditDataObjectAdapter>(serviceIds['DynamicTypes/BatchEdit/DataObjectAdapter']))
    batchEditRegistry.registerDynamicType(container.get<DynamicTypeBatchEditDataObjectObjectBrick>(serviceIds['DynamicTypes/BatchEdit/DataObjectObjectBrick']))

    const listingRegistry = container.get<DynamicTypeListingRegistry>(serviceIds['DynamicTypes/ListingRegistry'])

    listingRegistry.registerDynamicType(container.get<DynamicTypeListingAssetLink>(serviceIds['DynamicTypes/Listing/AssetLink']))

    const GridCellRegistry = container.get<DynamicTypeGridCellRegistry>(serviceIds['DynamicTypes/GridCellRegistry'])

    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellText>(serviceIds['DynamicTypes/GridCell/Text']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellTextarea>(serviceIds['DynamicTypes/GridCell/Textarea']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellNumber>(serviceIds['DynamicTypes/GridCell/Number']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellSelect>(serviceIds['DynamicTypes/GridCell/Select']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellMultiSelect>(serviceIds['DynamicTypes/GridCell/MultiSelect']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellBoolean>(serviceIds['DynamicTypes/GridCell/Boolean']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellCheckbox>(serviceIds['DynamicTypes/GridCell/Checkbox']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellDate>(serviceIds['DynamicTypes/GridCell/Date']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellTime>(serviceIds['DynamicTypes/GridCell/Time']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellDateTime>(serviceIds['DynamicTypes/GridCell/DateTime']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellAssetLink>(serviceIds['DynamicTypes/GridCell/AssetLink']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellObjectLink>(serviceIds['DynamicTypes/GridCell/ObjectLink']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellDocumentLink>(serviceIds['DynamicTypes/GridCell/DocumentLink']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellOpenElement>(serviceIds['DynamicTypes/GridCell/OpenElement']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellAssetPreview>(serviceIds['DynamicTypes/GridCell/AssetPreview']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellAssetActions>(serviceIds['DynamicTypes/GridCell/AssetActions']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellDataObjectActions>(serviceIds['DynamicTypes/GridCell/DataObjectActions']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellDependencyTypeIcon>(serviceIds['DynamicTypes/GridCell/DependencyTypeIcon']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellAssetCustomMetadataIcon>(serviceIds['DynamicTypes/GridCell/AssetCustomMetadataIcon']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellAssetCustomMetadataValue>(serviceIds['DynamicTypes/GridCell/AssetCustomMetadataValue']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellPropertyIcon>(serviceIds['DynamicTypes/GridCell/PropertyIcon']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellPropertyValue>(serviceIds['DynamicTypes/GridCell/PropertyValue']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellScheduleActionsSelect>(serviceIds['DynamicTypes/GridCell/ScheduleActionsSelect']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellVersionIdSelect>(serviceIds['DynamicTypes/GridCell/VersionsIdSelect']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellAssetVersionPreviewFieldLabel>(serviceIds['DynamicTypes/GridCell/AssetVersionPreviewFieldLabel']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellAsset>(serviceIds['DynamicTypes/GridCell/Asset']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellObject>(serviceIds['DynamicTypes/GridCell/Object']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellDocument>(serviceIds['DynamicTypes/GridCell/Document']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellElement>(serviceIds['DynamicTypes/GridCell/Element']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellLanguageSelect>(serviceIds['DynamicTypes/GridCell/LanguageSelect']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellTranslate>(serviceIds['DynamicTypes/GridCell/Translate']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellDataObjectAdapter>(serviceIds['DynamicTypes/GridCell/DataObjectAdapter']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellDataObjectObjectBrick>(serviceIds['DynamicTypes/GridCell/DataObjectObjectBrick']))

    const metadataRegistry = container.get<DynamicTypeMetaDataRegistry>(serviceIds['DynamicTypes/MetadataRegistry'])

    metadataRegistry.registerDynamicType(container.get<DynamicTypeMetaDataAsset>(serviceIds['DynamicTypes/Metadata/Asset']))
    metadataRegistry.registerDynamicType(container.get<DynamicTypeMetaDataCheckbox>(serviceIds['DynamicTypes/Metadata/Checkbox']))
    metadataRegistry.registerDynamicType(container.get<DynamicTypeMetaDataDate>(serviceIds['DynamicTypes/Metadata/Date']))
    metadataRegistry.registerDynamicType(container.get<DynamicTypeMetaDataDocument>(serviceIds['DynamicTypes/Metadata/Document']))
    metadataRegistry.registerDynamicType(container.get<DynamicTypeMetaDataInput>(serviceIds['DynamicTypes/Metadata/Input']))
    metadataRegistry.registerDynamicType(container.get<DynamicTypeMetaDataObject>(serviceIds['DynamicTypes/Metadata/Object']))
    metadataRegistry.registerDynamicType(container.get<DynamicTypeMetaDataSelect>(serviceIds['DynamicTypes/Metadata/Select']))
    metadataRegistry.registerDynamicType(container.get<DynamicTypeMetaDataTextarea>(serviceIds['DynamicTypes/Metadata/Textarea']))

    const objectLayoutRegistry = container.get<DynamicTypeObjectLayoutRegistry>(serviceIds['DynamicTypes/ObjectLayoutRegistry'])

    objectLayoutRegistry.registerDynamicType(container.get<DynamicTypeObjectLayoutPanel>(serviceIds['DynamicTypes/ObjectLayout/Panel']))
    objectLayoutRegistry.registerDynamicType(container.get<DynamicTypeObjectLayoutTabpanel>(serviceIds['DynamicTypes/ObjectLayout/Tabpanel']))
    objectLayoutRegistry.registerDynamicType(container.get<DynamicTypeObjectLayoutAccordion>(serviceIds['DynamicTypes/ObjectLayout/Accordion']))
    objectLayoutRegistry.registerDynamicType(container.get<DynamicTypeObjectLayoutRegion>(serviceIds['DynamicTypes/ObjectLayout/Region']))
    objectLayoutRegistry.registerDynamicType(container.get<DynamicTypeObjectLayoutText>(serviceIds['DynamicTypes/ObjectLayout/Text']))
    objectLayoutRegistry.registerDynamicType(container.get<DynamicTypeObjectLayoutFieldset>(serviceIds['DynamicTypes/ObjectLayout/Fieldset']))
    objectLayoutRegistry.registerDynamicType(container.get<DynamicTypeObjectLayoutFieldContainer>(serviceIds['DynamicTypes/ObjectLayout/FieldContainer']))

    const objectDataRegistry = container.get<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])

    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataInput>(serviceIds['DynamicTypes/ObjectData/Input']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataTextarea>(serviceIds['DynamicTypes/ObjectData/Textarea']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataWysiwyg>(serviceIds['DynamicTypes/ObjectData/Wysiwyg']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataPassword>(serviceIds['DynamicTypes/ObjectData/Password']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataInputQuantityValue>(serviceIds['DynamicTypes/ObjectData/InputQuantityValue']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataSelect>(serviceIds['DynamicTypes/ObjectData/Select']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataMultiSelect>(serviceIds['DynamicTypes/ObjectData/MultiSelect']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataLanguage>(serviceIds['DynamicTypes/ObjectData/Language']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataLanguageMultiSelect>(serviceIds['DynamicTypes/ObjectData/LanguageMultiSelect']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataCountry>(serviceIds['DynamicTypes/ObjectData/Country']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataCountryMultiSelect>(serviceIds['DynamicTypes/ObjectData/CountryMultiSelect']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataUser>(serviceIds['DynamicTypes/ObjectData/User']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataBooleanSelect>(serviceIds['DynamicTypes/ObjectData/BooleanSelect']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataNumeric>(serviceIds['DynamicTypes/ObjectData/Numeric']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataNumericRange>(serviceIds['DynamicTypes/ObjectData/NumericRange']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataSlider>(serviceIds['DynamicTypes/ObjectData/Slider']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataQuantityValue>(serviceIds['DynamicTypes/ObjectData/QuantityValue']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataQuantityValueRange>(serviceIds['DynamicTypes/ObjectData/QuantityValueRange']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataConsent>(serviceIds['DynamicTypes/ObjectData/Consent']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataFirstname>(serviceIds['DynamicTypes/ObjectData/Firstname']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataLastname>(serviceIds['DynamicTypes/ObjectData/Lastname']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataEmail>(serviceIds['DynamicTypes/ObjectData/Email']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataGender>(serviceIds['DynamicTypes/ObjectData/Gender']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataRgbaColor>(serviceIds['DynamicTypes/ObjectData/RgbaColor']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataEncryptedField>(serviceIds['DynamicTypes/ObjectData/EncryptedField']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataCalculatedValue>(serviceIds['DynamicTypes/ObjectData/CalculatedValue']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataCheckbox>(serviceIds['DynamicTypes/ObjectData/Checkbox']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataLink>(serviceIds['DynamicTypes/ObjectData/Link']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataUrlSlug>(serviceIds['DynamicTypes/ObjectData/UrlSlug']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataDate>(serviceIds['DynamicTypes/ObjectData/Date']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataDatetime>(serviceIds['DynamicTypes/ObjectData/Datetime']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataDateRange>(serviceIds['DynamicTypes/ObjectData/DateRange']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataTime>(serviceIds['DynamicTypes/ObjectData/Time']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataExternalImage>(serviceIds['DynamicTypes/ObjectData/ExternalImage']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataImage>(serviceIds['DynamicTypes/ObjectData/Image']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataVideo>(serviceIds['DynamicTypes/ObjectData/Video']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataHotspotImage>(serviceIds['DynamicTypes/ObjectData/HotspotImage']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataImageGallery>(serviceIds['DynamicTypes/ObjectData/ImageGallery']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataGeoPoint>(serviceIds['DynamicTypes/ObjectData/GeoPoint']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataGeoBounds>(serviceIds['DynamicTypes/ObjectData/GeoBounds']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataGeoPolygon>(serviceIds['DynamicTypes/ObjectData/GeoPolygon']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataGeoPolyLine>(serviceIds['DynamicTypes/ObjectData/GeoPolyLine']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataManyToOneRelation>(serviceIds['DynamicTypes/ObjectData/ManyToOneRelation']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataManyToManyRelation>(serviceIds['DynamicTypes/ObjectData/ManyToManyRelation']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataManyToManyObjectRelation>(serviceIds['DynamicTypes/ObjectData/ManyToManyObjectRelation']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataAdvancedManyToManyObjectRelation>(serviceIds['DynamicTypes/ObjectData/AdvancedManyToManyObjectRelation']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataAdvancedManyToManyRelation>(serviceIds['DynamicTypes/ObjectData/AdvancedManyToManyRelation']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataReverseObjectRelation>(serviceIds['DynamicTypes/ObjectData/ReverseObjectRelation']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataTable>(serviceIds['DynamicTypes/ObjectData/Table']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataStructuredTable>(serviceIds['DynamicTypes/ObjectData/StructuredTable']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataBlock>(serviceIds['DynamicTypes/ObjectData/Block']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataLocalizedFields>(serviceIds['DynamicTypes/ObjectData/LocalizedFields']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataFieldCollection>(serviceIds['DynamicTypes/ObjectData/FieldCollection']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataObjectBrick>(serviceIds['DynamicTypes/ObjectData/ObjectBrick']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataClassificationStore>(serviceIds['DynamicTypes/ObjectData/ClassificationStore']))

    const assetRegistry = container.get<DynamicTypeAssetRegistry>(serviceIds['DynamicTypes/AssetRegistry'])

    assetRegistry.registerDynamicType(container.get<DynamicTypeAssetArchive>(serviceIds['DynamicTypes/Asset/Archive']))
    assetRegistry.registerDynamicType(container.get<DynamicTypeAssetAudio>(serviceIds['DynamicTypes/Asset/Audio']))
    assetRegistry.registerDynamicType(container.get<DynamicTypeAssetDocument>(serviceIds['DynamicTypes/Asset/Document']))
    assetRegistry.registerDynamicType(container.get<DynamicTypeAssetFolder>(serviceIds['DynamicTypes/Asset/Folder']))
    assetRegistry.registerDynamicType(container.get<DynamicTypeAssetImage>(serviceIds['DynamicTypes/Asset/Image']))
    assetRegistry.registerDynamicType(container.get<DynamicTypeAssetText>(serviceIds['DynamicTypes/Asset/Text']))
    assetRegistry.registerDynamicType(container.get<DynamicTypeAssetUnknown>(serviceIds['DynamicTypes/Asset/Unknown']))
    assetRegistry.registerDynamicType(container.get<DynamicTypeAssetVideo>(serviceIds['DynamicTypes/Asset/Video']))

    const objectRegistry = container.get<DynamicTypeObjectRegistry>(serviceIds['DynamicTypes/ObjectRegistry'])

    objectRegistry.registerDynamicType(container.get<DynamicTypeObjectFolder>(serviceIds['DynamicTypes/Object/Folder']))
    objectRegistry.registerDynamicType(container.get<DynamicTypeObjectObject>(serviceIds['DynamicTypes/Object/Object']))
    objectRegistry.registerDynamicType(container.get<DynamicTypeObjectVariant>(serviceIds['DynamicTypes/Object/Variant']))
  }
})
