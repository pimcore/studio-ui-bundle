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

import type { ItemType } from 'antd/es/menu/hooks/useItems'
import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import React, { useState } from 'react'
import {
  api as assetApi
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { type TreeNodeProps } from '@Pimcore/components/tree/node/tree-node'
import { useZipDownload } from '@Pimcore/modules/asset/actions/zip-download/use-zip-download'

export interface NodeAware {
  node: TreeNodeProps | null
}

export interface NodeIdAware {
  nodeId: string | null
}

export interface AssetContextMenuRename {
  onClick: () => void
}

export interface AssetContextMenuDelete {
  onClick: () => void
}

export interface AssetContextMenuCopy extends NodeIdAware {}
export interface AssetContextMenuRefresh extends NodeIdAware {}
export interface AssetContextMenuDownloadAsZip extends NodeAware {}

export interface UseAssetActionsHookReturn {
  addFolder: () => ItemType
  rename: (props: AssetContextMenuRename) => ItemType
  copy: (props: AssetContextMenuCopy) => ItemType
  paste: () => ItemType | null
  cut: () => ItemType
  remove: (props: AssetContextMenuDelete) => ItemType
  downloadAsZip: (props: AssetContextMenuDownloadAsZip) => ItemType | null
  advanced: () => ItemType
  refresh: (props: AssetContextMenuRefresh) => ItemType
  requestTranslations: () => ItemType
  setNodeId: (nodeId: string) => void
}

export const useAssetActions = (): UseAssetActionsHookReturn => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [nodeId, setNodeId] = useState<string | null>(null)
  const { createZipDownload } = useZipDownload({ type: 'folder' })

  const addFolder = (): ItemType => {
    return {
      label: t('element.tree.context-menu.add-folder'),
      key: 'add-folder',
      icon: <Icon name={ 'folder' } />,
      disabled: true,
      onClick: () => {
        console.log('addFolder')
      }
    }
  }

  const rename: UseAssetActionsHookReturn['rename'] = ({ onClick }): ItemType => {
    return {
      label: t('element.tree.context-menu.rename'),
      key: 'rename',
      icon: <Icon name={ 'type-square' } />,
      onClick
    }
  }

  const copy: UseAssetActionsHookReturn['copy'] = ({ nodeId }): ItemType => {
    return {
      label: t('element.tree.context-menu.copy'),
      key: 'copy',
      icon: <Icon name={ 'clipboard' } />,
      onClick: () => {
        if (nodeId !== null) {
          setNodeId(nodeId)
        }
      }
    }
  }

  const paste = (): ReturnType<UseAssetActionsHookReturn['paste']> => {
    if (nodeId === null) return null

    return {
      label: t('element.tree.context-menu.paste'),
      key: 'paste',
      icon: <Icon name={ 'clipboard-check' } />,
      disabled: true,
      onClick: () => {
        console.log('paste', nodeId)
      }
    }
  }

  const cut = (): ItemType => {
    return {
      label: t('element.tree.context-menu.cut'),
      key: 'cut',
      icon: <Icon name={ 'scissors-cut' } />,
      disabled: true,
      onClick: () => {
        console.log('cut')
      }
    }
  }

  const remove: UseAssetActionsHookReturn['rename'] = ({ onClick }): ItemType => {
    return {
      label: t('element.tree.context-menu.delete'),
      key: 'delete',
      icon: <Icon name={ 'delete-outlined' } />,
      onClick
    }
  }

  const downloadAsZip: UseAssetActionsHookReturn['downloadAsZip'] = ({ node }): ReturnType<UseAssetActionsHookReturn['downloadAsZip']> => {
    if (node === null || node.type === 'folder') return null

    // todo: move that to download (downloadAsZip) is only for folders
    return {
      label: t('element.tree.context-menu.download-as-zip'),
      key: 'download-as-zip',
      icon: <Icon name={ 'file-download-zip-01' } />,
      onClick: () => {
        createZipDownload({
          jobTitle: t('jobs.zip-job.title', { title: node.label }),
          requestData: { body: { folders: [parseInt(node.id)] } }
        })
      }
    }
  }

  // TODO: this should go to a separate hook
  const advanced = (): ItemType => {
    return {
      label: t('element.tree.context-menu.advanced'),
      key: 'advanced',
      icon: <Icon name={ 'more' } />,
      disabled: true,
      children: [
        {
          label: t('element.tree.context-menu.search-and-move'),
          key: 'advanced-search-and-move',
          icon: <Icon name={ 'folder-search' } />,
          onClick: () => {
            console.log('advanced-search-and-move')
          }
        },
        {
          label: t('element.tree.context-menu.lock'),
          key: 'advanced-lock',
          icon: <Icon name={ 'lock-01' } />,
          children: [
            {
              label: t('element.tree.context-menu.lock'),
              key: 'advanced.lock.lock',
              icon: <Icon name={ 'lock-01' } />,
              onClick: () => {
                console.log('advanced-lock-lock')
              }
            },
            {
              label: t('element.tree.context-menu.lock-and-propagate-to-children'),
              key: 'advanced.lock.lock-and-propagate-to-children',
              icon: <Icon name={ 'file-lock-02' } />,
              onClick: () => {
                console.log('advanced-lock-lock')
              }
            }
          ]
        },
        {
          label: t('element.tree.context-menu.expand-children'),
          key: 'advanced.expand-children',
          icon: <Icon name={ 'expand-01' } />,
          onClick: () => {
            console.log('expand-children')
          }
        }
      ]
    }
  }

  const refresh: UseAssetActionsHookReturn['copy'] = ({ nodeId }): ItemType => {
    return {
      label: t('element.tree.context-menu.refresh'),
      key: 'refresh',
      icon: <Icon name={ 'refresh-ccw-03' } />,
      onClick: () => {
        if (nodeId !== null) {
          dispatch(
            assetApi.util.invalidateTags(
              invalidatingTags.ASSET_TREE_ID(parseInt(nodeId))
            )
          )
        }
      }
    }
  }

  const requestTranslations = (): ItemType => {
    return {
      label: t('element.tree.context-menu.request-translations'),
      key: 'request-translations',
      icon: <Icon name={ 'translation' } />,
      disabled: true,
      onClick: () => {
        console.log('request-translations')
      }
    }
  }

  return {
    addFolder,
    rename,
    copy,
    paste,
    cut,
    remove,
    downloadAsZip,
    advanced,
    refresh,
    requestTranslations,
    setNodeId
  }
}
