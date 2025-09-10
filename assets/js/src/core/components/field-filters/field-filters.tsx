/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useState } from 'react'
import { type IDynamicFilter } from '../dynamic-filter/provider/dynamic-filter-provider'
import { StackList, type StackListProps } from '../stack-list/stack-list'
import { DynamicFilter } from '../dynamic-filter/dynamic-filter'
import { IconButton } from '../icon-button/icon-button'
import { Tag } from '../tag/tag'
import { LanguageSelection } from '../language-selection'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { Flex } from '../flex/flex'
import { isNil } from 'lodash'
import { Tooltip } from '../tooltip/tooltip'

export interface FieldFiltersProps {
  data: IDynamicFilter[]
  onChange?: (data: IDynamicFilter[]) => void
}

export const FieldFilters = ({ data, onChange }: FieldFiltersProps): React.JSX.Element => {
  const [_data, _setData] = useState(data)
  const { requiredLanguages } = useSettings()

  const setData = (data: IDynamicFilter[]): void => {
    _setData(data)

    if (onChange !== undefined) {
      onChange(data)
    }
  }

  useEffect(() => {
    _setData(data)
  }, [data])

  const onFilterChange = (filter: IDynamicFilter, data: any): void => {
    const index = _data.findIndex((f) => f.id === filter.id)
    const updatedData = [..._data]
    updatedData[index] = { ...updatedData[index], data }
    setData(updatedData)
  }

  const onLanguageSelectionChanged = (filter: IDynamicFilter, locale: string | null): void => {
    const index = _data.findIndex((f) => f.id === filter.id)
    const updatedData = [..._data]
    updatedData[index] = { ...updatedData[index], locale }
    setData(updatedData)
  }

  const onRemoveClick = (filter: IDynamicFilter): void => {
    setData(_data.filter((f) => f.id !== filter.id))
  }

  const items: StackListProps['items'] = _data.map((filter) => {
    return {
      id: filter.id,
      key: filter.id,
      title: filter.id,
      children: <Tooltip title={ filter.nameTooltip }>
        <Tag>{filter.id}</Tag>
      </Tooltip>,
      body: (
        <DynamicFilter
          { ...filter }
          onChange={ (data) => { onFilterChange(filter, data) } }
        />
      ),
      renderRightToolbar: (
        <Flex gap="mini">
          {filter.localizable === true && (
            <LanguageSelection
              key={ 'language' }
              languages={ requiredLanguages }
              onSelectLanguage={ (locale) => { onLanguageSelectionChanged(filter, locale) } }
              selectedLanguage={ !isNil(filter.locale) ? filter.locale : '' }
            />
          )}
          <IconButton
            icon={ { value: 'close' } }
            key={ 'remove' }
            onClick={ () => { onRemoveClick(filter) } }
          />
        </Flex>
      )
    }
  })

  return useMemo(() => (
    <StackList items={ items } />
  ), [items])
}
