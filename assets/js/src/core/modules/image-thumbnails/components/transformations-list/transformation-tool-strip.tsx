/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { memo, useMemo } from 'react'
import { ToolStrip } from '@Pimcore/components/toolstrip/tool-strip'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Space } from '@Pimcore/components/space/space'
import { useTranslation } from 'react-i18next'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type TransformationDynamicTypeRegistry } from '../../dynamic-types/transformation-dynamic-type-registry'
import type { Transformation } from '../../types/media-query.types'

export interface TransformationToolStripProps {
  transformation: Transformation
  onRemove: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
}

export const TransformationToolStrip = memo(({
  transformation,
  onRemove,
  onMoveUp,
  onMoveDown
}: TransformationToolStripProps): React.JSX.Element => {
  const { t } = useTranslation()

  const transformationDynamicTypeRegistry = useMemo(
    () => container.get<TransformationDynamicTypeRegistry>(serviceIds['DynamicTypes/TransformationDynamicTypeRegistry']),
    []
  )

  const transformationType = transformationDynamicTypeRegistry.getDynamicType(transformation.type, false)
  const title = transformationType?.getSummary(transformation.config) ?? transformation.type

  return (
    <ToolStrip title={ title }>
      <Space size="mini">
        {onMoveUp != null && (
          <IconButton
            icon={ { value: 'chevron-up' } }
            onClick={ onMoveUp }
            size="small"
            title={ t('image-thumbnails.transformations.move-up') }
          />
        )}

        {onMoveDown != null && (
          <IconButton
            icon={ { value: 'chevron-down' } }
            onClick={ onMoveDown }
            size="small"
            title={ t('image-thumbnails.transformations.move-down') }
          />
        )}

        <IconButton
          icon={ { value: 'trash' } }
          onClick={ onRemove }
          size="small"
          title={ t('image-thumbnails.transformations.remove') }
        />
      </Space>
    </ToolStrip>
  )
})
TransformationToolStrip.displayName = 'TransformationToolStrip'
