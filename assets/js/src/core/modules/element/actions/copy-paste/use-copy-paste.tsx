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

import { type ElementType } from 'types/element-type.d'
import { useAssetCloneMutation } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import { useElementApi } from '@Pimcore/modules/element/hooks/use-element-api'

export interface UseCopyPasteHookReturn {
  copy: (node: TreeNodeProps) => void
  cut: (node: TreeNodeProps) => void
  paste: (parentId: number) => Promise<void>
  pasteCut: (parentId: number) => Promise<void>
  copyContextMenuItem: (node: TreeNodeProps) => ItemType
  cutContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteContextMenuItem: (parentId: number) => ItemType
  pasteCutContextMenuItem: (parentId: number) => ItemType
}

export const useCopyPaste = (elementType: ElementType): UseCopyPasteHookReturn => {
  const [node, setNode] = useState<TreeNodeProps | undefined>()
  const [nodeTask, setNodeTask] = useState<'copy' | 'cut' | undefined>()
  const { refreshTree } = useRefreshTree(elementType)
  const [assetClone] = useAssetCloneMutation()
  const { elementPatch } = useElementApi(elementType)
  const { t } = useTranslation()

  const copy = (node: TreeNodeProps): void => {
    setNode(node)
    setNodeTask('copy')
  }

  const cut = (node: TreeNodeProps): void => {
    setNode(node)
    setNodeTask('cut')
  }

  const paste = async (parentId: number): Promise<void> => {
    if (node === undefined) {
      return
    }

    const id = parseInt(node.id)

    try {
      await assetClone({
        id,
        parentId
      })

      refreshTree(parentId)
    } catch (error) {
      console.error('Error cloning element', error)
    }
  }
  const pasteCut = async (parentId: number): Promise<void> => {
    if (node === undefined) {
      return
    }

    const id = parseInt(node.id)

    try {
      await elementPatch({
        body: {
          data: [{
            id,
            parentId
          }]
        }
      })

      if (node.parentId !== undefined) {
        refreshTree(parseInt(node.parentId))
      }

      refreshTree(parentId)
    } catch (error) {
      console.error('Error cloning element', error)
    }
  }

  const copyContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.copy'),
      key: 'copy',
      icon: <Icon name={ 'clipboard' } />,
      onClick: () => {
        copy(node)
      }
    }
  }

  const cutContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.cut'),
      key: 'cut',
      icon: <Icon name={ 'scissors-cut' } />,
      onClick: () => {
        cut(node)
      }
    }
  }

  const pasteContextMenuItem = (parentId: number): ItemType => {
    return {
      label: t('element.tree.paste'),
      key: 'paste',
      icon: <Icon name={ 'clipboard-check' } />,
      hidden: (node === undefined || nodeTask !== 'copy'),
      onClick: async () => {
        await paste(parentId)
      }
    }
  }
  const pasteCutContextMenuItem = (parentId: number): ItemType => {
    return {
      label: t('element.tree.paste-cut'),
      key: 'paste-cut',
      icon: <Icon name={ 'clipboard-check' } />,
      hidden: (node === undefined || nodeTask !== 'cut'),
      onClick: async () => {
        await pasteCut(parentId)
      }
    }
  }

  return {
    copy,
    cut,
    paste,
    pasteCut,
    copyContextMenuItem,
    cutContextMenuItem,
    pasteContextMenuItem,
    pasteCutContextMenuItem

  }
}
