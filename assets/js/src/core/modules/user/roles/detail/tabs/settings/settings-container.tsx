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

import { debounce } from 'lodash'
import React, { useCallback, useEffect } from 'react'
import { Form, Col, Row } from 'antd'
import { useRoleContext } from '@Pimcore/modules/user/roles/hooks/use-role-context'
import { Content } from '@Pimcore/components/content/content'
import { GeneralAccordion } from '@Pimcore/modules/user/roles/detail/tabs/settings/components/form/general-accordion'
import { PermissionsAccordion } from '@Pimcore/modules/user/management/detail/tabs/settings/components/form/permissions-accordion'
import { TypesAndClassesAccordion } from '@Pimcore/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion'
import { SharedTranslationSettingsAccordion } from '@Pimcore/modules/user/management/detail/tabs/settings/components/form/shared-translation-settings-accordion'
import { getGroupedPermissions } from '@Pimcore/modules/user/management/detail/tabs/settings/settings-helper'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useRoleDraft } from '@Pimcore/modules/user/roles/hooks/use-roles-draft'

const SettingsContainer = ({ ...props }): React.JSX.Element => {
  const { validLanguages } = useSettings()
  const [form] = Form.useForm()
  const { id } = useRoleContext()
  const { role, isLoading, changeRoleInState } = useRoleDraft(id)
  const permissions = getGroupedPermissions(role?.permissions as [] ?? [])

  useEffect(() => {
    if (!isLoading) {
      form.setFieldsValue({
        name: role?.name
      })
    }
  }, [role, isLoading])

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
  if (isLoading) {
    return <Content loading></Content>
  }

  return (
    <Form
      form={ form }
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
