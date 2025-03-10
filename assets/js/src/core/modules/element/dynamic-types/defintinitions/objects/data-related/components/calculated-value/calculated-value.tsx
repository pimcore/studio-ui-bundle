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
import cn from 'classnames'
import { Input } from '@Pimcore/components/input/input'
import { toCssDimension } from '@Pimcore/utils/css'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { DatePicker } from '@Pimcore/components/date-picker/date-picker'
import _ from 'lodash'
import { useFieldWidth } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/field-width/use-field-width'

export interface CalculatedValueProps {
  value?: string | null
  elementType: string
  width?: number | string | null
  className?: string
}

export const CalculatedValue = (props: CalculatedValueProps): React.JSX.Element => {
  const fieldWidth = useFieldWidth()

  const getElementTypeComponent = (): React.JSX.Element => {
    if (props.elementType === 'textarea') {
      return (
        <TextArea
          autoSize
          className={ props.className }
          readOnly
          value={ props.value ?? '' }
        />
      )
    } else if (props.elementType === 'numeric') {
      return (
        <InputNumber
          className={ cn('w-full', props.className) }
          readOnly
          value={ props.value ?? undefined }
        />
      )
    } else if (props.elementType === 'date') {
      return (
        <DatePicker
          className={ props.className }
          disabled
          value={ props.value ?? undefined }
        />
      )
    } else if (props.elementType === 'boolean') {
      return (
        <div>{!_.isEmpty(props.value) ? 'true' : 'false' }</div>
      )
    } else if (props.elementType === 'html') {
      return <SanitizeHtml html={ props.value ?? '' } />
    } else {
      return (
        <Input
          className={ props.className }
          disabled
          readOnly
          value={ props.value ?? '' }
        />
      )
    }
  }

  const getDefaultFieldWidth = (): number => {
    if (props.elementType === 'numeric') {
      return fieldWidth.medium
    }
    if (props.elementType === 'date') {
      return fieldWidth.small
    }
    return fieldWidth.large
  }

  return (
    <div
      style={ { maxWidth: toCssDimension(props.width, getDefaultFieldWidth()) } }
    >
      {getElementTypeComponent() }
    </div>
  )
}
