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
import { Input, Col, Row, Flex, Typography } from 'antd'
import { Form } from '@Pimcore/components/form/form'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { Switch } from '@Pimcore/components/switch/switch'
import { useTranslation } from 'react-i18next'
import { useUserDraft } from '@Pimcore/modules/user/hooks/use-user-draft'
import { useUserContext } from '@Pimcore/modules/user/hooks/use-user-context'
import { Content } from '@Pimcore/components/content/content'
import { useUserHelper } from '@Pimcore/modules/user/hooks/use-user-helper'
import { UserAvatar } from '@Pimcore/modules/user/management/detail/tabs/settings/components/user-avatar'
import { generatePassword, getGroupedPermissions } from '@Pimcore/modules/user/management/detail/tabs/settings/settings-helper'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { AdminAccordion } from '@Pimcore/modules/user/management/detail/tabs/settings/components/form/admin-accordion'
import { CustomisationAccordion } from '@Pimcore/modules/user/management/detail/tabs/settings/components/form/customisation-accordion'
import { PermissionsAccordion } from '@Pimcore/modules/user/management/detail/tabs/settings/components/form/permissions-accordion'
import { TypesAndClassesAccordion } from '@Pimcore/modules/user/management/detail/tabs/settings/components/form/types-classes-accordion'
import { EditorSettingsAccordion } from '@Pimcore/modules/user/management/detail/tabs/settings/components/form/editor-settings-accordion'
import { SharedTranslationSettingsAccordion } from '@Pimcore/modules/user/management/detail/tabs/settings/components/form/shared-translation-settings-accordion'

const SettingsContainer = ({ ...props }): React.JSX.Element => {
  const { validLanguages } = useSettings()
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { Text } = Typography
  const { id } = useUserContext()
  const { user, isLoading, changeUserInState } = useUserDraft(id)
  const { availablePermissions } = useUserHelper()
  const permissions = getGroupedPermissions(availablePermissions)

  useEffect(() => {
    if (!isLoading) {
      form.setFieldsValue({
        active: user?.active,
        admin: user?.admin,
        classes: user?.classes,
        name: user?.name,
        twoFactorAuthenticationEnabled: user?.twoFactorAuthenticationEnabled,
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        language: user?.language,
        welcomeScreen: user?.welcomeScreen,
        memorizeTabs: user?.memorizeTabs,
        allowDirtyClose: user?.allowDirtyClose,
        closeWarning: user?.closeWarning,
        permissionsDefault: Array.isArray(user?.permissions) ? user.permissions.filter((permission) => permissions.default.some((defaultPermission) => defaultPermission.key === permission)) : [],
        permissionsBundles: Array.isArray(user?.permissions) ? user.permissions.filter((permission) => permissions.bundles.some((defaultPermission) => defaultPermission.key === permission)) : []
      })
    }
  }, [user, isLoading])

  const onValuesChange = useCallback(
    debounce((changedValues, allValues) => {
      if (changedValues.permissionsDefault !== undefined || changedValues.permissionsBundles !== undefined) {
        allValues.permissions = [
          ...changedValues.permissionsDefault ?? allValues.permissionsDefault ?? [],
          ...changedValues.permissionsBundles ?? allValues.permissionsBundles ?? []
        ]
      }
      changeUserInState(allValues)
    }, 300),
    [changeUserInState]
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
        <Col span={ 8 }>
          <Accordion
            activeKey={ '1' }
            bordered
            items={ [
              {
                key: '1',
                title: <>{ t('user-management.general') }</>,
                info: 'ID: ' + id,
                children: <>
                  <Flex
                    align="center"
                    gap="small"
                  >
                    <Form.Item
                      name="active"
                    >
                      <Switch
                        labelRight={ t('user-management.active') }
                      />
                    </Form.Item>

                    { user?.lastLogin !== undefined && user?.lastLogin !== null
                      ? (
                        <Text disabled>{ t('user-management.last-login') }: { user.lastLogin }</Text>
                        )
                      : null}
                  </Flex>

                  <Form.Item
                    label={ t('user-management.name') }
                    name={ 'name' }
                  >
                    <Input disabled />
                  </Form.Item>

                  <Form.Item
                    label={ t('user-management.password') }
                    name={ 'password' }
                    rules={ [{ min: 10 }] }
                  >
                    <Input suffix={ <IconButton
                      icon={ { value: 'lightning-01' } }
                      onClick={ () => {
                        const newPassword = generatePassword()
                        form.setFieldValue('password', newPassword); changeUserInState({ password: newPassword })
                      } }
                      title={ t('user-management.generate-password') }
                                    /> }
                    />
                  </Form.Item>
                  <Form.Item name={ 'twoFactorAuthenticationEnabled' }>
                    <Switch labelRight={ t('user-management.two-factor-authentication') } />
                  </Form.Item>
                </>
              }
            ]
          }
            size={ 'small' }
          />
        </Col>
        <Col span={ 8 }>
          <UserAvatar id={ id } />
        </Col>
        <Col span={ 16 }>
          <CustomisationAccordion />
        </Col>
        <Col span={ 16 }>
          <AdminAccordion />
        </Col>
        <Col span={ 16 }>
          <PermissionsAccordion permissions={ permissions } />
        </Col>
        <Col span={ 16 }>
          <TypesAndClassesAccordion />
        </Col>
        <Col span={ 16 }>
          <EditorSettingsAccordion
            data={ user?.contentLanguages }
            editData={ user?.websiteTranslationLanguagesEdit }
            onChange={ (languages) => { changeUserInState({ contentLanguages: languages }) } }
            viewData={ user?.websiteTranslationLanguagesView }
          />
        </Col>
        <Col span={ 16 }>
          <SharedTranslationSettingsAccordion
            data={ validLanguages }
            editData={ user?.websiteTranslationLanguagesEdit }
            onChange={ (languages) => {
              changeUserInState({
                websiteTranslationLanguagesEdit: languages.filter((language) => language.edit).map((language) => language.abbreviation),
                websiteTranslationLanguagesView: languages.filter((language) => language.view).map((language) => language.abbreviation)
              })
            } }
            viewData={ user?.websiteTranslationLanguagesView }
          />
        </Col>
      </Row>
    </Form>
  )
}
export { SettingsContainer }
