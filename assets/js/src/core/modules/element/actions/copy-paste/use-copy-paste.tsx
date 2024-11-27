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
import { type AssetCloneApiResponse, useAssetCloneMutation } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import { useElementApi } from '@Pimcore/modules/element/hooks/use-element-api'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { createJob as createCloneJob } from '@Pimcore/modules/execution-engine/jobs/clone/factory'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { type Element } from '@Pimcore/modules/element/actions/rename/use-rename'

export interface UseCopyPasteHookReturn {
  copy: (node: TreeNodeProps) => void
  cut: (node: TreeNodeProps) => void
  paste: (parentId: number) => Promise<void>
  pasteCut: (parentId: number) => Promise<void>
  copyTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  copyContextMenuItem: (node: Element, postCopy?: () => void) => ItemType
  cutTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  cutContextMenuItem: (node: Element, postCut?: () => void) => ItemType
  pasteTreeContextMenuItem: (node: TreeNodeProps) => ItemType
  pasteContextMenuItem: (node: Element, postPaste?: () => void) => ItemType
  pasteCutContextMenuItem: (parentId: number) => ItemType
}

export const useCopyPaste = (elementType: ElementType): UseCopyPasteHookReturn => {
  const [storedNode, setStoredNode] = useState<TreeNodeProps | Element | undefined>()
  const [nodeTask, setNodeTask] = useState<'copy' | 'cut' | undefined>()
  const { refreshTree } = useRefreshTree(elementType)
  const [assetClone] = useAssetCloneMutation()
  const { elementPatch } = useElementApi(elementType)
  const { t } = useTranslation()
  const { addJob } = useJobs()

  const copy = (node: TreeNodeProps | Element): void => {
    setStoredNode(node)
    setNodeTask('copy')
  }

  const cut = (node: TreeNodeProps | Element): void => {
    setStoredNode(node)
    setNodeTask('cut')
  }

  const paste = async (parentId: number): Promise<void> => {
    if (storedNode === undefined) {
      return
    }

    const id = typeof storedNode.id === 'number'
      ? storedNode.id
      : parseInt(storedNode.id)

    const promise = assetClone({
      id,
      parentId
    })

    promise.catch(() => {
      console.error('Error copying element')
    })

    try {
      const response = (await promise) as any

      let jobRunId: any = null
      if ((response.data ?? false) !== false) {
        const data = response.data as Exclude<AssetCloneApiResponse, void>
        jobRunId = data.jobRunId ?? null
      }

      if (jobRunId !== null) {
        addJob(createCloneJob({
          title: 'Cloning Folder',
          topics: [topics['cloning-finished'], ...defaultTopics],
          action: async () => {
            return jobRunId
          },
          parentFolder: String(parentId)
        }))
      } else if (parentId !== undefined) {
        refreshTree(parentId)
      }
    } catch (error) {
      console.error('Error cloning element', error)
    }
  }

  const pasteCut = async (parentId: number): Promise<void> => {
    if (storedNode === undefined) {
      return
    }

    const id = typeof storedNode.id === 'number'
      ? storedNode.id
      : parseInt(storedNode.id)

    try {
      await elementPatch({
        body: {
          data: [{
            id,
            parentId
          }]
        }
      })

      if (storedNode.parentId !== undefined) {
        const parentId = typeof storedNode.parentId === 'number'
          ? storedNode.parentId
          : parseInt(storedNode.parentId)

        refreshTree(parentId)
      }

      refreshTree(parentId)
    } catch (error) {
      console.error('Error cloning element', error)
    }
  }

  const copyTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.copy'),
      key: 'copy',
      icon: <Icon value={ 'clipboard' } />,
      hidden: !checkElementPermission(node.permissions, 'view') || node.isLocked,
      onClick: () => {
        copy(node)
      }
    }
  }

  const copyContextMenuItem = (node: Element, postCopy?: () => void): ItemType => {
    return {
      label: t('element.tree.copy'),
      key: 'copy',
      icon: <Icon value={ 'clipboard' } />,
      hidden: !checkElementPermission(node.permissions!, 'view') || node.isLocked,
      onClick: () => {
        copy(node)
        // TODO: check how to fire after copy is done
      }
    }
  }

  const cutTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.cut'),
      key: 'cut',
      icon: <Icon value={ 'scissors-cut' } />,
      hidden: !checkElementPermission(node.permissions, 'rename') || node.isLocked,
      onClick: () => {
        cut(node)
      }
    }
  }

  const cutContextMenuItem = (node: Element, postCut?: () => void): ItemType => {
    return {
      label: t('element.tree.cut'),
      key: 'cut',
      icon: <Icon value={ 'scissors-cut' } />,
      hidden: !checkElementPermission(node.permissions!, 'rename') || node.isLocked,
      onClick: () => {
        cut(node)
        // TODO: check how to fire after cut is done
      }
    }
  }

  const pasteTreeContextMenuItem = (node: TreeNodeProps): ItemType => {
    return {
      label: t('element.tree.paste'),
      key: 'paste',
      icon: <Icon value={ 'clipboard-check' } />,
      hidden: (storedNode === undefined || nodeTask !== 'copy') || !checkElementPermission(node.permissions, 'create'),
      onClick: async () => {
        await paste(parseInt(node.id))
      }
    }
  }

  const pasteContextMenuItem = (node: Element, postPaste?: () => void): ItemType => {
    return {
      label: t('element.tree.paste'),
      key: 'paste',
      icon: <Icon value={ 'clipboard-check' } />,
      hidden: (storedNode === undefined || nodeTask !== 'copy') || !checkElementPermission(node.permissions!, 'create'),
      onClick: async () => {
        await paste(node.id)
        // TODO: check how to fire after paste is done
      }
    }
  }

  const pasteCutContextMenuItem = (parentId: number): ItemType => {
    return {
      label: t('element.tree.paste-cut'),
      key: 'paste-cut',
      icon: <Icon value={ 'clipboard-check' } />,
      hidden: (storedNode === undefined || nodeTask !== 'cut'),
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
    copyTreeContextMenuItem,
    copyContextMenuItem,
    cutTreeContextMenuItem,
    cutContextMenuItem,
    pasteTreeContextMenuItem,
    pasteContextMenuItem,
    pasteCutContextMenuItem
  }
}
