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
import { Text } from '@Pimcore/components/text/text'
import type { MediaQuery } from '../../types/media-query.types'
import { DynamicTransformationsDropdown } from '../transformations-dropdown/dynamic-transformations-dropdown'
import { TransformationsList } from '../transformations-list/transformations-list'
import type { TransformationDynamicTypeInterface } from '../../dynamic-types/transformation-dynamic-type-interface'

interface MediaQueryTabContentProps {
  mediaQuery: MediaQuery
  onTransformationAdd: (type: TransformationDynamicTypeInterface, config: any) => void
  onTransformationRemove: (transformationId: string) => void
  onTransformationUpdate: (transformationId: string, config: any) => void
  onTransformationMoveUp?: (transformationId: string) => void
  onTransformationMoveDown?: (transformationId: string) => void
}

export const MediaQueryTabContent = ({
  mediaQuery,
  onTransformationAdd,
  onTransformationRemove,
  onTransformationUpdate,
  onTransformationMoveUp,
  onTransformationMoveDown
}: MediaQueryTabContentProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <div style={{ padding: '16px', width: '100%', minHeight: '200px' }}>
      <Space direction="vertical" size="medium" className="w-full">
        <div>
          <DynamicTransformationsDropdown onTransformationAdd={onTransformationAdd} />
        </div>

        {mediaQuery.transformations.length === 0 ? (
          <div style={{ padding: '16px 0', textAlign: 'center' }}>
            <Text type="secondary">
              {t('image-thumbnails.editor.transformations.empty')}
            </Text>
          </div>
        ) : (
          <TransformationsList
            mediaQueryId={mediaQuery.id}
            transformations={mediaQuery.transformations}
            onRemove={onTransformationRemove}
            onUpdate={onTransformationUpdate}
            onMoveUp={onTransformationMoveUp}
            onMoveDown={onTransformationMoveDown}
          />
        )}
      </Space>
    </div>
  )
}