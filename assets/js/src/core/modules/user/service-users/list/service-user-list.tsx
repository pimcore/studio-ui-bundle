/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { type ServiceUser } from '../service-users-api-slice-enhanced'
import { filterServiceUsers } from '../utils/dormancy'
import { ServiceUserStatusTags } from '../components/service-user-status-tags'
import { useStyles } from './service-user-list.styles'

interface ServiceUserListProps {
  serviceUsers: ServiceUser[]
  isLoading: boolean
  selectedId: number | undefined
  /** Unix timestamp the dormancy filter compares against. */
  now: number
  onSelect: (id: number) => void
  onCreate: () => void
  onCreateFromUser: () => void
  onRefresh: () => void
}

export const ServiceUserList = ({
  serviceUsers,
  isLoading,
  selectedId,
  now,
  onSelect,
  onCreate,
  onCreateFromUser,
  onRefresh
}: ServiceUserListProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles, cx } = useStyles()
  const [searchTerm, setSearchTerm] = useState('')
  const [unusedForMoreThanDays, setUnusedForMoreThanDays] = useState<number | null>(null)

  const filtered = useMemo(
    () => filterServiceUsers(serviceUsers, { searchTerm, unusedForMoreThanDays }, now),
    [serviceUsers, searchTerm, unusedForMoreThanDays, now]
  )

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar justify="space-between">
          <IconButton
            icon={ { value: 'refresh' } }
            onClick={ onRefresh }
            title={ t('refresh') }
            type="link"
          />
          <Flex gap="mini">
            <IconTextButton
              icon={ { value: 'copy' } }
              onClick={ onCreateFromUser }
              type="link"
            >
              {t('service-users.create-from-user')}
            </IconTextButton>
            <IconTextButton
              icon={ { value: 'new' } }
              onClick={ onCreate }
              type="link"
            >
              {t('service-users.create')}
            </IconTextButton>
          </Flex>
        </Toolbar>
      }
    >
      <Content
        loading={ isLoading }
        padded
      >
        <Flex
          className={ styles.filters }
          gap="extra-small"
          vertical
        >
          <SearchInput
            onChange={ (event) => { setSearchTerm(event.target.value) } }
            placeholder={ t('search') }
            value={ searchTerm }
            withoutAddon
          />
          <InputNumber
            min={ 1 }
            onChange={ (value) => { setUnusedForMoreThanDays(typeof value === 'number' ? value : null) } }
            placeholder={ t('service-users.filter.unused-days') }
            precision={ 0 }
            value={ unusedForMoreThanDays }
          />
        </Flex>

        {filtered.length === 0
          ? <Content none />
          : (
            <Flex vertical>
              {filtered.map((serviceUser) => (
                <button
                  className={ cx(styles.item, selectedId === serviceUser.id && styles.itemSelected) }
                  key={ serviceUser.id }
                  onClick={ () => { onSelect(serviceUser.id) } }
                  type="button"
                >
                  <Flex
                    align="center"
                    gap="mini"
                    justify="space-between"
                  >
                    <Text className={ serviceUser.active ? undefined : styles.itemInactive }>{serviceUser.name}</Text>
                    <span>
                      <ServiceUserStatusTags
                        active={ serviceUser.active }
                        lastLogin={ serviceUser.lastLogin }
                        now={ now }
                      />
                    </span>
                  </Flex>
                </button>
              ))}
            </Flex>
            )}
      </Content>
    </ContentLayout>
  )
}
