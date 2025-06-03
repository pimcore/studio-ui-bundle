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
import {
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract, type GetGridCellDefinitionProps,
  type WithEditModalGridCellDefinition
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  CalculatedValue
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/calculated-value/calculated-value'
import type { FormItemProps } from 'antd/es/form/FormItem'
import {
  CalculatedValueLabel
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/calculated-value/components/label/label'
import { GridCellPreviewWrapper } from '../../grid-cell-preview/grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { Tag } from '@Pimcore/components/tag/tag'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { isEmpty, isNumber, isString } from 'lodash'

export type CalculatedValueObjectDataDefinition = AbstractObjectDataDefinition & {
  elementType: string
  width?: number | string | null
}

export class DynamicTypeObjectDataCalculatedValue extends DynamicTypeObjectDataAbstract {
  id: string = 'calculatedValue'

  getObjectDataComponent (props: CalculatedValueObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <CalculatedValue
        { ...props }
        className={ props.className }
      />
    )
  }

  getObjectDataFormItemProps (props: CalculatedValueObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: <CalculatedValueLabel label={ props.title } />
    }
  }

  getGridCellDefinition (props: GetGridCellDefinitionProps): WithEditModalGridCellDefinition {
    const cellProps = { ...props, objectProps: { ...props.objectProps } }
    const objectProps: CalculatedValueObjectDataDefinition = props.objectProps as CalculatedValueObjectDataDefinition

    return {
      mode: 'edit-modal',
      previewComponent: this.getGridCellPreviewComponent(cellProps),
      editComponent: this.getGridCellEditComponent(cellProps),
      formItemProps: this.getObjectDataFormItemProps(objectProps),
      handleDefaultValue: this.handleDefaultValue,
      editModalSettings: undefined,
      supportsBatchAppendModes: false
    }
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value = props.cellProps.getValue()
    const objectProps: CalculatedValueObjectDataDefinition = props.objectProps as CalculatedValueObjectDataDefinition

    const formatValue = (value: any): string => {
      if (objectProps.elementType === 'date' && (isNumber(value) || isString(value))) {
        return formatDateTime({ timestamp: value, dateStyle: 'short', timeStyle: 'short' })
      }

      if (objectProps.elementType === 'boolean') {
        return !isEmpty(value) ? 'true' : 'false'
      }

      return value
    }

    return (
      <GridCellPreviewWrapper>
        <Tag>{ formatValue(value) }</Tag>
      </GridCellPreviewWrapper>
    )
  }

  getDefaultGridColumnWidth (): number | undefined {
    return 350
  }
}
