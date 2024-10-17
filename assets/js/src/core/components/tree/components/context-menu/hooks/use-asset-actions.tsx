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
  api as assetApi,
  type AssetCreateZipApiResponse,
  useAssetCreateZipMutation
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { createJob as createDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/factory'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { type TreeNodeProps } from '@Pimcore/components/tree/node/tree-node'

export interface NodeAware {
  node?: TreeNodeProps
}

export interface NodeIdAware {
  nodeId: string | null // TODO: change that to string|undefined
}

export interface OnClickAware {
  onClick: () => void
}

export interface AssetContextMenuRename extends OnClickAware {}

export interface AssetContextMenuDelete extends OnClickAware {}

export interface AssetContextMenuCopy extends NodeAware {}

export interface AssetContextMenuPaste {
  onClick: (node: TreeNodeProps) => void
}

export interface AssetContextMenuCut extends NodeAware {}

export interface AssetContextMenuRefresh extends NodeIdAware {}

export interface AssetContextMenuDownloadAsZip extends NodeAware {}

export interface UseAssetActionsHookReturn {
  addFolder: (props: AssetContextMenuDelete) => ItemType
  rename: (props: AssetContextMenuRename) => ItemType
  copy: (props: AssetContextMenuCopy) => ItemType
  paste: (props: AssetContextMenuPaste) => ItemType | null
  cut: (props: AssetContextMenuCut) => ItemType
  pasteCut: (props: AssetContextMenuPaste) => ItemType | null
  remove: (props: AssetContextMenuDelete) => ItemType
  downloadAsZip: (props: AssetContextMenuDownloadAsZip) => ItemType | null
  advanced: () => ItemType
  refresh: (props: AssetContextMenuRefresh) => ItemType
  requestTranslations: () => ItemType
}

export const useAssetActions = (): UseAssetActionsHookReturn => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { addJob } = useJobs()
  const [node, setNode] = useState<TreeNodeProps | undefined>()
  const [nodeTask, setNodeTask] = useState<'copy' | 'cut' | undefined>()
  const [fetchCreateZip] = useAssetCreateZipMutation()

  const addFolder: UseAssetActionsHookReturn['addFolder'] = ({ onClick }): ItemType => {
    return {
      label: t('element.tree.context-menu.add-folder'),
      key: 'add-folder',
      icon: <Icon name={ 'folder' } />,
      onClick
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

  const copy: UseAssetActionsHookReturn['copy'] = ({ node }): ItemType => {
    return {
      label: t('element.tree.context-menu.copy'),
      key: 'copy',
      icon: <Icon name={ 'clipboard' } />,
      onClick: () => {
        if (node !== null) {
          setNode(node)
          setNodeTask('copy')
        }
      }
    }
  }

  const paste: UseAssetActionsHookReturn['paste'] = (props): ItemType | null => {
    if (node === undefined || nodeTask !== 'copy') return null

    return {
      label: t('element.tree.context-menu.paste'),
      key: 'paste',
      icon: <Icon name={ 'clipboard-check' } />,
      onClick: () => {
        props.onClick(node)
      }
    }
  }

  const cut: UseAssetActionsHookReturn['cut'] = ({ node }): ItemType => {
    return {
      label: t('element.tree.context-menu.cut'),
      key: 'cut',
      icon: <Icon name={ 'scissors-cut' } />,
      onClick: () => {
        if (node !== null) {
          setNode(node)
          setNodeTask('cut')
        }
      }
    }
  }

  const pasteCut: UseAssetActionsHookReturn['pasteCut'] = (props): ItemType | null => {
    if (node === undefined || nodeTask !== 'cut') return null

    return {
      label: t('element.tree.context-menu.pasteCut'),
      key: 'pasteCut',
      icon: <Icon name={ 'clipboard-check' } />,
      onClick: () => {
        props.onClick(node)
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
    if (node === undefined || node.type === 'folder') return null

    // todo: move that to download (downloadAsZip) is only for folders
    return {
      label: t('element.tree.context-menu.download-as-zip'),
      key: 'download-as-zip',
      icon: <Icon name={ 'file-download-zip-01' } />,
      onClick: () => {
        addJob(createDownloadJob({
          // @todo add api domain
          title: t('jobs.zip-job.title', { title: node.label }),
          topics: [topics['zip-download-ready'], ...defaultTopics],
          downloadUrl: '/studio/api/assets/download/zip/{jobRunId}',
          action: async () => {
            const promise = fetchCreateZip({ body: { items: [parseInt(node.id)] } })

            promise.catch(() => {
              console.error('Failed to create zip')
            })

            const response = (await promise) as any
            const data = response.data as AssetCreateZipApiResponse
            return data.jobRunId
          }
        }))
      }
    }
  }

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

  const refresh: UseAssetActionsHookReturn['refresh'] = ({ nodeId }): ItemType => {
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
    pasteCut,
    remove,
    downloadAsZip,
    advanced,
    refresh,
    requestTranslations
  }
}
