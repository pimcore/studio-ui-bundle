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
import { type AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '../dynamic-type-document-editable-abstract'
import { Table } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/table/table'
import { type TableValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/table/hooks/use-table-value'
import { isNil, isEmpty } from 'lodash'
import { toCssDimension } from '@sdk/utils'

export type TableEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: {
    defaults?: {
      cols?: number
      rows?: number
      data?: string[][]
    }
    width?: number | string
    class?: string
  }
}

export class DynamicTypeDocumentEditableTable extends DynamicTypeDocumentEditableAbstract {
  id: string = 'table'

  getEditableDataComponent (props: TableEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <Table
        className={ props.config?.class }
        cols={ props.config?.defaults?.cols ?? 2 }
        rows={ props.config?.defaults?.rows ?? 2 }
        width={ toCssDimension(props.config?.width, props.defaultFieldWidth.large) }
      />
    )
  }

  transformValue (value: any, props: TableEditableDefinition): TableValue | null {
    if (isNil(value) || isEmpty(value)) {
      // Initialize with default data if provided
      const defaultData = props.config?.defaults?.data
      if (!isNil(defaultData) && !isEmpty(defaultData)) {
        return defaultData
      }

      // Return null - the Table component will handle initialization via its cols/rows props
      return null
    }
    return value
  }
}
