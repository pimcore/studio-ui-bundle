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
import { Space } from '@Pimcore/components/space/space'
import { transformationDynamicTypeRegistry } from '../../dynamic-types/transformation-dynamic-type-registry'
import type { Transformation } from '../../types/media-query.types'

interface TransformationsListProps {
  mediaQueryId: string
  transformations: Transformation[]
  onRemove: (transformationId: string) => void
  onUpdate: (transformationId: string, config: any) => void
  onMoveUp?: (transformationId: string) => void
  onMoveDown?: (transformationId: string) => void
}

const DefaultTransformationToolStripBox: React.FC<{
  transformation: Transformation
  onRemove: () => void
}> = ({ transformation, onRemove }) => {
  const { t } = useTranslation()

  return (
    <div style={ {
      padding: '8px 12px',
      backgroundColor: '#f5f5f5',
      borderRadius: '4px',
      border: '1px dashed #d9d9d9'
    } }
    >
      <span style={ { color: '#999' } }>
        {t('image-thumbnails.transformations.unknown-type', { type: transformation.type })}
      </span>
    </div>
  )
}

export const TransformationsList = ({
  mediaQueryId,
  transformations,
  onRemove,
  onUpdate,
  onMoveUp,
  onMoveDown
}: TransformationsListProps): React.JSX.Element => {
  const renderTransformation = (transformation: Transformation, index: number): React.JSX.Element => {
    const ToolStripBoxComponent = transformationDynamicTypeRegistry.getToolStripBox(transformation.type)

    if (ToolStripBoxComponent == null) {
      return (
        <DefaultTransformationToolStripBox
          key={ transformation.id }
          onRemove={ () => { onRemove(transformation.id) } }
          transformation={ transformation }
        />
      )
    }

    return (
      <ToolStripBoxComponent
        key={ transformation.id }
        mediaQueryId={ mediaQueryId }
        onMoveDown={ () => onMoveDown?.(transformation.id) }
        onMoveUp={ () => onMoveUp?.(transformation.id) }
        onRemove={ () => { onRemove(transformation.id) } }
        transformationIndex={ index }
      />
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
