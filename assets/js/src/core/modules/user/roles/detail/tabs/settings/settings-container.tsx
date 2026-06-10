/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { debounce } from 'lodash'
import React, { useCallback } from 'react'
import { Col, Row } from 'antd'
import { Form } from '@Pimcore/components/form/form'
import { useRoleContext } from '@Pimcore/modules/user/roles/hooks/use-role-context'
import { Content } from '@Pimcore/components/content/content'
import { GeneralAccordion } from '@Pimcore/modules/user/roles/detail/tabs/settings/components/form/general-accordion'
import { PermissionsAccordion } from '@Pimcore/modules/user/management/detail/tabs/settings/components/form/permissions-accordion'
import { TypesAndClassesAccordion } from '@Pimcore/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion'
import { SharedTranslationSettingsAccordion } from '@Pimcore/modules/user/management/detail/tabs/settings/components/form/shared-translation-settings-accordion'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useRoleDraft } from '@Pimcore/modules/user/roles/hooks/use-roles-draft'
import { getGroupedPermissions } from '@Pimcore/modules/user/management/detail/tabs/settings/settings-helper'
import { useUserGetAvailablePermissionsQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'
import { usePerspectiveGetConfigCollectionQuery } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'

const SettingsContainer = ({ ...props }): React.JSX.Element => {
  const { validLanguages } = useSettings()
  const [form] = Form.useForm()
  const { id } = useRoleContext()
  const { role, isLoading, changeRoleInState } = useRoleDraft(id)
  const { data: availablePermissionsData, isLoading: permissionsLoading } = useUserGetAvailablePermissionsQuery()
  const { isLoading: perspectivesLoading } = usePerspectiveGetConfigCollectionQuery()
  const permissions = getGroupedPermissions(availablePermissionsData?.items ?? [])

  const buildFormValues = (): object => ({
    name: role?.name,
    classes: role?.classes ?? [],
    docTypes: role?.docTypes,
    perspectives: (role?.perspectives as unknown as string[]) ?? [],
    permissionsDefault: Array.isArray(role?.permissions) ? role.permissions.filter((permission) => permissions.default.some((defaultPermission) => defaultPermission.key === permission)) : [],
    permissionsBundles: Array.isArray(role?.permissions) ? role.permissions.filter((permission) => permissions.bundles.some((defaultPermission) => defaultPermission.key === permission)) : []
  })

  const onValuesChange = useCallback(
    debounce((changedValues, allValues) => {
      const updatedValues = { ...allValues }
      if (changedValues.permissionsDefault !== undefined || changedValues.permissionsBundles !== undefined) {
        updatedValues.permissions = [
          ...changedValues.permissionsDefault ?? allValues.permissionsDefault ?? [],
          ...changedValues.permissionsBundles ?? allValues.permissionsBundles ?? []
        ]
      }
      changeRoleInState(updatedValues)
    }, 300),
    [changeRoleInState]
  )

  if (isLoading || permissionsLoading || perspectivesLoading) {
    return <Content loading></Content>
  }

  return (
    <Form
      form={ form }
      initialValues={ buildFormValues() }
      layout="vertical"
      onValuesChange={ onValuesChange }
    >
      <Row gutter={ [10, 10] }>
        <Col span={ 16 }>
          <GeneralAccordion />
        </Col>
        <Col span={ 16 }>
          <PermissionsAccordion permissions={ permissions } />
        </Col>
        <Col span={ 16 }>
          <TypesAndClassesAccordion />
        </Col>
        <Col span={ 16 }>
          <SharedTranslationSettingsAccordion
            data={ validLanguages }
            editData={ role?.websiteTranslationLanguagesEdit }
            onChange={ (languages) => {
              changeRoleInState({
                websiteTranslationLanguagesEdit: languages.filter((language) => language.edit).map((language) => language.abbreviation),
                websiteTranslationLanguagesView: languages.filter((language) => language.view).map((language) => language.abbreviation)
              })
            } }
            viewData={ role?.websiteTranslationLanguagesView }
          />
        </Col>
      </Row>
    </Form>
  )
}
export { SettingsContainer }
