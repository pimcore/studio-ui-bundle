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
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { App } from 'antd'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { Text } from '@Pimcore/components/text/text'
import { Dropdown, type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { Spin } from '@Pimcore/components/spin/spin'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { Toolbar } from '@Pimcore/modules/classification-store-config/components/sidebar/components/toolbar/toolbar'
import {
  type ClassificationStoreConfigurationStoreTreeNode,
  useClassificationStoreConfigurationStoreCreateMutation,
  useClassificationStoreConfigurationStoreUpdateMutation
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { useStyles } from '@Pimcore/modules/classification-store-config/classification-store-config.styles'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

interface ISidebarProps {
  isLoading: boolean
  isFetching: boolean
  refetch: () => Promise<unknown>
  storeList: ClassificationStoreConfigurationStoreTreeNode[]
  activeStoreId: number | undefined
  handleOpenStore: (store: ClassificationStoreConfigurationStoreTreeNode) => void
}

export const Sidebar = ({
  isLoading,
  isFetching,
  refetch,
  storeList,
  activeStoreId,
  handleOpenStore
}: ISidebarProps): React.JSX.Element => {
  const [filteredList, setFilteredList] = useState<ClassificationStoreConfigurationStoreTreeNode[]>([])
  const [contextStore, setContextStore] = useState<ClassificationStoreConfigurationStoreTreeNode | null>(null)

  const { styles } = useStyles()
  const { t } = useTranslation()
  const { modal } = App.useApp()
  const [storeForm] = Form.useForm<{ name: string, description: string }>()

  const [createStore] = useClassificationStoreConfigurationStoreCreateMutation()
  const [updateStore] = useClassificationStoreConfigurationStoreUpdateMutation()

  useEffect(() => {
    setFilteredList(storeList)
  }, [storeList])

  const handleSearch = (value: string): void => {
    if (isEmptyValue(value)) {
      setFilteredList(storeList)
      return
    }
    setFilteredList(
      storeList.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
    )
  }

  const handleStoreAdd = (): void => {
    storeForm.setFieldsValue({
      name: '',
      description: ''
    })

    void modal.confirm({
      icon: null,
      title: t('classification-store.add-store'),
      content: (
        <Form
          form={ storeForm }
          layout="vertical"
        >
          <Form.Item
            label={ t('classification-store.columns.name') }
            name="name"
            rules={ [{ required: true, message: t('form.validation.required') }] }
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={ t('classification-store.columns.description') }
            name="description"
          >
            <Input />
          </Form.Item>
        </Form>
      ),
      onOk: async () => {
        const values = await storeForm.validateFields()
        const description = values.description.trim() === '' ? null : values.description

        const createResponse = await createStore({
          classificationStoreConfigurationStoreCreate: { name: values.name }
        })

        if ('error' in createResponse) {
          trackError(new ApiError(createResponse.error!))
          return
        }

        if (description !== null) {
          const updateResponse = await updateStore({
            id: createResponse.data.id,
            classificationStoreConfigurationStoreUpdate: {
              name: values.name,
              description
            }
          })

          if ('error' in updateResponse) {
            trackError(new ApiError(updateResponse.error!))
            return
          }
        }

        void refetch()
      }
    })
  }

  const handleStoreRename = (): void => {
    if (isNil(contextStore)) return

    storeForm.setFieldsValue({
      name: contextStore.name,
      description: contextStore.description ?? ''
    })

    void modal.confirm({
      icon: null,
      title: t('classification-store.rename-store'),
      content: (
        <Form
          form={ storeForm }
          layout="vertical"
        >
          <Form.Item
            label={ t('classification-store.columns.name') }
            name="name"
            rules={ [{ required: true, message: t('form.validation.required') }] }
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={ t('classification-store.columns.description') }
            name="description"
          >
            <Input />
          </Form.Item>
        </Form>
      ),
      onOk: async () => {
        const values = await storeForm.validateFields()

        if (isNil(contextStore)) return

        const response = await updateStore({
          id: contextStore.id,
          classificationStoreConfigurationStoreUpdate: {
            name: values.name,
            description: values.description.trim() === '' ? null : values.description
          }
        })

        if ('error' in response) {
          trackError(new ApiError(response.error!))
          return
        }

        void refetch()
      }
    })
  }

  const dropdownItems: DropdownProps['menu']['items'] = [
    {
      icon: <Icon value="edit" />,
      key: 'rename',
      label: t('rename'),
      onClick: handleStoreRename
    }
  ]
  // TODO: Re-introduce delete menu item when backend provides DELETE /classification-store/configuration/stores/{id}.

  const renderStoreList = (): React.JSX.Element => (
    <>
      {filteredList.map((item) => {
        const isActive = item.id === activeStoreId

        return (
          <Dropdown
            key={ item.id }
            menu={ { items: dropdownItems } }
            onOpenChange={ (open) => {
              if (open) setContextStore(item)
            } }
            trigger={ ['contextMenu'] }
          >
            <Flex
              align="center"
              className={ [
                styles.sidebarStoreItem,
                isActive ? styles.sidebarStoreItemActive : ''
              ].join(' ') }
              gap="mini"
              onClick={ () => { handleOpenStore(item) } }
            >
              <Icon
                className={ styles.sidebarStoreItemIcon }
                value="classification-store"
              />
              <Text className={ styles.sidebarStoreItemTitle }>
                {item.name}
              </Text>
            </Flex>
          </Dropdown>
        )
      })}
    </>
  )

  return (
    <ContentLayout renderToolbar={ (
      <Toolbar
        handleStoreAdd={ handleStoreAdd }
        isFetching={ isFetching }
        refetch={ refetch }
      />
    ) }
    >
      <Content
        loading={ isLoading }
        padded
      >
        <SearchInput
          onChange={ (e) => { handleSearch(e.target.value) } }
          placeholder={ t('search') }
          withoutAddon
        />

        <Flex
          className="h-full"
          gap="mini"
          justify={ isFetching ? 'center' : 'start' }
          vertical
        >
          {isFetching
            ? (
              <Flex
                align="center"
                justify="center"
              >
                <Spin
                  asContainer
                  tip="Loading"
                />
              </Flex>
              )
            : renderStoreList()}
        </Flex>
      </Content>
    </ContentLayout>
  )
}
