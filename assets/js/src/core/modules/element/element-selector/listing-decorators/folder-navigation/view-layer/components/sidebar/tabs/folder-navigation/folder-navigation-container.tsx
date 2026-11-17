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
import { TreeWidget } from '@Pimcore/modules/element/tree/tree-widget'
import { type TreeNode } from '@Pimcore/components/element-tree/element-tree-slice'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { Box } from '@Pimcore/components/box/box'
import { Text } from '@Pimcore/components/text/text'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { usePaging } from '@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging'
import { useFolderNavigation } from '../../../../../context-layer/provider/folder-navigation/use-folder-navigation'

export interface FolderNavigationContainerProps {
  elementType: ElementType
}

export const FolderNavigationContainer = ({ elementType }: FolderNavigationContainerProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { folderPath, setFolder } = useFolderNavigation()
  const { setDataLoadingState } = useData()
  const { setPage } = usePaging()

  const onSelect = (node: TreeNode): void => {
    if (node.type !== 'folder') {
      return
    }

    setFolder(parseInt(node.id), node.fullPath ?? node.label)
    setPage(1)
    setDataLoadingState('filters-applied')
  }

  return (
    <>
      <Box padding={ 'small' }>
        <Text
          ellipsis
          title={ folderPath }
          type="secondary"
        >
          {t('element_selector.current_folder', { path: folderPath, interpolation: { escapeValue: false } })}
        </Text>
      </Box>

      <TreeWidget
        contextPermissions={ {} }
        elementType={ elementType }
        id="element-selector-folder-navigation"
        onSelect={ onSelect }
        showRoot
      />
    </>
  )
}
