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
import { Form, Input, Col, Row, Flex, Typography } from 'antd'
import { Select } from '@Pimcore/components/select/select'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { Switch } from '@Pimcore/components/switch/switch'
import { useTranslation } from 'react-i18next'
import { useUserDraft } from '@Pimcore/modules/user/hooks/use-user-draft'
import { useUserContext } from '@Pimcore/modules/user/hooks/use-user-context'
import { Content } from '@Pimcore/components/content/content'
import { useUserHelper } from '@Pimcore/modules/user/hooks/use-user-helper'
import { LanguageTable } from '@Pimcore/modules/user/management/detail/tabs/settings/components/table/language-table'
import { UserAvatar } from '@Pimcore/modules/user/management/detail/tabs/settings/components/user-avatar'
import { generatePassword, getGroupedPermissions } from '@Pimcore/modules/user/management/detail/tabs/settings/settings-helper'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { AdminAccordion } from '@Pimcore/modules/user/management/detail/tabs/settings/components/form/admin-accordion'

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
        name: user?.name,
        twoFactorAuthenticationEnabled: user?.twoFactorAuthenticationEnabled,
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
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
  const renderInputFields = (fields: any[]): React.ReactNode[] => fields.map((field) => (
    <Form.Item
      key={ field.name }
      label={ field.component === 'input' ? t(`user-management.${field.name}`) : '' }
      name={ field.name }
      rules={ field.rules ?? [] }
    >
      {field.component === 'input'
        ? (
          <Input
            disabled={ field.disabled ?? false }
            suffix={ field.suffix ?? '' }
            type={ field?.type ?? '' }
          />
          )
        : <Switch labelRight={ t(`user-management.${field.name}`) } />}
    </Form.Item>
  ))

  const generalFields = [{ name: 'name', component: 'input', disabled: true },
    {
      name: 'password',
      component: 'input',
      type: 'text',
      rules: [{ min: 10 }],
      suffix: <IconButton
        icon={ 'lightning-01' }
        onClick={ () => {
          const newPassword = generatePassword()
          form.setFieldValue('password', newPassword); changeUserInState({ password: newPassword })
        } }
        title={ t('user-management.generate-password') }
              />
    },
    { name: 'twoFactorAuthenticationEnabled', component: 'switch' }]

  const generalAccordion = [
    {
      key: '1',
      title: <>{ t('user-management.general') }</>,
      info: 'ID: ' + id,
      children: <>
        <Form.Item
          name="active"
        >
          <Flex
            align="center"
            gap="small"
          >
            <Switch
              labelRight={ t('user-management.active') }
            />
            { user?.lastLogin !== undefined && user?.lastLogin !== null
              ? (
                <Text disabled>{ t('user-management.last-login') }: { user.lastLogin }</Text>
                )
              : null}
          </Flex>
        </Form.Item>

        {renderInputFields(generalFields)}
      </>
    }
  ]
  const cutomisastionFields = [{ name: 'firstname', component: 'input' }, { name: 'lastname', component: 'input' }, { name: 'email', component: 'input' }, { name: 'welcomeScreen', component: 'switch' }, { name: 'memorizeTabs', component: 'switch' }, { name: 'allowDirtyClose', component: 'switch' }, { name: 'closeWarning', component: 'switch' }]
  const customisationAccordion = [
    {
      key: '1',
      title: <>{ t('user-management.customisation') }</>,
      children: renderInputFields(cutomisastionFields)
    }
  ]
  const permissionsAccordion = [
    {
      key: '1',
      title: <>{ t('user-management.permissions.default') }</>,
      children: (
        <>
          <Form.Item
            name="permissionsDefault"
          >
            <Select
              mode="multiple"
              options={ permissions.default.map((permission) => ({
                value: permission.key,
                label: t(`user-management.permissions.${permission.key}`)
              })) }
              placeholder={ t('user-management.permissions.default') }
            ></Select>
          </Form.Item>
          <Form.Item
            name="permissionsBundles"
          >
            <Select
              mode="multiple"
              options={ permissions.bundles.map((permission) => ({
                value: permission.key,
                label: t(`user-management.permissions.${permission.key}`)
              })) }
              placeholder={ t('user-management.permissions.bundles') }
            ></Select>
          </Form.Item>
        </>
      )
    }
  ]
  const typesAndClassesAccordion = [
    {
      key: '1',
      title: <>{ t('user-management.types-and-classes') }</>,
      children: (
        <Form.Item
          name="classes"
        >
          <Select
            mode="multiple"
            options={ [] }
            placeholder={ t('user-management.classes') }
          ></Select>
        </Form.Item>
      )
    }
  ]
  const editorSettingsAccordion = [
    {
      key: '1',
      title: <>{ t('user-management.editor-settings') }</>,
      children: (
        <LanguageTable
          data={ user?.contentLanguages as any[] }
          onChangeOrder={ (languages) => { changeUserInState({ contentLanguages: languages }) } }
        />
      )
    }
  ]
  const sharedTranslationSettingsAccordion = [
    {
      key: '1',
      title: <>{ t('user-management.shared-translation-settings') }</>,
      children: (
        <LanguageTable
          data={ validLanguages as any[] }
          onChange={ (languages) => {
            changeUserInState({
              websiteTranslationLanguagesEdit: languages.filter((language) => language.edit).map((language) => language.abbreviation),
              websiteTranslationLanguagesView: languages.filter((language) => language.view).map((language) => language.abbreviation)
            })
          } }
        />
      )
    }
  ]
  const AccordionItem = (items): React.JSX.Element => {
    return (
      <Accordion
        activeKey={ '1' }
        bordered
        items={ items }
        size={ 'small' }
      />
    )
  }

  return (
    <Form
      form={ form }
      layout="vertical"
      onValuesChange={ onValuesChange }
    >
      <Row gutter={ [10, 10] }>
        <Col span={ 8 }>
          {AccordionItem(generalAccordion)}
        </Col>
        <Col span={ 8 }>
          <UserAvatar />
        </Col>
        <Col span={ 16 }>
          {AccordionItem(customisationAccordion)}
        </Col>
        <Col span={ 16 }>
          <AdminAccordion />
        </Col>
        <Col span={ 16 }>
          {AccordionItem(permissionsAccordion)}
        </Col>
        <Col span={ 16 }>
          {AccordionItem(typesAndClassesAccordion)}
        </Col>
        <Col span={ 16 }>
          <Accordion
            activeKey={ '1' }
            bordered
            items={ editorSettingsAccordion }
            size={ 'small' }
            table
          />
        </Col>
        <Col span={ 16 }>
          <Accordion
            activeKey={ '1' }
            bordered
            items={ sharedTranslationSettingsAccordion }
            size={ 'small' }
            table
          />
        </Col>
      </Row>
    </Form>
  )
}
export { SettingsContainer }
