/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type KeyboardEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { TextArea } from '@sdk/components'
import { useMultiValueFilterSupport } from '../utils/multi-value-filter-support'
import { DynamicTypeFieldFilterTextComponent } from './dynamic-type-field-filter-text-component'

export interface DynamicTypeFieldFilterStringProps extends AbstractFieldFilterDefinition {}

const MAX_ROWS = 8

/**
 * The string filter: where the host supports lists it is a text filter that also takes a list,
 * everywhere else it stays the single-line input it always was.
 */
export const DynamicTypeFieldFilterStringComponent = (): React.JSX.Element => {
  const supportsMultiValue = useMultiValueFilterSupport()

  return supportsMultiValue ? <DynamicTypeFieldFilterMultiValueComponent /> : <DynamicTypeFieldFilterTextComponent />
}

/**
 * A single line is searched for as before, several lines (e.g. a column pasted from a
 * spreadsheet) match any of the values exactly. Enter applies the filter, Shift+Enter starts
 * a new line.
 */
const DynamicTypeFieldFilterMultiValueComponent = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { data, setData, commit } = useDynamicFilter()
  const [_value, setValue] = useState<string>(typeof data === 'string' ? data : '')

  useEffect(() => {
    setValue(typeof data === 'string' ? data : '')
  }, [data])

  return (
    <TextArea
      autoSize={ { minRows: 1, maxRows: MAX_ROWS } }
      onBlur={ onBlur }
      onChange={ (event) => { setValue(event.target.value) } }
      onKeyDown={ onKeyDown }
      placeholder={ t('grid.filter.string.placeholder') }
      value={ _value }
    />
  )

  function onBlur (): void {
    setData(_value)
  }

  /**
   * Hosts that apply filters immediately expose commit(), so Enter applies the value
   * right away. Hosts that only collect a draft until their own "Apply" button have no
   * commit(), and Enter behaves like leaving the field.
   */
  function onKeyDown (event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) {
      return
    }

    event.preventDefault()

    if (commit !== undefined) {
      commit(_value)
      return
    }

    setData(_value)
  }
}
