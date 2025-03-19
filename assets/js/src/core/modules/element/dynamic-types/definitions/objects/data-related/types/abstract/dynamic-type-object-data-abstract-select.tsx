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

import React from 'react'

import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract, type EditMode, type GetGridCellDefinitionProps, type GridCellColumnMeta } from '../../dynamic-type-object-data-abstract'
import { Select } from '@Pimcore/components/select/select'
import { t } from 'i18next'
import type { FormInstance } from 'antd'
import type { NamePath } from 'rc-field-form/es/interface'
import _ from 'lodash'
import {
  type InputObjectDataDefinition
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/dynamic-type-object-data-input'
import { toCssDimension } from '@Pimcore/utils/css'

export type SelectProps = AbstractObjectDataDefinition & {
  defaultValue?: string | number | string[] | null
  allowClear?: boolean
  options: Array<{ key: string, value: string | number }> | null
  multiSelect?: boolean
  maxItems?: number | null
  width?: number | string | null
}

export abstract class DynamicTypeObjectDataAbstractSelect extends DynamicTypeObjectDataAbstract {
  gridCellEditMode: EditMode = 'column-meta'

  getObjectDataComponent (props: SelectProps): React.ReactElement<AbstractObjectDataDefinition> {
    const options = this.convertOptions(props.options)
    return (
      <Select
        allowClear={ props.allowClear !== false }
        className={ props.className }
        disabled={ props.noteditable === true }
        inherited={ props.inherited }
        maxCount={ props.maxItems ?? undefined }
        mode={ props.multiSelect === true ? 'multiple' : undefined }
        optionFilterProp="label"
        options={ options }
        showSearch
        style={ { maxWidth: toCssDimension(props.width, props.defaultFieldWidth.medium) } }
        value={ props.value }
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

  convertOptions (options: Array<{ key: string, value: string | number }> | null): Array<{ label: string, value: string | number }> | undefined {
    if (options === null) {
      return
    }
    return options.map(option => ({ label: t(option.key), value: option.value }))
  }

  getGridCellColumnMeta (props: GetGridCellDefinitionProps): GridCellColumnMeta {
    return {
      type: 'select',
      editable: props.objectProps.noteditable !== true,
      config: {
        options: this.convertOptions(props.objectProps.options as Array<{ key: string, value: string | number }> | null)
      }
    }
  }
}
