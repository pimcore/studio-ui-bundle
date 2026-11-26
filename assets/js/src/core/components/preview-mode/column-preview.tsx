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
import { Divider, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
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

const ColumnPreviewRow = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  return (
    <>
      <Divider
        className={ styles.divider }
        data-testid="preview-mode-column-preview-divider"
      />
      <Flex
        align="center"
        className={ styles.row }
        data-testid="preview-mode-column-preview-row"
        gap="small"
      >
        <Text className={ styles.label }>{t('preview-mode.preview')}</Text>
        <div className={ styles.value }>{children}</div>
      </Flex>
    </>
  )
}

export const ColumnPreview = ({ source, children }: ColumnPreviewProps): React.JSX.Element | null => {
  const { enabled } = usePreviewModeOptional()
  const { styles } = useStyles()

  if (!enabled) {
    return null
  }

  if (children !== undefined) {
    return <ColumnPreviewRow>{children()}</ColumnPreviewRow>
  }

  if (source?.isLoading === true) {
    return (
      <ColumnPreviewRow>
        <Spin
          data-testid="preview-mode-column-preview-loading"
          size="small"
        />
      </ColumnPreviewRow>
    )
  }

  if (source?.error !== undefined && source.error !== null) {
    return (
      <ColumnPreviewRow>
        <Text
          className={ styles.description }
          type="danger"
        >{source.error}</Text>
      </ColumnPreviewRow>
    )
  }

  return <ColumnPreviewRow>{source?.value ?? null}</ColumnPreviewRow>
}
