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

import React, { useEffect, useState } from 'react'
import { TreeElement } from '@Pimcore/components/tree-element/tree-element'
import {
  createTreeStructure
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/tags-tree/create-tree-structure'
import type { Tag } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { Title } from '@Pimcore/components/title/title'
import { useTagConfig } from '@Pimcore/modules/tags/hooks/use-tag-config'
import { t } from 'i18next'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import {
  api
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { Content } from '@Pimcore/components/content/content'

export type Mode = 'create' | 'update'

export interface TreeAction {
  key: string
  icon: string
}

const TagConfigurationContainer = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const {
    tags,
    tagsFetching,
    tagsLoading,
    rootTagFolder,
    getTag,
    tagDeletion,
    setTagFilter,
    handleTagUpdate,
    handleTagCreation
  } = useTagConfig()
  const { confirm, input } = useFormModal()

  const [loadingTagKey, setLoadingTagKey] = useState<string | undefined>('')
  const [expandedKeys, setExpandedKeys] = React.useState<any[]>([0])

  useEffect(() => {
    (tagsFetching && loadingTagKey === undefined)
      ? showRootLoading()
      : hideRootLoading()
  }, [tagsFetching])

  const tagActions: TreeAction[] =
        [{ key: 'add-tag', icon: 'new' },
          { key: 'rename-tag', icon: 'edit' },
          { key: 'delete-tag', icon: 'trash' }]

  const rootActions: TreeAction[] =
        [{ key: 'add-tag', icon: 'new' }]

  const showRootLoading = (): void => {
    setLoadingTagKey(rootTagFolder.id.toString())
  }

  const hideRootLoading = (): void => {
    setLoadingTagKey(undefined)
  }

  const treeData = createTreeStructure({
    tags,
    loadingNodes: loadingTagKey !== undefined ? new Set([loadingTagKey]) : new Set(),
    actions: tagActions,
    rootActions
  })

  const setTagInFocus = (key: string): Tag | undefined => {
    const newFocusTag = getTag(key)

    if (newFocusTag === null || newFocusTag === undefined) {
      trackError(new GeneralError(`Tag with Id ${key} not found`))
      return undefined
    }
    return newFocusTag
  }

  const onActionsClick = (key: string, type: string): void => {
    const newFocusTag = setTagInFocus(key)

    if (newFocusTag === null || newFocusTag === undefined) {
      return
    }

    switch (type) {
      case 'add-tag':
        input({
          title: t('tag-configuration.new-tag'),
          label: t('tag-configuration.name'),
          rule: {
            required: true,
            message: 'Please enter a tag name'
          },
          okText: t('tag-configuration.create'),
          onOk: async (value: string) => {
            setLoadingTagKey(newFocusTag.id.toString())
            await handleTagCreation(value, newFocusTag.id)
          }
        })
        break
      case 'rename-tag':
        input({
          title: t('tag-configuration.rename'),
          label: t('tag-configuration.name'),
          rule: {
            required: true,
            message: 'Please enter a tag name'
          },
          okText: t('tag-configuration.save'),
          initialValue: newFocusTag.text,
          onOk: async (value: string) => {
            setLoadingTagKey(newFocusTag.id.toString())
            await handleTagUpdate(newFocusTag.id, newFocusTag.parentId, value)
          }
        })
        break
      case 'delete-tag':
        confirm({
          title: newFocusTag.hasChildren ? t('tag-configuration.warn-delete-parent-tag-modal-title') : t('tag-configuration.warn-delete-tag-modal-title'),
          content: newFocusTag.hasChildren ? t('tag-configuration.warn-delete-parent-tag-modal-text') : t('tag-configuration.warn-delete-tag-modal-text'),
          okText: newFocusTag.hasChildren ? t('tag-configuration.delete-parent-tag') : t('tag-configuration.delete-tag'),
          cancelText: t('tag-configuration.cancel'),
          onOk: async () => {
            setLoadingTagKey(newFocusTag.id.toString())
            await tagDeletion(newFocusTag.id)
          }
        })
        break
    }
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <IconButton
            icon={ { value: 'refresh' } }
            onClick={ () => {
              showRootLoading()
              dispatch(
                api.util.invalidateTags(
                  invalidatingTags.AVAILABLE_TAGS()
                )
              )
            }
          }
          />
        </Toolbar> }
      renderTopBar={
        <Toolbar
          justify='space-between'
          margin={ {
            x: 'mini',
            y: 'none'
          } }
          theme='secondary'
        >
          <Flex gap={ 'small' }>
            <Title>Tag Configuration</Title>
            <IconTextButton
              disabled={ loadingTagKey !== undefined }
              icon={ { value: 'new' } }
              onClick={ () => {
                onActionsClick(rootTagFolder.id.toString(), 'add-tag')
              } }
            >{t('tag-configuration.new')}</IconTextButton>
          </Flex>
          <SearchInput
            loading={ tagsFetching }
            onSearch={ (value) => {
              setTagFilter(value)
            } }
            placeholder="Search"
            withPrefix={ false }
            withoutAddon={ false }
          />
        </Toolbar>
        }
    >
      <Content
        loading={ tagsLoading }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
        none={ tags.length === 0 }
      >
        <TreeElement
          checkStrictly
          defaultExpandedKeys={ expandedKeys }
          draggable
          onActionsClick={ onActionsClick }
          onDragAndDrop={ async (params) => {
            setLoadingTagKey(params.dragNode.key.toString())
            await handleTagUpdate(Number(params.dragNode.key), Number(params.node.key))
          }
                        }
          onExpand={ (keys) => {
            setExpandedKeys(keys)
          } }
          treeData={ treeData }
          withCustomSwitcherIcon
        />
      </Content>
    </ContentLayout>
  )
}

export { TagConfigurationContainer }
