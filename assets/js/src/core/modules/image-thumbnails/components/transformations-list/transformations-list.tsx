/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { memo, useCallback, useMemo } from 'react'
import { Space } from '@Pimcore/components/space/space'
import { ToolStripBox } from '@Pimcore/components/toolstrip/box/tool-strip-box'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type TransformationDynamicTypeRegistry } from '../../dynamic-types/transformation-dynamic-type-registry'
import { TransformationToolStrip } from './transformation-tool-strip'
import type { Transformation } from '../../types/media-query.types'

interface TransformationItemProps {
  transformation: Transformation
  onRemove: (transformationId: string) => void
  onUpdate: (transformationId: string, config: any) => void
  onMoveUp?: (transformationId: string) => void
  onMoveDown?: (transformationId: string) => void
}

const TransformationItem = memo(({
  transformation,
  onRemove,
  onUpdate,
  onMoveUp,
  onMoveDown
}: TransformationItemProps): React.JSX.Element => {
  const transformationDynamicTypeRegistry = useMemo(
    () => container.get<TransformationDynamicTypeRegistry>(serviceIds['DynamicTypes/TransformationDynamicTypeRegistry']),
    []
  )

  const registryItem = transformationDynamicTypeRegistry.getDynamicType(transformation.type, false)

  const handleRemove = useCallback(() => { onRemove(transformation.id) }, [onRemove, transformation.id])
  const handleMoveUp = useCallback(() => { onMoveUp?.(transformation.id) }, [onMoveUp, transformation.id])
  const handleMoveDown = useCallback(() => { onMoveDown?.(transformation.id) }, [onMoveDown, transformation.id])
  const handleUpdate = useCallback((newAttributes: any) => { onUpdate(transformation.id, newAttributes) }, [onUpdate, transformation.id])

  if (registryItem != null) {
    const Component = registryItem.getReactComponent()

    return (
      <ToolStripBox
        renderToolStripStart={
          <TransformationToolStrip
            onMoveDown={ onMoveDown == null ? undefined : handleMoveDown }
            onMoveUp={ onMoveUp == null ? undefined : handleMoveUp }
            onRemove={ handleRemove }
            transformation={ transformation }
          />
        }
      >
        <Component
          attributes={ transformation.config }
          onChange={ handleUpdate }
        />
      </ToolStripBox>
    )
  }

  return (
    <ToolStripBox
      renderToolStripStart={
        <TransformationToolStrip
          onMoveDown={ onMoveDown == null ? undefined : handleMoveDown }
          onMoveUp={ onMoveUp == null ? undefined : handleMoveUp }
          onRemove={ handleRemove }
          transformation={ transformation }
        />
      }
    >
      <div>Unknown transformation type: {transformation.type}</div>
    </ToolStripBox>
  )
})

TransformationItem.displayName = 'TransformationItem'

interface TransformationsListProps {
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
  return (
    <div style={ { width: '100%' } }>
      <Space
        className="w-full"
        direction="vertical"
        size="small"
      >
        {transformations.map((transformation) => (
          <TransformationItem
            key={ transformation.id }
            onMoveDown={ onMoveDown }
            onMoveUp={ onMoveUp }
            onRemove={ onRemove }
            onUpdate={ onUpdate }
            transformation={ transformation }
          />
        ))}
      </Space>
    </div>
  )
}
