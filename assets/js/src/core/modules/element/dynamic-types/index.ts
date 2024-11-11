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
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type DynamicTypeFieldFilterRegistry } from './defintinitions/field-filters/dynamic-type-field-filter-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeFieldFilterText } from './defintinitions/field-filters/types/text/dynamic-type-field-filter-text'
import { type DynamicTypeFieldFilterSelect } from './defintinitions/field-filters/types/select/dynamic-type-field-filter-select'
import { type DynamicTypeGridCellText } from './defintinitions/grid-cell/types/text/dynamic-type-grid-cell-text'
import { type DynamicTypeGridCellRegistry } from './defintinitions/grid-cell/dynamic-type-grid-cell-registry'
import { type DynamicTypeGridCellTextarea } from './defintinitions/grid-cell/types/textarea/dynamic-type-grid-cell-text'
import { type DynamicTypeGridCellSelect } from './defintinitions/grid-cell/types/select/dynamic-type-grid-cell-select'
import { type DynamicTypeGridCellCheckbox } from './defintinitions/grid-cell/types/checkbox/dynamic-type-grid-cell-checkbox'
import { type DynamicTypeGridCellDate } from './defintinitions/grid-cell/types/date/dynamic-type-grid-cell-date'
import { type DynamicTypeGridCellTime } from './defintinitions/grid-cell/types/time/dynamic-type-grid-cell-time'
import { type DynamicTypeGridCellDateTime } from './defintinitions/grid-cell/types/date-time/dynamic-type-grid-cell-date-time'
import { type DynamicTypeGridCellAssetLink } from './defintinitions/grid-cell/types/asset-link/dynamic-type-grid-cell-asset-link'
import { type DynamicTypeGridCellObjectLink } from './defintinitions/grid-cell/types/object-link/dynamic-type-grid-cell-object-link'
import { type DynamicTypeGridCellDocumentLink } from './defintinitions/grid-cell/types/document-link/dynamic-type-grid-cell-document-link'
import { type DynamicTypeGridCellOpenElement } from './defintinitions/grid-cell/types/open-element/dynamic-type-grid-cell-open-element'
import { type DynamicTypeGridCellAssetPreview } from './defintinitions/grid-cell/types/asset-preview/dynamic-type-grid-cell-asset-preview'
import { type DynamicTypeGridCellAssetActions } from './defintinitions/grid-cell/types/asset-actions/dynamic-type-grid-cell-asset-preview'
import { type DynamicTypeGridCellDependencyTypeIcon } from './defintinitions/grid-cell/types/_dependencies/dynamic-type-grid-cell-dependency-type-icon'
import { type DynamicTypeGridCellAssetCustomMetadataIcon } from './defintinitions/grid-cell/types/_meta-data/dynamic-type-grid-cell-asset-custom-metadata-icon'
import { type DynamicTypeGridCellAssetCustomMetadataValue } from './defintinitions/grid-cell/types/_meta-data/dynamic-type-grid-cell-asset-custom-metadata-value'
import { type DynamicTypeGridCellPropertyIcon } from './defintinitions/grid-cell/types/_properties/dynamic-type-grid-cell-property-icon'
import { type DynamicTypeGridCellPropertyValue } from './defintinitions/grid-cell/types/_properties/dynamic-type-grid-cell-property-value'
import { type DynamicTypeGridCellScheduleActionsSelect } from './defintinitions/grid-cell/types/_schedule/dynamic-type-grid-cell-schedule-actions-select'
import { type DynamicTypeGridCellVersionIdSelect } from './defintinitions/grid-cell/types/_schedule/dynamic-type-grid-cell-version-id-select'
import { type DynamicTypeGridCellAssetVersionPreviewFieldLabel } from './defintinitions/grid-cell/types/_versions/dynamic-type-grid-cell-asset-version-preview-field-label'
import { type DynamicTypeMetaDataRegistry } from './defintinitions/meta-data/dynamic-type-metadata-registry'
import { type DynamicTypeMetaDataAsset } from './defintinitions/meta-data/types/dynamic-type-meta-data-asset'
import { type DynamicTypeMetaDataCheckbox } from './defintinitions/meta-data/types/dynamic-type-meta-data-checkbox'
import { type DynamicTypeMetaDataDate } from './defintinitions/meta-data/types/dynamic-type-meta-data-date'
import { type DynamicTypeMetaDataDocument } from './defintinitions/meta-data/types/dynamic-type-meta-data-document'
import { type DynamicTypeMetaDataInput } from './defintinitions/meta-data/types/dynamic-type-meta-data-input'
import { type DynamicTypeMetaDataObject } from './defintinitions/meta-data/types/dynamic-type-meta-data-object'
import { type DynamicTypeMetaDataSelect } from './defintinitions/meta-data/types/dynamic-type-meta-data-select'
import { type DynamicTypeMetaDataTextarea } from './defintinitions/meta-data/types/dynamic-type-meta-data-textarea'
import { type DynamicTypeObjectLayoutRegistry } from './defintinitions/objects/layout-related/dynamic-type-object-layout-registry'
import { type DynamicTypeObjectLayoutPanel } from './defintinitions/objects/layout-related/types/dynamic-type-object-layout-panel'
import { type DynamicTypeObjectDataRegistry } from './defintinitions/objects/data-related/dynamic-type-object-data-registry'
import { type DynamicTypeObjectLayoutTabpanel } from './defintinitions/objects/layout-related/types/dynamic-type-object-layout-tabpanel'
import { type DynamicTypeObjectLayoutAccordion } from './defintinitions/objects/layout-related/types/dynamic-type-object-layout-accordion'
import { type DynamicTypeObjectLayoutRegion } from './defintinitions/objects/layout-related/types/dynamic-type-object-layout-region'
import { type DynamicTypeObjectLayoutText } from './defintinitions/objects/layout-related/types/dynamic-type-object-layout-text'
import { type DynamicTypeObjectLayoutFieldset } from './defintinitions/objects/layout-related/types/dynamic-type-object-layout-fieldset'
import { type DynamicTypeObjectLayoutFieldContainer } from './defintinitions/objects/layout-related/types/dynamic-type-object-layout-field-container'
import { type DynamicTypeObjectDataInput } from './defintinitions/objects/data-related/types/dynamic-type-object-data-input'
import { type DynamicTypeObjectDataTextarea } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-textarea'
import { type DynamicTypeObjectDataPassword } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-password'
import { type DynamicTypeObjectDataSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-select'
import { type DynamicTypeObjectDataMultiSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-multiselect'
import { type DynamicTypeObjectDataLanguage } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-language'
import { type DynamicTypeObjectDataLanguageMultiSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-language-multiselect'
import { type DynamicTypeObjectDataCountry } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-country'
import { type DynamicTypeObjectDataCountryMultiSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-country-multiselect'
import { type DynamicTypeObjectDataUser } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-user'
import { type DynamicTypeObjectDataBooleanSelect } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-boolean-select'
import { type DynamicTypeObjectDataNumeric } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-numeric'
import { type DynamicTypeObjectDataFirstname } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-firstname'
import { type DynamicTypeObjectDataLastname } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-lastname'
import { type DynamicTypeObjectDataEmail } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-email'
import { type DynamicTypeObjectDataGender } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-gender'
import { type DynamicTypeObjectDataRgbaColor } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-rgba-color'
import { type DynamicTypeObjectDataDate } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-date'
import { type DynamicTypeObjectDataDatetime } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-datetime'
import { type DynamicTypeObjectDataBlock } from './defintinitions/objects/data-related/types/dynamic-type-object-data-block'
import { type DynamicTypeObjectDataLocalizedFields } from './defintinitions/objects/data-related/types/dynamic-type-object-data-localized-fields'

moduleSystem.registerModule({
  onInit () {
    const fieldFilterRegistry = container.get<DynamicTypeFieldFilterRegistry>(serviceIds['DynamicTypes/FieldFilterRegistry'])

    fieldFilterRegistry.registerDynamicType(container.get<DynamicTypeFieldFilterText>(serviceIds['DynamicTypes/FieldFilter/Text']))
    fieldFilterRegistry.registerDynamicType(container.get<DynamicTypeFieldFilterSelect>(serviceIds['DynamicTypes/FieldFilter/Select']))

    const GridCellRegistry = container.get<DynamicTypeGridCellRegistry>(serviceIds['DynamicTypes/GridCellRegistry'])

    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellText>(serviceIds['DynamicTypes/GridCell/Text']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellTextarea>(serviceIds['DynamicTypes/GridCell/Textarea']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellSelect>(serviceIds['DynamicTypes/GridCell/Select']))
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
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellDependencyTypeIcon>(serviceIds['DynamicTypes/GridCell/DependencyTypeIcon']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellAssetCustomMetadataIcon>(serviceIds['DynamicTypes/GridCell/AssetCustomMetadataIcon']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellAssetCustomMetadataValue>(serviceIds['DynamicTypes/GridCell/AssetCustomMetadataValue']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellPropertyIcon>(serviceIds['DynamicTypes/GridCell/PropertyIcon']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellPropertyValue>(serviceIds['DynamicTypes/GridCell/PropertyValue']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellScheduleActionsSelect>(serviceIds['DynamicTypes/GridCell/ScheduleActionsSelect']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellVersionIdSelect>(serviceIds['DynamicTypes/GridCell/VersionsIdSelect']))
    GridCellRegistry.registerDynamicType(container.get<DynamicTypeGridCellAssetVersionPreviewFieldLabel>(serviceIds['DynamicTypes/GridCell/AssetVersionPreviewFieldLabel']))

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
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataPassword>(serviceIds['DynamicTypes/ObjectData/Password']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataSelect>(serviceIds['DynamicTypes/ObjectData/Select']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataMultiSelect>(serviceIds['DynamicTypes/ObjectData/MultiSelect']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataLanguage>(serviceIds['DynamicTypes/ObjectData/Language']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataLanguageMultiSelect>(serviceIds['DynamicTypes/ObjectData/LanguageMultiSelect']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataCountry>(serviceIds['DynamicTypes/ObjectData/Country']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataCountryMultiSelect>(serviceIds['DynamicTypes/ObjectData/CountryMultiSelect']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataUser>(serviceIds['DynamicTypes/ObjectData/User']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataBooleanSelect>(serviceIds['DynamicTypes/ObjectData/BooleanSelect']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataNumeric>(serviceIds['DynamicTypes/ObjectData/Numeric']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataFirstname>(serviceIds['DynamicTypes/ObjectData/Firstname']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataLastname>(serviceIds['DynamicTypes/ObjectData/Lastname']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataEmail>(serviceIds['DynamicTypes/ObjectData/Email']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataGender>(serviceIds['DynamicTypes/ObjectData/Gender']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataRgbaColor>(serviceIds['DynamicTypes/ObjectData/RgbaColor']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataDate>(serviceIds['DynamicTypes/ObjectData/Date']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataDatetime>(serviceIds['DynamicTypes/ObjectData/Datetime']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataBlock>(serviceIds['DynamicTypes/ObjectData/Block']))
    objectDataRegistry.registerDynamicType(container.get<DynamicTypeObjectDataLocalizedFields>(serviceIds['DynamicTypes/ObjectData/LocalizedFields']))
  }
})
