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
import { DatePicker } from '@sdk/components'
import { isNull } from 'lodash'
import dayjs from 'dayjs'

export type DateEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: {
    class?: string
  }
}

export class DynamicTypeDocumentEditableDate extends DynamicTypeDocumentEditableAbstract {
  id: string = 'date'

  getEditableDataComponent (props: DateEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <DatePicker
        allowClear
        className={ props.config?.class }
        outputType="dateString"
      />
    )
  }

  transformValue (value: number | null, props: DateEditableDefinition): string | null {
    if (isNull(value)) {
      return null
    }

    // Convert unix timestamp (seconds) to dayjs object and format with local timezone
    return dayjs.unix(value).format()
  }
}
