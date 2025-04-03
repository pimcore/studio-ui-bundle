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

import React, { useState } from 'react'
import { useUserHelper } from '@Pimcore/modules/user/hooks/use-user-helper'
import { AutoComplete, Avatar, Input, Row, Col, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { UserOutlined } from '@ant-design/icons'
import { useStyles } from '@Pimcore/components/search-input/search-input.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

interface ITreeAutocompleteProps {
  loading?: boolean
}

const TreeAutocomplete = ({ loading = true, ...props }: ITreeAutocompleteProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { openUser, searchUserByText } = useUserHelper()
  const [searchOptions, setSearchOptions] = useState<Array<{ value: string }>>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const { Text } = Typography
  const { styles } = useStyles()

  const onSearch = (value: string): void => {
    setSearchValue(value)

    searchUserByText(searchValue).then(response => {
      console.log(response)
      setSearchOptions(response.items.map((item) => ({
        value: item.id.toString(),
        label: (
          <Row
            gutter={ 8 }
            wrap={ false }
          >
            <Col flex="none">
              <Avatar
                icon={ <UserOutlined /> }
                size={ 26 }
              />
            </Col>
            <Col flex="auto">
              <div>{item.username}</div>
              <Text strong>{t('user-management.search.id')}: </Text> {item.id}
            </Col>
          </Row>
        )
      })))
    }).catch(e => { trackError(new GeneralError('An error occured while searching for a user')) })
  }

  return (
    <AutoComplete
      className={ 'simple-tree--search' }
      onSearch={ onSearch }
      onSelect={ (id, option) => {
        openUser(Number(id))
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
        placeholder={ t('user-management.search') }
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
