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
import { Spin } from 'antd'
import { Text } from '@Pimcore/components/text/text'
import { usePreviewModeOptional } from './preview-mode-provider'
import { useStyles } from './preview-mode-bar.styles'

export interface ColumnPreviewSource {
  isLoading?: boolean
  error?: React.ReactNode
  value?: React.ReactNode
}

export interface ColumnPreviewProps {
  /** Value source provided by the caller */
  source?: ColumnPreviewSource
  /** Alternative to `source`: only called (so only fetches) while preview mode is on */
  children?: () => React.ReactNode
}

export const ColumnPreview = ({ source, children }: ColumnPreviewProps): React.JSX.Element | null => {
  const { enabled } = usePreviewModeOptional()
  const { styles } = useStyles()

  if (!enabled) {
    return null
  }

  if (children !== undefined) {
    return <>{children()}</>
  }

  if (source?.isLoading === true) {
    return <Spin data-testid="preview-mode-column-preview-loading" size="small" />
  }

  if (source?.error !== undefined && source.error !== null) {
    return <Text className={ styles.description } type="danger">{source.error}</Text>
  }

  return <>{source?.value ?? null}</>
}
