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

export interface AssetContextMenuCopy {
  nodeId: string | null
}

export interface AssetContextMenuRename {
  onClick: () => void
}

export interface UseAssetActionsHookReturn {
  addFolder: () => ItemType
  rename: (props: AssetContextMenuRename) => ItemType
  copy: (props: AssetContextMenuCopy) => ItemType
  paste: () => ItemType | null
  cut: () => ItemType
  remove: () => ItemType
  downloadAsZip: () => ItemType
  advanced: () => ItemType
  refresh: () => ItemType
  requestTranslations: () => ItemType
  setNodeId: (nodeId: string) => void
}

export const useAssetActions = (): UseAssetActionsHookReturn => {
  const { t } = useTranslation()
  const [nodeId, setNodeId] = useState<string | null>(null)

  const addFolder = (): ItemType => {
    return {
      label: t('asset.tree.context-menu.add-folder'),
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
      label: t('asset.tree.context-menu.rename'),
      key: 'rename',
      icon: <Icon name={ 'type-square' } />,
      onClick
    }
  }

  const copy: UseAssetActionsHookReturn['copy'] = ({ nodeId }): ItemType => {
    return {
      label: t('asset.tree.context-menu.copy'),
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
      label: t('asset.tree.context-menu.paste'),
      key: 'paste',
      icon: <Icon name={ 'clipboard-check' } />,
      onClick: () => {
        console.log('paste', nodeId)
      }
    }
  }

  const cut = (): ItemType => {
    return {
      label: t('asset.tree.context-menu.cut'),
      key: 'cut',
      icon: <Icon name={ 'scissors-cut' } />,
      disabled: true,
      onClick: () => {
        console.log('cut')
      }
    }
  }

  const remove = (): ItemType => {
    return {
      label: t('asset.tree.context-menu.delete'),
      key: 'delete',
      icon: <Icon name={ 'delete-outlined' } />,
      disabled: true,
      onClick: () => {
        console.log('delete')
      }
    }
  }

  const downloadAsZip = (): ItemType => {
    return {
      label: t('asset.tree.context-menu.download-as-zip'),
      key: 'download-as-zip',
      icon: <Icon name={ 'file-download-zip-01' } />,
      disabled: true,
      onClick: () => {
        console.log('download-as-zip')
      }
    }
  }

  // TODO: this should go to a separate hook
  const advanced = (): ItemType => {
    return {
      label: t('asset.tree.context-menu.advanced'),
      key: 'advanced',
      icon: <Icon name={ 'more' } />,
      disabled: true,
      children: [
        {
          label: t('asset.tree.context-menu.search-and-move'),
          key: 'advanced-search-and-move',
          icon: <Icon name={ 'folder-search' } />,
          onClick: () => {
            console.log('advanced-search-and-move')
          }
        },
        {
          label: t('asset.tree.context-menu.lock'),
          key: 'advanced-lock',
          icon: <Icon name={ 'lock-01' } />,
          children: [
            {
              label: t('asset.tree.context-menu.lock'),
              key: 'advanced.lock.lock',
              icon: <Icon name={ 'lock-01' } />,
              onClick: () => {
                console.log('advanced-lock-lock')
              }
            },
            {
              label: t('asset.tree.context-menu.lock-and-propagate-to-children'),
              key: 'advanced.lock.lock-and-propagate-to-children',
              icon: <Icon name={ 'file-lock-02' } />,
              onClick: () => {
                console.log('advanced-lock-lock')
              }
            }
          ]
        },
        {
          label: t('asset.tree.context-menu.expand-children'),
          key: 'advanced.expand-children',
          icon: <Icon name={ 'expand-01' } />,
          onClick: () => {
            console.log('expand-children')
          }
        }
      ]
    }
  }

  const refresh = (): ItemType => {
    return {
      label: t('asset.tree.context-menu.refresh'),
      key: 'refresh',
      icon: <Icon name={ 'refresh-ccw-03' } />,
      disabled: true,
      onClick: () => {
        console.log('refresh')
      }
    }
  }

  const requestTranslations = (): ItemType => {
    return {
      label: t('asset.tree.context-menu.request-translations'),
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
