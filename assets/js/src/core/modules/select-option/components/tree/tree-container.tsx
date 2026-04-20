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
import { TreeElement as Tree, type TreeDataItem } from '@Pimcore/components/tree-element/tree-element'
import { ToolbarTree } from '@Pimcore/modules/select-option/components/tree/toolbar-tree'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { useStyle } from '@Pimcore/modules/select-option/components/tree/tree-container.styles'
import { TreeAutocomplete } from '@Pimcore/modules/select-option/components/tree/tree-autocomplete'
import { findNodeByKey } from '@Pimcore/modules/select-option/components/tree/tree-helper'
import { useSelectOptionEditorContext } from '../../context/hooks/use-select-option-editor-context'
import { useSelectOptionEditor } from '../../hooks/use-select-option-editor'

interface ITreeContainerProps {
  treeData: TreeDataItem[]
  expandedKeys: React.Key[]
  isFetching: boolean
  onReloadTree: () => void
  onSetExpandedKeys: (keys: React.Key[]) => void
}

const TreeContainer = ({ expandedKeys, treeData, isFetching, onReloadTree, onSetExpandedKeys }: ITreeContainerProps): React.JSX.Element => {
  const { openSelectOption, closeSelectOption, setSelectOptions } = useSelectOptionEditorContext()
  const { createSelectOption, removeWithConfirmation } = useSelectOptionEditor()
  const { styles } = useStyle()
  const classNames = [styles.treeContainer]

  const handleAddItem = (): void => {
    createSelectOption(() => {
      onReloadTree()
    })
  }

  return (
    <ContentLayout
      renderToolbar={
        <ToolbarTree
          onAddItem={ handleAddItem }
          onReload={ onReloadTree }
        />
      }
    >
      <Content
        className={ classNames.join(', ') }
      >
        <TreeAutocomplete
          onSelect={ (key) => { void openSelectOption(key) } }
          treeData={ treeData }
        />

        <Tree
          defaultExpandedKeys={ expandedKeys }
          expandedKeys={ expandedKeys }
          onActionsClick={ (key: string | number, action: string) => {
            const keyStr = String(key)

            if (action === 'delete') {
              removeWithConfirmation(keyStr, async () => {
                closeSelectOption(keyStr)
                setSelectOptions((prev) => prev.filter((s) => s.id !== keyStr))
                onReloadTree()
              })
            }
          } }
          onExpand={ (keys) => {
            onSetExpandedKeys(keys)
          } }
          onSelected={ (key) => {
            if (findNodeByKey(treeData, key)?.selectable !== false) {
              void openSelectOption(String(key))
            }
          } }
          treeData={ treeData }
        />
      </Content>
    </ContentLayout>
  )
}

export { TreeContainer }
