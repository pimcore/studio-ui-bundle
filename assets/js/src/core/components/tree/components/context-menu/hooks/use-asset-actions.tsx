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

import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import React, { useState } from 'react'
import { useAssetPatchByIdMutation } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { type TreeNodeProps } from '@Pimcore/components/tree/node/tree-node'
import { useZipDownload } from '@Pimcore/modules/asset/actions/zip-download/use-zip-download'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice-enhanced'

export interface NodeAware {
  node?: TreeNodeProps
}

export interface NodeIdAware {
  nodeId: string | undefined
}

export interface OnClickAware {
  onClick: () => void
}

export interface AssetContextMenuBase {
  hidden?: boolean
}

export interface AssetContextMenuRename extends AssetContextMenuBase, OnClickAware {}

export interface AssetContextMenuDelete extends AssetContextMenuBase, OnClickAware {}

export interface AssetContextMenuCopy extends AssetContextMenuBase, NodeAware {}

export interface AssetContextMenuPaste {
  onClick: (node: TreeNodeProps) => void
}

export interface AssetContextMenuCut extends AssetContextMenuBase, NodeAware {}

export interface AssetContextMenuRefresh extends AssetContextMenuBase, NodeIdAware {}

export interface AssetContextMenuDownloadAsZip extends AssetContextMenuBase, NodeAware {}

export interface AssetContextMenuLock extends AssetContextMenuBase, NodeIdAware {}

export interface AssetExpandChildren extends AssetContextMenuBase, OnClickAware {}

export interface UseAssetActionsHookReturn {
  addFolder: (props: AssetContextMenuDelete) => ItemType
  rename: (props: AssetContextMenuRename) => ItemType
  copy: (props: AssetContextMenuCopy) => ItemType
  paste: (props: AssetContextMenuPaste) => ItemType
  cut: (props: AssetContextMenuCut) => ItemType
  pasteCut: (props: AssetContextMenuPaste) => ItemType
  remove: (props: AssetContextMenuDelete) => ItemType
  downloadAsZip: (props: AssetContextMenuDownloadAsZip) => ItemType
  lock: (props: AssetContextMenuLock) => ItemType
  lockAndPropagate: (props: AssetContextMenuLock) => ItemType
  unlock: (props: AssetContextMenuLock) => ItemType
  unlockAndPropagate: (props: AssetContextMenuLock) => ItemType
  searchAndMove: () => ItemType
  expandChildren: (props: AssetExpandChildren) => ItemType
  refresh: (props: AssetContextMenuRefresh) => ItemType
}

export const useAssetActions = (): UseAssetActionsHookReturn => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [node, setNode] = useState<TreeNodeProps | undefined>()
  const [nodeTask, setNodeTask] = useState<'copy' | 'cut' | undefined>()
  const [assetPatch] = useAssetPatchByIdMutation()
  const { createZipDownload } = useZipDownload({ type: 'folder' })

  const lockAssetOrFolder = async ({ nodeId, lockType }: { nodeId: string, lockType: 'self' | 'propagate' | '' | 'unlockPropagate' }): Promise<void> => {
    const assetLockTask = assetPatch({
      body: {
        data: [{
          id: parseInt(nodeId),
          locked: lockType
        }]
      }
    })

    try {
      await assetLockTask
    } catch (error) {
      console.error('Error cutting')
    }
  }

  const addFolder: UseAssetActionsHookReturn['addFolder'] = (props): ItemType => {
    return {
      label: t('element.tree.context-menu.add-folder'),
      key: 'add-folder',
      icon: <Icon name={ 'folder' } />,
      ...props
    }
  }

  const rename: UseAssetActionsHookReturn['rename'] = (props): ItemType => {
    return {
      label: t('element.tree.context-menu.rename'),
      key: 'rename',
      icon: <Icon name={ 'type-square' } />,
      ...props
    }
  }

  const copy: UseAssetActionsHookReturn['copy'] = (props): ItemType => {
    const { node, ...someProps } = props

    return {
      label: t('element.tree.context-menu.copy'),
      key: 'copy',
      icon: <Icon name={ 'clipboard' } />,
      onClick: () => {
        if (node !== undefined) {
          setNode(node)
          setNodeTask('copy')
        }
      },
      ...someProps
    }
  }

  const paste: UseAssetActionsHookReturn['paste'] = (props): ItemType => {
    const { onClick, ...someProps } = props

    return {
      label: t('element.tree.context-menu.paste'),
      key: 'paste',
      icon: <Icon name={ 'clipboard-check' } />,
      hidden: (node === undefined || nodeTask !== 'copy'),
      onClick: () => {
        if (node !== undefined) {
          onClick(node)
        }
      },
      ...someProps
    }
  }

  const cut: UseAssetActionsHookReturn['cut'] = (props): ItemType => {
    const { node, ...someProps } = props

    return {
      label: t('element.tree.context-menu.cut'),
      key: 'cut',
      icon: <Icon name={ 'scissors-cut' } />,
      onClick: () => {
        if (node !== undefined) {
          setNode(node)
          setNodeTask('cut')
        }
      },
      ...someProps
    }
  }

  const pasteCut: UseAssetActionsHookReturn['pasteCut'] = (props): ItemType => {
    const { onClick, ...someProps } = props

    return {
      label: t('element.tree.context-menu.pasteCut'),
      key: 'pasteCut',
      icon: <Icon name={ 'clipboard-check' } />,
      hidden: (node === undefined || nodeTask !== 'cut'),
      onClick: () => {
        if (node !== undefined) {
          onClick(node)
        }
      },
      ...someProps
    }
  }

  const remove: UseAssetActionsHookReturn['rename'] = (props): ItemType => {
    return {
      label: t('element.tree.context-menu.delete'),
      key: 'delete',
      icon: <Icon name={ 'delete-outlined' } />,
      ...props
    }
  }

  const downloadAsZip: UseAssetActionsHookReturn['downloadAsZip'] = (props): ReturnType<UseAssetActionsHookReturn['downloadAsZip']> => {
    const { node, ...someProps } = props

    return {
      label: t('element.tree.context-menu.download-as-zip'),
      key: 'download-as-zip',
      icon: <Icon name={ 'file-download-zip-01' } />,
      hidden: (node === undefined || node.type === 'folder'),
      onClick: () => {
        createZipDownload({
          jobTitle: t('jobs.zip-job.title', { title: node!.label }),
          requestData: { body: { folders: [parseInt(node!.id)] } }
        })
      },
      ...someProps
    }
  }

  const lock: UseAssetActionsHookReturn['lock'] = (props): ItemType => {
    const { nodeId, ...someProps } = props

    return {
      label: t('element.tree.context-menu.lock'),
      key: 'advanced.lock.lock',
      icon: <Icon name={ 'lock-01' } />,
      onClick: async () => {
        await lockAssetOrFolder({
          nodeId: nodeId!,
          lockType: 'self'
        })
      },
      ...someProps
    }
  }

  const lockAndPropagate: UseAssetActionsHookReturn['lockAndPropagate'] = (props): ItemType => {
    const { nodeId, ...someProps } = props

    return {
      label: t('element.tree.context-menu.lock-and-propagate-to-children'),
      key: 'advanced.lock.lock-and-propagate-to-children',
      icon: <Icon name={ 'file-lock-02' } />,
      onClick: async () => {
        await lockAssetOrFolder({
          nodeId: nodeId!,
          lockType: 'propagate'
        })
      },
      ...someProps
    }
  }

  const unlock: UseAssetActionsHookReturn['unlock'] = (props): ItemType => {
    const { nodeId, ...someProps } = props

    return {
      label: t('element.tree.context-menu.unlock'),
      key: 'advanced.lock.unlock',
      icon: <Icon name={ 'lock-unlock-01' } />,
      onClick: async () => {
        await lockAssetOrFolder({
          nodeId: nodeId!,
          lockType: ''
        })
      },
      ...someProps
    }
  }

  const unlockAndPropagate: UseAssetActionsHookReturn['unlockAndPropagate'] = (props): ItemType => {
    const { nodeId, ...someProps } = props

    return {
      label: t('element.tree.context-menu.unlock-and-propagate-to-children'),
      key: 'advanced.lock.unlock-and-propagate-to-children',
      icon: <Icon name={ 'lock-unlock-01' } />,
      onClick: async () => {
        await lockAssetOrFolder({
          nodeId: nodeId!,
          lockType: 'unlockPropagate'
        })
      },
      ...someProps
    }
  }

  const searchAndMove = (): ItemType => {
    return {
      label: t('element.tree.context-menu.search-and-move'),
      key: 'advanced-search-and-move',
      icon: <Icon name={ 'folder-search' } />,
      disabled: true,
      onClick: () => {
        console.log('advanced-search-and-move')
      }
    }
  }

  const expandChildren: UseAssetActionsHookReturn['expandChildren'] = (props): ItemType => {
    return {
      label: t('element.tree.context-menu.expand-children'),
      key: 'advanced.expand-children',
      disabled: true,
      icon: <Icon name={ 'expand-01' } />,
      ...props
    }
  }

  const refresh: UseAssetActionsHookReturn['refresh'] = (props): ItemType => {
    const { nodeId, ...someProps } = props

    return {
      label: t('element.tree.context-menu.refresh'),
      key: 'refresh',
      icon: <Icon name={ 'refresh-ccw-03' } />,
      onClick: () => {
        if (nodeId !== undefined) {
          dispatch(
            assetApi.util.invalidateTags(
              invalidatingTags.ASSET_TREE_ID(parseInt(nodeId))
            )
          )
        }
      },
      ...someProps
    }
  }

  return {
    addFolder,
    rename,
    copy,
    paste,
    cut,
    pasteCut,
    remove,
    downloadAsZip,
    lock,
    lockAndPropagate,
    unlock,
    unlockAndPropagate,
    searchAndMove,
    expandChildren,
    refresh
  }
}
