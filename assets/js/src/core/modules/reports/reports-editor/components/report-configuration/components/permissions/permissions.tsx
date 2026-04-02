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
import { isUndefined } from 'lodash'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { type IReportConfigurationSectionProps } from '@Pimcore/modules/reports/reports-editor/types'
import { useRoleGetShareCollectionQuery } from '@Pimcore/modules/user/roles/roles-api-slice-enhanced'
import { useUserGetShareCollectionQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'
import { UsersRolesDropdown } from '@Pimcore/components/users-roles-dropdown/users-roles-dropdown'
import { Switch } from '@Pimcore/components/switch/switch'
import { Form } from '@Pimcore/components/form/form'
import { TagList, type TagListProps } from '@Pimcore/components/tag-list/tag-list'
import type { TagProps } from '@Pimcore/components/tag/tag'
import { Text } from '@Pimcore/components/text/text'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyles } from '../../report-configuration.styles'

export const Permissions = ({ currentData, updateFormData }: IReportConfigurationSectionProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const { data: roleList } = useRoleGetShareCollectionQuery()
  const { data: userList } = useUserGetShareCollectionQuery()

  const [isSharedGlobally, setIsSharedGlobally] = useState(currentData.sharedGlobally)
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  const handleClose = (): void => { setIsOpenDropdown(false) }

  const initialUserList = useMemo(() => {
    return currentData.sharedUserNames
      .map(item => userList?.items?.find(user => user.username === item)?.id)
      .filter(id => !isUndefined(id))
  }, [currentData.sharedUserNames])

  const initialRoleList = useMemo(() => {
    return currentData.sharedRoleNames
      .map(item => roleList?.items?.find(role => role.name === item)?.id)
      .filter(id => !isUndefined(id))
  }, [currentData.sharedRoleNames])

  const handleApplyChanges = ({ sharedUsers, sharedRoles }: { sharedUsers: number[], sharedRoles: number[] }): void => {
    const updatedSharedUsers = sharedUsers
      .map(id => userList?.items?.find(user => user.id === id)?.username)
      .filter(name => !isUndefined(name))
    const updatedSharedRoles = sharedRoles
      .map(id => roleList?.items?.find(role => role.id === id)?.name)
      .filter(name => !isUndefined(name))

    updateFormData?.({
      ...currentData,
      sharedUserNames: updatedSharedUsers,
      sharedRoleNames: updatedSharedRoles
    })

    handleClose()
  }

  const renderIcon = (iconName: string, size?: number): React.JSX.Element => (
    <Icon
      className={ styles.permissionIcon }
      options={ { width: size ?? 12, height: size ?? 12 } }
      value={ iconName }
    />
  )

  const getSharedUsersRolesList = (): TagListProps['list'] => {
    const usersList: TagProps[] = []
    const rolesList: TagProps[] = []

    const getTagItem = ({ label, iconName }: { label?: string, iconName: string }): TagProps => ({
      children: (
        <Text
          ellipsis
          style={ { maxWidth: '148px' } }
          type="secondary"
        >{label}</Text>
      ),
      icon: renderIcon(iconName),
      bordered: false
    })

    currentData.sharedUserNames.forEach((item) => {
      usersList.push(getTagItem({ label: item, iconName: 'user' }))
    })

    currentData.sharedRoleNames.forEach((item) => {
      rolesList.push(getTagItem({ label: item, iconName: 'shield' }))
    })

    return [usersList, rolesList]
  }

  const renderRightLabelComponent = (): JSX.Element | string | undefined => {
    const renderGlobalView = (): React.JSX.Element => (
      <Text className={ styles.permissionLabel }>{t('common.globally')}</Text>
    )

    const renderUserView = (): React.JSX.Element => (
      <>
        <Flex gap={ 10 }>
          <Text className={ styles.permissionLabel }>
            {renderIcon('user')} {t('user-management.user')} | {renderIcon('shield')} {t('user-management.role')}
          </Text>
          <Flex
            align="center"
            className={ styles.permissionUpdateButton }
            gap={ 8 }
            onClick={ () => { setIsOpenDropdown(!isOpenDropdown) } }
          >
            {renderIcon('edit', 16)}
            <Text className={ styles.permissionUpdateButtonText }>{t('button.add-edit')}</Text>
          </Flex>
        </Flex>
        {isOpenDropdown && (
          <UsersRolesDropdown
            handleApplyChanges={ handleApplyChanges }
            handleClose={ handleClose }
            initialSharedRoles={ initialRoleList }
            initialSharedUsers={ initialUserList }
            placement="top"
            roleList={ roleList }
            userList={ userList }
          />
        )}
      </>
    )

    return isSharedGlobally ? renderGlobalView() : renderUserView()
  }

  return (
    <FormKit.Panel title={ t('reports.editor.permissions.title') }>
      <Form.Item name="sharedGlobally">
        <Switch
          labelLeft={ <Text>{t('grid.configuration.shared')}</Text> }
          labelRight={ renderRightLabelComponent() }
          onChange={ (checked) => { setIsSharedGlobally(checked) } }
        />
      </Form.Item>
      { !isSharedGlobally && (
        <TagList
          itemGap="mini"
          list={ getSharedUsersRolesList() }
          tagListItemClassNames={ styles.permissionTag }
        />
      )}
    </FormKit.Panel>
  )
}
