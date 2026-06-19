/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Col, Flex, Input, Row } from 'antd'
import { isEmpty, isString, isUndefined } from 'lodash'
import { Form } from '@Pimcore/components/form/form'
import { Switch } from '@Pimcore/components/switch/switch'
import { Text } from '@Pimcore/components/text/text'
import { Icon } from '@Pimcore/components/icon/icon'
import { Button } from '@Pimcore/components/button/button'
import { Space } from '@Pimcore/components/space/space'
import { Header } from '@Pimcore/components/header/header'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { UsersRolesDropdown } from '@Pimcore/components/users-roles-dropdown/users-roles-dropdown'
import { TagList, type TagListProps } from '@Pimcore/components/tag-list/tag-list'
import { type TagProps } from '@Pimcore/components/tag/tag'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useSavedSearchSaveConfigurationMutation } from '@Pimcore/modules/search/search-api-slice-enhanced'
import { type SavedSearchSaveConfigurationApiArg } from '@Pimcore/modules/search/search-api-slice.gen'
import { useUserGetShareCollectionQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'
import { useRoleGetShareCollectionQuery } from '@Pimcore/modules/user/roles/roles-api-slice-enhanced'
import { useStyles } from './saved-search-panel.styles'

interface SavedSearchFormValues {
  name: string
  description?: string
  createMenuShortcut?: boolean
  shareGlobally?: boolean
}

const defaultValues: SavedSearchFormValues = {
  name: '',
  description: '',
  createMenuShortcut: false,
  shareGlobally: true
}

export const SavedSearchPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const user = useUser()
  const [form] = Form.useForm()

  const { useDataQueryHelper } = useSettings()
  const { getArgs } = useDataQueryHelper()
  const message = useMessage()

  const { data: userList } = useUserGetShareCollectionQuery()
  const { data: roleList } = useRoleGetShareCollectionQuery()

  const [saveConfiguration, { isLoading, isError, error }] = useSavedSearchSaveConfigurationMutation()

  const [isSharedGlobally, setIsSharedGlobally] = useState(defaultValues.shareGlobally ?? true)
  const [sharedUsers, setSharedUsers] = useState<number[]>([])
  const [sharedRoles, setSharedRoles] = useState<number[]>([])
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError])

  const handleFormValuesChange = (changedValues: Partial<SavedSearchFormValues>): void => {
    if (changedValues.shareGlobally !== undefined) {
      setIsSharedGlobally(changedValues.shareGlobally)
    }
  }

  const handleClose = (): void => { setIsOpenDropdown(false) }

  const handleUsersRolesChange = (changes: { sharedUsers: number[], sharedRoles: number[] }): void => {
    setSharedUsers(changes.sharedUsers)
    setSharedRoles(changes.sharedRoles)
  }

  const onFinish = (values: SavedSearchFormValues): void => {
    // Decorated getArgs() already holds the same columns + filters the search request sends.
    const args = getArgs()

    const body: SavedSearchSaveConfigurationApiArg['body'] = {
      name: values.name,
      description: values.description,
      createMenuShortcut: values.createMenuShortcut ?? false,
      shareGlobal: isSharedGlobally,
      sharedUsers: isSharedGlobally ? [] : sharedUsers,
      sharedRoles: isSharedGlobally ? [] : sharedRoles,
      classId: isString(args.classId) ? args.classId : undefined,
      columns: args.body.columns,
      filters: args.body.filters
    }

    saveConfiguration({ body }).then((response) => {
      if ('data' in response && !isUndefined(response.data)) {
        message.success(t('saved-search.save.success'))
        form.resetFields()
        setIsSharedGlobally(defaultValues.shareGlobally ?? true)
        setSharedUsers([])
        setSharedRoles([])
      }
    }).catch(() => { /* error surfaced via the mutation error state */ })
  }

  const renderIcon = (iconName: string, size?: number): React.JSX.Element => (
    <Icon
      className={ styles.icon }
      options={ { width: size ?? 12, height: size ?? 12 } }
      value={ iconName }
    />
  )

  const renderRightLabelComponent = (): React.JSX.Element => {
    if (isSharedGlobally) {
      return <Text className={ styles.label }>{t('common.globally')}</Text>
    }

    return (
      <>
        <Flex gap={ 10 }>
          <Text className={ styles.label }>
            {renderIcon('user')} {t('user-management.user')} | {renderIcon('shield')} {t('user-management.role')}
          </Text>
          <Flex
            align="center"
            className={ styles.editButton }
            gap={ 8 }
            onClick={ () => { setIsOpenDropdown(!isOpenDropdown) } }
          >
            {renderIcon('edit', 16)}
            <Text className={ styles.editButtonText }>{t('button.add-edit')}</Text>
          </Flex>
        </Flex>
        {isOpenDropdown && (
          <UsersRolesDropdown
            initialSharedRoles={ sharedRoles }
            initialSharedUsers={ sharedUsers }
            onChange={ handleUsersRolesChange }
            onClose={ handleClose }
            renderAsPopup
            roleList={ roleList }
            userList={ userList }
          />
        )}
      </>
    )
  }

  const getSharedUsersRolesList = (): TagListProps['list'] => {
    const usersTagList: TagProps[] = []
    const rolesTagList: TagProps[] = []

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

    userList?.items.forEach((item) => {
      if (sharedUsers.includes(item.id)) {
        usersTagList.push(getTagItem({ label: item?.username, iconName: 'user' }))
      }
    })

    roleList?.items.forEach((item) => {
      if (sharedRoles.includes(item.id)) {
        rolesTagList.push(getTagItem({ label: item?.name, iconName: 'shield' }))
      }
    })

    return [usersTagList, rolesTagList]
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          <div />
          <Button
            data-testid='saved-search-save-button'
            loading={ isLoading }
            onClick={ () => { form?.submit() } }
            type='primary'
          >
            { t('saved-search.save-as-new') }
          </Button>
        </Toolbar>
      }
    >
      <Content padded>
        <Flex
          gap='small'
          vertical
        >
          <Header title={ t('saved-search.title') } />

          <Row>
            <Col span={ 24 }>
              <Text>{t('common.owner')}:</Text> <Text type='secondary'>{user?.username}</Text>
            </Col>
          </Row>

          <Form
            form={ form }
            initialValues={ defaultValues }
            layout="vertical"
            onFinish={ onFinish }
            onValuesChange={ handleFormValuesChange }
          >
            <Form.Item
              label={ t('user-management.name') }
              name="name"
              rules={ [{ required: true, message: t('form.validation.provide-name') }] }
            >
              <Input data-testid='saved-search-name-input' />
            </Form.Item>

            <Form.Item
              label={ t('description') }
              name="description"
            >
              <Input.TextArea data-testid='saved-search-description-input' />
            </Form.Item>

            <Form.Item
              name="createMenuShortcut"
              valuePropName='checked'
            >
              <Switch labelRight={ <Text>{t('saved-search.create-menu-shortcut')}</Text> } />
            </Form.Item>

            <Flex
              align='center'
              gap='mini'
            >
              <Form.Item
                name="shareGlobally"
                valuePropName='checked'
              >
                <Switch
                  labelLeft={ <Text>{t('grid.configuration.shared')}</Text> }
                  labelRight={ renderRightLabelComponent() }
                />
              </Form.Item>
            </Flex>

            { !isSharedGlobally && !isEmpty(getSharedUsersRolesList().flat()) && (
              <TagList
                itemGap="mini"
                list={ getSharedUsersRolesList() }
                tagListItemClassNames={ styles.tag }
              />
            )}
          </Form>
        </Flex>
      </Content>
    </ContentLayout>
  )
}
