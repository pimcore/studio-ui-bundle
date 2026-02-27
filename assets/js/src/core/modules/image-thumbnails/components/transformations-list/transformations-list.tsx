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
import { Space } from '@Pimcore/components/space/space'
import { ToolStripBox } from '@Pimcore/components/toolstrip/box/tool-strip-box'
import { transformationDynamicTypeRegistry } from '../../dynamic-types/transformation-dynamic-type-registry'
import { TransformationToolStrip } from './transformation-tool-strip'
import type { Transformation } from '../../types/media-query.types'

interface TransformationsListProps {
  mediaQueryId: string
  transformations: Transformation[]
  onRemove: (transformationId: string) => void
  onUpdate: (transformationId: string, config: any) => void
  onMoveUp?: (transformationId: string) => void
  onMoveDown?: (transformationId: string) => void
}

export const TransformationsList = ({
  transformations,
  onRemove,
  onUpdate,
  onMoveUp,
  onMoveDown
}: TransformationsListProps): React.JSX.Element => {
  const renderTransformation = (transformation: Transformation, index: number): React.JSX.Element => {
    const registryItem = transformationDynamicTypeRegistry.getDynamicType(transformation.type, false)

    if (registryItem == null) {
      return (
        <ToolStripBox
          renderToolStripStart={
            <TransformationToolStrip
              transformation={ transformation }
              onRemove={ () => { onRemove(transformation.id) } }
              onMoveUp={ onMoveUp != null ? () => { onMoveUp(transformation.id) } : undefined }
              onMoveDown={ onMoveDown != null ? () => { onMoveDown(transformation.id) } : undefined }
            />
          }
        >
          <div>Unknown transformation type: {transformation.type}</div>
        </ToolStripBox>
      )
    }

    const Component = registryItem.getReactComponent()

    return (
      <ToolStripBox
        renderToolStripStart={
          <TransformationToolStrip
            transformation={ transformation }
            onRemove={ () => { onRemove(transformation.id) } }
            onMoveUp={ onMoveUp != null ? () => { onMoveUp(transformation.id) } : undefined }
            onMoveDown={ onMoveDown != null ? () => { onMoveDown(transformation.id) } : undefined }
          />
        }
      >
        <Component
          attributes={ transformation.config }
          onChange={ (newAttributes: any) => { onUpdate(transformation.id, newAttributes) } }
        />
      </ToolStripBox>
    )
  }

  return (
    <div style={ { width: '100%' } }>
      <Space
        className="w-full"
        direction="vertical"
        size="small"
      >
        {transformations.map((transformation, index) =>
          renderTransformation(transformation, index)
        )}
      </Space>
    </div>
  )
}
