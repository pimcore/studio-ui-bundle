import React, { useState } from 'react'
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
  mediaQueryId: string
  transformationIndex: number
  onRemove: () => void
  onFocus?: () => void
}> = ({ transformation, onRemove }) => {
  const { t } = useTranslation()
  
  return (
    <div style={{ 
      padding: '8px 12px', 
      backgroundColor: '#f5f5f5',
      borderRadius: '4px',
      border: '1px dashed #d9d9d9'
    }}>
      <span style={{ color: '#999' }}>
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
  const [focusedTransformation, setFocusedTransformation] = useState<string | null>(null)

  const renderTransformation = (transformation: Transformation, index: number) => {
    const ToolStripBoxComponent = transformationDynamicTypeRegistry.getToolStripBox(transformation.type)

    if (!ToolStripBoxComponent) {
      return (
        <DefaultTransformationToolStripBox
          key={transformation.id}
          transformation={transformation}
          mediaQueryId={mediaQueryId}
          transformationIndex={index}
          onRemove={() => onRemove(transformation.id)}
        />
      )
    }

    return (
      <ToolStripBoxComponent
        key={transformation.id}
        transformation={transformation}
        mediaQueryId={mediaQueryId}
        transformationIndex={index}
        onRemove={() => onRemove(transformation.id)}
        onMoveUp={() => onMoveUp?.(transformation.id)}
        onMoveDown={() => onMoveDown?.(transformation.id)}
        onFocus={() => setFocusedTransformation(transformation.id)}
      />
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <Space direction="vertical" size="small" className="w-full">
        {transformations.map((transformation, index) => 
          renderTransformation(transformation, index)
        )}
      </Space>
    </div>
  )
}