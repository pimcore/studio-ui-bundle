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
import { isEmpty } from 'lodash'
import { useListGridAvailableColumns, getFormattedDropDownMenu } from '../../../hooks/use-list'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { type GridColumnConfiguration } from 'src/sdk/main'
import { FieldFiltersListContainer } from './field-filters-list-container'
import { useFilters } from '../hooks/use-filters'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'

const FILTER_FIELD_KEY_IGNORE_LIST = ['size']

export const FieldFiltersContainer = (): React.JSX.Element => {
  const { t } = useTranslation()

  const { dropDownMenu } = useListGridAvailableColumns()
  const { columns, addColumn } = useFilters()
  const { hasType } = useDynamicTypeResolver()

  const handleColumnClick = (column: GridColumnConfiguration): void => {
    addColumn(column)
  }

  const getFilteredDropDownMenu = (): Record<string, GridColumnConfiguration[]> => {
    const dropDownMenuCopy = { ...dropDownMenu }

    Object.keys(dropDownMenuCopy).forEach(key => {
      dropDownMenuCopy[key] = dropDownMenuCopy[key].filter((item) => {
        const hasDynamicType = hasType({ target: 'FIELD_FILTER', dynamicTypeIds: [item.frontendType!] })
        const isIgnoredField = FILTER_FIELD_KEY_IGNORE_LIST.includes(item.key)

        return hasDynamicType && !isIgnoredField
      })
    })

    return dropDownMenuCopy
  }

  const filteredDropDownMenu = getFilteredDropDownMenu()

  return (
    <Space
      direction='vertical'
      style={ { width: '100%' } }
    >
      <FieldFiltersListContainer columns={ columns } />

      {!isEmpty(filteredDropDownMenu) && (
        <Dropdown menu={ { items: getFormattedDropDownMenu(filteredDropDownMenu, handleColumnClick) } }>
          <IconTextButton
            icon={ { value: 'new' } }
            type='link'
          >
            { t('listing.add-column') }
          </IconTextButton>
        </Dropdown>
      )}
    </Space>
  )
}
