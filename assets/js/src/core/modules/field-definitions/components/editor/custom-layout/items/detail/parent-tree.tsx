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
import { type FieldDefinitionDragDropInfo } from '@Pimcore/modules/field-definitions/components/editor/items/detail/sidebar'

export const DetailParentTree = (): React.JSX.Element => {
  const { configuration } = useCurrentConfiguration()
  const currentConfig = configuration!

  const settings = useSettings()
  const parentArea = settings.customLayouts?.parent?.area
  const useLayout = settings.customLayouts?.parent?.useLayout
  const { fieldDefinitionRegistry } = settings

  if (useLayout === undefined) {
    throw new Error('Custom Layout Parent: useLayout is not defined in editor settings')
  }

  if (parentArea === undefined) {
    throw new Error('Custom Layout Parent: area is not defined in editor settings')
  }

  const {
    structure,
    fieldDefinitions,
    getLayout
  } = useLayout()

  const titleRender: ITreeElementProps['titleRender'] = useMemo(() => {
    /* eslint-disable react/display-name */
    return (node, initialComponent) => {
      const currentFieldDefinition = fieldDefinitions[node.key as string]

      if (currentFieldDefinition === undefined) {
        return initialComponent
      }

      const info: FieldDefinitionDragDropInfo = {
        type: 'field-definition',
        icon: currentFieldDefinition.icon ?? { value: 'folder' },
        title: currentFieldDefinition.title ?? currentFieldDefinition.name ?? (node.title as string),
        data: {
          area: parentArea,
          internal: {
            id: node.key as string,
            fieldDefinition: currentFieldDefinition,
            path: ((node as any).meta?.currentPath as string[]) ?? []
          },
          external: getLayout({ startNode: node.key.toString() })!
        }
      }

      return (
        <Draggable info={ info }>
          {initialComponent}
        </Draggable>
      )
    }
  }, [fieldDefinitions, parentArea, getLayout])

  const items: ITreeElementProps['treeData'] = React.useMemo(() => {
    if (structure === undefined) {
      return []
    }

    const treeItems = buildTree({
      structure,
      fieldDefinitions,
      registry: fieldDefinitionRegistry,
      itemCallback: ({ fieldDefinition, initialTreeItem }) => {
        return {
          ...initialTreeItem,
          className: 'ant-tree-node--has-drag-and-drop'
        }
      }
    })

    return [treeItems.children!].flat()
  }, [structure, fieldDefinitions])

  return (
    <Content
      padded
      padding={ { y: 'small', x: 'mini' } }
    >
      <Header
        style={ { flexShrink: 0 } }
        title={ currentConfig.name }
      />

      <Content
        overflow={ { x: 'hidden', y: 'auto' } }
        style={ { minHeight: 0, flex: 1 } }
      >
        <TreeElement
          defaultExpandAll
          titleRender={ titleRender }
          treeData={ items }
        />
      </Content>
    </Content>
  )
}
