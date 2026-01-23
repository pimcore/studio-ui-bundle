/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCurrentConfiguration } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/current-configuration-provider'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { Content, Draggable, Header, type ITreeElementProps, TreeElement } from '@sdk/components'
import { buildTree } from '@sdk/modules/field-definitions'
import React, { useMemo } from 'react'

export const DetailParentTree = (): React.JSX.Element => {
  const { configuration } = useCurrentConfiguration()
  const currentConfig = configuration!

  const settings = useSettings()
  const useLayout = settings.customLayouts?.parent?.useLayout

  if (useLayout === undefined) {
    throw new Error('Custom Layout Parent: useLayout is not defined in editor settings')
  }

  const {
    structure,
    fieldDefinitions
  } = useLayout()

  const titleRender: ITreeElementProps['titleRender'] = useMemo(() => {
    /* eslint-disable react/display-name */
    return (node, initialComponent) => (
      <Draggable info={ {
        type: 'field-definition',
        data: fieldDefinitions[node.key.toString()],
        // @todo icon
        icon: { value: 'folder' },
        title: node.title as string
      } }
      >
        {initialComponent}
      </Draggable>
    )
  }, [fieldDefinitions])

  const items: ITreeElementProps['treeData'] = React.useMemo(() => {
    if (structure === undefined) {
      return []
    }

    const treeItems = buildTree({
      structure,
      fieldDefinitions,
      itemCallback: ({ fieldDefinition, initialTreeItem }) => {
        return {
          ...initialTreeItem,
          className: 'ant-tree-node--has-drag-and-drop'
        }
      }
    })

    return [treeItems]
  }, [structure, fieldDefinitions])

  return (
    <Content
      padded
      padding={ { y: 'small', x: 'mini' } }
    >
      <Header title={ currentConfig.name } />

      <TreeElement
        defaultExpandAll
        titleRender={ titleRender }
        treeData={ items }
      />
    </Content>
  )
}
