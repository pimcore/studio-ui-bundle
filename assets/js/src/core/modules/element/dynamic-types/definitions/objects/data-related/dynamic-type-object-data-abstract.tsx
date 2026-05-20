/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ColumnMetaType } from '@Pimcore/components/grid/grid'
import { type InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'
import { type ModalSize } from '@Pimcore/components/modal/modal'
import {
  type IFormattedDataStructureData,
  type IProcessVersionFieldDataProps
} from '@Pimcore/modules/data-object/editor/shared-tab-manager/tabs/versions/types'
import { type IExtractLocalizedFieldsProps, type ILocalizedFieldDescriptor } from '@Pimcore/modules/data-object/editor/toolbar/language-comparison-view/helpers/process-layout-data'
import { type DataComponentProps } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/components/data-component'
import { FieldLabel } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label'
import { defaultFieldWidthValues, type IFieldWidthContext } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'
import { respectLineBreak } from '@Pimcore/utils/helpers'
import { type FormInstance } from 'antd'
import { type FormItemProps } from 'antd/es/form/FormItem'
import { injectable } from 'inversify'
import { type NamePath } from 'rc-field-form/es/interface'
import React, { type ReactElement, type ReactNode } from 'react'
import { type DynamicTypeAbstract } from '../../../registry/dynamic-type-registry-abstract'
import { type AbstractGridCellDefinition } from '../../grid-cell/dynamic-type-grid-cell-abstract'
import { DefaultPreview } from './components/grid-cells/image/default-preview'
import { type DynamicTypeFieldFilterAbstract, type AbstractFieldFilterDefinition } from '../../field-filters/dynamic-type-field-filter-abstract'
import { type DynamicTypeFieldFilterRegistry } from '@sdk/modules/element'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { Icon } from '@Pimcore/components/icon/icon'
import { isNonEmptyString } from '@sdk/utils'
import { t } from 'i18next'

export type EditMode = 'default' | 'edit-modal' | 'column-meta'
export interface EditModalSettings {
  modalSize: ModalSize
  formLayout: 'vertical' | 'horizontal'
}

export interface DefaultGridCellDefinition {
  mode: 'default'
  type: string
}

export interface WithEditModalGridCellDefinition {
  mode: 'edit-modal'
  previewComponent: ReactElement
  editComponent: ReactElement
  formItemProps: FormItemProps
  editModalSettings?: EditModalSettings
  handleDefaultValue?: (props: AbstractObjectDataDefinition, form: FormInstance, fieldName: NamePath) => void
  supportsBatchAppendModes: boolean
}

export interface ColumnMetaGridCellDefinition {
  mode: 'column-meta'
  meta: GridCellColumnMeta
}

export interface GetGridCellDefinitionProps {
  cellProps: AbstractGridCellDefinition
  objectProps: AbstractObjectDataDefinition
}

export interface AbstractObjectDataDefinition extends DataComponentProps {
  mandatory?: boolean | null
  tooltip?: string | null
  inherited?: boolean
  invisible?: boolean | null
  noteditable?: boolean | null
  title?: ReactNode
  defaultFieldWidth: IFieldWidthContext
  combinedFieldName?: string
}

export type GridCellColumnMeta = ColumnMetaType & { type: string }

@injectable()
export abstract class DynamicTypeObjectDataAbstract implements DynamicTypeAbstract {
  abstract readonly id: string
  readonly dynamicTypeFieldFilterType: InstanceType<typeof DynamicTypeFieldFilterAbstract> = container.get(serviceIds['DynamicTypes/FieldFilter/None'])
  isCollectionType: boolean = false
  inheritedMaskOverlay: InheritanceOverlayType = false
  supportsBatchAppendModes: boolean = false
  isAllowedInBatchEdit: boolean = true

  gridCellEditMode: EditMode = 'default'
  gridCellEditModalSettings: EditModalSettings = {
    modalSize: 'M',
    formLayout: 'horizontal'
  }

  abstract getObjectDataComponent (props: AbstractObjectDataDefinition): ReactElement<AbstractObjectDataDefinition>

  async processVersionFieldData (props: IProcessVersionFieldDataProps): Promise<IFormattedDataStructureData[]> {
    const { fieldBreadcrumbTitle, item, fieldValueByName, fieldPath, versionId, versionCount } = props

    return [{ fieldBreadcrumbTitle, fieldData: item, fieldValue: fieldValueByName, fieldPath, versionId, versionCount }]
  }


  async extractLocalizedFields (_props: IExtractLocalizedFieldsProps): Promise<ILocalizedFieldDescriptor[] | false> {
    return false
  }

  getVersionObjectDataComponent (props: AbstractObjectDataDefinition): ReactElement<AbstractObjectDataDefinition> {
    return this.getObjectDataComponent({ ...props, noteditable: true })
  }

  getObjectDataFormItemProps (props: AbstractObjectDataDefinition): FormItemProps {
    return {
      className: 'w-full',
      label: React.createElement(FieldLabel, { label: props.title, name: props.name }),
      required: props.mandatory === true,
      hidden: props.invisible === true,
      tooltip: isNonEmptyString(props.tooltip)
        ? {
            title: respectLineBreak(t(props.tooltip), false),
            icon: <Icon
              options={ { width: 14, height: 14 } }
              value="help-circle"
                  />
          }
        : undefined
    }
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): ReactElement {
    return <DefaultPreview />
  }

  getGridCellEditComponent (props: GetGridCellDefinitionProps): ReactElement {
    return this.getObjectDataComponent(props.objectProps)
  }

  getGridCellDefinition (props: GetGridCellDefinitionProps): DefaultGridCellDefinition | WithEditModalGridCellDefinition | ColumnMetaGridCellDefinition {
    if (this.gridCellEditMode === 'edit-modal') {
      const cellProps = { ...props, objectProps: { ...props.objectProps, defaultFieldWidth: defaultFieldWidthValues } }

      return {
        mode: this.gridCellEditMode,
        previewComponent: this.getGridCellPreviewComponent(cellProps),
        editComponent: this.getGridCellEditComponent(cellProps),
        formItemProps: this.getObjectDataFormItemProps(cellProps.objectProps),
        editModalSettings: this.gridCellEditModalSettings,
        handleDefaultValue: this.handleDefaultValue,
        supportsBatchAppendModes: this.supportsBatchAppendModes
      }
    }

    if (this.gridCellEditMode === 'column-meta') {
      return {
        mode: this.gridCellEditMode,
        meta: this.getGridCellColumnMeta(props)
      }
    }

    return {
      mode: this.gridCellEditMode,
      type: this.id
    }
  }

  getGridCellColumnMeta (props: GetGridCellDefinitionProps): GridCellColumnMeta {
    return {
      type: this.id
    }
  }

  handleDefaultValue (props: AbstractObjectDataDefinition, form: FormInstance, fieldName: NamePath): void {
    // This method is intentionally left empty - can be implemented in subclasses
  }

  /**
   * Optional. When defined, controls how an incoming changedValue for this field
   * type is merged into the already-accumulated modified-attributes map.
   *
   * If not implemented, the edit-form provider falls back to replacing the current
   * value with the incoming one.
   *
   * This method is only invoked when the dynamic type's id matches the form key of
   * the changed value. This is the case for field types that register themselves as
   * a named form group (e.g. localizedfields uses Form.Group name="localizedfields",
   * so its form key and type id are both "localizedfields").
   *
   * @param current  The value currently accumulated for this field's key.
   * @param incoming The new partial value arriving from the form's onValuesChange event.
   * @returns        The value that should be stored for this field's key.
   */
  mergeChangedValues?: (current: any, incoming: any) => any

  getDefaultGridColumnWidth (props?: AbstractObjectDataDefinition): number | undefined {
    return undefined
  }

  getFieldFilterComponent (props: AbstractFieldFilterDefinition): ReactElement<AbstractFieldFilterDefinition> {
    const fieldFilterRegistry = container.get<DynamicTypeFieldFilterRegistry>(serviceIds['DynamicTypes/FieldFilterRegistry'])
    return fieldFilterRegistry.getComponent(this.dynamicTypeFieldFilterType.id, props)
  }
}
