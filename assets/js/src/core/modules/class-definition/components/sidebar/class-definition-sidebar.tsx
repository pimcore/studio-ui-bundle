/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useClassDefinitionCollectionQuery, useClassDefinitionDeleteMutation } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { ClassDefinitionModalNew } from '@Pimcore/modules/class-definition/components/sidebar/class-definition-modal-new'
import { type ClassDefinitionPartial, useClassDefinitionTabs } from '@Pimcore/modules/class-definition/components/tabs/class-definition-tabs/class-defintion-tabs-provider'
import { Content, ContentLayout, Icon, IconButton, IconTextButton, type ITreeElementProps, SearchInput, Toolbar, type TreeDataItem, TreeElement } from '@sdk/components'
import { ApiError, trackError } from '@sdk/modules/app'
import { useDebounce } from '@sdk/utils'
import { isNil } from 'lodash'
import React, { useMemo, useState } from 'react'

export const ClassDefinitionSidebar = (): React.JSX.Element => {
  const { isLoading, isFetching, data, refetch } = useClassDefinitionCollectionQuery()
  const [deleteClassDefinitionMutation] = useClassDefinitionDeleteMutation()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [showNewModal, setShowNewModal] = useState<boolean>(false)
  const { setActiveClassDefinition, activeClassDefinition, closeClassDefinition } = useClassDefinitionTabs()

  const treeData: ITreeElementProps['treeData'] = useMemo(() => {
    if (data === undefined) {
      return []
    }

    const formattedTreeData: ITreeElementProps['treeData'] = []

    const groupMap: Record<string, ITreeElementProps['treeData'][0]> = {}

    const filteredData = data.items.filter((classDef) => {
      if (debouncedSearchTerm === '') {
        return true
      }

      return classDef.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    })

    filteredData.forEach((classDef) => {
      const groupName = classDef.group

      if (isNil(groupName) || groupName === '') {
        formattedTreeData.push({
          title: classDef.name,
          key: `${classDef.id}`,
          icon: classDef.icon !== undefined ? <Icon { ...classDef.icon } /> : undefined,
          meta: { classDefinition: classDef },
          actions: [
            { key: 'delete', icon: 'delete' }
          ]
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
        title: classDef.name,
        key: `${classDef.id}`,
        icon: classDef.icon !== undefined ? <Icon { ...classDef.icon } /> : undefined,
        meta: { classDefinition: classDef },
        actions: [
          { key: 'delete', icon: 'delete' }
        ]
      }

      groupMap[groupName].children!.push(treeDataItem)
    })

    // @todo check sorting logic
    formattedTreeData.sort((a, b) => {
      if ((a.children?.length ?? 0) !== 0 && (b.children?.length ?? 0) === 0) {
        return 1
      }

      if ((a.children?.length ?? 0) === 0 && (b.children?.length ?? 0) !== 0) {
        return -1
      }

      return 0
    })

    return formattedTreeData
  }, [data, debouncedSearchTerm])

  const expandedKeys = useMemo(() => {
    return debouncedSearchTerm !== '' ? treeData.map(item => item.key) : []
  }, [treeData, debouncedSearchTerm])

  const deleteClassDefinition = (node: TreeDataItem): void => {
    const classDef = node.meta!.classDefinition! as ClassDefinitionPartial

    closeClassDefinition(classDef)
    deleteClassDefinitionMutation({ id: classDef.id }).catch((err: Error) => {
      trackError(new ApiError(err))
    })
  }

  // @todo Translations!!
  return (
    <>
      <ClassDefinitionModalNew
        onOpenChange={ setShowNewModal }
        open={ showNewModal }
      />

      <ContentLayout
        renderToolbar={
          <Toolbar>
            <IconButton
              icon={ { value: 'refresh' } }
              onClick={ refetch }
            />

            <IconTextButton
              icon={ { value: 'new' } }
              onClick={ () => {
                setShowNewModal(true)
              } }
              type="link"
            >
              New
            </IconTextButton>
          </Toolbar>
        }
      >
        <Content
          loading={ isLoading }
          padded
        >
          <SearchInput
            onChange={ (e) => { setSearchTerm(e.target.value) } }
            placeholder="Search"
            value={ searchTerm }
            withoutAddon
          />

          <Content loading={ isFetching }>
            <TreeElement
              defaultExpandedKeys={ expandedKeys }
              onActionsClick={ (key, action, node) => {
                if (action === 'delete') {
                  deleteClassDefinition(node)
                }
              } }
              onSelected={ (key, node) => {
                setActiveClassDefinition(node.meta!.classDefinition as ClassDefinitionPartial)
              } }
              selectedKeys={ activeClassDefinition !== undefined ? [activeClassDefinition.id] : undefined }
              treeData={ treeData }
            />
          </Content>
        </Content>
      </ContentLayout>
    </>
  )
}
