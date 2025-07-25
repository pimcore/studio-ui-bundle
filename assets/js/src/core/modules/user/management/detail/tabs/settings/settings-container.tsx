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
import React, { useCallback, useEffect } from 'react'
import { Input, Col, Row, Flex, Typography } from 'antd'
import { Form } from '@Pimcore/components/form/form'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { Switch } from '@Pimcore/components/switch/switch'
import { useTranslation } from 'react-i18next'
import { useUserManagementDraft } from '@Pimcore/modules/user/hooks/use-user-management-draft'
import { useUserManagementContext } from '@Pimcore/modules/user/hooks/use-user-management-context'
import { Content } from '@Pimcore/components/content/content'
import { useUserManagementHelper } from '@Pimcore/modules/user/hooks/use-user-management-helper'
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
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'

const SettingsContainer = ({ ...props }): React.JSX.Element => {
  const { validLanguages } = useSettings()
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { Text } = Typography
  const { id } = useUserManagementContext()
  const user = useUser()
  const { user: openedUser, isLoading, changeUserInState } = useUserManagementDraft(id)
  const { getAvailablePermissions } = useUserManagementHelper()
  const permissions = getGroupedPermissions(getAvailablePermissions())

  useEffect(() => {
    if (!isLoading) {
      form.setFieldsValue({
        active: openedUser?.active,
        admin: openedUser?.admin,
        classes: openedUser?.classes,
        name: openedUser?.name,
        twoFactorAuthenticationEnabled: openedUser?.twoFactorAuthenticationEnabled,
        firstname: openedUser?.firstname,
        lastname: openedUser?.lastname,
        email: openedUser?.email,
        language: openedUser?.language,
        welcomeScreen: openedUser?.welcomeScreen,
        memorizeTabs: openedUser?.memorizeTabs,
        allowDirtyClose: openedUser?.allowDirtyClose,
        closeWarning: openedUser?.closeWarning,
        roles: openedUser?.roles ?? [],
        permissionsDefault: Array.isArray(openedUser?.permissions) ? openedUser.permissions.filter((permission) => permissions.default.some((defaultPermission) => defaultPermission.key === permission)) : [],
        permissionsBundles: Array.isArray(openedUser?.permissions) ? openedUser.permissions.filter((permission) => permissions.bundles.some((defaultPermission) => defaultPermission.key === permission)) : []
      })
    }
  }, [openedUser, isLoading])

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
                      className={ 'm-b-none' }
                      name="active"
                    >
                      <Switch
                        disabled={ user?.id === openedUser?.id }
                        labelRight={ t('user-management.active') }
                      />
                    </Form.Item>

                    { openedUser?.lastLogin !== undefined && openedUser?.lastLogin !== null
                      ? (
                        <Text disabled>{ t('user-management.last-login') }: { openedUser.lastLogin }</Text>
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
                      icon={ { value: 'locked' } }
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
          <UserAvatar user={ openedUser } />
        </Col>
        <Col span={ 16 }>
          <CustomisationAccordion isAdmin={ openedUser?.admin } />
        </Col>
        <Col span={ 16 }>
          <AdminAccordion isDisabled={ user?.id === openedUser?.id } />
        </Col>

        {openedUser?.admin === false
          ? (
            <>
              <Col span={ 16 }>
                <PermissionsAccordion permissions={ permissions } />
              </Col>
              <Col span={ 16 }>
                <TypesAndClassesAccordion />
              </Col>
            </>
            )
          : null}

        <Col span={ 16 }>
          <EditorSettingsAccordion
            data={ openedUser?.contentLanguages }
            editData={ openedUser?.websiteTranslationLanguagesEdit }
            onChange={ (languages) => { changeUserInState({ contentLanguages: languages }) } }
            viewData={ openedUser?.websiteTranslationLanguagesView }
          />
        </Col>

        {openedUser?.admin === false
          ? (
            <Col span={ 16 }>
              <SharedTranslationSettingsAccordion
                data={ validLanguages }
                editData={ openedUser?.websiteTranslationLanguagesEdit }
                onChange={ (languages) => {
                  changeUserInState({
                    websiteTranslationLanguagesEdit: languages.filter((language) => language.edit).map((language) => language.abbreviation),
                    websiteTranslationLanguagesView: languages.filter((language) => language.view).map((language) => language.abbreviation)
                  })
                } }
                viewData={ openedUser?.websiteTranslationLanguagesView }
              />
            </Col>
            )
          : null }
      </Row>
    </Form>
  )
}
export { SettingsContainer }
