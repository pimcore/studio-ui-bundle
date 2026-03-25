/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ConfigurationPartial, useItems } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { useStyles } from '@Pimcore/modules/field-definitions/components/editor/items/sidebar.styles'
import { AddModalProvider } from '@Pimcore/modules/field-definitions/components/editor/items/sidebar/add-modal'
import { SidebarModalHolder } from '@Pimcore/modules/field-definitions/components/editor/items/sidebar/modal-holder'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { Content, ContentLayout, Icon, IconButton, IconTextButton, type ITreeElementProps, SearchInput, Toolbar, type TreeDataItem, TreeElement } from '@sdk/components'
import { ApiError, trackError } from '@sdk/modules/app'
import { useDebounce } from '@sdk/utils'
import { isNil } from 'lodash'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type AnyMutationHook } from 'types/react-query'

// A stable no-op hook used when useItemsDeleteMutation is not provided
const useNoOpDeleteMutation: AnyMutationHook = () => [
  (async () => { }) as any,
  {} as any
]

export const ItemsSidebar = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { useItemsQuery, useItemsDeleteMutation, AddModal, hideTreeExpanders } = useSettings()
  const { isLoading, isFetching, data, refetch } = useItemsQuery()
  const deleteMutationHook = useItemsDeleteMutation ?? useNoOpDeleteMutation
  const [deleteConfigurationMutation] = deleteMutationHook()
  const canDelete = useItemsDeleteMutation !== undefined
  const canCreate = AddModal !== undefined

  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [showNewModal, setShowNewModal] = useState<boolean>(false)
  const { setActiveConfiguration, activeConfiguration, closeConfiguration } = useItems()

  const treeData: ITreeElementProps['treeData'] = useMemo(() => {
    if (data === undefined) {
      return []
    }

    const formattedTreeData: ITreeElementProps['treeData'] = []

    const groupMap: Record<string, ITreeElementProps['treeData'][0]> = {}

    const filteredData = data.items.filter((configuration) => {
      if (debouncedSearchTerm === '') {
        return true
      }

      return (configuration.name as string).toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || (configuration.id as string).toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    })

    filteredData.forEach((configuration) => {
      const groupName = configuration.group
      if (isNil(groupName) || groupName === '') {
        formattedTreeData.push({
          title: (configuration.name !== '' && configuration.name !== undefined && configuration.name !== configuration.id) ? `${configuration.name} (${configuration.id})` : `${configuration.id}`,
          key: `${configuration.id}`,
          icon: configuration.icon !== undefined ? <Icon { ...configuration.icon } /> : undefined,
          meta: { configuration },
          actions: canDelete
            ? [
                { key: 'delete', icon: 'delete' }
              ]
            : []
        })
        return
      }

      if (groupMap[groupName] === undefined) {
        groupMap[groupName] = {
          title: groupName,
          key: `group-${groupName}`,
          icon: <Icon value="folder" />,
          children: []
        }
        formattedTreeData.push(groupMap[groupName])
      }

      const treeDataItem: TreeDataItem = {
        title: (configuration.name !== '' && configuration.name !== undefined && configuration.name !== configuration.id) ? `${configuration.name} (${configuration.id})` : `${configuration.id}`,
        key: `${configuration.id}`,
        icon: configuration.icon !== undefined ? <Icon { ...configuration.icon } /> : <Icon value='class' />,
        meta: { configuration },
        actions: canDelete
          ? [
              { key: 'delete', icon: 'delete' }
            ]
          : []
      }

      groupMap[groupName].children!.push(treeDataItem)
    })

    formattedTreeData.sort((a, b) => {
      if ((a.children?.length ?? 0) !== 0 && (b.children?.length ?? 0) === 0) {
        return -1
      }

      if ((a.children?.length ?? 0) === 0 && (b.children?.length ?? 0) !== 0) {
        return 1
      }

      return 0
    })

    return formattedTreeData
  }, [data, debouncedSearchTerm])

  const expandedKeys = useMemo(() => {
    return debouncedSearchTerm !== '' ? treeData.map(item => item.key) : []
  }, [treeData, debouncedSearchTerm])

  const deleteConfiguration = (node: TreeDataItem): void => {
    const configuration = node.meta!.configuration! as ConfigurationPartial

    closeConfiguration(configuration)
    deleteConfigurationMutation({ id: configuration.id }).catch((err: Error) => {
      trackError(new ApiError(err))
    })
  }

  return (
    <AddModalProvider
      onOpenChange={ setShowNewModal }
      open={ showNewModal }
    >
      <SidebarModalHolder />

      <ContentLayout
        renderToolbar={
          <Toolbar>
            <IconButton
              icon={ { value: 'refresh' } }
              onClick={ refetch }
            />

            { canCreate && (
              <IconTextButton
                icon={ { value: 'new' } }
                onClick={ () => {
                  setShowNewModal(true)
                } }
                type="link"
              >
                {t('new')}
              </IconTextButton>
            ) }
          </Toolbar>
        }
      >
        <Content
          loading={ isLoading }
          padded
        >
          <SearchInput
            onChange={ (e) => { setSearchTerm(e.target.value) } }
            placeholder={ t('search') }
            value={ searchTerm }
            withoutAddon
          />

          <Content loading={ isFetching }>
            <TreeElement
              className={ styles.tree }
              defaultExpandedKeys={ expandedKeys }
              hideExpanders={ hideTreeExpanders }
              onActionsClick={ (key, action, node) => {
                if (action === 'delete') {
                  deleteConfiguration(node)
                }
              } }
              onSelected={ (key, node) => {
                setActiveConfiguration(node.meta!.configuration as ConfigurationPartial)
              } }
              selectedKeys={ activeConfiguration !== undefined ? [activeConfiguration.id] : undefined }
              treeData={ treeData }
            />
          </Content>
        </Content>
      </ContentLayout>
    </AddModalProvider>
  )
}
