/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { AutoComplete, Input, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useStyles } from '@Pimcore/components/search-input/search-input.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { useRoleHelper } from '@Pimcore/modules/user/roles/hooks/use-roles-helper'

interface ITreeAutocompleteProps {
  loading?: boolean
}

const TreeAutocomplete = ({ loading = true, ...props }: ITreeAutocompleteProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openRole, searchRoleByText } = useRoleHelper()

  const [searchOptions, setSearchOptions] = useState<Array<{ value: string }>>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const { Text } = Typography
  const { styles } = useStyles()

  const onSearch = (value: string): void => {
    setSearchValue(value)

    searchRoleByText(searchValue).then(response => {
      setSearchOptions(response.items.map((item) => ({
        value: item.id.toString(),
        label: (
          <>
            <div>{item.name}</div>
            <Text strong>{t('roles.search.id')}: </Text> {item.id}
          </>
        )
      })))
    }).catch(e => { trackError(new GeneralError('An error occured while searching for a role')) })
  }

  return (
    <AutoComplete
      className={ 'tree--search' }
      onSearch={ onSearch }
      onSelect={ (id, option) => {
        openRole(Number(id))
        setSearchValue('')
      } }
      options={ searchOptions }
      value={ searchValue }
    >
      <Input.Search
        allowClear={ {
          clearIcon: (
            <Icon
              className={ styles.closeIcon }
              value='close'
            />
          )
        } }
        className={ styles.searchWithoutAddon }
        placeholder={ t('roles.search') }
        prefix={
          <Icon
            className={ styles.searchIcon }
            options={ { width: 12, height: 12 } }
            value='search'
          />
        }
      />
    </AutoComplete>
  )
}

export { TreeAutocomplete }
