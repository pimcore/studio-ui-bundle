/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { defineFilter, type FilterControlProps } from '@Pimcore/components/filters'
import { PQLQueryInput } from '@Pimcore/components/pql-query-input/pql-query-input'
import { getErrorKey, ErrorKeyTypes } from '@Pimcore/modules/app/error-handler'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { pqlFilterType } from '../../context-layer/provider/pql-filter/pql-filter-provider'
import { type ElementFilterQueryPart, type ElementFilterContext } from '../element-filter-types'

const PqlFilterControl = ({ value, onChange }: FilterControlProps<string>): React.JSX.Element => {
  const [isShowPqlError, setIsShowPqlError] = useState<boolean>(false)
  const [pqlError, setPqlError] = useState<FetchBaseQueryError | undefined>(undefined)
  const { dataQueryResult } = useData()

  useEffect(() => {
    const error = dataQueryResult?.error
    if (dataQueryResult?.isError === true && getErrorKey(error) === ErrorKeyTypes.GDI_PARSING_EXCEPTION) {
      setIsShowPqlError(true)
      setPqlError(error as FetchBaseQueryError)
    }
  }, [dataQueryResult?.error])

  return (
    <PQLQueryInput
      errorData={ pqlError }
      handleChange={ (val) => {
        onChange(val)
        setIsShowPqlError(false)
        setPqlError(undefined)
      } }
      isShowError={ isShowPqlError }
      value={ value }
    />
  )
}

export const pqlFilterDescriptor = defineFilter<string, ElementFilterQueryPart, ElementFilterContext>({
  key: 'pql',
  defaultValue: '',
  section: 'advanced',
  order: 10,
  isEnabled: () => true,
  renderSection: ({ value, onChange }) => (
    <PqlFilterControl
      onChange={ onChange }
      value={ value }
    />
  ),
  toQuery: (value) => {
    if (value === '') {
      return undefined
    }

    return { kind: 'columnFilters', filters: [{ type: pqlFilterType, filterValue: value }] }
  }
})
