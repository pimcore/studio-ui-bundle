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
import { useModal } from '@Pimcore/components/modal/useModal'
import { ModalFooter } from '@Pimcore/components/modal/footer/modal-footer'
import { Button } from '@Pimcore/components/button/button'
import { t } from 'i18next'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Box } from '@Pimcore/components/box/box'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'

export type Mode = 'create' | 'update'

export interface TreeAction {
  key: string
  icon: string
}

const TagConfigurationContainer = (): React.JSX.Element => {
  const { tags, rootTagFolder, getTag, handleTagUpdate, tagDeletion } = useTagConfig()
  const { renderModal: WarnModal, showModal: showWarnModal, handleCancel, handleOk } = useModal({ type: 'warn' })

  const [tagConfigModalOpen, setTagConfigModalOpen] = useState<boolean>(false)
  const [mode, setMode] = useState<Mode>('create')
  const [deleteMode, setDeleteMode] = useState<'single' | 'parent' | 'all'>('single')
  const [focusTag, setFocusTag] = useState<Tag | undefined>(rootTagFolder)

  const tagActions: TreeAction[] =
        [{ key: 'add-tag', icon: 'new' },
          { key: 'rename-tag', icon: 'edit' },
          { key: 'delete-tag', icon: 'trash' }]

  const rootActions: TreeAction[] =
        [{ key: 'add-tag', icon: 'new' }]

  const treeData = createTreeStructure({ tags, loadingNodes: new Set(), actions: tagActions, rootActions })

  const setTagInFocus = (key: string): void => {
    const newFocusTag = getTag(key)
    if (newFocusTag === null || newFocusTag === undefined) {
      console.error(`Tag with id ${key} not found`)
      return
    }
    setFocusTag(newFocusTag)
  }

  const onActionsClick = (key: string, type: string): void => {
    setTagInFocus(key)
    switch (type) {
      case 'add-tag':
        setMode('create')
        setTagConfigModalOpen(true)
        break
      case 'rename-tag':
        setMode('update')
        setTagConfigModalOpen(true)
        break
      case 'delete-tag':
        setDeleteMode(focusTag === undefined ? 'single' : focusTag.hasChildren ? 'parent' : 'single')
        showWarnModal()
        break
    }
  }

  const handleDeleteClick = (): void => {
    setDeleteMode('all')
    showWarnModal()
  }

  const deleteModalTitle = (hasChildren: boolean): string => deleteMode === 'all'
    ? t('tag-configuration.warn-delete-all-tags-title')
    : hasChildren
      ? t('tag-configuration.warn-delete-parent-tag-modal-title')
      : t('tag-configuration.warn-delete-tag-modal-title')

  const deleteModalContent = (hasChildren: boolean): string => deleteMode === 'all'
    ? t('tag-configuration.warn-delete-all-tags-modal-text')
    : hasChildren
      ? t('tag-configuration.warn-delete-parent-tag-modal-text')
      : t('tag-configuration.warn-delete-tag-modal-text')

  const deleteModalButton = (hasChildren: boolean): string => deleteMode === 'all'
    ? t('tag-configuration.warn-delete-all-tags-title')
    : hasChildren
      ? t('tag-configuration.delete-parent-tag')
      : t('tag-configuration.delete-tag')

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <IconTextButton
            icon={ { value: 'trash' } }
            onClick={ handleDeleteClick }
            type="link"
          >
            {t('tag-configuration.delete-all')}
          </IconTextButton>
        </Toolbar> }
    >
      <Box
        margin={ 'small' }
      >
        <Flex
          gap={ 'small' }
          vertical
        >
          <Flex gap={ 'small' }>
            <Title>Tag Configuration</Title>
            <IconTextButton
              icon={ { value: 'new' } }
              onClick={ () => {
                setFocusTag(rootTagFolder)
                setMode('create')
                setTagConfigModalOpen(true)
              } }
            >{t('tag-configuration.new')}</IconTextButton>
          </Flex>
          <TreeElement
            checkStrictly
            defaultExpandedKeys={ [0] }
            draggable
            onActionsClick={ onActionsClick }
            onDragAndDrop={ async (params) => {
              await handleTagUpdate(Number(params.dragNode.key), Number(params.node.key))
            }
                        }
            treeData={ treeData }
            withCustomSwitcherIcon
          />
          {focusTag !== undefined && (
            <>
              <TagConfigurationModal
                focusTag={ focusTag }
                mode={ mode }
                setMode={ setMode }
                setTagConfigModalOpen={ setTagConfigModalOpen }
                tagConfigModalOpen={ tagConfigModalOpen }
              />
              <WarnModal
                footer={ <ModalFooter>
                  <Button
                    key="cancel"
                    onClick={ handleCancel }
                  >{t('tag-configuration.cancel')}</Button>
                  <Button
                    onClick={ async () => {
                      await tagDeletion(focusTag.id)
                      handleOk()
                    } }
                    type='primary'
                  >{deleteModalButton(focusTag.hasChildren)}
                  </Button>
                </ModalFooter> }
                title={ deleteModalTitle(focusTag.hasChildren) }
              >
                {deleteModalContent(focusTag.hasChildren)}
              </WarnModal>
            </>
          )}
        </Flex>
      </Box>
    </ContentLayout>
  )
}

export { TagConfigurationContainer }
