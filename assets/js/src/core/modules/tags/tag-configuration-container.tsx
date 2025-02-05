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

import React, { useState } from 'react'
import { TreeElement } from '@Pimcore/components/tree-element/tree-element'
import {
  createTreeStructure
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/components/tags-tree/create-tree-structure'
import type { Tag } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { Title } from '@Pimcore/components/title/title'
import { TagConfigurationModal } from '@Pimcore/modules/tags/tag-configuration-modal'
import { useTagConfig } from '@Pimcore/modules/tags/hooks/use-tag-config'
import { t } from 'i18next'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Box } from '@Pimcore/components/box/box'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import ButtonGroup from 'antd/es/button/button-group'
import {
  api
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { SearchInput } from '@Pimcore/components/search-input/search-input'

export type Mode = 'create' | 'update'

export interface TreeAction {
  key: string
  icon: string
}

const TagConfigurationContainer = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const { tags, tagsLoading, rootTagFolder, getTag, handleTagUpdate, tagDeletion, setTagFilter } = useTagConfig()
  const { confirm } = useFormModal()

  const [tagConfigModalOpen, setTagConfigModalOpen] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<Mode>('create')
  const [focusTag, setFocusTag] = useState<Tag | undefined>(rootTagFolder)
  const [expandedKeys, setExpandedKeys] = React.useState<any[]>([0])

  const tagActions: TreeAction[] =
        [{ key: 'add-tag', icon: 'new' },
          { key: 'rename-tag', icon: 'edit' },
          { key: 'delete-tag', icon: 'trash' }]

  const rootActions: TreeAction[] =
        [{ key: 'add-tag', icon: 'new' }]

  const treeData = createTreeStructure({ tags, loadingNodes: new Set(), actions: tagActions, rootActions })

  const setTagInFocus = (key: string): Tag | undefined => {
    const newFocusTag = getTag(key)
    if (newFocusTag === null || newFocusTag === undefined) {
      trackError(new GeneralError(`Tag with Id ${key} not found`))
      return undefined
    }
    setFocusTag(newFocusTag)
    return newFocusTag
  }

  const onActionsClick = (key: string, type: string): void => {
    const newFocusTag = setTagInFocus(key)

    if (newFocusTag === null || newFocusTag === undefined) {
      return
    }

    switch (type) {
      case 'add-tag':
        setEditMode('create')
        setTagConfigModalOpen(true)
        break
      case 'rename-tag':
        setEditMode('update')
        setTagConfigModalOpen(true)
        break
      case 'delete-tag':
        confirm({
          title: newFocusTag.hasChildren ? t('tag-configuration.warn-delete-parent-tag-modal-title') : t('tag-configuration.warn-delete-tag-modal-title'),
          content: newFocusTag.hasChildren ? t('tag-configuration.warn-delete-parent-tag-modal-text') : t('tag-configuration.warn-delete-tag-modal-text'),
          okText: newFocusTag.hasChildren ? t('tag-configuration.delete-parent-tag') : t('tag-configuration.delete-tag'),
          cancelText: t('tag-configuration.cancel'),
          onOk: async () => {
            await tagDeletion(newFocusTag.id)
          },
          onCancel: () => {
            setFocusTag(rootTagFolder)
          }
        })
        break
    }
  }

  const handleDeleteAll = (): void => {
    confirm({
      title: t('tag-configuration.warn-delete-all-tags-title'),
      content: t('tag-configuration.warn-delete-all-tags-modal-text'),
      okText: t('tag-configuration.warn-delete-all-tags-title'),
      cancelText: t('tag-configuration.cancel'),
      onOk: async () => {
        focusTag !== undefined && await tagDeletion(focusTag.id)
      },
      onCancel: () => {
        setFocusTag(rootTagFolder)
      }
    })
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <ButtonGroup>
            <IconButton
              icon={ { value: 'refresh' } }
              onClick={ () =>
                dispatch(
                  api.util.invalidateTags(
                    invalidatingTags.AVAILABLE_TAGS()
                  )
                )
                            }
            />
            <IconTextButton
              icon={ { value: 'trash' } }
              onClick={ handleDeleteAll }
              type="link"
            >
              {t('tag-configuration.delete-all')}
            </IconTextButton>
          </ButtonGroup>
        </Toolbar> }
    >
      <Box
        margin={ 'small' }
      >
        <Flex
          gap={ 'small' }
          vertical
        >
          <Flex
            justify={ 'space-between' }
          >
            <Flex
              gap={ 'small' }
            >
              <Title>Tag Configuration</Title>
              <IconTextButton
                icon={ { value: 'new' } }
                onClick={ () => {
                  setFocusTag(rootTagFolder)
                  setEditMode('create')
                  setTagConfigModalOpen(true)
                } }
              >{t('tag-configuration.new')}</IconTextButton>
            </Flex>
            <SearchInput
              loading={ tagsLoading }
              onChange={ (e) => {
                const { value } = e.target
                setTagFilter(value)
              } }
              placeholder="Search"
            />
          </Flex>
          <TreeElement
            checkStrictly
            defaultExpandedKeys={ expandedKeys }
            draggable
            onActionsClick={ onActionsClick }
            onDragAndDrop={ async (params) => {
              await handleTagUpdate(Number(params.dragNode.key), Number(params.node.key))
            }
                        }
            onExpand={ (keys) => {
              setExpandedKeys(keys)
            } }
            treeData={ treeData }
            withCustomSwitcherIcon
          />
          {focusTag !== undefined && (
          <TagConfigurationModal
            focusTag={ focusTag }
            mode={ editMode }
            resetFocusTag={ () => {
              setFocusTag(rootTagFolder)
            } }
            setMode={ setEditMode }
            setTagConfigModalOpen={ setTagConfigModalOpen }
            tagConfigModalOpen={ tagConfigModalOpen }
          />
          )}
        </Flex>
      </Box>
    </ContentLayout>
  )
}

export { TagConfigurationContainer }
