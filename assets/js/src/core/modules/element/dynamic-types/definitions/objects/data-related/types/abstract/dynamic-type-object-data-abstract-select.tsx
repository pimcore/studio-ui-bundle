/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'

import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract, type EditMode, type GetGridCellDefinitionProps, type GridCellColumnMeta } from '../../dynamic-type-object-data-abstract'
import { Select } from '@Pimcore/components/select/select'
import type { FormInstance } from 'antd'
import type { NamePath } from 'rc-field-form/es/interface'
import _ from 'lodash'
import {
  type InputObjectDataDefinition
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-input'
import { toCssDimension } from '@Pimcore/utils/css'
import { convertSelectOptions, normalizeSelectValue } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/utils/select-options'
import { DynamicSelectField } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/dynamic-select-field/dynamic-select-field'
import { useGridDynamicSelectOptions } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/hooks/use-dynamic-select-options'
import { type SelectCellConfig } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/components/select/select-cell'

export type SelectProps = AbstractObjectDataDefinition & {
  defaultValue?: string | number | string[] | null
  allowClear?: boolean
  options?: Array<{ key: string, value: string | number }> | null
  multiSelect?: boolean
  maxItems?: number | null
  width?: number | string | null
  dynamicOptions?: boolean
}

export abstract class DynamicTypeObjectDataAbstractSelect extends DynamicTypeObjectDataAbstract {
  gridCellEditMode: EditMode = 'column-meta'

  getObjectDataComponent (props: SelectProps): React.ReactElement<AbstractObjectDataDefinition> {
    // Dynamic providers fetch options from the backend; static ones use the layout options.
    if (props.dynamicOptions === true) {
      return <DynamicSelectField { ...props } />
    }

    const options = this.convertOptions(props.options)
    const hasHtmlLabels = options?.some(o => o.title !== undefined) ?? false
    return (
      <Select
        allowClear={ props.allowClear !== false }
        className={ props.className }
        disabled={ props.noteditable === true }
        inherited={ props.inherited }
        maxCount={ props.maxItems ?? undefined }
        mode={ props.multiSelect === true ? 'multiple' : undefined }
        optionFilterProp={ hasHtmlLabels ? 'title' : 'label' }
        options={ options }
        showSearch
        sortableTags={ props.multiSelect === true }
        style={ { maxWidth: toCssDimension(props.width, props.defaultFieldWidth.medium) } }
        value={ this.normalizeValue(props.value) }
      />
    )
  }

  handleDefaultValue (props: InputObjectDataDefinition, form: FormInstance, fieldName: NamePath): void {
    if (_.isEmpty(props.defaultValue)) {
      return
    }
    if (_.isEmpty(form.getFieldValue(fieldName))) {
      form.setFieldValue(fieldName, props.defaultValue)
    }
  }

  convertOptions (options: Array<{ key: string, value: string | number }> | null | undefined): Array<{ label: React.ReactNode, title?: string, value: string | number | null }> | undefined {
    return convertSelectOptions(options)
  }

  normalizeValue (value: unknown): string | string[] | null | undefined {
    return normalizeSelectValue(value)
  }

  getGridCellColumnMeta (props: GetGridCellDefinitionProps): GridCellColumnMeta {
    return {
      type: 'select',
      editable: props.objectProps.noteditable !== true,
      config: this.getGridCellSelectConfig(props)
    }
  }

  // Grid-cell select config, shared by select and multi-select.
  protected getGridCellSelectConfig (props: GetGridCellDefinitionProps): SelectCellConfig {
    if (props.objectProps.dynamicOptions === true) {
      // Seed the label from the layout options for display; fetch fresh options on edit.
      return {
        useOptionsHook: useGridDynamicSelectOptions,
        fieldName: props.objectProps.combinedFieldName,
        options: this.convertOptions(props.objectProps.options as Array<{ key: string, value: string | number }> | null) ?? []
      }
    }

    const isEditable = props.objectProps.noteditable !== true
    const hasOptions = props.objectProps.options !== undefined && Array.isArray(props.objectProps.options) && props.objectProps.options.length > 0

    return {
      options: isEditable && hasOptions ? this.convertOptions(props.objectProps.options as Array<{ key: string, value: string | number }> | null) ?? [] : []
    }
  }

  getDefaultGridColumnWidth (): number | undefined {
    return 200
  }
}
