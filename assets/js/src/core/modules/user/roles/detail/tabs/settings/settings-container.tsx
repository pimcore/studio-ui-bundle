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
  const { item, isLoading, changeItemInState } = useRoleDraft(id)
  // todo no api in roles for available permissions
  const permissions = getGroupedPermissions([
    {
      key: 'workflow_details',
      category: '',
      additionalAttributes: []
    },
    {
      key: 'recyclebin',
      category: '',
      additionalAttributes: []
    },
    {
      key: 'quantityValueUnits',
      category: '',
      additionalAttributes: []
    }, {
      key: 'plugin_datahub_config',
      category: 'Datahub',
      additionalAttributes: []
    }
  ])

  useEffect(() => {
    if (!isLoading) {
      form.setFieldsValue({
        name: item?.name
      })
    }
  }, [item, isLoading])

  const onValuesChange = useCallback(
    debounce((changedValues, allValues) => {
      if (changedValues.permissionsDefault !== undefined || changedValues.permissionsBundles !== undefined) {
        allValues.permissions = [
          ...changedValues.permissionsDefault ?? allValues.permissionsDefault ?? [],
          ...changedValues.permissionsBundles ?? allValues.permissionsBundles ?? []
        ]
      }
      changeItemInState(allValues)
    }, 300),
    [changeItemInState]
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
          TODO
          <GeneralAccordion />
        </Col>
        <Col span={ 16 }>
          TODO
          <PermissionsAccordion permissions={ permissions } />
        </Col>
        <Col span={ 16 }>
          <TypesAndClassesAccordion />
        </Col>
        <Col span={ 16 }>
          <SharedTranslationSettingsAccordion
            data={ validLanguages }
            editData={ item?.websiteTranslationLanguagesEdit }
            onChange={ (languages) => {
              changeItemInState({
                websiteTranslationLanguagesEdit: languages.filter((language) => language.edit).map((language) => language.abbreviation),
                websiteTranslationLanguagesView: languages.filter((language) => language.view).map((language) => language.abbreviation)
              })
            } }
            viewData={ item?.websiteTranslationLanguagesView }
          />
        </Col>
      </Row>
    </Form>
  )
}
export { SettingsContainer }
