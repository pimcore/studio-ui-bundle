/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */


import React from 'react'
import { useTranslation } from 'react-i18next'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { Icon } from '@Pimcore/components/icon/icon'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { FolderNavigationContainer } from '../tabs/folder-navigation/folder-navigation-container'

export interface WithFolderNavigationEntryConfig {
  elementType: ElementType
}

export const withFolderNavigationEntry = (
  useBaseHook: AbstractDecoratorProps['useSidebarOptions'],
  config: WithFolderNavigationEntryConfig
): AbstractDecoratorProps['useSidebarOptions'] => {
  const useFolderNavigationEntry: typeof useBaseHook = () => {
    const { getProps: baseGetProps } = useBaseHook()
    const { t } = useTranslation()

    const getProps: typeof baseGetProps = () => {
      const baseProps = baseGetProps()

      return {
        ...baseProps,
        entries: [
          {
            component: <FolderNavigationContainer elementType={ config.elementType } />,
            key: 'folder-navigation',
            icon: <Icon value="folder" />,
            tooltip: t('sidebar.folder_navigation')
          },
          ...baseProps.entries
        ]
      }
    }

    return {
      getProps
    }
  }

  return useFolderNavigationEntry
}
