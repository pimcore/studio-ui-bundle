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
import { Select } from '@Pimcore/components/select/select'
import { Content } from '@Pimcore/components/content/content'
import { useRoleGetCollectionQuery } from '@Pimcore/modules/user/roles/roles-api-slice-enhanced'

interface RolesTabProps {
  roles: number[]
  onChange: (roles: number[]) => void
}

export const RolesTab = ({ roles, onChange }: RolesTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { data, isLoading } = useRoleGetCollectionQuery()

  const options = (data?.items ?? [])
    .map((role) => ({ value: role.id, label: role.name ?? String(role.id) }))
    .sort((a, b) => a.label.localeCompare(b.label))

  return (
    <Content padded>
      <Select
        loading={ isLoading }
        mode="multiple"
        onChange={ (value: number[]) => { onChange(value) } }
        options={ options }
        placeholder={ t('service-users.roles') }
        style={ { maxWidth: 480, width: '100%' } }
        value={ roles }
      />
    </Content>
  )
}
