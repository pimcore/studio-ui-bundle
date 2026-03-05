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
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type VideoTransformationDynamicTypeRegistry } from '../../dynamic-types/video-transformation-dynamic-type-registry'
import { VideoTransformationToolStrip } from './transformation-tool-strip'
import type { Transformation } from '../../types/media-query.types'

interface VideoTransformationsListProps {
  transformations: Transformation[]
  onRemove: (transformationId: string) => void
  onUpdate: (transformationId: string, config: any) => void
  onMoveUp?: (transformationId: string) => void
  onMoveDown?: (transformationId: string) => void
}

export const VideoTransformationsList = ({
  transformations,
  onRemove,
  onUpdate,
  onMoveUp,
  onMoveDown
}: VideoTransformationsListProps): React.JSX.Element => {
  const transformationDynamicTypeRegistry = container.get<VideoTransformationDynamicTypeRegistry>(serviceIds['DynamicTypes/VideoTransformationDynamicTypeRegistry'])

  const renderTransformation = (transformation: Transformation, index: number): React.JSX.Element => {
    const registryItem = transformationDynamicTypeRegistry.getDynamicType(transformation.type, false)

    if (registryItem != null) {
      const Component = registryItem.getReactComponent()

      return (
        <ToolStripBox
          renderToolStripStart={
            <VideoTransformationToolStrip
              onMoveDown={ onMoveDown == null ? undefined : () => { onMoveDown(transformation.id) } }
              onMoveUp={ onMoveUp == null ? undefined : () => { onMoveUp(transformation.id) } }
              onRemove={ () => { onRemove(transformation.id) } }
              transformation={ transformation }
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
      <ToolStripBox
        renderToolStripStart={
          <VideoTransformationToolStrip
            onMoveDown={ onMoveDown == null ? undefined : () => { onMoveDown(transformation.id) } }
            onMoveUp={ onMoveUp == null ? undefined : () => { onMoveUp(transformation.id) } }
            onRemove={ () => { onRemove(transformation.id) } }
            transformation={ transformation }
          />
        }
      >
        <div>Unknown transformation type: {transformation.type}</div>
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
