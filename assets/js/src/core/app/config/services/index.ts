/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import { MainNavRegistry } from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry'
import { ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { ContextMenuRegistry } from '@Pimcore/modules/app/context-menu-registry/context-menu-registry'
import { DebouncedFormRegistry } from '@Pimcore/components/form/services/debounced-form-registry'
import { ArchiveTabManager } from '@Pimcore/modules/asset/editor/types/archive/tab-manager/archive-tab-manager'
import { AudioTabManager } from '@Pimcore/modules/asset/editor/types/audio/tab-manager/audio-tab-manager'
import { DocumentTabManager } from '@Pimcore/modules/asset/editor/types/document/tab-manager/document-tab-manager'
import { FolderTabManager } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/folder-tab-manager'
import { ImageTabManager } from '@Pimcore/modules/asset/editor/types/image/tab-manager/image-tab-manager'
import { TextTabManager } from '@Pimcore/modules/asset/editor/types/text/tab-manager/text-tab-manager'
import { UnknownTabManager } from '@Pimcore/modules/asset/editor/types/unknown/tab-manager/unknown-tab-manager'
import { JobComponentRegistry } from '@Pimcore/modules/execution-engine/services/job-component-registry'
import { JobRehydrationRegistry } from '@Pimcore/modules/execution-engine/services/job-rehydration-registry'
import { ExecutionEngine } from '@Pimcore/modules/execution-engine/services/execution-engine'
import { VideoTabManager } from '@Pimcore/modules/asset/editor/types/video/tab-manager/video-tab-manager'
import { ThumbnailService } from '@Pimcore/modules/asset/services/thumbnail-service'
import { ObjectTabManager } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/object-tab-manager'
import { DynamicTypeAssetRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/asset/dynamic-type-asset-registry'
import { DynamicTypeAssetArchive } from '@Pimcore/modules/element/dynamic-types/definitions/asset/types/dynamic-type-asset-archive'
import { DynamicTypeAssetAudio } from '@Pimcore/modules/element/dynamic-types/definitions/asset/types/dynamic-type-asset-audio'
import { DynamicTypeAssetDocument } from '@Pimcore/modules/element/dynamic-types/definitions/asset/types/dynamic-type-asset-document'
import { DynamicTypeAssetFolder } from '@Pimcore/modules/element/dynamic-types/definitions/asset/types/dynamic-type-asset-folder'
import { DynamicTypeAssetImage } from '@Pimcore/modules/element/dynamic-types/definitions/asset/types/dynamic-type-asset-image'
import { DynamicTypeAssetText } from '@Pimcore/modules/element/dynamic-types/definitions/asset/types/dynamic-type-asset-text'
import { DynamicTypeAssetUnknown } from '@Pimcore/modules/element/dynamic-types/definitions/asset/types/dynamic-type-asset-unknown'
import { DynamicTypeAssetVideo } from '@Pimcore/modules/element/dynamic-types/definitions/asset/types/dynamic-type-asset-video'
import { DynamicTypeBatchEditRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/dynamic-type-batch-edit-registry'
import { DynamicTypeBatchEditCheckbox } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/types/checkbox/dynamic-type-batch-edit-checkbox'
import { DynamicTypeBatchEditDataObjectAdapter } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/types/data-object-adapter/dynamic-type-batch-edit-data-object-adapter'
import { DynamicTypeBatchEditDataObjectObjectBrick } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/types/data-object-object-brick/dynamic-type-batch-edit-data-object-object-brick'
import { DynamicTypeBatchEditDatetime } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/types/datetime/dynamic-type-batch-edit-datetime'
import { DynamicTypeBatchEditElementDropzone } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/types/element-dropzone/dynamic-type-batch-edit-element-dropzone'
import { DynamicTypeBatchEditSelect } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/types/select/dynamic-type-batch-edit-select'
import { DynamicTypeBatchEditText } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/types/text/dynamic-type-batch-edit-text'
import { DynamicTypeBatchEditTextArea } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/types/text/dynamic-type-batch-edit-text-area'
import { DynamicTypeFieldFilterRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-registry'
import { DynamicTypeFieldFilterBoolean } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/boolean/dynamic-type-field-filter-boolean'
import { DynamicTypeFieldFilterConsent } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/consent/dynamic-type-field-filter-consent'
import { DynamicTypeFieldFilterObjectAdapter } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/data-object-adapter/dynamic-type-field-filter-data-object-adapter'
import { DynamicTypeFieldFilterDataObjectObjectBrick } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/data-object-brick/dynamic-type-field-filter-data-object-object-brick'
import { DynamicTypeFieldFilterDate } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/date/dynamic-type-field-filter-date'
import { DynamicTypeFieldFilterId } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/id/dynamic-type-field-filter-id'
import { DynamicTypeFieldFilterNumber } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/number/dynamic-type-field-filter-number'
import { DynamicTypeFieldFilterMultiselect } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/multiselect/dynamic-type-field-filter-multiselect'
import { DynamicTypeFieldFilterString } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/string/dynamic-type-field-filter-string'
import { DynamicTypeGridCellRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/dynamic-type-grid-cell-registry'
import { DynamicTypeGridCellDependencyTypeIcon } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/_dependencies/dynamic-type-grid-cell-dependency-type-icon'
import { DynamicTypeGridCellElementSubtypeIcon } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/element-subtype-icon/dynamic-type-grid-cell-element-subtype-icon'
import { DynamicTypeGridCellAssetCustomMetadataIcon } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/_meta-data/dynamic-type-grid-cell-asset-custom-metadata-icon'
import { DynamicTypeGridCellAssetCustomMetadataValue } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/_meta-data/dynamic-type-grid-cell-asset-custom-metadata-value'
import { DynamicTypeGridCellPropertyIcon } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/_properties/dynamic-type-grid-cell-property-icon'
import { DynamicTypeGridCellPropertyValue } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/_properties/dynamic-type-grid-cell-property-value'
import { DynamicTypeGridCellScheduleActionsSelect } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/_schedule/dynamic-type-grid-cell-schedule-actions-select'
import { DynamicTypeGridCellVersionIdSelect } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/_schedule/dynamic-type-grid-cell-version-id-select'
import { DynamicTypeGridCellAssetVersionPreviewFieldLabel } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/_versions/dynamic-type-grid-cell-asset-version-preview-field-label'
import { DynamicTypeGridCellWebsiteSettingsValue } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/_website-settings/dynamic-type-grid-cell-website-settings-value'
import { DynamicTypeGridCellAssetActions } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/asset-actions/dynamic-type-grid-cell-asset-preview'
import { DynamicTypeGridCellAssetLink } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/asset-link/dynamic-type-grid-cell-asset-link'
import { DynamicTypeGridCellAssetPreview } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/asset-preview/dynamic-type-grid-cell-asset-preview'
import { DynamicTypeGridCellAsset } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/asset/dynamic-type-grid-cell-asset'
import { DynamicTypeGridCellCheckbox } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/checkbox/dynamic-type-grid-cell-checkbox'
import { DynamicTypeGridCellDataObjectActions } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/data-object-actions/dynamic-type-grid-cell-data-object-actions'
import { DynamicTypeGridCellDataObjectAdapter } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/data-object-adapter/dynamic-type-grid-cell-data-object-adapter'
import { DynamicTypeGridCellDataObjectObjectBrick } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/data-object-object-brick/dynamic-type-grid-cell-data-object-adapter'
import { DynamicTypeGridCellDateTime } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/date-time/dynamic-type-grid-cell-date-time'
import { DynamicTypeGridCellDate } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/date/dynamic-type-grid-cell-date'
import { DynamicTypeGridCellDocumentLink } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/document-link/dynamic-type-grid-cell-document-link'
import { DynamicTypeGridCellDocument } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/document/dynamic-type-grid-cell-document'
import { DynamicTypeGridCellElement } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/element/dynamic-type-grid-cell-element'
import { DynamicTypeGridCellLanguageSelect } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/language-select/dynamic-type-grid-cell-language-select'
import { DynamicTypeGridCellMultiSelect } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/multi-select/dynamic-type-grid-cell-multi-select'
import { DynamicTypeGridCellNumber } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/number/dynamic-type-grid-cell-number'
import { DynamicTypeGridCellObjectLink } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/object-link/dynamic-type-grid-cell-object-link'
import { DynamicTypeGridCellObject } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/object/dynamic-type-grid-cell-object'
import { DynamicTypeGridCellOpenElement } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/open-element/dynamic-type-grid-cell-open-element'
import { DynamicTypeGridCellSelect } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/select/dynamic-type-grid-cell-select'
import { DynamicTypeGridCellText } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/text/dynamic-type-grid-cell-text'
import { DynamicTypeGridCellTextarea } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/textarea/dynamic-type-grid-cell-text'
import { DynamicTypeGridCellTime } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/time/dynamic-type-grid-cell-time'
import { DynamicTypeGridCellTranslate } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/translate/dynamic-type-grid-cell-translate'
import { DynamicTypeListingRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/listing/dynamic-type-listing-registry'
import { DynamicTypeListingAssetLink } from '@Pimcore/modules/element/dynamic-types/definitions/listing/types/dynamic-type-listing-asset-link'
import { DynamicTypeMetaDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/meta-data/dynamic-type-metadata-registry'
import { DynamicTypeMetaDataAsset } from '@Pimcore/modules/element/dynamic-types/definitions/meta-data/types/dynamic-type-meta-data-asset'
import { DynamicTypeMetaDataCheckbox } from '@Pimcore/modules/element/dynamic-types/definitions/meta-data/types/dynamic-type-meta-data-checkbox'
import { DynamicTypeMetaDataDate } from '@Pimcore/modules/element/dynamic-types/definitions/meta-data/types/dynamic-type-meta-data-date'
import { DynamicTypeMetaDataDocument } from '@Pimcore/modules/element/dynamic-types/definitions/meta-data/types/dynamic-type-meta-data-document'
import { DynamicTypeMetaDataInput } from '@Pimcore/modules/element/dynamic-types/definitions/meta-data/types/dynamic-type-meta-data-input'
import { DynamicTypeMetaDataObject } from '@Pimcore/modules/element/dynamic-types/definitions/meta-data/types/dynamic-type-meta-data-object'
import { DynamicTypeMetaDataSelect } from '@Pimcore/modules/element/dynamic-types/definitions/meta-data/types/dynamic-type-meta-data-select'
import { DynamicTypeMetaDataTextarea } from '@Pimcore/modules/element/dynamic-types/definitions/meta-data/types/dynamic-type-meta-data-textarea'
import { DynamicTypeCustomReportDefinitionRegistry } from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-registry'
import { DynamicTypeCustomReportDefinitionSqlAdapter } from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/types/dynamic-type-custom-report-definition-sql-adapter'
import { DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { DynamicTypeObjectDataAdvancedManyToManyObjectRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-advanced-many-to-many-object-relation'
import { DynamicTypeObjectDataAdvancedManyToManyRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-advanced-many-to-many-relation'
import { DynamicTypeObjectDataBlock } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-block'
import { DynamicTypeObjectDataBooleanSelect } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-boolean-select'
import { DynamicTypeObjectDataCalculatedValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-calculated-value'
import { DynamicTypeObjectDataCheckbox } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-checkbox'
import { DynamicTypeObjectDataConsent } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-consent'
import { DynamicTypeObjectDataCountry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-country'
import { DynamicTypeObjectDataCountryMultiSelect } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-country-multiselect'
import { DynamicTypeObjectDataDate } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-date'
import { DynamicTypeObjectDataDateRange } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-date-range'
import { DynamicTypeObjectDataDatetime } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-datetime'
import { DynamicTypeObjectDataEmail } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-email'
import { DynamicTypeObjectDataEncryptedField } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-encrypted-field'
import { DynamicTypeObjectDataExternalImage } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-external-image'
import { DynamicTypeObjectDataFieldCollection } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-field-collection'
import { DynamicTypeObjectDataFirstname } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-firstname'
import { DynamicTypeObjectDataGender } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-gender'
import { DynamicTypeObjectDataGeoBounds } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-geobounds'
import { DynamicTypeObjectDataGeoPoint } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-geopoint'
import { DynamicTypeObjectDataGeoPolygon } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-geopolygon'
import { DynamicTypeObjectDataGeoPolyLine } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-geopolyline'
import { DynamicTypeObjectDataHotspotImage } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-hotspotimage'
import { DynamicTypeObjectDataImage } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-image'
import { DynamicTypeObjectDataImageGallery } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-image-gallery'
import { DynamicTypeObjectDataInput } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-input'
import { DynamicTypeObjectDataInputQuantityValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-input-quantity-value'
import { DynamicTypeObjectDataLanguage } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-language'
import { DynamicTypeObjectDataLanguageMultiSelect } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-language-multiselect'
import { DynamicTypeObjectDataLastname } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-lastname'
import { DynamicTypeObjectDataLink } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-link'
import { DynamicTypeObjectDataLocalizedFields } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-localized-fields'
import { DynamicTypeObjectDataManyToManyObjectRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-many-to-many-object-relation'
import { DynamicTypeObjectDataManyToManyRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-many-to-many-relation'
import { DynamicTypeObjectDataManyToOneRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-many-to-one-relation'
import { DynamicTypeObjectDataMultiSelect } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-multiselect'
import { DynamicTypeObjectDataNumeric } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-numeric'
import { DynamicTypeObjectDataNumericRange } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-numeric-range'
import { DynamicTypeObjectDataObjectBrick } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-object-brick'
import { DynamicTypeObjectDataPassword } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-password'
import { DynamicTypeObjectDataQuantityValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-quantity-value'
import { DynamicTypeObjectDataQuantityValueRange } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-quantity-value-range'
import { DynamicTypeObjectDataReverseObjectRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-reverse-object-relation'
import { DynamicTypeObjectDataRgbaColor } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-rgba-color'
import { DynamicTypeObjectDataSelect } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-select'
import { DynamicTypeObjectDataSlider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-slider'
import { DynamicTypeObjectDataStructuredTable } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-structured-table'
import { DynamicTypeObjectDataTable } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-table'
import { DynamicTypeObjectDataTextarea } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-textarea'
import { DynamicTypeObjectDataTime } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-time'
import { DynamicTypeObjectDataUrlSlug } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-url-slug'
import { DynamicTypeObjectDataUser } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-user'
import { DynamicTypeObjectDataVideo } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-video'
import { DynamicTypeObjectDataWysiwyg } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-wysiwyg'
import { DynamicTypeObjectRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/dynamic-type-object-registry'
import { DynamicTypeObjectLayoutRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/layout-related/dynamic-type-object-layout-registry'
import { DynamicTypeObjectLayoutAccordion } from '@Pimcore/modules/element/dynamic-types/definitions/objects/layout-related/types/dynamic-type-object-layout-accordion'
import { DynamicTypeObjectLayoutFieldContainer } from '@Pimcore/modules/element/dynamic-types/definitions/objects/layout-related/types/dynamic-type-object-layout-field-container'
import { DynamicTypeObjectLayoutFieldset } from '@Pimcore/modules/element/dynamic-types/definitions/objects/layout-related/types/dynamic-type-object-layout-fieldset'
import { DynamicTypeObjectLayoutPanel } from '@Pimcore/modules/element/dynamic-types/definitions/objects/layout-related/types/dynamic-type-object-layout-panel'
import { DynamicTypeObjectLayoutRegion } from '@Pimcore/modules/element/dynamic-types/definitions/objects/layout-related/types/dynamic-type-object-layout-region'
import { DynamicTypeObjectLayoutTabpanel } from '@Pimcore/modules/element/dynamic-types/definitions/objects/layout-related/types/dynamic-type-object-layout-tabpanel'
import { DynamicTypeObjectLayoutText } from '@Pimcore/modules/element/dynamic-types/definitions/objects/layout-related/types/dynamic-type-object-layout-text'
import { DynamicTypeObjectFolder } from '@Pimcore/modules/element/dynamic-types/definitions/objects/types/dynamic-type-object-folder'
import { DynamicTypeObjectObject } from '@Pimcore/modules/element/dynamic-types/definitions/objects/types/dynamic-type-object-object'
import { DynamicTypeObjectVariant } from '@Pimcore/modules/element/dynamic-types/definitions/objects/types/dynamic-type-object-variant'
import { DynamicTypeObjectDataClassificationStore } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-classification-store'
import { DynamicTypeGridCellBoolean } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/boolean/dynamic-type-grid-cell-boolean'
import { PageTabManager } from '@Pimcore/modules/document/editor/types/page/tab-manager/page-tab-manager'
import { EmailTabManager } from '@Pimcore/modules/document/editor/types/email/tab-manager/email-tab-manager'
import { HardlinkTabManager } from '@Pimcore/modules/document/editor/types/hardlink/tab-manager/hardlink-tab-manager'
import { LinkTabManager } from '@Pimcore/modules/document/editor/types/link/tab-manager/link-tab-manager'
import { SnippetTabManager } from '@Pimcore/modules/document/editor/types/snippet/tab-manager/snippet-tab-manager'
import { DocumentSidebarManager } from '@Pimcore/modules/document/editor/sidebar/document-sidebar-manager'
import { DocumentRequiredFieldsValidationServiceImpl } from '@Pimcore/modules/document/services/document-required-fields-validation-service'
import { DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry'
import { DynamicTypeDocumentEditableNumeric } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-numeric'
import { DynamicTypeDocumentEditableRelation } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-relation'
import { DynamicTypeDocumentEditableRelations } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-relations'
import { DynamicTypeDocumentEditableInput } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-input'
import { DynamicTypeDocumentEditableCheckbox } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-checkbox'
import { DynamicTypeDocumentEditableWysiwyg } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-wysiwyg'
import { DynamicTypeDocumentEditableDate } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-date'
import { DynamicTypeDocumentEditableLink } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-link'
import { DynamicTypeDocumentEditableEmbed } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-embed'
import { DynamicTypeDocumentEditableTextarea } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-textarea'
import { DynamicTypeDocumentEditableImage } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-image'
import { DynamicTypeDocumentEditablePdf } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-pdf'
import { DynamicTypeDocumentEditableVideo } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-video'
import { DynamicTypeDocumentEditableArea } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-area'
import { DynamicTypeDocumentEditableAreablock } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-areablock'
import { DynamicTypePipelineRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/dynamic-type-pipeline-registry'
import { DynamicTypePipelineGridSourceFieldsText } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/source-fields/types/text/text'
import { DynamicTypePipelineGridTransformersChangeCase } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/transformers/types/change-case/change-case'
import { DynamicTypePipelineGridTransformersAnonymizer } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/transformers/types/anonymizer/anonymizer'
import { DynamicTypePipelineGridTransformersBlur } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/transformers/types/blur/blur'
import { DynamicTypePipelineGridTransformersCombine } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/transformers/types/combine/combine'
import { DynamicTypePipelineGridTransformersExplode } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/transformers/types/explode/explode'
import { DynamicTypePipelineGridTransformersTrim } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/transformers/types/trim/trim'
import { DynamicTypePipelineGridTransformersTranslate } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/transformers/types/translate/translate'
import { DynamicTypePipelineGridTransformersPhpCode } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/transformers/types/php-code/php-code'
import { DynamicTypePipelineGridTransformersStringReplace } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/transformers/types/string-replace/string-replace'
import { DynamicTypePipelineGridTransformersSubstring } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/transformers/types/substring/substring'
import { DynamicTypePipelineGridTransformersElementCounter } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/transformers/types/element-counter/element-counter'
import { DynamicTypePipelineGridTransformersTwigOperator } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/transformers/types/twig-operator/twig-operator'
import { DynamicTypePipelineGridTransformersBooleanFormatter } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/transformers/types/boolean-formatter/boolean-formatter'
import { DynamicTypePipelineGridTransformersDateFormatter } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/transformers/types/date-formatter/date-formatter'
import { DynamicTypePipelineGridSourceFieldsSimpleField } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/source-fields/types/simple-field/simple-field'
import { DynamicTypePipelineGridSourceFieldsRelationField } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/grid/source-fields/types/relation-field/relation-field'
import { DynamicTypeDocumentEditableMultiSelect } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-multiselect'
import { DynamicTypeDocumentEditableSelect } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-select'
import { DynamicTypeDocumentEditableTable } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-table'
import { DynamicTypeDocumentEditableSnippet } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-snippet'
import { DynamicTypeDocumentEditableRenderlet } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-renderlet'
import { DynamicTypeDocumentEditableBlock } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-block'
import { DynamicTypeDocumentEditableScheduledblock } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/types/dynamic-type-document-editable-scheduledblock'
import { BackgroundProcessor } from '@Pimcore/modules/background-processor/services/background-processor'
import { GlobalMessageBusProcess } from '@Pimcore/modules/background-processor/process/global-message-bus-process'
import { GlobalMessageBus } from '@Pimcore/modules/global-message-bus/services/global-message-bus'
import { DynamicTypeThemeRegistry } from '@Pimcore/modules/app/theme/dynamic-types/registry/dynamic-type-theme-registry'
import { DynamicTypeThemeStudioDefaultLight } from '@Pimcore/modules/app/theme/dynamic-types/definitions/studio-default-light/dynamic-type-theme-studio-default-light'
import { DynamicTypeThemeStudioDefaultDark } from '@Pimcore/modules/app/theme/dynamic-types/definitions/studio-default-dark/dynamic-type-theme-studio-default-dark'
import { DynamicTypeGridCellDataObjectAdvanced } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/data-object-advanced/dynamic-type-grid-cell-data-object-advanced'
import { DynamicTypeEditableDialogLayoutRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/editable-dialog-layout/dynamic-type-editable-dialog-layout-registry'
import { DynamicTypeEditableDialogLayoutTabpanel } from '@Pimcore/modules/element/dynamic-types/definitions/editable-dialog-layout/types/dynamic-type-editable-dialog-layout-tabpanel'
import { DynamicTypeEditableDialogLayoutPanel } from '@Pimcore/modules/element/dynamic-types/definitions/editable-dialog-layout/types/dynamic-type-editable-dialog-layout-panel'
import { DynamicTypeGridCellString } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/string/dynamic-type-grid-cell-string'
import { DynamicTypeGridCellInteger } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/integer/dynamic-type-grid-cell-integer'
import { DynamicTypeGridCellError } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/error/dynamic-type-grid-cell-error'
import { DynamicTypeGridCellArray } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/array/dynamic-type-grid-cell-array'
import { DynamicTypeGridCellSystemId } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/system-id/dynamic-type-grid-cell-system-id'
import { DynamicTypeGridCellSystemString } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/system-string/dynamic-type-grid-cell-system-string'
import { DynamicTypeGridCellSystemBoolean } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/system-boolean/dynamic-type-grid-cell-system-boolean'
import { DynamicTypeGridCellSystemDatetime } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/system-datetime/dynamic-type-grid-cell-system-datetime'
import { DynamicTypeGridCellSystemInteger } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/system-integer/dynamic-type-grid-cell-system-integer'
import { DynamicTypeFieldFilterNone } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/none/dynamic-type-field-filter-none'
import { DynamicTypeDocumentPage } from '@Pimcore/modules/element/dynamic-types/definitions/document/types/dynamic-type-document-page'
import { DynamicTypeDocumentRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/dynamic-type-document-registry'
import { DynamicTypeDocumentEmail } from '@Pimcore/modules/element/dynamic-types/definitions/document/types/dynamic-type-document-email'
import { DynamicTypeDocumentFolder } from '@Pimcore/modules/element/dynamic-types/definitions/document/types/dynamic-type-document-folder'
import { DynamicTypeDocumentHardlink } from '@Pimcore/modules/element/dynamic-types/definitions/document/types/dynamic-type-document-hardlink'
import { DynamicTypeDocumentLink } from '@Pimcore/modules/element/dynamic-types/definitions/document/types/dynamic-type-document-link'
import { DynamicTypeDocumentNewsletter } from '@Pimcore/modules/element/dynamic-types/definitions/document/types/dynamic-type-document-newsletter'
import { DynamicTypeDocumentSnippet } from '@Pimcore/modules/element/dynamic-types/definitions/document/types/dynamic-type-document-snippet'
import { DynamicTypeFieldFilterBooleanSelect } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/boolean-select/dynamic-type-field-filter-boolean-select'
import { VariantTabManager } from '@Pimcore/modules/data-object/editor/types/variant/tab-manager/object-tab-manager'
import { DynamicTypeIconSetPimcoreDefault } from '@Pimcore/components/icon-selector/dynamic-types/definitions/pimcore-default-icons/dynamic-type-icon-set-pimcore-default'
import { DynamicTypeIconSetTwemoji } from '@Pimcore/components/icon-selector/dynamic-types/definitions/pimcore-twemoji-icons/dynamic-type-icon-set-twemoji'
import { DynamicTypeIconSetRegistry } from '@Pimcore/components/icon-selector/dynamic-types/registry/dynamic-type-icon-set-registry'
import { DynamicTypeGridCellClassificationStore } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/types/classificationstore/dynamic-type-grid-cell-classificationstore'
import { TypeRegistry } from '@Pimcore/modules/element/editor/services/type-registry'
import { IconLibrary } from '@Pimcore/modules/icon-library/services/icon-library'
import { IconColorGroupsRegistryService } from '@Pimcore/components/icon/icon-color-groups-registry'
import { DynamicTypeWidgetTypeElementTree } from '@Pimcore/modules/widget-editor/dynmic-types/definitions/dynamic-type-widget-type-element-tree'
import { DynamicTypeWidgetTypeRegistry } from '@Pimcore/modules/widget-editor/dynmic-types/registry/dynamic-type-widget-type-registry'
import { WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { WidgetRestorerRegistry } from '@Pimcore/modules/widget-manager/services/widget-restorer-registry'
import { ElementTreeWidgetPermissionRegistry } from '@Pimcore/modules/widget-editor/services/widget-context-menu-item-registry'
import { DynamicTypeFieldFilterClassificationStore } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/classification-store/dynamic-type-field-filter-classification-store'
import { DynamicTypeBatchEditClassificationStore } from '@Pimcore/modules/element/dynamic-types/definitions/batch-edits/types/classification-store/dynamic-type-batch-edit-classification-store'
import { DocumentUrlProcessorRegistry } from '@Pimcore/modules/document/services/processors/document-url-processor-registry'
import { DocumentSaveDataProcessorRegistry } from '@Pimcore/modules/document/services/processors/document-save-data-processor-registry'
import { DataObjectSaveDataProcessorRegistry } from '@Pimcore/modules/data-object/services/processors/data-object-save-data-processor-registry'
import { AssetSaveDataProcessorRegistry } from '@Pimcore/modules/asset/services/processors/asset-save-data-processor-registry'
import { PerspectiveProcessorRegistry } from '@Pimcore/modules/widget-manager/services/processors/perspective-processor-registry'
import { ElementIconProcessorRegistry } from '@Pimcore/modules/element/services/processors/element-icon-processor-registry'
import { ObjectListingBuilder } from '@sdk/modules/data-object'
import { AssetListingBuilder } from '@Pimcore/modules/asset/listing/builder/asset-listing-builder'
import { DynamicTypeFieldFilterInputQuantityValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/input-quantity-value/dynamic-type-field-filter-input-quantity-value'
import { DynamicTypeFieldFilterQuantityValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/quantity-value/dynamic-type-field-filter-quantity-value'
import { DynamicTypeFieldFilterColor } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/color/dynamic-type-field-filter-color'
import { DynamicTypeFieldFilterDatetime } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/datetime/dynamic-type-field-filter-datetime'
import { DynamicTypeFieldFilterTime } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/time/dynamic-type-field-filter-time'
import { DynamicTypeFieldFilterRelation } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/relation/dynamic-type-field-filter-relation'
import { AppLoaderRegistry } from '@Pimcore/modules/app/app-loader/services/app-loader-registry'
import { DynamicTypeObjectLayoutIframe } from '@Pimcore/modules/element/dynamic-types/definitions/objects/layout-related/types/dynamic-type-object-layout-iframe'
import { DynamicTypeFieldDefinitionInput } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/input/dynamic-type-field-definition-input'
import { DynamicTypeFieldDefinitionTextarea } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/textarea/dynamic-type-field-definition-textarea'
import { DynamicTypeFieldDefinitionWysiwyg } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/wysiwyg/dynamic-type-field-definition-wysiwyg'
import { DynamicTypeFieldDefinitionPassword } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/password/dynamic-type-field-definition-password'
import { DynamicTypeFieldDefinitionInputQuantityValue } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/inputQuantityValue/dynamic-type-field-definition-input-quantity-value'
import { DynamicTypeFieldDefinitionNumber } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/number/dynamic-type-field-definition-number'
import { DynamicTypeFieldDefinitionNumericRange } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/numericRange/dynamic-type-field-definition-numeric-range'
import { DynamicTypeFieldDefinitionSlider } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/slider/dynamic-type-field-definition-slider'
import { DynamicTypeFieldDefinitionQuantityValue } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/quantityValue/dynamic-type-field-definition-quantity-value'
import { DynamicTypeFieldDefinitionQuantityValueRange } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/quantityValueRange/dynamic-type-field-definition-quantity-value-range'
import { DynamicTypeFieldDefinitionDate } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/date/dynamic-type-field-definition-date'
import { DynamicTypeFieldDefinitionDateTime } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/dateTime/dynamic-type-field-definition-date-time'
import { DynamicTypeFieldDefinitionDateRange } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/dateRange/dynamic-type-field-definition-date-range'
import { DynamicTypeFieldDefinitionTime } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/time/dynamic-type-field-definition-time'
import { DynamicTypeFieldDefinitionImage } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/image/dynamic-type-field-definition-image'
import { DynamicTypeFieldDefinitionExternalImage } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/externalImage/dynamic-type-field-definition-external-image'
import { DynamicTypeFieldDefinitionImageGallery } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/imageGallery/dynamic-type-field-definition-image-gallery'
import { DynamicTypeFieldDefinitionVideo } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/video/dynamic-type-field-definition-video'
import { DynamicTypeFieldDefinitionHotspotImage } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/imageAdvanced/dynamic-type-field-definition-hotspot-image'
import { DynamicTypeFieldDefinitionGeopoint } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/geopoint/dynamic-type-field-definition-geopoint'
import { DynamicTypeFieldDefinitionGeobounds } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/geobounds/dynamic-type-field-definition-geobounds'
import { DynamicTypeFieldDefinitionGeopolygon } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/geopolygon/dynamic-type-field-definition-geopolygon'
import { DynamicTypeFieldDefinitionGeopolyline } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/geopolyline/dynamic-type-field-definition-geopolyline'
import { DynamicTypeFieldDefinitionFirstname } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/firstname/dynamic-type-field-definition-firstname'
import { DynamicTypeFieldDefinitionLastname } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/lastname/dynamic-type-field-definition-lastname'
import { DynamicTypeFieldDefinitionEmail } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/email/dynamic-type-field-definition-email'
import { DynamicTypeFieldDefinitionGender } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/gender/dynamic-type-field-definition-gender'
import { DynamicTypeFieldDefinitionConsent } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/consent/dynamic-type-field-definition-consent'
import { DynamicTypeFieldDefinitionSelect } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/select/dynamic-type-field-definition-select'
import { DynamicTypeFieldDefinitionBooleanSelect } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/booleanSelect/dynamic-type-field-definition-boolean-select'
import { DynamicTypeFieldDefinitionMultiselection } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/multiselection/dynamic-type-field-definition-multiselection'
import { DynamicTypeFieldDefinitionUser } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/user/dynamic-type-field-definition-user'
import { DynamicTypeFieldDefinitionCountry } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/country/dynamic-type-field-definition-country'
import { DynamicTypeFieldDefinitionLanguage } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/language/dynamic-type-field-definition-language'
import { DynamicTypeFieldDefinitionCountryMultiselect } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/countrymultiselect/dynamic-type-field-definition-countrymultiselect'
import { DynamicTypeFieldDefinitionLanguageMultiselect } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/languagemultiselect/dynamic-type-field-definition-languagemultiselect'
import { DynamicTypeFieldDefinitionRgbaColor } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/rgbaColor/dynamic-type-field-definition-rgba-color'
import { DynamicTypeFieldDefinitionEncryptedField } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/encryptedField/dynamic-type-field-definition-encrypted-field'
import { DynamicTypeFieldDefinitionUrlSlug } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/urlSlug/dynamic-type-field-definition-url-slug'
import { DynamicTypeFieldDefinitionCheckbox } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/checkbox/dynamic-type-field-definition-checkbox'
import { DynamicTypeFieldDefinitionLink } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/link/dynamic-type-field-definition-link'
import { DynamicTypeFieldDefinitionCalculatedValue } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/calculatedValue/dynamic-type-field-definition-calculated-value'
import { DynamicTypeFieldDefinitionManyToOne } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/manyToOneRelation/dynamic-type-field-definition-many-to-one'
import { DynamicTypeFieldDefinitionManyToMany } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/manyToManyRelation/dynamic-type-field-definition-many-to-many'
import { DynamicTypeFieldDefinitionManyToManyObject } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/manyToManyObjectRelation/dynamic-type-field-definition-many-to-many-object'
import { DynamicTypeFieldDefinitionAdvancedManyToMany } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/advancedManyToManyRelation/dynamic-type-field-definition-advanced-many-to-many'
import { DynamicTypeFieldDefinitionAdvancedManyToManyObject } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/advancedManyToManyObjectRelation/dynamic-type-field-definition-advanced-many-to-many-object'
import { DynamicTypeFieldDefinitionReverseObject } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/reverseObjectRelation/dynamic-type-field-definition-reverse-object'
import { DynamicTypeFieldDefinitionPanel } from '@Pimcore/modules/field-definitions/dynamic-types/types/layout/panel/dynamic-type-field-definition-panel'
import { DynamicTypeFieldDefinitionFieldContainer } from '@Pimcore/modules/field-definitions/dynamic-types/types/layout/fieldcontainer/dynamic-type-field-definition-field-container'
import { DynamicTypeFieldDefinitionFieldset } from '@Pimcore/modules/field-definitions/dynamic-types/types/layout/fieldset/dynamic-type-field-definition-fieldset'
import { DynamicTypeFieldDefinitionIframe } from '@Pimcore/modules/field-definitions/dynamic-types/types/layout/iframe/dynamic-type-field-definition-iframe'
import { DynamicTypeFieldDefinitionAccordion } from '@Pimcore/modules/field-definitions/dynamic-types/types/layout/accordion/dynamic-type-field-definition-accordion'
import { DynamicTypeFieldDefinitionRegion } from '@Pimcore/modules/field-definitions/dynamic-types/types/layout/region/dynamic-type-field-definition-region'
import { DynamicTypeFieldDefinitionTabpanel } from '@Pimcore/modules/field-definitions/dynamic-types/types/layout/tabpanel/dynamic-type-field-definition-tabpanel'
import { DynamicTypeFieldDefinitionText } from '@Pimcore/modules/field-definitions/dynamic-types/types/layout/text/dynamic-type-field-definition-text'
import { DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { DynamicTypeFieldDefinitionBlock } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/block/dynamic-type-field-definition-block'
import { DynamicTypeFieldDefinitionTable } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/table/dynamic-type-field-definition-table'
import { DynamicTypeFieldDefinitionStructuredTable } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/structuredTable/dynamic-type-field-definition-structured-table'
import { DynamicTypeFieldDefinitionFieldcollections } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/fieldcollections/dynamic-type-field-definition-fieldcollections'
import { DynamicTypeFieldDefinitionObjectbricks } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/objectbricks/dynamic-type-field-definition-objectbricks'
import { DynamicTypeFieldDefinitionClassificationstore } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/classificationstore/dynamic-type-field-definition-classificationstore'
import { DynamicTypeFieldDefinitionLocalizedfields } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/localizedfields/dynamic-type-field-definition-localizedfields'
import { DynamicTypeGDPRProviderRegistry } from '@Pimcore/modules/gdpr-data-extractor/dynamic-types/registry/dynamic-type-gdpr-provider-registry'
import { DynamicTypeDataObjectGDPRProvider } from '@Pimcore/modules/gdpr-data-extractor/dynamic-types/definitions/dynamic-type-data-object-gdpr-provider'
import { DynamicTypeAssetsGDPRProvider } from '@Pimcore/modules/gdpr-data-extractor/dynamic-types/definitions/dynamic-type-assets-gdpr-provider'
import { DynamicTypeUsersGDPRProvider } from '@Pimcore/modules/gdpr-data-extractor/dynamic-types/definitions/dynamic-type-users-gdpr-provider'
import { DynamicTypeEmailsGDPRProvider } from '@Pimcore/modules/gdpr-data-extractor/dynamic-types/definitions/dynamic-type-email-gdpr-provider'
import { TransformationDynamicTypeRegistry } from '@Pimcore/modules/image-thumbnails/dynamic-types/transformation-dynamic-type-registry'
import { TransformationFieldCollectionRegistry } from '@Pimcore/modules/image-thumbnails/registries/transformation-field-collection-registry'
import { CoverTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/cover/cover-transformation-type'
import { ResizeTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/resize/resize-transformation-type'
import { ScaleByWidthTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/scale-by-width/scale-by-width-transformation-type'
import { ScaleByHeightTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/scale-by-height/scale-by-height-transformation-type'
import { TrimTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/trim/trim-transformation-type'
import { SepiaTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/sepia/sepia-transformation-type'
import { GrayscaleTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/grayscale/grayscale-transformation-type'
import { SharpenTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/sharpen/sharpen-transformation-type'
import { ContainTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/contain/contain-transformation-type'
import { CropTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/crop/crop-transformation-type'
import { FrameTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/frame/frame-transformation-type'
import { RotateTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/rotate/rotate-transformation-type'
import { MirrorTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/mirror/mirror-transformation-type'
import { GaussianBlurTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/gaussian-blur/gaussian-blur-transformation-type'
import { BrightnessSaturationTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/brightness-saturation/brightness-saturation-transformation-type'
import { SetBackgroundColorTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/set-background-color/set-background-color-transformation-type'
import { SetBackgroundImageTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/set-background-image/set-background-image-transformation-type'
import { RoundCornersTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/round-corners/round-corners-transformation-type'
import { AddOverlayTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/add-overlay/add-overlay-transformation-type'
import { AddOverlayFitTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/add-overlay-fit/add-overlay-fit-transformation-type'
import { ApplyMaskTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/apply-mask/apply-mask-transformation-type'
import { TiffOriginalTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/tiff-original/tiff-original-transformation-type'
import { OnePixelTransformationType } from '@Pimcore/modules/image-thumbnails/dynamic-types/one-pixel/one-pixel-transformation-type'
import { VideoTransformationDynamicTypeRegistry } from '@Pimcore/modules/video-thumbnails/dynamic-types/video-transformation-dynamic-type-registry'
import { VideoTransformationFieldCollectionRegistry } from '@Pimcore/modules/video-thumbnails/registries/video-transformation-field-collection-registry'
import { ResizeVideoTransformationType } from '@Pimcore/modules/video-thumbnails/dynamic-types/resize/resize-transformation-type'
import { ScaleByWidthVideoTransformationType } from '@Pimcore/modules/video-thumbnails/dynamic-types/scale-by-width/scale-by-width-transformation-type'
import { ScaleByHeightVideoTransformationType } from '@Pimcore/modules/video-thumbnails/dynamic-types/scale-by-height/scale-by-height-transformation-type'
import { CutVideoTransformationType } from '@Pimcore/modules/video-thumbnails/dynamic-types/cut/cut-transformation-type'
import { SetFramerateVideoTransformationType } from '@Pimcore/modules/video-thumbnails/dynamic-types/set-framerate/set-framerate-transformation-type'
import { ColorChannelMixerVideoTransformationType } from '@Pimcore/modules/video-thumbnails/dynamic-types/color-channel-mixer/color-channel-mixer-transformation-type'
import { MuteVideoTransformationType } from '@Pimcore/modules/video-thumbnails/dynamic-types/mute/mute-transformation-type'

// Component registry
container.bind(serviceIds['App/ComponentRegistry/ComponentRegistry']).to(ComponentRegistry).inSingletonScope()

// Context menu registry
container.bind(serviceIds['App/ContextMenuRegistry/ContextMenuRegistry']).to(ContextMenuRegistry).inSingletonScope()

// Main nav
container.bind(serviceIds.mainNavRegistry).to(MainNavRegistry).inSingletonScope()

// Widget manager
container.bind(serviceIds.widgetManager).to(WidgetRegistry).inSingletonScope()
container.bind(serviceIds.widgetRestorerRegistry).to(WidgetRestorerRegistry).inSingletonScope()
container.bind(serviceIds.elementTreeWidgetPermissionRegistry).to(ElementTreeWidgetPermissionRegistry).inSingletonScope()
container.bind(serviceIds['WidgetManager/ProcessorRegistry/PerspectiveProcessor']).to(PerspectiveProcessorRegistry).inSingletonScope()

// Form services
container.bind(serviceIds.debouncedFormRegistry).to(DebouncedFormRegistry).inSingletonScope()

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
container.bind(serviceIds['Asset/Listing/Builder']).to(AssetListingBuilder).inSingletonScope()

// Asset Processor Registries
container.bind(serviceIds['Asset/ProcessorRegistry/SaveDataProcessor']).to(AssetSaveDataProcessorRegistry).inSingletonScope()

// Data Objects
container.bind(serviceIds['DataObject/Editor/TypeRegistry']).to(TypeRegistry).inSingletonScope()
container.bind(serviceIds['DataObject/Editor/ObjectTabManager']).to(ObjectTabManager).inSingletonScope()
container.bind(serviceIds['DataObject/Editor/VariantTabManager']).to(VariantTabManager).inSingletonScope()
container.bind(serviceIds['DataObject/Editor/FolderTabManager']).to(FolderTabManager).inSingletonScope()
container.bind(serviceIds['DataObject/Listing/Builder']).to(ObjectListingBuilder).inSingletonScope()

// Data Object Processor Registries
container.bind(serviceIds['DataObject/ProcessorRegistry/SaveDataProcessor']).to(DataObjectSaveDataProcessorRegistry).inSingletonScope()

// Documents
container.bind(serviceIds['Document/Editor/TypeRegistry']).to(TypeRegistry).inSingletonScope()
container.bind(serviceIds['Document/Editor/PageTabManager']).to(PageTabManager).inSingletonScope()
container.bind(serviceIds['Document/Editor/EmailTabManager']).to(EmailTabManager).inSingletonScope()
container.bind(serviceIds['Document/Editor/FolderTabManager']).to(FolderTabManager).inSingletonScope()
container.bind(serviceIds['Document/Editor/HardlinkTabManager']).to(HardlinkTabManager).inSingletonScope()
container.bind(serviceIds['Document/Editor/LinkTabManager']).to(LinkTabManager).inSingletonScope()
container.bind(serviceIds['Document/Editor/SnippetTabManager']).to(SnippetTabManager).inSingletonScope()

// Document Services
container.bind(serviceIds['Document/RequiredFieldsValidationService']).to(DocumentRequiredFieldsValidationServiceImpl).inSingletonScope()

// Document Processor Registries
container.bind(serviceIds['Document/ProcessorRegistry/UrlProcessor']).to(DocumentUrlProcessorRegistry).inSingletonScope()
container.bind(serviceIds['Document/ProcessorRegistry/SaveDataProcessor']).to(DocumentSaveDataProcessorRegistry).inSingletonScope()

// Element Processor Registries
container.bind(serviceIds['Element/ProcessorRegistry/IconProcessor']).to(ElementIconProcessorRegistry).inSingletonScope()

// Document Sidebar Managers
container.bind(serviceIds['Document/Editor/Sidebar/PageSidebarManager']).to(DocumentSidebarManager).inSingletonScope()
container.bind(serviceIds['Document/Editor/Sidebar/SnippetSidebarManager']).to(DocumentSidebarManager).inSingletonScope()
container.bind(serviceIds['Document/Editor/Sidebar/EmailSidebarManager']).to(DocumentSidebarManager).inSingletonScope()
container.bind(serviceIds['Document/Editor/Sidebar/LinkSidebarManager']).to(DocumentSidebarManager).inSingletonScope()
container.bind(serviceIds['Document/Editor/Sidebar/HardlinkSidebarManager']).to(DocumentSidebarManager).inSingletonScope()
container.bind(serviceIds['Document/Editor/Sidebar/FolderSidebarManager']).to(DocumentSidebarManager).inSingletonScope()

// Icon library
container.bind(serviceIds.iconLibrary).to(IconLibrary).inSingletonScope()
container.bind(serviceIds.iconColorGroupsRegistry).to(IconColorGroupsRegistryService).inSingletonScope()

// dynamic types field filters
container.bind(serviceIds['DynamicTypes/FieldFilterRegistry']).to(DynamicTypeFieldFilterRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/DataObjectAdapter']).to(DynamicTypeFieldFilterObjectAdapter).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/DataObjectObjectBrick']).to(DynamicTypeFieldFilterDataObjectObjectBrick).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/String']).to(DynamicTypeFieldFilterString).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/None']).to(DynamicTypeFieldFilterNone).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Id']).to(DynamicTypeFieldFilterId).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Number']).to(DynamicTypeFieldFilterNumber).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Multiselect']).to(DynamicTypeFieldFilterMultiselect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Date']).to(DynamicTypeFieldFilterDate).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Boolean']).to(DynamicTypeFieldFilterBoolean).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/BooleanSelect']).to(DynamicTypeFieldFilterBooleanSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Consent']).to(DynamicTypeFieldFilterConsent).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/ClassificationStore']).to(DynamicTypeFieldFilterClassificationStore).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/InputQuantityValue']).to(DynamicTypeFieldFilterInputQuantityValue).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/QuantityValue']).to(DynamicTypeFieldFilterQuantityValue).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Color']).to(DynamicTypeFieldFilterColor).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Datetime']).to(DynamicTypeFieldFilterDatetime).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Time']).to(DynamicTypeFieldFilterTime).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldFilter/Relation']).to(DynamicTypeFieldFilterRelation).inSingletonScope()
// dynamic types batch edit
container.bind(serviceIds['DynamicTypes/BatchEditRegistry']).to(DynamicTypeBatchEditRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/BatchEdit/Text']).to(DynamicTypeBatchEditText).inSingletonScope()
container.bind(serviceIds['DynamicTypes/BatchEdit/TextArea']).to(DynamicTypeBatchEditTextArea).inSingletonScope()
container.bind(serviceIds['DynamicTypes/BatchEdit/Datetime']).to(DynamicTypeBatchEditDatetime).inSingletonScope()
container.bind(serviceIds['DynamicTypes/BatchEdit/Select']).to(DynamicTypeBatchEditSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/BatchEdit/Checkbox']).to(DynamicTypeBatchEditCheckbox).inSingletonScope()
container.bind(serviceIds['DynamicTypes/BatchEdit/ElementDropzone']).to(DynamicTypeBatchEditElementDropzone).inSingletonScope()
container.bind(serviceIds['DynamicTypes/BatchEdit/ClassificationStore']).to(DynamicTypeBatchEditClassificationStore).inSingletonScope()
container.bind(serviceIds['DynamicTypes/BatchEdit/DataObjectAdapter']).to(DynamicTypeBatchEditDataObjectAdapter).inSingletonScope()
container.bind(serviceIds['DynamicTypes/BatchEdit/DataObjectObjectBrick']).to(DynamicTypeBatchEditDataObjectObjectBrick).inSingletonScope()

// dynamic types grid cells
container.bind(serviceIds['DynamicTypes/GridCellRegistry']).to(DynamicTypeGridCellRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Text']).to(DynamicTypeGridCellText).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Textarea']).to(DynamicTypeGridCellTextarea).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Number']).to(DynamicTypeGridCellNumber).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Select']).to(DynamicTypeGridCellSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/MultiSelect']).to(DynamicTypeGridCellMultiSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Checkbox']).to(DynamicTypeGridCellCheckbox).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Boolean']).to(DynamicTypeGridCellBoolean).inSingletonScope()
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
container.bind(serviceIds['DynamicTypes/GridCell/ElementSubtypeIcon']).to(DynamicTypeGridCellElementSubtypeIcon).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/AssetCustomMetadataIcon']).to(DynamicTypeGridCellAssetCustomMetadataIcon).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/AssetCustomMetadataValue']).to(DynamicTypeGridCellAssetCustomMetadataValue).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/PropertyIcon']).to(DynamicTypeGridCellPropertyIcon).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/PropertyValue']).to(DynamicTypeGridCellPropertyValue).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/WebsiteSettingsValue']).to(DynamicTypeGridCellWebsiteSettingsValue).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/ScheduleActionsSelect']).to(DynamicTypeGridCellScheduleActionsSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/VersionsIdSelect']).to(DynamicTypeGridCellVersionIdSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/AssetVersionPreviewFieldLabel']).to(DynamicTypeGridCellAssetVersionPreviewFieldLabel).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Asset']).to(DynamicTypeGridCellAsset).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Object']).to(DynamicTypeGridCellObject).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Document']).to(DynamicTypeGridCellDocument).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Element']).to(DynamicTypeGridCellElement).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/LanguageSelect']).to(DynamicTypeGridCellLanguageSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Translate']).to(DynamicTypeGridCellTranslate).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/DataObjectAdapter']).to(DynamicTypeGridCellDataObjectAdapter).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/ClassificationStore']).to(DynamicTypeGridCellClassificationStore).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/DataObjectObjectBrick']).to(DynamicTypeGridCellDataObjectObjectBrick).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/DataObjectAdvanced']).to(DynamicTypeGridCellDataObjectAdvanced).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/String']).to(DynamicTypeGridCellString).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Integer']).to(DynamicTypeGridCellInteger).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Error']).to(DynamicTypeGridCellError).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/Array']).to(DynamicTypeGridCellArray).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/SystemId']).to(DynamicTypeGridCellSystemId).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/SystemString']).to(DynamicTypeGridCellSystemString).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/SystemBoolean']).to(DynamicTypeGridCellSystemBoolean).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/SystemDatetime']).to(DynamicTypeGridCellSystemDatetime).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GridCell/SystemInteger']).to(DynamicTypeGridCellSystemInteger).inSingletonScope()

// Advanced grid cell registry
container.bind(serviceIds['DynamicTypes/AdvancedGridCellRegistry']).to(DynamicTypeGridCellRegistry).inSingletonScope()

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

// Report registry
container.bind(serviceIds['DynamicTypes/CustomReportDefinitionRegistry']).to(DynamicTypeCustomReportDefinitionRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/CustomReportDefinition/Sql']).to(DynamicTypeCustomReportDefinitionSqlAdapter).inSingletonScope()

// Object layout
container.bind(serviceIds['DynamicTypes/ObjectLayoutRegistry']).to(DynamicTypeObjectLayoutRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectLayout/Panel']).to(DynamicTypeObjectLayoutPanel).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectLayout/Tabpanel']).to(DynamicTypeObjectLayoutTabpanel).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectLayout/Accordion']).to(DynamicTypeObjectLayoutAccordion).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectLayout/Region']).to(DynamicTypeObjectLayoutRegion).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectLayout/Text']).to(DynamicTypeObjectLayoutText).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectLayout/Fieldset']).to(DynamicTypeObjectLayoutFieldset).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectLayout/FieldContainer']).to(DynamicTypeObjectLayoutFieldContainer).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectLayout/Iframe']).to(DynamicTypeObjectLayoutIframe).inSingletonScope()

container.bind(serviceIds['DynamicTypes/ObjectDataRegistry']).to(DynamicTypeObjectDataRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Input']).to(DynamicTypeObjectDataInput).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Textarea']).to(DynamicTypeObjectDataTextarea).inSingletonScope()
container.bind(serviceIds['DynamicTypes/ObjectData/Wysiwyg']).to(DynamicTypeObjectDataWysiwyg).inSingletonScope()
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
container.bind(serviceIds['DynamicTypes/ObjectData/ClassificationStore']).to(DynamicTypeObjectDataClassificationStore).inSingletonScope()

// Document editables
container.bind(serviceIds['DynamicTypes/DocumentEditableRegistry']).to(DynamicTypeDocumentEditableRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Block']).to(DynamicTypeDocumentEditableBlock).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Checkbox']).to(DynamicTypeDocumentEditableCheckbox).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Wysiwyg']).to(DynamicTypeDocumentEditableWysiwyg).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Date']).to(DynamicTypeDocumentEditableDate).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Embed']).to(DynamicTypeDocumentEditableEmbed).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Image']).to(DynamicTypeDocumentEditableImage).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Input']).to(DynamicTypeDocumentEditableInput).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Link']).to(DynamicTypeDocumentEditableLink).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/MultiSelect']).to(DynamicTypeDocumentEditableMultiSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Numeric']).to(DynamicTypeDocumentEditableNumeric).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Pdf']).to(DynamicTypeDocumentEditablePdf).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Relation']).to(DynamicTypeDocumentEditableRelation).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Relations']).to(DynamicTypeDocumentEditableRelations).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Renderlet']).to(DynamicTypeDocumentEditableRenderlet).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/ScheduledBlock']).to(DynamicTypeDocumentEditableScheduledblock).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Select']).to(DynamicTypeDocumentEditableSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Snippet']).to(DynamicTypeDocumentEditableSnippet).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Table']).to(DynamicTypeDocumentEditableTable).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Textarea']).to(DynamicTypeDocumentEditableTextarea).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Video']).to(DynamicTypeDocumentEditableVideo).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Area']).to(DynamicTypeDocumentEditableArea).inSingletonScope()
container.bind(serviceIds['DynamicTypes/DocumentEditable/Areablock']).to(DynamicTypeDocumentEditableAreablock).inSingletonScope()

// Editable dialog layout components
container.bind(serviceIds['DynamicTypes/EditableDialogLayoutRegistry']).to(DynamicTypeEditableDialogLayoutRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/EditableDialogLayout/Tabpanel']).to(DynamicTypeEditableDialogLayoutTabpanel).inSingletonScope()
container.bind(serviceIds['DynamicTypes/EditableDialogLayout/Panel']).to(DynamicTypeEditableDialogLayoutPanel).inSingletonScope()

// Document Types
container.bind(serviceIds['DynamicTypes/DocumentRegistry']).to(DynamicTypeDocumentRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Document/Page']).to(DynamicTypeDocumentPage).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Document/Email']).to(DynamicTypeDocumentEmail).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Document/Folder']).to(DynamicTypeDocumentFolder).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Document/Hardlink']).to(DynamicTypeDocumentHardlink).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Document/Link']).to(DynamicTypeDocumentLink).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Document/Newsletter']).to(DynamicTypeDocumentNewsletter).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Document/Snippet']).to(DynamicTypeDocumentSnippet).inSingletonScope()

// Asset Types
container.bind(serviceIds['DynamicTypes/AssetRegistry']).to(DynamicTypeAssetRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Asset/Archive']).to(DynamicTypeAssetArchive).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Asset/Audio']).to(DynamicTypeAssetAudio).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Asset/Document']).to(DynamicTypeAssetDocument).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Asset/Folder']).to(DynamicTypeAssetFolder).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Asset/Image']).to(DynamicTypeAssetImage).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Asset/Text']).to(DynamicTypeAssetText).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Asset/Unknown']).to(DynamicTypeAssetUnknown).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Asset/Video']).to(DynamicTypeAssetVideo).inSingletonScope()

// Object Types
container.bind(serviceIds['DynamicTypes/ObjectRegistry']).to(DynamicTypeObjectRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Object/Folder']).to(DynamicTypeObjectFolder).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Object/Object']).to(DynamicTypeObjectObject).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Object/Variant']).to(DynamicTypeObjectVariant).inSingletonScope()

// Advanced columns source fields
container.bind(serviceIds['DynamicTypes/Grid/SourceFieldsRegistry']).to(DynamicTypePipelineRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/SourceFields/Text']).to(DynamicTypePipelineGridSourceFieldsText).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/SourceFields/SimpleField']).to(DynamicTypePipelineGridSourceFieldsSimpleField).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/SourceFields/RelationField']).to(DynamicTypePipelineGridSourceFieldsRelationField).inSingletonScope()

// Advanced columns transformers
container.bind(serviceIds['DynamicTypes/Grid/TransformersRegistry']).to(DynamicTypePipelineRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/Transformers/BooleanFormatter']).to(DynamicTypePipelineGridTransformersBooleanFormatter).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/Transformers/DateFormatter']).to(DynamicTypePipelineGridTransformersDateFormatter).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/Transformers/ElementCounter']).to(DynamicTypePipelineGridTransformersElementCounter).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/Transformers/TwigOperator']).to(DynamicTypePipelineGridTransformersTwigOperator).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/Transformers/Anonymizer']).to(DynamicTypePipelineGridTransformersAnonymizer).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/Transformers/Blur']).to(DynamicTypePipelineGridTransformersBlur).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/Transformers/ChangeCase']).to(DynamicTypePipelineGridTransformersChangeCase).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/Transformers/Combine']).to(DynamicTypePipelineGridTransformersCombine).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/Transformers/Explode']).to(DynamicTypePipelineGridTransformersExplode).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/Transformers/StringReplace']).to(DynamicTypePipelineGridTransformersStringReplace).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/Transformers/Substring']).to(DynamicTypePipelineGridTransformersSubstring).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/Transformers/Trim']).to(DynamicTypePipelineGridTransformersTrim).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/Transformers/Translate']).to(DynamicTypePipelineGridTransformersTranslate).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Grid/Transformers/PHPCode']).to(DynamicTypePipelineGridTransformersPhpCode).inSingletonScope()

// Execution engine
container.bind(serviceIds['ExecutionEngine/JobComponentRegistry']).to(JobComponentRegistry).inSingletonScope()
container.bind(serviceIds['ExecutionEngine/JobRehydrationRegistry']).to(JobRehydrationRegistry).inSingletonScope()
container.bind(serviceIds.executionEngine).to(ExecutionEngine).inSingletonScope()

// Background processor
container.bind(serviceIds.backgroundProcessor).to(BackgroundProcessor).inSingletonScope()

// Global message system
container.bind(serviceIds.globalMessageBus).to(GlobalMessageBus).inSingletonScope()
container.bind(serviceIds.globalMessageBusProcess).to(GlobalMessageBusProcess).inSingletonScope()

// Asset services
container.bind(serviceIds['Asset/ThumbnailService']).to(ThumbnailService).inSingletonScope()

// Theme system
container.bind(serviceIds['DynamicTypes/ThemeRegistry']).to(DynamicTypeThemeRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Theme/StudioDefaultLight']).to(DynamicTypeThemeStudioDefaultLight).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Theme/StudioDefaultDark']).to(DynamicTypeThemeStudioDefaultDark).inSingletonScope()

// Icon set
container.bind(serviceIds['DynamicTypes/IconSetRegistry']).to(DynamicTypeIconSetRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/IconSet/PimcoreDefault']).to(DynamicTypeIconSetPimcoreDefault).inSingletonScope()
container.bind(serviceIds['DynamicTypes/IconSet/Twemoji']).to(DynamicTypeIconSetTwemoji).inSingletonScope()

// Perspective Ediotor & Widget Editor
container.bind(serviceIds['DynamicTypes/WidgetEditor/WidgetTypeRegistry']).to(DynamicTypeWidgetTypeRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/WidgetEditor/ElementTree']).to(DynamicTypeWidgetTypeElementTree).inSingletonScope()

// App Loader
container.bind(serviceIds['AppLoader/Registry']).to(AppLoaderRegistry).inSingletonScope()

// Field Definitions
container.bind(serviceIds['DynamicTypes/FieldDefinitionRegistry']).to(DynamicTypeFieldDefinitionRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Block']).to(DynamicTypeFieldDefinitionBlock).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Input']).to(DynamicTypeFieldDefinitionInput).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Textarea']).to(DynamicTypeFieldDefinitionTextarea).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Wysiwyg']).to(DynamicTypeFieldDefinitionWysiwyg).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Password']).to(DynamicTypeFieldDefinitionPassword).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/InputQuantityValue']).to(DynamicTypeFieldDefinitionInputQuantityValue).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Number']).to(DynamicTypeFieldDefinitionNumber).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/NumericRange']).to(DynamicTypeFieldDefinitionNumericRange).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Slider']).to(DynamicTypeFieldDefinitionSlider).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/QuantityValue']).to(DynamicTypeFieldDefinitionQuantityValue).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/QuantityValueRange']).to(DynamicTypeFieldDefinitionQuantityValueRange).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Date']).to(DynamicTypeFieldDefinitionDate).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/DateTime']).to(DynamicTypeFieldDefinitionDateTime).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/DateRange']).to(DynamicTypeFieldDefinitionDateRange).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Time']).to(DynamicTypeFieldDefinitionTime).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Image']).to(DynamicTypeFieldDefinitionImage).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/ExternalImage']).to(DynamicTypeFieldDefinitionExternalImage).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/ImageGallery']).to(DynamicTypeFieldDefinitionImageGallery).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Video']).to(DynamicTypeFieldDefinitionVideo).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/HotspotImage']).to(DynamicTypeFieldDefinitionHotspotImage).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Geopoint']).to(DynamicTypeFieldDefinitionGeopoint).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Geobounds']).to(DynamicTypeFieldDefinitionGeobounds).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Geopolygon']).to(DynamicTypeFieldDefinitionGeopolygon).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Geopolyline']).to(DynamicTypeFieldDefinitionGeopolyline).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Select']).to(DynamicTypeFieldDefinitionSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/BooleanSelect']).to(DynamicTypeFieldDefinitionBooleanSelect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Multiselect']).to(DynamicTypeFieldDefinitionMultiselection).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/User']).to(DynamicTypeFieldDefinitionUser).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Country']).to(DynamicTypeFieldDefinitionCountry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Language']).to(DynamicTypeFieldDefinitionLanguage).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/CountryMultiselect']).to(DynamicTypeFieldDefinitionCountryMultiselect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/LanguageMultiselect']).to(DynamicTypeFieldDefinitionLanguageMultiselect).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/RgbaColor']).to(DynamicTypeFieldDefinitionRgbaColor).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/EncryptedField']).to(DynamicTypeFieldDefinitionEncryptedField).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/UrlSlug']).to(DynamicTypeFieldDefinitionUrlSlug).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Checkbox']).to(DynamicTypeFieldDefinitionCheckbox).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Link']).to(DynamicTypeFieldDefinitionLink).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/CalculatedValue']).to(DynamicTypeFieldDefinitionCalculatedValue).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/ManyToOne']).to(DynamicTypeFieldDefinitionManyToOne).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/ManyToMany']).to(DynamicTypeFieldDefinitionManyToMany).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/ManyToManyObject']).to(DynamicTypeFieldDefinitionManyToManyObject).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/AdvancedManyToMany']).to(DynamicTypeFieldDefinitionAdvancedManyToMany).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/AdvancedManyToManyObject']).to(DynamicTypeFieldDefinitionAdvancedManyToManyObject).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/ReverseObject']).to(DynamicTypeFieldDefinitionReverseObject).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Accordion']).to(DynamicTypeFieldDefinitionAccordion).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/FieldContainer']).to(DynamicTypeFieldDefinitionFieldContainer).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Fieldset']).to(DynamicTypeFieldDefinitionFieldset).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Iframe']).to(DynamicTypeFieldDefinitionIframe).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Panel']).to(DynamicTypeFieldDefinitionPanel).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Region']).to(DynamicTypeFieldDefinitionRegion).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Tabpanel']).to(DynamicTypeFieldDefinitionTabpanel).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Text']).to(DynamicTypeFieldDefinitionText).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Table']).to(DynamicTypeFieldDefinitionTable).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/StructuredTable']).to(DynamicTypeFieldDefinitionStructuredTable).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Fieldcollections']).to(DynamicTypeFieldDefinitionFieldcollections).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Objectbricks']).to(DynamicTypeFieldDefinitionObjectbricks).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Classificationstore']).to(DynamicTypeFieldDefinitionClassificationstore).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Localizedfields']).to(DynamicTypeFieldDefinitionLocalizedfields).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Firstname']).to(DynamicTypeFieldDefinitionFirstname).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Lastname']).to(DynamicTypeFieldDefinitionLastname).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Email']).to(DynamicTypeFieldDefinitionEmail).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Gender']).to(DynamicTypeFieldDefinitionGender).inSingletonScope()
container.bind(serviceIds['DynamicTypes/FieldDefinition/Consent']).to(DynamicTypeFieldDefinitionConsent).inSingletonScope()

// Image Thumbnails Transformation Registry
container.bind(serviceIds['DynamicTypes/TransformationDynamicTypeRegistry']).to(TransformationDynamicTypeRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/TransformationFieldCollectionRegistry']).toDynamicValue((ctx) => {
  const transformationRegistry = ctx.container.get<TransformationDynamicTypeRegistry>(serviceIds['DynamicTypes/TransformationDynamicTypeRegistry'])
  return new TransformationFieldCollectionRegistry(transformationRegistry)
}).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/Cover']).to(CoverTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/Resize']).to(ResizeTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/ScaleByWidth']).to(ScaleByWidthTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/ScaleByHeight']).to(ScaleByHeightTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/Trim']).to(TrimTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/Sepia']).to(SepiaTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/Grayscale']).to(GrayscaleTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/Sharpen']).to(SharpenTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/Contain']).to(ContainTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/Crop']).to(CropTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/Frame']).to(FrameTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/Rotate']).to(RotateTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/Mirror']).to(MirrorTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/GaussianBlur']).to(GaussianBlurTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/BrightnessSaturation']).to(BrightnessSaturationTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/SetBackgroundColor']).to(SetBackgroundColorTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/SetBackgroundImage']).to(SetBackgroundImageTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/RoundCorners']).to(RoundCornersTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/AddOverlay']).to(AddOverlayTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/AddOverlayFit']).to(AddOverlayFitTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/ApplyMask']).to(ApplyMaskTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/TiffOriginal']).to(TiffOriginalTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/Transformation/OnePixel']).to(OnePixelTransformationType).inSingletonScope()

// Video Thumbnails Transformation Registry
container.bind(serviceIds['DynamicTypes/VideoTransformationDynamicTypeRegistry']).to(VideoTransformationDynamicTypeRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/VideoTransformationFieldCollectionRegistry']).toDynamicValue((ctx) => {
  const videoTransformationRegistry = ctx.container.get<VideoTransformationDynamicTypeRegistry>(serviceIds['DynamicTypes/VideoTransformationDynamicTypeRegistry'])
  return new VideoTransformationFieldCollectionRegistry(videoTransformationRegistry)
}).inSingletonScope()
container.bind(serviceIds['DynamicTypes/VideoTransformation/Resize']).to(ResizeVideoTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/VideoTransformation/ScaleByWidth']).to(ScaleByWidthVideoTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/VideoTransformation/ScaleByHeight']).to(ScaleByHeightVideoTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/VideoTransformation/Cut']).to(CutVideoTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/VideoTransformation/SetFramerate']).to(SetFramerateVideoTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/VideoTransformation/ColorChannelMixer']).to(ColorChannelMixerVideoTransformationType).inSingletonScope()
container.bind(serviceIds['DynamicTypes/VideoTransformation/Mute']).to(MuteVideoTransformationType).inSingletonScope()

// GDPR Provider
container.bind(serviceIds['DynamicTypes/GDPRProviderRegistry']).to(DynamicTypeGDPRProviderRegistry).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GDPRProvider/DataObjects']).to(DynamicTypeDataObjectGDPRProvider).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GDPRProvider/Assets']).to(DynamicTypeAssetsGDPRProvider).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GDPRProvider/Users']).to(DynamicTypeUsersGDPRProvider).inSingletonScope()
container.bind(serviceIds['DynamicTypes/GDPRProvider/Emails']).to(DynamicTypeEmailsGDPRProvider).inSingletonScope()
