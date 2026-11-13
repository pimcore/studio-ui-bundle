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
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Input } from '@Pimcore/components/input/input'
import { Content } from '@Pimcore/components/content/content'
import { UsersRolesDropdown } from '@Pimcore/components/users-roles-dropdown/users-roles-dropdown'
import { useUserGetShareCollectionQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'
import { useRoleGetShareCollectionQuery } from '@Pimcore/modules/user/roles/roles-api-slice-enhanced'
import { type ServiceUser } from '../../service-users-api-slice-enhanced'
import { CredentialsSection } from '../../credentials/credentials-section'
import { type ServiceUserDraft } from '../service-user-draft'

interface SettingsTabProps {
  serviceUser: ServiceUser
  draft: Pick<ServiceUserDraft, 'email' | 'responsibleUsers' | 'responsibleRoles'>
  onChange: (change: Partial<ServiceUserDraft>) => void
}

export const SettingsTab = ({ serviceUser, draft, onChange }: SettingsTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { data: userList } = useUserGetShareCollectionQuery()
  const { data: roleList } = useRoleGetShareCollectionQuery()

  return (
    <Content padded>
      <Flex
        gap="normal"
        style={ { maxWidth: 480 } }
        vertical
      >
        <Flex
          gap="mini"
          vertical
        >
          <Text strong>{t('service-users.field.name')}</Text>
          <Input
            placeholder={ t('service-users.field.name') }
            readOnly
            value={ serviceUser.name }
          />
          <Text type="secondary">{t('service-users.field.name.fixed')}</Text>
        </Flex>
        <Flex
          gap="mini"
          vertical
        >
          <Text strong>{t('service-users.field.email')}</Text>
          <Input
            onChange={ (event) => { onChange({ email: event.target.value === '' ? null : event.target.value }) } }
            placeholder={ t('service-users.field.email') }
            type="email"
            value={ draft.email ?? '' }
          />
        </Flex>
        <Flex
          gap="mini"
          vertical
        >
          <Text strong>{t('service-users.field.responsible-users')}</Text>
          <UsersRolesDropdown
            includeCurrentUser
            initialSharedRoles={ draft.responsibleRoles }
            initialSharedUsers={ draft.responsibleUsers }
            onChange={ ({ sharedUsers, sharedRoles }) => {
              onChange({ responsibleUsers: sharedUsers, responsibleRoles: sharedRoles })
            } }
            roleList={ roleList }
            userList={ userList }
          />
          <Text type="secondary">{t('service-users.field.responsible-users.help')}</Text>
        </Flex>
        <CredentialsSection serviceUser={ serviceUser } />
      </Flex>
    </Content>
  )
}
